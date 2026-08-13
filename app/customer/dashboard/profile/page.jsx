"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CustomerProfilePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/customer/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok) setCustomer(data.customer);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (form.newPassword !== form.confirm) {
      setError("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/customer/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "Could not update password.");
        setLoading(false);
        return;
      }
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
      setMessage("Password updated. You've been signed in on this device.");
      setLoading(false);
      router.refresh();
    } catch {
      setError("Unable to reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Profile</h1>
        <p className="text-xs text-muted-foreground">Manage your account details.</p>
      </div>

      {/* Account card */}
      <div className="max-w-2xl rounded-2xl border border-ink/5 bg-background p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green text-lg font-bold text-white">
            {customer?.name?.charAt(0)?.toUpperCase() ?? "C"}
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              {customer?.name ?? "Loading..."}
            </h2>
            <p className="text-sm text-muted-foreground">{customer?.email ?? ""}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8F9FB] px-3 py-2.5">
            <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
            <span className="text-sm text-ink">{customer?.name ?? "—"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8F9FB] px-3 py-2.5">
            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
            <span className="truncate text-sm text-ink">{customer?.email ?? "—"}</span>
          </div>
        </div>
      </div>

      {/* Change password card */}
      <div className="max-w-2xl rounded-2xl border border-ink/5 bg-background p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-base font-semibold text-ink">Change password</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose a strong password you don&apos;t use elsewhere.
        </p>

        {message && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="current-password" className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Current password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="current-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.currentPassword}
                onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
                placeholder="Current password"
                className="h-11 w-full rounded-xl border border-ink/10 bg-background py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-green/40 focus:ring-2 focus:ring-green/10"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.newPassword}
                  onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-green/40 focus:ring-2 focus:ring-green/10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={form.confirm}
                  onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                  placeholder="Repeat new password"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-green/40 focus:ring-2 focus:ring-green/10"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-ink"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showPassword ? "Hide" : "Show"} passwords
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-6 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}