"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Award, RefreshCw } from "lucide-react";

export default function SalesReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/deals");
      const json = await res.json();
      setData(json);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const summary = data?.summary ?? { stages: [], totalPipeline: 0, weightedPipeline: 0, wonValue: 0, lostValue: 0 };
  const deals = data?.deals ?? [];
  const totalDeals = deals.length;
  const wonDeals = deals.filter((d) => d.stage === "Won").length;
  const conversionRate = totalDeals ? Math.round((wonDeals / totalDeals) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Sales & Revenue Report</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Comprehensive overview of pipeline performance, conversion rates, and revenue</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <DollarSign className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">${summary.totalPipeline.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Active Pipeline</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
            <Award className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-green">${summary.wonValue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Won Revenue</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-violet-600">{conversionRate}%</p>
          <p className="text-xs text-muted-foreground">Deal Win Rate</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <Users className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">{totalDeals}</p>
          <p className="text-xs text-muted-foreground">Total Deals</p>
        </div>
      </div>

      {/* Stage Breakdown Table */}
      <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <h2 className="font-display text-base font-semibold text-ink mb-4">Pipeline Stage Breakdown</h2>
        <div className="space-y-4">
          {summary.stages.map((st) => {
            const pct = summary.totalPipeline ? Math.round((st.value / summary.totalPipeline) * 100) : 0;
            return (
              <div key={st.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{st.stage} ({st.count} deals)</span>
                  <span className="font-semibold text-ink">${st.value.toLocaleString()} ({pct}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-sand/60">
                  <div className="h-full rounded-full bg-green transition-all" style={{ width: `${Math.max(5, pct)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
