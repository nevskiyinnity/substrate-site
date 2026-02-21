"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24">
      <section className="px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-widest text-fg-muted">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-fg-muted">
            Have questions about Substrate? We&apos;d love to hear from you.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-xl border border-border bg-surface p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-light">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-fg">Message sent</h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-fg">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-fg">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-fg">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                      placeholder="Your company (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-fg">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1.5 w-full resize-none rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent"
                      placeholder="Tell us about your project and what you're looking for..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(120,113,108,0.3)]"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-fg">Email</h3>
                  <a
                    href="mailto:hello@onsubstrate.run"
                    className="mt-1.5 block text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    hello@onsubstrate.run
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fg">Security inquiries</h3>
                  <a
                    href="mailto:security@onsubstrate.run"
                    className="mt-1.5 block text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    security@onsubstrate.run
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fg">Response time</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">&lt; 24 hours for all inquiries</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fg">Location</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">Måløy, Norway</p>
                  <p className="mt-0.5 text-xs text-fg-muted">Infrastructure hosted at Lefdal Mine Datacenter</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold text-fg">Enterprise sales</h3>
                  <p className="mt-2 text-sm text-fg-muted">
                    Looking for custom pricing, HIPAA BAA, or dedicated support?
                    Our enterprise team can help.
                  </p>
                  <a
                    href="mailto:sales@onsubstrate.run"
                    className="mt-3 inline-flex items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    sales@onsubstrate.run
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
