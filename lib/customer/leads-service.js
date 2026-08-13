import { prisma, hasPrisma } from "@/lib/prisma";
import { normalizeEmail } from "./auth";

function parseDate(value) {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function mapRow(row) {
  return {
    id: row.id,
    name: row.name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    company: row.company ?? "",
    subject: row.subject ?? "",
    service: row.service ?? "",
    message: row.message ?? "",
    source: row.source ?? "Contact form",
    status: row.status ?? "New",
    createdAt: row.createdAt,
    replies: (row.replies ?? [])
      .slice()
      .sort((a, b) => parseDate(a.createdAt).getTime() - parseDate(b.createdAt).getTime())
      .map((rp) => ({
        id: rp.id,
        body: rp.body,
        direction: rp.direction,
        createdAt: rp.createdAt,
      })),
  };
}

export async function listCustomerLeads(email) {
  if (!hasPrisma()) return { leads: [], live: false };
  try {
    const rows = await prisma.lead.findMany({
      where: { email: normalizeEmail(email) },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { replies: { orderBy: { createdAt: "asc" } } },
    });
    const live = rows && rows.length > 0;
    return { leads: rows.map(mapRow), live };
  } catch {
    return { leads: [], live: false };
  }
}

export async function addCustomerReply({ leadId, email, body }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const trimmed = String(body ?? "").trim();
  if (!trimmed) return { error: "Message is required." };

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Enquiry not found." };
  if (normalizeEmail(lead.email) !== normalizeEmail(email)) {
    return { error: "This enquiry does not belong to your account." };
  }

  const reply = await prisma.leadReply.create({
    data: { leadId, body: trimmed, direction: "incoming" },
  });
  return { reply };
}

export function leadUnreadCount(lead, lastSeenAt) {
  if (!lead?.replies?.length) return 0;
  if (!lastSeenAt) return lead.replies.filter((r) => r.direction === "outgoing").length;
  const cutoff = parseDate(lastSeenAt).getTime();
  return lead.replies.filter((r) => r.direction === "outgoing" && parseDate(r.createdAt).getTime() > cutoff).length;
}