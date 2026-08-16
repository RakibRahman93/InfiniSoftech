import { randomBytes } from "crypto";
import { prisma, hasPrisma } from "@/lib/prisma";

const TE = new TextEncoder();
const SESSION_DAYS = 30;

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashInput(input) {
  if (typeof crypto === "undefined" || !crypto.subtle) return "";
  const digest = await crypto.subtle.digest("SHA-256", TE.encode(input));
  return toHex(digest);
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return toHex(bytes);
}

export async function hashPassword(password, salt = generateSalt()) {
  return { salt, hash: await hashInput(`${salt}:${password}:infinisoftech-customer`) };
}

export async function verifyPassword(password, salt, storedHash) {
  if (!salt || !storedHash) return false;
  const attempt = await hashInput(`${salt}:${password}:infinisoftech-customer`);
  return attempt.length === storedHash.length && attempt === storedHash;
}

export function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export async function getCustomerByEmail(email) {
  if (!hasPrisma()) return null;
  try {
    return await prisma.customer.findUnique({ where: { email: normalizeEmail(email) } });
  } catch {
    return null;
  }
}

export async function registerCustomer({ name, email, password }) {
  if (!hasPrisma()) return { error: "Customer accounts are not available yet (DATABASE_URL not configured)." };

  const normalized = normalizeEmail(email);
  if (!name || !String(name).trim()) return { error: "Name is required." };
  if (!/.+@.+\..+/.test(normalized)) return { error: "A valid email is required." };
  if (!password || String(password).length < 6) return { error: "Password must be at least 6 characters." };

  const existing = await getCustomerByEmail(normalized);
  if (existing) return { error: "An account already exists for this email. Please sign in instead." };

  const { salt, hash } = await hashPassword(password);
  try {
    const customer = await prisma.customer.create({
      data: { name: String(name).trim(), email: normalized, passwordHash: hash, salt },
    });
    return { customer, token: await createSession(customer.id) };
  } catch (error) {
    return { error: error?.message || "Could not create account." };
  }
}

export async function loginCustomer({ email, password }) {
  if (!hasPrisma()) return { error: "Customer accounts are not available yet (DATABASE_URL not configured)." };

  const normalized = normalizeEmail(email);
  const customer = await getCustomerByEmail(normalized);
  if (!customer || !customer.passwordHash || !customer.salt) {
    return { error: "Invalid email or password." };
  }

  const ok = await verifyPassword(password, customer.salt, customer.passwordHash);
  if (!ok) return { error: "Invalid email or password." };

  return { customer, token: await createSession(customer.id) };
}

export async function createSession(customerId) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  try {
    await prisma.customerSession.create({
      data: { token, customerId, expiresAt },
    });
    return token;
  } catch (error) {
    return null;
  }
}

export async function getCustomerByToken(token) {
  if (!hasPrisma() || !token) return null;
  try {
    const session = await prisma.customerSession.findUnique({
      where: { token },
      include: { customer: true },
    });
    if (!session || !session.customer) return null;
    if (session.expiresAt && session.expiresAt.getTime() < Date.now()) {
      await prisma.customerSession.delete({ where: { id: session.id } });
      return null;
    }
    return session.customer;
  } catch {
    return null;
  }
}

export async function destroySession(token) {
  if (!hasPrisma() || !token) return;
  try {
    await prisma.customerSession.deleteMany({ where: { token } });
  } catch {
    // ignore
  }
}

export async function changePassword({ customer, currentPassword, newPassword }) {
  if (!hasPrisma()) return { error: "Password change is not available yet (DATABASE_URL not configured)." };
  if (!customer) return { error: "Not authenticated." };
  if (!newPassword || String(newPassword).length < 6) {
    return { error: "New password must be at least 6 characters." };
  }

  const ok = await verifyPassword(currentPassword, customer.salt, customer.passwordHash);
  if (!ok) return { error: "Current password is incorrect." };

  const { salt, hash } = await hashPassword(newPassword);
  try {
    await prisma.customer.update({
      where: { id: customer.id },
      data: { passwordHash: hash, salt },
    });
    await prisma.customerSession.deleteMany({ where: { customerId: customer.id } });
    return { ok: true, token: await createSession(customer.id) };
  } catch (error) {
    return { error: error?.message || "Could not update password." };
  }
}

export function customerToPublic(customer) {
  return customer
    ? { id: customer.id, name: customer.name, email: customer.email, createdAt: customer.createdAt }
    : null;
}