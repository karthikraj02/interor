import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <p className="section-label eyebrow-rule reveal">CLIENT FEEDBACK</p>
      <h2 className="section-title reveal">Hear from our clients.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="glass-card reveal rounded-2xl p-7">
            <blockquote className="text-[var(--text-secondary)]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5">
              <span className="block text-[var(--text-primary)]">{testimonial.name}</span>
              <span className="text-sm text-[var(--text-secondary)]">{testimonial.location}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
