"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const logos = [
  {
    name: "Helix",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1L16.8 5.5V14.5L9 19L1.2 14.5V5.5L9 1Z" stroke="currentColor" strokeWidth="1.2" transform="translate(0,-1)" />
      </svg>
    ),
  },
  {
    name: "Veritas",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2.34" y="2.34" width="11.31" height="11.31" rx="1" stroke="currentColor" strokeWidth="1.2" transform="rotate(45 8 8)" />
      </svg>
    ),
  },
  {
    name: "Cascade",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L14 14H2L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Moiré",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Stratum",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Axon",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function LogoStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="bg-surface px-6 py-16" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-center text-xs font-medium uppercase tracking-widest text-fg-muted/60"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Trusted by teams at
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="flex items-center gap-2 text-fg-muted transition-all duration-200 hover:text-fg"
              style={{ opacity: 0.35 }}
              initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
              animate={
                isInView || reduceMotion
                  ? { opacity: 0.35, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : 0.1 + i * 0.06,
              }}
              whileHover={{ opacity: 0.7 }}
            >
              {logo.icon}
              <span className="text-sm font-semibold tracking-tight">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
