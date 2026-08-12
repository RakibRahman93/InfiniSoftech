async function getDb() {
  try {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  } catch {
    return null;
  }
}

const demoLeads = [
  {
    id: "lead-1",
    name: "James Whitfield",
    email: "james.w@gmail.com",
    company: "Peakline Media",
    message: "Looking for a full website rebuild. We are a photography studio growing fast.",
    source: "Contact form",
    status: "Won",
    created_at: "2026-06-24T09:12:00.000Z",
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    company: "Bloom Health",
    message: "We need a mobile app to complement our wellness subscription platform.",
    source: "Contact form",
    status: "Qualified",
    created_at: "2026-06-23T14:40:00.000Z",
  },
  {
    id: "lead-3",
    name: "Daniel Osei",
    email: "daniel.osei@email.com",
    company: "Osei Logistics",
    message: "Interested in staff augmentation — 2 frontend engineers for 6 months.",
    source: "Chat",
    status: "Contacted",
    created_at: "2026-06-22T10:05:00.000Z",
  },
  {
    id: "lead-4",
    name: "Sofia Reyes",
    email: "sofia.reyes@email.com",
    company: "Vela Interiors",
    message: "Seeking an SEO retainer. Are we ranking for 'interior design' in Miami?",
    source: "Contact form",
    status: "New",
    created_at: "2026-06-21T16:22:00.000Z",
  },
  {
    id: "lead-5",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    company: "Chen & Co",
    message: "We want a brand refresh plus new website with e-commerce.",
    source: "Chat",
    status: "New",
    created_at: "2026-06-20T08:55:00.000Z",
  },
];

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function mapRow(row, sourceHint) {
  return {
    id: row.id,
    name: row.name ?? row.username ?? row.full_name ?? "Unknown",
    email: row.email ?? "",
    company: row.company ?? row.company_name ?? "",
    message: row.message ?? row.content ?? "",
    source: sourceHint,
    status: row.status ?? "New",
    created_at: row.inserted_at ?? row.created_at ?? new Date().toISOString(),
    formattedDate: formatDate(row.inserted_at ?? row.created_at),
  };
}

export async function listLeads() {
  const db = await getDb();
  if (!db) return { leads: demoLeads.map((l) => ({ ...l, formattedDate: formatDate(l.created_at) })), live: false };

  // Prefer a dedicated `leads` table, fall back to `messages` (chat).
  const { data, error } = await db.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
  if (!error && data && data.length > 0) {
    return { leads: data.map((r) => mapRow(r, r.source ?? "Leads table")), live: true };
  }

  if (error && !/relation .* does not exist/i.test(error.message)) {
    // Real query error (not missing table) — still try messages below.
  }

  const { data: msgs, error: msgsError } = await db
    .from("messages")
    .select("*")
    .order("inserted_at", { ascending: false })
    .limit(200);

  if (!msgsError && msgs && msgs.length > 0) {
    return { leads: msgs.map((r) => mapRow(r, "Chat")), live: true };
  }

  return { leads: demoLeads.map((l) => ({ ...l, formattedDate: formatDate(l.created_at) })), live: false };
}