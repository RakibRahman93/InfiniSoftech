import { NextResponse } from "next/server";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { listProjects } from "@/lib/admin/project-mgmt-service";

export async function GET(request) {
  const token = request.cookies.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const projects = await listProjects();
  return NextResponse.json({ ok: true, projects });
}