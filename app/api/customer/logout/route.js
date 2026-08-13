import { NextResponse } from "next/server";
import { destroySession } from "@/lib/customer/auth";

export async function POST(request) {
  const token = request.cookies.get("customer_session")?.value;
  await destroySession(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("customer_session", { path: "/" });
  return response;
}