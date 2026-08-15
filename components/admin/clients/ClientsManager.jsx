"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Users,
  Layers3,
  Star,
} from "lucide-react";
import Modal from "../leads/Modal";
import ConfirmDialog from "../leads/ConfirmDialog";

const EMPTY = {
  clientName: "",
  website: "",
  email: "",
  phone: "",
  industry: "",
  companySize: "",
  address: "",
  city: "",
  country: "",
  notes: "",
};

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

export default function ClientsManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/clients?search=${encodeURIComponent(search)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.clients)) setClients(data.clients);
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

  const stats = useMemo(() => {
    const byIndustry = {};
    const byCountry = {};
    for (const c of clients) {
      byIndustry[c.industry || "Other"] = (byIndustry[c.industry || "Other"] || 0) + 1;
      byCountry[c.country || "Unknown"] = (byCountry[c.country || "Unknown"] || 0) + 1;
    }
    return {
      total: clients.length,
      topIndustry: Object.entries(byIndustry).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—",
      topCountry: Object.entries(byCountry).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—",
      contacts: clients.reduce((s, c) => s + (c.contactCount ?? 0), 0),
    };
  }, [clients]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      clientName: c.clientName ?? "",
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
    setFormOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim()) {
      toast.error("Client name is required.");
      return;
    }
    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/clients/${encodeURIComponent(editing.id)}`
        : "/api/admin/clients";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not save client.");
        return;
      }
      toast.success(editing ? "Client updated." : "Client created.");
      setFormOpen(false);
      await refresh();
    } catch {
      toast.error("Could not save client.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/clients/${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        toast.success("Client deleted.");
        setDeleteTarget(null);
        await refresh();
      } else {
        toast.error(data?.error || "Could not delete client.");
      }
    } catch {
      toast.error("Could not delete client.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-5 pb-10">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green/10 text-green">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              Clients
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
              Clients, accounts and organizations in your CRM.
            </p>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:bg-green/90"
        >
          <Plus className="h-4 w-4" /> Add client
        </button>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {[
          { label: "Total Clients", value: stats.total, icon: Building2, tone: "bg-green/10 text-green" },
          { label: "Contacts", value: stats.contacts, icon: Users, tone: "bg-blue-50 text-blue-600" },
          { label: "Top Industry", value: stats.topIndustry, icon: Layers3, tone: "bg-gold/10 text-gold" },
          { label: "Top Country", value: stats.topCountry, icon: Star, tone: "bg-violet-50 text-violet-600" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-[20px] border border-[#E7E5E1] bg-white p-4 shadow-[0_1px_2px_rgba(20,20,20,0.03)] sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 ${tone}`}>
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
                <p className="mt-0.5 truncate text-[22px] font-semibold leading-none text-ink sm:text-[24px]">
                  {value}
                </p>
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
            placeholder="Search clients by name, industry, city..."
            className="h-11 w-full rounded-xl border border-[#E7E5E1] bg-white pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/70 focus:border-green focus:ring-2 focus:ring-green/10"
          />
        </label>
      </div>

      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-ink/5 bg-background shadow-sm">
        <table className="w-full min-w-[900px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-ink/5 bg-[#F8F9FB] text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
              <th className="px-4 py-3.5 font-semibold">Client</th>
              <th className="px-3 py-3.5 font-semibold">Contact</th>
              <th className="px-3 py-3.5 font-semibold">Industry</th>
              <th className="px-3 py-3.5 font-semibold">Location</th>
              <th className="px-3 py-3.5 text-center font-semibold">Leads</th>
              <th className="px-3 py-3.5 text-center font-semibold">Contacts</th>
              <th className="px-3 py-3.5 text-center font-semibold">Projects</th>
              <th className="px-3 py-3.5 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-ink/5 transition-colors last:border-b-0 hover:bg-[#F8F9FB]">
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EAF3E8] text-green">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{c.clientName}</p>
                      {c.website && (
                        <a
                          href={c.website.startsWith("http") ? c.website : `https://${c.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-green hover:underline"
                        >
                          <Globe className="h-3 w-3" /> {c.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <p className="inline-flex items-center gap-1.5 text-ink">
                    <Mail className="h-3 w-3 text-muted-foreground/60" /> {c.email || "—"}
                  </p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Phone className="h-3 w-3" /> {c.phone || ""}
                  </p>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  {c.industry ? (
                    <span className="inline-flex rounded-md border border-[#E7E5E1] bg-[#F8F8F5] px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {c.industry}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-ink">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {[c.city, c.country].filter(Boolean).join(", ") || "—"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-center font-medium text-ink">{c.leadCount ?? 0}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-center font-medium text-ink">{c.contactCount ?? 0}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-center font-medium text-ink">{c.projectCount ?? 0}</td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-[#F5F5F1] hover:text-green"
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(c)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && !loading && (
              <tr>
                <td colSpan={8} className="px-4 py-14 text-center text-sm text-muted-foreground">
                  {search ? "No clients match your search." : "No clients yet. Create your first client."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit modal */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit client" : "Add client"}
        icon={Building2}
        size="lg"
      >
        <form onSubmit={submit} className="space-y-4 pb-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Client name" required>
                <input
                  value={form.clientName}
                  onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
                  className={inputCls}
                  placeholder="e.g. Peakline Media"
                />
              </Field>
            </div>
            <Field label="Website">
              <input
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                className={inputCls}
                placeholder="example.com"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputCls}
                placeholder="contact@example.com"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={inputCls}
                placeholder="+880 1XXXXXXXXX"
              />
            </Field>
            <Field label="Company size">
              <input
                value={form.companySize}
                onChange={(e) => setForm((f) => ({ ...f, companySize: e.target.value }))}
                className={inputCls}
                placeholder="e.g. 11-50"
              />
            </Field>
            <Field label="Industry">
              <input
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Technology"
              />
            </Field>
            <Field label="Country">
              <input
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Bangladesh"
              />
            </Field>
            <Field label="City">
              <input
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Dhaka"
              />
            </Field>
            <Field label="Address">
              <input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className={inputCls}
                placeholder="Street address"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="min-h-20 w-full resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="Internal notes about this client"
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
              {saving ? "Saving..." : "Save client"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete Client"
        message={`Are you sure you want to delete "${deleteTarget?.clientName}"? Contacts, leads, and projects linked to it will be unlinked.`}
      />
    </div>
  );
}
