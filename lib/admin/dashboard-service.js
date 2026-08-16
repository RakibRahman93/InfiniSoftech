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

// Live DB helpers — each returns null if DB not available
async function safeCount(model, where) {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    return await prisma[model].count({ where });
  } catch { return null; }
}

async function safeAggregate(model, field, where) {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const result = await prisma[model].aggregate({ _sum: { [field]: true }, where });
    return result._sum[field] ?? 0;
  } catch { return null; }
}

async function getLiveLeadsStats() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const [total, newLeads, contacted, qualified, won] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "New" } }),
      prisma.lead.count({ where: { status: "Contacted" } }),
      prisma.lead.count({ where: { status: "Qualified" } }),
      prisma.lead.count({ where: { status: "Won" } }),
    ]);
    return { total, newLeads, contacted, qualified, won };
  } catch { return null; }
}

async function getLiveProjectStats() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const [active, planning, completed, atRisk] = await Promise.all([
      prisma.project.count({ where: { status: "IN_PROGRESS" } }),
      prisma.project.count({ where: { status: "PLANNING" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.project.count({ where: { health: "AT_RISK" } }),
    ]);
    return { active, planning, completed, atRisk };
  } catch { return null; }
}

async function getLiveTaskStats() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const overdue = await prisma.task.count({
      where: { dueDate: { lt: new Date() }, status: { notIn: ["COMPLETED"] } },
    });
    const inReview = await prisma.task.count({ where: { status: "IN_REVIEW" } });
    return { overdue, inReview };
  } catch { return null; }
}

async function getLivePipelineValue() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    const result = await prisma.deal.aggregate({
      _sum: { value: true },
      where: { stage: { notIn: ["Won", "Lost"] } },
    });
    const won = await prisma.deal.aggregate({
      _sum: { value: true },
      where: { stage: "Won" },
    });
    return {
      pipeline: result._sum.value ?? 0,
      won: won._sum.value ?? 0,
    };
  } catch { return null; }
}

async function getLiveRecentLeads() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, status: true, source: true, createdAt: true },
    });
  } catch { return null; }
}

async function getLiveClientCount() {
  try {
    const { prisma, hasPrisma } = await import("@/lib/prisma");
    if (!hasPrisma()) return null;
    return await prisma.customer.count();
  } catch { return null; }
}

