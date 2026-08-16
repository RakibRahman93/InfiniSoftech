export const dynamic = "force-dynamic";
import DealsManager from "@/components/admin/deals/DealsManager";

export const metadata = { title: "Deals Pipeline — Admin" };

export default async function AdminDealsPage() {
  return <DealsManager />;
}
