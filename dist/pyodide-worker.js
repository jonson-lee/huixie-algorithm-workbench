import { loadPyodide } from "./pyodide/pyodide.mjs";

const PYODIDE_ROOT = new URL("./pyodide/", self.location.href).href;
let pyodidePromise = null;

function loadRuntime() {
  if (!pyodidePromise) {
    self.postMessage({ type: "status", message: "正在下载并缓存 Python 运行时……" });
    pyodidePromise = loadPyodide({ indexURL: PYODIDE_ROOT });
  }
  return pyodidePromise;
}

function normalize(value, mode) {
  if (mode === "unordered" && Array.isArray(value)) {
    return [...value].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }
  if (mode === "nestedUnordered" && Array.isArray(value)) {
    return value
      .map((item) => Array.isArray(item) ? [...item].sort((a, b) => a - b) : item)
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  }
  return value;
}

function equal(actual, expected, mode) {
  return JSON.stringify(normalize(actual, mode)) === JSON.stringify(normalize(expected, mode));
}

self.onmessage = async (event) => {
  const { code, tests, compare } = event.data || {};

  try {
    const pyodide = await loadRuntime();
    self.postMessage({ type: "status", message: "Python 已就绪，正在运行原创测试……" });
    const results = [];

    for (const test of tests || []) {
      try {
        const codeLiteral = JSON.stringify(String(code || ""));
        const argsLiteral = JSON.stringify(JSON.stringify(test.args || []));
        const script = `
import json
_scope = {}
exec(${codeLiteral}, _scope)
if "solve" not in _scope:
    raise NameError("没有找到 solve 函数")
_args = json.loads(${argsLiteral})
_answer = _scope["solve"](*_args)
json.dumps(_answer, ensure_ascii=False)
`;
        const raw = await pyodide.runPythonAsync(script);
        const actual = JSON.parse(String(raw));
        const pass = equal(actual, test.expected, compare);
        results.push({
          label: test.label,
          pass,
          actual,
          expected: test.expected,
          error: pass ? "" : `期望 ${JSON.stringify(test.expected)}，得到 ${JSON.stringify(actual)}`
        });
      } catch (error) {
        const message = String(error?.message || error || "运行失败")
          .split("\n")
          .filter(Boolean)
          .slice(-1)[0]
          .slice(0, 240);
        results.push({ label: test.label, pass: false, error: message });
      }
    }

    self.postMessage({ type: "result", results });
  } catch (error) {
    self.postMessage({
      type: "error",
      message: `Python 环境载入失败：${String(error?.message || error || "未知错误").slice(0, 240)}`
    });
  }
};
