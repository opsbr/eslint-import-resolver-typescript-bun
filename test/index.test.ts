import { interfaceVersion, resolve } from "../src";

test("interfaceVersion", () => {
  expect(interfaceVersion).toBe(2);
});

test.each([
  { source: "fs", found: true },
  { source: "node:fs", found: true },
  { source: "not_found", found: false },
  { source: "bun:test", found: true },
])("resolve $source => found $found", ({ source, found }) => {
  expect(resolve(source, "").found).toBe(found);
});
