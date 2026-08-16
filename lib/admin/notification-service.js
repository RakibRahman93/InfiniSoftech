import {
  listNotifications as listFor,
  getUnreadNotificationCount as unreadFor,
  createNotification as create,
  markNotificationAsRead as markRead,
  markAllNotificationsAsRead as markAllRead,
} from "@/lib/notification-service";

const ADMIN_IDENTITY = { role: "ADMIN", userId: null };

export async function listNotifications(options) {
  return listFor(ADMIN_IDENTITY, options);
}

export async function getUnreadNotificationCount() {
  return unreadFor(ADMIN_IDENTITY);
}

export async function createNotification(data) {
  return create({ ...data, role: "ADMIN", userId: null });
}

export async function markNotificationAsRead(id) {
  return markRead(id, ADMIN_IDENTITY);
}

export async function markAllNotificationsAsRead() {
  return markAllRead(ADMIN_IDENTITY);
}