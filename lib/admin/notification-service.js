import { prisma, hasPrisma } from "@/lib/prisma";

export async function listNotifications({ userId, unreadOnly = false, limit = 20 } = {}) {
  if (!hasPrisma()) return [];
  try {
    const where = {
      ...(userId ? { userId } : {}),
      ...(unreadOnly ? { isRead: false } : {}),
    };
    return await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getUnreadNotificationCount(userId) {
  if (!hasPrisma()) return 0;
  try {
    return await prisma.notification.count({
      where: {
        isRead: false,
        ...(userId ? { userId } : {}),
      },
    });
  } catch {
    return 0;
  }
}

export async function createNotification({ userId, type = "INFO", title, message, entityType, entityId }) {
  if (!hasPrisma()) return null;
  try {
    return await prisma.notification.create({
      data: {
        userId: userId || null,
        type,
        title,
        message,
        entityType: entityType || null,
        entityId: entityId || null,
      },
    });
  } catch {
    return null;
  }
}

export async function markNotificationAsRead(id) {
  if (!hasPrisma()) return false;
  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function markAllNotificationsAsRead(userId) {
  if (!hasPrisma()) return false;
  try {
    await prisma.notification.updateMany({
      where: {
        isRead: false,
        ...(userId ? { userId } : {}),
      },
      data: { isRead: true },
    });
    return true;
  } catch {
    return false;
  }
}
