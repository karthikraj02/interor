import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Sai Interior Designers";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Sai Interior Designers — top interior designers in Mangalore & Udupi since 2015. Residential interiors, commercial spaces, and modular kitchens that blend creativity, functionality, and timeless elegance.";

export const metadata: Metadata = {
  title: { default: `${businessName} — Interior Designers in Mangalore & Udupi`, template: `%s | ${businessName}` },
  description,
  metadataBase: new URL(siteUrl),
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  robots: { index: process.env.NODE_ENV === "production", follow: process.env.NODE_ENV === "production" },
  openGraph: {
    title: businessName,
    description,
    url: siteUrl,
    siteName: businessName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: businessName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${displayFont.variable} ${bodyFont.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          // Runs before paint to apply the stored/system theme and avoid a
          // flash of the wrong theme. No inline styles or secrets — reads
          // only a same-origin localStorage key this app itself writes.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme-preference");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
