"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import "../customer.css";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/customer/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.ok) router.replace("/customer/dashboard");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router]);

  function switchMode(next) {
    setMode(next);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/customer/login" : "/api/customer/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        if (data?.blocked || res.status === 429) setBlocked(true);
        setLoading(false);
        return;
      }
      router.replace("/customer/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the server. Please try again.");
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <div
      data-no-sparkle
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F9FB] px-4 py-10"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8876FF]/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-background shadow-[0_32px_80px_-40px_rgba(26,26,26,0.35)]">
          {/* Header */}
          <div className="border-b border-ink/5 px-7 pb-5 pt-8 text-center sm:px-9">
            <div className="mx-auto flex w-fit items-center gap-2">
              <Image
                src="/assets/images/InfiniSoftLogoblack.png"
                alt="InfiniSoftech"
                width={34}
                height={100}
                className="object-contain"
                unoptimized
                priority
              />
              <Image
                src="/assets/images/logo.svg"
                alt="InfiniSoftech"
                width={120}
                height={35}
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {isLogin
                ? "Sign in to check on your enquiries and chat with our team."
                : "Register to follow your projects and message us in real time."}
            </p>
          </div>

          {/* Live chat hint — the signature */}
          <div className="px-7 pt-5 sm:px-9">
            <div className="flex items-center gap-2.5 rounded-xl border border-green/15 bg-green/[0.04] px-3.5 py-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <p className="text-xs text-muted-foreground">
                Replies from our team arrive here{" "}
                <span className="font-semibold text-green">live</span>.
              </p>
            </div>
          </div>

          <div className="px-7 pb-8 pt-5 sm:px-9">
            {/* Mode toggle */}
            <div className="relative flex rounded-2xl bg-sand/70 p-1">
              <div
                className="pointer-events-none absolute inset-y-1 w-1/2 rounded-xl bg-background shadow-lg transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${isLogin ? "0%" : "100%"})` }}
              />
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  isLogin ? "text-ink" : "text-muted-foreground hover:text-ink"
                }`}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  !isLogin ? "text-ink" : "text-muted-foreground hover:text-ink"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                Register
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {!isLogin && (
                <Field label="Full Name" htmlFor="customer-name">
                  <input
                    id="customer-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="h-11 w-full rounded-xl border border-ink/10 bg-background pl-10 pr-3.5 text-sm text-ink outline-none transition placeholder:text-muted-foreground/45 focus:border-green/50 focus:ring-2 focus:ring-green/10"
                  />
                  <InputIcon icon={<User className="h-4 w-4" />} />
                </Field>
              )}

              <Field label="Email Address" htmlFor="customer-email">
                <input
                  id="customer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background pl-10 pr-3.5 text-sm text-ink outline-none transition placeholder:text-muted-foreground/45 focus:border-green/50 focus:ring-2 focus:ring-green/10"
                />
                <InputIcon icon={<Mail className="h-4 w-4" />} />
              </Field>

              <Field label="Password" htmlFor="customer-password">
                <input
                  id="customer-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="h-11 w-full rounded-xl border border-ink/10 bg-background py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-muted-foreground/45 focus:border-green/50 focus:ring-2 focus:ring-green/10"
                />
                <InputIcon icon={<Lock className="h-4 w-4" />} />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-ink"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Field>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-ink/80">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-ink/20 text-green focus:ring-green"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/"
                    className="text-sm font-medium text-green transition-colors hover:text-green/80"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green text-sm font-semibold text-white shadow-md shadow-green/20 transition-all hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Please wait…
                  </>
                ) : isLogin ? (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-green"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Back to Infinisoftech website
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider text-ink/70"
      >
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

function InputIcon({ icon }) {
  return (
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
      {icon}
    </span>
  );
}
