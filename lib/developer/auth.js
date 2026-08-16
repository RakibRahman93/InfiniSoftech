import { prisma, hasPrisma } from "@/lib/prisma";

const TE = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashInput(input) {
  const digest = await crypto.subtle.digest("SHA-256", TE.encode(input));
  return toHex(digest);
}

export async function verifyDeveloperCredentials(email, password) {
  if (!hasPrisma()) return { user: null, error: "Database not configured." };
  const normalized = String(email ?? "").trim().toLowerCase();
  if (!normalized || !password) return { user: null, error: "Email and password are required." };

  let user;
  try {
    user = await prisma.user.findUnique({ where: { email: normalized } });
  } catch {
    return { user: null, error: "Unable to verify credentials." };
  }

  if (!user) return { user: null, error: "Invalid email or password." };
  if (!user.isActive) return { user: null, error: "Your account has been deactivated. Please contact an admin." };
  if (user.role !== "DEVELOPER" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return { user: null, error: "Access denied." };
  }

  const attempt = await hashInput(`${user.salt}:${password}:infinisoftech-user`);
  if (attempt.length !== user.passwordHash.length || attempt !== user.passwordHash) {
    return { user: null, error: "Invalid email or password." };
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export async function createDeveloperSession(userId) {
  if (!hasPrisma()) return null;
  const rawToken = `${userId}:${Date.now()}:${Math.random()}`;
  const token = await hashInput(rawToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.developerSession.create({ data: { token, userId, expiresAt } });
  return token;
}

export async function isDeveloperSessionValid(token) {
  if (!token || !hasPrisma()) return null;
  try {
    const session = await prisma.developerSession.findUnique({
      where: { token },
      include: { user: { select: { id: true, name: true, email: true, role: true, isActive: true } } },
    });
    if (!session) return null;
    if (session.expiresAt < new Date()) {
      await prisma.developerSession.delete({ where: { token } }).catch(() => {});
      return null;
    }
    if (!session.user.isActive) return null;
    return session.user;
  } catch {
    return null;
  }
}

export async function invalidateDeveloperSession(token) {
  if (!token || !hasPrisma()) return;
  try {
    await prisma.developerSession.deleteMany({ where: { token } });
  } catch {
    // ignore
  }
}
