import { ThreeBackground } from "@/components/animations/ThreeBackground";

export function Hero() {
  return (
    <section id="home" className="hero-section relative overflow-hidden px-6">
      <ThreeBackground />
      <div className="relative z-10 mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="section-label eyebrow-rule">INTERIORS, DESIGNED AROUND YOU</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            Thoughtful spaces with a quiet sense of luxury.
          </h1>
          <p className="section-copy text-lg">
            Start a conversation with our design team about your home or commercial interior project — from first
            sketch to final detail.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Plan your project
            </a>
            <a href="#portfolio" className="btn-secondary">
              See our work
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden>
          <div className="hero-orb" />
        </div>
      </div>
    </section>
  );
}
