export const dynamic = "force-dynamic";
import ClientsManager from "@/components/admin/clients/ClientsManager";

export const metadata = { title: "Clients — Admin" };

export default async function AdminClientsPage() {
  return <ClientsManager />;
}
