"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Box,
  ClipboardList,
  HelpCircle,
  Package,
  ShoppingCart,
  Star,
  Tag,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartPalette = {
  green: "#4D8A5B",
  greenSoft: "#B9D7C0",
  gold: "#E2A92D",
  goldSoft: "#F7D990",
  blue: "#4C8BEA",
  blueSoft: "#B9D3FF",
  rose: "#F35F7F",
  roseSoft: "#FFC0CC",
  lavender: "#A981F4",
  grey: "#D8D8D8",
};

const statIcons = {
  revenue: DollarMark,
  orders: ClipboardList,
  customers: Users,
  coupons: Tag,
  stock: Box,
  rating: Star,
};

function DollarMark({ className }) {
  return <span className={`text-[15px] font-semibold leading-none ${className ?? ""}`}>$</span>;
}

const quickActions = [
  {
    icon: Package,
    label: "Add Blog Post",
    color: "text-green",
    bg: "bg-green/10",
    to: "/admin/dashboard/blog",
  },
  {
    icon: UserPlus,
    label: "Add Lead",
    color: "text-blue-500",
    bg: "bg-blue-50",
    to: "/admin/dashboard/leads",
  },
  {
    icon: HelpCircle,
    label: "Add FAQ",
    color: "text-violet-600",
    bg: "bg-violet-50",
    to: "/admin/dashboard/faqs",
  },
  {
    icon: ShoppingCart,
    label: "Manage Projects",
    color: "text-orange-500",
    bg: "bg-orange-50",
    to: "/admin/dashboard/coming-soon",
  },
  {
    icon: BarChart3,
    label: "Generate Report",
    color: "text-green",
    bg: "bg-green/10",
    to: "/admin/dashboard/coming-soon",
  },
  {
    icon: ClipboardList,
    label: "View Leads",
    color: "text-blue-600",
    bg: "bg-blue-50",
    to: "/admin/dashboard/leads",
  },
];

const statusStyles = {
  Delivered: "bg-green/10 text-green border-green/15",
  Shipped: "bg-blue-50 text-blue-600 border-blue-200",
  Processing: "bg-gold/10 text-gold border-gold/20",
  Pending: "bg-rose-50 text-rose-600 border-rose-200",
};

