import { prisma, hasPrisma } from "@/lib/prisma";

export async function logAudit({ actorId, actorName, action, entityType, entityId, metadata, request }) {
  if (!hasPrisma()) return;
  try {
    await prisma.auditLog.create({
      data: {
        actorId: actorId ?? null,
        actorName: actorName ?? null,
        action,
        entityType,
        entityId: entityId ?? null,
        metadata: metadata ?? undefined,
        ipAddress: request ? getClientIp(request) : null,
        userAgent: request?.headers?.get?.("user-agent") ?? null,
      },
    });
  } catch {
    // audit logging is best-effort; never break the main operation
  }
}

export function getClientIp(request) {
  try {
    const xff = request.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return request.headers.get("x-real-ip") || "unknown";
  } catch {
    return "unknown";
  }
}