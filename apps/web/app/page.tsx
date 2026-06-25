import { Button, Card, Link } from "@heroui/react";
import HomeCard from "@/components/HomeCard";

/**
 * Home page.
 *
 * Title:    "Welcome to LLLM Wiki"
 * Subtitle: "Local AI Wiki Platform"
 *
 * Showcases HeroUI Button + Card, and reads the wiki title injected by the
 * CLI via `NEXT_PUBLIC_WIKI_TITLE` (falls back when run standalone).
 *
 * HeroUI v3 notes:
 * - `Button` uses `variant` (primary/secondary/danger/outline/ghost/tertiary),
 *   not the v2 `color` prop.
 * - `Card` uses the compound API: `Card.Header` / `Card.Content` (v2's
 *   `CardHeader` / `CardBody` were renamed).
 */
const wikiTitle = process.env.NEXT_PUBLIC_WIKI_TITLE ?? "My Wiki";

export default function HomePage(): React.ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {wikiTitle}
        </span>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to LLLM Wiki
        </h1>
        <p className="text-balance text-lg text-default-500">Local AI Wiki Platform</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
          <Link href="#" className="text-sm text-default-500">
            Read the docs →
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HomeCard title="Markdown First" icon="📝">
          Write your notes in plain Markdown. The wiki renders them into a clean, searchable
          knowledge base.
        </HomeCard>
        <HomeCard title="Runs Locally" icon="🏠">
          Everything runs on your machine. No accounts, no cloud — your content stays private.
        </HomeCard>
        <HomeCard title="Built with HeroUI" icon="✨">
          The interface is composed from HeroUI v3 components on top of Next.js 16 and Tailwind CSS.
        </HomeCard>
      </section>

      <section>
        <Card className="bg-content1/60 backdrop-blur">
          <Card.Header>
            <h2 className="text-xl font-semibold">Quick start</h2>
          </Card.Header>
          <Card.Content>
            <ol className="ml-5 list-decimal space-y-2 text-default-500">
              <li>
                Run <code className="rounded bg-default-100 px-1.5 py-0.5">lllm-wiki-cli init</code>{" "}
                to create <code className="rounded bg-default-100 px-1.5 py-0.5">.lllm-wiki/</code>.
              </li>
              <li>
                Edit{" "}
                <code className="rounded bg-default-100 px-1.5 py-0.5">.lllm-wiki/config.json</code>{" "}
                to set your title and port.
              </li>
              <li>
                Run{" "}
                <code className="rounded bg-default-100 px-1.5 py-0.5">lllm-wiki-cli serve</code> to
                launch this page in your browser.
              </li>
            </ol>
          </Card.Content>
        </Card>
      </section>

      <footer className="mt-auto pt-8 text-center text-sm text-default-400">
        Built with Next.js 16 · HeroUI v3 · TypeScript
      </footer>
    </main>
  );
}
