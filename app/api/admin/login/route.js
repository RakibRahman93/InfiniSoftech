import { NextResponse } from "next/server";
import { verifyCredentials, sessionValue } from "@/lib/admin/auth";
import { getClientIp, isIpBlocked, isGateTokenValid } from "@/lib/admin/security-gate";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body ?? {};

  const ip = getClientIp(request);
  if (await isIpBlocked(ip)) {
    return NextResponse.json(
      { ok: false, error: "Your IP has been blocked. Try again later." },
      { status: 429 },
    );
  }

  const gate = request.cookies.get("admin_gate")?.value;
  if (!(await isGateTokenValid(gate, ip))) {
    return NextResponse.json(
      { ok: false, error: "Security code required before login." },
      { status: 401 },
    );
  }

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
  response.cookies.delete("admin_gate", { path: "/" });
  return response;
}