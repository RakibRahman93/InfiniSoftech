import { NextResponse } from "next/server";
import { updateLeadStatus } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

const VALID = ["New", "Contacted", "Qualified", "Won"];

export async function PATCH(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { status } = body ?? {};

  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const result = await updateLeadStatus(id, status);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}