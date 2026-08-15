import { NextResponse } from "next/server";
import { getContact, updateContact, deleteContact } from "@/lib/admin/contacts-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const contact = await getContact(id);
  if (!contact) return NextResponse.json({ error: "Contact not found." }, { status: 404 });
  return NextResponse.json({ ok: true, contact });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateContact(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "Contact not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, contact: result.contact });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await deleteContact(id, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}