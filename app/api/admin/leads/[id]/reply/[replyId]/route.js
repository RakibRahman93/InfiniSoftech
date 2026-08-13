import { NextResponse } from "next/server";
import { deleteLeadReply } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function DELETE(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id, replyId } = await params;
  const result = await deleteLeadReply({ leadId: id, replyId });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}