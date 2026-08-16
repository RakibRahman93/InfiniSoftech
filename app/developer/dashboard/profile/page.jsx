export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { redirect } from "next/navigation";
import DeveloperProfileClient from "@/components/developer/DeveloperProfile";

export default async function DeveloperProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) redirect("/developer/login");

  return <DeveloperProfileClient user={user} />;
}
