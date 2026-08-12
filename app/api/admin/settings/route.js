import { NextResponse } from "next/server";
import { getDbSafe } from "@/lib/admin/settings-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const db = await getDbSafe();
  if (!db) return NextResponse.json({ values: {}, live: false });

  const { data, error } = await db.from("settings").select("*");
  if (error) return NextResponse.json({ values: {}, live: false });

  const values = {};
  for (const row of data ?? []) values[row.key] = row.value;
  return NextResponse.json({ values, live: true });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { values } = body ?? {};

  const db = await getDbSafe();
  if (!db) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 400 });
  }

  const rows = Object.entries(values ?? {}).map(([key, value]) => ({ key, value }));
  const { error } = await db.from("settings").upsert(rows, { onConflict: "key" });
  if (error) {
    return NextResponse.json(
      { error: error.message, hint: "Create a settings (key, value) table to persist." },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true });
}