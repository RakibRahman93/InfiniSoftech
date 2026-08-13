import { NextResponse } from "next/server";
import { listLeads, deleteLeads } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listLeads());
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { ids } = body ?? {};
  const result = await deleteLeads(ids);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, count: result.count });
}