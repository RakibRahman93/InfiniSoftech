"use client";

export function subscribeToRealtime(onMessage) {
  if (typeof window === "undefined" || typeof EventSource === "undefined") return () => {};
  const source = new EventSource("/api/realtime/events");
  source.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload && typeof onMessage === "function") onMessage(payload);
    } catch {
      // ignore malformed events
    }
  };
  source.onerror = () => {
    // EventSource auto-reconnects; nothing to do here.
  };
  return () => {
    source.close();
  };
}