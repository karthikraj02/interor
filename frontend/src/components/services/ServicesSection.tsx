import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="section-header-row">
        <div className="section-heading"><p className="section-label eyebrow-rule reveal">OUR SERVICES</p>
        <h2 className="section-title reveal">Spaces, shaped around the way you live.</h2>
        <p className="section-copy reveal">From one special room to a whole home, each detail is tailored to your needs and your sense of style.</p></div>
        <Link href="/services" className="text-link">See all services <span aria-hidden="true">→</span></Link>
      </div>
      <div className="service-grid">
        {services.slice(0, 6).map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="service-card reveal group"
          >
            <div className="service-card-image"><Image src={service.image} alt={`${service.title} interior design by Sai Interior Designers`} width={900} height={780} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 30vw" /></div>
            <div className="service-card-meta">
              <div><h3>{service.title}</h3><p>{service.summary}</p></div><span className="service-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="service-local-note"><span>Thoughtfully designed in Mangaluru &amp; Udupi</span><Link href="/services" className="text-link">Explore the full service menu <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}
