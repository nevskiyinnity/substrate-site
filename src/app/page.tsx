"use client";

import { useState } from "react";
import { IntroLoader } from "@/components/intro-loader";
import { HeroDictionary } from "@/components/hero-dictionary";
import { ConfiguratorCard } from "@/components/configurator-card";
import { LogoStrip } from "@/components/logo-strip";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureCards } from "@/components/feature-cards";
import { MetricsStrip } from "@/components/metrics-strip";
import { SecurityCompliance } from "@/components/security-compliance";
import { DatacenterShowcase } from "@/components/datacenter-showcase";
import { CodeBlockWithCopy } from "@/components/code-block";
import { ComparisonTable } from "@/components/comparison-table";
import { TargetUsers } from "@/components/target-users";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIntroComplete(true)} />
      <div
        className={`transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <main>
          <HeroDictionary />
          <ConfiguratorCard />
          <LogoStrip />
          <HowItWorks />
          <FeatureCards />
          <MetricsStrip />
          <SecurityCompliance />
          <DatacenterShowcase />
          <CodeBlockWithCopy />
          <ComparisonTable />
          <TargetUsers />
          <FaqSection />
          <CtaSection />
        </main>
      </div>
    </>
  );
}
