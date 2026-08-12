export const dynamic = "force-dynamic";
import { getAdminCredentials } from "@/lib/admin/auth";
import SecurityPanel from "@/components/admin/security/SecurityPanel";

export const metadata = { title: "Security — Admin" };

export default async function AdminSecurityPage() {
  const { email, password } = getAdminCredentials();
  const usingDefaultPassword = password === "infinisoftech123";

  return (
    <SecurityPanel
      email={email}
      usingDefaultPassword={usingDefaultPassword}
      sessionId="active"
      lastLogin="Today, 09:42"
    />
  );
}