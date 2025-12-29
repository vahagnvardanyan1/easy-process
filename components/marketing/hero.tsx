"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { FloatingCardItem } from "@/content/marketing";
import { floatingCards } from "@/content/marketing";
import { cn } from "@/lib/utils/cn";

type HeroProps = {
  className?: string;
  cards?: FloatingCardItem[];
};

const getEnterDelaySeconds = ({ id }: { id: number }) => {
  // React app used `Math.random() * 0.5` on mount; we make it deterministic per card.
  const bucket = Math.abs(id * 37) % 50; // 0..49
  return bucket / 100;
};

export const Hero = ({ className, cards = floatingCards }: HeroProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const prefersReducedMotion = useReducedMotion();

  const cardDepthMap = useMemo(() => {
    return new Map(cards.map((card, index) => [card.id, (index + 1) / (cards.length + 1)]));
  }, [cards]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const maxTranslate = 18;
      const xPx = currentX * maxTranslate;
      const yPx = currentY * maxTranslate;

      for (const [id, el] of cardRefs.current.entries()) {
        const depth = cardDepthMap.get(id) ?? 0.5;
        const dx = xPx * depth;
        const dy = yPx * depth;
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetX = (x - 0.5) * 2;
      targetY = (y - 0.5) * 2;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, [cardDepthMap]);

  return (
    <section
      ref={(node) => {
        rootRef.current = node;
      }}
      id="home"
      className={cn("relative min-h-screen overflow-hidden bg-background scroll-mt-20 sm:scroll-mt-24", className)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="h-full w-full bg-grid" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="h-full w-full bg-grid-dots" />
      </div>
      <div className="pointer-events-none absolute inset-0 hero-fade" />
      <div className="pointer-events-none absolute inset-0 hero-sweep" />

      <div className="pointer-events-none absolute inset-0 z-20">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            ref={(node) => {
              if (!node) {
                cardRefs.current.delete(card.id);
                return;
              }
              cardRefs.current.set(card.id, node);
            }}
            className={cn("absolute opacity-70 md:opacity-100", card.className)}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: { duration: 0.8, delay: getEnterDelaySeconds({ id: card.id }) },
                    scale: { duration: 0.8, delay: getEnterDelaySeconds({ id: card.id }) },
                    ease: "easeOut",
                  }
            }
          >
            <div className="float-y rounded-2xl border border-border bg-[color-mix(in_srgb,var(--background)_35%,transparent)] shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="relative h-[clamp(100px,18vw,200px)] w-[clamp(140px,25vw,280px)] overflow-hidden rounded-2xl">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 180px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.22))]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-30 flex min-h-screen items-center">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="mb-6 text-balance text-[clamp(48px,8vw,96px)] font-normal tracking-[-0.02em] text-foreground leading-[1.1]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Your partner for digital
              <br />
              automation
            </motion.h1>
            <motion.p
              className="mx-auto mb-12 max-w-2xl text-pretty text-[clamp(16px,2vw,20px)] font-normal leading-relaxed text-(--muted)"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              We build systems that help businesses scale.
              <br />
              Automation, IT solutions, and marketing — all in one place.
            </motion.p>

            <motion.div
              className="mt-12 flex items-center justify-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button asChild className="px-10 py-4">
                <a href="#pricing">
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
};


