import { prisma, hasPrisma } from "@/lib/prisma";

export async function listMessages({ limit = 50 } = {}) {
  if (!hasPrisma()) return [];
  try {
    return await prisma.message.findMany({
      orderBy: { insertedAt: "asc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function createMessage({ content, username = "Admin" }) {
  if (!hasPrisma()) return { error: "Database not configured." };
  const text = String(content ?? "").trim();
  if (!text) return { error: "Message content cannot be empty." };
  try {
    const msg = await prisma.message.create({
      data: {
        content: text,
        username,
      },
    });
    return { message: msg };
  } catch (err) {
    return { error: err?.message || "Failed to send message." };
  }
}
