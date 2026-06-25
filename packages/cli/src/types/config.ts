/**
 * Shape of the `.lllm-wiki/config.json` file written by `lllm-wiki-cli init`
 * and read by `lllm-wiki-cli serve`.
 */
export interface WikiConfig {
  /** Title shown in the web UI / document title. */
  title: string;
  /** Port the local Next.js server listens on. */
  port: number;
}

/** The default config used by `init` when no existing config is present. */
export const DEFAULT_CONFIG: Readonly<WikiConfig> = {
  title: "My Wiki",
  port: 3000,
};

/** Directory name (relative to the user's working directory) for wiki data. */
export const WIKI_DIR_NAME = ".lllm-wiki";

/** Config file name inside {@link WIKI_DIR_NAME}. */
export const CONFIG_FILE_NAME = "config.json";
