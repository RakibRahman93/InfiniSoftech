"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, LogOut, ChevronDown, ShieldCheck, User } from "lucide-react";
import Avatar from "@/components/common/Avatar";

export default function ProfileDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("admin@infinisoftech.com");
  const [avatarUrl, setAvatarUrl] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/security")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.email) setEmail(data.email);
        if (!cancelled && data?.avatarUrl) setAvatarUrl(data.avatarUrl);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        data-no-sparkle
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-1.5 transition-colors hover:bg-sand/60"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name="Administrator" src={avatarUrl} size="h-8 w-8" rounded="rounded-full" />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-ink leading-tight">Administrator</p>
          <p className="text-[11px] text-muted-foreground">{email}</p>
        </div>
        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-lg"
          role="menu"
        >
          <div className="border-b border-ink/5 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Avatar name="Administrator" src={avatarUrl} size="h-9 w-9" rounded="rounded-full" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Administrator</p>
                <p className="truncate text-[11px] text-muted-foreground">{email}</p>
              </div>
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green">
              <ShieldCheck className="h-3 w-3" /> Full access
            </span>
          </div>
          <div className="p-1.5">
            <Link
              href="/admin/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-sand/60"
              role="menuitem"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Profile
            </Link>
            <Link
              href="/admin/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-sand/60"
              role="menuitem"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}