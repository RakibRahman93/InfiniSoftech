import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/AdminShell";
import "../admin.css";

export const metadata = {
  title: "Admin — InfiniSoftech",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;
  const valid = await isAdminSessionValid(token);
  if (!valid) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}