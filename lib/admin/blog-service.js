async function getDb() {
  try {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  } catch {
    return null;
  }
}

const demoPosts = [
  {
    id: "demo-1",
    slug: "heavy-slow-website-to-lightning-fast-experience",
    title: "How We Turned a Heavy, Slow Website into a Lightning-Fast Experience",
    excerpt:
      "ThoseGuysPrint needed premium visuals without the drag of a heavy WordPress setup. We rebuilt the experience for speed, clarity, and a sharper product showcase.",
    status: "published",
    author: "InfiniSoft Team",
    date: "2026-06-24",
    cover: "/assets/portfolio/tgp.png",
  },
  {
    id: "demo-2",
    slug: "marketing-problem-or-conversion-problem",
    title: "Why Most Businesses Don't Have a Marketing Problem — They Have a Conversion Problem",
    excerpt:
      "Traffic alone does not grow revenue. Weak UX, low trust, poor performance, and unclear messaging quietly destroy conversions after the click.",
    status: "published",
    author: "InfiniSoft Team",
    date: "2026-06-21",
    cover: "/assets/images/blog/marketing-to-conversion/mar-to-conv-prob.png",
  },
  {
    id: "demo-3",
    slug: "mobile-app-launch-playbook",
    title: "The 2026 Mobile App Launch Playbook for Growing Startups",
    excerpt:
      "A practical checklist covering the design, build, and release phases of shipping a mobile product that users actually keep.",
    status: "draft",
    author: "InfiniSoft Team",
    date: "2026-06-18",
    cover: "/assets/images/blog/post-prev-1.jpg",
  },
  {
    id: "demo-4",
    slug: "seo-for-web-applications",
    title: "SEO for JavaScript Web Applications: Working With, Not Against, the SPA",
    excerpt:
      "Metadata, streaming, and server rendering — how we approach discoverability for modern single-page applications.",
    status: "published",
    author: "InfiniSoft Team",
    date: "2026-06-12",
    cover: "/assets/images/blog/post-prev-2.jpg",
  },
  {
    id: "demo-5",
    slug: "uiux-audit-before-redesign",
    title: "Why We Run a UX Audit Before Any Redesign",
    excerpt:
      "Rebuilding without measurable friction is guessing. Here is the lightweight audit we run before touching a single pixel.",
    status: "draft",
    author: "InfiniSoft Team",
    date: "2026-06-06",
    cover: "/assets/images/blog/post-prev-3.jpg",
  },
];

function mapRow(row) {
  return {
    id: row.id,
    title: row.title ?? row.name ?? "Untitled",
    slug: row.slug ?? "",
    excerpt: row.excerpt ?? row.content ?? "",
    status: row.status ?? "published",
    author: row.author ?? row.author_name ?? "InfiniSoft Team",
    date: typeof row.created_at === "string" ? row.created_at.slice(0, 10) : row.created_at ?? new Date().toISOString().slice(0, 10),
    cover: row.cover ?? row.img_src ?? row.cover_image ?? null,
  };
}

export async function listBlogPosts() {
  const db = await getDb();
  if (!db) return { posts: demoPosts, live: false };

  const { data, error } = await db
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return { posts: demoPosts, live: false };
  if (!data || data.length === 0) return { posts: demoPosts, live: true, empty: true };

  return { posts: data.map(mapRow), live: true };
}

export async function createBlogPost({ title, slug, excerpt, status = "published" }) {
  const db = await getDb();
  if (!db) return { error: "Supabase is not configured." };

  const { data, error } = await db
    .from("blogs")
    .insert([{ title, slug, excerpt, status, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) return { error: error.message };
  return { post: mapRow(data) };
}

export async function deleteBlogPost(id) {
  const db = await getDb();
  if (!db) return { error: "Supabase is not configured." };

  const { error } = await db.from("blogs").delete().eq("id", id);
  if (error) return { error: error.message };
  return { ok: true };
}