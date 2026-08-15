export const dynamic = "force-dynamic";
import CompaniesManager from "@/components/admin/companies/CompaniesManager";

export const metadata = { title: "Companies — Admin" };

export default async function AdminCompaniesPage() {
  return <CompaniesManager />;
}