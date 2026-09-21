/*
 * 回写精选 150 内容包
 * 题目元数据仅用于定位外部练习；摘要、提示、代码与测试由回写独立编写。
 * 不含 LeetCode／力扣官方题面、约束、示例、图片或题解。
 * 详情见 ./CONTENT_NOTICE.txt 与仓库 docs/CONTENT_PROVENANCE.md。
 */
window.PROBLEMS = [
  {
    "id": "two-sum",
    "number": 1,
    "title": "两数之和",
    "topic": "哈希",
    "level": "起点",
    "minutes": 25,
    "prerequisites": [
      "Python 列表",
      "字典查找"
    ],
    "summary": "给定一组整数和一个目标值，找到两个不同位置，使这两个位置上的数字相加正好等于目标值。返回这两个位置。",
    "signature": "solve(nums, target) → [i, j]",
    "why": "逐对检查需要反复回头寻找另一个数。我们可以把已经见过的数字和位置记下来，让“找另一个数”变成一次字典查询。",
    "insight": "读到当前值 x 时，不问“它能和谁配对”，而问“target - x 是否已经出现”。",
    "steps": [
      "准备字典 seen：数字作为键，位置作为值。",
      "从左到右读取 x，计算 need = target - x。",
      "若 need 已在 seen 中，立即返回两个位置；否则记录 x。",
      "先查询、后记录，才能保证不会把同一个位置使用两次。"
    ],
    "complexity": "时间 O(n)，额外空间 O(n)。",
    "trace": [
      [
        "读到",
        "6 @ 0"
      ],
      [
        "需要",
        "4"
      ],
      [
        "字典",
        "{6: 0}"
      ],
      [
        "命中",
        "1 + 9"
      ]
    ],
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums, target):\n    seen = {}\n\n    for index, value in enumerate(nums):\n        need = target - value\n        if need in seen:\n            return [seen[need], index]\n        seen[value] = index\n\n    return []",
    "hints": [
      "方向：一边扫描，一边保存已经见过的数字。",
      "关键量：当前数字是 value，需要寻找的是 target - value。",
      "骨架：for index, value in enumerate(nums)，先判断 need in seen，再写入 seen[value]。"
    ],
    "tests": [
      {
        "label": "互补值后出现",
        "args": [
          [
            8,
            14,
            5,
            12
          ],
          19
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "label": "负数参与配对",
        "args": [
          [
            -7,
            4,
            13,
            2
          ],
          6
        ],
        "expected": [
          0,
          2
        ]
      }
    ],
    "compare": "exact",
    "variant": "如果要求返回数字本身而不是位置，哪些代码不需要改变？先口述，再修改返回值。",
    "solutions": [
      {
        "id": "primary",
        "name": "哈希主解法",
        "idea": "读到当前值 x 时，不问“它能和谁配对”，而问“target - x 是否已经出现”。",
        "steps": [
          "准备字典 seen：数字作为键，位置作为值。",
          "从左到右读取 x，计算 need = target - x。",
          "若 need 已在 seen 中，立即返回两个位置；否则记录 x。",
          "先查询、后记录，才能保证不会把同一个位置使用两次。"
        ],
        "complexity": "时间 O(n)，额外空间 O(n)。",
        "pitfalls": [
          "关键量：当前数字是 value，需要寻找的是 target - value。",
          "骨架：for index, value in enumerate(nums)，先判断 need in seen，再写入 seen[value]。"
        ],
        "code": "def solve(nums, target):\n    seen = {}\n\n    for index, value in enumerate(nums):\n        need = target - value\n        if need in seen:\n            return [seen[need], index]\n        seen[value] = index\n\n    return []",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/two-sum/"
        }
      },
      {
        "id": "alternate",
        "name": "枚举基线",
        "idea": "固定第一个位置，再向右寻找能与它组成目标值的位置。它适合作为哈希解法的复杂度基线。",
        "steps": [
          "枚举左端位置 i。",
          "只在 i 右侧枚举 j，避免重复和自配对。",
          "命中时立即返回两个位置。"
        ],
        "complexity": "时间 O(n²)，额外空间 O(1)。",
        "pitfalls": [
          "内层必须从 i + 1 开始。",
          "大输入下会明显慢于哈希表。"
        ],
        "code": "def solve(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/two-sum/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/two-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 1
  },
  {
    "id": "group-anagrams",
    "number": 49,
    "title": "字母异位词分组",
    "topic": "哈希",
    "summary": "把由相同字符及相同次数构成的字符串归到同一组，组内顺序不作要求。",
    "signature": "solve(words) → list[list[str]]",
    "starter": "def solve(words):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "为每个字符串构造与排列顺序无关的键。",
      "排序后的字符串或 26 位计数都可以作为键。"
    ],
    "tests": [
      {
        "label": "三组自编单词",
        "args": [
          [
            "arc",
            "elbow",
            "car",
            "below",
            "state",
            "taste"
          ]
        ],
        "expected": [
          [
            "arc",
            "car"
          ],
          [
            "elbow",
            "below"
          ],
          [
            "state",
            "taste"
          ]
        ]
      },
      {
        "label": "重复单词归组",
        "args": [
          [
            "noon",
            "onon",
            "noon",
            "sun"
          ]
        ],
        "expected": [
          [
            "noon",
            "onon",
            "noon"
          ],
          [
            "sun"
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "排序键",
        "idea": "把每个单词排序后的结果作为哈希键。",
        "complexity": "时间 O(n·k log k)，空间 O(nk)。",
        "code": "def solve(words):\n    groups = {}\n    for word in words:\n        key = ''.join(sorted(word))\n        groups.setdefault(key, []).append(word)\n    return list(groups.values())",
        "steps": [
          "逐词排序。",
          "按排序结果聚合。"
        ],
        "pitfalls": [
          "排序后的字符串或 26 位计数都可以作为键。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/group-anagrams/"
        }
      },
      {
        "id": "solution-2",
        "name": "字符计数键",
        "idea": "用 26 个字符频次构成不可变元组，避免逐词排序。",
        "complexity": "时间 O(nk)，空间 O(nk)。",
        "code": "def solve(words):\n    groups = {}\n    for word in words:\n        counts = [0] * 26\n        for char in word:\n            counts[ord(char) - 97] += 1\n        groups.setdefault(tuple(counts), []).append(word)\n    return list(groups.values())",
        "steps": [
          "统计频次。",
          "把列表转成元组作为键。"
        ],
        "pitfalls": [
          "排序后的字符串或 26 位计数都可以作为键。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/group-anagrams/"
        }
      }
    ],
    "compare": "nestedUnordered",
    "referenceUrl": "https://leetcode.cn/problems/group-anagrams/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 2
  },
  {
    "id": "longest-consecutive-sequence",
    "number": 128,
    "title": "最长连续序列",
    "topic": "哈希",
    "summary": "在无序整数列表中，求数值连续递增的最长序列长度，元素在原列表中的位置无需连续。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "只有不存在 x-1 的数字才是序列起点。",
      "集合查询可以把扩展序列变成常数级成员判断。"
    ],
    "tests": [
      {
        "label": "连续段含负数",
        "args": [
          [
            7,
            -2,
            5,
            -1,
            6,
            0,
            12
          ]
        ],
        "expected": 3
      },
      {
        "label": "两段长度竞争",
        "args": [
          [
            30,
            31,
            4,
            5,
            6,
            32,
            33
          ]
        ],
        "expected": 4
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "集合找起点",
        "idea": "只从没有前驱的数字开始向右扩展，每个值至多被完整访问一次。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    values = set(nums)\n    best = 0\n    for value in values:\n        if value - 1 in values:\n            continue\n        end = value\n        while end in values:\n            end += 1\n        best = max(best, end - value)\n    return best",
        "steps": [
          "只有不存在 x-1 的数字才是序列起点。",
          "集合查询可以把扩展序列变成常数级成员判断。"
        ],
        "pitfalls": [
          "集合查询可以把扩展序列变成常数级成员判断。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-consecutive-sequence/"
        }
      },
      {
        "id": "solution-2",
        "name": "排序扫描",
        "idea": "排序后忽略重复值，并统计相邻差为 1 的连续长度。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(nums):\n    if not nums:\n        return 0\n    ordered = sorted(nums)\n    best = current = 1\n    for index in range(1, len(ordered)):\n        if ordered[index] == ordered[index - 1]:\n            continue\n        if ordered[index] == ordered[index - 1] + 1:\n            current += 1\n        else:\n            current = 1\n        best = max(best, current)\n    return best",
        "steps": [
          "只有不存在 x-1 的数字才是序列起点。",
          "集合查询可以把扩展序列变成常数级成员判断。"
        ],
        "pitfalls": [
          "集合查询可以把扩展序列变成常数级成员判断。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-consecutive-sequence/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/longest-consecutive-sequence/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 3
  },
  {
    "id": "container-with-most-water",
    "number": 11,
    "title": "盛最多水的容器",
    "topic": "双指针",
    "summary": "从若干竖线中选择两条作为容器边界，返回能容纳水的最大面积。",
    "signature": "solve(height) → int",
    "starter": "def solve(height):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "面积由较短边和两边距离共同决定。",
      "移动较长边不可能改善当前短板。"
    ],
    "tests": [
      {
        "label": "最佳边界在内部",
        "args": [
          [
            2,
            9,
            4,
            1,
            8,
            3
          ]
        ],
        "expected": 24
      },
      {
        "label": "高度逐步递增",
        "args": [
          [
            1,
            3,
            5,
            7,
            9
          ]
        ],
        "expected": 10
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "首尾双指针",
        "idea": "从最宽容器开始，每次只移动较短的一侧。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(height):\n    left, right = 0, len(height) - 1\n    best = 0\n    while left < right:\n        best = max(best, min(height[left], height[right]) * (right - left))\n        if height[left] <= height[right]:\n            left += 1\n        else:\n            right -= 1\n    return best",
        "steps": [
          "面积由较短边和两边距离共同决定。",
          "移动较长边不可能改善当前短板。"
        ],
        "pitfalls": [
          "移动较长边不可能改善当前短板。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/container-with-most-water/"
        }
      },
      {
        "id": "solution-2",
        "name": "跳过无效高度",
        "idea": "移动短边时连续跳过不高于旧短边的线，减少无效面积计算。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(height):\n    left, right = 0, len(height) - 1\n    best = 0\n    while left < right:\n        short = min(height[left], height[right])\n        best = max(best, short * (right - left))\n        if height[left] <= height[right]:\n            while left < right and height[left] <= short:\n                left += 1\n        else:\n            while left < right and height[right] <= short:\n                right -= 1\n    return best",
        "steps": [
          "面积由较短边和两边距离共同决定。",
          "移动较长边不可能改善当前短板。"
        ],
        "pitfalls": [
          "移动较长边不可能改善当前短板。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/container-with-most-water/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/container-with-most-water/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 4
  },
  {
    "id": "3sum",
    "number": 15,
    "title": "三数之和",
    "topic": "双指针",
    "summary": "找出所有和为零且不重复的三元组，返回值组合而不是位置。",
    "signature": "solve(nums) → list[list[int]]",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先排序，固定一个数后把问题转成两数之和。",
      "固定值和双指针移动后都要跳过重复值。"
    ],
    "tests": [
      {
        "label": "含两组零和",
        "args": [
          [
            -5,
            -2,
            0,
            2,
            3,
            5
          ]
        ],
        "expected": [
          [
            -5,
            0,
            5
          ],
          [
            -5,
            2,
            3
          ],
          [
            -2,
            0,
            2
          ]
        ]
      },
      {
        "label": "重复负值去重",
        "args": [
          [
            -2,
            -2,
            0,
            1,
            1,
            2
          ]
        ],
        "expected": [
          [
            -2,
            0,
            2
          ],
          [
            -2,
            1,
            1
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "排序加双指针",
        "idea": "固定最左值，在其右侧用相向指针寻找互补的两数。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "def solve(nums):\n    nums = sorted(nums)\n    result = []\n    for i in range(len(nums) - 2):\n        if i and nums[i] == nums[i - 1]:\n            continue\n        left, right = i + 1, len(nums) - 1\n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            if total < 0:\n                left += 1\n            elif total > 0:\n                right -= 1\n            else:\n                result.append([nums[i], nums[left], nums[right]])\n                left += 1\n                right -= 1\n                while left < right and nums[left] == nums[left - 1]: left += 1\n                while left < right and nums[right] == nums[right + 1]: right -= 1\n    return result",
        "steps": [
          "先排序，固定一个数后把问题转成两数之和。",
          "固定值和双指针移动后都要跳过重复值。"
        ],
        "pitfalls": [
          "固定值和双指针移动后都要跳过重复值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/3sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "固定值加哈希",
        "idea": "固定第一个数，在右侧扫描时用集合寻找所需的第三个数。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "def solve(nums):\n    result = set()\n    nums.sort()\n    for i in range(len(nums) - 2):\n        seen = set()\n        for j in range(i + 1, len(nums)):\n            need = -nums[i] - nums[j]\n            if need in seen:\n                result.add((nums[i], need, nums[j]))\n            seen.add(nums[j])\n    return [list(item) for item in result]",
        "steps": [
          "先排序，固定一个数后把问题转成两数之和。",
          "固定值和双指针移动后都要跳过重复值。"
        ],
        "pitfalls": [
          "固定值和双指针移动后都要跳过重复值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/3sum/"
        }
      }
    ],
    "compare": "nestedUnordered",
    "referenceUrl": "https://leetcode.cn/problems/3sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 5
  },
  {
    "id": "trapping-rain-water",
    "number": 42,
    "title": "接雨水",
    "topic": "双指针",
    "summary": "给定柱子高度，计算下雨后所有凹槽能够接住的水量。",
    "signature": "solve(height) → int",
    "starter": "def solve(height):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "某位置水位由左右最高柱的较小者决定。",
      "双指针可以边维护边界最高值边结算较短侧。"
    ],
    "tests": [
      {
        "label": "两侧高墙",
        "args": [
          [
            5,
            1,
            2,
            1,
            5
          ]
        ],
        "expected": 11
      },
      {
        "label": "阶梯式凹槽",
        "args": [
          [
            3,
            0,
            1,
            4,
            0,
            2
          ]
        ],
        "expected": 7
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双指针边界",
        "idea": "较低一侧的水位已由该侧最大值确定，可以立即结算并向内移动。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(height):\n    left, right = 0, len(height) - 1\n    left_max = right_max = water = 0\n    while left < right:\n        if height[left] <= height[right]:\n            left_max = max(left_max, height[left])\n            water += left_max - height[left]\n            left += 1\n        else:\n            right_max = max(right_max, height[right])\n            water += right_max - height[right]\n            right -= 1\n    return water",
        "steps": [
          "某位置水位由左右最高柱的较小者决定。",
          "双指针可以边维护边界最高值边结算较短侧。"
        ],
        "pitfalls": [
          "双指针可以边维护边界最高值边结算较短侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/trapping-rain-water/"
        }
      },
      {
        "id": "solution-2",
        "name": "单调栈按层结算",
        "idea": "栈保存递减柱子；遇到更高柱时弹出槽底，按高度差和宽度计算横向水层。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(height):\n    stack = []\n    water = 0\n    for index, value in enumerate(height):\n        while stack and value > height[stack[-1]]:\n            bottom = stack.pop()\n            if not stack:\n                break\n            width = index - stack[-1] - 1\n            bounded = min(value, height[stack[-1]]) - height[bottom]\n            water += width * bounded\n        stack.append(index)\n    return water",
        "steps": [
          "某位置水位由左右最高柱的较小者决定。",
          "双指针可以边维护边界最高值边结算较短侧。"
        ],
        "pitfalls": [
          "双指针可以边维护边界最高值边结算较短侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/trapping-rain-water/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/trapping-rain-water/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 6
  },
  {
    "id": "move-zeroes",
    "number": 283,
    "title": "移动零",
    "topic": "双指针",
    "level": "基础",
    "minutes": 25,
    "prerequisites": [
      "列表原地修改",
      "双指针"
    ],
    "summary": "把列表中的所有零移动到末尾，同时保持非零元素原来的相对顺序。本站练习函数返回修改后的列表，便于本地检查。",
    "signature": "solve(nums) → nums",
    "why": "不断删除和插入会移动大量元素。更稳定的方式是维护一个“下一个非零元素应该放到哪里”的位置。",
    "insight": "write 指针始终指向下一个非零元素的落点；扫描指针负责寻找非零元素。",
    "steps": [
      "让 write 从 0 开始。",
      "扫描每个 value；遇到非零值就写入 nums[write]，然后 write 加一。",
      "扫描完成后，从 write 到末尾全部填零。",
      "这个过程保留了非零元素被读到的先后顺序。"
    ],
    "complexity": "时间 O(n)，额外空间 O(1)。",
    "trace": [
      [
        "输入",
        "0 4 0 2 7"
      ],
      [
        "写入",
        "4 2 7"
      ],
      [
        "write",
        "3"
      ],
      [
        "补零",
        "4 2 7 0 0"
      ]
    ],
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums):\n    write = 0\n\n    for value in nums:\n        if value != 0:\n            nums[write] = value\n            write += 1\n\n    while write < len(nums):\n        nums[write] = 0\n        write += 1\n\n    return nums",
    "hints": [
      "方向：把所有非零元素稳定地压到列表左侧。",
      "关键量：write 表示下一个非零元素要写入的位置。",
      "骨架：先 for value in nums 写非零值，再 while write < len(nums) 补零。"
    ],
    "tests": [
      {
        "label": "连续零与尾部零",
        "args": [
          [
            6,
            0,
            0,
            3,
            0
          ]
        ],
        "expected": [
          6,
          3,
          0,
          0,
          0
        ]
      },
      {
        "label": "无需移动",
        "args": [
          [
            9,
            4,
            2
          ]
        ],
        "expected": [
          9,
          4,
          2
        ]
      }
    ],
    "compare": "exact",
    "variant": "如果要把所有负数稳定地移动到末尾，write 指针的含义应怎样改写？",
    "solutions": [
      {
        "id": "primary",
        "name": "双指针主解法",
        "idea": "write 指针始终指向下一个非零元素的落点；扫描指针负责寻找非零元素。",
        "steps": [
          "让 write 从 0 开始。",
          "扫描每个 value；遇到非零值就写入 nums[write]，然后 write 加一。",
          "扫描完成后，从 write 到末尾全部填零。",
          "这个过程保留了非零元素被读到的先后顺序。"
        ],
        "complexity": "时间 O(n)，额外空间 O(1)。",
        "pitfalls": [
          "关键量：write 表示下一个非零元素要写入的位置。",
          "骨架：先 for value in nums 写非零值，再 while write < len(nums) 补零。"
        ],
        "code": "def solve(nums):\n    write = 0\n\n    for value in nums:\n        if value != 0:\n            nums[write] = value\n            write += 1\n\n    while write < len(nums):\n        nums[write] = 0\n        write += 1\n\n    return nums",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/move-zeroes/"
        }
      },
      {
        "id": "alternate",
        "name": "双指针交换",
        "idea": "write 指向下一个非零落点；read 找到非零元素后与 write 位置交换。",
        "steps": [
          "让 write 指向首个待填位置。",
          "read 扫描非零值。",
          "交换 nums[write] 与 nums[read] 后推进 write。"
        ],
        "complexity": "时间 O(n)，额外空间 O(1)。",
        "pitfalls": [
          "write 与 read 相同时交换无害。",
          "只在读到非零值时推进 write。"
        ],
        "code": "def solve(nums):\n    write = 0\n    for read in range(len(nums)):\n        if nums[read] != 0:\n            nums[write], nums[read] = nums[read], nums[write]\n            write += 1\n    return nums",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/move-zeroes/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/move-zeroes/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 7
  },
  {
    "id": "longest-substring",
    "number": 3,
    "title": "无重复字符的最长子串",
    "topic": "滑动窗口",
    "level": "基础",
    "minutes": 30,
    "prerequisites": [
      "字符串",
      "集合",
      "双指针"
    ],
    "summary": "在一个字符串中，求不含重复字符的连续片段所能达到的最大长度。",
    "signature": "solve(s) → int",
    "why": "每个起点都重新向右尝试会重复检查大量字符。滑动窗口维护一个始终合法的连续区间，只让左右边界向前移动。",
    "insight": "右边界负责扩张；一旦新字符重复，左边界就收缩到窗口重新合法。",
    "steps": [
      "用集合 window 保存当前窗口中的字符。",
      "右指针读取字符；若它已存在，就不断移除左端字符并右移 left。",
      "把新字符加入窗口，更新最大长度。",
      "循环不变量：window 始终与 s[left:right+1] 一致且没有重复字符。"
    ],
    "complexity": "时间 O(n)，额外空间 O(k)，k 为字符种类数。",
    "trace": [
      [
        "窗口",
        "abc"
      ],
      [
        "再读 a",
        "重复"
      ],
      [
        "左边收缩",
        "bca"
      ],
      [
        "最长",
        "5"
      ]
    ],
    "starter": "def solve(s):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(s):\n    window = set()\n    left = 0\n    best = 0\n\n    for right, char in enumerate(s):\n        while char in window:\n            window.remove(s[left])\n            left += 1\n        window.add(char)\n        best = max(best, right - left + 1)\n\n    return best",
    "hints": [
      "方向：窗口内始终不允许有重复字符。",
      "关键量：left 是当前合法窗口的左端；right 逐步向右。",
      "骨架：while char in window 时移除 s[left]；随后 add(char) 并更新 right-left+1。"
    ],
    "tests": [
      {
        "label": "末尾形成最长窗口",
        "args": [
          "dvpfghd"
        ],
        "expected": 6
      },
      {
        "label": "交错重复",
        "args": [
          "tmmzux"
        ],
        "expected": 4
      }
    ],
    "compare": "exact",
    "variant": "如果问题改成“最多允许一种字符出现两次”，窗口何时需要收缩？集合还够用吗？",
    "solutions": [
      {
        "id": "primary",
        "name": "滑动窗口主解法",
        "idea": "右边界负责扩张；一旦新字符重复，左边界就收缩到窗口重新合法。",
        "steps": [
          "用集合 window 保存当前窗口中的字符。",
          "右指针读取字符；若它已存在，就不断移除左端字符并右移 left。",
          "把新字符加入窗口，更新最大长度。",
          "循环不变量：window 始终与 s[left:right+1] 一致且没有重复字符。"
        ],
        "complexity": "时间 O(n)，额外空间 O(k)，k 为字符种类数。",
        "pitfalls": [
          "关键量：left 是当前合法窗口的左端；right 逐步向右。",
          "骨架：while char in window 时移除 s[left]；随后 add(char) 并更新 right-left+1。"
        ],
        "code": "def solve(s):\n    window = set()\n    left = 0\n    best = 0\n\n    for right, char in enumerate(s):\n        while char in window:\n            window.remove(s[left])\n            left += 1\n        window.add(char)\n        best = max(best, right - left + 1)\n\n    return best",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
        }
      },
      {
        "id": "alternate",
        "name": "最近位置跳跃",
        "idea": "记录字符最近出现的位置，重复时直接把左边界跳到上次位置之后。",
        "steps": [
          "维护 last_seen 映射。",
          "重复字符位于当前窗口内时，跳过它。",
          "更新当前位置与窗口长度。"
        ],
        "complexity": "时间 O(n)，额外空间 O(k)。",
        "pitfalls": [
          "left 只能向右移动，要使用 max。",
          "先计算新 left，再更新字符位置。"
        ],
        "code": "def solve(s):\n    last_seen = {}\n    left = 0\n    best = 0\n\n    for right, char in enumerate(s):\n        if char in last_seen:\n            left = max(left, last_seen[char] + 1)\n        last_seen[char] = right\n        best = max(best, right - left + 1)\n\n    return best",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/longest-substring-without-repeating-characters/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 8
  },
  {
    "id": "find-all-anagrams-in-a-string",
    "number": 438,
    "title": "找到字符串中所有字母异位词",
    "topic": "滑动窗口",
    "summary": "返回文本中所有长度与模式串相同、且字符频次完全一致的窗口起点。",
    "signature": "solve(text, pattern) → list[int]",
    "starter": "def solve(text, pattern):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "窗口长度固定为模式串长度。",
      "维护 26 位频次数组或缺失字符计数。"
    ],
    "tests": [
      {
        "label": "异位窗口分散",
        "args": [
          "cabxxbac",
          "abc"
        ],
        "expected": [
          0,
          5
        ]
      },
      {
        "label": "重复字符窗口",
        "args": [
          "baaab",
          "aab"
        ],
        "expected": [
          0,
          2
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "定长频次数组",
        "idea": "窗口每右移一步，加入新字符并移出过期字符，再比较频次。",
        "complexity": "时间 O(26n)，空间 O(1)。",
        "code": "def solve(text, pattern):\n    if len(pattern) > len(text):\n        return []\n    need = [0] * 26\n    window = [0] * 26\n    for char in pattern: need[ord(char) - 97] += 1\n    result = []\n    for right, char in enumerate(text):\n        window[ord(char) - 97] += 1\n        if right >= len(pattern):\n            window[ord(text[right - len(pattern)]) - 97] -= 1\n        if window == need:\n            result.append(right - len(pattern) + 1)\n    return result",
        "steps": [
          "窗口长度固定为模式串长度。",
          "维护 26 位频次数组或缺失字符计数。"
        ],
        "pitfalls": [
          "维护 26 位频次数组或缺失字符计数。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/"
        }
      },
      {
        "id": "solution-2",
        "name": "差异计数",
        "idea": "记录窗口与目标之间还缺多少字符，窗口满足时无需比较完整数组。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "def solve(text, pattern):\n    need = {}\n    for char in pattern: need[char] = need.get(char, 0) + 1\n    missing = len(pattern)\n    left = 0\n    result = []\n    for right, char in enumerate(text):\n        if need.get(char, 0) > 0: missing -= 1\n        need[char] = need.get(char, 0) - 1\n        if right - left + 1 > len(pattern):\n            old = text[left]\n            need[old] = need.get(old, 0) + 1\n            if need[old] > 0: missing += 1\n            left += 1\n        if missing == 0: result.append(left)\n    return result",
        "steps": [
          "窗口长度固定为模式串长度。",
          "维护 26 位频次数组或缺失字符计数。"
        ],
        "pitfalls": [
          "维护 26 位频次数组或缺失字符计数。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/find-all-anagrams-in-a-string/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 9
  },
  {
    "id": "minimum-window-substring",
    "number": 76,
    "title": "最小覆盖子串",
    "topic": "子串",
    "summary": "在文本中找出包含目标串全部字符及其次数的最短连续片段，不存在则返回空串。",
    "signature": "solve(text, target) → str",
    "starter": "def solve(text, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "右边界负责满足条件，满足后左边界尽量收缩。",
      "用 missing 记录还缺少多少个字符实例。"
    ],
    "tests": [
      {
        "label": "最短覆盖在中部",
        "args": [
          "ZZAXBYCQQ",
          "ABC"
        ],
        "expected": "AXBYC"
      },
      {
        "label": "目标含重复字符",
        "args": [
          "bbaaac",
          "aac"
        ],
        "expected": "aac"
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "缺失计数滑窗",
        "idea": "扩张时减少缺失量；完全覆盖后移动左端并记录最短窗口。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "def solve(text, target):\n    need = {}\n    for char in target: need[char] = need.get(char, 0) + 1\n    missing = len(target)\n    left = 0\n    best_start, best_len = 0, float('inf')\n    for right, char in enumerate(text):\n        if need.get(char, 0) > 0: missing -= 1\n        need[char] = need.get(char, 0) - 1\n        while missing == 0:\n            if right - left + 1 < best_len:\n                best_start, best_len = left, right - left + 1\n            old = text[left]\n            need[old] = need.get(old, 0) + 1\n            if need[old] > 0: missing += 1\n            left += 1\n    return '' if best_len == float('inf') else text[best_start:best_start + best_len]",
        "steps": [
          "右边界负责满足条件，满足后左边界尽量收缩。",
          "用 missing 记录还缺少多少个字符实例。"
        ],
        "pitfalls": [
          "用 missing 记录还缺少多少个字符实例。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/minimum-window-substring/"
        }
      },
      {
        "id": "solution-2",
        "name": "有效字符种类",
        "idea": "分别记录目标频次和窗口频次，以满足的字符种类数判断覆盖完成。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import Counter\n\ndef solve(text, target):\n    need = Counter(target)\n    window = Counter()\n    required = len(need)\n    formed = left = 0\n    best = (float('inf'), 0)\n    for right, char in enumerate(text):\n        window[char] += 1\n        if char in need and window[char] == need[char]: formed += 1\n        while formed == required:\n            if right - left + 1 < best[0]: best = (right - left + 1, left)\n            old = text[left]\n            window[old] -= 1\n            if old in need and window[old] < need[old]: formed -= 1\n            left += 1\n    return '' if best[0] == float('inf') else text[best[1]:best[1] + best[0]]",
        "steps": [
          "右边界负责满足条件，满足后左边界尽量收缩。",
          "用 missing 记录还缺少多少个字符实例。"
        ],
        "pitfalls": [
          "用 missing 记录还缺少多少个字符实例。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/minimum-window-substring/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/minimum-window-substring/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 10
  },
  {
    "id": "sliding-window-maximum",
    "number": 239,
    "title": "滑动窗口最大值",
    "topic": "子串",
    "summary": "窗口按固定宽度从左向右移动，返回每个位置窗口中的最大值。",
    "signature": "solve(nums, k) → list[int]",
    "starter": "def solve(nums, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "单调队列只保存仍可能成为最大值的下标。",
      "新值进入时移除队尾更小值，窗口移动时移除过期队首。"
    ],
    "tests": [
      {
        "label": "宽度为二",
        "args": [
          [
            8,
            1,
            4,
            7,
            2
          ],
          2
        ],
        "expected": [
          8,
          4,
          7,
          7
        ]
      },
      {
        "label": "窗口覆盖全段",
        "args": [
          [
            -4,
            -1,
            -7,
            -2
          ],
          4
        ],
        "expected": [
          -1
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "单调队列",
        "idea": "队列内下标对应值单调递减，队首始终是当前窗口最大值。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import deque\n\ndef solve(nums, k):\n    queue = deque()\n    result = []\n    for right, value in enumerate(nums):\n        while queue and nums[queue[-1]] <= value:\n            queue.pop()\n        queue.append(right)\n        if queue[0] <= right - k:\n            queue.popleft()\n        if right >= k - 1:\n            result.append(nums[queue[0]])\n    return result",
        "steps": [
          "单调队列只保存仍可能成为最大值的下标。",
          "新值进入时移除队尾更小值，窗口移动时移除过期队首。"
        ],
        "pitfalls": [
          "新值进入时移除队尾更小值，窗口移动时移除过期队首。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sliding-window-maximum/"
        }
      },
      {
        "id": "solution-2",
        "name": "最大堆懒删除",
        "idea": "堆保存负值和下标，读取前弹出已经离开窗口的元素。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "import heapq\n\ndef solve(nums, k):\n    heap = []\n    result = []\n    for right, value in enumerate(nums):\n        heapq.heappush(heap, (-value, right))\n        while heap[0][1] <= right - k:\n            heapq.heappop(heap)\n        if right >= k - 1:\n            result.append(-heap[0][0])\n    return result",
        "steps": [
          "单调队列只保存仍可能成为最大值的下标。",
          "新值进入时移除队尾更小值，窗口移动时移除过期队首。"
        ],
        "pitfalls": [
          "新值进入时移除队尾更小值，窗口移动时移除过期队首。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sliding-window-maximum/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/sliding-window-maximum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 11
  },
  {
    "id": "subarray-sum-equals-k",
    "number": 560,
    "title": "和为 K 的子数组",
    "topic": "子串",
    "summary": "统计整数列表中元素和恰好等于目标值的连续子数组数量。",
    "signature": "solve(nums, k) → int",
    "starter": "def solve(nums, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "若两个前缀和之差为 k，中间区间的和就是 k。",
      "值可为负数，因此普通滑动窗口不成立。"
    ],
    "tests": [
      {
        "label": "正负数抵消",
        "args": [
          [
            3,
            -2,
            4,
            -1,
            2
          ],
          3
        ],
        "expected": 3
      },
      {
        "label": "多个零和前缀",
        "args": [
          [
            0,
            2,
            -2,
            0
          ],
          0
        ],
        "expected": 6
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "前缀和频次",
        "idea": "扫描到前缀和 prefix 时，历史中每个 prefix-k 都对应一个合法起点。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums, k):\n    counts = {0: 1}\n    prefix = answer = 0\n    for value in nums:\n        prefix += value\n        answer += counts.get(prefix - k, 0)\n        counts[prefix] = counts.get(prefix, 0) + 1\n    return answer",
        "steps": [
          "若两个前缀和之差为 k，中间区间的和就是 k。",
          "值可为负数，因此普通滑动窗口不成立。"
        ],
        "pitfalls": [
          "值可为负数，因此普通滑动窗口不成立。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subarray-sum-equals-k/"
        }
      },
      {
        "id": "solution-2",
        "name": "枚举右端点",
        "idea": "对每个右端点向左累加，直接统计所有连续区间。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(nums, k):\n    answer = 0\n    for right in range(len(nums)):\n        total = 0\n        for left in range(right, -1, -1):\n            total += nums[left]\n            if total == k:\n                answer += 1\n    return answer",
        "steps": [
          "若两个前缀和之差为 k，中间区间的和就是 k。",
          "值可为负数，因此普通滑动窗口不成立。"
        ],
        "pitfalls": [
          "值可为负数，因此普通滑动窗口不成立。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subarray-sum-equals-k/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/subarray-sum-equals-k/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 12
  },
  {
    "id": "first-missing-positive",
    "number": 41,
    "title": "缺失的第一个正数",
    "topic": "普通数组",
    "summary": "在未排序整数列表中找出最小的缺失正整数。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "长度为 n 时答案只可能在 1 到 n+1。",
      "把值 x 放到下标 x-1，最后找第一个不匹配位置。"
    ],
    "tests": [
      {
        "label": "缺少一",
        "args": [
          [
            8,
            -3,
            2,
            4
          ]
        ],
        "expected": 1
      },
      {
        "label": "连续到四",
        "args": [
          [
            4,
            2,
            1,
            3,
            9
          ]
        ],
        "expected": 5
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "原地下标归位",
        "idea": "反复把范围内的正数交换到对应下标，直到当前位置稳定。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            target = nums[i] - 1\n            nums[i], nums[target] = nums[target], nums[i]\n    for i, value in enumerate(nums):\n        if value != i + 1:\n            return i + 1\n    return n + 1",
        "steps": [
          "长度为 n 时答案只可能在 1 到 n+1。",
          "把值 x 放到下标 x-1，最后找第一个不匹配位置。"
        ],
        "pitfalls": [
          "把值 x 放到下标 x-1，最后找第一个不匹配位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/first-missing-positive/"
        }
      },
      {
        "id": "solution-2",
        "name": "集合扫描",
        "idea": "把所有正数放入集合，从 1 起寻找首个不存在的值。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    values = set(nums)\n    answer = 1\n    while answer in values:\n        answer += 1\n    return answer",
        "steps": [
          "长度为 n 时答案只可能在 1 到 n+1。",
          "把值 x 放到下标 x-1，最后找第一个不匹配位置。"
        ],
        "pitfalls": [
          "把值 x 放到下标 x-1，最后找第一个不匹配位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/first-missing-positive/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/first-missing-positive/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 13
  },
  {
    "id": "merge-intervals",
    "number": 56,
    "title": "合并区间",
    "topic": "普通数组",
    "summary": "合并所有重叠或相接的闭区间，返回互不重叠的结果。",
    "signature": "solve(intervals) → list[list[int]]",
    "starter": "def solve(intervals):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "按左端点排序后，只需和结果中的最后区间比较。",
      "重叠时扩展右端点，否则开启新区间。"
    ],
    "tests": [
      {
        "label": "包含被覆盖区间",
        "args": [
          [
            [
              2,
              9
            ],
            [
              3,
              5
            ],
            [
              12,
              14
            ],
            [
              13,
              18
            ]
          ]
        ],
        "expected": [
          [
            2,
            9
          ],
          [
            12,
            18
          ]
        ]
      },
      {
        "label": "区间彼此分离",
        "args": [
          [
            [
              1,
              2
            ],
            [
              5,
              7
            ],
            [
              10,
              11
            ]
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            5,
            7
          ],
          [
            10,
            11
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "排序后线性合并",
        "idea": "排序把可能重叠的区间放到相邻位置，再维护结果尾区间。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(intervals):\n    merged = []\n    for start, end in sorted(intervals):\n        if not merged or start > merged[-1][1]:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged",
        "steps": [
          "按左端点排序后，只需和结果中的最后区间比较。",
          "重叠时扩展右端点，否则开启新区间。"
        ],
        "pitfalls": [
          "重叠时扩展右端点，否则开启新区间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-intervals/"
        }
      },
      {
        "id": "solution-2",
        "name": "事件扫描",
        "idea": "把区间起止作为事件，活动计数从零变正时开启区间、回到零时关闭。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(intervals):\n    events = []\n    for start, end in intervals:\n        events.append((start, 1))\n        events.append((end, -1))\n    events.sort(key=lambda item: (item[0], -item[1]))\n    result = []\n    active = 0\n    for point, change in events:\n        if active == 0: start = point\n        active += change\n        if active == 0: result.append([start, point])\n    return result",
        "steps": [
          "按左端点排序后，只需和结果中的最后区间比较。",
          "重叠时扩展右端点，否则开启新区间。"
        ],
        "pitfalls": [
          "重叠时扩展右端点，否则开启新区间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-intervals/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/merge-intervals/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 14
  },
  {
    "id": "rotate-array",
    "number": 189,
    "title": "轮转数组",
    "topic": "普通数组",
    "summary": "把列表向右轮转 k 步，本站返回轮转后的列表以便本地验证。",
    "signature": "solve(nums, k) → nums",
    "starter": "def solve(nums, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "k 需要先对列表长度取模。",
      "三次翻转可以在原地完成轮转。"
    ],
    "tests": [
      {
        "label": "右移两步",
        "args": [
          [
            8,
            3,
            6,
            1,
            9
          ],
          2
        ],
        "expected": [
          1,
          9,
          8,
          3,
          6
        ]
      },
      {
        "label": "整圈后再移动",
        "args": [
          [
            4,
            -2,
            7
          ],
          7
        ],
        "expected": [
          7,
          4,
          -2
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "三次翻转",
        "idea": "先翻转整体，再分别翻转轮转后的前后两段。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums, k):\n    if not nums: return nums\n    k %= len(nums)\n    nums.reverse()\n    nums[:k] = reversed(nums[:k])\n    nums[k:] = reversed(nums[k:])\n    return nums",
        "steps": [
          "k 需要先对列表长度取模。",
          "三次翻转可以在原地完成轮转。"
        ],
        "pitfalls": [
          "三次翻转可以在原地完成轮转。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotate-array/"
        }
      },
      {
        "id": "solution-2",
        "name": "额外数组映射",
        "idea": "原下标 i 的元素落到 (i+k) mod n。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums, k):\n    if not nums: return nums\n    result = [0] * len(nums)\n    for index, value in enumerate(nums):\n        result[(index + k) % len(nums)] = value\n    nums[:] = result\n    return nums",
        "steps": [
          "k 需要先对列表长度取模。",
          "三次翻转可以在原地完成轮转。"
        ],
        "pitfalls": [
          "三次翻转可以在原地完成轮转。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotate-array/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/rotate-array/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 15
  },
  {
    "id": "product-of-array-except-self",
    "number": 238,
    "title": "除了自身以外数组的乘积",
    "topic": "普通数组",
    "summary": "对每个位置返回其余所有元素的乘积，不使用除法。",
    "signature": "solve(nums) → list[int]",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "答案等于当前位置左侧乘积乘右侧乘积。",
      "先写前缀乘积，再用一个变量从右侧累乘。"
    ],
    "tests": [
      {
        "label": "包含负数",
        "args": [
          [
            -2,
            3,
            5,
            -1
          ]
        ],
        "expected": [
          -15,
          10,
          6,
          -30
        ]
      },
      {
        "label": "包含两个零",
        "args": [
          [
            0,
            4,
            0,
            2
          ]
        ],
        "expected": [
          0,
          0,
          0,
          0
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "前后缀滚动",
        "idea": "结果先存每个位置左侧乘积，再从右向左乘上右侧累计值。",
        "complexity": "时间 O(n)，除输出外空间 O(1)。",
        "code": "def solve(nums):\n    result = [1] * len(nums)\n    prefix = 1\n    for i, value in enumerate(nums):\n        result[i] = prefix\n        prefix *= value\n    suffix = 1\n    for i in range(len(nums) - 1, -1, -1):\n        result[i] *= suffix\n        suffix *= nums[i]\n    return result",
        "steps": [
          "答案等于当前位置左侧乘积乘右侧乘积。",
          "先写前缀乘积，再用一个变量从右侧累乘。"
        ],
        "pitfalls": [
          "先写前缀乘积，再用一个变量从右侧累乘。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/product-of-array-except-self/"
        }
      },
      {
        "id": "solution-2",
        "name": "双数组前后缀",
        "idea": "显式保存左侧与右侧乘积，最后逐位相乘。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    n = len(nums)\n    left = [1] * n\n    right = [1] * n\n    for i in range(1, n): left[i] = left[i - 1] * nums[i - 1]\n    for i in range(n - 2, -1, -1): right[i] = right[i + 1] * nums[i + 1]\n    return [left[i] * right[i] for i in range(n)]",
        "steps": [
          "答案等于当前位置左侧乘积乘右侧乘积。",
          "先写前缀乘积，再用一个变量从右侧累乘。"
        ],
        "pitfalls": [
          "先写前缀乘积，再用一个变量从右侧累乘。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/product-of-array-except-self/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/product-of-array-except-self/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 16
  },
  {
    "id": "rotate-image",
    "number": 48,
    "title": "旋转图像",
    "topic": "矩阵",
    "summary": "把正方形矩阵顺时针旋转九十度，本站返回旋转后的矩阵。",
    "signature": "solve(matrix) → matrix",
    "starter": "def solve(matrix):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先沿主对角线转置，再逐行翻转。",
      "也可以按四个位置一组进行原地轮换。"
    ],
    "tests": [
      {
        "label": "二阶非连续值",
        "args": [
          [
            [
              8,
              1
            ],
            [
              6,
              3
            ]
          ]
        ],
        "expected": [
          [
            6,
            8
          ],
          [
            3,
            1
          ]
        ]
      },
      {
        "label": "四阶矩阵",
        "args": [
          [
            [
              1,
              2,
              3,
              4
            ],
            [
              5,
              6,
              7,
              8
            ],
            [
              9,
              10,
              11,
              12
            ],
            [
              13,
              14,
              15,
              16
            ]
          ]
        ],
        "expected": [
          [
            13,
            9,
            5,
            1
          ],
          [
            14,
            10,
            6,
            2
          ],
          [
            15,
            11,
            7,
            3
          ],
          [
            16,
            12,
            8,
            4
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "转置后翻转",
        "idea": "主对角线交换完成转置，再把每一行逆序。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(matrix):\n    n = len(matrix)\n    for r in range(n):\n        for c in range(r + 1, n):\n            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n    for row in matrix:\n        row.reverse()\n    return matrix",
        "steps": [
          "先沿主对角线转置，再逐行翻转。",
          "也可以按四个位置一组进行原地轮换。"
        ],
        "pitfalls": [
          "也可以按四个位置一组进行原地轮换。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotate-image/"
        }
      },
      {
        "id": "solution-2",
        "name": "四点轮换",
        "idea": "逐层处理，每次把上、左、下、右四个位置循环交换。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(matrix):\n    n = len(matrix)\n    for layer in range(n // 2):\n        last = n - 1 - layer\n        for offset in range(last - layer):\n            top = matrix[layer][layer + offset]\n            matrix[layer][layer + offset] = matrix[last - offset][layer]\n            matrix[last - offset][layer] = matrix[last][last - offset]\n            matrix[last][last - offset] = matrix[layer + offset][last]\n            matrix[layer + offset][last] = top\n    return matrix",
        "steps": [
          "先沿主对角线转置，再逐行翻转。",
          "也可以按四个位置一组进行原地轮换。"
        ],
        "pitfalls": [
          "也可以按四个位置一组进行原地轮换。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotate-image/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/rotate-image/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 17
  },
  {
    "id": "spiral-matrix",
    "number": 54,
    "title": "螺旋矩阵",
    "topic": "矩阵",
    "summary": "按从外向内的顺时针螺旋顺序返回矩阵中的全部元素。",
    "signature": "solve(matrix) → list[int]",
    "starter": "def solve(matrix):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "维护上、下、左、右四条尚未访问的边界。",
      "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"
    ],
    "tests": [
      {
        "label": "四行两列",
        "args": [
          [
            [
              1,
              2
            ],
            [
              3,
              4
            ],
            [
              5,
              6
            ],
            [
              7,
              8
            ]
          ]
        ],
        "expected": [
          1,
          2,
          4,
          6,
          8,
          7,
          5,
          3
        ]
      },
      {
        "label": "单列矩阵",
        "args": [
          [
            [
              9
            ],
            [
              4
            ],
            [
              2
            ]
          ]
        ],
        "expected": [
          9,
          4,
          2
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "四边界收缩",
        "idea": "每轮依次走上、右、下、左四条边，并缩小矩形。",
        "complexity": "时间 O(mn)，空间 O(1)（不计输出）。",
        "code": "def solve(matrix):\n    if not matrix: return []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    result = []\n    while top <= bottom and left <= right:\n        result.extend(matrix[top][left:right + 1]); top += 1\n        for r in range(top, bottom + 1): result.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            result.extend(reversed(matrix[bottom][left:right + 1])); bottom -= 1\n        if left <= right:\n            for r in range(bottom, top - 1, -1): result.append(matrix[r][left])\n            left += 1\n    return result",
        "steps": [
          "维护上、下、左、右四条尚未访问的边界。",
          "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"
        ],
        "pitfalls": [
          "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/spiral-matrix/"
        }
      },
      {
        "id": "solution-2",
        "name": "方向模拟",
        "idea": "按右、下、左、上的方向移动，遇到边界或已访问位置就转向。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(matrix):\n    if not matrix: return []\n    rows, cols = len(matrix), len(matrix[0])\n    seen = set()\n    directions = [(0,1),(1,0),(0,-1),(-1,0)]\n    r = c = direction = 0\n    result = []\n    for _ in range(rows * cols):\n        result.append(matrix[r][c]); seen.add((r,c))\n        dr, dc = directions[direction]\n        nr, nc = r + dr, c + dc\n        if not (0 <= nr < rows and 0 <= nc < cols) or (nr, nc) in seen:\n            direction = (direction + 1) % 4\n            dr, dc = directions[direction]\n            nr, nc = r + dr, c + dc\n        r, c = nr, nc\n    return result",
        "steps": [
          "维护上、下、左、右四条尚未访问的边界。",
          "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"
        ],
        "pitfalls": [
          "走完一条边后收缩对应边界，并在反向遍历前检查是否仍有空间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/spiral-matrix/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/spiral-matrix/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 18
  },
  {
    "id": "set-matrix-zeroes",
    "number": 73,
    "title": "矩阵置零",
    "topic": "矩阵",
    "summary": "若矩阵某位置为零，就把其所在整行和整列都置为零，并返回修改后的矩阵。",
    "signature": "solve(matrix) → matrix",
    "starter": "def solve(matrix):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "第一行和第一列可以复用为标记区。",
      "需要额外记住首行、首列原本是否含零。"
    ],
    "tests": [
      {
        "label": "角落与内部为零",
        "args": [
          [
            [
              0,
              2,
              3
            ],
            [
              4,
              5,
              0
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          [
            0,
            0,
            0
          ],
          [
            0,
            0,
            0
          ],
          [
            0,
            8,
            0
          ]
        ]
      },
      {
        "label": "单行矩阵",
        "args": [
          [
            [
              6,
              0,
              4,
              3
            ]
          ]
        ],
        "expected": [
          [
            0,
            0,
            0,
            0
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "首行首列标记",
        "idea": "先用首行首列记录需要清零的位置，最后单独处理首行首列。",
        "complexity": "时间 O(mn)，空间 O(1)。",
        "code": "def solve(matrix):\n    rows, cols = len(matrix), len(matrix[0])\n    first_row = any(matrix[0][c] == 0 for c in range(cols))\n    first_col = any(matrix[r][0] == 0 for r in range(rows))\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][c] == 0:\n                matrix[r][0] = matrix[0][c] = 0\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n    if first_row:\n        for c in range(cols): matrix[0][c] = 0\n    if first_col:\n        for r in range(rows): matrix[r][0] = 0\n    return matrix",
        "steps": [
          "第一行和第一列可以复用为标记区。",
          "需要额外记住首行、首列原本是否含零。"
        ],
        "pitfalls": [
          "需要额外记住首行、首列原本是否含零。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/set-matrix-zeroes/"
        }
      },
      {
        "id": "solution-2",
        "name": "行列集合",
        "idea": "先收集所有含零的行列，再进行第二遍写零。",
        "complexity": "时间 O(mn)，空间 O(m+n)。",
        "code": "def solve(matrix):\n    zero_rows, zero_cols = set(), set()\n    for r, row in enumerate(matrix):\n        for c, value in enumerate(row):\n            if value == 0:\n                zero_rows.add(r)\n                zero_cols.add(c)\n    for r, row in enumerate(matrix):\n        for c in range(len(row)):\n            if r in zero_rows or c in zero_cols:\n                matrix[r][c] = 0\n    return matrix",
        "steps": [
          "第一行和第一列可以复用为标记区。",
          "需要额外记住首行、首列原本是否含零。"
        ],
        "pitfalls": [
          "需要额外记住首行、首列原本是否含零。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/set-matrix-zeroes/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/set-matrix-zeroes/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 19
  },
  {
    "id": "search-a-2d-matrix-ii",
    "number": 240,
    "title": "搜索二维矩阵 II",
    "topic": "矩阵",
    "summary": "在每行从左到右、每列从上到下递增的矩阵中判断目标值是否存在。",
    "signature": "solve(matrix, target) → bool",
    "starter": "def solve(matrix, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "右上角同时具备向左变小、向下变大的单调方向。",
      "也可以逐行二分。"
    ],
    "tests": [
      {
        "label": "目标位于左下",
        "args": [
          [
            [
              2,
              6,
              10
            ],
            [
              4,
              8,
              13
            ],
            [
              7,
              11,
              16
            ]
          ],
          7
        ],
        "expected": true
      },
      {
        "label": "目标落在间隙",
        "args": [
          [
            [
              1,
              5
            ],
            [
              3,
              9
            ],
            [
              8,
              12
            ]
          ],
          6
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "右上角阶梯搜索",
        "idea": "大于目标就左移，小于目标就下移，每步排除一行或一列。",
        "complexity": "时间 O(m+n)，空间 O(1)。",
        "code": "def solve(matrix, target):\n    if not matrix: return False\n    row, col = 0, len(matrix[0]) - 1\n    while row < len(matrix) and col >= 0:\n        value = matrix[row][col]\n        if value == target: return True\n        if value > target: col -= 1\n        else: row += 1\n    return False",
        "steps": [
          "右上角同时具备向左变小、向下变大的单调方向。",
          "也可以逐行二分。"
        ],
        "pitfalls": [
          "也可以逐行二分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "逐行二分",
        "idea": "跳过范围不含目标的行，在其余行中做标准二分。",
        "complexity": "时间 O(m log n)，空间 O(1)。",
        "code": "from bisect import bisect_left\n\ndef solve(matrix, target):\n    for row in matrix:\n        if row and row[0] <= target <= row[-1]:\n            index = bisect_left(row, target)\n            if index < len(row) and row[index] == target:\n                return True\n    return False",
        "steps": [
          "右上角同时具备向左变小、向下变大的单调方向。",
          "也可以逐行二分。"
        ],
        "pitfalls": [
          "也可以逐行二分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-a-2d-matrix-ii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/search-a-2d-matrix-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 20
  },
  {
    "id": "add-two-numbers",
    "number": 2,
    "title": "两数相加",
    "topic": "链表",
    "summary": "两个逆序数字链表分别表示非负整数，返回它们相加后的逆序数字列表。",
    "signature": "solve(a, b) → list[int]",
    "starter": "def solve(a, b):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "逐位相加时同时处理进位。",
      "循环条件还要包含最后可能剩下的 carry。"
    ],
    "tests": [
      {
        "label": "不同长度相加",
        "args": [
          [
            6,
            8
          ],
          [
            7,
            5,
            2
          ]
        ],
        "expected": [
          3,
          4,
          3
        ]
      },
      {
        "label": "中间产生进位",
        "args": [
          [
            8,
            7,
            2
          ],
          [
            5,
            6
          ]
        ],
        "expected": [
          3,
          4,
          3
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "链表逐位加",
        "idea": "同步读取两个链表节点，把总和的个位接入结果并保留十位进位。",
        "complexity": "时间 O(max(m,n))，空间 O(max(m,n))。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(a, b):\n    left, right = from_list(a), from_list(b)\n    dummy = tail = ListNode()\n    carry = 0\n    while left or right or carry:\n        total = carry\n        if left: total += left.value; left = left.next\n        if right: total += right.value; right = right.next\n        carry, digit = divmod(total, 10)\n        tail.next = ListNode(digit); tail = tail.next\n    return to_list(dummy.next)",
        "steps": [
          "逐位相加时同时处理进位。",
          "循环条件还要包含最后可能剩下的 carry。"
        ],
        "pitfalls": [
          "循环条件还要包含最后可能剩下的 carry。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/add-two-numbers/"
        }
      },
      {
        "id": "solution-2",
        "name": "按下标模拟",
        "idea": "直接在输入数字数组上按位读取，用结果数组表达新链表。",
        "complexity": "时间 O(max(m,n))，空间 O(max(m,n))。",
        "code": "def solve(a, b):\n    result = []\n    carry = index = 0\n    while index < len(a) or index < len(b) or carry:\n        total = carry\n        if index < len(a): total += a[index]\n        if index < len(b): total += b[index]\n        carry, digit = divmod(total, 10)\n        result.append(digit)\n        index += 1\n    return result",
        "steps": [
          "逐位相加时同时处理进位。",
          "循环条件还要包含最后可能剩下的 carry。"
        ],
        "pitfalls": [
          "循环条件还要包含最后可能剩下的 carry。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/add-two-numbers/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/add-two-numbers/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 21
  },
  {
    "id": "remove-nth-node-from-end-of-list",
    "number": 19,
    "title": "删除链表的倒数第 N 个结点",
    "topic": "链表",
    "summary": "删除单链表倒数第 n 个节点，返回剩余节点值列表。",
    "signature": "solve(values, n) → list",
    "starter": "def solve(values, n):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "让 fast 比 slow 先走 n 步。",
      "使用哑节点可以统一删除头节点的情况。"
    ],
    "tests": [
      {
        "label": "删除头节点",
        "args": [
          [
            8,
            4,
            9,
            2
          ],
          4
        ],
        "expected": [
          4,
          9,
          2
        ]
      },
      {
        "label": "删除尾节点",
        "args": [
          [
            7,
            3,
            6
          ],
          1
        ],
        "expected": [
          7,
          3
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "快慢指针",
        "idea": "fast 先走 n 步，随后两指针同步移动，slow 停在待删节点前。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values, n):\n    dummy = ListNode(0, from_list(values))\n    fast = slow = dummy\n    for _ in range(n): fast = fast.next\n    while fast.next:\n        fast, slow = fast.next, slow.next\n    slow.next = slow.next.next\n    return to_list(dummy.next)",
        "steps": [
          "让 fast 比 slow 先走 n 步。",
          "使用哑节点可以统一删除头节点的情况。"
        ],
        "pitfalls": [
          "使用哑节点可以统一删除头节点的情况。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "计算长度",
        "idea": "先统计节点数，再从哑节点走到正向下标 length-n 的前驱。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values, n):\n    dummy = ListNode(0, from_list(values))\n    length, current = 0, dummy.next\n    while current: length += 1; current = current.next\n    current = dummy\n    for _ in range(length - n): current = current.next\n    current.next = current.next.next\n    return to_list(dummy.next)",
        "steps": [
          "让 fast 比 slow 先走 n 步。",
          "使用哑节点可以统一删除头节点的情况。"
        ],
        "pitfalls": [
          "使用哑节点可以统一删除头节点的情况。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 22
  },
  {
    "id": "merge-lists",
    "number": 21,
    "title": "合并两个有序链表",
    "topic": "链表",
    "level": "进阶",
    "minutes": 35,
    "prerequisites": [
      "节点引用",
      "哑节点",
      "双指针"
    ],
    "summary": "把两个升序链表合并成一个新的升序链表。本站输入输出用数组包装，核心合并过程仍操作真实链表节点。",
    "signature": "solve(a, b) → list",
    "why": "每次只需比较两个链表尚未处理的第一个节点，较小者一定是结果中的下一个节点。",
    "insight": "dummy 节点让结果链表永远有一个稳定起点，不必单独处理第一个节点。",
    "steps": [
      "建立 dummy 和尾指针 tail。",
      "当两个链表都非空，连接值较小的节点并移动对应指针。",
      "每连接一个节点后移动 tail。",
      "最后把尚未为空的那一段整体接上。"
    ],
    "complexity": "时间 O(m+n)，除返回链表外额外空间 O(1)。",
    "trace": [
      [
        "比较",
        "1 与 2"
      ],
      [
        "接入",
        "1"
      ],
      [
        "继续",
        "4 与 2"
      ],
      [
        "尾段",
        "直接接上"
      ]
    ],
    "starter": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(a, b):\n    left = from_list(a)\n    right = from_list(b)\n\n    # TODO: 写下你的解法\n    pass",
    "solution": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(a, b):\n    left = from_list(a)\n    right = from_list(b)\n    dummy = ListNode()\n    tail = dummy\n\n    while left and right:\n        if left.value <= right.value:\n            tail.next = left\n            left = left.next\n        else:\n            tail.next = right\n            right = right.next\n        tail = tail.next\n\n    tail.next = left if left else right\n    return to_list(dummy.next)",
    "hints": [
      "方向：比较两个当前节点，每次把较小者接到结果尾部。",
      "关键量：tail 始终是结果链表的最后一个节点；dummy.next 才是真正头节点。",
      "骨架：while left and right；更新 tail.next、对应指针和 tail；循环后接入剩余链表。"
    ],
    "tests": [
      {
        "label": "长度不等",
        "args": [
          [
            -5,
            2,
            10
          ],
          [
            -4,
            1,
            3,
            12
          ]
        ],
        "expected": [
          -5,
          -4,
          1,
          2,
          3,
          10,
          12
        ]
      },
      {
        "label": "两边都有重复值",
        "args": [
          [
            0,
            0,
            7
          ],
          [
            0,
            5,
            7
          ]
        ],
        "expected": [
          0,
          0,
          0,
          5,
          7,
          7
        ]
      }
    ],
    "compare": "exact",
    "variant": "如果两个链表按降序排列，比较条件和结果连接过程分别要改哪里？",
    "solutions": [
      {
        "id": "primary",
        "name": "链表主解法",
        "idea": "dummy 节点让结果链表永远有一个稳定起点，不必单独处理第一个节点。",
        "steps": [
          "建立 dummy 和尾指针 tail。",
          "当两个链表都非空，连接值较小的节点并移动对应指针。",
          "每连接一个节点后移动 tail。",
          "最后把尚未为空的那一段整体接上。"
        ],
        "complexity": "时间 O(m+n)，除返回链表外额外空间 O(1)。",
        "pitfalls": [
          "关键量：tail 始终是结果链表的最后一个节点；dummy.next 才是真正头节点。",
          "骨架：while left and right；更新 tail.next、对应指针和 tail；循环后接入剩余链表。"
        ],
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(a, b):\n    left = from_list(a)\n    right = from_list(b)\n    dummy = ListNode()\n    tail = dummy\n\n    while left and right:\n        if left.value <= right.value:\n            tail.next = left\n            left = left.next\n        else:\n            tail.next = right\n            right = right.next\n        tail = tail.next\n\n    tail.next = left if left else right\n    return to_list(dummy.next)",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-two-sorted-lists/"
        }
      },
      {
        "id": "alternate",
        "name": "递归归并",
        "idea": "较小的头节点必然是结果头节点，再递归合并它的后继与另一条链表。",
        "steps": [
          "任一链表为空时返回另一条。",
          "选较小头节点。",
          "把它的 next 指向剩余部分的递归结果。"
        ],
        "complexity": "时间 O(m+n)，递归栈 O(m+n)。",
        "pitfalls": [
          "递归版会占用调用栈。",
          "返回前必须连接选中节点的 next。"
        ],
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef merge(left, right):\n    if left is None:\n        return right\n    if right is None:\n        return left\n    if left.value <= right.value:\n        left.next = merge(left.next, right)\n        return left\n    right.next = merge(left, right.next)\n    return right\n\ndef solve(a, b):\n    return to_list(merge(from_list(a), from_list(b)))",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-two-sorted-lists/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/merge-two-sorted-lists/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 23
  },
  {
    "id": "merge-k-sorted-lists",
    "number": 23,
    "title": "合并 K 个升序链表",
    "topic": "链表",
    "summary": "把多条升序链表合并成一条升序链表，本站使用二维数组表示输入。",
    "signature": "solve(lists) → list",
    "starter": "def solve(lists):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "最小堆只需保存每条链表当前最小的头节点。",
      "分治可以反复两两归并。"
    ],
    "tests": [
      {
        "label": "四条不同长度链表",
        "args": [
          [
            [
              -5,
              3
            ],
            [],
            [
              -4,
              2,
              9
            ],
            [
              1,
              7
            ]
          ]
        ],
        "expected": [
          -5,
          -4,
          1,
          2,
          3,
          7,
          9
        ]
      },
      {
        "label": "全部为空",
        "args": [
          [
            [],
            []
          ]
        ],
        "expected": []
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "最小堆",
        "idea": "堆中保留每条链表当前节点，弹出最小值后推进对应链表。",
        "complexity": "时间 O(N log k)，空间 O(k)。",
        "code": "import heapq\n\ndef solve(lists):\n    heap = []\n    for row, values in enumerate(lists):\n        if values: heapq.heappush(heap, (values[0], row, 0))\n    result = []\n    while heap:\n        value, row, index = heapq.heappop(heap)\n        result.append(value)\n        if index + 1 < len(lists[row]):\n            heapq.heappush(heap, (lists[row][index + 1], row, index + 1))\n    return result",
        "steps": [
          "最小堆只需保存每条链表当前最小的头节点。",
          "分治可以反复两两归并。"
        ],
        "pitfalls": [
          "分治可以反复两两归并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-k-sorted-lists/"
        }
      },
      {
        "id": "solution-2",
        "name": "分治两两归并",
        "idea": "把链表数组不断按对合并，问题规模每轮减半。",
        "complexity": "时间 O(N log k)，空间 O(N)。",
        "code": "def merge(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]: result.append(a[i]); i += 1\n        else: result.append(b[j]); j += 1\n    return result + a[i:] + b[j:]\n\ndef solve(lists):\n    lists = [list(values) for values in lists]\n    while len(lists) > 1:\n        merged = []\n        for i in range(0, len(lists), 2):\n            merged.append(merge(lists[i], lists[i + 1] if i + 1 < len(lists) else []))\n        lists = merged\n    return lists[0] if lists else []",
        "steps": [
          "最小堆只需保存每条链表当前最小的头节点。",
          "分治可以反复两两归并。"
        ],
        "pitfalls": [
          "分治可以反复两两归并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/merge-k-sorted-lists/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/merge-k-sorted-lists/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 24
  },
  {
    "id": "swap-nodes-in-pairs",
    "number": 24,
    "title": "两两交换链表中的节点",
    "topic": "链表",
    "summary": "每两个相邻节点交换一次，不改变节点内部数值，返回交换后的序列。",
    "signature": "solve(values) → list",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "哑节点指向每一对的前驱。",
      "交换后前驱要移动到这一对的新尾节点。"
    ],
    "tests": [
      {
        "label": "五个节点",
        "args": [
          [
            9,
            4,
            7,
            1,
            6
          ]
        ],
        "expected": [
          4,
          9,
          1,
          7,
          6
        ]
      },
      {
        "label": "两个节点",
        "args": [
          [
            -2,
            5
          ]
        ],
        "expected": [
          5,
          -2
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "迭代三指针",
        "idea": "每轮让前驱指向第二节点，再把第一节点接到第二节点之后。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    dummy = ListNode(0, from_list(values))\n    previous = dummy\n    while previous.next and previous.next.next:\n        first = previous.next\n        second = first.next\n        first.next = second.next\n        second.next = first\n        previous.next = second\n        previous = first\n    return to_list(dummy.next)",
        "steps": [
          "哑节点指向每一对的前驱。",
          "交换后前驱要移动到这一对的新尾节点。"
        ],
        "pitfalls": [
          "交换后前驱要移动到这一对的新尾节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/swap-nodes-in-pairs/"
        }
      },
      {
        "id": "solution-2",
        "name": "递归交换",
        "idea": "当前一对交换后，把原第一节点的 next 指向剩余链表的递归结果。",
        "complexity": "时间 O(n)，递归栈 O(n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef swap(node):\n    if node is None or node.next is None: return node\n    second = node.next\n    node.next = swap(second.next)\n    second.next = node\n    return second\n\ndef solve(values):\n    return to_list(swap(from_list(values)))",
        "steps": [
          "哑节点指向每一对的前驱。",
          "交换后前驱要移动到这一对的新尾节点。"
        ],
        "pitfalls": [
          "交换后前驱要移动到这一对的新尾节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/swap-nodes-in-pairs/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/swap-nodes-in-pairs/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 25
  },
  {
    "id": "reverse-nodes-in-k-group",
    "number": 25,
    "title": "K 个一组翻转链表",
    "topic": "链表",
    "summary": "每 k 个连续节点为一组进行翻转，不足 k 个的尾段保持原顺序。",
    "signature": "solve(values, k) → list",
    "starter": "def solve(values, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "翻转前先确认本组确实有 k 个节点。",
      "保存下一组起点，再把当前组逐节点反向。"
    ],
    "tests": [
      {
        "label": "每四项翻转",
        "args": [
          [
            9,
            2,
            7,
            4,
            6,
            1
          ],
          4
        ],
        "expected": [
          4,
          7,
          2,
          9,
          6,
          1
        ]
      },
      {
        "label": "分组长度超过链表",
        "args": [
          [
            3,
            8,
            5
          ],
          5
        ],
        "expected": [
          3,
          8,
          5
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "分组原地翻转",
        "idea": "用 group_prev 定位每组前驱，找到第 k 个节点后翻转半开区间。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values, k):\n    dummy = ListNode(0, from_list(values))\n    group_prev = dummy\n    while True:\n        kth = group_prev\n        for _ in range(k):\n            kth = kth.next\n            if kth is None: return to_list(dummy.next)\n        group_next = kth.next\n        previous, current = group_next, group_prev.next\n        while current is not group_next:\n            following = current.next\n            current.next = previous\n            previous, current = current, following\n        tail = group_prev.next\n        group_prev.next = kth\n        group_prev = tail",
        "steps": [
          "翻转前先确认本组确实有 k 个节点。",
          "保存下一组起点，再把当前组逐节点反向。"
        ],
        "pitfalls": [
          "保存下一组起点，再把当前组逐节点反向。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/"
        }
      },
      {
        "id": "solution-2",
        "name": "节点数组分组重连",
        "idea": "先保存节点引用，再逐个翻转完整的 k 长度区间，最后按新顺序重连。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values, k):\n    current = from_list(values)\n    nodes = []\n    while current:\n        nodes.append(current)\n        current = current.next\n    for start in range(0, len(nodes) - k + 1, k):\n        nodes[start:start + k] = reversed(nodes[start:start + k])\n    for index in range(len(nodes) - 1):\n        nodes[index].next = nodes[index + 1]\n    if nodes: nodes[-1].next = None\n    return to_list(nodes[0] if nodes else None)",
        "steps": [
          "翻转前先确认本组确实有 k 个节点。",
          "保存下一组起点，再把当前组逐节点反向。"
        ],
        "pitfalls": [
          "保存下一组起点，再把当前组逐节点反向。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reverse-nodes-in-k-group/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/reverse-nodes-in-k-group/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 26
  },
  {
    "id": "copy-list-with-random-pointer",
    "number": 138,
    "title": "随机链表的复制",
    "topic": "链表",
    "summary": "深拷贝带 next 与 random 指针的链表；输入为值数组和每个 random 指向的下标。",
    "signature": "solve(values, random_indices) → list[[value, randomIndex]]",
    "starter": "def solve(values, random_indices):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "哈希映射可以把旧节点对应到新节点。",
      "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"
    ],
    "tests": [
      {
        "label": "随机指针含空值",
        "args": [
          [
            4,
            9,
            2,
            7
          ],
          [
            2,
            null,
            3,
            1
          ]
        ],
        "expected": [
          [
            4,
            2
          ],
          [
            9,
            null
          ],
          [
            2,
            3
          ],
          [
            7,
            1
          ]
        ]
      },
      {
        "label": "双节点互指",
        "args": [
          [
            6,
            8
          ],
          [
            1,
            0
          ]
        ],
        "expected": [
          [
            6,
            1
          ],
          [
            8,
            0
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "节点映射",
        "idea": "第一遍创建所有副本，第二遍按映射连接 next 与 random。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class Node:\n    def __init__(self, value): self.value, self.next, self.random = value, None, None\n\ndef solve(values, random_indices):\n    old = [Node(value) for value in values]\n    for i in range(len(old) - 1): old[i].next = old[i + 1]\n    for i, target in enumerate(random_indices):\n        old[i].random = None if target is None else old[target]\n    copies = {None: None}\n    for node in old: copies[node] = Node(node.value)\n    for node in old:\n        copies[node].next = copies[node.next]\n        copies[node].random = copies[node.random]\n    index = {copies[node]: i for i, node in enumerate(old)}\n    return [[copies[node].value, None if copies[node].random is None else index[copies[node].random]] for node in old]",
        "steps": [
          "哈希映射可以把旧节点对应到新节点。",
          "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"
        ],
        "pitfalls": [
          "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/copy-list-with-random-pointer/"
        }
      },
      {
        "id": "solution-2",
        "name": "穿插副本",
        "idea": "把副本插入原节点之后，random 副本就是原 random 的 next，最后拆开两条链。",
        "complexity": "时间 O(n)，空间 O(1)（不计输出）。",
        "code": "class Node:\n    def __init__(self, value): self.value, self.next, self.random = value, None, None\n\ndef solve(values, random_indices):\n    nodes = [Node(value) for value in values]\n    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]\n    for i, target in enumerate(random_indices): nodes[i].random = None if target is None else nodes[target]\n    current = nodes[0] if nodes else None\n    while current:\n        copy = Node(current.value); copy.next = current.next; current.next = copy\n        current = copy.next\n    current = nodes[0] if nodes else None\n    while current:\n        current.next.random = None if current.random is None else current.random.next\n        current = current.next.next\n    copy_head = nodes[0].next if nodes else None\n    current = nodes[0] if nodes else None\n    while current:\n        copy = current.next\n        current.next = copy.next\n        copy.next = copy.next.next if copy.next else None\n        current = current.next\n    copies, current = [], copy_head\n    while current:\n        copies.append(current)\n        current = current.next\n    index = {node: i for i, node in enumerate(copies)}\n    return [[node.value, None if node.random is None else index[node.random]] for node in copies]",
        "steps": [
          "哈希映射可以把旧节点对应到新节点。",
          "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"
        ],
        "pitfalls": [
          "也可把新节点暂时穿插到旧节点后面，从而用相邻关系定位副本。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/copy-list-with-random-pointer/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/copy-list-with-random-pointer/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 27
  },
  {
    "id": "linked-list-cycle",
    "number": 141,
    "title": "环形链表",
    "topic": "链表",
    "summary": "给定节点值和尾节点连接位置，判断构造出的单链表是否存在环。",
    "signature": "solve(values, pos) → bool",
    "starter": "def solve(values, pos):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "快指针每次两步、慢指针每次一步；有环时必然相遇。",
      "pos 为 -1 表示尾节点不回连。"
    ],
    "tests": [
      {
        "label": "回到头节点",
        "args": [
          [
            5,
            8,
            2
          ],
          0
        ],
        "expected": true
      },
      {
        "label": "单节点无环",
        "args": [
          [
            9
          ],
          -1
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "快慢指针",
        "idea": "快指针在环中会从后方追上慢指针。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class Node:\n    def __init__(self, value): self.value, self.next = value, None\n\ndef build(values, pos):\n    nodes = [Node(value) for value in values]\n    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]\n    if nodes and pos >= 0: nodes[-1].next = nodes[pos]\n    return nodes[0] if nodes else None\n\ndef solve(values, pos):\n    slow = fast = build(values, pos)\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow is fast: return True\n    return False",
        "steps": [
          "快指针每次两步、慢指针每次一步；有环时必然相遇。",
          "pos 为 -1 表示尾节点不回连。"
        ],
        "pitfalls": [
          "pos 为 -1 表示尾节点不回连。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/linked-list-cycle/"
        }
      },
      {
        "id": "solution-2",
        "name": "访问节点集合",
        "idea": "扫描时记录节点身份，第二次遇到同一节点即存在环。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class Node:\n    def __init__(self, value): self.value, self.next = value, None\n\ndef solve(values, pos):\n    nodes = [Node(value) for value in values]\n    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]\n    if nodes and pos >= 0: nodes[-1].next = nodes[pos]\n    current = nodes[0] if nodes else None\n    seen = set()\n    while current:\n        if current in seen: return True\n        seen.add(current); current = current.next\n    return False",
        "steps": [
          "快指针每次两步、慢指针每次一步；有环时必然相遇。",
          "pos 为 -1 表示尾节点不回连。"
        ],
        "pitfalls": [
          "pos 为 -1 表示尾节点不回连。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/linked-list-cycle/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/linked-list-cycle/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 28
  },
  {
    "id": "linked-list-cycle-ii",
    "number": 142,
    "title": "环形链表 II",
    "topic": "链表",
    "summary": "给定节点值和尾节点连接位置，返回环入口的节点下标；没有环返回 -1。",
    "signature": "solve(values, pos) → int",
    "starter": "def solve(values, pos):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "快慢指针相遇后，让一根指针回到头节点。",
      "两根指针随后同速前进，再次相遇处就是入口。"
    ],
    "tests": [
      {
        "label": "入口在头节点",
        "args": [
          [
            5,
            8,
            2
          ],
          0
        ],
        "expected": 0
      },
      {
        "label": "入口靠近尾部",
        "args": [
          [
            4,
            7,
            1,
            9,
            3
          ],
          3
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Floyd 定位入口",
        "idea": "第一次相遇确认有环；头指针与相遇指针同速前进会在入口相遇。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class Node:\n    def __init__(self, value, index): self.value, self.index, self.next = value, index, None\n\ndef solve(values, pos):\n    nodes = [Node(value, i) for i, value in enumerate(values)]\n    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]\n    if nodes and pos >= 0: nodes[-1].next = nodes[pos]\n    slow = fast = nodes[0] if nodes else None\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow is fast:\n            seeker = nodes[0]\n            while seeker is not slow:\n                seeker, slow = seeker.next, slow.next\n            return seeker.index\n    return -1",
        "steps": [
          "快慢指针相遇后，让一根指针回到头节点。",
          "两根指针随后同速前进，再次相遇处就是入口。"
        ],
        "pitfalls": [
          "两根指针随后同速前进，再次相遇处就是入口。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/linked-list-cycle-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "首次重复节点",
        "idea": "集合保存访问过的节点，第一个重复节点就是环入口。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class Node:\n    def __init__(self, index): self.index, self.next = index, None\n\ndef solve(values, pos):\n    nodes = [Node(i) for i in range(len(values))]\n    for i in range(len(nodes) - 1): nodes[i].next = nodes[i + 1]\n    if nodes and pos >= 0: nodes[-1].next = nodes[pos]\n    current = nodes[0] if nodes else None\n    seen = set()\n    while current:\n        if current in seen: return current.index\n        seen.add(current); current = current.next\n    return -1",
        "steps": [
          "快慢指针相遇后，让一根指针回到头节点。",
          "两根指针随后同速前进，再次相遇处就是入口。"
        ],
        "pitfalls": [
          "两根指针随后同速前进，再次相遇处就是入口。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/linked-list-cycle-ii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/linked-list-cycle-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 29
  },
  {
    "id": "lru-cache",
    "number": 146,
    "title": "LRU 缓存",
    "topic": "链表",
    "summary": "按顺序执行 get 与 put 操作，容量满时淘汰最久未使用的键，返回所有 get 的结果。",
    "signature": "solve(capacity, operations) → list[int]",
    "starter": "def solve(capacity, operations):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "哈希表负责 O(1) 定位节点，双向链表负责 O(1) 调整新旧顺序。",
      "也可使用 Python 的有序字典表达同一不变量。"
    ],
    "tests": [
      {
        "label": "读取刷新淘汰顺序",
        "args": [
          2,
          [
            [
              "put",
              4,
              40
            ],
            [
              "put",
              7,
              70
            ],
            [
              "get",
              4
            ],
            [
              "put",
              9,
              90
            ],
            [
              "get",
              7
            ],
            [
              "get",
              9
            ]
          ]
        ],
        "expected": [
          40,
          -1,
          90
        ]
      },
      {
        "label": "容量三并更新",
        "args": [
          3,
          [
            [
              "put",
              1,
              5
            ],
            [
              "put",
              2,
              6
            ],
            [
              "put",
              3,
              7
            ],
            [
              "put",
              2,
              8
            ],
            [
              "get",
              2
            ],
            [
              "get",
              1
            ]
          ]
        ],
        "expected": [
          8,
          5
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "OrderedDict",
        "idea": "有序字典末尾代表最近使用；读写后移到末尾，超容量弹出头部。",
        "complexity": "每次操作 O(1)，空间 O(capacity)。",
        "code": "from collections import OrderedDict\n\ndef solve(capacity, operations):\n    cache = OrderedDict()\n    result = []\n    for operation in operations:\n        if operation[0] == 'get':\n            key = operation[1]\n            if key not in cache: result.append(-1)\n            else:\n                cache.move_to_end(key)\n                result.append(cache[key])\n        else:\n            _, key, value = operation\n            cache[key] = value\n            cache.move_to_end(key)\n            if len(cache) > capacity: cache.popitem(last=False)\n    return result",
        "steps": [
          "哈希表负责 O(1) 定位节点，双向链表负责 O(1) 调整新旧顺序。",
          "也可使用 Python 的有序字典表达同一不变量。"
        ],
        "pitfalls": [
          "也可使用 Python 的有序字典表达同一不变量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lru-cache/"
        }
      },
      {
        "id": "solution-2",
        "name": "哈希加双向链表",
        "idea": "节点按使用时间连接，头部最旧、尾部最新；哈希表直接定位节点。",
        "complexity": "每次操作 O(1)，空间 O(capacity)。",
        "code": "class Node:\n    def __init__(self, key=0, value=0): self.key, self.value, self.prev, self.next = key, value, None, None\n\ndef solve(capacity, operations):\n    head, tail = Node(), Node()\n    head.next, tail.prev = tail, head\n    cache = {}\n    def remove(node):\n        node.prev.next, node.next.prev = node.next, node.prev\n    def append(node):\n        node.prev, node.next = tail.prev, tail\n        tail.prev.next = node; tail.prev = node\n    result = []\n    for operation in operations:\n        if operation[0] == 'get':\n            key = operation[1]\n            if key not in cache: result.append(-1); continue\n            node = cache[key]; remove(node); append(node); result.append(node.value)\n        else:\n            _, key, value = operation\n            if key in cache: remove(cache[key])\n            node = Node(key, value); cache[key] = node; append(node)\n            if len(cache) > capacity:\n                oldest = head.next; remove(oldest); del cache[oldest.key]\n    return result",
        "steps": [
          "哈希表负责 O(1) 定位节点，双向链表负责 O(1) 调整新旧顺序。",
          "也可使用 Python 的有序字典表达同一不变量。"
        ],
        "pitfalls": [
          "也可使用 Python 的有序字典表达同一不变量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lru-cache/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/lru-cache/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 30
  },
  {
    "id": "sort-list",
    "number": 148,
    "title": "排序链表",
    "topic": "链表",
    "summary": "把单链表按节点值升序排列，返回排序后的值序列。",
    "signature": "solve(values) → list",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "归并排序适合只支持顺序访问的链表。",
      "快慢指针切分，两个有序链表再线性合并。"
    ],
    "tests": [
      {
        "label": "重复值与负数",
        "args": [
          [
            6,
            -2,
            6,
            1,
            -5
          ]
        ],
        "expected": [
          -5,
          -2,
          1,
          6,
          6
        ]
      },
      {
        "label": "已经升序",
        "args": [
          [
            -3,
            0,
            4,
            9
          ]
        ],
        "expected": [
          -3,
          0,
          4,
          9
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "自顶向下归并",
        "idea": "递归把链表二分，排序两个子链后线性合并。",
        "complexity": "时间 O(n log n)，递归栈 O(log n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef merge(a, b):\n    dummy = tail = ListNode()\n    while a and b:\n        if a.value <= b.value: tail.next, a = a, a.next\n        else: tail.next, b = b, b.next\n        tail = tail.next\n    tail.next = a or b\n    return dummy.next\n\ndef sort_nodes(head):\n    if head is None or head.next is None: return head\n    slow, fast = head, head.next\n    while fast and fast.next: slow, fast = slow.next, fast.next.next\n    right = slow.next; slow.next = None\n    return merge(sort_nodes(head), sort_nodes(right))\n\ndef solve(values): return to_list(sort_nodes(from_list(values)))",
        "steps": [
          "归并排序适合只支持顺序访问的链表。",
          "快慢指针切分，两个有序链表再线性合并。"
        ],
        "pitfalls": [
          "快慢指针切分，两个有序链表再线性合并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sort-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "值数组排序回写",
        "idea": "读取全部节点值，排序后按顺序写回节点。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    head = from_list(values)\n    ordered = sorted(values)\n    current = head\n    for value in ordered:\n        current.value = value\n        current = current.next\n    return to_list(head)",
        "steps": [
          "归并排序适合只支持顺序访问的链表。",
          "快慢指针切分，两个有序链表再线性合并。"
        ],
        "pitfalls": [
          "快慢指针切分，两个有序链表再线性合并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sort-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/sort-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 31
  },
  {
    "id": "intersection-of-two-linked-lists",
    "number": 160,
    "title": "相交链表",
    "topic": "链表",
    "summary": "两条单链表可能在某个节点后共享同一段尾链，返回相交节点的值；无交点返回空值。",
    "signature": "solve(prefix_a, prefix_b, shared) → value | None",
    "starter": "def solve(prefix_a, prefix_b, shared):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "两指针各走完 A+B 与 B+A 后会抵消长度差。",
      "本地参数用两个独立前缀和共享尾段构造真实相交节点。"
    ],
    "tests": [
      {
        "label": "共享尾段含负数",
        "args": [
          [
            2,
            7,
            9
          ],
          [
            5
          ],
          [
            -4,
            6,
            8
          ]
        ],
        "expected": -4
      },
      {
        "label": "起点即相交",
        "args": [
          [],
          [],
          [
            11,
            12
          ]
        ],
        "expected": 11
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双指针换轨",
        "idea": "指针到尾后切换到另一条链表，第二轮在相同剩余距离处相遇。",
        "complexity": "时间 O(m+n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(prefix_a, prefix_b, shared):\n    common = from_list(shared)\n    def attach(prefix):\n        head = from_list(prefix)\n        if head is None: return common\n        tail = head\n        while tail.next: tail = tail.next\n        tail.next = common\n        return head\n    a, b = attach(prefix_a), attach(prefix_b)\n    left, right = a, b\n    while left is not right:\n        left = b if left is None else left.next\n        right = a if right is None else right.next\n    return None if left is None else left.value",
        "steps": [
          "两指针各走完 A+B 与 B+A 后会抵消长度差。",
          "本地参数用两个独立前缀和共享尾段构造真实相交节点。"
        ],
        "pitfalls": [
          "本地参数用两个独立前缀和共享尾段构造真实相交节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/intersection-of-two-linked-lists/"
        }
      },
      {
        "id": "solution-2",
        "name": "节点集合",
        "idea": "先记录第一条链表的节点身份，再扫描第二条链表寻找首个重复节点。",
        "complexity": "时间 O(m+n)，空间 O(m)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(prefix_a, prefix_b, shared):\n    common = from_list(shared)\n    def attach(prefix):\n        head = from_list(prefix)\n        if head is None: return common\n        tail = head\n        while tail.next: tail = tail.next\n        tail.next = common\n        return head\n    a, b = attach(prefix_a), attach(prefix_b)\n    seen = set()\n    while a:\n        seen.add(a); a = a.next\n    while b:\n        if b in seen: return b.value\n        b = b.next\n    return None",
        "steps": [
          "两指针各走完 A+B 与 B+A 后会抵消长度差。",
          "本地参数用两个独立前缀和共享尾段构造真实相交节点。"
        ],
        "pitfalls": [
          "本地参数用两个独立前缀和共享尾段构造真实相交节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/intersection-of-two-linked-lists/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/intersection-of-two-linked-lists/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 32
  },
  {
    "id": "reverse-linked-list",
    "number": 206,
    "title": "反转链表",
    "topic": "链表",
    "summary": "反转一条单链表的指针方向，本站以数组输入并返回反转后的节点值。",
    "signature": "solve(values) → list",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "修改 current.next 前先保存原来的后继。",
      "递归返回的新头节点始终是原链表尾节点。"
    ],
    "tests": [
      {
        "label": "包含负数",
        "args": [
          [
            4,
            -1,
            8,
            0
          ]
        ],
        "expected": [
          0,
          8,
          -1,
          4
        ]
      },
      {
        "label": "单节点链表",
        "args": [
          [
            27
          ]
        ],
        "expected": [
          27
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "迭代改指针",
        "idea": "用 previous 保存已经反转的前缀，current 逐个摘下节点接到前面。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    current = from_list(values)\n    previous = None\n    while current:\n        following = current.next\n        current.next = previous\n        previous = current\n        current = following\n    return to_list(previous)",
        "steps": [
          "修改 current.next 前先保存原来的后继。",
          "递归返回的新头节点始终是原链表尾节点。"
        ],
        "pitfalls": [
          "递归返回的新头节点始终是原链表尾节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reverse-linked-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "节点栈重连",
        "idea": "把节点依次压栈，再按弹出顺序重连 next，避免长链触发 Python 递归上限。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    current = from_list(values)\n    nodes = []\n    while current:\n        nodes.append(current)\n        current = current.next\n    if not nodes: return []\n    head = nodes.pop()\n    tail = head\n    while nodes:\n        tail.next = nodes.pop()\n        tail = tail.next\n    tail.next = None\n    return to_list(head)",
        "steps": [
          "修改 current.next 前先保存原来的后继。",
          "递归返回的新头节点始终是原链表尾节点。"
        ],
        "pitfalls": [
          "递归返回的新头节点始终是原链表尾节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reverse-linked-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/reverse-linked-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 33
  },
  {
    "id": "palindrome-linked-list",
    "number": 234,
    "title": "回文链表",
    "topic": "链表",
    "summary": "判断单链表从前向后和从后向前读取是否得到同一串值。",
    "signature": "solve(values) → bool",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "快慢指针可以找到后半段起点。",
      "反转后半段后逐节点比较两侧。"
    ],
    "tests": [
      {
        "label": "奇数长度回文",
        "args": [
          [
            3,
            8,
            5,
            8,
            3
          ]
        ],
        "expected": true
      },
      {
        "label": "尾部不同",
        "args": [
          [
            6,
            2,
            6,
            1
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "反转后半段",
        "idea": "快慢指针找中点，反转后半段并与前半段同步比较。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    head = from_list(values)\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    previous = None\n    while slow:\n        following = slow.next\n        slow.next = previous\n        previous, slow = slow, following\n    left, right = head, previous\n    while right:\n        if left.value != right.value: return False\n        left, right = left.next, right.next\n    return True",
        "steps": [
          "快慢指针可以找到后半段起点。",
          "反转后半段后逐节点比较两侧。"
        ],
        "pitfalls": [
          "反转后半段后逐节点比较两侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindrome-linked-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "数组回文",
        "idea": "把节点值依次复制到数组，再用双指针比较首尾。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "class ListNode:\n    def __init__(self, value=0, next=None):\n        self.value = value\n        self.next = next\n\ndef from_list(values):\n    dummy = ListNode()\n    tail = dummy\n    for value in values:\n        tail.next = ListNode(value)\n        tail = tail.next\n    return dummy.next\n\ndef to_list(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\ndef solve(values):\n    sequence = to_list(from_list(values))\n    return sequence == sequence[::-1]",
        "steps": [
          "快慢指针可以找到后半段起点。",
          "反转后半段后逐节点比较两侧。"
        ],
        "pitfalls": [
          "反转后半段后逐节点比较两侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindrome-linked-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/palindrome-linked-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 34
  },
  {
    "id": "tree-inorder",
    "number": 94,
    "title": "二叉树的中序遍历",
    "topic": "二叉树",
    "level": "进阶",
    "minutes": 30,
    "prerequisites": [
      "递归",
      "树节点",
      "深度优先搜索"
    ],
    "summary": "按照“左子树 → 当前节点 → 右子树”的顺序访问二叉树，并返回访问到的值。输入使用层序数组，null 表示缺失节点。",
    "signature": "solve(values) → list",
    "why": "树不是线性结构。递归让每个节点只负责同一件小事：先处理左边，再记录自己，最后处理右边。",
    "insight": "递归函数的承诺不是“解决整棵树”，而是“把以当前节点为根的子树按中序追加到 result”。",
    "steps": [
      "将层序数组还原成二叉树。",
      "递归函数遇到 None 立即返回。",
      "递归左子树，记录当前值，再递归右子树。",
      "从根节点启动递归并返回 result。"
    ],
    "complexity": "时间 O(n)，递归栈最坏 O(n)。",
    "trace": [
      [
        "进入",
        "节点 1"
      ],
      [
        "先左",
        "空"
      ],
      [
        "记录",
        "1"
      ],
      [
        "再右",
        "2 → 3"
      ]
    ],
    "starter": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n\n    # TODO: 写下你的解法\n    pass",
    "solution": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n    result = []\n\n    def visit(node):\n        if node is None:\n            return\n        visit(node.left)\n        result.append(node.value)\n        visit(node.right)\n\n    visit(root)\n    return result",
    "hints": [
      "方向：把“左、根、右”逐字翻译成三行递归逻辑。",
      "关键量：result 是所有递归调用共同追加的列表。",
      "骨架：if node is None: return；visit(node.left)；append；visit(node.right)。"
    ],
    "tests": [
      {
        "label": "左子树含右节点",
        "args": [
          [
            8,
            3,
            11,
            null,
            6
          ]
        ],
        "expected": [
          3,
          6,
          8,
          11
        ]
      },
      {
        "label": "单侧长链",
        "args": [
          [
            9,
            4,
            null,
            2
          ]
        ],
        "expected": [
          2,
          4,
          9
        ]
      }
    ],
    "compare": "exact",
    "variant": "如果要改成前序遍历，只移动 result.append(node.value) 这一行即可。它应移动到哪里？",
    "solutions": [
      {
        "id": "primary",
        "name": "二叉树主解法",
        "idea": "递归函数的承诺不是“解决整棵树”，而是“把以当前节点为根的子树按中序追加到 result”。",
        "steps": [
          "将层序数组还原成二叉树。",
          "递归函数遇到 None 立即返回。",
          "递归左子树，记录当前值，再递归右子树。",
          "从根节点启动递归并返回 result。"
        ],
        "complexity": "时间 O(n)，递归栈最坏 O(n)。",
        "pitfalls": [
          "关键量：result 是所有递归调用共同追加的列表。",
          "骨架：if node is None: return；visit(node.left)；append；visit(node.right)。"
        ],
        "code": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n    result = []\n\n    def visit(node):\n        if node is None:\n            return\n        visit(node.left)\n        result.append(node.value)\n        visit(node.right)\n\n    visit(root)\n    return result",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-inorder-traversal/"
        }
      },
      {
        "id": "alternate",
        "name": "显式栈迭代",
        "idea": "不断向左压栈；无法再向左时弹出节点记录，再转向它的右子树。",
        "steps": [
          "当前节点非空时持续压入并向左。",
          "弹出栈顶并记录。",
          "把当前节点切换到其右孩子。"
        ],
        "complexity": "时间 O(n)，额外空间 O(h)。",
        "pitfalls": [
          "外层条件是 current 或 stack。",
          "记录节点后再转向右子树。"
        ],
        "code": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    current = build_tree(values)\n    stack = []\n    result = []\n\n    while current or stack:\n        while current:\n            stack.append(current)\n            current = current.left\n        current = stack.pop()\n        result.append(current.value)\n        current = current.right\n\n    return result",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-inorder-traversal/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/binary-tree-inorder-traversal/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 35
  },
  {
    "id": "validate-binary-search-tree",
    "number": 98,
    "title": "验证二叉搜索树",
    "topic": "二叉树",
    "summary": "判断二叉树是否满足每个节点左侧所有值更小、右侧所有值更大的严格搜索树性质。",
    "signature": "solve(values) → bool",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "只比较父子节点不够，需要携带整条祖先路径形成的上下界。",
      "搜索树中序遍历应严格递增。"
    ],
    "tests": [
      {
        "label": "合法非完全树",
        "args": [
          [
            8,
            3,
            12,
            1,
            6,
            10,
            14
          ]
        ],
        "expected": true
      },
      {
        "label": "右子树含较小值",
        "args": [
          [
            9,
            4,
            13,
            null,
            null,
            7,
            15
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "显式栈上下界",
        "idea": "栈中的每个节点同时携带祖先约束形成的开区间。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    stack = [(root, float('-inf'), float('inf'))]\n    while stack:\n        node, low, high = stack.pop()\n        if node is None: continue\n        if not low < node.value < high: return False\n        stack.append((node.right, node.value, high))\n        stack.append((node.left, low, node.value))\n    return True",
        "steps": [
          "只比较父子节点不够，需要携带整条祖先路径形成的上下界。",
          "搜索树中序遍历应严格递增。"
        ],
        "pitfalls": [
          "搜索树中序遍历应严格递增。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/validate-binary-search-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "中序严格递增",
        "idea": "中序遍历搜索树会得到严格升序序列，只需比较当前值和前一个值。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    stack, current, previous = [], root, None\n    while current or stack:\n        while current: stack.append(current); current = current.left\n        current = stack.pop()\n        if previous is not None and current.value <= previous: return False\n        previous = current.value\n        current = current.right\n    return True",
        "steps": [
          "只比较父子节点不够，需要携带整条祖先路径形成的上下界。",
          "搜索树中序遍历应严格递增。"
        ],
        "pitfalls": [
          "搜索树中序遍历应严格递增。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/validate-binary-search-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/validate-binary-search-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 36
  },
  {
    "id": "symmetric-tree",
    "number": 101,
    "title": "对称二叉树",
    "topic": "二叉树",
    "summary": "判断一棵二叉树是否关于根节点的垂直轴镜像对称。",
    "signature": "solve(values) → bool",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "比较的是左子树的左侧与右子树的右侧。",
      "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"
    ],
    "tests": [
      {
        "label": "深层镜像",
        "args": [
          [
            7,
            4,
            4,
            2,
            5,
            5,
            2,
            null,
            1,
            null,
            null,
            null,
            null,
            1
          ]
        ],
        "expected": true
      },
      {
        "label": "值不同导致不对称",
        "args": [
          [
            6,
            3,
            3,
            1,
            2,
            4,
            1
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "递归镜像比较",
        "idea": "成对比较外侧孩子与内侧孩子。",
        "complexity": "时间 O(n)，递归栈 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef mirror(left, right):\n    if left is None or right is None: return left is right\n    return left.value == right.value and mirror(left.left, right.right) and mirror(left.right, right.left)\n\ndef solve(values):\n    root = build_tree(values)\n    return True if root is None else mirror(root.left, root.right)",
        "steps": [
          "比较的是左子树的左侧与右子树的右侧。",
          "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"
        ],
        "pitfalls": [
          "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/symmetric-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "队列成对检查",
        "idea": "队列始终压入需要互为镜像的节点对。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return True\n    queue = deque([(root.left, root.right)])\n    while queue:\n        left, right = queue.popleft()\n        if left is None or right is None:\n            if left is not right: return False\n            continue\n        if left.value != right.value: return False\n        queue.append((left.left, right.right))\n        queue.append((left.right, right.left))\n    return True",
        "steps": [
          "比较的是左子树的左侧与右子树的右侧。",
          "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"
        ],
        "pitfalls": [
          "一对节点必须同时为空，或值相同且两个交叉子问题都成立。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/symmetric-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/symmetric-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 37
  },
  {
    "id": "binary-tree-level-order-traversal",
    "number": 102,
    "title": "二叉树的层序遍历",
    "topic": "二叉树",
    "summary": "按从上到下、每层从左到右的顺序返回二叉树节点值。",
    "signature": "solve(values) → list[list[int]]",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每轮先固定当前队列长度，它就是本层节点数。",
      "递归时可把深度作为结果下标。"
    ],
    "tests": [
      {
        "label": "四层稀疏树",
        "args": [
          [
            8,
            3,
            10,
            1,
            6,
            null,
            14,
            null,
            2
          ]
        ],
        "expected": [
          [
            8
          ],
          [
            3,
            10
          ],
          [
            1,
            6,
            14
          ],
          [
            2
          ]
        ]
      },
      {
        "label": "仅左链",
        "args": [
          [
            5,
            4,
            null,
            3
          ]
        ],
        "expected": [
          [
            5
          ],
          [
            4
          ],
          [
            3
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "队列逐层",
        "idea": "固定一层的节点数量，消费完后把本层结果加入答案。",
        "complexity": "时间 O(n)，空间 O(w)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return []\n    queue, result = deque([root]), []\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft(); level.append(node.value)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result",
        "steps": [
          "每轮先固定当前队列长度，它就是本层节点数。",
          "递归时可把深度作为结果下标。"
        ],
        "pitfalls": [
          "递归时可把深度作为结果下标。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal/"
        }
      },
      {
        "id": "solution-2",
        "name": "下标队列分层",
        "idea": "用普通列表保存队列并移动读取下标，按每层结束位置切分层次。",
        "complexity": "时间 O(n)，空间 O(w)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return []\n    queue, head, result = [root], 0, []\n    while head < len(queue):\n        level_end = len(queue)\n        level = []\n        while head < level_end:\n            node = queue[head]; head += 1\n            level.append(node.value)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result",
        "steps": [
          "每轮先固定当前队列长度，它就是本层节点数。",
          "递归时可把深度作为结果下标。"
        ],
        "pitfalls": [
          "递归时可把深度作为结果下标。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-level-order-traversal/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/binary-tree-level-order-traversal/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 38
  },
  {
    "id": "tree-depth",
    "number": 104,
    "title": "二叉树的最大深度",
    "topic": "二叉树",
    "level": "进阶",
    "minutes": 25,
    "prerequisites": [
      "树节点",
      "显式栈",
      "深度状态"
    ],
    "summary": "求一棵二叉树从根节点到最远叶子节点所包含的节点数。输入仍使用层序数组。",
    "signature": "solve(values) → int",
    "why": "每个栈元素同时保存节点与它所在的深度；弹出节点时更新最大值，再把孩子按深度加一压栈。",
    "insight": "显式保存深度状态可以保持递归定义的清晰度，同时避开退化树触发 Python 递归上限。",
    "steps": [
      "空树直接返回 0。",
      "把根节点与深度 1 一起压栈。",
      "每次弹出节点，用其深度更新答案。",
      "把非空孩子连同 depth + 1 压栈。"
    ],
    "complexity": "时间 O(n)，显式栈最坏 O(n)。",
    "trace": [
      [
        "叶子",
        "深度 1"
      ],
      [
        "父节点",
        "1 + max"
      ],
      [
        "左右",
        "取较大"
      ],
      [
        "空树",
        "0"
      ]
    ],
    "starter": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n\n    # TODO: 写下你的解法\n    pass",
    "solution": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None:\n        return 0\n    best = 0\n    stack = [(root, 1)]\n    while stack:\n        node, depth = stack.pop()\n        best = max(best, depth)\n        if node.left:\n            stack.append((node.left, depth + 1))\n        if node.right:\n            stack.append((node.right, depth + 1))\n    return best",
    "hints": [
      "方向：遍历树时，把节点所在深度一起保存。",
      "关键量：根节点深度从 1 开始。",
      "骨架：stack 保存 (node, depth)，孩子压入 depth + 1。"
    ],
    "tests": [
      {
        "label": "左侧更深",
        "args": [
          [
            8,
            4,
            12,
            2,
            null,
            null,
            14,
            1
          ]
        ],
        "expected": 4
      },
      {
        "label": "单节点树",
        "args": [
          [
            42
          ]
        ],
        "expected": 1
      }
    ],
    "compare": "exact",
    "variant": "如果要求最小深度，能否直接把 max 改成 min？先找出只有一个孩子时的反例。",
    "solutions": [
      {
        "id": "primary",
        "name": "二叉树主解法",
        "idea": "显式保存深度状态可以保持递归定义的清晰度，同时避开退化树触发 Python 递归上限。",
        "steps": [
          "空树直接返回 0。",
          "把根节点与深度 1 一起压栈。",
          "每次弹出节点，用其深度更新答案。",
          "把非空孩子连同 depth + 1 压栈。"
        ],
        "complexity": "时间 O(n)，显式栈最坏 O(n)。",
        "pitfalls": [
          "关键量：根节点深度从 1 开始。",
          "骨架：stack 保存 (node, depth)，孩子压入 depth + 1。"
        ],
        "code": "class TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None:\n        return 0\n    best = 0\n    stack = [(root, 1)]\n    while stack:\n        node, depth = stack.pop()\n        best = max(best, depth)\n        if node.left:\n            stack.append((node.left, depth + 1))\n        if node.right:\n            stack.append((node.right, depth + 1))\n    return best",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-depth-of-binary-tree/"
        }
      },
      {
        "id": "alternate",
        "name": "层序遍历",
        "idea": "每完成一整层遍历，深度加一；队列中始终保存下一层待处理节点。",
        "steps": [
          "空树直接返回 0。",
          "逐层消费当前队列长度个节点。",
          "把非空孩子加入队列并增加层数。"
        ],
        "complexity": "时间 O(n)，额外空间 O(w)，w 为最大层宽。",
        "pitfalls": [
          "一层的节点数要在循环开始时固定。",
          "不要在遍历当前层时直接用变化后的队列长度。"
        ],
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values:\n        return None\n    nodes = [None if value is None else TreeNode(value) for value in values]\n    kids = nodes[::-1]\n    root = kids.pop()\n    for node in nodes:\n        if node:\n            if kids: node.left = kids.pop()\n            if kids: node.right = kids.pop()\n    return root\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None:\n        return 0\n    queue = deque([root])\n    depth = 0\n    while queue:\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        depth += 1\n    return depth",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-depth-of-binary-tree/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/maximum-depth-of-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 39
  },
  {
    "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "number": 105,
    "title": "从前序与中序遍历序列构造二叉树",
    "topic": "二叉树",
    "summary": "根据无重复值的前序和中序遍历重建二叉树，返回层序数组。",
    "signature": "solve(preorder, inorder) → list",
    "starter": "def solve(preorder, inorder):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "前序首项是根；它在中序中的位置划分左右子树。",
      "哈希表可以 O(1) 找到根在中序中的下标。"
    ],
    "tests": [
      {
        "label": "非对称二叉树",
        "args": [
          [
            8,
            4,
            2,
            6,
            12,
            10
          ],
          [
            2,
            4,
            6,
            8,
            10,
            12
          ]
        ],
        "expected": [
          8,
          4,
          12,
          2,
          6,
          10
        ]
      },
      {
        "label": "只有右子树",
        "args": [
          [
            3,
            5,
            7
          ],
          [
            3,
            5,
            7
          ]
        ],
        "expected": [
          3,
          null,
          5,
          null,
          7
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "前序栈重建",
        "idea": "栈保存尚未完成右子树的祖先；中序指针决定新节点应接左侧还是回退后接右侧。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(preorder, inorder):\n    if not preorder: return []\n    root = TreeNode(preorder[0])\n    stack = [root]\n    inorder_index = 0\n    for value in preorder[1:]:\n        node = stack[-1]\n        if node.value != inorder[inorder_index]:\n            node.left = TreeNode(value)\n            stack.append(node.left)\n            continue\n        while stack and stack[-1].value == inorder[inorder_index]:\n            node = stack.pop()\n            inorder_index += 1\n        node.right = TreeNode(value)\n        stack.append(node.right)\n    return tree_to_list(root)",
        "steps": [
          "前序首项是根；它在中序中的位置划分左右子树。",
          "哈希表可以 O(1) 找到根在中序中的下标。"
        ],
        "pitfalls": [
          "哈希表可以 O(1) 找到根在中序中的下标。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
        }
      },
      {
        "id": "solution-2",
        "name": "区间任务栈",
        "idea": "用显式任务栈保存父节点、左右区间和挂接方向，按前序顺序逐个创建根。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(preorder, inorder):\n    if not preorder: return []\n    positions = {value: index for index, value in enumerate(inorder)}\n    root = TreeNode(preorder[0])\n    preorder_index = 1\n    tasks = [(root, positions[root.value] + 1, len(inorder) - 1, False), (root, 0, positions[root.value] - 1, True)]\n    while tasks:\n        parent, left, right, attach_left = tasks.pop()\n        if left > right: continue\n        value = preorder[preorder_index]; preorder_index += 1\n        node = TreeNode(value)\n        if attach_left: parent.left = node\n        else: parent.right = node\n        middle = positions[value]\n        tasks.append((node, middle + 1, right, False))\n        tasks.append((node, left, middle - 1, True))\n    return tree_to_list(root)",
        "steps": [
          "前序首项是根；它在中序中的位置划分左右子树。",
          "哈希表可以 O(1) 找到根在中序中的下标。"
        ],
        "pitfalls": [
          "哈希表可以 O(1) 找到根在中序中的下标。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 40
  },
  {
    "id": "convert-sorted-array-to-binary-search-tree",
    "number": 108,
    "title": "将有序数组转换为二叉搜索树",
    "topic": "二叉树",
    "summary": "把升序数组转换为高度平衡的二叉搜索树，返回其层序表示。",
    "signature": "solve(nums) → list",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "选择区间中点作为根，左右区间递归构造子树。",
      "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"
    ],
    "tests": [
      {
        "label": "六个递增值",
        "args": [
          [
            -8,
            -1,
            2,
            6,
            11,
            15
          ]
        ],
        "expected": [
          2,
          -8,
          11,
          null,
          -1,
          6,
          15
        ]
      },
      {
        "label": "两个元素",
        "args": [
          [
            4,
            9
          ]
        ],
        "expected": [
          4,
          null,
          9
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "递归中点",
        "idea": "每次取区间中点为根，递归构造左右半区。",
        "complexity": "时间 O(n)，递归栈 O(log n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef build(nums, left, right):\n    if left > right: return None\n    mid = (left + right) // 2\n    node = TreeNode(nums[mid])\n    node.left = build(nums, left, mid - 1)\n    node.right = build(nums, mid + 1, right)\n    return node\n\ndef solve(nums): return tree_to_list(build(nums, 0, len(nums) - 1))",
        "steps": [
          "选择区间中点作为根，左右区间递归构造子树。",
          "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"
        ],
        "pitfalls": [
          "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "队列划分区间",
        "idea": "队列保存节点与其对应数组区间，逐层创建左右孩子。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(nums):\n    if not nums: return []\n    mid = (len(nums) - 1) // 2\n    root = TreeNode(nums[mid])\n    queue = deque([(root, 0, mid - 1, True), (root, mid + 1, len(nums) - 1, False)])\n    while queue:\n        parent, left, right, is_left = queue.popleft()\n        if left > right: continue\n        mid = (left + right) // 2\n        node = TreeNode(nums[mid])\n        if is_left: parent.left = node\n        else: parent.right = node\n        queue.append((node, left, mid - 1, True))\n        queue.append((node, mid + 1, right, False))\n    return tree_to_list(root)",
        "steps": [
          "选择区间中点作为根，左右区间递归构造子树。",
          "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"
        ],
        "pitfalls": [
          "合法答案不唯一；本地判题会验证中序序列和高度平衡，而不是固定树形。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/"
        }
      }
    ],
    "compare": "balancedBst",
    "referenceUrl": "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 41
  },
  {
    "id": "flatten-binary-tree-to-linked-list",
    "number": 114,
    "title": "二叉树展开为链表",
    "topic": "二叉树",
    "summary": "按前序遍历顺序把二叉树原地展开到 right 指针链上，返回展开后的值序列。",
    "signature": "solve(values) → list[int]",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "展开顺序等于根、左、右的前序遍历。",
      "若原地改指针，要把原右子树接到左子树最右节点之后。"
    ],
    "tests": [
      {
        "label": "左深右浅",
        "args": [
          [
            8,
            4,
            12,
            2,
            6,
            10
          ]
        ],
        "expected": [
          8,
          4,
          2,
          6,
          12,
          10
        ]
      },
      {
        "label": "仅右子树",
        "args": [
          [
            3,
            null,
            5,
            null,
            7
          ]
        ],
        "expected": [
          3,
          5,
          7
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "寻找左子树前驱",
        "idea": "把左子树移到右侧，并把原右子树接到左子树最右节点后。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    current = root\n    while current:\n        if current.left:\n            predecessor = current.left\n            while predecessor.right: predecessor = predecessor.right\n            predecessor.right = current.right\n            current.right, current.left = current.left, None\n        current = current.right\n    result, current = [], root\n    while current: result.append(current.value); current = current.right\n    return result",
        "steps": [
          "展开顺序等于根、左、右的前序遍历。",
          "若原地改指针，要把原右子树接到左子树最右节点之后。"
        ],
        "pitfalls": [
          "若原地改指针，要把原右子树接到左子树最右节点之后。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "前序栈重连",
        "idea": "显式栈生成前序顺序，并让前一节点的 right 指向当前节点。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return []\n    stack, previous = [root], None\n    while stack:\n        node = stack.pop()\n        if node.right: stack.append(node.right)\n        if node.left: stack.append(node.left)\n        if previous:\n            previous.left = None\n            previous.right = node\n        previous = node\n    result, current = [], root\n    while current:\n        result.append(current.value)\n        current = current.right\n    return result",
        "steps": [
          "展开顺序等于根、左、右的前序遍历。",
          "若原地改指针，要把原右子树接到左子树最右节点之后。"
        ],
        "pitfalls": [
          "若原地改指针，要把原右子树接到左子树最右节点之后。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 42
  },
  {
    "id": "binary-tree-maximum-path-sum",
    "number": 124,
    "title": "二叉树中的最大路径和",
    "topic": "二叉树",
    "summary": "返回二叉树中任意一条不重复节点路径能够得到的最大节点值之和。",
    "signature": "solve(values) → int",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "向父节点只能贡献一条单侧路径。",
      "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"
    ],
    "tests": [
      {
        "label": "最佳路径在左侧",
        "args": [
          [
            5,
            8,
            -3,
            4,
            7
          ]
        ],
        "expected": 20
      },
      {
        "label": "根为负数",
        "args": [
          [
            -6,
            4,
            9,
            2,
            3
          ]
        ],
        "expected": 10
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双栈最大贡献",
        "idea": "先生成逆后序节点序列，再自底向上计算单侧贡献和完整路径候选。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    first, postorder = [root], []\n    while first:\n        node = first.pop()\n        if node is None: continue\n        postorder.append(node)\n        first.extend((node.left, node.right))\n    gains, best = {}, float('-inf')\n    while postorder:\n        node = postorder.pop()\n        left = max(0, gains.get(node.left, 0))\n        right = max(0, gains.get(node.right, 0))\n        best = max(best, node.value + left + right)\n        gains[node] = node.value + max(left, right)\n    return best",
        "steps": [
          "向父节点只能贡献一条单侧路径。",
          "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"
        ],
        "pitfalls": [
          "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-maximum-path-sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "显式后序动态规划",
        "idea": "栈模拟后序，字典保存每个节点向上的最大贡献。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    gains, stack, best = {}, [(root, False)], float('-inf')\n    while stack:\n        node, visited = stack.pop()\n        if node is None: continue\n        if not visited:\n            stack.extend([(node, True), (node.right, False), (node.left, False)])\n        else:\n            left = max(0, gains.get(node.left, 0)); right = max(0, gains.get(node.right, 0))\n            best = max(best, node.value + left + right)\n            gains[node] = node.value + max(left, right)\n    return best",
        "steps": [
          "向父节点只能贡献一条单侧路径。",
          "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"
        ],
        "pitfalls": [
          "经过当前节点的完整候选可以同时使用左右两侧，并丢弃负贡献。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-maximum-path-sum/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/binary-tree-maximum-path-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 43
  },
  {
    "id": "binary-tree-right-side-view",
    "number": 199,
    "title": "二叉树的右视图",
    "topic": "二叉树",
    "summary": "返回从树的右侧观察时，每一层最先可见的节点值。",
    "signature": "solve(values) → list[int]",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "层序遍历每层的最后节点就是右视图。",
      "深度优先时先访问右子树，每层首次访问即答案。"
    ],
    "tests": [
      {
        "label": "右支较浅",
        "args": [
          [
            8,
            4,
            12,
            2,
            6,
            null,
            null,
            null,
            3
          ]
        ],
        "expected": [
          8,
          12,
          6,
          3
        ]
      },
      {
        "label": "锯齿单路径",
        "args": [
          [
            5,
            null,
            7,
            6
          ]
        ],
        "expected": [
          5,
          7,
          6
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "层序取末尾",
        "idea": "逐层遍历并记录每层最后出队的节点。",
        "complexity": "时间 O(n)，空间 O(w)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return []\n    queue, result = deque([root]), []\n    while queue:\n        for index in range(len(queue)):\n            node = queue.popleft()\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n            visible = node.value\n        result.append(visible)\n    return result",
        "steps": [
          "层序遍历每层的最后节点就是右视图。",
          "深度优先时先访问右子树，每层首次访问即答案。"
        ],
        "pitfalls": [
          "深度优先时先访问右子树，每层首次访问即答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-right-side-view/"
        }
      },
      {
        "id": "solution-2",
        "name": "右优先深搜",
        "idea": "先访问右孩子，某深度第一次出现的节点就是最右节点。",
        "complexity": "时间 O(n)，递归栈 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    result = []\n    def visit(node, depth):\n        if node is None: return\n        if depth == len(result): result.append(node.value)\n        visit(node.right, depth + 1); visit(node.left, depth + 1)\n    visit(build_tree(values), 0)\n    return result",
        "steps": [
          "层序遍历每层的最后节点就是右视图。",
          "深度优先时先访问右子树，每层首次访问即答案。"
        ],
        "pitfalls": [
          "深度优先时先访问右子树，每层首次访问即答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-tree-right-side-view/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/binary-tree-right-side-view/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 44
  },
  {
    "id": "invert-binary-tree",
    "number": 226,
    "title": "翻转二叉树",
    "topic": "二叉树",
    "summary": "交换二叉树中每个节点的左右子树，返回翻转后的层序数组。",
    "signature": "solve(values) → list",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每个节点都只做一次左右交换。",
      "递归深度优先和队列广度优先都能覆盖全部节点。"
    ],
    "tests": [
      {
        "label": "左右结构不均衡",
        "args": [
          [
            8,
            3,
            10,
            1,
            6,
            null,
            14
          ]
        ],
        "expected": [
          8,
          10,
          3,
          14,
          null,
          6,
          1
        ]
      },
      {
        "label": "空树",
        "args": [
          []
        ],
        "expected": []
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "递归交换",
        "idea": "先交换当前节点，再递归处理交换后的左右子树。",
        "complexity": "时间 O(n)，递归栈 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef invert(node):\n    if node is None: return None\n    node.left, node.right = invert(node.right), invert(node.left)\n    return node\n\ndef solve(values): return tree_to_list(invert(build_tree(values)))",
        "steps": [
          "每个节点都只做一次左右交换。",
          "递归深度优先和队列广度优先都能覆盖全部节点。"
        ],
        "pitfalls": [
          "递归深度优先和队列广度优先都能覆盖全部节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/invert-binary-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "层序交换",
        "idea": "用队列逐层访问非空节点并交换其左右孩子。",
        "complexity": "时间 O(n)，空间 O(w)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    queue = deque([root]) if root else deque()\n    while queue:\n        node = queue.popleft()\n        node.left, node.right = node.right, node.left\n        if node.left: queue.append(node.left)\n        if node.right: queue.append(node.right)\n    return tree_to_list(root)",
        "steps": [
          "每个节点都只做一次左右交换。",
          "递归深度优先和队列广度优先都能覆盖全部节点。"
        ],
        "pitfalls": [
          "递归深度优先和队列广度优先都能覆盖全部节点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/invert-binary-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/invert-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 45
  },
  {
    "id": "kth-smallest-element-in-a-bst",
    "number": 230,
    "title": "二叉搜索树中第 K 小的元素",
    "topic": "二叉树",
    "summary": "返回二叉搜索树按值从小到大排列后的第 k 个元素。",
    "signature": "solve(values, k) → int",
    "starter": "def solve(values, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "搜索树的中序遍历就是升序序列。",
      "迭代遍历可以在访问第 k 个节点时立即停止。"
    ],
    "tests": [
      {
        "label": "查找第四小",
        "args": [
          [
            8,
            3,
            11,
            1,
            6,
            9,
            14,
            null,
            2
          ],
          4
        ],
        "expected": 6
      },
      {
        "label": "查找最大值",
        "args": [
          [
            5,
            2,
            8,
            1,
            3,
            7,
            9
          ],
          7
        ],
        "expected": 9
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "迭代中序提前结束",
        "idea": "每弹出一个节点就减少 k，到零时直接返回。",
        "complexity": "时间 O(h+k)，空间 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, k):\n    current, stack = build_tree(values), []\n    while True:\n        while current: stack.append(current); current = current.left\n        current = stack.pop(); k -= 1\n        if k == 0: return current.value\n        current = current.right",
        "steps": [
          "搜索树的中序遍历就是升序序列。",
          "迭代遍历可以在访问第 k 个节点时立即停止。"
        ],
        "pitfalls": [
          "迭代遍历可以在访问第 k 个节点时立即停止。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/"
        }
      },
      {
        "id": "solution-2",
        "name": "完整中序列表",
        "idea": "递归生成全部中序值，再读取下标 k-1。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, k):\n    result = []\n    def inorder(node):\n        if node:\n            inorder(node.left); result.append(node.value); inorder(node.right)\n    inorder(build_tree(values))\n    return result[k - 1]",
        "steps": [
          "搜索树的中序遍历就是升序序列。",
          "迭代遍历可以在访问第 k 个节点时立即停止。"
        ],
        "pitfalls": [
          "迭代遍历可以在访问第 k 个节点时立即停止。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 46
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "number": 236,
    "title": "二叉树的最近公共祖先",
    "topic": "二叉树",
    "summary": "在值互不重复的二叉树中，返回两个指定节点的最近公共祖先值。",
    "signature": "solve(values, p, q) → value",
    "starter": "def solve(values, p, q):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "若左右子树分别找到一个目标，当前节点就是最近公共祖先。",
      "也可以记录每个节点的父节点，再比较两条祖先链。"
    ],
    "tests": [
      {
        "label": "祖先位于左子树",
        "args": [
          [
            8,
            4,
            12,
            2,
            6,
            10,
            14,
            1,
            3,
            5,
            7
          ],
          1,
          7
        ],
        "expected": 4
      },
      {
        "label": "跨越根节点",
        "args": [
          [
            8,
            4,
            12,
            2,
            6,
            10,
            14
          ],
          6,
          10
        ],
        "expected": 8
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "节点父指针回溯",
        "idea": "迭代记录节点对象的父节点，先收集 p 的祖先，再沿 q 的祖先链寻找首个交点。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, p, q):\n    root = build_tree(values)\n    parent = {root: None}\n    targets = {}\n    stack = [root]\n    while stack and len(targets) < 2:\n        node = stack.pop()\n        if node.value == p: targets[p] = node\n        if node.value == q: targets[q] = node\n        for child in (node.left, node.right):\n            if child:\n                parent[child] = node\n                stack.append(child)\n    ancestors = set()\n    node = targets[p]\n    while node is not None:\n        ancestors.add(node); node = parent[node]\n    node = targets[q]\n    while node not in ancestors: node = parent[node]\n    return node.value",
        "steps": [
          "若左右子树分别找到一个目标，当前节点就是最近公共祖先。",
          "也可以记录每个节点的父节点，再比较两条祖先链。"
        ],
        "pitfalls": [
          "也可以记录每个节点的父节点，再比较两条祖先链。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "父指针祖先集合",
        "idea": "遍历构建值到父值的映射，把 p 的祖先放入集合，再向上移动 q。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, p, q):\n    root = build_tree(values)\n    parent = {root.value: None}\n    stack = [root]\n    while stack:\n        node = stack.pop()\n        for child in (node.left, node.right):\n            if child:\n                parent[child.value] = node.value\n                stack.append(child)\n    ancestors = set()\n    while p is not None: ancestors.add(p); p = parent[p]\n    while q not in ancestors: q = parent[q]\n    return q",
        "steps": [
          "若左右子树分别找到一个目标，当前节点就是最近公共祖先。",
          "也可以记录每个节点的父节点，再比较两条祖先链。"
        ],
        "pitfalls": [
          "也可以记录每个节点的父节点，再比较两条祖先链。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 47
  },
  {
    "id": "path-sum-iii",
    "number": 437,
    "title": "路径总和 III",
    "topic": "二叉树",
    "summary": "统计二叉树中向下连续且节点和等于目标值的路径数量，路径可从任意节点开始。",
    "signature": "solve(values, target) → int",
    "starter": "def solve(values, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "当前根到节点的前缀和减 target 若出现过，就得到对应数量的路径。",
      "离开节点时必须撤销当前前缀和频次。"
    ],
    "tests": [
      {
        "label": "正负节点组合",
        "args": [
          [
            6,
            3,
            -2,
            1,
            2,
            null,
            5
          ],
          6
        ],
        "expected": 1
      },
      {
        "label": "零和路径",
        "args": [
          [
            0,
            1,
            -1,
            0,
            null,
            null,
            0
          ],
          0
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "树上前缀和",
        "idea": "沿根到当前节点路径维护前缀和频次，统计 prefix-target。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, target):\n    counts = {0: 1}\n    def visit(node, prefix):\n        if node is None: return 0\n        prefix += node.value\n        answer = counts.get(prefix - target, 0)\n        counts[prefix] = counts.get(prefix, 0) + 1\n        answer += visit(node.left, prefix) + visit(node.right, prefix)\n        counts[prefix] -= 1\n        return answer\n    return visit(build_tree(values), 0)",
        "steps": [
          "当前根到节点的前缀和减 target 若出现过，就得到对应数量的路径。",
          "离开节点时必须撤销当前前缀和频次。"
        ],
        "pitfalls": [
          "离开节点时必须撤销当前前缀和频次。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/path-sum-iii/"
        }
      },
      {
        "id": "solution-2",
        "name": "枚举路径起点",
        "idea": "对每个节点分别统计以它为起点向下的目标和路径。",
        "complexity": "时间最坏 O(n²)，递归栈 O(h)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values, target):\n    def from_node(node, remaining):\n        if node is None: return 0\n        remaining -= node.value\n        return (1 if remaining == 0 else 0) + from_node(node.left, remaining) + from_node(node.right, remaining)\n    def all_starts(node):\n        if node is None: return 0\n        return from_node(node, target) + all_starts(node.left) + all_starts(node.right)\n    return all_starts(build_tree(values))",
        "steps": [
          "当前根到节点的前缀和减 target 若出现过，就得到对应数量的路径。",
          "离开节点时必须撤销当前前缀和频次。"
        ],
        "pitfalls": [
          "离开节点时必须撤销当前前缀和频次。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/path-sum-iii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/path-sum-iii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 48
  },
  {
    "id": "diameter-of-binary-tree",
    "number": 543,
    "title": "二叉树的直径",
    "topic": "二叉树",
    "summary": "返回二叉树任意两节点之间最长路径所包含的边数，路径不一定经过根节点。",
    "signature": "solve(values) → int",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "经过某节点的最长路径等于左子树高度加右子树高度。",
      "递归向上返回单侧高度，同时更新全局直径。"
    ],
    "tests": [
      {
        "label": "最长路径位于左子树",
        "args": [
          [
            8,
            4,
            12,
            2,
            6,
            null,
            null,
            1,
            3
          ]
        ],
        "expected": 4
      },
      {
        "label": "单节点直径",
        "args": [
          [
            5
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双栈后序高度",
        "idea": "第一栈生成根右左顺序，第二栈按左右根计算高度和直径。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return 0\n    first, postorder = [root], []\n    while first:\n        node = first.pop(); postorder.append(node)\n        if node.left: first.append(node.left)\n        if node.right: first.append(node.right)\n    heights, best = {}, 0\n    while postorder:\n        node = postorder.pop()\n        left, right = heights.get(node.left, 0), heights.get(node.right, 0)\n        best = max(best, left + right)\n        heights[node] = max(left, right) + 1\n    return best",
        "steps": [
          "经过某节点的最长路径等于左子树高度加右子树高度。",
          "递归向上返回单侧高度，同时更新全局直径。"
        ],
        "pitfalls": [
          "递归向上返回单侧高度，同时更新全局直径。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/diameter-of-binary-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "显式后序栈",
        "idea": "用访问标记模拟后序遍历，字典保存已计算的子树高度。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, value=0):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(values):\n    if not values or values[0] is None:\n        return None\n    root = TreeNode(values[0])\n    queue = deque([root])\n    index = 1\n    while queue and index < len(values):\n        node = queue.popleft()\n        if index < len(values) and values[index] is not None:\n            node.left = TreeNode(values[index])\n            queue.append(node.left)\n        index += 1\n        if index < len(values) and values[index] is not None:\n            node.right = TreeNode(values[index])\n            queue.append(node.right)\n        index += 1\n    return root\n\ndef tree_to_list(root):\n    if root is None:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None:\n            result.append(None)\n            continue\n        result.append(node.value)\n        queue.append(node.left)\n        queue.append(node.right)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve(values):\n    root = build_tree(values)\n    if root is None: return 0\n    heights, stack, best = {}, [(root, False)], 0\n    while stack:\n        node, visited = stack.pop()\n        if node is None: continue\n        if not visited:\n            stack.extend([(node, True), (node.right, False), (node.left, False)])\n        else:\n            left, right = heights.get(node.left, 0), heights.get(node.right, 0)\n            best = max(best, left + right)\n            heights[node] = max(left, right) + 1\n    return best",
        "steps": [
          "经过某节点的最长路径等于左子树高度加右子树高度。",
          "递归向上返回单侧高度，同时更新全局直径。"
        ],
        "pitfalls": [
          "递归向上返回单侧高度，同时更新全局直径。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/diameter-of-binary-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/diameter-of-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 49
  },
  {
    "id": "number-of-islands",
    "number": 200,
    "title": "岛屿数量",
    "topic": "图搜索",
    "level": "进阶",
    "minutes": 35,
    "prerequisites": [
      "二维列表",
      "DFS",
      "访问标记"
    ],
    "summary": "网格中的 1 表示陆地、0 表示水。上下左右相连的陆地属于同一座岛，计算岛屿总数。",
    "signature": "solve(grid) → int",
    "why": "看到一块尚未访问的陆地，就发现了一座新岛；随后一次搜索可以把整座岛全部标记，避免重复计数。",
    "insight": "外层循环负责“发现新连通块”，显式栈 DFS 负责“消掉这个连通块的所有未访问节点”，避免 Python 递归深度限制。",
    "steps": [
      "遍历每个网格位置。",
      "遇到 1 时，岛屿数加一，把它标为 0 并压入栈。",
      "持续弹出陆地，检查上下左右四个邻居。",
      "邻居为 1 时立即标为 0 并入栈，避免重复访问。"
    ],
    "complexity": "时间 O(mn)，显式栈最坏 O(mn)。",
    "trace": [
      [
        "发现 1",
        "count + 1"
      ],
      [
        "DFS",
        "淹没相邻 1"
      ],
      [
        "继续扫描",
        "不重复"
      ],
      [
        "结束",
        "连通块数"
      ]
    ],
    "starter": "def solve(grid):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(grid):\n    if not grid:\n        return 0\n\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    for row in range(rows):\n        for col in range(cols):\n            if grid[row][col] == 1:\n                islands += 1\n                grid[row][col] = 0\n                stack = [(row, col)]\n                while stack:\n                    current_row, current_col = stack.pop()\n                    for next_row, next_col in ((current_row - 1, current_col), (current_row + 1, current_col), (current_row, current_col - 1), (current_row, current_col + 1)):\n                        if 0 <= next_row < rows and 0 <= next_col < cols and grid[next_row][next_col] == 1:\n                            grid[next_row][next_col] = 0\n                            stack.append((next_row, next_col))\n\n    return islands",
    "hints": [
      "方向：每发现一块未访问陆地，就计数一次并遍历整座岛。",
      "关键量：可以直接把访问过的 1 改成 0，省去额外 visited 集合。",
      "骨架：双层循环发现 1；置 0 后压栈，循环扩展四个方向。"
    ],
    "tests": [
      {
        "label": "对角线不连通",
        "args": [
          [
            [
              1,
              0,
              1
            ],
            [
              0,
              1,
              0
            ],
            [
              1,
              0,
              1
            ]
          ]
        ],
        "expected": 5
      },
      {
        "label": "狭长连通带",
        "args": [
          [
            [
              1,
              1,
              1,
              0,
              1
            ]
          ]
        ],
        "expected": 2
      }
    ],
    "compare": "exact",
    "variant": "如果对角线相邻也算连通，需要新增哪四个方向？复杂度会改变吗？",
    "solutions": [
      {
        "id": "primary",
        "name": "图搜索主解法",
        "idea": "外层循环负责“发现新连通块”，显式栈 DFS 负责“消掉这个连通块的所有未访问节点”，避免 Python 递归深度限制。",
        "steps": [
          "遍历每个网格位置。",
          "遇到 1 时，岛屿数加一，把它标为 0 并压入栈。",
          "持续弹出陆地，检查上下左右四个邻居。",
          "邻居为 1 时立即标为 0 并入栈，避免重复访问。"
        ],
        "complexity": "时间 O(mn)，显式栈最坏 O(mn)。",
        "pitfalls": [
          "关键量：可以直接把访问过的 1 改成 0，省去额外 visited 集合。",
          "骨架：双层循环发现 1；置 0 后压栈，循环扩展四个方向。"
        ],
        "code": "def solve(grid):\n    if not grid:\n        return 0\n\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n    for row in range(rows):\n        for col in range(cols):\n            if grid[row][col] == 1:\n                islands += 1\n                grid[row][col] = 0\n                stack = [(row, col)]\n                while stack:\n                    current_row, current_col = stack.pop()\n                    for next_row, next_col in ((current_row - 1, current_col), (current_row + 1, current_col), (current_row, current_col - 1), (current_row, current_col + 1)):\n                        if 0 <= next_row < rows and 0 <= next_col < cols and grid[next_row][next_col] == 1:\n                            grid[next_row][next_col] = 0\n                            stack.append((next_row, next_col))\n\n    return islands",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/number-of-islands/"
        }
      },
      {
        "id": "alternate",
        "name": "队列广度优先",
        "idea": "发现新陆地时计数，并用队列把同一连通块的所有陆地标为水。",
        "steps": [
          "扫描网格找到未访问陆地。",
          "计数后立即标记并入队。",
          "逐个扩展上下左右的陆地。"
        ],
        "complexity": "时间 O(mn)，额外空间最坏 O(mn)。",
        "pitfalls": [
          "入队时立即标记，避免重复入队。",
          "空网格需要单独处理。"
        ],
        "code": "from collections import deque\n\ndef solve(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    islands = 0\n\n    for row in range(rows):\n        for col in range(cols):\n            if grid[row][col] != 1:\n                continue\n            islands += 1\n            grid[row][col] = 0\n            queue = deque([(row, col)])\n            while queue:\n                r, c = queue.popleft()\n                for nr, nc in ((r-1,c), (r+1,c), (r,c-1), (r,c+1)):\n                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                        grid[nr][nc] = 0\n                        queue.append((nr, nc))\n    return islands",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/number-of-islands/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/number-of-islands/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 50
  },
  {
    "id": "course-schedule",
    "number": 207,
    "title": "课程表",
    "topic": "图论",
    "summary": "课程依赖由先修关系给出，判断能否在不产生循环依赖的前提下修完全部课程。",
    "signature": "solve(course_count, prerequisites) → bool",
    "starter": "def solve(course_count, prerequisites):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "有向图无环等价于拓扑排序能取出全部节点。",
      "深度优先可用三色状态发现回到当前路径的边。"
    ],
    "tests": [
      {
        "label": "多分支无环依赖",
        "args": [
          5,
          [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              1
            ],
            [
              4,
              2
            ]
          ]
        ],
        "expected": true
      },
      {
        "label": "三门课程成环",
        "args": [
          4,
          [
            [
              1,
              0
            ],
            [
              2,
              1
            ],
            [
              0,
              2
            ],
            [
              3,
              2
            ]
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "入度拓扑排序",
        "idea": "先把入度为零的课程入队，逐个删除其出边，最终计数应覆盖全部课程。",
        "complexity": "时间 O(V+E)，空间 O(V+E)。",
        "code": "from collections import deque\n\ndef solve(course_count, prerequisites):\n    graph = [[] for _ in range(course_count)]\n    indegree = [0] * course_count\n    for course, before in prerequisites:\n        graph[before].append(course); indegree[course] += 1\n    queue = deque(i for i, degree in enumerate(indegree) if degree == 0)\n    taken = 0\n    while queue:\n        before = queue.popleft(); taken += 1\n        for course in graph[before]:\n            indegree[course] -= 1\n            if indegree[course] == 0: queue.append(course)\n    return taken == course_count",
        "steps": [
          "有向图无环等价于拓扑排序能取出全部节点。",
          "深度优先可用三色状态发现回到当前路径的边。"
        ],
        "pitfalls": [
          "深度优先可用三色状态发现回到当前路径的边。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/course-schedule/"
        }
      },
      {
        "id": "solution-2",
        "name": "迭代三色深度优先",
        "idea": "0 未访问、1 在当前路径、2 已完成；显式栈记录邻接表读取位置，遇到颜色 1 即发现环。",
        "complexity": "时间 O(V+E)，空间 O(V+E)。",
        "code": "def solve(course_count, prerequisites):\n    graph = [[] for _ in range(course_count)]\n    for course, before in prerequisites: graph[before].append(course)\n    color = [0] * course_count\n    for start in range(course_count):\n        if color[start] != 0: continue\n        color[start] = 1\n        stack = [(start, 0)]\n        while stack:\n            course, edge_index = stack[-1]\n            if edge_index == len(graph[course]):\n                color[course] = 2\n                stack.pop()\n                continue\n            next_course = graph[course][edge_index]\n            stack[-1] = (course, edge_index + 1)\n            if color[next_course] == 1: return False\n            if color[next_course] == 0:\n                color[next_course] = 1\n                stack.append((next_course, 0))\n    return True",
        "steps": [
          "有向图无环等价于拓扑排序能取出全部节点。",
          "深度优先可用三色状态发现回到当前路径的边。"
        ],
        "pitfalls": [
          "深度优先可用三色状态发现回到当前路径的边。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/course-schedule/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/course-schedule/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 51
  },
  {
    "id": "implement-trie-prefix-tree",
    "number": 208,
    "title": "实现 Trie（前缀树）",
    "topic": "图论",
    "summary": "依次执行插入、完整单词查询和前缀查询，返回每次查询得到的布尔值。",
    "signature": "solve(operations) → list[bool]",
    "starter": "def solve(operations):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每条边代表一个字符，节点需要额外记录单词是否在此结束。",
      "字典嵌套与固定 26 路节点是两种常见表示。"
    ],
    "tests": [
      {
        "label": "共享前缀的两个单词",
        "args": [
          [
            [
              "insert",
              "stone"
            ],
            [
              "insert",
              "stove"
            ],
            [
              "search",
              "sto"
            ],
            [
              "startsWith",
              "sto"
            ],
            [
              "search",
              "stone"
            ]
          ]
        ],
        "expected": [
          false,
          true,
          true
        ]
      },
      {
        "label": "空前缀与缺失单词",
        "args": [
          [
            [
              "insert",
              "map"
            ],
            [
              "startsWith",
              ""
            ],
            [
              "search",
              "maps"
            ]
          ]
        ],
        "expected": [
          true,
          false
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "嵌套字典",
        "idea": "每个字符对应子字典，并用特殊终止键标记完整单词。",
        "complexity": "单次操作 O(length)，空间 O(字符总数)。",
        "code": "def solve(operations):\n    root = {}\n    result = []\n    for operation, word in operations:\n        if operation == 'insert':\n            node = root\n            for char in word: node = node.setdefault(char, {})\n            node['#'] = True\n            continue\n        node = root\n        for char in word:\n            if char not in node: node = None; break\n            node = node[char]\n        if operation == 'search': result.append(node is not None and '#' in node)\n        else: result.append(node is not None)\n    return result",
        "steps": [
          "每条边代表一个字符，节点需要额外记录单词是否在此结束。",
          "字典嵌套与固定 26 路节点是两种常见表示。"
        ],
        "pitfalls": [
          "字典嵌套与固定 26 路节点是两种常见表示。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/implement-trie-prefix-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "节点对象",
        "idea": "节点保存 children 映射和 is_word 标记，查询逻辑复用前缀定位。",
        "complexity": "单次操作 O(length)，空间 O(字符总数)。",
        "code": "class TrieNode:\n    def __init__(self): self.children, self.is_word = {}, False\n\ndef solve(operations):\n    root = TrieNode(); result = []\n    for operation, word in operations:\n        node = root\n        if operation == 'insert':\n            for char in word: node = node.children.setdefault(char, TrieNode())\n            node.is_word = True\n        else:\n            for char in word:\n                node = node.children.get(char)\n                if node is None: break\n            result.append(node is not None and (operation == 'startsWith' or node.is_word))\n    return result",
        "steps": [
          "每条边代表一个字符，节点需要额外记录单词是否在此结束。",
          "字典嵌套与固定 26 路节点是两种常见表示。"
        ],
        "pitfalls": [
          "字典嵌套与固定 26 路节点是两种常见表示。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/implement-trie-prefix-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/implement-trie-prefix-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 52
  },
  {
    "id": "rotting-oranges",
    "number": 994,
    "title": "腐烂的橘子",
    "topic": "图论",
    "summary": "每分钟腐烂橘子会感染上下左右的新鲜橘子，返回全部腐烂所需分钟；无法完成返回 -1。",
    "signature": "solve(grid) → int",
    "starter": "def solve(grid):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "所有初始腐烂位置要同时进入队列，形成多源广度优先。",
      "每处理完一层队列才经过一分钟。"
    ],
    "tests": [
      {
        "label": "双源扩散",
        "args": [
          [
            [
              2,
              1,
              0,
              1
            ],
            [
              1,
              1,
              1,
              1
            ],
            [
              0,
              1,
              1,
              2
            ]
          ]
        ],
        "expected": 2
      },
      {
        "label": "没有新鲜橘子",
        "args": [
          [
            [
              0,
              2
            ],
            [
              0,
              0
            ]
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "多源广度优先",
        "idea": "初始腐烂橘子同时作为第零层，逐层感染相邻新鲜橘子。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "from collections import deque\n\ndef solve(grid):\n    rows, cols = len(grid), len(grid[0])\n    queue = deque()\n    fresh = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 2: queue.append((r,c))\n            elif grid[r][c] == 1: fresh += 1\n    minutes = 0\n    while queue and fresh:\n        for _ in range(len(queue)):\n            r, c = queue.popleft()\n            for nr, nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):\n                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                    grid[nr][nc] = 2; fresh -= 1; queue.append((nr,nc))\n        minutes += 1\n    return minutes if fresh == 0 else -1",
        "steps": [
          "所有初始腐烂位置要同时进入队列，形成多源广度优先。",
          "每处理完一层队列才经过一分钟。"
        ],
        "pitfalls": [
          "每处理完一层队列才经过一分钟。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotting-oranges/"
        }
      },
      {
        "id": "solution-2",
        "name": "逐分钟扫描",
        "idea": "每轮扫描所有腐烂橘子并标记邻居，直到没有新感染或新鲜数归零。",
        "complexity": "时间最坏 O((mn)²)，空间 O(mn)。",
        "code": "def solve(grid):\n    rows, cols = len(grid), len(grid[0])\n    fresh = sum(value == 1 for row in grid for value in row)\n    minutes = 0\n    while fresh:\n        newly = []\n        for r in range(rows):\n            for c in range(cols):\n                if grid[r][c] != 2: continue\n                for nr, nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):\n                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                        newly.append((nr,nc))\n        if not newly: return -1\n        for r, c in set(newly):\n            if grid[r][c] == 1: grid[r][c] = 2; fresh -= 1\n        minutes += 1\n    return minutes",
        "steps": [
          "所有初始腐烂位置要同时进入队列，形成多源广度优先。",
          "每处理完一层队列才经过一分钟。"
        ],
        "pitfalls": [
          "每处理完一层队列才经过一分钟。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/rotting-oranges/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/rotting-oranges/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 53
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "number": 17,
    "title": "电话号码的字母组合",
    "topic": "回溯",
    "summary": "根据电话按键映射，返回数字串可以表示的所有字母组合；空输入返回空列表。",
    "signature": "solve(digits) → list[str]",
    "starter": "def solve(digits):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每一位数字对应一次分支选择。",
      "路径长度等于数字串长度时保存结果。"
    ],
    "tests": [
      {
        "label": "一个四字母按键",
        "args": [
          "7"
        ],
        "expected": [
          "p",
          "q",
          "r",
          "s"
        ]
      },
      {
        "label": "跨越三个按键",
        "args": [
          "269"
        ],
        "expected": [
          "amw",
          "amx",
          "amy",
          "amz",
          "anw",
          "anx",
          "any",
          "anz",
          "aow",
          "aox",
          "aoy",
          "aoz",
          "bmw",
          "bmx",
          "bmy",
          "bmz",
          "bnw",
          "bnx",
          "bny",
          "bnz",
          "bow",
          "box",
          "boy",
          "boz",
          "cmw",
          "cmx",
          "cmy",
          "cmz",
          "cnw",
          "cnx",
          "cny",
          "cnz",
          "cow",
          "cox",
          "coy",
          "coz"
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "深度优先组合",
        "idea": "按数字下标递归，为当前按键的每个字母建立分支。",
        "complexity": "时间 O(4ⁿ)，空间 O(n)。",
        "code": "def solve(digits):\n    if not digits: return []\n    letters = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n    result, path = [], []\n    def backtrack(index):\n        if index == len(digits): result.append(''.join(path)); return\n        for char in letters[digits[index]]:\n            path.append(char); backtrack(index + 1); path.pop()\n    backtrack(0)\n    return result",
        "steps": [
          "每一位数字对应一次分支选择。",
          "路径长度等于数字串长度时保存结果。"
        ],
        "pitfalls": [
          "路径长度等于数字串长度时保存结果。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/"
        }
      },
      {
        "id": "solution-2",
        "name": "迭代笛卡尔积",
        "idea": "从空前缀开始，每读一个按键就扩展所有已有前缀。",
        "complexity": "时间 O(4ⁿ)，空间 O(4ⁿ)。",
        "code": "def solve(digits):\n    if not digits: return []\n    letters = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}\n    combinations = ['']\n    for digit in digits:\n        combinations = [prefix + char for prefix in combinations for char in letters[digit]]\n    return combinations",
        "steps": [
          "每一位数字对应一次分支选择。",
          "路径长度等于数字串长度时保存结果。"
        ],
        "pitfalls": [
          "路径长度等于数字串长度时保存结果。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/"
        }
      }
    ],
    "compare": "unordered",
    "referenceUrl": "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 54
  },
  {
    "id": "generate-parentheses",
    "number": 22,
    "title": "括号生成",
    "topic": "回溯",
    "summary": "返回由 n 对圆括号组成的全部合法字符串。",
    "signature": "solve(n) → list[str]",
    "starter": "def solve(n):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "任意前缀中右括号数量不能超过左括号。",
      "左括号未用完就能放；右括号少于左括号时才能放。"
    ],
    "tests": [
      {
        "label": "两对括号",
        "args": [
          2
        ],
        "expected": [
          "(())",
          "()()"
        ]
      },
      {
        "label": "四对括号",
        "args": [
          4
        ],
        "expected": [
          "(((())))",
          "((()()))",
          "((())())",
          "((()))()",
          "(()(()))",
          "(()()())",
          "(()())()",
          "(())(())",
          "(())()()",
          "()((()))",
          "()(()())",
          "()(())()",
          "()()(())",
          "()()()()"
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "计数回溯",
        "idea": "用 open 与 close 记录已放括号数量，只扩展仍可能合法的前缀。",
        "complexity": "时间 O(Cn·n)，空间 O(n)。",
        "code": "def solve(n):\n    result = []\n    def backtrack(path, opened, closed):\n        if len(path) == 2 * n: result.append(path); return\n        if opened < n: backtrack(path + '(', opened + 1, closed)\n        if closed < opened: backtrack(path + ')', opened, closed + 1)\n    backtrack('', 0, 0)\n    return result",
        "steps": [
          "任意前缀中右括号数量不能超过左括号。",
          "左括号未用完就能放；右括号少于左括号时才能放。"
        ],
        "pitfalls": [
          "左括号未用完就能放；右括号少于左括号时才能放。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/generate-parentheses/"
        }
      },
      {
        "id": "solution-2",
        "name": "剩余配额",
        "idea": "记录还可放多少左括号和右括号，剩余右括号必须始终不少于左括号。",
        "complexity": "时间 O(Cn·n)，空间 O(n)。",
        "code": "def solve(n):\n    result = []\n    def build(path, left, right):\n        if left == right == 0: result.append(path); return\n        if left: build(path + '(', left - 1, right)\n        if right > left: build(path + ')', left, right - 1)\n    build('', n, n)\n    return result",
        "steps": [
          "任意前缀中右括号数量不能超过左括号。",
          "左括号未用完就能放；右括号少于左括号时才能放。"
        ],
        "pitfalls": [
          "左括号未用完就能放；右括号少于左括号时才能放。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/generate-parentheses/"
        }
      }
    ],
    "compare": "unordered",
    "referenceUrl": "https://leetcode.cn/problems/generate-parentheses/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 55
  },
  {
    "id": "combination-sum",
    "number": 39,
    "title": "组合总和",
    "topic": "回溯",
    "summary": "从互不相同的正整数中选择若干个数，使总和等于目标；同一数字可重复选择。",
    "signature": "solve(candidates, target) → list[list[int]]",
    "starter": "def solve(candidates, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "递归参数需要包含本层可选择的起始下标。",
      "选择当前数后仍从当前下标递归，才能重复使用。"
    ],
    "tests": [
      {
        "label": "三种候选值",
        "args": [
          [
            3,
            4,
            8
          ],
          12
        ],
        "expected": [
          [
            3,
            3,
            3,
            3
          ],
          [
            4,
            4,
            4
          ],
          [
            4,
            8
          ]
        ]
      },
      {
        "label": "包含唯一组合",
        "args": [
          [
            5,
            7,
            11
          ],
          14
        ],
        "expected": [
          [
            7,
            7
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "选择起点回溯",
        "idea": "按非递减顺序构造组合，当前位置可以继续复用，也可转向后续候选。",
        "complexity": "指数时间，递归栈 O(target/min)。",
        "code": "def solve(candidates, target):\n    candidates.sort(); result, path = [], []\n    def backtrack(start, remaining):\n        if remaining == 0: result.append(path[:]); return\n        for i in range(start, len(candidates)):\n            value = candidates[i]\n            if value > remaining: break\n            path.append(value); backtrack(i, remaining - value); path.pop()\n    backtrack(0, target)\n    return result",
        "steps": [
          "递归参数需要包含本层可选择的起始下标。",
          "选择当前数后仍从当前下标递归，才能重复使用。"
        ],
        "pitfalls": [
          "选择当前数后仍从当前下标递归，才能重复使用。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/combination-sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "选或不选",
        "idea": "对当前候选分成继续选择它和跳到下一个候选两条递归分支。",
        "complexity": "指数时间，递归栈 O(target/min+n)。",
        "code": "def solve(candidates, target):\n    candidates.sort(); result, path = [], []\n    def search(index, remaining):\n        if remaining == 0: result.append(path[:]); return\n        if index == len(candidates) or candidates[index] > remaining: return\n        path.append(candidates[index]); search(index, remaining - candidates[index]); path.pop()\n        search(index + 1, remaining)\n    search(0, target)\n    return result",
        "steps": [
          "递归参数需要包含本层可选择的起始下标。",
          "选择当前数后仍从当前下标递归，才能重复使用。"
        ],
        "pitfalls": [
          "选择当前数后仍从当前下标递归，才能重复使用。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/combination-sum/"
        }
      }
    ],
    "compare": "nestedUnordered",
    "referenceUrl": "https://leetcode.cn/problems/combination-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 56
  },
  {
    "id": "permutations",
    "number": 46,
    "title": "全排列",
    "topic": "回溯",
    "summary": "返回互不相同数字的所有排列。",
    "signature": "solve(nums) → list[list[int]]",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "路径长度等于输入长度时得到一个排列。",
      "可用 used 数组，或在原数组上交换当前位置。"
    ],
    "tests": [
      {
        "label": "三个非连续值",
        "args": [
          [
            2,
            5,
            8
          ]
        ],
        "expected": [
          [
            2,
            5,
            8
          ],
          [
            2,
            8,
            5
          ],
          [
            5,
            2,
            8
          ],
          [
            5,
            8,
            2
          ],
          [
            8,
            2,
            5
          ],
          [
            8,
            5,
            2
          ]
        ]
      },
      {
        "label": "两个负值",
        "args": [
          [
            -3,
            -1
          ]
        ],
        "expected": [
          [
            -3,
            -1
          ],
          [
            -1,
            -3
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "路径加已用标记",
        "idea": "每层选择一个尚未使用的数字加入路径，回溯时撤销标记。",
        "complexity": "时间 O(n·n!)，空间 O(n)。",
        "code": "def solve(nums):\n    result, path = [], []\n    used = [False] * len(nums)\n    def backtrack():\n        if len(path) == len(nums): result.append(path[:]); return\n        for i, value in enumerate(nums):\n            if used[i]: continue\n            used[i] = True; path.append(value)\n            backtrack()\n            path.pop(); used[i] = False\n    backtrack()\n    return result",
        "steps": [
          "路径长度等于输入长度时得到一个排列。",
          "可用 used 数组，或在原数组上交换当前位置。"
        ],
        "pitfalls": [
          "可用 used 数组，或在原数组上交换当前位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/permutations/"
        }
      },
      {
        "id": "solution-2",
        "name": "原地交换",
        "idea": "第 first 位依次与后续每个位置交换，递归固定下一位。",
        "complexity": "时间 O(n·n!)，递归栈 O(n)。",
        "code": "def solve(nums):\n    result = []\n    def backtrack(first):\n        if first == len(nums): result.append(nums[:]); return\n        for i in range(first, len(nums)):\n            nums[first], nums[i] = nums[i], nums[first]\n            backtrack(first + 1)\n            nums[first], nums[i] = nums[i], nums[first]\n    backtrack(0)\n    return result",
        "steps": [
          "路径长度等于输入长度时得到一个排列。",
          "可用 used 数组，或在原数组上交换当前位置。"
        ],
        "pitfalls": [
          "可用 used 数组，或在原数组上交换当前位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/permutations/"
        }
      }
    ],
    "compare": "outerUnordered",
    "referenceUrl": "https://leetcode.cn/problems/permutations/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 57
  },
  {
    "id": "n-queens",
    "number": 51,
    "title": "N 皇后",
    "topic": "回溯",
    "summary": "在 n×n 棋盘放置 n 个皇后，使它们互不攻击，返回所有棋盘方案。",
    "signature": "solve(n) → list[list[str]]",
    "starter": "def solve(n):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "逐行放置，每行只需选择一列。",
      "列、主对角线 r-c、次对角线 r+c 都不能重复。"
    ],
    "tests": [
      {
        "label": "五皇后",
        "args": [
          5
        ],
        "expected": [
          [
            "Q....",
            "..Q..",
            "....Q",
            ".Q...",
            "...Q."
          ],
          [
            "Q....",
            "...Q.",
            ".Q...",
            "....Q",
            "..Q.."
          ],
          [
            ".Q...",
            "...Q.",
            "Q....",
            "..Q..",
            "....Q"
          ],
          [
            ".Q...",
            "....Q",
            "..Q..",
            "Q....",
            "...Q."
          ],
          [
            "..Q..",
            "Q....",
            "...Q.",
            ".Q...",
            "....Q"
          ],
          [
            "..Q..",
            "....Q",
            ".Q...",
            "...Q.",
            "Q...."
          ],
          [
            "...Q.",
            "Q....",
            "..Q..",
            "....Q",
            ".Q..."
          ],
          [
            "...Q.",
            ".Q...",
            "....Q",
            "..Q..",
            "Q...."
          ],
          [
            "....Q",
            ".Q...",
            "...Q.",
            "Q....",
            "..Q.."
          ],
          [
            "....Q",
            "..Q..",
            "Q....",
            "...Q.",
            ".Q..."
          ]
        ]
      },
      {
        "label": "两皇后无解",
        "args": [
          2
        ],
        "expected": []
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "集合剪枝",
        "idea": "逐行尝试列，用三个集合判断列与两类对角线冲突。",
        "complexity": "时间 O(n!)，空间 O(n)。",
        "code": "def solve(n):\n    result, board = [], [['.'] * n for _ in range(n)]\n    columns, diagonal1, diagonal2 = set(), set(), set()\n    def backtrack(row):\n        if row == n: result.append([''.join(line) for line in board]); return\n        for col in range(n):\n            if col in columns or row-col in diagonal1 or row+col in diagonal2: continue\n            columns.add(col); diagonal1.add(row-col); diagonal2.add(row+col); board[row][col] = 'Q'\n            backtrack(row + 1)\n            board[row][col] = '.'; columns.remove(col); diagonal1.remove(row-col); diagonal2.remove(row+col)\n    backtrack(0)\n    return result",
        "steps": [
          "逐行放置，每行只需选择一列。",
          "列、主对角线 r-c、次对角线 r+c 都不能重复。"
        ],
        "pitfalls": [
          "列、主对角线 r-c、次对角线 r+c 都不能重复。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/n-queens/"
        }
      },
      {
        "id": "solution-2",
        "name": "位掩码",
        "idea": "用整数位集合表示已占列和两类对角线，从最低可用位依次建立分支。",
        "complexity": "时间 O(n!)，空间 O(n)。",
        "code": "def solve(n):\n    result, positions = [], []\n    full = (1 << n) - 1\n    def backtrack(columns, left_diag, right_diag):\n        row = len(positions)\n        if row == n:\n            result.append(['.' * col + 'Q' + '.' * (n-col-1) for col in positions]); return\n        available = full & ~(columns | left_diag | right_diag)\n        while available:\n            bit = available & -available; available -= bit\n            positions.append(bit.bit_length() - 1)\n            backtrack(columns | bit, (left_diag | bit) << 1, (right_diag | bit) >> 1)\n            positions.pop()\n    backtrack(0, 0, 0)\n    return result",
        "steps": [
          "逐行放置，每行只需选择一列。",
          "列、主对角线 r-c、次对角线 r+c 都不能重复。"
        ],
        "pitfalls": [
          "列、主对角线 r-c、次对角线 r+c 都不能重复。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/n-queens/"
        }
      }
    ],
    "compare": "outerUnordered",
    "referenceUrl": "https://leetcode.cn/problems/n-queens/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 58
  },
  {
    "id": "subsets",
    "number": 78,
    "title": "子集",
    "topic": "回溯",
    "level": "进阶",
    "minutes": 35,
    "prerequisites": [
      "递归",
      "路径与选择",
      "列表复制"
    ],
    "summary": "给定一组互不相同的整数，返回所有可能的子集，包括空集与原集合。返回顺序不限。",
    "signature": "solve(nums) → list[list]",
    "why": "对每个数字都有“选”与“不选”两种决定。回溯用一条路径表示已经做出的选择，并系统地枚举后续可能。",
    "insight": "每到一个递归节点，当前 path 本身就是一个合法子集，所以先记录，再从 start 继续选择。",
    "steps": [
      "准备 path 和 result。",
      "进入 backtrack(start) 时，先复制 path 加入结果。",
      "从 start 起逐个选择 nums[index]，递归探索后续。",
      "递归返回后弹出刚才选择的数字，恢复现场。"
    ],
    "complexity": "共有 2^n 个子集，时间和输出空间均为 O(n·2^n)。",
    "trace": [
      [
        "path",
        "[]"
      ],
      [
        "选择 1",
        "[1]"
      ],
      [
        "再选 2",
        "[1,2]"
      ],
      [
        "撤销",
        "回到 [1]"
      ]
    ],
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums):\n    result = []\n    path = []\n\n    def backtrack(start):\n        result.append(path.copy())\n\n        for index in range(start, len(nums)):\n            path.append(nums[index])\n            backtrack(index + 1)\n            path.pop()\n\n    backtrack(0)\n    return result",
    "hints": [
      "方向：每个递归节点都代表一个已经完成的子集。",
      "关键量：start 防止回头重复选择；path.copy() 防止结果里的列表一起变化。",
      "骨架：记录 path.copy()；for index in range(start, len(nums))；append、递归 index+1、pop。"
    ],
    "tests": [
      {
        "label": "三个非连续值",
        "args": [
          [
            2,
            5,
            9
          ]
        ],
        "expected": [
          [],
          [
            2
          ],
          [
            2,
            5
          ],
          [
            2,
            5,
            9
          ],
          [
            2,
            9
          ],
          [
            5
          ],
          [
            5,
            9
          ],
          [
            9
          ]
        ]
      },
      {
        "label": "包含负值",
        "args": [
          [
            -2,
            4
          ]
        ],
        "expected": [
          [],
          [
            -2
          ],
          [
            -2,
            4
          ],
          [
            4
          ]
        ]
      }
    ],
    "compare": "nestedUnordered",
    "variant": "如果输入允许重复数字，并要求结果不重复，排序后应在哪一层跳过相邻重复选择？",
    "solutions": [
      {
        "id": "primary",
        "name": "回溯主解法",
        "idea": "每到一个递归节点，当前 path 本身就是一个合法子集，所以先记录，再从 start 继续选择。",
        "steps": [
          "准备 path 和 result。",
          "进入 backtrack(start) 时，先复制 path 加入结果。",
          "从 start 起逐个选择 nums[index]，递归探索后续。",
          "递归返回后弹出刚才选择的数字，恢复现场。"
        ],
        "complexity": "共有 2^n 个子集，时间和输出空间均为 O(n·2^n)。",
        "pitfalls": [
          "关键量：start 防止回头重复选择；path.copy() 防止结果里的列表一起变化。",
          "骨架：记录 path.copy()；for index in range(start, len(nums))；append、递归 index+1、pop。"
        ],
        "code": "def solve(nums):\n    result = []\n    path = []\n\n    def backtrack(start):\n        result.append(path.copy())\n\n        for index in range(start, len(nums)):\n            path.append(nums[index])\n            backtrack(index + 1)\n            path.pop()\n\n    backtrack(0)\n    return result",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subsets/"
        }
      },
      {
        "id": "alternate",
        "name": "二进制枚举",
        "idea": "用 n 位二进制掩码表示每个数字是否被选择，一共枚举 2ⁿ 个掩码。",
        "steps": [
          "枚举 0 到 2ⁿ-1。",
          "检查每一位是否为 1。",
          "把对应数字加入当前子集。"
        ],
        "complexity": "时间 O(n·2ⁿ)，额外输出空间 O(n·2ⁿ)。",
        "pitfalls": [
          "位 i 对应 nums[i]。",
          "零掩码自然产生空集。"
        ],
        "code": "def solve(nums):\n    result = []\n    for mask in range(1 << len(nums)):\n        subset = []\n        for index, value in enumerate(nums):\n            if mask & (1 << index):\n                subset.append(value)\n        result.append(subset)\n    return result",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subsets/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/subsets/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 59
  },
  {
    "id": "word-search",
    "number": 79,
    "title": "单词搜索",
    "topic": "回溯",
    "summary": "判断字符网格中能否通过上下左右相邻且不重复使用同一格，依次拼出目标单词。",
    "signature": "solve(board, word) → bool",
    "starter": "def solve(board, word):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "从每个与首字符相同的位置尝试深搜。",
      "进入格子时标记已用，返回前恢复。"
    ],
    "tests": [
      {
        "label": "沿边界转向",
        "args": [
          [
            [
              "M",
              "A",
              "P"
            ],
            [
              "R",
              "O",
              "T"
            ],
            [
              "S",
              "E",
              "N"
            ]
          ],
          "MATES"
        ],
        "expected": false
      },
      {
        "label": "字符充足但无法连通",
        "args": [
          [
            [
              "A",
              "X",
              "A"
            ],
            [
              "B",
              "Y",
              "B"
            ]
          ],
          "ABAB"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "原地标记深搜",
        "idea": "匹配当前字符后暂时把格子改成哨兵，递归四个方向再恢复。",
        "complexity": "时间 O(mn·4ˡ)，递归栈 O(l)。",
        "code": "def solve(board, word):\n    rows, cols = len(board), len(board[0])\n    def search(r, c, index):\n        if index == len(word): return True\n        if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[index]: return False\n        saved, board[r][c] = board[r][c], '#'\n        found = any(search(r+dr, c+dc, index+1) for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)))\n        board[r][c] = saved\n        return found\n    return any(search(r, c, 0) for r in range(rows) for c in range(cols))",
        "steps": [
          "从每个与首字符相同的位置尝试深搜。",
          "进入格子时标记已用，返回前恢复。"
        ],
        "pitfalls": [
          "进入格子时标记已用，返回前恢复。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-search/"
        }
      },
      {
        "id": "solution-2",
        "name": "访问集合",
        "idea": "用集合保存当前路径占用的坐标，不修改输入网格。",
        "complexity": "时间 O(mn·4ˡ)，空间 O(l)。",
        "code": "def solve(board, word):\n    rows, cols = len(board), len(board[0]); used = set()\n    def search(r, c, index):\n        if index == len(word): return True\n        if not (0 <= r < rows and 0 <= c < cols) or (r,c) in used or board[r][c] != word[index]: return False\n        used.add((r,c))\n        found = search(r+1,c,index+1) or search(r-1,c,index+1) or search(r,c+1,index+1) or search(r,c-1,index+1)\n        used.remove((r,c))\n        return found\n    return any(search(r,c,0) for r in range(rows) for c in range(cols))",
        "steps": [
          "从每个与首字符相同的位置尝试深搜。",
          "进入格子时标记已用，返回前恢复。"
        ],
        "pitfalls": [
          "进入格子时标记已用，返回前恢复。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-search/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/word-search/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 60
  },
  {
    "id": "palindrome-partitioning",
    "number": 131,
    "title": "分割回文串",
    "topic": "回溯",
    "summary": "把字符串切分成若干段，使每一段都是回文串，返回全部切分方案。",
    "signature": "solve(text) → list[list[str]]",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "当前位置枚举所有可能的结束位置。",
      "只有当前片段是回文时才继续递归剩余后缀。"
    ],
    "tests": [
      {
        "label": "包含三字符回文",
        "args": [
          "levelx"
        ],
        "expected": [
          [
            "l",
            "e",
            "v",
            "e",
            "l",
            "x"
          ],
          [
            "l",
            "eve",
            "l",
            "x"
          ],
          [
            "level",
            "x"
          ]
        ]
      },
      {
        "label": "无多字符回文",
        "args": [
          "xyz"
        ],
        "expected": [
          [
            "x",
            "y",
            "z"
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "回溯即时判断",
        "idea": "枚举下一段终点，用反转比较判断该片段是否回文。",
        "complexity": "时间 O(n·2ⁿ)，空间 O(n)。",
        "code": "def solve(text):\n    result, path = [], []\n    def backtrack(start):\n        if start == len(text): result.append(path[:]); return\n        for end in range(start + 1, len(text) + 1):\n            part = text[start:end]\n            if part != part[::-1]: continue\n            path.append(part); backtrack(end); path.pop()\n    backtrack(0)\n    return result",
        "steps": [
          "当前位置枚举所有可能的结束位置。",
          "只有当前片段是回文时才继续递归剩余后缀。"
        ],
        "pitfalls": [
          "只有当前片段是回文时才继续递归剩余后缀。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindrome-partitioning/"
        }
      },
      {
        "id": "solution-2",
        "name": "回文表预处理",
        "idea": "先动态规划所有回文区间，回溯时 O(1) 判断片段是否合法。",
        "complexity": "时间 O(n²+2ⁿ)，空间 O(n²)。",
        "code": "def solve(text):\n    n = len(text); palindrome = [[False] * n for _ in range(n)]\n    for start in range(n - 1, -1, -1):\n        for end in range(start, n):\n            palindrome[start][end] = text[start] == text[end] and (end - start < 2 or palindrome[start + 1][end - 1])\n    result, path = [], []\n    def backtrack(start):\n        if start == n: result.append(path[:]); return\n        for end in range(start, n):\n            if palindrome[start][end]:\n                path.append(text[start:end + 1]); backtrack(end + 1); path.pop()\n    backtrack(0)\n    return result",
        "steps": [
          "当前位置枚举所有可能的结束位置。",
          "只有当前片段是回文时才继续递归剩余后缀。"
        ],
        "pitfalls": [
          "只有当前片段是回文时才继续递归剩余后缀。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindrome-partitioning/"
        }
      }
    ],
    "compare": "nestedUnordered",
    "referenceUrl": "https://leetcode.cn/problems/palindrome-partitioning/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 61
  },
  {
    "id": "median-of-two-sorted-arrays",
    "number": 4,
    "title": "寻找两个正序数组的中位数",
    "topic": "二分查找",
    "summary": "返回两个升序数组合并后的中位数，要求理解对较短数组做分割的二分方法。",
    "signature": "solve(a, b) → float",
    "starter": "def solve(a, b):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把两个数组切成左半与右半，使左侧元素总数固定。",
      "合法分割要求 a_left≤b_right 且 b_left≤a_right。"
    ],
    "tests": [
      {
        "label": "一侧为空",
        "args": [
          [],
          [
            4,
            9,
            15
          ]
        ],
        "expected": 9
      },
      {
        "label": "长度差较大",
        "args": [
          [
            1,
            8
          ],
          [
            2,
            3,
            5,
            10,
            12
          ]
        ],
        "expected": 5
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "短数组分割二分",
        "idea": "二分较短数组的分割点，另一数组分割点由左半总长度确定。",
        "complexity": "时间 O(log min(m,n))，空间 O(1)。",
        "code": "def solve(a, b):\n    if len(a) > len(b): a, b = b, a\n    m, n = len(a), len(b)\n    left, right = 0, m\n    while left <= right:\n        cut_a = (left + right) // 2\n        cut_b = (m + n + 1) // 2 - cut_a\n        a_left = float('-inf') if cut_a == 0 else a[cut_a - 1]\n        a_right = float('inf') if cut_a == m else a[cut_a]\n        b_left = float('-inf') if cut_b == 0 else b[cut_b - 1]\n        b_right = float('inf') if cut_b == n else b[cut_b]\n        if a_left <= b_right and b_left <= a_right:\n            if (m + n) % 2: return max(a_left, b_left)\n            return (max(a_left, b_left) + min(a_right, b_right)) / 2\n        if a_left > b_right: right = cut_a - 1\n        else: left = cut_a + 1",
        "steps": [
          "把两个数组切成左半与右半，使左侧元素总数固定。",
          "合法分割要求 a_left≤b_right 且 b_left≤a_right。"
        ],
        "pitfalls": [
          "合法分割要求 a_left≤b_right 且 b_left≤a_right。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/median-of-two-sorted-arrays/"
        }
      },
      {
        "id": "solution-2",
        "name": "线性归并",
        "idea": "像归并排序一样逐个取出较小值，走到中间位置后计算中位数。",
        "complexity": "时间 O(m+n)，空间 O(m+n)。",
        "code": "def solve(a, b):\n    merged = []\n    i = j = 0\n    while i < len(a) or j < len(b):\n        if j == len(b) or (i < len(a) and a[i] <= b[j]): merged.append(a[i]); i += 1\n        else: merged.append(b[j]); j += 1\n    middle = len(merged) // 2\n    if len(merged) % 2: return merged[middle]\n    return (merged[middle - 1] + merged[middle]) / 2",
        "steps": [
          "把两个数组切成左半与右半，使左侧元素总数固定。",
          "合法分割要求 a_left≤b_right 且 b_left≤a_right。"
        ],
        "pitfalls": [
          "合法分割要求 a_left≤b_right 且 b_left≤a_right。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/median-of-two-sorted-arrays/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/median-of-two-sorted-arrays/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 62
  },
  {
    "id": "rotated-search",
    "number": 33,
    "title": "搜索旋转排序数组",
    "topic": "二分查找",
    "level": "进阶",
    "minutes": 35,
    "prerequisites": [
      "二分查找",
      "区间判断"
    ],
    "summary": "一个原本严格递增的数组在某个位置旋转后，仍要求在对数时间内找到目标值的位置；找不到返回 -1。",
    "signature": "solve(nums, target) → int",
    "why": "数组整体不再有序，但每次取中点后，左半边或右半边至少有一边仍然有序。这足以排除一半范围。",
    "insight": "先判断哪一半有序，再判断 target 是否落在这段有序区间里；不是直接猜旋转点。",
    "steps": [
      "使用闭区间 left 与 right。",
      "检查 nums[mid] 是否为目标。",
      "若 nums[left] <= nums[mid]，左半边有序；否则右半边有序。",
      "判断目标是否位于有序半边，保留它或排除它。"
    ],
    "complexity": "时间 O(log n)，额外空间 O(1)。",
    "trace": [
      [
        "数组",
        "4 5 6 1 2 3"
      ],
      [
        "mid",
        "6"
      ],
      [
        "左半有序",
        "4..6"
      ],
      [
        "目标 2",
        "去右边"
      ]
    ],
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums, target):\n    left, right = 0, len(nums) - 1\n\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n\n    return -1",
    "hints": [
      "方向：每轮至少有一半仍保持递增。",
      "关键量：用 nums[left] <= nums[mid] 判断左半边是否有序。",
      "骨架：在有序半边内用两个边界判断 target 是否落入，然后移动 left 或 right。"
    ],
    "tests": [
      {
        "label": "目标位于左段",
        "args": [
          [
            13,
            17,
            21,
            2,
            5,
            9
          ],
          17
        ],
        "expected": 1
      },
      {
        "label": "未旋转且缺失",
        "args": [
          [
            2,
            6,
            10,
            14
          ],
          7
        ],
        "expected": -1
      }
    ],
    "compare": "exact",
    "variant": "如果数组中允许重复值，nums[left] == nums[mid] 时为何难以判断哪边有序？",
    "solutions": [
      {
        "id": "primary",
        "name": "二分查找主解法",
        "idea": "先判断哪一半有序，再判断 target 是否落在这段有序区间里；不是直接猜旋转点。",
        "steps": [
          "使用闭区间 left 与 right。",
          "检查 nums[mid] 是否为目标。",
          "若 nums[left] <= nums[mid]，左半边有序；否则右半边有序。",
          "判断目标是否位于有序半边，保留它或排除它。"
        ],
        "complexity": "时间 O(log n)，额外空间 O(1)。",
        "pitfalls": [
          "关键量：用 nums[left] <= nums[mid] 判断左半边是否有序。",
          "骨架：在有序半边内用两个边界判断 target 是否落入，然后移动 left 或 right。"
        ],
        "code": "def solve(nums, target):\n    left, right = 0, len(nums) - 1\n\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n\n    return -1",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array/"
        }
      },
      {
        "id": "alternate",
        "name": "先找旋转点",
        "idea": "先二分找到最小值位置，再把逻辑下标映射到旋转后的真实下标。",
        "steps": [
          "二分比较 mid 与 right 找到 pivot。",
          "在逻辑有序数组上做普通二分。",
          "用 (mid + pivot) % n 映射真实位置。"
        ],
        "complexity": "时间 O(log n)，额外空间 O(1)。",
        "pitfalls": [
          "空数组直接返回 -1。",
          "该写法依赖数组元素互不相同。"
        ],
        "code": "def solve(nums, target):\n    if not nums:\n        return -1\n    left, right = 0, len(nums) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] > nums[right]:\n            left = mid + 1\n        else:\n            right = mid\n    pivot = left\n\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        real = (mid + pivot) % len(nums)\n        if nums[real] == target:\n            return real\n        if nums[real] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-in-rotated-sorted-array/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/search-in-rotated-sorted-array/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 63
  },
  {
    "id": "find-first-and-last-position-of-element-in-sorted-array",
    "number": 34,
    "title": "在排序数组中查找元素的第一个和最后一个位置",
    "topic": "二分查找",
    "summary": "在非递减数组中返回目标值出现区间的左右端点，不存在则返回 [-1,-1]。",
    "signature": "solve(nums, target) → [left, right]",
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "分别寻找第一个不小于 target 和第一个大于 target 的位置。",
      "右端点等于 upper_bound-1。"
    ],
    "tests": [
      {
        "label": "目标出现三次",
        "args": [
          [
            1,
            2,
            4,
            4,
            4,
            9,
            12
          ],
          4
        ],
        "expected": [
          2,
          4
        ]
      },
      {
        "label": "目标小于首项",
        "args": [
          [
            3,
            5,
            5,
            8
          ],
          1
        ],
        "expected": [
          -1,
          -1
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "两次边界二分",
        "idea": "通用 lower 函数按严格条件分别计算左右边界。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums, target):\n    def lower(value):\n        left, right = 0, len(nums)\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] < value: left = mid + 1\n            else: right = mid\n        return left\n    left = lower(target)\n    if left == len(nums) or nums[left] != target: return [-1, -1]\n    return [left, lower(target + 1) - 1]",
        "steps": [
          "分别寻找第一个不小于 target 和第一个大于 target 的位置。",
          "右端点等于 upper_bound-1。"
        ],
        "pitfalls": [
          "右端点等于 upper_bound-1。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/"
        }
      },
      {
        "id": "solution-2",
        "name": "bisect 边界",
        "idea": "标准库分别给出最左插入点和最右插入点。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "from bisect import bisect_left, bisect_right\n\ndef solve(nums, target):\n    left = bisect_left(nums, target)\n    if left == len(nums) or nums[left] != target: return [-1, -1]\n    return [left, bisect_right(nums, target) - 1]",
        "steps": [
          "分别寻找第一个不小于 target 和第一个大于 target 的位置。",
          "右端点等于 upper_bound-1。"
        ],
        "pitfalls": [
          "右端点等于 upper_bound-1。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 64
  },
  {
    "id": "search-insert-position",
    "number": 35,
    "title": "搜索插入位置",
    "topic": "二分查找",
    "summary": "在严格递增数组中返回目标值下标；若不存在，返回保持有序时应插入的位置。",
    "signature": "solve(nums, target) → int",
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "寻找第一个大于或等于 target 的位置。",
      "使用左闭右开区间能让返回值自然落在数组末尾。"
    ],
    "tests": [
      {
        "label": "插入最前面",
        "args": [
          [
            4,
            9,
            13,
            21
          ],
          2
        ],
        "expected": 0
      },
      {
        "label": "插入末尾",
        "args": [
          [
            -5,
            0,
            7
          ],
          12
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "左闭右开二分",
        "idea": "维护答案所在的 [left,right) 区间，最终 left 即第一个不小于目标的位置。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target: left = mid + 1\n        else: right = mid\n    return left",
        "steps": [
          "寻找第一个大于或等于 target 的位置。",
          "使用左闭右开区间能让返回值自然落在数组末尾。"
        ],
        "pitfalls": [
          "使用左闭右开区间能让返回值自然落在数组末尾。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-insert-position/"
        }
      },
      {
        "id": "solution-2",
        "name": "标准库 lower_bound",
        "idea": "bisect_left 直接返回有序序列中目标的最左插入点。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "from bisect import bisect_left\n\ndef solve(nums, target):\n    return bisect_left(nums, target)",
        "steps": [
          "寻找第一个大于或等于 target 的位置。",
          "使用左闭右开区间能让返回值自然落在数组末尾。"
        ],
        "pitfalls": [
          "使用左闭右开区间能让返回值自然落在数组末尾。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-insert-position/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/search-insert-position/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 65
  },
  {
    "id": "search-a-2d-matrix",
    "number": 74,
    "title": "搜索二维矩阵",
    "topic": "二分查找",
    "summary": "矩阵每行递增且下一行首值大于上一行尾值，判断目标是否存在。",
    "signature": "solve(matrix, target) → bool",
    "starter": "def solve(matrix, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "整个矩阵可视作一维递增数组。",
      "一维下标 index 对应 matrix[index//cols][index%cols]。"
    ],
    "tests": [
      {
        "label": "目标位于末行",
        "args": [
          [
            [
              2,
              4,
              8
            ],
            [
              11,
              15,
              19
            ],
            [
              22,
              30,
              41
            ]
          ],
          30
        ],
        "expected": true
      },
      {
        "label": "目标落在行间",
        "args": [
          [
            [
              3,
              6
            ],
            [
              10,
              14
            ],
            [
              20,
              27
            ]
          ],
          17
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "展平下标二分",
        "idea": "不复制矩阵，用商和余数把一维中点映射回行列。",
        "complexity": "时间 O(log(mn))，空间 O(1)。",
        "code": "def solve(matrix, target):\n    if not matrix: return False\n    rows, cols = len(matrix), len(matrix[0])\n    left, right = 0, rows * cols - 1\n    while left <= right:\n        mid = (left + right) // 2\n        value = matrix[mid // cols][mid % cols]\n        if value == target: return True\n        if value < target: left = mid + 1\n        else: right = mid - 1\n    return False",
        "steps": [
          "整个矩阵可视作一维递增数组。",
          "一维下标 index 对应 matrix[index//cols][index%cols]。"
        ],
        "pitfalls": [
          "一维下标 index 对应 matrix[index//cols][index%cols]。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-a-2d-matrix/"
        }
      },
      {
        "id": "solution-2",
        "name": "先定位行再定位列",
        "idea": "先按每行首值找到候选行，再在该行中二分。",
        "complexity": "时间 O(m+log n)，空间 O(m)；首值列表的构造占 O(m)。",
        "code": "from bisect import bisect_right, bisect_left\n\ndef solve(matrix, target):\n    if not matrix: return False\n    row = bisect_right([line[0] for line in matrix], target) - 1\n    if row < 0: return False\n    col = bisect_left(matrix[row], target)\n    return col < len(matrix[row]) and matrix[row][col] == target",
        "steps": [
          "整个矩阵可视作一维递增数组。",
          "一维下标 index 对应 matrix[index//cols][index%cols]。"
        ],
        "pitfalls": [
          "一维下标 index 对应 matrix[index//cols][index%cols]。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/search-a-2d-matrix/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/search-a-2d-matrix/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 66
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "number": 153,
    "title": "寻找旋转排序数组中的最小值",
    "topic": "二分查找",
    "summary": "在元素互不相同、由升序数组旋转得到的列表中返回最小值。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "比较 mid 与 right 能判断最小值位于哪一半。",
      "若 nums[mid] 大于右端，最小值必在 mid 右侧。"
    ],
    "tests": [
      {
        "label": "旋转一个位置",
        "args": [
          [
            9,
            2,
            4,
            6,
            8
          ]
        ],
        "expected": 2
      },
      {
        "label": "旋转到中间",
        "args": [
          [
            14,
            18,
            21,
            3,
            7,
            11
          ]
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "与右端比较",
        "idea": "右端值来自最小值所在有序段，用它判断中点在左段还是右段。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] > nums[right]: left = mid + 1\n        else: right = mid\n    return nums[left]",
        "steps": [
          "比较 mid 与 right 能判断最小值位于哪一半。",
          "若 nums[mid] 大于右端，最小值必在 mid 右侧。"
        ],
        "pitfalls": [
          "若 nums[mid] 大于右端，最小值必在 mid 右侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/"
        }
      },
      {
        "id": "solution-2",
        "name": "查找下降断点",
        "idea": "二分缩小到相邻边界；也可先识别数组本来有序的情况。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums):\n    left, right = 0, len(nums) - 1\n    if nums[left] <= nums[right]: return nums[left]\n    while left + 1 < right:\n        mid = (left + right) // 2\n        if nums[mid] >= nums[left]: left = mid\n        else: right = mid\n    return nums[right]",
        "steps": [
          "比较 mid 与 right 能判断最小值位于哪一半。",
          "若 nums[mid] 大于右端，最小值必在 mid 右侧。"
        ],
        "pitfalls": [
          "若 nums[mid] 大于右端，最小值必在 mid 右侧。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 67
  },
  {
    "id": "valid-parentheses",
    "number": 20,
    "title": "有效的括号",
    "topic": "栈",
    "level": "基础",
    "minutes": 20,
    "prerequisites": [
      "列表作为栈",
      "字典映射"
    ],
    "summary": "判断一串圆括号、方括号和花括号是否按照正确类型与顺序成对闭合。",
    "signature": "solve(s) → bool",
    "why": "一个右括号必须匹配最近还没有闭合的左括号。“最近进入、最先离开”正是栈的行为。",
    "insight": "左括号入栈；右括号只和栈顶比较。任何类型不符或栈为空都立即失败。",
    "steps": [
      "建立右括号到左括号的映射。",
      "遇到左括号就压入栈。",
      "遇到右括号时，检查栈非空且栈顶类型正确，再弹出。",
      "扫描结束后，栈必须为空。"
    ],
    "complexity": "时间 O(n)，最坏额外空间 O(n)。",
    "trace": [
      [
        "读取",
        "{ [ ("
      ],
      [
        "栈",
        "{ [ ("
      ],
      [
        "读取 )",
        "弹出 ("
      ],
      [
        "结束",
        "栈为空"
      ]
    ],
    "starter": "def solve(s):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n\n    for char in s:\n        if char not in pairs:\n            stack.append(char)\n        else:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n\n    return not stack",
    "hints": [
      "方向：需要记住最近出现、但尚未闭合的左括号。",
      "关键量：stack[-1] 必须等于 pairs[当前右括号]。",
      "骨架：左括号 append；右括号先判断 not stack，再比较并 pop；最后 return not stack。"
    ],
    "tests": [
      {
        "label": "多段依次闭合",
        "args": [
          "[]{}(())"
        ],
        "expected": true
      },
      {
        "label": "提前出现右括号",
        "args": [
          "]["
        ],
        "expected": false
      }
    ],
    "compare": "exact",
    "variant": "如果字符串里允许出现普通字母并应忽略它们，判断分支要如何区分？",
    "solutions": [
      {
        "id": "primary",
        "name": "栈主解法",
        "idea": "左括号入栈；右括号只和栈顶比较。任何类型不符或栈为空都立即失败。",
        "steps": [
          "建立右括号到左括号的映射。",
          "遇到左括号就压入栈。",
          "遇到右括号时，检查栈非空且栈顶类型正确，再弹出。",
          "扫描结束后，栈必须为空。"
        ],
        "complexity": "时间 O(n)，最坏额外空间 O(n)。",
        "pitfalls": [
          "关键量：stack[-1] 必须等于 pairs[当前右括号]。",
          "骨架：左括号 append；右括号先判断 not stack，再比较并 pop；最后 return not stack。"
        ],
        "code": "def solve(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n\n    for char in s:\n        if char not in pairs:\n            stack.append(char)\n        else:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n\n    return not stack",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-parentheses/"
        }
      },
      {
        "id": "alternate",
        "name": "预存期待括号",
        "idea": "遇到左括号时，把未来期待看到的右括号压栈；右括号只需与栈顶直接比较。",
        "steps": [
          "建立左括号到右括号的映射。",
          "左括号入栈其对应的右括号。",
          "右括号必须等于弹出的期待值。"
        ],
        "complexity": "时间 O(n)，额外空间 O(n)。",
        "pitfalls": [
          "弹栈前先判断栈是否为空。",
          "扫描结束仍需确认栈为空。"
        ],
        "code": "def solve(s):\n    expected = {'(': ')', '[': ']', '{': '}'}\n    stack = []\n\n    for char in s:\n        if char in expected:\n            stack.append(expected[char])\n        elif not stack or stack.pop() != char:\n            return False\n\n    return not stack",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-parentheses/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/valid-parentheses/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 68
  },
  {
    "id": "largest-rectangle-in-histogram",
    "number": 84,
    "title": "柱状图中最大的矩形",
    "topic": "栈",
    "summary": "在相邻柱子组成的直方图中，返回完全位于柱子内部的最大矩形面积。",
    "signature": "solve(heights) → int",
    "starter": "def solve(heights):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "单调栈在遇到更矮柱时结算被弹出高度。",
      "弹出后新的栈顶是左侧第一个更矮位置。"
    ],
    "tests": [
      {
        "label": "平台夹低柱",
        "args": [
          [
            3,
            3,
            1,
            4,
            4,
            4
          ]
        ],
        "expected": 12
      },
      {
        "label": "单柱高度",
        "args": [
          [
            9
          ]
        ],
        "expected": 9
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "哨兵单调栈",
        "idea": "两端补零，栈保存递增高度下标，弹出时用左右更矮边界计算宽度。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(heights):\n    values = [0] + heights + [0]\n    stack, best = [0], 0\n    for right in range(1, len(values)):\n        while values[stack[-1]] > values[right]:\n            height = values[stack.pop()]\n            width = right - stack[-1] - 1\n            best = max(best, height * width)\n        stack.append(right)\n    return best",
        "steps": [
          "单调栈在遇到更矮柱时结算被弹出高度。",
          "弹出后新的栈顶是左侧第一个更矮位置。"
        ],
        "pitfalls": [
          "弹出后新的栈顶是左侧第一个更矮位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/largest-rectangle-in-histogram/"
        }
      },
      {
        "id": "solution-2",
        "name": "预计算左右边界",
        "idea": "分别求每根柱左、右第一个更矮位置，宽度由两边界之差确定。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(heights):\n    n = len(heights); left = [-1] * n; right = [n] * n\n    stack = []\n    for i, value in enumerate(heights):\n        while stack and heights[stack[-1]] >= value: stack.pop()\n        left[i] = stack[-1] if stack else -1; stack.append(i)\n    stack.clear()\n    for i in range(n - 1, -1, -1):\n        while stack and heights[stack[-1]] >= heights[i]: stack.pop()\n        right[i] = stack[-1] if stack else n; stack.append(i)\n    return max((heights[i] * (right[i] - left[i] - 1) for i in range(n)), default=0)",
        "steps": [
          "单调栈在遇到更矮柱时结算被弹出高度。",
          "弹出后新的栈顶是左侧第一个更矮位置。"
        ],
        "pitfalls": [
          "弹出后新的栈顶是左侧第一个更矮位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/largest-rectangle-in-histogram/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/largest-rectangle-in-histogram/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 69
  },
  {
    "id": "min-stack",
    "number": 155,
    "title": "最小栈",
    "topic": "栈",
    "summary": "执行 push、pop、top 和 getMin 操作，要求读取栈顶和最小值都是常数时间；返回查询结果。",
    "signature": "solve(operations) → list[int]",
    "starter": "def solve(operations):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "辅助栈同步保存每个深度对应的最小值。",
      "也可在每个栈元素旁保存入栈时的最小值。"
    ],
    "tests": [
      {
        "label": "最小值重复后连续弹出",
        "args": [
          [
            [
              "push",
              4
            ],
            [
              "push",
              -1
            ],
            [
              "push",
              -1
            ],
            [
              "getMin"
            ],
            [
              "pop"
            ],
            [
              "getMin"
            ],
            [
              "pop"
            ],
            [
              "top"
            ]
          ]
        ],
        "expected": [
          -1,
          -1,
          4
        ]
      },
      {
        "label": "最小值逐步下降",
        "args": [
          [
            [
              "push",
              8
            ],
            [
              "push",
              3
            ],
            [
              "push",
              5
            ],
            [
              "push",
              1
            ],
            [
              "getMin"
            ],
            [
              "top"
            ]
          ]
        ],
        "expected": [
          1,
          1
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双栈同步",
        "idea": "数据栈保存值，最小栈在每层保存到该层为止的最小值。",
        "complexity": "每次操作 O(1)，空间 O(n)。",
        "code": "def solve(operations):\n    values, minimums, result = [], [], []\n    for operation in operations:\n        name = operation[0]\n        if name == 'push':\n            value = operation[1]; values.append(value)\n            minimums.append(value if not minimums else min(value, minimums[-1]))\n        elif name == 'pop': values.pop(); minimums.pop()\n        elif name == 'top': result.append(values[-1])\n        else: result.append(minimums[-1])\n    return result",
        "steps": [
          "辅助栈同步保存每个深度对应的最小值。",
          "也可在每个栈元素旁保存入栈时的最小值。"
        ],
        "pitfalls": [
          "也可在每个栈元素旁保存入栈时的最小值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-stack/"
        }
      },
      {
        "id": "solution-2",
        "name": "单栈保存二元组",
        "idea": "每个元素同时记录自身值与入栈后的全局最小值。",
        "complexity": "每次操作 O(1)，空间 O(n)。",
        "code": "def solve(operations):\n    stack, result = [], []\n    for operation in operations:\n        name = operation[0]\n        if name == 'push':\n            value = operation[1]\n            stack.append((value, value if not stack else min(value, stack[-1][1])))\n        elif name == 'pop': stack.pop()\n        elif name == 'top': result.append(stack[-1][0])\n        else: result.append(stack[-1][1])\n    return result",
        "steps": [
          "辅助栈同步保存每个深度对应的最小值。",
          "也可在每个栈元素旁保存入栈时的最小值。"
        ],
        "pitfalls": [
          "也可在每个栈元素旁保存入栈时的最小值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-stack/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/min-stack/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 70
  },
  {
    "id": "decode-string",
    "number": 394,
    "title": "字符串解码",
    "topic": "栈",
    "summary": "解码形如 k[片段] 的嵌套字符串，其中片段需要重复 k 次。",
    "signature": "solve(text) → str",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "遇到左括号时保存外层字符串和重复次数。",
      "遇到右括号时完成当前层并与外层拼接。"
    ],
    "tests": [
      {
        "label": "前后含普通字符",
        "args": [
          "x2[ab]y"
        ],
        "expected": "xababy"
      },
      {
        "label": "双层不同倍数",
        "args": [
          "2[p3[q]]"
        ],
        "expected": "pqqqpqqq"
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "状态栈",
        "idea": "栈保存进入括号前的前缀和倍数，右括号时恢复并拼接。",
        "complexity": "时间 O(输出长度)，空间 O(嵌套深度+输出)。",
        "code": "def solve(text):\n    stack = []\n    current, number = '', 0\n    for char in text:\n        if char.isdigit(): number = number * 10 + int(char)\n        elif char == '[':\n            stack.append((current, number)); current, number = '', 0\n        elif char == ']':\n            prefix, repeat = stack.pop(); current = prefix + current * repeat\n        else: current += char\n    return current",
        "steps": [
          "遇到左括号时保存外层字符串和重复次数。",
          "遇到右括号时完成当前层并与外层拼接。"
        ],
        "pitfalls": [
          "遇到右括号时完成当前层并与外层拼接。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/decode-string/"
        }
      },
      {
        "id": "solution-2",
        "name": "递归下降",
        "idea": "递归函数消费到对应右括号，返回当前层解码结果和新的读取位置。",
        "complexity": "时间 O(输出长度)，递归栈 O(嵌套深度)。",
        "code": "def solve(text):\n    def parse(index):\n        result, number = '', 0\n        while index < len(text):\n            char = text[index]\n            if char.isdigit(): number = number * 10 + int(char)\n            elif char == '[':\n                nested, index = parse(index + 1); result += nested * number; number = 0\n            elif char == ']': return result, index\n            else: result += char\n            index += 1\n        return result, index\n    return parse(0)[0]",
        "steps": [
          "遇到左括号时保存外层字符串和重复次数。",
          "遇到右括号时完成当前层并与外层拼接。"
        ],
        "pitfalls": [
          "遇到右括号时完成当前层并与外层拼接。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/decode-string/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/decode-string/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 71
  },
  {
    "id": "daily-temperatures",
    "number": 739,
    "title": "每日温度",
    "topic": "栈",
    "summary": "对每天的温度，返回还要等待多少天才会出现更高温度；之后没有则为零。",
    "signature": "solve(temperatures) → list[int]",
    "starter": "def solve(temperatures):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "单调栈保存仍在等待更高温度的下标。",
      "当前温度更高时可以连续结算栈顶。"
    ],
    "tests": [
      {
        "label": "先降后持续升温",
        "args": [
          [
            62,
            58,
            59,
            63,
            61,
            70
          ]
        ],
        "expected": [
          3,
          1,
          1,
          2,
          1,
          0
        ]
      },
      {
        "label": "相同温度不算回暖",
        "args": [
          [
            50,
            50,
            51,
            49
          ]
        ],
        "expected": [
          2,
          1,
          0,
          0
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "单调递减栈",
        "idea": "栈中温度递减；更高温度到来时弹出并用下标差填写答案。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(temperatures):\n    result = [0] * len(temperatures)\n    stack = []\n    for day, value in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < value:\n            previous = stack.pop(); result[previous] = day - previous\n        stack.append(day)\n    return result",
        "steps": [
          "单调栈保存仍在等待更高温度的下标。",
          "当前温度更高时可以连续结算栈顶。"
        ],
        "pitfalls": [
          "当前温度更高时可以连续结算栈顶。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/daily-temperatures/"
        }
      },
      {
        "id": "solution-2",
        "name": "从右跳跃",
        "idea": "从右向左利用已算出的等待天数跳过不够高的日期。",
        "complexity": "时间均摊 O(n)，空间 O(n)。",
        "code": "def solve(temperatures):\n    n = len(temperatures); result = [0] * n\n    for day in range(n - 2, -1, -1):\n        next_day = day + 1\n        while next_day < n and temperatures[next_day] <= temperatures[day]:\n            if result[next_day] == 0: next_day = n; break\n            next_day += result[next_day]\n        if next_day < n: result[day] = next_day - day\n    return result",
        "steps": [
          "单调栈保存仍在等待更高温度的下标。",
          "当前温度更高时可以连续结算栈顶。"
        ],
        "pitfalls": [
          "当前温度更高时可以连续结算栈顶。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/daily-temperatures/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/daily-temperatures/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 72
  },
  {
    "id": "kth-largest-element-in-an-array",
    "number": 215,
    "title": "数组中的第 K 个最大元素",
    "topic": "堆",
    "summary": "返回无序数组按降序排列后的第 k 个元素，重复值按出现次数计算。",
    "signature": "solve(nums, k) → int",
    "starter": "def solve(nums, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "容量为 k 的最小堆，堆顶就是当前第 k 大。",
      "快速选择只需把目标位置一侧继续划分。"
    ],
    "tests": [
      {
        "label": "第三大且含负数",
        "args": [
          [
            -4,
            12,
            7,
            7,
            3,
            18
          ],
          3
        ],
        "expected": 7
      },
      {
        "label": "查找最小值",
        "args": [
          [
            6,
            2,
            9,
            1
          ],
          4
        ],
        "expected": 1
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "容量 K 最小堆",
        "idea": "堆中始终保留已经扫描元素中的最大 k 个，堆顶是其中最小者。",
        "complexity": "时间 O(n log k)，空间 O(k)。",
        "code": "import heapq\n\ndef solve(nums, k):\n    heap = []\n    for value in nums:\n        heapq.heappush(heap, value)\n        if len(heap) > k: heapq.heappop(heap)\n    return heap[0]",
        "steps": [
          "容量为 k 的最小堆，堆顶就是当前第 k 大。",
          "快速选择只需把目标位置一侧继续划分。"
        ],
        "pitfalls": [
          "快速选择只需把目标位置一侧继续划分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/kth-largest-element-in-an-array/"
        }
      },
      {
        "id": "solution-2",
        "name": "快速选择",
        "idea": "把第 k 大换算为升序下标 n-k，分区后只继续目标所在一侧。",
        "complexity": "平均时间 O(n)，空间 O(1)。",
        "code": "def solve(nums, k):\n    target = len(nums) - k\n    left, right = 0, len(nums) - 1\n    while True:\n        pivot = nums[right]; store = left\n        for i in range(left, right):\n            if nums[i] <= pivot:\n                nums[store], nums[i] = nums[i], nums[store]; store += 1\n        nums[store], nums[right] = nums[right], nums[store]\n        if store == target: return nums[store]\n        if store < target: left = store + 1\n        else: right = store - 1",
        "steps": [
          "容量为 k 的最小堆，堆顶就是当前第 k 大。",
          "快速选择只需把目标位置一侧继续划分。"
        ],
        "pitfalls": [
          "快速选择只需把目标位置一侧继续划分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/kth-largest-element-in-an-array/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/kth-largest-element-in-an-array/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 73
  },
  {
    "id": "find-median-from-data-stream",
    "number": 295,
    "title": "数据流的中位数",
    "topic": "堆",
    "summary": "依次执行 add 与 median 操作，在任意时刻返回目前所有数字的中位数。",
    "signature": "solve(operations) → list[float]",
    "starter": "def solve(operations):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "最大堆保存较小的一半，最小堆保存较大的一半。",
      "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"
    ],
    "tests": [
      {
        "label": "四次插入两次查询",
        "args": [
          [
            [
              "add",
              8
            ],
            [
              "add",
              2
            ],
            [
              "add",
              11
            ],
            [
              "median"
            ],
            [
              "add",
              5
            ],
            [
              "median"
            ]
          ]
        ],
        "expected": [
          8,
          6.5
        ]
      },
      {
        "label": "重复值数据流",
        "args": [
          [
            [
              "add",
              4
            ],
            [
              "add",
              4
            ],
            [
              "median"
            ],
            [
              "add",
              9
            ],
            [
              "median"
            ]
          ]
        ],
        "expected": [
          4,
          4
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "大小双堆",
        "idea": "左侧最大堆保存较小半，右侧最小堆保存较大半，并在每次插入后平衡。",
        "complexity": "add O(log n)，median O(1)，空间 O(n)。",
        "code": "import heapq\n\ndef solve(operations):\n    small, large, result = [], [], []\n    for operation in operations:\n        if operation[0] == 'add':\n            value = operation[1]\n            heapq.heappush(small, -value)\n            heapq.heappush(large, -heapq.heappop(small))\n            if len(large) > len(small): heapq.heappush(small, -heapq.heappop(large))\n        elif len(small) > len(large): result.append(-small[0])\n        else: result.append((-small[0] + large[0]) / 2)\n    return result",
        "steps": [
          "最大堆保存较小的一半，最小堆保存较大的一半。",
          "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"
        ],
        "pitfalls": [
          "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-median-from-data-stream/"
        }
      },
      {
        "id": "solution-2",
        "name": "有序列表",
        "idea": "插入时二分找到位置并保持列表有序，查询时直接读取中间。",
        "complexity": "add O(n)，median O(1)，空间 O(n)。",
        "code": "from bisect import insort\n\ndef solve(operations):\n    values, result = [], []\n    for operation in operations:\n        if operation[0] == 'add': insort(values, operation[1])\n        else:\n            middle = len(values) // 2\n            result.append(values[middle] if len(values) % 2 else (values[middle - 1] + values[middle]) / 2)\n    return result",
        "steps": [
          "最大堆保存较小的一半，最小堆保存较大的一半。",
          "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"
        ],
        "pitfalls": [
          "保持两堆大小差不超过一，并让左堆元素都不大于右堆。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-median-from-data-stream/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/find-median-from-data-stream/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 74
  },
  {
    "id": "top-k-frequent",
    "number": 347,
    "title": "前 K 个高频元素",
    "topic": "堆与桶",
    "level": "进阶",
    "minutes": 35,
    "prerequisites": [
      "频次统计",
      "桶排序"
    ],
    "summary": "从整数列表中找出出现次数最高的 k 个不同数字。返回顺序不限。",
    "signature": "solve(nums, k) → list",
    "why": "排序所有不同数字可行，但我们真正关心的是频次。频次不会超过数组长度，可以把相同频次的数字放进同一个桶。",
    "insight": "桶的下标就是出现次数；从最高频次向下取数，收集到 k 个就停止。",
    "steps": [
      "用字典统计每个数字出现次数。",
      "建立长度为 n+1 的 buckets，其中 buckets[f] 保存频次为 f 的数字。",
      "从最高频次向 1 倒序扫描。",
      "逐个加入结果，达到 k 个立即返回。"
    ],
    "complexity": "时间 O(n)，额外空间 O(n)。",
    "trace": [
      [
        "频次",
        "2→3, 5→2"
      ],
      [
        "桶 3",
        "[2]"
      ],
      [
        "桶 2",
        "[5]"
      ],
      [
        "倒序",
        "取前 k 个"
      ]
    ],
    "starter": "def solve(nums, k):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums, k):\n    counts = {}\n    for value in nums:\n        counts[value] = counts.get(value, 0) + 1\n\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for value, frequency in counts.items():\n        buckets[frequency].append(value)\n\n    result = []\n    for frequency in range(len(buckets) - 1, 0, -1):\n        for value in buckets[frequency]:\n            result.append(value)\n            if len(result) == k:\n                return result\n\n    return result",
    "hints": [
      "方向：频次最大只会是 len(nums)，可以用频次作为数组下标。",
      "关键量：buckets[frequency] 是所有恰好出现 frequency 次的数字。",
      "骨架：先遍历 counts.items() 填桶，再 range(len(buckets)-1, 0, -1) 倒序收集。"
    ],
    "tests": [
      {
        "label": "三档频次",
        "args": [
          [
            9,
            9,
            9,
            4,
            4,
            6,
            6,
            6,
            6,
            1
          ],
          2
        ],
        "expected": [
          6,
          9
        ]
      },
      {
        "label": "负数高频",
        "args": [
          [
            -3,
            -3,
            8,
            8,
            8,
            2
          ],
          1
        ],
        "expected": [
          8
        ]
      }
    ],
    "compare": "unordered",
    "variant": "如果要求按“频次降序、数字升序”返回，桶内和最终结果需要增加什么规则？",
    "solutions": [
      {
        "id": "primary",
        "name": "堆与桶主解法",
        "idea": "桶的下标就是出现次数；从最高频次向下取数，收集到 k 个就停止。",
        "steps": [
          "用字典统计每个数字出现次数。",
          "建立长度为 n+1 的 buckets，其中 buckets[f] 保存频次为 f 的数字。",
          "从最高频次向 1 倒序扫描。",
          "逐个加入结果，达到 k 个立即返回。"
        ],
        "complexity": "时间 O(n)，额外空间 O(n)。",
        "pitfalls": [
          "关键量：buckets[frequency] 是所有恰好出现 frequency 次的数字。",
          "骨架：先遍历 counts.items() 填桶，再 range(len(buckets)-1, 0, -1) 倒序收集。"
        ],
        "code": "def solve(nums, k):\n    counts = {}\n    for value in nums:\n        counts[value] = counts.get(value, 0) + 1\n\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for value, frequency in counts.items():\n        buckets[frequency].append(value)\n\n    result = []\n    for frequency in range(len(buckets) - 1, 0, -1):\n        for value in buckets[frequency]:\n            result.append(value)\n            if len(result) == k:\n                return result\n\n    return result",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/top-k-frequent-elements/"
        }
      },
      {
        "id": "alternate",
        "name": "最小堆保留 K 个",
        "idea": "统计频次后维护容量为 k 的最小堆，堆中始终保留当前频次最高的 k 个数字。",
        "steps": [
          "统计每个数字的频次。",
          "把频次和数字压入最小堆。",
          "堆超过 k 时弹出最低频元素。"
        ],
        "complexity": "时间 O(n log k)，额外空间 O(n)。",
        "pitfalls": [
          "堆中元组的第一项必须是频次。",
          "结果顺序不保证固定。"
        ],
        "code": "import heapq\n\ndef solve(nums, k):\n    counts = {}\n    for value in nums:\n        counts[value] = counts.get(value, 0) + 1\n\n    heap = []\n    for value, frequency in counts.items():\n        heapq.heappush(heap, (frequency, value))\n        if len(heap) > k:\n            heapq.heappop(heap)\n\n    return [value for _, value in heap]",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/top-k-frequent-elements/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/top-k-frequent-elements/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 75
  },
  {
    "id": "jump-game-ii",
    "number": 45,
    "title": "跳跃游戏 II",
    "topic": "贪心算法",
    "summary": "保证终点可达，返回从起点跳到最后位置所需的最少跳跃次数。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把当前一跳能到达的范围看成一层。",
      "扫描到本层边界时，必须进行下一跳并更新新边界。"
    ],
    "tests": [
      {
        "label": "三次扩展边界",
        "args": [
          [
            2,
            1,
            2,
            1,
            1,
            1
          ]
        ],
        "expected": 3
      },
      {
        "label": "第二格提供远跳",
        "args": [
          [
            1,
            4,
            1,
            1,
            1,
            1
          ]
        ],
        "expected": 2
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "分层最远边界",
        "idea": "在当前跳跃覆盖区间内收集下一层最远位置，到达边界时增加跳数。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    jumps = current_end = farthest = 0\n    for index in range(len(nums) - 1):\n        farthest = max(farthest, index + nums[index])\n        if index == current_end:\n            jumps += 1; current_end = farthest\n    return jumps",
        "steps": [
          "把当前一跳能到达的范围看成一层。",
          "扫描到本层边界时，必须进行下一跳并更新新边界。"
        ],
        "pitfalls": [
          "扫描到本层边界时，必须进行下一跳并更新新边界。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/jump-game-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "反向选择最早前驱",
        "idea": "从终点反向寻找最靠左且能到达当前目标的位置，每轮确定上一跳。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(nums):\n    target, jumps = len(nums) - 1, 0\n    while target > 0:\n        for index in range(target):\n            if index + nums[index] >= target:\n                target = index; jumps += 1; break\n    return jumps",
        "steps": [
          "把当前一跳能到达的范围看成一层。",
          "扫描到本层边界时，必须进行下一跳并更新新边界。"
        ],
        "pitfalls": [
          "扫描到本层边界时，必须进行下一跳并更新新边界。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/jump-game-ii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/jump-game-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 76
  },
  {
    "id": "jump-game",
    "number": 55,
    "title": "跳跃游戏",
    "topic": "贪心算法",
    "summary": "每个位置给出最大前跳距离，判断是否能从起点到达最后一个位置。",
    "signature": "solve(nums) → bool",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "维护当前所有可达位置能覆盖的最远下标。",
      "一旦扫描下标超过最远覆盖范围就失败。"
    ],
    "tests": [
      {
        "label": "刚好逐段到达",
        "args": [
          [
            1,
            2,
            0,
            1,
            1
          ]
        ],
        "expected": true
      },
      {
        "label": "中途不可达零段",
        "args": [
          [
            2,
            0,
            0,
            0,
            1
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "最远覆盖",
        "idea": "只扫描当前可达的位置，并不断扩大最远边界。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    farthest = 0\n    for index, jump in enumerate(nums):\n        if index > farthest: return False\n        farthest = max(farthest, index + jump)\n    return True",
        "steps": [
          "维护当前所有可达位置能覆盖的最远下标。",
          "一旦扫描下标超过最远覆盖范围就失败。"
        ],
        "pitfalls": [
          "一旦扫描下标超过最远覆盖范围就失败。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/jump-game/"
        }
      },
      {
        "id": "solution-2",
        "name": "从后向前缩目标",
        "idea": "若某位置可以跳到当前目标，就把它设为新的目标，最终目标应回到下标零。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    goal = len(nums) - 1\n    for index in range(len(nums) - 2, -1, -1):\n        if index + nums[index] >= goal: goal = index\n    return goal == 0",
        "steps": [
          "维护当前所有可达位置能覆盖的最远下标。",
          "一旦扫描下标超过最远覆盖范围就失败。"
        ],
        "pitfalls": [
          "一旦扫描下标超过最远覆盖范围就失败。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/jump-game/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/jump-game/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 77
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "number": 121,
    "title": "买卖股票的最佳时机",
    "topic": "贪心算法",
    "summary": "只能买入一次并在之后卖出一次，返回可获得的最大利润；无利润时返回零。",
    "signature": "solve(prices) → int",
    "starter": "def solve(prices):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "扫描到当天时，只需知道此前最低买入价。",
      "当天卖出的利润与历史最佳利润分别维护。"
    ],
    "tests": [
      {
        "label": "最低点位于中部",
        "args": [
          [
            9,
            6,
            2,
            5,
            11,
            4
          ]
        ],
        "expected": 9
      },
      {
        "label": "单日价格",
        "args": [
          [
            7
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "维护最低价格",
        "idea": "每个卖出日用历史最低价格计算利润，再更新全局最大值。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(prices):\n    lowest, best = float('inf'), 0\n    for price in prices:\n        lowest = min(lowest, price)\n        best = max(best, price - lowest)\n    return best",
        "steps": [
          "扫描到当天时，只需知道此前最低买入价。",
          "当天卖出的利润与历史最佳利润分别维护。"
        ],
        "pitfalls": [
          "当天卖出的利润与历史最佳利润分别维护。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/"
        }
      },
      {
        "id": "solution-2",
        "name": "差分最大子数组",
        "idea": "相邻价格差组成每日收益，问题转为允许空区间的最大子数组和。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(prices):\n    current = best = 0\n    for i in range(1, len(prices)):\n        current = max(0, current + prices[i] - prices[i - 1])\n        best = max(best, current)\n    return best",
        "steps": [
          "扫描到当天时，只需知道此前最低买入价。",
          "当天卖出的利润与历史最佳利润分别维护。"
        ],
        "pitfalls": [
          "当天卖出的利润与历史最佳利润分别维护。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 78
  },
  {
    "id": "partition-labels",
    "number": 763,
    "title": "划分字母区间",
    "topic": "贪心算法",
    "summary": "把字符串尽可能切成更多片段，使每个字符只出现在一个片段中，返回各片段长度。",
    "signature": "solve(text) → list[int]",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "预先记录每个字符最后出现的位置。",
      "当前片段右边界是片段内所有字符最后位置的最大值。"
    ],
    "tests": [
      {
        "label": "两个独立字符群",
        "args": [
          "abaccbdeed"
        ],
        "expected": [
          6,
          4
        ]
      },
      {
        "label": "首尾字符相连",
        "args": [
          "qwertyq"
        ],
        "expected": [
          7
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "最后位置贪心",
        "idea": "扫描时扩展当前片段必须覆盖的最右位置，抵达边界就切分。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "def solve(text):\n    last = {char: index for index, char in enumerate(text)}\n    result, start, end = [], 0, 0\n    for index, char in enumerate(text):\n        end = max(end, last[char])\n        if index == end:\n            result.append(end - start + 1); start = index + 1\n    return result",
        "steps": [
          "预先记录每个字符最后出现的位置。",
          "当前片段右边界是片段内所有字符最后位置的最大值。"
        ],
        "pitfalls": [
          "当前片段右边界是片段内所有字符最后位置的最大值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/partition-labels/"
        }
      },
      {
        "id": "solution-2",
        "name": "字符区间合并",
        "idea": "为每个字符建立首末位置区间，再按起点顺序合并重叠区间。",
        "complexity": "时间 O(n+k log k)，空间 O(k)。",
        "code": "def solve(text):\n    ranges = {}\n    for index, char in enumerate(text):\n        if char not in ranges: ranges[char] = [index, index]\n        else: ranges[char][1] = index\n    merged = []\n    for start, end in sorted(ranges.values()):\n        if not merged or start > merged[-1][1]: merged.append([start, end])\n        else: merged[-1][1] = max(merged[-1][1], end)\n    return [end - start + 1 for start, end in merged]",
        "steps": [
          "预先记录每个字符最后出现的位置。",
          "当前片段右边界是片段内所有字符最后位置的最大值。"
        ],
        "pitfalls": [
          "当前片段右边界是片段内所有字符最后位置的最大值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/partition-labels/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/partition-labels/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 79
  },
  {
    "id": "longest-valid-parentheses",
    "number": 32,
    "title": "最长有效括号",
    "topic": "动态规划",
    "summary": "返回只含圆括号的字符串中，最长连续合法括号片段的长度。",
    "signature": "solve(text) → int",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "栈底保存最近一个无法匹配的右括号位置。",
      "动态规划只在当前位置为右括号时可能更新。"
    ],
    "tests": [
      {
        "label": "前缀无效后完整嵌套",
        "args": [
          ")((()))"
        ],
        "expected": 6
      },
      {
        "label": "多个有效片段相连",
        "args": [
          "()(()())()"
        ],
        "expected": 10
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "下标栈",
        "idea": "栈保存未匹配左括号下标，哨兵保存当前合法片段之前的边界。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(text):\n    stack, best = [-1], 0\n    for index, char in enumerate(text):\n        if char == '(': stack.append(index)\n        else:\n            stack.pop()\n            if not stack: stack.append(index)\n            else: best = max(best, index - stack[-1])\n    return best",
        "steps": [
          "栈底保存最近一个无法匹配的右括号位置。",
          "动态规划只在当前位置为右括号时可能更新。"
        ],
        "pitfalls": [
          "动态规划只在当前位置为右括号时可能更新。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-valid-parentheses/"
        }
      },
      {
        "id": "solution-2",
        "name": "结尾长度动态规划",
        "idea": "dp[i] 表示以 i 结尾的最长合法长度，根据前一字符或跨过前段后的匹配位置转移。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(text):\n    dp = [0] * len(text); best = 0\n    for i in range(1, len(text)):\n        if text[i] != ')': continue\n        if text[i - 1] == '(':\n            dp[i] = 2 + (dp[i - 2] if i >= 2 else 0)\n        else:\n            match = i - dp[i - 1] - 1\n            if match >= 0 and text[match] == '(':\n                dp[i] = dp[i - 1] + 2 + (dp[match - 1] if match >= 1 else 0)\n        best = max(best, dp[i])\n    return best",
        "steps": [
          "栈底保存最近一个无法匹配的右括号位置。",
          "动态规划只在当前位置为右括号时可能更新。"
        ],
        "pitfalls": [
          "动态规划只在当前位置为右括号时可能更新。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-valid-parentheses/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/longest-valid-parentheses/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 80
  },
  {
    "id": "maximum-subarray",
    "number": 53,
    "title": "最大子数组和",
    "topic": "动态规划",
    "level": "进阶",
    "minutes": 30,
    "prerequisites": [
      "连续子数组",
      "局部状态"
    ],
    "summary": "在整数列表中找出和最大的非空连续片段，返回这个最大和。",
    "signature": "solve(nums) → int",
    "why": "对每个位置枚举所有起点会重复求和。只要知道“以上一个位置结尾的最佳和”，就能决定当前值是接在后面还是重新开始。",
    "insight": "current 的定义是“必须以当前元素结尾的最大和”，它与全局 best 是两个不同问题。",
    "steps": [
      "用第一个元素初始化 current 和 best。",
      "读到 value 时，current 在 value 与 current + value 中取较大者。",
      "用 current 更新全局 best。",
      "遍历结束后返回 best。"
    ],
    "complexity": "时间 O(n)，额外空间 O(1)。",
    "trace": [
      [
        "current",
        "必须在此结束"
      ],
      [
        "选择",
        "接上或重开"
      ],
      [
        "best",
        "历史最大"
      ],
      [
        "负前缀",
        "直接丢弃"
      ]
    ],
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(nums):\n    current = nums[0]\n    best = nums[0]\n\n    for value in nums[1:]:\n        current = max(value, current + value)\n        best = max(best, current)\n\n    return best",
    "hints": [
      "方向：到当前位置时，只需决定继续上一段还是从当前值重新开始。",
      "关键量：current 必须以当前元素结尾；best 可以在任何位置结尾。",
      "骨架：current = max(value, current + value)，随后 best = max(best, current)。"
    ],
    "tests": [
      {
        "label": "最佳段在尾部",
        "args": [
          [
            -6,
            2,
            -5,
            7,
            4
          ]
        ],
        "expected": 11
      },
      {
        "label": "正负交替",
        "args": [
          [
            5,
            -8,
            6,
            -1,
            3
          ]
        ],
        "expected": 8
      }
    ],
    "compare": "exact",
    "variant": "如果还要返回最佳片段的起止位置，current 重新开始时需要同步记录什么？",
    "solutions": [
      {
        "id": "primary",
        "name": "动态规划主解法",
        "idea": "current 的定义是“必须以当前元素结尾的最大和”，它与全局 best 是两个不同问题。",
        "steps": [
          "用第一个元素初始化 current 和 best。",
          "读到 value 时，current 在 value 与 current + value 中取较大者。",
          "用 current 更新全局 best。",
          "遍历结束后返回 best。"
        ],
        "complexity": "时间 O(n)，额外空间 O(1)。",
        "pitfalls": [
          "关键量：current 必须以当前元素结尾；best 可以在任何位置结尾。",
          "骨架：current = max(value, current + value)，随后 best = max(best, current)。"
        ],
        "code": "def solve(nums):\n    current = nums[0]\n    best = nums[0]\n\n    for value in nums[1:]:\n        current = max(value, current + value)\n        best = max(best, current)\n\n    return best",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-subarray/"
        }
      },
      {
        "id": "alternate",
        "name": "前缀和减最小前缀",
        "idea": "以当前位置结尾的最佳区间和，等于当前前缀和减去它之前出现过的最小前缀和。",
        "steps": [
          "累计当前前缀和。",
          "用 prefix - min_prefix 更新答案。",
          "更新历史最小前缀和。"
        ],
        "complexity": "时间 O(n)，额外空间 O(1)。",
        "pitfalls": [
          "先更新 best，再更新 min_prefix。",
          "best 需用首元素初始化以处理全负数。"
        ],
        "code": "def solve(nums):\n    prefix = 0\n    min_prefix = 0\n    best = nums[0]\n\n    for value in nums:\n        prefix += value\n        best = max(best, prefix - min_prefix)\n        min_prefix = min(min_prefix, prefix)\n\n    return best",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-subarray/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/maximum-subarray/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 81
  },
  {
    "id": "climbing-stairs",
    "number": 70,
    "title": "爬楼梯",
    "topic": "动态规划",
    "level": "进阶",
    "minutes": 25,
    "prerequisites": [
      "递推关系",
      "状态压缩"
    ],
    "summary": "每次可以向上走 1 级或 2 级，计算到达第 n 级共有多少种不同走法。",
    "signature": "solve(n) → int",
    "why": "到达第 n 级的最后一步只能来自 n-1 或 n-2，因此问题可以由两个更小问题的答案组成。",
    "insight": "状态定义比公式更重要：dp[i] 表示“到达第 i 级的走法数量”。定义清楚后，转移就是 dp[i-1] + dp[i-2]。",
    "steps": [
      "定义基础情况：到第 1 级有 1 种，到第 2 级有 2 种。",
      "从第 3 级开始计算当前答案。",
      "每次只依赖前两个状态，因此不必保存整个数组。",
      "滚动更新 prev2 与 prev1。"
    ],
    "complexity": "时间 O(n)，额外空间 O(1)。",
    "trace": [
      [
        "第 1 级",
        "1"
      ],
      [
        "第 2 级",
        "2"
      ],
      [
        "第 3 级",
        "1 + 2 = 3"
      ],
      [
        "第 5 级",
        "8"
      ]
    ],
    "starter": "def solve(n):\n    # TODO: 写下你的解法\n    pass",
    "solution": "def solve(n):\n    if n <= 2:\n        return n\n\n    prev2, prev1 = 1, 2\n    for _ in range(3, n + 1):\n        current = prev1 + prev2\n        prev2, prev1 = prev1, current\n\n    return prev1",
    "hints": [
      "方向：第 i 级只能从 i-1 或 i-2 走来。",
      "关键量：prev2 和 prev1 分别保存前两个楼层的走法数。",
      "骨架：current = prev1 + prev2；随后 prev2, prev1 = prev1, current。"
    ],
    "tests": [
      {
        "label": "六级台阶",
        "args": [
          6
        ],
        "expected": 13
      },
      {
        "label": "九级台阶",
        "args": [
          9
        ],
        "expected": 55
      }
    ],
    "compare": "exact",
    "variant": "如果一次还可以走 3 级，状态转移需要增加哪一项？需要保留几个历史状态？",
    "solutions": [
      {
        "id": "primary",
        "name": "动态规划主解法",
        "idea": "状态定义比公式更重要：dp[i] 表示“到达第 i 级的走法数量”。定义清楚后，转移就是 dp[i-1] + dp[i-2]。",
        "steps": [
          "定义基础情况：到第 1 级有 1 种，到第 2 级有 2 种。",
          "从第 3 级开始计算当前答案。",
          "每次只依赖前两个状态，因此不必保存整个数组。",
          "滚动更新 prev2 与 prev1。"
        ],
        "complexity": "时间 O(n)，额外空间 O(1)。",
        "pitfalls": [
          "关键量：prev2 和 prev1 分别保存前两个楼层的走法数。",
          "骨架：current = prev1 + prev2；随后 prev2, prev1 = prev1, current。"
        ],
        "code": "def solve(n):\n    if n <= 2:\n        return n\n\n    prev2, prev1 = 1, 2\n    for _ in range(3, n + 1):\n        current = prev1 + prev2\n        prev2, prev1 = prev1, current\n\n    return prev1",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/climbing-stairs/"
        }
      },
      {
        "id": "alternate",
        "name": "完整 DP 表",
        "idea": "显式保存每一级的答案，便于观察 dp[i] = dp[i-1] + dp[i-2] 的状态转移。",
        "steps": [
          "建立长度 n+1 的 dp。",
          "写入 1 级与 2 级的基础值。",
          "从 3 到 n 逐项递推。"
        ],
        "complexity": "时间 O(n)，额外空间 O(n)。",
        "pitfalls": [
          "n <= 2 时直接返回。",
          "dp 下标表示楼层而不是循环次数。"
        ],
        "code": "def solve(n):\n    if n <= 2:\n        return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for step in range(3, n + 1):\n        dp[step] = dp[step - 1] + dp[step - 2]\n    return dp[n]",
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/climbing-stairs/"
        }
      }
    ],
    "referenceUrl": "https://leetcode.cn/problems/climbing-stairs/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 82
  },
  {
    "id": "pascals-triangle",
    "number": 118,
    "title": "杨辉三角",
    "topic": "动态规划",
    "summary": "生成杨辉三角的前 n 行，每行首尾为一，内部元素等于上一行相邻两数之和。",
    "signature": "solve(row_count) → list[list[int]]",
    "starter": "def solve(row_count):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "第 row 行包含 row+1 个元素。",
      "内部位置 col 来自上一行 col-1 与 col。"
    ],
    "tests": [
      {
        "label": "四行",
        "args": [
          4
        ],
        "expected": [
          [
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            2,
            1
          ],
          [
            1,
            3,
            3,
            1
          ]
        ]
      },
      {
        "label": "七行",
        "args": [
          7
        ],
        "expected": [
          [
            1
          ],
          [
            1,
            1
          ],
          [
            1,
            2,
            1
          ],
          [
            1,
            3,
            3,
            1
          ],
          [
            1,
            4,
            6,
            4,
            1
          ],
          [
            1,
            5,
            10,
            10,
            5,
            1
          ],
          [
            1,
            6,
            15,
            20,
            15,
            6,
            1
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "逐行递推",
        "idea": "新行首尾填一，中间读取上一行两个相邻元素。",
        "complexity": "时间 O(n²)，空间 O(n²)。",
        "code": "def solve(row_count):\n    triangle = []\n    for row in range(row_count):\n        current = [1] * (row + 1)\n        for col in range(1, row):\n            current[col] = triangle[-1][col - 1] + triangle[-1][col]\n        triangle.append(current)\n    return triangle",
        "steps": [
          "第 row 行包含 row+1 个元素。",
          "内部位置 col 来自上一行 col-1 与 col。"
        ],
        "pitfalls": [
          "内部位置 col 来自上一行 col-1 与 col。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/pascals-triangle/"
        }
      },
      {
        "id": "solution-2",
        "name": "相邻和拼接",
        "idea": "每一行等于上一行左右补零后逐位相加。",
        "complexity": "时间 O(n²)，空间 O(n²)。",
        "code": "def solve(row_count):\n    triangle = []\n    row = [1]\n    for _ in range(row_count):\n        triangle.append(row)\n        row = [left + right for left, right in zip([0] + row, row + [0])]\n    return triangle",
        "steps": [
          "第 row 行包含 row+1 个元素。",
          "内部位置 col 来自上一行 col-1 与 col。"
        ],
        "pitfalls": [
          "内部位置 col 来自上一行 col-1 与 col。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/pascals-triangle/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/pascals-triangle/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 83
  },
  {
    "id": "word-break",
    "number": 139,
    "title": "单词拆分",
    "topic": "动态规划",
    "summary": "判断字符串能否由词典中的一个或多个单词依次拼接而成，词典单词可重复使用。",
    "signature": "solve(text, words) → bool",
    "starter": "def solve(text, words):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "dp[end] 表示前 end 个字符能否被拆分。",
      "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"
    ],
    "tests": [
      {
        "label": "多种切分均可",
        "args": [
          "blueberry",
          [
            "blue",
            "berry",
            "blueberry"
          ]
        ],
        "expected": true
      },
      {
        "label": "剩余单字符无法匹配",
        "args": [
          "codebox",
          [
            "code",
            "boxer",
            "cod"
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "前缀动态规划",
        "idea": "从每个可达起点尝试词典单词，标记新的可达终点。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "def solve(text, words):\n    dictionary = set(words); reachable = [False] * (len(text) + 1); reachable[0] = True\n    for end in range(1, len(text) + 1):\n        for start in range(end):\n            if reachable[start] and text[start:end] in dictionary:\n                reachable[end] = True; break\n    return reachable[-1]",
        "steps": [
          "dp[end] 表示前 end 个字符能否被拆分。",
          "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"
        ],
        "pitfalls": [
          "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-break/"
        }
      },
      {
        "id": "solution-2",
        "name": "可达下标广搜",
        "idea": "把下标视作节点，若后续片段是词典单词就连到新的下标。",
        "complexity": "时间 O(n·words·wordLength)，空间 O(n)。",
        "code": "from collections import deque\n\ndef solve(text, words):\n    queue, seen = deque([0]), {0}\n    while queue:\n        start = queue.popleft()\n        for word in words:\n            end = start + len(word)\n            if text.startswith(word, start):\n                if end == len(text): return True\n                if end not in seen: seen.add(end); queue.append(end)\n    return len(text) == 0",
        "steps": [
          "dp[end] 表示前 end 个字符能否被拆分。",
          "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"
        ],
        "pitfalls": [
          "若 dp[start] 为真且 text[start:end] 在词典中，则 end 可达。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-break/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/word-break/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 84
  },
  {
    "id": "maximum-product-subarray",
    "number": 152,
    "title": "乘积最大子数组",
    "topic": "动态规划",
    "summary": "返回非空连续子数组能够得到的最大乘积。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "负数会交换最大乘积与最小乘积的角色。",
      "每个位置要同时维护以此结尾的最大和最小乘积。"
    ],
    "tests": [
      {
        "label": "两个负数形成最大积",
        "args": [
          [
            -3,
            4,
            -2,
            5
          ]
        ],
        "expected": 120
      },
      {
        "label": "零分隔两个区间",
        "args": [
          [
            2,
            -5,
            0,
            -3,
            -4
          ]
        ],
        "expected": 12
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "最大最小双状态",
        "idea": "当前值与它乘以前一最大、前一最小的三个候选共同决定新状态。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    current_max = current_min = best = nums[0]\n    for value in nums[1:]:\n        previous_max = current_max\n        current_max = max(value, value * current_max, value * current_min)\n        current_min = min(value, value * previous_max, value * current_min)\n        best = max(best, current_max)\n    return best",
        "steps": [
          "负数会交换最大乘积与最小乘积的角色。",
          "每个位置要同时维护以此结尾的最大和最小乘积。"
        ],
        "pitfalls": [
          "每个位置要同时维护以此结尾的最大和最小乘积。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-product-subarray/"
        }
      },
      {
        "id": "solution-2",
        "name": "枚举起点乘积",
        "idea": "固定每个起点并向右累乘，作为动态规划方法的直观基线。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(nums):\n    best = nums[0]\n    for left in range(len(nums)):\n        product = 1\n        for right in range(left, len(nums)):\n            product *= nums[right]\n            best = max(best, product)\n    return best",
        "steps": [
          "负数会交换最大乘积与最小乘积的角色。",
          "每个位置要同时维护以此结尾的最大和最小乘积。"
        ],
        "pitfalls": [
          "每个位置要同时维护以此结尾的最大和最小乘积。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/maximum-product-subarray/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/maximum-product-subarray/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 85
  },
  {
    "id": "house-robber",
    "number": 198,
    "title": "打家劫舍",
    "topic": "动态规划",
    "summary": "相邻房屋不能同时选择，返回从非负金额列表中能取得的最大总额。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "处理当前房屋时，只比较跳过它与选择它两种状态。",
      "选择当前房屋必须接在前两间房的最优答案后。"
    ],
    "tests": [
      {
        "label": "首尾房屋更优",
        "args": [
          [
            8,
            1,
            2,
            9
          ]
        ],
        "expected": 17
      },
      {
        "label": "包含零收益房屋",
        "args": [
          [
            0,
            5,
            0,
            6,
            4
          ]
        ],
        "expected": 11
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "滚动状态",
        "idea": "previous 表示前一位置最优，before_previous 表示前两位置最优。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    before_previous = previous = 0\n    for value in nums:\n        before_previous, previous = previous, max(previous, before_previous + value)\n    return previous",
        "steps": [
          "处理当前房屋时，只比较跳过它与选择它两种状态。",
          "选择当前房屋必须接在前两间房的最优答案后。"
        ],
        "pitfalls": [
          "选择当前房屋必须接在前两间房的最优答案后。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/house-robber/"
        }
      },
      {
        "id": "solution-2",
        "name": "完整 DP 表",
        "idea": "dp[i] 记录处理前 i 间房后的最大金额。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    dp = [0] * (len(nums) + 1)\n    if nums: dp[1] = nums[0]\n    for i in range(2, len(nums) + 1):\n        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])\n    return dp[-1]",
        "steps": [
          "处理当前房屋时，只比较跳过它与选择它两种状态。",
          "选择当前房屋必须接在前两间房的最优答案后。"
        ],
        "pitfalls": [
          "选择当前房屋必须接在前两间房的最优答案后。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/house-robber/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/house-robber/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 86
  },
  {
    "id": "perfect-squares",
    "number": 279,
    "title": "完全平方数",
    "topic": "动态规划",
    "summary": "返回若干完全平方数相加得到 n 时所需的最少项数。",
    "signature": "solve(n) → int",
    "starter": "def solve(n):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "状态 dp[value] 从所有不超过 value 的平方数转移。",
      "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"
    ],
    "tests": [
      {
        "label": "单个平方数",
        "args": [
          49
        ],
        "expected": 1
      },
      {
        "label": "需要三个平方数",
        "args": [
          27
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "一维动态规划",
        "idea": "dp[value] 等于所有 dp[value-square]+1 的最小值。",
        "complexity": "时间 O(n√n)，空间 O(n)。",
        "code": "def solve(n):\n    dp = [0] + [n] * n\n    squares = [value * value for value in range(1, int(n ** 0.5) + 1)]\n    for value in range(1, n + 1):\n        for square in squares:\n            if square > value: break\n            dp[value] = min(dp[value], dp[value - square] + 1)\n    return dp[n]",
        "steps": [
          "状态 dp[value] 从所有不超过 value 的平方数转移。",
          "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"
        ],
        "pitfalls": [
          "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/perfect-squares/"
        }
      },
      {
        "id": "solution-2",
        "name": "余数广度优先",
        "idea": "每层从当前余数减去一个平方数，首次到达零的层数就是最少项数。",
        "complexity": "时间 O(n√n)，空间 O(n)。",
        "code": "from collections import deque\n\ndef solve(n):\n    squares = [value * value for value in range(1, int(n ** 0.5) + 1)]\n    queue, seen, steps = deque([n]), {n}, 0\n    while queue:\n        steps += 1\n        for _ in range(len(queue)):\n            remaining = queue.popleft()\n            for square in squares:\n                next_value = remaining - square\n                if next_value == 0: return steps\n                if next_value < 0: break\n                if next_value not in seen: seen.add(next_value); queue.append(next_value)",
        "steps": [
          "状态 dp[value] 从所有不超过 value 的平方数转移。",
          "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"
        ],
        "pitfalls": [
          "也可把每个剩余值看成图节点，用广度优先寻找最短层数。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/perfect-squares/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/perfect-squares/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 87
  },
  {
    "id": "longest-increasing-subsequence",
    "number": 300,
    "title": "最长递增子序列",
    "topic": "动态规划",
    "summary": "返回整数列表中严格递增子序列的最大长度，子序列元素无需连续。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "tails[length-1] 保存该长度递增子序列可能达到的最小尾值。",
      "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"
    ],
    "tests": [
      {
        "label": "尾部延长递增序列",
        "args": [
          [
            6,
            1,
            5,
            2,
            4,
            7,
            9
          ]
        ],
        "expected": 5
      },
      {
        "label": "严格递减",
        "args": [
          [
            12,
            9,
            7,
            3,
            -1
          ]
        ],
        "expected": 1
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "耐心排序尾值",
        "idea": "用二分把当前值放到第一个不小于它的尾值位置，tails 长度即答案。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "from bisect import bisect_left\n\ndef solve(nums):\n    tails = []\n    for value in nums:\n        index = bisect_left(tails, value)\n        if index == len(tails): tails.append(value)\n        else: tails[index] = value\n    return len(tails)",
        "steps": [
          "tails[length-1] 保存该长度递增子序列可能达到的最小尾值。",
          "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"
        ],
        "pitfalls": [
          "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-increasing-subsequence/"
        }
      },
      {
        "id": "solution-2",
        "name": "二次动态规划",
        "idea": "dp[i] 从所有更小的前驱 j 转移，表示以 i 结尾的最长长度。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "def solve(nums):\n    if not nums: return 0\n    dp = [1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)",
        "steps": [
          "tails[length-1] 保存该长度递增子序列可能达到的最小尾值。",
          "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"
        ],
        "pitfalls": [
          "朴素 dp[i] 表示以 nums[i] 结尾的最佳长度。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-increasing-subsequence/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/longest-increasing-subsequence/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 88
  },
  {
    "id": "coin-change",
    "number": 322,
    "title": "零钱兑换",
    "topic": "动态规划",
    "summary": "给定不同面额和目标金额，返回凑出目标所需的最少硬币数；无法凑出返回 -1。",
    "signature": "solve(coins, amount) → int",
    "starter": "def solve(coins, amount):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "dp[value] 从 dp[value-coin]+1 转移。",
      "硬币可无限使用，所以按金额递增更新。"
    ],
    "tests": [
      {
        "label": "非标准面额",
        "args": [
          [
            3,
            4,
            7
          ],
          15
        ],
        "expected": 3
      },
      {
        "label": "金额为零",
        "args": [
          [
            5,
            9
          ],
          0
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "金额动态规划",
        "idea": "逐个金额尝试所有不超过它的硬币，并取最少数量。",
        "complexity": "时间 O(amount·coins)，空间 O(amount)。",
        "code": "def solve(coins, amount):\n    dp = [amount + 1] * (amount + 1); dp[0] = 0\n    for value in range(1, amount + 1):\n        for coin in coins:\n            if coin <= value: dp[value] = min(dp[value], dp[value - coin] + 1)\n    return -1 if dp[amount] > amount else dp[amount]",
        "steps": [
          "dp[value] 从 dp[value-coin]+1 转移。",
          "硬币可无限使用，所以按金额递增更新。"
        ],
        "pitfalls": [
          "硬币可无限使用，所以按金额递增更新。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/coin-change/"
        }
      },
      {
        "id": "solution-2",
        "name": "金额广度优先",
        "idea": "从零开始每层增加一枚硬币，首次到达目标金额时层数最小。",
        "complexity": "时间 O(amount·coins)，空间 O(amount)。",
        "code": "from collections import deque\n\ndef solve(coins, amount):\n    if amount == 0: return 0\n    queue, seen, steps = deque([0]), {0}, 0\n    while queue:\n        steps += 1\n        for _ in range(len(queue)):\n            current = queue.popleft()\n            for coin in coins:\n                next_value = current + coin\n                if next_value == amount: return steps\n                if next_value < amount and next_value not in seen:\n                    seen.add(next_value); queue.append(next_value)\n    return -1",
        "steps": [
          "dp[value] 从 dp[value-coin]+1 转移。",
          "硬币可无限使用，所以按金额递增更新。"
        ],
        "pitfalls": [
          "硬币可无限使用，所以按金额递增更新。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/coin-change/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/coin-change/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 89
  },
  {
    "id": "partition-equal-subset-sum",
    "number": 416,
    "title": "分割等和子集",
    "topic": "动态规划",
    "summary": "判断正整数列表能否划分为元素和相等的两个子集。",
    "signature": "solve(nums) → bool",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "总和为奇数时必然失败。",
      "问题等价于能否选出和为总和一半的子集。"
    ],
    "tests": [
      {
        "label": "多种平分方式",
        "args": [
          [
            2,
            2,
            3,
            3,
            4,
            4
          ]
        ],
        "expected": true
      },
      {
        "label": "总和为奇数",
        "args": [
          [
            2,
            4,
            5,
            8
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "一维 0-1 背包",
        "idea": "容量倒序更新，避免同一数字在一轮中被重复使用。",
        "complexity": "时间 O(n·sum)，空间 O(sum)。",
        "code": "def solve(nums):\n    total = sum(nums)\n    if total % 2: return False\n    target = total // 2\n    reachable = [False] * (target + 1); reachable[0] = True\n    for value in nums:\n        for current in range(target, value - 1, -1):\n            reachable[current] = reachable[current] or reachable[current - value]\n    return reachable[target]",
        "steps": [
          "总和为奇数时必然失败。",
          "问题等价于能否选出和为总和一半的子集。"
        ],
        "pitfalls": [
          "问题等价于能否选出和为总和一半的子集。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/partition-equal-subset-sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "可达和集合",
        "idea": "每读一个数字，把已有可达和与加上当前值后的新和合并。",
        "complexity": "时间 O(n·sum)，空间 O(sum)。",
        "code": "def solve(nums):\n    total = sum(nums)\n    if total % 2: return False\n    target = total // 2; reachable = {0}\n    for value in nums:\n        reachable |= {current + value for current in reachable if current + value <= target}\n        if target in reachable: return True\n    return False",
        "steps": [
          "总和为奇数时必然失败。",
          "问题等价于能否选出和为总和一半的子集。"
        ],
        "pitfalls": [
          "问题等价于能否选出和为总和一半的子集。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/partition-equal-subset-sum/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/partition-equal-subset-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 90
  },
  {
    "id": "longest-palindromic-substring",
    "number": 5,
    "title": "最长回文子串",
    "topic": "多维动态规划",
    "summary": "返回字符串中最长的连续回文片段。",
    "signature": "solve(text) → str",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "回文中心可能是一个字符，也可能是两个字符之间。",
      "区间两端相同且内部是回文时，整个区间也是回文。"
    ],
    "tests": [
      {
        "label": "奇数长度回文位于中间",
        "args": [
          "xyabcbaq"
        ],
        "expected": "abcba"
      },
      {
        "label": "只有单字符回文",
        "args": [
          "wxyz"
        ],
        "expected": "w"
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "中心扩展",
        "idea": "从每个单字符中心和双字符中心向两边扩展，并记录最长区间。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(text):\n    best_start = best_len = 0\n    def expand(left, right):\n        while left >= 0 and right < len(text) and text[left] == text[right]:\n            left -= 1; right += 1\n        return left + 1, right - left - 1\n    for center in range(len(text)):\n        for left, right in ((center, center), (center, center + 1)):\n            start, length = expand(left, right)\n            if length > best_len: best_start, best_len = start, length\n    return text[best_start:best_start + best_len]",
        "steps": [
          "回文中心可能是一个字符，也可能是两个字符之间。",
          "区间两端相同且内部是回文时，整个区间也是回文。"
        ],
        "pitfalls": [
          "区间两端相同且内部是回文时，整个区间也是回文。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-palindromic-substring/"
        }
      },
      {
        "id": "solution-2",
        "name": "区间动态规划",
        "idea": "按起点倒序和终点正序填表，内部区间已知后判断当前区间。",
        "complexity": "时间 O(n²)，空间 O(n²)。",
        "code": "def solve(text):\n    n = len(text); palindrome = [[False] * n for _ in range(n)]\n    best_start, best_len = 0, 0\n    for start in range(n - 1, -1, -1):\n        for end in range(start, n):\n            palindrome[start][end] = text[start] == text[end] and (end - start < 2 or palindrome[start + 1][end - 1])\n            length = end - start + 1\n            if palindrome[start][end] and length >= best_len:\n                best_start, best_len = start, length\n    return text[best_start:best_start + best_len]",
        "steps": [
          "回文中心可能是一个字符，也可能是两个字符之间。",
          "区间两端相同且内部是回文时，整个区间也是回文。"
        ],
        "pitfalls": [
          "区间两端相同且内部是回文时，整个区间也是回文。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-palindromic-substring/"
        }
      }
    ],
    "compare": "longestPalindrome",
    "referenceUrl": "https://leetcode.cn/problems/longest-palindromic-substring/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 91
  },
  {
    "id": "unique-paths",
    "number": 62,
    "title": "不同路径",
    "topic": "多维动态规划",
    "summary": "机器人只能向右或向下移动，返回从 m×n 网格左上角到右下角的不同路径数量。",
    "signature": "solve(rows, cols) → int",
    "starter": "def solve(rows, cols):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "到达一个格子的路径数来自上方与左方之和。",
      "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"
    ],
    "tests": [
      {
        "label": "四行五列",
        "args": [
          4,
          5
        ],
        "expected": 35
      },
      {
        "label": "两行九列",
        "args": [
          2,
          9
        ],
        "expected": 9
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "滚动行动态规划",
        "idea": "一维数组保存当前行各列路径数，更新时加上左侧新值。",
        "complexity": "时间 O(mn)，空间 O(n)。",
        "code": "def solve(rows, cols):\n    dp = [1] * cols\n    for _ in range(1, rows):\n        for col in range(1, cols): dp[col] += dp[col - 1]\n    return dp[-1]",
        "steps": [
          "到达一个格子的路径数来自上方与左方之和。",
          "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"
        ],
        "pitfalls": [
          "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/unique-paths/"
        }
      },
      {
        "id": "solution-2",
        "name": "组合数",
        "idea": "所有路径只是向下与向右步骤的排列，选择其中向下步骤的位置。",
        "complexity": "时间 O(min(m,n))，空间 O(1)。",
        "code": "def solve(rows, cols):\n    choose = min(rows - 1, cols - 1)\n    total_steps = rows + cols - 2\n    result = 1\n    for value in range(1, choose + 1):\n        result = result * (total_steps - choose + value) // value\n    return result",
        "steps": [
          "到达一个格子的路径数来自上方与左方之和。",
          "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"
        ],
        "pitfalls": [
          "总共要走 rows+cols-2 步，其中选择 rows-1 步向下。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/unique-paths/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/unique-paths/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 92
  },
  {
    "id": "minimum-path-sum",
    "number": 64,
    "title": "最小路径和",
    "topic": "多维动态规划",
    "summary": "在非负网格中只能向右或向下移动，返回左上角到右下角路径的最小元素和。",
    "signature": "solve(grid) → int",
    "starter": "def solve(grid):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每个格子的最佳代价来自上方和左方的较小值。",
      "一维数组更新前是上方代价，更新后的前一项是左方代价。"
    ],
    "tests": [
      {
        "label": "低成本路线沿边界",
        "args": [
          [
            [
              2,
              1,
              9,
              9
            ],
            [
              8,
              1,
              2,
              7
            ],
            [
              6,
              5,
              1,
              3
            ]
          ]
        ],
        "expected": 10
      },
      {
        "label": "单列网格",
        "args": [
          [
            [
              4
            ],
            [
              2
            ],
            [
              7
            ],
            [
              1
            ]
          ]
        ],
        "expected": 14
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "一维滚动状态",
        "idea": "逐行更新到每列的最小代价，边界只可能从一个方向到达。",
        "complexity": "时间 O(mn)，空间 O(n)。",
        "code": "def solve(grid):\n    cols = len(grid[0]); dp = [float('inf')] * cols\n    dp[0] = 0\n    for row in grid:\n        for col, value in enumerate(row):\n            if col == 0: dp[col] += value\n            else: dp[col] = min(dp[col], dp[col - 1]) + value\n    return dp[-1]",
        "steps": [
          "每个格子的最佳代价来自上方和左方的较小值。",
          "一维数组更新前是上方代价，更新后的前一项是左方代价。"
        ],
        "pitfalls": [
          "一维数组更新前是上方代价，更新后的前一项是左方代价。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/minimum-path-sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "原地累积",
        "idea": "直接把每个格子改为到达该处的最小路径和。",
        "complexity": "时间 O(mn)，空间 O(1)。",
        "code": "def solve(grid):\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if r == c == 0: continue\n            top = grid[r - 1][c] if r else float('inf')\n            left = grid[r][c - 1] if c else float('inf')\n            grid[r][c] += min(top, left)\n    return grid[-1][-1]",
        "steps": [
          "每个格子的最佳代价来自上方和左方的较小值。",
          "一维数组更新前是上方代价，更新后的前一项是左方代价。"
        ],
        "pitfalls": [
          "一维数组更新前是上方代价，更新后的前一项是左方代价。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/minimum-path-sum/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/minimum-path-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 93
  },
  {
    "id": "edit-distance",
    "number": 72,
    "title": "编辑距离",
    "topic": "多维动态规划",
    "summary": "返回把一个字符串通过插入、删除或替换单个字符变成另一个字符串的最少操作数。",
    "signature": "solve(source, target) → int",
    "starter": "def solve(source, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "dp[i][j] 表示两个前缀之间的最小编辑次数。",
      "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"
    ],
    "tests": [
      {
        "label": "插入与替换组合",
        "args": [
          "plane",
          "plans"
        ],
        "expected": 1
      },
      {
        "label": "删除多余后缀",
        "args": [
          "coding",
          "cod"
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "二维编辑表",
        "idea": "初始化空前缀边界，再按尾字符是否相同进行转移。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(source, target):\n    dp = [[0] * (len(target) + 1) for _ in range(len(source) + 1)]\n    for i in range(len(source) + 1): dp[i][0] = i\n    for j in range(len(target) + 1): dp[0][j] = j\n    for i in range(1, len(source) + 1):\n        for j in range(1, len(target) + 1):\n            if source[i - 1] == target[j - 1]: dp[i][j] = dp[i - 1][j - 1]\n            else: dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\n    return dp[-1][-1]",
        "steps": [
          "dp[i][j] 表示两个前缀之间的最小编辑次数。",
          "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"
        ],
        "pitfalls": [
          "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/edit-distance/"
        }
      },
      {
        "id": "solution-2",
        "name": "滚动行",
        "idea": "只保留上一行，每个位置同时读取上方、左方和左上方。",
        "complexity": "时间 O(mn)，空间 O(n)。",
        "code": "def solve(source, target):\n    previous = list(range(len(target) + 1))\n    for i, char_source in enumerate(source, 1):\n        current = [i]\n        for j, char_target in enumerate(target, 1):\n            if char_source == char_target: current.append(previous[j - 1])\n            else: current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))\n        previous = current\n    return previous[-1]",
        "steps": [
          "dp[i][j] 表示两个前缀之间的最小编辑次数。",
          "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"
        ],
        "pitfalls": [
          "尾字符不同则从插入、删除、替换三种前驱取最小值加一。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/edit-distance/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/edit-distance/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 94
  },
  {
    "id": "longest-common-subsequence",
    "number": 1143,
    "title": "最长公共子序列",
    "topic": "多维动态规划",
    "summary": "返回两个字符串的最长公共子序列长度，字符在各自字符串中保持相对顺序但无需连续。",
    "signature": "solve(a, b) → int",
    "starter": "def solve(a, b):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "字符相同时由左上状态加一。",
      "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"
    ],
    "tests": [
      {
        "label": "顺序部分保持",
        "args": [
          "cabdfg",
          "xbadg"
        ],
        "expected": 3
      },
      {
        "label": "一串为空",
        "args": [
          "signal",
          ""
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "二维动态规划",
        "idea": "dp[i][j] 表示两个前缀的最长公共子序列长度。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(a, b):\n    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]\n    for i in range(1, len(a) + 1):\n        for j in range(1, len(b) + 1):\n            if a[i - 1] == b[j - 1]: dp[i][j] = dp[i - 1][j - 1] + 1\n            else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[-1][-1]",
        "steps": [
          "字符相同时由左上状态加一。",
          "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"
        ],
        "pitfalls": [
          "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-common-subsequence/"
        }
      },
      {
        "id": "solution-2",
        "name": "滚动一维数组",
        "idea": "逐行更新 b 的前缀状态，用 previous 保存被覆盖前的左上值。",
        "complexity": "时间 O(mn)，空间 O(n)。",
        "code": "def solve(a, b):\n    dp = [0] * (len(b) + 1)\n    for char_a in a:\n        diagonal = 0\n        for j, char_b in enumerate(b, 1):\n            top = dp[j]\n            if char_a == char_b: dp[j] = diagonal + 1\n            else: dp[j] = max(dp[j], dp[j - 1])\n            diagonal = top\n    return dp[-1]",
        "steps": [
          "字符相同时由左上状态加一。",
          "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"
        ],
        "pitfalls": [
          "字符不同时取删除 a 当前字符或删除 b 当前字符的较大值。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-common-subsequence/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/longest-common-subsequence/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 95
  },
  {
    "id": "next-permutation",
    "number": 31,
    "title": "下一个排列",
    "topic": "技巧",
    "summary": "把整数列表变为字典序中紧邻的下一个更大排列；若已最大则变为最小排列。",
    "signature": "solve(nums) → nums",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "从右向左找第一个上升位置作为 pivot。",
      "用后缀中刚好更大的数交换，再把后缀变为最小升序。"
    ],
    "tests": [
      {
        "label": "中段交换后反转",
        "args": [
          [
            2,
            5,
            4,
            3,
            1
          ]
        ],
        "expected": [
          3,
          1,
          2,
          4,
          5
        ]
      },
      {
        "label": "包含重复值",
        "args": [
          [
            1,
            3,
            3,
            2
          ]
        ],
        "expected": [
          2,
          1,
          3,
          3
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "枢轴交换翻转",
        "idea": "定位最右上升枢轴，与后缀最右且更大的值交换，再翻转递减后缀。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    pivot = len(nums) - 2\n    while pivot >= 0 and nums[pivot] >= nums[pivot + 1]: pivot -= 1\n    if pivot >= 0:\n        successor = len(nums) - 1\n        while nums[successor] <= nums[pivot]: successor -= 1\n        nums[pivot], nums[successor] = nums[successor], nums[pivot]\n    nums[pivot + 1:] = reversed(nums[pivot + 1:])\n    return nums",
        "steps": [
          "从右向左找第一个上升位置作为 pivot。",
          "用后缀中刚好更大的数交换，再把后缀变为最小升序。"
        ],
        "pitfalls": [
          "用后缀中刚好更大的数交换，再把后缀变为最小升序。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/next-permutation/"
        }
      },
      {
        "id": "solution-2",
        "name": "后缀排序",
        "idea": "枢轴与刚好更大的后继交换后，把后缀排序成最小字典序；比原地翻转多用排序。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(nums):\n    pivot = len(nums) - 2\n    while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:\n        pivot -= 1\n    if pivot < 0:\n        return sorted(nums)\n    successor = min((value, index) for index, value in enumerate(nums[pivot + 1:], pivot + 1) if value > nums[pivot])[1]\n    nums[pivot], nums[successor] = nums[successor], nums[pivot]\n    nums[pivot + 1:] = sorted(nums[pivot + 1:])\n    return nums",
        "steps": [
          "从右向左找第一个上升位置作为 pivot。",
          "用后缀中刚好更大的数交换，再把后缀变为最小升序。"
        ],
        "pitfalls": [
          "用后缀中刚好更大的数交换，再把后缀变为最小升序。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/next-permutation/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/next-permutation/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 96
  },
  {
    "id": "sort-colors",
    "number": 75,
    "title": "颜色分类",
    "topic": "技巧",
    "summary": "把只含 0、1、2 的列表原地排列为升序，并返回结果。",
    "signature": "solve(nums) → nums",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "left 左侧全为零，right 右侧全为二。",
      "遇到二时交换到右侧后，当前位置必须重新检查。"
    ],
    "tests": [
      {
        "label": "分组交错",
        "args": [
          [
            1,
            2,
            0,
            1,
            0,
            2,
            1
          ]
        ],
        "expected": [
          0,
          0,
          1,
          1,
          1,
          2,
          2
        ]
      },
      {
        "label": "只有一种颜色",
        "args": [
          [
            1,
            1,
            1
          ]
        ],
        "expected": [
          1,
          1,
          1
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "荷兰国旗三指针",
        "idea": "扫描指针把零交换到左区，把二交换到右区，一自然留在中间。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    left = current = 0; right = len(nums) - 1\n    while current <= right:\n        if nums[current] == 0:\n            nums[left], nums[current] = nums[current], nums[left]; left += 1; current += 1\n        elif nums[current] == 2:\n            nums[current], nums[right] = nums[right], nums[current]; right -= 1\n        else: current += 1\n    return nums",
        "steps": [
          "left 左侧全为零，right 右侧全为二。",
          "遇到二时交换到右侧后，当前位置必须重新检查。"
        ],
        "pitfalls": [
          "遇到二时交换到右侧后，当前位置必须重新检查。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sort-colors/"
        }
      },
      {
        "id": "solution-2",
        "name": "计数回写",
        "idea": "统计三种值的数量，再按数量依次覆盖原列表。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    counts = [0, 0, 0]\n    for value in nums: counts[value] += 1\n    index = 0\n    for value, count in enumerate(counts):\n        for _ in range(count): nums[index] = value; index += 1\n    return nums",
        "steps": [
          "left 左侧全为零，right 右侧全为二。",
          "遇到二时交换到右侧后，当前位置必须重新检查。"
        ],
        "pitfalls": [
          "遇到二时交换到右侧后，当前位置必须重新检查。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/sort-colors/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/sort-colors/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 97
  },
  {
    "id": "single-number",
    "number": 136,
    "title": "只出现一次的数字",
    "topic": "技巧",
    "summary": "数组中除一个元素出现一次外，其余都恰好出现两次，返回那个单独元素。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "相同数字异或后为零。",
      "异或满足交换律，所有成对数字会互相抵消。"
    ],
    "tests": [
      {
        "label": "孤立负数",
        "args": [
          [
            6,
            -4,
            9,
            6,
            9
          ]
        ],
        "expected": -4
      },
      {
        "label": "孤立值位于末尾",
        "args": [
          [
            2,
            8,
            2,
            8,
            13
          ]
        ],
        "expected": 13
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "全体异或",
        "idea": "从零开始异或所有元素，成对值抵消后只剩单独值。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    answer = 0\n    for value in nums: answer ^= value\n    return answer",
        "steps": [
          "相同数字异或后为零。",
          "异或满足交换律，所有成对数字会互相抵消。"
        ],
        "pitfalls": [
          "异或满足交换律，所有成对数字会互相抵消。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/single-number/"
        }
      },
      {
        "id": "solution-2",
        "name": "集合增删",
        "idea": "第一次遇到值时加入集合，第二次遇到时删除，最后只剩单独值。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    unmatched = set()\n    for value in nums:\n        if value in unmatched: unmatched.remove(value)\n        else: unmatched.add(value)\n    return unmatched.pop()",
        "steps": [
          "相同数字异或后为零。",
          "异或满足交换律，所有成对数字会互相抵消。"
        ],
        "pitfalls": [
          "异或满足交换律，所有成对数字会互相抵消。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/single-number/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/single-number/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 98
  },
  {
    "id": "majority-element",
    "number": 169,
    "title": "多数元素",
    "topic": "技巧",
    "summary": "返回数组中出现次数严格超过一半的元素，输入保证该元素存在。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把多数元素与不同元素两两抵消，最后候选仍是多数元素。",
      "计数归零时可以更换候选。"
    ],
    "tests": [
      {
        "label": "多数值穿插出现",
        "args": [
          [
            5,
            1,
            5,
            2,
            5,
            3,
            5
          ]
        ],
        "expected": 5
      },
      {
        "label": "负数占多数",
        "args": [
          [
            -2,
            4,
            -2,
            -2,
            7
          ]
        ],
        "expected": -2
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Boyer-Moore 投票",
        "idea": "相同候选加票、不同候选减票；多数元素无法被全部抵消。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    candidate, votes = None, 0\n    for value in nums:\n        if votes == 0: candidate = value\n        votes += 1 if value == candidate else -1\n    return candidate",
        "steps": [
          "把多数元素与不同元素两两抵消，最后候选仍是多数元素。",
          "计数归零时可以更换候选。"
        ],
        "pitfalls": [
          "计数归零时可以更换候选。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/majority-element/"
        }
      },
      {
        "id": "solution-2",
        "name": "频次统计",
        "idea": "统计所有元素次数并返回频次最大的键。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import Counter\n\ndef solve(nums):\n    return Counter(nums).most_common(1)[0][0]",
        "steps": [
          "把多数元素与不同元素两两抵消，最后候选仍是多数元素。",
          "计数归零时可以更换候选。"
        ],
        "pitfalls": [
          "计数归零时可以更换候选。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/majority-element/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/majority-element/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 99
  },
  {
    "id": "find-the-duplicate-number",
    "number": 287,
    "title": "寻找重复数",
    "topic": "技巧",
    "summary": "长度为 n+1 的数组只含 1 到 n，且恰有一个值重复，返回该重复值且不修改输入。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把下标到 nums[index] 看成链表，重复值是环入口。",
      "也可二分数值范围，统计不大于中点的元素数量。"
    ],
    "tests": [
      {
        "label": "重复值出现三次",
        "args": [
          [
            2,
            5,
            1,
            4,
            3,
            5,
            5
          ]
        ],
        "expected": 5
      },
      {
        "label": "重复值位于边界",
        "args": [
          [
            1,
            4,
            2,
            3,
            4
          ]
        ],
        "expected": 4
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Floyd 环入口",
        "idea": "数组映射形成带环链表；快慢指针相遇后从起点同速寻找入口。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    slow = fast = nums[0]\n    while True:\n        slow = nums[slow]; fast = nums[nums[fast]]\n        if slow == fast: break\n    seeker = nums[0]\n    while seeker != slow:\n        seeker = nums[seeker]; slow = nums[slow]\n    return seeker",
        "steps": [
          "把下标到 nums[index] 看成链表，重复值是环入口。",
          "也可二分数值范围，统计不大于中点的元素数量。"
        ],
        "pitfalls": [
          "也可二分数值范围，统计不大于中点的元素数量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-the-duplicate-number/"
        }
      },
      {
        "id": "solution-2",
        "name": "值域二分计数",
        "idea": "若不大于 mid 的元素多于 mid 个，重复值在左半值域，否则在右半。",
        "complexity": "时间 O(n log n)，空间 O(1)。",
        "code": "def solve(nums):\n    left, right = 1, len(nums) - 1\n    while left < right:\n        mid = (left + right) // 2\n        count = sum(value <= mid for value in nums)\n        if count > mid: right = mid\n        else: left = mid + 1\n    return left",
        "steps": [
          "把下标到 nums[index] 看成链表，重复值是环入口。",
          "也可二分数值范围，统计不大于中点的元素数量。"
        ],
        "pitfalls": [
          "也可二分数值范围，统计不大于中点的元素数量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/find-the-duplicate-number/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/find-the-duplicate-number/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 100
  },
  {
    "id": "contains-duplicate",
    "number": 217,
    "title": "存在重复元素",
    "topic": "哈希",
    "summary": "判断整数序列中是否有任意值出现至少两次。",
    "signature": "solve(nums) → bool",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "扫描时维护已见集合。",
      "若当前值已经在集合中，可以立即结束。"
    ],
    "tests": [
      {
        "label": "重复值相隔较远",
        "args": [
          [
            8,
            -3,
            5,
            12,
            -3
          ]
        ],
        "expected": true
      },
      {
        "label": "所有值不同",
        "args": [
          [
            11,
            7,
            2,
            19
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "集合扫描",
        "idea": "边读边查集合，第一次重复时立即返回。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(nums):\n    seen = set()\n    for value in nums:\n        if value in seen:\n            return True\n        seen.add(value)\n    return False",
        "steps": [
          "扫描时维护已见集合。",
          "若当前值已经在集合中，可以立即结束。"
        ],
        "pitfalls": [
          "若当前值已经在集合中，可以立即结束。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/contains-duplicate/"
        }
      },
      {
        "id": "solution-2",
        "name": "排序相邻检查",
        "idea": "排序后重复值必然相邻，逐对检查即可。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(nums):\n    ordered = sorted(nums)\n    return any(ordered[i] == ordered[i - 1] for i in range(1, len(ordered)))",
        "steps": [
          "扫描时维护已见集合。",
          "若当前值已经在集合中，可以立即结束。"
        ],
        "pitfalls": [
          "若当前值已经在集合中，可以立即结束。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/contains-duplicate/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/contains-duplicate/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 101
  },
  {
    "id": "valid-anagram",
    "number": 242,
    "title": "有效的字母异位词",
    "topic": "哈希",
    "summary": "判断两个字符串是否由完全相同的字符及频次组成。",
    "signature": "solve(left, right) → bool",
    "starter": "def solve(left, right):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "长度不同可以直接返回。",
      "比较字符频次，而不是字符位置。"
    ],
    "tests": [
      {
        "label": "同频不同序",
        "args": [
          "silent",
          "listen"
        ],
        "expected": true
      },
      {
        "label": "字符频次不同",
        "args": [
          "paper",
          "replay"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "频次表",
        "idea": "分别统计两端字符频次并比较。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import Counter\n\ndef solve(left, right):\n    return Counter(left) == Counter(right)",
        "steps": [
          "长度不同可以直接返回。",
          "比较字符频次，而不是字符位置。"
        ],
        "pitfalls": [
          "比较字符频次，而不是字符位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-anagram/"
        }
      },
      {
        "id": "solution-2",
        "name": "排序比较",
        "idea": "将两串字符排序，异位词会得到相同序列。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(left, right):\n    return sorted(left) == sorted(right)",
        "steps": [
          "长度不同可以直接返回。",
          "比较字符频次，而不是字符位置。"
        ],
        "pitfalls": [
          "比较字符频次，而不是字符位置。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-anagram/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/valid-anagram/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 102
  },
  {
    "id": "valid-sudoku",
    "number": 36,
    "title": "有效的数独",
    "topic": "哈希",
    "summary": "检查九宫格里已经填写的数字是否在每行、每列和每个三乘三宫内都不重复。",
    "signature": "solve(board) → bool",
    "starter": "def solve(board):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "空格不参与检查。",
      "宫编号可以写成 (row // 3, col // 3)。"
    ],
    "tests": [
      {
        "label": "稀疏合法盘面",
        "args": [
          [
            [
              "5",
              ".",
              ".",
              ".",
              "7",
              ".",
              ".",
              ".",
              "2"
            ],
            [
              ".",
              "7",
              ".",
              "1",
              ".",
              "5",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              "8",
              ".",
              ".",
              ".",
              "5",
              ".",
              "."
            ],
            [
              "8",
              ".",
              ".",
              ".",
              "6",
              ".",
              ".",
              ".",
              "3"
            ],
            [
              ".",
              "2",
              ".",
              "8",
              ".",
              "3",
              ".",
              "7",
              "."
            ],
            [
              "7",
              ".",
              ".",
              ".",
              "2",
              ".",
              ".",
              ".",
              "6"
            ],
            [
              ".",
              ".",
              "2",
              ".",
              ".",
              ".",
              "1",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              "4",
              ".",
              "9",
              ".",
              "3",
              "."
            ],
            [
              "3",
              ".",
              ".",
              ".",
              "8",
              ".",
              ".",
              ".",
              "9"
            ]
          ]
        ],
        "expected": true
      },
      {
        "label": "宫内出现冲突",
        "args": [
          [
            [
              "4",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              "4",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ],
            [
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              ".",
              "."
            ]
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "三组集合",
        "idea": "为每行、每列和每个宫分别维护集合。",
        "complexity": "时间 O(81)，空间 O(81)。",
        "code": "def solve(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            value = board[r][c]\n            if value == '.':\n                continue\n            box = (r // 3) * 3 + c // 3\n            if value in rows[r] or value in cols[c] or value in boxes[box]:\n                return False\n            rows[r].add(value); cols[c].add(value); boxes[box].add(value)\n    return True",
        "steps": [
          "空格不参与检查。",
          "宫编号可以写成 (row // 3, col // 3)。"
        ],
        "pitfalls": [
          "宫编号可以写成 (row // 3, col // 3)。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-sudoku/"
        }
      },
      {
        "id": "solution-2",
        "name": "统一冲突键",
        "idea": "把行、列、宫约束编码成三类键放进一个集合。",
        "complexity": "时间 O(81)，空间 O(81)。",
        "code": "def solve(board):\n    seen = set()\n    for r, row in enumerate(board):\n        for c, value in enumerate(row):\n            if value == '.':\n                continue\n            marks = ((\"r\", r, value), (\"c\", c, value), (\"b\", r // 3, c // 3, value))\n            if any(mark in seen for mark in marks):\n                return False\n            seen.update(marks)\n    return True",
        "steps": [
          "空格不参与检查。",
          "宫编号可以写成 (row // 3, col // 3)。"
        ],
        "pitfalls": [
          "宫编号可以写成 (row // 3, col // 3)。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-sudoku/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/valid-sudoku/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 103
  },
  {
    "id": "valid-palindrome",
    "number": 125,
    "title": "验证回文串",
    "topic": "双指针",
    "summary": "忽略非字母数字字符和大小写后，判断字符串是否正反一致。",
    "signature": "solve(text) → bool",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "左右指针先跳过无关字符。",
      "比较时统一大小写。"
    ],
    "tests": [
      {
        "label": "带标点的回文",
        "args": [
          "No 'x' in Nixon"
        ],
        "expected": true
      },
      {
        "label": "清洗后并非回文",
        "args": [
          "coding, is fun!"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "原串双指针",
        "idea": "左右指针只在字母数字位置停留并比较。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(text):\n    left, right = 0, len(text) - 1\n    while left < right:\n        while left < right and not text[left].isalnum(): left += 1\n        while left < right and not text[right].isalnum(): right -= 1\n        if text[left].lower() != text[right].lower(): return False\n        left += 1; right -= 1\n    return True",
        "steps": [
          "左右指针先跳过无关字符。",
          "比较时统一大小写。"
        ],
        "pitfalls": [
          "比较时统一大小写。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-palindrome/"
        }
      },
      {
        "id": "solution-2",
        "name": "清洗后反转",
        "idea": "先生成规范化字符序列，再与其逆序比较。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(text):\n    cleaned = ''.join(ch.lower() for ch in text if ch.isalnum())\n    return cleaned == cleaned[::-1]",
        "steps": [
          "左右指针先跳过无关字符。",
          "比较时统一大小写。"
        ],
        "pitfalls": [
          "比较时统一大小写。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-palindrome/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/valid-palindrome/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 104
  },
  {
    "id": "two-sum-ii-input-array-is-sorted",
    "number": 167,
    "title": "两数之和 II",
    "topic": "双指针",
    "summary": "在升序数组中寻找和为目标值的两个位置，并返回从一开始计数的位置。",
    "signature": "solve(numbers, target) → [i, j]",
    "starter": "def solve(numbers, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "利用有序性从两端夹逼。",
      "和偏小就移动左端，偏大就移动右端。"
    ],
    "tests": [
      {
        "label": "负数与正数配对",
        "args": [
          [
            -9,
            -2,
            1,
            6,
            12
          ],
          4
        ],
        "expected": [
          2,
          4
        ]
      },
      {
        "label": "相邻元素配对",
        "args": [
          [
            2,
            5,
            9,
            14
          ],
          14
        ],
        "expected": [
          2,
          3
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "左右夹逼",
        "idea": "依据当前和与目标的大小关系丢弃一端。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(numbers, target):\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        total = numbers[left] + numbers[right]\n        if total == target: return [left + 1, right + 1]\n        if total < target: left += 1\n        else: right -= 1\n    return []",
        "steps": [
          "利用有序性从两端夹逼。",
          "和偏小就移动左端，偏大就移动右端。"
        ],
        "pitfalls": [
          "和偏小就移动左端，偏大就移动右端。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/"
        }
      },
      {
        "id": "solution-2",
        "name": "二分寻找补数",
        "idea": "固定左侧元素，在其右侧二分查找补数。",
        "complexity": "时间 O(n log n)，空间 O(1)。",
        "code": "def solve(numbers, target):\n    for i, value in enumerate(numbers):\n        need = target - value\n        left, right = i + 1, len(numbers) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if numbers[mid] == need: return [i + 1, mid + 1]\n            if numbers[mid] < need: left = mid + 1\n            else: right = mid - 1\n    return []",
        "steps": [
          "利用有序性从两端夹逼。",
          "和偏小就移动左端，偏大就移动右端。"
        ],
        "pitfalls": [
          "和偏小就移动左端，偏大就移动右端。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 105
  },
  {
    "id": "longest-repeating-character-replacement",
    "number": 424,
    "title": "替换后的最长重复字符",
    "topic": "滑动窗口",
    "summary": "最多替换 k 个字符，求可以变成同一字符的最长连续片段长度。",
    "signature": "solve(text, k) → int",
    "starter": "def solve(text, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "窗口长度减去窗口最高频字符数，就是需要替换的数量。",
      "维护历史最高频次即可判断何时收缩。"
    ],
    "tests": [
      {
        "label": "中间字符可替换",
        "args": [
          "BAAABCC",
          2
        ],
        "expected": 5
      },
      {
        "label": "不允许替换",
        "args": [
          "ABBAAC",
          0
        ],
        "expected": 2
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "单调窗口",
        "idea": "窗口内非主流字符超过 k 时收缩左端。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import defaultdict\n\ndef solve(text, k):\n    counts = defaultdict(int)\n    left = best = top = 0\n    for right, ch in enumerate(text):\n        counts[ch] += 1\n        top = max(top, counts[ch])\n        while right - left + 1 - top > k:\n            counts[text[left]] -= 1; left += 1\n        best = max(best, right - left + 1)\n    return best",
        "steps": [
          "窗口长度减去窗口最高频字符数，就是需要替换的数量。",
          "维护历史最高频次即可判断何时收缩。"
        ],
        "pitfalls": [
          "维护历史最高频次即可判断何时收缩。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-repeating-character-replacement/"
        }
      },
      {
        "id": "solution-2",
        "name": "按目标字符扩展",
        "idea": "枚举最终保留的字符，并为它维护一个窗口。",
        "complexity": "时间 O(Σn)，空间 O(1)。",
        "code": "def solve(text, k):\n    best = 0\n    for target in set(text):\n        left = changed = 0\n        for right, ch in enumerate(text):\n            changed += ch != target\n            while changed > k:\n                changed -= text[left] != target; left += 1\n            best = max(best, right - left + 1)\n    return best",
        "steps": [
          "窗口长度减去窗口最高频字符数，就是需要替换的数量。",
          "维护历史最高频次即可判断何时收缩。"
        ],
        "pitfalls": [
          "维护历史最高频次即可判断何时收缩。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/longest-repeating-character-replacement/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/longest-repeating-character-replacement/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 106
  },
  {
    "id": "permutation-in-string",
    "number": 567,
    "title": "字符串的排列",
    "topic": "滑动窗口",
    "summary": "判断较长字符串中是否存在一个窗口，其字符频次恰好组成目标字符串的某种排列。",
    "signature": "solve(pattern, text) → bool",
    "starter": "def solve(pattern, text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "窗口长度始终等于 pattern 长度。",
      "比较的是频次，不是窗口内顺序。"
    ],
    "tests": [
      {
        "label": "排列出现在尾部",
        "args": [
          "aab",
          "zzcaba"
        ],
        "expected": true
      },
      {
        "label": "字符接近但频次不符",
        "args": [
          "aabc",
          "xxabdcaa"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "固定窗口频次",
        "idea": "维护目标频次和等长窗口频次。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import Counter\n\ndef solve(pattern, text):\n    width = len(pattern)\n    if width > len(text): return False\n    need = Counter(pattern); window = Counter(text[:width])\n    if window == need: return True\n    for right in range(width, len(text)):\n        window[text[right]] += 1\n        old = text[right - width]; window[old] -= 1\n        if window[old] == 0: del window[old]\n        if window == need: return True\n    return False",
        "steps": [
          "窗口长度始终等于 pattern 长度。",
          "比较的是频次，不是窗口内顺序。"
        ],
        "pitfalls": [
          "比较的是频次，不是窗口内顺序。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/permutation-in-string/"
        }
      },
      {
        "id": "solution-2",
        "name": "缺口计数",
        "idea": "用 remaining 记录窗口还缺多少个目标字符。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import Counter\n\ndef solve(pattern, text):\n    need = Counter(pattern); left = 0; remaining = len(pattern)\n    for right, ch in enumerate(text):\n        if need[ch] > 0: remaining -= 1\n        need[ch] -= 1\n        if right - left + 1 > len(pattern):\n            old = text[left]; left += 1\n            if need[old] >= 0: remaining += 1\n            need[old] += 1\n        if remaining == 0: return True\n    return False",
        "steps": [
          "窗口长度始终等于 pattern 长度。",
          "比较的是频次，不是窗口内顺序。"
        ],
        "pitfalls": [
          "比较的是频次，不是窗口内顺序。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/permutation-in-string/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/permutation-in-string/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 107
  },
  {
    "id": "evaluate-reverse-polish-notation",
    "number": 150,
    "title": "逆波兰表达式求值",
    "topic": "栈",
    "summary": "根据后缀表达式的令牌序列计算整数结果，除法向零截断。",
    "signature": "solve(tokens) → int",
    "starter": "def solve(tokens):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "遇到数字入栈，遇到运算符弹出右值再弹出左值。",
      "Python 的 // 对负数向下取整，不能直接代替向零截断。"
    ],
    "tests": [
      {
        "label": "混合四则运算",
        "args": [
          [
            "7",
            "3",
            "-",
            "2",
            "*",
            "5",
            "+"
          ]
        ],
        "expected": 13
      },
      {
        "label": "负数除法",
        "args": [
          [
            "13",
            "-5",
            "/",
            "4",
            "+"
          ]
        ],
        "expected": 2
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "显式运算分支",
        "idea": "栈保存尚未被消费的操作数。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(tokens):\n    stack = []\n    for token in tokens:\n        if token not in \"+-*/\": stack.append(int(token)); continue\n        right = stack.pop(); left = stack.pop()\n        if token == '+': stack.append(left + right)\n        elif token == '-': stack.append(left - right)\n        elif token == '*': stack.append(left * right)\n        else: stack.append(int(left / right))\n    return stack[-1]",
        "steps": [
          "遇到数字入栈，遇到运算符弹出右值再弹出左值。",
          "Python 的 // 对负数向下取整，不能直接代替向零截断。"
        ],
        "pitfalls": [
          "Python 的 // 对负数向下取整，不能直接代替向零截断。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/evaluate-reverse-polish-notation/"
        }
      },
      {
        "id": "solution-2",
        "name": "运算函数表",
        "idea": "用函数表收拢运算符分派，仍保持操作数顺序。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "import operator\n\ndef solve(tokens):\n    operations = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': lambda a, b: int(a / b)}\n    stack = []\n    for token in tokens:\n        if token in operations:\n            b, a = stack.pop(), stack.pop()\n            stack.append(operations[token](a, b))\n        else:\n            stack.append(int(token))\n    return stack[0]",
        "steps": [
          "遇到数字入栈，遇到运算符弹出右值再弹出左值。",
          "Python 的 // 对负数向下取整，不能直接代替向零截断。"
        ],
        "pitfalls": [
          "Python 的 // 对负数向下取整，不能直接代替向零截断。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/evaluate-reverse-polish-notation/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/evaluate-reverse-polish-notation/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 108
  },
  {
    "id": "car-fleet",
    "number": 853,
    "title": "车队",
    "topic": "栈",
    "summary": "多辆车驶向同一终点且不能超车，计算最终抵达终点的车队数量。",
    "signature": "solve(target, positions, speeds) → int",
    "starter": "def solve(target, positions, speeds):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "按起点从靠近终点到远离终点排序。",
      "后车抵达时间不大于前队时会并入该队。"
    ],
    "tests": [
      {
        "label": "形成两支车队",
        "args": [
          30,
          [
            4,
            12,
            20,
            26
          ],
          [
            4,
            2,
            3,
            1
          ]
        ],
        "expected": 2
      },
      {
        "label": "三车各自成队",
        "args": [
          25,
          [
            3,
            8,
            13
          ],
          [
            6,
            5,
            4
          ]
        ],
        "expected": 3
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "单调抵达时间",
        "idea": "从前往后观察，只有更晚抵达的车辆会形成新车队。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(target, positions, speeds):\n    times = []\n    for position, speed in sorted(zip(positions, speeds), reverse=True):\n        arrival = (target - position) / speed\n        if not times or arrival > times[-1]:\n            times.append(arrival)\n    return len(times)",
        "steps": [
          "按起点从靠近终点到远离终点排序。",
          "后车抵达时间不大于前队时会并入该队。"
        ],
        "pitfalls": [
          "后车抵达时间不大于前队时会并入该队。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/car-fleet/"
        }
      },
      {
        "id": "solution-2",
        "name": "反向最大时间",
        "idea": "用一个最大抵达时间代表前方最后一支车队。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(target, positions, speeds):\n    fleets = 0; front_time = -1.0\n    cars = sorted(zip(positions, speeds), key=lambda item: -item[0])\n    for position, speed in cars:\n        arrival = (target - position) / speed\n        if arrival > front_time:\n            fleets += 1; front_time = arrival\n    return fleets",
        "steps": [
          "按起点从靠近终点到远离终点排序。",
          "后车抵达时间不大于前队时会并入该队。"
        ],
        "pitfalls": [
          "后车抵达时间不大于前队时会并入该队。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/car-fleet/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/car-fleet/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 109
  },
  {
    "id": "binary-search",
    "number": 704,
    "title": "二分查找",
    "topic": "二分查找",
    "summary": "在严格升序数组中查找目标值的位置，不存在时返回负一。",
    "signature": "solve(nums, target) → int",
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "明确区间是闭区间还是左闭右开。",
      "每轮都必须缩小搜索区间。"
    ],
    "tests": [
      {
        "label": "目标在右半区",
        "args": [
          [
            -8,
            -1,
            4,
            9,
            15,
            22
          ],
          15
        ],
        "expected": 4
      },
      {
        "label": "目标落在空隙",
        "args": [
          [
            2,
            6,
            10,
            18
          ],
          11
        ],
        "expected": -1
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "闭区间模板",
        "idea": "维护两端都可能包含答案的闭区间。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        if nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1",
        "steps": [
          "明确区间是闭区间还是左闭右开。",
          "每轮都必须缩小搜索区间。"
        ],
        "pitfalls": [
          "每轮都必须缩小搜索区间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-search/"
        }
      },
      {
        "id": "solution-2",
        "name": "左闭右开模板",
        "idea": "维护 [left, right) 并在 left 等于 right 时结束。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] < target: left = mid + 1\n        else: right = mid\n    return left if left < len(nums) and nums[left] == target else -1",
        "steps": [
          "明确区间是闭区间还是左闭右开。",
          "每轮都必须缩小搜索区间。"
        ],
        "pitfalls": [
          "每轮都必须缩小搜索区间。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/binary-search/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/binary-search/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 110
  },
  {
    "id": "koko-eating-bananas",
    "number": 875,
    "title": "爱吃香蕉的珂珂",
    "topic": "二分查找",
    "summary": "给定若干堆和可用小时数，求按整小时处理每堆时能够按时完成的最小速度。",
    "signature": "solve(piles, hours) → int",
    "starter": "def solve(piles, hours):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "答案位于 1 到最大堆大小之间。",
      "速度越大，所需时间单调不增。"
    ],
    "tests": [
      {
        "label": "小时数略有余量",
        "args": [
          [
            5,
            13,
            21,
            4
          ],
          9
        ],
        "expected": 6
      },
      {
        "label": "必须采用较高速度",
        "args": [
          [
            18,
            7,
            25
          ],
          4
        ],
        "expected": 18
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "答案二分",
        "idea": "二分速度，并用向上取整计算总小时数。",
        "complexity": "时间 O(n log m)，空间 O(1)。",
        "code": "def solve(piles, hours):\n    left, right = 1, max(piles)\n    while left < right:\n        speed = (left + right) // 2\n        used = sum((pile + speed - 1) // speed for pile in piles)\n        if used <= hours: right = speed\n        else: left = speed + 1\n    return left",
        "steps": [
          "答案位于 1 到最大堆大小之间。",
          "速度越大，所需时间单调不增。"
        ],
        "pitfalls": [
          "速度越大，所需时间单调不增。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/koko-eating-bananas/"
        }
      },
      {
        "id": "solution-2",
        "name": "库函数定位",
        "idea": "让 bisect 在虚拟速度区间中定位首个可行值。",
        "complexity": "时间 O(n log m)，空间 O(1)。",
        "code": "def solve(piles, hours):\n    left, right = 1, max(piles)\n    while left <= right:\n        speed = (left + right) // 2\n        if sum(-(-pile // speed) for pile in piles) <= hours:\n            answer = speed; right = speed - 1\n        else:\n            left = speed + 1\n    return answer",
        "steps": [
          "答案位于 1 到最大堆大小之间。",
          "速度越大，所需时间单调不增。"
        ],
        "pitfalls": [
          "速度越大，所需时间单调不增。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/koko-eating-bananas/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/koko-eating-bananas/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 111
  },
  {
    "id": "reorder-list",
    "number": 143,
    "title": "重排链表",
    "topic": "链表",
    "summary": "把链表按首、尾、次首、次尾的次序重新连接，并返回重排后的值序列。",
    "signature": "solve(values) → list",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先找到中点，再反转后半段。",
      "最后把前后两段交替合并。"
    ],
    "tests": [
      {
        "label": "奇数长度重排",
        "args": [
          [
            4,
            1,
            9,
            2,
            8
          ]
        ],
        "expected": [
          4,
          8,
          1,
          2,
          9
        ]
      },
      {
        "label": "偶数长度重排",
        "args": [
          [
            7,
            3,
            6,
            5,
            2,
            1
          ]
        ],
        "expected": [
          7,
          1,
          3,
          2,
          6,
          5
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "中点加反转",
        "idea": "把后半段反转后与前半段交替取节点。",
        "complexity": "时间 O(n)，空间 O(1)，输出数组除外。",
        "code": "def solve(values):\n    if len(values) < 3: return values[:]\n    mid = (len(values) + 1) // 2\n    left, right = values[:mid], values[mid:][::-1]\n    result = []\n    for i in range(mid):\n        result.append(left[i])\n        if i < len(right): result.append(right[i])\n    return result",
        "steps": [
          "先找到中点，再反转后半段。",
          "最后把前后两段交替合并。"
        ],
        "pitfalls": [
          "最后把前后两段交替合并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reorder-list/"
        }
      },
      {
        "id": "solution-2",
        "name": "双端队列",
        "idea": "从双端交替弹出元素，直接模拟目标顺序。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\ndef solve(values):\n    queue = deque(values); result = []\n    take_left = True\n    while queue:\n        result.append(queue.popleft() if take_left else queue.pop())\n        take_left = not take_left\n    return result",
        "steps": [
          "先找到中点，再反转后半段。",
          "最后把前后两段交替合并。"
        ],
        "pitfalls": [
          "最后把前后两段交替合并。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reorder-list/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/reorder-list/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 112
  },
  {
    "id": "same-tree",
    "number": 100,
    "title": "相同的树",
    "topic": "二叉树",
    "summary": "根据两棵树的层序表示，判断它们的结构和对应节点值是否完全一致。",
    "signature": "solve(first, second) → bool",
    "starter": "def solve(first, second):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "节点值相同还不够，空节点位置也必须一致。",
      "层序数组可以先规范化掉末尾多余的空位。"
    ],
    "tests": [
      {
        "label": "结构和值均一致",
        "args": [
          [
            8,
            3,
            10,
            null,
            6
          ],
          [
            8,
            3,
            10,
            null,
            6
          ]
        ],
        "expected": true
      },
      {
        "label": "值相同但结构不同",
        "args": [
          [
            1,
            2
          ],
          [
            1,
            null,
            2
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "递归逐节点",
        "idea": "同步构树后，成对递归比较节点。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\ndef build(values):\n    if not values or values[0] is None: return None\n    root = [values[0], None, None]; queue = deque([root]); i = 1\n    while queue and i < len(values):\n        node = queue.popleft()\n        for side in (1, 2):\n            if i < len(values) and values[i] is not None:\n                node[side] = [values[i], None, None]; queue.append(node[side])\n            i += 1\n    return root\n\ndef solve(first, second):\n    def equal(a, b):\n        if not a or not b: return a is b\n        return a[0] == b[0] and equal(a[1], b[1]) and equal(a[2], b[2])\n    return equal(build(first), build(second))",
        "steps": [
          "节点值相同还不够，空节点位置也必须一致。",
          "层序数组可以先规范化掉末尾多余的空位。"
        ],
        "pitfalls": [
          "层序数组可以先规范化掉末尾多余的空位。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/same-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "同步广度遍历",
        "idea": "队列每次取一对节点，立即检查结构和值。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\ndef normalize(values):\n    values = list(values)\n    while values and values[-1] is None: values.pop()\n    return values\n\ndef solve(first, second):\n    return normalize(first) == normalize(second)",
        "steps": [
          "节点值相同还不够，空节点位置也必须一致。",
          "层序数组可以先规范化掉末尾多余的空位。"
        ],
        "pitfalls": [
          "层序数组可以先规范化掉末尾多余的空位。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/same-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/same-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 113
  },
  {
    "id": "balanced-binary-tree",
    "number": 110,
    "title": "平衡二叉树",
    "topic": "二叉树",
    "summary": "判断二叉树中每个节点的左右子树高度差是否都不超过一。",
    "signature": "solve(level) → bool",
    "starter": "def solve(level):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "后序遍历可以一边求高度一边检测失衡。",
      "用特殊值向上层传播失衡状态。"
    ],
    "tests": [
      {
        "label": "多层但保持平衡",
        "args": [
          [
            6,
            3,
            9,
            1,
            4,
            8,
            12,
            null,
            2
          ]
        ],
        "expected": true
      },
      {
        "label": "左侧链过深",
        "args": [
          [
            5,
            3,
            null,
            2,
            null,
            1
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "后序高度哨兵",
        "idea": "子树失衡时返回负一，避免重复计算高度。",
        "complexity": "时间 O(n)，空间 O(h)。",
        "code": "from collections import deque\n\ndef solve(level):\n    if not level: return True\n    nodes = [None if value is None else [value, None, None] for value in level]\n    queue = deque([0]); cursor = 1\n    while queue and cursor < len(nodes):\n        index = queue.popleft()\n        if nodes[index] is None: continue\n        for side in (1, 2):\n            if cursor < len(nodes):\n                nodes[index][side] = nodes[cursor]\n                if nodes[cursor] is not None: queue.append(cursor)\n                cursor += 1\n    def height(node):\n        if node is None: return 0\n        left = height(node[1]); right = height(node[2])\n        if left < 0 or right < 0 or abs(left - right) > 1: return -1\n        return max(left, right) + 1\n    return height(nodes[0]) >= 0",
        "steps": [
          "后序遍历可以一边求高度一边检测失衡。",
          "用特殊值向上层传播失衡状态。"
        ],
        "pitfalls": [
          "用特殊值向上层传播失衡状态。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/balanced-binary-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "迭代后序",
        "idea": "显式栈按后序计算每个节点的高度。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(level):\n    if not level or level[0] is None: return True\n    children = {}; queue = [0]; cursor = 1\n    for index in queue:\n        pair = []\n        for _ in range(2):\n            child = cursor if cursor < len(level) and level[cursor] is not None else None\n            pair.append(child)\n            if child is not None: queue.append(child)\n            cursor += 1\n        children[index] = pair\n        if cursor >= len(level) and len(queue) <= queue.index(index) + 1: break\n    heights = {}; stack = [(0, False)]\n    while stack:\n        node, visited = stack.pop()\n        if node is None: continue\n        if not visited:\n            stack.append((node, True))\n            left, right = children.get(node, [None, None])\n            stack.extend([(right, False), (left, False)])\n        else:\n            left, right = children.get(node, [None, None])\n            a, b = heights.get(left, 0), heights.get(right, 0)\n            if abs(a - b) > 1: return False\n            heights[node] = max(a, b) + 1\n    return True",
        "steps": [
          "后序遍历可以一边求高度一边检测失衡。",
          "用特殊值向上层传播失衡状态。"
        ],
        "pitfalls": [
          "用特殊值向上层传播失衡状态。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/balanced-binary-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/balanced-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 114
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-search-tree",
    "number": 235,
    "title": "二叉搜索树的最近公共祖先",
    "topic": "二叉树",
    "summary": "在二叉搜索树中，根据两个节点值找到它们的最近公共祖先值。",
    "signature": "solve(level, p, q) → value",
    "starter": "def solve(level, p, q):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "若两个目标都小于当前值，答案只可能在左侧。",
      "若目标分居两侧，当前节点就是分叉点。"
    ],
    "tests": [
      {
        "label": "祖先是根节点",
        "args": [
          [
            10,
            5,
            16,
            2,
            8,
            13,
            20
          ],
          2,
          13
        ],
        "expected": 10
      },
      {
        "label": "一个节点本身是祖先",
        "args": [
          [
            10,
            5,
            16,
            2,
            8,
            13,
            20
          ],
          5,
          8
        ],
        "expected": 5
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "利用有序性迭代",
        "idea": "沿两目标共同所在方向移动，首次分叉处即答案。",
        "complexity": "时间 O(h)，空间 O(n) 用于本地层序适配。",
        "code": "from collections import deque\n\ndef build(level):\n    if not level or level[0] is None: return None\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    return root\n\ndef solve(level, p, q):\n    current = build(level); low, high = sorted((p, q))\n    while current:\n        if high < current[0]: current = current[1]\n        elif low > current[0]: current = current[2]\n        else: return current[0]",
        "steps": [
          "若两个目标都小于当前值，答案只可能在左侧。",
          "若目标分居两侧，当前节点就是分叉点。"
        ],
        "pitfalls": [
          "若目标分居两侧，当前节点就是分叉点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "搜索路径交点",
        "idea": "分别记录根到目标的搜索路径，最后一个相同值就是祖先。",
        "complexity": "时间 O(h)，空间 O(n) 用于本地层序适配。",
        "code": "from collections import deque\n\ndef solve(level, p, q):\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    def path(target):\n        node = root; result = []\n        while node:\n            result.append(node[0])\n            if node[0] == target: return result\n            node = node[1] if target < node[0] else node[2]\n        return result\n    answer = root[0]\n    for left, right in zip(path(p), path(q)):\n        if left != right: break\n        answer = left\n    return answer",
        "steps": [
          "若两个目标都小于当前值，答案只可能在左侧。",
          "若目标分居两侧，当前节点就是分叉点。"
        ],
        "pitfalls": [
          "若目标分居两侧，当前节点就是分叉点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 115
  },
  {
    "id": "subtree-of-another-tree",
    "number": 572,
    "title": "另一棵树的子树",
    "topic": "二叉树",
    "summary": "判断候选树是否与主树中某个节点开始的完整子树完全相同。",
    "signature": "solve(root_level, sub_level) → bool",
    "starter": "def solve(root_level, sub_level):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先定位值可能相同的根，再比较整棵子树。",
      "序列化时必须保留空节点标记以区分结构。"
    ],
    "tests": [
      {
        "label": "内部结构完整匹配",
        "args": [
          [
            9,
            4,
            12,
            2,
            6,
            10,
            14
          ],
          [
            4,
            2,
            6
          ]
        ],
        "expected": true
      },
      {
        "label": "值出现但子结构不同",
        "args": [
          [
            9,
            4,
            12,
            2,
            6,
            10,
            14,
            null,
            3
          ],
          [
            4,
            2,
            6,
            null,
            null,
            3
          ]
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "逐节点比较",
        "idea": "枚举主树节点，并递归比较候选节点以下的完整结构。",
        "complexity": "时间 O(nm)，空间 O(n+m)。",
        "code": "from collections import deque\n\ndef build(level):\n    if not level or level[0] is None: return None\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    return root\n\ndef solve(root_level, sub_level):\n    root, sub = build(root_level), build(sub_level)\n    def same(left, right):\n        if not left or not right: return left is right\n        return left[0] == right[0] and same(left[1], right[1]) and same(left[2], right[2])\n    stack = [root]\n    while stack:\n        node = stack.pop()\n        if same(node, sub): return True\n        if node: stack.extend([node[1], node[2]])\n    return sub is None",
        "steps": [
          "先定位值可能相同的根，再比较整棵子树。",
          "序列化时必须保留空节点标记以区分结构。"
        ],
        "pitfalls": [
          "序列化时必须保留空节点标记以区分结构。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subtree-of-another-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "带空标记序列化",
        "idea": "把结构和值编码为带分隔符的先序文本，再执行包含判断。",
        "complexity": "时间 O(n+m)，空间 O(n+m)。",
        "code": "from collections import deque\n\ndef build(level):\n    if not level or level[0] is None: return None\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    return root\n\ndef encode(node):\n    if node is None: return ',#'\n    return f',^{node[0]}' + encode(node[1]) + encode(node[2])\n\ndef solve(root_level, sub_level):\n    return encode(build(sub_level)) in encode(build(root_level))",
        "steps": [
          "先定位值可能相同的根，再比较整棵子树。",
          "序列化时必须保留空节点标记以区分结构。"
        ],
        "pitfalls": [
          "序列化时必须保留空节点标记以区分结构。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subtree-of-another-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/subtree-of-another-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 116
  },
  {
    "id": "serialize-and-deserialize-binary-tree",
    "number": 297,
    "title": "二叉树的序列化与反序列化",
    "topic": "二叉树",
    "summary": "设计可逆的树编码；本地练习返回一次编码再解码后的规范层序结果。",
    "signature": "solve(level) → normalized level",
    "starter": "def solve(level):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "空节点标记是恢复结构的关键。",
      "解码后移除层序末尾无意义的空位。"
    ],
    "tests": [
      {
        "label": "不完全二叉树往返",
        "args": [
          [
            7,
            3,
            11,
            null,
            5,
            9
          ]
        ],
        "expected": [
          7,
          3,
          11,
          null,
          5,
          9
        ]
      },
      {
        "label": "单侧多层往返",
        "args": [
          [
            2,
            null,
            6,
            4
          ]
        ],
        "expected": [
          2,
          null,
          6,
          4
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "层序编解码",
        "idea": "用队列保留内部空位，随后按相同顺序恢复左右孩子。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\ndef solve(level):\n    if not level: return []\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    tokens = []; queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node is None: tokens.append('#'); continue\n        tokens.append(str(node[0])); queue.extend([node[1], node[2]])\n    while tokens and tokens[-1] == '#': tokens.pop()\n    data = ','.join(tokens)\n    raw = data.split(','); rebuilt = [int(raw[0]), None, None]; queue = deque([rebuilt]); index = 1\n    while queue and index < len(raw):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(raw) and raw[index] != '#':\n                node[side] = [int(raw[index]), None, None]; queue.append(node[side])\n            index += 1\n    output = []; queue = deque([rebuilt])\n    while queue:\n        node = queue.popleft()\n        if node is None: output.append(None); continue\n        output.append(node[0]); queue.extend([node[1], node[2]])\n    while output and output[-1] is None: output.pop()\n    return output",
        "steps": [
          "空节点标记是恢复结构的关键。",
          "解码后移除层序末尾无意义的空位。"
        ],
        "pitfalls": [
          "解码后移除层序末尾无意义的空位。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/"
        }
      },
      {
        "id": "solution-2",
        "name": "先序编解码",
        "idea": "先序文本为每个空孩子写入标记，解码时按令牌流递归恢复。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from collections import deque\n\ndef solve(level):\n    if not level: return []\n    root = [level[0], None, None]; queue = deque([root]); index = 1\n    while queue and index < len(level):\n        node = queue.popleft()\n        for side in (1, 2):\n            if index < len(level) and level[index] is not None:\n                node[side] = [level[index], None, None]; queue.append(node[side])\n            index += 1\n    tokens = []\n    def encode(node):\n        if node is None: tokens.append('#'); return\n        tokens.append(str(node[0])); encode(node[1]); encode(node[2])\n    encode(root); stream = iter(tokens)\n    def decode():\n        token = next(stream)\n        if token == '#': return None\n        return [int(token), decode(), decode()]\n    rebuilt = decode(); output = []; queue = deque([rebuilt])\n    while queue:\n        node = queue.popleft()\n        if node is None: output.append(None); continue\n        output.append(node[0]); queue.extend([node[1], node[2]])\n    while output and output[-1] is None: output.pop()\n    return output",
        "steps": [
          "空节点标记是恢复结构的关键。",
          "解码后移除层序末尾无意义的空位。"
        ],
        "pitfalls": [
          "解码后移除层序末尾无意义的空位。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 117
  },
  {
    "id": "task-scheduler",
    "number": 621,
    "title": "任务调度器",
    "topic": "堆",
    "summary": "同类任务之间至少间隔 n 个时间单位，计算执行完全部任务所需的最短时间。",
    "signature": "solve(tasks, cooldown) → int",
    "starter": "def solve(tasks, cooldown):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "频次最高的任务决定骨架长度。",
      "也可以用最大堆逐周期模拟。"
    ],
    "tests": [
      {
        "label": "两类高频任务",
        "args": [
          [
            "A",
            "A",
            "A",
            "B",
            "B",
            "B",
            "C"
          ],
          2
        ],
        "expected": 8
      },
      {
        "label": "冷却时间短",
        "args": [
          [
            "X",
            "X",
            "Y",
            "Y",
            "Z",
            "Z",
            "Z"
          ],
          1
        ],
        "expected": 7
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "频次骨架公式",
        "idea": "最高频任务划分槽位，再让同频任务并列占用最后位置。",
        "complexity": "时间 O(n)，空间 O(k)。",
        "code": "from collections import Counter\n\ndef solve(tasks, cooldown):\n    counts = Counter(tasks).values(); top = max(counts)\n    tied = sum(count == top for count in counts)\n    return max(len(tasks), (top - 1) * (cooldown + 1) + tied)",
        "steps": [
          "频次最高的任务决定骨架长度。",
          "也可以用最大堆逐周期模拟。"
        ],
        "pitfalls": [
          "也可以用最大堆逐周期模拟。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/task-scheduler/"
        }
      },
      {
        "id": "solution-2",
        "name": "最大堆模拟",
        "idea": "每轮取至多 cooldown+1 个最高频任务，未完成的再入堆。",
        "complexity": "时间 O(n log k)，空间 O(k)。",
        "code": "from collections import Counter\nimport heapq\n\ndef solve(tasks, cooldown):\n    heap = [-count for count in Counter(tasks).values()]; heapq.heapify(heap)\n    time = 0\n    while heap:\n        used = []\n        for _ in range(cooldown + 1):\n            if heap:\n                count = heapq.heappop(heap) + 1\n                if count: used.append(count)\n            time += 1\n            if not heap and not used: break\n        for count in used: heapq.heappush(heap, count)\n    return time",
        "steps": [
          "频次最高的任务决定骨架长度。",
          "也可以用最大堆逐周期模拟。"
        ],
        "pitfalls": [
          "也可以用最大堆逐周期模拟。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/task-scheduler/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/task-scheduler/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 118
  },
  {
    "id": "k-closest-points-to-origin",
    "number": 973,
    "title": "最接近原点的 K 个点",
    "topic": "堆",
    "summary": "按欧氏距离选出距离原点最近的 k 个点，并按距离与坐标稳定排序返回。",
    "signature": "solve(points, k) → points",
    "starter": "def solve(points, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "比较平方距离即可，不必开方。",
      "只保留 k 个候选时可使用最大堆。"
    ],
    "tests": [
      {
        "label": "不同象限的点",
        "args": [
          [
            [
              4,
              1
            ],
            [
              -2,
              2
            ],
            [
              1,
              -1
            ],
            [
              7,
              0
            ]
          ],
          2
        ],
        "expected": [
          [
            1,
            -1
          ],
          [
            -2,
            2
          ]
        ]
      },
      {
        "label": "包含原点",
        "args": [
          [
            [
              3,
              3
            ],
            [
              0,
              0
            ],
            [
              -1,
              4
            ],
            [
              2,
              -2
            ]
          ],
          3
        ],
        "expected": [
          [
            0,
            0
          ],
          [
            2,
            -2
          ],
          [
            -1,
            4
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "整体排序",
        "idea": "按平方距离和坐标排序后截取前 k 项。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(points, k):\n    return sorted(points, key=lambda point: (point[0] ** 2 + point[1] ** 2, point[0], point[1]))[:k]",
        "steps": [
          "比较平方距离即可，不必开方。",
          "只保留 k 个候选时可使用最大堆。"
        ],
        "pitfalls": [
          "只保留 k 个候选时可使用最大堆。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/k-closest-points-to-origin/"
        }
      },
      {
        "id": "solution-2",
        "name": "小顶堆选取",
        "idea": "把距离与坐标作为堆键，弹出 k 次。",
        "complexity": "时间 O(n+k log n)，空间 O(n)。",
        "code": "import heapq\n\ndef solve(points, k):\n    heap = [(x*x + y*y, x, y) for x, y in points]\n    heapq.heapify(heap)\n    return [[x, y] for _, x, y in (heapq.heappop(heap) for _ in range(k))]",
        "steps": [
          "比较平方距离即可，不必开方。",
          "只保留 k 个候选时可使用最大堆。"
        ],
        "pitfalls": [
          "只保留 k 个候选时可使用最大堆。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/k-closest-points-to-origin/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/k-closest-points-to-origin/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 119
  },
  {
    "id": "last-stone-weight",
    "number": 1046,
    "title": "最后一块石头的重量",
    "topic": "堆",
    "summary": "反复取出最重的两块并抵消，返回最终剩余重量，没有剩余则返回零。",
    "signature": "solve(weights) → int",
    "starter": "def solve(weights):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "Python 只有小顶堆，可存负重量模拟最大堆。",
      "两块相等时无需放回。"
    ],
    "tests": [
      {
        "label": "多轮抵消",
        "args": [
          [
            11,
            6,
            4,
            9,
            2
          ]
        ],
        "expected": 2
      },
      {
        "label": "最终完全抵消",
        "args": [
          [
            8,
            3,
            8,
            3
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "负数最大堆",
        "idea": "每轮弹出两个最小负数，差值仍以负数放回。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "import heapq\n\ndef solve(weights):\n    heap = [-weight for weight in weights]; heapq.heapify(heap)\n    while len(heap) > 1:\n        first = -heapq.heappop(heap); second = -heapq.heappop(heap)\n        if first != second: heapq.heappush(heap, -(first - second))\n    return -heap[0] if heap else 0",
        "steps": [
          "Python 只有小顶堆，可存负重量模拟最大堆。",
          "两块相等时无需放回。"
        ],
        "pitfalls": [
          "两块相等时无需放回。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/last-stone-weight/"
        }
      },
      {
        "id": "solution-2",
        "name": "重复排序基线",
        "idea": "每轮排序后取出最大的两个重量。",
        "complexity": "时间 O(n² log n)，空间 O(n)。",
        "code": "def solve(weights):\n    stones = list(weights)\n    while len(stones) > 1:\n        stones.sort()\n        first, second = stones.pop(), stones.pop()\n        if first != second: stones.append(first - second)\n    return stones[0] if stones else 0",
        "steps": [
          "Python 只有小顶堆，可存负重量模拟最大堆。",
          "两块相等时无需放回。"
        ],
        "pitfalls": [
          "两块相等时无需放回。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/last-stone-weight/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/last-stone-weight/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 120
  },
  {
    "id": "combination-sum-ii",
    "number": 40,
    "title": "组合总和 II",
    "topic": "回溯",
    "summary": "每个候选数最多使用一次，找出和为目标值的不重复组合。",
    "signature": "solve(candidates, target) → combinations",
    "starter": "def solve(candidates, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "排序后，同一层遇到相同值要跳过。",
      "递归下一层从 index + 1 开始。"
    ],
    "tests": [
      {
        "label": "含多个重复候选",
        "args": [
          [
            2,
            5,
            2,
            1,
            2,
            6,
            7
          ],
          8
        ],
        "expected": [
          [
            1,
            2,
            5
          ],
          [
            1,
            7
          ],
          [
            2,
            6
          ]
        ]
      },
      {
        "label": "不同长度的组合",
        "args": [
          [
            3,
            1,
            3,
            5,
            1,
            6
          ],
          7
        ],
        "expected": [
          [
            1,
            1,
            5
          ],
          [
            1,
            3,
            3
          ],
          [
            1,
            6
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "排序回溯去重",
        "idea": "同层只选择相同值的第一次出现，避免重复组合。",
        "complexity": "时间 O(2^n)，空间 O(n)。",
        "code": "def solve(candidates, target):\n    values = sorted(candidates); result = []\n    def search(start, remain, path):\n        if remain == 0: result.append(path[:]); return\n        for index in range(start, len(values)):\n            if index > start and values[index] == values[index - 1]: continue\n            if values[index] > remain: break\n            path.append(values[index]); search(index + 1, remain - values[index], path); path.pop()\n    search(0, target, [])\n    return result",
        "steps": [
          "排序后，同一层遇到相同值要跳过。",
          "递归下一层从 index + 1 开始。"
        ],
        "pitfalls": [
          "递归下一层从 index + 1 开始。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/combination-sum-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "频次选择",
        "idea": "按不同数值及其数量，枚举每个值取零到若干次。",
        "complexity": "时间 O(∏(count+1))，空间 O(n)。",
        "code": "from collections import Counter\n\ndef solve(candidates, target):\n    items = sorted(Counter(candidates).items()); result = []\n    def search(index, remain, path):\n        if remain == 0: result.append(path[:]); return\n        if index == len(items): return\n        value, count = items[index]\n        for used in range(min(count, remain // value) + 1):\n            search(index + 1, remain - used * value, path + [value] * used)\n    search(0, target, [])\n    return result",
        "steps": [
          "排序后，同一层遇到相同值要跳过。",
          "递归下一层从 index + 1 开始。"
        ],
        "pitfalls": [
          "递归下一层从 index + 1 开始。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/combination-sum-ii/"
        }
      }
    ],
    "compare": "outerUnordered",
    "referenceUrl": "https://leetcode.cn/problems/combination-sum-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 121
  },
  {
    "id": "subsets-ii",
    "number": 90,
    "title": "子集 II",
    "topic": "回溯",
    "summary": "给定可能含重复值的数组，返回所有互不重复的子集。",
    "signature": "solve(nums) → subsets",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先排序，让重复值相邻。",
      "只跳过同一递归层中重复的选择。"
    ],
    "tests": [
      {
        "label": "两个值重复",
        "args": [
          [
            4,
            1,
            4
          ]
        ],
        "expected": [
          [],
          [
            1
          ],
          [
            1,
            4
          ],
          [
            1,
            4,
            4
          ],
          [
            4
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "label": "三次重复",
        "args": [
          [
            2,
            2,
            2,
            5
          ]
        ],
        "expected": [
          [],
          [
            2
          ],
          [
            2,
            2
          ],
          [
            2,
            2,
            2
          ],
          [
            2,
            2,
            2,
            5
          ],
          [
            2,
            2,
            5
          ],
          [
            2,
            5
          ],
          [
            5
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "排序回溯",
        "idea": "每到一个状态先记录当前路径，再从后续候选扩展。",
        "complexity": "时间 O(2^n)，空间 O(n)。",
        "code": "def solve(nums):\n    nums.sort(); result = []\n    def search(start, path):\n        result.append(path[:])\n        for index in range(start, len(nums)):\n            if index > start and nums[index] == nums[index - 1]: continue\n            path.append(nums[index]); search(index + 1, path); path.pop()\n    search(0, [])\n    return result",
        "steps": [
          "先排序，让重复值相邻。",
          "只跳过同一递归层中重复的选择。"
        ],
        "pitfalls": [
          "只跳过同一递归层中重复的选择。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subsets-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "按频次展开",
        "idea": "对每种不同值选择使用零到 count 次。",
        "complexity": "时间 O(2^n)，空间 O(n)。",
        "code": "from collections import Counter\n\ndef solve(nums):\n    result = [[]]\n    for value, count in sorted(Counter(nums).items()):\n        result = [base + [value] * used for base in result for used in range(count + 1)]\n    return result",
        "steps": [
          "先排序，让重复值相邻。",
          "只跳过同一递归层中重复的选择。"
        ],
        "pitfalls": [
          "只跳过同一递归层中重复的选择。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/subsets-ii/"
        }
      }
    ],
    "compare": "outerUnordered",
    "referenceUrl": "https://leetcode.cn/problems/subsets-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 122
  },
  {
    "id": "design-add-and-search-words-data-structure",
    "number": 211,
    "title": "添加与搜索单词",
    "topic": "图论",
    "summary": "实现支持添加单词和点号通配符查询的字典，返回每次查询结果。",
    "signature": "solve(operations) → bool results",
    "starter": "def solve(operations):\n    # operations: [[\"add\", word], [\"search\", pattern], ...]\n    pass",
    "hints": [
      "普通字符沿 Trie 的单一路径前进。",
      "点号需要尝试当前节点的所有孩子。"
    ],
    "tests": [
      {
        "label": "通配符命中",
        "args": [
          [
            [
              "add",
              "code"
            ],
            [
              "add",
              "cope"
            ],
            [
              "search",
              "co.e"
            ],
            [
              "search",
              "c..e"
            ]
          ]
        ],
        "expected": [
          true,
          true
        ]
      },
      {
        "label": "长度与字符均受约束",
        "args": [
          [
            [
              "add",
              "sun"
            ],
            [
              "add",
              "sand"
            ],
            [
              "search",
              "s.."
            ],
            [
              "search",
              "..n."
            ],
            [
              "search",
              "s.n"
            ]
          ]
        ],
        "expected": [
          true,
          true,
          true
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Trie 加 DFS",
        "idea": "添加沿 Trie 建路径，查询遇到点号时分支搜索。",
        "complexity": "添加 O(m)，查询最坏 O(Σ^m)。",
        "code": "def solve(operations):\n    root = {}; output = []\n    def search(pattern):\n        def dfs(index, node):\n            if index == len(pattern): return '' in node\n            ch = pattern[index]\n            if ch == '.': return any(dfs(index + 1, child) for key, child in node.items() if key)\n            return ch in node and dfs(index + 1, node[ch])\n        return dfs(0, root)\n    for action, word in operations:\n        if action == 'add':\n            node = root\n            for ch in word: node = node.setdefault(ch, {})\n            node[''] = {}\n        else: output.append(search(word))\n    return output",
        "steps": [
          "普通字符沿 Trie 的单一路径前进。",
          "点号需要尝试当前节点的所有孩子。"
        ],
        "pitfalls": [
          "点号需要尝试当前节点的所有孩子。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/design-add-and-search-words-data-structure/"
        }
      },
      {
        "id": "solution-2",
        "name": "按长度分桶",
        "idea": "先按长度保存单词，查询时逐位匹配普通字符。",
        "complexity": "添加 O(1)，查询 O(nm)。",
        "code": "from collections import defaultdict\n\ndef solve(operations):\n    buckets = defaultdict(set); output = []\n    for action, word in operations:\n        if action == 'add': buckets[len(word)].add(word)\n        else:\n            output.append(any(all(p == '.' or p == ch for p, ch in zip(word, candidate)) for candidate in buckets[len(word)]))\n    return output",
        "steps": [
          "普通字符沿 Trie 的单一路径前进。",
          "点号需要尝试当前节点的所有孩子。"
        ],
        "pitfalls": [
          "点号需要尝试当前节点的所有孩子。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/design-add-and-search-words-data-structure/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/design-add-and-search-words-data-structure/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 123
  },
  {
    "id": "word-search-ii",
    "number": 212,
    "title": "单词搜索 II",
    "topic": "图搜索",
    "summary": "在字符网格中找出可以由相邻格连续组成的候选单词，每格在同一单词中最多使用一次。",
    "signature": "solve(board, words) → found words",
    "starter": "def solve(board, words):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把全部单词放入 Trie，共享前缀搜索。",
      "找到单词后可从 Trie 删除终止标记，避免重复输出。"
    ],
    "tests": [
      {
        "label": "共享前缀的候选",
        "args": [
          [
            "abcd",
            "efgh",
            "ijkl"
          ],
          [
            "abc",
            "aei",
            "bfj",
            "cfi",
            "ghl"
          ]
        ],
        "expected": [
          "aei",
          "abc",
          "bfj",
          "ghl"
        ]
      },
      {
        "label": "路径不可重复用格",
        "args": [
          [
            "ax",
            "ya"
          ],
          [
            "aya",
            "axy",
            "ayx",
            "aa"
          ]
        ],
        "expected": [
          "aya"
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Trie 剪枝 DFS",
        "idea": "从每格沿 Trie 前缀推进，无前缀时立即回退。",
        "complexity": "时间 O(mn·4^L)，空间 O(总字符数)。",
        "code": "def solve(board, words):\n    board = [list(row) for row in board]\n    root = {}\n    for word in words:\n        node = root\n        for ch in word: node = node.setdefault(ch, {})\n        node['$'] = word\n    rows, cols = len(board), len(board[0]); found = []\n    def dfs(r, c, node):\n        ch = board[r][c]\n        if ch not in node: return\n        child = node[ch]\n        word = child.pop('$', None)\n        if word: found.append(word)\n        board[r][c] = '#'\n        for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):\n            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#': dfs(nr, nc, child)\n        board[r][c] = ch\n    for r in range(rows):\n        for c in range(cols): dfs(r, c, root)\n    return found",
        "steps": [
          "把全部单词放入 Trie，共享前缀搜索。",
          "找到单词后可从 Trie 删除终止标记，避免重复输出。"
        ],
        "pitfalls": [
          "找到单词后可从 Trie 删除终止标记，避免重复输出。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-search-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "逐词回溯",
        "idea": "为每个候选单词单独执行一次网格路径搜索。",
        "complexity": "时间 O(wmn·4^L)，空间 O(L)。",
        "code": "def solve(board, words):\n    board = [list(row) for row in board]\n    rows, cols = len(board), len(board[0])\n    def exists(word):\n        def dfs(r, c, index):\n            if index == len(word): return True\n            if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[index]: return False\n            ch = board[r][c]; board[r][c] = '#'\n            found = any(dfs(nr, nc, index + 1) for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)))\n            board[r][c] = ch\n            return found\n        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))\n    return [word for word in words if exists(word)]",
        "steps": [
          "把全部单词放入 Trie，共享前缀搜索。",
          "找到单词后可从 Trie 删除终止标记，避免重复输出。"
        ],
        "pitfalls": [
          "找到单词后可从 Trie 删除终止标记，避免重复输出。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-search-ii/"
        }
      }
    ],
    "compare": "unordered",
    "referenceUrl": "https://leetcode.cn/problems/word-search-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 124
  },
  {
    "id": "word-ladder",
    "number": 127,
    "title": "单词接龙",
    "topic": "图搜索",
    "summary": "每次只改一个字符且中间词必须在字典中，求从起点到终点的最短序列长度。",
    "signature": "solve(begin, end, words) → int",
    "starter": "def solve(begin, end, words):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "最短转换次数适合广度优先搜索。",
      "通配模式可以把只差一个字符的单词连在一起。"
    ],
    "tests": [
      {
        "label": "存在两条可选路径",
        "args": [
          "cold",
          "warm",
          [
            "cord",
            "card",
            "ward",
            "warm",
            "word",
            "wold"
          ]
        ],
        "expected": 5
      },
      {
        "label": "终点存在但不可达",
        "args": [
          "aaa",
          "bbb",
          [
            "aac",
            "acc",
            "bbb",
            "bbc"
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "通配桶 BFS",
        "idea": "为每个单词建立替换一位后的模式桶，再逐层扩展。",
        "complexity": "时间 O(nL²)，空间 O(nL)。",
        "code": "from collections import defaultdict, deque\n\ndef solve(begin, end, words):\n    if end not in words: return 0\n    buckets = defaultdict(list)\n    for word in set(words + [begin]):\n        for i in range(len(word)): buckets[word[:i] + '*' + word[i+1:]].append(word)\n    queue = deque([(begin, 1)]); seen = {begin}\n    while queue:\n        word, distance = queue.popleft()\n        if word == end: return distance\n        for i in range(len(word)):\n            key = word[:i] + '*' + word[i+1:]\n            for nxt in buckets[key]:\n                if nxt not in seen: seen.add(nxt); queue.append((nxt, distance + 1))\n            buckets[key] = []\n    return 0",
        "steps": [
          "最短转换次数适合广度优先搜索。",
          "通配模式可以把只差一个字符的单词连在一起。"
        ],
        "pitfalls": [
          "通配模式可以把只差一个字符的单词连在一起。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-ladder/"
        }
      },
      {
        "id": "solution-2",
        "name": "双向 BFS",
        "idea": "从起点与终点同时扩展较小的一侧，减少搜索宽度。",
        "complexity": "时间 O(nL·Σ)，空间 O(n)。",
        "code": "def solve(begin, end, words):\n    unused = set(words)\n    if end not in unused: return 0\n    front, back, distance = {begin}, {end}, 1\n    while front and back:\n        if len(front) > len(back): front, back = back, front\n        upcoming = set()\n        for word in front:\n            for i in range(len(word)):\n                for ch in 'abcdefghijklmnopqrstuvwxyz':\n                    candidate = word[:i] + ch + word[i+1:]\n                    if candidate in back: return distance + 1\n                    if candidate in unused: unused.remove(candidate); upcoming.add(candidate)\n        front = upcoming; distance += 1\n    return 0",
        "steps": [
          "最短转换次数适合广度优先搜索。",
          "通配模式可以把只差一个字符的单词连在一起。"
        ],
        "pitfalls": [
          "通配模式可以把只差一个字符的单词连在一起。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/word-ladder/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/word-ladder/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 125
  },
  {
    "id": "surrounded-regions",
    "number": 130,
    "title": "被围绕的区域",
    "topic": "图搜索",
    "summary": "把没有连接到边界的 O 区域改为 X，并返回更新后的棋盘。",
    "signature": "solve(board) → board",
    "starter": "def solve(board):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "从边界 O 反向标记所有不可填充的格子。",
      "最后只翻转没有被边界搜索触达的 O。"
    ],
    "tests": [
      {
        "label": "内部区域与边界区域并存",
        "args": [
          [
            [
              "X",
              "X",
              "X",
              "X",
              "O"
            ],
            [
              "X",
              "O",
              "O",
              "X",
              "O"
            ],
            [
              "X",
              "X",
              "O",
              "X",
              "X"
            ],
            [
              "O",
              "X",
              "X",
              "X",
              "X"
            ]
          ]
        ],
        "expected": [
          "XXXXO",
          "XXXXO",
          "XXXXX",
          "OXXXX"
        ]
      },
      {
        "label": "通道连接到边界",
        "args": [
          [
            [
              "X",
              "O",
              "X"
            ],
            [
              "X",
              "O",
              "X"
            ],
            [
              "X",
              "O",
              "O"
            ]
          ]
        ],
        "expected": [
          "XOX",
          "XOX",
          "XOO"
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "边界洪水填充",
        "idea": "先把边界连通 O 标成安全，再处理剩余 O。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "from collections import deque\n\ndef solve(board):\n    grid = [list(row) for row in board]; rows, cols = len(grid), len(grid[0]); queue = deque()\n    for r in range(rows):\n        for c in range(cols):\n            if (r in (0, rows-1) or c in (0, cols-1)) and grid[r][c] == 'O':\n                grid[r][c] = 'S'; queue.append((r,c))\n    while queue:\n        r, c = queue.popleft()\n        for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):\n            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 'O':\n                grid[nr][nc] = 'S'; queue.append((nr,nc))\n    return [''.join('O' if ch == 'S' else 'X' for ch in row) for row in grid]",
        "steps": [
          "从边界 O 反向标记所有不可填充的格子。",
          "最后只翻转没有被边界搜索触达的 O。"
        ],
        "pitfalls": [
          "最后只翻转没有被边界搜索触达的 O。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/surrounded-regions/"
        }
      },
      {
        "id": "solution-2",
        "name": "区域收集",
        "idea": "逐个收集 O 连通块，只有不接触边界的区域才翻转。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(board):\n    grid = [list(row) for row in board]; rows, cols = len(grid), len(grid[0]); seen = set()\n    for sr in range(rows):\n        for sc in range(cols):\n            if grid[sr][sc] != 'O' or (sr, sc) in seen: continue\n            stack = [(sr, sc)]; region = []; touches = False; seen.add((sr, sc))\n            while stack:\n                r, c = stack.pop(); region.append((r,c)); touches |= r in (0,rows-1) or c in (0,cols-1)\n                for nr,nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):\n                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 'O' and (nr,nc) not in seen:\n                        seen.add((nr,nc)); stack.append((nr,nc))\n            if not touches:\n                for r,c in region: grid[r][c] = 'X'\n    return [''.join(row) for row in grid]",
        "steps": [
          "从边界 O 反向标记所有不可填充的格子。",
          "最后只翻转没有被边界搜索触达的 O。"
        ],
        "pitfalls": [
          "最后只翻转没有被边界搜索触达的 O。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/surrounded-regions/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/surrounded-regions/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 126
  },
  {
    "id": "clone-graph",
    "number": 133,
    "title": "克隆图",
    "topic": "图论",
    "summary": "输入无向图的邻接表，创建独立副本并返回副本的邻接表表示。",
    "signature": "solve(adjacency) → adjacency",
    "starter": "def solve(adjacency):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "用原节点到新节点的映射避免重复创建。",
      "遍历方式可以是 DFS 或 BFS。"
    ],
    "tests": [
      {
        "label": "含环与对角连接",
        "args": [
          [
            [
              2,
              3
            ],
            [
              1,
              3,
              4
            ],
            [
              1,
              2,
              4
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": [
          [
            2,
            3
          ],
          [
            1,
            3,
            4
          ],
          [
            1,
            2,
            4
          ],
          [
            2,
            3
          ]
        ]
      },
      {
        "label": "单节点图",
        "args": [
          [
            []
          ]
        ],
        "expected": [
          []
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "DFS 映射克隆",
        "idea": "递归访问节点并缓存其副本，随后填充邻接关系。",
        "complexity": "时间 O(V+E)，空间 O(V)。",
        "code": "def solve(adjacency):\n    cloned = {}\n    def clone(node):\n        if node in cloned: return\n        cloned[node] = []\n        for neighbor in adjacency[node - 1]:\n            clone(neighbor); cloned[node].append(neighbor)\n    if adjacency: clone(1)\n    return [cloned.get(node, []) for node in range(1, len(adjacency) + 1)]",
        "steps": [
          "用原节点到新节点的映射避免重复创建。",
          "遍历方式可以是 DFS 或 BFS。"
        ],
        "pitfalls": [
          "遍历方式可以是 DFS 或 BFS。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/clone-graph/"
        }
      },
      {
        "id": "solution-2",
        "name": "BFS 重建邻接",
        "idea": "广度遍历可达节点，并复制每条邻接边。",
        "complexity": "时间 O(V+E)，空间 O(V)。",
        "code": "from collections import deque\n\ndef solve(adjacency):\n    if not adjacency: return []\n    result = [[] for _ in adjacency]; queue = deque([1]); seen = {1}\n    while queue:\n        node = queue.popleft()\n        result[node - 1] = list(adjacency[node - 1])\n        for neighbor in adjacency[node - 1]:\n            if neighbor not in seen: seen.add(neighbor); queue.append(neighbor)\n    return result",
        "steps": [
          "用原节点到新节点的映射避免重复创建。",
          "遍历方式可以是 DFS 或 BFS。"
        ],
        "pitfalls": [
          "遍历方式可以是 DFS 或 BFS。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/clone-graph/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/clone-graph/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 127
  },
  {
    "id": "course-schedule-ii",
    "number": 210,
    "title": "课程表 II",
    "topic": "图论",
    "summary": "根据课程先修关系返回任意合法学习顺序；存在环时返回空列表。",
    "signature": "solve(count, prerequisites) → order",
    "starter": "def solve(count, prerequisites):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "入度为零的课程可以立即学习。",
      "输出课程数不足说明图中存在环。"
    ],
    "tests": [
      {
        "label": "存在多个合法顺序",
        "args": [
          5,
          [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              4,
              2
            ]
          ]
        ],
        "expected": [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "label": "环导致无解",
        "args": [
          4,
          [
            [
              1,
              0
            ],
            [
              2,
              1
            ],
            [
              0,
              2
            ],
            [
              3,
              2
            ]
          ]
        ],
        "expected": []
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Kahn 拓扑排序",
        "idea": "不断取出入度为零的课程并删除其出边。",
        "complexity": "时间 O(V+E)，空间 O(V+E)。",
        "code": "from collections import deque\n\ndef solve(count, prerequisites):\n    graph = [[] for _ in range(count)]; indegree = [0] * count\n    for course, before in prerequisites: graph[before].append(course); indegree[course] += 1\n    queue = deque(i for i, degree in enumerate(indegree) if degree == 0); order = []\n    while queue:\n        node = queue.popleft(); order.append(node)\n        for nxt in graph[node]:\n            indegree[nxt] -= 1\n            if indegree[nxt] == 0: queue.append(nxt)\n    return order if len(order) == count else []",
        "steps": [
          "入度为零的课程可以立即学习。",
          "输出课程数不足说明图中存在环。"
        ],
        "pitfalls": [
          "输出课程数不足说明图中存在环。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/course-schedule-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "DFS 三色标记",
        "idea": "后序加入已完成节点，遇到灰色节点说明有环。",
        "complexity": "时间 O(V+E)，空间 O(V+E)。",
        "code": "def solve(count, prerequisites):\n    graph = [[] for _ in range(count)]\n    for course, before in prerequisites: graph[course].append(before)\n    state = [0] * count; order = []\n    def visit(node):\n        if state[node] == 1: return False\n        if state[node] == 2: return True\n        state[node] = 1\n        if not all(visit(before) for before in graph[node]): return False\n        state[node] = 2; order.append(node); return True\n    return order if all(visit(node) for node in range(count)) else []",
        "steps": [
          "入度为零的课程可以立即学习。",
          "输出课程数不足说明图中存在环。"
        ],
        "pitfalls": [
          "输出课程数不足说明图中存在环。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/course-schedule-ii/"
        }
      }
    ],
    "compare": "topologicalOrder",
    "referenceUrl": "https://leetcode.cn/problems/course-schedule-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 128
  },
  {
    "id": "pacific-atlantic-water-flow",
    "number": 417,
    "title": "太平洋大西洋水流问题",
    "topic": "图搜索",
    "summary": "在高度网格中找出雨水能够分别流向两组相对边界的所有格子。",
    "signature": "solve(heights) → coordinates",
    "starter": "def solve(heights):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "从海岸反向搜索，只走向不低于当前位置的格子。",
      "两次搜索可达集合的交集就是答案。"
    ],
    "tests": [
      {
        "label": "阶梯高度网格",
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              2,
              3,
              4
            ],
            [
              1,
              5,
              2
            ]
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            2,
            1
          ],
          [
            1,
            1
          ],
          [
            2,
            0
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ]
        ]
      },
      {
        "label": "单行网格",
        "args": [
          [
            [
              5,
              1,
              4,
              2
            ]
          ]
        ],
        "expected": [
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            0,
            3
          ],
          [
            0,
            0
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "双海岸反向 DFS",
        "idea": "分别从两组边界沿高度不下降方向标记可达格。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(heights):\n    rows, cols = len(heights), len(heights[0])\n    def reach(starts):\n        seen = set(starts); stack = list(starts)\n        while stack:\n            r, c = stack.pop()\n            for nr, nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):\n                if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and heights[nr][nc] >= heights[r][c]:\n                    seen.add((nr,nc)); stack.append((nr,nc))\n        return seen\n    pacific = reach([(0,c) for c in range(cols)] + [(r,0) for r in range(rows)])\n    atlantic = reach([(rows-1,c) for c in range(cols)] + [(r,cols-1) for r in range(rows)])\n    return [list(cell) for cell in pacific & atlantic]",
        "steps": [
          "从海岸反向搜索，只走向不低于当前位置的格子。",
          "两次搜索可达集合的交集就是答案。"
        ],
        "pitfalls": [
          "两次搜索可达集合的交集就是答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/pacific-atlantic-water-flow/"
        }
      },
      {
        "id": "solution-2",
        "name": "双海岸反向 BFS",
        "idea": "用队列完成同样的反向可达性传播。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "from collections import deque\n\ndef solve(heights):\n    rows, cols = len(heights), len(heights[0])\n    def flood(starts):\n        seen = set(starts); queue = deque(starts)\n        while queue:\n            r,c = queue.popleft()\n            for nr,nc in ((r+1,c),(r-1,c),(r,c+1),(r,c-1)):\n                if 0 <= nr < rows and 0 <= nc < cols and (nr,nc) not in seen and heights[nr][nc] >= heights[r][c]:\n                    seen.add((nr,nc)); queue.append((nr,nc))\n        return seen\n    first = flood([(r,0) for r in range(rows)] + [(0,c) for c in range(cols)])\n    second = flood([(r,cols-1) for r in range(rows)] + [(rows-1,c) for c in range(cols)])\n    return [list(cell) for cell in first & second]",
        "steps": [
          "从海岸反向搜索，只走向不低于当前位置的格子。",
          "两次搜索可达集合的交集就是答案。"
        ],
        "pitfalls": [
          "两次搜索可达集合的交集就是答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/pacific-atlantic-water-flow/"
        }
      }
    ],
    "compare": "outerUnordered",
    "referenceUrl": "https://leetcode.cn/problems/pacific-atlantic-water-flow/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 129
  },
  {
    "id": "redundant-connection",
    "number": 684,
    "title": "冗余连接",
    "topic": "图论",
    "summary": "一棵树额外加入一条边后形成环，找出输入中最后一条导致环的边。",
    "signature": "solve(edges) → edge",
    "starter": "def solve(edges):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "按输入顺序逐条合并两个端点。",
      "若端点已经连通，当前边就是冗余边。"
    ],
    "tests": [
      {
        "label": "环在图的后半段形成",
        "args": [
          [
            [
              1,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              1,
              4
            ],
            [
              4,
              5
            ]
          ]
        ],
        "expected": [
          1,
          4
        ]
      },
      {
        "label": "多条路径最终闭环",
        "args": [
          [
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              3,
              4
            ],
            [
              2,
              4
            ],
            [
              4,
              5
            ]
          ]
        ],
        "expected": [
          2,
          4
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "并查集",
        "idea": "边的两个端点已经属于同一集合时，再连接就会成环。",
        "complexity": "时间近似 O(n)，空间 O(n)。",
        "code": "def solve(edges):\n    parent = list(range(len(edges) + 1)); size = [1] * len(parent)\n    def find(node):\n        while node != parent[node]:\n            parent[node] = parent[parent[node]]; node = parent[node]\n        return node\n    for left, right in edges:\n        a, b = find(left), find(right)\n        if a == b: return [left, right]\n        if size[a] < size[b]: a, b = b, a\n        parent[b] = a; size[a] += size[b]\n    return []",
        "steps": [
          "按输入顺序逐条合并两个端点。",
          "若端点已经连通，当前边就是冗余边。"
        ],
        "pitfalls": [
          "若端点已经连通，当前边就是冗余边。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/redundant-connection/"
        }
      },
      {
        "id": "solution-2",
        "name": "增量 DFS",
        "idea": "加入边前先检查两个端点在已有图中是否可达。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "from collections import defaultdict\n\ndef solve(edges):\n    graph = defaultdict(list)\n    def connected(start, target):\n        stack = [start]; seen = set()\n        while stack:\n            node = stack.pop()\n            if node == target: return True\n            if node in seen: continue\n            seen.add(node); stack.extend(graph[node])\n        return False\n    for left, right in edges:\n        if graph[left] and graph[right] and connected(left, right): return [left, right]\n        graph[left].append(right); graph[right].append(left)\n    return []",
        "steps": [
          "按输入顺序逐条合并两个端点。",
          "若端点已经连通，当前边就是冗余边。"
        ],
        "pitfalls": [
          "若端点已经连通，当前边就是冗余边。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/redundant-connection/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/redundant-connection/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 130
  },
  {
    "id": "max-area-of-island",
    "number": 695,
    "title": "岛屿的最大面积",
    "topic": "图搜索",
    "summary": "在零一网格中计算由上下左右相邻陆地构成的最大连通块面积。",
    "signature": "solve(grid) → int",
    "starter": "def solve(grid):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每个陆地格只应访问一次。",
      "一次洪水填充的访问数就是当前岛屿面积。"
    ],
    "tests": [
      {
        "label": "三座不同面积岛屿",
        "args": [
          [
            [
              1,
              1,
              0,
              0,
              1
            ],
            [
              1,
              0,
              0,
              1,
              1
            ],
            [
              0,
              0,
              1,
              1,
              0
            ],
            [
              1,
              0,
              0,
              0,
              0
            ]
          ]
        ],
        "expected": 5
      },
      {
        "label": "没有陆地",
        "args": [
          [
            [
              0,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              0
            ]
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "迭代 DFS",
        "idea": "遇到未访问陆地就用栈收集整个连通块。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "def solve(grid):\n    rows, cols = len(grid), len(grid[0]); seen = set(); best = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] != 1 or (r,c) in seen: continue\n            stack = [(r,c)]; seen.add((r,c)); area = 0\n            while stack:\n                x,y = stack.pop(); area += 1\n                for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):\n                    if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == 1 and (nx,ny) not in seen:\n                        seen.add((nx,ny)); stack.append((nx,ny))\n            best = max(best, area)\n    return best",
        "steps": [
          "每个陆地格只应访问一次。",
          "一次洪水填充的访问数就是当前岛屿面积。"
        ],
        "pitfalls": [
          "一次洪水填充的访问数就是当前岛屿面积。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/max-area-of-island/"
        }
      },
      {
        "id": "solution-2",
        "name": "原地 BFS",
        "idea": "复制网格后把访问过的陆地改为零，并累计面积。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "from collections import deque\n\ndef solve(grid):\n    grid = [row[:] for row in grid]; rows, cols = len(grid), len(grid[0]); best = 0\n    for r in range(rows):\n        for c in range(cols):\n            if not grid[r][c]: continue\n            queue = deque([(r,c)]); grid[r][c] = 0; area = 0\n            while queue:\n                x,y = queue.popleft(); area += 1\n                for nx,ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):\n                    if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny]:\n                        grid[nx][ny] = 0; queue.append((nx,ny))\n            best = max(best, area)\n    return best",
        "steps": [
          "每个陆地格只应访问一次。",
          "一次洪水填充的访问数就是当前岛屿面积。"
        ],
        "pitfalls": [
          "一次洪水填充的访问数就是当前岛屿面积。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/max-area-of-island/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/max-area-of-island/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 131
  },
  {
    "id": "reconstruct-itinerary",
    "number": 332,
    "title": "重新安排行程",
    "topic": "图论",
    "summary": "使用全部机票各一次，从 JFK 出发构造字典序最小的有效行程。",
    "signature": "solve(tickets) → route",
    "starter": "def solve(tickets):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "这是寻找欧拉路径，而不是普通最短路。",
      "后序加入机场，最后再反转结果。"
    ],
    "tests": [
      {
        "label": "含可回退分支",
        "args": [
          [
            [
              "JFK",
              "SFO"
            ],
            [
              "JFK",
              "ATL"
            ],
            [
              "SFO",
              "ATL"
            ],
            [
              "ATL",
              "JFK"
            ],
            [
              "ATL",
              "SFO"
            ]
          ]
        ],
        "expected": [
          "JFK",
          "ATL",
          "JFK",
          "SFO",
          "ATL",
          "SFO"
        ]
      },
      {
        "label": "字典序选择影响可行性",
        "args": [
          [
            [
              "JFK",
              "KUL"
            ],
            [
              "JFK",
              "NRT"
            ],
            [
              "NRT",
              "JFK"
            ]
          ]
        ],
        "expected": [
          "JFK",
          "NRT",
          "JFK",
          "KUL"
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Hierholzer 后序",
        "idea": "每次走字典序最小的未用边，走尽后把机场加入路径。",
        "complexity": "时间 O(E log E)，空间 O(E)。",
        "code": "from collections import defaultdict\n\ndef solve(tickets):\n    graph = defaultdict(list)\n    for start, end in sorted(tickets, reverse=True): graph[start].append(end)\n    route = []\n    def visit(airport):\n        while graph[airport]: visit(graph[airport].pop())\n        route.append(airport)\n    visit('JFK')\n    return route[::-1]",
        "steps": [
          "这是寻找欧拉路径，而不是普通最短路。",
          "后序加入机场，最后再反转结果。"
        ],
        "pitfalls": [
          "后序加入机场，最后再反转结果。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reconstruct-itinerary/"
        }
      },
      {
        "id": "solution-2",
        "name": "迭代欧拉路径",
        "idea": "用显式栈走尽出边，再把无路可走的顶点弹入结果。",
        "complexity": "时间 O(E log E)，空间 O(E)。",
        "code": "from collections import defaultdict\nimport heapq\n\ndef solve(tickets):\n    graph = defaultdict(list)\n    for start, end in tickets: heapq.heappush(graph[start], end)\n    stack = ['JFK']; route = []\n    while stack:\n        while graph[stack[-1]]: stack.append(heapq.heappop(graph[stack[-1]]))\n        route.append(stack.pop())\n    return route[::-1]",
        "steps": [
          "这是寻找欧拉路径，而不是普通最短路。",
          "后序加入机场，最后再反转结果。"
        ],
        "pitfalls": [
          "后序加入机场，最后再反转结果。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/reconstruct-itinerary/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/reconstruct-itinerary/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 132
  },
  {
    "id": "network-delay-time",
    "number": 743,
    "title": "网络延迟时间",
    "topic": "图论",
    "summary": "在带正权的有向网络中，计算信号从起点到达全部节点所需的最短总等待时间。",
    "signature": "solve(times, count, start) → int",
    "starter": "def solve(times, count, start):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "目标是起点到每个节点的最短距离。",
      "所有边权为正，适合 Dijkstra。"
    ],
    "tests": [
      {
        "label": "存在绕行更短路径",
        "args": [
          [
            [
              1,
              2,
              7
            ],
            [
              1,
              3,
              2
            ],
            [
              3,
              2,
              1
            ],
            [
              2,
              4,
              3
            ],
            [
              3,
              4,
              8
            ]
          ],
          4,
          1
        ],
        "expected": 6
      },
      {
        "label": "有节点不可达",
        "args": [
          [
            [
              2,
              1,
              4
            ],
            [
              2,
              3,
              5
            ]
          ],
          4,
          2
        ],
        "expected": -1
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Dijkstra 小顶堆",
        "idea": "每次确定当前距离最短的未访问节点。",
        "complexity": "时间 O((V+E) log V)，空间 O(V+E)。",
        "code": "from collections import defaultdict\nimport heapq\n\ndef solve(times, count, start):\n    graph = defaultdict(list)\n    for left, right, weight in times: graph[left].append((weight, right))\n    heap = [(0, start)]; distance = {}\n    while heap:\n        cost, node = heapq.heappop(heap)\n        if node in distance: continue\n        distance[node] = cost\n        for weight, nxt in graph[node]:\n            if nxt not in distance: heapq.heappush(heap, (cost + weight, nxt))\n    return max(distance.values()) if len(distance) == count else -1",
        "steps": [
          "目标是起点到每个节点的最短距离。",
          "所有边权为正，适合 Dijkstra。"
        ],
        "pitfalls": [
          "所有边权为正，适合 Dijkstra。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/network-delay-time/"
        }
      },
      {
        "id": "solution-2",
        "name": "Bellman-Ford 松弛",
        "idea": "重复松弛全部边，直到没有距离更新。",
        "complexity": "时间 O(VE)，空间 O(V)。",
        "code": "def solve(times, count, start):\n    inf = float('inf'); dist = [inf] * (count + 1); dist[start] = 0\n    for _ in range(count - 1):\n        changed = False\n        for left, right, weight in times:\n            if dist[left] + weight < dist[right]:\n                dist[right] = dist[left] + weight; changed = True\n        if not changed: break\n    answer = max(dist[1:])\n    return -1 if answer == inf else answer",
        "steps": [
          "目标是起点到每个节点的最短距离。",
          "所有边权为正，适合 Dijkstra。"
        ],
        "pitfalls": [
          "所有边权为正，适合 Dijkstra。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/network-delay-time/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/network-delay-time/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 133
  },
  {
    "id": "cheapest-flights-within-k-stops",
    "number": 787,
    "title": "K 站中转内最便宜的航班",
    "topic": "图论",
    "summary": "在最多经过 k 个中转点的限制下，计算起点到终点的最低价格。",
    "signature": "solve(count, flights, source, target, k) → int",
    "starter": "def solve(count, flights, source, target, k):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "中转点限制等价于最多使用 k+1 条边。",
      "每轮松弛必须基于上一轮距离的副本。"
    ],
    "tests": [
      {
        "label": "较便宜路径多一次中转",
        "args": [
          5,
          [
            [
              0,
              1,
              80
            ],
            [
              1,
              2,
              70
            ],
            [
              2,
              4,
              60
            ],
            [
              0,
              3,
              210
            ],
            [
              3,
              4,
              40
            ]
          ],
          0,
          4,
          2
        ],
        "expected": 210
      },
      {
        "label": "中转限制迫使直飞",
        "args": [
          4,
          [
            [
              0,
              1,
              40
            ],
            [
              1,
              2,
              40
            ],
            [
              2,
              3,
              40
            ],
            [
              0,
              3,
              180
            ]
          ],
          0,
          3,
          1
        ],
        "expected": 180
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "限轮 Bellman-Ford",
        "idea": "进行 k+1 轮边松弛，每轮只读取上一轮结果。",
        "complexity": "时间 O(kE)，空间 O(V)。",
        "code": "def solve(count, flights, source, target, k):\n    inf = float('inf'); prices = [inf] * count; prices[source] = 0\n    for _ in range(k + 1):\n        updated = prices[:]\n        for start, end, price in flights:\n            if prices[start] != inf: updated[end] = min(updated[end], prices[start] + price)\n        prices = updated\n    return -1 if prices[target] == inf else prices[target]",
        "steps": [
          "中转点限制等价于最多使用 k+1 条边。",
          "每轮松弛必须基于上一轮距离的副本。"
        ],
        "pitfalls": [
          "每轮松弛必须基于上一轮距离的副本。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/cheapest-flights-within-k-stops/"
        }
      },
      {
        "id": "solution-2",
        "name": "状态小顶堆",
        "idea": "堆状态同时记录价格、节点和已经使用的边数。",
        "complexity": "时间 O(Ek log Vk)，空间 O(Vk)。",
        "code": "from collections import defaultdict\nimport heapq\n\ndef solve(count, flights, source, target, k):\n    graph = defaultdict(list)\n    for start,end,price in flights: graph[start].append((end,price))\n    heap = [(0,source,0)]; best = {}\n    while heap:\n        cost,node,edges = heapq.heappop(heap)\n        if node == target: return cost\n        if edges == k + 1 or best.get((node,edges), float('inf')) < cost: continue\n        for nxt,price in graph[node]:\n            state = (nxt,edges+1); total = cost + price\n            if total < best.get(state,float('inf')):\n                best[state] = total; heapq.heappush(heap,(total,nxt,edges+1))\n    return -1",
        "steps": [
          "中转点限制等价于最多使用 k+1 条边。",
          "每轮松弛必须基于上一轮距离的副本。"
        ],
        "pitfalls": [
          "每轮松弛必须基于上一轮距离的副本。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/cheapest-flights-within-k-stops/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/cheapest-flights-within-k-stops/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 134
  },
  {
    "id": "min-cost-to-connect-all-points",
    "number": 1584,
    "title": "连接所有点的最小费用",
    "topic": "图论",
    "summary": "用曼哈顿距离作为连边成本，求把所有平面点连通的最小总费用。",
    "signature": "solve(points) → int",
    "starter": "def solve(points):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "问题等价于完全图的最小生成树。",
      "点数不大时可以直接计算候选距离。"
    ],
    "tests": [
      {
        "label": "分散的五个点",
        "args": [
          [
            [
              1,
              1
            ],
            [
              4,
              2
            ],
            [
              7,
              6
            ],
            [
              2,
              8
            ],
            [
              9,
              3
            ]
          ]
        ],
        "expected": 22
      },
      {
        "label": "包含负坐标",
        "args": [
          [
            [
              -3,
              1
            ],
            [
              0,
              0
            ],
            [
              2,
              -4
            ],
            [
              5,
              2
            ]
          ]
        ],
        "expected": 17
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "Prim 稠密图",
        "idea": "维护每个未连接点到当前生成树的最小距离。",
        "complexity": "时间 O(n²)，空间 O(n)。",
        "code": "def solve(points):\n    count = len(points); distance = [float('inf')] * count; distance[0] = 0; used = [False] * count; total = 0\n    for _ in range(count):\n        node = min((i for i in range(count) if not used[i]), key=lambda i: distance[i])\n        used[node] = True; total += distance[node]\n        x,y = points[node]\n        for nxt,(a,b) in enumerate(points):\n            if not used[nxt]: distance[nxt] = min(distance[nxt], abs(x-a)+abs(y-b))\n    return total",
        "steps": [
          "问题等价于完全图的最小生成树。",
          "点数不大时可以直接计算候选距离。"
        ],
        "pitfalls": [
          "点数不大时可以直接计算候选距离。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-cost-to-connect-all-points/"
        }
      },
      {
        "id": "solution-2",
        "name": "Kruskal 并查集",
        "idea": "生成全部边后按成本从小到大合并连通块。",
        "complexity": "时间 O(n² log n)，空间 O(n²)。",
        "code": "def solve(points):\n    edges = []\n    for i,(x,y) in enumerate(points):\n        for j in range(i):\n            a,b = points[j]; edges.append((abs(x-a)+abs(y-b),i,j))\n    parent = list(range(len(points)))\n    def find(node):\n        while node != parent[node]: parent[node] = parent[parent[node]]; node = parent[node]\n        return node\n    total = used = 0\n    for cost,left,right in sorted(edges):\n        a,b = find(left),find(right)\n        if a == b: continue\n        parent[b] = a; total += cost; used += 1\n        if used == len(points)-1: break\n    return total",
        "steps": [
          "问题等价于完全图的最小生成树。",
          "点数不大时可以直接计算候选距离。"
        ],
        "pitfalls": [
          "点数不大时可以直接计算候选距离。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-cost-to-connect-all-points/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/min-cost-to-connect-all-points/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 135
  },
  {
    "id": "decode-ways",
    "number": 91,
    "title": "解码方法",
    "topic": "动态规划",
    "summary": "数字字符串按一到二十六映射为字母，计算所有合法拆分方式数量。",
    "signature": "solve(digits) → int",
    "starter": "def solve(digits):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "零不能单独解码。",
      "当前位置可由合法的一位或两位编码转移而来。"
    ],
    "tests": [
      {
        "label": "包含零的合法编码",
        "args": [
          "21023"
        ],
        "expected": 2
      },
      {
        "label": "前导零无解",
        "args": [
          "0712"
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "滚动动态规划",
        "idea": "只保留前一位和前两位对应的方案数。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(digits):\n    if not digits or digits[0] == '0': return 0\n    previous_two, previous = 1, 1\n    for i in range(1, len(digits)):\n        current = previous if digits[i] != '0' else 0\n        if 10 <= int(digits[i-1:i+1]) <= 26: current += previous_two\n        previous_two, previous = previous, current\n    return previous",
        "steps": [
          "零不能单独解码。",
          "当前位置可由合法的一位或两位编码转移而来。"
        ],
        "pitfalls": [
          "当前位置可由合法的一位或两位编码转移而来。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/decode-ways/"
        }
      },
      {
        "id": "solution-2",
        "name": "记忆化递归",
        "idea": "从索引出发尝试合法的一位和两位编码。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "from functools import lru_cache\n\ndef solve(digits):\n    @lru_cache(None)\n    def count(index):\n        if index == len(digits): return 1\n        if digits[index] == '0': return 0\n        result = count(index + 1)\n        if index + 1 < len(digits) and int(digits[index:index+2]) <= 26: result += count(index + 2)\n        return result\n    return count(0)",
        "steps": [
          "零不能单独解码。",
          "当前位置可由合法的一位或两位编码转移而来。"
        ],
        "pitfalls": [
          "当前位置可由合法的一位或两位编码转移而来。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/decode-ways/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/decode-ways/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 136
  },
  {
    "id": "interleaving-string",
    "number": 97,
    "title": "交错字符串",
    "topic": "多维动态规划",
    "summary": "判断目标字符串是否能由两个源字符串各自保持相对顺序地交错组成。",
    "signature": "solve(first, second, target) → bool",
    "starter": "def solve(first, second, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "长度之和不匹配时立即返回。",
      "状态 (i,j) 对应目标串位置 i+j。"
    ],
    "tests": [
      {
        "label": "多种交错路径",
        "args": [
          "abca",
          "xy",
          "axbyca"
        ],
        "expected": true
      },
      {
        "label": "字符数量够但顺序不合法",
        "args": [
          "aab",
          "aac",
          "abacaa"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "一维动态规划",
        "idea": "dp[j] 表示前 i 个第一串字符与前 j 个第二串字符能否组成目标前缀。",
        "complexity": "时间 O(mn)，空间 O(n)。",
        "code": "def solve(first, second, target):\n    if len(first) + len(second) != len(target): return False\n    dp = [False] * (len(second) + 1); dp[0] = True\n    for i in range(len(first) + 1):\n        for j in range(len(second) + 1):\n            if i == j == 0: continue\n            position = i + j - 1\n            dp[j] = (i > 0 and dp[j] and first[i-1] == target[position]) or (j > 0 and dp[j-1] and second[j-1] == target[position])\n    return dp[-1]",
        "steps": [
          "长度之和不匹配时立即返回。",
          "状态 (i,j) 对应目标串位置 i+j。"
        ],
        "pitfalls": [
          "状态 (i,j) 对应目标串位置 i+j。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/interleaving-string/"
        }
      },
      {
        "id": "solution-2",
        "name": "记忆化搜索",
        "idea": "在两个源字符串的索引网格中只搜索可匹配的分支。",
        "complexity": "时间 O(mn)，空间 O(mn)。",
        "code": "from functools import lru_cache\n\ndef solve(first, second, target):\n    if len(first) + len(second) != len(target): return False\n    @lru_cache(None)\n    def visit(i, j):\n        position = i + j\n        if position == len(target): return True\n        return (i < len(first) and first[i] == target[position] and visit(i+1,j)) or (j < len(second) and second[j] == target[position] and visit(i,j+1))\n    return visit(0,0)",
        "steps": [
          "长度之和不匹配时立即返回。",
          "状态 (i,j) 对应目标串位置 i+j。"
        ],
        "pitfalls": [
          "状态 (i,j) 对应目标串位置 i+j。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/interleaving-string/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/interleaving-string/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 137
  },
  {
    "id": "house-robber-ii",
    "number": 213,
    "title": "打家劫舍 II",
    "topic": "动态规划",
    "summary": "房屋围成一圈且不能选择相邻房屋，求可以取得的最大金额。",
    "signature": "solve(values) → int",
    "starter": "def solve(values):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "首尾不能同时选择。",
      "分别求不含首项与不含尾项的线性答案。"
    ],
    "tests": [
      {
        "label": "最优解避开首项",
        "args": [
          [
            8,
            2,
            9,
            3,
            7
          ]
        ],
        "expected": 17
      },
      {
        "label": "只有两间房",
        "args": [
          [
            12,
            5
          ]
        ],
        "expected": 12
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "拆成两条线",
        "idea": "环形约束转为排除首项或排除尾项的两个线性问题。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(values):\n    if len(values) == 1: return values[0]\n    def linear(items):\n        skip = take = 0\n        for value in items: skip, take = max(skip,take), skip + value\n        return max(skip,take)\n    return max(linear(values[:-1]), linear(values[1:]))",
        "steps": [
          "首尾不能同时选择。",
          "分别求不含首项与不含尾项的线性答案。"
        ],
        "pitfalls": [
          "分别求不含首项与不含尾项的线性答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/house-robber-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "两组滚动状态",
        "idea": "同时推进两种排除边界的动态规划。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(values):\n    if len(values) <= 2: return max(values, default=0)\n    def best(start, end):\n        dp = [0, values[start]]\n        for index in range(start + 1, end): dp.append(max(dp[-1], dp[-2] + values[index]))\n        return dp[-1]\n    return max(best(0,len(values)-1), best(1,len(values)))",
        "steps": [
          "首尾不能同时选择。",
          "分别求不含首项与不含尾项的线性答案。"
        ],
        "pitfalls": [
          "分别求不含首项与不含尾项的线性答案。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/house-robber-ii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/house-robber-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 138
  },
  {
    "id": "best-time-to-buy-and-sell-stock-with-cooldown",
    "number": 309,
    "title": "最佳买卖股票时机含冷冻期",
    "topic": "动态规划",
    "summary": "可以多次交易但卖出后隔一天才能再次买入，求最大利润。",
    "signature": "solve(prices) → int",
    "starter": "def solve(prices):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每天结束时区分持有、刚卖出和空闲状态。",
      "买入只能从前一天的空闲状态转移。"
    ],
    "tests": [
      {
        "label": "多段波动",
        "args": [
          [
            3,
            1,
            5,
            2,
            6,
            4,
            9
          ]
        ],
        "expected": 9
      },
      {
        "label": "持续下跌",
        "args": [
          [
            9,
            7,
            5,
            3,
            1
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "三状态滚动",
        "idea": "持有、卖出、空闲三个状态每天同步更新。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(prices):\n    if not prices: return 0\n    hold, sold, rest = -prices[0], 0, 0\n    for price in prices[1:]:\n        hold, sold, rest = max(hold, rest - price), hold + price, max(rest, sold)\n    return max(sold, rest)",
        "steps": [
          "每天结束时区分持有、刚卖出和空闲状态。",
          "买入只能从前一天的空闲状态转移。"
        ],
        "pitfalls": [
          "买入只能从前一天的空闲状态转移。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
        }
      },
      {
        "id": "solution-2",
        "name": "索引动态规划",
        "idea": "记录到每天为止持股与不持股的最优利润，并从前两天买入。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(prices):\n    if not prices: return 0\n    cash = [0] * len(prices); hold = [0] * len(prices); hold[0] = -prices[0]\n    for day in range(1, len(prices)):\n        cash[day] = max(cash[day-1], hold[day-1] + prices[day])\n        base = cash[day-2] if day >= 2 else 0\n        hold[day] = max(hold[day-1], base - prices[day])\n    return cash[-1]",
        "steps": [
          "每天结束时区分持有、刚卖出和空闲状态。",
          "买入只能从前一天的空闲状态转移。"
        ],
        "pitfalls": [
          "买入只能从前一天的空闲状态转移。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 139
  },
  {
    "id": "target-sum",
    "number": 494,
    "title": "目标和",
    "topic": "动态规划",
    "summary": "给每个非负整数添加正号或负号，计算表达式结果等于目标值的方案数。",
    "signature": "solve(nums, target) → int",
    "starter": "def solve(nums, target):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "把选择正号的元素看作一个子集。",
      "若总和与目标的奇偶性不匹配则无解。"
    ],
    "tests": [
      {
        "label": "包含零元素",
        "args": [
          [
            0,
            1,
            2,
            3,
            4
          ],
          2
        ],
        "expected": 4
      },
      {
        "label": "目标超出总和",
        "args": [
          [
            2,
            5,
            7
          ],
          20
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "背包计数",
        "idea": "由正负两组之差推导出正数组的目标和。",
        "complexity": "时间 O(nS)，空间 O(S)。",
        "code": "def solve(nums, target):\n    total = sum(nums)\n    if abs(target) > total or (total + target) % 2: return 0\n    goal = (total + target) // 2; dp = [0] * (goal + 1); dp[0] = 1\n    for value in nums:\n        for current in range(goal, value - 1, -1): dp[current] += dp[current - value]\n    return dp[goal]",
        "steps": [
          "把选择正号的元素看作一个子集。",
          "若总和与目标的奇偶性不匹配则无解。"
        ],
        "pitfalls": [
          "若总和与目标的奇偶性不匹配则无解。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/target-sum/"
        }
      },
      {
        "id": "solution-2",
        "name": "和的频次滚动",
        "idea": "逐个数字扩展当前可达和及其方案数。",
        "complexity": "时间 O(nS)，空间 O(S)。",
        "code": "from collections import Counter\n\ndef solve(nums, target):\n    ways = Counter({0: 1})\n    for value in nums:\n        upcoming = Counter()\n        for total,count in ways.items():\n            upcoming[total + value] += count; upcoming[total - value] += count\n        ways = upcoming\n    return ways[target]",
        "steps": [
          "把选择正号的元素看作一个子集。",
          "若总和与目标的奇偶性不匹配则无解。"
        ],
        "pitfalls": [
          "若总和与目标的奇偶性不匹配则无解。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/target-sum/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/target-sum/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 140
  },
  {
    "id": "coin-change-ii",
    "number": 518,
    "title": "零钱兑换 II",
    "topic": "动态规划",
    "summary": "每种硬币可以使用任意次，计算凑成目标金额的不同组合数量。",
    "signature": "solve(amount, coins) → int",
    "starter": "def solve(amount, coins):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "外层遍历硬币才能避免把不同顺序重复计数。",
      "dp[0] 应初始化为一。"
    ],
    "tests": [
      {
        "label": "有多种组合",
        "args": [
          11,
          [
            2,
            3,
            5,
            7
          ]
        ],
        "expected": 5
      },
      {
        "label": "无法凑出目标",
        "args": [
          9,
          [
            4,
            6
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "完全背包计数",
        "idea": "逐种硬币正向更新金额的组合数。",
        "complexity": "时间 O(n·amount)，空间 O(amount)。",
        "code": "def solve(amount, coins):\n    dp = [0] * (amount + 1); dp[0] = 1\n    for coin in coins:\n        for value in range(coin, amount + 1): dp[value] += dp[value - coin]\n    return dp[amount]",
        "steps": [
          "外层遍历硬币才能避免把不同顺序重复计数。",
          "dp[0] 应初始化为一。"
        ],
        "pitfalls": [
          "dp[0] 应初始化为一。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/coin-change-ii/"
        }
      },
      {
        "id": "solution-2",
        "name": "记忆化组合搜索",
        "idea": "递归状态记录当前硬币索引与剩余金额。",
        "complexity": "时间 O(n·amount)，空间 O(n·amount)。",
        "code": "from functools import lru_cache\n\ndef solve(amount, coins):\n    @lru_cache(None)\n    def count(index, remain):\n        if remain == 0: return 1\n        if index == len(coins) or remain < 0: return 0\n        return count(index, remain - coins[index]) + count(index + 1, remain)\n    return count(0, amount)",
        "steps": [
          "外层遍历硬币才能避免把不同顺序重复计数。",
          "dp[0] 应初始化为一。"
        ],
        "pitfalls": [
          "dp[0] 应初始化为一。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/coin-change-ii/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/coin-change-ii/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 141
  },
  {
    "id": "palindromic-substrings",
    "number": 647,
    "title": "回文子串",
    "topic": "多维动态规划",
    "summary": "计算字符串中所有连续回文片段的数量，相同文本出现在不同位置需分别计数。",
    "signature": "solve(text) → int",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "每个字符和每对相邻字符都可以作为扩展中心。",
      "长度至少三时可复用内部区间状态。"
    ],
    "tests": [
      {
        "label": "奇偶回文混合",
        "args": [
          "abccbaq"
        ],
        "expected": 10
      },
      {
        "label": "重复字符",
        "args": [
          "aaaa"
        ],
        "expected": 10
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "中心扩展",
        "idea": "枚举奇数与偶数中心，向两侧扩展并计数。",
        "complexity": "时间 O(n²)，空间 O(1)。",
        "code": "def solve(text):\n    total = 0\n    for center in range(2 * len(text) - 1):\n        left = center // 2; right = left + center % 2\n        while left >= 0 and right < len(text) and text[left] == text[right]:\n            total += 1; left -= 1; right += 1\n    return total",
        "steps": [
          "每个字符和每对相邻字符都可以作为扩展中心。",
          "长度至少三时可复用内部区间状态。"
        ],
        "pitfalls": [
          "长度至少三时可复用内部区间状态。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindromic-substrings/"
        }
      },
      {
        "id": "solution-2",
        "name": "区间动态规划",
        "idea": "从短区间到长区间判断两端与内部是否构成回文。",
        "complexity": "时间 O(n²)，空间 O(n²)。",
        "code": "def solve(text):\n    size = len(text); dp = [[False] * size for _ in range(size)]; total = 0\n    for length in range(1, size + 1):\n        for left in range(size - length + 1):\n            right = left + length - 1\n            dp[left][right] = text[left] == text[right] and (length <= 2 or dp[left+1][right-1])\n            total += dp[left][right]\n    return total",
        "steps": [
          "每个字符和每对相邻字符都可以作为扩展中心。",
          "长度至少三时可复用内部区间状态。"
        ],
        "pitfalls": [
          "长度至少三时可复用内部区间状态。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/palindromic-substrings/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/palindromic-substrings/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 142
  },
  {
    "id": "min-cost-climbing-stairs",
    "number": 746,
    "title": "使用最小花费爬楼梯",
    "topic": "动态规划",
    "summary": "可从前两级起步，每次跨一级或两级，求越过最后一级所需的最小花费。",
    "signature": "solve(cost) → int",
    "starter": "def solve(cost):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "到达某一级前，可以来自前一级或前两级。",
      "终点本身没有花费。"
    ],
    "tests": [
      {
        "label": "交替高低花费",
        "args": [
          [
            4,
            9,
            2,
            8,
            1,
            7,
            3
          ]
        ],
        "expected": 10
      },
      {
        "label": "两级楼梯",
        "args": [
          [
            6,
            11
          ]
        ],
        "expected": 6
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "滚动最小费用",
        "idea": "维护到达前两级的最小累计费用。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(cost):\n    previous_two = previous = 0\n    for value in cost:\n        previous_two, previous = previous, min(previous_two, previous) + value\n    return min(previous_two, previous)",
        "steps": [
          "到达某一级前，可以来自前一级或前两级。",
          "终点本身没有花费。"
        ],
        "pitfalls": [
          "终点本身没有花费。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-cost-climbing-stairs/"
        }
      },
      {
        "id": "solution-2",
        "name": "数组动态规划",
        "idea": "dp[i] 表示站上第 i 级的最小费用，再比较最后两级。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(cost):\n    if len(cost) <= 2: return min(cost)\n    dp = cost[:]\n    for index in range(2, len(cost)): dp[index] += min(dp[index-1], dp[index-2])\n    return min(dp[-1], dp[-2])",
        "steps": [
          "到达某一级前，可以来自前一级或前两级。",
          "终点本身没有花费。"
        ],
        "pitfalls": [
          "终点本身没有花费。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/min-cost-climbing-stairs/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/min-cost-climbing-stairs/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 143
  },
  {
    "id": "insert-interval",
    "number": 57,
    "title": "插入区间",
    "topic": "普通数组",
    "summary": "向一组按起点有序且互不重叠的区间插入新区间，并合并重叠部分。",
    "signature": "solve(intervals, incoming) → intervals",
    "starter": "def solve(intervals, incoming):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "先加入完全位于新区间左侧的区间。",
      "再合并所有相交区间，最后追加右侧剩余部分。"
    ],
    "tests": [
      {
        "label": "新区间跨越多个区间",
        "args": [
          [
            [
              1,
              2
            ],
            [
              5,
              7
            ],
            [
              10,
              13
            ],
            [
              16,
              19
            ]
          ],
          [
            6,
            17
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            5,
            19
          ]
        ]
      },
      {
        "label": "新区间位于最前方",
        "args": [
          [
            [
              4,
              6
            ],
            [
              9,
              12
            ]
          ],
          [
            0,
            2
          ]
        ],
        "expected": [
          [
            0,
            2
          ],
          [
            4,
            6
          ],
          [
            9,
            12
          ]
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "三段扫描",
        "idea": "按左侧、重叠、右侧三个阶段处理有序区间。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(intervals, incoming):\n    result = []; index = 0; start, end = incoming\n    while index < len(intervals) and intervals[index][1] < start:\n        result.append(intervals[index]); index += 1\n    while index < len(intervals) and intervals[index][0] <= end:\n        start = min(start, intervals[index][0]); end = max(end, intervals[index][1]); index += 1\n    result.append([start,end])\n    return result + intervals[index:]",
        "steps": [
          "先加入完全位于新区间左侧的区间。",
          "再合并所有相交区间，最后追加右侧剩余部分。"
        ],
        "pitfalls": [
          "再合并所有相交区间，最后追加右侧剩余部分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/insert-interval/"
        }
      },
      {
        "id": "solution-2",
        "name": "统一排序合并",
        "idea": "把新区间加入后按起点排序，再执行通用合并。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(intervals, incoming):\n    merged = []\n    for start,end in sorted(intervals + [incoming]):\n        if merged and start <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], end)\n        else: merged.append([start,end])\n    return merged",
        "steps": [
          "先加入完全位于新区间左侧的区间。",
          "再合并所有相交区间，最后追加右侧剩余部分。"
        ],
        "pitfalls": [
          "再合并所有相交区间，最后追加右侧剩余部分。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/insert-interval/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/insert-interval/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 144
  },
  {
    "id": "gas-station",
    "number": 134,
    "title": "加油站",
    "topic": "贪心算法",
    "summary": "环形路线每站可补充燃料并产生行驶消耗，返回能够完成一圈的起点。",
    "signature": "solve(gas, cost) → int",
    "starter": "def solve(gas, cost):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "总燃料小于总消耗时一定无解。",
      "从某起点到当前位置油量为负，则中间所有点都不能作起点。"
    ],
    "tests": [
      {
        "label": "起点在后半段",
        "args": [
          [
            2,
            1,
            4,
            3,
            8
          ],
          [
            3,
            2,
            5,
            1,
            4
          ]
        ],
        "expected": 3
      },
      {
        "label": "总量不足",
        "args": [
          [
            1,
            4,
            2
          ],
          [
            3,
            2,
            4
          ]
        ],
        "expected": -1
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "一次贪心扫描",
        "idea": "局部油量跌破零时把下一站设为新候选。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(gas, cost):\n    if sum(gas) < sum(cost): return -1\n    start = tank = 0\n    for index,(gain,spend) in enumerate(zip(gas,cost)):\n        tank += gain - spend\n        if tank < 0: start = index + 1; tank = 0\n    return start",
        "steps": [
          "总燃料小于总消耗时一定无解。",
          "从某起点到当前位置油量为负，则中间所有点都不能作起点。"
        ],
        "pitfalls": [
          "从某起点到当前位置油量为负，则中间所有点都不能作起点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/gas-station/"
        }
      },
      {
        "id": "solution-2",
        "name": "前缀和最低点",
        "idea": "总差值非负时，最低前缀和之后的位置可以完成一圈。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(gas, cost):\n    total = prefix = minimum = 0; start = 0\n    for index,(gain,spend) in enumerate(zip(gas,cost)):\n        prefix += gain - spend; total += gain - spend\n        if prefix < minimum: minimum = prefix; start = index + 1\n    return start % len(gas) if total >= 0 else -1",
        "steps": [
          "总燃料小于总消耗时一定无解。",
          "从某起点到当前位置油量为负，则中间所有点都不能作起点。"
        ],
        "pitfalls": [
          "从某起点到当前位置油量为负，则中间所有点都不能作起点。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/gas-station/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/gas-station/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 145
  },
  {
    "id": "non-overlapping-intervals",
    "number": 435,
    "title": "无重叠区间",
    "topic": "贪心算法",
    "summary": "计算至少需要移除多少个区间，才能让剩余区间互不重叠。",
    "signature": "solve(intervals) → int",
    "starter": "def solve(intervals):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "优先保留结束更早的区间，为后续留下更多空间。",
      "端点相接不算重叠。"
    ],
    "tests": [
      {
        "label": "多层交叠",
        "args": [
          [
            [
              1,
              5
            ],
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              4,
              8
            ],
            [
              8,
              10
            ]
          ]
        ],
        "expected": 1
      },
      {
        "label": "全部互不重叠",
        "args": [
          [
            [
              -4,
              -1
            ],
            [
              0,
              2
            ],
            [
              3,
              7
            ]
          ]
        ],
        "expected": 0
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "按结束时间选择",
        "idea": "每次保留结束最早且与已选区间不冲突的区间。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(intervals):\n    removed = 0; end = float('-inf')\n    for start,finish in sorted(intervals, key=lambda item: item[1]):\n        if start < end: removed += 1\n        else: end = finish\n    return removed",
        "steps": [
          "优先保留结束更早的区间，为后续留下更多空间。",
          "端点相接不算重叠。"
        ],
        "pitfalls": [
          "端点相接不算重叠。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/non-overlapping-intervals/"
        }
      },
      {
        "id": "solution-2",
        "name": "按起点扫描",
        "idea": "发生重叠时保留结束更早的那个区间。",
        "complexity": "时间 O(n log n)，空间 O(n)。",
        "code": "def solve(intervals):\n    intervals = sorted(intervals); removed = 0; previous_end = float('-inf')\n    for start,end in intervals:\n        if start < previous_end:\n            removed += 1; previous_end = min(previous_end,end)\n        else: previous_end = end\n    return removed",
        "steps": [
          "优先保留结束更早的区间，为后续留下更多空间。",
          "端点相接不算重叠。"
        ],
        "pitfalls": [
          "端点相接不算重叠。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/non-overlapping-intervals/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/non-overlapping-intervals/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 146
  },
  {
    "id": "valid-parenthesis-string",
    "number": 678,
    "title": "有效的括号字符串",
    "topic": "贪心算法",
    "summary": "字符串包含左右括号与星号，星号可作为任意括号或空串，判断能否形成有效括号序列。",
    "signature": "solve(text) → bool",
    "starter": "def solve(text):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "维护当前未闭合左括号数量的最小值与最大值。",
      "最大值小于零说明右括号无论如何都过多。"
    ],
    "tests": [
      {
        "label": "星号承担不同角色",
        "args": [
          "(*()**())"
        ],
        "expected": true
      },
      {
        "label": "前缀右括号过多",
        "args": [
          ")*(()"
        ],
        "expected": false
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "上下界贪心",
        "idea": "用区间表示读到当前位置时可能的左括号余量。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(text):\n    low = high = 0\n    for ch in text:\n        low += 1 if ch == '(' else -1\n        high += 1 if ch != ')' else -1\n        low = max(low,0)\n        if high < 0: return False\n    return low == 0",
        "steps": [
          "维护当前未闭合左括号数量的最小值与最大值。",
          "最大值小于零说明右括号无论如何都过多。"
        ],
        "pitfalls": [
          "最大值小于零说明右括号无论如何都过多。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-parenthesis-string/"
        }
      },
      {
        "id": "solution-2",
        "name": "双向必要条件",
        "idea": "正向保证右括号不过量，反向保证左括号不过量。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(text):\n    balance = 0\n    for ch in text:\n        balance += -1 if ch == ')' else 1\n        if balance < 0: return False\n    balance = 0\n    for ch in reversed(text):\n        balance += -1 if ch == '(' else 1\n        if balance < 0: return False\n    return True",
        "steps": [
          "维护当前未闭合左括号数量的最小值与最大值。",
          "最大值小于零说明右括号无论如何都过多。"
        ],
        "pitfalls": [
          "最大值小于零说明右括号无论如何都过多。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/valid-parenthesis-string/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/valid-parenthesis-string/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 147
  },
  {
    "id": "number-of-1-bits",
    "number": 191,
    "title": "位 1 的个数",
    "topic": "技巧",
    "summary": "统计非负整数的二进制表示中一位的数量。",
    "signature": "solve(value) → int",
    "starter": "def solve(value):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "n & (n - 1) 会清除最低位的一。",
      "循环次数可以只等于一位的数量。"
    ],
    "tests": [
      {
        "label": "稀疏二进制位",
        "args": [
          1041
        ],
        "expected": 3
      },
      {
        "label": "连续低位均为一",
        "args": [
          4095
        ],
        "expected": 12
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "清除最低一位",
        "idea": "每次执行 value &= value - 1，并累计次数。",
        "complexity": "时间 O(一位数量)，空间 O(1)。",
        "code": "def solve(value):\n    count = 0\n    while value:\n        value &= value - 1; count += 1\n    return count",
        "steps": [
          "n & (n - 1) 会清除最低位的一。",
          "循环次数可以只等于一位的数量。"
        ],
        "pitfalls": [
          "循环次数可以只等于一位的数量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/number-of-1-bits/"
        }
      },
      {
        "id": "solution-2",
        "name": "逐位右移",
        "idea": "检查最低位后不断右移整数。",
        "complexity": "时间 O(log n)，空间 O(1)。",
        "code": "def solve(value):\n    count = 0\n    while value:\n        count += value & 1; value >>= 1\n    return count",
        "steps": [
          "n & (n - 1) 会清除最低位的一。",
          "循环次数可以只等于一位的数量。"
        ],
        "pitfalls": [
          "循环次数可以只等于一位的数量。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/number-of-1-bits/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/number-of-1-bits/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 148
  },
  {
    "id": "missing-number",
    "number": 268,
    "title": "丢失的数字",
    "topic": "技巧",
    "summary": "长度为 n 的数组包含零到 n 中除一个数外的所有值，找出缺失值。",
    "signature": "solve(nums) → int",
    "starter": "def solve(nums):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "下标零到 n-1 与值异或后，剩下的就是缺失值。",
      "也可以用完整等差和减去实际和。"
    ],
    "tests": [
      {
        "label": "缺失中间值",
        "args": [
          [
            6,
            2,
            4,
            0,
            1,
            5
          ]
        ],
        "expected": 3
      },
      {
        "label": "缺失最大值",
        "args": [
          [
            3,
            0,
            2,
            1
          ]
        ],
        "expected": 4
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "异或抵消",
        "idea": "把 n、全部下标和全部元素异或，相同值会两两抵消。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    result = len(nums)\n    for index,value in enumerate(nums): result ^= index ^ value\n    return result",
        "steps": [
          "下标零到 n-1 与值异或后，剩下的就是缺失值。",
          "也可以用完整等差和减去实际和。"
        ],
        "pitfalls": [
          "也可以用完整等差和减去实际和。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/missing-number/"
        }
      },
      {
        "id": "solution-2",
        "name": "等差和差值",
        "idea": "计算零到 n 的理论总和减去实际总和。",
        "complexity": "时间 O(n)，空间 O(1)。",
        "code": "def solve(nums):\n    size = len(nums)\n    return size * (size + 1) // 2 - sum(nums)",
        "steps": [
          "下标零到 n-1 与值异或后，剩下的就是缺失值。",
          "也可以用完整等差和减去实际和。"
        ],
        "pitfalls": [
          "也可以用完整等差和减去实际和。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/missing-number/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/missing-number/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 149
  },
  {
    "id": "counting-bits",
    "number": 338,
    "title": "比特位计数",
    "topic": "技巧",
    "summary": "返回零到 n 每个整数的二进制一位数量。",
    "signature": "solve(limit) → list[int]",
    "starter": "def solve(limit):\n    # TODO: 写下你的解法\n    pass",
    "hints": [
      "i 的最低一位去掉后会落到更小的已知状态。",
      "也可利用 i 的一半与最低位建立递推。"
    ],
    "tests": [
      {
        "label": "跨越二的幂",
        "args": [
          10
        ],
        "expected": [
          0,
          1,
          1,
          2,
          1,
          2,
          2,
          3,
          1,
          2,
          2
        ]
      },
      {
        "label": "最小范围",
        "args": [
          1
        ],
        "expected": [
          0,
          1
        ]
      }
    ],
    "solutions": [
      {
        "id": "solution-1",
        "name": "去最低一位递推",
        "idea": "bits[i] = bits[i & (i-1)] + 1。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(limit):\n    bits = [0] * (limit + 1)\n    for value in range(1, limit + 1): bits[value] = bits[value & (value - 1)] + 1\n    return bits",
        "steps": [
          "i 的最低一位去掉后会落到更小的已知状态。",
          "也可利用 i 的一半与最低位建立递推。"
        ],
        "pitfalls": [
          "也可利用 i 的一半与最低位建立递推。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/counting-bits/"
        }
      },
      {
        "id": "solution-2",
        "name": "右移递推",
        "idea": "一个数的位数等于其一半的位数加最低位。",
        "complexity": "时间 O(n)，空间 O(n)。",
        "code": "def solve(limit):\n    bits = [0]\n    for value in range(1, limit + 1): bits.append(bits[value >> 1] + (value & 1))\n    return bits",
        "steps": [
          "i 的最低一位去掉后会落到更小的已知状态。",
          "也可利用 i 的一半与最低位建立递推。"
        ],
        "pitfalls": [
          "也可利用 i 的一半与最低位建立递推。"
        ],
        "source": {
          "type": "problem-index",
          "label": "题目索引 · LeetCode",
          "url": "https://leetcode.cn/problems/counting-bits/"
        }
      }
    ],
    "compare": "exact",
    "referenceUrl": "https://leetcode.cn/problems/counting-bits/",
    "contentOrigin": "huixie-editorial",
    "curationRank": 150
  }
];
