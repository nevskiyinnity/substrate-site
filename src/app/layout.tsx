import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Substrate — Composable GPU Infrastructure",
  description:
    "Configure compute by cores, VRAM, memory, and storage. Composable GPU infrastructure for ML teams, research labs, and AI startups.",
  openGraph: {
    title: "Substrate — Composable GPU Infrastructure",
    description:
      "Configure compute by cores, VRAM, memory, and storage.",
    url: "https://onsubstrate.run",
    siteName: "Substrate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Substrate — Composable GPU Infrastructure",
    description:
      "Configure compute by cores, VRAM, memory, and storage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
