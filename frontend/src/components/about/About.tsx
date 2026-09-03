import { aboutIntro, stats, values } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section">
      <p className="section-label eyebrow-rule reveal">OUR APPROACH</p>
      <h2 className="section-title reveal">A collaborative design journey, from first idea to final detail.</h2>
      <p className="section-copy reveal">{aboutIntro}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card reveal rounded-2xl p-6">
            <p className="stat-figure">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {values.map((value) => (
          <article key={value.title} className="glass-card reveal rounded-2xl p-6">
            <h3 className="text-lg">{value.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{value.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
