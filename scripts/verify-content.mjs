import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { compareAnswer, COMPARE_MODES } from "../dist/judge.js";

const source = fs.readFileSync(new URL("../dist/curated-problems.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const problems = sandbox.window.PROBLEMS;

let failures = 0;

const ids = new Set();
const numbers = new Set();
for (const problem of problems) {
  if (ids.has(problem.id)) {
    failures += 1;
    console.error(`FAIL duplicate problem id: ${problem.id}`);
  }
  if (numbers.has(Number(problem.number))) {
    failures += 1;
    console.error(`FAIL duplicate problem number: ${problem.number}`);
  }
  ids.add(problem.id);
  numbers.add(Number(problem.number));
  if (problem.curationRank !== ids.size) {
    failures += 1;
    console.error(`FAIL ${problem.id}: curationRank must match its one-based position`);
  }
  if (problem.contentOrigin !== "huixie-editorial") {
    failures += 1;
    console.error(`FAIL ${problem.id}: missing independent editorial origin`);
  }
  if (!String(problem.referenceUrl || "").startsWith("https://leetcode.cn/problems/")) {
    failures += 1;
    console.error(`FAIL ${problem.id}: invalid external problem index`);
  }
  if (Object.hasOwn(problem, "officialUrl")) {
    failures += 1;
    console.error(`FAIL ${problem.id}: legacy officialUrl must not appear in curated content`);
  }
  if (!COMPARE_MODES.includes(problem.compare || "exact")) {
    failures += 1;
    console.error(`FAIL ${problem.id}: unsupported compare mode ${problem.compare}`);
  }
  if (!Array.isArray(problem.solutions) || problem.solutions.length < 2) {
    failures += 1;
    console.error(`FAIL ${problem.id}: expected at least 2 solutions`);
  }
  if (!Array.isArray(problem.tests) || problem.tests.length < 2) {
    failures += 1;
    console.error(`FAIL ${problem.id}: expected at least 2 tests`);
  }
  if (problem.solutions.some((solution) => solution.source?.type !== "problem-index")) {
    failures += 1;
    console.error(`FAIL ${problem.id}: solution source must distinguish problem index from solution provenance`);
  }
}

if (problems.length !== 150 || numbers.size !== 150) {
  failures += 1;
  console.error(`FAIL curated set integrity: count=${problems.length}, unique numbers=${numbers.size}`);
}

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

  for (const solution of problem.solutions) {
    for (const test of problem.tests) {
      const runner = `${solution.code}\n\nimport json, sys\nargs = json.loads(sys.stdin.read())\nprint(json.dumps(solve(*args), ensure_ascii=False))`;
      const result = spawnSync("python3", ["-c", runner], {
        input: JSON.stringify(test.args),
        encoding: "utf8"
      });

      if (result.status !== 0) {
        failures += 1;
        console.error(`FAIL ${problem.id} / ${solution.name} / ${test.label}: ${result.stderr.trim()}`);
        continue;
      }

      const actual = JSON.parse(result.stdout.trim());
      const pass = compareAnswer(actual, test.expected, problem.compare, test.args);

      if (!pass) {
        failures += 1;
        console.error(
          `FAIL ${problem.id} / ${solution.name} / ${test.label}: expected ${JSON.stringify(test.expected)}, got ${JSON.stringify(actual)}`
        );
      }
    }
  }
}

if (failures) {
  console.error(`${failures} content test(s) failed`);
  process.exit(1);
}

const testCount = problems.reduce((sum, problem) => sum + problem.tests.length * problem.solutions.length, 0);
const solutionCount = problems.reduce((sum, problem) => sum + problem.solutions.length, 0);
console.log(`${problems.length} curated starters compiled; ${solutionCount} solutions passed ${testCount} independent test checks`);
