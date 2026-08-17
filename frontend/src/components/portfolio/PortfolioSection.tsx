import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="section">
      <p className="section-label eyebrow-rule reveal">PORTFOLIO</p>
      <h2 className="section-title reveal">Recent work, in the studio&apos;s own words.</h2>

      {projects.length === 0 ? (
        <div className="portfolio-empty reveal mt-10">
          <p className="font-display text-xl">Project gallery coming soon.</p>
          <p className="mx-auto mt-3 max-w-md text-sm">
            We publish only verified, real project photography — nothing here is a stock or placeholder image. Add
            entries to <code className="text-[var(--accent)]">src/data/projects.ts</code> once imagery and details
            are ready, and this section (and the individual project pages) will populate automatically.
          </p>
          <Link href="#contact" className="btn-secondary mt-6 inline-block">
            Ask about past projects
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="portfolio-card reveal group"
            >
              {project.coverImage && (
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — ${project.category} interior in ${project.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="portfolio-card-meta">
                <p className="text-xs tracking-[.18em] text-[var(--accent)]">{project.category.toUpperCase()}</p>
                <h3 className="mt-1 text-lg text-white">{project.title}</h3>
                <p className="text-sm text-white/70">{project.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
