"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Save, Trash2 } from "lucide-react";
import Avatar from "./Avatar";

export default function AvatarUpload({ role, name, avatarUrl, onChanged }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!preview || uploading) return;
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/${role}/avatar`, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Could not upload image.");
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      onChanged?.(data.avatarUrl);
    } catch (err) {
      setError(err.message || "Could not upload image.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleCancel() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleRemove() {
    if (removing) return;
    setRemoving(true);
    setError("");
    try {
      const res = await fetch(`/api/${role}/avatar`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Could not remove image.");
      onChanged?.(null);
    } catch (err) {
      setError(err.message || "Could not remove image.");
    } finally {
      setRemoving(false);
    }
  }

  const displaySrc = preview || avatarUrl || "";
  const hasImage = Boolean(displaySrc);
  const isBusy = uploading || removing;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div className="relative">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isBusy}
          title={preview ? "Choose another photo" : "Upload photo"}
          className="group relative block rounded-full"
        >
          <Avatar name={name} src={displaySrc} size="h-24 w-24" rounded="rounded-full" />
          <span className="pointer-events-none absolute inset-0 grid place-items-center rounded-full bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-6 w-6" />
          </span>
          {isBusy && (
            <span className="pointer-events-none absolute inset-0 grid place-items-center rounded-full bg-black/45 text-white">
              <Loader2 className="h-6 w-6 animate-spin" />
            </span>
          )}
        </button>

        {hasImage && !isBusy && !preview && (
          <button
            type="button"
            onClick={handleRemove}
            title="Remove photo"
            className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-white text-rose-600 shadow ring-1 ring-ink/10 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:items-start">
        {preview ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isBusy}
              className="btn-brand inline-flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-bold uppercase tracking-wider text-white"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Save photo
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isBusy}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-ink/10 px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isBusy}
            className="text-xs font-semibold text-[#8876FF] transition-colors hover:text-[#6f5ef0]"
          >
            {avatarUrl ? "Change photo" : "Upload photo"}
          </button>
        )}
        <p className="text-[11px] text-muted-foreground">JPG, PNG, WebP or GIF · up to 5 MB</p>
        {error && <p className="text-[11px] font-medium text-red-600">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}