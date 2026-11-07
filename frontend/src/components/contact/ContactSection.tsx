import { ContactForm } from "./ContactForm";
import { branches } from "@/data/site";
import { getSiteConfig } from "@/lib/site-config";

export function ContactSection() {
  const { phoneDisplay, telHref, phoneSecondary, telSecondaryHref, email, emailHref, whatsappHref } =
    getSiteConfig();

  return (
    <section id="contact" className="contact-section">
      <div className="section-wide">
      <p className="section-label eyebrow-rule reveal">LET&apos;S BEGIN</p>
      <h2 className="section-title reveal">A good home starts with a conversation.</h2>
      <div className="contact-grid">
        <ContactForm />
        <aside className="contact-card reveal">
          <p className="section-label">GET IN TOUCH</p>
          <h3 className="text-2xl">Tell us a little about your space.</h3>
          <p className="mt-4 text-[var(--text-secondary)]">
            Share the basics and we&apos;ll route your enquiry to the design team. Need advice from an expert?
            Get an appointment today.
          </p>

          {emailHref && (
            <a className="mt-6 block text-[var(--accent)]" href={emailHref}>
              {email}
            </a>
          )}
          {phoneDisplay && telHref && (
            <a className="mt-2 block text-[var(--accent)]" href={telHref}>
              {phoneDisplay}
            </a>
          )}
          {phoneSecondary && telSecondaryHref && (
            <a className="mt-1 block text-[var(--accent)]" href={telSecondaryHref}>
              {phoneSecondary}
            </a>
          )}

          <div className="contact-branches">
            {branches.map((branch) => (
              <div key={branch.label}>
                <p className="text-[var(--text-primary)]">{branch.label} branch</p>
                <p className="mt-1">{branch.address}</p>
              </div>
            ))}
          </div>

          {whatsappHref && (
            <a href={whatsappHref} className="btn-secondary mt-6 inline-block">
              Message on WhatsApp
            </a>
          )}
        </aside>
      </div>
      </div>
    </section>
  );
}
