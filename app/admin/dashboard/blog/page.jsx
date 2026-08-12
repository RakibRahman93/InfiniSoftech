export const dynamic = "force-dynamic";
import { listBlogPosts } from "@/lib/admin/blog-service";
import BlogManager from "@/components/admin/blog/BlogManager";

export const metadata = { title: "Blog — Admin" };

export default async function AdminBlogPage() {
  const { posts, live } = await listBlogPosts();
  return <BlogManager initialPosts={posts} live={live} />;
}