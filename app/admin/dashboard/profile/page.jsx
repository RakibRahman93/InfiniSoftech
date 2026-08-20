export const dynamic = "force-dynamic";
import { getAdminCredentials } from "@/lib/admin/auth";
import { prisma, hasPrisma } from "@/lib/prisma";
import AdminProfile from "@/components/admin/AdminProfile";

export const metadata = { title: "Profile — Admin" };

export default async function AdminProfilePage() {
  const { email } = getAdminCredentials();

  let avatarUrl = null;
  if (hasPrisma()) {
    const user = await prisma.adminUser
      .findUnique({ where: { email: String(email).trim().toLowerCase() } })
      .catch(() => null);
    avatarUrl = user?.avatarUrl ?? null;
  }

  return <AdminProfile email={email} avatarUrl={avatarUrl} />;
}