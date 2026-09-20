# 回写

面向算法零基础大学生的免费算法复现工作台。当前版本聚焦 Hot 100 的代表题，采用“先看原创解法 → 合上答案复述 → 独立编码 → 本地验证 → 间隔复习”的学习闭环。

## 当前范围

- Python 3 单语言验证版
- 13 道代表题，用于验证学习机制，而不是完整 Hot 100
- 个性化训练队列、分级提示、闭卷复述和复习安排
- 浏览器内 Pyodide 判题，不需要服务器、账号或付费 API
- 学习进度、代码草稿和设置默认只保存在浏览器本机

## 本地运行

```bash
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

打开 `http://127.0.0.1:4173`。

基础检查：

```bash
node --check dist/app.js
node --check dist/problems.js
node --check dist/pyodide-worker.js
node --check dist/service-worker.js
node scripts/verify-content.mjs
```

## Cloud Studio

仓库包含 `.vscode/preview.yml`，Cloud Studio 可通过 8080 端口运行 `dist/`。开发工作空间停止或休眠后，临时预览地址也会停止响应。

## 内容与隐私边界

- 不抓取或镜像 LeetCode／力扣官方题面、题解、测试与品牌视觉。
- 教学文字、代码、例子、变式和本地测试保持独立创作。
- 本地测试只用于学习反馈，最终结果以官方平台提交为准。
- 不接入 LeetCode 账号、Cookie 或提交记录。

## 第三方组件与许可

Pyodide 和 Smiley Sans 的许可文件随分发文件保留，详见 `dist/THIRD_PARTY_NOTICES.txt`、`dist/pyodide/LICENSE` 与 `dist/fonts/OFL.txt`。

本项目目前未声明开源许可证；除上述第三方组件外，保留所有权利。

## 版本记录

用户可感知的新增、变更和修复统一记录在 [CHANGELOG.md](CHANGELOG.md)。尚在讨论或尚未完成的事项不会写成已发布功能。