function formatUsd(v) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}k`;
  return `$${v.toLocaleString("en-US")}`;
}

export async function getDashboardOverview() {
  const [leadsStats, projectStats, taskStats, pipelineStats, recentLeadsRaw, clientCount] = await Promise.all([
    getLiveLeadsStats(),
    getLiveProjectStats(),
    getLiveTaskStats(),
    getLivePipelineValue(),
    getLiveRecentLeads(),
    getLiveClientCount(),
  ]);

  const newLeads = leadsStats?.newLeads ?? 46;
  const qualifiedLeads = leadsStats?.qualified ?? 21;
  const activeProjects = projectStats?.active ?? 12;
  const atRiskProjects = projectStats?.atRisk ?? 3;
  const overdueTasks = taskStats?.overdue ?? 7;
  const inReviewTasks = taskStats?.inReview ?? 5;
  const pipelineValue = pipelineStats?.pipeline ?? 185000;
  const wonRevenue = pipelineStats?.won ?? 94500;
  const clients = clientCount ?? 34;

  const stats = [
    {
      icon: "customers",
      label: "New Leads",
      value: String(newLeads),
      change: "+21%",
      detail: "this month",
      up: true,
      color: "text-blue-500",
      bg: "bg-blue-50",
      stroke: chartPalette.blue,
      points: [4, 5, 6, 5, 8, 7, 9, 8, 11, 12, 10, 14, 13, 15, 16, 18],
    },
    {
      icon: "coupons",
      label: "Qualified Leads",
      value: String(qualifiedLeads),
      change: leadsStats ? "Live from DB" : "+14%",
      detail: "sales-ready",
      up: true,
      color: "text-violet-600",
      bg: "bg-violet-50",
      stroke: chartPalette.lavender,
      points: [2, 2, 3, 2, 4, 4, 3, 5, 4, 5, 6, 5, 7, 6, 7, 9],
    },
    {
      icon: "revenue",
      label: "Pipeline Value",
      value: formatUsd(pipelineValue),
      change: "+8%",
      detail: "active deals",
      up: true,
      color: "text-green",
      bg: "bg-green/10",
      stroke: chartPalette.green,
      points: [12, 15, 16, 14, 20, 18, 22, 25, 24, 28, 30, 26, 32, 35, 34, 38],
    },
    {
      icon: "orders",
      label: "Active Projects",
      value: String(activeProjects),
      change: projectStats ? "Live from DB" : "+8.2%",
      detail: "in progress",
      up: true,
      color: "text-gold",
      bg: "bg-gold/10",
      stroke: chartPalette.gold,
      points: [8, 9, 11, 10, 13, 12, 15, 14, 17, 16, 18, 19, 21, 20, 22, 24],
    },
    {
      icon: "stock",
      label: "At Risk Projects",
      value: String(atRiskProjects),
      change: atRiskProjects > 0 ? "Needs attention" : "All healthy",
      detail: atRiskProjects > 0 ? "Review immediately" : "Great progress",
      up: atRiskProjects === 0,
      color: "text-rose-500",
      bg: "bg-rose-50",
      stroke: chartPalette.rose,
      points: [3, 4, 3, 5, 4, 6, 5, 6, 7, 6, 8, 7, 8, 9, 8, 10],
    },
    {
      icon: "rating",
      label: "Won Revenue",
      value: formatUsd(wonRevenue),
      change: pipelineStats ? "Live from DB" : "+32%",
      detail: "all time won",
      up: true,
      color: "text-gold",
      bg: "bg-gold/10",
      stroke: chartPalette.green,
      points: [13, 15, 16, 20, 15, 14, 16, 12, 15, 16, 22, 30, 23, 26, 29, 22],
    },
  ];

  // Recent leads for dashboard table
  const recentLeads = recentLeadsRaw
    ? recentLeadsRaw.map((l, i) => ({
        id: l.id,
        name: l.name || "Unknown",
        email: l.email || "",
        status: l.status || "New",
        source: l.source || "Website",
        date: new Date(l.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        initials: (l.name || "??").split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join(""),
        bg: ["bg-blue-50 text-blue-700", "bg-violet-50 text-violet-700", "bg-green/10 text-green", "bg-orange-50 text-orange-700", "bg-gold/10 text-gold"][i % 5],
      }))
    : [
        { id: "1", name: "James Whitfield", email: "james.w@gmail.com", status: "Qualified", source: "LinkedIn", date: "15 Aug 2026", initials: "JW", bg: "bg-blue-50 text-blue-700" },
        { id: "2", name: "Priya Sharma", email: "priya@email.com", status: "Contacted", source: "Website", date: "14 Aug 2026", initials: "PS", bg: "bg-violet-50 text-violet-700" },
        { id: "3", name: "Daniel Osei", email: "daniel@email.com", status: "New", source: "Referral", date: "13 Aug 2026", initials: "DO", bg: "bg-green/10 text-green" },
        { id: "4", name: "Sofia Reyes", email: "sofia@email.com", status: "Proposal", source: "Facebook", date: "12 Aug 2026", initials: "SR", bg: "bg-orange-50 text-orange-700" },
        { id: "5", name: "Michael Chen", email: "michael@email.com", status: "Won", source: "Google", date: "11 Aug 2026", initials: "MC", bg: "bg-gold/10 text-gold" },
      ];

  return {
    stats,
    isLive: !!leadsStats,
    // Legacy chart data
    weeklyOrders: [
      { day: "Mon", thisWeek: 9, lastWeek: 6 },
      { day: "Tue", thisWeek: 12, lastWeek: 8 },
      { day: "Wed", thisWeek: 7, lastWeek: 10 },
      { day: "Thu", thisWeek: 14, lastWeek: 9 },
      { day: "Fri", thisWeek: 11, lastWeek: 12 },
      { day: "Sat", thisWeek: 16, lastWeek: 10 },
      { day: "Sun", thisWeek: 13, lastWeek: 11 },
    ],
    revenueTrend: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => ({
      date: `${month} 25`,
      revenue: [8400, 9200, 8600, 11000, 12400, 11800, 13500, 14900, 14200, 16800, 17500, 18450][i],
    })),
    orderStatus: [
      { name: "Planning", value: projectStats?.planning ?? 4, percent: "15%", color: chartPalette.grey },
      { name: "In Progress", value: activeProjects, percent: "42%", color: chartPalette.blue },
      { name: "In Review", value: inReviewTasks, percent: "18%", color: chartPalette.lavender },
      { name: "Completed", value: projectStats?.completed ?? 16, percent: "25%", color: chartPalette.green },
    ],
    totalOrders: String((projectStats?.active ?? 12) + (projectStats?.planning ?? 4) + (projectStats?.completed ?? 16)),
    consultationFunnel: [
      { name: "New", value: newLeads, color: chartPalette.blue },
      { name: "Contacted", value: leadsStats?.contacted ?? 33, color: chartPalette.gold },
      { name: "Qualified", value: qualifiedLeads, color: chartPalette.green },
      { name: "Won", value: leadsStats?.won ?? 12, color: chartPalette.lavender },
    ],
    totalConsultations: String(leadsStats?.total ?? 112),
    customerLocations: [
      { name: "Dhaka, Bangladesh", tone: "bg-green" },
      { name: "London, UK", tone: "bg-blue-500" },
      { name: "Dubai, UAE", tone: "bg-gold" },
      { name: "New York, USA", tone: "bg-violet-500" },
      { name: "Singapore", tone: "bg-rose-500" },
    ],
    lowStockItems: [
      { name: "Website Development", sku: "WEB-DEV", stock: 9, accent: "bg-[#F6EFE8]" },
      { name: "Mobile App Build", sku: "APP-DEV", stock: 6, accent: "bg-[#FCEAF0]" },
      { name: "SEO Services", sku: "SEO-01", stock: 4, accent: "bg-[#FFF1DF]" },
      { name: "UI/UX Design", sku: "UIUX-11", stock: 3, accent: "bg-[#EAF4EC]" },
    ],
    recentOrders: recentLeads.map((l) => ({
      id: `#${l.id?.slice(0, 6).toUpperCase()}`,
      customer: l.name,
      total: l.source,
      status: l.status,
    })),
    newCustomers: recentLeads,
    // Extra CRM quick stats
    overdueTasks,
    inReviewTasks,
    atRiskProjects,
    clients,
  };
}