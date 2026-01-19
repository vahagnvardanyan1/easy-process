"use client";

import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type PricingPlanCopy = {
  name: string;
  price: {
    currencySymbol: string;
    major: string;
    minorSup?: string;
  };
  benefitsCountLabel: string;
  benefits: string[];
};

type PricingProps = {
  id?: string;
  className?: string;
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    includedHeading: string;
    plans: PricingPlanCopy[];
  };
};

type PricingCardProps = {
  copy: PricingPlanCopy;
  includedHeading: string;
};

const PricingCard = ({ copy, includedHeading }: PricingCardProps) => {
  return (
    <div className="rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_55%,transparent)] p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-sm">
      <div className="text-sm font-semibold tracking-wide text-foreground/80">{copy.name}</div>

      <div className="mt-4 flex items-baseline justify-center gap-3">
        <span className="text-2xl font-semibold tracking-tight text-foreground">{copy.price.currencySymbol}</span>
        <span className="text-6xl font-semibold tracking-tight text-foreground leading-none">
          {copy.price.major}
          {copy.price.minorSup ? (
            <span className="align-super text-2xl tracking-tight text-foreground/80">{copy.price.minorSup}</span>
          ) : null}
        </span>
      </div>

      <div className="mt-6 inline-flex items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5">
        <span className="text-xs font-semibold tracking-wide text-(--accent)">{copy.benefitsCountLabel}</span>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[color-mix(in_srgb,var(--foreground)_70%,transparent)]">
          {includedHeading}
        </h3>

        <div className="mx-auto max-w-sm space-y-4 text-left">
          {copy.benefits.map((benefit) => (
            <div key={benefit} className="grid grid-cols-[20px_1fr] items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 text-(--accent)" />
              <span className="text-base font-medium text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Pricing = ({ id = "pricing", className, copy }: PricingProps) => {
  return (
    <section id={id} className={cn("relative w-full overflow-hidden bg-background py-16 md:py-24 scroll-mt-20 sm:scroll-mt-24", className)}>
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-12">
            <Reveal>
              <div className="mb-4 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">{copy.eyebrow}</span>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h2 className="text-balance text-[clamp(36px,6vw,56px)] font-normal tracking-[-0.02em] leading-[1.1] text-foreground">
                {copy.title}
              </h2>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-4 text-lg text-muted-foreground">{copy.description}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {copy.plans.map((plan, index) => (
              <Reveal key={plan.name} delayMs={index * 70}>
                <PricingCard copy={plan} includedHeading={copy.includedHeading} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};


