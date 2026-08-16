export const dynamic = "force-dynamic";
import ProjectFilesManager from "@/components/admin/project-files/ProjectFilesManager";

export const metadata = { title: "Project Files — Admin" };

export default async function AdminProjectFilesPage() {
  return <ProjectFilesManager />;
}