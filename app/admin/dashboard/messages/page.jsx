export const dynamic = "force-dynamic";
import MessagesManager from "@/components/admin/messages/MessagesManager";

export const metadata = { title: "Messages — Admin" };

export default async function AdminMessagesPage() {
  return <MessagesManager />;
}
