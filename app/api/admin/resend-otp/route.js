import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session-helper";
import { getAdminCredentials, issueOtpFor } from "@/lib/admin/auth";

export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { email } = getAdminCredentials();
  const result = await issueOtpFor(email);
  if (result.error && !result.devOtp) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    devOtp: result.devOtp,
    message: result.devOtp
      ? `Test OTP (dev): ${result.devOtp}`
      : "A fresh verification code has been sent.",
  });
}