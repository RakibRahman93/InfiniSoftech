"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  UserRound,
  Plus,
  X,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useCustomerLeads, unreadForLead, formatDate } from "@/components/customer/useCustomerLeads";
import { subscribeToRealtime } from "@/lib/realtime/client";

const statusStyles = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Contacted: "bg-orange-50 text-orange-600 border-orange-200",
  Qualified: "bg-violet-50 text-violet-600 border-violet-200",
  Won: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function CustomerEnquiriesPage() {
  const { leads, loading, refresh } = useCustomerLeads();
  const [drafts, setDrafts] = useState({});
  const [sendingId, setSendingId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    subject: "",
    message: "",
  });
  const initializedExpanded = useRef(false);

  useEffect(() => {
    if (!loading && leads.length > 0 && !initializedExpanded.current) {
      initializedExpanded.current = true;
      setExpandedIds(new Set(leads.map((item) => item.id)));
    }
  }, [loading, leads]);

  // Realtime: in-app SSE events push instantly; the hook's 15s polling is the fallback.
  useEffect(() => {
    return subscribeToRealtime(() => refresh());
  }, [refresh]);

  async function sendMessage(leadId) {
    const message = (drafts[leadId] || "").trim();
    if (!message || sendingId) return;
    setSendingId(leadId);
    try {
      const res = await fetch(`/api/customer/leads/${encodeURIComponent(leadId)}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data?.error || "Could not send message.");
        return;
      }
      setDrafts((current) => ({ ...current, [leadId]: "" }));
      toast.success("Message sent to our team.");
      await refresh();
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setSendingId(null);
    }
  }

  async function submitRequest(e) {
    e.preventDefault();
    const payload = {
      ...requestForm,
      name: requestForm.name.trim(),
      email: requestForm.email.trim(),
      phone: requestForm.phone.trim(),
      message: requestForm.message.trim(),
    };
    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      toast.error("Please fill in name, email, phone, and a short message.");
      return;
    }
    setRequestSubmitting(true);
    try {
      if (editingEnquiry) {
        const res = await fetch(`/api/customer/leads/${encodeURIComponent(editingEnquiry.id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          toast.error(data?.error || "Could not update enquiry.");
          return;
        }
        toast.success("Enquiry updated.");
      } else {
        const res = await fetch("/api/customer/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          toast.error(data?.error || "Could not create enquiry.");
          return;
        }
        toast.success("Enquiry created.");
      }
      setRequestModalOpen(false);
      setEditingEnquiry(null);
      setRequestForm({ name: "", email: "", phone: "", company: "", service: "", subject: "", message: "" });
      initializedExpanded.current = false;
      await refresh();
    } catch {
      toast.error(editingEnquiry ? "Could not update enquiry." : "Could not create enquiry.");
    } finally {
      setRequestSubmitting(false);
    }
  }

  function openNewRequest() {
    setEditingEnquiry(null);
    setRequestForm({ name: "", email: "", phone: "", company: "", service: "", subject: "", message: "" });
    setRequestModalOpen(true);
  }

  function openEdit(item) {
    const first = (item.replies ?? []).find((r) => r.direction === "incoming") ?? null;
    const displayEmail = first?.email || item.email || "";
    setEditingEnquiry(item);
    setRequestForm({
      name: item.name || "",
      email: displayEmail,
      phone: item.phone || "",
      company: item.company || "",
      service: item.service || "",
      subject: item.subject || "",
      message: item.message || "",
    });
    setRequestModalOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/customer/leads/${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data?.error || "Could not delete enquiry.");
        return;
      }
      toast.success("Enquiry deleted.");
      setDeleteTarget(null);
      await refresh();
    } catch {
      toast.error("Could not delete enquiry.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const hasAny = leads.length > 0;

  return (
    <div className="space-y-6 pb-10">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">My Enquiries</h1>
          <p className="text-xs text-muted-foreground">
            View your requests, real-time replies, and chat directly with our team.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openNewRequest()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New enquiry
        </button>
      </div>

      {!hasAny ? (
        <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-sand">
            <MessageSquare className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-ink">No enquiries yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit a project enquiry or a free strategy call request and our team will get back to
            you — live, right here.
          </p>
          <button
            type="button"
            onClick={() => openNewRequest()}
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-green px-6 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:opacity-90"
          >
            Get started
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((item) => {
            const expanded = expandedIds.has(item.id);
            const unread = unreadForLead(item);
            const statusClass = statusStyles[item.status] || "bg-sand/50 text-muted-foreground";
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
                      <UserRound className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-base font-semibold text-ink">
                        {item.subject || item.service || "Project enquiry"}
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.name}
                        {item.company ? ` · ${item.company}` : ""}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/70">
                        Submitted {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unread > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green px-2.5 py-1 text-[10px] font-bold text-white">
                        {unread} new{unread === 1 ? "" : "s"}
                      </span>
                    )}
                    <span
                      className={`inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-semibold ${statusClass}`}
                    >
                      {item.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 text-muted-foreground transition hover:bg-sand/50 hover:text-ink"
                      aria-label="Edit enquiry"
                      title="Edit enquiry"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 text-muted-foreground transition hover:bg-rose-50 hover:text-rose-600"
                      aria-label="Delete enquiry"
                      title="Delete enquiry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={expanded ? "Minimize enquiry" : "Expand enquiry"}
                      onClick={() =>
                        setExpandedIds((current) => {
                          const next = new Set(current);
                          if (next.has(item.id)) next.delete(item.id);
                          else next.add(item.id);
                          return next;
                        })
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 text-muted-foreground transition hover:bg-sand/50 hover:text-ink"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {expanded && (
                  <>
                    {item.message && (
                      <div className="mt-4 rounded-xl border border-ink/5 bg-[#F8F9FB] p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Your enquiry
                        </p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{item.message}</p>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 rounded-xl border border-ink/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Conversation
                      </p>
                      {item.replies.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-6 text-center">
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-sand/60">
                            <MessageSquare className="h-4 w-4 text-muted-foreground/30" />
                          </div>
                          <p className="text-xs text-muted-foreground/50">No messages yet</p>
                        </div>
                      ) : (
                        item.replies.map((reply) => {
                          const isCustomer = reply.direction === "incoming";
                          return (
                            <div
                              key={reply.id}
                              className={`flex gap-2.5 ${isCustomer ? "flex-row-reverse" : ""}`}
                            >
                              <span
                                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1 ${
                                  isCustomer
                                    ? "bg-green/10 text-green ring-green/20"
                                    : "bg-blue-50 text-blue-600 ring-blue-200"
                                }`}
                              >
                                <UserRound className="h-3.5 w-3.5" />
                              </span>
                              <div
                                className={`max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 ${
                                  isCustomer
                                    ? "bg-green/[0.06] text-ink"
                                    : "bg-blue-50 text-ink"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-semibold text-ink">
                                    {isCustomer ? "You" : "Infinisoftech"}
                                  </p>
                                  <span className="text-[10px] text-muted-foreground/50">
                                    {formatDate(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-ink">
                                  {reply.body}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <textarea
                        value={drafts[item.id] || ""}
                        onChange={(e) =>
                          setDrafts((current) => ({ ...current, [item.id]: e.target.value }))
                        }
                        placeholder="Type a message to our team..."
                        rows={2}
                        className="min-h-10 flex-1 resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                      />
                      <button
                        type="button"
                        onClick={() => sendMessage(item.id)}
                        disabled={!drafts[item.id]?.trim() || sendingId === item.id}
                        className="inline-flex h-10 shrink-0 items-center gap-1.5 self-end rounded-xl bg-green px-4 text-xs font-semibold text-white transition hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {sendingId === item.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                        Send
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/5 pt-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" /> Submitted {formatDate(item.createdAt)}
                      </span>
                      {item.status === "Contacted" && (
                        <span className="inline-flex items-center gap-1.5 text-green">
                          <CheckCircle2 className="h-4 w-4" /> Our team is in touch
                        </span>
                      )}
                      {item.status === "New" && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-4 w-4" /> Awaiting first response
                        </span>
                      )}
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}

      {requestModalOpen && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/45 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-ink/10 bg-background shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green">
                  {editingEnquiry ? "Edit request" : "New request"}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                  {editingEnquiry ? "Edit enquiry" : "New enquiry"}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {editingEnquiry
                    ? "Update the details and our team will see them live."
                    : "Tell us about your project and we'll get back to you live."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRequestModalOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 text-muted-foreground transition hover:bg-sand/60 hover:text-ink"
                aria-label="Close new enquiry modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitRequest} className="space-y-4 px-5 py-5 sm:px-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <EnquiryField label="Full name" required>
                  <input
                    value={requestForm.name}
                    onChange={(e) =>
                      setRequestForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                    placeholder="Your name"
                  />
                </EnquiryField>
                <EnquiryField label="Email" required>
                  <input
                    type="email"
                    value={requestForm.email}
                    onChange={(e) =>
                      setRequestForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                    placeholder="you@example.com"
                  />
                </EnquiryField>
              </div>

              <EnquiryField label="Phone" required>
                <input
                  type="tel"
                  value={requestForm.phone}
                  onChange={(e) =>
                    setRequestForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="01XXXXXXXXX"
                />
              </EnquiryField>

              <div className="grid gap-3 sm:grid-cols-2">
                <EnquiryField label="Company">
                  <input
                    value={requestForm.company}
                    onChange={(e) =>
                      setRequestForm((f) => ({ ...f, company: e.target.value }))
                    }
                    className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                    placeholder="Company (optional)"
                  />
                </EnquiryField>
                <EnquiryField label="Service">
                  <input
                    value={requestForm.service}
                    onChange={(e) =>
                      setRequestForm((f) => ({ ...f, service: e.target.value }))
                    }
                    className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                    placeholder="e.g. Website development"
                  />
                </EnquiryField>
              </div>

              <EnquiryField label="Subject">
                <input
                  value={requestForm.subject}
                  onChange={(e) =>
                    setRequestForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background px-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="What is this about?"
                />
              </EnquiryField>

              <EnquiryField label="Message" required>
                <textarea
                  value={requestForm.message}
                  onChange={(e) =>
                    setRequestForm((f) => ({ ...f, message: e.target.value }))
                  }
                  rows={4}
                  className="min-h-24 w-full resize-y rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                  placeholder="Tell us about your project, goals, or what you need help with."
                />
              </EnquiryField>

              <div className="flex flex-col-reverse gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-ink/10 px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-sand/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestSubmitting}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {requestSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingEnquiry ? (
                    <Pencil className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {requestSubmitting
                    ? editingEnquiry
                      ? "Saving..."
                      : "Creating..."
                    : editingEnquiry
                      ? "Save changes"
                      : "Create enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    {deleteTarget && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-ink/10 bg-background shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)]">
            <div className="px-6 pb-2 pt-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600">
                <Trash2 className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-ink">Delete enquiry</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Are you sure you want to delete "{deleteTarget.subject || deleteTarget.service || "this enquiry"}"?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-2 px-6 py-5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-ink/10 px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-sand/60 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EnquiryField({ label, required, children }) {
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