import nodeFs from "node:fs";
import nodePath from "node:path";
import { DEFAULT_CONFIG, type WikiConfig } from "../types/config.js";
import { getConfigPath, getWikiDir, configExists } from "./paths.js";

/**
 * Config management for `.lllm-wiki/config.json`.
 *
 * `loadConfig` / `saveConfig` are the only functions commands need to touch.
 * Both are strict: invalid JSON or a shape that doesn't match {@link WikiConfig}
 * throws a typed {@link ConfigError}, which commands surface to the user.
 */

/** Error thrown when a config file cannot be read or fails validation. */
export class ConfigError extends Error {
  constructor(
    message: string,
    readonly code: "ENOENT" | "EJSON" | "ESHAPE",
  ) {
    super(message);
    this.name = "ConfigError";
  }
}

/**
 * Ensures a plain object parsed from JSON matches {@link WikiConfig}.
 * Throws {@link ConfigError} (code `ESHAPE`) on any mismatch.
 */
function assertWikiConfig(value: unknown): asserts value is WikiConfig {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ConfigError("Config must be a JSON object.", "ESHAPE");
  }

  const record = value as Record<string, unknown>;
  const { title, port } = record;

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new ConfigError(`Invalid config: "title" must be a non-empty string.`, "ESHAPE");
  }
  if (typeof port !== "number" || !Number.isInteger(port) || port < 0 || port > 65535) {
    throw new ConfigError(
      `Invalid config: "port" must be an integer between 0 and 65535.`,
      "ESHAPE",
    );
  }
}

/**
 * Loads and validates the wiki config from the current working directory.
 *
 * @param cwd Working directory to resolve `.lllm-wiki/config.json` from.
 * @returns The validated {@link WikiConfig}.
 * @throws {ConfigError} If the file is missing, malformed, or invalid.
 */
export function loadConfig(cwd?: string): WikiConfig {
  const configPath = getConfigPath(cwd);

  if (!nodeFs.existsSync(configPath)) {
    throw new ConfigError(
      `Config file not found at ${configPath}.\n` + `Run "lllm-wiki-cli init" first to create one.`,
      "ENOENT",
    );
  }

  let raw: string;
  try {
    raw = nodeFs.readFileSync(configPath, "utf8");
  } catch (err) {
    throw new ConfigError(
      `Failed to read config at ${configPath}: ${(err as Error).message}`,
      "ENOENT",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new ConfigError(`Config file is not valid JSON: ${(err as Error).message}`, "EJSON");
  }

  assertWikiConfig(parsed);
  return { title: parsed.title, port: parsed.port };
}

/**
 * Writes a validated {@link WikiConfig} to `.lllm-wiki/config.json`,
 * creating the directory if needed.
 *
 * @param config The config to persist.
 * @param cwd Working directory to resolve `.lllm-wiki/` from.
 */
export function saveConfig(config: WikiConfig, cwd?: string): void {
  assertWikiConfig(config);

  const wikiDir = getWikiDir(cwd);
  nodeFs.mkdirSync(wikiDir, { recursive: true });

  const configPath = getConfigPath(cwd);
  nodeFs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
}

/**
 * Convenience for the `init` command: returns the default config.
 * Exposed separately so the default stays in one place (`types/config.ts`).
 */
export function getDefaultConfig(): WikiConfig {
  return { ...DEFAULT_CONFIG };
}

/** True if a config file exists for the given (or current) working directory. */
export function hasConfig(cwd?: string): boolean {
  return configExists(cwd);
}

/** Join two path segments while staying platform-correct. Exported for tests. */
export function joinPath(...segments: string[]): string {
  return nodePath.join(...segments);
}
