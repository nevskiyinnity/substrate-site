"use client";

import Link from "next/link";
import { useMotion } from "./motion-provider";

const footerLinks = {
  Product: [
    { label: "Overview", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Security", href: "/security" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "CLI Guide", href: "/docs/cli" },
    { label: "Terraform Provider", href: "/docs/terraform" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "/security" },
    { label: "SLA", href: "#" },
  ],
};

export function Footer() {
  const { reduceMotion, toggleMotion } = useMotion();

  return (
    <footer className="bg-fg px-6 pt-16 pb-12">
      <div className="mx-auto max-w-5xl">
        {/* Top: logo + waitlist */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-semibold text-white">Substrate</p>
            <p className="mt-1 text-sm text-white/50">
              Composable GPU infrastructure
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-4">
              <a href="#" className="text-white/40 transition-colors hover:text-white/70" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 transition-colors hover:text-white/70" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 transition-colors hover:text-white/70" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Waitlist input */}
          <div className="max-w-xs">
            <p className="text-sm font-medium text-white">Join the waitlist</p>
            <p className="mt-1 text-xs text-white/40">
              Early access for ML teams and research labs.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-accent/60"
              />
              <button className="rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* 4-column nav */}
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                {category}
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {links.map((link) =>
                  link.href === "#" ? (
                    <a
                      key={link.label}
                      href="#"
                      className="text-sm text-white/40 transition-colors hover:text-white/70"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-white/40 transition-colors hover:text-white/70"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Substrate. All rights reserved.
          </p>

          <button
            onClick={toggleMotion}
            className="flex items-center gap-2 text-xs text-white/30 transition-colors hover:text-white/50"
          >
            <span>Reduced motion</span>
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                reduceMotion ? "bg-accent" : "bg-white/15"
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
