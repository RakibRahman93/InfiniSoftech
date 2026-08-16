import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

const TE = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return toHex(bytes);
}

async function hashInput(input) {
  const digest = await crypto.subtle.digest("SHA-256", TE.encode(input));
  return toHex(digest);
}

export async function hashUserPassword(password, salt = generateSalt()) {
  const hash = await hashInput(`${salt}:${password}:infinisoftech-user`);
  return { salt, hash };
}

export async function verifyUserPassword(password, salt, storedHash) {
  if (!salt || !storedHash) return false;
  const attempt = await hashInput(`${salt}:${password}:infinisoftech-user`);
  return attempt.length === storedHash.length && attempt === storedHash;
}

export const USER_ROLES = ["SUPER_ADMIN", "ADMIN", "DEVELOPER"];

function mapUser(u) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export async function listUsers({ role, search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    ...(role ? { role } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const rows = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { assignedTasks: true } },
    },
  });
  return rows.map((u) => ({ ...mapUser(u), taskCount: u._count.assignedTasks }));
}

export async function getUser(id) {
  if (!hasPrisma()) return null;
  const u = await prisma.user.findUnique({ where: { id } });
  return u ? mapUser(u) : null;
}

export async function getUserByEmail(email) {
  if (!hasPrisma()) return null;
  return prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
}

export async function createUser(data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const name = String(data?.name ?? "").trim();
  const email = String(data?.email ?? "").trim().toLowerCase();
  const password = String(data?.password ?? "").trim();
  const role = String(data?.role ?? "DEVELOPER").trim();

  if (!name) return { error: "Name is required." };
  if (!email) return { error: "Email is required." };
  if (!password || password.length < 6) return { error: "Password must be at least 6 characters." };
  if (!USER_ROLES.includes(role)) return { error: "Invalid role." };

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "A user with this email already exists." };

    const { salt, hash } = await hashUserPassword(password);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hash, salt, role },
    });
    await logAudit({
      actorId,
      action: "USER_CREATED",
      entityType: "User",
      entityId: user.id,
      metadata: { name, email, role },
    });
    return { user: mapUser(user) };
  } catch (err) {
    return { error: err?.message || "Failed to create user." };
  }
}

export async function updateUser(id, data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return { error: "User not found." };

  const updates = {};
  if (data.name !== undefined) updates.name = String(data.name).trim();
  if (data.role !== undefined) {
    if (!USER_ROLES.includes(data.role)) return { error: "Invalid role." };
    updates.role = data.role;
  }
  if (data.isActive !== undefined) updates.isActive = Boolean(data.isActive);
  if (data.password) {
    const { salt, hash } = await hashUserPassword(data.password);
    updates.passwordHash = hash;
    updates.salt = salt;
  }

  const user = await prisma.user.update({ where: { id }, data: updates });
  await logAudit({
    actorId,
    action: "USER_UPDATED",
    entityType: "User",
    entityId: id,
    metadata: updates,
  });
  return { user: mapUser(user) };
}

export async function deleteUser(id, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return { error: "User not found." };
  await prisma.user.delete({ where: { id } });
  await logAudit({
    actorId,
    action: "USER_DELETED",
    entityType: "User",
    entityId: id,
    metadata: { name: existing.name, email: existing.email },
  });
  return { ok: true };
}

export async function getDeveloperStats() {
  if (!hasPrisma()) return [];
  const developers = await prisma.user.findMany({
    where: { role: "DEVELOPER", isActive: true },
    select: {
      id: true,
      name: true,
      email: true,
      _count: { select: { assignedTasks: true } },
      assignedTasks: {
        select: { status: true },
      },
    },
  });
  return developers.map((dev) => {
    const tasks = dev.assignedTasks;
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const overdue = 0; // Would need dueDate check
    return {
      id: dev.id,
      name: dev.name,
      email: dev.email,
      assigned: total,
      completed,
      inProgress,
      overdue,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
    };
  });
}
