export const dynamic = "force-dynamic";
import ContactsManager from "@/components/admin/contacts/ContactsManager";

export const metadata = { title: "Contacts — Admin" };

export default async function AdminContactsPage() {
  return <ContactsManager />;
}