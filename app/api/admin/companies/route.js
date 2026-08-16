import { NextResponse } from "next/server";
import { prisma, hasPrisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    if (!hasPrisma()) return NextResponse.json({ companies: [] });
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const where = search ? {
      OR: [
        { companyName: { contains: search, mode: "insensitive" } },
        { industry: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
      ]
    } : {};
    const companies = await prisma.company.findMany({
      where,
      orderBy: { companyName: "asc" },
      include: { _count: { select: { contacts: true, leads: true } } },
    });
    return NextResponse.json({ companies });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load companies." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!hasPrisma()) return NextResponse.json({ error: "Database not configured." }, { status: 503 });
    if (!String(body?.companyName ?? "").trim()) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    const company = await prisma.company.create({ data: {
      companyName: String(body.companyName).trim(),
      website: body.website || null,
      email: body.email || null,
      phone: body.phone || null,
      industry: body.industry || null,
      companySize: body.companySize || null,
      address: body.address || null,
      city: body.city || null,
      country: body.country || null,
      notes: body.notes || null,
    }});
    return NextResponse.json({ company });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create company." }, { status: 500 });
  }
}
