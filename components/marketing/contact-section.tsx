"use client";

import type { ComponentProps } from "react";

import { motion, useReducedMotion } from "motion/react";

import { ContactForm } from "@/components/marketing/contact-form";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type ContactSectionProps = {
  id?: string;
  className?: string;
  copy: {
    badge: string;
    title: string;
    description: string;
  };
  formCopy: ComponentProps<typeof ContactForm>["copy"];
};

export const ContactSection = ({ id = "contact", className, copy, formCopy }: ContactSectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id={id} className={cn("relative w-full overflow-hidden bg-background pt-8 pb-16 md:pt-12 md:pb-24 scroll-mt-20 md:scroll-mt-24", className)}>
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5">
            <motion.span
              className="h-2 w-2 rounded-full bg-(--accent)"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">{copy.badge}</span>
          </div>
          <h2 className="mb-4 text-balance text-[clamp(36px,6vw,56px)] font-normal tracking-[-0.02em] text-foreground leading-[1.1]">
            {copy.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {copy.description}
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_55%,transparent)] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-sm md:p-8">
            <ContactForm copy={formCopy} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};


