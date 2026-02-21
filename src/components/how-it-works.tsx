"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const steps = [
  {
    number: "01",
    title: "Choose cores",
    description: "Select the number of GPU cores for your workload.",
  },
  {
    number: "02",
    title: "Add VRAM",
    description: "Allocate video memory for model weights and tensors.",
  },
  {
    number: "03",
    title: "Add RAM",
    description: "Set system memory for data loading and preprocessing.",
  },
  {
    number: "04",
    title: "Add storage",
    description: "Attach fast SSD storage for datasets and checkpoints.",
  },
];

export function HowItWorks() {
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
          How it works
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Compute, assembled to your needs
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-lg text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Instead of renting fixed machines, configure exactly the resources
          your workload requires.
        </motion.p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : 0.2 + i * 0.1,
              }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-5 left-10 hidden h-px w-full bg-border lg:block" />
              )}

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-accent-light text-sm font-semibold text-accent">
                {step.number}
              </div>
              <h3 className="mt-4 text-base font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {step.description}
              </p>

              {/* Substrate layer line */}
              <motion.div
                className="mt-4 h-px bg-accent"
                initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={isInView || reduceMotion ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : 0.4 + i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
