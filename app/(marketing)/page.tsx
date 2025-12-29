import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { AiAssistant } from "@/components/marketing/ai-assistant";
import { ContactSection } from "@/components/marketing/contact-section";
import { FeaturesGrid } from "@/components/marketing/features-grid";
// import { LogoMarquee } from "@/components/marketing/logo-marquee";
// import { Pricing } from "@/components/marketing/pricing";
import { SectionHeader } from "@/components/marketing/section-header";

const Hero = dynamic(() => import("@/components/marketing/hero").then((m) => m.Hero));
const ServicesCarousel = dynamic(() => import("@/components/marketing/services-carousel").then((m) => m.ServicesCarousel));

export const metadata: Metadata = {
  title: "Automation Agency",
  description: "We build systems that help businesses scale—automation, IT solutions, and marketing.",
  alternates: {
    canonical: "/",
  },
};

const MarketingPage = () => {
  return (
    <>
      <Hero />
      {/* <LogoMarquee /> */}
      <ServicesCarousel />

      <SectionHeader
        id="portfolio"
        eyebrow="Portfolio"
        title="Examples of Our Work"
        description="Explore recent projects and discover how we help teams transform their digital presence through pragmatic, premium solutions."
      />

      <FeaturesGrid />
      {/* <Pricing /> */}
      <AiAssistant />
      <ContactSection />
    </>
  );
};

export default MarketingPage;


