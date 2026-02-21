"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMotion } from "./motion-provider";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  settled: boolean;
}

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"particles" | "hold" | "fade">("particles");
  const [visible, setVisible] = useState(true);
  const { reduceMotion } = useMotion();
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const skip = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    setVisible(false);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  // Skip immediately if reduced motion
  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      onComplete();
    }
  }, [reduceMotion, onComplete]);

  // Skip on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [skip]);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const centerX = w / 2;
    const centerY = h / 2 + 20;
    const lineWidth = Math.min(200, w * 0.3);
    const particleCount = 30;

    // Create particles scattered around center
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const targetX = centerX - lineWidth / 2 + (lineWidth / (particleCount - 1)) * i;
      const targetY = centerY;
      return {
        x: centerX + (Math.random() - 0.5) * w * 0.6,
        y: centerY + (Math.random() - 0.5) * h * 0.4,
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        settled: false,
      };
    });

    startTimeRef.current = performance.now();
    let holdStart = 0;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      ctx.clearRect(0, 0, w, h);

      if (phase === "particles" || elapsed < 800) {
        // Drift phase (first 300ms), then spring to targets
        const springStart = 300;
        const springStrength = elapsed > springStart ? 0.08 : 0;
        const damping = 0.85;

        let allSettled = true;

        particles.forEach((p) => {
          if (elapsed <= springStart) {
            // Gentle drift
            p.x += p.vx;
            p.y += p.vy;
          } else {
            // Spring toward target
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.vx = (p.vx + dx * springStrength) * damping;
            p.vy = (p.vy + dy * springStrength) * damping;
            p.x += p.vx;
            p.y += p.vy;

            const dist = Math.sqrt(dx * dx + dy * dy);
            p.settled = dist < 0.5 && Math.abs(p.vx) < 0.1;
            if (!p.settled) allSettled = false;
          }

          // Draw particle
          const opacity = elapsed < 100 ? elapsed / 100 : 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${opacity * 0.6})`;
          ctx.fill();
        });

        if (allSettled && elapsed > springStart + 200) {
          setPhase("hold");
          holdStart = now;
        }
      }

      if (phase === "hold") {
        if (!holdStart) holdStart = now;
        const holdElapsed = now - holdStart;

        // Draw settled line
        const lineOpacity = holdElapsed > 400 ? Math.max(0, 1 - (holdElapsed - 400) / 300) : 1;
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.targetX, p.targetY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${lineOpacity * 0.6})`;
          ctx.fill();
        });

        if (holdElapsed > 700) {
          setPhase("fade");
          setVisible(false);
          setTimeout(onComplete, 400);
          return;
        }
      }

      // Safety timeout at 2s
      if (elapsed > 2000) {
        skip();
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [reduceMotion, onComplete, phase, skip]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-white"
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Substrate
            </h1>
            <p className="mt-1 text-center text-sm italic text-fg-muted">
              noun
            </p>
          </div>
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0"
          />
          <motion.p
            className="mt-6 max-w-md text-center text-sm text-fg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            An underlying layer that supports complex systems.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
