"use client";

import { useId } from "react";

import { Menu, X } from "lucide-react";

import { GlowButton } from "@/components/ui/glow-button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { NavItem } from "@/content/marketing";
import { cn } from "@/lib/utils/cn";

type MobileNavProps = {
  items: NavItem[];
  className?: string;
};

export const MobileNav = ({ items, className }: MobileNavProps) => {
  const dialogId = useId();

  return (
    <div className={cn("lg:hidden", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-foreground transition hover:bg-(--hover-bg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Open menu"
            aria-controls={dialogId}
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="top"
          showCloseButton={false}
          className="inset-0 h-full w-full border-0 bg-transparent p-0 shadow-none"
        >
          <div className="relative flex h-full flex-col items-center justify-between px-6 py-12">
            <div className="flex w-full justify-end">
              <SheetClose asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-foreground transition hover:bg-(--hover-bg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </SheetClose>
            </div>

            <nav className="flex flex-col items-center gap-8">
              {items.map((item) => (
                <SheetClose asChild key={item.label}>
                  <a
                    href={item.href}
                    className="cursor-pointer text-[2rem] font-semibold tracking-tight text-foreground transition-colors hover:text-(--accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>

            <div className="flex w-full max-w-sm flex-col items-center gap-6">
              <SheetClose asChild>
                <a href="#login" className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Login
                </a>
              </SheetClose>

              <SheetClose asChild>
                <GlowButton href="#pricing" className="w-full">
                  Get Started
                </GlowButton>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};


