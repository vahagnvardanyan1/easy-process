"use client";

import { useCallback, useMemo, useState } from "react";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CreditsBillingCycle, StorageBillingCycle } from "@/content/pricing";
import { creditsCard, creditsRange, storageCard, storageRange } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";

type PricingProps = {
  id?: string;
  className?: string;
};

export const Pricing = ({ id = "pricing", className }: PricingProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [creditsBillingCycle, setCreditsBillingCycle] = useState<CreditsBillingCycle>("monthly");
  const [storageBillingCycle, setStorageBillingCycle] = useState<StorageBillingCycle>("monthly");
  const [creditsAmount, setCreditsAmount] = useState<number>(creditsRange.defaultValue);
  const [storageAmount, setStorageAmount] = useState<number>(storageRange.defaultValue);

  const creditsOptions = useMemo(
    () => [
      { value: "monthly" as const, label: "Monthly" },
      { value: "annual" as const, label: "Annual" },
      { value: "one-time" as const, label: "One-time" },
    ],
    [],
  );

  const storageOptions = useMemo(
    () => [
      { value: "monthly" as const, label: "Monthly" },
      { value: "annual" as const, label: "Annual" },
    ],
    [],
  );

  const onCreditsBillingCycleChange = useCallback(({ value }: { value: CreditsBillingCycle }) => {
    setCreditsBillingCycle(value);
  }, []);

  const onStorageBillingCycleChange = useCallback(({ value }: { value: StorageBillingCycle }) => {
    setStorageBillingCycle(value);
  }, []);

  const onCreditsBillingCycleValueChange = useCallback(
    (value: string) => {
      onCreditsBillingCycleChange({ value: value as CreditsBillingCycle });
    },
    [onCreditsBillingCycleChange],
  );

  const onStorageBillingCycleValueChange = useCallback(
    (value: string) => {
      onStorageBillingCycleChange({ value: value as StorageBillingCycle });
    },
    [onStorageBillingCycleChange],
  );

  const onCreditsAmountChange = useCallback((value: number[]) => {
    setCreditsAmount(value[0] ?? creditsRange.min);
  }, []);

  const onStorageAmountChange = useCallback((value: number[]) => {
    setStorageAmount(value[0] ?? storageRange.min);
  }, []);

  return (
    <section id={id} className={cn("relative w-full overflow-hidden bg-background py-16 md:py-24", className)}>
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-balance text-[clamp(36px,6vw,56px)] font-normal tracking-[-0.02em] text-foreground leading-[1.1]">
            Flexible Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Forget bloated subscriptions. Credits for generations, storage for what matters.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Buy once, subscribe, or go annual. It&apos;s a model built on trust, not tricks.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <Button asChild variant="secondary" className="px-6 py-3 transition-transform hover:scale-105">
            <a href="#pricing">
              Start with 2,000+
              <span aria-hidden="true">›</span>
            </a>
          </Button>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_55%,transparent)] p-8 shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-sm"
          >
            <h3 className="mb-2 text-xl font-medium tracking-tight text-foreground">{creditsCard.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{creditsCard.description}</p>

            <Tabs value={creditsBillingCycle} onValueChange={onCreditsBillingCycleValueChange} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                {creditsOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mb-4 text-center">
              <div className="mb-3 inline-flex rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-3 py-1 text-xs font-medium text-(--accent)">
                Most popular
              </div>
              <div className="text-3xl font-medium tracking-tight text-foreground">{creditsAmount.toLocaleString()} +</div>
            </div>

            <div className="mb-6">
              <Slider
                aria-label="Credits amount"
                min={creditsRange.min}
                max={creditsRange.max}
                step={creditsRange.step}
                value={[creditsAmount]}
                onValueChange={onCreditsAmountChange}
              />
            </div>

            <div className="mb-6">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-4xl font-medium tracking-tight text-foreground">$24</span>
                <span className="text-base text-muted-foreground line-through">$30</span>
                <span className="text-base text-muted-foreground">/mo</span>
              </div>
              <div className="text-sm text-(--accent)">20% volume discount</div>
            </div>

            <div className="mb-6 space-y-3">
              {creditsCard.features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              With a 20% volume discount, you&apos;re saving $6 on this credits plan every month!
            </p>
          </motion.article>

          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_55%,transparent)] p-8 shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-sm"
          >
            <h3 className="mb-2 text-xl font-medium tracking-tight text-foreground">{storageCard.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{storageCard.description}</p>

            <Tabs value={storageBillingCycle} onValueChange={onStorageBillingCycleValueChange} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                {storageOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mb-4 text-center">
              <div className="h-7" aria-hidden="true" />
              <div className="text-3xl font-medium tracking-tight text-foreground">{storageAmount} GB</div>
            </div>

            <div className="mb-6">
              <Slider
                aria-label="Storage amount"
                min={storageRange.min}
                max={storageRange.max}
                step={storageRange.step}
                value={[storageAmount]}
                onValueChange={onStorageAmountChange}
              />
            </div>

            <div className="mb-6">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-4xl font-medium tracking-tight text-foreground">Free</span>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              {storageCard.features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Make sure to check out our volume discounts. Annual plans get 2 free months of storage!
            </p>
          </motion.article>
        </div>
      </Container>
    </section>
  );
};


