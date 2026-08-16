export const dynamic = "force-dynamic";
import TeamReport from "@/components/admin/reports/TeamReport";

export const metadata = { title: "Team Report — Admin" };

export default async function AdminTeamReportPage() {
  return <TeamReport />;
}
