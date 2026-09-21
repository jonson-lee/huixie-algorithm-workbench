import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const source = fs.readFileSync(new URL("../dist/problems.js", import.meta.url), "utf8");
const variantsSource = fs.readFileSync(new URL("../dist/solution-variants.js", import.meta.url), "utf8");
const extraSource = fs.readFileSync(new URL("../dist/hot100-extra.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
vm.runInNewContext(variantsSource, sandbox);
vm.runInNewContext(extraSource, sandbox);
const problems = sandbox.window.PROBLEMS;
const expectedHot100Numbers = [
  1, 49, 128, 283, 11, 15, 42, 3, 438, 560, 239, 76, 53, 56, 189, 238, 41, 73, 54, 48,
  240, 160, 206, 234, 141, 142, 21, 2, 19, 24, 25, 138, 148, 23, 146, 94, 104, 226, 101,
  543, 102, 108, 98, 230, 199, 114, 105, 437, 236, 124, 200, 994, 207, 208, 46, 78, 17, 39,
  22, 79, 131, 51, 35, 74, 34, 33, 153, 4, 20, 155, 394, 739, 84, 215, 347, 295, 121, 55, 45,
  763, 70, 118, 198, 279, 322, 139, 300, 152, 416, 32, 62, 64, 5, 1143, 72, 136, 169, 75, 31, 287
];

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
  if (!Array.isArray(problem.solutions) || problem.solutions.length < 2) {
    failures += 1;
    console.error(`FAIL ${problem.id}: expected at least 2 solutions`);
  }
  if (!Array.isArray(problem.tests) || problem.tests.length < 2) {
    failures += 1;
    console.error(`FAIL ${problem.id}: expected at least 2 tests`);
  }
}

const missingNumbers = expectedHot100Numbers.filter((number) => !numbers.has(number));
const unexpectedNumbers = [...numbers].filter((number) => !expectedHot100Numbers.includes(number));
if (problems.length !== 100 || missingNumbers.length || unexpectedNumbers.length) {
  failures += 1;
  console.error(
    `FAIL Hot 100 membership: count=${problems.length}, missing=${missingNumbers.join(",") || "none"}, unexpected=${unexpectedNumbers.join(",") || "none"}`
  );
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
      const pass = JSON.stringify(normalize(actual, problem.compare))
        === JSON.stringify(normalize(test.expected, problem.compare));

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
console.log(`${problems.length} starters compiled; ${solutionCount} solutions passed ${testCount} reference checks`);
