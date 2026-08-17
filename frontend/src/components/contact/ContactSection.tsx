import { ContactForm } from "./ContactForm";

type ContactSectionProps = {
  phoneDisplay?: string;
  telHref?: string;
  whatsappHref?: string;
};

export function ContactSection({ phoneDisplay, telHref, whatsappHref }: ContactSectionProps) {
  return (
    <section id="contact" className="section">
      <p className="section-label eyebrow-rule reveal">CONTACT</p>
      <h2 className="section-title reveal">Tell us what you&apos;re planning.</h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <aside className="glass-card reveal rounded-3xl p-7">
          <h3 className="text-2xl">Let&apos;s start with your space.</h3>
          <p className="mt-4 text-[var(--text-secondary)]">
            Share the basics and we&apos;ll route your enquiry to the design team.
          </p>
          <a className="mt-6 block text-[var(--accent)]" href="mailto:gypsuminteriordesgins@gmail.com">
            Email gypsuminteriordesgins@gmail.com
          </a>
          {phoneDisplay && telHref && (
            <a className="mt-2 block text-[var(--accent)]" href={telHref}>
              Call {phoneDisplay}
            </a>
          )}
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
