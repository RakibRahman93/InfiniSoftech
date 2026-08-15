import { NextResponse } from "next/server";
import { requireAdmin, getAdminIdentity } from "@/lib/admin/session-helper";
import { getClientIp } from "@/lib/admin/audit-service";

export async function getAdminActor() {
  if (!(await requireAdmin())) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { ok: true, meta: { actorId: getAdminIdentity() } };
}

export function requestMeta(request) {
  return { request, ipAddress: getClientIp(request) };
}