import Image from "next/image";
import type { GalleryImage } from "@/types/content";

type GalleryGridProps = {
  images: GalleryImage[];
};

/**
 * Masonry-style gallery using CSS multi-column layout so portrait and
 * landscape project photos sit together without cropping.
 */
export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
      {images.map((image) => (
        <div
          key={image.src}
          className="mb-4 overflow-hidden rounded-xl border border-white/10 break-inside-avoid"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={1000}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
