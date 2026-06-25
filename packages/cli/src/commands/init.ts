import { Command } from "commander";
import { getDefaultConfig, saveConfig, hasConfig } from "../utils/config.js";
import { getConfigPath } from "../utils/paths.js";
import { logger } from "../utils/logger.js";

/**
 * `lllm-wiki-cli init`
 *
 * Scaffolds a fresh Wiki project in the current working directory:
 *   - creates `.lllm-wiki/`
 *   - writes `.lllm-wiki/config.json` with the default config
 *   - refuses to clobber an existing config
 *
 * Returns the program so it can be composed by `index.ts`.
 */
export function makeInitCommand(): Command {
  const command = new Command("init");

  command
    .description("Initialize a new LLLM Wiki project in the current directory")
    .option(
      "--title <title>",
      "Wiki title written to .lllm-wiki/config.json",
      getDefaultConfig().title,
    )
    .option(
      "--port <port>",
      "Port written to .lllm-wiki/config.json",
      (value: string) => parsePort(value),
      getDefaultConfig().port,
    )
    .action((options: InitOptions) => {
      runInit(options);
    });

  return command;
}

interface InitOptions {
  title: string;
  port: number;
}

function runInit(options: InitOptions): void {
  if (hasConfig()) {
    logger.warn(
      `A config already exists at ${getConfigPath()}.\n` +
        `Remove it first if you want to reinitialize.`,
    );
    return;
  }

  const config = { title: options.title, port: options.port };
  saveConfig(config);

  logger.success(`Wiki initialized successfully`);
  logger.info(`Created ${getConfigPath()}`);
  logger.info(`Title: "${config.title}"  Port: ${config.port}`);
}

function parsePort(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
    throw new Error(`Invalid port "${value}". Expected an integer between 0 and 65535.`);
  }
  return parsed;
}
