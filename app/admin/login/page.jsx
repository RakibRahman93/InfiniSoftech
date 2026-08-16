"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./login.css";

function IconLoader({ className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 19 6v5c0 4.8-3 8.8-7 10-4-1.2-7-5.2-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.8 1.8 3.7-4.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconMail({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m5 7 7 6 7-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconKey({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12.8 11.2 20 18.4V21h-2.6v-1.8h-1.6v-1.6H14l-1.2-1.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/dashboard";

  const [step, setStep] = useState("gate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(null);

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBlocked(false);
    setAttemptsLeft(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data?.error || "Incorrect security code.");
        if (data?.blocked) setBlocked(true);
        if (typeof data?.attemptsLeft === "number") setAttemptsLeft(data.attemptsLeft);
        setCode("");
        setLoading(false);
        return;
      }

      setStep("password");
      setCode("");
      setLoading(false);
    } catch {
      setError("Unable to reach the server. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data?.error || "Login failed. Please try again.");
        if (data?.blocked || res.status === 429) setBlocked(true);
        setLoading(false);
        return;
      }

      router.replace(from);
      router.refresh();
    } catch {
      setError("Unable to reach the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB] px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/assets/images/InfiniSoftLogoblack.png"
                alt="InfiniSoftech"
                width={40}
                height={100}
                className="object-contain"
                unoptimized
                priority
              />
              <Image
                src="/assets/images/logo.svg"
                alt="InfiniSoftech"
                width={150}
                height={35}
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "gate"
                ? "Enter your security code to continue."
                : "Enter your admin credentials to sign in."}
            </p>
          </div>

          {step === "gate" ? (
            <form onSubmit={handleGateSubmit} className="space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green/5 px-4 py-3 text-xs font-medium text-green">
                <IconShield className="h-4 w-4 shrink-0" />
                This area is protected by a security code.
              </div>

              <div>
                <label htmlFor="gateCode" className="mb-1.5 block text-xs font-semibold text-ink">
                  Security code
                </label>
                <div className="relative">
                  <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="gateCode"
                    type="text"
                    required
                    autoComplete="off"
                    maxLength={20}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your security code"
                    className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                  />
                </div>
              </div>

              {blocked && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
                  Access blocked. Too many failed attempts - try again later.
                </p>
              )}

              {!blocked && attemptsLeft !== null && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                  Incorrect code. {attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} remaining.
                </p>
              )}

              {!blocked && error && attemptsLeft === null && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || blocked}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <IconLoader className="h-4 w-4" />}
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green/5 px-4 py-3 text-xs font-medium text-green">
                <IconShield className="h-4 w-4 shrink-0" />
                Security code accepted.
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink">
                  Email
                </label>
                <div className="relative">
                  <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@infinisoftech.com"
                    className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-ink">
                  Password
                </label>
                <div className="relative">
                  <IconKey className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <IconLoader className="h-4 w-4" />}
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized personnel only. Access is protected by a security code.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
          <IconLoader className="h-6 w-6 text-green" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
