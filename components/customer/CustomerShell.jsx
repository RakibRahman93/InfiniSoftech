"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  Eye,
  LogOut,
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Overview", to: "/customer/dashboard" },
    ],
  },
  {
    label: "My Account",
    items: [
      { icon: MessageSquare, label: "My Enquiries", to: "/customer/dashboard/enquiries" },
      { icon: User, label: "Profile", to: "/customer/dashboard/profile" },
    ],
  },
];

export default function CustomerShell({ customer, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (to) =>
    pathname === to || (to !== "/customer/dashboard" && pathname.startsWith(to));

  async function handleLogout() {
    try {
      await fetch("/api/customer/logout", { method: "POST" });
    } finally {
      router.replace("/customer/login");
      router.refresh();
    }
  }

  return (
    <div data-no-sparkle className="flex min-h-screen bg-[#F8F9FB]">
      <button
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-ink/10 bg-background transition-all duration-300 ease-out lg:static lg:z-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-[72px]" : "w-[260px]"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink/10 px-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="InfiniSoftech">
            {collapsed ? (
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-green text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/images/InfiniSoftLogoblack.png"
                  alt="InfiniSoftech"
                  width={40}
                  height={100}
                  className="object-contain"
                  unoptimized
                />
                <Image
                  src="/assets/images/logo.svg"
                  alt="InfiniSoftech"
                  width={130}
                  height={35}
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
          </Link>
          <div className="flex items-center gap-1">
            {!collapsed && (
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink lg:hidden"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink lg:flex"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <nav className="customer-scroll-area flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-6">
            {NAV_GROUPS.map((group) => (
              <li key={group.label}>
                {!collapsed && (
                  <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map(({ icon: Icon, label, to }) => (
                    <li key={to}>
                      <Link
                        href={to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive(to)
                            ? "bg-green/10 text-green"
                            : "text-muted-foreground hover:bg-sand/60 hover:text-ink"
                        } ${collapsed ? "justify-center" : ""}`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ink/10 px-3 py-4">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      <div className="min-h-screen flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-background/80 pl-[4.5rem] pr-4 backdrop-blur-xl lg:px-8">
          <div>
            <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">My Account</h1>
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              Welcome back, {customer.name}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="View Website"
              title="View Website"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink sm:w-auto sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-xs sm:font-medium"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-1.5 transition-colors hover:bg-sand/60"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-green text-xs font-bold text-white">
                  {customer.name?.charAt(0)?.toUpperCase() ?? "C"}
                </span>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium leading-tight text-ink">{customer.name}</p>
                  <p className="text-[11px] text-muted-foreground">{customer.email}</p>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-lg">
                  <div className="border-b border-ink/5 px-4 py-3">
                    <p className="text-sm font-medium text-ink">{customer.name}</p>
                    <p className="text-[11px] text-muted-foreground">{customer.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      href="/customer/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-sand/60"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="px-6 pb-12 pt-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}