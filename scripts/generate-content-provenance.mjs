import crypto from "node:crypto";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../dist/curated-problems.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);

const items = sandbox.window.PROBLEMS.map((problem) => {
  const editorialPayload = {
    summary: problem.summary,
    hints: problem.hints,
    solutions: problem.solutions.map(({ name, idea, steps, complexity, pitfalls, code }) => ({ name, idea, steps, complexity, pitfalls, code })),
    tests: problem.tests
  };
  return {
    id: problem.id,
    number: problem.number,
    title: problem.title,
    curationRank: problem.curationRank,
    contentOrigin: problem.contentOrigin,
    referenceUrl: problem.referenceUrl,
    solutionCount: problem.solutions.length,
    testCount: problem.tests.length,
    editorialSha256: crypto.createHash("sha256").update(JSON.stringify(editorialPayload)).digest("hex")
  };
});

const manifest = `${JSON.stringify({
  schema: "huixie.content-provenance",
  version: 1,
  release: "0.4.0",
  policy: "docs/CONTENT_PROVENANCE.md",
  items
}, null, 2)}\n`;
const output = new URL("../docs/content-provenance.json", import.meta.url);

if (process.argv.includes("--check")) {
  const current = fs.existsSync(output) ? fs.readFileSync(output, "utf8") : "";
  if (current !== manifest) {
    console.error("Content provenance manifest is stale. Run node scripts/generate-content-provenance.mjs.");
    process.exit(1);
  }
  console.log(`Content provenance manifest matches ${items.length} curated records.`);
} else {
  fs.writeFileSync(output, manifest);
  console.log(`Wrote provenance for ${items.length} curated records.`);
}
