export const dynamic = "force-dynamic";
import TasksManager from "@/components/admin/tasks/TasksManager";

export const metadata = { title: "Tasks — Admin" };

export default async function AdminTasksPage() {
  return <TasksManager />;
}
