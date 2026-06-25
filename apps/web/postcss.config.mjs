/**
 * Tailwind CSS v4 is wired up as a PostCSS plugin via `@tailwindcss/postcss`.
 * (In v4 there is no separate `tailwindcss` plugin or `autoprefixer` — both
 * are handled by this single plugin.)
 *
 * Reference: https://tailwindcss.com/docs/installation/using-postcss
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
