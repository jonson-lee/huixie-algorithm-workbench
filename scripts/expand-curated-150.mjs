import fs from "node:fs";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const contentFile = new URL("../dist/curated-problems.js", import.meta.url);
const source = fs.readFileSync(contentFile, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);

const original = sandbox.window.PROBLEMS;
const sourceLabel = "题目索引 · LeetCode";

function computeExpected(code, args) {
  const runner = `${code}\n\nimport json, sys\n_args = json.loads(sys.stdin.read())\nprint(json.dumps(solve(*_args), ensure_ascii=False))`;
  const result = spawnSync("python3", ["-c", runner], {
    input: JSON.stringify(args),
    encoding: "utf8"
  });
  if (result.status !== 0) throw new Error(result.stderr.trim());
  return JSON.parse(result.stdout.trim());
}

function problem(input) {
  const referenceUrl = `https://leetcode.cn/problems/${input.id}/`;
  const solutions = input.solutions.map(([name, idea, complexity, code, steps, pitfalls], index) => ({
    id: `solution-${index + 1}`,
    name,
    idea,
    complexity,
    code,
    steps: steps || input.hints,
    pitfalls: pitfalls || [input.hints.at(-1)],
    source: { type: "problem-index", label: sourceLabel, url: referenceUrl }
  }));
  return {
    id: input.id,
    number: input.number,
    title: input.title,
    topic: input.topic,
    summary: input.summary,
    signature: input.signature,
    starter: input.starter,
    hints: input.hints,
    tests: input.tests.map(([label, args]) => ({
      label,
      args,
      expected: computeExpected(solutions[0].code, args)
    })),
    solutions,
    compare: input.compare || "exact",
    referenceUrl,
    contentOrigin: "huixie-editorial"
  };
}

