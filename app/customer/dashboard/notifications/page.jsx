import NotificationsCenter from "@/components/common/NotificationsCenter";

export const metadata = { title: "Notifications — My Account" };

export default function CustomerNotificationsPage() {
  return <NotificationsCenter role="customer" title="Notifications" />;
}