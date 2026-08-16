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
    company: typeof row.company === "string" ? row.company : row.company?.companyName ?? "",
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
      include: { replies: { orderBy: { createdAt: "asc" } }, company: { select: { companyName: true } } },
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

export async function updateCustomerLead({ leadId, email, data }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Enquiry not found." };
  if (normalizeEmail(lead.email) !== normalizeEmail(email)) {
    return { error: "This enquiry does not belong to your account." };
  }

  const now = new Date().toISOString();
  const d = { ...data };
  const allowed = {
    name: d.name !== undefined ? String(d.name).trim() : lead.name,
    email: d.email !== undefined ? String(d.email).trim().toLowerCase() : lead.email,
    phone: d.phone !== undefined ? String(d.phone).trim() : lead.phone,
    company: d.company !== undefined ? String(d.company).trim() : lead.company?.companyName ?? lead.company ?? "",
    service: d.service !== undefined ? String(d.service).trim() : lead.service,
    subject: d.subject !== undefined ? String(d.subject).trim() : lead.subject,
    message: d.message !== undefined ? String(d.message).trim() : lead.message,
  };
  if (!allowed.name || !allowed.email || !allowed.phone || !allowed.message) {
    return { error: "Name, email, phone, and message are required." };
  }

  let companyId = lead.companyId ?? null;
  const companyName = allowed.company;
  if (companyName === "") {
    companyId = null;
  } else if (companyName) {
    const existingCompany = await prisma.company.findFirst({
      where: { companyName: { equals: companyName, mode: "insensitive" } },
    });
    if (existingCompany) {
      companyId = existingCompany.id;
    } else {
      const created = await prisma.company.create({ data: { companyName } });
      companyId = created.id;
    }
  }

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: {
      name: allowed.name,
      email: allowed.email,
      phone: allowed.phone,
      companyId,
      service: allowed.service || null,
      subject: allowed.subject || null,
      message: allowed.message,
      lastActivityAt: new Date(now),
    },
    include: { replies: { orderBy: { createdAt: "asc" } }, company: { select: { companyName: true } } },
  });
  return { lead: mapRow(updated) };
}

export async function deleteCustomerLead({ leadId, email }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return { error: "Enquiry not found." };
  if (normalizeEmail(lead.email) !== normalizeEmail(email)) {
    return { error: "This enquiry does not belong to your account." };
  }
  await prisma.lead.delete({ where: { id: leadId } });
  return { ok: true };
}