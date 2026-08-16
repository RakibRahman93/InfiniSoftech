import { NextResponse } from "next/server";
import { listMessages, createMessage } from "@/lib/admin/messages-service";

export async function GET() {
  try {
    const messages = await listMessages();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to load messages." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createMessage(body);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ message: result.message });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Failed to send message." }, { status: 500 });
  }
}
