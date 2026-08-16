export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { isDeveloperSessionValid } from "@/lib/developer/auth";
import { redirect } from "next/navigation";
import DeveloperProjectsClient from "@/components/developer/DeveloperProjects";

export default async function DeveloperProjectsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("dev_session")?.value;
  const user = await isDeveloperSessionValid(token);
  if (!user) redirect("/developer/login");

  return <DeveloperProjectsClient user={user} />;
}
