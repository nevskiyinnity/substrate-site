"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useMotion } from "./motion-provider";

interface SliderConfig {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

const sliders: SliderConfig[] = [
  { label: "GPU cores", unit: "", min: 1, max: 64, step: 1, defaultValue: 16 },
  { label: "VRAM", unit: "GB", min: 4, max: 128, step: 4, defaultValue: 48 },
  { label: "RAM", unit: "GB", min: 8, max: 512, step: 8, defaultValue: 128 },
  { label: "Storage", unit: "GB", min: 50, max: 2000, step: 50, defaultValue: 500 },
];

function AnimatedNumber({ value }: { value: number }) {
  const { reduceMotion } = useMotion();
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 200, damping: 30 });
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const update = () => {
      setDisplay(Math.round(spring.get()));
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [spring, value, reduceMotion]);

  return <span className="tabular-nums">{display}</span>;
}

export function ConfiguratorCard() {
  const { reduceMotion } = useMotion();
  const [values, setValues] = useState(sliders.map((s) => s.defaultValue));

  const handleChange = (index: number, newValue: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = newValue;
      return next;
    });
  };

  const estimatedPrice = (
    values[0] * 0.12 +
    values[1] * 0.08 +
    values[2] * 0.02 +
    values[3] * 0.001
  ).toFixed(2);

  const containerAnim = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.5 },
      };

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-3xl">
        {/* Gradient border wrapper */}
        <div
          className="rounded-xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(120,113,108,0.25) 0%, rgba(229,231,235,0.6) 50%, rgba(120,113,108,0.15) 100%)",
          }}
        >
          <motion.div
            className="rounded-xl bg-white p-6 sm:p-8"
            style={{
              boxShadow:
                "0 8px 40px rgba(120,113,108,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}
            {...containerAnim}
          >
            <p className="mb-6 text-xs font-medium uppercase tracking-widest text-fg-muted">
              Configure your instance
            </p>

            <div className="space-y-6">
              {sliders.map((slider, i) => (
                <div key={slider.label}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <label className="text-sm font-medium text-fg">
                      {slider.label}
                    </label>
                    <span className="text-sm font-medium text-accent">
                      <AnimatedNumber value={values[i]} />
                      {slider.unit && ` ${slider.unit}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={values[i]}
                    onChange={(e) => handleChange(i, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-fg-muted">
                    <span>
                      {slider.min}
                      {slider.unit}
                    </span>
                    <span>
                      {slider.max}
                      {slider.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-fg">
                  <AnimatedNumber value={values[0]} /> cores{" "}
                  <span className="text-fg-muted">&middot;</span>{" "}
                  <AnimatedNumber value={values[1]} />GB VRAM{" "}
                  <span className="text-fg-muted">&middot;</span>{" "}
                  <AnimatedNumber value={values[2]} />GB RAM{" "}
                  <span className="text-fg-muted">&middot;</span>{" "}
                  <AnimatedNumber value={values[3]} />GB SSD
                </p>
                <div className="flex items-center gap-4">
                  <div className="group relative">
                    <p className="text-lg font-semibold text-fg">
                      ~${estimatedPrice}
                      <span className="text-sm font-normal text-fg-muted">
                        /hr
                      </span>
                    </p>
                    <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md bg-fg px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Pricing varies by region & availability
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.3)]"
                  >
                    Provision
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
