export const dynamic = "force-dynamic";
import { listSettings } from "@/lib/admin/settings-service";
import SettingsPanel from "@/components/admin/settings/SettingsPanel";

export const metadata = { title: "Settings — Admin" };

const DEFAULTS = {
  site_name: "InfiniSoftech",
  contact_email: "hello@infinisoftech.com",
  announcement: "",
};

export default async function AdminSettingsPage() {
  const { values } = await listSettings();
  return <SettingsPanel initial={{ ...DEFAULTS, ...values }} />;
}