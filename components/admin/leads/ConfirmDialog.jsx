"use client";

import { TriangleAlert, Trash2, Loader2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  loading,
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="space-y-6 pt-2">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-50 text-red-600 ring-8 ring-red-50/50">
            <TriangleAlert className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-ink/5 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="inline-flex h-10 items-center rounded-full border border-ink/10 px-5 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground transition hover:bg-sand/60 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-red-600 px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}