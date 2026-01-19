"use client";

import type { ComponentProps } from "react";

import { ContactForm } from "@/components/marketing/contact-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ContactDialogProps = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  copy: {
    title: string;
    description: string;
  };
  formCopy: ComponentProps<typeof ContactForm>["copy"];
};

export const ContactDialog = ({ open, onOpenChange, copy, formCopy }: ContactDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => onOpenChange({ open: nextOpen })}>
      <DialogContent className="w-[min(92vw,720px)] max-h-[85vh] overflow-y-auto sm:max-h-[90vh] p-4">
        <DialogHeader className="pr-10">
          <DialogTitle className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">{copy.title}</DialogTitle>
          <DialogDescription className="mt-2 text-pretty text-sm">{copy.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-6 rounded-3xl border border-border bg-[color-mix(in_srgb,var(--background)_55%,transparent)] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-sm sm:p-6">
          <ContactForm copy={formCopy} />
        </div>
      </DialogContent>
    </Dialog>
  );
};


