"use client";

import { useState } from "react";
import {
  Folder,
  FolderOpen,
  Clock,
  Star,
  Share2,
  Plus,
  Search,
  HardDrive,
  Briefcase,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { formatBytes } from "./fileUtils";

export default function FileBrowserSidebar({
  activeView, // 'all', 'recent', 'starred', 'shared', or projectId
  onSelectView,
  projects = [],
  allFiles = [],
  starredIds = [],
  onOpenCreateProject,
}) {
  const [projectSearch, setProjectSearch] = useState("");

  const filteredProjects = projects.filter((p) => {
    if (!projectSearch.trim()) return true;
    const q = projectSearch.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.projectCode && p.projectCode.toLowerCase().includes(q)) ||
      (p.clientName && p.clientName.toLowerCase().includes(q))
    );
  });

  // Calculate stats
  const totalSizeBytes = allFiles.reduce((acc, f) => acc + (f.fileSize || 0), 0);
  const starredCount = allFiles.filter((f) => starredIds.includes(f.id)).length;

  const quickNav = [
    {
      id: "all",
      label: "All Files",
      icon: FolderOpen,
      count: allFiles.length,
    },
    {
      id: "recent",
      label: "Recent",
      icon: Clock,
      count: allFiles.slice(0, 15).length,
    },
    {
      id: "starred",
      label: "Starred",
      icon: Star,
      count: starredCount,
      highlight: "text-amber-500 fill-amber-500/20",
    },
    {
      id: "shared",
      label: "Shared with Team",
      icon: Share2,
      count: allFiles.filter((f) => f.uploadedBy).length,
    },
  ];

  return (
    <aside className="flex flex-col h-full bg-white rounded-2xl border border-ink/5 shadow-sm overflow-hidden select-none">
      {/* Sidebar Header / Brand pill */}
      <div className="p-4 border-b border-ink/5 bg-gradient-to-b from-[#F8F9FB] to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-sm">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-ink tracking-tight uppercase">File Workspace</h2>
              <p className="text-[11px] text-muted-foreground">Infinisoft Cloud Drive</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenCreateProject}
            title="Create Project Folder"
            className="w-7 h-7 rounded-lg border border-ink/10 flex items-center justify-center text-muted-foreground hover:text-ink hover:bg-sand/60 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto admin-scroll-area p-3 space-y-5">
        {/* Quick Nav */}
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
              Files
            </span>
          </div>
          <ul className="space-y-0.5">
            {quickNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "nav-item-brand"
                        : "text-ink/80 hover:text-ink hover:bg-sand/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-white" : item.highlight || "text-muted-foreground"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count > 0 && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-ink/5 text-muted-foreground"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Projects / Folders Tree */}
        <div>
          <div className="px-2 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
              Projects & Folders
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground/60">
              {projects.length}
            </span>
          </div>

          {projects.length > 4 && (
            <div className="relative mb-2 px-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Filter projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full h-7 pl-7 pr-2 text-[11px] rounded-lg bg-[#F8F9FB] border border-ink/5 focus:border-[#8876FF]/50 focus:bg-white text-ink outline-none transition"
              />
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="px-3 py-4 text-center text-[11px] text-muted-foreground">
              {projectSearch ? "No matching projects" : "No projects created yet"}
            </div>
          ) : (
            <ul className="space-y-0.5">
              {filteredProjects.map((p) => {
                const isActive = activeView === p.id;
                const projectFilesCount = allFiles.filter((f) => f.projectId === p.id).length;

                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => onSelectView(p.id)}
                      className={`group w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                        isActive
                          ? "nav-item-brand"
                          : "text-ink/80 hover:text-ink hover:bg-sand/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#8876FF]/10 text-[#8876FF] group-hover:bg-[#8876FF]/20"
                          }`}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`truncate text-xs font-medium ${isActive ? "text-white" : "text-ink"}`}>
                            {p.name}
                          </p>
                          {p.projectCode && (
                            <p
                              className={`text-[9px] uppercase tracking-wider truncate ${
                                isActive ? "text-white/80" : "text-muted-foreground/70"
                              }`}
                            >
                              {p.projectCode}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {projectFilesCount > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                              isActive
                                ? "bg-white/25 text-white font-semibold"
                                : "bg-ink/5 text-muted-foreground"
                            }`}
                          >
                            {projectFilesCount}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive ? "text-white" : "text-muted-foreground/40 group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Storage Summary Footer */}
      <div className="p-3.5 border-t border-ink/5 bg-[#F8F9FB]/70">
        <div className="flex items-center justify-between text-xs font-medium text-ink mb-1.5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <HardDrive className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/70">Storage</span>
          </div>
          <span className="text-[11px] font-bold text-ink">{formatBytes(totalSizeBytes)}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-ink/10 overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-brand-gradient"
            style={{ width: `${Math.min(100, Math.max(5, (totalSizeBytes / (500 * 1024 * 1024)) * 100))}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{allFiles.length} total files</span>
          <span className="flex items-center gap-1 text-[#8876FF] font-medium">
            <Sparkles className="w-3 h-3" /> Cloudinary CDN
          </span>
        </div>
      </div>
    </aside>
  );
}
