const chartPalette = {
  green: "#4D8A5B",
  greenSoft: "#B9D7C0",
  gold: "#E2A92D",
  blue: "#4C8BEA",
  rose: "#F35F7F",
  roseSoft: "#FFC0CC",
  lavender: "#A981F4",
  grey: "#D8D8D8",
};

async function getLiveChatCount() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const count = await prisma.message.count();
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}

async function getLiveBlogCount() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const count = await prisma.blog.count();
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}

function formatUsd(v) {
  return `$${v.toLocaleString("en-US")}`;
}

export async function getDashboardOverview() {
  const [liveChatCount, liveBlogCount] = await Promise.all([
    getLiveChatCount(),
    getLiveBlogCount(),
  ]);

  const months = [
    "Jan 25",
    "Feb 25",
    "Mar 25",
    "Apr 25",
    "May 25",
    "Jun 25",
    "Jul 25",
    "Aug 25",
    "Sep 25",
    "Oct 25",
    "Nov 25",
    "Dec 25",
  ];

  const stats = [
    {
      icon: "revenue",
      label: "Revenue This Month",
      value: formatUsd(18450),
      change: "+12.4%",
      detail: "vs last month",
      up: true,
      color: "text-green",
      bg: "bg-green/10",
      stroke: chartPalette.green,
      points: [12, 15, 16, 14, 20, 18, 22, 25, 24, 28, 30, 26, 32, 35, 34, 38],
    },
    {
      icon: "orders",
      label: "Total Projects",
      value: "128",
      change: "+8.2%",
      detail: "vs last month",
      up: true,
      color: "text-gold",
      bg: "bg-gold/10",
      stroke: chartPalette.gold,
      points: [8, 9, 11, 10, 13, 12, 15, 14, 17, 16, 18, 19, 21, 20, 22, 24],
    },
    {
      icon: "customers",
      label: "New Leads",
      value: "46",
      change: "+21.0%",
      detail: "vs last month",
      up: true,
      color: "text-blue-500",
      bg: "bg-blue-50",
      stroke: chartPalette.blue,
      points: [4, 5, 6, 5, 8, 7, 9, 8, 11, 12, 10, 14, 13, 15, 16, 18],
    },
    {
      icon: "coupons",
      label: "Active Services",
      value: "9",
      change: "Live now",
      detail: "Website, app, SEO & marketing",
      up: true,
      color: "text-violet-600",
      bg: "bg-violet-50",
      stroke: chartPalette.lavender,
      points: [2, 2, 3, 2, 4, 4, 3, 5, 4, 5, 6, 5, 7, 6, 7, 9],
    },
    {
      icon: "stock",
      label: "Blog Posts",
      value: String(liveBlogCount === null ? 24 : liveBlogCount),
      change: liveBlogCount === null ? "Published" : "Live from DB",
      detail: liveBlogCount === null ? "" : `${liveBlogCount} posts published`,
      up: true,
      color: "text-rose-500",
      bg: "bg-rose-50",
      stroke: chartPalette.rose,
      points: [3, 4, 3, 5, 4, 6, 5, 6, 7, 6, 8, 7, 8, 9, 8, 10],
    },
    {
      icon: "rating",
      label: "Avg. Rating",
      value: "4.8 / 5",
      change: `${liveChatCount === null ? 47 : liveChatCount} chat messages`,
      detail: liveChatCount === null ? "32 reviews" : "Counted live from Supabase",
      up: true,
      color: "text-gold",
      bg: "bg-gold/10",
      stroke: chartPalette.green,
      points: [13, 15, 16, 20, 15, 14, 16, 12, 15, 16, 22, 30, 23, 26, 29, 22],
    },
  ];

  return {
    stats,
    weeklyOrders: [
      { day: "Mon", thisWeek: 9, lastWeek: 6 },
      { day: "Tue", thisWeek: 12, lastWeek: 8 },
      { day: "Wed", thisWeek: 7, lastWeek: 10 },
      { day: "Thu", thisWeek: 14, lastWeek: 9 },
      { day: "Fri", thisWeek: 11, lastWeek: 12 },
      { day: "Sat", thisWeek: 16, lastWeek: 10 },
      { day: "Sun", thisWeek: 13, lastWeek: 11 },
    ],
    revenueTrend: months.map((date, i) => ({
      date,
      revenue: [8400, 9200, 8600, 11000, 12400, 11800, 13500, 14900, 14200, 16800, 17500, 18450][i],
    })),
    orderStatus: [
      { name: "Inquiry", value: 42, percent: "32.8%", color: chartPalette.roseSoft },
      { name: "Proposal", value: 31, percent: "24.2%", color: chartPalette.gold },
      { name: "Active", value: 39, percent: "30.5%", color: chartPalette.blue },
      { name: "Delivered", value: 16, percent: "12.5%", color: chartPalette.green },
    ],
    totalOrders: "128",
    consultationFunnel: [
      { name: "New", value: 46, color: chartPalette.blue },
      { name: "Contacted", value: 33, color: chartPalette.gold },
      { name: "Qualified", value: 21, color: chartPalette.green },
      { name: "Won", value: 12, color: chartPalette.lavender },
    ],
    totalConsultations: "112",
    customerLocations: [
      { name: "New York", tone: "bg-green" },
      { name: "San Francisco", tone: "bg-blue-500" },
      { name: "Austin", tone: "bg-gold" },
      { name: "Miami", tone: "bg-violet-500" },
      { name: "Chicago", tone: "bg-rose-500" },
    ],
    lowStockItems: [
      { name: "Website Development", sku: "WEB-DEV", stock: 9, accent: "bg-[#F6EFE8]" },
      { name: "Mobile App Build", sku: "APP-DEV", stock: 6, accent: "bg-[#FCEAF0]" },
      { name: "SEO Services", sku: "SEO-01", stock: 4, accent: "bg-[#FFF1DF]" },
      { name: "UI/UX Design", sku: "UIUX-11", stock: 3, accent: "bg-[#EAF4EC]" },
    ],
    recentOrders: [
      { id: "#INQ-001", customer: "James Whitfield", total: "$4,250", status: "Delivered" },
      { id: "#INQ-002", customer: "Priya Sharma", total: "$1,890", status: "Shipped" },
      { id: "#INQ-003", customer: "Daniel Osei", total: "$3,120", status: "Processing" },
      { id: "#INQ-004", customer: "Sofia Reyes", total: "$6,740", status: "Pending" },
      { id: "#INQ-005", customer: "Michael Chen", total: "$990", status: "Delivered" },
    ],
    newCustomers: [
      {
        initials: "JW",
        name: "James Whitfield",
        email: "james.w@gmail.com",
        date: "24 Jun 2026",
        bg: "bg-blue-50 text-blue-700",
      },
      {
        initials: "PS",
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        date: "23 Jun 2026",
        bg: "bg-violet-50 text-violet-700",
      },
      {
        initials: "DO",
        name: "Daniel Osei",
        email: "daniel.osei@email.com",
        date: "22 Jun 2026",
        bg: "bg-green/10 text-green",
      },
      {
        initials: "SR",
        name: "Sofia Reyes",
        email: "sofia.reyes@email.com",
        date: "21 Jun 2026",
        bg: "bg-orange-50 text-orange-700",
      },
      {
        initials: "MC",
        name: "Michael Chen",
        email: "michael.chen@email.com",
        date: "20 Jun 2026",
        bg: "bg-gold/10 text-gold",
      },
    ],
  };
}