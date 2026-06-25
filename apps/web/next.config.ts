import type { NextConfig } from "next";

/**
 * Next.js config for the LLLM Wiki web app.
 *
 * - `transpilePackages` is required for HeroUI v3 (per the official Next.js +
 *   HeroUI guide) so its ESM packages are transpiled to a form Next can bundle.
 *
 * Note: Next.js 16 removed the `next lint` command and its built-in lint step,
 * so there is no `eslint` config key here. Linting is run explicitly via
 * `pnpm lint` (flat ESLint config), which covers the web app correctly.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@heroui/react"],
};

export default nextConfig;
