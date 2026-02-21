"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const audiences = [
  {
    title: "ML engineers",
    description: "Fine-tune models with precisely allocated GPU memory and compute.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      </svg>
    ),
  },
  {
    title: "AI startups",
    description: "Scale from prototype to production without re-architecting infrastructure.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Research labs",
    description: "Run experiments with reproducible, precisely configured compute environments.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v7.2L5.7 17a2 2 0 0 0 1.7 3h9.2a2 2 0 0 0 1.7-3L15 10.2V3" />
        <path d="M7 3h10" />
      </svg>
    ),
  },
  {
    title: "Rendering studios",
    description: "Allocate GPU cores for parallel rendering without fixed machine limits.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Simulation teams",
    description: "Configure memory-heavy instances for physics, climate, or financial models.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export function TargetUsers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="border-t border-border px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Who it&apos;s for
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Built for teams running serious workloads
        </motion.h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              className="group flex items-start gap-4 rounded-xl border border-border p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-sm"
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : 0.15 + i * 0.08,
              }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                {audience.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-fg">
                  {audience.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {audience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
