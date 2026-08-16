"use client";

import { useState, useEffect } from "react";
import { X, PencilLine, Loader2 } from "lucide-react";

export default function RenameModal({
  file,
  onClose,
  onSave,
  saving,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (file) {
      setName(file.fileName || "");
    }
  }, [file]);

  if (!file) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <PencilLine className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Rename File</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-ink hover:bg-sand/60 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">
              File Name
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new file name"
              className="w-full h-10 px-3.5 rounded-xl border border-ink/10 bg-[#F8F9FB] focus:bg-white focus:border-[#8876FF] text-xs font-medium text-ink outline-none transition"
              required
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
              disabled={saving || !name.trim() || name.trim() === file.fileName}
              className="btn-brand px-5 py-2.5 rounded-xl text-xs font-bold text-white transition disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
