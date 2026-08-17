import type { MetadataRoute } from "next";
import { services } from "@/data/services";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL; if (!base) return []; return ["", "/projects", "/services", "/privacy-policy", "/terms", "/cookie-policy", ...services.map((service) => `/services/${service.slug}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
