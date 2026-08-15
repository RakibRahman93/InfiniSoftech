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
      { href: `${base}/companies`, icon: "Layers3", label: "Companies" },
      { href: `${base}/deals`, icon: "Star", label: "Deals" },
      { href: `${base}/messages`, icon: "MessageSquare", label: "Chat Messages", placeholder: true },
    ],
  },
  {
    label: "Content",
    items: [
      { href: `${base}/blog`, icon: "BookOpen", label: "Blog" },
      { href: `${base}/faqs`, icon: "HelpCircle", label: "FAQs" },
      { href: `${base}/services`, icon: "Layers3", label: "Services", placeholder: true },
      { href: `${base}/portfolio`, icon: "Image", label: "Portfolio", placeholder: true },
      { href: `${base}/testimonials`, icon: "Star", label: "Testimonials", placeholder: true },
    ],
  },
  {
    label: "Marketing",
    items: [
      { href: `${base}/analytics`, icon: "BarChart3", label: "Analytics", placeholder: true },
      { href: `${base}/reports`, icon: "FileText", label: "Reports", placeholder: true },
      { href: `${base}/announcement`, icon: "Megaphone", label: "Announcement Bar", placeholder: true },
      { href: `${base}/newsletter`, icon: "Mail", label: "Newsletter", placeholder: true },
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