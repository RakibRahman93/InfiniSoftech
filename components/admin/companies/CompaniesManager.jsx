"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Building2, Plus, Search, RefreshCw, MoreHorizontal,
  Globe, Mail, Phone, MapPin, Users, Pencil, Trash2, X, ChevronRight,
} from "lucide-react";

const INDUSTRY_OPTIONS = [
  "Technology", "E-Commerce", "Healthcare", "Finance", "Education",
  "Manufacturing", "Retail", "Real Estate", "Media", "Consulting", "Other",
];

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const initials = (name) => {
  if (!name) return "??";
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
};

const avatarColors = [
  "bg-blue-100 text-blue-700", "bg-green/10 text-green",
  "bg-violet-100 text-violet-700", "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700", "bg-gold/10 text-gold",
];

function getColor(name) {
  let hash = 0;
  for (const c of name ?? "") hash = (hash * 31 + c.charCodeAt(0)) % avatarColors.length;
  return avatarColors[hash];
}

export default function CompaniesManager() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    companyName: "", website: "", email: "", phone: "",
    industry: "", companySize: "", address: "", city: "", country: "", notes: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/companies?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setCompanies(data?.companies ?? []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ companyName: "", website: "", email: "", phone: "", industry: "", companySize: "", address: "", city: "", country: "", notes: "" });
    setError("");
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      companyName: c.companyName ?? "",
      website: c.website ?? "",
      email: c.email ?? "",
      phone: c.phone ?? "",
      industry: c.industry ?? "",
      companySize: c.companySize ?? "",
      address: c.address ?? "",
      city: c.city ?? "",
      country: c.country ?? "",
      notes: c.notes ?? "",
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.companyName.trim()) { setError("Company name is required."); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/companies/${editing.id}` : "/api/admin/companies";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setShowForm(false);
      showToast(editing ? "Company updated." : "Company created.");
      load();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/companies/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      setSelected(null);
      showToast("Company deleted.");
      load();
    } catch { showToast("Failed to delete company."); }
  };

  const filtered = companies.filter(
    (c) =>
      !search ||
      c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      c.industry?.toLowerCase().includes(search.toLowerCase()) ||
      c.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Companies</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage all companies and organizations</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green/90 hover:shadow-md"
        >
          <Plus className="h-4 w-4" /> Add Company
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10"
          />
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
        <span className="text-xs text-muted-foreground">{filtered.length} companies</span>
      </div>

      {/* Content */}
      <div className="flex gap-4">
        {/* Table */}
        <div className={`flex-1 overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm ${selected ? "hidden xl:block" : ""}`}>
          {loading ? (
            <div className="space-y-3 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-sand/50" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-ink">No Companies</p>
              <p className="mt-1 text-sm text-muted-foreground">Add your first company to get started.</p>
              <button onClick={openCreate} className="mt-4 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white">
                Add Company
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/5">
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Company</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Industry</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Location</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contact</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Size</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(selected?.id === c.id ? null : c)}
                      className={`cursor-pointer border-b border-ink/5 last:border-b-0 transition-colors hover:bg-sand/30 ${selected?.id === c.id ? "bg-green/5" : ""}`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${getColor(c.companyName)}`}>
                            {initials(c.companyName)}
                          </div>
                          <div>
                            <p className="font-semibold text-ink">{c.companyName}</p>
                            {c.website && <p className="text-xs text-muted-foreground">{c.website}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {c.industry ? (
                          <span className="inline-flex rounded-full border border-ink/5 bg-sand/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                            {c.industry}
                          </span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {[c.city, c.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{c.email || c.phone || "—"}</td>
                      <td className="px-5 py-4 text-muted-foreground">{c.companySize || "—"}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={(e) => { e.stopPropagation(); openEdit(c); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-sand/60 hover:text-ink">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(c); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selected?.id === c.id ? "rotate-90 text-green" : ""}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-full xl:w-[340px] shrink-0 rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-xl text-sm font-bold ${getColor(selected.companyName)}`}>
                  {initials(selected.companyName)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{selected.companyName}</p>
                  {selected.industry && <p className="text-xs text-muted-foreground">{selected.industry}</p>}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {selected.website && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" className="truncate text-green hover:underline">{selected.website}</a>
                </div>
              )}
              {selected.email && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-ink">{selected.email}</span>
                </div>
              )}
              {selected.phone && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-ink">{selected.phone}</span>
                </div>
              )}
              {(selected.city || selected.country) && (
                <div className="flex items-center gap-2.5 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-ink">{[selected.address, selected.city, selected.country].filter(Boolean).join(", ")}</span>
                </div>
              )}
              {selected.companySize && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-ink">{selected.companySize} employees</span>
                </div>
              )}
            </div>

            {selected.notes && (
              <div className="mt-4 rounded-xl bg-sand/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes</p>
                <p className="mt-1 text-sm text-ink">{selected.notes}</p>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button onClick={() => openEdit(selected)} className="flex-1 rounded-xl border border-ink/10 py-2 text-sm font-medium text-ink hover:bg-sand/40">
                Edit
              </button>
              <button onClick={() => setDeleteConfirm(selected)} className="rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{editing ? "Edit Company" : "Add Company"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</div>}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Company Name *</label>
                <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 focus:ring-2 focus:ring-green/10" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Industry</label>
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  <option value="">Select industry</option>
                  {INDUSTRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Company Size</label>
                <select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  <option value="">Select size</option>
                  {COMPANY_SIZE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="contact@company.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="+1 234 567 890" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Website</label>
                <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="https://company.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">City</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="Dhaka" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Country</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="Bangladesh" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Address</label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="Street address" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40 resize-none" placeholder="Internal notes..." />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sand/40">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 rounded-xl bg-green py-2.5 text-sm font-semibold text-white hover:bg-green/90 disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            <h3 className="font-display font-semibold text-ink">Delete Company?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-medium text-ink">{deleteConfirm.companyName}</span>? This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
