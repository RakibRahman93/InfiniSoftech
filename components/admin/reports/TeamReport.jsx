"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle2, Clock, Award, RefreshCw } from "lucide-react";

export default function TeamReport() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team?role=DEVELOPER");
      const json = await res.json();
      setStats(json?.stats ?? []);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const totalAssigned = stats.reduce((sum, s) => sum + s.assigned, 0);
  const totalCompleted = stats.reduce((sum, s) => sum + s.completed, 0);
  const avgCompletion = stats.length ? Math.round(stats.reduce((sum, s) => sum + s.completionRate, 0) / stats.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Developer Team Performance</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Task completion analytics, developer workloads, and team efficiency metrics</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">{stats.length}</p>
          <p className="text-xs text-muted-foreground">Active Developers</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <Clock className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">{totalAssigned}</p>
          <p className="text-xs text-muted-foreground">Total Tasks Assigned</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-green">{totalCompleted}</p>
          <p className="text-xs text-muted-foreground">Tasks Completed</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <Award className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-violet-600">{avgCompletion}%</p>
          <p className="text-xs text-muted-foreground">Avg Completion Rate</p>
        </div>
      </div>

      {/* Developer Performance Table */}
      <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <h2 className="font-display text-base font-semibold text-ink mb-4">Developer Performance Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/5 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">Developer</th>
                <th className="pb-3">Assigned Tasks</th>
                <th className="pb-3">Completed</th>
                <th className="pb-3">In Progress</th>
                <th className="pb-3">Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.id} className="border-b border-ink/5 last:border-b-0">
                  <td className="py-3 font-semibold text-ink">{s.name}</td>
                  <td className="py-3 text-muted-foreground">{s.assigned}</td>
                  <td className="py-3 font-medium text-green">{s.completed}</td>
                  <td className="py-3 font-medium text-blue-600">{s.inProgress}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sand/60">
                        <div className="h-full rounded-full bg-green" style={{ width: `${s.completionRate}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-ink">{s.completionRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
