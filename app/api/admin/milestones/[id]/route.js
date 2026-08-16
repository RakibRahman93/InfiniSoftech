import { NextResponse } from "next/server";
import { updateMilestone, deleteMilestone } from "@/lib/admin/milestone-service";

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const result = await updateMilestone(params.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ milestone: result.milestone });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to update milestone." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const result = await deleteMilestone(params.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete milestone." }, { status: 500 });
  }
}
