"use client";

import { Folder, MoreVertical, ChevronRight, Briefcase } from "lucide-react";
import { formatBytes } from "./fileUtils";

export default function FolderCardsGrid({
  projects = [],
  allFiles = [],
  onSelectProject,
}) {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 text-[#8876FF]" />
          <span>Project Folders ({projects.length})</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {projects.map((p) => {
          const projectFiles = allFiles.filter((f) => f.projectId === p.id);
          const totalSize = projectFiles.reduce((acc, f) => acc + (f.fileSize || 0), 0);

          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className="group relative cursor-pointer rounded-2xl bg-white border border-ink/5 p-3.5 shadow-sm hover:shadow-md hover:border-[#8876FF]/40 transition-all transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8876FF]/15 to-[#E75778]/10 text-[#8876FF] flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  <Folder className="w-5 h-5 fill-[#8876FF]/20" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground/60 group-hover:text-[#8876FF] transition flex items-center">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              <h4 className="text-xs font-semibold text-ink truncate mb-1" title={p.name}>
                {p.name}
              </h4>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{projectFiles.length} item{projectFiles.length === 1 ? "" : "s"}</span>
                {totalSize > 0 && <span>{formatBytes(totalSize)}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
