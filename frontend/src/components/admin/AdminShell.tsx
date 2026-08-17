"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { adminLogout, adminMe } from "@/lib/admin-api";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin/leads" },
];

/**
 * Client-side gate for /admin/* pages: confirms the httpOnly admin session
 * cookie is valid by calling `/api/admin/me`, and redirects to the login
 * page otherwise. This is a UX convenience only — every admin API route is
 * independently protected server-side by `requireAdmin`, so this check is
 * not the actual security boundary.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"checking" | "ready">("checking");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let active = true;
    adminMe()
      .then((data) => {
        if (!active) return;
        setEmail(data.email);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
      });
    return () => {
      active = false;
    };
  }, [router, pathname]);

  if (status === "checking") {
    return (
      <main className="loading-screen">
        <p className="section-label">Checking session…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${pathname === item.href ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span>{email}</span>
            <button
              className="icon-button"
              onClick={() => adminLogout().finally(() => router.replace("/admin/login"))}
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
