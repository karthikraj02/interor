"use client";

import { FormEvent, useState } from "react";

type FormFields = Record<string, string>;

const empty: FormFields = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  propertyType: "",
  location: "",
  area: "",
  budget: "",
  preferredStartDate: "",
  message: "",
  consent: "",
};

const requiredFields = ["name", "phone", "email", "projectType", "propertyType", "location", "budget", "message"];

type ApiResponse = { error?: string; fields?: FormFields; leadId?: string };

export function ContactForm() {
  const [form, setForm] = useState<FormFields>(empty);
  const [errors, setErrors] = useState<FormFields>({});
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (name: string, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      requiredFields.filter((field) => !form[field].trim()).map((field) => [field, "Required"]),
    );
    if (!form.consent) nextErrors.consent = "Consent is required.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setNotice("Please correct the highlighted fields.");
      return;
    }

    setStatus("sending");
    setNotice("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The `website` field is an invisible honeypot the backend checks;
        // it is always sent empty by real visitors.
        body: JSON.stringify({ ...form, consent: true, website: "" }),
      });
      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        setErrors(data.fields ?? {});
        throw new Error(data.error ?? "Unable to send your request. Please try again.");
      }

      const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
      if (whatsappNumber) {
        const messageLines = [
          "Hi, I just submitted a new interior design enquiry:",
          `*Name:* ${form.name}`,
          `*Phone:* ${form.phone}`,
          `*Email:* ${form.email}`,
          `*Location:* ${form.location}`,
          `*Project:* ${form.projectType} - ${form.propertyType}`,
          `*Budget:* ${form.budget}`,
          form.area ? `*Area:* ${form.area}` : null,
          form.preferredStartDate ? `*Start Date:* ${form.preferredStartDate}` : null,
          form.message ? `*Message:* ${form.message}` : null,
        ].filter(Boolean).join("\n");
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines)}`, "_blank");
      }

      setForm(empty);
      setStatus("success");
      setNotice("Thank you — your request has been received. We'll be in touch shortly.");
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Please try again in a moment.");
    }
  }

  const field = (name: string, label: string, type = "text") => (
    <label className="field-label">
      {label}
      <input
        type={type}
        value={form[name]}
        onChange={(event) => update(name, event.target.value)}
        className="contact-input"
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="field-error" role="alert">
          {errors[name]}
        </span>
      )}
    </label>
  );

  return (
    <form onSubmit={submit} className="glass-card reveal space-y-4 rounded-3xl p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Name")}
        {field("phone", "Phone", "tel")}
        {field("email", "Email", "email")}
        {field("location", "Location")}
        {field("area", "Approx. area (optional)")}
        <label className="field-label">
          Project type
          <select
            value={form.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            className="contact-input"
            aria-invalid={Boolean(errors.projectType)}
          >
            <option value="">Select one</option>
            <option>New interior</option>
            <option>Renovation</option>
            <option>Commercial</option>
          </select>
          {errors.projectType && (
            <span className="field-error" role="alert">
              {errors.projectType}
            </span>
          )}
        </label>
        <label className="field-label">
          Property type
          <select
            value={form.propertyType}
            onChange={(event) => update("propertyType", event.target.value)}
            className="contact-input"
            aria-invalid={Boolean(errors.propertyType)}
          >
            <option value="">Select one</option>
            <option>Apartment</option>
            <option>Villa / house</option>
            <option>Office</option>
          </select>
          {errors.propertyType && (
            <span className="field-error" role="alert">
              {errors.propertyType}
            </span>
          )}
        </label>
        <label className="field-label">
          Budget range
          <select
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            className="contact-input"
            aria-invalid={Boolean(errors.budget)}
          >
            <option value="">Select one</option>
            <option>To be discussed</option>
            <option>Under ₹10 lakh</option>
            <option>₹10–25 lakh</option>
            <option>Above ₹25 lakh</option>
          </select>
          {errors.budget && (
            <span className="field-error" role="alert">
              {errors.budget}
            </span>
          )}
        </label>
        {field("preferredStartDate", "Preferred start date", "date")}
      </div>
      <label className="field-label">
        Tell us about your project
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="contact-input min-h-32"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && (
          <span className="field-error" role="alert">
            {errors.message}
          </span>
        )}
      </label>
      <label className="flex gap-3 text-sm text-[var(--text-secondary)]">
        <input
          type="checkbox"
          checked={form.consent === "yes"}
          onChange={(event) => update("consent", event.target.checked ? "yes" : "")}
        />
        I consent to being contacted about this request.
      </label>
      {errors.consent && (
        <span className="field-error" role="alert">
          {errors.consent}
        </span>
      )}
      <button disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Request consultation"}
      </button>
      <p aria-live="polite" className={status === "error" ? "text-sm text-[#f4a3a3]" : "text-sm text-[var(--accent)]"}>
        {notice}
      </p>
    </form>
  );
}
