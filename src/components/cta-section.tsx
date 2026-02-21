"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="relative overflow-hidden bg-surface-2 px-6 py-24 sm:py-32" ref={ref}>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(120,113,108,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Ready to build?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-md text-lg text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get early access to composable GPU infrastructure.
          No commitments, no fixed contracts.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#"
            className="inline-flex h-12 items-center rounded-lg bg-accent px-7 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.35)]"
          >
            Get early access
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center rounded-lg border border-border px-7 text-sm font-medium text-fg transition-all hover:border-accent/40 hover:bg-white"
          >
            Talk to sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}
