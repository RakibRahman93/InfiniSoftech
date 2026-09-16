import { prisma, hasPrisma } from "@/lib/prisma";
import { hashInput } from "@/lib/admin/auth";

export async function listSecurityCodes() {
  if (!hasPrisma()) return { codes: [], live: false };
  try {
    const rows = await prisma.securityCode.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      codes: rows.map((r) => ({
        id: r.id,
        label: r.label,
        active: r.active,
        createdAt: r.createdAt,
        lastUsedAt: r.lastUsedAt,
      })),
      live: true,
    };
  } catch (error) {
    return { codes: [], live: false, error: error?.message };
  }
}

export async function createSecurityCode({ label, code }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const trimmed = String(code ?? "").trim();
  if (trimmed.length < 4) {
    return { error: "Verification code must be at least 4 characters." };
  }
  if (trimmed.length > 20) {
    return { error: "Verification code must be no longer than 20 characters." };
  }
  try {
    const row = await prisma.securityCode.create({
      data: {
        label: String(label ?? "Verification code").trim() || "Verification code",
        codeHash: await hashInput(trimmed),
        active: true,
      },
    });
    return { code: { id: row.id, label: row.label, active: true } };
  } catch (error) {
    return { error: error?.message };
  }
}

export async function updateSecurityCode({ id, label, active, code }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    const existing = await prisma.securityCode.findUnique({ where: { id } });
    if (!existing) return { error: "Verification code not found." };

    const data = {};
    if (typeof label === "string") data.label = label.trim() || "Verification code";
    if (typeof active === "boolean") data.active = active;
    if (typeof code === "string" && code.trim()) {
      const trimmed = code.trim();
      if (trimmed.length < 4) {
        return { error: "Verification code must be at least 4 characters." };
      }
      if (trimmed.length > 20) {
        return { error: "Verification code must be no longer than 20 characters." };
      }
      data.codeHash = await hashInput(trimmed);
    }

    const row = await prisma.securityCode.update({ where: { id }, data });
    return { code: { id: row.id, label: row.label, active: row.active } };
  } catch (error) {
    return { error: error?.message };
  }
}

export async function deleteSecurityCode(id) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    await prisma.securityCode.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    return { error: error?.message };
  }
}

export async function verifySecurityCode(code) {
  if (!hasPrisma()) return false;
  const trimmed = String(code ?? "").trim();
  if (!trimmed) return false;
  const attempt = await hashInput(trimmed);

  const rows = await prisma.securityCode.findMany({
    where: { active: true },
  });
  const match = rows.find(
    (r) => r.codeHash.length === attempt.length && r.codeHash === attempt,
  );
  if (!match) return false;

  await prisma.securityCode.update({
    where: { id: match.id },
    data: { lastUsedAt: new Date() },
  });
  return true;
}