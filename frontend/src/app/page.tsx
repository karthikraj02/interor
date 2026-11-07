import { SiteFrame } from "@/components/layout/SiteFrame";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ServicesSection } from "@/components/services/ServicesSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { Process } from "@/components/process/Process";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <SiteFrame>
      <main>
        <Hero />
        <About />
        <ServicesSection />
        <PortfolioSection />
        <Process />
        <Testimonials />
        <ContactSection />
      </main>
    </SiteFrame>
  );
}
