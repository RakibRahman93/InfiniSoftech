import { NextResponse } from "next/server";
import { markLeadsSeen } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await markLeadsSeen());
}