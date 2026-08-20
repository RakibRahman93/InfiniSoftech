import { cookies } from "next/headers";
import { prisma, hasPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/session-helper";
import { getCustomerByToken } from "@/lib/customer/auth";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { publishNotification } from "@/lib/realtime/notifications";

export async function getNotificationIdentity() {
  const store = cookies();

  if (store.get("admin_session")?.value && (await requireAdmin())) {
    return { role: "ADMIN", userId: null };
  }

  const customerToken = store.get("customer_session")?.value;
  if (customerToken) {
    const customer = await getCustomerByToken(customerToken);
    if (customer) return { role: "CUSTOMER", userId: customer.id };
  }

  const devToken = store.get("dev_session")?.value;
  if (devToken) {
    const user = await isDeveloperSessionValid(devToken);
    if (user) return { role: "DEVELOPER", userId: user.id };
  }

  return null;
}

function scopeWhere({ role, userId }) {
  if (role === "ADMIN") return { role: "ADMIN", userId: null };
  return { role, userId };
}

export async function listNotifications(identity, { unreadOnly = false, limit = 30 } = {}) {
  if (!identity || !hasPrisma()) return [];
  try {
    return await prisma.notification.findMany({
      where: {
        ...scopeWhere(identity),
        ...(unreadOnly ? { isRead: false } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getUnreadNotificationCount(identity) {
  if (!identity || !hasPrisma()) return 0;
  try {
    return await prisma.notification.count({
      where: { ...scopeWhere(identity), isRead: false },
    });
  } catch {
    return 0;
  }
}

export async function markNotificationAsRead(id, identity) {
  if (!identity || !hasPrisma()) return false;
  try {
    await prisma.notification.updateMany({
      where: { id, ...scopeWhere(identity) },
      data: { isRead: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function markAllNotificationsAsRead(identity) {
  if (!identity || !hasPrisma()) return false;
  try {
    await prisma.notification.updateMany({
      where: { ...scopeWhere(identity), isRead: false },
      data: { isRead: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function clearNotifications(identity) {
  if (!identity || !hasPrisma()) return false;
  try {
    await prisma.notification.deleteMany({
      where: { ...scopeWhere(identity) },
    });
    return true;
  } catch {
    return false;
  }
}

export async function createNotification({
  role = "ADMIN",
  userId = null,
  type = "INFO",
  title,
  message,
  entityType,
  entityId,
  link,
  actorName,
  actorRole,
}) {
  if (!hasPrisma()) return null;
  let created = null;
  try {
    created = await prisma.notification.create({
      data: {
        role,
        userId: role === "ADMIN" ? null : userId,
        type,
        title,
        message,
        entityType: entityType || null,
        entityId: entityId || null,
        link: link || null,
        actorName: actorName || null,
        actorRole: actorRole || null,
      },
    });
  } catch {
    created = null;
  }

  if (created) {
    await publishNotification({
      role: created.role,
      userId: created.userId,
      notification: {
        id: created.id,
        role: created.role,
        userId: created.userId,
        type: created.type,
        title: created.title,
        message: created.message,
        entityType: created.entityType,
        entityId: created.entityId,
        link: created.link,
        actorName: created.actorName,
        actorRole: created.actorRole,
        isRead: created.isRead,
        createdAt: created.createdAt,
      },
    });
  }

  return created;
}