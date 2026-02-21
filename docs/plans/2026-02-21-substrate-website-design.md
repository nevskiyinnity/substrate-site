# Substrate Website Design

## Summary
Single-page marketing site for Substrate (onsubstrate.run), a composable GPU infrastructure platform. Next.js 15 + Tailwind + Framer Motion. Canvas 2D intro animation. Warm stone accent (#78716C).

## Sections
1. **IntroLoader** — Canvas 2D, ~30 particles settle into baseline under wordmark, 1.5s, skip on click/Esc
2. **HeroDictionary** — Large typography: "Substrate / noun / definition", product line, two CTAs
3. **ConfiguratorCard** — 4 sliders (GPU cores, VRAM, RAM, Storage), live summary with animated counters, price placeholder
4. **HowItWorks** — "Compute, assembled to your needs", horizontal stepper, scroll-triggered layer animation
5. **FeatureCards** — 3 cards (no oversized instances, predictable performance, AI workloads), hover micro-interactions
6. **CodeBlockWithCopy** — Terraform-style config snippet, copy button with checkmark animation
7. **TargetUsers** — 5 audience cards (ML engineers, startups, research labs, rendering, simulation)
8. **Footer** — Docs/Pricing/Status/Contact, motion toggle, copyright

## Color System
- Accent: #78716C (warm stone)
- Accent hover: #57534E
- Accent light: #F5F5F4
- Foreground: #1A1A1A
- Muted: #6B7280
- Background: #FFFFFF
- Border: #E5E7EB

## Tech
- Next.js 15 App Router, single page.tsx
- Tailwind CSS v4
- Framer Motion for scroll/hover/spring animations
- Canvas 2D for intro (no WebGL)
- Inter font via next/font
- prefers-reduced-motion respected + manual toggle

## Performance Target
- Lighthouse 95+ performance
- All animations: transform/opacity only
- No heavy dependencies
