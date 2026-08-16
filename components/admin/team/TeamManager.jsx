"use client";

import { useEffect, useState, useCallback } from "react";
import {
  UsersRound, Plus, Search, RefreshCw, X,
  Pencil, Trash2, Shield, Code2, Crown, CheckCircle2,
  ClipboardList, Clock, AlertTriangle, MoreHorizontal,
} from "lucide-react";

const ROLE_META = {
  SUPER_ADMIN: { label: "Super Admin", color: "bg-violet-100 text-violet-700", icon: Crown },
  ADMIN:       { label: "Admin / PM",  color: "bg-blue-100 text-blue-700",     icon: Shield },
  DEVELOPER:   { label: "Developer",   color: "bg-green/10 text-green",         icon: Code2 },
};

const ROLES = ["DEVELOPER", "ADMIN", "SUPER_ADMIN"];

function RoleBadge({ role }) {
  const m = ROLE_META[role] ?? ROLE_META.DEVELOPER;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${m.color}`}>
      <Icon className="h-3 w-3" /> {m.label}
    </span>
  );
}

function initials(name) {
  if (!name) return "??";
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const avatarColors = [
  "bg-blue-100 text-blue-700", "bg-green/10 text-green",
  "bg-violet-100 text-violet-700", "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700",
];
function getColor(name) {
  let hash = 0;
  for (const c of name ?? "") hash = (hash * 31 + c.charCodeAt(0)) % avatarColors.length;
  return avatarColors[hash];
}

export default function TeamManager() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const emptyForm = { name: "", email: "", password: "", role: "DEVELOPER", isActive: true };
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterRole) params.set("role", filterRole);
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/team?${params}`);
      const data = await res.json();
      setUsers(data?.users ?? []);
      setStats(data?.stats ?? []);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [filterRole, search]);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowPassword(true);
    setShowForm(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role, isActive: u.isActive });
    setError("");
    setShowPassword(false);
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.name.trim()) { setError("Name is required."); return; }
    if (!form.email.trim()) { setError("Email is required."); return; }
    if (!editing && (!form.password || form.password.length < 6)) { setError("Password must be at least 6 characters."); return; }
    setSaving(true);
    try {
      const payload = { ...form };
      if (editing && !form.password) delete payload.password;
      const url = editing ? `/api/admin/team/${editing.id}` : "/api/admin/team";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setShowForm(false);
      showToast(editing ? "Team member updated." : "Team member added.");
      load();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      showToast("Team member removed.");
      load();
    } catch { showToast("Failed to remove team member."); }
  };

  const devStats = stats.reduce((acc, s) => { acc[s.id] = s; return acc; }, {});

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Team</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage developers, admins, and roles</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green/90 hover:shadow-md transition-all">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search team..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10" />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm outline-none focus:border-green/40">
          <option value="">All Roles</option>
          {ROLES.map((r) => <option key={r} value={r}>{ROLE_META[r].label}</option>)}
        </select>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
        <span className="text-xs text-muted-foreground">{users.length} members</span>
      </div>

      {/* Member Cards */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-sand/50" />)}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-ink/5 bg-background py-16 text-center shadow-sm">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
            <UsersRound className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-semibold text-ink">No Team Members</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first developer or admin.</p>
          <button onClick={openCreate} className="mt-4 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white">Add Member</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => {
            const s = devStats[u.id];
            return (
              <div key={u.id} className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-bold ${getColor(u.name)}`}>
                      {initials(u.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(u)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-sand/60 hover:text-ink">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(u)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <RoleBadge role={u.role} />
                  {!u.isActive && (
                    <span className="inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">Inactive</span>
                  )}
                </div>

                {u.role === "DEVELOPER" && s && (
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-sand/40 p-3">
                    <div className="text-center">
                      <p className="font-display text-lg font-semibold text-ink">{s.assigned}</p>
                      <p className="text-[10px] text-muted-foreground">Assigned</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-semibold text-green">{s.completed}</p>
                      <p className="text-[10px] text-muted-foreground">Done</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display text-lg font-semibold text-blue-500">{s.inProgress}</p>
                      <p className="text-[10px] text-muted-foreground">Active</p>
                    </div>
                  </div>
                )}

                {u.role === "DEVELOPER" && s && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Completion Rate</span>
                      <span className="text-xs font-semibold text-ink">{s.completionRate}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand/60">
                      <div className="h-full rounded-full bg-green transition-all" style={{ width: `${s.completionRate}%` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{editing ? "Edit Member" : "Add Team Member"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</div>}

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10" placeholder="John Doe" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!!editing}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 disabled:bg-sand/30 disabled:text-muted-foreground" placeholder="john@company.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Role *</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  {ROLES.map((r) => <option key={r} value={r}>{ROLE_META[r].label}</option>)}
                </select>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">{editing ? "New Password (leave blank to keep)" : "Password *"}</label>
                </div>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40"
                  placeholder={editing ? "Leave blank to keep current" : "Min 6 characters"} />
              </div>
              {editing && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="h-4 w-4 accent-green" />
                  <label htmlFor="isActive" className="text-sm text-muted-foreground">Active account</label>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sand/40">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-green py-2.5 text-sm font-semibold text-white hover:bg-green/90 disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            <h3 className="font-display font-semibold text-ink">Remove Team Member?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to remove <span className="font-medium text-ink">{deleteConfirm.name}</span> from the team? Their tasks will remain but they will lose login access.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
