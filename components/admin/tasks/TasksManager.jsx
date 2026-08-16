"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ClipboardList, Plus, Search, Filter, RefreshCw,
  AlertCircle, Clock, CheckCircle2, Circle, Pause, ChevronDown,
  X, Pencil, Trash2, Calendar, User, FolderOpen,
} from "lucide-react";

const STATUS_META = {
  TODO:               { label: "To Do",           color: "bg-slate-100 text-slate-600",   dot: "bg-slate-400" },
  IN_PROGRESS:        { label: "In Progress",      color: "bg-blue-50 text-blue-600",      dot: "bg-blue-500" },
  IN_REVIEW:          { label: "In Review",        color: "bg-violet-50 text-violet-600",  dot: "bg-violet-500" },
  CLIENT_REVIEW:      { label: "Client Review",    color: "bg-orange-50 text-orange-600",  dot: "bg-orange-500" },
  REVISION_REQUIRED:  { label: "Revision Needed",  color: "bg-amber-50 text-amber-600",    dot: "bg-amber-500" },
  BLOCKED:            { label: "Blocked",           color: "bg-rose-50 text-rose-600",      dot: "bg-rose-500" },
  COMPLETED:          { label: "Completed",         color: "bg-green/10 text-green",        dot: "bg-green" },
};

const PRIORITY_META = {
  LOW:    { color: "bg-slate-100 text-slate-500" },
  MEDIUM: { color: "bg-blue-50 text-blue-600" },
  HIGH:   { color: "bg-orange-50 text-orange-600" },
  URGENT: { color: "bg-rose-50 text-rose-600" },
};

const STATUSES = Object.keys(STATUS_META);
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"];

function StatusBadge({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.TODO;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 text-[11px] font-semibold ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const m = PRIORITY_META[priority] ?? PRIORITY_META.MEDIUM;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${m.color}`}>
      {priority}
    </span>
  );
}

export default function TasksManager() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ todo: 0, inProgress: 0, inReview: 0, completed: 0, overdue: 0 });
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const emptyForm = { title: "", description: "", projectId: "", milestoneId: "", assigneeId: "", priority: "MEDIUM", status: "TODO", dueDate: "", estimatedHours: "", clientVisible: false };
  const [form, setForm] = useState(emptyForm);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterStatus) params.set("status", filterStatus);
      if (filterPriority) params.set("priority", filterPriority);
      if (filterProject) params.set("projectId", filterProject);
      const res = await fetch(`/api/admin/tasks?${params}`);
      const data = await res.json();
      setTasks(data?.tasks ?? []);
      if (data?.stats) setStats(data.stats);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [search, filterStatus, filterPriority, filterProject]);

  const loadProjects = useCallback(async () => {
    try {
      const [resMgmt, resDeals] = await Promise.all([
        fetch("/api/admin/projects-mgmt").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/projects").then((r) => r.json()).catch(() => ({})),
      ]);
      const listMgmt = (resMgmt?.projects ?? []).map((p) => ({ id: p.id, name: p.name || p.projectName }));
      const listDeals = (resDeals?.projects ?? []).map((p) => ({ id: p.id, name: p.projectName || p.dealName || p.name }));
      
      const map = new Map();
      for (const p of [...listMgmt, ...listDeals]) {
        if (p.id && p.name && !map.has(p.id)) {
          map.set(p.id, p);
        }
      }
      setProjects(Array.from(map.values()));
    } catch { /* ignore */ }
  }, []);

  const loadDevelopers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/team?role=DEVELOPER");
      const data = await res.json();
      setDevelopers(data?.users ?? []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);
  useEffect(() => { loadProjects(); loadDevelopers(); }, [loadProjects, loadDevelopers]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      title: t.title, description: t.description ?? "",
      projectId: t.projectId ?? "", milestoneId: t.milestoneId ?? "",
      assigneeId: t.assigneeId ?? "", priority: t.priority,
      status: t.status, dueDate: t.dueDate ? t.dueDate.split("T")[0] : "",
      estimatedHours: t.estimatedHours ?? "", clientVisible: t.clientVisible ?? false,
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.title.trim()) { setError("Task title is required."); return; }
    if (!form.projectId) { setError("Please select a project."); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/tasks/${editing.id}` : "/api/admin/tasks";
      const method = editing ? "PUT" : "POST";
      const dev = developers.find((d) => d.id === form.assigneeId);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, assigneeName: dev?.name || "" }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setShowForm(false);
      showToast(editing ? "Task updated." : "Task created.");
      loadTasks();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/tasks/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      showToast("Task deleted.");
      loadTasks();
    } catch { showToast("Failed to delete task."); }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await fetch(`/api/admin/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      loadTasks();
    } catch { /* ignore */ }
  };

  const statCards = [
    { label: "To Do", value: stats.todo, icon: Circle, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "In Review", value: stats.inReview, icon: AlertCircle, color: "text-violet-500", bg: "bg-violet-50" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-green", bg: "bg-green/10" },
    { label: "Overdue", value: stats.overdue, icon: Pause, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Tasks</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage and track all development tasks</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green/90 hover:shadow-md transition-all">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl border border-ink/5 bg-background p-4 shadow-sm">
            <div className={`mb-2 grid h-8 w-8 place-items-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="font-display text-xl font-semibold text-ink">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button onClick={loadTasks} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-sand/50" />)}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-ink">No Tasks</p>
            <p className="mt-1 text-sm text-muted-foreground">Create your first task to get started.</p>
            <button onClick={openCreate} className="mt-4 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white">Add Task</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/5">
                  {["Task", "Project", "Assignee", "Priority", "Status", "Due Date", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b border-ink/5 last:border-b-0 hover:bg-sand/20 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-ink">{t.title}</p>
                        {t.taskCode && <p className="text-xs text-muted-foreground">{t.taskCode}</p>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {t.projectName ? (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <FolderOpen className="h-3.5 w-3.5" />
                          <span className="text-xs">{t.projectName}</span>
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      {t.assigneeName ? (
                        <div className="flex items-center gap-1.5">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-green/10 text-[10px] font-bold text-green">
                            {t.assigneeName.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm text-ink">{t.assigneeName}</span>
                        </div>
                      ) : <span className="text-muted-foreground">Unassigned</span>}
                    </td>
                    <td className="px-5 py-4"><PriorityBadge priority={t.priority} /></td>
                    <td className="px-5 py-4">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg border border-ink/10 bg-transparent px-2 py-1 text-xs outline-none focus:border-green/40"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {t.dueDate ? (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(t.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(t)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-sand/60 hover:text-ink">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirm(t)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{editing ? "Edit Task" : "Add Task"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</div>}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Task Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10" placeholder="e.g. Payment Gateway API" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Project *</label>
                <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  <option value="">{projects.length ? "Select project..." : "No projects created yet"}</option>
                  {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Assign To</label>
                <select value={form.assigneeId} onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  <option value="">Unassigned</option>
                  {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Priority</label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Due Date</label>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Est. Hours</label>
                <input type="number" value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="8" min="0" />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 resize-none" placeholder="Task description..." />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2">
                <input type="checkbox" id="clientVisible" checked={form.clientVisible} onChange={(e) => setForm({ ...form, clientVisible: e.target.checked })}
                  className="h-4 w-4 accent-green" />
                <label htmlFor="clientVisible" className="text-sm text-muted-foreground">Visible to client</label>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sand/40">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-green py-2.5 text-sm font-semibold text-white hover:bg-green/90 disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            <h3 className="font-display font-semibold text-ink">Delete Task?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-medium text-ink">{deleteConfirm.title}</span>?
            </p>
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
