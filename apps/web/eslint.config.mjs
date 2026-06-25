// Local ESLint flat config for the web app.
//
// `next build` no longer lints in Next 16 (the `next lint` command was
// removed), and `pnpm lint` runs `eslint` from the repo root. This file only
// matters if someone runs `eslint` from within `apps/web/`; in that case we
// re-use the repository-root config (which already includes the Next.js
// core-web-vitals rules scoped to this package) and re-ignore the generated
// files relative to here.
import rootConfig from "../../eslint.config.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // When eslint runs from within apps/web, the root config's ignore globs
  // (written relative to the repo root) don't match next-env.d.ts here.
  {
    ignores: ["next-env.d.ts", ".next/**"],
  },

  ...rootConfig,
];

export default config;
