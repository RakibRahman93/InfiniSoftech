import { NextResponse } from "next/server";
import { verifyDeveloperCredentials, createDeveloperSession } from "@/lib/developer/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    const { user, error } = await verifyDeveloperCredentials(email, password);
    if (error || !user) {
      return NextResponse.json({ error: error || "Invalid credentials." }, { status: 401 });
    }

    const token = await createDeveloperSession(user.id);
    if (!token) {
      return NextResponse.json({ error: "Failed to create session." }, { status: 500 });
    }

    const response = NextResponse.json({ ok: true, user });
    response.cookies.set("dev_session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
