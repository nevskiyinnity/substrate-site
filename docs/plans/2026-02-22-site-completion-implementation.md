# Substrate Site Completion — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the single-page landing into a complete company website with 4 new landing page sections, 9 inner pages, proper App Router routing, and SEO infrastructure.

**Architecture:** Migrate from single `"use client"` page.tsx to Next.js App Router with shared layout (NavHeader + Footer in layout.tsx). Landing page keeps its MotionProvider + IntroLoader wrapper. Inner pages are server components where possible, with `"use client"` only for interactive elements. Docs pages share a sidebar layout.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (@theme), Motion (motion/react), TypeScript

---

## Phase 1: Architecture Migration (shared layout + routing)

### Task 1: Move NavHeader + Footer into shared layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/components/client-layout.tsx`

**Step 1: Create a client layout wrapper**

Since NavHeader, Footer, MotionProvider, and ScrollProgress need React context (`"use client"`), create a client wrapper component that layout.tsx can import.

Create `src/components/client-layout.tsx`:
```tsx
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
```

**Step 2: Update layout.tsx to use ClientLayout**

Modify `src/app/layout.tsx` — wrap `{children}` with `<ClientLayout>`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Substrate — Composable GPU Infrastructure",
  description: "Configure compute by cores, VRAM, memory, and storage. Composable GPU infrastructure for ML teams, research labs, and AI startups.",
  openGraph: {
    title: "Substrate — Composable GPU Infrastructure",
    description: "Configure compute by cores, VRAM, memory, and storage.",
    url: "https://onsubstrate.run",
    siteName: "Substrate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Substrate — Composable GPU Infrastructure",
    description: "Configure compute by cores, VRAM, memory, and storage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

**Step 3: Update page.tsx to remove NavHeader/Footer/ScrollProgress/MotionProvider**

Remove the imports and JSX for NavHeader, Footer, ScrollProgress, and MotionProvider from `src/app/page.tsx`. Keep IntroLoader (homepage-only). The page should become:

```tsx
"use client";

import { useState } from "react";
import { IntroLoader } from "@/components/intro-loader";
import { HeroDictionary } from "@/components/hero-dictionary";
import { ConfiguratorCard } from "@/components/configurator-card";
import { LogoStrip } from "@/components/logo-strip";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureCards } from "@/components/feature-cards";
import { MetricsStrip } from "@/components/metrics-strip";
import { CodeBlockWithCopy } from "@/components/code-block";
import { TargetUsers } from "@/components/target-users";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setIntroComplete(true)} />
      <div
        className={`transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
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
      </div>
    </>
  );
}
```

**Step 4: Fix MotionProvider dependency in intro-loader**

The IntroLoader uses `useMotion()` which needs MotionProvider. Since MotionProvider is now in ClientLayout (which wraps everything), this should work automatically. Verify no circular dependencies.

**Step 5: Verify build**

Run: `cd /Users/iliazharnikov/Documents/GitHub/substrate-site && npm run build`
Expected: Build succeeds with zero errors.

**Step 6: Verify in browser**

Run: `npm run dev` and check http://localhost:3000
Expected: Homepage renders identically to current production (intro animation, all sections, nav, footer).

**Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/client-layout.tsx
git commit -m "refactor: move nav/footer into shared layout for multi-page routing"
```

---

### Task 2: Update NavHeader with real links and active states

**Files:**
- Modify: `src/components/nav-header.tsx`

**Step 1: Add usePathname and Link imports, update nav links**

