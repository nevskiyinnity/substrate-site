"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface MotionContextValue {
  reduceMotion: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  reduceMotion: false,
  toggleMotion: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

const STORAGE_KEY = "substrate-reduce-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setReduceMotion(stored === "true");
    } else {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(mq.matches);
    }
  }, []);

  const toggleMotion = useCallback(() => {
    setReduceMotion((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
