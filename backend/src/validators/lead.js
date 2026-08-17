import { z } from "zod";

export const optionalText = (max) => z.string().trim().max(max).optional().or(z.literal(""));

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  phone: z.string().trim().regex(/^\+?[0-9][0-9\s()-]{8,18}$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  projectType: z.string().trim().min(2).max(80),
  propertyType: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(160),
  area: optionalText(80),
  budget: z.string().trim().min(2).max(80),
  preferredStartDate: optionalText(30).refine((value) => !value || !Number.isNaN(Date.parse(value)), "Enter a valid date."),
  message: z.string().trim().min(10, "Please share a little more about your project.").max(2000),
  consent: z.literal(true, { error: "Consent is required." }),
  website: z.string().max(0).optional(),
});

export const leadUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONSULTATION_BOOKED", "SITE_VISIT", "QUOTATION_SENT", "NEGOTIATION", "WON", "LOST"]).optional(),
  notes: z.string().trim().max(4000).optional(),
  assignedTo: z.string().trim().max(160).optional()
});

export const loginSchema = z.object({ 
  email: z.string().trim().email(), 
  password: z.string().min(1).max(200) 
});
