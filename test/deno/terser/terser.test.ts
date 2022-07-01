import { assert } from "https://deno.land/std@0.130.0/testing/asserts.ts";

import { minify } from "http://localhost:8080/terser";

Deno.test("terser", async () => {
  var code = "function add(first, second) { return first + second; }";
  var result = await minify(code, { sourceMap: true });
  assert(result.code === "function add(n,d){return n+d}");
  assert(JSON.parse(String(result.map)).names?.length === 3);
});
