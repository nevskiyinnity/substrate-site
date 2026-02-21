# Substrate Site Completion — Design Doc

**Date:** 2026-02-22
**Goal:** Transform the single-page landing into a complete company website with enriched homepage content and full inner pages.

## Context

The site (onsubstrate.run) is a polished single-page marketing site. All nav/footer links point to `#`. No inner pages exist. Key new content inputs:
- **Hosting:** Lefdal Mine Datacenter (underground, Norway, 100% hydropower)
- **Compliance:** SOC 2 Type II, HIPAA, zero data logging

## Architecture

Migrate from single-page `"use client"` root to proper Next.js App Router with shared layout. NavHeader + Footer move into `layout.tsx`. IntroLoader only plays on `/`.

```
src/app/
  layout.tsx          ← shared: NavHeader + Footer
  page.tsx            ← landing page
  pricing/page.tsx
  about/page.tsx
  security/page.tsx
  contact/page.tsx
  changelog/page.tsx
  docs/
    layout.tsx        ← docs sidebar nav
    page.tsx          ← Getting Started
    api/page.tsx      ← API Reference
    cli/page.tsx      ← CLI Reference
    terraform/page.tsx
  sitemap.ts
  robots.ts
```

## New Landing Page Sections

### 1. Security & Compliance (after MetricsStrip)
Dark section (`bg-fg`). Four badges in a row:
- **SOC 2 Type II** — Audited annually. Full audit report available under NDA.
- **HIPAA Compliant** — BAA available. PHI-safe infrastructure for healthcare AI.
- **Zero Data Logging** — We never inspect, log, or retain your workload data.
- **100% Renewable** — Hosted in Lefdal Mine, powered by Norwegian hydropower.

Quote line below: "Your infrastructure should never be the weakest link in your security posture."

### 2. Datacenter Showcase (after Security)
Side-by-side layout:
- **Left:** "Built inside a mountain" + Lefdal Mine description (former NATO mine, Tier III equivalent, fjord water cooling)
- **Right:** Spec grid — Location (Måløy, Norway), Power (100% renewable hydropower), Cooling (fjord water natural cooling), Security (underground rock facility)

`bg-surface` with topographic contour-line CSS pattern.

### 3. Comparison Table (before Target Users)
6-row table: Substrate vs AWS EC2 vs GCP Compute vs Lambda Cloud.
Rows: Custom GPU allocation, VRAM configuration, Billing granularity, Provisioning time, Data logging, Compliance.
Substrate column accent-highlighted.

### 4. FAQ (after Target Users, before CTA)
Accordion with 8 questions covering composable compute, GPU availability, billing, data logging, compliance, data centers, HIPAA workloads, getting started.

## Inner Pages

### /pricing
- Hero: "Simple, transparent pricing"
- 3 tiers: Starter ($0.10/core/hr, up to 16 cores), Pro ($0.08/core/hr, up to 64 cores), Enterprise (custom)
- Rate card table (per-unit pricing)
- Embedded configurator component
- Pricing FAQ

### /about
- Mission: "We believe compute should be composable"
- Lefdal Mine story
- Team placeholders (4-6 cards)
- Values: Transparency, Efficiency, Security

### /security
- Trust badges hero
- SOC 2 + HIPAA details with report download CTA
- Zero-logging policy explanation
- Encryption specs (AES-256, TLS 1.3, secure enclaves)
- Lefdal physical security
- Responsible disclosure CTA

### /docs (4 pages with shared sidebar)
- **Getting Started:** Install CLI → authenticate → provision → run job
- **API Reference:** 6 REST endpoints with method, URL, request/response JSON
- **CLI Reference:** 8 commands with usage, flags, examples
- **Terraform Provider:** Provider config, substrate_compute resource, substrate_network resource

### /contact
- Split layout: form (name, email, company, message) + info (email, response time, location)

### /changelog
- Timeline: 4 entries (v0.4.0 Terraform GA, v0.3.0 HIPAA cert, v0.2.0 per-second billing, v0.1.0 beta launch)

## Updated Landing Page Section Order

1. NavHeader (shared layout)
2. ScrollProgress
3. IntroLoader (homepage only)
4. HeroDictionary
5. ConfiguratorCard
6. LogoStrip
7. HowItWorks
8. FeatureCards
9. MetricsStrip
10. SecurityCompliance ← NEW
11. DatacenterShowcase ← NEW
12. CodeBlockWithCopy
13. ComparisonTable ← NEW
14. TargetUsers
15. FAQ ← NEW
16. CtaSection
17. Footer (shared layout)

## Not in Scope
- Authentication / user dashboard
- Real backend compute provisioning
- CMS or MDX blog
- Analytics / error tracking integration
- Waitlist API backend (form remains visual)
