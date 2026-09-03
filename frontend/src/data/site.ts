import type { Branch, Stat, ValueItem } from "@/types/content";

/**
 * Business facts migrated from the studio's previous site
 * (saiinteriordesigners.in). Operating since 2015.
 */

export const stats: Stat[] = [
  { value: "150+", label: "Services" },
  { value: "800+", label: "Projects delivered" },
  { value: "60+", label: "Happy clients" },
  { value: "2015", label: "Serving since" },
];

export const values: ValueItem[] = [
  {
    title: "Innovation",
    text: "Embracing new ideas and technologies to deliver cutting-edge designs.",
  },
  {
    title: "Quality",
    text: "Using premium materials and meticulous craftsmanship in every project.",
  },
  {
    title: "Client focus",
    text: "Listening to and collaborating with clients to bring their vision to life.",
  },
  {
    title: "Sustainability",
    text: "Incorporating eco-friendly practices and materials for responsible design.",
  },
  {
    title: "Integrity",
    text: "Maintaining transparency, honesty, and professionalism throughout the process.",
  },
];

export const whyChooseUs: ValueItem[] = [
  { title: "20-year warranty", text: "Long-term assurance on our interior work and materials." },
  { title: "Latest technologies", text: "Modern machinery and methods for precise, durable results." },
  { title: "High-quality designs", text: "Considered layouts and finishes built to last." },
  { title: "Transparent pricing", text: "Clear, itemised quotations with no hidden costs." },
  { title: "Professional team", text: "Experienced designers, engineers, and site supervisors." },
  { title: "Award-winning", text: "A recognised interior design firm serving Mangalore and Udupi." },
];

export const branches: Branch[] = [
  {
    label: "Mangaluru",
    address: "Akshay Apt, Kuntikan Rd, Derebail, Mangaluru, Karnataka 575006",
  },
  {
    label: "Udupi",
    address: "Karavali Bypass, Near Shamini Hall, Ambalpady, Udupi, Karnataka 576103",
  },
];

export const aboutIntro =
  "At Sai Interior Designers, we believe every space tells a story — yours. Based in Mangalore, we specialise in residential interiors, commercial spaces, and modular kitchens that blend creativity, functionality, and timeless elegance. With over a decade of experience, our mission is to enrich lives through beautiful interiors — treating every project as a collaboration where you bring the vision and our team brings the execution.";
