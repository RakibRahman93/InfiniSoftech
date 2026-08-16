import { NextResponse } from "next/server";
import { updateProjectFile, deleteProjectFile } from "@/lib/project-files-service";
import { getAdminActor } from "../../../../helpers";

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { fileId } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateProjectFile(fileId, {
    fileName: body?.fileName,
    actor: { id: actor.meta.actorId, name: "Admin", request },
  });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, file: result.file });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { fileId } = await params;
  const result = await deleteProjectFile(fileId, { id: actor.meta.actorId, name: "Admin", request });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}