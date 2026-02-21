"use client";

import { useScroll, useSpring, motion } from "motion/react";
import { useMotion } from "./motion-provider";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const { reduceMotion } = useMotion();

  if (reduceMotion) return null;

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
