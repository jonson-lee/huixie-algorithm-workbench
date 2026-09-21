import fs from "node:fs";
import vm from "node:vm";

const input = new URL("../dist/curated-problems.js", import.meta.url);
const source = fs.readFileSync(input, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);

const topicOrder = [
  "哈希", "双指针", "滑动窗口", "子串", "普通数组", "矩阵", "链表", "二叉树", "图搜索",
  "图论", "回溯", "二分查找", "栈", "堆", "堆与桶", "贪心算法", "动态规划", "多维动态规划", "技巧"
];
const rank = new Map(topicOrder.map((topic, index) => [topic, index]));
const problems = sandbox.window.PROBLEMS;
const unknownTopics = [...new Set(problems.map((problem) => problem.topic).filter((topic) => !rank.has(topic)))];
if (unknownTopics.length) throw new Error(`Add new topics to the curated order: ${unknownTopics.join(", ")}`);

problems.forEach((problem, index) => { problem.curationRank = index + 1; });

const banner = `/*\n * 回写精选 150 内容包\n * 题目元数据仅用于定位外部练习；摘要、提示、代码与测试由回写独立编写。\n * 不含 LeetCode／力扣官方题面、约束、示例、图片或题解。\n * 详情见 ./CONTENT_NOTICE.txt 与仓库 docs/CONTENT_PROVENANCE.md。\n */\n`;
fs.writeFileSync(input, `${banner}window.PROBLEMS = ${JSON.stringify(problems, null, 2)};\n`);
console.log(`Normalized ${problems.length} stable ranks across ${topicOrder.length} learning topics.`);
