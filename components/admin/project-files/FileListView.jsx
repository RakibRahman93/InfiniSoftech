"use client";

import { useState } from "react";
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
  User,
} from "lucide-react";
import { formatBytes, formatRelativeDate, getFileMeta, getFileExtension } from "./fileUtils";
import { toast } from "react-hot-toast";

export default function FileListView({
  files = [],
  selectedFileIds = [],
  starredFileIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onToggleStar,
  onPreviewFile,
  onStartRename,
  onConfirmDelete,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const allSelected = files.length > 0 && files.every((f) => selectedFileIds.includes(f.id));
  const someSelected = files.some((f) => selectedFileIds.includes(f.id)) && !allSelected;

  const handleCopyLink = (file, e) => {
    e.stopPropagation();
    const url = file.secureUrl || file.url;
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("File link copied!");
    }
    setActiveMenuId(null);
  };

  return (
    <div className="overflow-x-auto rounded-2xl bg-white border border-ink/5 shadow-sm admin-scroll-area">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-ink/10 bg-[#F8F9FB]/80 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <th className="py-3 pl-4 pr-2 w-10">
              <button
                type="button"
                aria-label={allSelected ? "Deselect all files" : "Select all files"}
                onClick={onToggleSelectAll}
                className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  allSelected
                    ? "bg-brand-gradient text-white border-transparent"
                    : someSelected
                    ? "bg-[#8876FF]/20 border-[#8876FF]"
                    : "border-ink/20 hover:border-ink/40 bg-white"
                }`}
              >
                {allSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                {someSelected && <span className="w-2 h-0.5 bg-[#8876FF] rounded-full" />}
              </button>
            </th>
            <th className="py-3 px-2 w-8 text-center">⭐</th>
            <th className="py-3 px-3">Name</th>
            <th className="py-3 px-3">Project</th>
            <th className="py-3 px-3">Type</th>
            <th className="py-3 px-3">Size</th>
            <th className="py-3 px-3">Modified</th>
            <th className="py-3 px-3">Owner</th>
            <th className="py-3 pr-4 pl-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5">
          {files.map((file) => {
            const isSelected = selectedFileIds.includes(file.id);
            const isStarred = starredFileIds.includes(file.id);
            const meta = getFileMeta(file);
            const Icon = meta.icon;
            const ext = getFileExtension(file.fileName);
            const isMenuOpen = activeMenuId === file.id;

            return (
              <tr
                key={file.id}
                onClick={() => onPreviewFile(file)}
                className={`group cursor-pointer transition-colors ${
                  isSelected ? "bg-[#8876FF]/5 hover:bg-[#8876FF]/10" : "hover:bg-sand/40"
                }`}
              >
                {/* Select Checkbox */}
                <td
                  className="py-2.5 pl-4 pr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect(file.id);
                  }}
                >
                  <button
                    type="button"
                    aria-label={isSelected ? "Deselect row" : "Select row"}
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                      isSelected
                        ? "bg-brand-gradient text-white border-transparent"
                        : "border-ink/20 hover:border-ink/40 bg-white opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                </td>

                {/* Star Button */}
                <td
                  className="py-2.5 px-2 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(file.id);
                  }}
                >
                  <button
                    type="button"
                    aria-label={isStarred ? "Unstar file" : "Star file"}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition mx-auto ${
                      isStarred
                        ? "text-amber-500"
                        : "text-muted-foreground/40 hover:text-amber-500 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isStarred ? "fill-amber-500" : ""}`} />
                  </button>
                </td>

                {/* Name & Thumbnail */}
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-3 min-w-[180px]">
                    {file.isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={file.secureUrl || file.url}
                        alt={file.fileName}
                        loading="lazy"
                        className="w-8 h-8 rounded-lg object-cover border border-ink/10 shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                    <span className="font-semibold text-ink truncate max-w-xs group-hover:text-[#8876FF] transition" title={file.fileName}>
                      {file.fileName}
                    </span>
                  </div>
                </td>

                {/* Project */}
                <td className="py-2.5 px-3 text-muted-foreground">
                  {file.projectName ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/70">
                      <Briefcase className="w-3 h-3 text-[#8876FF]" />
                      <span className="truncate max-w-[120px]">{file.projectName}</span>
                    </span>
                  ) : (
                    "—"
                  )}
                </td>

                {/* Type Badge */}
                <td className="py-2.5 px-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${meta.badgeBg}`}>
                    {ext}
                  </span>
                </td>

                {/* Size */}
                <td className="py-2.5 px-3 text-ink/80 font-medium">
                  {formatBytes(file.fileSize)}
                </td>

                {/* Modified */}
                <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                  {formatRelativeDate(file.createdAt)}
                </td>

                {/* Owner / Uploader */}
                <td className="py-2.5 px-3 text-muted-foreground">
                  {file.uploadedBy ? (
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <User className="w-3 h-3 text-muted-foreground/60" />
                      <span className="truncate max-w-[100px]">{file.uploadedBy}</span>
                    </span>
                  ) : (
                    "Admin"
                  )}
                </td>

                {/* Actions */}
                <td className="py-2.5 pr-4 pl-2 text-right">
                  <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={file.secureUrl || file.url}
                      download={file.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border border-ink/10 text-muted-foreground hover:text-ink hover:bg-sand/60 flex items-center justify-center transition"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onStartRename(file)}
                      className="w-7 h-7 rounded-lg border border-ink/10 text-muted-foreground hover:text-[#8876FF] hover:bg-sand/60 flex items-center justify-center transition"
                      title="Rename"
                    >
                      <PencilLine className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onConfirmDelete(file)}
                      className="w-7 h-7 rounded-lg border border-ink/10 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
