import { NextResponse } from "next/server";
import { listClients, createClient } from "@/lib/admin/clients-service";
import { requireAdmin } from "@/lib/admin/session-helper";
import { getAdminActor, requestMeta } from "../helpers";

export async function GET(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const clients = await listClients({ search });
  return NextResponse.json({ ok: true, clients });
}

export async function POST(request) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const body = await request.json().catch(() => ({}));
  const result = await createClient({ ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, client: result.client });
}
