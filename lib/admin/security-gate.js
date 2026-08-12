import { prisma, hasPrisma } from "@/lib/prisma";
import { hashInput } from "@/lib/admin/auth";

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 15;

export function getClientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function isIpBlocked(ip) {
  if (!hasPrisma() || !ip) return false;
  try {
    const row = await prisma.ipBlock.findUnique({ where: { ip } });
    if (!row || !row.blockedUntil) return false;
    if (row.blockedUntil.getTime() > Date.now()) return true;
    return false;
  } catch {
    return false;
  }
}

export async function recordFailedAttempt(ip) {
  if (!hasPrisma() || !ip) return { blocked: false };
  try {
    const existing = await prisma.ipBlock.findUnique({ where: { ip } });
    if (!existing) {
      await prisma.ipBlock.create({ data: { ip, attempts: 1 } });
      return { blocked: false, attemptsLeft: MAX_ATTEMPTS - 1 };
    }
    const next = existing.attempts + 1;
    if (next >= MAX_ATTEMPTS) {
      await prisma.ipBlock.update({
        where: { id: existing.id },
        data: {
          attempts: next,
          blockedAt: new Date(),
          blockedUntil: new Date(Date.now() + BLOCK_MINUTES * 60 * 1000),
        },
      });
      return { blocked: true, attemptsLeft: 0 };
    }
    await prisma.ipBlock.update({ where: { id: existing.id }, data: { attempts: next } });
    return { blocked: false, attemptsLeft: MAX_ATTEMPTS - next };
  } catch {
    return { blocked: false };
  }
}

export async function resetIp(ip) {
  if (!hasPrisma() || !ip) return;
  try {
    await prisma.ipBlock.deleteMany({ where: { ip } });
  } catch {
    // ignore
  }
}

export async function verifySecurityGate(code, ip) {
  if (await isIpBlocked(ip)) {
    return { ok: false, blocked: true, error: "Your IP has been blocked. Try again later." };
  }

  const { verifySecurityCode } = await import("@/lib/admin/security-codes-service");
  const valid = await verifySecurityCode(code);

  if (valid) {
    await resetIp(ip);
    return { ok: true };
  }

  const result = await recordFailedAttempt(ip);
  return {
    ok: false,
    blocked: result.blocked,
    attemptsLeft: result.attemptsLeft,
    error: result.blocked
      ? "Access blocked. Too many failed attempts."
      : "Incorrect security code.",
  };
}

export async function gateTokenValue() {
  if (hasPrisma()) {
    const { getAdminCredentials, sessionValue } = await import("@/lib/admin/auth");
    const { email } = getAdminCredentials();
    return hashInput(`${email}:admin-gate:infinisoftech`);
  }
  return hashInput("admin-gate:infinisoftech");
}

export async function isGateTokenValid(token, ip) {
  if (!token) return false;
  if (await isIpBlocked(ip)) return false;
  const expected = await gateTokenValue();
  if (!expected || token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