Replace all `<a href="#">` with Next.js `<Link>` components pointing to real routes. Add active state highlighting using `usePathname()`.

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMotion } from "./motion-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Product", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];
```

Update the nav link rendering to use `<Link>` and active class:
```tsx
{links.map((link) => {
  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
  return (
    <Link
      key={link.label}
      href={link.href}
      className={`nav-link text-sm transition-colors ${
        isActive ? "text-fg font-medium" : "text-fg-muted hover:text-fg"
      }`}
    >
      {link.label}
    </Link>
  );
})}
```

Update logo to link home: `<Link href="/" className="...">Substrate</Link>`

Update "Get access" CTA to link to `/pricing`.
Update "Sign in" to remain as `href="#"` (no auth yet).

Update mobile menu similarly — all `<a href="#">` become `<Link>` with proper hrefs.

**Step 2: Verify build**

Run: `npm run build`
Expected: Zero errors.

**Step 3: Commit**

```bash
git add src/components/nav-header.tsx
git commit -m "feat: add real nav links with active state highlighting"
```

---

### Task 3: Update Footer with real links

**Files:**
- Modify: `src/components/footer.tsx`

**Step 1: Replace footer link hrefs**

Update the footerLinks object to include real hrefs:

```tsx
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
```

Replace `<a href="#">` with `<Link>` from `next/link` for all real routes. Keep `#` for Blog/Careers/Privacy/Terms/SLA (not built yet).

**Step 2: Verify build + commit**

```bash
npm run build
git add src/components/footer.tsx
git commit -m "feat: wire footer links to real routes"
```

---

### Task 4: Add SEO infrastructure (sitemap + robots)

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1: Create sitemap.ts**

