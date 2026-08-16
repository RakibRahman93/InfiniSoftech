"use client";

import { useState } from "react";
import {
  X,
  Download,
  Trash2,
  PencilLine,
  Star,
  Link2,
  Check,
  ExternalLink,
  Briefcase,
  User,
  Calendar,
  HardDrive,
  FileType,
  FileText,
} from "lucide-react";
import { formatBytes, formatRelativeDate, getFileMeta, getFileExtension } from "./fileUtils";
import { toast } from "react-hot-toast";

export default function FilePreviewModal({
  file,
  isStarred,
  onClose,
  onToggleStar,
  onStartRename,
  onConfirmDelete,
}) {
  const [copied, setCopied] = useState(false);

  if (!file) return null;

  const meta = getFileMeta(file);
  const Icon = meta.icon;
  const ext = getFileExtension(file.fileName);
  const fileUrl = file.secureUrl || file.url;

  const handleCopyLink = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isVideo = (file.fileType || "").startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.fileName);
  const isAudio = (file.fileType || "").startsWith("audio/") || /\.(mp3|wav|ogg)$/i.test(file.fileName);
  const isPdf = (file.fileType || "").includes("pdf") || /\.pdf$/i.test(file.fileName);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl border border-ink/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left / Main Media Viewport */}
        <div className="flex-1 bg-[#121316] relative flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* Top Actions Bar inside Media Viewport */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur-md text-xs font-medium border border-white/10 truncate max-w-xs sm:max-w-md">
              {file.fileName}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleStar(file.id)}
                className={`p-2 rounded-xl backdrop-blur-md border transition ${
                  isStarred
                    ? "bg-amber-400 text-white border-amber-400"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                }`}
                title={isStarred ? "Starred" : "Star file"}
              >
                <Star className={`w-4 h-4 ${isStarred ? "fill-white" : ""}`} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Content */}
          <div className="w-full h-full flex items-center justify-center pt-12 pb-4 px-2">
            {file.isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={fileUrl}
                alt={file.fileName}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg select-none"
              />
            ) : isVideo ? (
              <video
                src={fileUrl}
                controls
                className="max-h-full max-w-full rounded-xl shadow-lg bg-black"
              />
            ) : isAudio ? (
              <div className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/10 max-w-md w-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-white font-medium text-sm truncate max-w-xs">{file.fileName}</h4>
                <audio src={fileUrl} controls className="w-full" />
              </div>
            ) : isPdf ? (
              <div className="w-full h-full flex flex-col items-center rounded-xl overflow-hidden bg-white">
                <iframe
                  src={`${fileUrl}#toolbar=0`}
                  title={file.fileName}
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center p-8 max-w-md">
                <div className={`p-6 rounded-3xl ${meta.bg} ${meta.color} shadow-lg`}>
                  <Icon className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">{file.fileName}</h4>
                  <p className="text-white/60 text-xs">
                    {ext} File · {formatBytes(file.fileSize)}
                  </p>
                </div>
                <a
                  href={fileUrl}
                  download={file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand px-5 py-2.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" /> Download to View
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Details & Metadata Inspector */}
        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-ink/10 flex flex-col justify-between p-5 overflow-y-auto admin-scroll-area">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${meta.badgeBg}`}>
                  {ext} File
                </span>
                <span className="text-xs font-medium text-muted-foreground">{formatBytes(file.fileSize)}</span>
              </div>
              <h3 className="text-sm font-bold text-ink leading-snug break-words">{file.fileName}</h3>
            </div>

            {/* Quick Actions in Sidebar */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={fileUrl}
                download={file.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-ink/10 text-xs font-semibold text-ink hover:bg-sand/60 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5 text-[#8876FF]" />}
                <span>{copied ? "Copied" : "Copy Link"}</span>
              </button>
            </div>

            {/* Details List */}
            <div className="space-y-3 pt-3 border-t border-ink/5 text-xs">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
                File Details
              </h4>

              {file.projectName && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
                    <Briefcase className="w-3.5 h-3.5 text-[#8876FF]" /> Project
                  </span>
                  <span className="font-semibold text-ink text-right truncate max-w-[150px]">
                    {file.projectName}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
                  <HardDrive className="w-3.5 h-3.5" /> File Size
                </span>
                <span className="font-medium text-ink">{formatBytes(file.fileSize)}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
                  <FileType className="w-3.5 h-3.5" /> MIME Type
                </span>
                <span className="font-medium text-ink truncate max-w-[150px]">{file.fileType || ext}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
                  <User className="w-3.5 h-3.5" /> Uploaded By
                </span>
                <span className="font-medium text-ink">{file.uploadedBy || "Admin"}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
                  <Calendar className="w-3.5 h-3.5" /> Upload Date
                </span>
                <span className="font-medium text-ink">{formatRelativeDate(file.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-ink/5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartRename(file);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-ink/10 text-xs font-semibold text-ink hover:bg-sand/60 transition"
            >
              <PencilLine className="w-3.5 h-3.5 text-amber-600" /> Rename
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onConfirmDelete(file);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
