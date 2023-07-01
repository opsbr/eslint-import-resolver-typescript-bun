import debug from "debug";
import { resolve as resolveTs } from "eslint-import-resolver-typescript";

const IMPORTER_NAME = "eslint-import-resolver-typescript-bun";

const log = debug(IMPORTER_NAME);

export const interfaceVersion = 2;

export const resolve: typeof resolveTs = function (source, file, config) {
  if (source.startsWith("bun:")) {
    log("matched bun modules:", source);
    return { found: true, path: null };
  }
  return resolveTs(source, file, config);
};
