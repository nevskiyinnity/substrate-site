"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const features = [
  {
    title: "No oversized instances",
    description: "Only allocate the resources you need. No paying for idle cores or unused memory.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M17.5 14v7M14 17.5h7" />
      </svg>
    ),
  },
  {
    title: "Predictable performance",
    description: "Dedicated cores and memory, not shared bursts. Consistent throughput for every job.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Built for AI workloads",
    description: "Training, inference, rendering, simulation. Infrastructure shaped for modern compute.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

export function FeatureCards() {
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
          Why it matters
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Infrastructure without fixed shapes
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-xl border border-border p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-md"
              initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : 0.2 + i * 0.1,
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent transition-transform duration-200 group-hover:rotate-3">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-fg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
