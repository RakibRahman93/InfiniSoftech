import { prisma, hasPrisma } from "@/lib/prisma";

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
];

function mapRow(row) {
  return {
    id: row.id,
    title: row.title ?? row.name ?? "Untitled",
    slug: row.slug ?? "",
    excerpt: row.excerpt ?? row.content ?? "",
    status: row.status ?? "published",
    author: row.author ?? "InfiniSoft Team",
    date:
      typeof row.createdAt === "string" || row.createdAt instanceof Date
        ? String(row.createdAt).slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    cover: row.cover ?? null,
  };
}

export async function listBlogPosts() {
  if (!hasPrisma()) return { posts: demoPosts, live: false };
  try {
    const rows = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    if (!rows || rows.length === 0) return { posts: demoPosts, live: true, empty: true };
    return { posts: rows.map(mapRow), live: true };
  } catch {
    return { posts: demoPosts, live: false };
  }
}

export async function createBlogPost({ title, slug, excerpt, status = "published" }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    const row = await prisma.blog.create({
      data: { title, slug, excerpt: excerpt ?? "", status, author: "InfiniSoft Team" },
    });
    return { post: mapRow(row) };
  } catch (error) {
    return { error: error?.message };
  }
}

export async function deleteBlogPost(id) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    await prisma.blog.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    return { error: error?.message };
  }
}