"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { useMotion } from "./motion-provider";

function useCountUp(target: number, active: boolean, isFloat = false, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      setCount(isFloat ? parseFloat(value.toFixed(1)) : Math.round(value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, isFloat, duration]);

  return count;
}

const stats = [
  { value: 30, prefix: "< ", suffix: "s", label: "Provisioning time" },
  { value: 99.9, prefix: "", suffix: "%", label: "Uptime SLA", isFloat: true },
  { value: 40, prefix: "", suffix: "+", label: "GPU configurations" },
  { value: 0, prefix: "", suffix: "", label: "Pay per second", display: "Per-second" },
];

function StatItem({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[number];
  index: number;
  isInView: boolean;
}) {
  const { reduceMotion } = useMotion();
  const count = useCountUp(
    stat.value,
    (isInView && !reduceMotion) || reduceMotion,
    stat.isFloat,
  );

  return (
    <motion.div
      className="flex flex-col"
      initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
    >
      <p className="text-4xl font-semibold tracking-tight text-fg tabular-nums sm:text-5xl">
        {stat.display ? (
          stat.display
        ) : (
          <>
            {stat.prefix}
            {reduceMotion ? stat.value : count}
            {stat.suffix}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-fg-muted">{stat.label}</p>
    </motion.div>
  );
}

export function MetricsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-surface px-6 py-20 sm:py-28" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
