export const dynamic = "force-dynamic";
import { listLeads } from "@/lib/admin/leads-service";
import LeadsManager from "@/components/admin/leads/LeadsManager";

export const metadata = { title: "Leads — Admin" };

export default async function AdminLeadsPage() {
  const { leads, live } = await listLeads();
  return <LeadsManager initialLeads={leads} live={live} />;
}