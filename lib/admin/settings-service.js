export async function getDbSafe() {
  try {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  } catch {
    return null;
  }
}

export async function listSettings() {
  const db = await getDbSafe();
  if (!db) return { values: {}, live: false };

  const { data, error } = await db.from("settings").select("*");
  if (error) return { values: {}, live: false };

  const values = {};
  for (const row of data ?? []) values[row.key] = row.value;
  return { values, live: true };
}