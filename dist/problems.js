window.PROBLEMS = [
  {
    id: "two-sum",
    number: 1,
    title: "两数之和",
    topic: "哈希",
    level: "起点",
    minutes: 25,
    prerequisites: ["Python 列表", "字典查找"],
    summary: "给定一组整数和一个目标值，找到两个不同位置，使这两个位置上的数字相加正好等于目标值。返回这两个位置。",
    signature: "solve(nums, target) → [i, j]",
    why: "逐对检查需要反复回头寻找另一个数。我们可以把已经见过的数字和位置记下来，让“找另一个数”变成一次字典查询。",
    insight: "读到当前值 x 时，不问“它能和谁配对”，而问“target - x 是否已经出现”。",
    steps: [
      "准备字典 seen：数字作为键，位置作为值。",
      "从左到右读取 x，计算 need = target - x。",
      "若 need 已在 seen 中，立即返回两个位置；否则记录 x。",
      "先查询、后记录，才能保证不会把同一个位置使用两次。"
    ],
    complexity: "时间 O(n)，额外空间 O(n)。",
    trace: [
      ["读到", "6 @ 0"],
      ["需要", "4"],
      ["字典", "{6: 0}"],
      ["命中", "1 + 9"]
    ],
    starter: `def solve(nums, target):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums, target):
    seen = {}

    for index, value in enumerate(nums):
        need = target - value
        if need in seen:
            return [seen[need], index]
        seen[value] = index

    return []`,
    hints: [
      "方向：一边扫描，一边保存已经见过的数字。",
      "关键量：当前数字是 value，需要寻找的是 target - value。",
      "骨架：for index, value in enumerate(nums)，先判断 need in seen，再写入 seen[value]。"
    ],
    tests: [
      { label: "中间位置配对", args: [[6, 1, 9, 3], 10], expected: [1, 2] },
      { label: "首尾位置配对", args: [[4, 7, 2], 6], expected: [0, 2] },
      { label: "两个相同数字", args: [[5, 5], 10], expected: [0, 1] }
    ],
    compare: "exact",
    variant: "如果要求返回数字本身而不是位置，哪些代码不需要改变？先口述，再修改返回值。",
    officialUrl: "https://leetcode.cn/problems/two-sum/"
  },
  {
    id: "move-zeroes",
    number: 283,
    title: "移动零",
    topic: "双指针",
    level: "基础",
    minutes: 25,
    prerequisites: ["列表原地修改", "双指针"],
    summary: "把列表中的所有零移动到末尾，同时保持非零元素原来的相对顺序。本站练习函数返回修改后的列表，便于本地检查。",
    signature: "solve(nums) → nums",
    why: "不断删除和插入会移动大量元素。更稳定的方式是维护一个“下一个非零元素应该放到哪里”的位置。",
    insight: "write 指针始终指向下一个非零元素的落点；扫描指针负责寻找非零元素。",
    steps: [
      "让 write 从 0 开始。",
      "扫描每个 value；遇到非零值就写入 nums[write]，然后 write 加一。",
      "扫描完成后，从 write 到末尾全部填零。",
      "这个过程保留了非零元素被读到的先后顺序。"
    ],
    complexity: "时间 O(n)，额外空间 O(1)。",
    trace: [
      ["输入", "0 4 0 2 7"],
      ["写入", "4 2 7"],
      ["write", "3"],
      ["补零", "4 2 7 0 0"]
    ],
    starter: `def solve(nums):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums):
    write = 0

    for value in nums:
        if value != 0:
            nums[write] = value
            write += 1

    while write < len(nums):
        nums[write] = 0
        write += 1

    return nums`,
    hints: [
      "方向：把所有非零元素稳定地压到列表左侧。",
      "关键量：write 表示下一个非零元素要写入的位置。",
      "骨架：先 for value in nums 写非零值，再 while write < len(nums) 补零。"
    ],
    tests: [
      { label: "零分散出现", args: [[0, 4, 0, 2, 7]], expected: [4, 2, 7, 0, 0] },
      { label: "只有一个零", args: [[1, 0, 2]], expected: [1, 2, 0] },
      { label: "全部是零", args: [[0, 0, 0]], expected: [0, 0, 0] }
    ],
    compare: "exact",
    variant: "如果要把所有负数稳定地移动到末尾，write 指针的含义应怎样改写？",
    officialUrl: "https://leetcode.cn/problems/move-zeroes/"
  },
  {
    id: "longest-substring",
    number: 3,
    title: "无重复字符的最长子串",
    topic: "滑动窗口",
    level: "基础",
    minutes: 30,
    prerequisites: ["字符串", "集合", "双指针"],
    summary: "在一个字符串中，求不含重复字符的连续片段所能达到的最大长度。",
    signature: "solve(s) → int",
    why: "每个起点都重新向右尝试会重复检查大量字符。滑动窗口维护一个始终合法的连续区间，只让左右边界向前移动。",
    insight: "右边界负责扩张；一旦新字符重复，左边界就收缩到窗口重新合法。",
    steps: [
      "用集合 window 保存当前窗口中的字符。",
      "右指针读取字符；若它已存在，就不断移除左端字符并右移 left。",
      "把新字符加入窗口，更新最大长度。",
      "循环不变量：window 始终与 s[left:right+1] 一致且没有重复字符。"
    ],
    complexity: "时间 O(n)，额外空间 O(k)，k 为字符种类数。",
    trace: [
      ["窗口", "abc"],
      ["再读 a", "重复"],
      ["左边收缩", "bca"],
      ["最长", "5"]
    ],
    starter: `def solve(s):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(s):
    window = set()
    left = 0
    best = 0

    for right, char in enumerate(s):
        while char in window:
            window.remove(s[left])
            left += 1
        window.add(char)
        best = max(best, right - left + 1)

    return best`,
    hints: [
      "方向：窗口内始终不允许有重复字符。",
      "关键量：left 是当前合法窗口的左端；right 逐步向右。",
      "骨架：while char in window 时移除 s[left]；随后 add(char) 并更新 right-left+1。"
    ],
    tests: [
      { label: "中间出现重复", args: ["abcaef"], expected: 5 },
      { label: "连续重复", args: ["bbbbb"], expected: 1 },
      { label: "空字符串", args: [""], expected: 0 }
    ],
    compare: "exact",
    variant: "如果问题改成“最多允许一种字符出现两次”，窗口何时需要收缩？集合还够用吗？",
    officialUrl: "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
  },
  {
    id: "valid-parentheses",
    number: 20,
    title: "有效的括号",
    topic: "栈",
    level: "基础",
    minutes: 20,
    prerequisites: ["列表作为栈", "字典映射"],
    summary: "判断一串圆括号、方括号和花括号是否按照正确类型与顺序成对闭合。",
    signature: "solve(s) → bool",
    why: "一个右括号必须匹配最近还没有闭合的左括号。“最近进入、最先离开”正是栈的行为。",
    insight: "左括号入栈；右括号只和栈顶比较。任何类型不符或栈为空都立即失败。",
    steps: [
      "建立右括号到左括号的映射。",
      "遇到左括号就压入栈。",
      "遇到右括号时，检查栈非空且栈顶类型正确，再弹出。",
      "扫描结束后，栈必须为空。"
    ],
    complexity: "时间 O(n)，最坏额外空间 O(n)。",
    trace: [
      ["读取", "{ [ ("],
      ["栈", "{ [ ("],
      ["读取 )", "弹出 ("],
      ["结束", "栈为空"]
    ],
    starter: `def solve(s):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char not in pairs:
            stack.append(char)
        else:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return not stack`,
    hints: [
      "方向：需要记住最近出现、但尚未闭合的左括号。",
      "关键量：stack[-1] 必须等于 pairs[当前右括号]。",
      "骨架：左括号 append；右括号先判断 not stack，再比较并 pop；最后 return not stack。"
    ],
    tests: [
      { label: "三种括号嵌套", args: ["{[()]}"], expected: true },
      { label: "闭合顺序错误", args: ["([)]"], expected: false },
      { label: "仍有左括号", args: ["(()"], expected: false }
    ],
    compare: "exact",
    variant: "如果字符串里允许出现普通字母并应忽略它们，判断分支要如何区分？",
    officialUrl: "https://leetcode.cn/problems/valid-parentheses/"
  },
  {
    id: "merge-lists",
    number: 21,
    title: "合并两个有序链表",
    topic: "链表",
    level: "进阶",
    minutes: 35,
    prerequisites: ["节点引用", "哑节点", "双指针"],
    summary: "把两个升序链表合并成一个新的升序链表。本站输入输出用数组包装，核心合并过程仍操作真实链表节点。",
    signature: "solve(a, b) → list",
    why: "每次只需比较两个链表尚未处理的第一个节点，较小者一定是结果中的下一个节点。",
    insight: "dummy 节点让结果链表永远有一个稳定起点，不必单独处理第一个节点。",
    steps: [
      "建立 dummy 和尾指针 tail。",
      "当两个链表都非空，连接值较小的节点并移动对应指针。",
      "每连接一个节点后移动 tail。",
      "最后把尚未为空的那一段整体接上。"
    ],
    complexity: "时间 O(m+n)，除返回链表外额外空间 O(1)。",
    trace: [
      ["比较", "1 与 2"],
      ["接入", "1"],
      ["继续", "4 与 2"],
      ["尾段", "直接接上"]
    ],
    starter: `class ListNode:
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

def solve(a, b):
    left = from_list(a)
    right = from_list(b)

    # TODO: 写下你的解法
    pass`,
    solution: `class ListNode:
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

def solve(a, b):
    left = from_list(a)
    right = from_list(b)
    dummy = ListNode()
    tail = dummy

    while left and right:
        if left.value <= right.value:
            tail.next = left
            left = left.next
        else:
            tail.next = right
            right = right.next
        tail = tail.next

    tail.next = left if left else right
    return to_list(dummy.next)`,
    hints: [
      "方向：比较两个当前节点，每次把较小者接到结果尾部。",
      "关键量：tail 始终是结果链表的最后一个节点；dummy.next 才是真正头节点。",
      "骨架：while left and right；更新 tail.next、对应指针和 tail；循环后接入剩余链表。"
    ],
    tests: [
      { label: "长度相同", args: [[1, 4, 8], [2, 3, 9]], expected: [1, 2, 3, 4, 8, 9] },
      { label: "一边为空", args: [[], [1, 5]], expected: [1, 5] },
      { label: "包含重复值", args: [[1, 3, 3], [1, 2]], expected: [1, 1, 2, 3, 3] }
    ],
    compare: "exact",
    variant: "如果两个链表按降序排列，比较条件和结果连接过程分别要改哪里？",
    officialUrl: "https://leetcode.cn/problems/merge-two-sorted-lists/"
  },
  {
    id: "tree-inorder",
    number: 94,
    title: "二叉树的中序遍历",
    topic: "二叉树",
    level: "进阶",
    minutes: 30,
    prerequisites: ["递归", "树节点", "深度优先搜索"],
    summary: "按照“左子树 → 当前节点 → 右子树”的顺序访问二叉树，并返回访问到的值。输入使用层序数组，null 表示缺失节点。",
    signature: "solve(values) → list",
    why: "树不是线性结构。递归让每个节点只负责同一件小事：先处理左边，再记录自己，最后处理右边。",
    insight: "递归函数的承诺不是“解决整棵树”，而是“把以当前节点为根的子树按中序追加到 result”。",
    steps: [
      "将层序数组还原成二叉树。",
      "递归函数遇到 None 立即返回。",
      "递归左子树，记录当前值，再递归右子树。",
      "从根节点启动递归并返回 result。"
    ],
    complexity: "时间 O(n)，递归栈最坏 O(n)。",
    trace: [
      ["进入", "节点 1"],
      ["先左", "空"],
      ["记录", "1"],
      ["再右", "2 → 3"]
    ],
    starter: `class TreeNode:
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

    # TODO: 写下你的解法
    pass`,
    solution: `class TreeNode:
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
    result = []

    def visit(node):
        if node is None:
            return
        visit(node.left)
        result.append(node.value)
        visit(node.right)

    visit(root)
    return result`,
    hints: [
      "方向：把“左、根、右”逐字翻译成三行递归逻辑。",
      "关键量：result 是所有递归调用共同追加的列表。",
      "骨架：if node is None: return；visit(node.left)；append；visit(node.right)。"
    ],
    tests: [
      { label: "右子树还有左节点", args: [[1, null, 2, 3]], expected: [1, 3, 2] },
      { label: "完整三层树", args: [[4, 2, 6, 1, 3, 5, 7]], expected: [1, 2, 3, 4, 5, 6, 7] },
      { label: "空树", args: [[]], expected: [] }
    ],
    compare: "exact",
    variant: "如果要改成前序遍历，只移动 result.append(node.value) 这一行即可。它应移动到哪里？",
    officialUrl: "https://leetcode.cn/problems/binary-tree-inorder-traversal/"
  },
  {
    id: "tree-depth",
    number: 104,
    title: "二叉树的最大深度",
    topic: "二叉树",
    level: "进阶",
    minutes: 25,
    prerequisites: ["树节点", "显式栈", "深度状态"],
    summary: "求一棵二叉树从根节点到最远叶子节点所包含的节点数。输入仍使用层序数组。",
    signature: "solve(values) → int",
    why: "每个栈元素同时保存节点与它所在的深度；弹出节点时更新最大值，再把孩子按深度加一压栈。",
    insight: "显式保存深度状态可以保持递归定义的清晰度，同时避开退化树触发 Python 递归上限。",
    steps: [
      "空树直接返回 0。",
      "把根节点与深度 1 一起压栈。",
      "每次弹出节点，用其深度更新答案。",
      "把非空孩子连同 depth + 1 压栈。"
    ],
    complexity: "时间 O(n)，显式栈最坏 O(n)。",
    trace: [
      ["叶子", "深度 1"],
      ["父节点", "1 + max"],
      ["左右", "取较大"],
      ["空树", "0"]
    ],
    starter: `class TreeNode:
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

    # TODO: 写下你的解法
    pass`,
    solution: `class TreeNode:
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
    best = 0
    stack = [(root, 1)]
    while stack:
        node, depth = stack.pop()
        best = max(best, depth)
        if node.left:
            stack.append((node.left, depth + 1))
        if node.right:
            stack.append((node.right, depth + 1))
    return best`,
    hints: [
      "方向：遍历树时，把节点所在深度一起保存。",
      "关键量：根节点深度从 1 开始。",
      "骨架：stack 保存 (node, depth)，孩子压入 depth + 1。"
    ],
    tests: [
      { label: "左右深度不同", args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { label: "只有右孩子", args: [[1, null, 2]], expected: 2 },
      { label: "空树", args: [[]], expected: 0 }
    ],
    compare: "exact",
    variant: "如果要求最小深度，能否直接把 max 改成 min？先找出只有一个孩子时的反例。",
    officialUrl: "https://leetcode.cn/problems/maximum-depth-of-binary-tree/"
  },
  {
    id: "number-of-islands",
    number: 200,
    title: "岛屿数量",
    topic: "图搜索",
    level: "进阶",
    minutes: 35,
    prerequisites: ["二维列表", "DFS", "访问标记"],
    summary: "网格中的 1 表示陆地、0 表示水。上下左右相连的陆地属于同一座岛，计算岛屿总数。",
    signature: "solve(grid) → int",
    why: "看到一块尚未访问的陆地，就发现了一座新岛；随后一次搜索可以把整座岛全部标记，避免重复计数。",
    insight: "外层循环负责“发现新连通块”，显式栈 DFS 负责“消掉这个连通块的所有未访问节点”，避免 Python 递归深度限制。",
    steps: [
      "遍历每个网格位置。",
      "遇到 1 时，岛屿数加一，把它标为 0 并压入栈。",
      "持续弹出陆地，检查上下左右四个邻居。",
      "邻居为 1 时立即标为 0 并入栈，避免重复访问。"
    ],
    complexity: "时间 O(mn)，显式栈最坏 O(mn)。",
    trace: [
      ["发现 1", "count + 1"],
      ["DFS", "淹没相邻 1"],
      ["继续扫描", "不重复"],
      ["结束", "连通块数"]
    ],
    starter: `def solve(grid):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    islands = 0
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 1:
                islands += 1
                grid[row][col] = 0
                stack = [(row, col)]
                while stack:
                    current_row, current_col = stack.pop()
                    for next_row, next_col in ((current_row - 1, current_col), (current_row + 1, current_col), (current_row, current_col - 1), (current_row, current_col + 1)):
                        if 0 <= next_row < rows and 0 <= next_col < cols and grid[next_row][next_col] == 1:
                            grid[next_row][next_col] = 0
                            stack.append((next_row, next_col))

    return islands`,
    hints: [
      "方向：每发现一块未访问陆地，就计数一次并遍历整座岛。",
      "关键量：可以直接把访问过的 1 改成 0，省去额外 visited 集合。",
      "骨架：双层循环发现 1；置 0 后压栈，循环扩展四个方向。"
    ],
    tests: [
      { label: "两座分离小岛", args: [[[1, 1, 0], [0, 1, 0], [1, 0, 0]]], expected: 2 },
      { label: "全部连通", args: [[[1, 1], [1, 1]]], expected: 1 },
      { label: "没有陆地", args: [[[0, 0], [0, 0]]], expected: 0 }
    ],
    compare: "exact",
    variant: "如果对角线相邻也算连通，需要新增哪四个方向？复杂度会改变吗？",
    officialUrl: "https://leetcode.cn/problems/number-of-islands/"
  },
  {
    id: "rotated-search",
    number: 33,
    title: "搜索旋转排序数组",
    topic: "二分查找",
    level: "进阶",
    minutes: 35,
    prerequisites: ["二分查找", "区间判断"],
    summary: "一个原本严格递增的数组在某个位置旋转后，仍要求在对数时间内找到目标值的位置；找不到返回 -1。",
    signature: "solve(nums, target) → int",
    why: "数组整体不再有序，但每次取中点后，左半边或右半边至少有一边仍然有序。这足以排除一半范围。",
    insight: "先判断哪一半有序，再判断 target 是否落在这段有序区间里；不是直接猜旋转点。",
    steps: [
      "使用闭区间 left 与 right。",
      "检查 nums[mid] 是否为目标。",
      "若 nums[left] <= nums[mid]，左半边有序；否则右半边有序。",
      "判断目标是否位于有序半边，保留它或排除它。"
    ],
    complexity: "时间 O(log n)，额外空间 O(1)。",
    trace: [
      ["数组", "4 5 6 1 2 3"],
      ["mid", "6"],
      ["左半有序", "4..6"],
      ["目标 2", "去右边"]
    ],
    starter: `def solve(nums, target):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,
    hints: [
      "方向：每轮至少有一半仍保持递增。",
      "关键量：用 nums[left] <= nums[mid] 判断左半边是否有序。",
      "骨架：在有序半边内用两个边界判断 target 是否落入，然后移动 left 或 right。"
    ],
    tests: [
      { label: "目标在旋转后半段", args: [[4, 5, 6, 1, 2, 3], 2], expected: 4 },
      { label: "目标不存在", args: [[6, 7, 1, 2, 3, 4, 5], 8], expected: -1 },
      { label: "只有一个元素", args: [[1], 1], expected: 0 }
    ],
    compare: "exact",
    variant: "如果数组中允许重复值，nums[left] == nums[mid] 时为何难以判断哪边有序？",
    officialUrl: "https://leetcode.cn/problems/search-in-rotated-sorted-array/"
  },
  {
    id: "top-k-frequent",
    number: 347,
    title: "前 K 个高频元素",
    topic: "堆与桶",
    level: "进阶",
    minutes: 35,
    prerequisites: ["频次统计", "桶排序"],
    summary: "从整数列表中找出出现次数最高的 k 个不同数字。返回顺序不限。",
    signature: "solve(nums, k) → list",
    why: "排序所有不同数字可行，但我们真正关心的是频次。频次不会超过数组长度，可以把相同频次的数字放进同一个桶。",
    insight: "桶的下标就是出现次数；从最高频次向下取数，收集到 k 个就停止。",
    steps: [
      "用字典统计每个数字出现次数。",
      "建立长度为 n+1 的 buckets，其中 buckets[f] 保存频次为 f 的数字。",
      "从最高频次向 1 倒序扫描。",
      "逐个加入结果，达到 k 个立即返回。"
    ],
    complexity: "时间 O(n)，额外空间 O(n)。",
    trace: [
      ["频次", "2→3, 5→2"],
      ["桶 3", "[2]"],
      ["桶 2", "[5]"],
      ["倒序", "取前 k 个"]
    ],
    starter: `def solve(nums, k):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums, k):
    counts = {}
    for value in nums:
        counts[value] = counts.get(value, 0) + 1

    buckets = [[] for _ in range(len(nums) + 1)]
    for value, frequency in counts.items():
        buckets[frequency].append(value)

    result = []
    for frequency in range(len(buckets) - 1, 0, -1):
        for value in buckets[frequency]:
            result.append(value)
            if len(result) == k:
                return result

    return result`,
    hints: [
      "方向：频次最大只会是 len(nums)，可以用频次作为数组下标。",
      "关键量：buckets[frequency] 是所有恰好出现 frequency 次的数字。",
      "骨架：先遍历 counts.items() 填桶，再 range(len(buckets)-1, 0, -1) 倒序收集。"
    ],
    tests: [
      { label: "两个明显高频值", args: [[2, 2, 2, 5, 5, 8], 2], expected: [2, 5] },
      { label: "只取一个", args: [[7, 7, 1, 2], 1], expected: [7] },
      { label: "全部都需要", args: [[4, 4, 3], 2], expected: [4, 3] }
    ],
    compare: "unordered",
    variant: "如果要求按“频次降序、数字升序”返回，桶内和最终结果需要增加什么规则？",
    officialUrl: "https://leetcode.cn/problems/top-k-frequent-elements/"
  },
  {
    id: "subsets",
    number: 78,
    title: "子集",
    topic: "回溯",
    level: "进阶",
    minutes: 35,
    prerequisites: ["递归", "路径与选择", "列表复制"],
    summary: "给定一组互不相同的整数，返回所有可能的子集，包括空集与原集合。返回顺序不限。",
    signature: "solve(nums) → list[list]",
    why: "对每个数字都有“选”与“不选”两种决定。回溯用一条路径表示已经做出的选择，并系统地枚举后续可能。",
    insight: "每到一个递归节点，当前 path 本身就是一个合法子集，所以先记录，再从 start 继续选择。",
    steps: [
      "准备 path 和 result。",
      "进入 backtrack(start) 时，先复制 path 加入结果。",
      "从 start 起逐个选择 nums[index]，递归探索后续。",
      "递归返回后弹出刚才选择的数字，恢复现场。"
    ],
    complexity: "共有 2^n 个子集，时间和输出空间均为 O(n·2^n)。",
    trace: [
      ["path", "[]"],
      ["选择 1", "[1]"],
      ["再选 2", "[1,2]"],
      ["撤销", "回到 [1]"]
    ],
    starter: `def solve(nums):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums):
    result = []
    path = []

    def backtrack(start):
        result.append(path.copy())

        for index in range(start, len(nums)):
            path.append(nums[index])
            backtrack(index + 1)
            path.pop()

    backtrack(0)
    return result`,
    hints: [
      "方向：每个递归节点都代表一个已经完成的子集。",
      "关键量：start 防止回头重复选择；path.copy() 防止结果里的列表一起变化。",
      "骨架：记录 path.copy()；for index in range(start, len(nums))；append、递归 index+1、pop。"
    ],
    tests: [
      { label: "两个元素", args: [[1, 2]], expected: [[], [1], [2], [1, 2]] },
      { label: "一个元素", args: [[5]], expected: [[], [5]] },
      { label: "空集合", args: [[]], expected: [[]] }
    ],
    compare: "nestedUnordered",
    variant: "如果输入允许重复数字，并要求结果不重复，排序后应在哪一层跳过相邻重复选择？",
    officialUrl: "https://leetcode.cn/problems/subsets/"
  },
  {
    id: "climbing-stairs",
    number: 70,
    title: "爬楼梯",
    topic: "动态规划",
    level: "进阶",
    minutes: 25,
    prerequisites: ["递推关系", "状态压缩"],
    summary: "每次可以向上走 1 级或 2 级，计算到达第 n 级共有多少种不同走法。",
    signature: "solve(n) → int",
    why: "到达第 n 级的最后一步只能来自 n-1 或 n-2，因此问题可以由两个更小问题的答案组成。",
    insight: "状态定义比公式更重要：dp[i] 表示“到达第 i 级的走法数量”。定义清楚后，转移就是 dp[i-1] + dp[i-2]。",
    steps: [
      "定义基础情况：到第 1 级有 1 种，到第 2 级有 2 种。",
      "从第 3 级开始计算当前答案。",
      "每次只依赖前两个状态，因此不必保存整个数组。",
      "滚动更新 prev2 与 prev1。"
    ],
    complexity: "时间 O(n)，额外空间 O(1)。",
    trace: [
      ["第 1 级", "1"],
      ["第 2 级", "2"],
      ["第 3 级", "1 + 2 = 3"],
      ["第 5 级", "8"]
    ],
    starter: `def solve(n):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(n):
    if n <= 2:
        return n

    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current

    return prev1`,
    hints: [
      "方向：第 i 级只能从 i-1 或 i-2 走来。",
      "关键量：prev2 和 prev1 分别保存前两个楼层的走法数。",
      "骨架：current = prev1 + prev2；随后 prev2, prev1 = prev1, current。"
    ],
    tests: [
      { label: "最小情况", args: [1], expected: 1 },
      { label: "五级楼梯", args: [5], expected: 8 },
      { label: "较长楼梯", args: [8], expected: 34 }
    ],
    compare: "exact",
    variant: "如果一次还可以走 3 级，状态转移需要增加哪一项？需要保留几个历史状态？",
    officialUrl: "https://leetcode.cn/problems/climbing-stairs/"
  },
  {
    id: "maximum-subarray",
    number: 53,
    title: "最大子数组和",
    topic: "动态规划",
    level: "进阶",
    minutes: 30,
    prerequisites: ["连续子数组", "局部状态"],
    summary: "在整数列表中找出和最大的非空连续片段，返回这个最大和。",
    signature: "solve(nums) → int",
    why: "对每个位置枚举所有起点会重复求和。只要知道“以上一个位置结尾的最佳和”，就能决定当前值是接在后面还是重新开始。",
    insight: "current 的定义是“必须以当前元素结尾的最大和”，它与全局 best 是两个不同问题。",
    steps: [
      "用第一个元素初始化 current 和 best。",
      "读到 value 时，current 在 value 与 current + value 中取较大者。",
      "用 current 更新全局 best。",
      "遍历结束后返回 best。"
    ],
    complexity: "时间 O(n)，额外空间 O(1)。",
    trace: [
      ["current", "必须在此结束"],
      ["选择", "接上或重开"],
      ["best", "历史最大"],
      ["负前缀", "直接丢弃"]
    ],
    starter: `def solve(nums):
    # TODO: 写下你的解法
    pass`,
    solution: `def solve(nums):
    current = nums[0]
    best = nums[0]

    for value in nums[1:]:
        current = max(value, current + value)
        best = max(best, current)

    return best`,
    hints: [
      "方向：到当前位置时，只需决定继续上一段还是从当前值重新开始。",
      "关键量：current 必须以当前元素结尾；best 可以在任何位置结尾。",
      "骨架：current = max(value, current + value)，随后 best = max(best, current)。"
    ],
    tests: [
      { label: "负数之间的最佳片段", args: [[-3, 4, -1, 2, -5, 3]], expected: 5 },
      { label: "全是负数", args: [[-8, -2, -6]], expected: -2 },
      { label: "单个元素", args: [[7]], expected: 7 }
    ],
    compare: "exact",
    variant: "如果还要返回最佳片段的起止位置，current 重新开始时需要同步记录什么？",
    officialUrl: "https://leetcode.cn/problems/maximum-subarray/"
  }
];