```tsx
import type { MetadatRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://onsubstrate.run";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/docs/api`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/docs/cli`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/docs/terraform`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/changelog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];
}
```

**Step 2: Create robots.ts**

```tsx
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://onsubstrate.run/sitemap.xml",
  };
}
```

**Step 3: Verify build + commit**

```bash
npm run build
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt generation"
```

---

## Phase 2: New Landing Page Sections

### Task 5: Security & Compliance section

**Files:**
- Create: `src/components/security-compliance.tsx`
- Modify: `src/app/page.tsx` (add to section order)

**Step 1: Create the component**

Dark section (`bg-fg`) with 4 compliance badges and a quote. Each badge has an SVG icon, title, and description. Uses scroll-triggered fade-in animation.

Create `src/components/security-compliance.tsx` with:
- 4 badges: SOC 2 Type II (shield), HIPAA Compliant (lock), Zero Data Logging (eye-slash), 100% Renewable (leaf)
- Quote line below badges
- `bg-fg` background, `text-white` text
- Same motion pattern as other sections (useInView, useMotion)

**Step 2: Add to page.tsx**

Import and place after `<MetricsStrip />`, before `<CodeBlockWithCopy />`:
```tsx
import { SecurityCompliance } from "@/components/security-compliance";
// ...
<MetricsStrip />
<SecurityCompliance />
<DatacenterShowcase />  // (Task 6)
<CodeBlockWithCopy />
```

**Step 3: Verify build + visual check + commit**

```bash
npm run build
git add src/components/security-compliance.tsx src/app/page.tsx
git commit -m "feat: add security & compliance section with trust badges"
```

---

### Task 6: Datacenter Showcase section

**Files:**
- Create: `src/components/datacenter-showcase.tsx`
- Modify: `src/app/globals.css` (add contour-line CSS pattern)
- Modify: `src/app/page.tsx` (add to section order)

**Step 1: Add topographic contour pattern to globals.css**

```css
/* Topographic contour pattern */
.contour-grid {
  background-image:
    radial-gradient(ellipse 200px 200px at 30% 40%, rgba(120,113,108,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 150px 150px at 70% 60%, rgba(120,113,108,0.04) 0%, transparent 70%);
}
```

**Step 2: Create the component**

Side-by-side layout:
- Left: "Built inside a mountain" heading + Lefdal Mine description (2 paragraphs)
- Right: 4-item spec grid (Location, Power, Cooling, Security)
- `bg-surface` background with contour-grid overlay
- Standard scroll-triggered motion

**Step 3: Add to page.tsx after SecurityCompliance**

**Step 4: Verify build + visual check + commit**

```bash
npm run build
git add src/components/datacenter-showcase.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add Lefdal Mine datacenter showcase section"
```

---

### Task 7: Comparison Table section

**Files:**
- Create: `src/components/comparison-table.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the component**

Responsive table comparing Substrate vs AWS EC2 vs GCP Compute vs Lambda Cloud across 6 rows. Substrate column highlighted with `bg-accent-light`. Checkmarks (accent-colored) for Substrate advantages, neutral text for others.

On mobile: horizontally scrollable with fixed first column.

Columns: Feature | Substrate | AWS EC2 | GCP Compute | Lambda Cloud
Rows:
1. GPU allocation — "Exact core count" vs "Fixed SKUs" x3
2. VRAM config — "Per-GB" vs "Tied to instance" x3
3. Billing — "Per-second" vs "Per-second" vs "Per-second" vs "Per-hour"
4. Provisioning — "< 30s" vs "Minutes" x3
5. Data logging — "None" vs "CloudTrail" vs "Cloud Audit" vs "Varies"
6. Compliance — "SOC 2, HIPAA" vs "SOC 2, HIPAA" vs "SOC 2, HIPAA" vs "SOC 2"

Place after CodeBlockWithCopy, before TargetUsers.

**Step 2: Verify build + commit**

```bash
npm run build
git add src/components/comparison-table.tsx src/app/page.tsx
git commit -m "feat: add provider comparison table"
```

---

### Task 8: FAQ section

**Files:**
- Create: `src/components/faq-section.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create the component**

Accordion-style FAQ with 8 questions. Each item has a question (button) and collapsible answer. Use `useState` for open/close toggling with smooth height animation via AnimatePresence + motion.div.

Questions:
1. How does composable compute differ from traditional cloud instances?
2. What GPUs are available?
3. How does per-second billing work?
4. Is my data logged or inspected?
5. What compliance certifications do you hold?
6. Where are your data centers located?
7. Can I use Substrate for HIPAA-regulated workloads?
8. How do I get started?

Each answer is 2-3 sentences of realistic-sounding content.

Place after TargetUsers, before CtaSection.

**Step 2: Verify build + commit**

```bash
npm run build
git add src/components/faq-section.tsx src/app/page.tsx
git commit -m "feat: add FAQ accordion section"
```

---

## Phase 3: Inner Pages

### Task 9: Pricing page

**Files:**
- Create: `src/app/pricing/page.tsx`

**Step 1: Create the pricing page**

Content:
- Page metadata (title: "Pricing — Substrate")
- Hero: "Simple, transparent pricing" + "Pay for what you use. Scale without commitment."
- 3 tier cards side by side:
  - **Starter**: $0.10/core/hr, up to 16 cores, 64GB VRAM, community support, basic monitoring
  - **Pro**: $0.08/core/hr, up to 64 cores, 128GB VRAM, priority support, SOC 2 report, custom networking — "Most popular" badge
  - **Enterprise**: Custom pricing, unlimited cores, HIPAA BAA, dedicated account manager, custom SLAs, SSO
- Rate card table below: unit pricing for cores, VRAM, RAM, storage
- Reuse ConfiguratorCard component (import and embed)
- 4-5 pricing FAQ items at bottom

Use `"use client"` since it embeds the configurator. Apply same design tokens and typography as landing page. Cards use the same shadow/border treatment as feature-cards.

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/pricing/page.tsx"
git commit -m "feat: add pricing page with tiers and rate card"
```

---

### Task 10: About page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create the about page**

Content:
- Page metadata (title: "About — Substrate")
- Hero: "We believe compute should be composable"
- Mission section: 2 paragraphs about why fixed compute SKUs are broken and Substrate's approach
- Lefdal story: "Why we built inside a mountain" — 2 paragraphs about choosing Lefdal Mine
- Team section: 4 placeholder cards (CEO, CTO, Head of Infra, Head of Product) with gray avatar circles, names, and roles
- Values: 3 cards — Transparency, Efficiency, Security — each with icon + 2-sentence description

Server component (no interactivity needed). Standard section spacing (py-24 sm:py-32).

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/about/page.tsx"
git commit -m "feat: add about page with mission, team, and values"
```

---

### Task 11: Security page

**Files:**
- Create: `src/app/security/page.tsx`

**Step 1: Create the security page**

Content:
- Page metadata (title: "Security — Substrate")
- Hero: "Security is infrastructure" + 4 trust badges (reuse the same visual from landing page SecurityCompliance section — extract shared badge data)
- Compliance section: SOC 2 Type II details (what it covers, audit frequency, report access) + HIPAA details (BAA availability, PHI handling, eligible workloads)
- Zero-logging policy: "What we mean by zero data logging" — bullet list of what IS and IS NOT logged
- Encryption: at-rest (AES-256), in-transit (TLS 1.3), at-compute (secure enclaves, memory encryption)
- Physical security: Lefdal Mine — underground rock facility, biometric access, 24/7 CCTV, Tier III equivalent
- Responsible disclosure section with email CTA (security@onsubstrate.run)

Server component. Clean documentation-style layout with clear headings and spacing.

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/security/page.tsx"
git commit -m "feat: add security page with compliance details and Lefdal specs"
```

---

### Task 12: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Create the contact page**

Content:
- Page metadata (title: "Contact — Substrate")
- Split layout:
  - Left: Contact form (name, email, company, message textarea, submit button) — purely visual, no backend wiring
  - Right: Direct contact info — email (hello@onsubstrate.run), response time ("< 24 hours"), location (Måløy, Norway)
- `"use client"` for form state handling (controlled inputs)

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/contact/page.tsx"
git commit -m "feat: add contact page with form and info"
```

---

### Task 13: Changelog page

**Files:**
- Create: `src/app/changelog/page.tsx`

**Step 1: Create the changelog page**

Content:
- Page metadata (title: "Changelog — Substrate")
- Hero: "Changelog" + "What's new in Substrate"
- Timeline layout with 4 entries, most recent first:
  - **v0.4.0** (Feb 2026) — "Terraform Provider GA": Full Terraform provider with substrate_compute and substrate_network resources
  - **v0.3.0** (Jan 2026) — "HIPAA Compliance": SOC 2 Type II and HIPAA certification, BAA available for enterprise customers
  - **v0.2.0** (Dec 2025) — "Per-Second Billing": Granular billing with sub-second metering, automatic teardown
  - **v0.1.0** (Nov 2025) — "Beta Launch": First public beta at Lefdal Mine Datacenter, API and CLI access

Each entry: version badge, date, title, 2-3 sentence description, list of key changes.

Server component. Left-border timeline with accent dots.

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/changelog/page.tsx"
git commit -m "feat: add changelog page with release timeline"
```

---

### Task 14: Docs layout with sidebar

**Files:**
- Create: `src/app/docs/layout.tsx`

**Step 1: Create the docs sidebar layout**

Shared layout for all `/docs/*` pages. Two-column layout:
- Left sidebar (w-64, hidden on mobile, togglable): navigation links to all doc pages
- Right main content area

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const docNav = [
  { label: "Getting Started", href: "/docs" },
  { label: "API Reference", href: "/docs/api" },
  { label: "CLI Reference", href: "/docs/cli" },
  { label: "Terraform Provider", href: "/docs/terraform" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-24">
      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 flex flex-col gap-1">
            {docNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-accent-light font-medium text-fg"
                    : "text-fg-muted hover:bg-accent-light hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg md:hidden"
          aria-label="Toggle docs navigation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        {/* Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/docs/layout.tsx"
git commit -m "feat: add docs layout with sidebar navigation"
```

---

### Task 15: Docs — Getting Started page

**Files:**
- Create: `src/app/docs/page.tsx`

**Step 1: Create the getting started guide**

Content structure (documentation-style with code blocks):
- Page metadata (title: "Getting Started — Substrate Docs")
- H1: "Getting Started"
- Introduction paragraph
- "Install the CLI" section with bash code block: `curl -fsSL https://get.onsubstrate.run | sh`
- "Authenticate" section: `substrate auth login`
- "Provision your first instance" section: `substrate compute create --gpu-cores 4 --vram 24 --ram 64 --storage 100`
- "Connect to your instance" section: `substrate compute ssh <instance-id>`
- "Run a training job" section with Python code example
- "Clean up" section: `substrate compute delete <instance-id>`
- "Next steps" with links to API Reference, CLI Reference, Terraform Provider

Use `<pre><code>` blocks with the same code styling tokens as the landing page code block (bg-[#FAFAFA], border, rounded-xl, code-keyword/string colors).

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/docs/page.tsx"
git commit -m "feat: add getting started docs page"
```

---

### Task 16: Docs — API Reference page

**Files:**
- Create: `src/app/docs/api/page.tsx`

**Step 1: Create the API reference**

Content: 6 REST API endpoints with realistic request/response examples.

Endpoints:
1. `GET /v1/instances` — List all instances
2. `POST /v1/instances` — Create an instance (request body with gpu_cores, vram_gb, ram_gb, storage_gb)
3. `GET /v1/instances/:id` — Get instance details
4. `PATCH /v1/instances/:id` — Update an instance
5. `DELETE /v1/instances/:id` — Delete an instance
6. `GET /v1/instances/:id/metrics` — Get instance metrics

Each endpoint has: HTTP method badge (colored), URL, description, request body (JSON), response body (JSON), status codes.

Base URL: `https://api.onsubstrate.run/v1`
Auth: `Authorization: Bearer sk_live_...`

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/docs/api/page.tsx"
git commit -m "feat: add API reference docs page"
```

---

### Task 17: Docs — CLI Reference page

**Files:**
- Create: `src/app/docs/cli/page.tsx`

**Step 1: Create the CLI reference**

Content: 8 commands with usage, flags, and examples.

Commands:
1. `substrate auth login` — Authenticate with your Substrate account
2. `substrate compute create` — Provision a new compute instance (flags: --gpu-cores, --vram, --ram, --storage, --region, --name)
3. `substrate compute list` — List all active instances
4. `substrate compute get <id>` — Show instance details
5. `substrate compute ssh <id>` — SSH into a running instance
6. `substrate compute stop <id>` — Stop an instance (keeps storage)
7. `substrate compute delete <id>` — Permanently delete an instance
8. `substrate status` — Check service health

Each command: usage line, description, flags table, example with output.

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/docs/cli/page.tsx"
git commit -m "feat: add CLI reference docs page"
```

---

### Task 18: Docs — Terraform Provider page

**Files:**
- Create: `src/app/docs/terraform/page.tsx`

**Step 1: Create the Terraform provider docs**

Content:
- Provider configuration (required: api_key, optional: region)
- `substrate_compute` resource (all attributes: gpu_cores, vram_gb, ram_gb, storage_gb, name, region)
- `substrate_network` resource (vpc_id, subnet_cidr, enable_public_ip)
- Data sources: `substrate_regions`, `substrate_gpu_availability`
- Complete example module that provisions a training cluster (3 instances + network)

All code blocks use HCL/Terraform syntax. Same code block styling as the rest of the docs.

**Step 2: Verify build + commit**

```bash
npm run build
git add "src/app/docs/terraform/page.tsx"
git commit -m "feat: add Terraform provider docs page"
```

---

## Phase 4: Final Polish

### Task 19: Build verification and push

**Step 1: Full build check**

Run: `cd /Users/iliazharnikov/Documents/GitHub/substrate-site && npm run build`
Expected: Zero errors, all routes listed in output.

**Step 2: Visual verification**

Run: `npm run dev` and check every route:
- http://localhost:3000 (landing page with all new sections)
- http://localhost:3000/pricing
- http://localhost:3000/about
- http://localhost:3000/security
- http://localhost:3000/contact
- http://localhost:3000/changelog
- http://localhost:3000/docs
- http://localhost:3000/docs/api
- http://localhost:3000/docs/cli
- http://localhost:3000/docs/terraform

Check:
- Nav active states highlight correctly per page
- Footer links navigate to correct pages
- Docs sidebar highlights active page
- All pages have proper spacing below fixed nav (pt-28 or similar)
- Mobile hamburger menu links work

**Step 3: Push to GitHub**

```bash
git push origin main
```

Vercel auto-deploys. Verify on https://onsubstrate.run.
