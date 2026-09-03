export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  category: string;
  /** Short line shown on the service card. */
  summary: string;
  /** Longer intro paragraph shown on the service detail page. */
  description: string;
  image: string;
  features: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ValueItem = {
  title: string;
  text: string;
};

export type Branch = {
  label: string;
  address: string;
};
