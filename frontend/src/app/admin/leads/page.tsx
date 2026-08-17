"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  fetchLeads,
  leadsCsvUrl,
  updateLeadRequest,
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/lib/admin-api";

function LeadsContent() {
  const [items, setItems] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  // Starts true so the first render shows a loading state without calling
  // setState synchronously inside the effect body; it is only ever set to
  // false once, after the first request settles, so later refetches (from
  // search/status/page changes) update the table in place without a flicker.
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetchLeads({ search: search || undefined, status: status || undefined, page })
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load leads."))
      .finally(() => setLoading(false));
  }, [search, status, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function saveLead(id: string, update: Partial<Pick<Lead, "status" | "notes" | "assignedTo">>) {
    const { lead } = await updateLeadRequest(id, update);
    setItems((current) => current.map((item) => (item.id === id ? lead : item)));
    setSelected((current) => (current?.id === id ? lead : current));
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="section-title text-3xl">Leads</h1>
        <a href={leadsCsvUrl()} className="btn-secondary">
          Export CSV
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder="Search name, email, or phone"
          className="contact-input max-w-xs"
        />
        <select
          value={status}
          onChange={(event) => {
            setPage(1);
            setStatus(event.target.value);
          }}
          className="contact-input max-w-[12rem]"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="field-error mt-4" role="alert">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--text-secondary)]">
                  No leads match these filters.
                </td>
              </tr>
            )}
            {items.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelected(lead)}
                className="cursor-pointer border-b border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  {lead.phone}
                  <br />
                  {lead.email}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  {lead.projectType} · {lead.location}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs">
                    {lead.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <span>{total} total leads</span>
        <div className="flex gap-2">
          <button
            className="icon-button disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            Previous
          </button>
          <button
            className="icon-button disabled:opacity-40"
            disabled={items.length < 50}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lead details for ${selected.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-card w-full max-w-lg rounded-3xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-xl">{selected.name}</h2>
              <button className="icon-button" onClick={() => setSelected(null)} aria-label="Close">
                Close
              </button>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
              <div>
                <dt className="text-xs uppercase">Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase">Email</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase">Property</dt>
                <dd>{selected.propertyType}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase">Budget</dt>
                <dd>{selected.budget}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">{selected.message}</p>

            <label className="field-label mt-5">
              Status
              <select
                value={selected.status}
                onChange={(event) => saveLead(selected.id, { status: event.target.value as LeadStatus })}
                className="contact-input"
              >
                {LEAD_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {value.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </label>

            <label className="field-label mt-4">
              Assigned to
              <input
                defaultValue={selected.assignedTo ?? ""}
                onBlur={(event) => saveLead(selected.id, { assignedTo: event.target.value })}
                className="contact-input"
              />
            </label>

            <label className="field-label mt-4">
              Notes
              <textarea
                defaultValue={selected.notes ?? ""}
                onBlur={(event) => saveLead(selected.id, { notes: event.target.value })}
                className="contact-input min-h-24"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <AdminShell>
      <LeadsContent />
    </AdminShell>
  );
}
