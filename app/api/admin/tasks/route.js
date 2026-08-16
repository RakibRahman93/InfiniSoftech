import { NextResponse } from "next/server";
import { listTasks, createTask, getTaskStats } from "@/lib/admin/task-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const [tasks, stats] = await Promise.all([
      listTasks({
        projectId: searchParams.get("projectId") || undefined,
        assigneeId: searchParams.get("assigneeId") || undefined,
        status: searchParams.get("status") || undefined,
        priority: searchParams.get("priority") || undefined,
        search: searchParams.get("search") || "",
      }),
      getTaskStats(),
    ]);
    return NextResponse.json({ tasks, stats });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load tasks." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createTask(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ task: result.task });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to create task." }, { status: 500 });
  }
}
