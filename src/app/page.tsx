"use client";

import { useState } from "react";
import { MotionProvider } from "@/components/motion-provider";
import { IntroLoader } from "@/components/intro-loader";
import { HeroDictionary } from "@/components/hero-dictionary";
import { ConfiguratorCard } from "@/components/configurator-card";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureCards } from "@/components/feature-cards";
import { CodeBlockWithCopy } from "@/components/code-block";
import { TargetUsers } from "@/components/target-users";
import { Footer } from "@/components/footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <MotionProvider>
      <IntroLoader onComplete={() => setIntroComplete(true)} />

      <main
        className={`transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroDictionary />
        <ConfiguratorCard />
        <HowItWorks />
        <FeatureCards />
        <CodeBlockWithCopy />
        <TargetUsers />
        <Footer />
      </main>
    </MotionProvider>
  );
}
