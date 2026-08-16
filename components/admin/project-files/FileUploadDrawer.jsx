"use client";

import { useState } from "react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import { formatBytes } from "./fileUtils";

export default function FileUploadDrawer({
  uploadQueue = [], // Array of { id, name, size, progress, status: 'uploading' | 'completed' | 'error', errorMsg }
  onClearQueue,
  onDismissItem,
}) {
  const [minimized, setMinimized] = useState(false);

  if (!uploadQueue || uploadQueue.length === 0) return null;

  const uploadingCount = uploadQueue.filter((u) => u.status === "uploading").length;
  const completedCount = uploadQueue.filter((u) => u.status === "completed").length;
  const isFinished = uploadingCount === 0;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-ink/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#8876FF]/10 to-[#E75778]/10 border-b border-ink/5">
        <div className="flex items-center gap-2">
          {uploadingCount > 0 ? (
            <Loader2 className="w-4 h-4 text-[#8876FF] animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span className="text-xs font-bold text-ink">
            {uploadingCount > 0
              ? `Uploading ${uploadingCount} file${uploadingCount === 1 ? "" : "s"}...`
              : `Uploaded ${completedCount} file${completedCount === 1 ? "" : "s"} successfully`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized(!minimized)}
            className="p-1 rounded-lg text-muted-foreground hover:text-ink hover:bg-white/50 transition"
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {isFinished && (
            <button
              type="button"
              onClick={onClearQueue}
              className="p-1 rounded-lg text-muted-foreground hover:text-ink hover:bg-white/50 transition"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Upload Items List */}
      {!minimized && (
        <div className="max-h-56 overflow-y-auto divide-y divide-ink/5 p-2 admin-scroll-area">
          {uploadQueue.map((item) => (
            <div key={item.id} className="p-2.5 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-ink truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-muted-foreground">{formatBytes(item.size)}</span>
                  {item.status === "completed" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {item.status === "error" && (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" title={item.errorMsg} />
                  )}
                  {item.status === "uploading" && (
                    <span className="text-[10px] font-bold text-[#8876FF]">{item.progress}%</span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {item.status === "uploading" && (
                <div className="w-full h-1.5 bg-ink/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gradient rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              {item.status === "error" && (
                <p className="text-[10px] text-rose-600">{item.errorMsg || "Upload failed."}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
