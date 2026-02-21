"use client";

import { motion } from "motion/react";
import { useMotion } from "./motion-provider";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export function HeroDictionary() {
  const { reduceMotion } = useMotion();

  const anim = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 1, y: 0 } }
      : fadeUp(delay);

  return (
    <section className="px-6 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-3xl">
        <motion.h1
          className="text-5xl font-semibold tracking-tight text-fg sm:text-7xl"
          {...anim(0)}
        >
          Substrate
        </motion.h1>

        <motion.p
          className="mt-2 text-lg italic text-fg-muted"
          {...anim(0.1)}
        >
          noun
        </motion.p>

        <motion.p
          className="mt-3 max-w-lg text-lg text-fg-muted"
          {...anim(0.2)}
        >
          An underlying layer that supports complex systems.
        </motion.p>

        <motion.div
          className="mt-1 h-px w-16 bg-border"
          {...anim(0.25)}
        />

        <motion.p
          className="mt-8 max-w-xl text-xl leading-relaxed text-fg sm:text-2xl"
          {...anim(0.3)}
        >
          Composable GPU infrastructure — configure compute by cores,
          VRAM, memory, and storage.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          {...anim(0.4)}
        >
          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-md"
          >
            Get access
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-fg transition-all hover:border-accent hover:bg-accent-light"
          >
            Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
