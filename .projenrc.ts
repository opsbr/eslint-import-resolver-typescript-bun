import { OpsBRTypeScriptProject } from "@opsbr/projen-typescript";
const project = new OpsBRTypeScriptProject({
  name: "eslint-import-resolver-typescript-bun",
  defaultReleaseBranch: "main",
  deps: ["debug", "eslint-import-resolver-typescript"],
  devDeps: ["@opsbr/projen-typescript", "@types/debug"],
  peerDeps: ["bun-types"],
  workflowPackageCache: true,
  releaseToNpm: true,
});
project.synth();
