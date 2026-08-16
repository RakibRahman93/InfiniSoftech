import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import DeveloperShell from "@/components/developer/DeveloperShell";
import "@/app/customer/customer.css";

export const metadata = {
  title: "Developer Dashboard — InfiniSoftech",
  robots: { index: false, follow: false },
};

export default async function DeveloperDashboardLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) {
    redirect("/developer/login");
  }

  return (
    <DeveloperShell user={{ id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl ?? null }}>
      {children}
    </DeveloperShell>
  );
}
