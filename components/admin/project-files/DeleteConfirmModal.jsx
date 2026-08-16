"use client";

import { Trash2, Loader2, AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  target, // file object or { count, isBatch: true }
  onClose,
  onConfirm,
  deleting,
}) {
  if (!target) return null;

  const isBatch = Boolean(target.isBatch);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-sm bg-white rounded-3xl border border-ink/10 shadow-2xl overflow-hidden p-5 text-center animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3.5 shadow-xs">
          <Trash2 className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-ink">
          {isBatch ? `Delete ${target.count} Files?` : "Delete this file?"}
        </h3>

        <p className="text-xs text-muted-foreground mt-1.5 mb-5 max-w-[280px] mx-auto">
          {isBatch
            ? `Are you sure you want to delete these ${target.count} files? This action cannot be undone.`
            : `“${target.fileName}” will be permanently removed from the cloud drive.`}
        </p>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl border border-ink/10 text-xs font-semibold text-ink hover:bg-sand/60 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
          >
            {deleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
