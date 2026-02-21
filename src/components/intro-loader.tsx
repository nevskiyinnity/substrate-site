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
  const [visible, setVisible] = useState(true);
  const { reduceMotion } = useMotion();
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const phaseRef = useRef<"drift" | "spring" | "hold" | "fade">("drift");
  const holdStartRef = useRef(0);

  const skip = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    setVisible(false);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      onComplete();
    }
  }, [reduceMotion, onComplete]);

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
    const lineWidth = Math.min(220, w * 0.35);
    const particleCount = 30;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const targetX = centerX - lineWidth / 2 + (lineWidth / (particleCount - 1)) * i;
      const targetY = centerY;
      return {
        x: centerX + (Math.random() - 0.5) * w * 0.7,
        y: centerY + (Math.random() - 0.5) * h * 0.5,
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        settled: false,
      };
    });

    startTimeRef.current = performance.now();

    // Timing: drift 800ms → spring ~1200ms → hold 1000ms → fade 500ms = ~3.5s total
    const DRIFT_DURATION = 800;
    const HOLD_DURATION = 1000;
    const FADE_DURATION = 500;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      ctx.clearRect(0, 0, w, h);

      const phase = phaseRef.current;

      if (phase === "drift" || phase === "spring") {
        const inSpring = elapsed > DRIFT_DURATION;
        if (inSpring && phase === "drift") {
          phaseRef.current = "spring";
        }

        // Slower spring for more organic convergence
        const springStrength = inSpring ? 0.04 : 0;
        const damping = 0.88;
        let allSettled = true;

        particles.forEach((p) => {
          if (!inSpring) {
            // Gentle drift
            p.x += p.vx;
            p.y += p.vy;
            // Slight random wobble
            p.vx += (Math.random() - 0.5) * 0.02;
            p.vy += (Math.random() - 0.5) * 0.02;
          } else {
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            p.vx = (p.vx + dx * springStrength) * damping;
            p.vy = (p.vy + dy * springStrength) * damping;
            p.x += p.vx;
            p.y += p.vy;

            const dist = Math.sqrt(dx * dx + dy * dy);
            p.settled = dist < 0.5 && Math.abs(p.vx) < 0.05;
            if (!p.settled) allSettled = false;
          }

          // Fade in particles
          const fadeIn = Math.min(1, elapsed / 200);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${fadeIn * 0.6})`;
          ctx.fill();
        });

        if (allSettled && inSpring) {
          phaseRef.current = "hold";
          holdStartRef.current = now;
        }
      }

      if (phase === "hold") {
        if (!holdStartRef.current) holdStartRef.current = now;
        const holdElapsed = now - holdStartRef.current;

        // Draw settled line, fade out at end of hold
        const lineOpacity =
          holdElapsed > HOLD_DURATION
            ? Math.max(0, 1 - (holdElapsed - HOLD_DURATION) / FADE_DURATION)
            : 1;

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.targetX, p.targetY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 113, 108, ${lineOpacity * 0.6})`;
          ctx.fill();
        });

        if (holdElapsed > HOLD_DURATION + FADE_DURATION) {
          phaseRef.current = "fade";
          setVisible(false);
          setTimeout(onComplete, 400);
          return;
        }
      }

      // Safety timeout at 5s
      if (elapsed > 5000) {
        skip();
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [reduceMotion, onComplete, skip]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-white"
          onClick={skip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.h1
              className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Substrate
            </motion.h1>
            <motion.p
              className="mt-1 text-center text-sm italic text-fg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              noun
            </motion.p>
          </div>
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0"
          />
          <motion.p
            className="mt-6 max-w-md text-center text-sm leading-relaxed text-fg-muted"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            An underlying layer that supports complex systems.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
