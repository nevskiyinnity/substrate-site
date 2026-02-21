"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { useMotion } from "./motion-provider";

const tabs = ["Terraform", "Python", "CLI"] as const;
type Tab = (typeof tabs)[number];

const codeContent: Record<Tab, string> = {
  Terraform: `resource "substrate_compute" "train" {
  gpu_cores  = 16
  vram_gb    = 48
  ram_gb     = 128
  storage_gb = 500
}`,
  Python: `import substrate

client = substrate.Client()

instance = client.compute.create(
    gpu_cores=16,
    vram_gb=48,
    ram_gb=128,
    storage_gb=500,
)

print(instance.id, instance.endpoint)`,
  CLI: `substrate compute create \\
  --gpu-cores 16 \\
  --vram 48 \\
  --ram 128 \\
  --storage 500`,
};

const filenames: Record<Tab, string> = {
  Terraform: "main.tf",
  Python: "provision.py",
  CLI: "terminal",
};

function TerraformHighlight() {
  return (
    <>
      <span className="text-code-keyword">resource</span>{" "}
      <span className="text-code-string">&quot;substrate_compute&quot;</span>{" "}
      <span className="text-code-string">&quot;train&quot;</span>{" "}
      <span className="text-fg-muted">{"{"}</span>
      {"\n"}
      {"  "}<span className="text-fg">gpu_cores</span>{"  "}
      <span className="text-fg-muted">=</span>{" "}
      <span className="text-accent">16</span>
      {"\n"}
      {"  "}<span className="text-fg">vram_gb</span>{"    "}
      <span className="text-fg-muted">=</span>{" "}
      <span className="text-accent">48</span>
      {"\n"}
      {"  "}<span className="text-fg">ram_gb</span>{"     "}
      <span className="text-fg-muted">=</span>{" "}
      <span className="text-accent">128</span>
      {"\n"}
      {"  "}<span className="text-fg">storage_gb</span>{" "}
      <span className="text-fg-muted">=</span>{" "}
      <span className="text-accent">500</span>
      {"\n"}
      <span className="text-fg-muted">{"}"}</span>
    </>
  );
}

function PythonHighlight() {
  return (
    <>
      <span className="text-code-keyword">import</span>{" "}
      <span className="text-fg">substrate</span>
      {"\n\n"}
      <span className="text-fg">client</span>
      <span className="text-fg-muted"> = </span>
      <span className="text-fg">substrate</span>
      <span className="text-fg-muted">.</span>
      <span className="text-fg">Client</span>
      <span className="text-fg-muted">()</span>
      {"\n\n"}
      <span className="text-fg">instance</span>
      <span className="text-fg-muted"> = </span>
      <span className="text-fg">client</span>
      <span className="text-fg-muted">.</span>
      <span className="text-fg">compute</span>
      <span className="text-fg-muted">.</span>
      <span className="text-fg">create</span>
      <span className="text-fg-muted">(</span>
      {"\n"}
      {"    "}<span className="text-fg">gpu_cores</span>
      <span className="text-fg-muted">=</span>
      <span className="text-accent">16</span>
      <span className="text-fg-muted">,</span>
      {"\n"}
      {"    "}<span className="text-fg">vram_gb</span>
      <span className="text-fg-muted">=</span>
      <span className="text-accent">48</span>
      <span className="text-fg-muted">,</span>
      {"\n"}
      {"    "}<span className="text-fg">ram_gb</span>
      <span className="text-fg-muted">=</span>
      <span className="text-accent">128</span>
      <span className="text-fg-muted">,</span>
      {"\n"}
      {"    "}<span className="text-fg">storage_gb</span>
      <span className="text-fg-muted">=</span>
      <span className="text-accent">500</span>
      <span className="text-fg-muted">,</span>
      {"\n"}
      <span className="text-fg-muted">)</span>
      {"\n\n"}
      <span className="text-code-keyword">print</span>
      <span className="text-fg-muted">(</span>
      <span className="text-fg">instance</span>
      <span className="text-fg-muted">.</span>
      <span className="text-fg">id</span>
      <span className="text-fg-muted">, </span>
      <span className="text-fg">instance</span>
      <span className="text-fg-muted">.</span>
      <span className="text-fg">endpoint</span>
      <span className="text-fg-muted">)</span>
    </>
  );
}

function CLIHighlight() {
  return (
    <>
      <span className="text-code-string">substrate</span>{" "}
      <span className="text-fg">compute create</span>{" "}
      <span className="text-fg-muted">\</span>
      {"\n"}
      {"  "}<span className="text-fg-muted">--</span>
      <span className="text-fg">gpu-cores</span>{" "}
      <span className="text-accent">16</span>{" "}
      <span className="text-fg-muted">\</span>
      {"\n"}
      {"  "}<span className="text-fg-muted">--</span>
      <span className="text-fg">vram</span>{" "}
      <span className="text-accent">48</span>{" "}
      <span className="text-fg-muted">\</span>
      {"\n"}
      {"  "}<span className="text-fg-muted">--</span>
      <span className="text-fg">ram</span>{" "}
      <span className="text-accent">128</span>{" "}
      <span className="text-fg-muted">\</span>
      {"\n"}
      {"  "}<span className="text-fg-muted">--</span>
      <span className="text-fg">storage</span>{" "}
      <span className="text-accent">500</span>
    </>
  );
}

const renderers: Record<Tab, () => React.JSX.Element> = {
  Terraform: TerraformHighlight,
  Python: PythonHighlight,
  CLI: CLIHighlight,
};

export function CodeBlockWithCopy() {
  const [activeTab, setActiveTab] = useState<Tab>("Terraform");
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { reduceMotion } = useMotion();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Renderer = renderers[activeTab];

  return (
    <section className="px-6 py-24 sm:py-32" ref={ref}>
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
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
          }}
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
              {/* Tab switcher */}
              <div className="ml-3 flex items-center gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-accent-light text-fg"
                        : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-fg-muted">
                {filenames[activeTab]}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-fg-muted transition-colors hover:bg-accent-light hover:text-fg"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code content with tab transition */}
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              className="overflow-x-auto p-6 text-sm leading-7"
              initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <code>
                <Renderer />
              </code>
            </motion.pre>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
