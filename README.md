# eslint-import-resolver-typescript-bun

[![GitHub Actions](https://github.com/opsbr/eslint-import-resolver-typescript-bun/workflows/release/badge.svg)](https://github.com/import-js/eslint-import-resolver-typescript/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/eslint-import-resolver-typescript-bun.svg)](https://www.npmjs.com/package/eslint-import-resolver-typescript-bun)
[![GitHub Release](https://img.shields.io/github/release/opsbr/eslint-import-resolver-typescript-bun)](https://github.com/opsbr/eslint-import-resolver-typescript-bun/releases)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![projen](https://img.shields.io/badge/maintained%20with-projen-ED9C50.svg)](https://github.com/projen/projen)

This plugin simply adds workarounds to [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript) when resolving [Bun](https://bun.sh/)'s modules.

You can use [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) on your Bun project directly with this resolver!

## How it works

This resolver reads [`bun-types`](https://www.npmjs.com/package/bun-types) and list all Bun modules defined there. Currently, we assume all Bun modules start with `bun` e.g. `bun`, `bun:test`, etc.

Then, when resolving, if the requested module is one of the Bun modules detected above, the resolver returns `{ found: true, path: null }`. Otherwise, it delegates to `eslint-import-resolver-typescript`.

## Installation

```shell
# npm
npm i -D eslint-plugin-import eslint-import-resolver-typescript-bun

# pnpm
pnpm i -D eslint-plugin-import eslint-import-resolver-typescript-bun

# yarn
yarn add -D eslint-plugin-import eslint-import-resolver-typescript-bun
```

## Configuration

All configurations are passed to `eslint-import-resolver-typescript`. Simply replace your resolver name from `typescript` to `typescript-bun`!

```javascript
module.exports = {
  extends: ["plugin:import/recommended", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  root: true,
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript-bun": {
        // <= HERE!
        project: true,
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
```

See `eslint-import-resolver-typescript` configuration [here](https://github.com/import-js/eslint-import-resolver-typescript/tree/master#configuration).

## Debug

Use `DEBUG` environment variable provided by [`debug`](https://www.npmjs.com/package/debug):

```
$ DEBUG=eslint-import-resolver-typescript\* bun x eslint src/index.ts
  eslint-import-resolver-typescript looking for: bun-types +0ms
  eslint-import-resolver-typescript matched node path: /workspaces/asideline/node_modules/bun-types/types.d.ts +101ms
  eslint-import-resolver-typescript-bun found bun modules: Set(5) { 'bun', 'bun:test', 'bun:sqlite', 'bun:jsc', 'bun:ffi' } +0ms
  eslint-import-resolver-typescript-bun matched bun modules: bun:test +2ms
```

## Development

This project uses [Projen](https://github.com/projen/projen) and [Yarn 1](https://yarnpkg.com/).

```shell
git clone https://github.com/opsbr/eslint-import-resolver-typescript-bun.git
cd eslint-import-resolver-typescript-bun
yarn install
yarn build
```

## Acknowledgement

- [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript)
- [`bun-types`](https://www.npmjs.com/package/bun-types)

## Author

[OpsBR Software Technology Inc.](https://opsbr.com/)

## License

[Apache-2.0](https://github.com/opsbr/eslint-import-resolver-typescript-bun/blob/main/LICENSE)
