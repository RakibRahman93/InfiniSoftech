import { NextResponse } from "next/server";
import { listBlogPosts, createBlogPost, deleteBlogPost } from "@/lib/admin/blog-service";
import { requireAdmin } from "@/lib/admin/session-helper";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const result = await listBlogPosts();
  return NextResponse.json(result);
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const { title, slug, excerpt, status } = body ?? {};
  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
  }
  const result = await createBlogPost({ title, slug, excerpt, status });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing post id." }, { status: 400 });
  }
  const result = await deleteBlogPost(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}