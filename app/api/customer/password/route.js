import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { changePassword, customerToPublic } from "@/lib/customer/auth";

export async function POST(request) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { currentPassword, newPassword } = body ?? {};

  const result = await changePassword({ customer, currentPassword, newPassword });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const response = NextResponse.json({
    ok: true,
    customer: customerToPublic(customer),
    token: result.token ?? null,
  });
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