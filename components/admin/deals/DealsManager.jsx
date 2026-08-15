"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  TrendingUp,
  Wallet,
  Trophy,
  XCircle,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ChevronsRight,
  CalendarDays,
  Building2,
  User as UserIcon,
  LayoutGrid,
  Rows3,
} from "lucide-react";
import Modal from "../leads/Modal";
import ConfirmDialog from "../leads/ConfirmDialog";

export const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const STAGE_STYLES = {
  New: "border-blue-200 bg-blue-50 text-blue-600",
  Contacted: "border-orange-200 bg-orange-50 text-orange-600",
  Qualified: "border-violet-200 bg-violet-50 text-violet-600",
  Proposal: "border-amber-200 bg-amber-50 text-amber-700",
  Negotiation: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-600",
  Won: "border-green/15 bg-green/10 text-green",
  Lost: "border-rose-200 bg-rose-50 text-rose-600",
};

const EMPTY = {
  dealName: "",
  clientName: "",
  contactId: "",
  companyId: "",
  value: "",
  probability: 10,
  expectedCloseDate: "",
  stage: "New",
  service: "",
  notes: "",
};

function fmtMoney(v) {
  const n = Number(v ?? 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function fmtDate(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "h-10 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10";

export default function DealsManager() {
  const [view, setView] = useState("board");
  const [deals, setDeals] = useState([]);
  const [summary, setSummary] = useState({ total: 0, weighted: 0, won: 0, lost: 0, stages: [] });
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [movingId, setMovingId] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const [dRes, coRes] = await Promise.all([
        fetch(`/api/admin/deals?search=${encodeURIComponent(search)}`),
        fetch("/api/admin/companies"),
      ]);
      const dData = await dRes.json();
      const coData = await coRes.json();
      if (Array.isArray(dData?.deals)) setDeals(dData.deals);
      if (dData?.summary) setSummary(dData.summary);
      if (Array.isArray(coData?.companies)) setCompanies(coData.companies);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => refresh(), 250);
    return () => clearTimeout(t);
  }, [refresh]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormOpen(true);
  };

  const openEdit = (d) => {
    setEditing(d);
    setForm({
      dealName: d.dealName ?? "",
      clientName: d.clientName ?? "",
      contactId: d.contactId ?? "",
      companyId: d.companyId ?? "",
      value: d.value != null ? String(d.value) : "",
      probability: d.probability ?? 10,
      expectedCloseDate: d.expectedCloseDate ? String(d.expectedCloseDate).slice(0, 10) : "",
      stage: d.stage ?? "New",
      service: d.service ?? "",
      notes: d.notes ?? "",
    });
    setFormOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.dealName.trim()) {
      toast.error("Deal name is required.");
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/deals/${encodeURIComponent(editing.id)}` : "/api/admin/deals";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not save deal.");
        return;
      }
      toast.success(editing ? "Deal updated." : "Deal created.");
      setFormOpen(false);
      await refresh();
    } catch {
      toast.error("Could not save deal.");
    } finally {
      setSaving(false);
    }
  };

  const moveStage = async (deal, stage) => {
    if (deal.stage === stage) return;
    setMovingId(deal.id);
    try {
      const res = await fetch(`/api/admin/deals/${encodeURIComponent(deal.id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not update stage.");
        return;
      }
      setDeals((prev) => prev.map((d) => (d.id === deal.id ? { ...d, stage } : d)));
      await refresh();
    } catch {
      toast.error("Could not update stage.");
    } finally {
      setMovingId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/deals/${encodeURIComponent(deleteTarget.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && !data.error) {
        toast.success("Deal deleted.");
        setDeleteTarget(null);
        await refresh();
      } else {
        toast.error(data?.error || "Could not delete deal.");
      }
    } catch {
      toast.error("Could not delete deal.");
    } finally {
      setDeleting(false);
    }
  };

  const board = useMemo(() => {
    const columns = STAGES.map((s) => ({ stage: s, deals: deals.filter((d) => d.stage === s) }));
    return columns;
  }, [deals]);

  const statCards = useMemo(
    () => [
      { label: "Total Pipeline Value", value: fmtMoney(summary.total ?? 0), icon: Wallet, tone: "bg-blue-50 text-blue-600" },
      { label: "Weighted Pipeline", value: fmtMoney(summary.weighted ?? 0), icon: TrendingUp, tone: "bg-violet-50 text-violet-600" },
      { label: "Won Value", value: fmtMoney(summary.won ?? 0), icon: Trophy, tone: "bg-green/10 text-green" },
      { label: "Lost Value", value: fmtMoney(summary.lost ?? 0), icon: XCircle, tone: "bg-rose-50 text-rose-600" },
    ],
    [summary],
  );

  return (
    <div className="space-y-5 pb-10">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green/10 text-green">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              Deals
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
              Sales pipeline — track every opportunity from New to Won.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-ink/10 bg-[#F8F8F5] p-1">
            <button
              onClick={() => setView("board")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                view === "board" ? "bg-white text-ink shadow-sm" : "text-muted-foreground hover:text-ink"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Board
            </button>
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                view === "list" ? "bg-white text-ink shadow-sm" : "text-muted-foreground hover:text-ink"
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" /> List
            </button>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:bg-green/90"
          >
            <Plus className="h-4 w-4" /> Add deal
          </button>
        </div>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-[20px] border border-[#E7E5E1] bg-white p-4 shadow-[0_1px_2px_rgba(20,20,20,0.03)] sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 ${tone}`}>
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
                <p className="mt-0.5 text-[20px] font-semibold leading-none text-ink sm:text-[23px]">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Search */}
      <div>
        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals by name, client, company..."
            className="h-11 w-full rounded-xl border border-[#E7E5E1] bg-white pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/70 focus:border-green focus:ring-2 focus:ring-green/10"
          />
        </label>
      </div>

      {view === "board" ? (
        /* ── Kanban board ── */
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {board.map(({ stage, deals: stageDeals }) => {
              const stageValue = (summary.stages ?? []).find((s) => s.stage === stage)?.value ?? 0;
              return (
                <div key={stage} className="flex w-[280px] flex-col rounded-2xl border border-ink/5 bg-[#FAF9F6]">
                  <div className="flex items-center justify-between border-b border-ink/5 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-ink/30" />
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink">{stage}</p>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
                        {stageDeals.length}
                      </span>
                    </div>
                    {stageValue > 0 && <span className="text-[11px] font-semibold text-muted-foreground">{fmtMoney(stageValue)}</span>}
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-3">
                    {stageDeals.length === 0 && (
                      <button
                        onClick={openCreate}
                        className="rounded-xl border border-dashed border-ink/15 px-4 py-8 text-xs font-medium text-muted-foreground/70 transition hover:border-green/40 hover:text-green"
                      >
                        + Add deal
                      </button>
                    )}
                    {stageDeals.map((d) => (
                      <div key={d.id} className="group rounded-xl border border-ink/5 bg-white p-3.5 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-ink">{d.dealName}</p>
                          {movingId === d.id && <Loader2 className="h-3.5 w-3.5 animate-spin text-green" />}
                        </div>
                        {d.clientName && (
                          <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <UserIcon className="h-3 w-3" /> {d.clientName}
                          </p>
                        )}
                        {d.companyName && (
                          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Building2 className="h-3 w-3" /> {d.companyName}
                          </p>
                        )}
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-sm font-bold text-ink">{fmtMoney(d.value)}</span>
                          <span className="text-[10px] font-semibold text-muted-foreground">{d.probability}%</span>
                        </div>
                        {d.expectedCloseDate && (
                          <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground/70">
                            <CalendarDays className="h-3 w-3" /> Closes {fmtDate(d.expectedCloseDate)}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-1.5 border-t border-ink/5 pt-2.5">
                          <select
                            value={d.stage}
                            onChange={(e) => moveStage(d, e.target.value)}
                            className="h-7 flex-1 cursor-pointer rounded-lg border border-ink/10 bg-background px-1.5 text-[10px] font-semibold text-ink outline-none focus:border-green"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => openEdit(d)}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-[#F5F5F1] hover:text-green"
                            title="Edit"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(d)}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {stageDeals.length > 0 && (
                      <button
                        onClick={openCreate}
                        className="rounded-xl border border-dashed border-ink/10 px-4 py-2.5 text-xs font-medium text-muted-foreground/60 transition hover:border-green/40 hover:text-green"
                      >
                        + Add deal
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── List table ── */
        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-ink/5 bg-background shadow-sm">
          <table className="w-full min-w-[880px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink/5 bg-[#F8F9FB] text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                <th className="px-4 py-3.5 font-semibold">Deal</th>
                <th className="px-3 py-3.5 font-semibold">Client</th>
                <th className="px-3 py-3.5 font-semibold">Company</th>
                <th className="px-3 py-3.5 font-semibold">Value</th>
                <th className="px-3 py-3.5 font-semibold">Probability</th>
                <th className="px-3 py-3.5 font-semibold">Close date</th>
                <th className="px-3 py-3.5 font-semibold">Stage</th>
                <th className="px-3 py-3.5 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="border-b border-ink/5 transition-colors last:border-b-0 hover:bg-[#F8F9FB]">
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <p className="font-semibold text-ink">{d.dealName}</p>
                    {d.service && <p className="mt-0.5 text-[11px] text-muted-foreground">{d.service}</p>}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-ink">{d.clientName || "—"}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-ink">{d.companyName || "—"}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-ink">{fmtMoney(d.value)}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-ink">{d.probability}%</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-muted-foreground">{fmtDate(d.expectedCloseDate)}</td>
                  <td className="whitespace-nowrap px-3 py-3.5">
                    <span className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${STAGE_STYLES[d.stage] ?? "bg-sand/50 text-muted-foreground"}`}>
                      {d.stage}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <select
                        value={d.stage}
                        onChange={(e) => moveStage(d, e.target.value)}
                        className="h-8 rounded-lg border border-ink/10 bg-background px-1.5 text-[10px] font-semibold text-ink outline-none focus:border-green"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => openEdit(d)}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-[#F5F5F1] hover:text-green"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(d)}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {deals.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-sm text-muted-foreground">
                    {search ? "No deals match your search." : "No deals yet. Create your first deal."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit deal" : "Add deal"}
        icon={TrendingUp}
        size="lg"
      >
        <form onSubmit={submit} className="space-y-4 pb-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Deal name" required>
                <input
                  value={form.dealName}
                  onChange={(e) => setForm((f) => ({ ...f, dealName: e.target.value }))}
                  className={inputCls}
                  placeholder="e.g. Website rebuild for Peakline"
                />
              </Field>
            </div>
            <Field label="Client name">
              <input
                value={form.clientName}
                onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                className={inputCls}
                placeholder="Client / contact name"
              />
            </Field>
            <Field label="Company">
              <select
                value={form.companyId}
                onChange={(e) => setForm((f) => ({ ...f, companyId: e.target.value }))}
                className={inputCls}
              >
                <option value="">No company</option>
                {companies.map((co) => (
                  <option key={co.id} value={co.id}>
                    {co.companyName}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Value (USD)">
              <input
                type="number"
                min={0}
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                className={inputCls}
                placeholder="5000"
              />
            </Field>
            <Field label="Probability (%)">
              <input
                type="number"
                min={0}
                max={100}
                value={form.probability}
                onChange={(e) => setForm((f) => ({ ...f, probability: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Expected close date">
              <input
                type="date"
                value={form.expectedCloseDate}
                onChange={(e) => setForm((f) => ({ ...f, expectedCloseDate: e.target.value }))}
                className={inputCls}
              />
            </Field>
            <Field label="Stage">
              <select
                value={form.stage}
                onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}
                className={inputCls}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Service">
              <input
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Website development"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="min-h-20 w-full resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="Internal notes about this deal"
                />
              </Field>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-ink/10 pt-4">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-ink/10 px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-sand/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? "Saving..." : "Save deal"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete Deal"
        message={`Are you sure you want to delete "${deleteTarget?.dealName}"?`}
      />
    </div>
  );
}