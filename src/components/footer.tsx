"use client";

import { useMotion } from "./motion-provider";

export function Footer() {
  const { reduceMotion, toggleMotion } = useMotion();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-semibold text-fg">Substrate</p>
            <p className="mt-1 text-sm text-fg-muted">
              Composable GPU infrastructure
            </p>
          </div>

          <div className="flex gap-8">
            <nav className="flex flex-col gap-2 text-sm text-fg-muted">
              <a href="#" className="transition-colors hover:text-fg">
                Docs
              </a>
              <a href="#" className="transition-colors hover:text-fg">
                Pricing
              </a>
            </nav>
            <nav className="flex flex-col gap-2 text-sm text-fg-muted">
              <a href="#" className="transition-colors hover:text-fg">
                Status
              </a>
              <a href="#" className="transition-colors hover:text-fg">
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            &copy; {new Date().getFullYear()} Substrate. All rights reserved.
          </p>

          <button
            onClick={toggleMotion}
            className="flex items-center gap-2 text-xs text-fg-muted transition-colors hover:text-fg"
          >
            <span>Reduced motion</span>
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                reduceMotion ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                  reduceMotion ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
