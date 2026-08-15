import { NextResponse } from "next/server";
import { getDeal, updateDeal, deleteDeal, setDealStage } from "@/lib/admin/deals-service";
import { getAdminActor, requestMeta } from "../../helpers";

export async function GET(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const deal = await getDeal(id);
  if (!deal) return NextResponse.json({ error: "Deal not found." }, { status: 404 });
  return NextResponse.json({ ok: true, deal });
}

export async function PATCH(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const result = await updateDeal(id, { ...body, ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "Deal not found." ? 404 : 400 });
  }
  return NextResponse.json({ ok: true, deal: result.deal });
}

export async function POST(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { stage } = body ?? {};
  if (!stage) {
    return NextResponse.json({ ok: false, error: "Stage is required." }, { status: 400 });
  }
  const result = await setDealStage(id, stage, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, deal: result.deal });
}

export async function DELETE(request, { params }) {
  const actor = await getAdminActor();
  if (!actor.ok) return actor.res;
  const { id } = await params;
  const result = await deleteDeal(id, { ...actor.meta, ...requestMeta(request) });
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}