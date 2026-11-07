import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { getSiteConfig } from "@/lib/site-config";

type LegalSection = { title: string; paragraphs: string[] };

const pages: Record<string, { title: string; intro: string; sections: LegalSection[] }> = {
  "privacy-policy": {
    title: "Privacy policy",
    intro: "This policy explains what information Sai Interior Designers receives when you contact us through this website and how we use it to respond to your enquiry.",
    sections: [
      { title: "Information you provide", paragraphs: ["When you request a consultation, we ask for your name, phone number, email address, location, project and property type, budget range, and a description of your project. You may also provide an approximate area and preferred start date. Please leave optional fields blank if you do not want to share that information."] },
      { title: "How we use your information", paragraphs: ["We use enquiry details to respond to you, understand the project you have in mind, arrange follow-up conversations, and manage the request within our studio. If email notifications are enabled, the website sends the enquiry to the studio and sends you a receipt message. We may also use technical information needed to operate, secure, and troubleshoot the website."] },
      { title: "Where enquiry details go", paragraphs: ["Enquiries submitted through the form are sent to the website's configured service and stored in the studio's enquiry system so the team can follow up. The site may also send enquiry details through configured email services. If WhatsApp is configured, after form submission your browser may open a prepared WhatsApp message containing details you entered. Review that message before sending it. WhatsApp processes information under its own terms and privacy policy.", "We do not use the enquiry form to sell your personal information. The website currently has no analytics or advertising tracker integration in its application code. Infrastructure and communication providers may process information as needed to provide their services."] },
      { title: "How long we keep it", paragraphs: ["The enquiry system does not currently have an automatic deletion schedule. We keep enquiry records in the studio's systems for follow-up and business recordkeeping, and delete them when they are no longer needed, subject to applicable recordkeeping requirements."] },
      { title: "Your choices and requests", paragraphs: ["You can choose not to submit the form, leave optional fields blank, or contact us directly instead. To ask us to correct or delete enquiry information, or to withdraw consent for follow-up, contact the studio using the details below. We may need to retain some information where required for legitimate business records or by law."] },
      { title: "Keeping information safe", paragraphs: ["We use the website and business systems to handle enquiries, but no online transmission or storage method can be guaranteed completely secure. Please do not include payment-card details, passwords, government identification numbers, or other highly sensitive information in the enquiry form."] },
      { title: "Updates and contact", paragraphs: ["We may update this policy when the website or enquiry process changes. The latest version will appear on this page. For privacy questions or requests, contact Sai Interior Designers at the email address or phone number shown on this website."] },
    ],
  },
  terms: {
    title: "Terms of use",
    intro: "Welcome to the Sai Interior Designers website. These terms apply when you browse this site or send us an enquiry. By using the site, you agree to use it lawfully and in keeping with these terms.",
    sections: [
      { title: "About the website", paragraphs: ["This website introduces the interior design services offered by Sai Interior Designers in Mangaluru and Udupi and provides a way to contact the studio. Service descriptions, project photographs, and other materials are provided to help visitors understand our work. Each project depends on its site conditions, requirements, materials, availability, and agreed scope."] },
      { title: "Enquiries, estimates, and project agreements", paragraphs: ["Sending a contact form, email, or message is a request for information or a conversation. It does not by itself book a project, confirm availability, set a price, or create a design or construction contract. Any estimate, scope, timeline, payment schedule, materials, responsibilities, and project-specific terms will be confirmed separately in writing between you and the studio before work begins.", "Please check a written proposal carefully and raise any questions before accepting it. If a signed proposal or separate service agreement conflicts with these website terms about a particular project, the project document governs that project."] },
      { title: "Using this site", paragraphs: ["You may browse the site and contact us for lawful personal or business purposes. Do not misuse the site, interfere with its operation, attempt to access restricted systems, submit malicious code, or use another person's information without permission. Keep any information you submit accurate and limited to what is needed for your enquiry."] },
      { title: "Website content and project images", paragraphs: ["Unless a credit or separate notice says otherwise, the text, logo, design, and project images on this site are owned by or used with permission by Sai Interior Designers. You may view them for personal information about the studio. Do not copy, republish, sell, or modify site materials without the relevant rights holder's written permission. A project image does not promise that the same outcome, materials, price, or layout will be suitable or available for another project."] },
      { title: "External services and links", paragraphs: ["This site may link to social networks or open WhatsApp to help you contact us. Those services are operated by third parties and have their own terms and privacy practices. The studio does not control third-party sites or services. Review the details in any prepared WhatsApp message before choosing to send it."] },
      { title: "Availability and legal rights", paragraphs: ["We aim to keep the site useful and current, but pages, images, and links may change and the site may occasionally be unavailable. Website information is general and is not a substitute for a project-specific written proposal or agreement. These terms do not remove consumer protections or other rights that applicable law does not allow a business to exclude."] },
      { title: "Changes and contact", paragraphs: ["We may update these terms as the website or services change. The current version will be published on this page. Questions about these terms can be sent to Sai Interior Designers using the contact details on this website."] },
    ],
  },
  "cookie-policy": {
    title: "Cookie policy",
    intro: "This website uses a small amount of browser storage to remember your appearance preference and, for studio administrators, to maintain a sign-in session.",
    sections: [
      { title: "Appearance preference", paragraphs: ["When you change the light or dark appearance setting, the site stores that choice in your browser's local storage under the key theme-preference. This is browser storage, not a tracking cookie. It is used only to restore your chosen appearance on a later visit and remains on your device until you clear it or the site replaces the preference."] },
      { title: "Administrator sign-in", paragraphs: ["When an authorised studio administrator signs in, the admin service sets an interior_admin session cookie so protected administration pages can recognise that session. It is marked HTTP-only and SameSite strict, uses the secure flag in production, and expires after eight hours. It is used for administration and is not used to track public website visitors."] },
      { title: "Analytics and advertising", paragraphs: ["The website's application code currently does not include analytics or advertising trackers. If that changes, this policy should be updated to explain the tools and choices available before they are used."] },
      { title: "Managing browser storage", paragraphs: ["You can remove local storage and cookies through your browser's site-data or privacy settings. Clearing the appearance preference resets the site to its default light appearance. Clearing the admin cookie signs an administrator out; an administrator can also use the Log out control."] },
      { title: "Contact", paragraphs: ["For questions about browser storage on this website, contact Sai Interior Designers using the contact details shown on this site."] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  const page = pages[legal];
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const page = pages[legal];
  if (!page) notFound();

  const { businessName, email, emailHref, phoneDisplay, telHref } = getSiteConfig();

  return (
    <SiteFrame>
      <main className="legal-page">
        <header className="legal-heading">
          <p className="section-label eyebrow-rule">{businessName}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </header>
        <div className="legal-content">
          {page.sections.map((section, index) => (
            <section key={section.title} className="legal-section">
              <span className="legal-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}
          <aside className="legal-contact">
            <h2>Questions? We&apos;re here to help.</h2>
            {emailHref && <Link href={emailHref}>{email}</Link>}
            {telHref && <Link href={telHref}>{phoneDisplay}</Link>}
          </aside>
        </div>
      </main>
    </SiteFrame>
  );
}
