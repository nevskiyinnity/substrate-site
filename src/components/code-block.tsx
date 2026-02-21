"use client";

import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const codeContent = `resource "substrate_compute" "train" {
  gpu_cores  = 16
  vram_gb    = 48
  ram_gb     = 128
  storage_gb = 500
}`;

export function CodeBlockWithCopy() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-t border-border px-6 py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={isInView || reduceMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Developer experience
        </motion.p>
        <motion.h2
          className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Infrastructure you can script
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-lg text-fg-muted"
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          API-first. CLI-native. Define your compute with declarative configs
          and manage infrastructure as code.
        </motion.p>

        <motion.div
          className="relative mt-10 overflow-hidden rounded-xl border border-border bg-[#FAFAFA]"
          initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
                <div className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>
              <span className="ml-2 text-xs text-fg-muted">main.tf</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-fg-muted transition-colors hover:bg-accent-light hover:text-fg"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <pre className="overflow-x-auto p-6 text-sm leading-7">
            <code>
              <span className="text-fg-muted">resource</span>{" "}
              <span className="text-accent-hover">&quot;substrate_compute&quot;</span>{" "}
              <span className="text-accent-hover">&quot;train&quot;</span>{" "}
              <span className="text-fg-muted">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-fg">gpu_cores</span>
              {"  "}
              <span className="text-fg-muted">=</span>{" "}
              <span className="text-accent">16</span>
              {"\n"}
              {"  "}
              <span className="text-fg">vram_gb</span>
              {"    "}
              <span className="text-fg-muted">=</span>{" "}
              <span className="text-accent">48</span>
              {"\n"}
              {"  "}
              <span className="text-fg">ram_gb</span>
              {"     "}
              <span className="text-fg-muted">=</span>{" "}
              <span className="text-accent">128</span>
              {"\n"}
              {"  "}
              <span className="text-fg">storage_gb</span>{" "}
              <span className="text-fg-muted">=</span>{" "}
              <span className="text-accent">500</span>
              {"\n"}
              <span className="text-fg-muted">{"}"}</span>
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
