"use client";

import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  ArrowDownToLine,
  Calendar,
  CheckCircle,
  Clock3,
  FileText,
  Filter,
  Loader2,
  RefreshCw,
  Reply,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react";
import LeadDetailModal from "./LeadDetailModal";
import ConfirmDialog from "./ConfirmDialog";
import SmartPagination from "./SmartPagination";
import usePagination from "./usePagination";

const STATUS_ORDER = ["New", "Contacted", "Qualified", "Won"];

const statusStyles = {
  New: "bg-blue-50 text-blue-600 border-blue-200",
  Contacted: "bg-orange-50 text-orange-600 border-orange-200",
  Qualified: "bg-violet-50 text-violet-600 border-violet-200",
  Won: "bg-green/10 text-green border-green/15",
};

const STATUS_FILTERS = ["ALL", ...STATUS_ORDER];

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatFull(iso) {
  const d = parseDate(iso);
  if (!d) return "";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateRangeLabel(dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return "Select date range";
  const format = (v) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${v}T00:00:00`));
  if (dateFrom && dateTo) return `${format(dateFrom)} - ${format(dateTo)}`;
  if (dateFrom) return `From ${format(dateFrom)}`;
  return `Until ${format(dateTo)}`;
}

function uniqueSorted(values) {
  return Array.from(new Set(values.map((v) => String(v ?? "").trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function getInitials(name) {
  return String(name ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function formatTrendPercent(value) {
  if (value > 0) return `+${value}%`;
  if (value < 0) return `${value}%`;
  return "0%";
}

function normalizeSparkline(points) {
  const safe = points.length >= 2 ? points : [0, points[0] ?? 0];
  return safe.every((p) => p === 0) ? [0, 0, 0, 0, 0, 0] : safe;
}

function buildStatCards(leads) {
  const now = Date.now();
  const day = 86_400_000;
  const currentStart = now - 30 * day;
  const previousStart = now - 60 * day;

  const totals = { New: 0, Contacted: 0, Qualified: 0, Won: 0 };
  const current = { New: 0, Contacted: 0, Qualified: 0, Won: 0 };
  const previous = { New: 0, Contacted: 0, Qualified: 0, Won: 0 };
  const buckets = { New: Array(6).fill(0), Contacted: Array(6).fill(0), Qualified: Array(6).fill(0), Won: Array(6).fill(0) };

  for (const lead of leads) {
    const ts = parseDate(lead.created_at ?? lead.insertedAt)?.getTime();
    if (ts == null) continue;
    const s = STATUS_ORDER.includes(lead.status) ? lead.status : "New";
    totals[s] += 1;
    if (ts >= currentStart) {
      current[s] += 1;
      const bucketMs = (30 * day) / buckets[s].length || 1;
      const idx = Math.min(buckets[s].length - 1, Math.max(0, Math.floor((ts - currentStart) / bucketMs)));
      buckets[s][idx] += 1;
    } else if (ts >= previousStart) {
      previous[s] += 1;
    }
  }

  const change = (s) => {
    const cur = current[s];
    const prev = previous[s];
    if (prev === 0) return cur === 0 ? 0 : 100;
    return Math.round(((cur - prev) / prev) * 100);
  };

  return [
    {
      key: "New",
      label: "New",
      value: totals.New,
      change: formatTrendPercent(change("New")),
      caption: "waiting for first response",
      icon: FileText,
      iconClass: "bg-[#F2F7F1] text-[#3D7650]",
      lineColor: "#3D7650",
      points: normalizeSparkline(buckets.New),
    },
    {
      key: "Contacted",
      label: "Contacted",
      value: totals.Contacted,
      change: formatTrendPercent(change("Contacted")),
      caption: "in touch with the team",
      icon: Reply,
      iconClass: "bg-[#FFF8E8] text-[#E6A81C]",
      lineColor: "#E6A81C",
      points: normalizeSparkline(buckets.Contacted),
    },
    {
      key: "Qualified",
      label: "Qualified",
      value: totals.Qualified,
      change: formatTrendPercent(change("Qualified")),
      caption: "serious opportunity",
      icon: Clock3,
      iconClass: "bg-[#F8F3FC] text-[#8A5DB1]",
      lineColor: "#8A5DB1",
      points: normalizeSparkline(buckets.Qualified),
    },
    {
      key: "Won",
      label: "Won",
      value: totals.Won,
      change: formatTrendPercent(change("Won")),
      caption: "closed and on board",
      icon: CheckCircle,
      iconClass: "bg-[#F2F7F1] text-[#3D7650]",
      lineColor: "#3D7650",
      points: normalizeSparkline(buckets.Won),
    },
  ];
}

function MetricSparkline({ points }) {
  const width = 140;
  const height = 44;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  return (
    <svg className="absolute bottom-4 right-4 h-11 w-32 opacity-95" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke="#4D8A5B"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulkSelectionBar({ selectedCount, onClear, onDelete }) {
  if (selectedCount === 0) return null;
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-rose-100 bg-rose-50/70 px-4 py-3 shadow-[0_16px_40px_-34px_rgba(190,18,60,0.55)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-rose-600 shadow-sm">
          <Trash2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">
            {selectedCount} lead{selectedCount === 1 ? "" : "s"} selected
          </p>
          <p className="text-xs text-muted-foreground">Delete selected leads or clear the current selection.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          data-no-sparkle
          onClick={onClear}
          className="inline-flex h-9 items-center justify-center rounded-full border border-ink/10 bg-white px-4 text-xs font-semibold text-ink transition hover:bg-sand/60"
        >
          Clear
        </button>
        <button
          type="button"
          data-no-sparkle
          onClick={onDelete}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-rose-600 px-4 text-xs font-semibold text-white transition hover:bg-rose-700"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete selected
        </button>
      </div>
    </div>
  );
}

function FilterChip({ text }) {
  return (
    <span className="inline-flex items-center rounded-full border border-green/10 bg-green/5 px-3 py-1.5 text-xs font-medium text-green">
      {text}
    </span>
  );
}

export default function LeadsManager({ initialLeads, live }) {
  const [leads, setLeads] = useState(initialLeads ?? []);
  const [liveDB, setLiveDB] = useState(live ?? false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [companyFilter, setCompanyFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const refresh = async (silent = true) => {
    if (!liveDB) return;
    if (!silent) setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.leads)) {
        setLeads((prev) => {
          const byId = new Map(prev.map((l) => [l.id, l]));
          for (const incoming of data.leads) {
            const existing = byId.get(incoming.id);
            byId.set(
              incoming.id,
              existing ? { ...existing, ...incoming } : incoming,
            );
          }
          const fresh = new Set(data.leads.map((l) => l.id));
          return Array.from(byId.values()).filter((l) => fresh.has(l.id));
        });
      }
    } catch {
      // ignore polling failures
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => refresh(true), 15000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveDB]);

  const openDetail = (lead) => {
    setSelectedId(lead.id);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedId(null);
  };

  const selectedLead = selectedId ? leads.find((l) => l.id === selectedId) ?? null : null;

  const visibleCompanies = useMemo(() => uniqueSorted(leads.map((l) => l.company)), [leads]);
  const visibleServices = useMemo(() => uniqueSorted(leads.map((l) => l.service)), [leads]);
  const visibleSubjects = useMemo(() => uniqueSorted(leads.map((l) => l.subject)), [leads]);

  const filtered = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesSearch =
        needle.length === 0 ||
        [lead.name, lead.email, lead.phone, lead.company, lead.subject, lead.service, lead.message]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesStatus = statusFilter === "ALL" ? true : lead.status === statusFilter;
      const matchesCompany = companyFilter === "ALL" ? true : lead.company === companyFilter;
      const matchesService = serviceFilter === "ALL" ? true : lead.service === serviceFilter;
      const matchesSubject = subjectFilter === "ALL" ? true : lead.subject === subjectFilter;
      const createdAt = parseDate(lead.created_at ?? lead.insertedAt);
      const matchesDateFrom = dateFrom ? !!createdAt && createdAt >= new Date(`${dateFrom}T00:00:00`) : true;
      const matchesDateTo = dateTo ? !!createdAt && createdAt <= new Date(`${dateTo}T23:59:59.999`) : true;
      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany &&
        matchesService &&
        matchesSubject &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [leads, searchTerm, statusFilter, companyFilter, serviceFilter, subjectFilter, dateFrom, dateTo]);

  const statCards = useMemo(() => buildStatCards(leads), [leads]);
  const pagination = usePagination(filtered);

  const allSelected =
    pagination.paginatedData.length > 0 &&
    pagination.paginatedData.every((l) => selectedIds.has(l.id));
  const visibleIds = pagination.paginatedData.map((l) => l.id);
  const toggleAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) visibleIds.forEach((id) => next.delete(id));
      else visibleIds.forEach((id) => next.add(id));
      return next;
    });
  };
  const toggleOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setCompanyFilter("ALL");
    setServiceFilter("ALL");
    setSubjectFilter("ALL");
    setDateFrom("");
    setDateTo("");
  };

  const handleReply = async ({ leadId, message, type }) => {
    const res = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, type }),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || "Could not save reply.");
    }
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: type === "sent" && l.status === "New" ? "Contacted" : l.status,
              replies: [...(l.replies ?? []), data.reply],
            }
          : l,
      ),
    );
    if (type === "sent" && data.emailError) {
      toast((t) => (
        <span>
          Reply saved and stored. <strong>Email failed:</strong> {String(data.emailError).slice(0, 120)}
        </span>
      ));
    }
  };

  const handleDeleteReply = async (leadId, replyId) => {
    const res = await fetch(
      `/api/admin/leads/${encodeURIComponent(leadId)}/reply/${encodeURIComponent(replyId)}`,
      { method: "DELETE" },
    );
    const data = await res.json();
    if (!res.ok || data.error) {
      toast.error(data.error || "Could not delete reply.");
      return;
    }
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, replies: (l.replies ?? []).filter((r) => r.id !== replyId) } : l,
      ),
    );
    toast.success("Reply deleted.");
  };

  const handleMarkStatus = async (leadId, status, msg) => {
    const res = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      toast.error(data.error || "Could not update status.");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    toast.success(msg);
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && !data.error) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        toast.success("Lead deleted.");
      } else {
        if (!liveDB) {
          setLeads((prev) => prev.filter((l) => l.id !== id));
          toast.success("Lead deleted.");
        } else {
          toast.error(data.error || "Could not delete lead.");
        }
      }
    } catch {
      toast.error("Network error while deleting lead.");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        toast.success(`${data.count ?? selectedIds.size} lead(s) deleted.`);
      } else if (!liveDB) {
        toast.success(`${selectedIds.size} lead(s) deleted.`);
      } else {
        toast.error(data.error || "Could not delete leads.");
      }
      setLeads((prev) => prev.filter((l) => !selectedIds.has(l.id)));
      setSelectedIds(new Set());
    } catch {
      toast.error("Network error while deleting leads.");
    } finally {
      setBulkDeleting(false);
      setBulkDeleteConfirm(false);
    }
  };

  const exportCsv = () => {
    const columns = ["Name", "Email", "Phone", "Company", "Service", "Subject", "Source", "Status", "Created"];
    const rows = filtered.map((l) => [
      l.name ?? "",
      l.email ?? "",
      l.phone ?? "",
      l.company ?? "",
      l.service ?? "",
      l.subject ?? "",
      l.source ?? "",
      l.status ?? "",
      parseDate(l.created_at ?? l.insertedAt)?.toISOString() ?? "",
    ]);
    const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [columns.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Leads exported to CSV.");
  };

  const activeChips = useMemo(() => {
    const chips = [];
    if (searchTerm) chips.push(`Search: ${searchTerm}`);
    if (statusFilter !== "ALL") chips.push(`Status: ${statusFilter}`);
    if (companyFilter !== "ALL") chips.push(`Company: ${companyFilter}`);
    if (serviceFilter !== "ALL") chips.push(`Service: ${serviceFilter}`);
    if (subjectFilter !== "ALL") chips.push(`Subject: ${subjectFilter}`);
    if (dateFrom || dateTo) chips.push(`Date: ${formatDateRangeLabel(dateFrom, dateTo)}`);
    return chips;
  }, [searchTerm, statusFilter, companyFilter, serviceFilter, subjectFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-5 pb-10">
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />

      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green/10 text-green">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
                Leads
              </h2>
              {!liveDB && (
                <span className="rounded-full border border-gold/20 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  Sample data
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
              Manage every enquiry submitted from the contact form.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            data-no-sparkle
            onClick={() => refresh(false)}
            disabled={!liveDB || loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-4 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-sand/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
          {liveDB && (
            <button
              data-no-sparkle
              onClick={exportCsv}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-green px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green/90"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Export
            </button>
          )}
        </div>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, change, caption, icon: Icon, iconClass, points }) => (
          <div
            key={label}
            className="group relative min-h-[136px] overflow-hidden rounded-[20px] border border-[#E7E5E1] bg-white p-4 shadow-[0_1px_2px_rgba(20,20,20,0.03)] sm:min-h-[144px] sm:p-5"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 ${iconClass}`}>
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
                <p className="mt-1 text-[24px] font-semibold leading-none text-ink sm:text-[28px]">{value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3 sm:mt-5 sm:gap-4">
              <div>
                <p className="whitespace-nowrap text-[9px] leading-none text-green sm:text-[10px]">{change}</p>
                <p className="mt-0.5 text-[9px] leading-none text-muted-foreground sm:text-[10px]">
                  vs previous 30 days
                </p>
                <p className="mt-1.5 text-[10px] leading-tight text-muted-foreground/70">{caption}</p>
              </div>
              <MetricSparkline points={points} />
            </div>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative block min-w-0 xl:w-[340px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, company..."
            className="h-11 w-full rounded-xl border border-[#E7E5E1] bg-white pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/70 focus:border-green focus:ring-2 focus:ring-green/10"
          />
        </label>
        <span className="hidden px-2 text-sm font-semibold text-ink xl:inline">Filter</span>
        <details className="group relative">
          <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-[#E7E5E1] bg-white px-4 text-sm text-ink outline-none transition hover:border-green/30 [&::-webkit-details-marker]:hidden">
            <Calendar className="h-4 w-4" />
            {formatDateRangeLabel(dateFrom, dateTo)}
          </summary>
          <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[310px] rounded-2xl border border-[#E7E5E1] bg-white p-4 shadow-[0_18px_45px_rgba(25,35,25,0.14)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Requested date
            </p>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1.5 text-xs text-muted-foreground">
                <span>From</span>
                <input
                  type="date"
                  value={dateFrom}
                  max={dateTo || undefined}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#E7E5E1] bg-white px-2 text-xs text-ink outline-none focus:border-green"
                />
              </label>
              <label className="space-y-1.5 text-xs text-muted-foreground">
                <span>To</span>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#E7E5E1] bg-white px-2 text-xs text-ink outline-none focus:border-green"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              disabled={!dateFrom && !dateTo}
              className="mt-3 text-xs font-semibold text-green disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear date range
            </button>
          </div>
        </details>
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#E7E5E1] bg-white px-3 text-sm text-ink outline-none focus:border-green"
          >
            <option value="ALL">Status</option>
            {STATUS_FILTERS.slice(1).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#E7E5E1] bg-white px-3 text-sm text-ink outline-none focus:border-green"
          >
            <option value="ALL">Company</option>
            {visibleCompanies.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#E7E5E1] bg-white px-3 text-sm text-ink outline-none focus:border-green"
          >
            <option value="ALL">Service</option>
            {visibleServices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#E7E5E1] bg-white px-3 text-sm text-ink outline-none focus:border-green"
          >
            <option value="ALL">Subject</option>
            {visibleSubjects.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <button
          data-no-sparkle
          onClick={resetFilters}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E7E5E1] bg-white px-4 text-sm font-medium text-ink hover:bg-[#F8F8F5]"
        >
          Reset
        </button>
      </section>

      {/* Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-[#FBFBF8] px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          {filtered.length} filtered
        </span>
        {activeChips.map((chip) => (
          <FilterChip key={chip} text={chip} />
        ))}
      </div>

      <BulkSelectionBar
        selectedCount={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onDelete={() => setBulkDeleteConfirm(true)}
      />

      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-ink/5 bg-background shadow-sm">
        <table className="w-full min-w-[1060px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-ink/5 bg-[#F8F9FB] text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
              <th className="w-10 px-3 py-3.5 sm:px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-ink/20 text-green focus:ring-green/30"
                />
              </th>
              <th className="px-3 py-3.5 font-semibold">Client</th>
              <th className="px-3 py-3.5 font-semibold">Contact</th>
              <th className="px-3 py-3.5 font-semibold">Company</th>
              <th className="px-3 py-3.5 font-semibold">Service</th>
              <th className="px-3 py-3.5 font-semibold">Subject</th>
              <th className="px-3 py-3.5 font-semibold">Date</th>
              <th className="px-3 py-3.5 font-semibold">Status</th>
              <th className="px-3 py-3.5 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagination.paginatedData.map((lead, index) => (
              <tr
                key={lead.id}
                onClick={() => openDetail(lead)}
                className="cursor-pointer border-b border-ink/5 transition-colors last:border-b-0 hover:bg-[#F8F9FB]"
              >
                <td className="whitespace-nowrap px-3 py-3.5 sm:px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(lead.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleOne(lead.id)}
                    className="h-4 w-4 rounded border-ink/20 text-green focus:ring-green/30"
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EAF3E8] text-xs font-semibold text-green">
                      {getInitials(lead.name)}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{lead.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        #{String(pagination.startIndex + index).padStart(4, "0")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <p className="text-ink">{lead.email || "—"}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{lead.phone || ""}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-ink">{lead.company || "—"}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-ink">
                  {lead.service ? (
                    <span className="inline-flex rounded-md border border-[#E7E5E1] bg-[#F8F8F5] px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {lead.service}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="max-w-[180px] truncate whitespace-nowrap px-3 py-3.5 text-ink">{lead.subject || "—"}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-ink">{formatFull(lead.created_at ?? lead.insertedAt)}</td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span
                    className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${
                      statusStyles[lead.status] ?? "bg-sand/50 text-muted-foreground"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      data-no-sparkle
                      onClick={() => openDetail(lead)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-[#F5F5F1] hover:text-green"
                      title="View"
                    >
                      <User className="h-3.5 w-3.5" />
                    </button>
                    {lead.status !== "Won" && (
                      <button
                        data-no-sparkle
                        onClick={() => handleMarkStatus(lead.id, "Qualified", "Marked as qualified.")}
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-green/10 hover:text-green"
                        title="Mark qualified"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      data-no-sparkle
                      onClick={() => setDeleteConfirm(lead.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[#E7E5E1] text-muted-foreground transition-colors hover:bg-rose-50 hover:text-rose-600"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pagination.paginatedData.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-14 text-center text-sm text-muted-foreground">
                  No leads match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <SmartPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          pageSize={pagination.pageSize}
          onPageChange={pagination.setPage}
          onPageSizeChange={pagination.setPageSize}
        />
      </div>

      <LeadDetailModal
        lead={selectedLead}
        open={detailOpen}
        onClose={closeDetail}
        onReply={handleReply}
        onDeleteReply={handleDeleteReply}
        onMarkWon={(id) => handleMarkStatus(id, "Won", "Marked as won.")}
        onMarkQualified={(id) => handleMarkStatus(id, "Qualified", "Lead reopened.")}
        onDelete={(id) => setDeleteConfirm(id)}
      />

      <ConfirmDialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm)}
        loading={deleting}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
      />

      <ConfirmDialog
        open={bulkDeleteConfirm}
        onClose={() => setBulkDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
        loading={bulkDeleting}
        title="Delete Leads"
        message={`Are you sure you want to delete ${selectedIds.size} lead(s)? This action cannot be undone.`}
      />
    </div>
  );
}