import { NextResponse } from "next/server";
import { listAllProjectFiles } from "@/lib/project-files-service";
import { getAdminActor } from "../helpers";

export async function GET() {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;

  const files = await listAllProjectFiles();
  return NextResponse.json({ ok: true, files });
}
