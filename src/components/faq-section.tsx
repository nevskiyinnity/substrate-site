"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const faqs = [
  {
    q: "How does composable compute differ from traditional cloud instances?",
    a: "Traditional cloud providers sell fixed instance types — you pick an SKU with predetermined CPU, GPU, and memory. Substrate lets you specify exact core counts, VRAM, RAM, and storage independently. You assemble compute to fit your workload instead of fitting your workload to a machine.",
  },
  {
    q: "What GPUs are available?",
    a: "We offer NVIDIA A100, H100, and H200 GPUs with flexible core allocation. You can request anywhere from 1 to 64 GPU cores per instance, with VRAM scaled independently from 4GB to 128GB per configuration.",
  },
  {
    q: "How does per-second billing work?",
    a: "Billing starts the moment your instance is provisioned and stops the instant you terminate it. There's no rounding — a 47-second job is billed for exactly 47 seconds. You can see real-time cost tracking in the dashboard and via the API.",
  },
  {
    q: "Is my data logged or inspected?",
    a: "No. Substrate operates a strict zero-logging policy for workload data. We never inspect, store, or retain any data processed on your instances. Infrastructure telemetry (CPU utilization, uptime) is collected for reliability but contains no workload content.",
  },
  {
    q: "What compliance certifications do you hold?",
    a: "Substrate is SOC 2 Type II certified and HIPAA compliant. Our SOC 2 audit report is available under NDA, and we offer Business Associate Agreements (BAAs) for healthcare and regulated workloads on Pro and Enterprise plans.",
  },
  {
    q: "Where are your data centers located?",
    a: "Our primary infrastructure is housed in Lefdal Mine Datacenter in Måløy, Norway — a former NATO mining facility powered by 100% renewable hydroelectric energy. The underground facility provides exceptional physical security and natural fjord-water cooling.",
  },
  {
    q: "Can I use Substrate for HIPAA-regulated workloads?",
    a: "Yes. Substrate supports HIPAA-regulated workloads on Pro and Enterprise plans. We provide a Business Associate Agreement (BAA), AES-256 encryption at rest, TLS 1.3 in transit, and our zero-logging policy ensures PHI is never stored on our systems.",
  },
  {
    q: "How do I get started?",
    a: "Install the Substrate CLI, authenticate with your account, and provision your first instance in under 30 seconds. You can also use our REST API or Terraform provider for infrastructure-as-code workflows. Start with the Getting Started guide in our docs.",
  },
];

function FaqItem({ faq, index, isInView }: { faq: typeof faqs[number]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);
  const { reduceMotion } = useMotion();

  return (
    <motion.div
      className="border-b border-border"
      initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1 + index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-sm font-medium text-fg">{faq.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`shrink-0 text-fg-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { height: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-fg-muted">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { reduceMotion } = useMotion();

  return (
    <section className="px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Frequently asked questions
        </motion.h2>

        <div className="mt-10">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
