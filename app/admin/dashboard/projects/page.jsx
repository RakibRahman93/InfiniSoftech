export const dynamic = "force-dynamic";
import ProjectsManager from "@/components/admin/projects/ProjectsManager";

export const metadata = { title: "Projects — Admin" };

export default async function AdminProjectsPage() {
  return <ProjectsManager />;
}
