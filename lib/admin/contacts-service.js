import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

function mapContact(c) {
  return {
    id: c.id,
    name: c.name,
    email: c.email ?? "",
    phone: c.phone ?? "",
    designation: c.designation ?? "",
    companyId: c.companyId ?? "",
    companyName: c.company?.companyName ?? "",
    source: c.source ?? "Other",
    ownerId: c.ownerId ?? "",
    ownerName: c.ownerName ?? "",
    notes: c.notes ?? "",
    status: c.status ?? "Active",
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  };
}

export async function listContacts({ search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { designation: { contains: search, mode: "insensitive" } },
          { company: { companyName: { contains: search, mode: "insensitive" } } },
        ],
      }
    : {};
  const rows = await prisma.contact.findMany({
    where,
    orderBy: { name: "asc" },
    include: { company: { select: { companyName: true } } },
  });
  return rows.map(mapContact);
}

export async function getContact(id) {
  if (!hasPrisma()) return null;
  const row = await prisma.contact.findUnique({
    where: { id },
    include: { company: { select: { companyName: true } } },
  });
  return row ? mapContact(row) : null;
}

export async function createContact(data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const name = String(data?.name ?? "").trim();
  if (!name) return { error: "Contact name is required." };
  const companyId = String(data?.companyId ?? "").trim() || null;
  if (companyId && !(await prisma.company.findUnique({ where: { id: companyId } }))) {
    return { error: "Company does not exist." };
  }
  const row = await prisma.contact.create({
    data: {
      name,
      email: String(data?.email ?? "").trim().toLowerCase() || null,
      phone: String(data?.phone ?? "").trim() || null,
      designation: String(data?.designation ?? "").trim() || null,
      companyId,
      source: String(data?.source ?? "").trim() || "Other",
      ownerId: String(data?.ownerId ?? "").trim() || null,
      ownerName: String(data?.ownerName ?? "").trim() || null,
      notes: String(data?.notes ?? "").trim() || null,
      status: String(data?.status ?? "").trim() || "Active",
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "CONTACT_CREATED",
    entityType: "Contact",
    entityId: row.id,
    metadata: { name: row.name },
    request: data.request,
  });
  return { contact: mapContact(row) };
}

export async function updateContact(id, data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.contact.findUnique({ where: { id } });
  if (!existing) return { error: "Contact not found." };
  const name = data?.name !== undefined ? String(data.name).trim() : existing.name;
  if (!name) return { error: "Contact name is required." };
  const companyId = data?.companyId !== undefined ? String(data.companyId).trim() || null : existing.companyId;
  if (companyId && !(await prisma.company.findUnique({ where: { id: companyId } }))) {
    return { error: "Company does not exist." };
  }
  const row = await prisma.contact.update({
    where: { id },
    data: {
      name,
      email: data?.email !== undefined ? String(data.email).trim().toLowerCase() || null : existing.email,
      phone: data?.phone !== undefined ? String(data.phone).trim() || null : existing.phone,
      designation: data?.designation !== undefined ? String(data.designation).trim() || null : existing.designation,
      companyId,
      source: data?.source !== undefined ? String(data.source).trim() || "Other" : existing.source,
      ownerId: data?.ownerId !== undefined ? String(data.ownerId).trim() || null : existing.ownerId,
      ownerName: data?.ownerName !== undefined ? String(data.ownerName).trim() || null : existing.ownerName,
      notes: data?.notes !== undefined ? String(data.notes).trim() || null : existing.notes,
      status: data?.status !== undefined ? String(data.status).trim() || "Active" : existing.status,
    },
    include: { company: { select: { companyName: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    action: "CONTACT_UPDATED",
    entityType: "Contact",
    entityId: row.id,
    metadata: { name: row.name },
    request: data.request,
  });
  return { contact: mapContact(row) };
}

export async function deleteContact(id, data = {}) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.contact.findUnique({ where: { id } });
  if (!existing) return { error: "Contact not found." };
  await prisma.contact.delete({ where: { id } });
  await logAudit({
    actorId: data.actorId,
    action: "CONTACT_DELETED",
    entityType: "Contact",
    entityId: id,
    metadata: { name: existing.name },
    request: data.request,
  });
  return { ok: true };
}