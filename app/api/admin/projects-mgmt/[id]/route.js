import { NextResponse } from "next/server";
import { getProject, updateProject, deleteProject } from "@/lib/admin/project-mgmt-service";

export async function GET(_, { params }) {
  const project = await getProject(params.id);
  if (!project) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const result = await updateProject(params.id, body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ project: result.project });
  } catch {
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const result = await deleteProject(params.id);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
