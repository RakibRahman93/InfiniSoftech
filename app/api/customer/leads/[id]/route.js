import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { updateCustomerLead, deleteCustomerLead } from "@/lib/customer/leads-service";
import { serverEmitLeadChat } from "@/lib/supabase/chat-server";
import { logAudit } from "@/lib/admin/audit-service";

export async function PATCH(request, { params }) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const result = await updateCustomerLead({ leadId: id, email: customer.email, data: body ?? {} });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  await logAudit({
    actorId: customer.id,
    actorName: customer.name,
    action: "LEAD_UPDATED",
    entityType: "Lead",
    entityId: id,
    metadata: { by: "customer", leadId: id },
    request,
  });

  void serverEmitLeadChat(id, {
    leadId: id,
    direction: "incoming",
    updated: true,
    customerEmail: customer.email,
  });

  return NextResponse.json({ ok: true, lead: result.lead });
}

export async function DELETE(request, { params }) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;

  const result = await deleteCustomerLead({ leadId: id, email: customer.email });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  await logAudit({
    actorId: customer.id,
    actorName: customer.name,
    action: "LEAD_DELETED",
    entityType: "Lead",
    entityId: id,
    metadata: { by: "customer", leadId: id },
    request,
  });

  void serverEmitLeadChat(id, {
    leadId: id,
    direction: "incoming",
    deleted: true,
    customerEmail: customer.email,
  });

  return NextResponse.json({ ok: true });
}