# 项目上下文

## 产品

“回写”是面向已有编程经验用户的免费算法记忆与复习工具。核心闭环不是刷完成数，而是：回忆识别信号和步骤，从空白写出 Python 解法，按需展开多种参考解法进行对照，最后安排复习。

`0.4.0` 于 2026-09-21 在 `0.3.2` 版权加固基础上完成本地内容扩充，等待 GitHub 同步与 Cloud Studio 部署。用户可见的内置题库为“回写精选 150”并采用自有学习顺序；不宣称完整复刻第三方榜单或官方顺序。

## 当前实现

- 单页静态网站，入口在 `dist/index.html`。
- `dist/curated-problems.js` 是唯一内置内容入口，包含 150 道精选练习、300 份 Python 参考实现与 300 组自编本地测试。
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
node --check dist/curated-problems.js
node --check dist/storage.js
node --check dist/pyodide-worker.js
node --check dist/service-worker.js
node scripts/verify-content.mjs
node scripts/verify-regressions.mjs
node scripts/verify-content-policy.mjs
node scripts/generate-content-provenance.mjs --check
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

浏览器验收必须覆盖：题库切换、答案按需展开、闭卷回忆、代码默写、本地测试、对照、复习安排、断点续学、390px 手机布局和宽屏布局。

## Cloud Studio 部署

- `.vscode/preview.yml` 使用 `python3 -m http.server` 在 8080 端口提供 `dist/`。
- Cloud Studio 启动后会生成 `*.cloudstudio.club` 公开预览地址；工作空间休眠或停止时，该地址不可访问。
- Cloud Studio 版本从 jsDelivr 加载 Pyodide 314.0.6，以减小上传包；Python 代码仍只在浏览器本地执行。
- `scripts/build-cloudstudio-release.sh` 负责替换 CDN Worker、生成压缩包并检查运行时引用，避免手工打包遗漏。
- `0.3.1` 已于 2026-09-21 使用该脚本生成发布包并部署到 Cloud Studio；`0.4.0` 尚未部署，具体公开 URL 不写入仓库。
- `0.3.1` 线上验收确认题库搜索、主题筛选、五种排序和 100 题计数生效；两数之和在 CDN Pyodide 隔离 Worker 中通过 3/3 测试，390px 视口无横向溢出。
- Service Worker 升级时已出现“当前草稿已保存，完成本题后刷新即可启用新版”提示，验证了练习会话保护与新版接管流程。
- 线上验收已确认回忆页显示“先在脑中走一遍”和“开始默写”，且不再出现“写下代码之前的两件事”。
- 线上 `0.3.1` 已确认内置题库显示 100 题，每题显示 2 种解法，并保留自定义题库管理入口；`0.4.0` 的新名称、150 题内容与版权说明仍待线上验收。
- `0.3.1` 发布前本地内容校验包括：100 份 starter、200 份参考实现、426 次解法用例组合，以及语义比较器和大输入边界回归测试。
- `0.4.0` 本地内容校验覆盖 150 份 starter、300 份参考实现与 600 次解法用例组合；语义回归、内容政策和 150 项来源哈希均通过。
- `0.4.0` 将内容版本提升到 3，沿用“清除旧测试结果、保留草稿与进度”的迁移策略；浏览器验收确认题库显示 150 / 150、可搜索新增题、控制台无错误，390px 视口无横向溢出。

## 内容与品牌边界

- 不抓取、镜像或复制第三方完整题面、约束、示例、题解、测试与品牌视觉。
- 题号、简短标题和外部链接只作为题目索引；用户可见名称统一使用“回写精选 150”。
- 只保留最低限度的题号、标题、官方链接等引用信息。
- 教学文字、代码、例子、变式和本地测试保持独立创作。
- 可以优先研究高浏览量公开题解及 Krahets、灵茶山艾府的思路，但只能独立总结与独立编写，并提供参考链接。
- 页面必须持续声明本工具与 LeetCode／力扣无隶属或背书关系。
- 本地测试只提供学习反馈，最终判定以题目来源平台提交为准。
- `docs/CONTENT_PROVENANCE.md` 与 `docs/content-provenance.json` 记录内容政策、来源字段及逐题哈希。
