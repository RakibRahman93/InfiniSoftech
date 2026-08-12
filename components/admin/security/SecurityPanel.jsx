"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  KeyRound,
  Mail,
  Send,
  Plus,
  Trash2,
  Pencil,
  ShieldCheck,
} from "lucide-react";

export default function SecurityPanel({ overview }) {
  const router = useRouter();
  const [otpEnabled, setOtpEnabled] = useState(overview?.otpEnabled ?? true);
  const [signingOut, setSigningOut] = useState(false);
  const [toast, setToast] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNew, setConfirmNew] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [viaOtp, setViaOtp] = useState(false);
  const [viaPassword, setViaPassword] = useState(false);

  const [codes, setCodes] = useState([]);
  const [codesLoading, setCodesLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editCode, setEditCode] = useState("");
  const [savingCode, setSavingCode] = useState(false);

  const fetchCodes = async () => {
    setCodesLoading(true);
    try {
      const res = await fetch("/api/admin/security-codes");
      const data = await res.json();
      if (res.ok && data?.codes) setCodes(data.codes);
    } catch {
      // ignore
    } finally {
      setCodesLoading(false);
    }
  };

  useEffect(() => {
    if (overview?.live) fetchCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overview?.live]);

  const notify = (message, tone = "success") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3000);
  };

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

  const handleToggleOtp = async () => {
    setViaOtp(false);
    setViaPassword(false);
    const next = !otpEnabled;
    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpEnabled: next }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not update OTP setting.", "error");
        return;
      }
      setOtpEnabled(next);
      notify(next ? "OTP login enabled." : "OTP login disabled.");
    } catch {
      notify("Network error while updating OTP.", "error");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNew) {
      notify("New passwords do not match.", "error");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          otpEnabled,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not change password.", "error");
        return;
      }
      notify("Password updated. You will be signed out.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNew("");
      setTimeout(() => {
        router.replace("/admin/login");
      }, 1500);
    } catch {
      notify("Network error while changing password.", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch("/api/admin/resend-otp", { method: "POST" });
      const data = await res.json();
      notify(
        res.ok && data?.ok
          ? data.devOtp
            ? `Test OTP (dev): ${data.devOtp}`
            : "A fresh verification code has been sent."
          : data?.error || "Could not resend code.",
        res.ok && data?.ok ? "success" : "error",
      );
    } catch {
      notify("Network error while resending code.", "error");
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setEditLabel("");
    setEditCode("");
    setShowForm(true);
  };

  const openEditForm = (c) => {
    setEditingId(c.id);
    setEditLabel(c.label ?? "");
    setEditCode("");
    setShowForm(true);
  };

  const closeCodeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEditLabel("");
    setEditCode("");
  };

  const handleSaveCode = async (e) => {
    e.preventDefault();
    if (!editCode.trim() && !editingId) {
      notify("Enter a verification code.", "error");
      return;
    }
    setSavingCode(true);
    try {
      const url = "/api/admin/security-codes";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          label: editLabel,
          code: editCode,
          active: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not save verification code.", "error");
        return;
      }
      notify(editingId ? "Verification code updated." : "Verification code added.");
      setEditLabel("");
      setEditCode("");
      setShowForm(false);
      setEditingId(null);
      fetchCodes();
    } catch {
      notify("Network error while saving code.", "error");
    } finally {
      setSavingCode(false);
    }
  };

  const handleToggleCode = async (c) => {
    if (c.id === editingId && showForm) setShowForm(false);
    try {
      const res = await fetch("/api/admin/security-codes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: c.id,
          active: !c.active,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not update code.", "error");
        return;
      }
      notify("Verification code " + (c.active ? "deactivated." : "activated."));
      fetchCodes();
    } catch {
      notify("Network error while updating code.", "error");
    }
  };

  const handleDeleteCode = async (c) => {
    try {
      const res = await fetch(`/api/admin/security-codes?id=${encodeURIComponent(c.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        notify(data.error || "Could not delete code.", "error");
        return;
      }
      notify("Verification code deleted.");
      fetchCodes();
    } catch {
      notify("Network error while deleting code.", "error");
    }
  };

  const lastLogin = useMemo(() => {
    if (!overview?.lastLogin) return "First login pending";
    const d = new Date(overview.lastLogin);
    if (Number.isNaN(d.getTime())) return overview.lastLogin;
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [overview?.lastLogin]);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
          <Shield className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-ink">Security</h2>
          <p className="text-[11px] text-muted-foreground">
            Session, access, and login protection
          </p>
        </div>
      </div>

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-medium ${
            toast.tone === "error" ? "bg-rose-50 text-rose-600" : "bg-green/10 text-green"
          }`}
        >
          {toast.tone === "error" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {toast.message}
        </div>
      )}

      {overview?.usingDefaultPassword && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            You are using the default admin password. Change it below to secure the account.
          </p>
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Admin email</p>
            <p className="mt-1 text-sm font-medium text-ink">{overview?.email}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Current session</p>
            <p className="mt-1 text-sm font-medium text-ink">{overview?.sessionId ?? "Active"}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Last login</p>
            <p className="mt-1 text-sm font-medium text-ink">{lastLogin}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Data source</p>
            <p className="mt-1 text-sm font-medium text-ink">
              {overview?.live ? "Supabase (live)" : "Local fallback"}
            </p>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">One-time verification code</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Require an emailed OTP on every login, before the dashboard unlocks.
              </p>
            </div>
            <button
              data-no-sparkle
              onClick={handleToggleOtp}
              className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
              style={{ background: otpEnabled ? "#4D8A5B" : "#D8D8D8" }}
              aria-pressed={otpEnabled}
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
                style={{ left: otpEnabled ? "22px" : "2px" }}
              />
            </button>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">Saved security codes</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Extra codes you can use to sign in when email OTP isn&apos;t available. Codes are
                never displayed on the login page.
              </p>
            </div>
            <button
              data-no-sparkle
              onClick={openAddForm}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-green px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green/90"
            >
              <Plus className="h-3.5 w-3.5" />
              Add code
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSaveCode}
              className="mt-4 grid gap-3 rounded-2xl border border-green/20 bg-green/5 p-4 sm:grid-cols-[1fr_1.2fr_auto]"
            >
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink">Label</label>
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="e.g. Backup device"
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink">
                  Code {editingId ? "(leave blank to keep current)" : ""}
                </label>
                <input
                  type="text"
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  placeholder="4–20 characters"
                  maxLength={20}
                  autoComplete="off"
                  className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  disabled={savingCode}
                  className="flex items-center gap-1.5 rounded-xl bg-green px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingCode ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5" />}
                  {editingId ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  data-no-sparkle
                  onClick={closeCodeForm}
                  className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-ink"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="mt-3 space-y-2">
            {codesLoading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading codes…
              </div>
            )}
            {!codesLoading && codes.length === 0 && (
              <p className="rounded-xl bg-sand/50 px-3 py-2.5 text-xs text-muted-foreground">
                No saved security codes yet. Add one above to use it at login.
              </p>
            )}
            {codes.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink/5 bg-white px-3.5 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                      c.active ? "bg-green/10 text-green" : "bg-sand text-muted-foreground"
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {c.label || "Verification code"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {c.active ? "Active" : "Disabled"}
                      {c.lastUsedAt
                        ? ` · last used ${new Date(c.lastUsedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}`
                        : " · never used"}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    data-no-sparkle
                    onClick={() => handleToggleCode(c)}
                    title={c.active ? "Deactivate" : "Activate"}
                    className={`relative h-5 w-9 rounded-full transition-colors ${c.active ? "bg-green" : "bg-gray-300"}`}
                    aria-pressed={c.active}
                  >
                    <span
                      className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                      style={{ left: c.active ? "18px" : "2px" }}
                    />
                  </button>
                  <button
                    data-no-sparkle
                    onClick={() => openEditForm(c)}
                    title="Change code"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-ink/10 text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    data-no-sparkle
                    onClick={() => handleDeleteCode(c)}
                    title="Delete code"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-ink/10 text-rose-500 transition-colors hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-ink/5 pt-4">
          <button
            data-no-sparkle
            onClick={handleSignOutAll}
            disabled={signingOut}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out…" : "Sign out of all sessions"}
          </button>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-ink/5 bg-background p-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sand/70 text-ink">
            <KeyRound className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold text-ink">Change admin password</h3>
            <p className="text-[11px] text-muted-foreground">
              Updating the password signs you out everywhere.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="currentPassword" className="mb-1.5 block text-xs font-semibold text-ink">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
            />
          </div>
          <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-xs font-semibold text-ink">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
              />
            </div>
            <div>
              <label htmlFor="confirmNew" className="mb-1.5 block text-xs font-semibold text-ink">
                Confirm new password
              </label>
              <input
                id="confirmNew"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmNew}
                onChange={(e) => setConfirmNew(e.target.value)}
                className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
              />
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={savingPassword}
              className="flex items-center gap-2 rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              {savingPassword ? "Updating…" : "Update password"}
            </button>
            {overview?.live && (
              <button
                type="button"
                data-no-sparkle
                onClick={handleResendOtp}
                className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sand/60"
              >
                <Send className="h-4 w-4" />
                Resend test OTP
              </button>
            )}
          </div>
        </form>

        <p className="border-t border-ink/5 pt-3 text-[11px] text-muted-foreground">
          <Mail className="mr-1 inline h-3 w-3" />
          Login flow: enter admin email + password, then verify the code sent to{" "}
          {overview?.email}.
        </p>
      </div>
    </div>
  );
}