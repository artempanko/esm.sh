import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

import { micromark } from "http://localhost:8080/micromark";
import {
  frontmatter,
  frontmatterHtml,
} from "http://localhost:8080/micromark-extension-frontmatter";
import { mdxjs } from "http://localhost:8080/micromark-extension-mdxjs";

const md = `---
title: esm.sh
---

import Foo from "../components/Foo.tsx"

# esm.sh

A fast, global content delivery network to transform [NPM](http://npmjs.org/) packages to standard **ES Modules** by [esbuild](https://github.com/evanw/esbuild).

<Foo bar="2000" />
`;

const html = `
<h1>esm.sh</h1>
<p>A fast, global content delivery network to transform <a href="http://npmjs.org/">NPM</a> packages to standard <strong>ES Modules</strong> by <a href="https://github.com/evanw/esbuild">esbuild</a>.</p>
`;

Deno.test("micromark", () => {
  const output = micromark(md, {
    extensions: [frontmatter(), mdxjs()],
    htmlExtensions: [frontmatterHtml()],
  });
  assertEquals(output.trim(), html.trim());
});
