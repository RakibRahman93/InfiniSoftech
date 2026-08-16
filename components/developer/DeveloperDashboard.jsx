"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList, Clock3, AlertCircle, CheckCircle2,
  Play, RefreshCw, X, FolderOpen, Calendar, Pause,
  Loader2, ArrowRight, UserRound, MessageSquare, Code2,
  FileCheck, Link as LinkIcon, Upload, AlertTriangle, ExternalLink,
} from "lucide-react";

const statusStyles = {
  TODO: "bg-slate-50 text-slate-600 border-slate-200",
  IN_PROGRESS: "bg-blue-50 text-blue-600 border-blue-200",
  IN_REVIEW: "bg-violet-50 text-violet-600 border-violet-200",
  CLIENT_REVIEW: "bg-orange-50 text-orange-600 border-orange-200",
  REVISION_REQUIRED: "bg-amber-50 text-amber-600 border-amber-200",
  BLOCKED: "bg-rose-50 text-rose-600 border-rose-200",
  COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const statusLabels = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  CLIENT_REVIEW: "Client Review",
  REVISION_REQUIRED: "Revision Needed",
  BLOCKED: "Blocked",
  COMPLETED: "Completed",
};

const STATUS_ACTIONS = {
  TODO: { action: "Start Task", nextStatus: "IN_PROGRESS" },
  IN_PROGRESS: { action: "Submit for Review", nextStatus: "IN_REVIEW" },
  REVISION_REQUIRED: { action: "Resume Work", nextStatus: "IN_PROGRESS" },
  BLOCKED: { action: "Unblock Task", nextStatus: "IN_PROGRESS" },
};

