export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  coverImage?: string;
  area?: string;
};
