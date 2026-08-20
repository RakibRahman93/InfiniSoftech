export const dynamic = "force-dynamic";
import NotificationsCenter from "@/components/common/NotificationsCenter";

export const metadata = { title: "Notifications — Admin" };

export default async function AdminNotificationsPage() {
  return <NotificationsCenter role="admin" />;
}