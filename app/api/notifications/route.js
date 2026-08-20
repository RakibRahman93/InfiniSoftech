import { NextResponse } from "next/server";
import {
  getNotificationIdentity,
  listNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
} from "@/lib/notification-service";

export const dynamic = "force-dynamic";

export async function GET() {
  const identity = await getNotificationIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const [notifications, unreadCount] = await Promise.all([
    listNotifications(identity),
    getUnreadNotificationCount(identity),
  ]);
  return NextResponse.json({ notifications, unreadCount });
}

export async function PUT(request) {
  const identity = await getNotificationIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    if (body.all) {
      await markAllNotificationsAsRead(identity);
      return NextResponse.json({ ok: true });
    }
    if (body.id) {
      await markNotificationAsRead(body.id, identity);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to update notifications." }, { status: 500 });
  }
}

export async function DELETE() {
  const identity = await getNotificationIdentity();
  if (!identity) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await clearNotifications(identity);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to clear notifications." }, { status: 500 });
  }
}