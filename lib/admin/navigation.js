const base = "/admin/dashboard";

export const navGroups = [
  {
    label: "Overview",
    items: [{ href: `${base}`, icon: "LayoutDashboard", label: "Dashboard" }],
  },
  {
    label: "CRM",
    items: [
      { href: `${base}/leads`, icon: "Users", label: "Leads" },
      { href: `${base}/contacts`, icon: "BookOpen", label: "Contacts" },
      { href: `${base}/companies`, icon: "Building2", label: "Companies" },
      { href: `${base}/clients`, icon: "UserCheck", label: "Clients" },
      { href: `${base}/deals`, icon: "TrendingUp", label: "Deals" },
    ],
  },
  {
    label: "Projects",
    items: [
      { href: `${base}/projects`, icon: "Briefcase", label: "Projects" },
      { href: `${base}/project-files`, icon: "FolderOpen", label: "Project Files" },
      { href: `${base}/tasks`, icon: "ClipboardList", label: "Tasks" },
      { href: `${base}/milestones`, icon: "Flag", label: "Milestones" },
      { href: `${base}/team`, icon: "UsersRound", label: "Team" },
    ],
  },
  {
    label: "Communication",
    items: [
      { href: `${base}/messages`, icon: "MessageSquare", label: "Messages" },
      { href: `${base}/notifications`, icon: "Bell", label: "Notifications" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: `${base}/blog`, icon: "BookOpen", label: "Blog" },
      { href: `${base}/faqs`, icon: "HelpCircle", label: "FAQs" },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: `${base}/reports/sales`, icon: "BarChart3", label: "Sales Report" },
      { href: `${base}/reports/projects`, icon: "FileText", label: "Project Report" },
      { href: `${base}/reports/team`, icon: "Users", label: "Team Report" },
    ],
  },
  {
    label: "System",
    items: [
      { href: `${base}/security`, icon: "Shield", label: "Security" },
      { href: `${base}/settings`, icon: "Settings", label: "Settings" },
    ],
  },
];