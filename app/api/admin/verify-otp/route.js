import { NextResponse } from "next/server";
import { verifyOtp, sessionValue } from "@/lib/admin/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, code } = body ?? {};

  const ok = await verifyOtp(email, code);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Invalid or expired verification code." },
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