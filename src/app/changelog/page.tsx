import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Substrate",
  description: "What's new in Substrate. Release notes and product updates.",
};

const releases = [
  {
    version: "0.4.0",
    date: "February 2026",
    title: "Terraform Provider GA",
    description:
      "Full production release of the Substrate Terraform provider. Define, version, and manage GPU infrastructure alongside your existing IaC workflows.",
    changes: [
      "substrate_compute resource with full lifecycle management",
      "substrate_network resource for VPC and subnet configuration",
      "Data sources for region availability and GPU inventory",
      "Import support for existing instances",
      "Comprehensive documentation and example modules",
    ],
    tag: "feature",
  },
  {
    version: "0.3.0",
    date: "January 2026",
    title: "HIPAA Compliance & SOC 2 Type II",
    description:
      "Substrate is now SOC 2 Type II certified and HIPAA compliant. Enterprise customers can request BAAs and access our full audit report under NDA.",
    changes: [
      "SOC 2 Type II certification (security, availability, confidentiality)",
      "HIPAA compliance with BAA support on Pro and Enterprise plans",
      "Zero data logging policy formalized and independently verified",
      "AES-256-GCM encryption at rest with 90-day key rotation",
      "TLS 1.3 enforced on all API and inter-service communication",
    ],
    tag: "security",
  },
  {
    version: "0.2.0",
    date: "December 2025",
    title: "Per-Second Billing",
    description:
      "Granular, transparent billing that stops the moment your instance terminates. No rounding, no minimum charges beyond what you actually used.",
    changes: [
      "Sub-second metering for all compute resources",
      "Real-time cost tracking in dashboard and via API",
      "Automatic teardown with instant billing stop",
      "Billing API for programmatic cost queries",
      "Usage export to CSV for finance teams",
    ],
    tag: "feature",
  },
  {
    version: "0.1.0",
    date: "November 2025",
    title: "Beta Launch",
    description:
      "First public beta of Substrate, running on infrastructure at Lefdal Mine Datacenter. Composable GPU compute is live.",
    changes: [
      "Composable GPU allocation (1-64 cores, 4-128GB VRAM)",
      "REST API with full CRUD for compute instances",
      "CLI with auth, provisioning, SSH, and monitoring",
      "A100 and H100 GPU availability",
      "Lefdal Mine Datacenter infrastructure (Måløy, Norway)",
    ],
    tag: "launch",
  },
];

const tagColors: Record<string, string> = {
  feature: "bg-blue-50 text-blue-700",
  security: "bg-amber-50 text-amber-700",
  launch: "bg-green-50 text-green-700",
};

export default function ChangelogPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">Changelog</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            What&apos;s new
          </h1>
          <p className="mt-4 text-lg text-fg-muted">
            Release notes and product updates from the Substrate team.
          </p>

          {/* Timeline */}
          <div className="mt-14">
            {releases.map((release, i) => (
              <div
                key={release.version}
                className={`relative pl-8 ${
                  i < releases.length - 1 ? "border-l border-border pb-14" : "border-l border-border pb-0"
                }`}
              >
                {/* Dot */}
                <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-white" />

                {/* Version + date */}
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-accent-light px-2 py-0.5 text-xs font-semibold text-accent">
                    v{release.version}
                  </span>
                  <span className="text-xs text-fg-muted">{release.date}</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${tagColors[release.tag]}`}>
                    {release.tag}
                  </span>
                </div>

                {/* Title + description */}
                <h2 className="mt-3 text-xl font-semibold text-fg">{release.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{release.description}</p>

                {/* Changes */}
                <ul className="mt-4 space-y-1.5">
                  {release.changes.map((change) => (
                    <li key={change} className="flex gap-2 text-sm text-fg-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
