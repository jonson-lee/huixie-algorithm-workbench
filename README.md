# 回写

面向已有编程经验用户的免费算法记忆工作台。当前开发版提供“回写精选 150”，采用“回忆模式 → 默写 Python → 对照多解 → 安排复习”的主动回忆闭环。

## 当前范围

- 只支持 Python 3
- 回写精选 150，共 150 道内置练习，采用自有学习顺序
- 每题 2 种独立编写的解法，共 300 份参考实现和 300 组自编本地测试
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
node --check dist/curated-problems.js
node --check dist/storage.js
node --check dist/pyodide-worker.js
node --check dist/service-worker.js
node scripts/verify-content.mjs
node scripts/verify-regressions.mjs
node scripts/verify-content-policy.mjs
```

## Cloud Studio

仓库包含 `.vscode/preview.yml`，Cloud Studio 可通过 8080 端口运行 `dist/`。开发工作空间停止或休眠后，临时预览地址也会停止响应。

## 内容与隐私边界

- 不抓取或镜像 LeetCode／力扣官方题面、题解、测试与品牌视觉。
- 题号、简短标题与外部链接仅用于定位原始练习；不以 LeetCode／力扣作为产品名称或题库名称。
- 解题文字、代码、例子和本地测试保持独立创作；内容来源与审查规则见 [docs/CONTENT_PROVENANCE.md](docs/CONTENT_PROVENANCE.md)。
- 导入说明按纯文本渲染，外部链接仅接受 HTTPS，用户代码只在浏览器 Worker 中执行。
- Worker 在 Python 运行时加载后关闭网络与同源存储能力，并限制导入、运行时间和结果大小；仍只应运行自己信任的题库代码。
- 本地测试只用于学习反馈，最终结果以题目来源平台提交为准。
- 不接入 LeetCode 账号、Cookie 或提交记录。

## Cloud Studio 发布包

```bash
scripts/build-cloudstudio-release.sh 0.4.0
```

脚本会生成 `work/huixie-cloudstudio-v0.4.0.zip`，把 Cloud Studio Worker 切换为固定版本的 Pyodide CDN，并验证精选内容包、版权说明与共享判题模块已包含，上传包不会错误引用缺失的自托管运行时。

## 第三方组件与许可

Pyodide 和 Smiley Sans 的许可文件随分发文件保留，详见 `dist/THIRD_PARTY_NOTICES.txt`、`dist/pyodide/LICENSE` 与 `dist/fonts/OFL.txt`。

本项目目前未声明开源许可证；除上述第三方组件外，保留所有权利。

## 版本记录

用户可感知的新增、变更和修复统一记录在 [CHANGELOG.md](CHANGELOG.md)。尚在讨论或尚未完成的事项不会写成已发布功能。
