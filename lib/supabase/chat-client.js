"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && key
    ? createClient(url, key, {
        realtime: { params: { eventsPerSecond: 10 } },
      })
    : null;

export const CHAT_CHANNEL_PREFIX = "lead-chat";

export function getChatChannelName(leadId) {
  return `${CHAT_CHANNEL_PREFIX}:${leadId}`;
}

export function subscribeToLeadChat(leadId, onMessage) {
  const sb = supabase;
  if (!sb || !leadId) return () => {};
  const channel = sb.channel(getChatChannelName(leadId));
  channel
    .on("broadcast", { event: "new-message" }, ({ payload }) => {
      if (payload && typeof onMessage === "function") onMessage(payload);
    })
    .subscribe();
  return () => {
    sb.removeChannel(channel);
  };
}

export const ADMIN_LEADS_CHANNEL = "admin-leads";

export function subscribeToAdminLeads(onMessage) {
  const sb = supabase;
  if (!sb) return () => {};
  const channel = sb.channel(ADMIN_LEADS_CHANNEL);
  channel
    .on("broadcast", { event: "leads-updated" }, ({ payload }) => {
      if (payload && typeof onMessage === "function") onMessage(payload);
    })
    .subscribe();
  return () => {
    sb.removeChannel(channel);
  };
}

export function emitLeadChat(leadId, payload) {
  const sb = supabase;
  if (!sb || !leadId) return Promise.resolve();
  return sb.channel(getChatChannelName(leadId)).send({
    type: "broadcast",
    event: "new-message",
    payload,
  });
}