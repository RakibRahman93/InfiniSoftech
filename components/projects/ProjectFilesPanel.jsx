"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Loader2,
  FileText,
  FileImage,
  FileArchive,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FilePresentation,
  FileCode2,
  File as FileIcon,
  Download,
  Trash2,
  FolderOpen,
  PencilLine,
  Check,
  X,
  LayoutGrid,
  List as ListIcon,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const ACCEPT = [
  "image/*",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".csv",
  ".md",
  ".json",
  ".zip",
  ".rar",
  ".gz",
  ".mp3",
  ".wav",
  ".ogg",
  ".mp4",
  ".webm",
  ".mov",
].join(",");

const BASE_URLS = {
  customer: (id) => `/api/customer/projects/${encodeURIComponent(id)}/files`,
  developer: (id) => `/api/developer/projects/${encodeURIComponent(id)}/files`,
  admin: (id) => `/api/admin/projects-mgmt/${encodeURIComponent(id)}/files`,
};

function formatSize(bytes) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function fileMeta(file) {
  if (file.isImage) return { icon: FileImage, tile: "from-[#8876FF]/20 to-[#E75778]/10 text-[#8876FF]" };
  const t = (file.fileType || "").toLowerCase();
  if (t.startsWith("video")) return { icon: FileVideo, tile: "from-violet-100 to-purple-50 text-violet-600" };
  if (t.startsWith("audio")) return { icon: FileAudio, tile: "from-sky-100 to-cyan-50 text-sky-600" };
  if (t.includes("zip") || t.includes("rar") || t.includes("gzip") || t.includes("archive"))
    return { icon: FileArchive, tile: "from-amber-100 to-yellow-50 text-amber-600" };
  if (t.includes("spreadsheet") || t.includes("excel"))
    return { icon: FileSpreadsheet, tile: "from-emerald-100 to-green-50 text-emerald-600" };
  if (t.includes("presentation") || t.includes("powerpoint"))
    return { icon: FilePresentation, tile: "from-orange-100 to-red-50 text-orange-600" };
  if (t.includes("wordprocessing") || t === "application/msword" || t === "application/pdf")
    return { icon: FileText, tile: "from-blue-100 to-indigo-50 text-blue-600" };
  if (t.includes("json") || t.includes("text/")) return { icon: FileCode2, tile: "from-slate-100 to-gray-50 text-slate-500" };
  if (t) return { icon: FileText, tile: "from-slate-100 to-gray-50 text-slate-500" };
  return { icon: FileIcon, tile: "from-slate-100 to-gray-50 text-slate-500" };
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function ProjectFilesPanel({ projectId, role = "customer", compact = false, currentUserId = null }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [renaming, setRenaming] = useState(null);
  const [renameDraft, setRenameDraft] = useState("");
  const [savingRename, setSavingRename] = useState(false);
  const [view, setView] = useState("grid");
  const inputRef = useRef(null);

  const baseUrl = BASE_URLS[role]?.(projectId);
  const canUpload = role !== "customer";
  const canManageFile = (file) =>
    canUpload && (role === "admin" || (file.uploadedById && currentUserId && file.uploadedById === currentUserId));

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(baseUrl);
      if (res.status === 401) {
        setError(true);
        return;
      }
      const data = await res.json();
      if (data?.ok) setFiles(data.files ?? []);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch(baseUrl, { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error || "Upload failed.");
        return;
      }
      toast.success("File uploaded.");
      setFiles((prev) => [data.file, ...prev]);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function performDelete() {
    if (!confirmDelete) return;
    const file = confirmDelete;
    setDeletingId(file.id);
    try {
      const res = await fetch(`${baseUrl}/${encodeURIComponent(file.id)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error || "Could not delete file.");
        return;
      }
      toast.success("File deleted.");
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
      setConfirmDelete(null);
    } catch {
      toast.error("Could not delete file. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  function startRename(file) {
    setRenaming(file);
    setRenameDraft(file.fileName);
  }

  function cancelRename() {
    setRenaming(null);
    setRenameDraft("");
    setSavingRename(false);
  }

  async function saveRename(e) {
    e.preventDefault();
    if (!renaming) return;
    const name = renameDraft.trim();
    if (!name) {
      toast.error("File name is required.");
      return;
    }
    setSavingRename(true);
    try {
      const res = await fetch(`${baseUrl}/${encodeURIComponent(renaming.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: name }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error || "Could not rename file.");
        return;
      }
      toast.success("File renamed.");
      setFiles((prev) => prev.map((f) => (f.id === renaming.id ? data.file : f)));
      cancelRename();
    } catch {
      toast.error("Could not rename file. Please try again.");
    } finally {
      setSavingRename(false);
    }
  }

  return (
    <div className="space-y-3">
      {canUpload && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
            {files.length} file{files.length === 1 ? "" : "s"}
          </p>
          <input ref={inputRef} type="file" className="hidden" accept={ACCEPT} onChange={handleUpload} />
          {renaming ? (
            <form onSubmit={saveRename} className="flex items-center gap-1.5">
              <input
                autoFocus
                value={renameDraft}
                onChange={(e) => setRenameDraft(e.target.value)}
                className="h-8 w-44 rounded-lg border border-[#8876FF]/40 bg-background px-2.5 text-xs font-medium text-ink outline-none"
                placeholder="New file name"
              />
              <button
                type="submit"
                disabled={savingRename}
                className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white disabled:opacity-50"
                title="Save name"
              >
                {savingRename ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={cancelRename}
                className="grid h-8 w-8 place-items-center rounded-lg border border-ink/10 text-muted-foreground hover:bg-sand/60"
                title="Cancel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              {files.length > 0 && (
                <div className="flex items-center rounded-lg border border-ink/10 p-0.5">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`grid h-7 w-7 place-items-center rounded-md transition ${
                      view === "grid" ? "bg-brand-gradient text-white" : "text-muted-foreground hover:bg-sand/60 hover:text-ink"
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`grid h-7 w-7 place-items-center rounded-md transition ${
                      view === "list" ? "bg-brand-gradient text-white" : "text-muted-foreground hover:bg-sand/60 hover:text-ink"
                    }`}
                    title="List view"
                  >
                    <ListIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="btn-brand inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
              >
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-4 text-center">
          <AlertTriangle className="h-5 w-5 text-rose-500" />
          <p className="text-xs font-medium text-rose-600">
            Couldn&apos;t load project files. Please sign in again or retry.
          </p>
          <button
            type="button"
            onClick={load}
            className="mt-1 inline-flex h-8 items-center gap-1.5 rounded-lg border border-rose-300 px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-rose-600 transition hover:bg-rose-100"
          >
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      ) : files.length === 0 ? (
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-ink/10 bg-[#F8F9FB] px-3 py-4 text-xs text-muted-foreground/70">
          <FolderOpen className="h-4 w-4 shrink-0" />
          {canUpload ? "No files yet — upload images or documents to share with the team." : "No files shared yet."}
        </div>
      ) : view === "grid" ? (
        <div
          className={`grid gap-2 ${
            compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {files.map((f) => {
            const meta = fileMeta(f);
            const Icon = meta.icon;
            return (
              <div
                key={f.id}
                className="group relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-white transition hover:border-[#8876FF]/40 hover:shadow-[0_8px_20px_-12px_rgba(136,118,255,0.5)]"
              >
                {f.isImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={f.secureUrl || f.url}
                    alt={f.fileName}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${meta.tile}`}
                  >
                    <Icon className="h-10 w-10" strokeWidth={1.5} />
                  </div>
                )}

                <div className="absolute right-1.5 top-1.5 flex flex-col gap-1">
                  <a
                    href={f.secureUrl || f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={f.fileName}
                    className="grid h-7 w-7 place-items-center rounded-lg bg-white/85 text-muted-foreground shadow-sm backdrop-blur transition hover:bg-white hover:text-[#8876FF]"
                    title="Download"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                  {canManageFile(f) && (
                    <button
                      type="button"
                      onClick={() => startRename(f)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-white/85 text-muted-foreground shadow-sm backdrop-blur transition hover:bg-white hover:text-[#8876FF]"
                      title="Rename file"
                    >
                      <PencilLine className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {canManageFile(f) && (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(f)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-white/85 text-muted-foreground shadow-sm backdrop-blur transition hover:bg-white hover:text-rose-600"
                      title="Delete file"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-2 pb-1.5 pt-8">
                  <p className="truncate text-[10px] font-semibold text-white" title={f.fileName}>
                    {f.fileName}
                  </p>
                  <p className="text-[9px] text-white/70">
                    {formatSize(f.fileSize)}
                    {f.uploadedBy ? ` · ${f.uploadedBy}` : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {files.map((f) => {
            const meta = fileMeta(f);
            const Icon = meta.icon;
            return (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-xl border border-ink/5 bg-[#F8F9FB] px-3 py-2.5"
              >
                {f.isImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={f.secureUrl || f.url}
                    alt={f.fileName}
                    loading="lazy"
                    className="h-10 w-10 shrink-0 rounded-lg border border-ink/10 object-cover"
                  />
                ) : (
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${meta.tile}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-ink">{f.fileName}</p>
                  <p className="text-[10px] text-muted-foreground/60">
                    {formatSize(f.fileSize)}
                    {f.uploadedBy ? ` · ${f.uploadedBy}` : ""}
                    {formatDate(f.createdAt) ? ` · ${formatDate(f.createdAt)}` : ""}
                  </p>
                </div>
                <a
                  href={f.secureUrl || f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={f.fileName}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition hover:border-[#8876FF]/40 hover:text-[#8876FF]"
                  title="Download"
                >
                  <Download className="h-3.5 w-3.5" />
                </a>
                {canManageFile(f) && (
                  <button
                    type="button"
                    onClick={() => startRename(f)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition hover:border-[#8876FF]/40 hover:text-[#8876FF]"
                    title="Rename file"
                  >
                    <PencilLine className="h-3.5 w-3.5" />
                  </button>
                )}
                {canManageFile(f) && (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(f)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete file"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {confirmDelete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pb-4 pt-5">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-center text-base font-semibold text-ink">Delete this file?</h3>
              <p className="mx-auto mt-1.5 max-w-[260px] text-center text-xs text-muted-foreground">
                “{confirmDelete.fileName}” will be permanently removed from the project and Cloudinary.
              </p>
            </div>
            <div className="flex items-center gap-2.5 border-t border-ink/5 px-5 py-4">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 rounded-xl border border-ink/10 px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-sand/60 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={performDelete}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
              >
                {deletingId === confirmDelete.id ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting…
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}