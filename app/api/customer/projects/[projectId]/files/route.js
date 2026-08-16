import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { customerOwnsProject } from "@/lib/customer/projects-service";
import { listProjectFiles } from "@/lib/project-files-service";

export async function GET(request, { params }) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { projectId } = await params;
  if (!(await customerOwnsProject(projectId, customer.email))) {
    return NextResponse.json({ ok: false, error: "Project not found." }, { status: 404 });
  }
  const files = await listProjectFiles(projectId);
  return NextResponse.json({ ok: true, files });
}