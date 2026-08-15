"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  Contact,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Users,
  UserCheck,
  BadgeCheck,
} from "lucide-react";
import Modal from "../leads/Modal";
import ConfirmDialog from "../leads/ConfirmDialog";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  companyId: "",
  source: "Other",
  status: "Active",
  notes: "",
};

const SOURCES = ["Website", "Facebook", "LinkedIn", "WhatsApp", "Google", "Referral", "Direct", "Campaign", "Other"];

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

function initials(name) {
  return String(name ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState([]);
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
      const [cRes, coRes] = await Promise.all([
        fetch(`/api/admin/contacts?search=${encodeURIComponent(search)}`),
        fetch("/api/admin/clients"),
      ]);
      const cData = await cRes.json();
      const coData = await coRes.json();
      if (Array.isArray(cData?.contacts)) setContacts(cData.contacts);
      if (Array.isArray(coData?.clients)) setClients(coData.clients);
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
    const active = contacts.filter((c) => c.status === "Active").length;
    return { total: contacts.length, active, clients: new Set(contacts.map((c) => c.companyId)).size };
  }, [contacts]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setFormOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      name: c.name ?? "",
      email: c.email ?? "",
      phone: c.phone ?? "",
      designation: c.designation ?? "",
      companyId: c.companyId ?? "",
      source: c.source ?? "Other",
      status: c.status ?? "Active",
      notes: c.notes ?? "",
    });
    setFormOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Contact name is required.");
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/contacts/${encodeURIComponent(editing.id)}` : "/api/admin/contacts";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not save contact.");
        return;
      }
      toast.success(editing ? "Contact updated." : "Contact created.");
      setFormOpen(false);
      await refresh();
    } catch {
      toast.error("Could not save contact.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/contacts/${encodeURIComponent(deleteTarget.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && !data.error) {
        toast.success("Contact deleted.");
        setDeleteTarget(null);
        await refresh();
      } else {
        toast.error(data?.error || "Could not delete contact.");
      }
    } catch {
      toast.error("Could not delete contact.");
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
            <Contact className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
              Contacts
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
              People you talk to across every company and lead.
            </p>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:bg-green/90"
        >
          <Plus className="h-4 w-4" /> Add contact
        </button>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {[
          { label: "Total Contacts", value: stats.total, icon: Users, tone: "bg-green/10 text-green" },
          { label: "Active", value: stats.active, icon: UserCheck, tone: "bg-blue-50 text-blue-600" },
          { label: "Clients", value: stats.clients, icon: Building2, tone: "bg-gold/10 text-gold" },
          { label: "Reachable", value: contacts.filter((c) => c.email || c.phone).length, icon: BadgeCheck, tone: "bg-violet-50 text-violet-600" },
        ].map(({ label, value, icon: Icon, tone }) => (
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
                <p className="mt-0.5 text-[22px] font-semibold leading-none text-ink sm:text-[24px]">{value}</p>
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
            placeholder="Search contacts by name, email, company..."
            className="h-11 w-full rounded-xl border border-[#E7E5E1] bg-white pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/70 focus:border-green focus:ring-2 focus:ring-green/10"
          />
        </label>
      </div>

      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-ink/5 bg-background shadow-sm">
        <table className="w-full min-w-[860px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-ink/5 bg-[#F8F9FB] text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
              <th className="px-4 py-3.5 font-semibold">Contact</th>
              <th className="px-3 py-3.5 font-semibold">Company</th>
              <th className="px-3 py-3.5 font-semibold">Designation</th>
              <th className="px-3 py-3.5 font-semibold">Email</th>
              <th className="px-3 py-3.5 font-semibold">Phone</th>
              <th className="px-3 py-3.5 font-semibold">Source</th>
              <th className="px-3 py-3.5 font-semibold">Status</th>
              <th className="px-3 py-3.5 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-ink/5 transition-colors last:border-b-0 hover:bg-[#F8F9FB]">
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EAF3E8] text-xs font-semibold text-green">
                      {initials(c.name)}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{c.name}</p>
                      {c.notes && <p className="mt-0.5 max-w-[160px] truncate text-[11px] text-muted-foreground">{c.notes}</p>}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  {c.companyName ? (
                    <span className="inline-flex items-center gap-1 text-ink">
                      <Building2 className="h-3 w-3 text-muted-foreground/60" /> {c.companyName}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  {c.designation ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Briefcase className="h-3 w-3" /> {c.designation}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  {c.email ? (
                    <span className="inline-flex items-center gap-1 text-ink">
                      <Mail className="h-3 w-3 text-muted-foreground/60" /> {c.email}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  {c.phone ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" /> {c.phone}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span className="inline-flex rounded-md border border-[#E7E5E1] bg-[#F8F8F5] px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    {c.source}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span
                    className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${
                      c.status === "Active"
                        ? "border-green/15 bg-green/10 text-green"
                        : "border-ink/10 bg-sand/50 text-muted-foreground"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
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
            {contacts.length === 0 && !loading && (
              <tr>
                <td colSpan={8} className="px-4 py-14 text-center text-sm text-muted-foreground">
                  {search ? "No contacts match your search." : "No contacts yet. Add your first contact."}
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
        title={editing ? "Edit contact" : "Add contact"}
        icon={Contact}
        size="lg"
      >
        <form onSubmit={submit} className="space-y-4 pb-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Full name" required>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputCls}
                  placeholder="Contact name"
                />
              </Field>
            </div>
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
            <Field label="Client">
              <select
                value={form.companyId}
                onChange={(e) => setForm((f) => ({ ...f, companyId: e.target.value }))}
                className={inputCls}
              >
                <option value="">No client</option>
                {clients.map((co) => (
                  <option key={co.id} value={co.id}>
                    {co.clientName}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Designation">
              <input
                value={form.designation}
                onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Founder, CEO"
              />
            </Field>
            <Field label="Source">
              <select
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                className={inputCls}
              >
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className={inputCls}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="min-h-20 w-full resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="Internal notes about this contact"
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
              {saving ? "Saving..." : "Save contact"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete Contact"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
      />
    </div>
  );
}