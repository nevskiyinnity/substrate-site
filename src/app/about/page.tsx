import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Substrate",
  description: "We believe compute should be composable. Learn about the team and mission behind Substrate.",
};

const team = [
  { name: "Erik Lindqvist", role: "CEO & Co-founder", initials: "EL" },
  { name: "Maren Solberg", role: "CTO & Co-founder", initials: "MS" },
  { name: "Jonas Dahl", role: "Head of Infrastructure", initials: "JD" },
  { name: "Astrid Nygaard", role: "Head of Product", initials: "AN" },
];

const values = [
  {
    title: "Transparency",
    description: "No hidden fees, no opaque pricing, no surprise bills. Every metric, cost, and configuration is visible in real time. We publish our uptime, our pricing model, and our compliance reports.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Efficiency",
    description: "Every watt, every core, every byte matters. We chose Lefdal Mine for its natural cooling and renewable power. We built composable allocation so you never pay for idle resources.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Security",
    description: "Infrastructure shouldn't be the weak link. SOC 2 Type II, HIPAA compliance, zero data logging, AES-256 encryption, and physical security inside a mountain. Security is architecture, not an afterthought.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">About Substrate</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            We believe compute should be composable
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            The cloud sold us on flexibility but delivered rigidity. Fixed instance types force teams to
            over-provision, under-utilize, and pay for resources they don&apos;t need. We started Substrate to
            change that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Our mission</h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Substrate exists to make GPU compute as composable as software. Instead of choosing from a menu of
            pre-built machines, you specify exactly what your workload needs — cores, VRAM, memory, storage — and
            we assemble it in seconds. No waste, no guessing, no compromise.
          </p>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            We believe the next generation of AI infrastructure shouldn&apos;t inherit the limitations of the last one.
            Every research lab training a model, every startup shipping an inference API, and every rendering
            studio processing frames should be able to allocate compute as precisely as they write code.
          </p>
        </div>
      </section>

      {/* Lefdal story */}
      <section className="mt-20 bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Why we built inside a mountain</h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            When we started Substrate, we knew the data center would define everything — our sustainability story,
            our security posture, and our cost structure. We chose Lefdal Mine Datacenter in Måløy, Norway: a
            former NATO mining facility carved into solid rock, powered by 100% renewable hydroelectric energy,
            and cooled by fjord water from the Norwegian Sea.
          </p>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            The result is a PUE below 1.15, physical security that no above-ground facility can replicate, and a
            carbon footprint that lets our customers run large-scale GPU workloads without the environmental trade-off.
            Lefdal isn&apos;t just our data center — it&apos;s our thesis: infrastructure should be efficient by design, not by
            offset.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">The team</h2>
          <p className="mt-3 text-base text-fg-muted">
            A small team of infrastructure engineers and product builders based in Norway.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-light text-lg font-semibold text-accent">
                  {member.initials}
                </div>
                <p className="mt-3 text-sm font-semibold text-fg">{member.name}</p>
                <p className="mt-0.5 text-xs text-fg-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">What we stand for</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-white p-6"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                  {value.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-fg">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Want to work with us?</h2>
          <p className="mt-3 text-base text-fg-muted">
            We&apos;re always looking for exceptional people who care about infrastructure.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
