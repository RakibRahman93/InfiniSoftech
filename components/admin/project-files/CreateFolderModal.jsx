"use client";

import { useState } from "react";
import { X, FolderPlus, Loader2, Sparkles } from "lucide-react";

export default function CreateFolderModal({
  isOpen,
  onClose,
  onCreate,
  creating,
}) {
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      name: name.trim(),
      clientName: clientName.trim() || undefined,
      status: "IN_PROGRESS",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-white rounded-3xl border border-ink/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/5 bg-gradient-to-r from-[#8876FF]/10 to-[#E75778]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient text-white flex items-center justify-center shadow-xs">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Create Project Folder</h3>
              <p className="text-[11px] text-muted-foreground">Add a new workspace to organize files</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-ink hover:bg-white/60 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Project / Folder Name <span className="text-rose-500">*</span>
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Website Redesign 2026"
              className="w-full h-10 px-3.5 rounded-xl border border-ink/10 bg-[#F8F9FB] focus:bg-white focus:border-[#8876FF] text-xs font-medium text-ink outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              Client / Organization Name (Optional)
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full h-10 px-3.5 rounded-xl border border-ink/10 bg-[#F8F9FB] focus:bg-white focus:border-[#8876FF] text-xs font-medium text-ink outline-none transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-ink/10 text-xs font-semibold text-ink hover:bg-sand/60 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || !name.trim()}
              className="btn-brand px-5 py-2.5 rounded-xl text-xs font-bold text-white transition disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {creating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create Folder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
