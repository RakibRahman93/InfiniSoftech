"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  ArrowRight,
  Loader2,
  UserRound,
  Clock3,
} from "lucide-react";
import { useCustomerLeads, unreadForLead, formatShort } from "@/components/customer/useCustomerLeads";

const statusStyles = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Contacted: "bg-orange-50 text-orange-600 border-orange-200",
  Qualified: "bg-violet-50 text-violet-600 border-violet-200",
  Won: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function CustomerOverviewPage() {
  const { leads, loading } = useCustomerLeads();
  const [customer] = useState(() => null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const total = leads.length;
  const replies = leads.reduce((sum, l) => sum + (l.replies?.length ?? 0), 0);
  const newCount = leads.reduce((sum, l) => sum + unreadForLead(l), 0);
  const inProgress = leads.filter((l) => l.status === "New" || l.status === "Contacted").length;
  const recent = leads.slice(0, 4);

  const stats = [
    { label: "Total enquiries", value: total, icon: MessageSquare, iconClass: "bg-green/10 text-green" },
    { label: "Messages", value: replies, icon: UserRound, iconClass: "bg-blue-50 text-blue-600" },
    { label: "In progress", value: inProgress, icon: Clock3, iconClass: "bg-amber-50 text-amber-600" },
    { label: "New replies", value: newCount, icon: MessageSquare, iconClass: "bg-violet-50 text-violet-600" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Overview</h1>
          <p className="text-xs text-muted-foreground">
            A quick look at your activity with our team.
          </p>
        </div>
        <Link
          href="/customer/dashboard/enquiries"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green px-5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:opacity-90"
        >
          Open enquiries <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, iconClass }) => (
          <div
            key={label}
            className="min-h-[128px] rounded-[20px] border border-[#E7E5E1] bg-white p-4 shadow-[0_1px_2px_rgba(20,20,20,0.03)] sm:min-h-[140px] sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${iconClass}`}>
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
            </div>
            <p className="mt-4 text-[24px] font-semibold leading-none text-ink sm:text-[28px]">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Recent enquiries */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Recent enquiries</h2>
          {total > 0 && (
            <Link
              href="/customer/dashboard/enquiries"
              className="inline-flex items-center gap-1 text-xs font-medium text-green transition-colors hover:text-green/80"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-ink/5 bg-background p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sand">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-ink">No enquiries yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Send us a project enquiry and we&apos;ll reply right here in real time.
            </p>
            <Link
              href="/customer/dashboard/enquiries"
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-green px-6 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:opacity-90"
            >
              New enquiry
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recent.map((lead) => (
              <Link
                key={lead.id}
                href="/customer/dashboard/enquiries"
                className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-background p-4 shadow-sm transition hover:border-green/20 hover:shadow-md"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green/10 text-green">
                  <UserRound className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {lead.subject || lead.service || "Project enquiry"}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {lead.name}
                    {lead.company ? ` · ${lead.company}` : ""} — {formatShort(lead.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {unreadForLead(lead) > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-green px-1.5 text-[10px] font-bold text-white">
                      {unreadForLead(lead)}
                    </span>
                  )}
                  <span
                    className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                      statusStyles[lead.status] || "bg-sand/50 text-muted-foreground"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}