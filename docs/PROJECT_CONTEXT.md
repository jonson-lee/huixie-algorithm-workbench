# 项目上下文

## 产品

“回写”是面向已有编程经验用户的免费算法记忆与复习工具。核心闭环不是刷完成数，而是：回忆识别信号和步骤，从空白写出 Python 解法，按需展开多种参考解法进行对照，最后安排复习。

`0.3.1` 于 2026-09-21 完成发布后加固。该版本完整覆盖当前 Hot 100，并修复语义判题、跨题 Worker 竞态、深输入边界、存储升级和 Cloud Studio 打包问题；确认范围见 `docs/UPDATE_1_REQUIREMENTS.md`。

## 当前实现

- 单页静态网站，入口在 `dist/index.html`。
- `dist/problems.js` 保存原创摘要、主解法、提示和测试。
- `dist/solution-variants.js` 为 13 道内置题补充第二种独立 Python 解法，并规范化一题多解数据。
- `dist/hot100-extra.js` 补充其余 87 道题，使内置题库完整覆盖当前 Hot 100；每题包含 2 种独立 Python 解法和至少 2 组本地测试。
- `dist/storage.js` 封装 IndexedDB；不可用时降级到 `localStorage` 兼容模式。
- `dist/app.js` 负责四阶段回写、个性化队列、题库管理、导入校验、间隔复习及 WebMCP。
- `dist/pyodide-worker.js` 在模块化 Web Worker 中运行 Python。
- `dist/judge.js` 为浏览器 Worker 与 Node 内容校验提供同一套答案比较规则。
- `dist/pyodide/` 自托管 Pyodide 314.0.6 核心文件及 MPL-2.0 许可证。
- `dist/service-worker.js` 缓存站点外壳，并在后续请求中缓存同源运行时文件。
- `.openai/hosting.json` 绑定 Sites 私有托管项目。
- `docs/UPDATE_1_REQUIREMENTS.md` 是第一次产品更新的确认范围和验收标准。

题库、学习进度、草稿和设置保存在浏览器 IndexedDB，支持完整备份、恢复和主动清除。第一次启动会迁移旧版 `localStorage` 记录并在 IndexedDB 保留迁移备份。不要求账号，不上传代码，不接入 LeetCode 账号或 Cookie。

## 本地验证

在项目根目录运行：

```bash
node --check dist/app.js
node --check dist/problems.js
node --check dist/solution-variants.js
node --check dist/hot100-extra.js
node --check dist/storage.js
node --check dist/pyodide-worker.js
node --check dist/service-worker.js
node scripts/verify-content.mjs
node scripts/verify-regressions.mjs
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

浏览器验收必须覆盖：题库切换、答案按需展开、闭卷回忆、代码默写、本地测试、对照、复习安排、断点续学、390px 手机布局和宽屏布局。

## Cloud Studio 部署

- `.vscode/preview.yml` 使用 `python3 -m http.server` 在 8080 端口提供 `dist/`。
- Cloud Studio 启动后会生成 `*.cloudstudio.club` 公开预览地址；工作空间休眠或停止时，该地址不可访问。
- Cloud Studio 版本从 jsDelivr 加载 Pyodide 314.0.6，以减小上传包；Python 代码仍只在浏览器本地执行。
- `scripts/build-cloudstudio-release.sh` 负责替换 CDN Worker、生成压缩包并检查运行时引用，避免手工打包遗漏。
- `0.3.1` 的发布包应由该脚本生成；具体公开 URL 不写入仓库。
- 线上验收已确认回忆页显示“先在脑中走一遍”和“开始默写”，且不再出现“写下代码之前的两件事”。
- 线上验收已确认内置题库显示完整 100 题，每题显示 2 种解法，并保留自定义题库管理入口。
- 发布前本地内容校验包括：100 份 starter、200 份参考实现、426 次解法用例组合，以及语义比较器和大输入边界回归测试。

## 内容与品牌边界

- 不抓取、镜像或复制官方题面、示例、题解、测试与品牌视觉。
- 只保留最低限度的题号、标题、官方链接等引用信息。
- 教学文字、代码、例子、变式和本地测试保持独立创作。
- 可以优先研究高浏览量公开题解及 Krahets、灵茶山艾府的思路，但只能独立总结与独立编写，并提供参考链接。
- 页面必须持续声明本工具与 LeetCode／力扣无隶属或背书关系。
- 本地测试只提供学习反馈，最终判定以官方平台提交为准。
