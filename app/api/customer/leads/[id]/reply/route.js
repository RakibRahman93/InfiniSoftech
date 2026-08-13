import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { addCustomerReply, listCustomerLeads } from "@/lib/customer/leads-service";
import { serverEmitLeadChat } from "@/lib/supabase/chat-server";

export async function POST(request, { params }) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { message } = body ?? {};

  const result = await addCustomerReply({ leadId: id, email: customer.email, body: message });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  // Best-effort email the admin/team on the new customer message.
  let emailError = null;
  try {
    const lead = (await listCustomerLeads(customer.email)).leads.find((l) => l.id === id);
    if (lead?.email) {
      const user = process.env.EMAIL_USER;
      const pass = process.env.EMAIL_PASS;
      if (user && pass) {
        const { default: nodemailer } = await import("nodemailer");
        const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
        await transporter.sendMail({
          from: `"Infinisoftech" <${user}>`,
          to: process.env.ADMIN_EMAIL || user,
          subject: `New message from ${lead.name || customer.name} — Infinisoftech`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:560px;padding:20px;background:#fff;border-radius:8px;border:2px solid #8876FF">
              <h2 style="background:linear-gradient(90deg,#8876FF 0%,#E75778 100%);color:#fff;padding:14px;border-radius:6px;text-align:center;margin:0 0 16px;">New enquiry message</h2>
              <p>Hi,</p>
              <p><strong>${lead.name || customer.name}</strong> (${lead.email}) replied:</p>
              <p style="background:#F8F9FB;border:1px solid #e5e5e5;border-radius:8px;padding:14px;color:#333;">${String(message).replace(/\n/g, "<br/>")}</p>
              <p style="text-align:center;color:#777;font-size:12px;">Open the admin Leads page to reply.</p>
            </div>
          `,
        });
      }
    }
  } catch (err) {
    emailError = err?.message || "Email failed";
  }

  const { leads } = await listCustomerLeads(customer.email);
  const lead = leads.find((l) => l.id === id) ?? null;

  // Fire-and-forget realtime broadcast so the admin dashboard updates instantly.
  void serverEmitLeadChat(id, {
    leadId: id,
    direction: "incoming",
    reply: result.reply,
    customerEmail: customer.email,
  });

  return NextResponse.json({ ok: true, reply: result.reply, lead, emailError });
}