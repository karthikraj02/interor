import Link from "next/link";
import { GalleryGrid } from "@/components/portfolio/GalleryGrid";
import { gallery } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
  description:
    "Completed interior design projects by Sai Interior Designers across Mangaluru and Udupi — homes, modular kitchens, and commercial spaces.",
};

export default function Projects() {
  return (
    <main className="section">
      <p className="section-label">PROJECTS</p>
      <h1 className="section-title">Project gallery</h1>
      <p className="section-copy">
        A selection of completed interiors delivered by our team. For details on a specific project or space,
        get in touch.
      </p>
      <div className="mt-10">
        <GalleryGrid images={gallery} />
      </div>
      <Link href="/#contact" className="btn-primary mt-10 inline-block">
        Start your project
      </Link>
    </main>
  );
}
