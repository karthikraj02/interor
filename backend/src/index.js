import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const DEFAULT_PORT = 5000;
const port = Number(process.env.PORT || DEFAULT_PORT);
const requestBuckets = new Map();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeText = (value, maxLength) =>
  String(value ?? "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, maxLength);

const canSubmitContact = (ip) => {
  const key = ip || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 10;
  const bucket = requestBuckets.get(key);

  if (!bucket || now - bucket.start > windowMs) {
    requestBuckets.set(key, { start: now, count: 1 });
    return true;
  }

  if (bucket.count >= maxRequests) {
    return false;
  }

  bucket.count += 1;
  requestBuckets.set(key, bucket);
  return true;
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sai-interior-backend" });
});

app.post("/api/contact", (req, res) => {
  if (!canSubmitContact(req.ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Please try again soon." });
  }

  const name = sanitizeText(req.body?.name, 120);
  const phone = sanitizeText(req.body?.phone, 20).replace(/[^\d+\-\s]/g, "");
  const email = sanitizeText(req.body?.email, 160).toLowerCase();
  const message = sanitizeText(req.body?.message, 1500);

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, error: "All fields are required." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email format." });
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return res.status(400).json({ ok: false, error: "Invalid phone number." });
  }

  return res.status(201).json({
    ok: true,
    message: "Consultation request received. We will contact you shortly.",
  });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Sai Interior backend running on port ${port}`);
});
