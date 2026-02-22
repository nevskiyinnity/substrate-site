"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36" ref={ref}>
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0 bg-surface-2" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(120,113,108,0.10) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 30% at 30% 30%, rgba(168,162,158,0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 30% at 70% 40%, rgba(120,113,108,0.05) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent"
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={isInView || reduceMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </motion.div>

        <motion.h2
          className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to build?
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-md text-lg text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
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
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center rounded-lg bg-accent px-7 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.35)]"
          >
            Get early access
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center rounded-lg border border-border bg-white px-7 text-sm font-medium text-fg transition-all hover:border-accent/40 hover:shadow-sm"
          >
            Talk to sales
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 text-xs text-fg-muted/60"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Free tier available &middot; No credit card required
        </motion.p>
      </div>
    </section>
  );
}
