import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting Started — Substrate Docs",
};

export default function GettingStartedPage() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">
        Getting Started
      </h1>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Get up and running with Substrate in minutes. This guide walks you
        through installing the CLI, provisioning your first GPU instance, and
        running a training job.
      </p>

      {/* Install the CLI */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Install the CLI
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Substrate CLI is a single binary with no dependencies. Install it
        with one command:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>curl -fsSL https://get.onsubstrate.run | sh</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        After installation, verify it works by checking the version:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>substrate --version</code>
      </pre>

      {/* Authenticate */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Authenticate
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Log in to your Substrate account. This opens your browser for OAuth
        authentication and stores a token locally.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>substrate auth login</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Your credentials are stored securely in{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          ~/.substrate/credentials
        </code>{" "}
        and automatically refreshed when they expire.
      </p>

      {/* Provision your first instance */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Provision your first instance
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Create a GPU compute instance by specifying the resources you need.
        Substrate composes hardware to match your exact requirements — no
        predefined instance types.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>substrate compute create --gpu-cores 4 --vram 24 --ram 64 --storage 100</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This provisions an instance with 4 GPU cores, 24 GB VRAM, 64 GB system
        RAM, and 100 GB NVMe storage. The instance will be ready within seconds
        and you will see output like:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`Instance created successfully.

  ID:       inst_abc123
  Status:   provisioning
  Cores:    4 GPU cores
  VRAM:     24 GB
  RAM:      64 GB
  Storage:  100 GB
  Region:   us-east-1
  Endpoint: inst_abc123.compute.onsubstrate.run`}</code>
      </pre>

      {/* Connect to your instance */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Connect to your instance
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Once the instance status changes to{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          running
        </code>
        , connect via SSH:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>substrate compute ssh inst_abc123</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This establishes a secure SSH tunnel to your instance. Your local SSH
        keys are automatically configured during authentication.
      </p>

      {/* Run a training job */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Run a training job
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        With your instance running, you can execute training jobs directly.
        Here is a minimal PyTorch example:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`import torch
import torch.nn as nn
import torch.optim as optim

# Verify GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Training on: {device}")

# Define a simple model
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
).to(device)

# Set up optimizer and loss function
optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# Training loop
for epoch in range(10):
    inputs = torch.randn(64, 784).to(device)
    targets = torch.randint(0, 10, (64,)).to(device)

    optimizer.zero_grad()
    outputs = model(inputs)
    loss = criterion(outputs, targets)
    loss.backward()
    optimizer.step()

    print(f"Epoch {epoch + 1}/10 — Loss: {loss.item():.4f}")

print("Training complete.")`}</code>
      </pre>

      {/* Clean up */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">Clean up</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When you are done, delete the instance to stop billing. This
        permanently removes the instance and all associated storage.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>substrate compute delete inst_abc123</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        To stop an instance without deleting its storage, use{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          substrate compute stop inst_abc123
        </code>{" "}
        instead.
      </p>

      {/* Next steps */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">Next steps</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Now that you have provisioned and connected to your first instance,
        explore the rest of the documentation:
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        <li>
          <Link
            href="/docs/api"
            className="text-sm font-medium text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
          >
            API Reference
          </Link>
          <span className="ml-2 text-sm text-fg-muted">
            — Manage instances programmatically via the REST API
          </span>
        </li>
        <li>
          <Link
            href="/docs/cli"
            className="text-sm font-medium text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
          >
            CLI Reference
          </Link>
          <span className="ml-2 text-sm text-fg-muted">
            — Full command reference for the Substrate CLI
          </span>
        </li>
        <li>
          <Link
            href="/docs/terraform"
            className="text-sm font-medium text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
          >
            Terraform Provider
          </Link>
          <span className="ml-2 text-sm text-fg-muted">
            — Infrastructure as code for Substrate resources
          </span>
        </li>
      </ul>
    </article>
  );
}
