import { NextResponse } from "next/server";
import { getClientIp, verifySecurityGate, gateTokenValue } from "@/lib/admin/security-gate";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { code } = body ?? {};
  const ip = getClientIp(request);

  if (!code || !String(code).trim()) {
    return NextResponse.json({ ok: false, error: "Enter a security code." }, { status: 400 });
  }

  const result = await verifySecurityGate(String(code).trim(), ip);

  if (!result.ok) {
    const status = result.blocked ? 429 : 401;
    const payload = { ok: false, error: result.error };
    if (typeof result.attemptsLeft === "number" && !result.blocked) {
      payload.attemptsLeft = result.attemptsLeft;
    }
    if (result.blocked) payload.blocked = true;
    return NextResponse.json(payload, { status });
  }

  const token = await gateTokenValue();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_gate", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15,
  });
  return response;
}
