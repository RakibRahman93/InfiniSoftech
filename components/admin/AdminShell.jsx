"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Eye } from "lucide-react";
import Sidebar from "./Sidebar";
import ProfileDropdown from "./ProfileDropdown";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isOverview =
    pathname === "/admin/dashboard" || pathname === "/admin/dashboard/";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Admin — InfiniSoftech";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div data-no-sparkle className="flex h-screen bg-[#F8F9FB]">
      <Sidebar />
      <div className="admin-scroll-area flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink/10 bg-background/80 pl-[4.5rem] pr-4 backdrop-blur-xl lg:px-8">
          <div>
            {isOverview ? (
              <>
                <h1 className="font-display text-base font-semibold leading-tight text-ink lg:text-lg">
                  Dashboard
                </h1>
                <p className="hidden text-[11px] text-muted-foreground sm:block">
                  Welcome back! Here&apos;s what&apos;s happening with your site today.
                </p>
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="View Site"
              title="View Site"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink sm:w-auto sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-xs sm:font-medium"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <ProfileDropdown />
          </div>
        </header>
        <main className="px-6 pb-12 pt-4 lg:px-8">{children}</main>
      </div>
    </div>
  );
}