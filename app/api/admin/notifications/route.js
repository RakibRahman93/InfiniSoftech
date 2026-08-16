import { NextResponse } from "next/server";
import { listNotifications, markNotificationAsRead, markAllNotificationsAsRead, getUnreadNotificationCount } from "@/lib/admin/notification-service";

export async function GET() {
  try {
    const [notifications, unreadCount] = await Promise.all([
      listNotifications(),
      getUnreadNotificationCount(),
    ]);
    return NextResponse.json({ notifications, unreadCount });
  } catch {
    return NextResponse.json({ error: "Failed to load notifications." }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (body.all) {
      await markAllNotificationsAsRead();
      return NextResponse.json({ ok: true });
    }
    if (body.id) {
      await markNotificationAsRead(body.id);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to update notifications." }, { status: 500 });
  }
}
