import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { updateCustomerTaskStatus } from "@/lib/customer/projects-service";

export async function POST(request, { params }) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { projectId, taskId } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateCustomerTaskStatus({
    projectId,
    taskId,
    email: customer.email,
    customer,
    action: body?.action,
    note: body?.note,
    request,
  });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, task: result.task });
}