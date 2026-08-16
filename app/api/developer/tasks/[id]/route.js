import { NextResponse } from "next/server";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { developerUpdateTaskStatus } from "@/lib/admin/task-service";

export async function PUT(request, { params }) {
  try {
    const token = request.cookies.get("dev_session")?.value;
    const user = await isDeveloperSessionValid(token);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const body = await request.json();
    const { status } = body ?? {};
    if (!status) return NextResponse.json({ error: "Status is required." }, { status: 400 });

    const result = await developerUpdateTaskStatus(params.id, status, user.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ task: result.task });
  } catch {
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}
