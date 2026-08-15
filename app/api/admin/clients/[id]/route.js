import { NextResponse } from "next/server";
import { getClient, updateClient, deleteClient } from "@/lib/admin/clients-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  if (!(await getAdminActor()).ok) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const client = await getClient(id);
  if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });
  return NextResponse.json({ ok: true, client });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateClient(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "Client not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, client: result.client });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await deleteClient(id, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
