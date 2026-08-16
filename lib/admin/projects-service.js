import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const PROJECT_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

function mapProject(d) {
  return {
    id: d.id,
    projectName: d.dealName,
    clientName: d.clientName ?? "",
    clientEmail: d.clientEmail ?? "",
    contactId: d.contactId ?? "",
    companyId: d.companyId ?? "",
    companyName: d.company?.companyName ?? "",
    value: Number(d.value ?? 0),
    probability: Number(d.probability ?? 0),
    expectedCloseDate: d.expectedCloseDate ?? null,
    stage: d.stage ?? "New",
    ownerId: d.ownerId ?? "",
    ownerName: d.ownerName ?? "",
    service: d.service ?? "",
    notes: d.notes ?? "",
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export async function listProjects({ search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = search
    ? {
        OR: [
          { dealName: { contains: search, mode: "insensitive" } },
          { clientName: { contains: search, mode: "insensitive" } },
          { company: { companyName: { contains: search, mode: "insensitive" } } },
          { service: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
  const rows = await prisma.deal.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { company: { select: { companyName: true } } },
  });
  return rows.map(mapProject);
}

export async function getProject(id) {
  if (!hasPrisma()) return null;
  const row = await prisma.deal.findUnique({
    where: { id },
    include: { company: { select: { companyName: true } } },
  });
  return row ? mapProject(row) : null;
}

export async function getPipelineSummary() {
  if (!hasPrisma()) return { stages: [], total: 0, weighted: 0, won: 0, lost: 0, counts: {} };
  const deals = await prisma.deal.findMany({ select: { value: true, probability: true, stage: true } });
  const counts = {};
  for (const d of deals) counts[d.stage] = (counts[d.stage] ?? 0) + 1;
  const active = deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost");
  const total = active.reduce((s, d) => s + Number(d.value ?? 0), 0);
  const weighted = active.reduce((s, d) => s + Number(d.value ?? 0) * (Number(d.probability ?? 0) / 100), 0);
  const won = deals.filter((d) => d.stage === "Won").reduce((s, d) => s + Number(d.value ?? 0), 0);
  const lost = deals.filter((d) => d.stage === "Lost").reduce((s, d) => s + Number(d.value ?? 0), 0);
  return {
    stages: PROJECT_STAGES.map((stage) => ({
      stage,
      count: counts[stage] ?? 0,
      value: deals.filter((d) => d.stage === stage).reduce((s, d) => s + Number(d.value ?? 0), 0),
    })),
    total,
    weighted,
    won,
    lost,
    counts,
  };
}

function valueOrNull(v) {
  const s = String(v ?? "").trim();
  return s === "" ? null : v;
}

function numberOrZero(v) {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function intOr(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function dateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function validateRefs(data) {
  if (data?.companyId) {
    const exists = await prisma.company.findUnique({ where: { id: data.companyId } });
    if (!exists) return "Company does not exist.";
  }
  if (data?.contactId) {
    const exists = await prisma.contact.findUnique({ where: { id: data.contactId } });
    if (!exists) return "Contact does not exist.";
  }
  return null;
}

export async function createProject(data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const dealName = String(data?.projectName ?? data?.dealName ?? "").trim();
  if (!dealName) return { error: "Project name is required." };
  const refError = await validateRefs(data);
  if (refError) return { error: refError };
  const stage = String(data?.stage ?? "New").trim() || "New";
  if (!PROJECT_STAGES.includes(stage)) return { error: "Invalid stage." };
  const row = await prisma.deal.create({
    data: {
      dealName,
      clientName: valueOrNull(data?.clientName),
      clientEmail: valueOrNull(data?.clientEmail),
      contactId: valueOrNull(data?.contactId),
      companyId: valueOrNull(data?.companyId),
      value: numberOrZero(data?.value),
      probability: intOr(data?.probability, 10),
      expectedCloseDate: dateOrNull(data?.expectedCloseDate),
      stage,
      ownerId: valueOrNull(data?.ownerId),
      ownerName: valueOrNull(data?.ownerName),
      service: valueOrNull(data?.service),
      notes: valueOrNull(data?.notes),
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "PROJECT_CREATED",
    entityType: "Project",
    entityId: row.id,
    metadata: { projectName: row.dealName, stage: row.stage, value: row.value },
    request: data.request,
  });
  return { project: mapProject(row) };
}

export async function updateProject(id, data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.deal.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };
  const refError = await validateRefs(data);
  if (refError) return { error: refError };
  const dealName =
    data?.projectName !== undefined
      ? String(data.projectName).trim()
      : data?.dealName !== undefined
        ? String(data.dealName).trim()
        : existing.dealName;
  if (!dealName) return { error: "Project name is required." };
  const stage = data?.stage !== undefined ? String(data.stage).trim() || "New" : existing.stage;
  if (!PROJECT_STAGES.includes(stage)) return { error: "Invalid stage." };
  const row = await prisma.deal.update({
    where: { id },
    data: {
      dealName,
      clientName: data?.clientName !== undefined ? valueOrNull(data.clientName) : existing.clientName,
      clientEmail: data?.clientEmail !== undefined ? valueOrNull(data.clientEmail) : existing.clientEmail,
      contactId: data?.contactId !== undefined ? valueOrNull(data.contactId) : existing.contactId,
      companyId: data?.companyId !== undefined ? valueOrNull(data.companyId) : existing.companyId,
      value: data?.value !== undefined ? numberOrZero(data.value) : existing.value,
      probability: data?.probability !== undefined ? intOr(data.probability, existing.probability) : existing.probability,
      expectedCloseDate: data?.expectedCloseDate !== undefined ? dateOrNull(data.expectedCloseDate) : existing.expectedCloseDate,
      stage,
      ownerId: data?.ownerId !== undefined ? valueOrNull(data.ownerId) : existing.ownerId,
      ownerName: data?.ownerName !== undefined ? valueOrNull(data.ownerName) : existing.ownerName,
      service: data?.service !== undefined ? valueOrNull(data.service) : existing.service,
      notes: data?.notes !== undefined ? valueOrNull(data.notes) : existing.notes,
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "PROJECT_UPDATED",
    entityType: "Project",
    entityId: row.id,
    metadata: {
      projectName: row.dealName,
      stage: row.stage,
      value: row.value,
      prevStage: existing.stage,
      prevValue: existing.value,
    },
    request: data.request,
  });
  return { project: mapProject(row) };
}

export async function setProjectStage(id, stage, data = {}) {
  return updateProject(id, { stage, ...data });
}

export async function deleteProject(id, data = {}) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.deal.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };
  await prisma.deal.delete({ where: { id } });
  await logAudit({
    actorId: data.actorId,
    action: "PROJECT_DELETED",
    entityType: "Project",
    entityId: id,
    metadata: { projectName: existing.dealName },
    request: data.request,
  });
  return { ok: true };
}
