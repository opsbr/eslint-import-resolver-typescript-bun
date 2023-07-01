import { interfaceVersion, resolve } from "../src";

test("interfaceVersion", () => {
  expect(interfaceVersion).toBe(2);
});

test.each([
  { source: "fs", found: true, path: null },
  { source: "node:fs", found: true, path: null },
  { source: "not_found", found: false, path: undefined },
  { source: "bun", found: true, path: null },
  { source: "bun:test", found: true, path: null },
  { source: "bun:not_found", found: false, path: undefined },
])(
  "resolve $source => found: $found, path: $path",
  ({ source, found, path }) => {
    const result = resolve(source, "");
    expect(result.found).toBe(found);
    expect(result.path).toBe(path);
  }
);
