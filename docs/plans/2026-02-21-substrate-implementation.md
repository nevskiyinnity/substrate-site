# Substrate Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready single-page marketing site for Substrate (onsubstrate.run) — a composable GPU infrastructure platform.

**Architecture:** Next.js 15 App Router, single page with sectioned scroll. All animations via Framer Motion (client components) and one Canvas 2D intro loader. Tailwind v4 with CSS-based theme. Deploy to Vercel.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Framer Motion (motion package), Canvas 2D API, Vercel CLI.

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `substrate-site/` via create-next-app

**Step 1: Create project**
```bash
cd /Users/iliazharnikov/Documents/GitHub/substrate-site
npx create-next-app@latest . --yes --ts --eslint --tailwind --app --src-dir --import-alias "@/*"
```

**Step 2: Install Framer Motion**
```bash
npm install motion
```

**Step 3: Clean defaults**
Remove boilerplate from `src/app/page.tsx` and `src/app/globals.css`. Set up the Tailwind v4 theme with Substrate colors.

**Step 4: Commit**
```bash
git add -A && git commit -m "feat: scaffold Next.js 15 project with Tailwind v4 and Framer Motion"
```

---

### Task 2: Global styles, fonts, and layout

**Files:**
- Modify: `src/app/globals.css` — Tailwind v4 theme with Substrate color tokens
- Modify: `src/app/layout.tsx` — Inter font, metadata for onsubstrate.run

**globals.css theme:**
```css
@import "tailwindcss";

@theme {
  --color-accent: #78716C;
  --color-accent-hover: #57534E;
  --color-accent-light: #F5F5F4;
  --color-fg: #1A1A1A;
  --color-fg-muted: #6B7280;
  --color-bg: #FFFFFF;
  --color-border: #E5E7EB;
  --font-sans: "Inter", sans-serif;
}
```

**layout.tsx:** Inter font via next/font/google, metadata with title "Substrate — Composable GPU Infrastructure", og tags.

---

### Task 3: MotionProvider (reduced motion context)

**Files:**
- Create: `src/components/motion-provider.tsx`

Client component wrapping the app. Reads `prefers-reduced-motion` media query + localStorage toggle. Provides `{ reduceMotion, toggleMotion }` via React context. All animated components check this context.

---

### Task 4: IntroLoader (Canvas 2D particle animation)

**Files:**
- Create: `src/components/intro-loader.tsx`

Client component. Canvas renders ~30 dots drifting randomly. After 300ms, dots spring-animate to form a thin horizontal line centered under "Substrate" wordmark. Line holds for 400ms, then fades out. Total duration ~1.5s. Skip on click/Esc/reduced-motion. Uses requestAnimationFrame. Component unmounts after completion, revealing page content.

---

### Task 5: HeroDictionary section

**Files:**
- Create: `src/components/hero-dictionary.tsx`

Large typography section:
- "Substrate" in ~72px font-bold
- "noun" in italic muted text
- Definition line in muted text
- Product sentence in regular weight
- Two CTA buttons (Get access = filled accent, Documentation = outlined)
- Staggered fade-in animation (y+8px, opacity, 200-350ms delays)

---

### Task 6: ConfiguratorCard (interactive sliders)

**Files:**
- Create: `src/components/configurator-card.tsx`

Interactive card with 4 range sliders:
- GPU cores: 1-64, step 1
- VRAM: 4-128 GB, step 4
- RAM: 8-512 GB, step 8
- Storage: 50-2000 GB, step 50

Live summary line: "16 cores · 48GB VRAM · 128GB RAM · 500GB SSD"
Animated number counters using Framer Motion useSpring.
Price placeholder with tooltip.
Styled slider knobs in accent color.

---

### Task 7: HowItWorks section (stepper)

**Files:**
- Create: `src/components/how-it-works.tsx`

"Compute, assembled to your needs" headline. 4-step horizontal stepper:
1. Choose cores → 2. Add VRAM → 3. Add RAM → 4. Add storage

Scroll-triggered: thin stacked lines build up behind content as user scrolls (low opacity, subtle "substrate layer" metaphor). Uses Framer Motion useInView and useScroll.

---

### Task 8: FeatureCards section

**Files:**
- Create: `src/components/feature-cards.tsx`

"Infrastructure without fixed shapes" headline. 3 cards:
1. No oversized instances — "Only allocate the resources you need."
2. Predictable performance — "Dedicated cores and memory, not shared bursts."
3. Built for AI workloads — "Training, inference, rendering, simulation."

Hover: border brightens, shadow grows, icon rotates 3-5°.

---

### Task 9: CodeBlockWithCopy section

**Files:**
- Create: `src/components/code-block.tsx`

"Infrastructure you can script" headline. API-first messaging, CLI mention. Clean code block with Terraform-style config:
```
resource "substrate_compute" "train" {
  gpu_cores  = 16
  vram_gb    = 48
  ram_gb     = 128
  storage_gb = 500
}
```
Copy button with checkmark animation (2s).

---

### Task 10: TargetUsers section

**Files:**
- Create: `src/components/target-users.tsx`

"Built for teams running serious workloads" headline. 5 cards: ML engineers, AI startups, Research labs, Rendering studios, Simulation teams. Each with icon, title, short description. Scroll-triggered fade-in.

---

### Task 11: Footer with motion toggle

**Files:**
- Create: `src/components/footer.tsx`

Minimal footer: "Substrate — Composable GPU infrastructure"
Links: Docs, Pricing, Status, Contact (all # for now)
Motion toggle: "Reduced Motion: On/Off" switch that persists to localStorage.
Copyright line.

---

### Task 12: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

Import and compose all sections in order:
IntroLoader → HeroDictionary + ConfiguratorCard → HowItWorks → FeatureCards → CodeBlockWithCopy → TargetUsers → Footer

Wrap in MotionProvider.

---

### Task 13: Deploy to Vercel

**Step 1: Push to GitHub**
```bash
gh repo create substrate-site --public --source=. --push
```

**Step 2: Deploy**
```bash
vercel --yes
```

**Step 3: Verify live site**

---
