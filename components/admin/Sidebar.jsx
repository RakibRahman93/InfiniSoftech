"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Layers3,
  Image as ImageIcon,
  Star,
  BarChart3,
  FileText,
  Megaphone,
  Mail,
  Shield,
  Settings,
  LogOut,
  Infinity as InfinityIcon,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { navGroups } from "@/lib/admin/navigation";

const ICON_MAP = {
  LayoutDashboard,
  Users,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Layers3,
  Image: ImageIcon,
  Star,
  BarChart3,
  FileText,
  Megaphone,
  Mail,
  Shield,
  Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <>
      <button
        data-no-sparkle
        onClick={() => setMobileOpen(true)}
        className="fixed z-50 flex items-center justify-center w-10 h-10 border left-4 top-4 rounded-xl border-ink/10 bg-background shadow-soft lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-ink" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 cursor-pointer bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        data-no-sparkle
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-ink/10 bg-background transition-all duration-300 ease-out lg:static lg:z-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-[72px]" : "w-[260px]"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-ink/10">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5"
            aria-label="InfiniSoftech dashboard"
          >
            {collapsed ? (
              <div className="grid text-white h-9 w-9 place-items-center rounded-xl bg-green">
                <InfinityIcon className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/images/InfiniSoftLogoblack.png"
                  alt="InfiniSoftech"
                  width={40}
                  height={100}
                  className="object-contain"
                />
                <Image
                  src="/assets/images/logo.svg"
                  alt="InfiniSoftech"
                  width={130}
                  height={35}
                  className="object-contain"
                />
              </div>
            )}
          </Link>
          <div className="flex items-center gap-1">
            {!collapsed && (
              <button
                data-no-sparkle
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-muted-foreground hover:bg-sand/60 hover:text-ink lg:hidden"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              data-no-sparkle
              onClick={() => setCollapsed((c) => !c)}
              className="items-center justify-center hidden w-8 h-8 transition-colors rounded-lg text-muted-foreground hover:bg-sand/60 hover:text-ink lg:flex"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto admin-scroll-area">
          <ul className="space-y-6">
            {navGroups.map((group) => {
              if (group.items.length === 0) return null;
              return (
                <li key={group.label}>
                  {!collapsed && (
                    <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                      {group.label}
                    </p>
                  )}
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
                      const href = item.placeholder
                        ? "/admin/dashboard/coming-soon"
                        : item.href;
                      const isActive = pathname === href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-green/10 text-green"
                                : "text-muted-foreground hover:bg-sand/60 hover:text-ink hover:translate-x-0.5"
                            } ${collapsed ? "justify-center" : ""}`}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            {!collapsed && (
                              <span className="flex items-center justify-between flex-1 min-w-0 gap-2">
                                <span className="truncate">{item.label}</span>
                                {item.placeholder && (
                                  <span className="rounded-full bg-sand/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    Soon
                                  </span>
                                )}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 py-4 border-t border-ink/10">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:translate-x-0.5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
