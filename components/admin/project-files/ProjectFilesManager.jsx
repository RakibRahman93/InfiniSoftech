"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  FolderOpen,
  Loader2,
  Upload,
  AlertTriangle,
  FolderPlus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import FileBrowserSidebar from "./FileBrowserSidebar";
import FileBrowserToolbar from "./FileBrowserToolbar";
import ProjectInfoBanner from "./ProjectInfoBanner";
import FolderCardsGrid from "./FolderCardsGrid";
import FileGridView from "./FileGridView";
import FileListView from "./FileListView";
import FilePreviewModal from "./FilePreviewModal";
import FileUploadDrawer from "./FileUploadDrawer";
import FileMultiSelectBar from "./FileMultiSelectBar";
import RenameModal from "./RenameModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CreateFolderModal from "./CreateFolderModal";
import { ACCEPTED_FILE_TYPES, getFileCategory } from "./fileUtils";

const STARRED_STORAGE_KEY = "infinisoft_starred_file_ids";

export default function ProjectFilesManager() {
  // Core state
  const [projects, setProjects] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // View & Filter states
  const [activeView, setActiveView] = useState("all"); // 'all' | 'recent' | 'starred' | 'shared' | projectId
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  // Selection & Starred state
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [starredFileIds, setStarredFileIds] = useState([]);

  // Modals & Action states
  const [previewFile, setPreviewFile] = useState(null);
  const [renamingFile, setRenamingFile] = useState(null);
  const [savingRename, setSavingRename] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);

  // Upload state
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);

  // Initialize Starred from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STARRED_STORAGE_KEY);
      if (stored) {
        setStarredFileIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save Starred to LocalStorage
  const handleToggleStar = useCallback((fileId) => {
    setStarredFileIds((prev) => {
      const next = prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId];
      try {
        localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Fetch projects and all files
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [projectsRes, filesRes] = await Promise.all([
        fetch("/api/admin/projects-mgmt").then((r) => r.json()),
        fetch("/api/admin/project-files").then((r) => r.json()),
      ]);

      if (projectsRes?.projects) {
        setProjects(projectsRes.projects);
      }
      if (filesRes?.files) {
        setAllFiles(filesRes.files);
      }
    } catch (err) {
      console.error("Failed to load project files data", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Current active project (if selected a specific project in sidebar)
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === activeView) || null;
  }, [projects, activeView]);

  // Filtered & Sorted files
  const displayedFiles = useMemo(() => {
    let result = [...allFiles];

    // 1. Filter by Active View
    if (activeView === "recent") {
      result = result.slice(0, 20);
    } else if (activeView === "starred") {
      result = result.filter((f) => starredFileIds.includes(f.id));
    } else if (activeView === "shared") {
      result = result.filter((f) => Boolean(f.uploadedBy));
    } else if (activeView !== "all") {
      result = result.filter((f) => f.projectId === activeView);
    }

    // 2. Filter by Category Tab
    if (activeCategory !== "all") {
      result = result.filter((f) => getFileCategory(f) === activeCategory);
    }

    // 3. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((f) => {
        const nameMatch = f.fileName && f.fileName.toLowerCase().includes(q);
        const projectMatch = f.projectName && f.projectName.toLowerCase().includes(q);
        const uploaderMatch = f.uploadedBy && f.uploadedBy.toLowerCase().includes(q);
        const typeMatch = f.fileType && f.fileType.toLowerCase().includes(q);
        return nameMatch || projectMatch || uploaderMatch || typeMatch;
      });
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "name-asc") return (a.fileName || "").localeCompare(b.fileName || "");
      if (sortBy === "name-desc") return (b.fileName || "").localeCompare(a.fileName || "");
      if (sortBy === "size-desc") return (b.fileSize || 0) - (a.fileSize || 0);
      if (sortBy === "size-asc") return (a.fileSize || 0) - (b.fileSize || 0);
      return 0;
    });

    return result;
  }, [allFiles, activeView, starredFileIds, activeCategory, searchQuery, sortBy]);

  // Selection handlers
  const handleToggleSelect = (fileId) => {
    setSelectedFileIds((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const handleToggleSelectAll = () => {
    if (displayedFiles.every((f) => selectedFileIds.includes(f.id))) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(displayedFiles.map((f) => f.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedFileIds([]);
  };

  // Upload Logic
  const handleFilesUpload = async (filesList) => {
    if (!filesList || filesList.length === 0) return;

    // Determine target project ID
    let targetProjectId = selectedProject?.id;
    if (!targetProjectId) {
      if (projects.length > 0) {
        targetProjectId = projects[0].id;
        toast("Uploading to default project: " + projects[0].name, { icon: "📁" });
      } else {
        toast.error("Please create a project folder first before uploading files.");
        setCreateProjectOpen(true);
        return;
      }
    }

    const newQueueItems = Array.from(filesList).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      name: f.name,
      size: f.size,
      progress: 10,
      status: "uploading",
    }));

    setUploadQueue((prev) => [...newQueueItems, ...prev]);

    for (const item of newQueueItems) {
      try {
        const formData = new FormData();
        formData.append("file", item.file);

        // Progress simulation
        const progressInterval = setInterval(() => {
          setUploadQueue((prev) =>
            prev.map((q) => (q.id === item.id && q.progress < 90 ? { ...q, progress: q.progress + 20 } : q))
          );
        }, 150);

        const res = await fetch(`/api/admin/projects-mgmt/${encodeURIComponent(targetProjectId)}/files`, {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        const data = await res.json();

        if (res.ok && data?.ok) {
          const uploadedFile = {
            ...data.file,
            projectName: selectedProject?.name || projects.find((p) => p.id === targetProjectId)?.name || "",
            projectCode: selectedProject?.projectCode || projects.find((p) => p.id === targetProjectId)?.projectCode || "",
          };

          setUploadQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, progress: 100, status: "completed" } : q))
          );
          setAllFiles((prev) => [uploadedFile, ...prev]);
          toast.success(`Uploaded "${item.name}"`);
        } else {
          setUploadQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, status: "error", errorMsg: data?.error || "Upload failed." } : q
            )
          );
          toast.error(data?.error || `Failed to upload "${item.name}"`);
        }
      } catch {
        setUploadQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "error", errorMsg: "Network error during upload." } : q
          )
        );
        toast.error(`Upload error for "${item.name}"`);
      }
    }
  };

  // Drag and Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  // Rename File
  const handleSaveRename = async (newName) => {
    if (!renamingFile) return;
    setSavingRename(true);
    try {
      const res = await fetch(
        `/api/admin/projects-mgmt/${encodeURIComponent(renamingFile.projectId)}/files/${encodeURIComponent(
          renamingFile.id
        )}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: newName }),
        }
      );
      const data = await res.json();
      if (res.ok && data?.ok) {
        toast.success("File renamed.");
        setAllFiles((prev) =>
          prev.map((f) => (f.id === renamingFile.id ? { ...f, fileName: newName } : f))
        );
        if (previewFile?.id === renamingFile.id) {
          setPreviewFile((prev) => (prev ? { ...prev, fileName: newName } : null));
        }
        setRenamingFile(null);
      } else {
        toast.error(data?.error || "Could not rename file.");
      }
    } catch {
      toast.error("Could not rename file. Please try again.");
    } finally {
      setSavingRename(false);
    }
  };

  // Single & Batch Delete File
  const handleConfirmDeleteAction = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      if (deleteTarget.isBatch) {
        // Batch delete selected files
        const idsToDelete = [...selectedFileIds];
        let successCount = 0;

        for (const fileId of idsToDelete) {
          const file = allFiles.find((f) => f.id === fileId);
          if (!file) continue;

          try {
            const res = await fetch(
              `/api/admin/projects-mgmt/${encodeURIComponent(file.projectId)}/files/${encodeURIComponent(file.id)}`,
              { method: "DELETE" }
            );
            if (res.ok) successCount += 1;
          } catch {
            // continue
          }
        }

        setAllFiles((prev) => prev.filter((f) => !idsToDelete.includes(f.id)));
        setSelectedFileIds([]);
        toast.success(`Deleted ${successCount} file${successCount === 1 ? "" : "s"}.`);
      } else {
        // Single file delete
        const file = deleteTarget;
        const res = await fetch(
          `/api/admin/projects-mgmt/${encodeURIComponent(file.projectId)}/files/${encodeURIComponent(file.id)}`,
          { method: "DELETE" }
        );
        const data = await res.json();

        if (res.ok && data?.ok) {
          toast.success("File deleted.");
          setAllFiles((prev) => prev.filter((f) => f.id !== file.id));
          setSelectedFileIds((prev) => prev.filter((id) => id !== file.id));
          if (previewFile?.id === file.id) setPreviewFile(null);
        } else {
          toast.error(data?.error || "Could not delete file.");
        }
      }
      setDeleteTarget(null);
    } catch {
      toast.error("Could not delete file. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Batch Download
  const handleBatchDownload = () => {
    const filesToDownload = allFiles.filter((f) => selectedFileIds.includes(f.id));
    if (filesToDownload.length === 0) return;

    filesToDownload.forEach((f) => {
      const link = document.createElement("a");
      link.href = f.secureUrl || f.url;
      link.download = f.fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    toast.success(`Downloading ${filesToDownload.length} files...`);
  };

  // Create Project / Folder
  const handleCreateProject = async (formData) => {
    setCreatingProject(true);
    try {
      const res = await fetch("/api/admin/projects-mgmt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data?.project) {
        toast.success(`Folder "${data.project.name}" created!`);
        setProjects((prev) => [data.project, ...prev]);
        setActiveView(data.project.id);
        setCreateProjectOpen(false);
      } else {
        toast.error(data?.error || "Failed to create project folder.");
      }
    } catch {
      toast.error("Failed to create project folder.");
    } finally {
      setCreatingProject(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#8876FF]/10 flex items-center justify-center text-[#8876FF]">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-muted-foreground">Loading file manager workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center">
        <AlertTriangle className="h-8 w-8 text-rose-500" />
        <h3 className="text-sm font-bold text-rose-700">Unable to load files</h3>
        <p className="text-xs text-rose-600 max-w-sm">
          Please verify your connection and sign-in credentials, then try again.
        </p>
        <button
          type="button"
          onClick={loadData}
          className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 text-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-rose-700 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 pb-16 relative"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Input for Native Picker */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_FILE_TYPES}
        className="hidden"
        onChange={(e) => {
          handleFilesUpload(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Drag & Drop Visual Overlay */}
      {isDragging && (
        <div className="fixed inset-0 z-[100] bg-[#8876FF]/20 backdrop-blur-sm border-4 border-dashed border-[#8876FF] rounded-3xl m-4 flex flex-col items-center justify-center gap-3 animate-in fade-in">
          <div className="w-20 h-20 rounded-3xl bg-white text-[#8876FF] flex items-center justify-center shadow-2xl animate-bounce">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-ink">Drop files here to upload</h3>
          <p className="text-xs font-medium text-ink/70">
            Files will be stored securely in the Cloudinary CDN
          </p>
        </div>
      )}

      {/* Main File Browser Grid Layout (Sidebar + Workspace) */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left File-Browser Sidebar */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6.5rem)]">
          <FileBrowserSidebar
            activeView={activeView}
            onSelectView={(viewId) => {
              setActiveView(viewId);
              setSelectedFileIds([]);
            }}
            projects={projects}
            allFiles={allFiles}
            starredIds={starredFileIds}
            onOpenCreateProject={() => setCreateProjectOpen(true)}
          />
        </div>

        {/* Right Workspace Main Canvas */}
        <div className="space-y-4 min-w-0">
          {/* Header Toolbar */}
          <FileBrowserToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeView={activeView}
            selectedProject={selectedProject}
            onSelectView={setActiveView}
            onTriggerUpload={() => fileInputRef.current?.click()}
            onOpenCreateProject={() => setCreateProjectOpen(true)}
            uploading={uploadQueue.some((u) => u.status === "uploading")}
            totalFilesCount={displayedFiles.length}
          />

          {/* Project Info Banner (if a single project is selected) */}
          {selectedProject && (
            <ProjectInfoBanner
              project={selectedProject}
              onClose={() => setActiveView("all")}
            />
          )}

          {/* Folder Cards (in 'all' files view and when no search is active) */}
          {activeView === "all" && !searchQuery.trim() && activeCategory === "all" && (
            <FolderCardsGrid
              projects={projects}
              allFiles={allFiles}
              onSelectProject={(pId) => setActiveView(pId)}
            />
          )}

          {/* Files Display Area */}
          <div className="space-y-2.5">
            {activeView === "all" && !searchQuery.trim() && activeCategory === "all" && projects.length > 0 && (
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8876FF]" />
                  <span>All Files ({displayedFiles.length})</span>
                </h3>
              </div>
            )}

            {displayedFiles.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/10 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand/60 text-[#8876FF]">
                  <FolderOpen className="h-7 w-7" />
                </div>
                <h3 className="text-sm font-bold text-ink">No files found</h3>
                <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
                  {searchQuery
                    ? `No files matching "${searchQuery}". Try a different search term.`
                    : activeView === "starred"
                    ? "You haven't starred any files yet. Click the star on any file to add it here."
                    : "Upload images, documents, or media files to share with the team and clients."}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-brand mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload First File
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <FileGridView
                files={displayedFiles}
                selectedFileIds={selectedFileIds}
                starredFileIds={starredFileIds}
                onToggleSelect={handleToggleSelect}
                onToggleStar={handleToggleStar}
                onPreviewFile={setPreviewFile}
                onStartRename={setRenamingFile}
                onConfirmDelete={setDeleteTarget}
                showProjectBadge={activeView === "all" || activeView === "recent" || activeView === "starred"}
              />
            ) : (
              <FileListView
                files={displayedFiles}
                selectedFileIds={selectedFileIds}
                starredFileIds={starredFileIds}
                onToggleSelect={handleToggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
                onToggleStar={handleToggleStar}
                onPreviewFile={setPreviewFile}
                onStartRename={setRenamingFile}
                onConfirmDelete={setDeleteTarget}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Multi-Select Action Bar */}
      <FileMultiSelectBar
        selectedCount={selectedFileIds.length}
        onDownloadSelected={handleBatchDownload}
        onDeleteSelected={() =>
          setDeleteTarget({ count: selectedFileIds.length, isBatch: true })
        }
        onClearSelection={handleClearSelection}
      />

      {/* Floating Upload Progress Drawer */}
      <FileUploadDrawer
        uploadQueue={uploadQueue}
        onClearQueue={() => setUploadQueue([])}
        onDismissItem={(id) => setUploadQueue((prev) => prev.filter((q) => q.id !== id))}
      />

      {/* File Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        isStarred={previewFile ? starredFileIds.includes(previewFile.id) : false}
        onClose={() => setPreviewFile(null)}
        onToggleStar={handleToggleStar}
        onStartRename={setRenamingFile}
        onConfirmDelete={setDeleteTarget}
      />

      {/* Rename File Modal */}
      <RenameModal
        file={renamingFile}
        onClose={() => setRenamingFile(null)}
        onSave={handleSaveRename}
        saving={savingRename}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDeleteAction}
        deleting={deleting}
      />

      {/* Create Project / Folder Modal */}
      <CreateFolderModal
        isOpen={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        onCreate={handleCreateProject}
        creating={creatingProject}
      />
    </div>
  );
}