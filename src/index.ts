import { readFileSync } from "node:fs";
import debug from "debug";
import { resolve as resolveTs } from "eslint-import-resolver-typescript";

const IMPORTER_NAME = "eslint-import-resolver-typescript-bun";

const log = debug(IMPORTER_NAME);

const findBunModules = () => {
  const { found, path } = resolveTs("bun-types", "bun-types");
  if (!found || !path) {
    log("bun-types not found.");
    return undefined;
  }
  // TODO: Better way to inspect .d.ts file.
  const bunTypesDefinition = readFileSync(path, "utf-8");
  const bunModules = new Set(
    bunTypesDefinition
      .split("\n")
      // Find `declare module "bun..." {`
      .filter((line) => line.includes('declare module "bun'))
      // Extract `bun...` parts only
      .map((line) => line.split('"')[1])
  );
  log("found bun modules:", bunModules);
  return bunModules;
};
const bunModules = findBunModules();

export const interfaceVersion = 2;

export const resolve: typeof resolveTs = function (source, file, config) {
  if (bunModules?.has(source)) {
    log("matched bun modules:", source);
    return { found: true, path: null };
  }
  return resolveTs(source, file, config);
};
