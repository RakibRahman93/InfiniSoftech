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
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-background shadow-soft lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-ink" />
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
        <div className="flex h-16 items-center justify-between border-b border-ink/10 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5" aria-label="InfiniSoftech dashboard">
            {collapsed ? (
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-green text-white">
                <InfinityIcon className="h-5 w-5" />
              </div>
            ) : (
              <Image
                src="/assets/images/logo.svg"
                alt="InfiniSoftech"
                width={154}
                height={35}
                className="h-8 w-auto"
                unoptimized
                priority
              />
            )}
          </Link>
          <div className="flex items-center gap-1">
            {!collapsed && (
              <button
                data-no-sparkle
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sand/60 hover:text-ink transition-colors lg:hidden"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              data-no-sparkle
              onClick={() => setCollapsed((c) => !c)}
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sand/60 hover:text-ink transition-colors lg:flex"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <nav className="admin-scroll-area flex-1 overflow-y-auto px-3 py-4">
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
                      const href = item.placeholder ? "/admin/dashboard/coming-soon" : item.href;
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
                            <Icon className="h-5 w-5 shrink-0" />
                            {!collapsed && (
                              <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
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

        <div className="border-t border-ink/10 px-3 py-4">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:translate-x-0.5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}