import type { ReactNode } from "react";
import { getSiteConfig } from "@/lib/site-config";
import { Footer } from "@/components/footer/Footer";
import { MobileActionBar } from "./MobileActionBar";
import { MotionRoot } from "./MotionRoot";
import { Navbar } from "./Navbar";

export function SiteFrame({ children }: { children: ReactNode }) {
  const { businessName, telHref, whatsappHref, instagramUrl, youtubeUrl, facebookUrl } = getSiteConfig();

  return (
    <MotionRoot>
      <Navbar businessName={businessName} whatsappHref={whatsappHref} />
      {children}
      <Footer businessName={businessName} instagramUrl={instagramUrl} youtubeUrl={youtubeUrl} facebookUrl={facebookUrl} />
      <MobileActionBar telHref={telHref} whatsappHref={whatsappHref} />
    </MotionRoot>
  );
}
