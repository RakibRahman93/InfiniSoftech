import { NextResponse } from "next/server";
import { updateDeal, deleteDeal } from "@/lib/admin/deals-service";

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const result = await updateDeal(params.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ deal: result.deal });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to update deal." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const result = await deleteDeal(params.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete deal." }, { status: 500 });
  }
}
