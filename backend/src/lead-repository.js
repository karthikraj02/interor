import pg from "pg";
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required.");
const pool = new Pool({ connectionString, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : undefined });
export async function ensureDatabase() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto; CREATE TABLE IF NOT EXISTS leads (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, project_type TEXT NOT NULL, property_type TEXT NOT NULL, location TEXT NOT NULL, area TEXT, budget TEXT NOT NULL, preferred_start_date DATE, message TEXT NOT NULL, consent BOOLEAN NOT NULL, status TEXT NOT NULL DEFAULT 'NEW', source TEXT NOT NULL DEFAULT 'website', notes TEXT, assigned_to TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()); CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email); CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads(phone); CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status); CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);`);
}
export async function createLead(lead) {
  const result = await pool.query(`INSERT INTO leads (name,email,phone,project_type,property_type,location,area,budget,preferred_start_date,message,consent,source) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id,name,email,phone,project_type AS "projectType",property_type AS "propertyType",location,area,budget,preferred_start_date AS "preferredStartDate",message,source,created_at AS "createdAt"`, [lead.name, lead.email.toLowerCase(), lead.phone, lead.projectType, lead.propertyType, lead.location, lead.area || null, lead.budget, lead.preferredStartDate || null, lead.message, lead.consent, lead.source]);
  return result.rows[0];
}

const columns = `id,name,email,phone,project_type AS "projectType",property_type AS "propertyType",location,area,budget,preferred_start_date AS "preferredStartDate",message,consent,status,source,notes,assigned_to AS "assignedTo",created_at AS "createdAt",updated_at AS "updatedAt"`;
export async function listLeads({ search, status, limit, offset }) {
  const values = []; const clauses = [];
  if (search) { values.push(`%${search}%`); clauses.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR phone ILIKE $${values.length})`); }
  if (status) { values.push(status); clauses.push(`status = $${values.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  values.push(limit, offset);
  const result = await pool.query(`SELECT ${columns} FROM leads ${where} ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`, values);
  const total = await pool.query(`SELECT COUNT(*)::int AS count FROM leads ${where}`, values.slice(0, -2));
  return { items: result.rows, total: total.rows[0].count };
}
export async function updateLead(id, update) {
  const fields = { status: "status", notes: "notes", assignedTo: "assigned_to" }; const entries = Object.entries(update).filter(([key]) => key in fields);
  if (!entries.length) return null;
  const values = entries.map(([, value]) => value); const sets = entries.map(([key], index) => `${fields[key]} = $${index + 1}`); values.push(id);
  const result = await pool.query(`UPDATE leads SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $${values.length} RETURNING ${columns}`, values);
  return result.rows[0] ?? null;
}
export async function dashboardStats() {
  const result = await pool.query(`SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status`); const counts = Object.fromEntries(result.rows.map((row) => [row.status, row.count])); const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  return { total, counts, conversionRate: total ? Number((((counts.WON ?? 0) / total) * 100).toFixed(1)) : 0 };
}
