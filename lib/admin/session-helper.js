import { cookies } from "next/headers";
import { isAdminSessionValid } from "./auth";

export async function requireAdmin() {
  const store = cookies();
  const token = store.get("admin_session")?.value;
  if (!token) return false;
  return isAdminSessionValid(token);
}