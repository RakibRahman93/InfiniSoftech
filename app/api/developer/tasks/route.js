import { NextResponse } from "next/server";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { listMyTasks } from "@/lib/admin/task-service";

export async function GET(request) {
  try {
    const token = request.cookies.get("dev_session")?.value;
    const user = await isDeveloperSessionValid(token);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const tasks = await listMyTasks(user.id, {
      status: searchParams.get("status") || undefined,
      priority: searchParams.get("priority") || undefined,
    });
    return NextResponse.json({ tasks, user });
  } catch {
    return NextResponse.json({ error: "Failed to load tasks." }, { status: 500 });
  }
}
