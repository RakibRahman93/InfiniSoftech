"use client";

import { Download, Trash2, X, CheckSquare } from "lucide-react";

export default function FileMultiSelectBar({
  selectedCount,
  onDownloadSelected,
  onDeleteSelected,
  onClearSelection,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-ink text-white shadow-2xl border border-white/10 backdrop-blur-xl animate-in slide-in-from-bottom-6">
      <div className="flex items-center gap-2 pr-3 border-r border-white/20 text-xs font-semibold">
        <CheckSquare className="w-4 h-4 text-[#8876FF]" />
        <span>
          {selectedCount} item{selectedCount === 1 ? "" : "s"} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDownloadSelected}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>

        <button
          type="button"
          onClick={onDeleteSelected}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-xs font-medium text-white transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>

        <button
          type="button"
          onClick={onClearSelection}
          className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition ml-1"
          title="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
