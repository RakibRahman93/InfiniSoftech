import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const MILESTONE_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "BLOCKED"];

function mapMilestone(m) {
  return {
    id: m.id,
    name: m.name,
    description: m.description ?? "",
    projectId: m.projectId,
    projectName: m.project?.name ?? "",
    status: m.status,
    startDate: m.startDate ? m.startDate.toISOString() : null,
    dueDate: m.dueDate ? m.dueDate.toISOString() : null,
    completedAt: m.completedAt ? m.completedAt.toISOString() : null,
    order: m.order,
    progress: m.progress,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt,
    taskCount: m._count?.tasks ?? 0,
  };
}

export async function listMilestones({ projectId, status, search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    ...(projectId ? { projectId } : {}),
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const rows = await prisma.milestone.findMany({
    where,
    orderBy: [{ order: "asc" }, { dueDate: "asc" }],
    include: {
      project: { select: { name: true } },
      _count: { select: { tasks: true } },
    },
  });
  return rows.map(mapMilestone);
}

export async function createMilestone(data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const name = String(data?.name ?? "").trim();
  if (!name) return { error: "Milestone name is required." };
  if (!data?.projectId) return { error: "Project is required." };

  const milestone = await prisma.milestone.create({
    data: {
      name,
      description: data?.description || null,
      projectId: data.projectId,
      status: data?.status || "NOT_STARTED",
      order: data?.order ? Number(data.order) : 0,
      progress: data?.progress ? Number(data.progress) : 0,
      dueDate: data?.dueDate ? new Date(data.dueDate) : null,
    },
    include: { project: { select: { name: true } } },
  });

  await logAudit({
    actorId,
    action: "MILESTONE_CREATED",
    entityType: "Milestone",
    entityId: milestone.id,
    metadata: { name, projectId: data.projectId },
  });
  return { milestone: mapMilestone(milestone) };
}

export async function updateMilestone(id, data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.milestone.findUnique({ where: { id } });
  if (!existing) return { error: "Milestone not found." };

  const updates = {};
  if (data.name !== undefined) updates.name = String(data.name).trim();
  if (data.description !== undefined) updates.description = data.description || null;
  if (data.status !== undefined) {
    updates.status = data.status;
    if (data.status === "COMPLETED" && !existing.completedAt) updates.completedAt = new Date();
  }
  if (data.progress !== undefined) updates.progress = Math.max(0, Math.min(100, Number(data.progress)));
  if (data.order !== undefined) updates.order = Number(data.order);
  if (data.dueDate !== undefined) updates.dueDate = data.dueDate ? new Date(data.dueDate) : null;

  const milestone = await prisma.milestone.update({
    where: { id },
    data: updates,
    include: { project: { select: { name: true } } },
  });

  await logAudit({
    actorId,
    action: "MILESTONE_UPDATED",
    entityType: "Milestone",
    entityId: id,
    metadata: { name: milestone.name, ...updates },
  });
  return { milestone: mapMilestone(milestone) };
}

export async function deleteMilestone(id, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.milestone.findUnique({ where: { id } });
  if (!existing) return { error: "Milestone not found." };
  await prisma.milestone.delete({ where: { id } });
  await logAudit({
    actorId,
    action: "MILESTONE_DELETED",
    entityType: "Milestone",
    entityId: id,
    metadata: { name: existing.name },
  });
  return { ok: true };
}
