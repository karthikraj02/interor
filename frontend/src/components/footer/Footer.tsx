import Image from "next/image";
import Link from "next/link";
import { branches } from "@/data/site";
import { getSiteConfig } from "@/lib/site-config";

type FooterProps = {
  businessName: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
};

const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Cookie policy", href: "/cookie-policy" },
];

export function Footer({ businessName, instagramUrl, youtubeUrl, facebookUrl }: FooterProps) {
  const { email, emailHref, phoneDisplay, telHref, phoneSecondary, telSecondaryHref } = getSiteConfig();

  return (
    <footer className="site-footer px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 text-sm text-[var(--text-secondary)] md:grid-cols-4">
        <div>
          <Link href="/#home" className="inline-block mb-3">
            <Image
              src="/images/logo.png"
              alt={businessName}
              width={160}
              height={80}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs">
            Top interior designers in Mangalore &amp; Udupi — residential interiors, commercial spaces, and
            modular kitchens, from first concept through handover. Serving since 2015.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">EXPLORE</p>
          <Link className="footer-link" href="/#about">About us</Link>
          <Link className="footer-link" href="/services">Services</Link>
          <Link className="footer-link" href="/projects">Full gallery</Link>
          <Link className="footer-link" href="/#contact">Contact us</Link>
          <div className="mt-2 flex gap-3">
            {facebookUrl && (
              <a className="footer-link" href={facebookUrl} target="_blank" rel="noreferrer noopener">Facebook</a>
            )}
            {instagramUrl && (
              <a className="footer-link" href={instagramUrl} target="_blank" rel="noreferrer noopener">Instagram</a>
            )}
            {youtubeUrl && (
              <a className="footer-link" href={youtubeUrl} target="_blank" rel="noreferrer noopener">YouTube</a>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">CONTACT</p>
          {emailHref && <a className="footer-link" href={emailHref}>{email}</a>}
          {telHref && <a className="footer-link" href={telHref}>{phoneDisplay}</a>}
          {telSecondaryHref && <a className="footer-link" href={telSecondaryHref}>{phoneSecondary}</a>}
          <div className="mt-2 space-y-2">
            {branches.map((branch) => (
              <p key={branch.label} className="max-w-xs">
                <span className="text-[var(--text-primary)]">{branch.label}:</span> {branch.address}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">LEGAL</p>
          {legalLinks.map((link) => (
            <Link key={link.href} className="footer-link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-1 border-t border-white/10 pt-6 text-xs text-[var(--text-secondary)] sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </p>
        <a
          href="https://beautiful-alpaca-6b1495.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 transition-colors hover:text-white"
        >
          Designed and developed by Dev from Neonation.
        </a>
      </div>
    </footer>
  );
}
