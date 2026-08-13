import { NextResponse } from "next/server";
import { deleteLead } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function DELETE(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteLead(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}