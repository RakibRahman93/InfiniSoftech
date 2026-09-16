export const dynamic = "force-dynamic";
import { getSecurityOverview } from "@/lib/admin/security-service";
import SecurityPanel from "@/components/admin/security/SecurityPanel";

export const metadata = { title: "Security — Admin" };

export default async function AdminSecurityPage() {
  const overview = await getSecurityOverview();
  return <SecurityPanel overview={overview} />;
}