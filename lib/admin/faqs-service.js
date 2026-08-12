async function getDb() {
  try {
    const { supabase } = await import("@/lib/supabase");
    return supabase;
  } catch {
    return null;
  }
}

const demoFaqs = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer:
      "We specialize in website design and development, mobile app creation, UI/UX design, and prototyping. Our comprehensive solutions are tailored to meet your specific business needs.",
    order: 1,
  },
  {
    id: "faq-2",
    question: "How long does it take to complete a project?",
    answer:
      "The timeline depends on the project's complexity and scope. For example, mobile app development typically takes around 3 months, including testing and deployment.",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Do you offer post-project support?",
    answer:
      "Yes, we provide post-project support to ensure your platform runs smoothly. This can include updates, bug fixes, and additional customization based on your requirements.",
    order: 3,
  },
  {
    id: "faq-4",
    question: "How do I get started with your services?",
    answer:
      "Simply contact us through our form or email, and we'll schedule a discussion to understand your requirements and propose a tailored solution for your business.",
    order: 4,
  },
];

function mapRow(row) {
  return {
    id: row.id,
    question: row.question ?? "Untitled question",
    answer: row.answer ?? "",
    order: row.order ?? row.sort_order ?? 0,
  };
}

export async function listFaqs() {
  const db = await getDb();
  if (!db) return { faqs: demoFaqs, live: false };

  const { data, error } = await db.from("faqs").select("*").order("order", { ascending: true });

  if (error) return { faqs: demoFaqs, live: false };
  if (!data || data.length === 0) return { faqs: demoFaqs, live: true, empty: true };

  return { faqs: data.map(mapRow), live: true };
}

export async function createFaq({ question, answer }) {
  const db = await getDb();
  if (!db) return { error: "Supabase is not configured." };

  const { data, error } = await db
    .from("faqs")
    .insert([{ question, answer }])
    .select()
    .single();

  if (error) return { error: error.message };
  return { faq: mapRow(data) };
}

export async function deleteFaq(id) {
  const db = await getDb();
  if (!db) return { error: "Supabase is not configured." };

  const { error } = await db.from("faqs").delete().eq("id", id);
  if (error) return { error: error.message };
  return { ok: true };
}