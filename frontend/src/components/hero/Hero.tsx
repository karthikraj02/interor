import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="section-label eyebrow-rule">SAI INTERIOR DESIGNERS · SINCE 2015</p>
          <h1 className="hero-title">A home that feels <em>like you.</em></h1>
          <p className="hero-description">
            Thoughtful interiors, made for the way you live. We bring together considered design, enduring craft,
            and a personal touch across Mangaluru and Udupi.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Let&apos;s talk about your space <span aria-hidden="true">↗</span></a>
            <a href="#portfolio" className="text-link">Explore our work <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-note">
            <strong>800+</strong><span>spaces thoughtfully designed</span><span className="note-separator" aria-hidden="true" />
            <span>Serving Mangaluru &amp; Udupi</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="A completed bedroom interior by Sai Interior Designers">
          <div className="hero-photo">
            <Image src="/images/portfolio/project-10.jpeg" alt="Warm modern bedroom with a botanical feature wall and soft neutral furnishings" fill priority sizes="(max-width: 767px) 100vw, 58vw" />
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>10+</span><span>Years of thoughtful living</span></div>
        </div>
      </div>
    </section>
  );
}
