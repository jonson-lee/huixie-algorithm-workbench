function compareKey(value) {
  return JSON.stringify(value);
}

function sortValues(values) {
  return [...values].sort((left, right) => compareKey(left).localeCompare(compareKey(right)));
}

function normalize(value, mode) {
  if (mode === "unordered" && Array.isArray(value)) return sortValues(value);
  if (mode === "outerUnordered" && Array.isArray(value)) return sortValues(value);
  if (mode === "nestedUnordered" && Array.isArray(value)) {
    return sortValues(value.map((item) => Array.isArray(item) ? sortValues(item) : item));
  }
  return value;
}

function isLongestPalindrome(actual, expected, args) {
  if (typeof actual !== "string" || typeof expected !== "string") return false;
  const input = Array.isArray(args) ? args[0] : "";
  if (typeof input !== "string" || actual.length !== expected.length || !input.includes(actual)) return false;
  return actual === [...actual].reverse().join("");
}

function buildLevelTree(values) {
  if (!Array.isArray(values) || !values.length) return null;
  if (values[0] === null) return values.every((value) => value === null) ? null : undefined;
  const root = { value: values[0], left: null, right: null };
  const queue = [root];
  let cursor = 1;
  for (let head = 0; head < queue.length && cursor < values.length; head += 1) {
    const node = queue[head];
    for (const side of ["left", "right"]) {
      if (cursor >= values.length) break;
      const value = values[cursor];
      cursor += 1;
      if (value !== null) {
        node[side] = { value, left: null, right: null };
        queue.push(node[side]);
      }
    }
  }
  return values.slice(cursor).every((value) => value === null) ? root : undefined;
}

function isBalancedSearchTree(actual, args) {
  const input = Array.isArray(args) && Array.isArray(args[0]) ? args[0] : null;
  if (!input || !Array.isArray(actual)) return false;
  const root = buildLevelTree(actual);
  if (root === undefined) return false;

  const inorder = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    inorder.push(current.value);
    current = current.right;
  }
  if (compareKey(inorder) !== compareKey(input)) return false;

  if (!root) return input.length === 0;
  const heights = new Map();
  const tasks = [[root, false]];
  while (tasks.length) {
    const [node, visited] = tasks.pop();
    if (!node) continue;
    if (!visited) {
      tasks.push([node, true], [node.right, false], [node.left, false]);
      continue;
    }
    const left = heights.get(node.left) || 0;
    const right = heights.get(node.right) || 0;
    if (Math.abs(left - right) > 1) return false;
    heights.set(node, Math.max(left, right) + 1);
  }
  return true;
}

export function compareAnswer(actual, expected, mode = "exact", args = []) {
  if (mode === "longestPalindrome") return isLongestPalindrome(actual, expected, args);
  if (mode === "balancedBst") return isBalancedSearchTree(actual, args);
  return compareKey(normalize(actual, mode)) === compareKey(normalize(expected, mode));
}

export const COMPARE_MODES = Object.freeze([
  "exact",
  "unordered",
  "outerUnordered",
  "nestedUnordered",
  "longestPalindrome",
  "balancedBst"
]);
