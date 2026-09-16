import { prisma, hasPrisma } from "@/lib/prisma";
import { getAdminCredentials, hashPassword, verifyPassword } from "@/lib/admin/auth";

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export async function getSecurityOverview() {
  const { email, password } = getAdminCredentials();

  const base = {
    email,
    otpEnabled: true,
    live: false,
    lastLogin: null,
    usingDefaultPassword: false,
    sessionId: "active",
  };
  if (!hasPrisma()) return { ...base, usingDefaultPassword: password === "infinisoftech123" };

  let user = null;
  try {
    user = await prisma.adminUser.findUnique({ where: { email: normalizeEmail(email) } });
  } catch {
    user = null;
  }
  if (!user) return { ...base, error: "Admin user not found." };

  const usingDefaultPassword = user.passwordHash && user.salt
    ? !(await verifyPassword(password, user.salt, user.passwordHash))
    : password === "infinisoftech123";

  return {
    email: user.email ?? email,
    otpEnabled: user.otpEnabled !== false,
    live: true,
    lastLogin: user.lastLoginAt ?? null,
    usingDefaultPassword,
    sessionId: "active",
  };
}