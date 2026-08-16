import { prisma, hasPrisma } from "@/lib/prisma";
import { normalizeEmail } from "./auth";
import { logAudit } from "@/lib/admin/audit-service";

const CUSTOMER_PROJECT_STATUSES = ["ON_HOLD", "CLIENT_REVIEW", "COMPLETED", "CANCELLED"];
const REVIEWABLE_TASK_STATUSES = ["IN_REVIEW", "CLIENT_REVIEW"];

function iso(d) {
  return d ? new Date(d).toISOString() : null;
}

function mapMilestone(m) {
  return {
    id: m.id,
    name: m.name,
    description: m.description ?? "",
    status: m.status,
    order: m.order,
    progress: m.progress,
    dueDate: iso(m.dueDate),
    completedAt: iso(m.completedAt),
  };
}

function mapTask(t) {
  return {
    id: t.id,
    taskCode: t.taskCode ?? "",
    title: t.title,
    description: t.description ?? "",
    status: t.status,
    priority: t.priority,
    dueDate: iso(t.dueDate),
    completedAt: iso(t.completedAt),
  };
}

function mapProject(p) {
  const milestones = p.milestones ?? [];
  const tasks = p.tasks ?? [];
  return {
    id: p.id,
    projectCode: p.projectCode ?? "",
    name: p.name,
    description: p.description ?? "",
    clientName: p.clientName ?? "",
    status: p.status,
    priority: p.priority,
    health: p.health,
    startDate: iso(p.startDate),
    expectedEndDate: iso(p.expectedEndDate),
    actualEndDate: iso(p.actualEndDate),
    progress: p.progress,
    notes: p.notes ?? "",
    updatedAt: iso(p.updatedAt),
    milestones: milestones.map(mapMilestone),
    tasks: tasks.map(mapTask),
    completedMilestones: milestones.filter((m) => m.status === "COMPLETED").length,
    totalMilestones: milestones.length,
    completedTasks: tasks.filter((t) => t.status === "COMPLETED").length,
    totalTasks: tasks.length,
  };
}

export async function listCustomerProjects(email) {
  if (!hasPrisma()) return [];
  try {
    const rows = await prisma.project.findMany({
      where: { clientEmail: { equals: normalizeEmail(email), mode: "insensitive" } },
      orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
      include: {
        milestones: { orderBy: [{ order: "asc" }, { dueDate: "asc" }] },
        tasks: { where: { clientVisible: true }, orderBy: { createdAt: "desc" } },
      },
    });
    return rows.map(mapProject);
  } catch {
    return [];
  }
}

async function findOwnedProject(projectId, email) {
  if (!hasPrisma()) return null;
  const normalized = normalizeEmail(email);
  return prisma.project.findFirst({
    where: {
      id: projectId,
      clientEmail: { equals: normalized, mode: "insensitive" },
    },
  });
}

export async function customerOwnsProject(projectId, email) {
  return !!(await findOwnedProject(projectId, email));
}

export async function updateCustomerProjectStatus({ projectId, email, customer, status, note, request }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (!CUSTOMER_PROJECT_STATUSES.includes(status)) {
    return { error: "You are not allowed to set this status." };
  }
  const project = await findOwnedProject(projectId, email);
  if (!project) return { error: "Project not found." };

  const updates = { status };
  if (status === "COMPLETED") {
    updates.progress = 100;
    updates.actualEndDate = new Date();
  }
  const noteText = String(note ?? "").trim();
  if (noteText) {
    updates.notes = [project.notes, `[Client ${new Date().toISOString().slice(0, 10)}] ${noteText}`]
      .filter(Boolean)
      .join("\n");
  }

  const updated = await prisma.project.update({ where: { id: project.id }, data: updates });

  await logAudit({
    actorId: customer?.id,
    actorName: customer?.name,
    action: "CUSTOMER_PROJECT_STATUS_UPDATED",
    entityType: "Project",
    entityId: project.id,
    metadata: { status, note: noteText || null, prevStatus: project.status },
    request,
  });
  return { ok: true, project: { id: updated.id, status: updated.status } };
}

export async function updateCustomerTaskStatus({ projectId, taskId, email, customer, action, note, request }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (action !== "approve" && action !== "revision") {
    return { error: "Invalid action." };
  }
  const project = await findOwnedProject(projectId, email);
  if (!project) return { error: "Project not found." };

  const task = await prisma.task.findFirst({
    where: { id: taskId, projectId, clientVisible: true },
  });
  if (!task) return { error: "Task not found." };
  if (!REVIEWABLE_TASK_STATUSES.includes(task.status)) {
    return { error: "This task is not currently awaiting your review." };
  }

  const updates = {};
  if (action === "approve") {
    updates.status = "COMPLETED";
    updates.completedAt = new Date();
  } else {
    updates.status = "REVISION_REQUIRED";
  }
  const noteText = String(note ?? "").trim();
  if (noteText) updates.submissionNotes = noteText;

  const updated = await prisma.task.update({ where: { id: task.id }, data: updates });

  await logAudit({
    actorId: customer?.id,
    actorName: customer?.name,
    action: action === "approve" ? "CUSTOMER_TASK_APPROVED" : "CUSTOMER_TASK_REVISION_REQUESTED",
    entityType: "Task",
    entityId: task.id,
    metadata: { projectId, taskCode: task.taskCode, note: noteText || null, prevStatus: task.status },
    request,
  });
  return { ok: true, task: { id: updated.id, status: updated.status } };
}

export async function updateCustomerMilestoneStatus({ projectId, milestoneId, email, customer, action, request }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (action !== "complete" && action !== "reopen") {
    return { error: "Invalid action." };
  }
  const project = await findOwnedProject(projectId, email);
  if (!project) return { error: "Project not found." };

  const milestone = await prisma.milestone.findFirst({
    where: { id: milestoneId, projectId },
  });
  if (!milestone) return { error: "Milestone not found." };
  if (action === "complete" && milestone.status === "COMPLETED") {
    return { error: "This milestone is already completed." };
  }

  const updates =
    action === "complete"
      ? { status: "COMPLETED", progress: 100, completedAt: new Date() }
      : { status: "IN_PROGRESS", progress: 0, completedAt: null };

  const updated = await prisma.milestone.update({ where: { id: milestone.id }, data: updates });

  await logAudit({
    actorId: customer?.id,
    actorName: customer?.name,
    action: action === "complete" ? "CUSTOMER_MILESTONE_COMPLETED" : "CUSTOMER_MILESTONE_REOPENED",
    entityType: "Milestone",
    entityId: milestone.id,
    metadata: { projectId, prevStatus: milestone.status },
    request,
  });
  return { ok: true, milestone: { id: updated.id, status: updated.status } };
}