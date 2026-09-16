export const dynamic = "force-dynamic";
import { getDashboardOverview } from "@/lib/admin/dashboard-service";
import OverviewDashboard from "@/components/admin/overview/OverviewDashboard";

export default async function AdminOverviewPage() {
  const data = await getDashboardOverview();
  return <OverviewDashboard data={data} />;
}