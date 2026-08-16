"use client";

import { useEffect, useState, useCallback } from "react";
import {
  TrendingUp, Plus, Search, RefreshCw, DollarSign,
  Briefcase, CheckCircle2, XCircle, ChevronRight, X, Pencil, Trash2,
} from "lucide-react";

const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const STAGE_COLORS = {
  New: "border-t-blue-500 bg-blue-50/40 text-blue-700",
  Contacted: "border-t-amber-500 bg-amber-50/40 text-amber-700",
  Qualified: "border-t-violet-500 bg-violet-50/40 text-violet-700",
  Proposal: "border-t-indigo-500 bg-indigo-50/40 text-indigo-700",
  Negotiation: "border-t-orange-500 bg-orange-50/40 text-orange-700",
  Won: "border-t-green bg-green/10 text-green",
  Lost: "border-t-rose-500 bg-rose-50/40 text-rose-700",
};

function formatUsd(v) {
  return `$${Number(v || 0).toLocaleString("en-US")}`;
}

export default function DealsManager() {
  const [deals, setDeals] = useState([]);
  const [summary, setSummary] = useState({ stages: [], totalPipeline: 0, weightedPipeline: 0, wonValue: 0, lostValue: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const emptyForm = { dealName: "", clientName: "", value: "", probability: "50", stage: "New", service: "", notes: "", expectedCloseDate: "" };
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/deals?${params}`);
      const data = await res.json();
      setDeals(data?.deals ?? []);
      if (data?.summary) setSummary(data.summary);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const openCreate = (stage = "New") => {
    setEditing(null);
    setForm({ ...emptyForm, stage });
    setError("");
    setShowForm(true);
  };

  const openEdit = (d) => {
    setEditing(d);
    setForm({
      dealName: d.dealName, clientName: d.clientName ?? "",
      value: d.value ?? "", probability: d.probability ?? "50",
      stage: d.stage ?? "New", service: d.service ?? "", notes: d.notes ?? "",
      expectedCloseDate: d.expectedCloseDate ? d.expectedCloseDate.split("T")[0] : "",
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setError("");
    if (!form.dealName.trim()) { setError("Deal name is required."); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/deals/${editing.id}` : "/api/admin/deals";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setShowForm(false);
      showToast(editing ? "Deal updated." : "Deal created.");
      load();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleStageChange = async (id, stage) => {
    try {
      await fetch(`/api/admin/deals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      load();
    } catch { /* ignore */ }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/deals/${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      showToast("Deal deleted.");
      load();
    } catch { showToast("Failed to delete deal."); }
  };

  const dealsByStage = STAGES.reduce((acc, st) => {
    acc[st] = deals.filter((d) => d.stage === st);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Sales Deals Pipeline</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Kanban sales pipeline and revenue forecasting</p>
        </div>
        <button onClick={() => openCreate("New")} className="flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green/90 transition-all shadow-sm">
          <Plus className="h-4 w-4" /> Add Deal
        </button>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-ink/5 bg-background p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Total Pipeline</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">{formatUsd(summary.totalPipeline)}</p>
        </div>
        <div className="rounded-2xl border border-ink/5 bg-background p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Weighted Pipeline</p>
          <p className="mt-1 font-display text-xl font-semibold text-blue-600">{formatUsd(summary.weightedPipeline)}</p>
        </div>
        <div className="rounded-2xl border border-ink/5 bg-background p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Won Revenue</p>
          <p className="mt-1 font-display text-xl font-semibold text-green">{formatUsd(summary.wonValue)}</p>
        </div>
        <div className="rounded-2xl border border-ink/5 bg-background p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Lost Revenue</p>
          <p className="mt-1 font-display text-xl font-semibold text-rose-600">{formatUsd(summary.lostValue)}</p>
        </div>
      </div>

      {/* Search & Refresh */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search deals..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink/10 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-green/40" />
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:thin]">
        {STAGES.map((stage) => {
          const list = dealsByStage[stage] ?? [];
          const stageTotal = list.reduce((sum, d) => sum + Number(d.value || 0), 0);
          return (
            <div key={stage} className="w-[280px] shrink-0 rounded-2xl border border-ink/5 bg-background p-3 shadow-sm flex flex-col min-h-[500px]">
              <div className={`mb-3 flex items-center justify-between border-t-4 pt-2 px-1 ${STAGE_COLORS[stage]}`}>
                <div>
                  <h3 className="font-semibold text-sm text-ink">{stage}</h3>
                  <p className="text-[11px] text-muted-foreground">{list.length} deals · {formatUsd(stageTotal)}</p>
                </div>
                <button onClick={() => openCreate(stage)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60 hover:text-ink">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {list.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => openEdit(deal)}
                    className="cursor-pointer rounded-xl border border-ink/5 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm text-ink line-clamp-1">{deal.dealName}</h4>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(deal); }} className="text-muted-foreground hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {deal.clientName && (
                      <p className="mt-1 text-xs text-muted-foreground">{deal.clientName}</p>
                    )}

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-bold text-ink">{formatUsd(deal.value)}</span>
                      <span className="rounded-full bg-sand/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {deal.probability}% win
                      </span>
                    </div>

                    <div className="mt-2.5 border-t border-ink/5 pt-2 flex items-center justify-between">
                      <select
                        value={deal.stage}
                        onChange={(e) => { e.stopPropagation(); handleStageChange(deal.id, e.target.value); }}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg border border-ink/10 bg-transparent px-2 py-1 text-[11px] outline-none focus:border-green/40"
                      >
                        {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {deal.service && <span className="text-[10px] text-muted-foreground truncate max-w-[90px]">{deal.service}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">{editing ? "Edit Deal" : "Add Deal"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-sand/60">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</div>}

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Deal Name *</label>
                <input value={form.dealName} onChange={(e) => setForm({ ...form, dealName: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="e.g. Website Redesign" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Client Name</label>
                <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="Acme Corp" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Value ($)</label>
                  <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="5000" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Win Probability (%)</label>
                  <input type="number" value={form.probability} onChange={(e) => setForm({ ...form, probability: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="50" min="0" max="100" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Stage</label>
                <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40">
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Service</label>
                <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-green/40" placeholder="e.g. Mobile App" />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border border-ink/10 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sand/40">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-green py-2.5 text-sm font-semibold text-white hover:bg-green/90 disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update Deal" : "Create Deal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            <h3 className="font-display font-semibold text-ink">Delete Deal?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to delete <span className="font-medium text-ink">{deleteConfirm.dealName}</span>?</p>
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
