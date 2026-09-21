import { loadPyodide } from "./pyodide/pyodide.mjs";
import { compareAnswer } from "./judge.js?v=1";

const PYODIDE_ROOT = new URL("./pyodide/", self.location.href).href;
let pyodidePromise = null;

function loadRuntime() {
  if (!pyodidePromise) {
    self.postMessage({ type: "status", message: "正在下载并缓存 Python 运行时……" });
    pyodidePromise = loadPyodide({ indexURL: PYODIDE_ROOT });
  }
  return pyodidePromise;
}

const MAX_RESULT_CHARS = 1_000_000;

function restrictWorkerCapabilities() {
  const blocked = () => Promise.reject(new Error("题库代码不能访问网络"));
  for (const [name, value] of [["fetch", blocked], ["WebSocket", undefined], ["EventSource", undefined], ["indexedDB", undefined], ["caches", undefined]]) {
    try { Object.defineProperty(self, name, { configurable: false, writable: false, value }); } catch {}
  }
}

self.onmessage = async (event) => {
  const { code, tests, compare } = event.data || {};

  try {
    const pyodide = await loadRuntime();
    restrictWorkerCapabilities();
    self.postMessage({ type: "status", phase: "runtime-ready", message: "Python 已就绪，正在运行原创测试……" });
    const results = [];

    for (const test of tests || []) {
      try {
        const codeLiteral = JSON.stringify(String(code || ""));
        const argsLiteral = JSON.stringify(JSON.stringify(test.args || []));
        const script = `
import json, builtins
_allowed_modules = {"bisect", "collections", "functools", "heapq", "itertools", "math"}
_original_import = builtins.__import__
def _restricted_import(name, globals=None, locals=None, fromlist=(), level=0):
    root = name.split(".", 1)[0]
    if level or root not in _allowed_modules:
        raise ImportError(f"题库代码不允许导入 {name}")
    return _original_import(name, globals, locals, fromlist, level)
_safe_builtins = dict(vars(builtins))
for _name in ("breakpoint", "compile", "eval", "exec", "exit", "help", "input", "open", "quit"):
    _safe_builtins.pop(_name, None)
_safe_builtins["__import__"] = _restricted_import
_scope = {"__builtins__": _safe_builtins, "__name__": "__huixie__"}
exec(${codeLiteral}, _scope)
if "solve" not in _scope:
    raise NameError("没有找到 solve 函数")
_args = json.loads(${argsLiteral})
_answer = _scope["solve"](*_args)
json.dumps(_answer, ensure_ascii=False)
`;
        const raw = String(await pyodide.runPythonAsync(script));
        if (raw.length > MAX_RESULT_CHARS) throw new Error("输出超过 1 MB 限制");
        const actual = JSON.parse(raw);
        const pass = compareAnswer(actual, test.expected, compare, test.args);
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
