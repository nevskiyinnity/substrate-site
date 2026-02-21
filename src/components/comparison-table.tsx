"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const rows = [
  {
    feature: "GPU allocation",
    substrate: "Exact core count",
    aws: "Fixed SKUs",
    gcp: "Fixed SKUs",
    lambda: "Fixed SKUs",
    substrateWin: true,
  },
  {
    feature: "VRAM configuration",
    substrate: "Per-GB",
    aws: "Tied to instance",
    gcp: "Tied to instance",
    lambda: "Tied to instance",
    substrateWin: true,
  },
  {
    feature: "Billing granularity",
    substrate: "Per-second",
    aws: "Per-second",
    gcp: "Per-second",
    lambda: "Per-hour",
    substrateWin: false,
  },
  {
    feature: "Provisioning time",
    substrate: "< 30 seconds",
    aws: "Minutes",
    gcp: "Minutes",
    lambda: "Minutes",
    substrateWin: true,
  },
  {
    feature: "Data logging",
    substrate: "None",
    aws: "CloudTrail",
    gcp: "Cloud Audit",
    lambda: "Varies",
    substrateWin: true,
  },
  {
    feature: "Compliance",
    substrate: "SOC 2, HIPAA",
    aws: "SOC 2, HIPAA",
    gcp: "SOC 2, HIPAA",
    lambda: "SOC 2",
    substrateWin: false,
  },
];

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          How we compare
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Substrate vs. the status quo
        </motion.h2>

        <motion.div
          className="mt-10 overflow-x-auto rounded-xl border border-border"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
          }}
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-fg-muted">
                  Feature
                </th>
                <th className="bg-accent-light px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-accent">
                  Substrate
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-fg-muted">
                  AWS EC2
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-fg-muted">
                  GCP Compute
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-fg-muted">
                  Lambda Cloud
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i < rows.length - 1 ? "border-b border-border" : ""}
                >
                  <td className="px-5 py-3.5 font-medium text-fg">
                    {row.feature}
                  </td>
                  <td className="bg-accent-light px-5 py-3.5 font-medium text-fg">
                    {row.substrateWin && (
                      <svg className="mr-1.5 inline h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {row.substrate}
                  </td>
                  <td className="px-5 py-3.5 text-fg-muted">{row.aws}</td>
                  <td className="px-5 py-3.5 text-fg-muted">{row.gcp}</td>
                  <td className="px-5 py-3.5 text-fg-muted">{row.lambda}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
