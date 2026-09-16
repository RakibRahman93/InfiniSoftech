import { NextResponse } from "next/server";
import { listFaqs, createFaq, deleteFaq } from "@/lib/admin/faqs-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json(await listFaqs());
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { question, answer } = body ?? {};
  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }
  const result = await createFaq({ question, answer });
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing faq id." }, { status: 400 });
  const result = await deleteFaq(id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}