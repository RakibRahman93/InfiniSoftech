import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const LEAD_SOURCES = [
  "Contact form",
  "Customer dashboard",
  "Website",
  "Facebook",
  "LinkedIn",
  "WhatsApp",
  "Google",
  "Referral",
  "Direct",
  "Campaign",
  "Other",
];

const demoLeads = [
  {
    id: "lead-1",
    name: "James Whitfield",
    email: "james.w@gmail.com",
    company: "Peakline Media",
    subject: "Website rebuild",
    service: "Website development",
    message: "Looking for a full website rebuild. We are a photography studio growing fast.",
    source: "Contact form",
    status: "Won",
    created_at: "2026-06-24T09:12:00.000Z",
    replies: [],
    formattedDate: "",
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    company: "Bloom Health",
    subject: "Mobile app for wellness",
    service: "Mobile App design",
    message: "We need a mobile app to complement our wellness subscription platform.",
    source: "Contact form",
    status: "Qualified",
    created_at: "2026-06-23T14:40:00.000Z",
    replies: [],
    formattedDate: "",
  },
];

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function parseDate(value) {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function mapRow(row, sourceHint) {
  return {
    id: row.id,
    leadNumber: row.leadNumber ?? "",
    name: row.name ?? "Unknown",
    email: row.email ?? "",
    phone: row.phone ?? "",
    company: typeof row.company === "string" ? row.company : row.company?.companyName ?? row.companyId ?? "",
    companyId: row.companyId ?? "",
    subject: row.subject ?? "",
    service: row.service ?? "",
    message: row.message ?? row.content ?? "",
    source: sourceHint ?? row.source ?? "Contact form",
    status: row.status ?? "New",
    estimatedValue: row.estimatedValue ?? null,
    ownerId: row.ownerId ?? "",
    ownerName: row.ownerName ?? "",
    lastActivityAt: row.lastActivityAt ?? null,
    nextFollowUpAt: row.nextFollowUpAt ?? null,
    created_at: row.insertedAt ?? row.createdAt,
    formattedDate: formatDate(row.insertedAt ?? row.createdAt),
    replies: (row.replies ?? []).map((rp) => ({
      id: rp.id,
      body: rp.body,
      direction: rp.direction,
      createdAt: rp.createdAt,
    })),
  };
}

export async function listLeads() {
  if (!hasPrisma()) {
    return {
      leads: demoLeads.map((l) => ({ ...l, formattedDate: formatDate(l.created_at) })),
      live: false,
    };
  }
  try {
    const rows = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        replies: { orderBy: { createdAt: "asc" } },
        company: { select: { companyName: true } },
      },
    });
    if (rows && rows.length > 0) {
      return { leads: rows.map((r) => mapRow(r, r.source ?? "Leads table")), live: true };
    }
  } catch (error) {
    if (!/relation .* does not exist/i.test(error?.message ?? "")) {
      // real query failure — try messages next
    }
  }

  try {
    const msgs = await prisma.message.findMany({ orderBy: { insertedAt: "desc" }, take: 200 });
    if (msgs && msgs.length > 0) {
      return { leads: msgs.map((r) => mapRow(r, "Chat")), live: true };
    }
  } catch {
    // ignore
  }

  return { leads: demoLeads.map((l) => ({ ...l, formattedDate: formatDate(l.created_at) })), live: false };
}

export async function getNewLeadCount() {
  if (!hasPrisma()) return { count: 0 };
  try {
    const count = await prisma.lead.count({ where: { status: "New" } });
    return { count };
  } catch {
    return { count: 0 };
  }
}

const LAST_SEEN_KEY = "admin_leads_last_seen";

export async function getUnreadMessageCount() {
  if (!hasPrisma()) return { count: 0 };
  try {
    const lastSeen = await prisma.setting.findUnique({ where: { key: LAST_SEEN_KEY } });
    const cutoff = lastSeen?.value ? new Date(lastSeen.value) : new Date(0);
    const [newLeads, incomingReplies] = await Promise.all([
      prisma.lead.count({
        where: { status: "New", createdAt: { gt: cutoff } },
      }),
      prisma.leadReply.count({
        where: { direction: "incoming", createdAt: { gt: cutoff } },
      }),
    ]);
    return { count: newLeads + incomingReplies };
  } catch {
    return { count: 0 };
  }
}

export async function markLeadsSeen() {
  if (!hasPrisma()) return { ok: false };
  try {
    await prisma.setting.upsert({
      where: { key: LAST_SEEN_KEY },
      update: { value: new Date().toISOString() },
      create: { key: LAST_SEEN_KEY, value: new Date().toISOString() },
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function addLeadReply({ leadId, body, direction = "outgoing", type }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const trimmed = String(body ?? "").trim();
  if (!trimmed) return { error: "Reply message is required." };

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found." };

  // Drafts reuse the "draft" direction value so no schema change is required.
  const effectiveDirection = type === "draft" ? "draft" : direction || "outgoing";
  const reply = await prisma.leadReply.create({
    data: { leadId, body: trimmed, direction: effectiveDirection },
  });
  return { reply };
}

export async function getLead(leadId) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const row = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      replies: { orderBy: { createdAt: "asc" } },
      company: { select: { companyName: true } },
    },
  });
  if (!row) return { error: "Lead not found." };
  return { lead: mapRow(row, row.source) };
}

