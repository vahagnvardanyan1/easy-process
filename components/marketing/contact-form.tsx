"use client";

import { useCallback, useState } from "react";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

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

export const ContactForm = () => {
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
          setSubmitStatus("idle");
        }, 5000);
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => onInputChange({ field: "name", value: e.target.value })}
            className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => onInputChange({ field: "email", value: e.target.value })}
            className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => onInputChange({ field: "phone", value: e.target.value })}
            className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-semibold text-foreground">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={(e) => onInputChange({ field: "company", value: e.target.value })}
            className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-semibold text-foreground">
            Service <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={(e) => onInputChange({ field: "service", value: e.target.value })}
              className="w-full appearance-none rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
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
          <label htmlFor="preferredDate" className="mb-2 block text-sm font-semibold text-foreground">
            Preferred Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={(e) => onInputChange({ field: "preferredDate", value: e.target.value })}
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30 [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => onInputChange({ field: "message", value: e.target.value })}
          className="w-full resize-none rounded-lg border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[color-mix(in_srgb,var(--background)_50%,transparent)] px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-[color-mix(in_srgb,var(--foreground)_50%,transparent)] hover:border-(--accent)/50 focus:border-(--accent) focus:outline-none focus:ring-2 focus:ring-(--accent)/30"
          placeholder="Share your vision and objectives for 2026..."
        />
      </div>

      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 backdrop-blur-sm"
        >
          <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Success! We&apos;ll contact you within 24 hours to discuss your project.
          </p>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm"
        >
          <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Something went wrong. Please try again or email us directly.
          </p>
        </motion.div>
      )}

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-[0_8px_30px_rgba(74,144,226,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(74,144,226,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
              />
              Submitting...
            </>
          ) : (
            <>
              Request Consultation
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};



