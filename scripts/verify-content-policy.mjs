import fs from "node:fs";

const checks = [
  ["dist/index.html", [/Hot 100/gi, /官方题库/g]],
  ["dist/app.js", [/name:\s*["']Hot 100["']/g, />官方顺序</g, />查看官方原题</g]],
  ["dist/curated-problems.js", [/官方原题/g, /官方示例/g, /完整 Hot 100/gi]],
  ["README.md", [/覆盖完整 Hot 100/gi, /完整 Hot 100/gi]],
  ["PRODUCT.md", [/limited to LeetCode Hot 100/gi, /focuses only on LeetCode Hot 100/gi]]
];

let failures = 0;
for (const [filename, patterns] of checks) {
  const source = fs.readFileSync(new URL(`../${filename}`, import.meta.url), "utf8");
  for (const pattern of patterns) {
    if (!pattern.test(source)) continue;
    failures += 1;
    console.error(`FAIL ${filename}: disallowed product or provenance wording matched ${pattern}`);
  }
}

const notice = fs.readFileSync(new URL("../dist/CONTENT_NOTICE.txt", import.meta.url), "utf8");
for (const phrase of ["独立开发", "自有学习顺序", "不收录或镜像", "侵权"]) {
  if (notice.includes(phrase)) continue;
  failures += 1;
  console.error(`FAIL CONTENT_NOTICE.txt: missing ${phrase}`);
}

if (failures) process.exit(1);
console.log("Content policy checks passed: independent naming, provenance labels, and public notice.");
