"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const badges = [
  {
    title: "SOC 2 Type II",
    description: "Audited annually. Full audit report available under NDA.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "HIPAA Compliant",
    description: "BAA available. PHI-safe infrastructure for healthcare AI.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Zero Data Logging",
    description: "We never inspect, log, or retain your workload data. Your models stay yours.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      </svg>
    ),
  },
  {
    title: "100% Renewable",
    description: "Hosted in Lefdal Mine — powered entirely by Norwegian hydropower.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
      </svg>
    ),
  },
];

export function SecurityCompliance() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="bg-fg px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-white/50"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Trust & compliance
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Enterprise-grade security, built in
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: reduceMotion ? 0 : 0.15 + i * 0.08,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-accent-light">
                {badge.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">
                {badge.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-sm italic text-white/30"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          &ldquo;Your infrastructure should never be the weakest link in your security posture.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
