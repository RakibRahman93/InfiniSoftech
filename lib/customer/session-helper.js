import { cookies } from "next/headers";
import { getCustomerByToken } from "./auth";

export async function requireCustomer() {
  const store = cookies();
  const token = store.get("customer_session")?.value;
  if (!token) return null;
  return getCustomerByToken(token);
}

export async function getCustomerFromRequest(token) {
  if (!token) return null;
  return getCustomerByToken(token);
}