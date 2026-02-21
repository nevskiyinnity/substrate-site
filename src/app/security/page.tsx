import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security — Substrate",
  description: "SOC 2 Type II, HIPAA compliant, zero data logging. Learn about Substrate's security posture.",
};

const certifications = [
  {
    title: "SOC 2 Type II",
    description: "Independently audited by a Big Four firm. Our SOC 2 Type II report covers security, availability, and confidentiality trust service criteria. Report available under NDA for customers on Pro and Enterprise plans.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "HIPAA Compliant",
    description: "Business Associate Agreements (BAAs) available for healthcare and regulated workloads. PHI is never stored, logged, or retained on our systems. HIPAA compliance is available on Pro and Enterprise plans.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const loggingPolicy = {
  logged: [
    "Instance lifecycle events (created, started, stopped, deleted)",
    "Resource allocation and billing metrics",
    "API request metadata (endpoint, status code, latency)",
    "Infrastructure health telemetry (CPU/GPU utilization, uptime)",
  ],
  notLogged: [
    "Workload data, model weights, or training datasets",
    "Network traffic content or payload inspection",
    "File system contents or user-created artifacts",
    "SSH session content or terminal commands",
    "Environment variables or application secrets",
  ],
};

const encryption = [
  {
    layer: "At rest",
    spec: "AES-256-GCM",
    detail: "All persistent storage volumes are encrypted with AES-256-GCM. Keys are managed via a dedicated HSM with automatic rotation every 90 days.",
  },
  {
    layer: "In transit",
    spec: "TLS 1.3",
    detail: "All API, CLI, and inter-service communication uses TLS 1.3 with forward secrecy. We do not support deprecated cipher suites or protocol versions.",
  },
  {
    layer: "At compute",
    spec: "Secure enclaves",
    detail: "GPU memory is isolated per tenant using hardware-level memory protection. Instance teardown includes cryptographic memory erasure within seconds.",
  },
];

export default function SecurityPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">Security</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Security is infrastructure
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            Substrate is built for teams handling sensitive data and regulated workloads.
            Compliance, encryption, and physical security are foundational — not bolt-on features.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Compliance certifications</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="rounded-xl border border-border bg-white p-6"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                  {cert.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-fg">{cert.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zero-logging policy */}
      <section className="mt-20 bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Zero data logging policy</h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Substrate operates a strict separation between infrastructure telemetry and workload data.
            We collect the minimum data needed to operate the platform reliably and bill accurately.
            We never inspect, store, or retain your workload content.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-fg">What we do collect</h3>
              <p className="mt-1 text-xs text-fg-muted">Infrastructure telemetry only</p>
              <ul className="mt-4 space-y-2.5">
                {loggingPolicy.logged.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-fg-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-fg">What we never collect</h3>
              <p className="mt-1 text-xs text-fg-muted">Your data stays yours</p>
              <ul className="mt-4 space-y-2.5">
                {loggingPolicy.notLogged.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-fg-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Encryption */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Encryption</h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Data is encrypted at every layer — at rest, in transit, and during computation.
          </p>
          <div className="mt-8 space-y-4">
            {encryption.map((item) => (
              <div key={item.layer} className="rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
                    {item.spec}
                  </span>
                  <h3 className="text-sm font-semibold text-fg">{item.layer}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical security */}
      <section className="mt-20 bg-fg px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Physical security</h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Substrate infrastructure is housed in Lefdal Mine Datacenter — a former NATO facility in Måløy, Norway,
            built inside a mountain of solid rock. Physical security measures include:
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Underground rock facility with controlled access points",
              "24/7 CCTV monitoring with on-site security personnel",
              "Multi-factor biometric access control",
              "Tier III equivalent redundancy and uptime guarantees",
              "Dedicated fire suppression and environmental monitoring",
              "100% renewable hydroelectric power with redundant grid connections",
            ].map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-white/50">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="mt-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">Responsible disclosure</h2>
          <p className="mt-4 text-base text-fg-muted">
            Found a vulnerability? We appreciate responsible disclosure and respond to all reports within 24 hours.
          </p>
          <div className="mt-6">
            <a
              href="mailto:security@onsubstrate.run"
              className="inline-flex h-11 items-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover"
            >
              security@onsubstrate.run
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
