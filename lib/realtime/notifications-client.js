"use client";

import { subscribeToRealtime } from "@/lib/realtime/client";

export function subscribeToNotifications({ role, userId, onMessage }) {
  if (!role || typeof onMessage !== "function") return () => {};

  return subscribeToRealtime((payload) => {
    if (payload?.kind !== "notification") return;
    const targetRole = String(role).toUpperCase();
    if (String(payload.role).toUpperCase() !== targetRole) return;
    if (targetRole !== "ADMIN" && String(payload.userId) !== String(userId)) return;
    onMessage(payload);
  });
}