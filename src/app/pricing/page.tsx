"use client";

import { useState } from "react";
import { ConfiguratorCard } from "@/components/configurator-card";

const tiers = [
  {
    name: "Starter",
    price: "$0.10",
    priceUnit: "/core/hr",
    description: "For individuals and small teams getting started with GPU compute.",
    features: [
      "Up to 16 GPU cores",
      "64GB VRAM max",
      "Community support",
      "Basic monitoring",
      "Per-second billing",
    ],
    cta: "Get started",
    ctaHref: "#",
    highlighted: false,
    outlined: false,
  },
  {
    name: "Pro",
    price: "$0.08",
    priceUnit: "/core/hr",
    description: "For growing teams that need more power and compliance coverage.",
    features: [
      "Up to 64 GPU cores",
      "128GB VRAM max",
      "Priority support",
      "SOC 2 report access",
      "Custom networking",
      "Advanced monitoring & alerts",
    ],
    cta: "Get started",
    ctaHref: "#",
    highlighted: true,
    outlined: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceUnit: "",
    description: "For organizations with advanced security, compliance, and scale requirements.",
    features: [
      "Unlimited GPU cores",
      "HIPAA BAA included",
      "Dedicated account manager",
      "Custom SLAs",
      "SSO / SAML",
      "Private networking & peering",
    ],
    cta: "Contact sales",
    ctaHref: "#",
    highlighted: false,
    outlined: true,
  },
];

const rateRows = [
  { resource: "GPU cores", unit: "$/core/hr", starter: "$0.10", pro: "$0.08" },
  { resource: "VRAM", unit: "$/GB/hr", starter: "$0.08", pro: "$0.06" },
  { resource: "RAM", unit: "$/GB/hr", starter: "$0.02", pro: "$0.015" },
  { resource: "Storage", unit: "$/GB/hr", starter: "$0.001", pro: "$0.0008" },
];

const pricingFaqs = [
  {
    q: "How does per-second billing work?",
    a: "Billing starts the moment your instance is provisioned and stops the instant you terminate it. A 47-second job is billed for exactly 47 seconds. There is no rounding to the nearest minute or hour.",
  },
  {
    q: "Are there any minimum commitments or contracts?",
    a: "No. Starter and Pro plans are entirely pay-as-you-go with no minimum spend, no upfront commitments, and no lock-in. Enterprise plans can include reserved capacity at discounted rates if desired.",
  },
  {
    q: "Can I switch between Starter and Pro at any time?",
    a: "Yes. You can upgrade or downgrade at any time from the dashboard. Changes take effect immediately and your next billing cycle reflects the new rate. There are no penalties for switching.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards for Starter and Pro plans. Enterprise customers can pay via invoice with NET-30 terms. All payments are processed securely through Stripe.",
  },
  {
    q: "Do you offer volume discounts?",
    a: "Yes. Enterprise plans include custom pricing based on your usage volume. For sustained high-usage workloads, we offer reserved capacity commitments with significant discounts. Contact sales to discuss your needs.",
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-accent"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-sm font-medium text-fg">{faq.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`shrink-0 text-fg-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-fg-muted">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="px-6 pb-16 pt-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">
          Pricing
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-fg-muted">
          Pay for what you use. Scale without commitment.
        </p>
      </section>

      {/* Tier cards */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-8 transition-shadow duration-200 ${
                tier.highlighted
                  ? "border-accent shadow-[0_8px_40px_rgba(120,113,108,0.12)]"
                  : "border-border shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-fg">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-fg">
                  {tier.price}
                </span>
                {tier.priceUnit && (
                  <span className="text-sm text-fg-muted">{tier.priceUnit}</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {tier.description}
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-fg">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaHref}
                className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  tier.outlined
                    ? "border border-border text-fg hover:border-accent/40 hover:bg-surface"
                    : "bg-accent text-white hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.3)]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Rate card table */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">
            Rate card
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Detailed pricing
          </h2>
          <p className="mt-3 text-sm text-fg-muted">
            All resources are billed per second with no minimums.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-surface">
                  <th className="px-6 py-4 font-medium text-fg">Resource</th>
                  <th className="px-6 py-4 font-medium text-fg">Unit</th>
                  <th className="px-6 py-4 font-medium text-fg">Starter</th>
                  <th className="px-6 py-4 font-medium text-fg">Pro</th>
                </tr>
              </thead>
              <tbody>
                {rateRows.map((row, i) => (
                  <tr
                    key={row.resource}
                    className={i < rateRows.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="px-6 py-4 font-medium text-fg">{row.resource}</td>
                    <td className="px-6 py-4 text-fg-muted">{row.unit}</td>
                    <td className="px-6 py-4 tabular-nums text-fg">{row.starter}</td>
                    <td className="px-6 py-4 tabular-nums text-fg">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cost estimator */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">
            Calculator
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Estimate your cost
          </h2>
          <p className="mt-3 text-sm text-fg-muted">
            Drag the sliders to configure your instance and see a real-time cost
            estimate.
          </p>
        </div>
        <div className="mt-10">
          <ConfiguratorCard />
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Pricing questions
          </h2>

          <div className="mt-10">
            {pricingFaqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
