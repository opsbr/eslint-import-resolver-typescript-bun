import { OpsBRTypeScriptProject } from "@opsbr/projen-typescript";
const project = new OpsBRTypeScriptProject({
  defaultReleaseBranch: "main",
  devDeps: ["@opsbr/projen-typescript"],
  name: "eslint-import-resolver-typescript-bun",

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
