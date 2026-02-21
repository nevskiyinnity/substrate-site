"use client";

import { MotionProvider } from "./motion-provider";
import { NavHeader } from "./nav-header";
import { ScrollProgress } from "./scroll-progress";
import { Footer } from "./footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <ScrollProgress />
      <NavHeader />
      {children}
      <Footer />
    </MotionProvider>
  );
}
