import { createClient } from "@supabase/supabase-js";
import { publish } from "@/lib/realtime/bus";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let serverSupabase = null;
if (url && key) {
  serverSupabase = createClient(url, key, {
    realtime: { params: { eventsPerSecond: 10 } },
  });
}

export const ADMIN_LEADS_CHANNEL = "admin-leads";

function getChatChannelName(leadId) {
  return `lead-chat:${leadId}`;
}

async function emitOnChannel(channelName, event, payload) {
  if (!serverSupabase || !channelName) return false;
  try {
    const channel = serverSupabase.channel(channelName);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("timeout")), 4000);
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          clearTimeout(timer);
          void channel
            .send({ type: "broadcast", event, payload })
            .then(() => {
              serverSupabase.removeChannel(channel);
              resolve(true);
            })
            .catch(reject);
        }
      });
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function serverEmitLeadChat(leadId, payload) {
  if (!leadId) return { ok: false, reason: "missing-lead-id" };
  // In-app realtime: instantly fan this out to connected admin/customer pages.
  publish({ ...(payload ?? {}), leadId });
  const ok = await emitOnChannel(getChatChannelName(leadId), "new-message", payload);
  // Mirror to the shared admin channel so the admin dashboard updates instantly.
  void emitOnChannel(ADMIN_LEADS_CHANNEL, "leads-updated", {
    leadId,
    direction: payload?.direction,
    created: payload?.created,
  });
  return { ok };
}