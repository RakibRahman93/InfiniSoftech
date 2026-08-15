import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

function mapClient(c) {
  return {
    id: c.id,
    clientName: c.companyName,
    website: c.website ?? "",
    email: c.email ?? "",
    phone: c.phone ?? "",
    industry: c.industry ?? "",
    companySize: c.companySize ?? "",
    address: c.address ?? "",
    city: c.city ?? "",
    country: c.country ?? "",
    notes: c.notes ?? "",
    ownerId: c.ownerId ?? "",
    ownerName: c.ownerName ?? "",
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    contactCount: c._count?.contacts ?? 0,
    leadCount: c._count?.leads ?? 0,
    projectCount: c._count?.deals ?? 0,
  };
}

export async function listClients({ search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = search
    ? {
        OR: [
          { companyName: { contains: search, mode: "insensitive" } },
          { industry: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { country: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
  const rows = await prisma.company.findMany({
    where,
    orderBy: { companyName: "asc" },
    include: { _count: { select: { contacts: true, leads: true, deals: true } } },
  });
  return rows.map(mapClient);
}

export async function getClient(id) {
  if (!hasPrisma()) return null;
  const row = await prisma.company.findUnique({
    where: { id },
    include: { _count: { select: { contacts: true, leads: true, deals: true } } },
  });
  return row ? mapClient(row) : null;
}

export async function createClient(data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const companyName = String(data?.clientName ?? data?.companyName ?? "").trim();
  if (!companyName) return { error: "Client name is required." };
  const row = await prisma.company.create({
    data: {
      companyName,
      website: String(data?.website ?? "").trim() || null,
      email: String(data?.email ?? "").trim() || null,
      phone: String(data?.phone ?? "").trim() || null,
      industry: String(data?.industry ?? "").trim() || null,
      companySize: String(data?.companySize ?? "").trim() || null,
      address: String(data?.address ?? "").trim() || null,
      city: String(data?.city ?? "").trim() || null,
      country: String(data?.country ?? "").trim() || null,
      notes: String(data?.notes ?? "").trim() || null,
      ownerId: String(data?.ownerId ?? "").trim() || null,
      ownerName: String(data?.ownerName ?? "").trim() || null,
    },
  });
  await logAudit({
    actorId: data.actorId,
    actorName: data.actorName,
    action: "CLIENT_CREATED",
    entityType: "Client",
    entityId: row.id,
    metadata: { clientName: row.companyName },
    request: data.request,
  });
  return { client: mapClient({ ...row, _count: { contacts: 0, leads: 0, deals: 0 } }) };
}

export async function updateClient(id, data) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) return { error: "Client not found." };
  const companyName =
    data?.clientName !== undefined
      ? String(data.clientName).trim()
      : data?.companyName !== undefined
        ? String(data.companyName).trim()
        : existing.companyName;
  if (!companyName) return { error: "Client name is required." };
  const row = await prisma.company.update({
    where: { id },
    data: {
      companyName,
      website: data?.website !== undefined ? String(data.website).trim() || null : existing.website,
      email: data?.email !== undefined ? String(data.email).trim() || null : existing.email,
      phone: data?.phone !== undefined ? String(data.phone).trim() || null : existing.phone,
      industry: data?.industry !== undefined ? String(data.industry).trim() || null : existing.industry,
      companySize: data?.companySize !== undefined ? String(data.companySize).trim() || null : existing.companySize,
      address: data?.address !== undefined ? String(data.address).trim() || null : existing.address,
      city: data?.city !== undefined ? String(data.city).trim() || null : existing.city,
      country: data?.country !== undefined ? String(data.country).trim() || null : existing.country,
      notes: data?.notes !== undefined ? String(data.notes).trim() || null : existing.notes,
      ownerId: data?.ownerId !== undefined ? String(data.ownerId).trim() || null : existing.ownerId,
      ownerName: data?.ownerName !== undefined ? String(data.ownerName).trim() || null : existing.ownerName,
    },
    include: { _count: { select: { contacts: true, leads: true, deals: true } } },
  });
  await logAudit({
    actorId: data.actorId,
    actorName: data.actorName,
    action: "CLIENT_UPDATED",
    entityType: "Client",
    entityId: row.id,
    metadata: { clientName: row.companyName },
    request: data.request,
  });
  return { client: mapClient(row) };
}

export async function deleteClient(id, data = {}) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) return { error: "Client not found." };
  await prisma.company.delete({ where: { id } });
  await logAudit({
    actorId: data.actorId,
    actorName: data.actorName,
    action: "CLIENT_DELETED",
    entityType: "Client",
    entityId: id,
    metadata: { clientName: existing.companyName },
    request: data.request,
  });
  return { ok: true };
}
