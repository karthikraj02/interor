import Link from "next/link";
import { GalleryGrid } from "./GalleryGrid";
import { gallery } from "@/data/gallery";

export function PortfolioSection() {
  const preview = gallery.slice(0, 12);

  return (
    <section id="portfolio" className="editorial-band portfolio-preview">
      <div className="section-wide">
      <div className="section-header-row"><div className="section-heading">
      <p className="section-label eyebrow-rule reveal">SELECTED PROJECTS</p>
      <h2 className="section-title reveal">Real homes, thoughtfully reimagined.</h2>
      <p className="section-copy reveal">A glimpse of the rooms and details we have brought to life across Mangaluru and Udupi.</p>
      </div><Link href="/projects" className="text-link">Explore the gallery <span aria-hidden="true">→</span></Link></div>

      <div className="reveal mt-10">
        <GalleryGrid images={preview} />
      </div>
      </div>
    </section>
  );
}