export default function DeveloperDashboardClient({ user }) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Mandatory File Submission Modal State
  const [submittingTask, setSubmittingTask] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionName, setSubmissionName] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`/api/developer/tasks?${params}`);
      if (res.status === 401) { router.replace("/developer/login"); return; }
      const data = await res.json();
      setTasks(data?.tasks ?? []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [filterStatus, router]);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const handleActionClick = (task, actionMeta) => {
    if (actionMeta.nextStatus === "IN_REVIEW") {
      // Open Mandatory File Submission Modal
      setSubmittingTask(task);
      setSubmissionUrl("");
      setSubmissionName(task.title + " Deliverable");
      setSubmissionNotes("");
      setSubmissionError("");
    } else {
      handleStatusChange(task.id, actionMeta.nextStatus);
    }
  };

  const handleStatusChange = async (taskId, newStatus, submissionPayload = null) => {
    setUpdatingId(taskId);
    try {
      const body = { status: newStatus, ...(submissionPayload || {}) };
      const res = await fetch(`/api/developer/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) {
        if (submittingTask) {
          setSubmissionError(data.error);
        } else {
          showToast(`⚠️ ${data.error}`);
        }
        return;
      }
      showToast(`Task moved to: ${statusLabels[newStatus] ?? newStatus}`);
      setSubmittingTask(null);
      setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, ...data.task } : t));
      if (selectedTask?.id === taskId) setSelectedTask({ ...selectedTask, ...data.task });
    } catch { showToast("Failed to update task."); } finally { setUpdatingId(null); }
  };

  const submitDeliverablesModal = () => {
    setSubmissionError("");
    if (!submissionUrl.trim()) {
      setSubmissionError("⚠️ File link / repository URL is MANDATORY to submit task for review!");
      return;
    }
    const files = [{
      name: submissionName.trim() || "Deliverable File",
      url: submissionUrl.trim(),
      uploadedAt: new Date().toISOString(),
    }];
    handleStatusChange(submittingTask.id, "IN_REVIEW", {
      submissionFiles: files,
      submissionNotes: submissionNotes.trim(),
    });
  };

  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const inReview = tasks.filter((t) => t.status === "IN_REVIEW").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;

  const stats = [
    { label: "Assigned tasks", value: total, icon: ClipboardList, iconClass: "bg-green/10 text-green" },
    { label: "In progress", value: inProgress, icon: Clock3, iconClass: "bg-blue-50 text-blue-600" },
    { label: "Pending review", value: inReview, icon: AlertCircle, iconClass: "bg-amber-50 text-amber-600" },
    { label: "Completed", value: completed, icon: CheckCircle2, iconClass: "bg-emerald-50 text-emerald-600" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Overview</h1>
          <p className="text-xs text-muted-foreground">
            A quick look at your assigned development tasks and progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-medium text-ink outline-none focus:border-green/40"
          >
            <option value="">All Statuses</option>
            {Object.keys(statusLabels).map((s) => (
              <option key={s} value={s}>{statusLabels[s]}</option>
            ))}
          </select>
          <button
            onClick={load}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 bg-white text-muted-foreground transition hover:text-ink"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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
            <p className="mt-4 text-[24px] font-semibold leading-none text-ink sm:text-[28px]">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Tasks Section */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">My Assigned Tasks ({tasks.length})</h2>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sand">
              <ClipboardList className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-ink">No tasks assigned</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              You don&apos;t have any assigned tasks matching this filter. Check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tasks.map((task) => {
              const act = STATUS_ACTIONS[task.status];
              const isUpdating = updatingId === task.id;
              const hasFiles = task.submissionFiles && task.submissionFiles.length > 0;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                  className={`flex flex-col gap-3 rounded-2xl border border-ink/5 bg-background p-4 shadow-sm transition hover:border-green/20 hover:shadow-md cursor-pointer sm:flex-row sm:items-center sm:justify-between ${
                    selectedTask?.id === task.id ? "border-green/30 bg-green/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
                      <Code2 className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-ink">{task.title}</p>
                        {hasFiles && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-bold text-green">
                            <FileCheck className="h-3 w-3" /> Deliverables Attached
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {task.projectName || "General"} {task.taskCode ? ` · ${task.taskCode}` : ""}
                        {task.dueDate ? ` · Due: ${new Date(task.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                        statusStyles[task.status] || "bg-sand/50 text-muted-foreground"
                      }`}
                    >
                      {statusLabels[task.status] || task.status}
                    </span>

                    {act && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(task, act);
                        }}
                        disabled={isUpdating}
                        className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-green px-3.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                      >
                        {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                        {act.action}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Mandatory Deliverables Submission Modal */}
      {submittingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-ink/5 pb-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                  <AlertTriangle className="h-3 w-3" /> Mandatory Deliverable Attachment
                </span>
                <h3 className="font-display text-lg font-semibold text-ink mt-1">Submit Task for Admin Review</h3>
                <p className="text-xs text-muted-foreground">{submittingTask.title} ({submittingTask.taskCode})</p>
              </div>
              <button onClick={() => setSubmittingTask(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submissionError && (
              <div className="rounded-xl bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600 border border-rose-200">
                {submissionError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">
                  Deliverable File / Repository / Demo Link *
                </label>
                <div className="relative">
                  <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://github.com/org/repo/pull/12 or Vercel link or file URL"
                    className="w-full rounded-xl border border-ink/10 bg-[#F8F9FB] py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-green/40 focus:bg-white"
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Paste your GitHub PR, Figma design, Zip file URL, or live demo link.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Deliverable Title</label>
                <input
                  type="text"
                  value={submissionName}
                  onChange={(e) => setSubmissionName(e.target.value)}
                  placeholder="e.g. Frontend Pull Request #14"
                  className="w-full rounded-xl border border-ink/10 bg-[#F8F9FB] py-2.5 px-3 text-sm text-ink outline-none focus:border-green/40 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink">Submission Notes / Summary</label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  rows={3}
                  placeholder="Describe what changes were made, components updated, or testing instructions..."
                  className="w-full rounded-xl border border-ink/10 bg-[#F8F9FB] p-3 text-sm text-ink outline-none focus:border-green/40 focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSubmittingTask(null)}
                className="flex-1 rounded-xl border border-ink/10 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-sand/40"
              >
                Cancel
              </button>
              <button
                onClick={submitDeliverablesModal}
                disabled={updatingId === submittingTask.id}
                className="flex-1 rounded-xl bg-green py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {updatingId === submittingTask.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Submit Deliverables
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Drawer Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 p-4 backdrop-blur-sm">
          <div className="h-full w-full max-w-md overflow-y-auto rounded-2xl bg-background p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-ink/5 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{selectedTask.taskCode}</p>
                <h3 className="font-display text-base font-semibold text-ink">{selectedTask.title}</h3>
              </div>
              <button onClick={() => setSelectedTask(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[selectedTask.status]}`}>
                  {statusLabels[selectedTask.status] || selectedTask.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Priority</span>
                <span className="font-semibold text-ink">{selectedTask.priority}</span>
              </div>

              {selectedTask.projectName && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Project</span>
                  <span className="font-medium text-ink">{selectedTask.projectName}</span>
                </div>
              )}

              {selectedTask.dueDate && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Due Date</span>
                  <span className="font-medium text-ink">
                    {new Date(selectedTask.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              )}

              {selectedTask.description && (
                <div className="rounded-xl bg-sand/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-ink">{selectedTask.description}</p>
                </div>
              )}

              {/* Submitted Deliverables Section */}
              {selectedTask.submissionFiles && selectedTask.submissionFiles.length > 0 && (
                <div className="rounded-xl border border-green/20 bg-green/5 p-3 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-green flex items-center gap-1">
                    <FileCheck className="h-4 w-4" /> Attached Deliverables
                  </p>
                  {selectedTask.submissionFiles.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-ink/5 text-xs text-ink hover:border-green/40 transition"
                    >
                      <span className="font-medium truncate flex-1">{file.name || "Deliverable File"}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-green shrink-0 ml-2" />
                    </a>
                  ))}
                  {selectedTask.submissionNotes && (
                    <p className="text-xs text-muted-foreground pt-1 border-t border-green/10">
                      <strong>Notes:</strong> {selectedTask.submissionNotes}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-4 space-y-2">
                {STATUS_ACTIONS[selectedTask.status] && (
                  <button
                    onClick={() => handleActionClick(selectedTask, STATUS_ACTIONS[selectedTask.status])}
                    disabled={updatingId === selectedTask.id}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:opacity-90 disabled:opacity-60"
                  >
                    <Play className="h-4 w-4" />
                    {STATUS_ACTIONS[selectedTask.status].action}
                  </button>
                )}

                {selectedTask.status === "IN_PROGRESS" && (
                  <button
                    onClick={() => handleStatusChange(selectedTask.id, "BLOCKED")}
                    disabled={updatingId === selectedTask.id}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-rose-600 hover:bg-rose-50"
                  >
                    <Pause className="h-4 w-4" />
                    Mark as Blocked
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
