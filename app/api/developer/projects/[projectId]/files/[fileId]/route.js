import { NextResponse } from "next/server";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { updateProjectFile, deleteProjectFile } from "@/lib/project-files-service";

export async function PATCH(request, { params }) {
  const token = request.cookies.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { fileId } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateProjectFile(fileId, {
    fileName: body?.fileName,
    actor: { id: user.id, name: user.name, request },
    ownerId: user.id,
  });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, file: result.file });
}

export async function DELETE(request, { params }) {
  const token = request.cookies.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { fileId } = await params;
  const result = await deleteProjectFile(fileId, { id: user.id, name: user.name, request }, user.id);
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}