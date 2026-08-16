"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, LockKeyhole, Mail, ShieldCheck, Lock, Code2 } from "lucide-react";
import "@/app/admin/login/login.css";

function DeveloperLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/developer/dashboard";

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
      const res = await fetch("/api/developer/login-gate", {
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
      setLoading(false);
      setCode("");
    } catch (err) {
      setError("Unable to reach the server. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/developer/login", {
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
    } catch (err) {
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
            <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink flex items-center gap-2 justify-center">
              <Code2 className="h-5 w-5 text-green" /> Developer Workspace
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === "gate"
                ? "Enter your security code to continue."
                : "Enter your developer credentials to sign in."}
            </p>
          </div>

          {step === "gate" ? (
            <form onSubmit={handleGateSubmit} className="space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green/5 px-4 py-3 text-xs font-medium text-green">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                This area is protected by a security code.
              </div>

              <div>
                <label htmlFor="gateCode" className="mb-1.5 block text-xs font-semibold text-ink">
                  Security code
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                  Access blocked. Too many failed attempts — try again later.
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
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Checking…" : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-green/5 px-4 py-3 text-xs font-medium text-green">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                Security code accepted.
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@infinisoftech.com"
                    className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-ink">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized developers only. Access is protected by a security code.
        </p>
      </div>
    </div>
  );
}

export default function DeveloperLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9FB]">
          <Loader2 className="h-6 w-6 animate-spin text-green" />
        </div>
      }
    >
      <DeveloperLoginForm />
    </Suspense>
  );
}
