# 自定义题库 JSON 格式

回写 `0.2.0` 使用版本化 JSON 导入、导出自定义题库。文件顶层必须声明：

```json
{
  "schema": "huixie.problem-library",
  "version": 1,
  "library": {}
}
```

网站“题库”页面提供“下载格式示例”，可直接以该文件为起点编辑。

## 题库字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 题库稳定标识，最长 100 字符 |
| `name` | string | 是 | 显示名称，最长 60 字符 |
| `description` | string | 否 | 简介，最长 180 字符 |
| `problems` | array | 是 | 题目列表，最多 500 项 |

## 题目字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 题目稳定标识；只允许字母、数字、下划线和连字符 |
| `number` | string / number | 否 | 题号或个人编号 |
| `title` | string | 是 | 题目名称 |
| `topic` | string | 否 | 模式或主题 |
| `summary` | string | 是 | 问题摘要；建议自己概述，不粘贴完整受版权保护题面 |
| `signature` | string | 否 | 例如 `solve(nums) → int` |
| `starter` | string | 是 | Python 3 起始代码，入口函数固定为 `solve` |
| `referenceUrl` | string | 否 | 外部题目或资料索引，仅接受 HTTPS 链接；旧字段 `officialUrl` 仍可导入 |
| `hints` | string[] | 否 | 最多 6 条提示 |
| `solutions` | array | 是 | 1～8 种解法 |
| `tests` | array | 否 | 最多 30 组本地测试 |
| `compare` | string | 否 | 答案比较模式，见下文 |

`compare` 支持：

- `exact`：完整 JSON 结构与顺序一致。
- `unordered`：忽略一维列表顺序。
- `outerUnordered`：忽略最外层结果顺序，但保留每个内层结果的顺序，适合全排列和 N 皇后。
- `nestedUnordered`：同时忽略外层与各内层列表顺序，适合子集和分组结果。
- `longestPalindrome`、`balancedBst`、`topologicalOrder`：内置题库使用的专用语义校验器；自定义题库通常不应依赖这些模式。

## 解法字段

每项 `solutions` 包含：

- `id`：解法标识。
- `name`：解法名称。
- `idea`：核心思路。
- `steps`：关键步骤数组。
- `complexity`：时间与空间复杂度。
- `pitfalls`：易错点数组。
- `code`：完整 Python 3 代码，必须定义 `solve`。
- `source`：可选对象，包含来源名称 `label` 和 HTTPS 链接 `url`。

## 测试字段

每项 `tests` 包含：

- `label`：用例名称。
- `args`：传给 `solve(*args)` 的参数数组。
- `expected`：期望的 JSON 可序列化返回值。

例如 `solve([1, 2, 3])` 的参数应写为 `"args": [[1, 2, 3]]`。

## 安全边界

- 导入文件最大 2 MB。
- 说明文字只作为纯文本渲染，不执行 HTML。
- 链接只允许 HTTPS。
- 不应导入未获授权的完整题面、官方示例、第三方题解或图片；建议只保留自写摘要与必要索引链接。
- Python 代码只在浏览器 Pyodide Worker 中执行。
- 运行时加载后会关闭 Worker 的网络与同源存储入口，并限制导入、运行时间和输出大小；浏览器端执行仍不等于可证明的安全沙箱，只应运行可信题库。
- 本地测试不是权威判题，最终结果仍以题目来源平台为准。
