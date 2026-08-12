"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import "./login.css";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
            <Image
              src="/assets/images/logo.svg"
              alt="InfiniSoftech"
              width={154}
              height={35}
              className="h-10 w-auto"
              unoptimized
              priority
            />
            <h1 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to manage your site content and leads.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized personnel only. All activity is logged.
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
          <Loader2 className="h-6 w-6 animate-spin text-green" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}