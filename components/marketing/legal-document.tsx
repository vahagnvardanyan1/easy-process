import type { ReactNode } from "react";

import type { LegalDocument as LegalDocumentType } from "@/lib/legal/types";

type LegalDocumentProps = {
  document: LegalDocumentType;
  footer?: ReactNode;
};

export const LegalDocument = ({ document, footer }: LegalDocumentProps) => {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {document.title}
        </h1>
        <p className="text-sm text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
          Last updated: {document.lastUpdated}
        </p>
        <div className="space-y-3 text-base leading-relaxed text-[color-mix(in_srgb,var(--foreground)_75%,transparent)]">
          {document.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {document.sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            <div className="space-y-3 text-base leading-relaxed text-[color-mix(in_srgb,var(--foreground)_75%,transparent)]">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-[color-mix(in_srgb,var(--foreground)_75%,transparent)]">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {footer ? <div className="mt-12">{footer}</div> : null}
    </article>
  );
};


