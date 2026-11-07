import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const featured = testimonials.slice(0, 3);
  return (
    <section id="testimonials" className="editorial-band">
      <div className="section-wide">
        <div className="section-header-row"><div><p className="section-label eyebrow-rule reveal">KIND WORDS</p><h2 className="section-title reveal">The best part is hearing, “this feels like us.”</h2></div><div className="rating-lockup"><span>★★★★★</span><small>Made with care, remembered with love</small></div></div>
        <div className="testimonial-grid">
          {featured.map((testimonial) => (
            <figure key={testimonial.name} className="testimonial-card reveal">
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption>{testimonial.name}<span>{testimonial.location}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
