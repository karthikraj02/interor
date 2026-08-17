const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "CONSULTATION_BOOKED"
  | "SITE_VISIT"
  | "QUOTATION_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export const LEAD_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "CONSULTATION_BOOKED",
  "SITE_VISIT",
  "QUOTATION_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
];

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  propertyType: string;
  location: string;
  area: string | null;
  budget: string;
  preferredStartDate: string | null;
  message: string;
  status: LeadStatus;
  notes: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  total: number;
  counts: Partial<Record<LeadStatus, number>>;
  conversionRate: number;
};

class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AdminApiError(data.error ?? "Request failed.", response.status);
  }
  return data as T;
}

export { AdminApiError };

export function adminLogin(email: string, password: string) {
  return request<{ ok: true }>("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function adminLogout() {
  return request<{ ok: true }>("/api/admin/logout", { method: "POST" });
}

export function adminMe() {
  return request<{ ok: true; email: string }>("/api/admin/me");
}

export function fetchStats() {
  return request<{ ok: true; stats: DashboardStats }>("/api/admin/stats");
}

export function fetchLeads(params: { search?: string; status?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", String(params.page));
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<{ ok: true; items: Lead[]; total: number; page: number; limit: number }>(
    `/api/admin/leads${suffix}`,
  );
}

export function updateLeadRequest(id: string, update: Partial<Pick<Lead, "status" | "notes" | "assignedTo">>) {
  return request<{ ok: true; lead: Lead }>(`/api/admin/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(update),
  });
}

export function leadsCsvUrl() {
  return `${API_BASE}/api/admin/leads.csv`;
}
