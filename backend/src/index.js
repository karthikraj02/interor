import crypto from "node:crypto";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { ZodError, z } from "zod";
import { dashboardStats, ensureDatabase, listLeads, updateLead } from "./lead-repository.js";
import { clearAdminCookie, requireAdmin, setAdminCookie, verifyPassword } from "./auth.js";
import { leadUpdateSchema, loginSchema } from "./validators/lead.js";
import contactRouter from "./routes/contact.js";

dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 5000);
const allowedOrigins = (process.env.FRONTEND_URL ?? "").split(",").map((value) => value.trim()).filter(Boolean);
if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) throw new Error("FRONTEND_URL is required in production.");

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((req, res, next) => { const requestId = crypto.randomUUID(); res.locals.requestId = requestId; res.setHeader("X-Request-Id", requestId); next(); });
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") return callback(null, true); return callback(new Error("Origin is not allowed.")); }, credentials: true, methods: ["GET", "POST", "PATCH"], allowedHeaders: ["Content-Type"] }));
app.use(express.json({ limit: "32kb" }));

const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { ok: false, error: "Too many login attempts. Please try again later." } });

app.get("/api/health", async (_req, res, next) => { try { await ensureDatabase(); res.json({ ok: true, service: "interior-leads-api" }); } catch (error) { next(error); } });
app.use("/api/contact", contactRouter);
app.post("/api/admin/login", adminLimiter, (req, res, next) => { try { const { email, password } = loginSchema.parse(req.body); if (email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase() || !verifyPassword(password)) return res.status(401).json({ ok: false, error: "Invalid email or password." }); setAdminCookie(res); return res.json({ ok: true }); } catch (error) { return next(error); } });
app.post("/api/admin/logout", requireAdmin, (_req, res) => { clearAdminCookie(res); res.json({ ok: true }); });
app.get("/api/admin/me", requireAdmin, (req, res) => res.json({ ok: true, email: req.admin.email }));
app.get("/api/admin/stats", requireAdmin, async (_req, res, next) => { try { res.json({ ok: true, stats: await dashboardStats() }); } catch (error) { next(error); } });
app.get("/api/admin/leads", requireAdmin, async (req, res, next) => { try { const query = z.object({ search: z.string().max(160).optional(), status: z.string().optional(), page: z.coerce.number().int().min(1).default(1) }).parse(req.query); const limit = 50; const data = await listLeads({ search: query.search, status: query.status, limit, offset: (query.page - 1) * limit }); res.json({ ok: true, ...data, page: query.page, limit }); } catch (error) { next(error); } });
app.get("/api/admin/leads.csv", requireAdmin, async (_req, res, next) => { try { const { items } = await listLeads({ limit: 5000, offset: 0 }); const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`; const headings = ["Name", "Email", "Phone", "Project type", "Property type", "Location", "Area", "Budget", "Status", "Assigned to", "Notes", "Created at"]; const rows = items.map((lead) => [lead.name, lead.email, lead.phone, lead.projectType, lead.propertyType, lead.location, lead.area, lead.budget, lead.status, lead.assignedTo, lead.notes, lead.createdAt].map(quote).join(",")); res.type("text/csv").attachment("leads.csv").send([headings.map(quote).join(","), ...rows].join("\n")); } catch (error) { next(error); } });
app.patch("/api/admin/leads/:id", requireAdmin, async (req, res, next) => { try { const updated = await updateLead(z.string().uuid().parse(req.params.id), leadUpdateSchema.parse(req.body)); if (!updated) return res.status(404).json({ ok: false, error: "Lead not found." }); return res.json({ ok: true, lead: updated }); } catch (error) { return next(error); } });
app.use((_req, res) => res.status(404).json({ ok: false, error: "Route not found." }));
app.use((error, _req, res, _next) => {
  const requestId = res.locals.requestId;
  if (error instanceof ZodError) { const fields = Object.fromEntries(error.issues.map((issue) => [String(issue.path[0] ?? "form"), issue.message])); return res.status(400).json({ ok: false, error: "Check the highlighted fields.", fields, requestId }); }
  if (error instanceof SyntaxError && "body" in error) return res.status(400).json({ ok: false, error: "Invalid request body.", requestId });
  console.error(JSON.stringify({ level: "error", requestId, message: error instanceof Error ? error.message : "Unknown error" })); return res.status(500).json({ ok: false, error: "We could not save your request. Please try again.", requestId });
});
ensureDatabase().then(() => app.listen(port, () => console.info(JSON.stringify({ level: "info", event: "server_started", port })))).catch((error) => { console.error("Database initialization failed", error); process.exit(1); });
