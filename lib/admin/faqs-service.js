import { prisma, hasPrisma } from "@/lib/prisma";

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
];

function mapRow(row) {
  return {
    id: row.id,
    question: row.question ?? "Untitled question",
    answer: row.answer ?? "",
    order: row.order ?? 0,
  };
}

export async function listFaqs() {
  if (!hasPrisma()) return { faqs: demoFaqs, live: false };
  try {
    const rows = await prisma.faq.findMany({ orderBy: { order: "asc" } });
    if (!rows || rows.length === 0) return { faqs: demoFaqs, live: true, empty: true };
    return { faqs: rows.map(mapRow), live: true };
  } catch {
    return { faqs: demoFaqs, live: false };
  }
}

export async function createFaq({ question, answer }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    const max = await prisma.faq.aggregate({ _max: { order: true } });
    const row = await prisma.faq.create({
      data: { question, answer, order: (max._max.order ?? 0) + 1 },
    });
    return { faq: mapRow(row) };
  } catch (error) {
    return { error: error?.message };
  }
}

export async function deleteFaq(id) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    await prisma.faq.delete({ where: { id } });
    return { ok: true };
  } catch (error) {
    return { error: error?.message };
  }
}