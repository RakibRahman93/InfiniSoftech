import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "./audit-service";

export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "IN_REVIEW", "CLIENT_REVIEW", "REVISION_REQUIRED", "BLOCKED", "COMPLETED"];
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"];

function mapTask(t) {
  return {
    id: t.id,
    taskCode: t.taskCode ?? "",
    title: t.title,
    description: t.description ?? "",
    projectId: t.projectId,
    projectName: t.project?.name ?? "",
    milestoneId: t.milestoneId ?? "",
    milestoneName: t.milestone?.name ?? "",
    assigneeId: t.assigneeId ?? "",
    assigneeName: t.assignee?.name ?? t.assigneeName ?? "",
    createdById: t.createdById ?? "",
    createdByName: t.createdBy?.name ?? "",
    priority: t.priority,
    status: t.status,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    estimatedHours: t.estimatedHours ?? null,
    actualHours: t.actualHours ?? null,
    clientVisible: t.clientVisible,
    submissionFiles: t.submissionFiles ?? [],
    submissionNotes: t.submissionNotes ?? "",
    completedAt: t.completedAt ? t.completedAt.toISOString() : null,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

function generateTaskCode(projectCode) {
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `${projectCode || "TSK"}-${rand}`;
}

function dateOrNull(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export async function listTasks({ projectId, assigneeId, status, priority, search = "" } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    ...(projectId ? { projectId } : {}),
    ...(assigneeId ? { assigneeId } : {}),
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { taskCode: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const rows = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { name: true, projectCode: true } },
      milestone: { select: { name: true } },
      assignee: { select: { name: true } },
      createdBy: { select: { name: true } },
    },
  });
  return rows.map(mapTask);
}

export async function getTask(id) {
  if (!hasPrisma()) return null;
  const t = await prisma.task.findUnique({
    where: { id },
    include: {
      project: { select: { name: true, projectCode: true } },
      milestone: { select: { name: true } },
      assignee: { select: { name: true } },
      createdBy: { select: { name: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { author: { select: { name: true } } },
      },
    },
  });
  return t ? mapTask(t) : null;
}

export async function createTask(data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const title = String(data?.title ?? "").trim();
  if (!title) return { error: "Task title is required." };
  if (!data?.projectId) return { error: "Project is required." };

  let project = await prisma.project.findUnique({ where: { id: data.projectId } });
  if (!project) {
    const deal = await prisma.deal.findUnique({ where: { id: data.projectId } });
    if (!deal) return { error: "Project not found." };
    project = await prisma.project.create({
      data: {
        id: deal.id,
        name: deal.dealName,
        clientName: deal.clientName,
        clientEmail: deal.clientEmail,
        companyId: deal.companyId,
        status: "IN_PROGRESS",
      },
    });
  }

  const taskCode = generateTaskCode(project.projectCode);

  const task = await prisma.task.create({
    data: {
      taskCode,
      title,
      description: data?.description || null,
      projectId: data.projectId,
      milestoneId: data?.milestoneId || null,
      assigneeId: data?.assigneeId || null,
      assigneeName: data?.assigneeName || null,
      createdById: actorId || null,
      priority: data?.priority ?? "MEDIUM",
      status: data?.status ?? "TODO",
      dueDate: dateOrNull(data?.dueDate),
      estimatedHours: data?.estimatedHours ? Number(data.estimatedHours) : null,
      clientVisible: Boolean(data?.clientVisible),
    },
    include: {
      project: { select: { name: true, projectCode: true } },
      milestone: { select: { name: true } },
      assignee: { select: { name: true } },
      createdBy: { select: { name: true } },
    },
  });

  await logAudit({
    actorId,
    action: "TASK_CREATED",
    entityType: "Task",
    entityId: task.id,
    metadata: { title, projectId: data.projectId, assigneeId: data?.assigneeId, priority: task.priority },
  });

  if (task.assigneeId && task.assigneeId !== actorId) {
    const { createNotification } = await import("@/lib/notification-service");
    await createNotification({
      role: "DEVELOPER",
      userId: task.assigneeId,
      type: "TASK_ASSIGNED",
      title: `New task assigned to you`,
      message: `You were assigned "${task.title}"${task.project?.name ? ` in ${task.project.name}` : ""}.`,
      entityType: "Task",
      entityId: task.id,
      link: "/developer/dashboard/tasks",
      actorName: "Admin",
      actorRole: "ADMIN",
    });
  }

  return { task: mapTask(task) };
}

export async function updateTask(id, data, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return { error: "Task not found." };

  const updates = {};
  if (data.title !== undefined) {
    const title = String(data.title).trim();
    if (!title) return { error: "Task title is required." };
    updates.title = title;
  }
  if (data.description !== undefined) updates.description = data.description || null;
  if (data.milestoneId !== undefined) updates.milestoneId = data.milestoneId || null;
  if (data.assigneeId !== undefined) {
    updates.assigneeId = data.assigneeId || null;
    updates.assigneeName = data.assigneeName || null;
  }
  if (data.priority !== undefined) updates.priority = data.priority;
  if (data.status !== undefined) {
    if (!TASK_STATUSES.includes(data.status)) return { error: "Invalid status." };
    updates.status = data.status;
    if (data.status === "COMPLETED" && !existing.completedAt) {
      updates.completedAt = new Date();
    }
  }
  if (data.dueDate !== undefined) updates.dueDate = dateOrNull(data.dueDate);
  if (data.estimatedHours !== undefined) updates.estimatedHours = data.estimatedHours ? Number(data.estimatedHours) : null;
  if (data.actualHours !== undefined) updates.actualHours = data.actualHours ? Number(data.actualHours) : null;
  if (data.clientVisible !== undefined) updates.clientVisible = Boolean(data.clientVisible);

  const task = await prisma.task.update({
    where: { id },
    data: updates,
    include: {
      project: { select: { name: true, projectCode: true } },
      milestone: { select: { name: true } },
      assignee: { select: { name: true } },
      createdBy: { select: { name: true } },
    },
  });

  if (updates.assigneeId && updates.assigneeId !== existing.assigneeId && updates.assigneeId !== actorId) {
    const { createNotification } = await import("@/lib/notification-service");
    await createNotification({
      role: "DEVELOPER",
      userId: updates.assigneeId,
      type: "TASK_ASSIGNED",
      title: `Task assigned to you`,
      message: `You were assigned "${task.title}"${task.project?.name ? ` in ${task.project.name}` : ""}.`,
      entityType: "Task",
      entityId: task.id,
      link: "/developer/dashboard/tasks",
      actorName: "Admin",
      actorRole: "ADMIN",
    });
  }

  if (data.status && data.status !== existing.status) {
    await logAudit({
      actorId,
      action: "TASK_STATUS_CHANGED",
      entityType: "Task",
      entityId: id,
      metadata: { title: task.title, prevStatus: existing.status, newStatus: data.status },
    });
  } else {
    await logAudit({
      actorId,
      action: "TASK_UPDATED",
      entityType: "Task",
      entityId: id,
      metadata: { title: task.title, ...updates },
    });
  }

  return { task: mapTask(task) };
}

export async function deleteTask(id, actorId) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return { error: "Task not found." };
  await prisma.task.delete({ where: { id } });
  await logAudit({
    actorId,
    action: "TASK_DELETED",
    entityType: "Task",
    entityId: id,
    metadata: { title: existing.title },
  });
  return { ok: true };
}

