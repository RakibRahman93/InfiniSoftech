import {
  FileText,
  FileImage,
  FileArchive,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileCode2,
  File as FileIcon,
} from "lucide-react";

export const ACCEPTED_FILE_TYPES = [
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

export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatRelativeDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function getFileCategory(file) {
  if (file.isImage) return "images";
  const t = (file.fileType || "").toLowerCase();
  const name = (file.fileName || "").toLowerCase();

  if (t.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg|avif|bmp)$/.test(name)) return "images";
  if (t.startsWith("video/") || /\.(mp4|webm|mov|mkv|avi)$/.test(name)) return "media";
  if (t.startsWith("audio/") || /\.(mp3|wav|ogg|aac|flac)$/.test(name)) return "media";
  if (
    t.includes("zip") ||
    t.includes("rar") ||
    t.includes("tar") ||
    t.includes("gzip") ||
    /\.(zip|rar|7z|gz|tar)$/.test(name)
  )
    return "archives";
  if (
    t.includes("pdf") ||
    t.includes("word") ||
    t.includes("document") ||
    t.includes("spreadsheet") ||
    t.includes("excel") ||
    t.includes("presentation") ||
    t.includes("powerpoint") ||
    t.includes("text") ||
    t.includes("json") ||
    /\.(pdf|docx?|xlsx?|pptx?|txt|csv|md|json)$/.test(name)
  )
    return "documents";

  return "others";
}

export function getFileExtension(filename) {
  if (!filename) return "FILE";
  const parts = filename.split(".");
  if (parts.length <= 1) return "FILE";
  return parts.pop().toUpperCase();
}

export function getFileMeta(file) {
  const category = getFileCategory(file);
  const ext = getFileExtension(file.fileName);

  if (category === "images" || file.isImage) {
    return {
      icon: FileImage,
      ext: ext || "IMG",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      gradient: "from-purple-500/10 via-pink-500/5 to-rose-500/10",
      badgeBg: "bg-purple-100 text-purple-700",
    };
  }

  const t = (file.fileType || "").toLowerCase();
  const name = (file.fileName || "").toLowerCase();

  if (t.startsWith("video/") || /\.(mp4|webm|mov)$/.test(name)) {
    return {
      icon: FileVideo,
      ext: ext || "VIDEO",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      gradient: "from-rose-500/10 via-pink-500/5 to-orange-500/10",
      badgeBg: "bg-rose-100 text-rose-700",
    };
  }

  if (t.startsWith("audio/") || /\.(mp3|wav|ogg)$/.test(name)) {
    return {
      icon: FileAudio,
      ext: ext || "AUDIO",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      gradient: "from-amber-500/10 via-yellow-500/5 to-orange-500/10",
      badgeBg: "bg-amber-100 text-amber-700",
    };
  }

  if (t.includes("pdf") || name.endsWith(".pdf")) {
    return {
      icon: FileText,
      ext: "PDF",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      gradient: "from-red-500/10 via-rose-500/5 to-orange-500/10",
      badgeBg: "bg-red-100 text-red-700",
    };
  }

  if (t.includes("spreadsheet") || t.includes("excel") || /\.(xlsx?|csv)$/.test(name)) {
    return {
      icon: FileSpreadsheet,
      ext: ext || "XLS",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      gradient: "from-emerald-500/10 via-teal-500/5 to-green-500/10",
      badgeBg: "bg-emerald-100 text-emerald-700",
    };
  }

  if (category === "archives") {
    return {
      icon: FileArchive,
      ext: ext || "ZIP",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      gradient: "from-indigo-500/10 via-purple-500/5 to-blue-500/10",
      badgeBg: "bg-indigo-100 text-indigo-700",
    };
  }

  if (t.includes("json") || t.includes("text/") || /\.(json|js|jsx|ts|tsx|html|css|py|php|md)$/.test(name)) {
    return {
      icon: FileCode2,
      ext: ext || "CODE",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
      gradient: "from-cyan-500/10 via-blue-500/5 to-sky-500/10",
      badgeBg: "bg-cyan-100 text-cyan-700",
    };
  }

  return {
    icon: FileIcon,
    ext: ext || "DOC",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    gradient: "from-blue-500/10 via-indigo-500/5 to-sky-500/10",
    badgeBg: "bg-blue-100 text-blue-700",
  };
}
