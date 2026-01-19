"use client";

import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ContactDialog } from "@/components/marketing/contact-dialog";
import { ContactForm } from "@/components/marketing/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type HowItWorksProps = {
  id?: string;
  className?: string;
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
    cta: {
      label: string;
      href: string;
    };
  };
  contactDialog: {
    title: string;
    description: string;
  };
  contactFormCopy: ComponentProps<typeof ContactForm>["copy"];
};

export const HowItWorks = ({ id = "how-it-works", className, copy, contactDialog, contactFormCopy }: HowItWorksProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const totalSteps = copy.steps.length;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const lastStepObserverOptions = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: [0, 0.5, 1],
    };

    const completionObserverOptions = {
      root: null,
      rootMargin: "0px 0px 20% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-step-index"));
        
        if (entry.isIntersecting) {
          setActiveStep(index);
          setCompletedSteps((prev) => new Set([...prev, ...Array.from({ length: index }, (_, i) => i)]));
          
          // Auto-complete the last step after a delay when it becomes active
          if (index === totalSteps - 1) {
            setTimeout(() => {
              setCompletedSteps((prev) => new Set([...prev, index]));
            }, 800);
          }
        }
      });
    };

    const completionCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-step-index"));
        
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setCompletedSteps((prev) => new Set([...prev, index]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const lastStepObserver = new IntersectionObserver(observerCallback, lastStepObserverOptions);
    const completionObserver = new IntersectionObserver(completionCallback, completionObserverOptions);

    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        completionObserver.observe(ref);
        if (index === totalSteps - 1) {
          lastStepObserver.observe(ref);
        } else {
          observer.observe(ref);
        }
      }
    });

    return () => {
      observer.disconnect();
      lastStepObserver.disconnect();
      completionObserver.disconnect();
    };
  }, [copy.steps.length]);

  const progressPercentage = ((completedSteps.size + (activeStep !== null ? 1 : 0)) / copy.steps.length) * 100;

  return (
    <section id={id} className={cn("relative w-full bg-background py-8 md:py-24 scroll-mt-20 sm:scroll-mt-24", className)}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">
                {copy.eyebrow}
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.title}
            </h2>
          </Reveal>

          <Reveal delayMs={140}>
            <p className="mt-4 text-base leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] sm:mt-6 sm:text-lg md:text-xl">
              {copy.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-4xl md:mt-16">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)]">
              <div 
                className="h-full rounded-full bg-linear-to-r from-(--accent) to-[color-mix(in_srgb,var(--accent)_70%,transparent)] transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] md:text-sm">
              {completedSteps.size + (activeStep !== null && !completedSteps.has(activeStep) ? 1 : 0)} of {copy.steps.length} steps
            </p>
          </div>

          <div className="relative">
            {/* Vertical line connecting steps (hidden on mobile) */}
            <div className="absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-0.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] md:left-6 md:block">
              <div 
                className="w-full bg-linear-to-b from-(--accent) to-[color-mix(in_srgb,var(--accent)_70%,transparent)] transition-all duration-700 ease-out"
                style={{ height: `${progressPercentage}%` }}
              />
            </div>

            <div className="space-y-4 md:space-y-8">
              {copy.steps.map((step, index) => {
                const isActive = activeStep === index;
                const isCompleted = completedSteps.has(index);

                return (
                  <Reveal key={step.number} delayMs={200 + index * 80}>
                    <div 
                      ref={(el) => {
                        stepRefs.current[index] = el;
                      }}
                      data-step-index={index}
                      className="relative flex gap-3 md:gap-6"
                    >
                      {/* Step number circle */}
                      <div 
                        className={cn(
                          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background shadow-lg transition-all duration-500 md:h-12 md:w-12",
                          isActive && "scale-110 border-(--accent) shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]",
                          isCompleted && "border-(--accent) bg-(--accent)",
                          !isActive && !isCompleted && "border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-background md:h-6 md:w-6" />
                        ) : (
                          <span 
                            className={cn(
                              "text-base font-bold transition-colors duration-500 md:text-lg",
                              isActive && "text-(--accent)",
                              !isActive && "text-[color-mix(in_srgb,var(--accent)_60%,transparent)]"
                            )}
                          >
                            {step.number}
                          </span>
                        )}
                      </div>

                      {/* Step content */}
                      <div 
                        className={cn(
                          "group flex-1 rounded-xl border backdrop-blur-sm transition-all duration-500 md:rounded-2xl",
                          "focus-within:outline-none focus-within:ring-2 focus-within:ring-(--accent) focus-within:ring-offset-2 focus-within:ring-offset-background",
                          isActive && [
                            "border-[color-mix(in_srgb,var(--accent)_50%,transparent)]",
                            "bg-[color-mix(in_srgb,var(--accent)_8%,var(--background))]",
                            "shadow-[0_12px_40px_rgba(0,0,0,0.15),0_0_30px_rgba(var(--accent-rgb),0.1)]",
                            "scale-[1.02]",
                            "md:scale-[1.01]"
                          ],
                          isCompleted && [
                            "border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
                            "bg-[color-mix(in_srgb,var(--accent)_5%,var(--background))]",
                            "shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                          ],
                          !isActive && !isCompleted && [
                            "border-border",
                            "bg-[color-mix(in_srgb,var(--background)_55%,transparent)]",
                            "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                            "hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)]",
                            "hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
                            "hover:scale-[1.01]",
                            "md:hover:translate-y-[-2px]"
                          ],
                          "p-4 md:p-6"
                        )}
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0 transition-all duration-500 md:mt-1 md:h-5 md:w-5",
                              isActive && "scale-110 text-(--accent)",
                              isCompleted && "text-(--accent)",
                              !isActive && !isCompleted && "text-[color-mix(in_srgb,var(--accent)_50%,transparent)]"
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 
                              className={cn(
                                "text-base font-semibold leading-tight tracking-tight transition-colors duration-500 md:text-xl md:leading-tight",
                                isActive && "text-foreground",
                                !isActive && "text-[color-mix(in_srgb,var(--foreground)_85%,transparent)]"
                              )}
                            >
                              {step.title}
                            </h3>
                            <p 
                              className={cn(
                                "mt-1.5 text-sm leading-relaxed transition-colors duration-500 md:mt-2 md:text-base",
                                isActive && "text-[color-mix(in_srgb,var(--foreground)_70%,transparent)]",
                                !isActive && "text-[color-mix(in_srgb,var(--foreground)_60%,transparent)]"
                              )}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Reveal delayMs={600}>
          <div className="mt-8 text-center md:mt-12">
            <Button 
              size="lg" 
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="group w-full shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
            >
              {copy.cta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </Container>

      <ContactDialog
        open={isContactOpen}
        onOpenChange={({ open }) => setIsContactOpen(open)}
        copy={contactDialog}
        formCopy={contactFormCopy}
      />
    </section>
  );
};
