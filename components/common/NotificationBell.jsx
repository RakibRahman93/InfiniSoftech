"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  MessageSquare,
  Flag,
  FolderOpen,
  Loader2,
} from "lucide-react";
import { subscribeToNotifications } from "@/lib/realtime/notifications-client";

const TYPE_ICONS = {
  TASK_ASSIGNED: { icon: Clock, color: "bg-blue-50 text-blue-600" },
  TASK_STATUS: { icon: CheckCircle2, color: "bg-[#4D8A5B]/10 text-[#4D8A5B]" },
  MILESTONE_COMPLETED: { icon: Flag, color: "bg-violet-50 text-violet-600" },
  CLIENT_MESSAGE: { icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
  APPROVAL_REQUEST: { icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
  PROJECT_FILE: { icon: FolderOpen, color: "bg-[#8876FF]/10 text-[#8876FF]" },
  INFO: { icon: Info, color: "bg-slate-100 text-slate-600" },
};

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function NotificationBell({ role, userId, notificationsLink }) {
  const router = useRouter();
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const data = await res.json();
      setItems(data?.notifications ?? []);
      setUnreadCount(data?.unreadCount ?? 0);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications({
      role,
      userId,
      onMessage: (payload) => {
        const n = payload?.notification;
        if (!n) return;
        setItems((prev) => [n, ...prev.filter((x) => x.id !== n.id)].slice(0, 30));
        setUnreadCount((c) => c + 1);
      },
    });
    return unsubscribe;
  }, [role, userId]);

  useEffect(() => {
    function onPointerDown(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const markRead = async (id) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
      // ignore
    }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // ignore
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try {
      await fetch("/api/notifications", { method: "DELETE" });
      setItems([]);
      setUnreadCount(0);
    } catch {
      // ignore
    }
  };

  const handleItemClick = (n) => {
    if (!n.isRead) markRead(n.id);
    setOpen(false);
    if (n.link) router.push(n.link);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-[#E75778] px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-lg">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">Notifications</p>
              {unreadCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#8876FF]/15 px-1.5 text-[10px] font-bold text-[#8876FF]">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Read all
                </button>
              )}
              {items.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Clear all"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[min(60vh,420px)] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-sand">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-ink">You&apos;re all caught up</p>
                <p className="mt-1 text-xs text-muted-foreground">No notifications yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-ink/5">
                {items.map((n) => {
                  const meta = TYPE_ICONS[n.type] ?? TYPE_ICONS.INFO;
                  const Icon = meta.icon;
                  return (
                    <li key={n.id}>
                      <button
                        onClick={() => handleItemClick(n)}
                        className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                          !n.isRead ? "bg-[#8876FF]/5 hover:bg-[#8876FF]/10" : "hover:bg-sand/40"
                        }`}
                      >
                        <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${meta.color}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className={`truncate text-[13px] ${n.isRead ? "font-medium text-ink" : "font-semibold text-ink"}`}>
                              {n.title}
                            </span>
                            <span className="shrink-0 text-[10px] text-muted-foreground">
                              {timeAgo(n.createdAt)}
                            </span>
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
                            {n.message}
                          </span>
                          {n.actorName && (
                            <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground/70">
                              {n.actorName}
                            </span>
                          )}
                        </span>
                        {!n.isRead && (
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E75778]" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {notificationsLink && (
            <div className="border-t border-ink/10 p-2">
              <a
                href={notificationsLink}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-sand/60 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-sand"
              >
                View all notifications <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}