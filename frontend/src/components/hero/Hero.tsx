import { ThreeBackground } from "@/components/animations/ThreeBackground";

export function Hero() {
  return (
    <section id="home" className="hero-section relative overflow-hidden px-6">
      <ThreeBackground />
      <div className="relative z-10 mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="section-label eyebrow-rule">SAI INTERIOR DESIGNERS · SINCE 2015</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">
            We design thoughtful, livable spaces.
          </h1>
          <p className="section-copy text-lg">
            Based in Mangalore, we specialise in residential interiors, commercial spaces, and modular kitchens
            that blend creativity, functionality, and timeless elegance. Every space tells a story — yours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Get a quotation
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
