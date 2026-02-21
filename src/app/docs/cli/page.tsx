import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI Reference — Substrate Docs",
};

function FlagsTable({
  flags,
}: {
  flags: { flag: string; type: string; description: string }[];
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-2.5 text-left font-semibold text-fg">
              Flag
            </th>
            <th className="px-4 py-2.5 text-left font-semibold text-fg">
              Type
            </th>
            <th className="px-4 py-2.5 text-left font-semibold text-fg">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {flags.map((row) => (
            <tr key={row.flag} className="border-b border-border last:border-b-0">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  {row.flag}
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">{row.type}</td>
              <td className="px-4 py-2.5 text-fg-muted">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CliReferencePage() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">
        CLI Reference
      </h1>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Substrate CLI provides a complete interface for managing GPU
        compute instances from your terminal. All commands support{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          --help
        </code>{" "}
        for additional details and{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          --json
        </code>{" "}
        for machine-readable output.
      </p>

      {/* substrate auth login */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate auth login</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Authenticate with your Substrate account. Opens a browser window for
        OAuth authentication and stores credentials locally.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate auth login
Opening browser for authentication...
✓ Authenticated as user@example.com
  Token stored in ~/.substrate/credentials`}</code>
      </pre>

      {/* substrate compute create */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate compute create</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Create a new GPU compute instance with the specified resource
        configuration. Substrate composes hardware to match your exact
        requirements.
      </p>
      <FlagsTable
        flags={[
          {
            flag: "--gpu-cores",
            type: "int",
            description: "Number of GPU cores to allocate",
          },
          {
            flag: "--vram",
            type: "int",
            description: "GPU memory in GB",
          },
          {
            flag: "--ram",
            type: "int",
            description: "System memory in GB",
          },
          {
            flag: "--storage",
            type: "int",
            description: "NVMe storage in GB",
          },
          {
            flag: "--region",
            type: "string",
            description: "Deployment region (default: us-east-1)",
          },
          {
            flag: "--name",
            type: "string",
            description: "Optional instance name for identification",
          },
        ]}
      />
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute create --gpu-cores 4 --vram 24 --ram 64 --storage 100 --name training-node-1
✓ Instance created

  ID:       inst_abc123
  Name:     training-node-1
  Status:   provisioning
  Cores:    4 GPU cores
  VRAM:     24 GB
  RAM:      64 GB
  Storage:  100 GB
  Region:   us-east-1`}</code>
      </pre>

      {/* substrate compute list */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate compute list</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        List all active instances in your account. Displays a formatted table
        with instance details and current status.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute list
ID             NAME               STATUS     CORES   REGION
inst_abc123    training-node-1    running    4       us-east-1
inst_def456    inference-prod     running    8       eu-west-1
inst_ghi789    experiment-3       stopped    2       us-west-2`}</code>
      </pre>

      {/* substrate compute get */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate compute get &lt;id&gt;</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Show detailed information about a specific instance, including its
        full resource configuration, status, and endpoint.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute get inst_abc123
ID:         inst_abc123
Name:       training-node-1
Status:     running
Cores:      4 GPU cores
VRAM:       24 GB
RAM:        64 GB
Storage:    100 GB
Region:     us-east-1
Endpoint:   inst_abc123.compute.onsubstrate.run
Created:    2025-01-15T10:30:00Z
Uptime:     24h 12m 5s`}</code>
      </pre>

      {/* substrate compute ssh */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate compute ssh &lt;id&gt;</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open an SSH session to a running instance. Uses your locally
        configured SSH keys and establishes a secure tunnel.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute ssh inst_abc123
Connecting to inst_abc123.compute.onsubstrate.run...
Welcome to Substrate Compute (Ubuntu 22.04 LTS)

  Instance:  inst_abc123
  GPU:       4 cores / 24 GB VRAM
  RAM:       64 GB
  Storage:   100 GB

user@inst_abc123:~$`}</code>
      </pre>

      {/* substrate compute stop */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate compute stop &lt;id&gt;</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Stop a running instance. The instance storage is preserved and you
        will continue to be billed for storage only. Use{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          substrate compute create
        </code>{" "}
        with the same configuration to start a new instance.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute stop inst_abc123
Stopping instance inst_abc123...
✓ Instance stopped. Storage preserved (100 GB).`}</code>
      </pre>

      {/* substrate compute delete */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">
          substrate compute delete &lt;id&gt;
        </code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Permanently delete an instance and all associated storage. This
        action is irreversible. You will be prompted for confirmation unless{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          --force
        </code>{" "}
        is passed.
      </p>
      <FlagsTable
        flags={[
          {
            flag: "--force",
            type: "bool",
            description: "Skip confirmation prompt",
          },
        ]}
      />
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate compute delete inst_abc123
Are you sure you want to delete inst_abc123? This cannot be undone. [y/N]: y
✓ Instance inst_abc123 deleted.`}</code>
      </pre>

      {/* substrate status */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        <code className="font-mono">substrate status</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Check the health status of Substrate services. Displays the current
        operational status of the API, compute provisioning, and networking
        systems.
      </p>
      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`$ substrate status
Substrate Service Status

  API              ✓ Operational
  Compute          ✓ Operational
  Networking       ✓ Operational
  Storage          ✓ Operational

All systems operational.`}</code>
      </pre>
    </article>
  );
}
