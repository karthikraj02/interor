import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { SiteFrame } from "@/components/layout/SiteFrame";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <SiteFrame><main className="section">
      <p className="section-label eyebrow-rule">SERVICE · {service.category.toUpperCase()}</p>
      <h1 className="section-title">{service.title}, made for your home.</h1>
      <p className="section-copy">{service.description}</p>

      <div className="service-detail-grid">
        <div className="service-detail-image">
          <Image
            src={service.image}
            alt={`${service.title} interior design by Sai Interior Designers`}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div><p className="section-label">CONSIDERED DETAILS</p><ul className="service-feature-list">
          {service.features.map((feature) => (
            <li key={feature}>
              {feature}
            </li>
          ))}
        </ul></div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link className="btn-primary inline-block" href="/#contact">
          Discuss this service
        </Link>
        <Link className="btn-secondary inline-block" href="/services">
          All services
        </Link>
      </div>
    </main></SiteFrame>
  );
}
