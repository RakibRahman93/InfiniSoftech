export const dynamic = "force-dynamic";
import TeamManager from "@/components/admin/team/TeamManager";

export const metadata = { title: "Team — Admin" };

export default async function AdminTeamPage() {
  return <TeamManager />;
}
