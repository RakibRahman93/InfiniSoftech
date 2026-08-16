import { NextResponse } from "next/server";
import { prisma, hasPrisma } from "@/lib/prisma";

export async function GET(_, { params }) {
  if (!hasPrisma()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  const company = await prisma.company.findUnique({ where: { id: params.id } });
  if (!company) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ company });
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    if (!hasPrisma()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
    const company = await prisma.company.update({
      where: { id: params.id },
      data: {
        companyName: String(body.companyName ?? "").trim() || undefined,
        website: body.website !== undefined ? (body.website || null) : undefined,
        email: body.email !== undefined ? (body.email || null) : undefined,
        phone: body.phone !== undefined ? (body.phone || null) : undefined,
        industry: body.industry !== undefined ? (body.industry || null) : undefined,
        companySize: body.companySize !== undefined ? (body.companySize || null) : undefined,
        address: body.address !== undefined ? (body.address || null) : undefined,
        city: body.city !== undefined ? (body.city || null) : undefined,
        country: body.country !== undefined ? (body.country || null) : undefined,
        notes: body.notes !== undefined ? (body.notes || null) : undefined,
      },
    });
    return NextResponse.json({ company });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update company." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    if (!hasPrisma()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
    await prisma.company.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete company." }, { status: 500 });
  }
}
