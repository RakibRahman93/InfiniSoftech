import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const DEAL_STAGES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

function mapDeal(d) {
  return {
    id: d.id,
    dealName: d.dealName,
    clientName: d.clientName ?? "",
    clientEmail: d.clientEmail ?? "",
    contactId: d.contactId ?? "",
    companyId: d.companyId ?? "",
    companyName: d.company?.companyName ?? "",
    value: Number(d.value ?? 0),
    probability: Number(d.probability ?? 10),
    expectedCloseDate: d.expectedCloseDate ? d.expectedCloseDate.toISOString() : null,
    stage: d.stage ?? "New",
    ownerId: d.ownerId ?? "",
    ownerName: d.ownerName ?? "",
    service: d.service ?? "",
    notes: d.notes ?? "",
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

export async function listDeals({ search = "", stage = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    ...(stage ? { stage } : {}),
    ...(search
      ? {
          OR: [
            { dealName: { contains: search, mode: "insensitive" } },
            { clientName: { contains: search, mode: "insensitive" } },
            { service: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const rows = await prisma.deal.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: { company: { select: { companyName: true } } },
  });
  return rows.map(mapDeal);
}

export async function getDealsSummary() {
  if (!hasPrisma()) return { stages: [], totalPipeline: 0, weightedPipeline: 0, wonValue: 0, lostValue: 0 };
  const deals = await prisma.deal.findMany({ select: { value: true, probability: true, stage: true } });
  
  const active = deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost");
  const totalPipeline = active.reduce((s, d) => s + Number(d.value ?? 0), 0);
  const weightedPipeline = active.reduce((s, d) => s + Number(d.value ?? 0) * (Number(d.probability ?? 0) / 100), 0);
  const wonValue = deals.filter((d) => d.stage === "Won").reduce((s, d) => s + Number(d.value ?? 0), 0);
  const lostValue = deals.filter((d) => d.stage === "Lost").reduce((s, d) => s + Number(d.value ?? 0), 0);

  const stageCounts = {};
  const stageValues = {};
  for (const d of deals) {
    stageCounts[d.stage] = (stageCounts[d.stage] ?? 0) + 1;
    stageValues[d.stage] = (stageValues[d.stage] ?? 0) + Number(d.value ?? 0);
  }

  const stages = DEAL_STAGES.map((st) => ({
    stage: st,
    count: stageCounts[st] ?? 0,
    value: stageValues[st] ?? 0,
  }));

  return { stages, totalPipeline, weightedPipeline, wonValue, lostValue };
}

export async function createDeal(data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const dealName = String(data?.dealName ?? "").trim();
  if (!dealName) return { error: "Deal name is required." };

  const deal = await prisma.deal.create({
    data: {
      dealName,
      clientName: data?.clientName || null,
      clientEmail: data?.clientEmail || null,
      companyId: data?.companyId || null,
      value: data?.value ? Number(data.value) : 0,
      probability: data?.probability ? Number(data.probability) : 10,
      stage: data?.stage || "New",
      service: data?.service || null,
      notes: data?.notes || null,
      expectedCloseDate: data?.expectedCloseDate ? new Date(data.expectedCloseDate) : null,
    },
    include: { company: { select: { companyName: true } } },
  });

  await logAudit({
    actorId,
    action: "DEAL_CREATED",
    entityType: "Deal",
    entityId: deal.id,
    metadata: { dealName, stage: deal.stage, value: deal.value },
  });
  return { deal: mapDeal(deal) };
}

export async function updateDeal(id, data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.deal.findUnique({ where: { id } });
  if (!existing) return { error: "Deal not found." };

  const updates = {};
  if (data.dealName !== undefined) updates.dealName = String(data.dealName).trim();
  if (data.clientName !== undefined) updates.clientName = data.clientName || null;
  if (data.clientEmail !== undefined) updates.clientEmail = data.clientEmail || null;
  if (data.companyId !== undefined) updates.companyId = data.companyId || null;
  if (data.value !== undefined) updates.value = Number(data.value);
  if (data.probability !== undefined) updates.probability = Number(data.probability);
  if (data.stage !== undefined) updates.stage = data.stage;
  if (data.service !== undefined) updates.service = data.service || null;
  if (data.notes !== undefined) updates.notes = data.notes || null;
  if (data.expectedCloseDate !== undefined) updates.expectedCloseDate = data.expectedCloseDate ? new Date(data.expectedCloseDate) : null;

  const deal = await prisma.deal.update({
    where: { id },
    data: updates,
    include: { company: { select: { companyName: true } } },
  });

  await logAudit({
    actorId,
    action: "DEAL_UPDATED",
    entityType: "Deal",
    entityId: id,
    metadata: { dealName: deal.dealName, prevStage: existing.stage, newStage: deal.stage },
  });
  return { deal: mapDeal(deal) };
}

export async function deleteDeal(id, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.deal.findUnique({ where: { id } });
  if (!existing) return { error: "Deal not found." };
  await prisma.deal.delete({ where: { id } });
  await logAudit({
    actorId,
    action: "DEAL_DELETED",
    entityType: "Deal",
    entityId: id,
    metadata: { dealName: existing.dealName },
  });
  return { ok: true };
}
