import { NextResponse } from "next/server";
import { listDeals, createDeal, getDealsSummary } from "@/lib/admin/deals-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const [deals, summary] = await Promise.all([
      listDeals({
        search: searchParams.get("search") || "",
        stage: searchParams.get("stage") || "",
      }),
      getDealsSummary(),
    ]);
    return NextResponse.json({ deals, summary });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load deals." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createDeal(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ deal: result.deal });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to create deal." }, { status: 500 });
  }
}
