import { aboutIntro, stats, values } from "@/data/site";

export function About() {
  return (
    <section id="about" className="editorial-band">
      <div className="section-wide">
      <div className="intro-grid">
        <div><p className="section-label eyebrow-rule reveal">OUR APPROACH</p><h2 className="section-title reveal">A little more you in every room.</h2></div>
        <p className="intro-copy reveal">{aboutIntro}</p>
      </div>

      <div className="stats-row">
        {stats.map((stat) => (
          <div key={stat.label} className="reveal">
            <p className="stat-figure">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="value-grid">
        {values.map((value) => (
          <article key={value.title} className="value-note reveal"><h3>{value.title}</h3><p>{value.text}</p></article>
        ))}
      </div>
      </div>
    </section>
  );
}
