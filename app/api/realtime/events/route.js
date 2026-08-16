import { NextResponse } from "next/server";
import { subscribe } from "@/lib/realtime/bus";
import { requireAdmin } from "@/lib/admin/session-helper";
import { requireCustomer } from "@/lib/customer/session-helper";
import { listCustomerLeads } from "@/lib/customer/leads-service";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const admin = await requireAdmin();
  const customer = await requireCustomer();
  if (!admin && !customer) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Customers only receive events for leads owned by their account.
  const allowed = new Set();
  if (!admin) {
    const { leads } = await listCustomerLeads(customer.email);
    leads.forEach((lead) => allowed.add(lead.id));
  }

  const encoder = new TextEncoder();

  let unsubscribe;

  const stream = new ReadableStream({
    start(controller) {
      const send = (payload) => {
        if (allowed.size && !allowed.has(payload?.leadId)) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          // connection closed
        }
      };

      unsubscribe = subscribe(send);

      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(heartbeat);
        }
      }, 20000);

      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        if (unsubscribe) unsubscribe();
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
    cancel() {
      if (unsubscribe) unsubscribe();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}