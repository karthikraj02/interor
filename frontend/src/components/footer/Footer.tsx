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
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/#home" className="inline-block"><Image src="/images/logo.png" alt={businessName} width={160} height={80} /></Link>
          <p>Top interior designers in Mangaluru and Udupi. Personal, thoughtful spaces from the first idea through handover, since 2015.</p>
        </div>
        <div className="footer-column"><h2>EXPLORE</h2><Link className="footer-link" href="/#about">About us</Link><Link className="footer-link" href="/services">Services</Link><Link className="footer-link" href="/projects">Project gallery</Link><Link className="footer-link" href="/#contact">Contact</Link></div>
        <div className="footer-column"><h2>CONTACT</h2>{emailHref && <a className="footer-link" href={emailHref}>{email}</a>}{telHref && <a className="footer-link" href={telHref}>{phoneDisplay}</a>}{telSecondaryHref && <a className="footer-link" href={telSecondaryHref}>{phoneSecondary}</a>}{branches.map((branch) => <p key={branch.label}><strong>{branch.label}:</strong> {branch.address}</p>)}</div>
        <div className="footer-column"><h2>FOLLOW &amp; LEGAL</h2>{facebookUrl && <a className="footer-link" href={facebookUrl} target="_blank" rel="noreferrer noopener">Facebook</a>}{instagramUrl && <a className="footer-link" href={instagramUrl} target="_blank" rel="noreferrer noopener">Instagram</a>}{youtubeUrl && <a className="footer-link" href={youtubeUrl} target="_blank" rel="noreferrer noopener">YouTube</a>}{legalLinks.map((link) => <Link key={link.href} className="footer-link" href={link.href}>{link.label}</Link>)}</div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p><a href="https://beautiful-alpaca-6b1495.netlify.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Designed and developed by Dev from Neonation.</a></div>
    </footer>
  );
}
