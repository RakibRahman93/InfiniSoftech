import { NextResponse } from "next/server";
import { getNewLeadCount } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await getNewLeadCount());
}