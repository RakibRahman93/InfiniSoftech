"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogOut, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SecurityPanel({ email, usingDefaultPassword, lastLogin }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSignOutAll = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setToast({ message: "Signed out everywhere." });
      setTimeout(() => {
        router.replace("/admin/login");
      }, 800);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
          <Shield className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">Security</h2>
          <p className="text-[11px] text-muted-foreground">Session and access management</p>
        </div>
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-xl bg-green/10 px-4 py-3 text-xs font-medium text-green">
          <CheckCircle2 className="h-4 w-4" />
          {toast.message}
        </div>
      )}

      {usingDefaultPassword && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            You are using the default admin password. Set <code className="rounded bg-sand/70 px-1">ADMIN_PASSWORD</code> in
            your <code className="rounded bg-sand/70 px-1">.env</code> file and restart the dev server.
          </p>
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Admin email</p>
            <p className="mt-1 text-sm font-medium text-ink">{email}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Current session</p>
            <p className="mt-1 text-sm font-medium text-ink">Active</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Last login</p>
            <p className="mt-1 text-sm font-medium text-ink">{lastLogin}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">IP</p>
            <p className="mt-1 text-sm font-medium text-ink">Detected on login</p>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-4">
          <p className="text-xs text-muted-foreground">
            Admin access is protected by an HTTP-only cookie and a middleware guard on every{" "}
            <code className="rounded bg-sand/50 px-1">/admin</code> route. To change the admin password, update{" "}
            <code className="rounded bg-sand/50 px-1">ADMIN_PASSWORD</code> and{" "}
            <code className="rounded bg-sand/50 px-1">ADMIN_EMAIL</code> in <code className="rounded bg-sand/50 px-1">.env</code>.
          </p>
          <button
            data-no-sparkle
            onClick={handleSignOutAll}
            disabled={signingOut}
            className="mt-4 flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out…" : "Sign out of all sessions"}
          </button>
        </div>
      </div>
    </div>
  );
}