export async function getTaskStats() {
  if (!hasPrisma()) return { todo: 0, inProgress: 0, inReview: 0, completed: 0, overdue: 0 };
  try {
    const [todo, inProgress, inReview, completed] = await Promise.all([
      prisma.task.count({ where: { status: "TODO" } }),
      prisma.task.count({ where: { status: "IN_PROGRESS" } }),
      prisma.task.count({ where: { status: "IN_REVIEW" } }),
      prisma.task.count({ where: { status: "COMPLETED" } }),
    ]);
    const overdue = await prisma.task.count({
      where: { dueDate: { lt: new Date() }, status: { notIn: ["COMPLETED", "CANCELLED"] } },
    });
    return { todo, inProgress, inReview, completed, overdue };
  } catch {
    return { todo: 0, inProgress: 0, inReview: 0, completed: 0, overdue: 0 };
  }
}

// Developer-scoped: only tasks assigned to a specific user
export async function listMyTasks(userId, { status, priority } = {}) {
  if (!hasPrisma()) return [];
  const where = {
    assigneeId: userId,
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
  };
  const rows = await prisma.task.findMany({
    where,
    orderBy: [{ priority: "desc" }, { dueDate: "asc" }],
    include: {
      project: { select: { name: true, projectCode: true } },
      milestone: { select: { name: true } },
    },
  });
  return rows.map(mapTask);
}

// Developer can only change status within allowed transitions
const DEVELOPER_ALLOWED_TRANSITIONS = {
  TODO: ["IN_PROGRESS"],
  IN_PROGRESS: ["IN_REVIEW", "BLOCKED"],
  BLOCKED: ["IN_PROGRESS"],
  IN_REVIEW: [],
  REVISION_REQUIRED: ["IN_PROGRESS"],
  CLIENT_REVIEW: [],
  COMPLETED: [],
};

export async function developerUpdateTaskStatus(taskId, newStatus, userId, submissionData = {}) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) return { error: "Task not found." };
  if (task.assigneeId !== userId) return { error: "You are not assigned to this task." };

  const allowed = DEVELOPER_ALLOWED_TRANSITIONS[task.status] ?? [];
  if (!allowed.includes(newStatus)) {
    return { error: `Cannot transition from ${task.status} to ${newStatus}.` };
  }

  // MANDATORY submission deliverables check when submitting for review
  if (newStatus === "IN_REVIEW") {
    const files = submissionData.submissionFiles ?? submissionData.files ?? [];
    if (!Array.isArray(files) || files.length === 0 || !files.some((f) => (typeof f === "string" ? f.trim() : f.url?.trim()))) {
      return { error: "At least one deliverable file (or repository/demo URL) is MANDATORY to submit task for review." };
    }
  }

  const updates = { status: newStatus };
  if (submissionData.submissionFiles || submissionData.files) {
    updates.submissionFiles = submissionData.submissionFiles ?? submissionData.files;
  }
  if (submissionData.submissionNotes !== undefined || submissionData.notes !== undefined) {
    updates.submissionNotes = submissionData.submissionNotes ?? submissionData.notes ?? null;
  }
  if (newStatus === "COMPLETED") updates.completedAt = new Date();

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: updates,
    include: { project: { select: { name: true } } },
  });

  if (newStatus === "IN_REVIEW") {
    const { createNotification } = await import("./notification-service");
    await createNotification({
      type: "APPROVAL_REQUEST",
      title: `Task Deliverables Submitted: ${task.title}`,
      message: `Task ${task.taskCode || task.title} has been submitted for review with deliverables attached.`,
      entityType: "Task",
      entityId: taskId,
    });
  }

  await logAudit({
    actorId: userId,
    action: "TASK_STATUS_CHANGED",
    entityType: "Task",
    entityId: taskId,
    metadata: { title: task.title, prevStatus: task.status, newStatus, hasFiles: !!updates.submissionFiles },
  });
  return { task: mapTask(updated) };
}
