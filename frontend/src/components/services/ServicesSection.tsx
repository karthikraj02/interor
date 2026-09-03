import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <p className="section-label eyebrow-rule reveal">SERVICES</p>
      <h2 className="section-title reveal">Design support for the spaces that matter.</h2>
      <p className="section-copy reveal">
        From premium modular kitchens to full home interiors in Mangaluru and Udupi, we offer custom solutions
        for every budget.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="portfolio-card reveal group !aspect-[4/3]"
          >
            <Image
              src={service.image}
              alt={`${service.title} interior design by Sai Interior Designers`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="portfolio-card-meta">
              <p className="text-xs tracking-[.18em] text-[var(--accent)]">{service.category.toUpperCase()}</p>
              <h3 className="mt-1 text-lg text-white">{service.title}</h3>
              <p className="mt-1 text-sm text-white/70">{service.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
