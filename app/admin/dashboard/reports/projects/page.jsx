export const dynamic = "force-dynamic";
import ProjectReport from "@/components/admin/reports/ProjectReport";

export const metadata = { title: "Project Report — Admin" };

export default async function AdminProjectReportPage() {
  return <ProjectReport />;
}
