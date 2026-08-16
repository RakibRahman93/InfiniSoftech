import { NextResponse } from "next/server";
import { listProjectFiles, uploadProjectFile } from "@/lib/project-files-service";
import { getAdminActor } from "../../../helpers";

export async function GET(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const files = await listProjectFiles(id);
  return NextResponse.json({ ok: true, files });
}

export async function POST(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadProjectFile({
    projectId: id,
    buffer,
    originalname: file.name,
    mimetype: file.type,
    size: file.size,
    actor: { id: actor.meta.actorId, name: "Admin", request },
  });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, file: result.file });
}