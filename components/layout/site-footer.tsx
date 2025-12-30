"use client";

import Link from "next/link";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/container";

type FooterLink = { label: string; href: string };

type SiteFooterProps = {
  homeHref: string;
  labels: {
    brandSrOnly: string;
    tagline: string;
    quickLinksHeading: string;
    servicesHeading: string;
    contactHeading: string;
    privacyPolicyLabel: string;
    termsOfServiceLabel: string;
    copyrightPrefix: string;
    copyrightSuffix: string;
  };
  links: {
    quickLinks: FooterLink[];
    services: FooterLink[];
    socialLinks: { key: "instagram" | "facebook" | "linkedin"; label: string; href: string }[];
    contactItems: { key: "mail" | "phone" | "location"; label: string; href: string }[];
    privacyPolicyHref: string;
    termsOfServiceHref: string;
  };
};

export const SiteFooter = ({ homeHref, labels, links }: SiteFooterProps) => {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const socialIconByKey = {
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
  } as const;

  const contactIconByKey = {
    mail: Mail,
    phone: Phone,
    location: MapPin,
  } as const;

  return (
    <footer id="contact" className="relative overflow-hidden bg-background">
      <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(to_right,transparent,color-mix(in_srgb,var(--accent)_30%,transparent),transparent)]" />

      <Container className="py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1"
          >
            <Link href={homeHref} className="flex items-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-(--accent) transition-transform duration-300 hover:scale-110">
                <span className="h-5 w-5 rounded-sm border-2 border-white" />
              </span>
              <span className="sr-only">{labels.brandSrOnly}</span>
            </Link>

            <p className="mt-6 mb-6 max-w-xs text-sm leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
              {labels.tagline}
            </p>

            <div className="flex items-center gap-3">
              {links.socialLinks.map((social) => {
                const Icon = socialIconByKey[social.key];
                return (
                  <motion.a
                    key={social.key}
                    href={social.href}
                    className="group relative rounded-lg border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] p-2.5 transition-all duration-300 hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-lg bg-(--accent) opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30" />
                    <Icon className="relative z-10 h-4 w-4 text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition-colors duration-300 group-hover:text-(--accent)" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center sm:items-start"
          >
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-foreground">
              {labels.quickLinksHeading}
            </h2>
            <ul className="flex flex-col items-center space-y-3 sm:items-start">
              {links.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="mr-2 translate-x-[-5px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 text-(--accent)">
                      →
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center sm:items-start"
          >
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-foreground">
              {labels.servicesHeading}
            </h2>
            <ul className="flex flex-col items-center space-y-3 sm:items-start">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="mr-2 translate-x-[-5px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 text-(--accent)">
                      →
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center sm:items-start"
          >
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-foreground">
              {labels.contactHeading}
            </h2>
            <ul className="flex flex-col items-center space-y-4 sm:items-start">
              {links.contactItems.map((item) => {
                const Icon = contactIconByKey[item.key];
                return (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="group flex items-start gap-3 text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-(--accent)" />
                      <span className="leading-relaxed">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 h-px w-full bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
            {labels.copyrightPrefix} {year} {labels.copyrightSuffix}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={links.privacyPolicyHref}
              className="text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {labels.privacyPolicyLabel}
            </Link>
            <Link
              href={links.termsOfServiceHref}
              className="text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {labels.termsOfServiceLabel}
            </Link>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--background)_70%,transparent))]" />
    </footer>
  );
};


