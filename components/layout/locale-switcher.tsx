"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Locale } from "@/i18n/config";
import { localeFlags, localeNames, locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";

type LocaleSwitcherProps = {
  ariaLabel: string;
};

export const LocaleSwitcher = ({ ariaLabel }: LocaleSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale() as Locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={ariaLabel}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] transition hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] hover:text-foreground"
        >
          <span className="text-xl">{localeFlags[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((locale) => {
          const label = localeNames[locale];
          const flag = localeFlags[locale];
          return (
            <DropdownMenuItem
              key={locale}
              onSelect={() => {
                router.replace(
                  // @ts-expect-error -- next-intl validates that only known params are used
                  { pathname, params },
                  { locale },
                );
              }}
              className={locale === currentLocale ? "bg-muted" : undefined}
            >
              <span className="mr-2 text-base">{flag}</span>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


