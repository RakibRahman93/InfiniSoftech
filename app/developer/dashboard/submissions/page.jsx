export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { redirect } from "next/navigation";
import DeveloperSubmissionsClient from "@/components/developer/DeveloperSubmissions";

export default async function DeveloperSubmissionsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) redirect("/developer/login");

  return <DeveloperSubmissionsClient user={user} />;
}
