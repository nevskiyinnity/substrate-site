"use client";

import { useState } from "react";
import { MotionProvider } from "@/components/motion-provider";
import { IntroLoader } from "@/components/intro-loader";
import { ScrollProgress } from "@/components/scroll-progress";
import { NavHeader } from "@/components/nav-header";
import { HeroDictionary } from "@/components/hero-dictionary";
import { ConfiguratorCard } from "@/components/configurator-card";
import { LogoStrip } from "@/components/logo-strip";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureCards } from "@/components/feature-cards";
import { MetricsStrip } from "@/components/metrics-strip";
import { CodeBlockWithCopy } from "@/components/code-block";
import { TargetUsers } from "@/components/target-users";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <MotionProvider>
      <IntroLoader onComplete={() => setIntroComplete(true)} />

      <div
        className={`transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <ScrollProgress />
        <NavHeader />
        <main>
          <HeroDictionary />
          <ConfiguratorCard />
          <LogoStrip />
          <HowItWorks />
          <FeatureCards />
          <MetricsStrip />
          <CodeBlockWithCopy />
          <TargetUsers />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