export async function updateLeadStatus(leadId, status) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (!LEAD_STATUSES.includes(status)) return { error: "Invalid status." };
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found." };
  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: { status, lastActivityAt: new Date() },
  });
  await logAudit({
    actorId: null,
    action: "LEAD_STATUS_CHANGED",
    entityType: "Lead",
    entityId: leadId,
    metadata: { prevStatus: lead.status, status },
    request: null,
  });
  return { lead: updated };
}

function textOrNull(value) {
  const s = String(value ?? "").trim();
  return s === "" ? null : s;
}

function floatOrNull(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function dateOrNull(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function generateLeadNumber() {
  const d = new Date();
  const y = String(d.getFullYear()).slice(-2);
  const stamp = `${d.getMonth() + 1}${String(d.getDate()).padStart(2, "0")}-${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`;
  return `LD-${y}-${stamp}`;
}

export async function createLead(data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const name = String(data?.name ?? "").trim();
  if (!name) return { error: "Name is required." };

  let companyId = textOrNull(data?.companyId);
  if (!companyId && data?.company?.trim()) {
    const existing = await prisma.company.findFirst({
      where: { companyName: { equals: data.company.trim(), mode: "insensitive" } },
    });
    if (existing) {
      companyId = existing.id;
    } else {
      const created = await prisma.company.create({
        data: { companyName: data.company.trim() },
      });
      companyId = created.id;
    }
  }

  const lead = await prisma.lead.create({
    data: {
      leadNumber: textOrNull(data?.leadNumber) || generateLeadNumber(),
      name,
      email: textOrNull(data?.email),
      phone: textOrNull(data?.phone),
      companyId,
      subject: textOrNull(data?.subject),
      service: textOrNull(data?.service),
      message: textOrNull(data?.message),
      source: LEAD_SOURCES.includes(data?.source) ? data.source : data?.source || "Other",
      status: LEAD_STATUSES.includes(data?.status) ? data.status : "New",
      estimatedValue: floatOrNull(data?.estimatedValue),
      ownerId: textOrNull(data?.ownerId),
      ownerName: textOrNull(data?.ownerName),
      lastActivityAt: new Date(),
      nextFollowUpAt: dateOrNull(data?.nextFollowUpAt),
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "LEAD_CREATED",
    entityType: "Lead",
    entityId: lead.id,
    metadata: { name: lead.name, source: lead.source, status: lead.status },
    request: data.request,
  });
  return { lead: mapRow(lead, lead.source) };
}

export async function updateLead(leadId, data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!existing) return { error: "Lead not found." };

  let companyId = existing.companyId;
  if (data?.companyId !== undefined && data?.companyId !== null) {
    companyId = textOrNull(data.companyId);
  } else if (data?.company !== undefined && typeof data.company === "string") {
    const trimmed = data.company.trim();
    if (trimmed === "") {
      companyId = null;
    } else {
      const existingCompany = await prisma.company.findFirst({
        where: { companyName: { equals: trimmed, mode: "insensitive" } },
      });
      if (existingCompany) {
        companyId = existingCompany.id;
      } else {
        const created = await prisma.company.create({ data: { companyName: trimmed } });
        companyId = created.id;
      }
    }
  }

  const status = data?.status !== undefined && data.status !== null && LEAD_STATUSES.includes(data.status)
    ? data.status
    : existing.status;

  if (data?.status !== undefined && data.status !== existing.status) {
    await logAudit({
      actorId: data.actorId,
      action: "LEAD_STATUS_CHANGED",
      entityType: "Lead",
      entityId: leadId,
      metadata: { prevStatus: existing.status, status },
      request: data.request,
    });
  }

  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: {
      leadNumber: data?.leadNumber !== undefined ? textOrNull(data.leadNumber) : existing.leadNumber,
      name: data?.name !== undefined ? String(data.name).trim() : existing.name,
      email: data?.email !== undefined ? textOrNull(data.email) : existing.email,
      phone: data?.phone !== undefined ? textOrNull(data.phone) : existing.phone,
      companyId,
      subject: data?.subject !== undefined ? textOrNull(data.subject) : existing.subject,
      service: data?.service !== undefined ? textOrNull(data.service) : existing.service,
      message: data?.message !== undefined ? textOrNull(data.message) : existing.message,
      source: data?.source !== undefined ? data.source || "Other" : existing.source,
      status,
      estimatedValue: data?.estimatedValue !== undefined ? floatOrNull(data.estimatedValue) : existing.estimatedValue,
      ownerId: data?.ownerId !== undefined ? textOrNull(data.ownerId) : existing.ownerId,
      ownerName: data?.ownerName !== undefined ? textOrNull(data.ownerName) : existing.ownerName,
      lastActivityAt: new Date(),
      nextFollowUpAt: data?.nextFollowUpAt !== undefined ? dateOrNull(data.nextFollowUpAt) : existing.nextFollowUpAt,
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "LEAD_UPDATED",
    entityType: "Lead",
    entityId: leadId,
    metadata: { name: lead.name, status: lead.status },
    request: data.request,
  });
  return { lead: mapRow(lead, lead.source) };
}

export async function deleteLead(leadId) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found." };
  await prisma.lead.delete({ where: { id: leadId } });
  return { ok: true };
}

export async function deleteLeads(ids) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (!Array.isArray(ids) || ids.length === 0) return { error: "No leads selected." };
  const result = await prisma.lead.deleteMany({ where: { id: { in: ids } } });
  return { ok: true, count: result.count };
}

export async function deleteLeadReply({ leadId, replyId }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const result = await prisma.leadReply.deleteMany({
    where: { id: replyId, leadId },
  });
  if (result.count === 0) return { error: "Reply not found." };
  return { ok: true };
}