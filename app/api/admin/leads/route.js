import { NextResponse } from "next/server";
import { listLeads, deleteLeads, createLead } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";
import { getAdminActor, requestMeta } from "../helpers";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listLeads());
}

export async function POST(request) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const body = await request.json().catch(() => ({}));
  const result = await createLead({ ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, lead: result.lead });
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