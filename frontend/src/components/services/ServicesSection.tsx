import Link from "next/link";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <p className="section-label eyebrow-rule reveal">SERVICES</p>
      <h2 className="section-title reveal">Design support for the spaces that matter.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="glass-card reveal block rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">INTERIORS</p>
            <h3 className="mt-3 text-xl">{service.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
