# 回写

面向已有编程经验用户的免费算法记忆工作台。当前开发版聚焦 Hot 100 的代表题，采用“回忆模式 → 默写 Python → 对照多解 → 安排复习”的主动回忆闭环。

## 当前范围

- 只支持 Python 3
- 13 道代表题，用于验证学习机制，而不是完整 Hot 100
- 每题 2 种独立编写的解法，共 26 份参考实现
- 个性化复习队列、闭卷回忆、代码默写和透明间隔安排
- 支持创建、编辑、导入、导出和删除本机自定义题库
- 自定义题库可携带多种题解、Python 代码和测试用例，格式见 [docs/LIBRARY_FORMAT.md](docs/LIBRARY_FORMAT.md)
- 浏览器内 Pyodide 判题，不需要服务器、账号或付费 API
- 题库、学习进度、代码草稿和设置默认保存在 IndexedDB；旧版 `localStorage` 记录会自动迁移

## 本地运行

```bash
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

打开 `http://127.0.0.1:4173`。

基础检查：

```bash
node --check dist/app.js
node --check dist/problems.js
node --check dist/solution-variants.js
node --check dist/storage.js
node --check dist/pyodide-worker.js
node --check dist/service-worker.js
node scripts/verify-content.mjs
```

## Cloud Studio

仓库包含 `.vscode/preview.yml`，Cloud Studio 可通过 8080 端口运行 `dist/`。开发工作空间停止或休眠后，临时预览地址也会停止响应。

## 内容与隐私边界

- 不抓取或镜像 LeetCode／力扣官方题面、题解、测试与品牌视觉。
- 解题文字、代码、例子和本地测试保持独立创作；公开题解只作为研究和可追溯参考。
- 导入说明按纯文本渲染，外部链接仅接受 HTTPS，用户代码只在浏览器 Worker 中执行。
- 本地测试只用于学习反馈，最终结果以官方平台提交为准。
- 不接入 LeetCode 账号、Cookie 或提交记录。

## 第三方组件与许可

Pyodide 和 Smiley Sans 的许可文件随分发文件保留，详见 `dist/THIRD_PARTY_NOTICES.txt`、`dist/pyodide/LICENSE` 与 `dist/fonts/OFL.txt`。

本项目目前未声明开源许可证；除上述第三方组件外，保留所有权利。

## 版本记录

用户可感知的新增、变更和修复统一记录在 [CHANGELOG.md](CHANGELOG.md)。尚在讨论或尚未完成的事项不会写成已发布功能。
