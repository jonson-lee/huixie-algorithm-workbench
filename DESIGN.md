---
name: 回写
description: 回忆模式、默写 Python、按需对照多解的算法记忆工作台
colors:
  board: "#eef1f4"
  board-bright: "#f8fafb"
  ink: "#12161d"
  muted: "#58616d"
  line: "#c9cfd6"
  line-strong: "#858f9b"
  cobalt: "#284bd8"
  cobalt-deep: "#183393"
  current: "#c7f36b"
  current-ink: "#23320c"
  success: "#0c7a5b"
  warning: "#a64811"
  danger: "#b02d32"
  code: "#171c24"
  code-soft: "#232b36"
typography:
  display:
    fontFamily: '"Smiley Sans", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "clamp(2.15rem, 4.2vw, 4.9rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: 'ui-monospace, "SFMono-Regular", Consolas, monospace'
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.075em"
rounded:
  radius: "10px"
---

# Design System: 回写

## Overview

**Creative North Star: 学习电路板 / Learning Circuit Board**

“回写”把每日复习呈现为一块正在工作的学习电路板：冷调陶瓷底板承载石墨模块，钴蓝走线表示结构，黄绿色电流只标记当前行动。界面像程序员桌面上的训练仪器——精确、耐用、直接，减少基础教学装饰，优先服务高频回忆和代码默写。

自托管的 Smiley Sans 只用于首页命题、负载数字和关键模块标题，形成带工程感的窄斜展示字；正文、控件和练习页的小标题继续使用熟悉的系统字体，优先保证可读性。

## Colors

- `#eef1f4` 是冷陶瓷底板，`#f8fafb` 是主要内容面。
- `#12161d` 是石墨墨色和主操作面，`#58616d` 承载辅助信息。
- `#284bd8` 是连接结构与完成状态的钴蓝走线。
- `#c7f36b` 是当前动作、活动引脚、选择和焦点的“电流”。
- 成功、到期和破坏性动作分别使用 `#0c7a5b`、`#a64811`、`#b02d32`，且必须同时有文字说明。

**The Current Rule.** 黄绿色只标记当前动作、选择与键盘焦点，不作为大面积装饰底色。

## Typography

- Display：Smiley Sans，400，`clamp(2.15rem, 4.2vw, 4.9rem)`，紧凑行高。
- Body：系统无衬线，16px / 1.55；讲解正文控制在约 48–64ch。
- Label：系统等宽字体，通常 12px、700，用于编号、阶段、状态和测量值。
- Code：系统等宽字体，约 14–15px / 1.7。

**The Instrument Label Rule.** 等宽大写只服务于仪表信息，不把中文正文“终端化”。

## Layout

应用外壳最大宽度 1560px。桌面首页使用 `220px / minmax(0, 1fr) / 250px` 三栏，中心的下一道回写拥有最大视觉权重；题库页使用窄题库索引与连续题目表，练习页让精简的题目信号、深色编辑器和对照抽屉依次接管主工作面。1120px 以下收起记忆证据栏，820px 以下变为单列并把主导航固定到底部。

手机上的四阶段轨道使用四个等宽列，必须在 320px 以上视口同时可见；练习区纵向展开，不能压缩成双栏迷你 IDE。页面底部为固定导航预留足够安全空间。

## Elevation & Depth

系统默认保持平面化，通过亮度差、1px 边框、走线和深色工作面分层。阴影只用于活动引脚外环、编辑器焦点内环和临时 Toast。

**The Flat-by-Default Rule.** 普通模块不使用悬浮阴影。

## Shapes

大型活动模块使用 10px 圆角，按钮和输入使用 7–8px。圆形只用于引脚与状态灯，胶囊只用于短信号标签。数据栏和表格保持连续边界，避免形成通用卡片墙。

## Components

- Primary button：最小高度 46px，石墨底白字；hover 转为黄绿色底石墨字。
- Secondary button：高亮陶瓷底、石墨边框；hover 转为浅钴蓝。
- Inputs：白底、强导线边框、清晰标签；焦点使用 3px 黄绿色外框。
- Code editor：深石墨背景、浅色等宽文字，焦点使用黄绿色内环。
- Navigation：桌面置于顶栏；820px 以下固定到底部并均分，所有触控目标至少 44px。
- Recall track：四枚圆形引脚以导线连接“回忆、默写、对照、复习”；当前为黄绿色，完成为钴蓝，未开始为陶瓷底。
- Solution drawer：每种解法只在一条连续索引中显示名称与复杂度，用户主动展开后才出现思路、步骤、易错点和完整代码。
- Active module：10px 圆角、1px 石墨边界、无静态阴影；桌面双栏、手机单栏。

## Do's and Don'ts

### Do

- 用接通、点亮和文字一起表达回忆状态。
- 让“下一步”始终具有最高层级，并维持明显的键盘焦点。
- 保持明亮学习面与深色编码面的清楚分工。
- 让长篇题解和完整代码只在用户主动展开后出现。
- 尊重 `prefers-reduced-motion`，同时让最终状态无需动画也能理解。

### Don't

- 不做整站深色霓虹终端，也不添加装饰性插画来稀释学习任务。
- 不让阶段、成功或错误只依赖颜色传达。
- 不给所有容器套胶囊圆角或通用阴影。
- 不在窄屏隐藏任何回写阶段，或让底部导航遮挡页面控件。
