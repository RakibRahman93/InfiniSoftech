"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Bell, CheckCheck, RefreshCw, CheckCircle2, Clock,
  AlertTriangle, Info, MessageSquare, Flag,
} from "lucide-react";

const TYPE_ICONS = {
  TASK_ASSIGNED: { icon: Clock, color: "bg-blue-50 text-blue-600" },
  TASK_STATUS:   { icon: CheckCircle2, color: "bg-green/10 text-green" },
  MILESTONE_COMPLETED: { icon: Flag, color: "bg-violet-50 text-violet-600" },
  CLIENT_MESSAGE: { icon: MessageSquare, color: "bg-orange-50 text-orange-600" },
  APPROVAL_REQUEST: { icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
  INFO:          { icon: Info, color: "bg-slate-100 text-slate-600" },
};

export default function NotificationsManager() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notifications");
      const data = await res.json();
      setNotifications(data?.notifications ?? []);
      setUnreadCount(data?.unreadCount ?? 0);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id) => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Notifications Center</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Stay updated on task assignments, milestone events, and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-xl bg-green/10 px-3.5 py-2 text-xs font-semibold text-green hover:bg-green/20 transition-all">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
          )}
          <button onClick={load} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-background px-3 py-2 text-sm text-muted-foreground hover:text-ink">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-sand/50" />)}
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
                  className={`flex items-start gap-4 p-4 transition-colors ${!n.isRead ? "bg-green/5 font-medium cursor-pointer" : "hover:bg-sand/20"}`}
                >
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${meta.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{n.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(n.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{n.message}</p>
                  </div>
                  {!n.isRead && (
                    <span className="h-2 w-2 rounded-full bg-green shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
