"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Save, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

const FIELDS = [
  { key: "site_name", label: "Site Name", placeholder: "InfiniSoftech" },
  { key: "contact_email", label: "Contact Email", placeholder: "hello@infinisoftech.com" },
  { key: "announcement", label: "Announcement Bar Text", placeholder: "Generic text shown at the top of the site." },
];

export default function SettingsPanel({ initial }) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (message, tone = "success") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not save settings.", "error");
        return;
      }
      notify("Settings saved.");
    } catch {
      notify("Network error while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand/70 text-ink">
          <SettingsIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">Settings</h2>
          <p className="text-[11px] text-muted-foreground">Site-wide configuration</p>
        </div>
      </div>

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-medium ${
            toast.tone === "error" ? "bg-rose-50 text-rose-600" : "bg-green/10 text-green"
          }`}
        >
          {toast.tone === "error" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-xs font-semibold text-ink">{field.label}</label>
            <input
              type="text"
              value={values[field.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}