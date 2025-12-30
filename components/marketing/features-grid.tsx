import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type FeaturesGridProps = {
  id?: string;
  className?: string;
  items: {
    id: string;
    title: string;
    description: string;
    image: { src: string; alt: string };
  }[];
};

export const FeaturesGrid = ({ id = "features", className, items }: FeaturesGridProps) => {
  return (
    <section id={id} className={cn("relative w-full bg-[var(--background)] py-16 md:py-24 scroll-mt-20 sm:scroll-mt-24", className)}>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 70}>
              <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_55%,transparent)] shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};


