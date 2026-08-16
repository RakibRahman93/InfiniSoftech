export const dynamic = "force-dynamic";
import SalesReport from "@/components/admin/reports/SalesReport";

export const metadata = { title: "Sales Report — Admin" };

export default async function AdminSalesReportPage() {
  return <SalesReport />;
}
