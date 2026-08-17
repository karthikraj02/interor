import { Navbar } from "@/components/layout/Navbar";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionRoot } from "@/components/layout/MotionRoot";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { Process } from "@/components/process/Process";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { getSiteConfig } from "@/lib/site-config";

export default function Home() {
  const { businessName, phoneDisplay, telHref, whatsappHref, instagramUrl, youtubeUrl, facebookUrl } = getSiteConfig();

  return (
    <MotionRoot>
      <Navbar businessName={businessName} whatsappHref={whatsappHref} />
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <PortfolioSection />
        <Process />
        <ContactSection phoneDisplay={phoneDisplay} telHref={telHref} whatsappHref={whatsappHref} />
      </main>
      <Footer businessName={businessName} instagramUrl={instagramUrl} youtubeUrl={youtubeUrl} facebookUrl={facebookUrl} />
      <MobileActionBar telHref={telHref} whatsappHref={whatsappHref} />
    </MotionRoot>
  );
}
