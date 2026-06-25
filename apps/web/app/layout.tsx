import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

/**
 * Root layout for the LLLM Wiki web app.
 *
 * The CLI sets `NEXT_PUBLIC_WIKI_TITLE` before booting Next.js (see
 * `packages/cli/src/services/next-server.ts`); we fall back to a sensible
 * default when the app is run standalone (e.g. `pnpm --filter web dev`).
 *
 * Note: HeroUI v3 is headless (built on React Aria) and does not require a
 * provider wrapper, so children render directly.
 */
const wikiTitle = process.env.NEXT_PUBLIC_WIKI_TITLE ?? "LLLM Wiki";

export const metadata: Metadata = {
  title: wikiTitle,
  description: "Local AI Wiki Platform — powered by Next.js and HeroUI.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
