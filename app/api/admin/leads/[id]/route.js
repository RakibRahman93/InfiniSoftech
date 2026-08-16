import { NextResponse } from "next/server";
import { deleteLead, updateLead, getLead } from "@/lib/admin/leads-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await getLead(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ ok: true, lead: result.lead });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateLead(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.error === "Lead not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, lead: result.lead });
}

export async function DELETE(request, { params }) {
  if (!(await getAdminActor()).ok) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteLead(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}