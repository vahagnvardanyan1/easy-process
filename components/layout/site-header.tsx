"use client";

import Link from "next/link";
import Image from "next/image";

import { Moon, Sun } from "lucide-react";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";
import { useThemeMode } from "@/lib/theme/use-theme-mode";

type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
  homeHref: string;
  labels: {
    brandSrOnly: string;
    themeToggleAriaLabel: string;
    localeSwitcherAriaLabel: string;
    mobileNav: {
      openMenuAriaLabel: string;
      closeMenuAriaLabel: string;
    };
  };
};

type ThemeToggleButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  className?: string;
};

const ThemeToggleButton = ({ ariaLabel, onClick, className }: ThemeToggleButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] transition",
        "hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  );
};

export const SiteHeader = ({ navItems, homeHref, labels }: SiteHeaderProps) => {
  const { toggleThemeMode } = useThemeMode();

  return (
        <header className="fixed left-0 right-0 top-6 z-50">

      <Container className="flex justify-center px-0 sm:px-6">

        
        <div className="relative w-full max-w-[95%] rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_70%,transparent)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md lg:max-w-5xl">
          <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,color-mix(in_srgb,var(--accent)_6%,transparent),color-mix(in_srgb,var(--accent)_6%,transparent),color-mix(in_srgb,var(--accent)_6%,transparent))]" />

          <div className="relative flex items-center gap-3 px-4 py-2.5 sm:gap-8 sm:px-5">
            <Link href={homeHref} className="flex items-center gap-3">
              <Image src="/Logo.svg" alt={labels.brandSrOnly} width={76} height={28} className="h-7 w-auto" />
            </Link>

            <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-sm text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] transition hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:bg-[linear-gradient(to_right,transparent,var(--accent),transparent)] after:opacity-0 after:transition hover:after:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-4 lg:flex">
              {/* <a
                href="#login"
                className="text-sm text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Login
              </a> */}

              <ThemeToggleButton ariaLabel={labels.themeToggleAriaLabel} onClick={toggleThemeMode} />

              <LocaleSwitcher ariaLabel={labels.localeSwitcherAriaLabel} />

              {/* <GlowButton href="#pricing">Get Started</GlowButton> */}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              {/* <GlowButton href="#pricing" size="sm">
                Get Started
              </GlowButton> */}
              <ThemeToggleButton ariaLabel={labels.themeToggleAriaLabel} onClick={toggleThemeMode} />
              <LocaleSwitcher ariaLabel={labels.localeSwitcherAriaLabel} />
              <MobileNav items={navItems} labels={labels.mobileNav} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};


