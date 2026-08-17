import Link from "next/link";

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
  return (
    <footer className="site-footer px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 text-sm text-[var(--text-secondary)] md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-[var(--text-primary)]">{businessName}</p>
          <p className="mt-3 max-w-xs">
            Interior design for homes and commercial spaces, from first concept through handover.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[.18em] text-[var(--text-secondary)]">EXPLORE</p>
          <Link className="footer-link" href="/services">
            Services
          </Link>
          <Link className="footer-link" href="/projects">
            Portfolio
          </Link>
          {instagramUrl && (
            <a className="footer-link" href={instagramUrl} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
          )}
          {youtubeUrl && (
            <a className="footer-link" href={youtubeUrl} target="_blank" rel="noreferrer noopener">
              YouTube
            </a>
          )}
          {facebookUrl && (
            <a className="footer-link" href={facebookUrl} target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
          )}
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
      <div className="mx-auto mt-10 flex max-w-7xl justify-between border-t border-white/10 pt-6 text-xs text-[var(--text-secondary)]">
        <div className="flex flex-col">
          <p>
            © {new Date().getFullYear()} {businessName}
          </p>
          <a
            href="https://beautiful-alpaca-6b1495.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-white/50 hover:text-white transition-colors"
          >
            All rights reserved. Designed and developed by Dev from Neonation.
          </a>
        </div>
        <p>All project imagery, when published, is verified original work.</p>
      </div>
    </footer>
  );
}
