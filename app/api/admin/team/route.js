import { NextResponse } from "next/server";
import { listUsers, createUser, getDeveloperStats } from "@/lib/admin/user-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") || "";
    const search = searchParams.get("search") || "";
    const [users, stats] = await Promise.all([
      listUsers({ role: role || undefined, search }),
      getDeveloperStats(),
    ]);
    return NextResponse.json({ users, stats });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load team." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createUser(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ user: result.user });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to create user." }, { status: 500 });
  }
}
