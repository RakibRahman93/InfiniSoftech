import { prisma, hasPrisma } from "@/lib/prisma";

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
    name: row.name ?? "Unknown",
    email: row.email ?? "",
    phone: row.phone ?? "",
    company: row.company ?? "",
    subject: row.subject ?? "",
    service: row.service ?? "",
    message: row.message ?? row.content ?? "",
    source: sourceHint ?? row.source ?? "Contact form",
    status: row.status ?? "New",
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
      include: { replies: { orderBy: { createdAt: "asc" } } },
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

export async function updateLeadStatus(leadId, status) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Lead not found." };
  const updated = await prisma.lead.update({ where: { id: leadId }, data: { status } });
  return { lead: updated };
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