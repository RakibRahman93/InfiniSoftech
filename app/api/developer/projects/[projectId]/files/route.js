import { NextResponse } from "next/server";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { listProjectFiles, uploadProjectFile } from "@/lib/project-files-service";

export async function GET(request, { params }) {
  const token = request.cookies.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { projectId } = await params;
  const files = await listProjectFiles(projectId);
  return NextResponse.json({ ok: true, files });
}

export async function POST(request, { params }) {
  const token = request.cookies.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { projectId } = await params;

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadProjectFile({
    projectId,
    buffer,
    originalname: file.name,
    mimetype: file.type,
    size: file.size,
    actor: { id: user.id, name: user.name, role: "DEVELOPER", request },
  });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, file: result.file });
}