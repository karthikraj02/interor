import Link from "next/link";
import { GalleryGrid } from "./GalleryGrid";
import { gallery } from "@/data/gallery";

export function PortfolioSection() {
  const preview = gallery.slice(0, 12);

  return (
    <section id="portfolio" className="section">
      <p className="section-label eyebrow-rule reveal">PORTFOLIO</p>
      <h2 className="section-title reveal">Recent work from across Mangaluru &amp; Udupi.</h2>
      <p className="section-copy reveal">
        A selection of completed interiors — homes, kitchens, and commercial spaces delivered by our team.
      </p>

      <div className="reveal mt-10">
        <GalleryGrid images={preview} />
      </div>

      <Link href="/projects" className="btn-secondary mt-8 inline-block">
        View full gallery
      </Link>
    </section>
  );
}
