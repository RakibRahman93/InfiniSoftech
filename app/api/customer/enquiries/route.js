import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { prisma, hasPrisma } from "@/lib/prisma";
import { serverEmitLeadChat } from "@/lib/supabase/chat-server";

export async function POST(request) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = String(body?.name ?? customer.name ?? "").trim();
  const email = String(body?.email ?? customer.email ?? "").trim().toLowerCase();
  const phone = String(body?.phone ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const service = String(body?.service ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, phone, and message are required." }, { status: 400 });
  }

  if (!hasPrisma()) {
    return NextResponse.json({ ok: false, error: "Enquiries are not available yet (DATABASE_URL not configured)." }, { status: 400 });
  }

  try {
    let companyId = null;
    const companyName = String(company ?? "").trim();
    if (companyName) {
      const existingCompany = await prisma.company.findFirst({
        where: { companyName: { equals: companyName, mode: "insensitive" } },
      });
      if (existingCompany) {
        companyId = existingCompany.id;
      } else {
        const created = await prisma.company.create({ data: { companyName } });
        companyId = created.id;
      }
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        companyId,
        service: service || null,
        subject: subject || null,
        message,
        source: "Customer dashboard",
        status: "New",
      },
    });

    // Let the admin dashboard know a new lead just arrived.
    void serverEmitLeadChat(lead.id, {
      leadId: lead.id,
      direction: "incoming",
      created: true,
      customerEmail: email,
    });

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error?.message || "Could not create enquiry." }, { status: 400 });
  }
}