import express from "express";
import rateLimit from "express-rate-limit";
import { leadSchema } from "../validators/lead.js";
import { createLead } from "../lead-repository.js";
import { sendLeadEmails } from "../mailer.js";

const router = express.Router();

const contactLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  limit: 5, 
  standardHeaders: "draft-8", 
  legacyHeaders: false, 
  message: { ok: false, error: "Too many requests. Please try again later." } 
});

router.post("/", contactLimiter, async (req, res, next) => {
  try { 
    const parsed = leadSchema.parse(req.body); 
    if (parsed.website) return res.status(201).json({ ok: true }); 
    
    const { website: _website, ...lead } = parsed; 
    const storedLead = await createLead({ ...lead, source: "website" }); 
    const emailResult = await sendLeadEmails(storedLead); 
    
    return res.status(201).json({ ok: true, leadId: storedLead.id, emailDelivered: emailResult.delivered }); 
  } catch (error) { 
    return next(error); 
  }
});

export default router;
