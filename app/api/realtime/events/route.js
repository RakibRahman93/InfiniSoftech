import { NextResponse } from "next/server";
import { subscribe } from "@/lib/realtime/bus";
import { requireAdmin } from "@/lib/admin/session-helper";
import { requireCustomer } from "@/lib/customer/session-helper";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { listCustomerLeads } from "@/lib/customer/leads-service";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const admin = await requireAdmin();
  const customer = await requireCustomer();
  const devToken = request.cookies.get("dev_session")?.value;
  const developer = devToken ? await isDeveloperSessionValid(devToken) : null;

  if (!admin && !customer && !developer) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const identity = admin
    ? { role: "ADMIN", userId: null }
    : customer
      ? { role: "CUSTOMER", userId: customer.id }
      : { role: "DEVELOPER", userId: developer.id };

  // Customers only receive events for leads owned by their account.
  let allowed = null;
  if (identity.role === "CUSTOMER") {
    const { leads } = await listCustomerLeads(customer.email);
    allowed = new Set(leads.map((lead) => lead.id));
  }

  const encoder = new TextEncoder();

  let unsubscribe;

  const stream = new ReadableStream({
    start(controller) {
      const send = (payload) => {
        // Lead events: customers only get their own.
        if (allowed && payload?.kind !== "notification" && !allowed.has(payload?.leadId)) return;
        // Notification events: only for this identity.
        if (payload?.kind === "notification") {
          const matchesRole = String(payload.role).toUpperCase() === identity.role;
          const matchesUser =
            identity.role === "ADMIN" || String(payload.userId) === String(identity.userId);
          if (!matchesRole || !matchesUser) return;
        }
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