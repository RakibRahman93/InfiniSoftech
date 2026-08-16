"use client";

import { useEffect, useState } from "react";
import { FileCheck, ExternalLink, Loader2, Calendar } from "lucide-react";

export default function DeveloperSubmissionsClient() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/developer/tasks")
      .then((res) => res.json())
      .then((data) => {
        const tasks = data?.tasks ?? [];
        const submitted = tasks.filter((t) => t.submissionFiles && t.submissionFiles.length > 0);
        setSubmissions(submitted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Deliverables & Submissions</h1>
        <p className="text-xs text-muted-foreground">History of all code, files, and links submitted for review.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
          <FileCheck className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="font-semibold text-ink">No Submissions Yet</p>
          <p className="text-xs text-muted-foreground mt-1">When you submit tasks with deliverables, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((task) => (
            <div key={task.id} className="rounded-2xl border border-ink/5 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{task.taskCode}</span>
                  <h3 className="font-semibold text-ink text-base">{task.title}</h3>
                  <p className="text-xs text-muted-foreground">{task.projectName || "General Project"}</p>
                </div>
                <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-0.5 text-[10px] font-semibold text-violet-600">
                  {task.status}
                </span>
              </div>

              <div className="rounded-xl border border-green/20 bg-green/5 p-3 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wide text-green">Attached Deliverables</p>
                {task.submissionFiles.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-ink/5 text-xs text-ink hover:border-green/40 transition"
                  >
                    <span className="font-medium truncate flex-1">{file.name || "Deliverable Link"}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-green shrink-0 ml-2" />
                  </a>
                ))}
                {task.submissionNotes && (
                  <p className="text-xs text-muted-foreground pt-1 border-t border-green/10">
                    <strong>Notes:</strong> {task.submissionNotes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
