import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { AiAssistant } from "@/components/marketing/ai-assistant";
import { ContactSection } from "@/components/marketing/contact-section";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SectionHeader } from "@/components/marketing/section-header";
import { features } from "@/content/features";
import { aiRoles, floatingCards, services } from "@/content/marketing";
import type { Messages } from "@/i18n/messages";
import { getMessages } from "next-intl/server";
import { LogoMarquee } from "@/components/marketing/logo-marquee";
import { Pricing } from "@/components/marketing/pricing";

const Hero = dynamic(() => import("@/components/marketing/hero").then((m) => m.Hero));
const ServicesCarousel = dynamic(() => import("@/components/marketing/services-carousel").then((m) => m.ServicesCarousel));

type MarketingPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: MarketingPageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = rawLocale;
  const messages = (await getMessages()) as Messages;

  return {
    title: messages.ui.marketingPage.meta.title,
    description: messages.ui.marketingPage.meta.description,
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: messages.ui.marketingPage.meta.title,
      description: messages.ui.marketingPage.meta.description,
      images: [
        {
          url: "/images/image4.png",
          width: 1200,
          height: 630,
          alt: messages.ui.marketingPage.meta.title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.ui.marketingPage.meta.title,
      description: messages.ui.marketingPage.meta.description,
      images: ["/images/image4.png"],
    },
  };
};

const MarketingPage = async ({ params }: MarketingPageProps) => {
  void params;
  const messages = (await getMessages()) as Messages;

  const cardsById = new Map(messages.content.marketing.floatingCards.map((c) => [c.id, c]));
  const cards = floatingCards.map((card) => ({
    ...card,
    alt: cardsById.get(card.id)?.alt ?? "",
  }));

  const servicesById = new Map(messages.content.marketing.services.map((s) => [s.id, s]));
  const serviceItems = services.map((s) => {
    const t = servicesById.get(s.id);
    return {
      ...s,
      title: t?.title ?? "",
      description: t?.description ?? "",
      image: {
        ...s.image,
        alt: t?.imageAlt ?? "",
      },
    };
  });

  const rolesById = new Map(messages.content.marketing.aiRoles.map((r) => [r.id, r]));
  const roleItems = aiRoles.map((r) => ({
    ...r,
    label: rolesById.get(r.id)?.label ?? "",
  }));

  const featuresById = new Map(messages.content.features.items.map((f) => [f.id, f]));
  const featureItems = features.map((f) => {
    const t = featuresById.get(f.id);
    return {
      ...f,
      title: t?.title ?? "",
      description: t?.description ?? "",
      image: {
        ...f.image,
        alt: t?.imageAlt ?? "",
      },
    };
  });

  return (
    <>
      <Hero
        copy={messages.ui.marketingPage.hero}
        cards={cards}
        contactDialog={messages.ui.marketingPage.contact}
        contactFormCopy={messages.ui.contactForm}
      />
      <LogoMarquee copy={messages.ui.marketingPage.logoMarquee} />
      
      <ServicesCarousel copy={messages.ui.marketingPage.services} items={serviceItems} />

      <SectionHeader
        id="portfolio"
        eyebrow={messages.ui.marketingPage.portfolio.eyebrow}
        title={messages.ui.marketingPage.portfolio.title}
        description={messages.ui.marketingPage.portfolio.description}
      />

      <FeaturesGrid items={featureItems} />
      <HowItWorks 
        copy={messages.ui.marketingPage.howItWorks}
        contactDialog={messages.ui.marketingPage.contact}
        contactFormCopy={messages.ui.contactForm}
      />
      <Pricing copy={messages.ui.marketingPage.pricing} />
      <AiAssistant copy={messages.ui.marketingPage.aiAssistant} roles={roleItems} />
      <ContactSection copy={messages.ui.marketingPage.contact} formCopy={messages.ui.contactForm} />
    </>
  );
};

export default MarketingPage;


