"use client";

import { useState } from "react";
import {
  FolderOpen,
  Loader2,
  CheckCircle2,
  CircleDashed,
  Circle,
  Flag,
  ClipboardList,
  CalendarDays,
  ArrowRight,
  Activity,
  TrendingUp,
  ThumbsUp,
  RefreshCcw,
  X,
  PencilLine,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import ProjectFilesPanel from "@/components/projects/ProjectFilesPanel";
import {
  useCustomerProjects,
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_STYLES,
  PROJECT_HEALTH_STYLES,
  formatShortDate,
} from "@/components/customer/useCustomerProjects";

const MILESTONE_META = {
  COMPLETED: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  IN_PROGRESS: { icon: CircleDashed, cls: "bg-[#8876FF]/10 text-[#8876FF] border-[#8876FF]/30" },
  BLOCKED: { icon: Circle, cls: "bg-rose-50 text-rose-600 border-rose-200" },
  NOT_STARTED: { icon: Circle, cls: "bg-slate-100 text-slate-400 border-slate-200" },
};

const TASK_STATUS_META = {
  COMPLETED: { label: "Done", cls: "bg-emerald-50 text-emerald-600" },
  IN_PROGRESS: { label: "In progress", cls: "bg-blue-50 text-blue-600" },
  CLIENT_REVIEW: { label: "Needs your review", cls: "bg-[#8876FF]/10 text-[#8876FF]" },
  REVISION_REQUIRED: { label: "Revision requested", cls: "bg-orange-50 text-orange-600" },
  IN_REVIEW: { label: "In review", cls: "bg-violet-50 text-violet-600" },
  BLOCKED: { label: "Blocked", cls: "bg-rose-50 text-rose-600" },
  TODO: { label: "To do", cls: "bg-slate-100 text-slate-500" },
};

const CUSTOMER_STATUS_OPTIONS = ["ON_HOLD", "CLIENT_REVIEW", "COMPLETED", "CANCELLED"];

export default function CustomerProjectsPage() {
  const { projects, loading, refresh } = useCustomerProjects();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const active = projects.filter((p) => p.status !== "COMPLETED" && p.status !== "CANCELLED");
  const completed = projects.filter((p) => p.status === "COMPLETED");
  const avgProgress = projects.length
    ? Math.round(projects.reduce((s, p) => s + (p.progress ?? 0), 0) / projects.length)
    : 0;
  const milestoneDone = projects.reduce((s, p) => s + (p.completedMilestones ?? 0), 0);

  const stats = [
    { label: "Active projects", value: active.length, icon: Activity, iconClass: "bg-[#E75778]/10 text-[#E75778]" },
    { label: "Completed projects", value: completed.length, icon: CheckCircle2, iconClass: "bg-emerald-50 text-emerald-600" },
    { label: "Avg. progress", value: `${avgProgress}%`, icon: TrendingUp, iconClass: "bg-[#8876FF]/10 text-[#8876FF]" },
    { label: "Milestones done", value: milestoneDone, icon: Flag, iconClass: "bg-violet-50 text-violet-600" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">My Projects</h1>
        <p className="text-xs text-muted-foreground">
          Track the status, progress, milestones, and tasks of your projects with us — and update
          them live.
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, iconClass }) => (
          <div
            key={label}
            className="min-h-[128px] rounded-[20px] border border-[#E7E5E1] bg-white p-4 shadow-[0_1px_2px_rgba(20,20,20,0.03)] sm:min-h-[140px] sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${iconClass}`}>
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
            </div>
            <p className="mt-4 text-[24px] font-semibold leading-none text-ink sm:text-[28px]">{value}</p>
          </div>
        ))}
      </section>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sand">
            <FolderOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-ink">No projects linked yet</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Once our team starts working with you, your active projects will show up here with live
            status updates.
          </p>
          <Link
            href="/customer/dashboard/enquiries"
            className="btn-brand mt-5 inline-flex h-10 items-center gap-2 rounded-xl px-6 text-xs font-bold uppercase tracking-[0.1em] text-white"
          >
            Open an enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onRefresh={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onRefresh }) {
  const [statusFormOpen, setStatusFormOpen] = useState(false);
  const [statusDraft, setStatusDraft] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [revisionOpenFor, setRevisionOpenFor] = useState(null);
  const [revisionNote, setRevisionNote] = useState("");
  const [filesOpen, setFilesOpen] = useState(false);

  const statusLabel = PROJECT_STATUS_LABELS[project.status] || project.status;
  const statusClass = PROJECT_STATUS_STYLES[project.status] || "bg-sand/50 text-muted-foreground";
  const healthClass = PROJECT_HEALTH_STYLES[project.health] || "text-muted-foreground";
  const completedMilestoneCount = project.milestones.filter((m) => m.status === "COMPLETED").length;

  async function updateStatus(e) {
    e.preventDefault();
    if (!statusDraft) return;
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/customer/projects/${encodeURIComponent(project.id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusDraft, note: statusNote }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error || "Could not update status.");
        return;
      }
      toast.success("Project status updated.");
      setStatusFormOpen(false);
      setStatusDraft("");
      setStatusNote("");
      await onRefresh();
    } catch {
      toast.error("Could not update status. Please try again.");
    } finally {
      setSavingStatus(false);
    }
  }

  async function actOnTask(task, action, note = "") {
    setBusyId(task.id);
    try {
      const res = await fetch(
        `/api/customer/projects/${encodeURIComponent(project.id)}/tasks/${encodeURIComponent(task.id)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, note }),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error || "Could not update task.");
        return;
      }
      toast.success(action === "approve" ? "Task approved." : "Changes requested.");
      setRevisionOpenFor(null);
      setRevisionNote("");
      await onRefresh();
    } catch {
      toast.error("Could not update task. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function actOnMilestone(milestone, action) {
    setBusyId(milestone.id);
    try {
      const res = await fetch(
        `/api/customer/projects/${encodeURIComponent(project.id)}/milestones/${encodeURIComponent(milestone.id)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        },
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error || "Could not update milestone.");
        return;
      }
      toast.success(action === "complete" ? "Milestone marked as done." : "Milestone reopened.");
      await onRefresh();
    } catch {
      toast.error("Could not update milestone. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-[#E7E5E1] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.03)]">
      <div className="border-b border-ink/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {project.projectCode && (
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
                {project.projectCode}
              </span>
            )}
            <h2 className="font-display text-base font-semibold text-ink sm:text-lg">{project.name}</h2>
            {project.description && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{project.description}</p>
            )}
          </div>
          <span className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold ${statusClass}`}>
            {statusLabel}
          </span>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-ink">{project.progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-sand/60">
            <div
              className="h-full rounded-full bg-brand-gradient transition-all"
              style={{ width: `${Math.max(0, Math.min(100, project.progress))}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground">
          <span className={`inline-flex items-center gap-1.5 font-medium ${healthClass}`}>
            <Activity className="h-3.5 w-3.5" /> {project.health?.toLowerCase() ?? "healthy"}
          </span>
          {project.expectedEndDate && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> Expected {formatShortDate(project.expectedEndDate)}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Flag className="h-3.5 w-3.5" /> {completedMilestoneCount}/{project.milestones.length} milestones
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setStatusFormOpen((open) => !open);
              if (!statusDraft) setStatusDraft(project.status);
            }}
            className="btn-brand inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-xs font-bold uppercase tracking-[0.1em] text-white"
          >
            <PencilLine className="h-3.5 w-3.5" /> Update status
          </button>
          {statusFormOpen && (
            <form onSubmit={updateStatus} className="flex w-full flex-col gap-2 rounded-xl border border-[#8876FF]/30 bg-[#F8F9FB] p-3">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value)}
                  className="h-9 flex-1 min-w-[180px] rounded-lg border border-ink/10 bg-background px-2 text-xs font-medium text-ink outline-none focus:border-[#8876FF]/50"
                >
                  {CUSTOMER_STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {PROJECT_STATUS_LABELS[s] || s}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={savingStatus || !statusDraft}
                  className="btn-brand inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white"
                >
                  {savingStatus ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFormOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 text-muted-foreground hover:bg-sand/60 hover:text-ink"
                  aria-label="Cancel status update"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                rows={2}
                placeholder="Add a note for our team (optional)"
                className="min-h-10 w-full resize-y rounded-lg border border-ink/10 bg-background px-3 py-2 text-xs text-ink outline-none focus:border-[#8876FF]/50"
              />
            </form>
          )}
        </div>
      </div>

      {project.milestones.length > 0 && (
        <div className="border-b border-ink/5 px-5 py-4 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
              Milestones
            </p>
            <span className="text-[10px] font-semibold text-muted-foreground/60">
              You can mark work as done
            </span>
          </div>
          <ol className="space-y-2.5">
            {project.milestones.map((m) => {
              const meta = MILESTONE_META[m.status] || MILESTONE_META.NOT_STARTED;
              const Icon = meta.icon;
              const isDone = m.status === "COMPLETED";
              return (
                <li key={m.id} className="flex items-start gap-3">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${meta.cls}`}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium ${!isDone && m.status === "NOT_STARTED" ? "text-muted-foreground/70" : "text-ink"}`}>
                      {m.name}
                    </p>
                    {m.dueDate && !isDone && (
                      <p className="text-[10px] text-muted-foreground/60">Due {formatShortDate(m.dueDate)}</p>
                    )}
                  </div>
                  {isDone ? (
                    <span className="shrink-0 text-[10px] font-semibold text-emerald-600">Done</span>
                  ) : (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground/50">{m.progress}%</span>
                      <button
                        type="button"
                        onClick={() => actOnMilestone(m, "complete")}
                        disabled={busyId === m.id}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#8876FF]/10 px-2 py-1 text-[10px] font-semibold text-[#8876FF] transition hover:bg-[#8876FF]/20 disabled:opacity-50"
                      >
                        {busyId === m.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        Done
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {project.tasks.length > 0 && (
        <div className="px-5 py-4 sm:px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
            Client-visible tasks
          </p>
          <ul className="space-y-2">
            {project.tasks.map((t) => {
              const meta = TASK_STATUS_META[t.status] || TASK_STATUS_META.TODO;
              const needsReview = t.status === "CLIENT_REVIEW" || t.status === "IN_REVIEW";
              return (
                <li key={t.id} className="rounded-xl border border-ink/5 bg-[#F8F9FB] px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-ink">{t.title}</p>
                      {t.taskCode && <p className="text-[10px] text-muted-foreground/60">{t.taskCode}</p>}
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </div>

                  {needsReview && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => actOnTask(t, "approve")}
                        disabled={busyId === t.id}
                        className="btn-brand inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
                      >
                        {busyId === t.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <ThumbsUp className="h-3 w-3" />
                        )}
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRevisionOpenFor(revisionOpenFor === t.id ? null : t.id);
                          setRevisionNote("");
                        }}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-orange-600 transition hover:bg-orange-100"
                      >
                        <RefreshCcw className="h-3 w-3" />
                        Request changes
                      </button>

                      {revisionOpenFor === t.id && (
                        <div className="flex w-full items-center gap-2">
                          <input
                            value={revisionNote}
                            onChange={(e) => setRevisionNote(e.target.value)}
                            placeholder="What needs to change? (optional)"
                            className="h-8 min-w-0 flex-1 rounded-lg border border-ink/10 bg-background px-3 text-xs text-ink outline-none focus:border-[#8876FF]/50"
                          />
                          <button
                            type="button"
                            onClick={() => actOnTask(t, "revision", revisionNote)}
                            disabled={busyId === t.id}
                            className="inline-flex h-8 items-center gap-1 rounded-lg bg-orange-600 px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-orange-700 disabled:opacity-50"
                          >
                            {busyId === t.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCcw className="h-3 w-3" />}
                            Send
                          </button>
                          <button
                            type="button"
                            onClick={() => setRevisionOpenFor(null)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-ink/10 text-muted-foreground hover:bg-sand/60 hover:text-ink"
                            aria-label="Cancel revision request"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {project.milestones.length === 0 && project.tasks.length === 0 && (
        <div className="flex items-center gap-2 px-5 py-4 text-xs text-muted-foreground/70 sm:px-6">
          <ClipboardList className="h-4 w-4" />
          Milestones and task updates will appear here as the team begins work.
        </div>
      )}

      <div className="border-t border-ink/5 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setFilesOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3"
          aria-expanded={filesOpen}
        >
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
            <FolderOpen className="h-3.5 w-3.5" />
            Files &amp; Media
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition hover:border-[#8876FF]/40 hover:text-[#8876FF]">
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${filesOpen ? "rotate-180" : ""}`} />
          </span>
        </button>
        {filesOpen && <div className="mt-3"><ProjectFilesPanel projectId={project.id} role="customer" compact /></div>}
      </div>
    </article>
  );
}