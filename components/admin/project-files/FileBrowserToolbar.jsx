"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Upload,
  Plus,
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  FolderPlus,
  ArrowUpDown,
  Home,
  Briefcase,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const CATEGORY_TABS = [
  { id: "all", label: "All Items" },
  { id: "images", label: "Images" },
  { id: "documents", label: "Documents" },
  { id: "media", label: "Media" },
  { id: "archives", label: "Archives" },
];

const SORT_OPTIONS = [
  { id: "date-desc", label: "Newest First" },
  { id: "date-asc", label: "Oldest First" },
  { id: "name-asc", label: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z-A)" },
  { id: "size-desc", label: "Size (Largest)" },
  { id: "size-asc", label: "Size (Smallest)" },
];

export default function FileBrowserToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeView,
  selectedProject,
  onSelectView,
  onTriggerUpload,
  onOpenCreateProject,
  uploading,
  totalFilesCount = 0,
}) {
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const createMenuRef = useRef(null);
  const sortMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (createMenuRef.current && !createMenuRef.current.contains(e.target)) {
        setCreateMenuOpen(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setSortMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBreadcrumbTitle = () => {
    if (activeView === "all") return "All Files";
    if (activeView === "recent") return "Recent Files";
    if (activeView === "starred") return "Starred Files";
    if (activeView === "shared") return "Shared with Team";
    if (selectedProject) return selectedProject.name;
    return "Project Files";
  };

  const currentSortLabel = SORT_OPTIONS.find((s) => s.id === sortBy)?.label || "Newest First";

  return (
    <div className="space-y-3.5">
      {/* Top Bar: Breadcrumbs & Primary Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-ink/5 shadow-sm">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={() => onSelectView("all")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-ink transition px-2 py-1 rounded-lg hover:bg-sand/60"
          >
            <Home className="w-3.5 h-3.5 text-[#8876FF]" />
            <span className="hidden sm:inline">Files</span>
          </button>

          <span className="text-muted-foreground/40 text-xs">/</span>

          {activeView !== "all" && (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="flex items-center gap-1.5 text-xs font-bold text-ink px-2.5 py-1 rounded-lg bg-[#8876FF]/10 text-[#8876FF] truncate max-w-[240px]">
                {selectedProject && <Briefcase className="w-3.5 h-3.5 shrink-0" />}
                <span className="truncate">{getBreadcrumbTitle()}</span>
              </span>
            </div>
          )}

          {activeView === "all" && (
            <span className="text-xs font-bold text-ink px-2.5 py-1 rounded-lg bg-[#8876FF]/10 text-[#8876FF]">
              All Files
            </span>
          )}

          <span className="hidden md:inline-flex items-center text-[10px] font-medium text-muted-foreground/60 ml-2">
            ({totalFilesCount} item{totalFilesCount === 1 ? "" : "s"})
          </span>
        </nav>

        {/* Primary Top Actions: [Create] & [Upload] */}
        <div className="flex items-center gap-2">
          {/* Create Menu Dropdown */}
          <div className="relative" ref={createMenuRef}>
            <button
              type="button"
              onClick={() => setCreateMenuOpen(!createMenuOpen)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-ink/10 bg-white text-xs font-semibold text-ink hover:bg-sand/60 transition shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#8876FF]" />
              <span>Create</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5" />
            </button>

            {createMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-ink/10 shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setCreateMenuOpen(false);
                    onOpenCreateProject();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-ink hover:bg-[#8876FF]/10 hover:text-[#8876FF] transition text-left"
                >
                  <FolderPlus className="w-4 h-4 text-[#8876FF]" />
                  <span>New Project Folder</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreateMenuOpen(false);
                    onTriggerUpload();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-ink hover:bg-[#8876FF]/10 hover:text-[#8876FF] transition text-left"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Upload Files</span>
                </button>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={onTriggerUpload}
            disabled={uploading}
            className="btn-brand inline-flex items-center gap-2 h-9 px-4 rounded-xl text-xs font-bold text-white tracking-wide shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Uploading..." : "Upload Files"}</span>
          </button>
        </div>
      </div>

      {/* Secondary Bar: Search, Category Filter Pills, Sort & View Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-ink/5 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
          <input
            type="text"
            placeholder="Search files, folders, extensions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-8 text-xs rounded-xl bg-[#F8F9FB] border border-ink/10 focus:border-[#8876FF] focus:bg-white text-ink outline-none transition placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink p-0.5 rounded-full hover:bg-sand/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 admin-scroll-area">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCategoryChange(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-ink text-white font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-ink hover:bg-sand/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Controls: Sort Dropdown & Grid/List View Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Sort Dropdown */}
          <div className="relative" ref={sortMenuRef}>
            <button
              type="button"
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-xl border border-ink/10 text-xs font-medium text-muted-foreground hover:text-ink hover:bg-sand/60 transition"
              title="Sort items"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentSortLabel}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-ink/10 shadow-lg py-1 z-40 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 border-b border-ink/5">
                  Sort By
                </div>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.id);
                      setSortMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs text-left transition flex items-center justify-between ${
                      sortBy === opt.id
                        ? "bg-[#8876FF]/10 text-[#8876FF] font-semibold"
                        : "text-ink hover:bg-sand/50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-[#8876FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid / List Mode Toggle */}
          <div className="flex items-center rounded-xl border border-ink/10 p-0.5 bg-[#F8F9FB]">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted-foreground hover:text-ink"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "list"
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted-foreground hover:text-ink"
              }`}
              title="List view"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
