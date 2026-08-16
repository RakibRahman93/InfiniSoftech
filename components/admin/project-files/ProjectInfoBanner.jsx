"use client";

import { Activity, Briefcase, User, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function ProjectInfoBanner({ project, onClose }) {
  if (!project) return null;

  const statusStyles = {
    PLANNING: "bg-blue-50 text-blue-700 border-blue-200",
    NOT_STARTED: "bg-slate-50 text-slate-700 border-slate-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
    ON_HOLD: "bg-orange-50 text-orange-700 border-orange-200",
    IN_REVIEW: "bg-purple-50 text-purple-700 border-purple-200",
    CLIENT_REVIEW: "bg-indigo-50 text-indigo-700 border-indigo-200",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const statusClass = statusStyles[project.status] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white border border-ink/5 shadow-sm text-xs">
      <div className="flex flex-wrap items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-xl bg-brand-gradient flex items-center justify-center text-white shrink-0 shadow-sm">
          <Briefcase className="w-3.5 h-3.5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-ink text-sm truncate max-w-[200px] sm:max-w-md">
              {project.name}
            </h3>
            {project.projectCode && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-ink/5 text-muted-foreground">
                {project.projectCode}
              </span>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-ink/10 pl-2.5 text-[11px] text-muted-foreground">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusClass}`}>
            {project.status?.replace(/_/g, " ")}
          </span>

          <span className="inline-flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#8876FF]" />
            {project.progress ?? 0}%
          </span>

          {project.health && (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                project.health === "AT_RISK" ? "text-amber-600" : "text-emerald-600"
              }`}
            >
              {project.health === "AT_RISK" ? (
                <AlertCircle className="w-3 h-3" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              {project.health}
            </span>
          )}

          {project.clientName && (
            <span className="inline-flex items-center gap-1">
              <User className="w-3 h-3" />
              {project.clientName}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-[11px] text-muted-foreground hover:text-ink flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-sand/60 transition ml-auto"
        title="Return to All Files"
      >
        <span>View All</span>
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
