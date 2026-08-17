import nodemailer from "nodemailer";
export async function sendLeadEmails(lead) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM, EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !EMAIL_FROM || !EMAIL_TO) return { delivered: false };
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } });
  const submitted = new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  await transport.sendMail({ from: EMAIL_FROM, to: EMAIL_TO, replyTo: lead.email, subject: "New interior design lead", text: `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nProject Type: ${lead.projectType}\nProperty Type: ${lead.propertyType}\nLocation: ${lead.location}\nArea: ${lead.area || "Not provided"}\nBudget: ${lead.budget}\nPreferred Start Date: ${lead.preferredStartDate || "Not provided"}\nMessage: ${lead.message}\nSource: ${lead.source}\nSubmitted At: ${submitted}` });
  await transport.sendMail({ from: EMAIL_FROM, to: lead.email, subject: "We received your consultation request", text: "Thank you for contacting us. We have received your consultation request and our team will contact you shortly." }); return { delivered: true };
}
