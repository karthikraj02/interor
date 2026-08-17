import { notFound } from "next/navigation";

const copy: Record<string, { title: string; text: string }> = {
  "privacy-policy": { title: "Privacy policy", text: "This page must be completed with the studio’s legal identity, contact details, data-retention period, and applicable jurisdiction before launch. Consultation details are used only to respond to the request and operate the client relationship." },
  terms: { title: "Terms of use", text: "This page must be reviewed and completed with business-specific terms before launch. Site content is for general information and does not create a contract, quotation, or design commitment." },
  "cookie-policy": { title: "Cookie policy", text: "This site currently uses only essential browser storage for theme preference. Add a consent mechanism before enabling non-essential analytics, advertising, or tracking cookies." },
};
export function generateStaticParams() { return Object.keys(copy).map((legal) => ({ legal })); }
export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) { const { legal } = await params; const page = copy[legal]; if (!page) notFound(); return <main className="section min-h-[70vh]"><p className="section-label">LEGAL</p><h1 className="section-title">{page.title}</h1><p className="section-copy">{page.text}</p></main>; }
