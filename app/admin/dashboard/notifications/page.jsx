export const dynamic = "force-dynamic";
import NotificationsManager from "@/components/admin/notifications/NotificationsManager";

export const metadata = { title: "Notifications — Admin" };

export default async function AdminNotificationsPage() {
  return <NotificationsManager />;
}
