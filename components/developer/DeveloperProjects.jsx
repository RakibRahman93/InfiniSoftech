"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Calendar, CheckCircle2, Clock, AlertTriangle, Loader2, ChevronDown } from "lucide-react";
import ProjectFilesPanel from "@/components/projects/ProjectFilesPanel";

export default function DeveloperProjectsClient({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/developer/projects")
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
          projects.map((p) => <ProjectCard key={p.id} project={p} currentUserId={user?.id} />)
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, currentUserId }) {
  const [filesOpen, setFilesOpen] = useState(false);
  const [fileCount, setFileCount] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/developer/projects/${encodeURIComponent(project.id)}/files`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.ok) setFileCount(data.files?.length ?? 0);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [project.id]);

  return (
    <div className="flex flex-col rounded-2xl border border-ink/5 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{project.projectCode}</span>
          <h3 className="font-semibold text-ink text-base">{project.name}</h3>
        </div>
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
          {project.status}
        </span>
      </div>

      {project.description && <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>}

      <div className="pt-2 border-t border-ink/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-ink">{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/60">
          <div className="h-full rounded-full bg-green" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="border-t border-ink/5 pt-3">
        <button
          type="button"
          onClick={() => setFilesOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3"
          aria-expanded={filesOpen}
        >
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
            <FolderOpen className="h-3.5 w-3.5" />
            Files &amp; Media
            {fileCount !== null && fileCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-brand-gradient px-2 py-0.5 text-[9px] font-bold text-white">
                {fileCount}
              </span>
            )}
            {fileCount !== null && fileCount === 0 && (
              <span className="inline-flex items-center rounded-full bg-sand px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
                0
              </span>
            )}
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition hover:border-[#8876FF]/40 hover:text-[#8876FF]">
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${filesOpen ? "rotate-180" : ""}`} />
          </span>
        </button>
        {filesOpen && (
          <div className="mt-3">
            <ProjectFilesPanel projectId={project.id} role="developer" compact currentUserId={currentUserId} />
          </div>
        )}
      </div>
    </div>
  );
}