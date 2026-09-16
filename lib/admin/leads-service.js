import { prisma, hasPrisma } from "@/lib/prisma";

const demoLeads = [
  {
    id: "lead-1",
    name: "James Whitfield",
    email: "james.w@gmail.com",
    company: "Peakline Media",
    message: "Looking for a full website rebuild. We are a photography studio growing fast.",
    source: "Contact form",
    status: "Won",
    created_at: "2026-06-24T09:12:00.000Z",
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    company: "Bloom Health",
    message: "We need a mobile app to complement our wellness subscription platform.",
    source: "Contact form",
    status: "Qualified",
    created_at: "2026-06-23T14:40:00.000Z",
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
    company: row.company ?? "",
    message: row.message ?? row.content ?? "",
    source: sourceHint,
    status: row.status ?? "New",
    created_at: row.insertedAt ?? row.createdAt,
    formattedDate: formatDate(row.insertedAt ?? row.createdAt),
  };
}

export async function listLeads() {
  if (!hasPrisma()) {
    return { leads: demoLeads.map((l) => ({ ...l, formattedDate: formatDate(l.created_at) })), live: false };
  }
  try {
    const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
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