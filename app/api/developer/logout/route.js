import { NextResponse } from "next/server";
import { invalidateDeveloperSession } from "@/lib/developer/auth";

export async function POST(request) {
  const token = request.cookies.get("dev_session")?.value;
  await invalidateDeveloperSession(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("dev_session", "", { maxAge: 0, path: "/" });
  return response;
}
