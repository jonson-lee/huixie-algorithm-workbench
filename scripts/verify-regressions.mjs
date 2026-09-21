import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { compareAnswer } from "../dist/judge.js";

const sandbox = { window: {} };
for (const filename of ["problems.js", "solution-variants.js", "hot100-extra.js"]) {
  vm.runInNewContext(fs.readFileSync(new URL(`../dist/${filename}`, import.meta.url), "utf8"), sandbox);
}
const problems = sandbox.window.PROBLEMS;
const byId = new Map(problems.map((problem) => [problem.id, problem]));
let failures = 0;

function check(condition, label) {
  if (condition) return;
  failures += 1;
  console.error(`FAIL ${label}`);
}

function runSolution(problemId, solutionIndex, args, label, timeout = 5000) {
  const problem = byId.get(problemId);
  const solution = problem?.solutions?.[solutionIndex];
  if (!solution) {
    check(false, `${label}: solution missing`);
    return undefined;
  }
  const runner = `${solution.code}\n\nimport json, sys\n_args = json.loads(sys.stdin.read())\nprint(json.dumps(solve(*_args), ensure_ascii=False))`;
  const result = spawnSync("python3", ["-c", runner], { input: JSON.stringify(args), encoding: "utf8", timeout });
  check(result.status === 0, `${label}: ${result.error?.message || result.stderr.trim() || `exit ${result.status}`}`);
  if (result.status !== 0) return undefined;
  try {
    return JSON.parse(result.stdout.trim());
  } catch {
    check(false, `${label}: invalid JSON output`);
    return undefined;
  }
}

check(!compareAnswer([[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]], byId.get("permutations").tests[0].expected, "outerUnordered"), "duplicate permutations must fail");
check(compareAnswer([[3, 2, 1], [1, 2, 3], [2, 1, 3], [3, 1, 2], [1, 3, 2], [2, 3, 1]], byId.get("permutations").tests[0].expected, "outerUnordered"), "permutation result order may vary");
check(compareAnswer([["ate", "tea", "eat"], ["nat", "tan"], ["bat"]], byId.get("group-anagrams").tests[0].expected, "nestedUnordered"), "anagram group order may vary");
check(compareAnswer([...byId.get("n-queens").tests[0].expected].reverse(), byId.get("n-queens").tests[0].expected, "outerUnordered"), "N-Queens solution order may vary");
check(compareAnswer("aba", "bab", "longestPalindrome", ["babad"]), "any longest palindrome is valid");
check(compareAnswer([0, -3, 9, -10, null, 5], [0, -10, 5, null, -3, null, 9], "balancedBst", [[-10, -3, 0, 5, 9]]), "alternate balanced BST is valid");
check(!compareAnswer([-10, null, -3, null, 0, null, 5, null, 9], [], "balancedBst", [[-10, -3, 0, 5, 9]]), "unbalanced BST must fail");

const missingSteps = problems.flatMap((problem) => problem.solutions.filter((solution) => !solution.steps?.length).map((solution) => `${problem.id}/${solution.name}`));
const missingPitfalls = problems.flatMap((problem) => problem.solutions.filter((solution) => !solution.pitfalls?.length).map((solution) => `${problem.id}/${solution.name}`));
const missingSources = problems.flatMap((problem) => problem.solutions.filter((solution) => !solution.source?.url).map((solution) => `${problem.id}/${solution.name}`));
check(missingSteps.length === 0, `${missingSteps.length} solutions missing steps`);
check(missingPitfalls.length === 0, `${missingPitfalls.length} solutions missing pitfalls`);
check(missingSources.length === 0, `${missingSources.length} solutions missing source URL`);

const chainSize = 1500;
const rightChain = [];
for (let value = 0; value < chainSize; value += 1) {
  if (value) rightChain.push(null);
  rightChain.push(value);
}
const longValues = Array.from({ length: 5000 }, (_, index) => index);
check(JSON.stringify(runSolution("reverse-linked-list", 1, [longValues], "reverse linked list boundary")) === JSON.stringify([...longValues].reverse()), "reverse linked list boundary output");
check(JSON.stringify(runSolution("reverse-nodes-in-k-group", 1, [longValues, 1], "k-group boundary")) === JSON.stringify(longValues), "k-group boundary output");
const prerequisites = Array.from({ length: 1999 }, (_, index) => [index + 1, index]);
check(runSolution("course-schedule", 1, [2000, prerequisites], "course schedule boundary") === true, "course schedule boundary output");
check(runSolution("number-of-islands", 0, [Array.from({ length: 40 }, () => Array(40).fill(1))], "islands boundary") === 1, "islands boundary output");
check(runSolution("diameter-of-binary-tree", 0, [rightChain], "diameter boundary") === chainSize - 1, "diameter boundary output");
check(runSolution("validate-binary-search-tree", 0, [rightChain], "BST boundary") === true, "BST boundary output");
check(runSolution("lowest-common-ancestor-of-a-binary-tree", 0, [rightChain, 0, chainSize - 1], "LCA boundary") === 0, "LCA boundary output");
check(runSolution("tree-depth", 0, [rightChain], "tree depth boundary") === chainSize, "tree depth boundary output");
check(JSON.stringify(runSolution("next-permutation", 1, [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]], "next permutation performance")) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), "next permutation boundary output");

if (failures) process.exit(1);
console.log(`Regression checks passed: semantic comparators, ${problems.length * 2} complete solution records, and 9 boundary scenarios.`);
