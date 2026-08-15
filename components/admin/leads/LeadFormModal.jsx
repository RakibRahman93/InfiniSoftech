"use client";

import { useState } from "react";
import { User, Loader2 } from "lucide-react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const SOURCES = [
  "Website",
  "Facebook",
  "LinkedIn",
  "WhatsApp",
  "Google",
  "Referral",
  "Direct",
  "Campaign",
  "Contact form",
  "Customer dashboard",
  "Other",
];

function fieldCls(extra = "") {
  return `h-10 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10 ${extra}`;
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

export default function LeadFormModal({ open, onClose, existing, clients = [], onSubmit }) {
  const [form, setForm] = useState(() => emptyFrom(existing));
  const [saving, setSaving] = useState(false);

  function emptyFrom(lead) {
    return {
      leadNumber: lead?.leadNumber ?? "",
      name: lead?.name ?? "",
      email: lead?.email ?? "",
      phone: lead?.phone ?? "",
      companyId: lead?.companyId ?? "",
      subject: lead?.subject ?? "",
      service: lead?.service ?? "",
      message: lead?.message ?? "",
      source: lead?.source ?? "Website",
      status: lead?.status ?? "New",
      estimatedValue: lead?.estimatedValue != null ? String(lead.estimatedValue) : "",
      ownerName: lead?.ownerName ?? "",
      nextFollowUpAt: lead?.nextFollowUpAt ? String(lead.nextFollowUpAt).slice(0, 10) : "",
    };
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    try {
      const url = existing
        ? `/api/admin/leads/${encodeURIComponent(existing.id)}`
        : "/api/admin/leads";
      const res = await fetch(url, {
        method: existing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not save lead.");
        return;
      }
      toast.success(existing ? "Lead updated." : "Lead created.");
      onSubmit?.(data.lead);
      onClose();
    } catch {
      toast.error("Could not save lead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={existing ? "Edit lead" : "Add lead"}
      icon={User}
      size="lg"
    >
      <form onSubmit={submit} className="space-y-4 pb-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Name" required>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={fieldCls()}
                placeholder="Client name"
              />
            </Field>
          </div>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={fieldCls()}
              placeholder="client@example.com"
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={fieldCls()}
              placeholder="+880 1XXXXXXXXX"
            />
          </Field>
          <Field label="Client">
            <select
              value={form.companyId}
              onChange={(e) => setForm((f) => ({ ...f, companyId: e.target.value }))}
              className={fieldCls()}
            >
              <option value="">No client</option>
              {clients.map((co) => (
                <option key={co.id} value={co.id}>
                  {co.clientName}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Service">
            <input
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className={fieldCls()}
              placeholder="e.g. Website development"
            />
          </Field>
          <Field label="Subject">
            <input
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className={fieldCls()}
              placeholder="What is it about?"
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className={fieldCls()}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Source">
            <select
              value={form.source}
              onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
              className={fieldCls()}
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Estimated value (USD)">
            <input
              type="number"
              min={0}
              value={form.estimatedValue}
              onChange={(e) => setForm((f) => ({ ...f, estimatedValue: e.target.value }))}
              className={fieldCls()}
              placeholder="5000"
            />
          </Field>
          <Field label="Lead owner">
            <input
              value={form.ownerName}
              onChange={(e) => setForm((f) => ({ ...f, ownerName: e.target.value }))}
              className={fieldCls()}
              placeholder="Team member"
            />
          </Field>
          <Field label="Next follow-up">
            <input
              type="date"
              value={form.nextFollowUpAt}
              onChange={(e) => setForm((f) => ({ ...f, nextFollowUpAt: e.target.value }))}
              className={fieldCls()}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message">
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="min-h-20 w-full resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10"
                placeholder="Initial enquiry or notes"
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-ink/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-ink/10 px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-sand/60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
            {saving ? "Saving..." : existing ? "Save lead" : "Create lead"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { STATUSES, SOURCES };