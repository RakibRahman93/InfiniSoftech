import { NextResponse } from "next/server";
import { addLeadReply, updateLeadStatus } from "@/lib/admin/leads-service";
import { requireAdmin } from "@/lib/admin/session-helper";

async function sendReplyEmail({ email, name, subject, body }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return "Email is not configured (EMAIL_USER/EMAIL_PASS).";

  try {
    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Infinisoftech" <${user}>`,
      to: email,
      subject: `Re: ${subject || "Your enquiry"} — Infinisoftech`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;padding:20px;background:#fff;border-radius:8px;border:2px solid #8876FF">
          <h2 style="background:linear-gradient(90deg,#8876FF 0%,#E75778 100%);color:#fff;padding:14px;border-radius:6px;text-align:center;margin:0 0 16px;">Infinisoftech</h2>
          <p>Hi ${name || "there"},</p>
          <p>${body.replace(/\n/g, "<br/>")}</p>
          <hr style="border:1px solid #8876FF;margin:20px 0;"/>
          <p style="text-align:center;color:#777;font-size:12px;">Thank you for reaching out to Infinisoftech.</p>
        </div>
      `,
    });
    return null;
  } catch (err) {
    return err?.message || "Failed to send reply email.";
  }
}

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

  const lead = await fetchLead(id);

  // Best-effort email to the lead. If email is not configured, the reply is still stored.
  let emailError = null;
  if (!isDraft && lead?.email) {
    emailError = await sendReplyEmail({
      email: lead.email,
      name: lead.name,
      subject: lead.subject,
      body: message,
    });
  }

  return NextResponse.json({ ok: true, ...result, emailError });
}

async function fetchLead(id) {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    return await prisma.lead.findUnique({ where: { id } });
  } catch {
    return null;
  }
}