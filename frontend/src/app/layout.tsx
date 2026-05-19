import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sai Interior Designers | Luxury Interior Design in Mangalore & Bangalore",
  description:
    "Sai Interior Designers creates cinematic luxury interiors in Mangalore and Bangalore with premium materials, 3D previews, and end-to-end execution.",
  keywords: [
    "Luxury interior design",
    "Home interiors Bangalore",
    "Interior designers Mangalore",
    "Modular kitchen design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
