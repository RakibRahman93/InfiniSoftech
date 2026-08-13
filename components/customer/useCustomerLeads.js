"use client";

import { useCallback, useEffect, useState } from "react";

export function useCustomerLeads() {
  const [leads, setLeads] = useState([]);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/customer/leads");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.leads)) {
        setLeads(data.leads);
        setLive(Boolean(data.live));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/customer/leads")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && Array.isArray(data?.leads)) {
          setLeads(data.leads);
          setLive(Boolean(data.live));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    const t = setInterval(refresh, 15000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [refresh]);

  return { leads, live, loading, refresh };
}

function parseDate(value) {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export function unreadForLead(lead) {
  if (!lead?.replies?.length) return 0;
  return lead.replies.filter((r) => r.direction === "outgoing").length;
}

export function formatDate(value) {
  const d = parseDate(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatShort(iso) {
  const d = parseDate(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}