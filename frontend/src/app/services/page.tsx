import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { SiteFrame } from "@/components/layout/SiteFrame";

export const metadata = {
  title: "Services",
  description:
    "Interior design services from Sai Interior Designers — modular kitchens, wardrobes, living rooms, bedrooms, pooja rooms, false ceilings, and more across Mangaluru and Udupi.",
};

export default function Services() {
  return (
    <SiteFrame><main className="section">
      <p className="section-label">SERVICES</p>
      <h1 className="section-title">Design services</h1>
      <p className="section-copy">
        Custom solutions for every budget — from a single modular kitchen to a full home or commercial interior.
      </p>
      <div className="service-grid">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="service-card group"
          >
            <div className="service-card-image"><Image
              src={service.image}
              alt={`${service.title} interior design by Sai Interior Designers`}
              width={900}
              height={780}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            /></div>
            <div className="service-card-meta">
              <div><h2>{service.title}</h2><p>{service.summary}</p></div><span className="service-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </main></SiteFrame>
  );
}
