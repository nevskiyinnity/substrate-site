import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference — Substrate Docs",
};

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "text-emerald-700 bg-emerald-50 border-emerald-200",
    POST: "text-blue-700 bg-blue-50 border-blue-200",
    PATCH: "text-amber-700 bg-amber-50 border-amber-200",
    DELETE: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold tracking-wide ${colors[method]}`}
    >
      {method}
    </span>
  );
}

function StatusCode({
  code,
  description,
}: {
  code: number;
  description: string;
}) {
  return (
    <li className="flex items-baseline gap-2 text-sm">
      <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
        {code}
      </code>
      <span className="text-fg-muted">{description}</span>
    </li>
  );
}

export default function ApiReferencePage() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">
        API Reference
      </h1>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Substrate REST API lets you manage GPU compute instances
        programmatically. All endpoints return JSON and use standard HTTP
        status codes.
      </p>

      {/* Base URL */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">Base URL</h2>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>https://api.onsubstrate.run/v1</code>
      </pre>

      {/* Authentication */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Authentication
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        All requests must include an{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          Authorization
        </code>{" "}
        header with a Bearer token. You can generate API keys from the
        Substrate dashboard.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>Authorization: Bearer sk_live_...</code>
      </pre>

      {/* Endpoint: List all instances */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">Endpoints</h2>

      {/* GET /v1/instances */}
      <div className="mt-8 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="GET" />
          <code className="text-sm font-mono text-fg">/v1/instances</code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          List all instances in your account. Returns an array of instance
          objects sorted by creation date (newest first).
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "instances": [
    {
      "id": "inst_abc123",
      "name": "training-node-1",
      "status": "running",
      "gpu_cores": 4,
      "vram_gb": 24,
      "ram_gb": 64,
      "storage_gb": 100,
      "region": "us-east-1",
      "endpoint": "inst_abc123.compute.onsubstrate.run",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ]
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={200} description="Success" />
          <StatusCode code={401} description="Unauthorized — invalid or missing API key" />
        </ul>
      </div>

      {/* POST /v1/instances */}
      <div className="mt-6 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="POST" />
          <code className="text-sm font-mono text-fg">/v1/instances</code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Create a new GPU compute instance. Substrate composes hardware to
          match the exact resource configuration you specify.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Request body
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "gpu_cores": 4,
  "vram_gb": 24,
  "ram_gb": 64,
  "storage_gb": 100,
  "region": "us-east-1",
  "name": "training-node-1"
}`}</code>
        </pre>
        <p className="mt-3 text-sm text-fg-muted">
          <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
            region
          </code>{" "}
          and{" "}
          <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
            name
          </code>{" "}
          are optional. Region defaults to{" "}
          <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
            us-east-1
          </code>
          .
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "id": "inst_abc123",
  "name": "training-node-1",
  "status": "provisioning",
  "gpu_cores": 4,
  "vram_gb": 24,
  "ram_gb": 64,
  "storage_gb": 100,
  "region": "us-east-1",
  "endpoint": "inst_abc123.compute.onsubstrate.run",
  "created_at": "2025-01-15T10:30:00Z"
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={201} description="Instance created" />
          <StatusCode code={400} description="Invalid parameters" />
          <StatusCode code={401} description="Unauthorized" />
          <StatusCode code={422} description="Insufficient resources available" />
        </ul>
      </div>

      {/* GET /v1/instances/:id */}
      <div className="mt-6 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="GET" />
          <code className="text-sm font-mono text-fg">
            /v1/instances/:id
          </code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Get detailed information about a specific instance, including live
          resource utilization metrics.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "id": "inst_abc123",
  "name": "training-node-1",
  "status": "running",
  "gpu_cores": 4,
  "vram_gb": 24,
  "ram_gb": 64,
  "storage_gb": 100,
  "region": "us-east-1",
  "endpoint": "inst_abc123.compute.onsubstrate.run",
  "created_at": "2025-01-15T10:30:00Z",
  "metrics": {
    "cpu_utilization": 0.45,
    "gpu_utilization": 0.92,
    "memory_used_gb": 48.2,
    "uptime_seconds": 86400
  }
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={200} description="Success" />
          <StatusCode code={401} description="Unauthorized" />
          <StatusCode code={404} description="Instance not found" />
        </ul>
      </div>

      {/* PATCH /v1/instances/:id */}
      <div className="mt-6 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="PATCH" />
          <code className="text-sm font-mono text-fg">
            /v1/instances/:id
          </code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Update an instance. You can modify the instance name or resize
          resources. Resource changes may require a brief restart.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Request body
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "name": "training-node-updated",
  "gpu_cores": 8,
  "vram_gb": 48
}`}</code>
        </pre>
        <p className="mt-3 text-sm text-fg-muted">
          All fields are optional. Only include fields you want to change.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "id": "inst_abc123",
  "name": "training-node-updated",
  "status": "running",
  "gpu_cores": 8,
  "vram_gb": 48,
  "ram_gb": 64,
  "storage_gb": 100,
  "region": "us-east-1",
  "endpoint": "inst_abc123.compute.onsubstrate.run",
  "created_at": "2025-01-15T10:30:00Z"
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={200} description="Instance updated" />
          <StatusCode code={400} description="Invalid parameters" />
          <StatusCode code={401} description="Unauthorized" />
          <StatusCode code={404} description="Instance not found" />
          <StatusCode code={422} description="Insufficient resources for resize" />
        </ul>
      </div>

      {/* DELETE /v1/instances/:id */}
      <div className="mt-6 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="DELETE" />
          <code className="text-sm font-mono text-fg">
            /v1/instances/:id
          </code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Permanently delete an instance and all associated storage. This
          action is irreversible.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "deleted": true
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={200} description="Instance deleted" />
          <StatusCode code={401} description="Unauthorized" />
          <StatusCode code={404} description="Instance not found" />
        </ul>
      </div>

      {/* GET /v1/instances/:id/metrics */}
      <div className="mt-6 rounded-xl border border-border p-6">
        <div className="flex items-center gap-3">
          <MethodBadge method="GET" />
          <code className="text-sm font-mono text-fg">
            /v1/instances/:id/metrics
          </code>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Get real-time resource utilization metrics for a running instance.
          Metrics are updated every 10 seconds.
        </p>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Response
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
          <code>{`{
  "cpu_utilization": 0.45,
  "gpu_utilization": 0.92,
  "memory_used_gb": 48.2,
  "uptime_seconds": 86400
}`}</code>
        </pre>

        <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
          Status codes
        </h3>
        <ul className="flex flex-col gap-1.5">
          <StatusCode code={200} description="Success" />
          <StatusCode code={401} description="Unauthorized" />
          <StatusCode code={404} description="Instance not found" />
          <StatusCode code={409} description="Instance is not running" />
        </ul>
      </div>
    </article>
  );
}
