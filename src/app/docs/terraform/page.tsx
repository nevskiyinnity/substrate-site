import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terraform Provider — Substrate Docs",
};

export default function TerraformProviderPage() {
  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-fg">
        Terraform Provider
      </h1>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Substrate Terraform provider lets you manage GPU compute
        infrastructure as code. Define instances, networks, and clusters in
        HCL and apply changes with standard Terraform workflows.
      </p>

      {/* Provider configuration */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Provider configuration
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Add the Substrate provider to your Terraform configuration. The API
        key can also be set via the{" "}
        <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
          SUBSTRATE_API_KEY
        </code>{" "}
        environment variable.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`terraform {
  required_providers {
    substrate = {
      source  = "onsubstrate/substrate"
      version = "~> 1.0"
    }
  }
}

provider "substrate" {
  api_key = var.substrate_api_key
  region  = "us-east-1"
}`}</code>
      </pre>

      {/* substrate_compute resource */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Resource:{" "}
        <code className="font-mono">substrate_compute</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Manages a GPU compute instance. Substrate composes hardware to match
        the exact resource configuration you define.
      </p>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
        Attributes
      </h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Attribute
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Type
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Required
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  gpu_cores
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">number</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                Number of GPU cores
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  vram_gb
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">number</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                GPU memory in GB
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  ram_gb
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">number</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                System memory in GB
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  storage_gb
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">number</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                NVMe storage in GB
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  name
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">string</td>
              <td className="px-4 py-2.5 text-fg-muted">No</td>
              <td className="px-4 py-2.5 text-fg-muted">
                Instance display name
              </td>
            </tr>
            <tr className="border-b-0">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  region
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">string</td>
              <td className="px-4 py-2.5 text-fg-muted">No</td>
              <td className="px-4 py-2.5 text-fg-muted">
                Deployment region (default: provider region)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
        Read-only attributes
      </h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Attribute
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  id
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">
                Instance ID (e.g. inst_abc123)
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  status
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">
                Current status (provisioning, running, stopped)
              </td>
            </tr>
            <tr className="border-b-0">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  endpoint
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">
                SSH/API endpoint hostname
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`resource "substrate_compute" "training" {
  name       = "training-node-1"
  gpu_cores  = 4
  vram_gb    = 24
  ram_gb     = 64
  storage_gb = 100
  region     = "us-east-1"
}`}</code>
      </pre>

      {/* substrate_network resource */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Resource:{" "}
        <code className="font-mono">substrate_network</code>
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Manages a virtual network for connecting compute instances. Provides
        private networking between instances within the same region.
      </p>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
        Attributes
      </h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Attribute
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Type
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Required
              </th>
              <th className="px-4 py-2.5 text-left font-semibold text-fg">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  vpc_id
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">string</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                VPC identifier for the network
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  subnet_cidr
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">string</td>
              <td className="px-4 py-2.5 text-fg-muted">Yes</td>
              <td className="px-4 py-2.5 text-fg-muted">
                CIDR block for the subnet (e.g. 10.0.0.0/24)
              </td>
            </tr>
            <tr className="border-b-0">
              <td className="px-4 py-2.5">
                <code className="rounded bg-accent-light px-1.5 py-0.5 text-sm font-mono">
                  enable_public_ip
                </code>
              </td>
              <td className="px-4 py-2.5 text-fg-muted">bool</td>
              <td className="px-4 py-2.5 text-fg-muted">No</td>
              <td className="px-4 py-2.5 text-fg-muted">
                Assign public IPs to instances (default: false)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">Example</h3>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`resource "substrate_network" "training_vpc" {
  vpc_id           = "vpc-training-cluster"
  subnet_cidr      = "10.0.1.0/24"
  enable_public_ip = true
}`}</code>
      </pre>

      {/* Data sources */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Data sources
      </h2>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
        <code className="font-mono">substrate_regions</code>
      </h3>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Lists all available deployment regions with their identifiers and
        display names.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`data "substrate_regions" "available" {}

output "regions" {
  value = data.substrate_regions.available.regions
}

# Returns:
# [
#   { id = "us-east-1", name = "US East (Virginia)" },
#   { id = "us-west-2", name = "US West (Oregon)" },
#   { id = "eu-west-1", name = "EU West (Ireland)" },
#   { id = "ap-southeast-1", name = "Asia Pacific (Singapore)" },
# ]`}</code>
      </pre>

      <h3 className="mt-8 mb-3 text-base font-semibold text-fg">
        <code className="font-mono">substrate_gpu_availability</code>
      </h3>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Queries real-time GPU availability by region and configuration. Use
        this to check capacity before provisioning.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`data "substrate_gpu_availability" "us_east" {
  region    = "us-east-1"
  gpu_cores = 4
  vram_gb   = 24
}

output "available" {
  value = data.substrate_gpu_availability.us_east.available
}

# Returns:
# {
#   available      = true
#   available_units = 12
#   region          = "us-east-1"
#   gpu_cores       = 4
#   vram_gb         = 24
# }`}</code>
      </pre>

      {/* Complete example */}
      <h2 className="mt-12 mb-4 text-xl font-semibold text-fg">
        Complete example: Multi-instance training cluster
      </h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This example provisions a distributed training cluster with three GPU
        compute nodes connected over a private network. Each node is
        configured with identical resources for data-parallel training.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`terraform {
  required_providers {
    substrate = {
      source  = "onsubstrate/substrate"
      version = "~> 1.0"
    }
  }
}

variable "substrate_api_key" {
  type      = string
  sensitive = true
}

variable "cluster_size" {
  type    = number
  default = 3
}

provider "substrate" {
  api_key = var.substrate_api_key
  region  = "us-east-1"
}

# Check GPU availability before provisioning
data "substrate_gpu_availability" "check" {
  region    = "us-east-1"
  gpu_cores = 8
  vram_gb   = 48
}

# Private network for inter-node communication
resource "substrate_network" "cluster_network" {
  vpc_id           = "vpc-training-cluster"
  subnet_cidr      = "10.0.1.0/24"
  enable_public_ip = false
}

# Training nodes
resource "substrate_compute" "worker" {
  count = var.cluster_size

  name       = "training-worker-\${count.index}"
  gpu_cores  = 8
  vram_gb    = 48
  ram_gb     = 128
  storage_gb = 500
  region     = "us-east-1"
}

output "worker_endpoints" {
  value = [for w in substrate_compute.worker : w.endpoint]
}

output "worker_ids" {
  value = [for w in substrate_compute.worker : w.id]
}

output "network_id" {
  value = substrate_network.cluster_network.id
}`}</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Deploy the cluster with:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>{`terraform init
terraform plan -var="substrate_api_key=sk_live_..."
terraform apply -var="substrate_api_key=sk_live_..."`}</code>
      </pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        To tear down the entire cluster and clean up all resources:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-[#FAFAFA] p-4 text-sm leading-relaxed">
        <code>terraform destroy -var=&quot;substrate_api_key=sk_live_...&quot;</code>
      </pre>
    </article>
  );
}
