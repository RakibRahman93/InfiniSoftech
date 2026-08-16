import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const PROJECT_STATUSES = [
  "PLANNING", "NOT_STARTED", "IN_PROGRESS", "ON_HOLD",
  "IN_REVIEW", "CLIENT_REVIEW", "REVISION_REQUIRED",
  "TESTING", "DEPLOYMENT", "COMPLETED", "CANCELLED",
];

export const PROJECT_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"];
export const PROJECT_HEALTH = ["HEALTHY", "AT_RISK", "DELAYED"];

function formatDate(d) {
  if (!d) return null;
  return d instanceof Date ? d.toISOString() : d;
}

function mapProject(p) {
  return {
    id: p.id,
    projectCode: p.projectCode ?? "",
    name: p.name,
    description: p.description ?? "",
    clientId: p.clientId ?? "",
    clientName: p.clientName ?? "",
    clientEmail: p.clientEmail ?? "",
    companyId: p.companyId ?? "",
    companyName: p.companyName ?? "",
    projectManagerId: p.projectManagerId ?? "",
    projectManagerName: p.projectManager?.name ?? "",
    status: p.status,
    priority: p.priority,
    health: p.health,
    startDate: formatDate(p.startDate),
    expectedEndDate: formatDate(p.expectedEndDate),
    actualEndDate: formatDate(p.actualEndDate),
    budget: p.budget ?? null,
    progress: p.progress,
    notes: p.notes ?? "",
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    taskCount: p._count?.tasks ?? 0,
    milestoneCount: p._count?.milestones ?? 0,
  };
}

function valueOrNull(v) {
  const s = String(v ?? "").trim();
  return s === "" ? null : v;
}

function dateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export async function listProjects({ search = "", status = "", priority = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { projectCode: { contains: search, mode: "insensitive" } },
            { clientName: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const rows = await prisma.project.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    include: {
      projectManager: { select: { name: true } },
      _count: { select: { tasks: true, milestones: true } },
    },
  });
  return rows.map(mapProject);
}

export async function getProject(id) {
  if (!hasPrisma()) return null;
  const p = await prisma.project.findUnique({
    where: { id },
    include: {
      projectManager: { select: { name: true } },
      milestones: { orderBy: { order: "asc" } },
      tasks: {
        orderBy: { createdAt: "desc" },
        include: { assignee: { select: { name: true } } },
      },
      _count: { select: { tasks: true, milestones: true } },
    },
  });
  return p ? mapProject(p) : null;
}

function generateProjectCode() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `PRJ-${year}${month}-${rand}`;
}

export async function createProject(data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const name = String(data?.name ?? "").trim();
  if (!name) return { error: "Project name is required." };

  const status = data?.status ?? "PLANNING";
  if (!PROJECT_STATUSES.includes(status)) return { error: "Invalid status." };

  let projectCode = data?.projectCode || generateProjectCode();
  // Ensure uniqueness
  const codeExists = await prisma.project.findUnique({ where: { projectCode } });
  if (codeExists) projectCode = generateProjectCode();

  const project = await prisma.project.create({
    data: {
      projectCode,
      name,
      description: valueOrNull(data?.description),
      clientId: valueOrNull(data?.clientId),
      clientName: valueOrNull(data?.clientName),
      clientEmail: valueOrNull(data?.clientEmail),
      companyId: valueOrNull(data?.companyId),
      companyName: valueOrNull(data?.companyName),
      projectManagerId: valueOrNull(data?.projectManagerId),
      status,
      priority: data?.priority ?? "MEDIUM",
      health: data?.health ?? "HEALTHY",
      startDate: dateOrNull(data?.startDate),
      expectedEndDate: dateOrNull(data?.expectedEndDate),
      budget: data?.budget ? Number(data.budget) : null,
      notes: valueOrNull(data?.notes),
    },
    include: {
      projectManager: { select: { name: true } },
      _count: { select: { tasks: true, milestones: true } },
    },
  });

  await logAudit({
    actorId,
    action: "PROJECT_CREATED",
    entityType: "Project",
    entityId: project.id,
    metadata: { name: project.name, projectCode: project.projectCode, status: project.status },
  });
  return { project: mapProject(project) };
}

export async function updateProject(id, data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };

  const updates = {};
  if (data.name !== undefined) {
    const name = String(data.name).trim();
    if (!name) return { error: "Project name is required." };
    updates.name = name;
  }
  if (data.description !== undefined) updates.description = valueOrNull(data.description);
  if (data.clientId !== undefined) updates.clientId = valueOrNull(data.clientId);
  if (data.clientName !== undefined) updates.clientName = valueOrNull(data.clientName);
  if (data.clientEmail !== undefined) updates.clientEmail = valueOrNull(data.clientEmail);
  if (data.companyId !== undefined) updates.companyId = valueOrNull(data.companyId);
  if (data.companyName !== undefined) updates.companyName = valueOrNull(data.companyName);
  if (data.projectManagerId !== undefined) updates.projectManagerId = valueOrNull(data.projectManagerId);
  if (data.status !== undefined) {
    if (!PROJECT_STATUSES.includes(data.status)) return { error: "Invalid status." };
    updates.status = data.status;
  }
  if (data.priority !== undefined) updates.priority = data.priority;
  if (data.health !== undefined) updates.health = data.health;
  if (data.startDate !== undefined) updates.startDate = dateOrNull(data.startDate);
  if (data.expectedEndDate !== undefined) updates.expectedEndDate = dateOrNull(data.expectedEndDate);
  if (data.actualEndDate !== undefined) updates.actualEndDate = dateOrNull(data.actualEndDate);
  if (data.budget !== undefined) updates.budget = data.budget ? Number(data.budget) : null;
  if (data.progress !== undefined) updates.progress = Math.max(0, Math.min(100, Number(data.progress)));
  if (data.notes !== undefined) updates.notes = valueOrNull(data.notes);

  const project = await prisma.project.update({
    where: { id },
    data: updates,
    include: {
      projectManager: { select: { name: true } },
      _count: { select: { tasks: true, milestones: true } },
    },
  });

  await logAudit({
    actorId,
    action: "PROJECT_UPDATED",
    entityType: "Project",
    entityId: id,
    metadata: { ...updates, prevStatus: existing.status },
  });
  return { project: mapProject(project) };
}

export async function deleteProject(id, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return { error: "Project not found." };
  await prisma.project.delete({ where: { id } });
  await logAudit({
    actorId,
    action: "PROJECT_DELETED",
    entityType: "Project",
    entityId: id,
    metadata: { name: existing.name },
  });
  return { ok: true };
}

export async function getProjectStats() {
  if (!hasPrisma()) return { active: 0, completed: 0, atRisk: 0, planning: 0 };
  try {
    const [active, completed, atRisk, planning] = await Promise.all([
      prisma.project.count({ where: { status: "IN_PROGRESS" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.project.count({ where: { health: "AT_RISK" } }),
      prisma.project.count({ where: { status: "PLANNING" } }),
    ]);
    return { active, completed, atRisk, planning };
  } catch {
    return { active: 0, completed: 0, atRisk: 0, planning: 0 };
  }
}
