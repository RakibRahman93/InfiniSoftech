"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Send,
  Save,
  User,
  Phone,
  Mail,
  Loader2,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  RotateCcw,
  Trash2,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";

const statusStyles = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Contacted: "bg-orange-50 text-orange-600 border-orange-200",
  Qualified: "bg-violet-50 text-violet-600 border-violet-200",
  Won: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const statusLabels = {
  New: "New",
  Contacted: "Contacted",
  Qualified: "Qualified",
  Won: "Won",
};

const WON = "Won";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getWhatsAppUrl(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("880")
    ? digits
    : digits.startsWith("0")
      ? `88${digits}`
      : digits;
  return `https://wa.me/${normalized}`;
}

function getInitials(name) {
  return String(name ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

async function copyToClipboard(value, label) {
  if (!String(value ?? "").trim()) return;
  try {
    await navigator.clipboard.writeText(String(value));
    toast.success(`${label} copied.`);
  } catch {
    toast.error(`Could not copy ${label.toLowerCase()}.`);
  }
}

function getReplyMessage(reply) {
  return reply.body || "";
}

export default function LeadDetailModal({
  lead,
  open,
  onClose,
  onReply,
  onDeleteReply,
  onMarkWon,
  onMarkQualified,
  onDelete,
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) setMessage("");
  }, [open, lead?.id]);

  if (!lead) return null;
  const c = lead;

  function resetForm() {
    setMessage("");
  }

  async function handleSendReply() {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      toast.error("Please type a message before sending.");
      return;
    }
    setSending(true);
    try {
      await onReply({
        leadId: c.id,
        message: trimmedMessage,
        type: "sent",
      });
      toast.success("Reply sent to " + (c.email || "lead") + ".");
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save reply.");
    } finally {
      setSending(false);
    }
  }

  async function handleSaveDraft() {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      toast.error("Nothing to save as draft.");
      return;
    }
    try {
      await onReply({
        leadId: c.id,
        message: trimmedMessage,
        type: "draft",
      });
      toast.success("Draft saved.");
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save draft.");
    }
  }

  const details = [
    { label: "Company", value: c.company || "—" },
    { label: "Service", value: c.service || "—" },
    { label: "Subject", value: c.subject || "—" },
    { label: "Source", value: c.source || "—" },
    { label: "Submitted", value: formatDate(c.created_at) },
  ];
  const whatsappUrl = getWhatsAppUrl(c.phone);

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink/5 px-6 py-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-green/20 to-green/5 text-green shadow-sm ring-1 ring-green/10">
                <User className="h-6 w-6" />
              </span>
              <span
                className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                  c.status === WON ? "bg-emerald-500" : c.status === "Qualified" ? "bg-violet-500" : "bg-blue-500"
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">{c.name}</h2>
                <span
                  className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[c.status]}`}
                >
                  {statusLabels[c.status]}
                </span>
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground/60">
                <Calendar className="h-3.5 w-3.5" />
                {formatShortDate(c.created_at)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-sand/60 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body: Two-column on large screens */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Info */}
          <div className="flex flex-col gap-4 border-b border-ink/5 p-6 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
            {/* Contact */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
                Contact
              </p>
              <div className="flex items-center gap-2.5 rounded-lg bg-[#F8F9FB] px-3 py-2.5">
                <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                <span className="text-sm text-ink">{c.phone || "—"}</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-[#F8F9FB] px-3 py-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                <span className="truncate text-sm text-ink">{c.email || "—"}</span>
              </div>
            </div>

            {/* Direct follow-up */}
            <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <div className="flex gap-2">
                <div>
                  <p className="text-xs font-semibold text-amber-900">Direct follow-up</p>
                  <p className="mt-1 text-[11px] leading-5 text-amber-900/75">
                    Replies are saved to the lead thread below. Use phone, WhatsApp, or email for a
                    direct follow-up.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${c.phone}`}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-amber-200 bg-white text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  Call
                </a>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-amber-200 bg-white text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                  >
                    WhatsApp <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="h-8 rounded-lg border border-amber-100 bg-white/60 text-[11px] font-semibold text-amber-900/35"
                  >
                    WhatsApp
                  </button>
                )}
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-amber-200 bg-white text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  Email
                </a>
                <button
                  type="button"
                  data-no-sparkle
                  onClick={() => void copyToClipboard(c.email || c.phone, "Contact")}
                  className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-amber-200 bg-white text-[11px] font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              </div>
            </div>

            {/* Customer message */}
            {c.message?.trim() && (
              <div className="space-y-2 rounded-xl border border-gold/20 bg-gold/[0.04] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                  Message
                </p>
                <p className="whitespace-pre-wrap break-words text-xs leading-relaxed text-ink">
                  {c.message}
                </p>
              </div>
            )}

            {c.status !== WON && (
              <button
                type="button"
                data-no-sparkle
                onClick={() => onMarkWon(c.id)}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-green/20 bg-green/5 text-xs font-semibold text-green transition hover:bg-green/10"
              >
                <CheckCircle2 className="h-4 w-4" /> Mark as won
              </button>
            )}
            {c.status === WON && (
              <button
                type="button"
                data-no-sparkle
                onClick={() => onMarkQualified(c.id)}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gold/20 bg-gold/5 text-xs font-semibold text-gold transition hover:bg-gold/10"
              >
                <RotateCcw className="h-4 w-4" /> Reopen lead
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                data-no-sparkle
                onClick={() => {
                  onClose();
                  onDelete(c.id);
                }}
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                <Trash2 className="h-4 w-4" /> Delete lead
              </button>
            )}

            {/* Details */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
                Details
              </p>
              <div className="divide-y divide-ink/5 rounded-lg border border-ink/5">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between px-3 py-2">
                    <span className="text-[11px] font-medium text-muted-foreground/70">{d.label}</span>
                    <span className="max-w-[140px] truncate text-right text-xs font-medium text-ink">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Conversation & Reply */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Conversation */}
            <div className="border-b border-ink/5">
              <div className="flex items-center justify-between px-6 py-3">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Conversation
                </p>
                {(c.replies ?? []).length > 0 && (
                  <span className="rounded-full bg-sand/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {(c.replies ?? []).length}
                  </span>
                )}
              </div>

              <div className="max-h-[420px] space-y-3 overflow-y-auto px-6 pb-4">
                {/* Lead */}
                <div className="flex gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green/10 text-green ring-1 ring-green/20">
                    <User className="h-3.5 w-3.5" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F8F9FB] px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-ink">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground/50">
                        {formatShortDate(c.created_at)}
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
                      <p>{c.message || "No message provided."}</p>
                      {(c.subject || c.service) && (
                        <p>
                          <span className="font-medium text-ink">Subject:</span>{" "}
                          {[c.subject, c.service].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {(c.replies ?? []).map((reply) => {
                  const isDraft = reply.direction === "draft";
                  const isCustomer = reply.direction === "incoming";
                  return (
                    <div key={reply.id} className={`flex gap-2.5 ${isCustomer ? "flex-row-reverse" : ""}`}>
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1 ${
                          isDraft
                            ? "bg-gold/10 text-gold ring-gold/20"
                            : isCustomer
                              ? "bg-blue-50 text-blue-600 ring-blue-200"
                              : "bg-green/10 text-green ring-green/20"
                        }`}
                      >
                        <User className="h-3.5 w-3.5" />
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                          isDraft
                            ? "rounded-tl-sm border border-dashed border-gold/30 bg-gold/5"
                            : "rounded-tr-sm border border-green/10 bg-gradient-to-br from-green/5 to-green/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-ink">
                            {isDraft ? "Draft" : isCustomer ? c.name : "You"}
                          </p>
                          {!isDraft && !isCustomer && (
                            <span className="rounded-full border border-green/20 bg-green/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-green">
                              Sent
                            </span>
                          )}
                          <span className="ml-auto text-[10px] text-muted-foreground/50">
                            {formatShortDate(reply.createdAt)}
                          </span>
                        </div>
                        <div className="mt-1.5 space-y-1 text-xs leading-relaxed text-muted-foreground">
                          <p className="whitespace-pre-line text-ink/80">{reply.body}</p>
                        </div>
                        {isDraft && (
                          <div className="mt-2 flex items-center gap-1 border-t border-dashed border-gold/20 pt-1.5">
                            <button
                              type="button"
                              data-no-sparkle
                              onClick={() => setMessage(getReplyMessage(reply))}
                              className="rounded-lg border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold transition-colors hover:bg-gold/20"
                            >
                              Load
                            </button>
                            <button
                              type="button"
                              data-no-sparkle
                              onClick={() => onDeleteReply(c.id, reply.id)}
                              className="grid h-5 w-5 place-items-center rounded text-muted-foreground/50 transition-colors hover:bg-rose-50 hover:text-rose-500"
                              title="Delete draft"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(c.replies ?? []).length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-sand/60">
                      <MessageSquare className="h-4 w-4 text-muted-foreground/30" />
                    </div>
                    <p className="text-xs text-muted-foreground/50">No replies yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reply Form */}
            <div className="p-6">
              <details className="group" open>
                <summary className="flex cursor-pointer items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 transition-colors hover:text-muted-foreground">
                  <span>Reply</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                </summary>

                <div className="mt-3 space-y-3">
                  <div className="overflow-hidden rounded-2xl border border-green/10 bg-gradient-to-br from-white to-green/[0.03] shadow-sm">
                    <div className="flex items-center justify-between border-b border-ink/5 bg-[#F8F9FB]/80 px-4 py-2.5">
                      <div>
                        <p className="text-xs font-semibold text-ink">Message to {c.email || "lead"}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground/60">
                          This reply is saved to the lead thread below.
                        </p>
                      </div>
                      <span className="hidden rounded-full bg-green/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-green sm:inline-flex">
                        Free reply
                      </span>
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder={`Hi ${String(c.name || "there").split(" ")[0]},\n\nThanks for reaching out. Here's what we recommend...`}
                      className="min-h-[88px] w-full resize-y border-0 bg-transparent px-4 py-3 text-sm leading-relaxed text-ink shadow-none outline-none placeholder:text-muted-foreground/35 focus:ring-0"
                    />
                    <div className="flex items-center justify-between border-t border-ink/5 px-4 py-2">
                      <span className="text-[11px] text-muted-foreground/55">
                        Tip: include next steps, timeline, and pricing in one clear note.
                      </span>
                      <span className="shrink-0 text-[10px] font-medium text-muted-foreground/45">
                        {message.trim().length} chars
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                      <Mail className="h-3 w-3" />
                      {c.email || "No email"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveDraft}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-ink/10 bg-background px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
                      >
                        <Save className="h-3.5 w-3.5" />
                        Draft
                      </button>
                      <button
                        onClick={() => void handleSendReply()}
                        disabled={sending || !message.trim()}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-green px-3 text-xs font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}