export default function OverviewDashboard({ data }) {
  const router = useRouter();
  const {
    stats,
    weeklyOrders,
    revenueTrend,
    orderStatus,
    totalOrders,
    consultationFunnel,
    totalConsultations,
    customerLocations,
    lowStockItems,
    recentOrders,
    newCustomers,
  } = data;

  const quickActionsRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const lastMoveX = useRef(0);
  const pointerVelocity = useRef(0);
  const hasMoved = useRef(false);
  const clickGuardRef = useRef(null);
  const docPointerMoveRef = useRef(null);
  const docPointerUpRef = useRef(null);

  const scrollQuickActions = () => {
    const el = quickActionsRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.max(320, Math.round(el.clientWidth * 0.75)), behavior: "smooth" });
  };

  const clearClickGuard = () => {
    if (clickGuardRef.current) {
      window.removeEventListener("click", clickGuardRef.current, true);
      clickGuardRef.current = null;
    }
  };

  const handlePointerDown = (e) => {
    const el = quickActionsRef.current;
    if (!el) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    clearClickGuard();
    isDragging.current = true;
    setDragActive(true);
    dragStartX.current = e.clientX;
    lastMoveX.current = e.clientX;
    pointerVelocity.current = 0;
    hasMoved.current = false;

    docPointerMoveRef.current = (moveEvent) => {
      const list = quickActionsRef.current;
      if (!list || !isDragging.current) return;
      const dx = moveEvent.clientX - lastMoveX.current;
      if (Math.abs(moveEvent.clientX - dragStartX.current) > 5) hasMoved.current = true;
      lastMoveX.current = moveEvent.clientX;
      pointerVelocity.current = pointerVelocity.current * 0.6 + dx * 0.4;
      list.scrollLeft -= dx;
    };

    docPointerUpRef.current = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setDragActive(false);
      if (docPointerMoveRef.current)
        document.removeEventListener("pointermove", docPointerMoveRef.current);
      if (docPointerUpRef.current) document.removeEventListener("pointerup", docPointerUpRef.current);
      if (hasMoved.current && !clickGuardRef.current) {
        clickGuardRef.current = (clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
          clearClickGuard();
        };
        window.addEventListener("click", clickGuardRef.current, true);
      }
      const list = quickActionsRef.current;
      if (list) {
        const flick = Math.max(-60, Math.min(60, pointerVelocity.current * 12));
        list.scrollBy({ left: -flick, behavior: "smooth" });
      }
      pointerVelocity.current = 0;
    };

    document.addEventListener("pointermove", docPointerMoveRef.current);
    document.addEventListener("pointerup", docPointerUpRef.current);
  };

  useEffect(() => {
    return () => {
      clearClickGuard();
      if (docPointerMoveRef.current)
        document.removeEventListener("pointermove", docPointerMoveRef.current);
      if (docPointerUpRef.current) document.removeEventListener("pointerup", docPointerUpRef.current);
    };
  }, []);

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-2 font-display text-base font-semibold text-ink">Quick Actions</h2>
        <div className="relative rounded-2xl border border-ink/5 bg-background p-4 pr-16 shadow-sm">
          <div
            ref={quickActionsRef}
            onPointerDown={handlePointerDown}
            style={{ touchAction: "pan-x pan-y", WebkitOverflowScrolling: "touch" }}
            className={`flex gap-3 overflow-x-auto pb-1 pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none ${
              dragActive ? "cursor-grabbing [&_*]:cursor-grabbing" : "cursor-grab [&_*]:cursor-grab"
            }`}
          >
            {quickActions.map(({ icon: Icon, label, color, bg, to }) => (
              <button
                data-no-sparkle
                key={label}
                onClick={() => router.push(to)}
                className="flex min-h-14 min-w-[180px] flex-none cursor-pointer items-center gap-3 rounded-xl border border-ink/5 bg-white px-4 py-3 text-left shadow-[0_10px_28px_-22px_rgba(26,26,26,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-green/20 hover:shadow-md sm:min-w-[192px]"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${bg} ${color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="whitespace-nowrap text-xs font-semibold text-ink">{label}</span>
              </button>
            ))}
          </div>
          <button
            data-no-sparkle
            onClick={scrollQuickActions}
            aria-label="Scroll quick actions"
            className="absolute right-4 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition-all duration-200 hover:-translate-y-1/2 hover:border-green/25 hover:text-green"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {stats.map(({ icon, label, value, change, detail, up, color, bg, stroke, points }) => {
          const Icon = statIcons[icon];
          return (
            <div
              key={label}
              className="relative min-h-[164px] overflow-hidden rounded-2xl border border-ink/5 bg-background p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                    up ? "bg-green/10 text-green" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {change}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-[15px] font-medium leading-tight tracking-tight text-ink">
                  {label}
                </p>
                <p className="font-display text-2xl font-semibold leading-none text-ink">{value}</p>
                <p className="flex items-center gap-1 pr-28 text-[11px] leading-snug text-muted-foreground sm:pr-32">
                  {label === "Blog Posts" ? (
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-gold" />
                  ) : null}
                  <span className="min-w-0">{detail || change}</span>
                </p>
              </div>
              <Sparkline points={points} stroke={stroke} />
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <Panel className="min-h-[292px]">
          <PanelHeader title="Revenue Overview" action="This Month" />
          <div className="mt-3 h-[222px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor={chartPalette.green} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={chartPalette.green} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EEF0EC" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6E6A63" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6E6A63" }}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString("en-US")}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={chartPalette.green}
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="min-h-[292px]">
          <PanelHeader title="Project Status Breakdown" />
          <div className="mt-4 grid gap-4 sm:grid-cols-[190px_1fr] xl:grid-cols-1 2xl:grid-cols-[190px_1fr]">
            <div className="relative h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatus}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={84}
                    paddingAngle={1}
                    stroke="none"
                  >
                    {orderStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [Number(value).toLocaleString("en-US"), "Projects"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{totalOrders}</p>
                  <p className="text-[11px] text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 self-center">
              {orderStatus.map((status) => (
                <div key={status.name} className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="font-medium text-ink">{status.name}</span>
                  </div>
                  <span className="font-semibold text-ink">
                    {status.value} <span className="font-normal text-muted-foreground">({status.percent})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr_0.9fr]">
        <Panel className="min-h-[288px]">
          <PanelHeader title="Weekly Leads Comparison" action="This Week" />
          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyOrders} barGap={8} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#EEF0EC" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6E6A63" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#6E6A63" }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="thisWeek" name="This Week" radius={[6, 6, 0, 0]} fill={chartPalette.green} />
                <Bar dataKey="lastWeek" name="Last Week" radius={[6, 6, 0, 0]} fill={chartPalette.greenSoft} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="min-h-[288px]">
          <PanelHeader title="Lead Funnel" />
          <p className="mt-1 text-xs text-muted-foreground">
            How inquiries move through your pipeline.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[190px_1fr] xl:grid-cols-1 2xl:grid-cols-[190px_1fr]">
            <div className="relative h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consultationFunnel}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={84}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {consultationFunnel.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [Number(value).toLocaleString("en-US"), "Leads"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-display text-xl font-semibold text-ink">{totalConsultations}</p>
                  <p className="text-[11px] text-muted-foreground">Total Leads</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 self-center">
              {consultationFunnel.map((stage) => (
                <div key={stage.name} className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <span className="font-medium text-ink">{stage.name}</span>
                  </div>
                  <span className="font-semibold text-ink">{stage.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="min-h-[288px]">
          <PanelHeader title="Customer Locations" />
          <p className="mt-1 text-xs text-muted-foreground">Top Delivery Areas</p>
          <div className="mt-5 space-y-4">
            {customerLocations.map((area, index) => (
              <div key={area.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-ink">{area.name}</p>
                  <span className="text-[11px] text-muted-foreground">#{index + 1}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F2F4F0]">
                  <div className={`h-full rounded-full ${area.tone}`} style={{ width: `${72 - index * 8}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.1fr_1fr]">
        <Panel>
          <PanelHeader
            title="Top Services"
            action="View all"
            onAction={() => router.push("/admin/dashboard/coming-soon")}
          />
          <div className="mt-4 space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.sku} className="grid grid-cols-[44px_1fr_auto] items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${item.accent}`}>
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Quotes: <span className="font-semibold text-rose-600">{item.stock}</span>
                  </p>
                  <span className="mt-1 inline-flex rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold">
                    Hot
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Recent Inquiries"
            action="View all"
            onAction={() => router.push("/admin/dashboard/leads")}
          />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:text-[11px]">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Inquiry</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className="border-b border-ink/5 last:border-b-0">
                    <td className="py-3 text-xs text-muted-foreground">{i + 1}</td>
                    <td className="py-3 font-semibold text-ink">{order.id}</td>
                    <td className="py-3 text-muted-foreground">{order.customer}</td>
                    <td className="py-3 font-medium text-ink">{order.total}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="New Leads"
            action="View all"
            onAction={() => router.push("/admin/dashboard/leads")}
          />
          <div className="mt-4 space-y-3">
            {newCustomers.map((customer) => (
              <div key={customer.email} className="grid grid-cols-[42px_1fr_auto] items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-full text-xs font-semibold ${customer.bg}`}>
                  {customer.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{customer.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{customer.date}</p>
                  <span className="mt-1 inline-flex rounded-full bg-green/10 px-3 py-1 text-[11px] font-semibold text-green">
                    New
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-ink/5 bg-background p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PanelHeader({ title, action, onAction }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      {action ? (
        <button
          data-no-sparkle
          onClick={onAction}
          className="rounded-full border border-ink/5 bg-white px-3 py-1.5 text-xs font-semibold text-green transition-colors hover:border-green/20 hover:bg-green/5"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}

function Sparkline({ points, stroke }) {
  const width = 140;
  const height = 44;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  return (
    <svg className="absolute bottom-4 right-4 h-11 w-32 opacity-95" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}