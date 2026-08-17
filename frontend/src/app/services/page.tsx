import Link from "next/link";
import { services } from "@/data/services";
export const metadata = { title: "Services" };
export default function Services() { return <main className="section"><p className="section-label">SERVICES</p><h1 className="section-title">Design services</h1><div className="mt-10 grid gap-4 md:grid-cols-3">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="glass-card rounded-2xl p-6"><h2 className="text-xl">{service.title}</h2><p className="mt-3 text-sm text-[var(--text-secondary)]">{service.description}</p></Link>)}</div></main>; }
