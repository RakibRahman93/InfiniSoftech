"use client";

import { useRouter } from "next/navigation";
import { Construction, ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-background/50 px-6 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-gold">
        <Construction className="h-8 w-8" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold text-ink">Module under development</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        This admin module is part of the roadmap and isn&apos;t wired up yet. The shell, navigation
        and core content tools (blog, FAQs, leads) are ready to use.
      </p>
      <button
        data-no-sparkle
        onClick={() => router.push("/admin/dashboard")}
        className="mt-6 flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>
    </div>
  );
}