"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  RefreshCw,
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

export default function NotificationsCenter({ role, userId, title = "Notifications Center" }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data?.notifications ?? []);
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
        setNotifications((prev) => [n, ...prev.filter((x) => x.id !== n.id)]);
        setUnreadCount((c) => c + 1);
      },
    });
    return unsubscribe;
  }, [role, userId]);

  const markRead = async (id) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
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
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      // ignore
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try {
      await fetch("/api/notifications", { method: "DELETE" });
      setNotifications([]);
      setUnreadCount(0);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`
              : "You are all caught up."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 rounded-xl bg-[#4D8A5B]/10 px-3.5 py-2 text-xs font-semibold text-[#4D8A5B] transition-all hover:bg-[#4D8A5B]/20"
            >
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" /> Clear all
            </button>
          )}
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-ink"
            aria-label="Refresh notifications"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sand/60">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-ink">No Notifications</p>
            <p className="mt-1 text-sm text-muted-foreground">You are all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-ink/5">
            {notifications.map((n) => {
              const meta = TYPE_ICONS[n.type] ?? TYPE_ICONS.INFO;
              const Icon = meta.icon;
              return (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && markRead(n.id)}
                  className={`flex items-start gap-4 p-4 transition-colors ${
                    !n.isRead ? "cursor-pointer bg-[#8876FF]/5" : "hover:bg-sand/20"
                  }`}
                >
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${meta.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm ${n.isRead ? "font-medium text-ink" : "font-semibold text-ink"}`}>
                        {n.title}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(n.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
                    {n.actorName && (
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">
                        {n.actorName}
                      </p>
                    )}
                  </div>
                  {!n.isRead && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E75778]" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}