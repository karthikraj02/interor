"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { MobileMenu } from "./MobileMenu";
import type { NavItem } from "@/types/content";

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  businessName: string;
  whatsappHref?: string;
};

export function Navbar({ businessName, whatsappHref }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };
  const visibleNavItems = navItems.map((item) => ({
    ...item,
    href: pathname === "/" ? item.href : `/${item.href}`,
  }));

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link href="/#home" className="brand-mark">
          <Image
            src="/images/logo.png"
            alt={businessName}
            width={140}
            height={70}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <div className="nav-links hidden md:flex">
          {visibleNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="menu-link">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "☼" : "◐"}
          </button>
          {whatsappHref && (
            <a href={whatsappHref} className="btn-primary desktop-contact hidden sm:inline-flex">
              Book a consultation
            </a>
          )}
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((value) => !value)}
            className="icon-button md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={closeMenu} items={visibleNavItems} whatsappHref={whatsappHref} />
    </header>
  );
}
