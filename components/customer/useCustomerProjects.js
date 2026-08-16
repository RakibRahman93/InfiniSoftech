"use client";

import { useCallback, useEffect, useState } from "react";

export function useCustomerProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/customer/projects");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.projects)) setProjects(data.projects);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/customer/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && Array.isArray(data?.projects)) setProjects(data.projects);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    const t = setInterval(refresh, 30000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [refresh]);

  return { projects, loading, refresh };
}

export const PROJECT_STATUS_LABELS = {
  PLANNING: "Planning",
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  ON_HOLD: "On Hold",
  IN_REVIEW: "In Review",
  CLIENT_REVIEW: "Client Review",
  REVISION_REQUIRED: "Revision Required",
  TESTING: "Testing",
  DEPLOYMENT: "Deployment",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const PROJECT_STATUS_STYLES = {
  PLANNING: "bg-slate-100 text-slate-600 border-slate-200",
  NOT_STARTED: "bg-slate-100 text-slate-600 border-slate-200",
  IN_PROGRESS: "bg-blue-50 text-blue-600 border-blue-200",
  ON_HOLD: "bg-amber-50 text-amber-700 border-amber-200",
  IN_REVIEW: "bg-violet-50 text-violet-600 border-violet-200",
  CLIENT_REVIEW: "bg-cyan-50 text-cyan-700 border-cyan-200",
  REVISION_REQUIRED: "bg-orange-50 text-orange-600 border-orange-200",
  TESTING: "bg-indigo-50 text-indigo-600 border-indigo-200",
  DEPLOYMENT: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200",
  COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-600 border-rose-200",
};

export const PROJECT_HEALTH_STYLES = {
  HEALTHY: "text-emerald-600",
  AT_RISK: "text-amber-600",
  DELAYED: "text-rose-600",
};

export function formatShortDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}