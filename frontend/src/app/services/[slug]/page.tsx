import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/data/services";

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
    <main className="section">
      <p className="section-label">SERVICE · {service.category.toUpperCase()}</p>
      <h1 className="section-title">{service.title}</h1>
      <p className="section-copy">{service.description}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={service.image}
            alt={`${service.title} interior design by Sai Interior Designers`}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="glass-card rounded-xl p-4 text-sm text-[var(--text-secondary)]">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link className="btn-primary inline-block" href="/#contact">
          Discuss this service
        </Link>
        <Link className="btn-secondary inline-block" href="/services">
          All services
        </Link>
      </div>
    </main>
  );
}
