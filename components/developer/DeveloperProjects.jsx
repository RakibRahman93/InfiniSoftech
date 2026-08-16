"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Calendar, CheckCircle2, Clock, AlertTriangle, Loader2 } from "lucide-react";

export default function DeveloperProjectsClient() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects-mgmt")
      .then((res) => res.json())
      .then((data) => setProjects(data?.projects ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">My Projects</h1>
        <p className="text-xs text-muted-foreground">Overview of projects you are contributing to.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
            <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-semibold text-ink">No Active Projects</p>
            <p className="text-xs text-muted-foreground mt-1">You are not currently assigned to any active project.</p>
          </div>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-ink/5 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{p.projectCode}</span>
                  <h3 className="font-semibold text-ink text-base">{p.name}</h3>
                </div>
                <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                  {p.status}
                </span>
              </div>

              {p.description && <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>}

              <div className="pt-2 border-t border-ink/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-ink">{p.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/60">
                  <div className="h-full rounded-full bg-green" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
