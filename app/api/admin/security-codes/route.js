import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session-helper";
import {
  listSecurityCodes,
  createSecurityCode,
  updateSecurityCode,
  deleteSecurityCode,
} from "@/lib/admin/security-codes-service";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listSecurityCodes());
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { label, code } = body ?? {};
  if (!code) {
    return NextResponse.json({ error: "Verification code is required." }, { status: 400 });
  }
  const result = await createSecurityCode({ label, code });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result, { status: 201 });
}

export async function PUT(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { id, label, active, code } = body ?? {};
  if (!id) {
    return NextResponse.json({ error: "Missing code id." }, { status: 400 });
  }
  const result = await updateSecurityCode({ id, label, active, code });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing code id." }, { status: 400 });
  }
  const result = await deleteSecurityCode(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}