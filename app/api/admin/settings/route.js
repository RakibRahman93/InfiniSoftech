import { NextResponse } from "next/server";
import { listSettings, upsertSettings } from "@/lib/admin/settings-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listSettings());
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { values } = body ?? {};

  const result = await upsertSettings(values);
  if (result.error) {
    return NextResponse.json(
      { error: result.error, hint: "A settings (key, value) table is required." },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true });
}