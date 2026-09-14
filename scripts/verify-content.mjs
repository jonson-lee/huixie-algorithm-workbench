import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const source = fs.readFileSync(new URL("../dist/problems.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const problems = sandbox.window.PROBLEMS;

function normalize(value, mode) {
  if (mode === "unordered") {
    return [...value].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }

  if (mode === "nestedUnordered") {
    return value
      .map((item) => (Array.isArray(item) ? [...item].sort((a, b) => a - b) : item))
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }

  return value;
}

let failures = 0;

for (const problem of problems) {
  const starterCheck = spawnSync(
    "python3",
    ["-c", "import sys; compile(sys.stdin.read(), '<starter>', 'exec')"],
    { input: problem.starter, encoding: "utf8" }
  );

  if (starterCheck.status !== 0) {
    failures += 1;
    console.error(`FAIL ${problem.id} / starter syntax: ${starterCheck.stderr.trim()}`);
  }

  for (const test of problem.tests) {
    const runner = `${problem.solution}\n\nimport json, sys\nargs = json.loads(sys.stdin.read())\nprint(json.dumps(solve(*args), ensure_ascii=False))`;
    const result = spawnSync("python3", ["-c", runner], {
      input: JSON.stringify(test.args),
      encoding: "utf8"
    });

    if (result.status !== 0) {
      failures += 1;
      console.error(`FAIL ${problem.id} / ${test.label}: ${result.stderr.trim()}`);
      continue;
    }

    const actual = JSON.parse(result.stdout.trim());
    const pass = JSON.stringify(normalize(actual, problem.compare))
      === JSON.stringify(normalize(test.expected, problem.compare));

    if (!pass) {
      failures += 1;
      console.error(
        `FAIL ${problem.id} / ${test.label}: expected ${JSON.stringify(test.expected)}, got ${JSON.stringify(actual)}`
      );
    }
  }
}

if (failures) {
  console.error(`${failures} content test(s) failed`);
  process.exit(1);
}

const testCount = problems.reduce((sum, problem) => sum + problem.tests.length, 0);
console.log(`${problems.length} starters compiled and ${testCount} reference tests passed`);
