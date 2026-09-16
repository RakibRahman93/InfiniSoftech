import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin — InfiniSoftech",
  robots: { index: false, follow: false },
};

export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}