(function () {
  "use strict";

  const variants = {
    "two-sum": {
      name: "枚举基线",
      idea: "固定第一个位置，再向右寻找能与它组成目标值的位置。它适合作为哈希解法的复杂度基线。",
      steps: ["枚举左端位置 i。", "只在 i 右侧枚举 j，避免重复和自配对。", "命中时立即返回两个位置。"],
      complexity: "时间 O(n²)，额外空间 O(1)。",
      pitfalls: ["内层必须从 i + 1 开始。", "大输入下会明显慢于哈希表。"],
      code: `def solve(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`
    },
    "move-zeroes": {
      name: "双指针交换",
      idea: "write 指向下一个非零落点；read 找到非零元素后与 write 位置交换。",
      steps: ["让 write 指向首个待填位置。", "read 扫描非零值。", "交换 nums[write] 与 nums[read] 后推进 write。"],
      complexity: "时间 O(n)，额外空间 O(1)。",
      pitfalls: ["write 与 read 相同时交换无害。", "只在读到非零值时推进 write。"],
      code: `def solve(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1
    return nums`
    },
    "longest-substring": {
      name: "最近位置跳跃",
      idea: "记录字符最近出现的位置，重复时直接把左边界跳到上次位置之后。",
      steps: ["维护 last_seen 映射。", "重复字符位于当前窗口内时，跳过它。", "更新当前位置与窗口长度。"],
      complexity: "时间 O(n)，额外空间 O(k)。",
      pitfalls: ["left 只能向右移动，要使用 max。", "先计算新 left，再更新字符位置。"],
      code: `def solve(s):
    last_seen = {}
    left = 0
    best = 0

    for right, char in enumerate(s):
        if char in last_seen:
            left = max(left, last_seen[char] + 1)
        last_seen[char] = right
        best = max(best, right - left + 1)

    return best`
    },
    "valid-parentheses": {
      name: "预存期待括号",
      idea: "遇到左括号时，把未来期待看到的右括号压栈；右括号只需与栈顶直接比较。",
      steps: ["建立左括号到右括号的映射。", "左括号入栈其对应的右括号。", "右括号必须等于弹出的期待值。"],
      complexity: "时间 O(n)，额外空间 O(n)。",
      pitfalls: ["弹栈前先判断栈是否为空。", "扫描结束仍需确认栈为空。"],
      code: `def solve(s):
    expected = {'(': ')', '[': ']', '{': '}'}
    stack = []

    for char in s:
        if char in expected:
            stack.append(expected[char])
        elif not stack or stack.pop() != char:
            return False

    return not stack`
    },
    "merge-lists": {
      name: "递归归并",
      idea: "较小的头节点必然是结果头节点，再递归合并它的后继与另一条链表。",
      steps: ["任一链表为空时返回另一条。", "选较小头节点。", "把它的 next 指向剩余部分的递归结果。"],
      complexity: "时间 O(m+n)，递归栈 O(m+n)。",
      pitfalls: ["递归版会占用调用栈。", "返回前必须连接选中节点的 next。"],
      code: `class ListNode:
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
    return result

def merge(left, right):
    if left is None:
        return right
    if right is None:
        return left
    if left.value <= right.value:
        left.next = merge(left.next, right)
        return left
    right.next = merge(left, right.next)
    return right

def solve(a, b):
    return to_list(merge(from_list(a), from_list(b)))`
    },
    "tree-inorder": {
      name: "显式栈迭代",
      idea: "不断向左压栈；无法再向左时弹出节点记录，再转向它的右子树。",
      steps: ["当前节点非空时持续压入并向左。", "弹出栈顶并记录。", "把当前节点切换到其右孩子。"],
      complexity: "时间 O(n)，额外空间 O(h)。",
      pitfalls: ["外层条件是 current 或 stack。", "记录节点后再转向右子树。"],
      code: `class TreeNode:
    def __init__(self, value=0):
        self.value = value
        self.left = None
        self.right = None

def build_tree(values):
    if not values:
        return None
    nodes = [None if value is None else TreeNode(value) for value in values]
    kids = nodes[::-1]
    root = kids.pop()
    for node in nodes:
        if node:
            if kids: node.left = kids.pop()
            if kids: node.right = kids.pop()
    return root

def solve(values):
    current = build_tree(values)
    stack = []
    result = []

    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.value)
        current = current.right

    return result`
    },
    "tree-depth": {
      name: "层序遍历",
      idea: "每完成一整层遍历，深度加一；队列中始终保存下一层待处理节点。",
      steps: ["空树直接返回 0。", "逐层消费当前队列长度个节点。", "把非空孩子加入队列并增加层数。"],
      complexity: "时间 O(n)，额外空间 O(w)，w 为最大层宽。",
      pitfalls: ["一层的节点数要在循环开始时固定。", "不要在遍历当前层时直接用变化后的队列长度。"],
      code: `from collections import deque

class TreeNode:
    def __init__(self, value=0):
        self.value = value
        self.left = None
        self.right = None

def build_tree(values):
    if not values:
        return None
    nodes = [None if value is None else TreeNode(value) for value in values]
    kids = nodes[::-1]
    root = kids.pop()
    for node in nodes:
        if node:
            if kids: node.left = kids.pop()
            if kids: node.right = kids.pop()
    return root

def solve(values):
    root = build_tree(values)
    if root is None:
        return 0
    queue = deque([root])
    depth = 0
    while queue:
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        depth += 1
    return depth`
    },
    "number-of-islands": {
      name: "队列广度优先",
      idea: "发现新陆地时计数，并用队列把同一连通块的所有陆地标为水。",
      steps: ["扫描网格找到未访问陆地。", "计数后立即标记并入队。", "逐个扩展上下左右的陆地。"],
      complexity: "时间 O(mn)，额外空间最坏 O(mn)。",
      pitfalls: ["入队时立即标记，避免重复入队。", "空网格需要单独处理。"],
      code: `from collections import deque

def solve(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] != 1:
                continue
            islands += 1
            grid[row][col] = 0
            queue = deque([(row, col)])
            while queue:
                r, c = queue.popleft()
                for nr, nc in ((r-1,c), (r+1,c), (r,c-1), (r,c+1)):
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        grid[nr][nc] = 0
                        queue.append((nr, nc))
    return islands`
    },
    "rotated-search": {
      name: "先找旋转点",
      idea: "先二分找到最小值位置，再把逻辑下标映射到旋转后的真实下标。",
      steps: ["二分比较 mid 与 right 找到 pivot。", "在逻辑有序数组上做普通二分。", "用 (mid + pivot) % n 映射真实位置。"],
      complexity: "时间 O(log n)，额外空间 O(1)。",
      pitfalls: ["空数组直接返回 -1。", "该写法依赖数组元素互不相同。"],
      code: `def solve(nums, target):
    if not nums:
        return -1
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    pivot = left

    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        real = (mid + pivot) % len(nums)
        if nums[real] == target:
            return real
        if nums[real] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
    },
    "top-k-frequent": {
      name: "最小堆保留 K 个",
      idea: "统计频次后维护容量为 k 的最小堆，堆中始终保留当前频次最高的 k 个数字。",
      steps: ["统计每个数字的频次。", "把频次和数字压入最小堆。", "堆超过 k 时弹出最低频元素。"],
      complexity: "时间 O(n log k)，额外空间 O(n)。",
      pitfalls: ["堆中元组的第一项必须是频次。", "结果顺序不保证固定。"],
      code: `import heapq

def solve(nums, k):
    counts = {}
    for value in nums:
        counts[value] = counts.get(value, 0) + 1

    heap = []
    for value, frequency in counts.items():
        heapq.heappush(heap, (frequency, value))
        if len(heap) > k:
            heapq.heappop(heap)

    return [value for _, value in heap]`
    },
    "subsets": {
      name: "二进制枚举",
      idea: "用 n 位二进制掩码表示每个数字是否被选择，一共枚举 2ⁿ 个掩码。",
      steps: ["枚举 0 到 2ⁿ-1。", "检查每一位是否为 1。", "把对应数字加入当前子集。"],
      complexity: "时间 O(n·2ⁿ)，额外输出空间 O(n·2ⁿ)。",
      pitfalls: ["位 i 对应 nums[i]。", "零掩码自然产生空集。"],
      code: `def solve(nums):
    result = []
    for mask in range(1 << len(nums)):
        subset = []
        for index, value in enumerate(nums):
            if mask & (1 << index):
                subset.append(value)
        result.append(subset)
    return result`
    },
    "climbing-stairs": {
      name: "完整 DP 表",
      idea: "显式保存每一级的答案，便于观察 dp[i] = dp[i-1] + dp[i-2] 的状态转移。",
      steps: ["建立长度 n+1 的 dp。", "写入 1 级与 2 级的基础值。", "从 3 到 n 逐项递推。"],
      complexity: "时间 O(n)，额外空间 O(n)。",
      pitfalls: ["n <= 2 时直接返回。", "dp 下标表示楼层而不是循环次数。"],
      code: `def solve(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for step in range(3, n + 1):
        dp[step] = dp[step - 1] + dp[step - 2]
    return dp[n]`
    },
    "maximum-subarray": {
      name: "前缀和减最小前缀",
      idea: "以当前位置结尾的最佳区间和，等于当前前缀和减去它之前出现过的最小前缀和。",
      steps: ["累计当前前缀和。", "用 prefix - min_prefix 更新答案。", "更新历史最小前缀和。"],
      complexity: "时间 O(n)，额外空间 O(1)。",
      pitfalls: ["先更新 best，再更新 min_prefix。", "best 需用首元素初始化以处理全负数。"],
      code: `def solve(nums):
    prefix = 0
    min_prefix = 0
    best = nums[0]

    for value in nums:
        prefix += value
        best = max(best, prefix - min_prefix)
        min_prefix = min(min_prefix, prefix)

    return best`
    }
  };

  window.PROBLEMS = (window.PROBLEMS || []).map((problem) => {
    const primary = {
      id: "primary",
      name: `${problem.topic}主解法`,
      idea: problem.insight,
      steps: problem.steps,
      complexity: problem.complexity,
      pitfalls: (problem.hints || []).slice(-2),
      code: problem.solution,
      source: { label: "站内独立实现" }
    };
    const alternate = variants[problem.id]
      ? { id: "alternate", ...variants[problem.id], source: { label: "站内独立实现" } }
      : null;
    return { ...problem, solutions: [primary, alternate].filter(Boolean) };
  });
})();
