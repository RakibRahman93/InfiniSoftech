import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomerByToken } from "@/lib/customer/auth";
import CustomerShell from "@/components/customer/CustomerShell";
import "../customer.css";

export const metadata = {
  title: "My Account — Infinisoftech",
  robots: { index: false, follow: false },
};

export default async function CustomerDashboardLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("customer_session")?.value;
  const customer = await getCustomerByToken(token);
  if (!customer) {
    redirect("/customer/login");
  }

  return (
    <CustomerShell
      customer={{ id: customer.id, name: customer.name, email: customer.email, avatarUrl: customer.avatarUrl ?? null }}
    >
      {children}
    </CustomerShell>
  );
}