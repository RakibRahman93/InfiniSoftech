"use client";

import { useEffect, useState } from "react";
import { Briefcase, AlertTriangle, CheckCircle2, Clock, RefreshCw } from "lucide-react";

export default function ProjectReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects-mgmt");
      const json = await res.json();
      setData(json);
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const stats = data?.stats ?? { active: 0, completed: 0, atRisk: 0, planning: 0 };
  const projects = data?.projects ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Project Management Report</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Detailed analysis of project status, health indicators, and delivery timelines</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <Clock className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">{stats.active}</p>
          <p className="text-xs text-muted-foreground">Active In-Progress</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-green">{stats.completed}</p>
          <p className="text-xs text-muted-foreground">Completed Projects</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-rose-600">{stats.atRisk}</p>
          <p className="text-xs text-muted-foreground">At-Risk Projects</p>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Briefcase className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-semibold text-ink">{projects.length}</p>
          <p className="text-xs text-muted-foreground">Total Managed Projects</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <h2 className="font-display text-base font-semibold text-ink mb-4">Project Delivery Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/5 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">Project</th>
                <th className="pb-3">Manager</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Health</th>
                <th className="pb-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-ink/5 last:border-b-0">
                  <td className="py-3 font-semibold text-ink">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.projectManagerName || "Unassigned"}</td>
                  <td className="py-3">
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.health === "HEALTHY" ? "bg-green/10 text-green" : "bg-rose-50 text-rose-600"
                    }`}>
                      {p.health}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sand/60">
                        <div className="h-full rounded-full bg-green" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-ink">{p.progress}%</span>
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
