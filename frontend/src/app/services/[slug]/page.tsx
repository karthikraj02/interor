import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export default async function Service({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound(); return <main className="section"><p className="section-label">SERVICE</p><h1 className="section-title">{service.title}</h1><p className="section-copy">{service.description}</p><Link className="btn-primary mt-8 inline-block" href="/#contact">Discuss this service</Link></main>; }
