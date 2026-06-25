import chalk from "chalk";

/**
 * A small colored logger for terminal output.
 *
 * Uses `chalk` (pure ESM). Each method formats a message and writes to the
 * appropriate stream, keeping logging consistent across commands.
 */
export interface Logger {
  /** Informational message (cyan). */
  info(...parts: unknown[]): void;
  /** Warning message (yellow). */
  warn(...parts: unknown[]): void;
  /** Error message (red), to stderr. */
  error(...parts: unknown[]): void;
  /** Success message (green) with a leading check mark. */
  success(...parts: unknown[]): void;
  /** Raw, unformatted write (no trailing newline transformation). */
  raw(...parts: unknown[]): void;
}

function stringify(parts: unknown[]): string {
  return parts
    .map((part) =>
      typeof part === "string"
        ? part
        : typeof part === "object"
          ? JSON.stringify(part)
          : String(part),
    )
    .join(" ");
}

export const logger: Logger = {
  info(...parts: unknown[]): void {
    process.stdout.write(`${chalk.cyan("ℹ")} ${stringify(parts)}\n`);
  },

  warn(...parts: unknown[]): void {
    process.stdout.write(`${chalk.yellow("⚠")} ${stringify(parts)}\n`);
  },

  error(...parts: unknown[]): void {
    process.stderr.write(`${chalk.red("✖")} ${stringify(parts)}\n`);
  },

  success(...parts: unknown[]): void {
    process.stdout.write(`${chalk.green("✔")} ${stringify(parts)}\n`);
  },

  raw(...parts: unknown[]): void {
    process.stdout.write(stringify(parts) + "\n");
  },
};
