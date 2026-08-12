"use client";

import { Fragment, useState } from "react";
import { Users, Search, AlertTriangle, Mail, Building2, MessageSquare } from "lucide-react";

const STATUS_COLORS = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Contacted: "bg-gold/10 text-gold border-gold/20",
  Qualified: "bg-violet-50 text-violet-600 border-violet-200",
  Won: "bg-green/10 text-green border-green/15",
};

const STATUSES = ["All", "New", "Contacted", "Qualified", "Won"];

export default function LeadsManager({ initialLeads, live }) {
  const [leads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = leads.filter((lead) => {
    if (filter !== "All" && lead.status !== filter) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [lead.name, lead.email, lead.company, lead.message].some((v) =>
      (v ?? "").toLowerCase().includes(q),
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-green/10 text-green">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">Leads</h2>
            <p className="text-[11px] text-muted-foreground">
              {leads.length} lead{leads.length === 1 ? "" : "s"} ·{" "}
              {live ? "Supabase-backed" : "sample data"}
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads…"
            className="w-full rounded-xl border border-ink/10 bg-white py-2 pl-9 pr-4 text-sm text-ink placeholder:text-muted-foreground/50 focus:border-green/40 focus:outline-none focus:ring-2 focus:ring-green/10 sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => (
          <button
            data-no-sparkle
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === s ? "bg-ink text-white" : "bg-white text-muted-foreground hover:bg-sand/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {!live && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            No <code className="rounded bg-sand/70 px-1">leads</code> table found in Supabase, so
            you are viewing sample data. A <em>messages</em> table (used by the site chat) is read
            automatically when available.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-ink/5 bg-background shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">Company</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Source</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <Fragment key={lead.id}>
                <tr
                  className="border-b border-ink/5 last:border-b-0 hover:bg-sand/30"
                >
                  <td className="px-4 py-3">
                    <button
                      data-no-sparkle
                      onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                      className="flex w-full items-center gap-3 text-left"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green/10 text-xs font-semibold text-green">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {lead.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {lead.email}
                        </span>
                      </span>
                    </button>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                    {lead.company || "—"}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="inline-flex items-center gap-1 rounded-full bg-sand/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      {lead.source === "Chat" ? (
                        <MessageSquare className="h-3 w-3" />
                      ) : (
                        <Mail className="h-3 w-3" />
                      )}
                      {lead.source || "—"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                    {lead.formattedDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        STATUS_COLORS[lead.status] ?? "bg-sand/50 text-muted-foreground"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
                {expandedId === lead.id && (
                  <tr className="bg-sand/20">
                    <td colSpan={5} className="px-4 pb-4 pt-1">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 text-sm">
                          <p className="font-semibold text-ink">
                            {lead.company || "No company provided"}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {lead.message || "No message provided."}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-14 text-center text-xs text-muted-foreground">
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}