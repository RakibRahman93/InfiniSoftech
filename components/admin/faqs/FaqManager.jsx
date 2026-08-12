"use client";

import { useState } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

export default function FaqManager({ initialFaqs, live }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState({ question: "", answer: "" });

  const notify = (message, tone = "success") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.question.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: form.question.trim(), answer: form.answer.trim() }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not create FAQ.", "error");
        return;
      }
      setFaqs((prev) => [...prev, data.faq]);
      setShowForm(false);
      setForm({ question: "", answer: "" });
      notify("FAQ created.");
    } catch {
      notify("Network error while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (faq) => {
    if (deletingId !== faq.id) {
      setDeletingId(faq.id);
      return;
    }
    setDeletingId(null);
    try {
      const res = await fetch(`/api/admin/faqs?id=${encodeURIComponent(faq.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not delete FAQ.", "error");
        return;
      }
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
      notify("FAQ deleted.");
    } catch {
      notify("Network error while deleting.", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">FAQs</h2>
            <p className="text-[11px] text-muted-foreground">
              {faqs.length} question{faqs.length === 1 ? "" : "s"} ·{" "}
              {live ? "Supabase-backed" : "sample data"}
            </p>
          </div>
        </div>
        <button
          data-no-sparkle
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Close" : "New FAQ"}
        </button>
      </div>

      {!live && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            The <code className="rounded bg-sand/70 px-1">faqs</code> table was not found in
            Supabase, so you are viewing sample content. Create a <em>faqs</em> table (id, question,
            answer, &quot;order&quot;) to manage live content.
          </p>
        </div>
      )}

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

      <div className="space-y-2.5">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm"
            >
              <div className="flex items-center gap-3">
                <button
                  data-no-sparkle
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex flex-1 items-center gap-3 px-4 py-3.5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-ink">{faq.question}</span>
                </button>
                <button
                  data-no-sparkle
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-sand/60"
                  aria-label={isOpen ? "Collapse" : "Expand"}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <button
                  data-no-sparkle
                  onClick={() => handleDelete(faq)}
                  className={`mr-3 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                    deletingId === faq.id
                      ? "bg-rose-600 text-white"
                      : "text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {deletingId === faq.id ? "Confirm?" : "Delete"}
                </button>
              </div>
              {isOpen && (
                <p className="border-t border-ink/5 bg-sand/20 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
        {faqs.length === 0 && (
          <div className="rounded-2xl border border-ink/5 bg-background px-4 py-14 text-center text-xs text-muted-foreground">
            No FAQs yet. Create your first question.
          </div>
        )}
      </div>

      {showForm && (
        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">New FAQ</h3>
          <form onSubmit={handleCreate} className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Question</label>
              <input
                type="text"
                required
                value={form.question}
                onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                placeholder="What would customers like to know?"
                className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Answer</label>
              <textarea
                rows={4}
                value={form.answer}
                onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                placeholder="A clear, helpful answer."
                className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving…" : "Add FAQ"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}