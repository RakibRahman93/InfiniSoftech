import { NextResponse } from "next/server";
import { updateTask, deleteTask, getTask } from "@/lib/admin/task-service";

export async function GET(_, { params }) {
  try {
    const task = await getTask(params.id);
    if (!task) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ task });
  } catch {
    return NextResponse.json({ error: "Failed to load task." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const result = await updateTask(params.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ task: result.task });
  } catch {
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const result = await deleteTask(params.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete task." }, { status: 500 });
  }
}
