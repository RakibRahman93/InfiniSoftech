"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Flag, Plus, Search, RefreshCw, FolderOpen,
  Calendar, CheckCircle2, AlertCircle, Clock, X, Pencil, Trash2,
} from "lucide-react";

const STATUS_META = {
  NOT_STARTED: { label: "Not Started", color: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  IN_PROGRESS: { label: "In Progress", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  COMPLETED:   { label: "Completed",   color: "bg-green/10 text-green",   dot: "bg-green" },
  BLOCKED:     { label: "Blocked",     color: "bg-rose-50 text-rose-600", dot: "bg-rose-500" },
};

const STATUSES = Object.keys(STATUS_META);

export default function MilestonesManager() {
  const [milestones, setMilestones] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const emptyForm = { name: "", description: "", projectId: "", status: "NOT_STARTED", progress: "0", order: "1", dueDate: "" };
  const [form, setForm] = useState(emptyForm);

  const loadMilestones = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterProject) params.set("projectId", filterProject);
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`/api/admin/milestones?${params}`);
      const data = await res.json();
      setMilestones(data?.milestones ?? []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [search, filterProject, filterStatus]);

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects-mgmt");
      const data = await res.json();
      setProjects(data?.projects ?? []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { loadMilestones(); }, [loadMilestones]);
  useEffect(() => { loadProjects(); }, [loadProjects]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({
      name: m.name, description: m.description ?? "",
      projectId: m.projectId ?? "", status: m.status ?? "NOT_STARTED",
      progress: m.progress ?? "0", order: m.order ?? "1",
      dueDate: m.dueDate ? m.dueDate.split("T")[0] : "",
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.name.trim()) { setError("Milestone name is required."); return; }
    if (!form.projectId) { setError("Project is required."); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/milestones/${editing.id}` : "/api/admin/milestones";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setShowForm(false);
      showToast(editing ? "Milestone updated." : "Milestone created.");
      loadMilestones();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/milestones/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      showToast("Milestone deleted.");
      loadMilestones();
    } catch { showToast("Failed to delete milestone."); }
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Project Milestones</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Track project goals, deliverables, and progress</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green/90 transition-all shadow-sm">
          <Plus className="h-4 w-4" /> Add Milestone
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search milestones..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-green/40" />
        </div>
        <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
        </select>
        <button onClick={loadMilestones} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(6)].map((_, i) => <div key={i} className="h-44 animate-pulse rounded-2xl bg-sand/50" />)
        ) : milestones.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center rounded-2xl border border-ink/5 bg-background py-16 text-center shadow-sm">
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
              <Flag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-ink">No Milestones</p>
            <p className="mt-1 text-sm text-muted-foreground">Create your first milestone to track project goals.</p>
            <button onClick={openCreate} className="mt-4 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white">Add Milestone</button>
          </div>
        ) : (
          milestones.map((m) => {
            const meta = STATUS_META[m.status] ?? STATUS_META.NOT_STARTED;
            return (
              <div key={m.id} className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step #{m.order}</span>
                      <h3 className="font-semibold text-ink text-base">{m.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(m)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60 hover:text-ink">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm(m)} className="rounded-lg p-1 text-muted-foreground hover:bg-rose-50 hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {m.projectName && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FolderOpen className="h-3.5 w-3.5" />
                      <span>{m.projectName}</span>
                    </div>
                  )}

                  {m.description && (
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-ink/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${meta.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                    <span className="text-xs font-semibold text-ink">{m.progress}%</span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/60">
                    <div className="h-full rounded-full bg-green transition-all" style={{ width: `${m.progress}%` }} />
                  </div>

                  {m.dueDate && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Due: {new Date(m.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{editing ? "Edit Milestone" : "Add Milestone"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</div>}

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Milestone Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="e.g. UI/UX Design Approval" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Project *</label>
                <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  <option value="">Select project</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                    {STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Progress (%)</label>
                  <input type="number" value={form.progress} onChange={(e) => setForm({ ...form, progress: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" min="0" max="100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Order Step</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" min="1" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 resize-none" placeholder="Milestone details..." />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sand/40">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-green py-2.5 text-sm font-semibold text-white hover:bg-green/90 disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update" : "Create Milestone"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            <h3 className="font-display font-semibold text-ink">Delete Milestone?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-ink">{deleteConfirm.name}</span>?</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
