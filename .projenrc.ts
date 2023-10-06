import { OpsBRTypeScriptProject } from "@opsbr/projen-typescript";
import { javascript } from "projen";
const project = new OpsBRTypeScriptProject({
  name: "eslint-import-resolver-typescript-bun",
  defaultReleaseBranch: "main",
  repository: "https://github.com/opsbr/eslint-import-resolver-typescript-bun",
  homepage: "https://github.com/opsbr/eslint-import-resolver-typescript-bun",
  bugsUrl:
    "https://github.com/opsbr/eslint-import-resolver-typescript-bun/issues",
  deps: ["debug", "eslint-import-resolver-typescript"],
  devDeps: ["@opsbr/projen-typescript", "@types/debug"],
  peerDeps: ["bun-types"],
  workflowPackageCache: true,
  releaseToNpm: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["opsbr-bot[bot]"],
  },
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: javascript.UpgradeDependenciesSchedule.WEEKLY,
    },
  },
});
project.synth();