const additions = [
  problem({
    id: "contains-duplicate", number: 217, title: "存在重复元素", topic: "哈希",
    summary: "判断整数序列中是否有任意值出现至少两次。",
    signature: "solve(nums) → bool", starter: "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    hints: ["扫描时维护已见集合。", "若当前值已经在集合中，可以立即结束。"],
    tests: [["重复值相隔较远", [[8, -3, 5, 12, -3]]], ["所有值不同", [[11, 7, 2, 19]]]],
    solutions: [
      ["集合扫描", "边读边查集合，第一次重复时立即返回。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    seen = set()
    for value in nums:
        if value in seen:
            return True
        seen.add(value)
    return False`],
      ["排序相邻检查", "排序后重复值必然相邻，逐对检查即可。", "时间 O(n log n)，空间 O(n)。", `def solve(nums):
    ordered = sorted(nums)
    return any(ordered[i] == ordered[i - 1] for i in range(1, len(ordered)))`]
    ]
  }),
  problem({
    id: "valid-anagram", number: 242, title: "有效的字母异位词", topic: "哈希",
    summary: "判断两个字符串是否由完全相同的字符及频次组成。",
    signature: "solve(left, right) → bool", starter: "def solve(left, right):\n    # TODO: 写下你的解法\n    pass",
    hints: ["长度不同可以直接返回。", "比较字符频次，而不是字符位置。"],
    tests: [["同频不同序", ["silent", "listen"]], ["字符频次不同", ["paper", "replay"]]],
    solutions: [
      ["频次表", "分别统计两端字符频次并比较。", "时间 O(n)，空间 O(k)。", `from collections import Counter

def solve(left, right):
    return Counter(left) == Counter(right)`],
      ["排序比较", "将两串字符排序，异位词会得到相同序列。", "时间 O(n log n)，空间 O(n)。", `def solve(left, right):
    return sorted(left) == sorted(right)`]
    ]
  }),
  problem({
    id: "valid-sudoku", number: 36, title: "有效的数独", topic: "哈希",
    summary: "检查九宫格里已经填写的数字是否在每行、每列和每个三乘三宫内都不重复。",
    signature: "solve(board) → bool", starter: "def solve(board):\n    # TODO: 写下你的解法\n    pass",
    hints: ["空格不参与检查。", "宫编号可以写成 (row // 3, col // 3)。"],
    tests: [
      ["稀疏合法盘面", [[[
        "5",".",".",".","7",".",".",".","2"
      ],[".","7",".","1",".","5",".",".","."],[".",".","8",".",".",".","5",".","."],["8",".",".",".","6",".",".",".","3"],[".","2",".","8",".","3",".","7","."],["7",".",".",".","2",".",".",".","6"],[".",".","2",".",".",".","1",".","."],[".",".",".","4",".","9",".","3","."],["3",".",".",".","8",".",".",".","9"]]]],
      ["宫内出现冲突", [[[
        "4",".",".",".",".",".",".",".","."
      ],[".",".","4",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]]]
    ],
    solutions: [
      ["三组集合", "为每行、每列和每个宫分别维护集合。", "时间 O(81)，空间 O(81)。", `def solve(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            value = board[r][c]
            if value == '.':
                continue
            box = (r // 3) * 3 + c // 3
            if value in rows[r] or value in cols[c] or value in boxes[box]:
                return False
            rows[r].add(value); cols[c].add(value); boxes[box].add(value)
    return True`],
      ["统一冲突键", "把行、列、宫约束编码成三类键放进一个集合。", "时间 O(81)，空间 O(81)。", `def solve(board):
    seen = set()
    for r, row in enumerate(board):
        for c, value in enumerate(row):
            if value == '.':
                continue
            marks = (("r", r, value), ("c", c, value), ("b", r // 3, c // 3, value))
            if any(mark in seen for mark in marks):
                return False
            seen.update(marks)
    return True`]
    ]
  }),
  problem({
    id: "valid-palindrome", number: 125, title: "验证回文串", topic: "双指针",
    summary: "忽略非字母数字字符和大小写后，判断字符串是否正反一致。",
    signature: "solve(text) → bool", starter: "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    hints: ["左右指针先跳过无关字符。", "比较时统一大小写。"],
    tests: [["带标点的回文", ["No 'x' in Nixon"]], ["清洗后并非回文", ["coding, is fun!"]]],
    solutions: [
      ["原串双指针", "左右指针只在字母数字位置停留并比较。", "时间 O(n)，空间 O(1)。", `def solve(text):
    left, right = 0, len(text) - 1
    while left < right:
        while left < right and not text[left].isalnum(): left += 1
        while left < right and not text[right].isalnum(): right -= 1
        if text[left].lower() != text[right].lower(): return False
        left += 1; right -= 1
    return True`],
      ["清洗后反转", "先生成规范化字符序列，再与其逆序比较。", "时间 O(n)，空间 O(n)。", `def solve(text):
    cleaned = ''.join(ch.lower() for ch in text if ch.isalnum())
    return cleaned == cleaned[::-1]`]
    ]
  }),
  problem({
    id: "two-sum-ii-input-array-is-sorted", number: 167, title: "两数之和 II", topic: "双指针",
    summary: "在升序数组中寻找和为目标值的两个位置，并返回从一开始计数的位置。",
    signature: "solve(numbers, target) → [i, j]", starter: "def solve(numbers, target):\n    # TODO: 写下你的解法\n    pass",
    hints: ["利用有序性从两端夹逼。", "和偏小就移动左端，偏大就移动右端。"],
    tests: [["负数与正数配对", [[-9, -2, 1, 6, 12], 4]], ["相邻元素配对", [[2, 5, 9, 14], 14]]],
    solutions: [
      ["左右夹逼", "依据当前和与目标的大小关系丢弃一端。", "时间 O(n)，空间 O(1)。", `def solve(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target: return [left + 1, right + 1]
        if total < target: left += 1
        else: right -= 1
    return []`],
      ["二分寻找补数", "固定左侧元素，在其右侧二分查找补数。", "时间 O(n log n)，空间 O(1)。", `def solve(numbers, target):
    for i, value in enumerate(numbers):
        need = target - value
        left, right = i + 1, len(numbers) - 1
        while left <= right:
            mid = (left + right) // 2
            if numbers[mid] == need: return [i + 1, mid + 1]
            if numbers[mid] < need: left = mid + 1
            else: right = mid - 1
    return []`]
    ]
  }),
  problem({
    id: "longest-repeating-character-replacement", number: 424, title: "替换后的最长重复字符", topic: "滑动窗口",
    summary: "最多替换 k 个字符，求可以变成同一字符的最长连续片段长度。",
    signature: "solve(text, k) → int", starter: "def solve(text, k):\n    # TODO: 写下你的解法\n    pass",
    hints: ["窗口长度减去窗口最高频字符数，就是需要替换的数量。", "维护历史最高频次即可判断何时收缩。"],
    tests: [["中间字符可替换", ["BAAABCC", 2]], ["不允许替换", ["ABBAAC", 0]]],
    solutions: [
      ["单调窗口", "窗口内非主流字符超过 k 时收缩左端。", "时间 O(n)，空间 O(k)。", `from collections import defaultdict

def solve(text, k):
    counts = defaultdict(int)
    left = best = top = 0
    for right, ch in enumerate(text):
        counts[ch] += 1
        top = max(top, counts[ch])
        while right - left + 1 - top > k:
            counts[text[left]] -= 1; left += 1
        best = max(best, right - left + 1)
    return best`],
      ["按目标字符扩展", "枚举最终保留的字符，并为它维护一个窗口。", "时间 O(Σn)，空间 O(1)。", `def solve(text, k):
    best = 0
    for target in set(text):
        left = changed = 0
        for right, ch in enumerate(text):
            changed += ch != target
            while changed > k:
                changed -= text[left] != target; left += 1
            best = max(best, right - left + 1)
    return best`]
    ]
  }),
  problem({
    id: "permutation-in-string", number: 567, title: "字符串的排列", topic: "滑动窗口",
    summary: "判断较长字符串中是否存在一个窗口，其字符频次恰好组成目标字符串的某种排列。",
    signature: "solve(pattern, text) → bool", starter: "def solve(pattern, text):\n    # TODO: 写下你的解法\n    pass",
    hints: ["窗口长度始终等于 pattern 长度。", "比较的是频次，不是窗口内顺序。"],
    tests: [["排列出现在尾部", ["aab", "zzcaba"]], ["字符接近但频次不符", ["aabc", "xxabdcaa"]]],
    solutions: [
      ["固定窗口频次", "维护目标频次和等长窗口频次。", "时间 O(n)，空间 O(k)。", `from collections import Counter

def solve(pattern, text):
    width = len(pattern)
    if width > len(text): return False
    need = Counter(pattern); window = Counter(text[:width])
    if window == need: return True
    for right in range(width, len(text)):
        window[text[right]] += 1
        old = text[right - width]; window[old] -= 1
        if window[old] == 0: del window[old]
        if window == need: return True
    return False`],
      ["缺口计数", "用 remaining 记录窗口还缺多少个目标字符。", "时间 O(n)，空间 O(k)。", `from collections import Counter

def solve(pattern, text):
    need = Counter(pattern); left = 0; remaining = len(pattern)
    for right, ch in enumerate(text):
        if need[ch] > 0: remaining -= 1
        need[ch] -= 1
        if right - left + 1 > len(pattern):
            old = text[left]; left += 1
            if need[old] >= 0: remaining += 1
            need[old] += 1
        if remaining == 0: return True
    return False`]
    ]
  }),
  problem({
    id: "evaluate-reverse-polish-notation", number: 150, title: "逆波兰表达式求值", topic: "栈",
    summary: "根据后缀表达式的令牌序列计算整数结果，除法向零截断。",
    signature: "solve(tokens) → int", starter: "def solve(tokens):\n    # TODO: 写下你的解法\n    pass",
    hints: ["遇到数字入栈，遇到运算符弹出右值再弹出左值。", "Python 的 // 对负数向下取整，不能直接代替向零截断。"],
    tests: [["混合四则运算", [["7", "3", "-", "2", "*", "5", "+"]]], ["负数除法", [["13", "-5", "/", "4", "+"]]]],
    solutions: [
      ["显式运算分支", "栈保存尚未被消费的操作数。", "时间 O(n)，空间 O(n)。", `def solve(tokens):
    stack = []
    for token in tokens:
        if token not in "+-*/": stack.append(int(token)); continue
        right = stack.pop(); left = stack.pop()
        if token == '+': stack.append(left + right)
        elif token == '-': stack.append(left - right)
        elif token == '*': stack.append(left * right)
        else: stack.append(int(left / right))
    return stack[-1]`],
      ["运算函数表", "用函数表收拢运算符分派，仍保持操作数顺序。", "时间 O(n)，空间 O(n)。", `import operator

def solve(tokens):
    operations = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': lambda a, b: int(a / b)}
    stack = []
    for token in tokens:
        if token in operations:
            b, a = stack.pop(), stack.pop()
            stack.append(operations[token](a, b))
        else:
            stack.append(int(token))
    return stack[0]`]
    ]
  }),
  problem({
    id: "car-fleet", number: 853, title: "车队", topic: "栈",
    summary: "多辆车驶向同一终点且不能超车，计算最终抵达终点的车队数量。",
    signature: "solve(target, positions, speeds) → int", starter: "def solve(target, positions, speeds):\n    # TODO: 写下你的解法\n    pass",
    hints: ["按起点从靠近终点到远离终点排序。", "后车抵达时间不大于前队时会并入该队。"],
    tests: [["形成两支车队", [30, [4, 12, 20, 26], [4, 2, 3, 1]]], ["三车各自成队", [25, [3, 8, 13], [6, 5, 4]]]],
    solutions: [
      ["单调抵达时间", "从前往后观察，只有更晚抵达的车辆会形成新车队。", "时间 O(n log n)，空间 O(n)。", `def solve(target, positions, speeds):
    times = []
    for position, speed in sorted(zip(positions, speeds), reverse=True):
        arrival = (target - position) / speed
        if not times or arrival > times[-1]:
            times.append(arrival)
    return len(times)`],
      ["反向最大时间", "用一个最大抵达时间代表前方最后一支车队。", "时间 O(n log n)，空间 O(n)。", `def solve(target, positions, speeds):
    fleets = 0; front_time = -1.0
    cars = sorted(zip(positions, speeds), key=lambda item: -item[0])
    for position, speed in cars:
        arrival = (target - position) / speed
        if arrival > front_time:
            fleets += 1; front_time = arrival
    return fleets`]
    ]
  }),
  problem({
    id: "binary-search", number: 704, title: "二分查找", topic: "二分查找",
    summary: "在严格升序数组中查找目标值的位置，不存在时返回负一。",
    signature: "solve(nums, target) → int", starter: "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    hints: ["明确区间是闭区间还是左闭右开。", "每轮都必须缩小搜索区间。"],
    tests: [["目标在右半区", [[-8, -1, 4, 9, 15, 22], 15]], ["目标落在空隙", [[2, 6, 10, 18], 11]]],
    solutions: [
      ["闭区间模板", "维护两端都可能包含答案的闭区间。", "时间 O(log n)，空间 O(1)。", `def solve(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        if nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`],
      ["左闭右开模板", "维护 [left, right) 并在 left 等于 right 时结束。", "时间 O(log n)，空间 O(1)。", `def solve(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target: left = mid + 1
        else: right = mid
    return left if left < len(nums) and nums[left] == target else -1`]
    ]
  }),
  problem({
    id: "koko-eating-bananas", number: 875, title: "爱吃香蕉的珂珂", topic: "二分查找",
    summary: "给定若干堆和可用小时数，求按整小时处理每堆时能够按时完成的最小速度。",
    signature: "solve(piles, hours) → int", starter: "def solve(piles, hours):\n    # TODO: 写下你的解法\n    pass",
    hints: ["答案位于 1 到最大堆大小之间。", "速度越大，所需时间单调不增。"],
    tests: [["小时数略有余量", [[5, 13, 21, 4], 9]], ["必须采用较高速度", [[18, 7, 25], 4]]],
    solutions: [
      ["答案二分", "二分速度，并用向上取整计算总小时数。", "时间 O(n log m)，空间 O(1)。", `def solve(piles, hours):
    left, right = 1, max(piles)
    while left < right:
        speed = (left + right) // 2
        used = sum((pile + speed - 1) // speed for pile in piles)
        if used <= hours: right = speed
        else: left = speed + 1
    return left`],
      ["库函数定位", "让 bisect 在虚拟速度区间中定位首个可行值。", "时间 O(n log m)，空间 O(1)。", `def solve(piles, hours):
    left, right = 1, max(piles)
    while left <= right:
        speed = (left + right) // 2
        if sum(-(-pile // speed) for pile in piles) <= hours:
            answer = speed; right = speed - 1
        else:
            left = speed + 1
    return answer`]
    ]
  }),
  problem({
    id: "reorder-list", number: 143, title: "重排链表", topic: "链表",
    summary: "把链表按首、尾、次首、次尾的次序重新连接，并返回重排后的值序列。",
    signature: "solve(values) → list", starter: "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    hints: ["先找到中点，再反转后半段。", "最后把前后两段交替合并。"],
    tests: [["奇数长度重排", [[4, 1, 9, 2, 8]]], ["偶数长度重排", [[7, 3, 6, 5, 2, 1]]]],
    solutions: [
      ["中点加反转", "把后半段反转后与前半段交替取节点。", "时间 O(n)，空间 O(1)，输出数组除外。", `def solve(values):
    if len(values) < 3: return values[:]
    mid = (len(values) + 1) // 2
    left, right = values[:mid], values[mid:][::-1]
    result = []
    for i in range(mid):
        result.append(left[i])
        if i < len(right): result.append(right[i])
    return result`],
      ["双端队列", "从双端交替弹出元素，直接模拟目标顺序。", "时间 O(n)，空间 O(n)。", `from collections import deque

def solve(values):
    queue = deque(values); result = []
    take_left = True
    while queue:
        result.append(queue.popleft() if take_left else queue.pop())
        take_left = not take_left
    return result`]
    ]
  }),
  problem({
    id: "same-tree", number: 100, title: "相同的树", topic: "二叉树",
    summary: "根据两棵树的层序表示，判断它们的结构和对应节点值是否完全一致。",
    signature: "solve(first, second) → bool", starter: "def solve(first, second):\n    # TODO: 写下你的解法\n    pass",
    hints: ["节点值相同还不够，空节点位置也必须一致。", "层序数组可以先规范化掉末尾多余的空位。"],
    tests: [["结构和值均一致", [[8, 3, 10, null, 6], [8, 3, 10, null, 6]]], ["值相同但结构不同", [[1, 2], [1, null, 2]]]],
    solutions: [
      ["递归逐节点", "同步构树后，成对递归比较节点。", "时间 O(n)，空间 O(h)。", `from collections import deque

def build(values):
    if not values or values[0] is None: return None
    root = [values[0], None, None]; queue = deque([root]); i = 1
    while queue and i < len(values):
        node = queue.popleft()
        for side in (1, 2):
            if i < len(values) and values[i] is not None:
                node[side] = [values[i], None, None]; queue.append(node[side])
            i += 1
    return root

def solve(first, second):
    def equal(a, b):
        if not a or not b: return a is b
        return a[0] == b[0] and equal(a[1], b[1]) and equal(a[2], b[2])
    return equal(build(first), build(second))`],
      ["同步广度遍历", "队列每次取一对节点，立即检查结构和值。", "时间 O(n)，空间 O(n)。", `from collections import deque

def normalize(values):
    values = list(values)
    while values and values[-1] is None: values.pop()
    return values

def solve(first, second):
    return normalize(first) == normalize(second)`]
    ]
  }),
  problem({
    id: "balanced-binary-tree", number: 110, title: "平衡二叉树", topic: "二叉树",
    summary: "判断二叉树中每个节点的左右子树高度差是否都不超过一。",
    signature: "solve(level) → bool", starter: "def solve(level):\n    # TODO: 写下你的解法\n    pass",
    hints: ["后序遍历可以一边求高度一边检测失衡。", "用特殊值向上层传播失衡状态。"],
    tests: [["多层但保持平衡", [[6, 3, 9, 1, 4, 8, 12, null, 2]]], ["左侧链过深", [[5, 3, null, 2, null, 1]]]],
    solutions: [
      ["后序高度哨兵", "子树失衡时返回负一，避免重复计算高度。", "时间 O(n)，空间 O(h)。", `from collections import deque

def solve(level):
    if not level: return True
    nodes = [None if value is None else [value, None, None] for value in level]
    queue = deque([0]); cursor = 1
    while queue and cursor < len(nodes):
        index = queue.popleft()
        if nodes[index] is None: continue
        for side in (1, 2):
            if cursor < len(nodes):
                nodes[index][side] = nodes[cursor]
                if nodes[cursor] is not None: queue.append(cursor)
                cursor += 1
    def height(node):
        if node is None: return 0
        left = height(node[1]); right = height(node[2])
        if left < 0 or right < 0 or abs(left - right) > 1: return -1
        return max(left, right) + 1
    return height(nodes[0]) >= 0`],
      ["迭代后序", "显式栈按后序计算每个节点的高度。", "时间 O(n)，空间 O(n)。", `def solve(level):
    if not level or level[0] is None: return True
    children = {}; queue = [0]; cursor = 1
    for index in queue:
        pair = []
        for _ in range(2):
            child = cursor if cursor < len(level) and level[cursor] is not None else None
            pair.append(child)
            if child is not None: queue.append(child)
            cursor += 1
        children[index] = pair
        if cursor >= len(level) and len(queue) <= queue.index(index) + 1: break
    heights = {}; stack = [(0, False)]
    while stack:
        node, visited = stack.pop()
        if node is None: continue
        if not visited:
            stack.append((node, True))
            left, right = children.get(node, [None, None])
            stack.extend([(right, False), (left, False)])
        else:
            left, right = children.get(node, [None, None])
            a, b = heights.get(left, 0), heights.get(right, 0)
            if abs(a - b) > 1: return False
            heights[node] = max(a, b) + 1
    return True`]
    ]
  }),
  problem({
    id: "lowest-common-ancestor-of-a-binary-search-tree", number: 235, title: "二叉搜索树的最近公共祖先", topic: "二叉树",
    summary: "在二叉搜索树中，根据两个节点值找到它们的最近公共祖先值。",
    signature: "solve(level, p, q) → value", starter: "def solve(level, p, q):\n    # TODO: 写下你的解法\n    pass",
    hints: ["若两个目标都小于当前值，答案只可能在左侧。", "若目标分居两侧，当前节点就是分叉点。"],
    tests: [["祖先是根节点", [[10, 5, 16, 2, 8, 13, 20], 2, 13]], ["一个节点本身是祖先", [[10, 5, 16, 2, 8, 13, 20], 5, 8]]],
    solutions: [
      ["利用有序性迭代", "沿两目标共同所在方向移动，首次分叉处即答案。", "时间 O(h)，空间 O(n) 用于本地层序适配。", `from collections import deque

def build(level):
    if not level or level[0] is None: return None
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    return root

def solve(level, p, q):
    current = build(level); low, high = sorted((p, q))
    while current:
        if high < current[0]: current = current[1]
        elif low > current[0]: current = current[2]
        else: return current[0]`],
      ["搜索路径交点", "分别记录根到目标的搜索路径，最后一个相同值就是祖先。", "时间 O(h)，空间 O(n) 用于本地层序适配。", `from collections import deque

def solve(level, p, q):
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    def path(target):
        node = root; result = []
        while node:
            result.append(node[0])
            if node[0] == target: return result
            node = node[1] if target < node[0] else node[2]
        return result
    answer = root[0]
    for left, right in zip(path(p), path(q)):
        if left != right: break
        answer = left
    return answer`]
    ]
  }),
  problem({
    id: "subtree-of-another-tree", number: 572, title: "另一棵树的子树", topic: "二叉树",
    summary: "判断候选树是否与主树中某个节点开始的完整子树完全相同。",
    signature: "solve(root_level, sub_level) → bool", starter: "def solve(root_level, sub_level):\n    # TODO: 写下你的解法\n    pass",
    hints: ["先定位值可能相同的根，再比较整棵子树。", "序列化时必须保留空节点标记以区分结构。"],
    tests: [["内部结构完整匹配", [[9, 4, 12, 2, 6, 10, 14], [4, 2, 6]]], ["值出现但子结构不同", [[9, 4, 12, 2, 6, 10, 14, null, 3], [4, 2, 6, null, null, 3]]]],
    solutions: [
      ["逐节点比较", "枚举主树节点，并递归比较候选节点以下的完整结构。", "时间 O(nm)，空间 O(n+m)。", `from collections import deque

def build(level):
    if not level or level[0] is None: return None
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    return root

def solve(root_level, sub_level):
    root, sub = build(root_level), build(sub_level)
    def same(left, right):
        if not left or not right: return left is right
        return left[0] == right[0] and same(left[1], right[1]) and same(left[2], right[2])
    stack = [root]
    while stack:
        node = stack.pop()
        if same(node, sub): return True
        if node: stack.extend([node[1], node[2]])
    return sub is None`],
      ["带空标记序列化", "把结构和值编码为带分隔符的先序文本，再执行包含判断。", "时间 O(n+m)，空间 O(n+m)。", `from collections import deque

def build(level):
    if not level or level[0] is None: return None
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    return root

def encode(node):
    if node is None: return ',#'
    return f',^{node[0]}' + encode(node[1]) + encode(node[2])

def solve(root_level, sub_level):
    return encode(build(sub_level)) in encode(build(root_level))`]
    ]
  }),
  problem({
    id: "serialize-and-deserialize-binary-tree", number: 297, title: "二叉树的序列化与反序列化", topic: "二叉树",
    summary: "设计可逆的树编码；本地练习返回一次编码再解码后的规范层序结果。",
    signature: "solve(level) → normalized level", starter: "def solve(level):\n    # TODO: 写下你的解法\n    pass",
    hints: ["空节点标记是恢复结构的关键。", "解码后移除层序末尾无意义的空位。"],
    tests: [["不完全二叉树往返", [[7, 3, 11, null, 5, 9]]], ["单侧多层往返", [[2, null, 6, 4]]]],
    solutions: [
      ["层序编解码", "用队列保留内部空位，随后按相同顺序恢复左右孩子。", "时间 O(n)，空间 O(n)。", `from collections import deque

def solve(level):
    if not level: return []
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    tokens = []; queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None: tokens.append('#'); continue
        tokens.append(str(node[0])); queue.extend([node[1], node[2]])
    while tokens and tokens[-1] == '#': tokens.pop()
    data = ','.join(tokens)
    raw = data.split(','); rebuilt = [int(raw[0]), None, None]; queue = deque([rebuilt]); index = 1
    while queue and index < len(raw):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(raw) and raw[index] != '#':
                node[side] = [int(raw[index]), None, None]; queue.append(node[side])
            index += 1
    output = []; queue = deque([rebuilt])
    while queue:
        node = queue.popleft()
        if node is None: output.append(None); continue
        output.append(node[0]); queue.extend([node[1], node[2]])
    while output and output[-1] is None: output.pop()
    return output`],
      ["先序编解码", "先序文本为每个空孩子写入标记，解码时按令牌流递归恢复。", "时间 O(n)，空间 O(n)。", `from collections import deque

def solve(level):
    if not level: return []
    root = [level[0], None, None]; queue = deque([root]); index = 1
    while queue and index < len(level):
        node = queue.popleft()
        for side in (1, 2):
            if index < len(level) and level[index] is not None:
                node[side] = [level[index], None, None]; queue.append(node[side])
            index += 1
    tokens = []
    def encode(node):
        if node is None: tokens.append('#'); return
        tokens.append(str(node[0])); encode(node[1]); encode(node[2])
    encode(root); stream = iter(tokens)
    def decode():
        token = next(stream)
        if token == '#': return None
        return [int(token), decode(), decode()]
    rebuilt = decode(); output = []; queue = deque([rebuilt])
    while queue:
        node = queue.popleft()
        if node is None: output.append(None); continue
        output.append(node[0]); queue.extend([node[1], node[2]])
    while output and output[-1] is None: output.pop()
    return output`]
    ]
  }),
  problem({
    id: "task-scheduler", number: 621, title: "任务调度器", topic: "堆",
    summary: "同类任务之间至少间隔 n 个时间单位，计算执行完全部任务所需的最短时间。",
    signature: "solve(tasks, cooldown) → int", starter: "def solve(tasks, cooldown):\n    # TODO: 写下你的解法\n    pass",
    hints: ["频次最高的任务决定骨架长度。", "也可以用最大堆逐周期模拟。"],
    tests: [["两类高频任务", [["A","A","A","B","B","B","C"], 2]], ["冷却时间短", [["X","X","Y","Y","Z","Z","Z"], 1]]],
    solutions: [
      ["频次骨架公式", "最高频任务划分槽位，再让同频任务并列占用最后位置。", "时间 O(n)，空间 O(k)。", `from collections import Counter

def solve(tasks, cooldown):
    counts = Counter(tasks).values(); top = max(counts)
    tied = sum(count == top for count in counts)
    return max(len(tasks), (top - 1) * (cooldown + 1) + tied)`],
      ["最大堆模拟", "每轮取至多 cooldown+1 个最高频任务，未完成的再入堆。", "时间 O(n log k)，空间 O(k)。", `from collections import Counter
import heapq

def solve(tasks, cooldown):
    heap = [-count for count in Counter(tasks).values()]; heapq.heapify(heap)
    time = 0
    while heap:
        used = []
        for _ in range(cooldown + 1):
            if heap:
                count = heapq.heappop(heap) + 1
                if count: used.append(count)
            time += 1
            if not heap and not used: break
        for count in used: heapq.heappush(heap, count)
    return time`]
    ]
  }),
  problem({
    id: "k-closest-points-to-origin", number: 973, title: "最接近原点的 K 个点", topic: "堆",
    summary: "按欧氏距离选出距离原点最近的 k 个点，并按距离与坐标稳定排序返回。",
    signature: "solve(points, k) → points", starter: "def solve(points, k):\n    # TODO: 写下你的解法\n    pass",
    hints: ["比较平方距离即可，不必开方。", "只保留 k 个候选时可使用最大堆。"],
    tests: [["不同象限的点", [[[4,1],[-2,2],[1,-1],[7,0]], 2]], ["包含原点", [[[3,3],[0,0],[-1,4],[2,-2]], 3]]],
    solutions: [
      ["整体排序", "按平方距离和坐标排序后截取前 k 项。", "时间 O(n log n)，空间 O(n)。", `def solve(points, k):
    return sorted(points, key=lambda point: (point[0] ** 2 + point[1] ** 2, point[0], point[1]))[:k]`],
      ["小顶堆选取", "把距离与坐标作为堆键，弹出 k 次。", "时间 O(n+k log n)，空间 O(n)。", `import heapq

def solve(points, k):
    heap = [(x*x + y*y, x, y) for x, y in points]
    heapq.heapify(heap)
    return [[x, y] for _, x, y in (heapq.heappop(heap) for _ in range(k))]`]
    ]
  }),
  problem({
    id: "last-stone-weight", number: 1046, title: "最后一块石头的重量", topic: "堆",
    summary: "反复取出最重的两块并抵消，返回最终剩余重量，没有剩余则返回零。",
    signature: "solve(weights) → int", starter: "def solve(weights):\n    # TODO: 写下你的解法\n    pass",
    hints: ["Python 只有小顶堆，可存负重量模拟最大堆。", "两块相等时无需放回。"],
    tests: [["多轮抵消", [[11, 6, 4, 9, 2]]], ["最终完全抵消", [[8, 3, 8, 3]]]],
    solutions: [
      ["负数最大堆", "每轮弹出两个最小负数，差值仍以负数放回。", "时间 O(n log n)，空间 O(n)。", `import heapq

def solve(weights):
    heap = [-weight for weight in weights]; heapq.heapify(heap)
    while len(heap) > 1:
        first = -heapq.heappop(heap); second = -heapq.heappop(heap)
        if first != second: heapq.heappush(heap, -(first - second))
    return -heap[0] if heap else 0`],
      ["重复排序基线", "每轮排序后取出最大的两个重量。", "时间 O(n² log n)，空间 O(n)。", `def solve(weights):
    stones = list(weights)
    while len(stones) > 1:
        stones.sort()
        first, second = stones.pop(), stones.pop()
        if first != second: stones.append(first - second)
    return stones[0] if stones else 0`]
    ]
  }),
  problem({
    id: "combination-sum-ii", number: 40, title: "组合总和 II", topic: "回溯",
    summary: "每个候选数最多使用一次，找出和为目标值的不重复组合。",
    signature: "solve(candidates, target) → combinations", starter: "def solve(candidates, target):\n    # TODO: 写下你的解法\n    pass",
    hints: ["排序后，同一层遇到相同值要跳过。", "递归下一层从 index + 1 开始。"],
    tests: [["含多个重复候选", [[2,5,2,1,2,6,7], 8]], ["不同长度的组合", [[3,1,3,5,1,6], 7]]], compare: "outerUnordered",
    solutions: [
      ["排序回溯去重", "同层只选择相同值的第一次出现，避免重复组合。", "时间 O(2^n)，空间 O(n)。", `def solve(candidates, target):
    values = sorted(candidates); result = []
    def search(start, remain, path):
        if remain == 0: result.append(path[:]); return
        for index in range(start, len(values)):
            if index > start and values[index] == values[index - 1]: continue
            if values[index] > remain: break
            path.append(values[index]); search(index + 1, remain - values[index], path); path.pop()
    search(0, target, [])
    return result`],
      ["频次选择", "按不同数值及其数量，枚举每个值取零到若干次。", "时间 O(∏(count+1))，空间 O(n)。", `from collections import Counter

def solve(candidates, target):
    items = sorted(Counter(candidates).items()); result = []
    def search(index, remain, path):
        if remain == 0: result.append(path[:]); return
        if index == len(items): return
        value, count = items[index]
        for used in range(min(count, remain // value) + 1):
            search(index + 1, remain - used * value, path + [value] * used)
    search(0, target, [])
    return result`]
    ]
  }),
  problem({
    id: "subsets-ii", number: 90, title: "子集 II", topic: "回溯",
    summary: "给定可能含重复值的数组，返回所有互不重复的子集。",
    signature: "solve(nums) → subsets", starter: "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    hints: ["先排序，让重复值相邻。", "只跳过同一递归层中重复的选择。"],
    tests: [["两个值重复", [[4,1,4]]], ["三次重复", [[2,2,2,5]]]], compare: "outerUnordered",
    solutions: [
      ["排序回溯", "每到一个状态先记录当前路径，再从后续候选扩展。", "时间 O(2^n)，空间 O(n)。", `def solve(nums):
    nums.sort(); result = []
    def search(start, path):
        result.append(path[:])
        for index in range(start, len(nums)):
            if index > start and nums[index] == nums[index - 1]: continue
            path.append(nums[index]); search(index + 1, path); path.pop()
    search(0, [])
    return result`],
      ["按频次展开", "对每种不同值选择使用零到 count 次。", "时间 O(2^n)，空间 O(n)。", `from collections import Counter

def solve(nums):
    result = [[]]
    for value, count in sorted(Counter(nums).items()):
        result = [base + [value] * used for base in result for used in range(count + 1)]
    return result`]
    ]
  }),
  problem({
    id: "design-add-and-search-words-data-structure", number: 211, title: "添加与搜索单词", topic: "图论",
    summary: "实现支持添加单词和点号通配符查询的字典，返回每次查询结果。",
    signature: "solve(operations) → bool results", starter: "def solve(operations):\n    # operations: [[\"add\", word], [\"search\", pattern], ...]\n    pass",
    hints: ["普通字符沿 Trie 的单一路径前进。", "点号需要尝试当前节点的所有孩子。"],
    tests: [["通配符命中", [[ ["add","code"],["add","cope"],["search","co.e"],["search","c..e"] ]]], ["长度与字符均受约束", [[ ["add","sun"],["add","sand"],["search","s.."],["search","..n."],["search","s.n"] ]]]],
    solutions: [
      ["Trie 加 DFS", "添加沿 Trie 建路径，查询遇到点号时分支搜索。", "添加 O(m)，查询最坏 O(Σ^m)。", `def solve(operations):
    root = {}; output = []
    def search(pattern):
        def dfs(index, node):
            if index == len(pattern): return '' in node
            ch = pattern[index]
            if ch == '.': return any(dfs(index + 1, child) for key, child in node.items() if key)
            return ch in node and dfs(index + 1, node[ch])
        return dfs(0, root)
    for action, word in operations:
        if action == 'add':
            node = root
            for ch in word: node = node.setdefault(ch, {})
            node[''] = {}
        else: output.append(search(word))
    return output`],
      ["按长度分桶", "先按长度保存单词，查询时逐位匹配普通字符。", "添加 O(1)，查询 O(nm)。", `from collections import defaultdict

def solve(operations):
    buckets = defaultdict(set); output = []
    for action, word in operations:
        if action == 'add': buckets[len(word)].add(word)
        else:
            output.append(any(all(p == '.' or p == ch for p, ch in zip(word, candidate)) for candidate in buckets[len(word)]))
    return output`]
    ]
  }),
  problem({
    id: "word-search-ii", number: 212, title: "单词搜索 II", topic: "图搜索",
    summary: "在字符网格中找出可以由相邻格连续组成的候选单词，每格在同一单词中最多使用一次。",
    signature: "solve(board, words) → found words", starter: "def solve(board, words):\n    # TODO: 写下你的解法\n    pass",
    hints: ["把全部单词放入 Trie，共享前缀搜索。", "找到单词后可从 Trie 删除终止标记，避免重复输出。"],
    tests: [["共享前缀的候选", [["abcd","efgh","ijkl"], ["abc","aei","bfj","cfi","ghl"]]], ["路径不可重复用格", [["ax","ya"], ["aya","axy","ayx","aa"]]]], compare: "unordered",
    solutions: [
      ["Trie 剪枝 DFS", "从每格沿 Trie 前缀推进，无前缀时立即回退。", "时间 O(mn·4^L)，空间 O(总字符数)。", `def solve(board, words):
    board = [list(row) for row in board]
    root = {}
    for word in words:
        node = root
        for ch in word: node = node.setdefault(ch, {})
        node['$'] = word
    rows, cols = len(board), len(board[0]); found = []
    def dfs(r, c, node):
        ch = board[r][c]
        if ch not in node: return
        child = node[ch]
        word = child.pop('$', None)
        if word: found.append(word)
        board[r][c] = '#'
        for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#': dfs(nr, nc, child)
        board[r][c] = ch
    for r in range(rows):
        for c in range(cols): dfs(r, c, root)
    return found`],
      ["逐词回溯", "为每个候选单词单独执行一次网格路径搜索。", "时间 O(wmn·4^L)，空间 O(L)。", `def solve(board, words):
    board = [list(row) for row in board]
    rows, cols = len(board), len(board[0])
    def exists(word):
        def dfs(r, c, index):
            if index == len(word): return True
            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[index]: return False
            ch = board[r][c]; board[r][c] = '#'
            found = any(dfs(nr, nc, index + 1) for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)))
            board[r][c] = ch
            return found
        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))
    return [word for word in words if exists(word)]`]
    ]
  }),
  problem({
    id: "word-ladder", number: 127, title: "单词接龙", topic: "图搜索",
    summary: "每次只改一个字符且中间词必须在字典中，求从起点到终点的最短序列长度。",
    signature: "solve(begin, end, words) → int", starter: "def solve(begin, end, words):\n    # TODO: 写下你的解法\n    pass",
    hints: ["最短转换次数适合广度优先搜索。", "通配模式可以把只差一个字符的单词连在一起。"],
    tests: [["存在两条可选路径", ["cold","warm",["cord","card","ward","warm","word","wold"]]], ["终点存在但不可达", ["aaa","bbb",["aac","acc","bbb","bbc"]]]],
    solutions: [
      ["通配桶 BFS", "为每个单词建立替换一位后的模式桶，再逐层扩展。", "时间 O(nL²)，空间 O(nL)。", `from collections import defaultdict, deque

def solve(begin, end, words):
    if end not in words: return 0
    buckets = defaultdict(list)
    for word in set(words + [begin]):
        for i in range(len(word)): buckets[word[:i] + '*' + word[i+1:]].append(word)
    queue = deque([(begin, 1)]); seen = {begin}
    while queue:
        word, distance = queue.popleft()
        if word == end: return distance
        for i in range(len(word)):
            key = word[:i] + '*' + word[i+1:]
            for nxt in buckets[key]:
                if nxt not in seen: seen.add(nxt); queue.append((nxt, distance + 1))
            buckets[key] = []
    return 0`],
      ["双向 BFS", "从起点与终点同时扩展较小的一侧，减少搜索宽度。", "时间 O(nL·Σ)，空间 O(n)。", `def solve(begin, end, words):
    unused = set(words)
    if end not in unused: return 0
    front, back, distance = {begin}, {end}, 1
    while front and back:
        if len(front) > len(back): front, back = back, front
        upcoming = set()
        for word in front:
            for i in range(len(word)):
                for ch in 'abcdefghijklmnopqrstuvwxyz':
                    candidate = word[:i] + ch + word[i+1:]
                    if candidate in back: return distance + 1
                    if candidate in unused: unused.remove(candidate); upcoming.add(candidate)
        front = upcoming; distance += 1
    return 0`]
    ]
  }),
  problem({
    id: "surrounded-regions", number: 130, title: "被围绕的区域", topic: "图搜索",
    summary: "把没有连接到边界的 O 区域改为 X，并返回更新后的棋盘。",
    signature: "solve(board) → board", starter: "def solve(board):\n    # TODO: 写下你的解法\n    pass",
    hints: ["从边界 O 反向标记所有不可填充的格子。", "最后只翻转没有被边界搜索触达的 O。"],
    tests: [
      ["内部区域与边界区域并存", [[
        ["X","X","X","X","O"],["X","O","O","X","O"],["X","X","O","X","X"],["O","X","X","X","X"]
      ]]],
      ["通道连接到边界", [[
        ["X","O","X"],["X","O","X"],["X","O","O"]
      ]]]
    ],
    solutions: [
      ["边界洪水填充", "先把边界连通 O 标成安全，再处理剩余 O。", "时间 O(mn)，空间 O(mn)。", `from collections import deque

def solve(board):
    grid = [list(row) for row in board]; rows, cols = len(grid), len(grid[0]); queue = deque()
    for r in range(rows):
        for c in range(cols):
            if (r in (0, rows-1) or c in (0, cols-1)) and grid[r][c] == 'O':
                grid[r][c] = 'S'; queue.append((r,c))
    while queue:
        r, c = queue.popleft()
        for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 'O':
                grid[nr][nc] = 'S'; queue.append((nr,nc))
    return [''.join('O' if ch == 'S' else 'X' for ch in row) for row in grid]`],
      ["区域收集", "逐个收集 O 连通块，只有不接触边界的区域才翻转。", "时间 O(mn)，空间 O(mn)。", `def solve(board):
    grid = [list(row) for row in board]; rows, cols = len(grid), len(grid[0]); seen = set()
    for sr in range(rows):
        for sc in range(cols):
            if grid[sr][sc] != 'O' or (sr, sc) in seen: continue
            stack = [(sr, sc)]; region = []; touches = False; seen.add((sr, sc))
            while stack:
                r, c = stack.pop(); region.append((r,c)); touches |= r in (0,rows-1) or c in (0,cols-1)
                for nr,nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 'O' and (nr,nc) not in seen:
                        seen.add((nr,nc)); stack.append((nr,nc))
            if not touches:
                for r,c in region: grid[r][c] = 'X'
    return [''.join(row) for row in grid]`]
    ]
  }),
  problem({
    id: "clone-graph", number: 133, title: "克隆图", topic: "图论",
    summary: "输入无向图的邻接表，创建独立副本并返回副本的邻接表表示。",
    signature: "solve(adjacency) → adjacency", starter: "def solve(adjacency):\n    # TODO: 写下你的解法\n    pass",
    hints: ["用原节点到新节点的映射避免重复创建。", "遍历方式可以是 DFS 或 BFS。"],
    tests: [["含环与对角连接", [[[2,3],[1,3,4],[1,2,4],[2,3]]]], ["单节点图", [[[]]]]],
    solutions: [
      ["DFS 映射克隆", "递归访问节点并缓存其副本，随后填充邻接关系。", "时间 O(V+E)，空间 O(V)。", `def solve(adjacency):
    cloned = {}
    def clone(node):
        if node in cloned: return
        cloned[node] = []
        for neighbor in adjacency[node - 1]:
            clone(neighbor); cloned[node].append(neighbor)
    if adjacency: clone(1)
    return [cloned.get(node, []) for node in range(1, len(adjacency) + 1)]`],
      ["BFS 重建邻接", "广度遍历可达节点，并复制每条邻接边。", "时间 O(V+E)，空间 O(V)。", `from collections import deque

def solve(adjacency):
    if not adjacency: return []
    result = [[] for _ in adjacency]; queue = deque([1]); seen = {1}
    while queue:
        node = queue.popleft()
        result[node - 1] = list(adjacency[node - 1])
        for neighbor in adjacency[node - 1]:
            if neighbor not in seen: seen.add(neighbor); queue.append(neighbor)
    return result`]
    ]
  }),
  problem({
    id: "course-schedule-ii", number: 210, title: "课程表 II", topic: "图论",
    summary: "根据课程先修关系返回任意合法学习顺序；存在环时返回空列表。",
    signature: "solve(count, prerequisites) → order", starter: "def solve(count, prerequisites):\n    # TODO: 写下你的解法\n    pass",
    hints: ["入度为零的课程可以立即学习。", "输出课程数不足说明图中存在环。"],
    tests: [["存在多个合法顺序", [5, [[1,0],[2,0],[3,1],[3,2],[4,2]]]], ["环导致无解", [4, [[1,0],[2,1],[0,2],[3,2]]]]], compare: "topologicalOrder",
    solutions: [
      ["Kahn 拓扑排序", "不断取出入度为零的课程并删除其出边。", "时间 O(V+E)，空间 O(V+E)。", `from collections import deque

def solve(count, prerequisites):
    graph = [[] for _ in range(count)]; indegree = [0] * count
    for course, before in prerequisites: graph[before].append(course); indegree[course] += 1
    queue = deque(i for i, degree in enumerate(indegree) if degree == 0); order = []
    while queue:
        node = queue.popleft(); order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0: queue.append(nxt)
    return order if len(order) == count else []`],
      ["DFS 三色标记", "后序加入已完成节点，遇到灰色节点说明有环。", "时间 O(V+E)，空间 O(V+E)。", `def solve(count, prerequisites):
    graph = [[] for _ in range(count)]
    for course, before in prerequisites: graph[course].append(before)
    state = [0] * count; order = []
    def visit(node):
        if state[node] == 1: return False
        if state[node] == 2: return True
        state[node] = 1
        if not all(visit(before) for before in graph[node]): return False
        state[node] = 2; order.append(node); return True
    return order if all(visit(node) for node in range(count)) else []`]
    ]
  }),
  problem({
    id: "pacific-atlantic-water-flow", number: 417, title: "太平洋大西洋水流问题", topic: "图搜索",
    summary: "在高度网格中找出雨水能够分别流向两组相对边界的所有格子。",
    signature: "solve(heights) → coordinates", starter: "def solve(heights):\n    # TODO: 写下你的解法\n    pass",
    hints: ["从海岸反向搜索，只走向不低于当前位置的格子。", "两次搜索可达集合的交集就是答案。"],
    tests: [
      ["阶梯高度网格", [[[1,2,3],[2,3,4],[1,5,2]]]],
      ["单行网格", [[[5,1,4,2]]]]
    ],
    compare: "outerUnordered",
    solutions: [
      ["双海岸反向 DFS", "分别从两组边界沿高度不下降方向标记可达格。", "时间 O(mn)，空间 O(mn)。", `def solve(heights):
    rows, cols = len(heights), len(heights[0])
    def reach(starts):
        seen = set(starts); stack = list(starts)
        while stack:
            r, c = stack.pop()
            for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):
                if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and heights[nr][nc] >= heights[r][c]:
                    seen.add((nr,nc)); stack.append((nr,nc))
        return seen
    pacific = reach([(0,c) for c in range(cols)] + [(r,0) for r in range(rows)])
    atlantic = reach([(rows-1,c) for c in range(cols)] + [(r,cols-1) for r in range(rows)])
    return [list(cell) for cell in pacific & atlantic]`],
      ["双海岸反向 BFS", "用队列完成同样的反向可达性传播。", "时间 O(mn)，空间 O(mn)。", `from collections import deque

def solve(heights):
    rows, cols = len(heights), len(heights[0])
    def flood(starts):
        seen = set(starts); queue = deque(starts)
        while queue:
            r,c = queue.popleft()
            for nr,nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):
                if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and heights[nr][nc] >= heights[r][c]:
                    seen.add((nr,nc)); queue.append((nr,nc))
        return seen
    first = flood([(r,0) for r in range(rows)] + [(0,c) for c in range(cols)])
    second = flood([(r,cols-1) for r in range(rows)] + [(rows-1,c) for c in range(cols)])
    return [list(cell) for cell in first & second]`]
    ]
  }),
  problem({
    id: "redundant-connection", number: 684, title: "冗余连接", topic: "图论",
    summary: "一棵树额外加入一条边后形成环，找出输入中最后一条导致环的边。",
    signature: "solve(edges) → edge", starter: "def solve(edges):\n    # TODO: 写下你的解法\n    pass",
    hints: ["按输入顺序逐条合并两个端点。", "若端点已经连通，当前边就是冗余边。"],
    tests: [["环在图的后半段形成", [[[1,2],[2,3],[3,4],[1,4],[4,5]]]], ["多条路径最终闭环", [[[1,2],[1,3],[3,4],[2,4],[4,5]]]]],
    solutions: [
      ["并查集", "边的两个端点已经属于同一集合时，再连接就会成环。", "时间近似 O(n)，空间 O(n)。", `def solve(edges):
    parent = list(range(len(edges) + 1)); size = [1] * len(parent)
    def find(node):
        while node != parent[node]:
            parent[node] = parent[parent[node]]; node = parent[node]
        return node
    for left, right in edges:
        a, b = find(left), find(right)
        if a == b: return [left, right]
        if size[a] < size[b]: a, b = b, a
        parent[b] = a; size[a] += size[b]
    return []`],
      ["增量 DFS", "加入边前先检查两个端点在已有图中是否可达。", "时间 O(n²)，空间 O(n)。", `from collections import defaultdict

def solve(edges):
    graph = defaultdict(list)
    def connected(start, target):
        stack = [start]; seen = set()
        while stack:
            node = stack.pop()
            if node == target: return True
            if node in seen: continue
            seen.add(node); stack.extend(graph[node])
        return False
    for left, right in edges:
        if graph[left] and graph[right] and connected(left, right): return [left, right]
        graph[left].append(right); graph[right].append(left)
    return []`]
    ]
  }),
  problem({
    id: "max-area-of-island", number: 695, title: "岛屿的最大面积", topic: "图搜索",
    summary: "在零一网格中计算由上下左右相邻陆地构成的最大连通块面积。",
    signature: "solve(grid) → int", starter: "def solve(grid):\n    # TODO: 写下你的解法\n    pass",
    hints: ["每个陆地格只应访问一次。", "一次洪水填充的访问数就是当前岛屿面积。"],
    tests: [["三座不同面积岛屿", [[[1,1,0,0,1],[1,0,0,1,1],[0,0,1,1,0],[1,0,0,0,0]]]], ["没有陆地", [[[0,0],[0,0],[0,0]]]]],
    solutions: [
      ["迭代 DFS", "遇到未访问陆地就用栈收集整个连通块。", "时间 O(mn)，空间 O(mn)。", `def solve(grid):
    rows, cols = len(grid), len(grid[0]); seen = set(); best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != 1 or (r,c) in seen: continue
            stack = [(r,c)]; seen.add((r,c)); area = 0
            while stack:
                x,y = stack.pop(); area += 1
                for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
                    if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == 1 and (nx,ny) not in seen:
                        seen.add((nx,ny)); stack.append((nx,ny))
            best = max(best, area)
    return best`],
      ["原地 BFS", "复制网格后把访问过的陆地改为零，并累计面积。", "时间 O(mn)，空间 O(mn)。", `from collections import deque

def solve(grid):
    grid = [row[:] for row in grid]; rows, cols = len(grid), len(grid[0]); best = 0
    for r in range(rows):
        for c in range(cols):
            if not grid[r][c]: continue
            queue = deque([(r,c)]); grid[r][c] = 0; area = 0
            while queue:
                x,y = queue.popleft(); area += 1
                for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
                    if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny]:
                        grid[nx][ny] = 0; queue.append((nx,ny))
            best = max(best, area)
    return best`]
    ]
  }),
  problem({
    id: "reconstruct-itinerary", number: 332, title: "重新安排行程", topic: "图论",
    summary: "使用全部机票各一次，从 JFK 出发构造字典序最小的有效行程。",
    signature: "solve(tickets) → route", starter: "def solve(tickets):\n    # TODO: 写下你的解法\n    pass",
    hints: ["这是寻找欧拉路径，而不是普通最短路。", "后序加入机场，最后再反转结果。"],
    tests: [["含可回退分支", [[ ["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"] ]]], ["字典序选择影响可行性", [[ ["JFK","KUL"],["JFK","NRT"],["NRT","JFK"] ]]]],
    solutions: [
      ["Hierholzer 后序", "每次走字典序最小的未用边，走尽后把机场加入路径。", "时间 O(E log E)，空间 O(E)。", `from collections import defaultdict

def solve(tickets):
    graph = defaultdict(list)
    for start, end in sorted(tickets, reverse=True): graph[start].append(end)
    route = []
    def visit(airport):
        while graph[airport]: visit(graph[airport].pop())
        route.append(airport)
    visit('JFK')
    return route[::-1]`],
      ["迭代欧拉路径", "用显式栈走尽出边，再把无路可走的顶点弹入结果。", "时间 O(E log E)，空间 O(E)。", `from collections import defaultdict
import heapq

def solve(tickets):
    graph = defaultdict(list)
    for start, end in tickets: heapq.heappush(graph[start], end)
    stack = ['JFK']; route = []
    while stack:
        while graph[stack[-1]]: stack.append(heapq.heappop(graph[stack[-1]]))
        route.append(stack.pop())
    return route[::-1]`]
    ]
  }),
  problem({
    id: "network-delay-time", number: 743, title: "网络延迟时间", topic: "图论",
    summary: "在带正权的有向网络中，计算信号从起点到达全部节点所需的最短总等待时间。",
    signature: "solve(times, count, start) → int", starter: "def solve(times, count, start):\n    # TODO: 写下你的解法\n    pass",
    hints: ["目标是起点到每个节点的最短距离。", "所有边权为正，适合 Dijkstra。"],
    tests: [["存在绕行更短路径", [[[1,2,7],[1,3,2],[3,2,1],[2,4,3],[3,4,8]],4,1]], ["有节点不可达", [[[2,1,4],[2,3,5]],4,2]]],
    solutions: [
      ["Dijkstra 小顶堆", "每次确定当前距离最短的未访问节点。", "时间 O((V+E) log V)，空间 O(V+E)。", `from collections import defaultdict
import heapq

def solve(times, count, start):
    graph = defaultdict(list)
    for left, right, weight in times: graph[left].append((weight, right))
    heap = [(0, start)]; distance = {}
    while heap:
        cost, node = heapq.heappop(heap)
        if node in distance: continue
        distance[node] = cost
        for weight, nxt in graph[node]:
            if nxt not in distance: heapq.heappush(heap, (cost + weight, nxt))
    return max(distance.values()) if len(distance) == count else -1`],
      ["Bellman-Ford 松弛", "重复松弛全部边，直到没有距离更新。", "时间 O(VE)，空间 O(V)。", `def solve(times, count, start):
    inf = float('inf'); dist = [inf] * (count + 1); dist[start] = 0
    for _ in range(count - 1):
        changed = False
        for left, right, weight in times:
            if dist[left] + weight < dist[right]:
                dist[right] = dist[left] + weight; changed = True
        if not changed: break
    answer = max(dist[1:])
    return -1 if answer == inf else answer`]
    ]
  }),
  problem({
    id: "cheapest-flights-within-k-stops", number: 787, title: "K 站中转内最便宜的航班", topic: "图论",
    summary: "在最多经过 k 个中转点的限制下，计算起点到终点的最低价格。",
    signature: "solve(count, flights, source, target, k) → int", starter: "def solve(count, flights, source, target, k):\n    # TODO: 写下你的解法\n    pass",
    hints: ["中转点限制等价于最多使用 k+1 条边。", "每轮松弛必须基于上一轮距离的副本。"],
    tests: [["较便宜路径多一次中转", [5,[[0,1,80],[1,2,70],[2,4,60],[0,3,210],[3,4,40]],0,4,2]], ["中转限制迫使直飞", [4,[[0,1,40],[1,2,40],[2,3,40],[0,3,180]],0,3,1]]],
    solutions: [
      ["限轮 Bellman-Ford", "进行 k+1 轮边松弛，每轮只读取上一轮结果。", "时间 O(kE)，空间 O(V)。", `def solve(count, flights, source, target, k):
    inf = float('inf'); prices = [inf] * count; prices[source] = 0
    for _ in range(k + 1):
        updated = prices[:]
        for start, end, price in flights:
            if prices[start] != inf: updated[end] = min(updated[end], prices[start] + price)
        prices = updated
    return -1 if prices[target] == inf else prices[target]`],
      ["状态小顶堆", "堆状态同时记录价格、节点和已经使用的边数。", "时间 O(Ek log Vk)，空间 O(Vk)。", `from collections import defaultdict
import heapq

def solve(count, flights, source, target, k):
    graph = defaultdict(list)
    for start,end,price in flights: graph[start].append((end,price))
    heap = [(0,source,0)]; best = {}
    while heap:
        cost,node,edges = heapq.heappop(heap)
        if node == target: return cost
        if edges == k + 1 or best.get((node,edges), float('inf')) < cost: continue
        for nxt,price in graph[node]:
            state = (nxt,edges+1); total = cost + price
            if total < best.get(state,float('inf')):
                best[state] = total; heapq.heappush(heap,(total,nxt,edges+1))
    return -1`]
    ]
  }),
  problem({
    id: "min-cost-to-connect-all-points", number: 1584, title: "连接所有点的最小费用", topic: "图论",
    summary: "用曼哈顿距离作为连边成本，求把所有平面点连通的最小总费用。",
    signature: "solve(points) → int", starter: "def solve(points):\n    # TODO: 写下你的解法\n    pass",
    hints: ["问题等价于完全图的最小生成树。", "点数不大时可以直接计算候选距离。"],
    tests: [["分散的五个点", [[[1,1],[4,2],[7,6],[2,8],[9,3]]]], ["包含负坐标", [[[-3,1],[0,0],[2,-4],[5,2]]]]],
    solutions: [
      ["Prim 稠密图", "维护每个未连接点到当前生成树的最小距离。", "时间 O(n²)，空间 O(n)。", `def solve(points):
    count = len(points); distance = [float('inf')] * count; distance[0] = 0; used = [False] * count; total = 0
    for _ in range(count):
        node = min((i for i in range(count) if not used[i]), key=lambda i: distance[i])
        used[node] = True; total += distance[node]
        x,y = points[node]
        for nxt,(a,b) in enumerate(points):
            if not used[nxt]: distance[nxt] = min(distance[nxt], abs(x-a)+abs(y-b))
    return total`],
      ["Kruskal 并查集", "生成全部边后按成本从小到大合并连通块。", "时间 O(n² log n)，空间 O(n²)。", `def solve(points):
    edges = []
    for i,(x,y) in enumerate(points):
        for j in range(i):
            a,b = points[j]; edges.append((abs(x-a)+abs(y-b),i,j))
    parent = list(range(len(points)))
    def find(node):
        while node != parent[node]: parent[node] = parent[parent[node]]; node = parent[node]
        return node
    total = used = 0
    for cost,left,right in sorted(edges):
        a,b = find(left),find(right)
        if a == b: continue
        parent[b] = a; total += cost; used += 1
        if used == len(points)-1: break
    return total`]
    ]
  }),
  problem({
    id: "decode-ways", number: 91, title: "解码方法", topic: "动态规划",
    summary: "数字字符串按一到二十六映射为字母，计算所有合法拆分方式数量。",
    signature: "solve(digits) → int", starter: "def solve(digits):\n    # TODO: 写下你的解法\n    pass",
    hints: ["零不能单独解码。", "当前位置可由合法的一位或两位编码转移而来。"],
    tests: [["包含零的合法编码", ["21023"]], ["前导零无解", ["0712"]]],
    solutions: [
      ["滚动动态规划", "只保留前一位和前两位对应的方案数。", "时间 O(n)，空间 O(1)。", `def solve(digits):
    if not digits or digits[0] == '0': return 0
    previous_two, previous = 1, 1
    for i in range(1, len(digits)):
        current = previous if digits[i] != '0' else 0
        if 10 <= int(digits[i-1:i+1]) <= 26: current += previous_two
        previous_two, previous = previous, current
    return previous`],
      ["记忆化递归", "从索引出发尝试合法的一位和两位编码。", "时间 O(n)，空间 O(n)。", `from functools import lru_cache

def solve(digits):
    @lru_cache(None)
    def count(index):
        if index == len(digits): return 1
        if digits[index] == '0': return 0
        result = count(index + 1)
        if index + 1 < len(digits) and int(digits[index:index+2]) <= 26: result += count(index + 2)
        return result
    return count(0)`]
    ]
  }),
  problem({
    id: "interleaving-string", number: 97, title: "交错字符串", topic: "多维动态规划",
    summary: "判断目标字符串是否能由两个源字符串各自保持相对顺序地交错组成。",
    signature: "solve(first, second, target) → bool", starter: "def solve(first, second, target):\n    # TODO: 写下你的解法\n    pass",
    hints: ["长度之和不匹配时立即返回。", "状态 (i,j) 对应目标串位置 i+j。"],
    tests: [["多种交错路径", ["abca","xy","axbyca"]], ["字符数量够但顺序不合法", ["aab","aac","abacaa"]]],
    solutions: [
      ["一维动态规划", "dp[j] 表示前 i 个第一串字符与前 j 个第二串字符能否组成目标前缀。", "时间 O(mn)，空间 O(n)。", `def solve(first, second, target):
    if len(first) + len(second) != len(target): return False
    dp = [False] * (len(second) + 1); dp[0] = True
    for i in range(len(first) + 1):
        for j in range(len(second) + 1):
            if i == j == 0: continue
            position = i + j - 1
            dp[j] = (i > 0 and dp[j] and first[i-1] == target[position]) or (j > 0 and dp[j-1] and second[j-1] == target[position])
    return dp[-1]`],
      ["记忆化搜索", "在两个源字符串的索引网格中只搜索可匹配的分支。", "时间 O(mn)，空间 O(mn)。", `from functools import lru_cache

def solve(first, second, target):
    if len(first) + len(second) != len(target): return False
    @lru_cache(None)
    def visit(i, j):
        position = i + j
        if position == len(target): return True
        return (i < len(first) and first[i] == target[position] and visit(i+1,j)) or (j < len(second) and second[j] == target[position] and visit(i,j+1))
    return visit(0,0)`]
    ]
  }),
  problem({
    id: "house-robber-ii", number: 213, title: "打家劫舍 II", topic: "动态规划",
    summary: "房屋围成一圈且不能选择相邻房屋，求可以取得的最大金额。",
    signature: "solve(values) → int", starter: "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    hints: ["首尾不能同时选择。", "分别求不含首项与不含尾项的线性答案。"],
    tests: [["最优解避开首项", [[8,2,9,3,7]]], ["只有两间房", [[12,5]]]],
    solutions: [
      ["拆成两条线", "环形约束转为排除首项或排除尾项的两个线性问题。", "时间 O(n)，空间 O(1)。", `def solve(values):
    if len(values) == 1: return values[0]
    def linear(items):
        skip = take = 0
        for value in items: skip, take = max(skip,take), skip + value
        return max(skip,take)
    return max(linear(values[:-1]), linear(values[1:]))`],
      ["两组滚动状态", "同时推进两种排除边界的动态规划。", "时间 O(n)，空间 O(n)。", `def solve(values):
    if len(values) <= 2: return max(values, default=0)
    def best(start, end):
        dp = [0, values[start]]
        for index in range(start + 1, end): dp.append(max(dp[-1], dp[-2] + values[index]))
        return dp[-1]
    return max(best(0,len(values)-1), best(1,len(values)))`]
    ]
  }),
  problem({
    id: "best-time-to-buy-and-sell-stock-with-cooldown", number: 309, title: "最佳买卖股票时机含冷冻期", topic: "动态规划",
    summary: "可以多次交易但卖出后隔一天才能再次买入，求最大利润。",
    signature: "solve(prices) → int", starter: "def solve(prices):\n    # TODO: 写下你的解法\n    pass",
    hints: ["每天结束时区分持有、刚卖出和空闲状态。", "买入只能从前一天的空闲状态转移。"],
    tests: [["多段波动", [[3,1,5,2,6,4,9]]], ["持续下跌", [[9,7,5,3,1]]]],
    solutions: [
      ["三状态滚动", "持有、卖出、空闲三个状态每天同步更新。", "时间 O(n)，空间 O(1)。", `def solve(prices):
    if not prices: return 0
    hold, sold, rest = -prices[0], 0, 0
    for price in prices[1:]:
        hold, sold, rest = max(hold, rest - price), hold + price, max(rest, sold)
    return max(sold, rest)`],
      ["索引动态规划", "记录到每天为止持股与不持股的最优利润，并从前两天买入。", "时间 O(n)，空间 O(n)。", `def solve(prices):
    if not prices: return 0
    cash = [0] * len(prices); hold = [0] * len(prices); hold[0] = -prices[0]
    for day in range(1, len(prices)):
        cash[day] = max(cash[day-1], hold[day-1] + prices[day])
        base = cash[day-2] if day >= 2 else 0
        hold[day] = max(hold[day-1], base - prices[day])
    return cash[-1]`]
    ]
  }),
  problem({
    id: "target-sum", number: 494, title: "目标和", topic: "动态规划",
    summary: "给每个非负整数添加正号或负号，计算表达式结果等于目标值的方案数。",
    signature: "solve(nums, target) → int", starter: "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    hints: ["把选择正号的元素看作一个子集。", "若总和与目标的奇偶性不匹配则无解。"],
    tests: [["包含零元素", [[0,1,2,3,4], 2]], ["目标超出总和", [[2,5,7], 20]]],
    solutions: [
      ["背包计数", "由正负两组之差推导出正数组的目标和。", "时间 O(nS)，空间 O(S)。", `def solve(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2: return 0
    goal = (total + target) // 2; dp = [0] * (goal + 1); dp[0] = 1
    for value in nums:
        for current in range(goal, value - 1, -1): dp[current] += dp[current - value]
    return dp[goal]`],
      ["和的频次滚动", "逐个数字扩展当前可达和及其方案数。", "时间 O(nS)，空间 O(S)。", `from collections import Counter

def solve(nums, target):
    ways = Counter({0: 1})
    for value in nums:
        upcoming = Counter()
        for total,count in ways.items():
            upcoming[total + value] += count; upcoming[total - value] += count
        ways = upcoming
    return ways[target]`]
    ]
  }),
  problem({
    id: "coin-change-ii", number: 518, title: "零钱兑换 II", topic: "动态规划",
    summary: "每种硬币可以使用任意次，计算凑成目标金额的不同组合数量。",
    signature: "solve(amount, coins) → int", starter: "def solve(amount, coins):\n    # TODO: 写下你的解法\n    pass",
    hints: ["外层遍历硬币才能避免把不同顺序重复计数。", "dp[0] 应初始化为一。"],
    tests: [["有多种组合", [11,[2,3,5,7]]], ["无法凑出目标", [9,[4,6]]]],
    solutions: [
      ["完全背包计数", "逐种硬币正向更新金额的组合数。", "时间 O(n·amount)，空间 O(amount)。", `def solve(amount, coins):
    dp = [0] * (amount + 1); dp[0] = 1
    for coin in coins:
        for value in range(coin, amount + 1): dp[value] += dp[value - coin]
    return dp[amount]`],
      ["记忆化组合搜索", "递归状态记录当前硬币索引与剩余金额。", "时间 O(n·amount)，空间 O(n·amount)。", `from functools import lru_cache

def solve(amount, coins):
    @lru_cache(None)
    def count(index, remain):
        if remain == 0: return 1
        if index == len(coins) or remain < 0: return 0
        return count(index, remain - coins[index]) + count(index + 1, remain)
    return count(0, amount)`]
    ]
  }),
  problem({
    id: "palindromic-substrings", number: 647, title: "回文子串", topic: "多维动态规划",
    summary: "计算字符串中所有连续回文片段的数量，相同文本出现在不同位置需分别计数。",
    signature: "solve(text) → int", starter: "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    hints: ["每个字符和每对相邻字符都可以作为扩展中心。", "长度至少三时可复用内部区间状态。"],
    tests: [["奇偶回文混合", ["abccbaq"]], ["重复字符", ["aaaa"]]],
    solutions: [
      ["中心扩展", "枚举奇数与偶数中心，向两侧扩展并计数。", "时间 O(n²)，空间 O(1)。", `def solve(text):
    total = 0
    for center in range(2 * len(text) - 1):
        left = center // 2; right = left + center % 2
        while left >= 0 and right < len(text) and text[left] == text[right]:
            total += 1; left -= 1; right += 1
    return total`],
      ["区间动态规划", "从短区间到长区间判断两端与内部是否构成回文。", "时间 O(n²)，空间 O(n²)。", `def solve(text):
    size = len(text); dp = [[False] * size for _ in range(size)]; total = 0
    for length in range(1, size + 1):
        for left in range(size - length + 1):
            right = left + length - 1
            dp[left][right] = text[left] == text[right] and (length <= 2 or dp[left+1][right-1])
            total += dp[left][right]
    return total`]
    ]
  }),
  problem({
    id: "min-cost-climbing-stairs", number: 746, title: "使用最小花费爬楼梯", topic: "动态规划",
    summary: "可从前两级起步，每次跨一级或两级，求越过最后一级所需的最小花费。",
    signature: "solve(cost) → int", starter: "def solve(cost):\n    # TODO: 写下你的解法\n    pass",
    hints: ["到达某一级前，可以来自前一级或前两级。", "终点本身没有花费。"],
    tests: [["交替高低花费", [[4,9,2,8,1,7,3]]], ["两级楼梯", [[6,11]]]],
    solutions: [
      ["滚动最小费用", "维护到达前两级的最小累计费用。", "时间 O(n)，空间 O(1)。", `def solve(cost):
    previous_two = previous = 0
    for value in cost:
        previous_two, previous = previous, min(previous_two, previous) + value
    return min(previous_two, previous)`],
      ["数组动态规划", "dp[i] 表示站上第 i 级的最小费用，再比较最后两级。", "时间 O(n)，空间 O(n)。", `def solve(cost):
    if len(cost) <= 2: return min(cost)
    dp = cost[:]
    for index in range(2, len(cost)): dp[index] += min(dp[index-1], dp[index-2])
    return min(dp[-1], dp[-2])`]
    ]
  }),
  problem({
    id: "insert-interval", number: 57, title: "插入区间", topic: "普通数组",
    summary: "向一组按起点有序且互不重叠的区间插入新区间，并合并重叠部分。",
    signature: "solve(intervals, incoming) → intervals", starter: "def solve(intervals, incoming):\n    # TODO: 写下你的解法\n    pass",
    hints: ["先加入完全位于新区间左侧的区间。", "再合并所有相交区间，最后追加右侧剩余部分。"],
    tests: [["新区间跨越多个区间", [[[1,2],[5,7],[10,13],[16,19]],[6,17]]], ["新区间位于最前方", [[[4,6],[9,12]],[0,2]]]],
    solutions: [
      ["三段扫描", "按左侧、重叠、右侧三个阶段处理有序区间。", "时间 O(n)，空间 O(n)。", `def solve(intervals, incoming):
    result = []; index = 0; start, end = incoming
    while index < len(intervals) and intervals[index][1] < start:
        result.append(intervals[index]); index += 1
    while index < len(intervals) and intervals[index][0] <= end:
        start = min(start, intervals[index][0]); end = max(end, intervals[index][1]); index += 1
    result.append([start,end])
    return result + intervals[index:]`],
      ["统一排序合并", "把新区间加入后按起点排序，再执行通用合并。", "时间 O(n log n)，空间 O(n)。", `def solve(intervals, incoming):
    merged = []
    for start,end in sorted(intervals + [incoming]):
        if merged and start <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], end)
        else: merged.append([start,end])
    return merged`]
    ]
  }),
  problem({
    id: "gas-station", number: 134, title: "加油站", topic: "贪心算法",
    summary: "环形路线每站可补充燃料并产生行驶消耗，返回能够完成一圈的起点。",
    signature: "solve(gas, cost) → int", starter: "def solve(gas, cost):\n    # TODO: 写下你的解法\n    pass",
    hints: ["总燃料小于总消耗时一定无解。", "从某起点到当前位置油量为负，则中间所有点都不能作起点。"],
    tests: [["起点在后半段", [[2,1,4,3,8],[3,2,5,1,4]]], ["总量不足", [[1,4,2],[3,2,4]]]],
    solutions: [
      ["一次贪心扫描", "局部油量跌破零时把下一站设为新候选。", "时间 O(n)，空间 O(1)。", `def solve(gas, cost):
    if sum(gas) < sum(cost): return -1
    start = tank = 0
    for index,(gain,spend) in enumerate(zip(gas,cost)):
        tank += gain - spend
        if tank < 0: start = index + 1; tank = 0
    return start`],
      ["前缀和最低点", "总差值非负时，最低前缀和之后的位置可以完成一圈。", "时间 O(n)，空间 O(1)。", `def solve(gas, cost):
    total = prefix = minimum = 0; start = 0
    for index,(gain,spend) in enumerate(zip(gas,cost)):
        prefix += gain - spend; total += gain - spend
        if prefix < minimum: minimum = prefix; start = index + 1
    return start % len(gas) if total >= 0 else -1`]
    ]
  }),
  problem({
    id: "non-overlapping-intervals", number: 435, title: "无重叠区间", topic: "贪心算法",
    summary: "计算至少需要移除多少个区间，才能让剩余区间互不重叠。",
    signature: "solve(intervals) → int", starter: "def solve(intervals):\n    # TODO: 写下你的解法\n    pass",
    hints: ["优先保留结束更早的区间，为后续留下更多空间。", "端点相接不算重叠。"],
    tests: [["多层交叠", [[[1,5],[2,3],[3,4],[4,8],[8,10]]]], ["全部互不重叠", [[[-4,-1],[0,2],[3,7]]]]],
    solutions: [
      ["按结束时间选择", "每次保留结束最早且与已选区间不冲突的区间。", "时间 O(n log n)，空间 O(n)。", `def solve(intervals):
    removed = 0; end = float('-inf')
    for start,finish in sorted(intervals, key=lambda item: item[1]):
        if start < end: removed += 1
        else: end = finish
    return removed`],
      ["按起点扫描", "发生重叠时保留结束更早的那个区间。", "时间 O(n log n)，空间 O(n)。", `def solve(intervals):
    intervals = sorted(intervals); removed = 0; previous_end = float('-inf')
    for start,end in intervals:
        if start < previous_end:
            removed += 1; previous_end = min(previous_end,end)
        else: previous_end = end
    return removed`]
    ]
  }),
  problem({
    id: "valid-parenthesis-string", number: 678, title: "有效的括号字符串", topic: "贪心算法",
    summary: "字符串包含左右括号与星号，星号可作为任意括号或空串，判断能否形成有效括号序列。",
    signature: "solve(text) → bool", starter: "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    hints: ["维护当前未闭合左括号数量的最小值与最大值。", "最大值小于零说明右括号无论如何都过多。"],
    tests: [["星号承担不同角色", ["(*()**())"]], ["前缀右括号过多", [")*(()"]]],
    solutions: [
      ["上下界贪心", "用区间表示读到当前位置时可能的左括号余量。", "时间 O(n)，空间 O(1)。", `def solve(text):
    low = high = 0
    for ch in text:
        low += 1 if ch == '(' else -1
        high += 1 if ch != ')' else -1
        low = max(low,0)
        if high < 0: return False
    return low == 0`],
      ["双向必要条件", "正向保证右括号不过量，反向保证左括号不过量。", "时间 O(n)，空间 O(1)。", `def solve(text):
    balance = 0
    for ch in text:
        balance += -1 if ch == ')' else 1
        if balance < 0: return False
    balance = 0
    for ch in reversed(text):
        balance += -1 if ch == '(' else 1
        if balance < 0: return False
    return True`]
    ]
  }),
  problem({
    id: "number-of-1-bits", number: 191, title: "位 1 的个数", topic: "技巧",
    summary: "统计非负整数的二进制表示中一位的数量。",
    signature: "solve(value) → int", starter: "def solve(value):\n    # TODO: 写下你的解法\n    pass",
    hints: ["n & (n - 1) 会清除最低位的一。", "循环次数可以只等于一位的数量。"],
    tests: [["稀疏二进制位", [1041]], ["连续低位均为一", [4095]]],
    solutions: [
      ["清除最低一位", "每次执行 value &= value - 1，并累计次数。", "时间 O(一位数量)，空间 O(1)。", `def solve(value):
    count = 0
    while value:
        value &= value - 1; count += 1
    return count`],
      ["逐位右移", "检查最低位后不断右移整数。", "时间 O(log n)，空间 O(1)。", `def solve(value):
    count = 0
    while value:
        count += value & 1; value >>= 1
    return count`]
    ]
  }),
  problem({
    id: "missing-number", number: 268, title: "丢失的数字", topic: "技巧",
    summary: "长度为 n 的数组包含零到 n 中除一个数外的所有值，找出缺失值。",
    signature: "solve(nums) → int", starter: "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    hints: ["下标零到 n-1 与值异或后，剩下的就是缺失值。", "也可以用完整等差和减去实际和。"],
    tests: [["缺失中间值", [[6,2,4,0,1,5]]], ["缺失最大值", [[3,0,2,1]]]],
    solutions: [
      ["异或抵消", "把 n、全部下标和全部元素异或，相同值会两两抵消。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    result = len(nums)
    for index,value in enumerate(nums): result ^= index ^ value
    return result`],
      ["等差和差值", "计算零到 n 的理论总和减去实际总和。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    size = len(nums)
    return size * (size + 1) // 2 - sum(nums)`]
    ]
  }),
  problem({
    id: "counting-bits", number: 338, title: "比特位计数", topic: "技巧",
    summary: "返回零到 n 每个整数的二进制一位数量。",
    signature: "solve(limit) → list[int]", starter: "def solve(limit):\n    # TODO: 写下你的解法\n    pass",
    hints: ["i 的最低一位去掉后会落到更小的已知状态。", "也可利用 i 的一半与最低位建立递推。"],
    tests: [["跨越二的幂", [10]], ["最小范围", [1]]],
    solutions: [
      ["去最低一位递推", "bits[i] = bits[i & (i-1)] + 1。", "时间 O(n)，空间 O(n)。", `def solve(limit):
    bits = [0] * (limit + 1)
    for value in range(1, limit + 1): bits[value] = bits[value & (value - 1)] + 1
    return bits`],
      ["右移递推", "一个数的位数等于其一半的位数加最低位。", "时间 O(n)，空间 O(n)。", `def solve(limit):
    bits = [0]
    for value in range(1, limit + 1): bits.append(bits[value >> 1] + (value & 1))
    return bits`]
    ]
  })
];

const additionsById = new Map(additions.map((item) => [item.id, item]));
const merged = original.filter((item) => !additionsById.has(item.id)).concat(additions);
merged.forEach((item, index) => { item.curationRank = index + 1; });

const banner = `/*
 * 回写精选 150 内容包
 * 题目元数据仅用于定位外部练习；摘要、提示、代码与测试由回写独立编写。
 * 不含 LeetCode／力扣官方题面、约束、示例、图片或题解。
 * 详情见 ./CONTENT_NOTICE.txt 与仓库 docs/CONTENT_PROVENANCE.md。
 */
`;
fs.writeFileSync(contentFile, `${banner}window.PROBLEMS = ${JSON.stringify(merged, null, 2)};\n`);
console.log(`Expanded curated library from ${original.length} to ${merged.length} problems.`);
