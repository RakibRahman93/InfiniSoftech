import { NextResponse } from "next/server";
import { listMilestones, createMilestone } from "@/lib/admin/milestone-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const milestones = await listMilestones({
      projectId: searchParams.get("projectId") || undefined,
      status: searchParams.get("status") || undefined,
      search: searchParams.get("search") || "",
    });
    return NextResponse.json({ milestones });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load milestones." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createMilestone(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ milestone: result.milestone });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to create milestone." }, { status: 500 });
  }
}
