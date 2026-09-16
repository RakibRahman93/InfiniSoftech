export const dynamic = "force-dynamic";
import { listFaqs } from "@/lib/admin/faqs-service";
import FaqManager from "@/components/admin/faqs/FaqManager";

export const metadata = { title: "FAQs — Admin" };

export default async function AdminFaqsPage() {
  const { faqs, live } = await listFaqs();
  return <FaqManager initialFaqs={faqs} live={live} />;
}