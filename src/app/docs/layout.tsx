"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Getting Started", href: "/docs" },
  { label: "API Reference", href: "/docs/api" },
  { label: "CLI Reference", href: "/docs/cli" },
  { label: "Terraform Provider", href: "/docs/terraform" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/docs") return pathname === "/docs";
    return pathname.startsWith(href);
  }

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 pt-28 pb-24">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="sticky top-24 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(link.href)
                  ? "bg-accent-light font-medium text-fg"
                  : "text-fg-muted hover:bg-accent-light hover:text-fg"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">{children}</main>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl md:hidden"
        aria-label="Open docs navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 left-0 h-full w-72 bg-white px-6 pt-6 pb-10 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-fg">
                Documentation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-accent-light hover:text-fg"
                aria-label="Close docs navigation"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-accent-light font-medium text-fg"
                      : "text-fg-muted hover:bg-accent-light hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
