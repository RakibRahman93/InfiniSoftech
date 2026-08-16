import { NextResponse } from "next/server";
import { loginCustomer, customerToPublic } from "@/lib/customer/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body ?? {};

  const result = await loginCustomer({ email, password });
  if (result.error || !result.customer) {
    return NextResponse.json({ ok: false, error: result.error || "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, customer: customerToPublic(result.customer) });
  if (result.token) {
    response.cookies.set("customer_session", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}