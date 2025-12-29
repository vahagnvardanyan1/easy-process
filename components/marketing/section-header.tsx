import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  align?: "left" | "center";
  className?: string;
};

export const SectionHeader = ({ eyebrow, title, description, id, align = "center", className }: SectionHeaderProps) => {
  return (
    <section id={id} className={cn("py-12 md:py-20 scroll-mt-20 sm:scroll-mt-24", className)}>
      <Container>
        <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left")}>
          {eyebrow ? (
            <Reveal>
              <div className="mb-4 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-4 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {eyebrow}
                </span>
              </div>
            </Reveal>
          ) : null}

          <Reveal delayMs={80}>
            <h2 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
              {title}
            </h2>
          </Reveal>

          {description ? (
            <Reveal delayMs={140}>
              <p className="mt-6 text-lg leading-relaxed text-[color-mix(in_srgb,var(--foreground)_65%,transparent)] md:text-xl">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
};


