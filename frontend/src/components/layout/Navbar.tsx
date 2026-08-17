"use client";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-sm tracking-[.25em]">
          {businessName.toUpperCase()}
        </a>
        <div className="hidden gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="menu-link">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "☼" : "◐"}
          </button>
          {whatsappHref && (
            <a href={whatsappHref} className="btn-primary hidden sm:block">
              WhatsApp
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
      <MobileMenu open={menuOpen} onClose={closeMenu} items={navItems} whatsappHref={whatsappHref} />
    </header>
  );
}
