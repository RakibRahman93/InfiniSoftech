export const dynamic = "force-dynamic";
import MilestonesManager from "@/components/admin/milestones/MilestonesManager";

export const metadata = { title: "Project Milestones — Admin" };

export default async function AdminMilestonesPage() {
  return <MilestonesManager />;
}
