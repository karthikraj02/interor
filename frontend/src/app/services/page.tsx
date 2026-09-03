import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata = {
  title: "Services",
  description:
    "Interior design services from Sai Interior Designers — modular kitchens, wardrobes, living rooms, bedrooms, pooja rooms, false ceilings, and more across Mangaluru and Udupi.",
};

export default function Services() {
  return (
    <main className="section">
      <p className="section-label">SERVICES</p>
      <h1 className="section-title">Design services</h1>
      <p className="section-copy">
        Custom solutions for every budget — from a single modular kitchen to a full home or commercial interior.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="portfolio-card group !aspect-[4/3]"
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
              <h2 className="mt-1 text-lg text-white">{service.title}</h2>
              <p className="mt-1 text-sm text-white/70">{service.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
