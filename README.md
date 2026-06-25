# lllm-wiki-cli

Local AI Wiki Platform CLI — scaffold a local Wiki project and serve it through a Next.js + HeroUI web app, all from a single command.

## Tech Stack

| Concern       | Choice                             |
| ------------- | ---------------------------------- |
| Runtime       | Node.js 22+                        |
| Language      | TypeScript (strict, ESM)           |
| CLI framework | Commander.js                       |
| Web framework | Next.js 16 (App Router)            |
| UI library    | HeroUI v3                          |
| Styling       | Tailwind CSS v4 (CSS-first config) |
| Monorepo      | pnpm workspace                     |
| Lint / Format | ESLint (flat config) + Prettier    |

## Project Structure

```
lllm-wiki-cli/
├── package.json              # root workspace scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json        # shared strict TS base config
├── eslint.config.mjs         # flat ESLint config (repo-wide)
├── .prettierrc.json
├── README.md
├── .gitignore
├── apps/
│   └── web/                  # Next.js 16 + HeroUI v3 app
│       ├── app/              # App Router (layout, page, globals.css)
│       ├── components/       # HeroUI components
│       └── next.config.ts
└── packages/
    └── cli/                  # Commander.js CLI
        └── src/
            ├── index.ts
            ├── commands/     # init.ts, serve.ts
            ├── services/     # next-server.ts (in-process Next.js)
            ├── utils/        # config.ts, paths.ts, logger.ts
            └── types/
```

## Prerequisites

- Node.js 22 or newer
- pnpm 9.x (`npm i -g pnpm`)

## Install

```bash
pnpm install
```

## Build

Build every workspace package:

```bash
pnpm build
```

Build a single package:

```bash
pnpm --filter @lllm-wiki/cli build
pnpm --filter @lllm-wiki/web build
```

## Local Link (make the `lllm-wiki-cli` command available globally)

```bash
pnpm --filter @lllm-wiki/cli build
pnpm --filter @lllm-wiki/cli link --global
```

After linking you can run `lllm-wiki-cli` from anywhere on your machine.

> Without linking you can still call the CLI directly via
> `pnpm --filter @lllm-wiki/cli start -- <command>` or `node packages/cli/dist/index.js <command>`.

## Usage

Initialize a Wiki project in the current directory:

```bash
lllm-wiki-cli init
```

This creates `.lllm-wiki/config.json` with sensible defaults:

```json
{
  "title": "My Wiki",
  "port": 3000
}
```

Serve the Wiki web app locally (in-process Next.js, no shell spawn):

```bash
lllm-wiki-cli serve
```

By default it boots on the port from `.lllm-wiki/config.json` (or `3000`).

```
✔ Server started at http://localhost:3000
```

Other handy invocations:

```bash
lllm-wiki-cli --help
lllm-wiki-cli init --help
lllm-wiki-cli serve --help
```

## Commands

### `init`

Creates `.lllm-wiki/config.json` in the current working directory. If a config already exists it prints a warning and aborts, so existing wikis are never overwritten.

### `serve`

Reads `.lllm-wiki/config.json`, resolves `title` and `port`, and starts the bundled Next.js app **in-process** via the Next.js Node API (`next().prepare()` + `http.createServer`). No `child_process`, no shell, no `pnpm dev`/`npm run dev`.

## Development

Run the web app directly for hot-reload UI work:

```bash
pnpm --filter @lllm-wiki/web dev
```

Run the CLI from source (TS, via `tsx`):

```bash
pnpm --filter @lllm-wiki/cli dev -- init
pnpm --filter @lllm-wiki/cli dev -- serve
```

## License

MIT
