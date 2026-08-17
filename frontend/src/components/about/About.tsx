const principles = [
  {
    title: "Listen first",
    text: "Every brief starts with your site, your routines, and how you actually want to live or work in the space.",
  },
  {
    title: "Design in detail",
    text: "Layouts, materials, and lighting are resolved together, not decided one section at a time.",
  },
  {
    title: "Execute with rigor",
    text: "Site coordination and quality checks run through handover, not just the design phase.",
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <p className="section-label eyebrow-rule reveal">OUR APPROACH</p>
      <h2 className="section-title reveal">A collaborative design journey, from first idea to final detail.</h2>
      <p className="section-copy reveal">
        Every project is planned around your brief, site, lifestyle, and practical needs. Project imagery and
        business claims remain unpublished until supplied or verified.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <article key={principle.title} className="glass-card reveal rounded-2xl p-6">
            <h3 className="text-xl">{principle.title}</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
