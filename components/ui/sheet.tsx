"use client";

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-(--mobile-menu-backdrop) backdrop-blur-xl",
        "data-[state=open]:animate-[overlay-in_200ms_ease-out] data-[state=closed]:animate-[overlay-out_150ms_ease-in]",
        className,
      )}
      {...props}
    />
  );
});

SheetOverlay.displayName = "SheetOverlay";

const sheetContentVariants = cva(
  "fixed z-50 flex flex-col border-border bg-background text-foreground shadow-[0_25px_60px_rgba(0,0,0,0.35)] focus-visible:outline-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=open]:animate-[sheet-down-in_420ms_ease-out] data-[state=closed]:animate-[sheet-up-out_260ms_ease-in]",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=open]:animate-[sheet-bottom-in_420ms_ease-out] data-[state=closed]:animate-[sheet-bottom-out_260ms_ease-in]",
        left:
          "inset-y-0 left-0 h-full w-[min(92vw,420px)] border-r data-[state=open]:animate-[sheet-left-in_320ms_ease-out] data-[state=closed]:animate-[sheet-left-out_240ms_ease-in]",
        right:
          "inset-y-0 right-0 h-full w-[min(92vw,420px)] border-l data-[state=open]:animate-[sheet-right-in_320ms_ease-out] data-[state=closed]:animate-[sheet-right-out_240ms_ease-in]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

type SheetContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetContentVariants> & {
    title?: string;
    showCloseButton?: boolean;
    closeButtonClassName?: string;
  };

export const SheetContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, SheetContentProps>(
  ({ className, children, side, title = "Menu", showCloseButton = true, closeButtonClassName, ...props }, ref) => {
    return (
      <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content ref={ref} className={cn(sheetContentVariants({ side }), className)} {...props}>
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close
              className={cn(
                "absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full",
                "text-foreground transition hover:bg-(--hover-bg)",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                closeButtonClassName,
              )}
              aria-label="Close sheet"
            >
              <X className="h-6 w-6" />
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </SheetPortal>
    );
  },
);

SheetContent.displayName = "SheetContent";

export const SheetHeader = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  return <div className={cn("flex flex-col gap-1.5 p-6 pb-0", className)} {...props} />;
};

export const SheetFooter = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  return <div className={cn("mt-auto flex flex-col gap-3 p-6", className)} {...props} />;
};

