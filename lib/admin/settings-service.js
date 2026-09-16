import { prisma, hasPrisma } from "@/lib/prisma";

export async function listSettings() {
  if (!hasPrisma()) return { values: {}, live: false };
  try {
    const rows = await prisma.setting.findMany();
    const values = {};
    for (const row of rows) values[row.key] = row.value;
    return { values, live: true };
  } catch {
    return { values: {}, live: false };
  }
}

export async function upsertSettings(values) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    for (const [key, value] of Object.entries(values ?? {})) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value ?? "") },
        create: { key, value: String(value ?? "") },
      });
    }
    return { ok: true };
  } catch (error) {
    return { error: error?.message };
  }
}