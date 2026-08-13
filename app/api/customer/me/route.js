import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { customerToPublic } from "@/lib/customer/auth";

export async function GET(request) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ ok: true, customer: customerToPublic(customer) });
}