"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { fetchStats, type DashboardStats, LEAD_STATUSES } from "@/lib/admin-api";

const labels: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONSULTATION_BOOKED: "Consultation booked",
  SITE_VISIT: "Site visit",
  QUOTATION_SENT: "Quotation sent",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats()
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load stats."));
  }, []);

  if (error) return <p className="field-error">{error}</p>;
  if (!stats) return <p className="text-[var(--text-secondary)]">Loading dashboard…</p>;

  return (
    <div>
      <h1 className="section-title text-3xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">TOTAL LEADS</p>
          <p className="stat-figure mt-2">{stats.total}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">CONVERSION RATE</p>
          <p className="stat-figure mt-2">{stats.conversionRate}%</p>
        </div>
        {LEAD_STATUSES.map((status) => (
          <div key={status} className="glass-card rounded-2xl p-6">
            <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">{labels[status].toUpperCase()}</p>
            <p className="stat-figure mt-2">{stats.counts[status] ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <DashboardContent />
    </AdminShell>
  );
}
