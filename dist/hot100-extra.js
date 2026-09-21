(function () {
  "use strict";

  const problems = window.PROBLEMS || (window.PROBLEMS = []);

  function solution(name, idea, complexity, code, steps = [], pitfalls = []) {
    return { name, idea, complexity, code, steps, pitfalls };
  }

  function add({ id, number, title, topic, summary, params, signature, hints, tests, solutions, compare = "exact" }) {
    problems.push({
      id,
      number,
      title,
      topic,
      summary,
      signature,
      starter: `def solve(${params}):\n    # TODO: 写下你的解法\n    pass`,
      hints,
      tests,
      solutions: solutions.map((item, index) => ({
        id: `solution-${index + 1}`,
        ...item,
        steps: item.steps?.length ? item.steps : hints.slice(0, 2),
        pitfalls: item.pitfalls?.length ? item.pitfalls : [hints[hints.length - 1]],
        source: { label: "独立实现 · 题目来源：力扣官方原题", url: `https://leetcode.cn/problems/${id}/` }
      })),
      compare,
      officialUrl: `https://leetcode.cn/problems/${id}/`
    });
  }

  const LIST = `class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def from_list(values):
    dummy = ListNode()
    tail = dummy
    for value in values:
        tail.next = ListNode(value)
        tail = tail.next
    return dummy.next

def to_list(node):
    result = []
    while node:
        result.append(node.value)
        node = node.next
    return result`;

  const TREE = `from collections import deque

class TreeNode:
    def __init__(self, value=0):
        self.value = value
        self.left = None
        self.right = None

def build_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    index = 1
    while queue and index < len(values):
        node = queue.popleft()
        if index < len(values) and values[index] is not None:
            node.left = TreeNode(values[index])
            queue.append(node.left)
        index += 1
        if index < len(values) and values[index] is not None:
            node.right = TreeNode(values[index])
            queue.append(node.right)
        index += 1
    return root

def tree_to_list(root):
    if root is None:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            result.append(None)
            continue
        result.append(node.value)
        queue.append(node.left)
        queue.append(node.right)
    while result and result[-1] is None:
        result.pop()
    return result`;

  // 哈希
  add({
    id: "group-anagrams", number: 49, title: "字母异位词分组", topic: "哈希",
    summary: "把由相同字符及相同次数构成的字符串归到同一组，组内顺序不作要求。",
    params: "words", signature: "solve(words) → list[list[str]]",
    hints: ["为每个字符串构造与排列顺序无关的键。", "排序后的字符串或 26 位计数都可以作为键。"],
    tests: [
      { label: "多组异位词", args: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
      { label: "空串", args: [[""]], expected: [[""]] }
    ], compare: "nestedUnordered",
    solutions: [
      solution("排序键", "把每个单词排序后的结果作为哈希键。", "时间 O(n·k log k)，空间 O(nk)。", `def solve(words):
    groups = {}
    for word in words:
        key = ''.join(sorted(word))
        groups.setdefault(key, []).append(word)
    return list(groups.values())`, ["逐词排序。", "按排序结果聚合。"]),
      solution("字符计数键", "用 26 个字符频次构成不可变元组，避免逐词排序。", "时间 O(nk)，空间 O(nk)。", `def solve(words):
    groups = {}
    for word in words:
        counts = [0] * 26
        for char in word:
            counts[ord(char) - 97] += 1
        groups.setdefault(tuple(counts), []).append(word)
    return list(groups.values())`, ["统计频次。", "把列表转成元组作为键。"])
    ]
  });

  add({
    id: "longest-consecutive-sequence", number: 128, title: "最长连续序列", topic: "哈希",
    summary: "在无序整数列表中，求数值连续递增的最长序列长度，元素在原列表中的位置无需连续。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["只有不存在 x-1 的数字才是序列起点。", "集合查询可以把扩展序列变成常数级成员判断。"],
    tests: [
      { label: "无序连续段", args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { label: "含重复值", args: [[1, 2, 0, 1]], expected: 3 }
    ],
    solutions: [
      solution("集合找起点", "只从没有前驱的数字开始向右扩展，每个值至多被完整访问一次。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    values = set(nums)
    best = 0
    for value in values:
        if value - 1 in values:
            continue
        end = value
        while end in values:
            end += 1
        best = max(best, end - value)
    return best`),
      solution("排序扫描", "排序后忽略重复值，并统计相邻差为 1 的连续长度。", "时间 O(n log n)，空间 O(n)。", `def solve(nums):
    if not nums:
        return 0
    ordered = sorted(nums)
    best = current = 1
    for index in range(1, len(ordered)):
        if ordered[index] == ordered[index - 1]:
            continue
        if ordered[index] == ordered[index - 1] + 1:
            current += 1
        else:
            current = 1
        best = max(best, current)
    return best`)
    ]
  });

  // 双指针
  add({
    id: "container-with-most-water", number: 11, title: "盛最多水的容器", topic: "双指针",
    summary: "从若干竖线中选择两条作为容器边界，返回能容纳水的最大面积。",
    params: "height", signature: "solve(height) → int",
    hints: ["面积由较短边和两边距离共同决定。", "移动较长边不可能改善当前短板。"],
    tests: [
      { label: "经典高低组合", args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { label: "两条边", args: [[1, 1]], expected: 1 }
    ],
    solutions: [
      solution("首尾双指针", "从最宽容器开始，每次只移动较短的一侧。", "时间 O(n)，空间 O(1)。", `def solve(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        best = max(best, min(height[left], height[right]) * (right - left))
        if height[left] <= height[right]:
            left += 1
        else:
            right -= 1
    return best`),
      solution("跳过无效高度", "移动短边时连续跳过不高于旧短边的线，减少无效面积计算。", "时间 O(n)，空间 O(1)。", `def solve(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        short = min(height[left], height[right])
        best = max(best, short * (right - left))
        if height[left] <= height[right]:
            while left < right and height[left] <= short:
                left += 1
        else:
            while left < right and height[right] <= short:
                right -= 1
    return best`)
    ]
  });

  add({
    id: "3sum", number: 15, title: "三数之和", topic: "双指针",
    summary: "找出所有和为零且不重复的三元组，返回值组合而不是位置。",
    params: "nums", signature: "solve(nums) → list[list[int]]",
    hints: ["先排序，固定一个数后把问题转成两数之和。", "固定值和双指针移动后都要跳过重复值。"],
    tests: [
      { label: "多组三元组", args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { label: "全零去重", args: [[0, 0, 0, 0]], expected: [[0, 0, 0]] }
    ], compare: "nestedUnordered",
    solutions: [
      solution("排序加双指针", "固定最左值，在其右侧用相向指针寻找互补的两数。", "时间 O(n²)，空间 O(n)。", `def solve(nums):
    nums = sorted(nums)
    result = []
    for i in range(len(nums) - 2):
        if i and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]: left += 1
                while left < right and nums[right] == nums[right + 1]: right -= 1
    return result`),
      solution("固定值加哈希", "固定第一个数，在右侧扫描时用集合寻找所需的第三个数。", "时间 O(n²)，空间 O(n)。", `def solve(nums):
    result = set()
    nums.sort()
    for i in range(len(nums) - 2):
        seen = set()
        for j in range(i + 1, len(nums)):
            need = -nums[i] - nums[j]
            if need in seen:
                result.add((nums[i], need, nums[j]))
            seen.add(nums[j])
    return [list(item) for item in result]`)
    ]
  });

  add({
    id: "trapping-rain-water", number: 42, title: "接雨水", topic: "双指针",
    summary: "给定柱子高度，计算下雨后所有凹槽能够接住的水量。",
    params: "height", signature: "solve(height) → int",
    hints: ["某位置水位由左右最高柱的较小者决定。", "双指针可以边维护边界最高值边结算较短侧。"],
    tests: [
      { label: "多个凹槽", args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { label: "单个宽凹槽", args: [[4, 2, 0, 3, 2, 5]], expected: 9 }
    ],
    solutions: [
      solution("双指针边界", "较低一侧的水位已由该侧最大值确定，可以立即结算并向内移动。", "时间 O(n)，空间 O(1)。", `def solve(height):
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0
    while left < right:
        if height[left] <= height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water`),
      solution("单调栈按层结算", "栈保存递减柱子；遇到更高柱时弹出槽底，按高度差和宽度计算横向水层。", "时间 O(n)，空间 O(n)。", `def solve(height):
    stack = []
    water = 0
    for index, value in enumerate(height):
        while stack and value > height[stack[-1]]:
            bottom = stack.pop()
            if not stack:
                break
            width = index - stack[-1] - 1
            bounded = min(value, height[stack[-1]]) - height[bottom]
            water += width * bounded
        stack.append(index)
    return water`)
    ]
  });

  // 滑动窗口与子串
  add({
    id: "find-all-anagrams-in-a-string", number: 438, title: "找到字符串中所有字母异位词", topic: "滑动窗口",
    summary: "返回文本中所有长度与模式串相同、且字符频次完全一致的窗口起点。",
    params: "text, pattern", signature: "solve(text, pattern) → list[int]",
    hints: ["窗口长度固定为模式串长度。", "维护 26 位频次数组或缺失字符计数。"],
    tests: [
      { label: "两个异位窗口", args: ["cbaebabacd", "abc"], expected: [0, 6] },
      { label: "重叠窗口", args: ["abab", "ab"], expected: [0, 1, 2] }
    ],
    solutions: [
      solution("定长频次数组", "窗口每右移一步，加入新字符并移出过期字符，再比较频次。", "时间 O(26n)，空间 O(1)。", `def solve(text, pattern):
    if len(pattern) > len(text):
        return []
    need = [0] * 26
    window = [0] * 26
    for char in pattern: need[ord(char) - 97] += 1
    result = []
    for right, char in enumerate(text):
        window[ord(char) - 97] += 1
        if right >= len(pattern):
            window[ord(text[right - len(pattern)]) - 97] -= 1
        if window == need:
            result.append(right - len(pattern) + 1)
    return result`),
      solution("差异计数", "记录窗口与目标之间还缺多少字符，窗口满足时无需比较完整数组。", "时间 O(n)，空间 O(k)。", `def solve(text, pattern):
    need = {}
    for char in pattern: need[char] = need.get(char, 0) + 1
    missing = len(pattern)
    left = 0
    result = []
    for right, char in enumerate(text):
        if need.get(char, 0) > 0: missing -= 1
        need[char] = need.get(char, 0) - 1
        if right - left + 1 > len(pattern):
            old = text[left]
            need[old] = need.get(old, 0) + 1
            if need[old] > 0: missing += 1
            left += 1
        if missing == 0: result.append(left)
    return result`)
    ]
  });

  add({
    id: "subarray-sum-equals-k", number: 560, title: "和为 K 的子数组", topic: "子串",
    summary: "统计整数列表中元素和恰好等于目标值的连续子数组数量。",
    params: "nums, k", signature: "solve(nums, k) → int",
    hints: ["若两个前缀和之差为 k，中间区间的和就是 k。", "值可为负数，因此普通滑动窗口不成立。"],
    tests: [
      { label: "两个短区间", args: [[1, 1, 1], 2], expected: 2 },
      { label: "包含负数", args: [[1, -1, 0], 0], expected: 3 }
    ],
    solutions: [
      solution("前缀和频次", "扫描到前缀和 prefix 时，历史中每个 prefix-k 都对应一个合法起点。", "时间 O(n)，空间 O(n)。", `def solve(nums, k):
    counts = {0: 1}
    prefix = answer = 0
    for value in nums:
        prefix += value
        answer += counts.get(prefix - k, 0)
        counts[prefix] = counts.get(prefix, 0) + 1
    return answer`),
      solution("枚举右端点", "对每个右端点向左累加，直接统计所有连续区间。", "时间 O(n²)，空间 O(1)。", `def solve(nums, k):
    answer = 0
    for right in range(len(nums)):
        total = 0
        for left in range(right, -1, -1):
            total += nums[left]
            if total == k:
                answer += 1
    return answer`)
    ]
  });

  add({
    id: "sliding-window-maximum", number: 239, title: "滑动窗口最大值", topic: "子串",
    summary: "窗口按固定宽度从左向右移动，返回每个位置窗口中的最大值。",
    params: "nums, k", signature: "solve(nums, k) → list[int]",
    hints: ["单调队列只保存仍可能成为最大值的下标。", "新值进入时移除队尾更小值，窗口移动时移除过期队首。"],
    tests: [
      { label: "窗口宽三", args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { label: "单元素窗口", args: [[4, 2], 1], expected: [4, 2] }
    ],
    solutions: [
      solution("单调队列", "队列内下标对应值单调递减，队首始终是当前窗口最大值。", "时间 O(n)，空间 O(k)。", `from collections import deque

def solve(nums, k):
    queue = deque()
    result = []
    for right, value in enumerate(nums):
        while queue and nums[queue[-1]] <= value:
            queue.pop()
        queue.append(right)
        if queue[0] <= right - k:
            queue.popleft()
        if right >= k - 1:
            result.append(nums[queue[0]])
    return result`),
      solution("最大堆懒删除", "堆保存负值和下标，读取前弹出已经离开窗口的元素。", "时间 O(n log n)，空间 O(n)。", `import heapq

def solve(nums, k):
    heap = []
    result = []
    for right, value in enumerate(nums):
        heapq.heappush(heap, (-value, right))
        while heap[0][1] <= right - k:
            heapq.heappop(heap)
        if right >= k - 1:
            result.append(-heap[0][0])
    return result`)
    ]
  });

  add({
    id: "minimum-window-substring", number: 76, title: "最小覆盖子串", topic: "子串",
    summary: "在文本中找出包含目标串全部字符及其次数的最短连续片段，不存在则返回空串。",
    params: "text, target", signature: "solve(text, target) → str",
    hints: ["右边界负责满足条件，满足后左边界尽量收缩。", "用 missing 记录还缺少多少个字符实例。"],
    tests: [
      { label: "经典覆盖", args: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { label: "目标不存在", args: ["a", "aa"], expected: "" }
    ],
    solutions: [
      solution("缺失计数滑窗", "扩张时减少缺失量；完全覆盖后移动左端并记录最短窗口。", "时间 O(n)，空间 O(k)。", `def solve(text, target):
    need = {}
    for char in target: need[char] = need.get(char, 0) + 1
    missing = len(target)
    left = 0
    best_start, best_len = 0, float('inf')
    for right, char in enumerate(text):
        if need.get(char, 0) > 0: missing -= 1
        need[char] = need.get(char, 0) - 1
        while missing == 0:
            if right - left + 1 < best_len:
                best_start, best_len = left, right - left + 1
            old = text[left]
            need[old] = need.get(old, 0) + 1
            if need[old] > 0: missing += 1
            left += 1
    return '' if best_len == float('inf') else text[best_start:best_start + best_len]`),
      solution("有效字符种类", "分别记录目标频次和窗口频次，以满足的字符种类数判断覆盖完成。", "时间 O(n)，空间 O(k)。", `from collections import Counter

def solve(text, target):
    need = Counter(target)
    window = Counter()
    required = len(need)
    formed = left = 0
    best = (float('inf'), 0)
    for right, char in enumerate(text):
        window[char] += 1
        if char in need and window[char] == need[char]: formed += 1
        while formed == required:
            if right - left + 1 < best[0]: best = (right - left + 1, left)
            old = text[left]
            window[old] -= 1
            if old in need and window[old] < need[old]: formed -= 1
            left += 1
    return '' if best[0] == float('inf') else text[best[1]:best[1] + best[0]]`)
    ]
  });

  // 普通数组
  add({
    id: "merge-intervals", number: 56, title: "合并区间", topic: "普通数组",
    summary: "合并所有重叠或相接的闭区间，返回互不重叠的结果。",
    params: "intervals", signature: "solve(intervals) → list[list[int]]",
    hints: ["按左端点排序后，只需和结果中的最后区间比较。", "重叠时扩展右端点，否则开启新区间。"],
    tests: [
      { label: "多段重叠", args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { label: "端点相接", args: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
    ],
    solutions: [
      solution("排序后线性合并", "排序把可能重叠的区间放到相邻位置，再维护结果尾区间。", "时间 O(n log n)，空间 O(n)。", `def solve(intervals):
    merged = []
    for start, end in sorted(intervals):
        if not merged or start > merged[-1][1]:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)
    return merged`),
      solution("事件扫描", "把区间起止作为事件，活动计数从零变正时开启区间、回到零时关闭。", "时间 O(n log n)，空间 O(n)。", `def solve(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))
        events.append((end, -1))
    events.sort(key=lambda item: (item[0], -item[1]))
    result = []
    active = 0
    for point, change in events:
        if active == 0: start = point
        active += change
        if active == 0: result.append([start, point])
    return result`)
    ]
  });

  add({
    id: "rotate-array", number: 189, title: "轮转数组", topic: "普通数组",
    summary: "把列表向右轮转 k 步，本站返回轮转后的列表以便本地验证。",
    params: "nums, k", signature: "solve(nums, k) → nums",
    hints: ["k 需要先对列表长度取模。", "三次翻转可以在原地完成轮转。"],
    tests: [
      { label: "右移三步", args: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] },
      { label: "步数超过长度", args: [[-1, -100, 3, 99], 6], expected: [3, 99, -1, -100] }
    ],
    solutions: [
      solution("三次翻转", "先翻转整体，再分别翻转轮转后的前后两段。", "时间 O(n)，空间 O(1)。", `def solve(nums, k):
    if not nums: return nums
    k %= len(nums)
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])
    return nums`),
      solution("额外数组映射", "原下标 i 的元素落到 (i+k) mod n。", "时间 O(n)，空间 O(n)。", `def solve(nums, k):
    if not nums: return nums
    result = [0] * len(nums)
    for index, value in enumerate(nums):
        result[(index + k) % len(nums)] = value
    nums[:] = result
    return nums`)
    ]
  });

  add({
    id: "product-of-array-except-self", number: 238, title: "除了自身以外数组的乘积", topic: "普通数组",
    summary: "对每个位置返回其余所有元素的乘积，不使用除法。",
    params: "nums", signature: "solve(nums) → list[int]",
    hints: ["答案等于当前位置左侧乘积乘右侧乘积。", "先写前缀乘积，再用一个变量从右侧累乘。"],
    tests: [
      { label: "正整数", args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { label: "含一个零", args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
    ],
    solutions: [
      solution("前后缀滚动", "结果先存每个位置左侧乘积，再从右向左乘上右侧累计值。", "时间 O(n)，除输出外空间 O(1)。", `def solve(nums):
    result = [1] * len(nums)
    prefix = 1
    for i, value in enumerate(nums):
        result[i] = prefix
        prefix *= value
    suffix = 1
    for i in range(len(nums) - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result`),
      solution("双数组前后缀", "显式保存左侧与右侧乘积，最后逐位相乘。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    n = len(nums)
    left = [1] * n
    right = [1] * n
    for i in range(1, n): left[i] = left[i - 1] * nums[i - 1]
    for i in range(n - 2, -1, -1): right[i] = right[i + 1] * nums[i + 1]
    return [left[i] * right[i] for i in range(n)]`)
    ]
  });

  add({
    id: "first-missing-positive", number: 41, title: "缺失的第一个正数", topic: "普通数组",
    summary: "在未排序整数列表中找出最小的缺失正整数。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["长度为 n 时答案只可能在 1 到 n+1。", "把值 x 放到下标 x-1，最后找第一个不匹配位置。"],
    tests: [
      { label: "中间缺失", args: [[3, 4, -1, 1]], expected: 2 },
      { label: "前段完整", args: [[1, 2, 0]], expected: 3 }
    ],
    solutions: [
      solution("原地下标归位", "反复把范围内的正数交换到对应下标，直到当前位置稳定。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            target = nums[i] - 1
            nums[i], nums[target] = nums[target], nums[i]
    for i, value in enumerate(nums):
        if value != i + 1:
            return i + 1
    return n + 1`),
      solution("集合扫描", "把所有正数放入集合，从 1 起寻找首个不存在的值。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    values = set(nums)
    answer = 1
    while answer in values:
        answer += 1
    return answer`)
    ]
  });

  // 矩阵
  add({
    id: "set-matrix-zeroes", number: 73, title: "矩阵置零", topic: "矩阵",
    summary: "若矩阵某位置为零，就把其所在整行和整列都置为零，并返回修改后的矩阵。",
    params: "matrix", signature: "solve(matrix) → matrix",
    hints: ["第一行和第一列可以复用为标记区。", "需要额外记住首行、首列原本是否含零。"],
    tests: [
      { label: "中心为零", args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
      { label: "首列为零", args: [[[0, 1], [1, 1]]], expected: [[0, 0], [0, 1]] }
    ],
    solutions: [
      solution("首行首列标记", "先用首行首列记录需要清零的位置，最后单独处理首行首列。", "时间 O(mn)，空间 O(1)。", `def solve(matrix):
    rows, cols = len(matrix), len(matrix[0])
    first_row = any(matrix[0][c] == 0 for c in range(cols))
    first_col = any(matrix[r][0] == 0 for r in range(rows))
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = matrix[0][c] = 0
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if first_row:
        for c in range(cols): matrix[0][c] = 0
    if first_col:
        for r in range(rows): matrix[r][0] = 0
    return matrix`),
      solution("行列集合", "先收集所有含零的行列，再进行第二遍写零。", "时间 O(mn)，空间 O(m+n)。", `def solve(matrix):
    zero_rows, zero_cols = set(), set()
    for r, row in enumerate(matrix):
        for c, value in enumerate(row):
            if value == 0:
                zero_rows.add(r)
                zero_cols.add(c)
    for r, row in enumerate(matrix):
        for c in range(len(row)):
            if r in zero_rows or c in zero_cols:
                matrix[r][c] = 0
    return matrix`)
    ]
  });

  add({
    id: "spiral-matrix", number: 54, title: "螺旋矩阵", topic: "矩阵",
    summary: "按从外向内的顺时针螺旋顺序返回矩阵中的全部元素。",
    params: "matrix", signature: "solve(matrix) → list[int]",
    hints: ["维护上、下、左、右四条尚未访问的边界。", "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"],
    tests: [
      { label: "三阶方阵", args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] },
      { label: "两行矩阵", args: [[[1,2,3],[4,5,6]]], expected: [1,2,3,6,5,4] }
    ],
    solutions: [
      solution("四边界收缩", "每轮依次走上、右、下、左四条边，并缩小矩形。", "时间 O(mn)，空间 O(1)（不计输出）。", `def solve(matrix):
    if not matrix: return []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    result = []
    while top <= bottom and left <= right:
        result.extend(matrix[top][left:right + 1]); top += 1
        for r in range(top, bottom + 1): result.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            result.extend(reversed(matrix[bottom][left:right + 1])); bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1): result.append(matrix[r][left])
            left += 1
    return result`),
      solution("方向模拟", "按右、下、左、上的方向移动，遇到边界或已访问位置就转向。", "时间 O(mn)，空间 O(mn)。", `def solve(matrix):
    if not matrix: return []
    rows, cols = len(matrix), len(matrix[0])
    seen = set()
    directions = [(0,1),(1,0),(0,-1),(-1,0)]
    r = c = direction = 0
    result = []
    for _ in range(rows * cols):
        result.append(matrix[r][c]); seen.add((r,c))
        dr, dc = directions[direction]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < rows and 0 <= nc < cols) or (nr, nc) in seen:
            direction = (direction + 1) % 4
            dr, dc = directions[direction]
            nr, nc = r + dr, c + dc
        r, c = nr, nc
    return result`)
    ]
  });

  add({
    id: "rotate-image", number: 48, title: "旋转图像", topic: "矩阵",
    summary: "把正方形矩阵顺时针旋转九十度，本站返回旋转后的矩阵。",
    params: "matrix", signature: "solve(matrix) → matrix",
    hints: ["先沿主对角线转置，再逐行翻转。", "也可以按四个位置一组进行原地轮换。"],
    tests: [
      { label: "三阶矩阵", args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] },
      { label: "二阶矩阵", args: [[[1,2],[3,4]]], expected: [[3,1],[4,2]] }
    ],
    solutions: [
      solution("转置后翻转", "主对角线交换完成转置，再把每一行逆序。", "时间 O(n²)，空间 O(1)。", `def solve(matrix):
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()
    return matrix`),
      solution("四点轮换", "逐层处理，每次把上、左、下、右四个位置循环交换。", "时间 O(n²)，空间 O(1)。", `def solve(matrix):
    n = len(matrix)
    for layer in range(n // 2):
        last = n - 1 - layer
        for offset in range(last - layer):
            top = matrix[layer][layer + offset]
            matrix[layer][layer + offset] = matrix[last - offset][layer]
            matrix[last - offset][layer] = matrix[last][last - offset]
            matrix[last][last - offset] = matrix[layer + offset][last]
            matrix[layer + offset][last] = top
    return matrix`)
    ]
  });

  add({
    id: "search-a-2d-matrix-ii", number: 240, title: "搜索二维矩阵 II", topic: "矩阵",
    summary: "在每行从左到右、每列从上到下递增的矩阵中判断目标值是否存在。",
    params: "matrix, target", signature: "solve(matrix, target) → bool",
    hints: ["右上角同时具备向左变小、向下变大的单调方向。", "也可以逐行二分。"],
    tests: [
      { label: "目标存在", args: [[[1,4,7],[2,5,8],[3,6,9]], 6], expected: true },
      { label: "目标不存在", args: [[[1,4,7],[2,5,8]], 3], expected: false }
    ],
    solutions: [
      solution("右上角阶梯搜索", "大于目标就左移，小于目标就下移，每步排除一行或一列。", "时间 O(m+n)，空间 O(1)。", `def solve(matrix, target):
    if not matrix: return False
    row, col = 0, len(matrix[0]) - 1
    while row < len(matrix) and col >= 0:
        value = matrix[row][col]
        if value == target: return True
        if value > target: col -= 1
        else: row += 1
    return False`),
      solution("逐行二分", "跳过范围不含目标的行，在其余行中做标准二分。", "时间 O(m log n)，空间 O(1)。", `from bisect import bisect_left

def solve(matrix, target):
    for row in matrix:
        if row and row[0] <= target <= row[-1]:
            index = bisect_left(row, target)
            if index < len(row) and row[index] == target:
                return True
    return False`)
    ]
  });

  // 链表
  add({
    id: "intersection-of-two-linked-lists", number: 160, title: "相交链表", topic: "链表",
    summary: "两条单链表可能在某个节点后共享同一段尾链，返回相交节点的值；无交点返回空值。",
    params: "prefix_a, prefix_b, shared", signature: "solve(prefix_a, prefix_b, shared) → value | None",
    hints: ["两指针各走完 A+B 与 B+A 后会抵消长度差。", "本地参数用两个独立前缀和共享尾段构造真实相交节点。"],
    tests: [
      { label: "不同长度前缀", args: [[4,1],[5,6,1],[8,4,5]], expected: 8 },
      { label: "没有共享尾段", args: [[1,2],[3],[]], expected: null }
    ],
    solutions: [
      solution("双指针换轨", "指针到尾后切换到另一条链表，第二轮在相同剩余距离处相遇。", "时间 O(m+n)，空间 O(1)。", `${LIST}

def solve(prefix_a, prefix_b, shared):
    common = from_list(shared)
    def attach(prefix):
        head = from_list(prefix)
        if head is None: return common
        tail = head
        while tail.next: tail = tail.next
        tail.next = common
        return head
    a, b = attach(prefix_a), attach(prefix_b)
    left, right = a, b
    while left is not right:
        left = b if left is None else left.next
        right = a if right is None else right.next
    return None if left is None else left.value`),
      solution("节点集合", "先记录第一条链表的节点身份，再扫描第二条链表寻找首个重复节点。", "时间 O(m+n)，空间 O(m)。", `${LIST}

def solve(prefix_a, prefix_b, shared):
    common = from_list(shared)
    def attach(prefix):
        head = from_list(prefix)
        if head is None: return common
        tail = head
        while tail.next: tail = tail.next
        tail.next = common
        return head
    a, b = attach(prefix_a), attach(prefix_b)
    seen = set()
    while a:
        seen.add(a); a = a.next
    while b:
        if b in seen: return b.value
        b = b.next
    return None`)
    ]
  });

  add({
    id: "reverse-linked-list", number: 206, title: "反转链表", topic: "链表",
    summary: "反转一条单链表的指针方向，本站以数组输入并返回反转后的节点值。",
    params: "values", signature: "solve(values) → list",
    hints: ["修改 current.next 前先保存原来的后继。", "递归返回的新头节点始终是原链表尾节点。"],
    tests: [
      { label: "五个节点", args: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { label: "空链表", args: [[]], expected: [] }
    ],
    solutions: [
      solution("迭代改指针", "用 previous 保存已经反转的前缀，current 逐个摘下节点接到前面。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values):
    current = from_list(values)
    previous = None
    while current:
        following = current.next
        current.next = previous
        previous = current
        current = following
    return to_list(previous)`),
      solution("节点栈重连", "把节点依次压栈，再按弹出顺序重连 next，避免长链触发 Python 递归上限。", "时间 O(n)，空间 O(n)。", `${LIST}

def solve(values):
    current = from_list(values)
    nodes = []
    while current:
        nodes.append(current)
        current = current.next
    if not nodes: return []
    head = nodes.pop()
    tail = head
    while nodes:
        tail.next = nodes.pop()
        tail = tail.next
    tail.next = None
    return to_list(head)`)
    ]
  });

  add({
    id: "palindrome-linked-list", number: 234, title: "回文链表", topic: "链表",
    summary: "判断单链表从前向后和从后向前读取是否得到同一串值。",
    params: "values", signature: "solve(values) → bool",
    hints: ["快慢指针可以找到后半段起点。", "反转后半段后逐节点比较两侧。"],
    tests: [
      { label: "偶数长度回文", args: [[1,2,2,1]], expected: true },
      { label: "不是回文", args: [[1,2]], expected: false }
    ],
    solutions: [
      solution("反转后半段", "快慢指针找中点，反转后半段并与前半段同步比较。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values):
    head = from_list(values)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    previous = None
    while slow:
        following = slow.next
        slow.next = previous
        previous, slow = slow, following
    left, right = head, previous
    while right:
        if left.value != right.value: return False
        left, right = left.next, right.next
    return True`),
      solution("数组回文", "把节点值依次复制到数组，再用双指针比较首尾。", "时间 O(n)，空间 O(n)。", `${LIST}

def solve(values):
    sequence = to_list(from_list(values))
    return sequence == sequence[::-1]`)
    ]
  });

  add({
    id: "linked-list-cycle", number: 141, title: "环形链表", topic: "链表",
    summary: "给定节点值和尾节点连接位置，判断构造出的单链表是否存在环。",
    params: "values, pos", signature: "solve(values, pos) → bool",
    hints: ["快指针每次两步、慢指针每次一步；有环时必然相遇。", "pos 为 -1 表示尾节点不回连。"],
    tests: [
      { label: "尾部回连中间", args: [[3,2,0,-4], 1], expected: true },
      { label: "无环", args: [[1,2], -1], expected: false }
    ],
    solutions: [
      solution("快慢指针", "快指针在环中会从后方追上慢指针。", "时间 O(n)，空间 O(1)。", `class Node:
    def __init__(self, value): self.value, self.next = value, None

def build(values, pos):
    nodes = [Node(value) for value in values]
    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]
    if nodes and pos >= 0: nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None

def solve(values, pos):
    slow = fast = build(values, pos)
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast: return True
    return False`),
      solution("访问节点集合", "扫描时记录节点身份，第二次遇到同一节点即存在环。", "时间 O(n)，空间 O(n)。", `class Node:
    def __init__(self, value): self.value, self.next = value, None

def solve(values, pos):
    nodes = [Node(value) for value in values]
    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]
    if nodes and pos >= 0: nodes[-1].next = nodes[pos]
    current = nodes[0] if nodes else None
    seen = set()
    while current:
        if current in seen: return True
        seen.add(current); current = current.next
    return False`)
    ]
  });

  add({
    id: "linked-list-cycle-ii", number: 142, title: "环形链表 II", topic: "链表",
    summary: "给定节点值和尾节点连接位置，返回环入口的节点下标；没有环返回 -1。",
    params: "values, pos", signature: "solve(values, pos) → int",
    hints: ["快慢指针相遇后，让一根指针回到头节点。", "两根指针随后同速前进，再次相遇处就是入口。"],
    tests: [
      { label: "入口在下标一", args: [[3,2,0,-4], 1], expected: 1 },
      { label: "无环", args: [[1], -1], expected: -1 }
    ],
    solutions: [
      solution("Floyd 定位入口", "第一次相遇确认有环；头指针与相遇指针同速前进会在入口相遇。", "时间 O(n)，空间 O(1)。", `class Node:
    def __init__(self, value, index): self.value, self.index, self.next = value, index, None

def solve(values, pos):
    nodes = [Node(value, i) for i, value in enumerate(values)]
    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]
    if nodes and pos >= 0: nodes[-1].next = nodes[pos]
    slow = fast = nodes[0] if nodes else None
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            seeker = nodes[0]
            while seeker is not slow:
                seeker, slow = seeker.next, slow.next
            return seeker.index
    return -1`),
      solution("首次重复节点", "集合保存访问过的节点，第一个重复节点就是环入口。", "时间 O(n)，空间 O(n)。", `class Node:
    def __init__(self, index): self.index, self.next = index, None

def solve(values, pos):
    nodes = [Node(i) for i in range(len(values))]
    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]
    if nodes and pos >= 0: nodes[-1].next = nodes[pos]
    current = nodes[0] if nodes else None
    seen = set()
    while current:
        if current in seen: return current.index
        seen.add(current); current = current.next
    return -1`)
    ]
  });

  add({
    id: "add-two-numbers", number: 2, title: "两数相加", topic: "链表",
    summary: "两个逆序数字链表分别表示非负整数，返回它们相加后的逆序数字列表。",
    params: "a, b", signature: "solve(a, b) → list[int]",
    hints: ["逐位相加时同时处理进位。", "循环条件还要包含最后可能剩下的 carry。"],
    tests: [
      { label: "产生多位结果", args: [[2,4,3],[5,6,4]], expected: [7,0,8] },
      { label: "连续进位", args: [[9,9,9],[1]], expected: [0,0,0,1] }
    ],
    solutions: [
      solution("链表逐位加", "同步读取两个链表节点，把总和的个位接入结果并保留十位进位。", "时间 O(max(m,n))，空间 O(max(m,n))。", `${LIST}

def solve(a, b):
    left, right = from_list(a), from_list(b)
    dummy = tail = ListNode()
    carry = 0
    while left or right or carry:
        total = carry
        if left: total += left.value; left = left.next
        if right: total += right.value; right = right.next
        carry, digit = divmod(total, 10)
        tail.next = ListNode(digit); tail = tail.next
    return to_list(dummy.next)`),
      solution("按下标模拟", "直接在输入数字数组上按位读取，用结果数组表达新链表。", "时间 O(max(m,n))，空间 O(max(m,n))。", `def solve(a, b):
    result = []
    carry = index = 0
    while index < len(a) or index < len(b) or carry:
        total = carry
        if index < len(a): total += a[index]
        if index < len(b): total += b[index]
        carry, digit = divmod(total, 10)
        result.append(digit)
        index += 1
    return result`)
    ]
  });

  add({
    id: "remove-nth-node-from-end-of-list", number: 19, title: "删除链表的倒数第 N 个结点", topic: "链表",
    summary: "删除单链表倒数第 n 个节点，返回剩余节点值列表。",
    params: "values, n", signature: "solve(values, n) → list",
    hints: ["让 fast 比 slow 先走 n 步。", "使用哑节点可以统一删除头节点的情况。"],
    tests: [
      { label: "删除中间节点", args: [[1,2,3,4,5], 2], expected: [1,2,3,5] },
      { label: "删除唯一节点", args: [[1], 1], expected: [] }
    ],
    solutions: [
      solution("快慢指针", "fast 先走 n 步，随后两指针同步移动，slow 停在待删节点前。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values, n):
    dummy = ListNode(0, from_list(values))
    fast = slow = dummy
    for _ in range(n): fast = fast.next
    while fast.next:
        fast, slow = fast.next, slow.next
    slow.next = slow.next.next
    return to_list(dummy.next)`),
      solution("计算长度", "先统计节点数，再从哑节点走到正向下标 length-n 的前驱。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values, n):
    dummy = ListNode(0, from_list(values))
    length, current = 0, dummy.next
    while current: length += 1; current = current.next
    current = dummy
    for _ in range(length - n): current = current.next
    current.next = current.next.next
    return to_list(dummy.next)`)
    ]
  });

  add({
    id: "swap-nodes-in-pairs", number: 24, title: "两两交换链表中的节点", topic: "链表",
    summary: "每两个相邻节点交换一次，不改变节点内部数值，返回交换后的序列。",
    params: "values", signature: "solve(values) → list",
    hints: ["哑节点指向每一对的前驱。", "交换后前驱要移动到这一对的新尾节点。"],
    tests: [
      { label: "偶数节点", args: [[1,2,3,4]], expected: [2,1,4,3] },
      { label: "奇数节点", args: [[1,2,3]], expected: [2,1,3] }
    ],
    solutions: [
      solution("迭代三指针", "每轮让前驱指向第二节点，再把第一节点接到第二节点之后。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values):
    dummy = ListNode(0, from_list(values))
    previous = dummy
    while previous.next and previous.next.next:
        first = previous.next
        second = first.next
        first.next = second.next
        second.next = first
        previous.next = second
        previous = first
    return to_list(dummy.next)`),
      solution("递归交换", "当前一对交换后，把原第一节点的 next 指向剩余链表的递归结果。", "时间 O(n)，递归栈 O(n)。", `${LIST}

def swap(node):
    if node is None or node.next is None: return node
    second = node.next
    node.next = swap(second.next)
    second.next = node
    return second

def solve(values):
    return to_list(swap(from_list(values)))`)
    ]
  });

  add({
    id: "reverse-nodes-in-k-group", number: 25, title: "K 个一组翻转链表", topic: "链表",
    summary: "每 k 个连续节点为一组进行翻转，不足 k 个的尾段保持原顺序。",
    params: "values, k", signature: "solve(values, k) → list",
    hints: ["翻转前先确认本组确实有 k 个节点。", "保存下一组起点，再把当前组逐节点反向。"],
    tests: [
      { label: "每两项翻转", args: [[1,2,3,4,5], 2], expected: [2,1,4,3,5] },
      { label: "每三项翻转", args: [[1,2,3,4,5], 3], expected: [3,2,1,4,5] }
    ],
    solutions: [
      solution("分组原地翻转", "用 group_prev 定位每组前驱，找到第 k 个节点后翻转半开区间。", "时间 O(n)，空间 O(1)。", `${LIST}

def solve(values, k):
    dummy = ListNode(0, from_list(values))
    group_prev = dummy
    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if kth is None: return to_list(dummy.next)
        group_next = kth.next
        previous, current = group_next, group_prev.next
        while current is not group_next:
            following = current.next
            current.next = previous
            previous, current = current, following
        tail = group_prev.next
        group_prev.next = kth
        group_prev = tail`),
      solution("节点数组分组重连", "先保存节点引用，再逐个翻转完整的 k 长度区间，最后按新顺序重连。", "时间 O(n)，空间 O(n)。", `${LIST}

def solve(values, k):
    current = from_list(values)
    nodes = []
    while current:
        nodes.append(current)
        current = current.next
    for start in range(0, len(nodes) - k + 1, k):
        nodes[start:start + k] = reversed(nodes[start:start + k])
    for index in range(len(nodes) - 1):
        nodes[index].next = nodes[index + 1]
    if nodes: nodes[-1].next = None
    return to_list(nodes[0] if nodes else None)`)
    ]
  });

  add({
    id: "copy-list-with-random-pointer", number: 138, title: "随机链表的复制", topic: "链表",
    summary: "深拷贝带 next 与 random 指针的链表；输入为值数组和每个 random 指向的下标。",
    params: "values, random_indices", signature: "solve(values, random_indices) → list[[value, randomIndex]]",
    hints: ["哈希映射可以把旧节点对应到新节点。", "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"],
    tests: [
      { label: "交叉随机指针", args: [[7,13,11],[null,0,1]], expected: [[7,null],[13,0],[11,1]] },
      { label: "单节点自指", args: [[1],[0]], expected: [[1,0]] }
    ],
    solutions: [
      solution("节点映射", "第一遍创建所有副本，第二遍按映射连接 next 与 random。", "时间 O(n)，空间 O(n)。", `class Node:
    def __init__(self, value): self.value, self.next, self.random = value, None, None

def solve(values, random_indices):
    old = [Node(value) for value in values]
    for i in range(len(old) - 1): old[i].next = old[i + 1]
    for i, target in enumerate(random_indices):
        old[i].random = None if target is None else old[target]
    copies = {None: None}
    for node in old: copies[node] = Node(node.value)
    for node in old:
        copies[node].next = copies[node.next]
        copies[node].random = copies[node.random]
    index = {copies[node]: i for i, node in enumerate(old)}
    return [[copies[node].value, None if copies[node].random is None else index[copies[node].random]] for node in old]`),
      solution("穿插副本", "把副本插入原节点之后，random 副本就是原 random 的 next，最后拆开两条链。", "时间 O(n)，空间 O(1)（不计输出）。", `class Node:
    def __init__(self, value): self.value, self.next, self.random = value, None, None

def solve(values, random_indices):
    nodes = [Node(value) for value in values]
    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]
    for i, target in enumerate(random_indices): nodes[i].random = None if target is None else nodes[target]
    current = nodes[0] if nodes else None
    while current:
        copy = Node(current.value); copy.next = current.next; current.next = copy
        current = copy.next
    current = nodes[0] if nodes else None
    while current:
        current.next.random = None if current.random is None else current.random.next
        current = current.next.next
    copy_head = nodes[0].next if nodes else None
    current = nodes[0] if nodes else None
    while current:
        copy = current.next
        current.next = copy.next
        copy.next = copy.next.next if copy.next else None
        current = current.next
    copies, current = [], copy_head
    while current:
        copies.append(current)
        current = current.next
    index = {node: i for i, node in enumerate(copies)}
    return [[node.value, None if node.random is None else index[node.random]] for node in copies]`)
    ]
  });

  add({
    id: "sort-list", number: 148, title: "排序链表", topic: "链表",
    summary: "把单链表按节点值升序排列，返回排序后的值序列。",
    params: "values", signature: "solve(values) → list",
    hints: ["归并排序适合只支持顺序访问的链表。", "快慢指针切分，两个有序链表再线性合并。"],
    tests: [
      { label: "混合顺序", args: [[4,2,1,3]], expected: [1,2,3,4] },
      { label: "含负数", args: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] }
    ],
    solutions: [
      solution("自顶向下归并", "递归把链表二分，排序两个子链后线性合并。", "时间 O(n log n)，递归栈 O(log n)。", `${LIST}

def merge(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.value <= b.value: tail.next, a = a, a.next
        else: tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next

def sort_nodes(head):
    if head is None or head.next is None: return head
    slow, fast = head, head.next
    while fast and fast.next: slow, fast = slow.next, fast.next.next
    right = slow.next; slow.next = None
    return merge(sort_nodes(head), sort_nodes(right))

def solve(values): return to_list(sort_nodes(from_list(values)))`),
      solution("值数组排序回写", "读取全部节点值，排序后按顺序写回节点。", "时间 O(n log n)，空间 O(n)。", `${LIST}

def solve(values):
    head = from_list(values)
    ordered = sorted(values)
    current = head
    for value in ordered:
        current.value = value
        current = current.next
    return to_list(head)`)
    ]
  });

  add({
    id: "merge-k-sorted-lists", number: 23, title: "合并 K 个升序链表", topic: "链表",
    summary: "把多条升序链表合并成一条升序链表，本站使用二维数组表示输入。",
    params: "lists", signature: "solve(lists) → list",
    hints: ["最小堆只需保存每条链表当前最小的头节点。", "分治可以反复两两归并。"],
    tests: [
      { label: "三条链表", args: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] },
      { label: "含空链表", args: [[[],[1]]], expected: [1] }
    ],
    solutions: [
      solution("最小堆", "堆中保留每条链表当前节点，弹出最小值后推进对应链表。", "时间 O(N log k)，空间 O(k)。", `import heapq

def solve(lists):
    heap = []
    for row, values in enumerate(lists):
        if values: heapq.heappush(heap, (values[0], row, 0))
    result = []
    while heap:
        value, row, index = heapq.heappop(heap)
        result.append(value)
        if index + 1 < len(lists[row]):
            heapq.heappush(heap, (lists[row][index + 1], row, index + 1))
    return result`),
      solution("分治两两归并", "把链表数组不断按对合并，问题规模每轮减半。", "时间 O(N log k)，空间 O(N)。", `def merge(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]: result.append(a[i]); i += 1
        else: result.append(b[j]); j += 1
    return result + a[i:] + b[j:]

def solve(lists):
    lists = [list(values) for values in lists]
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            merged.append(merge(lists[i], lists[i + 1] if i + 1 < len(lists) else []))
        lists = merged
    return lists[0] if lists else []`)
    ]
  });

  add({
    id: "lru-cache", number: 146, title: "LRU 缓存", topic: "链表",
    summary: "按顺序执行 get 与 put 操作，容量满时淘汰最久未使用的键，返回所有 get 的结果。",
    params: "capacity, operations", signature: "solve(capacity, operations) → list[int]",
    hints: ["哈希表负责 O(1) 定位节点，双向链表负责 O(1) 调整新旧顺序。", "也可使用 Python 的有序字典表达同一不变量。"],
    tests: [
      { label: "发生两次淘汰", args: [2, [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["put",4,4],["get",1],["get",3],["get",4]]], expected: [1,-1,-1,3,4] },
      { label: "更新已有键", args: [1, [["put",1,1],["put",1,2],["get",1]]], expected: [2] }
    ],
    solutions: [
      solution("OrderedDict", "有序字典末尾代表最近使用；读写后移到末尾，超容量弹出头部。", "每次操作 O(1)，空间 O(capacity)。", `from collections import OrderedDict

def solve(capacity, operations):
    cache = OrderedDict()
    result = []
    for operation in operations:
        if operation[0] == 'get':
            key = operation[1]
            if key not in cache: result.append(-1)
            else:
                cache.move_to_end(key)
                result.append(cache[key])
        else:
            _, key, value = operation
            cache[key] = value
            cache.move_to_end(key)
            if len(cache) > capacity: cache.popitem(last=False)
    return result`),
      solution("哈希加双向链表", "节点按使用时间连接，头部最旧、尾部最新；哈希表直接定位节点。", "每次操作 O(1)，空间 O(capacity)。", `class Node:
    def __init__(self, key=0, value=0): self.key, self.value, self.prev, self.next = key, value, None, None

def solve(capacity, operations):
    head, tail = Node(), Node()
    head.next, tail.prev = tail, head
    cache = {}
    def remove(node):
        node.prev.next, node.next.prev = node.next, node.prev
    def append(node):
        node.prev, node.next = tail.prev, tail
        tail.prev.next = node; tail.prev = node
    result = []
    for operation in operations:
        if operation[0] == 'get':
            key = operation[1]
            if key not in cache: result.append(-1); continue
            node = cache[key]; remove(node); append(node); result.append(node.value)
        else:
            _, key, value = operation
            if key in cache: remove(cache[key])
            node = Node(key, value); cache[key] = node; append(node)
            if len(cache) > capacity:
                oldest = head.next; remove(oldest); del cache[oldest.key]
    return result`)
    ]
  });

  // 二叉树
  add({
    id: "invert-binary-tree", number: 226, title: "翻转二叉树", topic: "二叉树",
    summary: "交换二叉树中每个节点的左右子树，返回翻转后的层序数组。",
    params: "values", signature: "solve(values) → list",
    hints: ["每个节点都只做一次左右交换。", "递归深度优先和队列广度优先都能覆盖全部节点。"],
    tests: [
      { label: "完整三层", args: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] },
      { label: "单节点", args: [[2]], expected: [2] }
    ],
    solutions: [
      solution("递归交换", "先交换当前节点，再递归处理交换后的左右子树。", "时间 O(n)，递归栈 O(h)。", `${TREE}

def invert(node):
    if node is None: return None
    node.left, node.right = invert(node.right), invert(node.left)
    return node

def solve(values): return tree_to_list(invert(build_tree(values)))`),
      solution("层序交换", "用队列逐层访问非空节点并交换其左右孩子。", "时间 O(n)，空间 O(w)。", `${TREE}

def solve(values):
    root = build_tree(values)
    queue = deque([root]) if root else deque()
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return tree_to_list(root)`)
    ]
  });

  add({
    id: "symmetric-tree", number: 101, title: "对称二叉树", topic: "二叉树",
    summary: "判断一棵二叉树是否关于根节点的垂直轴镜像对称。",
    params: "values", signature: "solve(values) → bool",
    hints: ["比较的是左子树的左侧与右子树的右侧。", "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"],
    tests: [
      { label: "镜像对称", args: [[1,2,2,3,4,4,3]], expected: true },
      { label: "结构不对称", args: [[1,2,2,null,3,null,3]], expected: false }
    ],
    solutions: [
      solution("递归镜像比较", "成对比较外侧孩子与内侧孩子。", "时间 O(n)，递归栈 O(h)。", `${TREE}

def mirror(left, right):
    if left is None or right is None: return left is right
    return left.value == right.value and mirror(left.left, right.right) and mirror(left.right, right.left)

def solve(values):
    root = build_tree(values)
    return True if root is None else mirror(root.left, root.right)`),
      solution("队列成对检查", "队列始终压入需要互为镜像的节点对。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return True
    queue = deque([(root.left, root.right)])
    while queue:
        left, right = queue.popleft()
        if left is None or right is None:
            if left is not right: return False
            continue
        if left.value != right.value: return False
        queue.append((left.left, right.right))
        queue.append((left.right, right.left))
    return True`)
    ]
  });

  add({
    id: "diameter-of-binary-tree", number: 543, title: "二叉树的直径", topic: "二叉树",
    summary: "返回二叉树任意两节点之间最长路径所包含的边数，路径不一定经过根节点。",
    params: "values", signature: "solve(values) → int",
    hints: ["经过某节点的最长路径等于左子树高度加右子树高度。", "递归向上返回单侧高度，同时更新全局直径。"],
    tests: [
      { label: "直径经过根", args: [[1,2,3,4,5]], expected: 3 },
      { label: "两个节点", args: [[1,2]], expected: 1 }
    ],
    solutions: [
      solution("双栈后序高度", "第一栈生成根右左顺序，第二栈按左右根计算高度和直径。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return 0
    first, postorder = [root], []
    while first:
        node = first.pop(); postorder.append(node)
        if node.left: first.append(node.left)
        if node.right: first.append(node.right)
    heights, best = {}, 0
    while postorder:
        node = postorder.pop()
        left, right = heights.get(node.left, 0), heights.get(node.right, 0)
        best = max(best, left + right)
        heights[node] = max(left, right) + 1
    return best`),
      solution("显式后序栈", "用访问标记模拟后序遍历，字典保存已计算的子树高度。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return 0
    heights, stack, best = {}, [(root, False)], 0
    while stack:
        node, visited = stack.pop()
        if node is None: continue
        if not visited:
            stack.extend([(node, True), (node.right, False), (node.left, False)])
        else:
            left, right = heights.get(node.left, 0), heights.get(node.right, 0)
            best = max(best, left + right)
            heights[node] = max(left, right) + 1
    return best`)
    ]
  });

  add({
    id: "binary-tree-level-order-traversal", number: 102, title: "二叉树的层序遍历", topic: "二叉树",
    summary: "按从上到下、每层从左到右的顺序返回二叉树节点值。",
    params: "values", signature: "solve(values) → list[list[int]]",
    hints: ["每轮先固定当前队列长度，它就是本层节点数。", "递归时可把深度作为结果下标。"],
    tests: [
      { label: "三层树", args: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
      { label: "空树", args: [[]], expected: [] }
    ],
    solutions: [
      solution("队列逐层", "固定一层的节点数量，消费完后把本层结果加入答案。", "时间 O(n)，空间 O(w)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return []
    queue, result = deque([root]), []
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft(); level.append(node.value)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`),
      solution("下标队列分层", "用普通列表保存队列并移动读取下标，按每层结束位置切分层次。", "时间 O(n)，空间 O(w)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return []
    queue, head, result = [root], 0, []
    while head < len(queue):
        level_end = len(queue)
        level = []
        while head < level_end:
            node = queue[head]; head += 1
            level.append(node.value)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`)
    ]
  });

  add({
    id: "convert-sorted-array-to-binary-search-tree", number: 108, title: "将有序数组转换为二叉搜索树", topic: "二叉树",
    summary: "把升序数组转换为高度平衡的二叉搜索树，返回其层序表示。",
    params: "nums", signature: "solve(nums) → list",
    hints: ["选择区间中点作为根，左右区间递归构造子树。", "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"],
    tests: [
      { label: "五个元素", args: [[-10,-3,0,5,9]], expected: [0,-10,5,null,-3,null,9] },
      { label: "单元素", args: [[1]], expected: [1] }
    ], compare: "balancedBst",
    solutions: [
      solution("递归中点", "每次取区间中点为根，递归构造左右半区。", "时间 O(n)，递归栈 O(log n)。", `${TREE}

def build(nums, left, right):
    if left > right: return None
    mid = (left + right) // 2
    node = TreeNode(nums[mid])
    node.left = build(nums, left, mid - 1)
    node.right = build(nums, mid + 1, right)
    return node

def solve(nums): return tree_to_list(build(nums, 0, len(nums) - 1))`),
      solution("队列划分区间", "队列保存节点与其对应数组区间，逐层创建左右孩子。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(nums):
    if not nums: return []
    mid = (len(nums) - 1) // 2
    root = TreeNode(nums[mid])
    queue = deque([(root, 0, mid - 1, True), (root, mid + 1, len(nums) - 1, False)])
    while queue:
        parent, left, right, is_left = queue.popleft()
        if left > right: continue
        mid = (left + right) // 2
        node = TreeNode(nums[mid])
        if is_left: parent.left = node
        else: parent.right = node
        queue.append((node, left, mid - 1, True))
        queue.append((node, mid + 1, right, False))
    return tree_to_list(root)`)
    ]
  });

  add({
    id: "validate-binary-search-tree", number: 98, title: "验证二叉搜索树", topic: "二叉树",
    summary: "判断二叉树是否满足每个节点左侧所有值更小、右侧所有值更大的严格搜索树性质。",
    params: "values", signature: "solve(values) → bool",
    hints: ["只比较父子节点不够，需要携带整条祖先路径形成的上下界。", "搜索树中序遍历应严格递增。"],
    tests: [
      { label: "合法搜索树", args: [[2,1,3]], expected: true },
      { label: "深层越界", args: [[5,1,4,null,null,3,6]], expected: false }
    ],
    solutions: [
      solution("显式栈上下界", "栈中的每个节点同时携带祖先约束形成的开区间。", "时间 O(n)，空间 O(h)。", `${TREE}

def solve(values):
    root = build_tree(values)
    stack = [(root, float('-inf'), float('inf'))]
    while stack:
        node, low, high = stack.pop()
        if node is None: continue
        if not low < node.value < high: return False
        stack.append((node.right, node.value, high))
        stack.append((node.left, low, node.value))
    return True`),
      solution("中序严格递增", "中序遍历搜索树会得到严格升序序列，只需比较当前值和前一个值。", "时间 O(n)，空间 O(h)。", `${TREE}

def solve(values):
    root = build_tree(values)
    stack, current, previous = [], root, None
    while current or stack:
        while current: stack.append(current); current = current.left
        current = stack.pop()
        if previous is not None and current.value <= previous: return False
        previous = current.value
        current = current.right
    return True`)
    ]
  });

  add({
    id: "kth-smallest-element-in-a-bst", number: 230, title: "二叉搜索树中第 K 小的元素", topic: "二叉树",
    summary: "返回二叉搜索树按值从小到大排列后的第 k 个元素。",
    params: "values, k", signature: "solve(values, k) → int",
    hints: ["搜索树的中序遍历就是升序序列。", "迭代遍历可以在访问第 k 个节点时立即停止。"],
    tests: [
      { label: "第三小", args: [[5,3,6,2,4,null,null,1], 3], expected: 3 },
      { label: "最小值", args: [[3,1,4,null,2], 1], expected: 1 }
    ],
    solutions: [
      solution("迭代中序提前结束", "每弹出一个节点就减少 k，到零时直接返回。", "时间 O(h+k)，空间 O(h)。", `${TREE}

def solve(values, k):
    current, stack = build_tree(values), []
    while True:
        while current: stack.append(current); current = current.left
        current = stack.pop(); k -= 1
        if k == 0: return current.value
        current = current.right`),
      solution("完整中序列表", "递归生成全部中序值，再读取下标 k-1。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values, k):
    result = []
    def inorder(node):
        if node:
            inorder(node.left); result.append(node.value); inorder(node.right)
    inorder(build_tree(values))
    return result[k - 1]`)
    ]
  });

  add({
    id: "binary-tree-right-side-view", number: 199, title: "二叉树的右视图", topic: "二叉树",
    summary: "返回从树的右侧观察时，每一层最先可见的节点值。",
    params: "values", signature: "solve(values) → list[int]",
    hints: ["层序遍历每层的最后节点就是右视图。", "深度优先时先访问右子树，每层首次访问即答案。"],
    tests: [
      { label: "右侧被左子树补位", args: [[1,2,3,null,5,null,4]], expected: [1,3,4] },
      { label: "仅左侧", args: [[1,2]], expected: [1,2] }
    ],
    solutions: [
      solution("层序取末尾", "逐层遍历并记录每层最后出队的节点。", "时间 O(n)，空间 O(w)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return []
    queue, result = deque([root]), []
    while queue:
        for index in range(len(queue)):
            node = queue.popleft()
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
            visible = node.value
        result.append(visible)
    return result`),
      solution("右优先深搜", "先访问右孩子，某深度第一次出现的节点就是最右节点。", "时间 O(n)，递归栈 O(h)。", `${TREE}

def solve(values):
    result = []
    def visit(node, depth):
        if node is None: return
        if depth == len(result): result.append(node.value)
        visit(node.right, depth + 1); visit(node.left, depth + 1)
    visit(build_tree(values), 0)
    return result`)
    ]
  });

  add({
    id: "flatten-binary-tree-to-linked-list", number: 114, title: "二叉树展开为链表", topic: "二叉树",
    summary: "按前序遍历顺序把二叉树原地展开到 right 指针链上，返回展开后的值序列。",
    params: "values", signature: "solve(values) → list[int]",
    hints: ["展开顺序等于根、左、右的前序遍历。", "若原地改指针，要把原右子树接到左子树最右节点之后。"],
    tests: [
      { label: "左右子树", args: [[1,2,5,3,4,null,6]], expected: [1,2,3,4,5,6] },
      { label: "空树", args: [[]], expected: [] }
    ],
    solutions: [
      solution("寻找左子树前驱", "把左子树移到右侧，并把原右子树接到左子树最右节点后。", "时间 O(n)，空间 O(1)。", `${TREE}

def solve(values):
    root = build_tree(values)
    current = root
    while current:
        if current.left:
            predecessor = current.left
            while predecessor.right: predecessor = predecessor.right
            predecessor.right = current.right
            current.right, current.left = current.left, None
        current = current.right
    result, current = [], root
    while current: result.append(current.value); current = current.right
    return result`),
      solution("前序栈重连", "显式栈生成前序顺序，并让前一节点的 right 指向当前节点。", "时间 O(n)，空间 O(h)。", `${TREE}

def solve(values):
    root = build_tree(values)
    if root is None: return []
    stack, previous = [root], None
    while stack:
        node = stack.pop()
        if node.right: stack.append(node.right)
        if node.left: stack.append(node.left)
        if previous:
            previous.left = None
            previous.right = node
        previous = node
    result, current = [], root
    while current:
        result.append(current.value)
        current = current.right
    return result`)
    ]
  });

  add({
    id: "construct-binary-tree-from-preorder-and-inorder-traversal", number: 105, title: "从前序与中序遍历序列构造二叉树", topic: "二叉树",
    summary: "根据无重复值的前序和中序遍历重建二叉树，返回层序数组。",
    params: "preorder, inorder", signature: "solve(preorder, inorder) → list",
    hints: ["前序首项是根；它在中序中的位置划分左右子树。", "哈希表可以 O(1) 找到根在中序中的下标。"],
    tests: [
      { label: "左右子树完整", args: [[3,9,20,15,7],[9,3,15,20,7]], expected: [3,9,20,null,null,15,7] },
      { label: "单节点", args: [[1],[1]], expected: [1] }
    ],
    solutions: [
      solution("前序栈重建", "栈保存尚未完成右子树的祖先；中序指针决定新节点应接左侧还是回退后接右侧。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(preorder, inorder):
    if not preorder: return []
    root = TreeNode(preorder[0])
    stack = [root]
    inorder_index = 0
    for value in preorder[1:]:
        node = stack[-1]
        if node.value != inorder[inorder_index]:
            node.left = TreeNode(value)
            stack.append(node.left)
            continue
        while stack and stack[-1].value == inorder[inorder_index]:
            node = stack.pop()
            inorder_index += 1
        node.right = TreeNode(value)
        stack.append(node.right)
    return tree_to_list(root)`),
      solution("区间任务栈", "用显式任务栈保存父节点、左右区间和挂接方向，按前序顺序逐个创建根。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(preorder, inorder):
    if not preorder: return []
    positions = {value: index for index, value in enumerate(inorder)}
    root = TreeNode(preorder[0])
    preorder_index = 1
    tasks = [(root, positions[root.value] + 1, len(inorder) - 1, False), (root, 0, positions[root.value] - 1, True)]
    while tasks:
        parent, left, right, attach_left = tasks.pop()
        if left > right: continue
        value = preorder[preorder_index]; preorder_index += 1
        node = TreeNode(value)
        if attach_left: parent.left = node
        else: parent.right = node
        middle = positions[value]
        tasks.append((node, middle + 1, right, False))
        tasks.append((node, left, middle - 1, True))
    return tree_to_list(root)`)
    ]
  });

  add({
    id: "path-sum-iii", number: 437, title: "路径总和 III", topic: "二叉树",
    summary: "统计二叉树中向下连续且节点和等于目标值的路径数量，路径可从任意节点开始。",
    params: "values, target", signature: "solve(values, target) → int",
    hints: ["当前根到节点的前缀和减 target 若出现过，就得到对应数量的路径。", "离开节点时必须撤销当前前缀和频次。"],
    tests: [
      { label: "多起点路径", args: [[10,5,-3,3,2,null,11,3,-2,null,1], 8], expected: 3 },
      { label: "单节点命中", args: [[1], 1], expected: 1 }
    ],
    solutions: [
      solution("树上前缀和", "沿根到当前节点路径维护前缀和频次，统计 prefix-target。", "时间 O(n)，空间 O(h)。", `${TREE}

def solve(values, target):
    counts = {0: 1}
    def visit(node, prefix):
        if node is None: return 0
        prefix += node.value
        answer = counts.get(prefix - target, 0)
        counts[prefix] = counts.get(prefix, 0) + 1
        answer += visit(node.left, prefix) + visit(node.right, prefix)
        counts[prefix] -= 1
        return answer
    return visit(build_tree(values), 0)`),
      solution("枚举路径起点", "对每个节点分别统计以它为起点向下的目标和路径。", "时间最坏 O(n²)，递归栈 O(h)。", `${TREE}

def solve(values, target):
    def from_node(node, remaining):
        if node is None: return 0
        remaining -= node.value
        return (1 if remaining == 0 else 0) + from_node(node.left, remaining) + from_node(node.right, remaining)
    def all_starts(node):
        if node is None: return 0
        return from_node(node, target) + all_starts(node.left) + all_starts(node.right)
    return all_starts(build_tree(values))`)
    ]
  });

  add({
    id: "lowest-common-ancestor-of-a-binary-tree", number: 236, title: "二叉树的最近公共祖先", topic: "二叉树",
    summary: "在值互不重复的二叉树中，返回两个指定节点的最近公共祖先值。",
    params: "values, p, q", signature: "solve(values, p, q) → value",
    hints: ["若左右子树分别找到一个目标，当前节点就是最近公共祖先。", "也可以记录每个节点的父节点，再比较两条祖先链。"],
    tests: [
      { label: "祖先是根", args: [[3,5,1,6,2,0,8,null,null,7,4], 5, 1], expected: 3 },
      { label: "一个节点是祖先", args: [[3,5,1,6,2,0,8,null,null,7,4], 5, 4], expected: 5 }
    ],
    solutions: [
      solution("节点父指针回溯", "迭代记录节点对象的父节点，先收集 p 的祖先，再沿 q 的祖先链寻找首个交点。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values, p, q):
    root = build_tree(values)
    parent = {root: None}
    targets = {}
    stack = [root]
    while stack and len(targets) < 2:
        node = stack.pop()
        if node.value == p: targets[p] = node
        if node.value == q: targets[q] = node
        for child in (node.left, node.right):
            if child:
                parent[child] = node
                stack.append(child)
    ancestors = set()
    node = targets[p]
    while node is not None:
        ancestors.add(node); node = parent[node]
    node = targets[q]
    while node not in ancestors: node = parent[node]
    return node.value`),
      solution("父指针祖先集合", "遍历构建值到父值的映射，把 p 的祖先放入集合，再向上移动 q。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values, p, q):
    root = build_tree(values)
    parent = {root.value: None}
    stack = [root]
    while stack:
        node = stack.pop()
        for child in (node.left, node.right):
            if child:
                parent[child.value] = node.value
                stack.append(child)
    ancestors = set()
    while p is not None: ancestors.add(p); p = parent[p]
    while q not in ancestors: q = parent[q]
    return q`)
    ]
  });

  add({
    id: "binary-tree-maximum-path-sum", number: 124, title: "二叉树中的最大路径和", topic: "二叉树",
    summary: "返回二叉树中任意一条不重复节点路径能够得到的最大节点值之和。",
    params: "values", signature: "solve(values) → int",
    hints: ["向父节点只能贡献一条单侧路径。", "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"],
    tests: [
      { label: "路径跨过根", args: [[-10,9,20,null,null,15,7]], expected: 42 },
      { label: "全负节点", args: [[-3,-2,-5]], expected: -2 }
    ],
    solutions: [
      solution("双栈最大贡献", "先生成逆后序节点序列，再自底向上计算单侧贡献和完整路径候选。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values):
    root = build_tree(values)
    first, postorder = [root], []
    while first:
        node = first.pop()
        if node is None: continue
        postorder.append(node)
        first.extend((node.left, node.right))
    gains, best = {}, float('-inf')
    while postorder:
        node = postorder.pop()
        left = max(0, gains.get(node.left, 0))
        right = max(0, gains.get(node.right, 0))
        best = max(best, node.value + left + right)
        gains[node] = node.value + max(left, right)
    return best`),
      solution("显式后序动态规划", "栈模拟后序，字典保存每个节点向上的最大贡献。", "时间 O(n)，空间 O(n)。", `${TREE}

def solve(values):
    root = build_tree(values)
    gains, stack, best = {}, [(root, False)], float('-inf')
    while stack:
        node, visited = stack.pop()
        if node is None: continue
        if not visited:
            stack.extend([(node, True), (node.right, False), (node.left, False)])
        else:
            left = max(0, gains.get(node.left, 0)); right = max(0, gains.get(node.right, 0))
            best = max(best, node.value + left + right)
            gains[node] = node.value + max(left, right)
    return best`)
    ]
  });

  // 图论
  add({
    id: "rotting-oranges", number: 994, title: "腐烂的橘子", topic: "图论",
    summary: "每分钟腐烂橘子会感染上下左右的新鲜橘子，返回全部腐烂所需分钟；无法完成返回 -1。",
    params: "grid", signature: "solve(grid) → int",
    hints: ["所有初始腐烂位置要同时进入队列，形成多源广度优先。", "每处理完一层队列才经过一分钟。"],
    tests: [
      { label: "四分钟扩散", args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
      { label: "存在隔离橘子", args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 }
    ],
    solutions: [
      solution("多源广度优先", "初始腐烂橘子同时作为第零层，逐层感染相邻新鲜橘子。", "时间 O(mn)，空间 O(mn)。", `from collections import deque

def solve(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: queue.append((r,c))
            elif grid[r][c] == 1: fresh += 1
    minutes = 0
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for nr, nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2; fresh -= 1; queue.append((nr,nc))
        minutes += 1
    return minutes if fresh == 0 else -1`),
      solution("逐分钟扫描", "每轮扫描所有腐烂橘子并标记邻居，直到没有新感染或新鲜数归零。", "时间最坏 O((mn)²)，空间 O(mn)。", `def solve(grid):
    rows, cols = len(grid), len(grid[0])
    fresh = sum(value == 1 for row in grid for value in row)
    minutes = 0
    while fresh:
        newly = []
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] != 2: continue
                for nr, nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        newly.append((nr,nc))
        if not newly: return -1
        for r, c in set(newly):
            if grid[r][c] == 1: grid[r][c] = 2; fresh -= 1
        minutes += 1
    return minutes`)
    ]
  });

  add({
    id: "course-schedule", number: 207, title: "课程表", topic: "图论",
    summary: "课程依赖由先修关系给出，判断能否在不产生循环依赖的前提下修完全部课程。",
    params: "course_count, prerequisites", signature: "solve(course_count, prerequisites) → bool",
    hints: ["有向图无环等价于拓扑排序能取出全部节点。", "深度优先可用三色状态发现回到当前路径的边。"],
    tests: [
      { label: "线性依赖", args: [2, [[1,0]]], expected: true },
      { label: "两课程成环", args: [2, [[1,0],[0,1]]], expected: false }
    ],
    solutions: [
      solution("入度拓扑排序", "先把入度为零的课程入队，逐个删除其出边，最终计数应覆盖全部课程。", "时间 O(V+E)，空间 O(V+E)。", `from collections import deque

def solve(course_count, prerequisites):
    graph = [[] for _ in range(course_count)]
    indegree = [0] * course_count
    for course, before in prerequisites:
        graph[before].append(course); indegree[course] += 1
    queue = deque(i for i, degree in enumerate(indegree) if degree == 0)
    taken = 0
    while queue:
        before = queue.popleft(); taken += 1
        for course in graph[before]:
            indegree[course] -= 1
            if indegree[course] == 0: queue.append(course)
    return taken == course_count`),
      solution("迭代三色深度优先", "0 未访问、1 在当前路径、2 已完成；显式栈记录邻接表读取位置，遇到颜色 1 即发现环。", "时间 O(V+E)，空间 O(V+E)。", `def solve(course_count, prerequisites):
    graph = [[] for _ in range(course_count)]
    for course, before in prerequisites: graph[before].append(course)
    color = [0] * course_count
    for start in range(course_count):
        if color[start] != 0: continue
        color[start] = 1
        stack = [(start, 0)]
        while stack:
            course, edge_index = stack[-1]
            if edge_index == len(graph[course]):
                color[course] = 2
                stack.pop()
                continue
            next_course = graph[course][edge_index]
            stack[-1] = (course, edge_index + 1)
            if color[next_course] == 1: return False
            if color[next_course] == 0:
                color[next_course] = 1
                stack.append((next_course, 0))
    return True`)
    ]
  });

  add({
    id: "implement-trie-prefix-tree", number: 208, title: "实现 Trie（前缀树）", topic: "图论",
    summary: "依次执行插入、完整单词查询和前缀查询，返回每次查询得到的布尔值。",
    params: "operations", signature: "solve(operations) → list[bool]",
    hints: ["每条边代表一个字符，节点需要额外记录单词是否在此结束。", "字典嵌套与固定 26 路节点是两种常见表示。"],
    tests: [
      { label: "插入后两种查询", args: [[ ["insert","apple"], ["search","apple"], ["search","app"], ["startsWith","app"], ["insert","app"], ["search","app"] ]], expected: [true,false,true,true] },
      { label: "不存在前缀", args: [[ ["insert","cat"], ["startsWith","car"] ]], expected: [false] }
    ],
    solutions: [
      solution("嵌套字典", "每个字符对应子字典，并用特殊终止键标记完整单词。", "单次操作 O(length)，空间 O(字符总数)。", `def solve(operations):
    root = {}
    result = []
    for operation, word in operations:
        if operation == 'insert':
            node = root
            for char in word: node = node.setdefault(char, {})
            node['#'] = True
            continue
        node = root
        for char in word:
            if char not in node: node = None; break
            node = node[char]
        if operation == 'search': result.append(node is not None and '#' in node)
        else: result.append(node is not None)
    return result`),
      solution("节点对象", "节点保存 children 映射和 is_word 标记，查询逻辑复用前缀定位。", "单次操作 O(length)，空间 O(字符总数)。", `class TrieNode:
    def __init__(self): self.children, self.is_word = {}, False

def solve(operations):
    root = TrieNode(); result = []
    for operation, word in operations:
        node = root
        if operation == 'insert':
            for char in word: node = node.children.setdefault(char, TrieNode())
            node.is_word = True
        else:
            for char in word:
                node = node.children.get(char)
                if node is None: break
            result.append(node is not None and (operation == 'startsWith' or node.is_word))
    return result`)
    ]
  });

  // 回溯
  add({
    id: "permutations", number: 46, title: "全排列", topic: "回溯",
    summary: "返回互不相同数字的所有排列。",
    params: "nums", signature: "solve(nums) → list[list[int]]",
    hints: ["路径长度等于输入长度时得到一个排列。", "可用 used 数组，或在原数组上交换当前位置。"],
    tests: [
      { label: "三个数字", args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { label: "单个数字", args: [[0]], expected: [[0]] }
    ], compare: "outerUnordered",
    solutions: [
      solution("路径加已用标记", "每层选择一个尚未使用的数字加入路径，回溯时撤销标记。", "时间 O(n·n!)，空间 O(n)。", `def solve(nums):
    result, path = [], []
    used = [False] * len(nums)
    def backtrack():
        if len(path) == len(nums): result.append(path[:]); return
        for i, value in enumerate(nums):
            if used[i]: continue
            used[i] = True; path.append(value)
            backtrack()
            path.pop(); used[i] = False
    backtrack()
    return result`),
      solution("原地交换", "第 first 位依次与后续每个位置交换，递归固定下一位。", "时间 O(n·n!)，递归栈 O(n)。", `def solve(nums):
    result = []
    def backtrack(first):
        if first == len(nums): result.append(nums[:]); return
        for i in range(first, len(nums)):
            nums[first], nums[i] = nums[i], nums[first]
            backtrack(first + 1)
            nums[first], nums[i] = nums[i], nums[first]
    backtrack(0)
    return result`)
    ]
  });

  add({
    id: "letter-combinations-of-a-phone-number", number: 17, title: "电话号码的字母组合", topic: "回溯",
    summary: "根据电话按键映射，返回数字串可以表示的所有字母组合；空输入返回空列表。",
    params: "digits", signature: "solve(digits) → list[str]",
    hints: ["每一位数字对应一次分支选择。", "路径长度等于数字串长度时保存结果。"],
    tests: [
      { label: "两个按键", args: ["23"], expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"] },
      { label: "空输入", args: [""], expected: [] }
    ], compare: "unordered",
    solutions: [
      solution("深度优先组合", "按数字下标递归，为当前按键的每个字母建立分支。", "时间 O(4ⁿ)，空间 O(n)。", `def solve(digits):
    if not digits: return []
    letters = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    result, path = [], []
    def backtrack(index):
        if index == len(digits): result.append(''.join(path)); return
        for char in letters[digits[index]]:
            path.append(char); backtrack(index + 1); path.pop()
    backtrack(0)
    return result`),
      solution("迭代笛卡尔积", "从空前缀开始，每读一个按键就扩展所有已有前缀。", "时间 O(4ⁿ)，空间 O(4ⁿ)。", `def solve(digits):
    if not digits: return []
    letters = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    combinations = ['']
    for digit in digits:
        combinations = [prefix + char for prefix in combinations for char in letters[digit]]
    return combinations`)
    ]
  });

  add({
    id: "combination-sum", number: 39, title: "组合总和", topic: "回溯",
    summary: "从互不相同的正整数中选择若干个数，使总和等于目标；同一数字可重复选择。",
    params: "candidates, target", signature: "solve(candidates, target) → list[list[int]]",
    hints: ["递归参数需要包含本层可选择的起始下标。", "选择当前数后仍从当前下标递归，才能重复使用。"],
    tests: [
      { label: "两种组合", args: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
      { label: "多次复用", args: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]] }
    ], compare: "nestedUnordered",
    solutions: [
      solution("选择起点回溯", "按非递减顺序构造组合，当前位置可以继续复用，也可转向后续候选。", "指数时间，递归栈 O(target/min)。", `def solve(candidates, target):
    candidates.sort(); result, path = [], []
    def backtrack(start, remaining):
        if remaining == 0: result.append(path[:]); return
        for i in range(start, len(candidates)):
            value = candidates[i]
            if value > remaining: break
            path.append(value); backtrack(i, remaining - value); path.pop()
    backtrack(0, target)
    return result`),
      solution("选或不选", "对当前候选分成继续选择它和跳到下一个候选两条递归分支。", "指数时间，递归栈 O(target/min+n)。", `def solve(candidates, target):
    candidates.sort(); result, path = [], []
    def search(index, remaining):
        if remaining == 0: result.append(path[:]); return
        if index == len(candidates) or candidates[index] > remaining: return
        path.append(candidates[index]); search(index, remaining - candidates[index]); path.pop()
        search(index + 1, remaining)
    search(0, target)
    return result`)
    ]
  });

  add({
    id: "generate-parentheses", number: 22, title: "括号生成", topic: "回溯",
    summary: "返回由 n 对圆括号组成的全部合法字符串。",
    params: "n", signature: "solve(n) → list[str]",
    hints: ["任意前缀中右括号数量不能超过左括号。", "左括号未用完就能放；右括号少于左括号时才能放。"],
    tests: [
      { label: "三对括号", args: [3], expected: ["((()))","(()())","(())()","()(())","()()()"] },
      { label: "一对括号", args: [1], expected: ["()"] }
    ], compare: "unordered",
    solutions: [
      solution("计数回溯", "用 open 与 close 记录已放括号数量，只扩展仍可能合法的前缀。", "时间 O(Cn·n)，空间 O(n)。", `def solve(n):
    result = []
    def backtrack(path, opened, closed):
        if len(path) == 2 * n: result.append(path); return
        if opened < n: backtrack(path + '(', opened + 1, closed)
        if closed < opened: backtrack(path + ')', opened, closed + 1)
    backtrack('', 0, 0)
    return result`),
      solution("剩余配额", "记录还可放多少左括号和右括号，剩余右括号必须始终不少于左括号。", "时间 O(Cn·n)，空间 O(n)。", `def solve(n):
    result = []
    def build(path, left, right):
        if left == right == 0: result.append(path); return
        if left: build(path + '(', left - 1, right)
        if right > left: build(path + ')', left, right - 1)
    build('', n, n)
    return result`)
    ]
  });

  add({
    id: "word-search", number: 79, title: "单词搜索", topic: "回溯",
    summary: "判断字符网格中能否通过上下左右相邻且不重复使用同一格，依次拼出目标单词。",
    params: "board, word", signature: "solve(board, word) → bool",
    hints: ["从每个与首字符相同的位置尝试深搜。", "进入格子时标记已用，返回前恢复。"],
    tests: [
      { label: "折线路径存在", args: [[ ["A","B","C","E"], ["S","F","C","S"], ["A","D","E","E"] ], "ABCCED"], expected: true },
      { label: "不能重复用格", args: [[ ["A","B"], ["C","D"] ], "ABDA"], expected: false }
    ],
    solutions: [
      solution("原地标记深搜", "匹配当前字符后暂时把格子改成哨兵，递归四个方向再恢复。", "时间 O(mn·4ˡ)，递归栈 O(l)。", `def solve(board, word):
    rows, cols = len(board), len(board[0])
    def search(r, c, index):
        if index == len(word): return True
        if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[index]: return False
        saved, board[r][c] = board[r][c], '#'
        found = any(search(r+dr, c+dc, index+1) for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)))
        board[r][c] = saved
        return found
    return any(search(r, c, 0) for r in range(rows) for c in range(cols))`),
      solution("访问集合", "用集合保存当前路径占用的坐标，不修改输入网格。", "时间 O(mn·4ˡ)，空间 O(l)。", `def solve(board, word):
    rows, cols = len(board), len(board[0]); used = set()
    def search(r, c, index):
        if index == len(word): return True
        if not (0 <= r < rows and 0 <= c < cols) or (r,c) in used or board[r][c] != word[index]: return False
        used.add((r,c))
        found = search(r+1,c,index+1) or search(r-1,c,index+1) or search(r,c+1,index+1) or search(r,c-1,index+1)
        used.remove((r,c))
        return found
    return any(search(r,c,0) for r in range(rows) for c in range(cols))`)
    ]
  });

  add({
    id: "palindrome-partitioning", number: 131, title: "分割回文串", topic: "回溯",
    summary: "把字符串切分成若干段，使每一段都是回文串，返回全部切分方案。",
    params: "text", signature: "solve(text) → list[list[str]]",
    hints: ["当前位置枚举所有可能的结束位置。", "只有当前片段是回文时才继续递归剩余后缀。"],
    tests: [
      { label: "两种切分", args: ["aab"], expected: [["a","a","b"],["aa","b"]] },
      { label: "单字符", args: ["a"], expected: [["a"]] }
    ], compare: "nestedUnordered",
    solutions: [
      solution("回溯即时判断", "枚举下一段终点，用反转比较判断该片段是否回文。", "时间 O(n·2ⁿ)，空间 O(n)。", `def solve(text):
    result, path = [], []
    def backtrack(start):
        if start == len(text): result.append(path[:]); return
        for end in range(start + 1, len(text) + 1):
            part = text[start:end]
            if part != part[::-1]: continue
            path.append(part); backtrack(end); path.pop()
    backtrack(0)
    return result`),
      solution("回文表预处理", "先动态规划所有回文区间，回溯时 O(1) 判断片段是否合法。", "时间 O(n²+2ⁿ)，空间 O(n²)。", `def solve(text):
    n = len(text); palindrome = [[False] * n for _ in range(n)]
    for start in range(n - 1, -1, -1):
        for end in range(start, n):
            palindrome[start][end] = text[start] == text[end] and (end - start < 2 or palindrome[start + 1][end - 1])
    result, path = [], []
    def backtrack(start):
        if start == n: result.append(path[:]); return
        for end in range(start, n):
            if palindrome[start][end]:
                path.append(text[start:end + 1]); backtrack(end + 1); path.pop()
    backtrack(0)
    return result`)
    ]
  });

  add({
    id: "n-queens", number: 51, title: "N 皇后", topic: "回溯",
    summary: "在 n×n 棋盘放置 n 个皇后，使它们互不攻击，返回所有棋盘方案。",
    params: "n", signature: "solve(n) → list[list[str]]",
    hints: ["逐行放置，每行只需选择一列。", "列、主对角线 r-c、次对角线 r+c 都不能重复。"],
    tests: [
      { label: "四皇后", args: [4], expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] },
      { label: "一皇后", args: [1], expected: [["Q"]] }
    ], compare: "outerUnordered",
    solutions: [
      solution("集合剪枝", "逐行尝试列，用三个集合判断列与两类对角线冲突。", "时间 O(n!)，空间 O(n)。", `def solve(n):
    result, board = [], [['.'] * n for _ in range(n)]
    columns, diagonal1, diagonal2 = set(), set(), set()
    def backtrack(row):
        if row == n: result.append([''.join(line) for line in board]); return
        for col in range(n):
            if col in columns or row-col in diagonal1 or row+col in diagonal2: continue
            columns.add(col); diagonal1.add(row-col); diagonal2.add(row+col); board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'; columns.remove(col); diagonal1.remove(row-col); diagonal2.remove(row+col)
    backtrack(0)
    return result`),
      solution("位掩码", "用整数位集合表示已占列和两类对角线，从最低可用位依次建立分支。", "时间 O(n!)，空间 O(n)。", `def solve(n):
    result, positions = [], []
    full = (1 << n) - 1
    def backtrack(columns, left_diag, right_diag):
        row = len(positions)
        if row == n:
            result.append(['.' * col + 'Q' + '.' * (n-col-1) for col in positions]); return
        available = full & ~(columns | left_diag | right_diag)
        while available:
            bit = available & -available; available -= bit
            positions.append(bit.bit_length() - 1)
            backtrack(columns | bit, (left_diag | bit) << 1, (right_diag | bit) >> 1)
            positions.pop()
    backtrack(0, 0, 0)
    return result`)
    ]
  });

  // 二分查找
  add({
    id: "search-insert-position", number: 35, title: "搜索插入位置", topic: "二分查找",
    summary: "在严格递增数组中返回目标值下标；若不存在，返回保持有序时应插入的位置。",
    params: "nums, target", signature: "solve(nums, target) → int",
    hints: ["寻找第一个大于或等于 target 的位置。", "使用左闭右开区间能让返回值自然落在数组末尾。"],
    tests: [
      { label: "目标存在", args: [[1,3,5,6], 5], expected: 2 },
      { label: "插入中间", args: [[1,3,5,6], 2], expected: 1 }
    ],
    solutions: [
      solution("左闭右开二分", "维护答案所在的 [left,right) 区间，最终 left 即第一个不小于目标的位置。", "时间 O(log n)，空间 O(1)。", `def solve(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target: left = mid + 1
        else: right = mid
    return left`),
      solution("标准库 lower_bound", "bisect_left 直接返回有序序列中目标的最左插入点。", "时间 O(log n)，空间 O(1)。", `from bisect import bisect_left

def solve(nums, target):
    return bisect_left(nums, target)`)
    ]
  });

  add({
    id: "search-a-2d-matrix", number: 74, title: "搜索二维矩阵", topic: "二分查找",
    summary: "矩阵每行递增且下一行首值大于上一行尾值，判断目标是否存在。",
    params: "matrix, target", signature: "solve(matrix, target) → bool",
    hints: ["整个矩阵可视作一维递增数组。", "一维下标 index 对应 matrix[index//cols][index%cols]。"],
    tests: [
      { label: "目标存在", args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], expected: true },
      { label: "目标不存在", args: [[[1,3,5],[7,9,11]], 8], expected: false }
    ],
    solutions: [
      solution("展平下标二分", "不复制矩阵，用商和余数把一维中点映射回行列。", "时间 O(log(mn))，空间 O(1)。", `def solve(matrix, target):
    if not matrix: return False
    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1
    while left <= right:
        mid = (left + right) // 2
        value = matrix[mid // cols][mid % cols]
        if value == target: return True
        if value < target: left = mid + 1
        else: right = mid - 1
    return False`),
      solution("先定位行再定位列", "先按每行首值找到候选行，再在该行中二分。", "时间 O(m+log n)，空间 O(m)；首值列表的构造占 O(m)。", `from bisect import bisect_right, bisect_left

def solve(matrix, target):
    if not matrix: return False
    row = bisect_right([line[0] for line in matrix], target) - 1
    if row < 0: return False
    col = bisect_left(matrix[row], target)
    return col < len(matrix[row]) and matrix[row][col] == target`)
    ]
  });

  add({
    id: "find-first-and-last-position-of-element-in-sorted-array", number: 34, title: "在排序数组中查找元素的第一个和最后一个位置", topic: "二分查找",
    summary: "在非递减数组中返回目标值出现区间的左右端点，不存在则返回 [-1,-1]。",
    params: "nums, target", signature: "solve(nums, target) → [left, right]",
    hints: ["分别寻找第一个不小于 target 和第一个大于 target 的位置。", "右端点等于 upper_bound-1。"],
    tests: [
      { label: "目标重复出现", args: [[5,7,7,8,8,10], 8], expected: [3,4] },
      { label: "目标不存在", args: [[5,7,7,8,8,10], 6], expected: [-1,-1] }
    ],
    solutions: [
      solution("两次边界二分", "通用 lower 函数按严格条件分别计算左右边界。", "时间 O(log n)，空间 O(1)。", `def solve(nums, target):
    def lower(value):
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < value: left = mid + 1
            else: right = mid
        return left
    left = lower(target)
    if left == len(nums) or nums[left] != target: return [-1, -1]
    return [left, lower(target + 1) - 1]`),
      solution("bisect 边界", "标准库分别给出最左插入点和最右插入点。", "时间 O(log n)，空间 O(1)。", `from bisect import bisect_left, bisect_right

def solve(nums, target):
    left = bisect_left(nums, target)
    if left == len(nums) or nums[left] != target: return [-1, -1]
    return [left, bisect_right(nums, target) - 1]`)
    ]
  });

  add({
    id: "find-minimum-in-rotated-sorted-array", number: 153, title: "寻找旋转排序数组中的最小值", topic: "二分查找",
    summary: "在元素互不相同、由升序数组旋转得到的列表中返回最小值。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["比较 mid 与 right 能判断最小值位于哪一半。", "若 nums[mid] 大于右端，最小值必在 mid 右侧。"],
    tests: [
      { label: "旋转三位", args: [[3,4,5,1,2]], expected: 1 },
      { label: "未旋转", args: [[11,13,15,17]], expected: 11 }
    ],
    solutions: [
      solution("与右端比较", "右端值来自最小值所在有序段，用它判断中点在左段还是右段。", "时间 O(log n)，空间 O(1)。", `def solve(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]: left = mid + 1
        else: right = mid
    return nums[left]`),
      solution("查找下降断点", "二分缩小到相邻边界；也可先识别数组本来有序的情况。", "时间 O(log n)，空间 O(1)。", `def solve(nums):
    left, right = 0, len(nums) - 1
    if nums[left] <= nums[right]: return nums[left]
    while left + 1 < right:
        mid = (left + right) // 2
        if nums[mid] >= nums[left]: left = mid
        else: right = mid
    return nums[right]`)
    ]
  });

  add({
    id: "median-of-two-sorted-arrays", number: 4, title: "寻找两个正序数组的中位数", topic: "二分查找",
    summary: "返回两个升序数组合并后的中位数，要求理解对较短数组做分割的二分方法。",
    params: "a, b", signature: "solve(a, b) → float",
    hints: ["把两个数组切成左半与右半，使左侧元素总数固定。", "合法分割要求 a_left≤b_right 且 b_left≤a_right。"],
    tests: [
      { label: "总长度为奇数", args: [[1,3],[2]], expected: 2 },
      { label: "总长度为偶数", args: [[1,2],[3,4]], expected: 2.5 }
    ],
    solutions: [
      solution("短数组分割二分", "二分较短数组的分割点，另一数组分割点由左半总长度确定。", "时间 O(log min(m,n))，空间 O(1)。", `def solve(a, b):
    if len(a) > len(b): a, b = b, a
    m, n = len(a), len(b)
    left, right = 0, m
    while left <= right:
        cut_a = (left + right) // 2
        cut_b = (m + n + 1) // 2 - cut_a
        a_left = float('-inf') if cut_a == 0 else a[cut_a - 1]
        a_right = float('inf') if cut_a == m else a[cut_a]
        b_left = float('-inf') if cut_b == 0 else b[cut_b - 1]
        b_right = float('inf') if cut_b == n else b[cut_b]
        if a_left <= b_right and b_left <= a_right:
            if (m + n) % 2: return max(a_left, b_left)
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right: right = cut_a - 1
        else: left = cut_a + 1`),
      solution("线性归并", "像归并排序一样逐个取出较小值，走到中间位置后计算中位数。", "时间 O(m+n)，空间 O(m+n)。", `def solve(a, b):
    merged = []
    i = j = 0
    while i < len(a) or j < len(b):
        if j == len(b) or (i < len(a) and a[i] <= b[j]): merged.append(a[i]); i += 1
        else: merged.append(b[j]); j += 1
    middle = len(merged) // 2
    if len(merged) % 2: return merged[middle]
    return (merged[middle - 1] + merged[middle]) / 2`)
    ]
  });

  // 栈
  add({
    id: "min-stack", number: 155, title: "最小栈", topic: "栈",
    summary: "执行 push、pop、top 和 getMin 操作，要求读取栈顶和最小值都是常数时间；返回查询结果。",
    params: "operations", signature: "solve(operations) → list[int]",
    hints: ["辅助栈同步保存每个深度对应的最小值。", "也可在每个栈元素旁保存入栈时的最小值。"],
    tests: [
      { label: "弹出后最小值恢复", args: [[ ["push",-2], ["push",0], ["push",-3], ["getMin"], ["pop"], ["top"], ["getMin"] ]], expected: [-3,0,-2] },
      { label: "重复最小值", args: [[ ["push",1], ["push",1], ["pop"], ["getMin"] ]], expected: [1] }
    ],
    solutions: [
      solution("双栈同步", "数据栈保存值，最小栈在每层保存到该层为止的最小值。", "每次操作 O(1)，空间 O(n)。", `def solve(operations):
    values, minimums, result = [], [], []
    for operation in operations:
        name = operation[0]
        if name == 'push':
            value = operation[1]; values.append(value)
            minimums.append(value if not minimums else min(value, minimums[-1]))
        elif name == 'pop': values.pop(); minimums.pop()
        elif name == 'top': result.append(values[-1])
        else: result.append(minimums[-1])
    return result`),
      solution("单栈保存二元组", "每个元素同时记录自身值与入栈后的全局最小值。", "每次操作 O(1)，空间 O(n)。", `def solve(operations):
    stack, result = [], []
    for operation in operations:
        name = operation[0]
        if name == 'push':
            value = operation[1]
            stack.append((value, value if not stack else min(value, stack[-1][1])))
        elif name == 'pop': stack.pop()
        elif name == 'top': result.append(stack[-1][0])
        else: result.append(stack[-1][1])
    return result`)
    ]
  });

  add({
    id: "decode-string", number: 394, title: "字符串解码", topic: "栈",
    summary: "解码形如 k[片段] 的嵌套字符串，其中片段需要重复 k 次。",
    params: "text", signature: "solve(text) → str",
    hints: ["遇到左括号时保存外层字符串和重复次数。", "遇到右括号时完成当前层并与外层拼接。"],
    tests: [
      { label: "两个重复段", args: ["3[a]2[bc]"], expected: "aaabcbc" },
      { label: "嵌套重复", args: ["3[a2[c]]"], expected: "accaccacc" }
    ],
    solutions: [
      solution("状态栈", "栈保存进入括号前的前缀和倍数，右括号时恢复并拼接。", "时间 O(输出长度)，空间 O(嵌套深度+输出)。", `def solve(text):
    stack = []
    current, number = '', 0
    for char in text:
        if char.isdigit(): number = number * 10 + int(char)
        elif char == '[':
            stack.append((current, number)); current, number = '', 0
        elif char == ']':
            prefix, repeat = stack.pop(); current = prefix + current * repeat
        else: current += char
    return current`),
      solution("递归下降", "递归函数消费到对应右括号，返回当前层解码结果和新的读取位置。", "时间 O(输出长度)，递归栈 O(嵌套深度)。", `def solve(text):
    def parse(index):
        result, number = '', 0
        while index < len(text):
            char = text[index]
            if char.isdigit(): number = number * 10 + int(char)
            elif char == '[':
                nested, index = parse(index + 1); result += nested * number; number = 0
            elif char == ']': return result, index
            else: result += char
            index += 1
        return result, index
    return parse(0)[0]`)
    ]
  });

  add({
    id: "daily-temperatures", number: 739, title: "每日温度", topic: "栈",
    summary: "对每天的温度，返回还要等待多少天才会出现更高温度；之后没有则为零。",
    params: "temperatures", signature: "solve(temperatures) → list[int]",
    hints: ["单调栈保存仍在等待更高温度的下标。", "当前温度更高时可以连续结算栈顶。"],
    tests: [
      { label: "多次回暖", args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { label: "递减温度", args: [[3,2,1]], expected: [0,0,0] }
    ],
    solutions: [
      solution("单调递减栈", "栈中温度递减；更高温度到来时弹出并用下标差填写答案。", "时间 O(n)，空间 O(n)。", `def solve(temperatures):
    result = [0] * len(temperatures)
    stack = []
    for day, value in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < value:
            previous = stack.pop(); result[previous] = day - previous
        stack.append(day)
    return result`),
      solution("从右跳跃", "从右向左利用已算出的等待天数跳过不够高的日期。", "时间均摊 O(n)，空间 O(n)。", `def solve(temperatures):
    n = len(temperatures); result = [0] * n
    for day in range(n - 2, -1, -1):
        next_day = day + 1
        while next_day < n and temperatures[next_day] <= temperatures[day]:
            if result[next_day] == 0: next_day = n; break
            next_day += result[next_day]
        if next_day < n: result[day] = next_day - day
    return result`)
    ]
  });

  add({
    id: "largest-rectangle-in-histogram", number: 84, title: "柱状图中最大的矩形", topic: "栈",
    summary: "在相邻柱子组成的直方图中，返回完全位于柱子内部的最大矩形面积。",
    params: "heights", signature: "solve(heights) → int",
    hints: ["单调栈在遇到更矮柱时结算被弹出高度。", "弹出后新的栈顶是左侧第一个更矮位置。"],
    tests: [
      { label: "中间宽矩形", args: [[2,1,5,6,2,3]], expected: 10 },
      { label: "两个递增柱", args: [[2,4]], expected: 4 }
    ],
    solutions: [
      solution("哨兵单调栈", "两端补零，栈保存递增高度下标，弹出时用左右更矮边界计算宽度。", "时间 O(n)，空间 O(n)。", `def solve(heights):
    values = [0] + heights + [0]
    stack, best = [0], 0
    for right in range(1, len(values)):
        while values[stack[-1]] > values[right]:
            height = values[stack.pop()]
            width = right - stack[-1] - 1
            best = max(best, height * width)
        stack.append(right)
    return best`),
      solution("预计算左右边界", "分别求每根柱左、右第一个更矮位置，宽度由两边界之差确定。", "时间 O(n)，空间 O(n)。", `def solve(heights):
    n = len(heights); left = [-1] * n; right = [n] * n
    stack = []
    for i, value in enumerate(heights):
        while stack and heights[stack[-1]] >= value: stack.pop()
        left[i] = stack[-1] if stack else -1; stack.append(i)
    stack.clear()
    for i in range(n - 1, -1, -1):
        while stack and heights[stack[-1]] >= heights[i]: stack.pop()
        right[i] = stack[-1] if stack else n; stack.append(i)
    return max((heights[i] * (right[i] - left[i] - 1) for i in range(n)), default=0)`)
    ]
  });

  // 堆
  add({
    id: "kth-largest-element-in-an-array", number: 215, title: "数组中的第 K 个最大元素", topic: "堆",
    summary: "返回无序数组按降序排列后的第 k 个元素，重复值按出现次数计算。",
    params: "nums, k", signature: "solve(nums, k) → int",
    hints: ["容量为 k 的最小堆，堆顶就是当前第 k 大。", "快速选择只需把目标位置一侧继续划分。"],
    tests: [
      { label: "第二大", args: [[3,2,1,5,6,4], 2], expected: 5 },
      { label: "包含重复", args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 }
    ],
    solutions: [
      solution("容量 K 最小堆", "堆中始终保留已经扫描元素中的最大 k 个，堆顶是其中最小者。", "时间 O(n log k)，空间 O(k)。", `import heapq

def solve(nums, k):
    heap = []
    for value in nums:
        heapq.heappush(heap, value)
        if len(heap) > k: heapq.heappop(heap)
    return heap[0]`),
      solution("快速选择", "把第 k 大换算为升序下标 n-k，分区后只继续目标所在一侧。", "平均时间 O(n)，空间 O(1)。", `def solve(nums, k):
    target = len(nums) - k
    left, right = 0, len(nums) - 1
    while True:
        pivot = nums[right]; store = left
        for i in range(left, right):
            if nums[i] <= pivot:
                nums[store], nums[i] = nums[i], nums[store]; store += 1
        nums[store], nums[right] = nums[right], nums[store]
        if store == target: return nums[store]
        if store < target: left = store + 1
        else: right = store - 1`)
    ]
  });

  add({
    id: "find-median-from-data-stream", number: 295, title: "数据流的中位数", topic: "堆",
    summary: "依次执行 add 与 median 操作，在任意时刻返回目前所有数字的中位数。",
    params: "operations", signature: "solve(operations) → list[float]",
    hints: ["最大堆保存较小的一半，最小堆保存较大的一半。", "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"],
    tests: [
      { label: "奇偶长度交替", args: [[ ["add",1], ["add",2], ["median"], ["add",3], ["median"] ]], expected: [1.5,2] },
      { label: "含负数", args: [[ ["add",-1], ["median"], ["add",-2], ["median"] ]], expected: [-1,-1.5] }
    ],
    solutions: [
      solution("大小双堆", "左侧最大堆保存较小半，右侧最小堆保存较大半，并在每次插入后平衡。", "add O(log n)，median O(1)，空间 O(n)。", `import heapq

def solve(operations):
    small, large, result = [], [], []
    for operation in operations:
        if operation[0] == 'add':
            value = operation[1]
            heapq.heappush(small, -value)
            heapq.heappush(large, -heapq.heappop(small))
            if len(large) > len(small): heapq.heappush(small, -heapq.heappop(large))
        elif len(small) > len(large): result.append(-small[0])
        else: result.append((-small[0] + large[0]) / 2)
    return result`),
      solution("有序列表", "插入时二分找到位置并保持列表有序，查询时直接读取中间。", "add O(n)，median O(1)，空间 O(n)。", `from bisect import insort

def solve(operations):
    values, result = [], []
    for operation in operations:
        if operation[0] == 'add': insort(values, operation[1])
        else:
            middle = len(values) // 2
            result.append(values[middle] if len(values) % 2 else (values[middle - 1] + values[middle]) / 2)
    return result`)
    ]
  });

  // 贪心算法
  add({
    id: "best-time-to-buy-and-sell-stock", number: 121, title: "买卖股票的最佳时机", topic: "贪心算法",
    summary: "只能买入一次并在之后卖出一次，返回可获得的最大利润；无利润时返回零。",
    params: "prices", signature: "solve(prices) → int",
    hints: ["扫描到当天时，只需知道此前最低买入价。", "当天卖出的利润与历史最佳利润分别维护。"],
    tests: [
      { label: "低买高卖", args: [[7,1,5,3,6,4]], expected: 5 },
      { label: "持续下跌", args: [[7,6,4,3,1]], expected: 0 }
    ],
    solutions: [
      solution("维护最低价格", "每个卖出日用历史最低价格计算利润，再更新全局最大值。", "时间 O(n)，空间 O(1)。", `def solve(prices):
    lowest, best = float('inf'), 0
    for price in prices:
        lowest = min(lowest, price)
        best = max(best, price - lowest)
    return best`),
      solution("差分最大子数组", "相邻价格差组成每日收益，问题转为允许空区间的最大子数组和。", "时间 O(n)，空间 O(1)。", `def solve(prices):
    current = best = 0
    for i in range(1, len(prices)):
        current = max(0, current + prices[i] - prices[i - 1])
        best = max(best, current)
    return best`)
    ]
  });

  add({
    id: "jump-game", number: 55, title: "跳跃游戏", topic: "贪心算法",
    summary: "每个位置给出最大前跳距离，判断是否能从起点到达最后一个位置。",
    params: "nums", signature: "solve(nums) → bool",
    hints: ["维护当前所有可达位置能覆盖的最远下标。", "一旦扫描下标超过最远覆盖范围就失败。"],
    tests: [
      { label: "可以越过零", args: [[2,3,1,1,4]], expected: true },
      { label: "被零阻断", args: [[3,2,1,0,4]], expected: false }
    ],
    solutions: [
      solution("最远覆盖", "只扫描当前可达的位置，并不断扩大最远边界。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    farthest = 0
    for index, jump in enumerate(nums):
        if index > farthest: return False
        farthest = max(farthest, index + jump)
    return True`),
      solution("从后向前缩目标", "若某位置可以跳到当前目标，就把它设为新的目标，最终目标应回到下标零。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    goal = len(nums) - 1
    for index in range(len(nums) - 2, -1, -1):
        if index + nums[index] >= goal: goal = index
    return goal == 0`)
    ]
  });

  add({
    id: "jump-game-ii", number: 45, title: "跳跃游戏 II", topic: "贪心算法",
    summary: "保证终点可达，返回从起点跳到最后位置所需的最少跳跃次数。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["把当前一跳能到达的范围看成一层。", "扫描到本层边界时，必须进行下一跳并更新新边界。"],
    tests: [
      { label: "两步到达", args: [[2,3,1,1,4]], expected: 2 },
      { label: "首步直接到达", args: [[3,1,1,1]], expected: 1 }
    ],
    solutions: [
      solution("分层最远边界", "在当前跳跃覆盖区间内收集下一层最远位置，到达边界时增加跳数。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    jumps = current_end = farthest = 0
    for index in range(len(nums) - 1):
        farthest = max(farthest, index + nums[index])
        if index == current_end:
            jumps += 1; current_end = farthest
    return jumps`),
      solution("反向选择最早前驱", "从终点反向寻找最靠左且能到达当前目标的位置，每轮确定上一跳。", "时间 O(n²)，空间 O(1)。", `def solve(nums):
    target, jumps = len(nums) - 1, 0
    while target > 0:
        for index in range(target):
            if index + nums[index] >= target:
                target = index; jumps += 1; break
    return jumps`)
    ]
  });

  add({
    id: "partition-labels", number: 763, title: "划分字母区间", topic: "贪心算法",
    summary: "把字符串尽可能切成更多片段，使每个字符只出现在一个片段中，返回各片段长度。",
    params: "text", signature: "solve(text) → list[int]",
    hints: ["预先记录每个字符最后出现的位置。", "当前片段右边界是片段内所有字符最后位置的最大值。"],
    tests: [
      { label: "三个片段", args: ["ababcbacadefegdehijhklij"], expected: [9,7,8] },
      { label: "字符互相牵连", args: ["eccbbbbdec"], expected: [10] }
    ],
    solutions: [
      solution("最后位置贪心", "扫描时扩展当前片段必须覆盖的最右位置，抵达边界就切分。", "时间 O(n)，空间 O(k)。", `def solve(text):
    last = {char: index for index, char in enumerate(text)}
    result, start, end = [], 0, 0
    for index, char in enumerate(text):
        end = max(end, last[char])
        if index == end:
            result.append(end - start + 1); start = index + 1
    return result`),
      solution("字符区间合并", "为每个字符建立首末位置区间，再按起点顺序合并重叠区间。", "时间 O(n+k log k)，空间 O(k)。", `def solve(text):
    ranges = {}
    for index, char in enumerate(text):
        if char not in ranges: ranges[char] = [index, index]
        else: ranges[char][1] = index
    merged = []
    for start, end in sorted(ranges.values()):
        if not merged or start > merged[-1][1]: merged.append([start, end])
        else: merged[-1][1] = max(merged[-1][1], end)
    return [end - start + 1 for start, end in merged]`)
    ]
  });

  // 动态规划
  add({
    id: "pascals-triangle", number: 118, title: "杨辉三角", topic: "动态规划",
    summary: "生成杨辉三角的前 n 行，每行首尾为一，内部元素等于上一行相邻两数之和。",
    params: "row_count", signature: "solve(row_count) → list[list[int]]",
    hints: ["第 row 行包含 row+1 个元素。", "内部位置 col 来自上一行 col-1 与 col。"],
    tests: [
      { label: "五行", args: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
      { label: "一行", args: [1], expected: [[1]] }
    ],
    solutions: [
      solution("逐行递推", "新行首尾填一，中间读取上一行两个相邻元素。", "时间 O(n²)，空间 O(n²)。", `def solve(row_count):
    triangle = []
    for row in range(row_count):
        current = [1] * (row + 1)
        for col in range(1, row):
            current[col] = triangle[-1][col - 1] + triangle[-1][col]
        triangle.append(current)
    return triangle`),
      solution("相邻和拼接", "每一行等于上一行左右补零后逐位相加。", "时间 O(n²)，空间 O(n²)。", `def solve(row_count):
    triangle = []
    row = [1]
    for _ in range(row_count):
        triangle.append(row)
        row = [left + right for left, right in zip([0] + row, row + [0])]
    return triangle`)
    ]
  });

  add({
    id: "house-robber", number: 198, title: "打家劫舍", topic: "动态规划",
    summary: "相邻房屋不能同时选择，返回从非负金额列表中能取得的最大总额。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["处理当前房屋时，只比较跳过它与选择它两种状态。", "选择当前房屋必须接在前两间房的最优答案后。"],
    tests: [
      { label: "隔间选择", args: [[1,2,3,1]], expected: 4 },
      { label: "中间组合", args: [[2,7,9,3,1]], expected: 12 }
    ],
    solutions: [
      solution("滚动状态", "previous 表示前一位置最优，before_previous 表示前两位置最优。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    before_previous = previous = 0
    for value in nums:
        before_previous, previous = previous, max(previous, before_previous + value)
    return previous`),
      solution("完整 DP 表", "dp[i] 记录处理前 i 间房后的最大金额。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    dp = [0] * (len(nums) + 1)
    if nums: dp[1] = nums[0]
    for i in range(2, len(nums) + 1):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])
    return dp[-1]`)
    ]
  });

  add({
    id: "perfect-squares", number: 279, title: "完全平方数", topic: "动态规划",
    summary: "返回若干完全平方数相加得到 n 时所需的最少项数。",
    params: "n", signature: "solve(n) → int",
    hints: ["状态 dp[value] 从所有不超过 value 的平方数转移。", "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"],
    tests: [
      { label: "三个平方数", args: [12], expected: 3 },
      { label: "两个平方数", args: [13], expected: 2 }
    ],
    solutions: [
      solution("一维动态规划", "dp[value] 等于所有 dp[value-square]+1 的最小值。", "时间 O(n√n)，空间 O(n)。", `def solve(n):
    dp = [0] + [n] * n
    squares = [value * value for value in range(1, int(n ** 0.5) + 1)]
    for value in range(1, n + 1):
        for square in squares:
            if square > value: break
            dp[value] = min(dp[value], dp[value - square] + 1)
    return dp[n]`),
      solution("余数广度优先", "每层从当前余数减去一个平方数，首次到达零的层数就是最少项数。", "时间 O(n√n)，空间 O(n)。", `from collections import deque

def solve(n):
    squares = [value * value for value in range(1, int(n ** 0.5) + 1)]
    queue, seen, steps = deque([n]), {n}, 0
    while queue:
        steps += 1
        for _ in range(len(queue)):
            remaining = queue.popleft()
            for square in squares:
                next_value = remaining - square
                if next_value == 0: return steps
                if next_value < 0: break
                if next_value not in seen: seen.add(next_value); queue.append(next_value)`)
    ]
  });

  add({
    id: "coin-change", number: 322, title: "零钱兑换", topic: "动态规划",
    summary: "给定不同面额和目标金额，返回凑出目标所需的最少硬币数；无法凑出返回 -1。",
    params: "coins, amount", signature: "solve(coins, amount) → int",
    hints: ["dp[value] 从 dp[value-coin]+1 转移。", "硬币可无限使用，所以按金额递增更新。"],
    tests: [
      { label: "十一元", args: [[1,2,5], 11], expected: 3 },
      { label: "无法凑出", args: [[2], 3], expected: -1 }
    ],
    solutions: [
      solution("金额动态规划", "逐个金额尝试所有不超过它的硬币，并取最少数量。", "时间 O(amount·coins)，空间 O(amount)。", `def solve(coins, amount):
    dp = [amount + 1] * (amount + 1); dp[0] = 0
    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value: dp[value] = min(dp[value], dp[value - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]`),
      solution("金额广度优先", "从零开始每层增加一枚硬币，首次到达目标金额时层数最小。", "时间 O(amount·coins)，空间 O(amount)。", `from collections import deque

def solve(coins, amount):
    if amount == 0: return 0
    queue, seen, steps = deque([0]), {0}, 0
    while queue:
        steps += 1
        for _ in range(len(queue)):
            current = queue.popleft()
            for coin in coins:
                next_value = current + coin
                if next_value == amount: return steps
                if next_value < amount and next_value not in seen:
                    seen.add(next_value); queue.append(next_value)
    return -1`)
    ]
  });

  add({
    id: "word-break", number: 139, title: "单词拆分", topic: "动态规划",
    summary: "判断字符串能否由词典中的一个或多个单词依次拼接而成，词典单词可重复使用。",
    params: "text, words", signature: "solve(text, words) → bool",
    hints: ["dp[end] 表示前 end 个字符能否被拆分。", "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"],
    tests: [
      { label: "重复使用单词", args: ["applepenapple", ["apple","pen"]], expected: true },
      { label: "无法完整拆分", args: ["catsandog", ["cats","dog","sand","and","cat"]], expected: false }
    ],
    solutions: [
      solution("前缀动态规划", "从每个可达起点尝试词典单词，标记新的可达终点。", "时间 O(n²)，空间 O(n)。", `def solve(text, words):
    dictionary = set(words); reachable = [False] * (len(text) + 1); reachable[0] = True
    for end in range(1, len(text) + 1):
        for start in range(end):
            if reachable[start] and text[start:end] in dictionary:
                reachable[end] = True; break
    return reachable[-1]`),
      solution("可达下标广搜", "把下标视作节点，若后续片段是词典单词就连到新的下标。", "时间 O(n·words·wordLength)，空间 O(n)。", `from collections import deque

def solve(text, words):
    queue, seen = deque([0]), {0}
    while queue:
        start = queue.popleft()
        for word in words:
            end = start + len(word)
            if text.startswith(word, start):
                if end == len(text): return True
                if end not in seen: seen.add(end); queue.append(end)
    return len(text) == 0`)
    ]
  });

  add({
    id: "longest-increasing-subsequence", number: 300, title: "最长递增子序列", topic: "动态规划",
    summary: "返回整数列表中严格递增子序列的最大长度，子序列元素无需连续。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["tails[length-1] 保存该长度递增子序列可能达到的最小尾值。", "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"],
    tests: [
      { label: "多次起伏", args: [[10,9,2,5,3,7,101,18]], expected: 4 },
      { label: "全部相等", args: [[7,7,7,7]], expected: 1 }
    ],
    solutions: [
      solution("耐心排序尾值", "用二分把当前值放到第一个不小于它的尾值位置，tails 长度即答案。", "时间 O(n log n)，空间 O(n)。", `from bisect import bisect_left

def solve(nums):
    tails = []
    for value in nums:
        index = bisect_left(tails, value)
        if index == len(tails): tails.append(value)
        else: tails[index] = value
    return len(tails)`),
      solution("二次动态规划", "dp[i] 从所有更小的前驱 j 转移，表示以 i 结尾的最长长度。", "时间 O(n²)，空间 O(n)。", `def solve(nums):
    if not nums: return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`)
    ]
  });

  add({
    id: "maximum-product-subarray", number: 152, title: "乘积最大子数组", topic: "动态规划",
    summary: "返回非空连续子数组能够得到的最大乘积。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["负数会交换最大乘积与最小乘积的角色。", "每个位置要同时维护以此结尾的最大和最小乘积。"],
    tests: [
      { label: "负数转正", args: [[2,3,-2,4]], expected: 6 },
      { label: "零切断区间", args: [[-2,0,-1]], expected: 0 }
    ],
    solutions: [
      solution("最大最小双状态", "当前值与它乘以前一最大、前一最小的三个候选共同决定新状态。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    current_max = current_min = best = nums[0]
    for value in nums[1:]:
        previous_max = current_max
        current_max = max(value, value * current_max, value * current_min)
        current_min = min(value, value * previous_max, value * current_min)
        best = max(best, current_max)
    return best`),
      solution("枚举起点乘积", "固定每个起点并向右累乘，作为动态规划方法的直观基线。", "时间 O(n²)，空间 O(1)。", `def solve(nums):
    best = nums[0]
    for left in range(len(nums)):
        product = 1
        for right in range(left, len(nums)):
            product *= nums[right]
            best = max(best, product)
    return best`)
    ]
  });

  add({
    id: "partition-equal-subset-sum", number: 416, title: "分割等和子集", topic: "动态规划",
    summary: "判断正整数列表能否划分为元素和相等的两个子集。",
    params: "nums", signature: "solve(nums) → bool",
    hints: ["总和为奇数时必然失败。", "问题等价于能否选出和为总和一半的子集。"],
    tests: [
      { label: "可以平分", args: [[1,5,11,5]], expected: true },
      { label: "不能平分", args: [[1,2,3,5]], expected: false }
    ],
    solutions: [
      solution("一维 0-1 背包", "容量倒序更新，避免同一数字在一轮中被重复使用。", "时间 O(n·sum)，空间 O(sum)。", `def solve(nums):
    total = sum(nums)
    if total % 2: return False
    target = total // 2
    reachable = [False] * (target + 1); reachable[0] = True
    for value in nums:
        for current in range(target, value - 1, -1):
            reachable[current] = reachable[current] or reachable[current - value]
    return reachable[target]`),
      solution("可达和集合", "每读一个数字，把已有可达和与加上当前值后的新和合并。", "时间 O(n·sum)，空间 O(sum)。", `def solve(nums):
    total = sum(nums)
    if total % 2: return False
    target = total // 2; reachable = {0}
    for value in nums:
        reachable |= {current + value for current in reachable if current + value <= target}
        if target in reachable: return True
    return False`)
    ]
  });

  add({
    id: "longest-valid-parentheses", number: 32, title: "最长有效括号", topic: "动态规划",
    summary: "返回只含圆括号的字符串中，最长连续合法括号片段的长度。",
    params: "text", signature: "solve(text) → int",
    hints: ["栈底保存最近一个无法匹配的右括号位置。", "动态规划只在当前位置为右括号时可能更新。"],
    tests: [
      { label: "尾部最长", args: [")()())"], expected: 4 },
      { label: "嵌套片段", args: ["()(())"], expected: 6 }
    ],
    solutions: [
      solution("下标栈", "栈保存未匹配左括号下标，哨兵保存当前合法片段之前的边界。", "时间 O(n)，空间 O(n)。", `def solve(text):
    stack, best = [-1], 0
    for index, char in enumerate(text):
        if char == '(': stack.append(index)
        else:
            stack.pop()
            if not stack: stack.append(index)
            else: best = max(best, index - stack[-1])
    return best`),
      solution("结尾长度动态规划", "dp[i] 表示以 i 结尾的最长合法长度，根据前一字符或跨过前段后的匹配位置转移。", "时间 O(n)，空间 O(n)。", `def solve(text):
    dp = [0] * len(text); best = 0
    for i in range(1, len(text)):
        if text[i] != ')': continue
        if text[i - 1] == '(':
            dp[i] = 2 + (dp[i - 2] if i >= 2 else 0)
        else:
            match = i - dp[i - 1] - 1
            if match >= 0 and text[match] == '(':
                dp[i] = dp[i - 1] + 2 + (dp[match - 1] if match >= 1 else 0)
        best = max(best, dp[i])
    return best`)
    ]
  });

  // 多维动态规划
  add({
    id: "unique-paths", number: 62, title: "不同路径", topic: "多维动态规划",
    summary: "机器人只能向右或向下移动，返回从 m×n 网格左上角到右下角的不同路径数量。",
    params: "rows, cols", signature: "solve(rows, cols) → int",
    hints: ["到达一个格子的路径数来自上方与左方之和。", "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"],
    tests: [
      { label: "三行七列", args: [3,7], expected: 28 },
      { label: "单行", args: [1,5], expected: 1 }
    ],
    solutions: [
      solution("滚动行动态规划", "一维数组保存当前行各列路径数，更新时加上左侧新值。", "时间 O(mn)，空间 O(n)。", `def solve(rows, cols):
    dp = [1] * cols
    for _ in range(1, rows):
        for col in range(1, cols): dp[col] += dp[col - 1]
    return dp[-1]`),
      solution("组合数", "所有路径只是向下与向右步骤的排列，选择其中向下步骤的位置。", "时间 O(min(m,n))，空间 O(1)。", `def solve(rows, cols):
    choose = min(rows - 1, cols - 1)
    total_steps = rows + cols - 2
    result = 1
    for value in range(1, choose + 1):
        result = result * (total_steps - choose + value) // value
    return result`)
    ]
  });

  add({
    id: "minimum-path-sum", number: 64, title: "最小路径和", topic: "多维动态规划",
    summary: "在非负网格中只能向右或向下移动，返回左上角到右下角路径的最小元素和。",
    params: "grid", signature: "solve(grid) → int",
    hints: ["每个格子的最佳代价来自上方和左方的较小值。", "一维数组更新前是上方代价，更新后的前一项是左方代价。"],
    tests: [
      { label: "三阶网格", args: [[[1,3,1],[1,5,1],[4,2,1]]], expected: 7 },
      { label: "两行", args: [[[1,2,3],[4,5,6]]], expected: 12 }
    ],
    solutions: [
      solution("一维滚动状态", "逐行更新到每列的最小代价，边界只可能从一个方向到达。", "时间 O(mn)，空间 O(n)。", `def solve(grid):
    cols = len(grid[0]); dp = [float('inf')] * cols
    dp[0] = 0
    for row in grid:
        for col, value in enumerate(row):
            if col == 0: dp[col] += value
            else: dp[col] = min(dp[col], dp[col - 1]) + value
    return dp[-1]`),
      solution("原地累积", "直接把每个格子改为到达该处的最小路径和。", "时间 O(mn)，空间 O(1)。", `def solve(grid):
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if r == c == 0: continue
            top = grid[r - 1][c] if r else float('inf')
            left = grid[r][c - 1] if c else float('inf')
            grid[r][c] += min(top, left)
    return grid[-1][-1]`)
    ]
  });

  add({
    id: "longest-palindromic-substring", number: 5, title: "最长回文子串", topic: "多维动态规划",
    summary: "返回字符串中最长的连续回文片段。",
    params: "text", signature: "solve(text) → str",
    hints: ["回文中心可能是一个字符，也可能是两个字符之间。", "区间两端相同且内部是回文时，整个区间也是回文。"],
    tests: [
      { label: "偶数长度回文", args: ["cbbd"], expected: "bb" },
      { label: "完整回文", args: ["abacaba"], expected: "abacaba" }
    ], compare: "longestPalindrome",
    solutions: [
      solution("中心扩展", "从每个单字符中心和双字符中心向两边扩展，并记录最长区间。", "时间 O(n²)，空间 O(1)。", `def solve(text):
    best_start = best_len = 0
    def expand(left, right):
        while left >= 0 and right < len(text) and text[left] == text[right]:
            left -= 1; right += 1
        return left + 1, right - left - 1
    for center in range(len(text)):
        for left, right in ((center, center), (center, center + 1)):
            start, length = expand(left, right)
            if length > best_len: best_start, best_len = start, length
    return text[best_start:best_start + best_len]`),
      solution("区间动态规划", "按起点倒序和终点正序填表，内部区间已知后判断当前区间。", "时间 O(n²)，空间 O(n²)。", `def solve(text):
    n = len(text); palindrome = [[False] * n for _ in range(n)]
    best_start, best_len = 0, 0
    for start in range(n - 1, -1, -1):
        for end in range(start, n):
            palindrome[start][end] = text[start] == text[end] and (end - start < 2 or palindrome[start + 1][end - 1])
            length = end - start + 1
            if palindrome[start][end] and length >= best_len:
                best_start, best_len = start, length
    return text[best_start:best_start + best_len]`)
    ]
  });

  add({
    id: "longest-common-subsequence", number: 1143, title: "最长公共子序列", topic: "多维动态规划",
    summary: "返回两个字符串的最长公共子序列长度，字符在各自字符串中保持相对顺序但无需连续。",
    params: "a, b", signature: "solve(a, b) → int",
    hints: ["字符相同时由左上状态加一。", "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"],
    tests: [
      { label: "保留三个字符", args: ["abcde","ace"], expected: 3 },
      { label: "无公共字符", args: ["abc","def"], expected: 0 }
    ],
    solutions: [
      solution("二维动态规划", "dp[i][j] 表示两个前缀的最长公共子序列长度。", "时间 O(mn)，空间 O(mn)。", `def solve(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]: dp[i][j] = dp[i - 1][j - 1] + 1
            else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[-1][-1]`),
      solution("滚动一维数组", "逐行更新 b 的前缀状态，用 previous 保存被覆盖前的左上值。", "时间 O(mn)，空间 O(n)。", `def solve(a, b):
    dp = [0] * (len(b) + 1)
    for char_a in a:
        diagonal = 0
        for j, char_b in enumerate(b, 1):
            top = dp[j]
            if char_a == char_b: dp[j] = diagonal + 1
            else: dp[j] = max(dp[j], dp[j - 1])
            diagonal = top
    return dp[-1]`)
    ]
  });

  add({
    id: "edit-distance", number: 72, title: "编辑距离", topic: "多维动态规划",
    summary: "返回把一个字符串通过插入、删除或替换单个字符变成另一个字符串的最少操作数。",
    params: "source, target", signature: "solve(source, target) → int",
    hints: ["dp[i][j] 表示两个前缀之间的最小编辑次数。", "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"],
    tests: [
      { label: "三次编辑", args: ["horse","ros"], expected: 3 },
      { label: "空串插入", args: ["","abc"], expected: 3 }
    ],
    solutions: [
      solution("二维编辑表", "初始化空前缀边界，再按尾字符是否相同进行转移。", "时间 O(mn)，空间 O(mn)。", `def solve(source, target):
    dp = [[0] * (len(target) + 1) for _ in range(len(source) + 1)]
    for i in range(len(source) + 1): dp[i][0] = i
    for j in range(len(target) + 1): dp[0][j] = j
    for i in range(1, len(source) + 1):
        for j in range(1, len(target) + 1):
            if source[i - 1] == target[j - 1]: dp[i][j] = dp[i - 1][j - 1]
            else: dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[-1][-1]`),
      solution("滚动行", "只保留上一行，每个位置同时读取上方、左方和左上方。", "时间 O(mn)，空间 O(n)。", `def solve(source, target):
    previous = list(range(len(target) + 1))
    for i, char_source in enumerate(source, 1):
        current = [i]
        for j, char_target in enumerate(target, 1):
            if char_source == char_target: current.append(previous[j - 1])
            else: current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))
        previous = current
    return previous[-1]`)
    ]
  });

  // 技巧
  add({
    id: "single-number", number: 136, title: "只出现一次的数字", topic: "技巧",
    summary: "数组中除一个元素出现一次外，其余都恰好出现两次，返回那个单独元素。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["相同数字异或后为零。", "异或满足交换律，所有成对数字会互相抵消。"],
    tests: [
      { label: "单独元素在中间", args: [[4,1,2,1,2]], expected: 4 },
      { label: "单元素数组", args: [[1]], expected: 1 }
    ],
    solutions: [
      solution("全体异或", "从零开始异或所有元素，成对值抵消后只剩单独值。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    answer = 0
    for value in nums: answer ^= value
    return answer`),
      solution("集合增删", "第一次遇到值时加入集合，第二次遇到时删除，最后只剩单独值。", "时间 O(n)，空间 O(n)。", `def solve(nums):
    unmatched = set()
    for value in nums:
        if value in unmatched: unmatched.remove(value)
        else: unmatched.add(value)
    return unmatched.pop()`)
    ]
  });

  add({
    id: "majority-element", number: 169, title: "多数元素", topic: "技巧",
    summary: "返回数组中出现次数严格超过一半的元素，输入保证该元素存在。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["把多数元素与不同元素两两抵消，最后候选仍是多数元素。", "计数归零时可以更换候选。"],
    tests: [
      { label: "多数在两端", args: [[2,2,1,1,1,2,2]], expected: 2 },
      { label: "三项", args: [[3,2,3]], expected: 3 }
    ],
    solutions: [
      solution("Boyer-Moore 投票", "相同候选加票、不同候选减票；多数元素无法被全部抵消。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    candidate, votes = None, 0
    for value in nums:
        if votes == 0: candidate = value
        votes += 1 if value == candidate else -1
    return candidate`),
      solution("频次统计", "统计所有元素次数并返回频次最大的键。", "时间 O(n)，空间 O(n)。", `from collections import Counter

def solve(nums):
    return Counter(nums).most_common(1)[0][0]`)
    ]
  });

  add({
    id: "sort-colors", number: 75, title: "颜色分类", topic: "技巧",
    summary: "把只含 0、1、2 的列表原地排列为升序，并返回结果。",
    params: "nums", signature: "solve(nums) → nums",
    hints: ["left 左侧全为零，right 右侧全为二。", "遇到二时交换到右侧后，当前位置必须重新检查。"],
    tests: [
      { label: "三种颜色混合", args: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
      { label: "两项逆序", args: [[2,0]], expected: [0,2] }
    ],
    solutions: [
      solution("荷兰国旗三指针", "扫描指针把零交换到左区，把二交换到右区，一自然留在中间。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    left = current = 0; right = len(nums) - 1
    while current <= right:
        if nums[current] == 0:
            nums[left], nums[current] = nums[current], nums[left]; left += 1; current += 1
        elif nums[current] == 2:
            nums[current], nums[right] = nums[right], nums[current]; right -= 1
        else: current += 1
    return nums`),
      solution("计数回写", "统计三种值的数量，再按数量依次覆盖原列表。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    counts = [0, 0, 0]
    for value in nums: counts[value] += 1
    index = 0
    for value, count in enumerate(counts):
        for _ in range(count): nums[index] = value; index += 1
    return nums`)
    ]
  });

  add({
    id: "next-permutation", number: 31, title: "下一个排列", topic: "技巧",
    summary: "把整数列表变为字典序中紧邻的下一个更大排列；若已最大则变为最小排列。",
    params: "nums", signature: "solve(nums) → nums",
    hints: ["从右向左找第一个上升位置作为 pivot。", "用后缀中刚好更大的数交换，再把后缀变为最小升序。"],
    tests: [
      { label: "普通下一排列", args: [[1,2,3]], expected: [1,3,2] },
      { label: "最大排列回绕", args: [[3,2,1]], expected: [1,2,3] }
    ],
    solutions: [
      solution("枢轴交换翻转", "定位最右上升枢轴，与后缀最右且更大的值交换，再翻转递减后缀。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    pivot = len(nums) - 2
    while pivot >= 0 and nums[pivot] >= nums[pivot + 1]: pivot -= 1
    if pivot >= 0:
        successor = len(nums) - 1
        while nums[successor] <= nums[pivot]: successor -= 1
        nums[pivot], nums[successor] = nums[successor], nums[pivot]
    nums[pivot + 1:] = reversed(nums[pivot + 1:])
    return nums`),
      solution("后缀排序", "枢轴与刚好更大的后继交换后，把后缀排序成最小字典序；比原地翻转多用排序。", "时间 O(n log n)，空间 O(n)。", `def solve(nums):
    pivot = len(nums) - 2
    while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:
        pivot -= 1
    if pivot < 0:
        return sorted(nums)
    successor = min((value, index) for index, value in enumerate(nums[pivot + 1:], pivot + 1) if value > nums[pivot])[1]
    nums[pivot], nums[successor] = nums[successor], nums[pivot]
    nums[pivot + 1:] = sorted(nums[pivot + 1:])
    return nums`)
    ]
  });

  add({
    id: "find-the-duplicate-number", number: 287, title: "寻找重复数", topic: "技巧",
    summary: "长度为 n+1 的数组只含 1 到 n，且恰有一个值重复，返回该重复值且不修改输入。",
    params: "nums", signature: "solve(nums) → int",
    hints: ["把下标到 nums[index] 看成链表，重复值是环入口。", "也可二分数值范围，统计不大于中点的元素数量。"],
    tests: [
      { label: "重复二", args: [[1,3,4,2,2]], expected: 2 },
      { label: "重复三", args: [[3,1,3,4,2]], expected: 3 }
    ],
    solutions: [
      solution("Floyd 环入口", "数组映射形成带环链表；快慢指针相遇后从起点同速寻找入口。", "时间 O(n)，空间 O(1)。", `def solve(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]; fast = nums[nums[fast]]
        if slow == fast: break
    seeker = nums[0]
    while seeker != slow:
        seeker = nums[seeker]; slow = nums[slow]
    return seeker`),
      solution("值域二分计数", "若不大于 mid 的元素多于 mid 个，重复值在左半值域，否则在右半。", "时间 O(n log n)，空间 O(1)。", `def solve(nums):
    left, right = 1, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        count = sum(value <= mid for value in nums)
        if count > mid: right = mid
        else: left = mid + 1
    return left`)
    ]
  });

})();
