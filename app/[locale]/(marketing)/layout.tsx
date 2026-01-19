import type { ReactNode } from "react";

// import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Messages } from "@/i18n/messages";
import { getMessages } from "next-intl/server";

type MarketingLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const MarketingLayout = async ({ children, params }: MarketingLayoutProps) => {
  const { locale: rawLocale } = await params;
  const locale = rawLocale;
  const messages = (await getMessages()) as Messages;

  const withLocalePathname = ({ pathname }: { pathname: string }) => {
    const cleaned = pathname.startsWith("/") ? pathname : `/${pathname}`;
    return `/${locale}${cleaned}`;
  };

  const navItems = [
    { label: messages.navigation.nav.home, href: withLocalePathname({ pathname: "/#home" }) },
    { label: messages.navigation.nav.services, href: withLocalePathname({ pathname: "/#services" }) },
    { label: messages.navigation.nav.portfolio, href: withLocalePathname({ pathname: "/#portfolio" }) },
    { label: messages.navigation.nav.pricing, href: withLocalePathname({ pathname: "/#pricing" }) },
    { label: messages.navigation.nav.contact, href: withLocalePathname({ pathname: "/#contact" }) },
  ];

  return (
    <>
      {/* <AnnouncementBar copy={messages.ui.announcementBar} /> */}
      <SiteHeader
        navItems={navItems}
        homeHref={withLocalePathname({ pathname: "/#home" })}
        labels={{
          brandSrOnly: messages.ui.header.brandSrOnly,
          themeToggleAriaLabel: messages.ui.header.themeToggleAriaLabel,
          localeSwitcherAriaLabel: messages.ui.header.localeSwitcherAriaLabel,
          mobileNav: messages.ui.header.mobileNav,
        }}
      />
      <main>{children}</main>
      <SiteFooter
        homeHref={withLocalePathname({ pathname: "/#home" })}
        labels={{
          brandSrOnly: messages.ui.header.brandSrOnly,
          tagline: messages.ui.footer.tagline,
          quickLinksHeading: messages.ui.footer.quickLinksHeading,
          servicesHeading: messages.ui.footer.servicesHeading,
          contactHeading: messages.ui.footer.contactHeading,
          privacyPolicyLabel: messages.ui.footer.privacyPolicyLabel,
          termsOfServiceLabel: messages.ui.footer.termsOfServiceLabel,
          copyrightPrefix: messages.ui.footer.copyrightPrefix,
          copyrightSuffix: messages.ui.footer.copyrightSuffix,
        }}
        links={{
          quickLinks: navItems,
          services: [
            { label: messages.navigation.footerServices.itSupport, href: withLocalePathname({ pathname: "/#it-support" }) },
            { label: messages.navigation.footerServices.automation, href: withLocalePathname({ pathname: "/#automation" }) },
            { label: messages.navigation.footerServices.marketing, href: withLocalePathname({ pathname: "/#marketing" }) },
            { label: messages.navigation.footerServices.consulting, href: withLocalePathname({ pathname: "/#consulting" }) },
            { label: messages.navigation.footerServices.development, href: withLocalePathname({ pathname: "/#development" }) },
          ],
          socialLinks: [
            { key: "instagram", label: "Instagram", href: "https://www.instagram.com/easyprocess.it" },
          ],
          contactItems: [
            { key: "mail", label: "process.easy.agency@gmail.com", href: "mailto:process.easy.agency@gmail.com" },
            { key: "phone", label: "+374 93 45 47 75", href: "tel:+37493454775" },
          ],
          privacyPolicyHref: withLocalePathname({ pathname: "/privacy-policy" }),
          termsOfServiceHref: withLocalePathname({ pathname: "/terms-of-service" }),
        }}
      />
    </>
  );
};

export default MarketingLayout;


