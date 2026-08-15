import { NextResponse } from "next/server";
import { getCompany, updateCompany, deleteCompany } from "@/lib/admin/companies-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  if (!(await getAdminActor()).ok) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const company = await getCompany(id);
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });
  return NextResponse.json({ ok: true, company });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateCompany(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "Company not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, company: result.company });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await deleteCompany(id, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}