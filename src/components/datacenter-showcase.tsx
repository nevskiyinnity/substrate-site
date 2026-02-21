"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const specs = [
  {
    label: "Location",
    value: "Måløy, Norway",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Power",
    value: "100% renewable hydropower",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Cooling",
    value: "Fjord water natural cooling",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Security",
    value: "Underground rock facility",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l10-5 10 5V7L12 2 2 7z" />
      </svg>
    ),
  },
];

export function DatacenterShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-24 sm:py-32" ref={ref}>
      {/* Subtle topographic pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 300px 300px at 25% 50%, rgba(120,113,108,0.06) 0%, transparent 70%), radial-gradient(ellipse 200px 200px at 75% 40%, rgba(120,113,108,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: story */}
          <div>
            <motion.p
              className="text-xs font-medium uppercase tracking-widest text-fg-muted"
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={isInView || reduceMotion ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Infrastructure
            </motion.p>
            <motion.h2
              className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Built inside a mountain
            </motion.h2>
            <motion.p
              className="mt-4 text-base leading-relaxed text-fg-muted"
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Substrate runs on infrastructure housed in Lefdal Mine Datacenter — a former NATO mining facility
              carved into the mountains of western Norway. The facility provides Tier III equivalent reliability
              with natural physical security that no above-ground data center can match.
            </motion.p>
            <motion.p
              className="mt-3 text-base leading-relaxed text-fg-muted"
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cooled by fjord water from the Norwegian Sea and powered entirely by renewable hydroelectric energy,
              Lefdal delivers exceptional power efficiency with a PUE below 1.15 — making it one of the greenest
              data centers in the world.
            </motion.p>
          </div>

          {/* Right: spec grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-border bg-white p-5"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light text-accent">
                  {spec.icon}
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-fg-muted">
                  {spec.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-fg">
                  {spec.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
