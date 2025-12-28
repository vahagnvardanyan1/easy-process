"use client";

import { useCallback, useState, type ReactNode } from "react";

import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BookCallDialogProps = {
  children: ReactNode;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  preferredDate: string;
};

type FormField = keyof FormData;

type SubmitStatus = "idle" | "success" | "error";

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  preferredDate: "",
};

const SERVICE_OPTIONS = [
  "Web Development",
  "Brand Identity",
  "UI/UX Design",
  "Performance Optimization",
  "Motion Design",
  "Digital Strategy",
  "Other",
] as const;

export const BookCallDialog = ({ children }: BookCallDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const isFormValid = formData.name && formData.email && formData.service;

  const onInputChange = useCallback(({ field, value }: { field: FormField; value: string }) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const response = await fetch("/api/book-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        setSubmitStatus("success");
        setFormData(INITIAL_FORM_DATA);

        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus("idle");
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] overflow-y-auto border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--background)_95%,transparent)] px-4 pb-2 pt-4 backdrop-blur-xl sm:max-h-auto sm:w-full sm:max-w-[520px] sm:overflow-visible sm:p-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
          <motion.div
            className="absolute -left-1/4 -top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/15 to-pink-500/15 blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <DialogHeader className="relative mb-3 sm:mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-1.5 sm:space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2.5 py-0.5 backdrop-blur-sm sm:px-3 sm:py-1">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-(--accent)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-(--accent) sm:text-[10px]">
                Let&apos;s Connect
              </span>
            </div>
            <DialogTitle className="bg-gradient-to-r from-foreground to-[color-mix(in_srgb,var(--foreground)_70%,transparent)] bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-2xl">
              Schedule a Consultation
            </DialogTitle>
            <DialogDescription className="text-[11px] leading-tight text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] sm:text-sm sm:leading-relaxed">
              Share your details and we&apos;ll connect within 24 hours.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <form onSubmit={onSubmit} className="relative space-y-2.5 sm:space-y-3.5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <label htmlFor="name" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => onInputChange({ field: "name", value: e.target.value })}
              className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
              placeholder="John Doe"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <label htmlFor="email" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => onInputChange({ field: "email", value: e.target.value })}
              className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
              placeholder="john@company.com"
            />
          </motion.div>

          <motion.div
            className="grid gap-2.5 sm:grid-cols-2 sm:gap-3.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div>
              <label htmlFor="phone" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => onInputChange({ field: "phone", value: e.target.value })}
                className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="company" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => onInputChange({ field: "company", value: e.target.value })}
                className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
                placeholder="Your Company"
              />
            </div>
          </motion.div>

          <motion.div
            className="grid gap-2.5 sm:grid-cols-2 sm:gap-3.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div>
              <label htmlFor="service" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
                Service <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={(e) => onInputChange({ field: "service", value: e.target.value })}
                  className="w-full appearance-none rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
                >
                  <option value="">Select service</option>
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/50 sm:right-3">
                  <svg width="10" height="6" viewBox="0 0 12 8" fill="none">
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="preferredDate" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={(e) => onInputChange({ field: "preferredDate", value: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <label htmlFor="message" className="mb-1 block text-[11px] font-semibold text-foreground sm:text-xs">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={(e) => onInputChange({ field: "message", value: e.target.value })}
              className="w-full resize-none rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)/30 sm:px-3.5 sm:py-2"
              placeholder="Share your vision..."
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs font-medium text-green-600 backdrop-blur-sm dark:text-green-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Success! We&apos;ll contact you within 24 hours.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 backdrop-blur-sm dark:text-red-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Error. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex flex-col gap-2 pt-1 sm:flex-row sm:gap-2.5 sm:pt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(74,144,226,0.25)] transition-all hover:shadow-[0_6px_25px_rgba(74,144,226,0.35)] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Submit Request</span>
                    <span className="hidden sm:inline">Request Consultation</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="w-full text-sm sm:w-auto"
            >
              Cancel
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


