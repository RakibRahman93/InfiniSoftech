"use client";

import { useState, useRef, useEffect } from "react";
import {
  Download,
  Trash2,
  PencilLine,
  Star,
  MoreVertical,
  Eye,
  Link2,
  Check,
  Briefcase,
  Share2,
} from "lucide-react";
import { formatBytes, formatRelativeDate, getFileMeta, getFileExtension } from "./fileUtils";
import { toast } from "react-hot-toast";

export default function FileGridView({
  files = [],
  selectedFileIds = [],
  starredFileIds = [],
  onToggleSelect,
  onToggleStar,
  onPreviewFile,
  onStartRename,
  onConfirmDelete,
  showProjectBadge = false,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = (file, e) => {
    e.stopPropagation();
    const url = file.secureUrl || file.url;
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("File link copied to clipboard!");
    }
    setActiveMenuId(null);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5">
      {files.map((file) => {
        const isSelected = selectedFileIds.includes(file.id);
        const isStarred = starredFileIds.includes(file.id);
        const meta = getFileMeta(file);
        const Icon = meta.icon;
        const ext = getFileExtension(file.fileName);
        const isMenuOpen = activeMenuId === file.id;

        return (
          <div
            key={file.id}
            onClick={() => onPreviewFile(file)}
            className={`group relative flex flex-col rounded-2xl bg-white border transition-all duration-200 cursor-pointer overflow-hidden shadow-xs hover:shadow-md ${
              isSelected
                ? "border-[#8876FF] ring-2 ring-[#8876FF]/30 bg-[#8876FF]/5"
                : "border-ink/5 hover:border-[#8876FF]/40"
            }`}
          >
            {/* Visual Thumbnail Area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#F8F9FB] to-sand/40">
              {file.isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={file.secureUrl || file.url}
                  alt={file.fileName}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${meta.gradient} p-4 transition-transform duration-300 group-hover:scale-105`}
                >
                  <div className={`p-3 rounded-2xl ${meta.bg} ${meta.color} shadow-xs mb-1.5`}>
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${meta.badgeBg}`}>
                    {ext}
                  </span>
                </div>
              )}

              {/* Top-Left Selection Checkbox */}
              <div
                className={`absolute top-2 left-2 z-10 transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect(file.id);
                }}
              >
                <button
                  type="button"
                  aria-label={isSelected ? "Deselect file" : "Select file"}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition shadow-sm ${
                    isSelected
                      ? "bg-brand-gradient text-white"
                      : "bg-white/90 text-ink/70 hover:bg-white hover:text-ink backdrop-blur-sm border border-ink/10"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </div>

              {/* Top-Right Star / Favorite Button */}
              <div
                className={`absolute top-2 right-2 z-10 transition-opacity ${
                  isStarred ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(file.id);
                }}
              >
                <button
                  type="button"
                  aria-label={isStarred ? "Unstar file" : "Star file"}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition shadow-sm backdrop-blur-sm ${
                    isStarred
                      ? "bg-amber-400 text-white fill-white"
                      : "bg-white/90 text-muted-foreground hover:text-amber-500 hover:bg-white border border-ink/10"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* Hover Quick Actions Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent">
                <a
                  href={file.secureUrl || file.url}
                  download={file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-ink flex items-center justify-center transition shadow-sm"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>

                {/* 3-dots Menu Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(isMenuOpen ? null : file.id);
                    }}
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-ink flex items-center justify-center transition shadow-sm"
                    title="More actions"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 bottom-full mb-1 w-44 rounded-xl bg-white border border-ink/10 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onPreviewFile(file);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-ink hover:bg-sand/60 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8876FF]" />
                        <span>Preview</span>
                      </button>

                      <a
                        href={file.secureUrl || file.url}
                        download={file.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveMenuId(null)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-ink hover:bg-sand/60 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Download</span>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(file, e)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-ink hover:bg-sand/60 transition"
                      >
                        <Link2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Copy Link</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onStartRename(file);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-ink hover:bg-sand/60 transition"
                      >
                        <PencilLine className="w-3.5 h-3.5 text-amber-600" />
                        <span>Rename</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onToggleStar(file.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-ink hover:bg-sand/60 transition"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isStarred ? "Remove Star" : "Add to Starred"}</span>
                      </button>

                      <div className="border-t border-ink/5 my-1" />

                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          onConfirmDelete(file);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Meta Content */}
            <div className="p-3 flex flex-col flex-1 justify-between gap-1">
              <div>
                <p
                  className="text-xs font-semibold text-ink truncate leading-tight group-hover:text-[#8876FF] transition"
                  title={file.fileName}
                >
                  {file.fileName}
                </p>

                {showProjectBadge && file.projectName && (
                  <p className="mt-0.5 text-[10px] text-muted-foreground truncate flex items-center gap-1">
                    <Briefcase className="w-2.5 h-2.5 text-[#8876FF]/70" />
                    <span>{file.projectName}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground/70 pt-1 border-t border-ink/5 mt-1">
                <span className="font-medium text-ink/70">{formatBytes(file.fileSize)}</span>
                <span>{formatRelativeDate(file.createdAt)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
