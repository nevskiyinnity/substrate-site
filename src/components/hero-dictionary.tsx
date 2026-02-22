"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMotion } from "./motion-provider";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const terminalLines = [
  { text: "$ substrate compute create \\", color: "text-white", delay: 0 },
  { text: "    --gpu-cores 16 --vram 48 --ram 128 --storage 500", color: "text-white/60", delay: 0.05 },
  { text: "", color: "", delay: 0 },
  { text: "\u2713 Instance sub-7kx2m provisioned", color: "text-emerald-400", delay: 0.4 },
  { text: "", color: "", delay: 0 },
  { text: "  Region     eu-north-1 (Lefdal Mine)", color: "text-white/50", delay: 0.5 },
  { text: "  GPU        16 cores \u00b7 48 GB VRAM", color: "text-white/50", delay: 0.55 },
  { text: "  RAM        128 GB", color: "text-white/50", delay: 0.6 },
  { text: "  Storage    500 GB NVMe SSD", color: "text-white/50", delay: 0.65 },
  { text: "  Endpoint   ssh://sub-7kx2m.substrate.run", color: "text-amber-300/80", delay: 0.7 },
  { text: "", color: "", delay: 0 },
  { text: "  Ready in 11.4s", color: "text-emerald-400/80", delay: 0.85 },
];

export function HeroDictionary() {
  const { reduceMotion } = useMotion();

  const anim = (delay: number) =>
    reduceMotion ? { initial: { opacity: 1, y: 0 } } : fadeUp(delay);

  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-8 sm:pt-44 sm:pb-16">
      {/* Multi-point gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(120,113,108,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(168,162,158,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(120,113,108,0.03) 0%, transparent 80%)",
          ].join(", "),
        }}
      />
      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      {/* Warm glow pool at bottom */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(120,113,108,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Two-column: text left, terminal right on lg */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: dictionary definition */}
          <div>
            <motion.h1
              className="text-5xl font-semibold tracking-tight text-fg sm:text-7xl"
              {...anim(0)}
            >
              Substrate
            </motion.h1>

            <motion.p className="mt-2 text-lg italic text-fg-muted" {...anim(0.1)}>
              noun
            </motion.p>

            <motion.p
              className="mt-3 max-w-lg text-lg text-fg-muted"
              {...anim(0.2)}
            >
              An underlying layer that supports complex systems.
            </motion.p>

            <motion.div className="mt-1 h-px w-16 bg-border" {...anim(0.25)} />

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
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.35)]"
              >
                Get access
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-fg transition-all hover:border-accent hover:bg-accent-light"
              >
                Documentation
              </Link>
            </motion.div>
          </div>

          {/* Right: terminal mockup */}
          <motion.div
            className="relative"
            initial={reduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.5 }}
          >
            {/* Ambient glow behind terminal */}
            <div
              className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(120,113,108,0.12) 0%, transparent 70%)",
              }}
            />

            <div
              className="overflow-hidden rounded-xl border border-white/10 bg-[#1A1A1A]"
              style={{
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-white/30">terminal</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-[13px] leading-6 sm:p-6">
                {terminalLines.map((line, i) =>
                  line.text === "" ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <motion.div
                      key={i}
                      className={line.color}
                      initial={reduceMotion ? {} : { opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: reduceMotion ? 0 : 0.8 + line.delay,
                      }}
                    >
                      {line.text}
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
