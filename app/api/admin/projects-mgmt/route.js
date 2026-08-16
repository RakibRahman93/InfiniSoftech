import { NextResponse } from "next/server";
import { listProjects, createProject, getProjectStats } from "@/lib/admin/project-mgmt-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const [projects, stats] = await Promise.all([
      listProjects({
        search: searchParams.get("search") || "",
        status: searchParams.get("status") || "",
        priority: searchParams.get("priority") || "",
      }),
      getProjectStats(),
    ]);
    return NextResponse.json({ projects, stats });
  } catch {
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createProject(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ project: result.project });
  } catch {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
