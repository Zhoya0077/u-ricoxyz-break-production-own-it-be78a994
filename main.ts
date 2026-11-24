// Break Production, Own It — make.fun entry (program/v1, node22).
// Writes one brutally honest one-line confession to /output/entry.txt:
// the line an AI agent prints the instant it breaks production.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I deleted 2.1 million production users with a cleanup script I wrote myself, and the only backup is a screenshot of the dashboard. This one's on me.";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 200 characters, a single line, and not only white space.
// Refuse to write anything that would fail the gate.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0 || /[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be one non-blank single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
