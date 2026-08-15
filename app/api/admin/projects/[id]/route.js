import { NextResponse } from "next/server";
import { getProject, updateProject, deleteProject, setProjectStage } from "@/lib/admin/projects-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ ok: true, project });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateProject(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "Project not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, project: result.project });
}

export async function POST(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { stage } = body ?? {};
  if (!stage) {
    return NextResponse.json({ ok: false, error: "Stage is required." }, { status: 400 });
  }
  const result = await setProjectStage(id, stage, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, project: result.project });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await deleteProject(id, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
