"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

import { BookCallDialog } from "@/components/marketing/book-call-dialog";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/content/marketing";
import { services } from "@/content/marketing";
import { useInterval } from "@/lib/hooks/use-interval";
import { cn } from "@/lib/utils/cn";

type ServicesCarouselProps = {
  items?: ServiceItem[];
  className?: string;
};

export const ServicesCarousel = ({ items = services, className }: ServicesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const prevIndex = useMemo(() => (currentIndex - 1 + items.length) % items.length, [currentIndex, items.length]);
  const nextIndex = useMemo(() => (currentIndex + 1) % items.length, [currentIndex, items.length]);

  const goTo = useCallback(({ index }: { index: number }) => setCurrentIndex(index), []);

  const goNext = useCallback(() => {
    setCurrentIndex((v) => (v + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((v) => (v - 1 + items.length) % items.length);
  }, [items.length]);

  useInterval({
    callback: goNext,
    delayMs: 5000,
  });

  const renderCard = ({ item, position }: { item: ServiceItem; position: "prev" | "current" | "next" }) => {
    const isCurrent = position === "current";

    return (
      <motion.div
        key={item.title}
        className="absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 px-4 md:max-w-lg lg:max-w-xl"
        aria-hidden={!isCurrent}
        style={{
          pointerEvents: isCurrent ? "auto" : "none",
        }}
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                x: position === "current" ? "0%" : position === "prev" ? "-75%" : "75%",
                scale: position === "current" ? 1 : 0.75,
              }
        }
        animate={{
          x: position === "current" ? "0%" : position === "prev" ? "-75%" : "75%",
          scale: position === "current" ? 1 : 0.75,
          opacity: position === "current" ? 1 : 0.3,
          zIndex: position === "current" ? 10 : 1,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
      >
        <div className="group relative overflow-hidden rounded-2xl border border-(--border) bg-[color-mix(in_srgb,var(--background)_55%,transparent)] shadow-[0_18px_55px_rgba(0,0,0,0.25)] backdrop-blur-sm">
          <div className="relative h-64 overflow-hidden md:h-80">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 640px, 90vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
          </div>

          <div className="p-8">
            <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br", item.accentClassName)}>
              <div className="h-7 w-7 rounded-md border border-[color-mix(in_srgb,var(--foreground)_30%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
            </div>

            <div className="mt-6 h-0.5 w-10 rounded-full bg-(--accent) shadow-[0_0_18px_rgba(74,144,226,0.45)] transition-all duration-500 group-hover:w-full" />

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] md:text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className={cn("relative w-full overflow-hidden bg-background py-12 md:py-20", className)}>
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="mb-4 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">2026 Vision</span>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Elevate Your Digital Excellence in 2026
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] md:text-xl">
            Partner with us to craft sophisticated digital solutions that drive measurable results and lasting impact.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <BookCallDialog>
              <Button
                size="lg"
                className="group relative w-full overflow-hidden bg-(--accent) px-6 text-sm font-semibold text-white hover:bg-(--accent)/90 sm:w-auto sm:px-8 sm:text-base"
              >
                Book a Call
                <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Button>
            </BookCallDialog>
            <Button
              size="lg"
              variant="secondary"
              className="w-full border-[color-mix(in_srgb,var(--accent)_45%,transparent)] px-6 text-sm font-semibold hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] sm:w-auto sm:px-8 sm:text-base"
              asChild
            >
              <a href="#portfolio">View Our Work</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-(--border) bg-[color-mix(in_srgb,var(--background)_65%,transparent)] text-foreground backdrop-blur-md transition hover:scale-105 hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex"
            aria-label="Previous service"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-(--border) bg-[color-mix(in_srgb,var(--background)_65%,transparent)] text-foreground backdrop-blur-md transition hover:scale-105 hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex"
            aria-label="Next service"
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className="relative h-[600px] md:h-[700px]">
            {renderCard({ item: items[prevIndex], position: "prev" })}
            {renderCard({ item: items[currentIndex], position: "current" })}
            {renderCard({ item: items[nextIndex], position: "next" })}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo({ index })}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                currentIndex === index ? "w-8 bg-(--accent) opacity-100" : "w-2 bg-[color-mix(in_srgb,var(--foreground)_55%,transparent)] opacity-50",
              )}
              aria-label={`Go to service ${index + 1}`}
              aria-current={currentIndex === index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};


