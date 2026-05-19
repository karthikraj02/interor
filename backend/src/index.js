import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sai-interior-backend" });
});

app.post("/api/contact", (req, res) => {
  const { name, phone, email, message } = req.body ?? {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, error: "All fields are required." });
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
