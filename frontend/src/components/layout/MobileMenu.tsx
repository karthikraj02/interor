"use client";

import { useEffect, useRef } from "react";
import type { NavItem } from "@/types/content";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  whatsappHref?: string;
};

/**
 * Accessible mobile navigation panel: locks body scroll while open, traps
 * focus within the panel, closes on Escape, and restores focus to the
 * trigger button on close (handled by the caller returning focus itself).
 */
export function MobileMenu({ open, onClose, items, whatsappHref }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="border-t border-white/10 px-6 py-4 md:hidden"
    >
      {items.map((item) => (
        <a onClick={onClose} className="block py-2.5 text-lg" href={item.href} key={item.href}>
          {item.label}
        </a>
      ))}
      {whatsappHref && (
        <a onClick={onClose} href={whatsappHref} className="btn-primary mt-3 inline-block">
          Message on WhatsApp
        </a>
      )}
    </div>
  );
}
