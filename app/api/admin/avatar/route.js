import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session-helper";
import { getAdminCredentials } from "@/lib/admin/auth";
import {
  uploadAvatar,
  deleteAvatar,
  updateAvatar,
  validateAvatarFile,
} from "@/lib/avatar-service";

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { email } = getAdminCredentials();

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No image provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateAvatarFile({ buffer, mimetype: file.type });
  if (validation) return NextResponse.json({ ok: false, error: validation }, { status: 400 });

  let result;
  try {
    result = await uploadAvatar({ role: "admin", identifier: email, buffer });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not upload image." }, { status: 500 });
  }

  const saved = await updateAvatar({ role: "admin", identifier: email, avatarUrl: result.url });
  if (saved.error) return NextResponse.json({ ok: false, error: saved.error }, { status: 400 });

  return NextResponse.json({ ok: true, avatarUrl: result.url });
}

export async function DELETE() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { email } = getAdminCredentials();
  await deleteAvatar({ role: "admin", identifier: email });
  const saved = await updateAvatar({ role: "admin", identifier: email, avatarUrl: null });
  if (saved.error) return NextResponse.json({ ok: false, error: saved.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}