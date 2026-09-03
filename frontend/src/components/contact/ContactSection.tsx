import { ContactForm } from "./ContactForm";
import { branches } from "@/data/site";
import { getSiteConfig } from "@/lib/site-config";

export function ContactSection() {
  const { phoneDisplay, telHref, phoneSecondary, telSecondaryHref, email, emailHref, whatsappHref } =
    getSiteConfig();

  return (
    <section id="contact" className="section">
      <p className="section-label eyebrow-rule reveal">CONTACT</p>
      <h2 className="section-title reveal">Tell us what you&apos;re planning.</h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <aside className="glass-card reveal rounded-3xl p-7">
          <h3 className="text-2xl">Let&apos;s start with your space.</h3>
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

          <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm text-[var(--text-secondary)]">
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
    </section>
  );
}
