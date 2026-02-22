"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const specs = [
  {
    label: "Location",
    value: "Måløy, Norway",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Power",
    value: "100% renewable hydro",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Cooling",
    value: "Fjord water cooling",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Security",
    value: "Underground facility",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function MountainIllustration() {
  return (
    <svg viewBox="0 0 500 320" fill="none" className="h-full w-full">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8E6E3" />
          <stop offset="100%" stopColor="#F5F4F2" />
        </linearGradient>
        <linearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78716C" />
          <stop offset="100%" stopColor="#57534E" />
        </linearGradient>
        <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8A29E" />
          <stop offset="100%" stopColor="#78716C" />
        </linearGradient>
        <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#44403C" />
          <stop offset="100%" stopColor="#292524" />
        </linearGradient>
        <linearGradient id="cavern" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C1917" />
          <stop offset="100%" stopColor="#0C0A09" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#64748B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="320" fill="url(#sky)" />

      {/* Far mountain range */}
      <path d="M0 160 L60 110 L120 130 L180 80 L240 120 L300 90 L360 115 L420 70 L500 130 L500 320 L0 320Z" fill="url(#mountain2)" opacity="0.4" />

      {/* Main mountain with datacenter cavity */}
      <path d="M50 280 L120 160 L170 120 L220 80 L280 60 L340 85 L380 120 L430 170 L460 280Z" fill="url(#mountain1)" />

      {/* Rock texture lines */}
      <path d="M170 120 L190 160 L210 145 L240 170" stroke="#57534E" strokeWidth="0.8" opacity="0.5" />
      <path d="M300 90 L310 120 L330 110 L350 140" stroke="#57534E" strokeWidth="0.8" opacity="0.5" />
      <path d="M220 80 L250 110 L270 100 L290 120" stroke="#57534E" strokeWidth="0.8" opacity="0.3" />

      {/* Cavern cutaway */}
      <path d="M160 220 Q180 180 230 170 Q280 160 320 175 Q350 185 370 220 L370 260 L160 260Z" fill="url(#cavern)" />
      <path d="M160 220 Q180 180 230 170 Q280 160 320 175 Q350 185 370 220" stroke="#44403C" strokeWidth="1.5" fill="none" />

      {/* Server racks inside cavern */}
      {[195, 220, 245, 270, 295, 320].map((x, i) => (
        <g key={i}>
          <rect x={x} y={195} width="12" height="50" rx="1" fill="#292524" stroke="#44403C" strokeWidth="0.5" />
          {/* Status lights */}
          <circle cx={x + 6} cy={205} r="1.5" fill="#28C840" opacity="0.8" />
          <circle cx={x + 6} cy={215} r="1.5" fill="#28C840" opacity="0.6" />
          <circle cx={x + 6} cy={225} r="1.5" fill="#FEBC2E" opacity="0.5" />
          <circle cx={x + 6} cy={235} r="1.5" fill="#28C840" opacity="0.7" />
        </g>
      ))}

      {/* Labels */}
      <text x="265" y="188" textAnchor="middle" fill="#A8A29E" fontSize="8" fontFamily="monospace" letterSpacing="0.5">LEFDAL MINE</text>

      {/* Fjord water (right side) */}
      <path d="M400 200 Q430 190 460 200 L460 280 L400 280Z" fill="url(#water)" />
      <path d="M395 210 Q420 200 450 210" stroke="#64748B" strokeWidth="0.5" opacity="0.4" fill="none" />
      <path d="M395 220 Q425 210 455 220" stroke="#64748B" strokeWidth="0.5" opacity="0.3" fill="none" />

      {/* Small "FJORD" label */}
      <text x="430" y="235" textAnchor="middle" fill="#64748B" fontSize="6" fontFamily="monospace" opacity="0.6">FJORD</text>

      {/* Ground line */}
      <path d="M0 280 L500 280" stroke="#A8A29E" strokeWidth="0.5" opacity="0.4" />

      {/* Power line from left */}
      <line x1="30" y1="180" x2="140" y2="200" stroke="#A8A29E" strokeWidth="0.5" opacity="0.5" strokeDasharray="3,3" />
      <text x="60" y="178" fill="#A8A29E" fontSize="6" fontFamily="monospace" opacity="0.5">HYDRO</text>

      {/* Small trees for scale */}
      {[85, 100, 440, 455, 475].map((x, i) => (
        <g key={i} opacity="0.4">
          <line x1={x} y1={280} x2={x} y2={268} stroke="#57534E" strokeWidth="1" />
          <path d={`M${x-4} ${270} L${x} ${262} L${x+4} ${270}Z`} fill="#57534E" />
        </g>
      ))}
    </svg>
  );
}

export function DatacenterShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="relative overflow-hidden bg-surface px-6 py-24 sm:py-32" ref={ref}>
      <div className="relative mx-auto max-w-5xl">
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

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: text + specs (2 cols) */}
          <div className="lg:col-span-2">
            <motion.p
              className="text-base leading-relaxed text-fg-muted"
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Substrate runs on infrastructure housed in Lefdal Mine Datacenter — a former NATO mining facility
              carved into the mountains of western Norway. Powered by 100% renewable hydroelectric energy and
              cooled by fjord water, delivering a PUE below 1.15.
            </motion.p>

            {/* Spec list */}
            <motion.div
              className="mt-8 space-y-4"
              initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-fg-muted">
                      {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-fg">
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: mountain illustration (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.98 }}
            animate={isInView || reduceMotion ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="overflow-hidden rounded-xl border border-border"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <MountainIllustration />
            </div>
            <p className="mt-3 text-center text-xs text-fg-muted/60">
              Cross-section: Lefdal Mine Datacenter, Måløy, Norway
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
