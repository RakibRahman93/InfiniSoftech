import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/customer/session-helper";
import { listCustomerProjects } from "@/lib/customer/projects-service";

export async function GET(request) {
  const customer = await requireCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const projects = await listCustomerProjects(customer.email);
  return NextResponse.json({ ok: true, projects });
}