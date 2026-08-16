"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Loader2, Briefcase, Activity } from "lucide-react";
import ProjectFilesPanel from "@/components/projects/ProjectFilesPanel";

export default function ProjectFilesManager() {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects-mgmt")
      .then((res) => res.json())
      .then((data) => {
        const list = data?.projects ?? [];
        setProjects(list);
        if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const selected = projects.find((p) => p.id === selectedId) ?? null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Project Files</h1>
        <p className="text-xs text-muted-foreground">
          Upload and manage images and documents shared with the team and your clients.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sand">
            <FolderOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-ink">No projects yet</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Create a project first, then upload files and media for it here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="max-h-[70vh] overflow-y-auto rounded-2xl border border-ink/5 bg-white p-2 shadow-sm">
            <ul className="space-y-1">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                      p.id === selectedId ? "nav-item-brand" : "hover:bg-sand/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                        p.id === selectedId ? "bg-white/20 text-white" : "bg-green/10 text-green"
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-sm font-medium ${p.id === selectedId ? "text-white" : "text-ink"}`}>
                        {p.name}
                      </span>
                      <span className={`block text-[10px] uppercase tracking-wider ${p.id === selectedId ? "text-white/80" : "text-muted-foreground"}`}>
                        {p.projectCode} · {p.status}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section className="rounded-2xl border border-ink/5 bg-white p-5 shadow-sm sm:p-6">
            {selected ? (
              <>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    {selected.projectCode && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
                        {selected.projectCode}
                      </span>
                    )}
                    <h2 className="font-display text-base font-semibold text-ink sm:text-lg">{selected.name}</h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5" /> {selected.progress}% · {selected.health ?? "HEALTHY"}
                      </span>
                      {selected.clientName && <span>{selected.clientName}</span>}
                    </p>
                  </div>
                </div>
                <ProjectFilesPanel projectId={selected.id} role="admin" />
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a project to manage its files.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}