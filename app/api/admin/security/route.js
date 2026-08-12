import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session-helper";
import { prisma, hasPrisma } from "@/lib/prisma";
import { getAdminCredentials, hashPassword, verifyPassword } from "@/lib/admin/auth";

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { email } = getAdminCredentials();

  const base = {
    email,
    otpEnabled: true,
    live: false,
    lastLogin: null,
    usingDefaultPassword: false,
  };
  if (!hasPrisma()) return NextResponse.json(base);

  let user = null;
  try {
    user = await prisma.adminUser.findUnique({ where: { email: normalizeEmail(email) } });
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ ...base, error: "Admin user not found." });

  const { password } = getAdminCredentials();
  const usingDefaultPassword = user.passwordHash && user.salt
    ? !(await verifyPassword(password, user.salt, user.passwordHash))
    : password === "infinisoftech123";

  return NextResponse.json({
    email: user.email ?? email,
    otpEnabled: user.otpEnabled !== false,
    live: true,
    lastLogin: user.lastLoginAt ?? null,
    usingDefaultPassword,
  });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!hasPrisma()) {
    return NextResponse.json({ error: "Prisma/DATABASE_URL is not configured." }, { status: 400 });
  }
  const body = await request.json().catch(() => ({}));
  const { currentPassword, newPassword, otpEnabled } = body ?? {};
  const { email } = getAdminCredentials();

  let user = null;
  try {
    user = await prisma.adminUser.findUnique({ where: { email: normalizeEmail(email) } });
  } catch {
    user = null;
  }
  if (!user) {
    return NextResponse.json({ error: "Admin user not found." }, { status: 404 });
  }

  const data = {};

  if (typeof otpEnabled === "boolean") {
    data.otpEnabled = otpEnabled;
  }

  if (typeof newPassword === "string" && newPassword) {
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 400 },
      );
    }
    if (!(await verifyPassword(currentPassword, user.salt, user.passwordHash))) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }
    const { salt, hash } = await hashPassword(newPassword);
    data.salt = salt;
    data.passwordHash = hash;

    if (typeof otpEnabled !== "boolean") {
      data.otpEnabled = false;
    }
  }

  try {
    await prisma.adminUser.update({ where: { id: user.id }, data });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

// Verify the current password alone (used by toggle UIs that need confirmation).
export async function PUT(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { password } = body ?? {};
  const { email } = getAdminCredentials();

  let user = null;
  try {
    user = await prisma.adminUser.findUnique({ where: { email: normalizeEmail(email) } });
  } catch {
    user = null;
  }
  if (!user) {
    return NextResponse.json({ error: "Admin user not found." }, { status: 404 });
  }
  const ok = await verifyPassword(password, user.salt, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Password is incorrect." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}