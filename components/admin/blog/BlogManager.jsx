"use client";

import { useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogManager({ initialPosts, live }) {
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", status: "published" });

  const notify = (message, tone = "success") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim() || slugify(form.title),
          excerpt: form.excerpt.trim(),
          status: form.status,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not create post.", "error");
        return;
      }
      setPosts((prev) => [data.post, ...prev]);
      setShowForm(false);
      setForm({ title: "", slug: "", excerpt: "", status: "published" });
      notify("Blog post created.");
    } catch {
      notify("Network error while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post) => {
    if (deletingId !== post.id) {
      setDeletingId(post.id);
      return;
    }
    setDeletingId(null);
    try {
      const res = await fetch(`/api/admin/blog?id=${encodeURIComponent(post.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not delete post.", "error");
        return;
      }
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      notify("Blog post deleted.");
    } catch {
      notify("Network error while deleting.", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">Blog</h2>
            <p className="text-[11px] text-muted-foreground">
              {posts.length} post{posts.length === 1 ? "" : "s"} ·{" "}
              {live ? "Supabase-backed" : "sample data"}
            </p>
          </div>
        </div>
        <button
          data-no-sparkle
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Close" : "New Post"}
        </button>
      </div>

      {!live && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            The <code className="rounded bg-sand/70 px-1">blogs</code> table was not found in
            Supabase, so you are viewing sample content. Create a <em>blogs</em> table (id, title,
            slug, excerpt, status, created_at) to manage live content.
          </p>
        </div>
      )}

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-medium ${
            toast.tone === "error" ? "bg-rose-50 text-rose-600" : "bg-green/10 text-green"
          }`}
        >
          {toast.tone === "error" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {toast.message}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Post</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Slug</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">Date</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-ink/5 last:border-b-0 hover:bg-sand/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-sand/60">
                      {post.cover ? (
                        <img src={post.cover} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.author}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span className="truncate rounded-md bg-sand/50 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                    {post.slug || "—"}
                  </span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      post.status === "published"
                        ? "bg-green/10 text-green"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                  {post.date}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {post.slug && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View post"
                        className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      data-no-sparkle
                      onClick={() => handleDelete(post)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                        deletingId === post.id
                          ? "bg-rose-600 text-white"
                          : "text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {deletingId === post.id ? "Confirm?" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-14 text-center text-xs text-muted-foreground">
                  No blog posts yet. Create your first post.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
          <h3 className="font-display text-sm font-semibold text-ink">New Blog Post</h3>
          <form onSubmit={handleCreate} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))
                  }
                  placeholder="A useful article title"
                  className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Slug</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="auto-suggested"
                  className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Excerpt</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Short summary shown on the blog listing."
                className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-ink">Status:</span>
                {["draft", "published"].map((s) => (
                  <button
                    data-no-sparkle
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                      form.status === s ? "bg-green/10 text-green" : "bg-sand/50 text-muted-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving…" : "Publish"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}