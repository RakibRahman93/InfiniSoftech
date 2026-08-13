import { NextResponse } from "next/server";
import { addLeadReply, updateLeadStatus } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";
import { serverEmitLeadChat } from "@/lib/supabase/chat-server";

export async function POST(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { message, type } = body ?? {};
  const isDraft = type === "draft";

  const result = await addLeadReply({
    leadId: id,
    body: message,
    direction: "outgoing",
    type: isDraft ? "draft" : "sent",
  });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // When the admin sends (not drafts), move the lead to "Contacted" (unless already further along).
  if (!isDraft) {
    await updateLeadStatus(id, "Contacted");
  }

  // Notify the customer dashboard in real time so the thread updates instantly.
  void serverEmitLeadChat(id, {
    leadId: id,
    direction: "outgoing",
    reply: result.reply,
  });

  return NextResponse.json({ ok: true, ...result });
}