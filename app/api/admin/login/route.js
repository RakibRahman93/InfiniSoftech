import { NextResponse } from "next/server";
import { verifyCredentials, sessionValue } from "@/lib/admin/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body ?? {};

  const ok = await verifyCredentials(email, password);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const value = await sessionValue();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}