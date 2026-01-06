"use client";

import Image from "next/image";
import { useMemo } from "react";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

type AiRoleItem = {
  id: number;
  label: string;
  className: string;
  delayMs: number;
};

type AiAssistantProps = {
  id?: string;
  className?: string;
  roles: AiRoleItem[];
  copy: {
    title: string;
    description: string;
    srOnlyDescription: string;
  };
};

const getFloatDurationSeconds = ({ roleId }: { roleId: number }) => {
  const bucket = roleId % 5;
  return 3.2 + bucket * 0.35;
};

export const AiAssistant = ({ id = "ai-assistant", className, roles, copy }: AiAssistantProps) => {
  const prefersReducedMotion = useReducedMotion();

  const roleMotion = useMemo(() => {
    return roles.map((role) => ({
      role,
      delaySeconds: role.delayMs / 1000,
      floatDurationSeconds: getFloatDurationSeconds({ roleId: role.id }),
    }));
  }, [roles]);

  return (
    <section id={id} className={cn("relative overflow-hidden bg-[#FFFCF7] px-6 pt-20 pb-0 md:pt-32", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 text-center md:mb-24">
          <motion.h2
            className="mx-auto mb-6 max-w-4xl text-4xl font-normal tracking-[-0.02em] leading-[1.2] text-foreground md:text-5xl lg:text-6xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {copy.title}
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground md:text-xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {copy.description}
          </motion.p>
        </div>

        <div className="relative">
          <div className="relative max-h-[800px] min-h-[600px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="https://cdn.prod.website-files.com/68dfcddc308200f286057fd2/68e5bbf6556df7bc33267c69_f4e4bf8d6ba7ce8b6c85195dd33c7ede_ai-agent_step-2_re.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 0px, 100vw"
                  className={cn("object-contain object-center md:hidden")}
                  priority={false}
                />
                <Image
                  src="https://cdn.prod.website-files.com/68dfcddc308200f286057fd2/68e5948f95a7075a6993f731_96a3220695b0526ed264c5730bc6403b_ai-agent_step-2.avif"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 100vw, 0px"
                  className={cn("hidden object-contain object-center md:block")}
                  priority={false}
                />
              </div>
            </div>

            <div className="absolute inset-0 hidden md:block">
              {roleMotion.map(({ role, delaySeconds, floatDurationSeconds }) => (
                <motion.div
                  key={role.id}
                  className={cn("absolute", role.className)}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: delaySeconds, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex items-center gap-2"
                    animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: floatDurationSeconds, repeat: Infinity, ease: "easeInOut", delay: delaySeconds }
                    }
                  >
                    <motion.div
                      className={cn(
                        "relative flex min-w-12 items-center justify-center rounded-md px-3 py-1.5",
                         "bg-[#FFB8A3]",
                      )}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              boxShadow: [
                                "0 0 20px rgba(255, 184, 163, 0.3)",
                                "0 0 30px rgba(255, 184, 163, 0.5)",
                                "0 0 20px rgba(255, 184, 163, 0.3)",
                              ],
                            }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: delaySeconds * 0.5 }
                      }
                    >
                      <motion.span
                        className="text-sm font-semibold text-[#1F1F1F]"
                        animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: delaySeconds * 0.3 }
                        }
                      >
                        AI
                      </motion.span>
                    </motion.div>

                    <div
                      className={cn(
                        "whitespace-nowrap rounded-md px-4 py-2 backdrop-blur-sm",
                        "border border-border bg-[color-mix(in_srgb,var(--background)_70%,transparent)] shadow-[0_12px_34px_rgba(0,0,0,0.18)]",
                      )}
                    >
                      <span className="text-xs font-semibold tracking-wide text-foreground">{role.label}</span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Container className="sr-only">
        <p>{copy.srOnlyDescription}</p>
      </Container>
    </section>
  );
};


