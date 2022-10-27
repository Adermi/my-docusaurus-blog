---
id: leetcode300
title: leetcode刷题
---

## 常见的算法 & 时间复杂度

![image.png](/assets/leetcode300.assets/1604657195.png)

## 数组(22)

### **`==左右双指针技巧（双指针）==`**

双指针技巧包括：

- 快慢指针 `walker, runner...`（判断环链表，删除链表倒数第k个节点，找到链表中点，找到链表倒数第n个节点）
- 左右指针 `i = 0 ; j = num.length - 1...`（二分查找，三数之和）
- 滑动窗口 `low = 0; high = 0....`

### -[反转字符串](https://leetcode-cn.com/problems/reverse-string/)

- 思路一：头尾双指针

  ```js
  var reverseString = function (s) {
    let i = 0,
      j = s.length - 1
  
    while (i < j) {
      [s[i], s[j]] = [s[j], s[i]]
      i++
      j--
    }
  
    return s
  };
  ```

### -[移除元素](https://leetcode-cn.com/problems/remove-element/)

和这道题相似：

1. [移动零](https://leetcode-cn.com/problems/move-zeroes/)
2. [ 删除字符串中相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

- 思路一：双指针

  ```js
  var removeElement = function (nums, val) {
    if (nums == null || nums.length == 0) return -1
  
    let pos = 0
  
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== val) {
        nums[pos++] = nums[i]
      }
    }
  
    return pos
  };
  ```

  

### -[盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)[思路](https://leetcode-cn.com/problems/container-with-most-water/#)

- 思路二：暴力枚举

  时间复杂度：O(n^2) 	空间复杂度：O(1)

  ```js
  var maxArea = function (height) {
    let max = 0
    for (let i = 0; i < height.length - 1; i++) {
      for (let j = i + 1; j < height.length; j++) {
        max = Math.max(max, Math.min(height[i], height[j]) * (j - i))
      }
    }
    return max
  };
  ```

- 思路一：双指针解法，每次循环都移动相对较小的短板

  时间复杂度：O(n)  空间复杂度：O(1)

  ```js
  var maxArea = function (height) {
    let i = 0,
      j = height.length - 1,
      water = 0
  
    while (i < j) {
      water = Math.max(water, Math.min(height[i], height[j]) * (j - i))
      height[i] < height[j] ? i++ : j--
    }
  
    return water
  };
  ```

### -[移动零](https://leetcode-cn.com/problems/move-zeroes/)

相似的题目：

1. [移除元素](https://leetcode-cn.com/problems/remove-element/)
2. [删除字符串中相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

- 思路一：双指针，一个指针位于数组头，把遍历一遍数组的指针中的非零值依次填充数组

  时间复杂度：O(n)	空间复杂度：O(1)

  ```js
  var moveZeroes = function (arr) {
    if (arr == null || arr.length == 0) return null
  
    let insertPos = 0
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        arr[insertPos++] = arr[i]
      }
    }
  
    while (insertPos < arr.length) {
      arr[insertPos++] = 0
    }
  
  };
  ```

### -[爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

- 思路一：动态规划，对于f(n)个楼梯来说，爬上的方法是 f(n - 1)（只差一步）+ f(n-2)（差两步）

  ```js
  var climbStairs = function (n) {
    let memo = [0, 1, 2]
  
    for (let i = 3; i <= n; i++) {
      memo[i] = memo[i - 1] + memo[i - 2]
    }
  
    return memo[n]
  };
  ```


### -[有序数组の两数之和](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted)

- 思路一：由于数组是有序的，借助三数之和里使用的双指针技巧

  ```js
  var twoSum = function (numbers, target) {
    if (numbers == null || numbers.length == 0) return []
  
    let i = 0,
      j = numbers.length - 1
  
    while (i <= j) {
      let val = numbers[i] + numbers[j]
      if (val === target) {
        return [i + 1, j + 1]
      } else if (val > target) {
        j--
      } else {
        i++
      }
    }
  
    return []
  };
  ```

- 思路二：hash表（针对没有顺序的两数之和）

### -[三数之和](https://leetcode-cn.com/problems/3sum/)

- 思路一：双指针

  ```js
  function threeSum(nums) {
    const results = []
  
    // 数组长度小于3
    if (nums.length < 3) return results
  
    // 数组排序
    nums = nums.sort((a, b) => a - b)
  
    let target = 0
    for (let i = 0; i < nums.length - 2; i++) {
      // 如果排序数组第一项大于0,这个数组肯定不会有和为0的和
      if (nums[i] > target) break
      // 过滤掉重复项
      if (i > 0 && nums[i] === nums[i - 1]) continue
  
      let j = i + 1
      let k = nums.length - 1
  
      while (j < k) {
        let sum = nums[i] + nums[j] + nums[k]
        if (sum === target) {
          results.push([nums[i], nums[j], nums[k]])
          while (nums[j] === nums[j + 1]) j++ // 跳过重复项
          while (nums[k] === nums[k - 1]) k--// 跳过重复项
          j++
          k--
        } else if (sum < target) {
          j++
        } else { // (sum > target)
          k--
        }
      }
    }
  
    return results
  };
  ```
  
- 思路二：哈希表（思路和四数相加相似，先把ab的情况用两个for循环存在hash表中）

  ```js
  var threeSum = function (nums) {
    if (nums.length < 3) return []
  
    nums.sort((a, b) => a - b)
  
    let res = new Set()
  
    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && (nums[i] == nums[i - 1])) continue
  
      // a + b + c = 0
      // a = - b - c
      let map = new Map()
      for (let j = i + 1; j < nums.length; j++) {
        if(map.has(nums[j])) {
          // a,b,c都存在
          res.add([nums[i], nums[j], -nums[i]-nums[j]].toString())
        } else {
          map.set(-nums[j]-nums[i], 1)
        }
      }
    }
  
    return Array.from(res.values()).map(item => item.split(','))
  };
  ```

### -四数之和

- 思路一：双指针，套路和三数之和一样

  ```js
  var fourSum = function (nums, target) {
    if (nums == null || nums.length == 0) return []
    nums.sort((a, b) => a - b)
    let res = []
  
    for (let i = 0; i < nums.length - 3; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue
  
      for (let j = i + 1; j < nums.length - 2; j++) {
        if (j > i + 1 && nums[j] === nums[j - 1]) continue
  
        let k = j + 1,
          l = nums.length - 1
  
        while (k < l) {
          let val = nums[i] + nums[j] + nums[k] + nums[l]
  
          if (val === target) {
            res.push([nums[i], nums[j], nums[k], nums[l]])
            while (nums[k] === nums[k + 1]) k++
            while (nums[l] === nums[l - 1]) l--
            k++
            l--
          } else if (val < target) {
            k++
          } else {
            l--
          }
        }
      }
    }
    return res
  };
  ```

  

### -[比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)

思路一：使用栈，时间O(n)空间O(n)

```js
var backspaceCompare = function (s, t) {
  function helper(str, stack) {
    for (let i = 0; i < str.length; i++) {
      if(str[i] === '#') {
        stack.pop()
      } else {
        stack.push(str[i])
      }
    }

    return stack
  }

  return helper(s, []).toString() === helper(t, []).toString()
};
```

**思路二：双指针，只需要O(1)的空间**

```js
var backspaceCompare = function (s, t) {
  let i = s.length - 1,
    j = t.length - 1,
    back	// 记录多次退格

  while (true) {
    back = 0
    while (i >= 0 && (back > 0 || s[i] == '#')) {
      back += (s[i] == '#' ? 1 : -1)
      i--
    }
    back = 0
    while (j >= 0 && (back > 0 || t[j] == '#')) {
      back += (t[j] == '#' ? 1 : -1)
      j--
    }
    if (i >= 0 && j >= 0 && s[i] == t[j]) {
      i--
      j--
    } else {
      break
    }
  }
  return i == -1 && j == -1
};
```

### -[有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

- 思路一：平方后直接排序

- 思路二：双指针（既然数组是升序的，找正负数分界点的两个指针，做法类似归并，合并两个有序数组）

- 思路三：最牛双指针（一个指头，一个指尾，准备一个空数组，遍历传入的数组的总长度次数，细品）

  ```js
  var sortedSquares = function (nums) {
    let res = []
  
    let i = 0,
      j = nums.length - 1
  
    for (let k = nums.length - 1; k >= 0; k--) {	// 从数组倒数的下标开始装数
      if (Math.abs(nums[i]) > Math.abs(nums[j])) {
        res[k] = Math.pow(nums[i++], 2)	
      } else {
        res[k] = Math.pow(nums[j--], 2)
      }
    }
    return res
  };
  ```

### **`==二分查找技巧(双指针)==`**

### -[二分查找](https://leetcode-cn.com/problems/binary-search/)

- 递归

  ```js
  var search = function (nums, target) {
    function helper(nums, low, high) {
      if (low > high) return -1
  
      let mid = (high - low) >>> 1	// 等价 Math.floor((low + gigh) / 2)
      if (nums[mid] === target) return mid
      if (nums[mid] > target) {
        return helper(nums, low, mid - 1)
      } else {
        return helper(nums, mid + 1, high)
      }
    }
  
    return helper(nums, 0, nums.length - 1)
  };
  ```

- 迭代

  ```js
  var search = function (nums, target) {
    if (nums == null || nums.length == 0) return -1
    let low = 0,
      high = nums.length - 1
  
    while (low <= high) {
      let mid  = (high + low) >>> 1 	// 等价 Math.floor((low + gigh) / 2)
      if(nums[mid] === target) return mid
      if(nums[mid] < target) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  
    return -1
  };
  ```

### -[有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)

- 思路一：二分查找

  ```js
  var isPerfectSquare = function (num) {
    let low = 0,
      high = num
  
    while (low <= high) {
      let mid = (low + higi) >>> 1	// 除2取余
      let val = mid * mid
  
      if (val === num) {
        return true
      } else if (num < val) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    return false
  };
  ```

  

### -[Sqrt(x) x的平方根](https://leetcode-cn.com/problems/sqrtx)

- 思路一：二分查找

  ```js
  var mySqrt = function (x) {
    let low = 0,
      high = x
  
    while (low <= high) {
      let mid = (low + high) >>> 1
  
      if (mid * mid === x) {
        return mid
      } else if (mid * mid < x) {
        let n = mid + 1
        if (n * n > x) {
          return mid
        } else {
          low = mid + 1
        }
      } else {
        high = mid - 1
      }
    }
  };
  ```

### -[在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

- 思路一：这道题就是二分查找的变体（查找第一个等于...查找最后一个等于....）

  ```js
  var searchRange = function (nums, target) {
    let res = [-1, -1]
  
    if (nums == null || nums.length == 0) return res
  
    let low = 0,
      high = nums.length - 1,
      mid = (low + high) >>> 1
  
    while (low <= high) {
      mid = (low + high) >>> 1
      if (nums[mid] === target && (mid - 1 == -1 || nums[mid - 1] !== nums[mid])) {
        res[0] = mid
        break
      } else if (target <= nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
  
    if (res[0] === -1) return res
    while (nums[mid] == nums[res[0]]) {
      mid++
    }
    res[1] = mid - 1
  
    return res
  };
  ```

### -[搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

- 思路一：二分查找变体，第一个大于等于目标值的数

  ```js
  var searchInsert = function (nums, target) {
    let low = 0,
      high = nums.length - 1
  
    while (low <= high) {
      let mid = (low + high) >>> 1
  
      if (target === nums[mid]) {
        return mid
      } else if (nums[mid] > target) {
        if (mid - 1 < 0 || nums[mid - 1] < target) return mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
  
    return nums.length
  };
  ```

- 思路二：思路清奇的二分查找

  ```js
  var searchInsert = function (nums, target) {
    let low = 0,
      high = nums.length - 1
  
    while (low <= high) {
      let mid = (low + high) >>> 1
  
      if (target === nums[mid]) {
        return mid
      } else if (nums[mid] > target) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
  
    return low
  };
  ```

### **`==滑动窗口技巧(双指针)==`**

使用互动窗口的题目特点：

- 字符串或者正整数数组
- 连续子数组

### -[长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

- 思路一：暴力求解

  ```js
  var minSubArrayLen = function (target, nums) {
    if (nums == null || nums.length == 0) return 0
  
    let minLen = Number.MAX_VALUE
  
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] >= target) {
        return 1
      } else if (nums[i] < target) {
        let j = i + 1,
          sum = nums[i]
        if(sum >= target) return 2
        for (; j < nums.length; j++) {
          sum += nums[j]
          if ((j - i + 1) < minLen && sum >= target) {
            minLen = j - i + 1
          }
        }
      }
    }
  
    return minLen === Number.MAX_VALUE ? 0 : minLen
  };
  ```

- 思路二：使用滑动窗口（用双指针模拟）

  ![](/assets/leetcode300.assets/8.gif)

  ```js
  var minSubArrayLen = function (target, nums) {
    let low = 0, high = 0, sum = 0, min = Number.MAX_VALUE
  
    while(high < nums.length) {
      sum += nums[high++]
      while(sum >= target) {
        min = Math.min(min, high - low)
        sum -= nums[low++]
      }
    }
  
    return min === Number.MAX_VALUE ? 0 : min
  };
  ```

- 思路三：使用二分查找+数组前缀和

  ```js
  // 找到第一个大于等于target的位置,若没有则返回length+1
  function binarySearch(low, high, target, sums) {
    while (low <= high) {
      let mid = (low + high) >>> 1
  
      if (sums[mid] === target) {
        return mid
      } else if (sums[mid] > target) {
        if (mid - 1 < 0 || sums[mid - 1] < target) return mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
  
    return sums.length	// 返回length + 1
  }
  
  var minSubArrayLen = function (target, nums) {
    let sums = new Array(nums.length + 1).fill(0)
  
    for (let i = 1; i < sums.length; i++) {
      sums[i] = sums[i - 1] + nums[i - 1]
    }
  
    let minLen = Number.MAX_VALUE
    for (let i = 0; i < sums.length; i++) {
      let end = binarySearch(i + 1, sums.length - 1, sums[i] + target, sums)
      if (end == sums.length) break
      if (end - i < minLen) minLen = end - i
    }
  
    return minLen == Number.MAX_VALUE ? 0 : minLen
  };
  ```

### -[最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

- 滑动窗口

  ```js
  var minWindow = function (s, t) {
    if (t.length > s.length) return ''
  
    let need = new Map(),
      window = new Map(),
      low = 0,
      high = 0,
      start = 0,
      minLen = Number.MAX_VALUE,
      valid = 0
  
    for (let str of t) need.get(str) ? need.set(str, need.get(str) + 1) : need.set(str, 1)
  
    while (high < s.length) {
      let str = s[high++]
  
      if (need.has(str)) {
        window.has(str) ? window.set(str, window.get(str) + 1) : window.set(str, 1)
        if (window.get(str) === need.get(str)) valid++
      }
  
      while (valid === need.size) {
        if ((high - low) < minLen) {
          start = low
          minLen = high - low
        }
        let dStr = s[low++]
        if (need.has(dStr)) {
          valid += (window.get(dStr) === need.get(dStr) ? -1 : 0)
          window.set(dStr, window.get(dStr) - 1)
        }
  
      }
    }
  
    return minLen === Number.MAX_VALUE ? '' : s.substring(start, start+minLen)
  };
  ```

### -[字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)

> 本题和下面那题 [找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/) 类似

- 思路一：滑动窗口

  ```js
  var checkInclusion = function (s1, s2) {
    let need = new Map(),
      window = new Map()
  
    for (let str of s1) {
      need.has(str) ? need.set(str, need.get(str) + 1) : need.set(str, 1)
    }
  
    let low = 0,
      high = 0,
      valid = 0
  
    while (high < s2.length) {
      let str = s2[high++]
  
      if (need.has(str)) {
        window.has(str) ? window.set(str, window.get(str) + 1) : window.set(str, 1)
        if (window.get(str) === need.get(str)) valid++
  
        while (window.get(str) > need.get(str)) {
          let d = s2[low++]
          if (window.get(d) === need.get(d)) valid--
          window.set(d, window.get(d) - 1)
        }
      } else {
        low = high
        valid = 0
        window.clear()
      }
  
      if (valid === need.size) return true
  
    }
  
    return false
  };
  ```
  
- 思路二：双指针

  ```js
  var checkInclusion = function (s1, s2) {
  
    if (s1.length > s2.length) return false;
  
    let cnt = new Array(26).fill(0);
  
    for (let i = 0; i < s1.length; ++i) {
      cnt[s1[i].charCodeAt() - 'a'.charCodeAt()]--;
    }
  
    debugger
    let left = 0;
    for (let right = 0; right < s2.length; right++) {
      let x = s2[right].charCodeAt() - 'a'.charCodeAt();
      cnt[x]++;
      while (cnt[x] > 0) {
        cnt[s2[left].charCodeAt() - 'a'.charCodeAt()]--;
        left++;
      }
      if (right - left + 1 === s1.length) {
        return true;
      }
    }
    return false;
  };
  ```

### -[找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

> 本题和上面那题 [字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/) 类似

- 思路一：滑动窗口

  ```js
  var findAnagrams = function (s, p) {
    if (s.length < p.length) return []
  
    let need = new Map(),
      window = new Map()
  
    for (let str of p) need.has(str) ? need.set(str, need.get(str) + 1) : need.set(str, 1)
  
    let low = 0,
      high = 0,
      valid = 0,
      res = []
  
    while (high < s.length) {
      let str = s[high++]
  
      if (need.has(str)) {
        window.has(str) ? window.set(str, window.get(str) + 1) : window.set(str, 1)
        if (window.get(str) === need.get(str)) valid++
        while (window.get(str) > need.get(str)) {
          let d = s[low++]
          if (window.get(d) === need.get(d)) valid--
          window.set(d, window.get(d) - 1)
        }
      } else {
        window.clear()
        low = high
        valid = 0
      }
  
      if (valid === need.size)  res.push(low)
      
    }
  
    return res
  };
  ```

### -[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

- 思路一：滑动窗口

  ```js
  var lengthOfLongestSubstring = function (s) {
    if (s == null || s.length == 0) return ''
  
    let low = 0,
      high = 0,
      maxLen = Number.MIN_VALUE,
      window = new Set()
  
    while (high < s.length) {
      let str = s[high++]
  
      while (window.has(str)) {
        let dStr = s[low++]
        window.delete(dStr)
      }
  
      window.add(str)
      maxLen = Math.max(maxLen, high - low)
    }
  
    return maxLen
  };
  ```
  

### **`==数组前缀技巧==`**

> 什么是前缀和：某个下标（包括自身）之前所有数组元素的和，简单点就是前n项和
>
> 作用：用于在不会变化的数组中，频繁查询区间的累加和
>
> 前缀和数组：

![image-20220125173228263](/assets/leetcode300.assets/image-20220125173228263.png)

### -[区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)

- 思路一：构建前缀和数组

  ```js
  var NumArray = function (nums) {
    this.nums = nums
    this.sums = new Array(nums.length + 1).fill(0)
  
    for (let i = 1; i < this.sums.length; i++) {
      this.sums[i] = this.sums[i - 1] + this.nums[i - 1]
    }
  };
  
  NumArray.prototype.sumRange = function (left, right) {
    return this.sums[right + 1] - this.sums[left]
  };
  ```

  

### -[二维区域和检索 - 矩阵不可变](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)

- 思路一：构建二维前缀和矩阵

  - 构造（面积加减法）

    这里画错了，取的第一项应该是原数组中的一项
    $$
    preSum[i][j] = matrix[i - 1][j - 1] + preSum[i][j - 1] + preSum[i - 1][j] - preSum[i - 1][j - 1]
    $$
    ![](/assets/leetcode300.assets/9.gif)
  
  - 返回某片区域（面积加减法）
    $$
    preSums[row2 + 1][col2 + 1] - preSums[row1][col2 + 1] - preSums[row2 + 1][col1] + preSums[row1][col1]
    $$
    ![](/assets/leetcode300.assets/10.gif)
    
    ![](/assets/leetcode300.assets/image-20220129192313944.png)
    
  - 代码
  
    ```js
    var NumMatrix = function (matrix) {
      if (matrix == null || matrix.length == 0) return []
    
      let row = matrix.length,
        col = matrix[0].length,
        preSum = []
    
      for (let i = 0; i <= row; i++) preSum.push(new Array(col + 1).fill(0))
    
      for (let i = 1; i < preSum.length; i++) {
        for (let j = 1; j < preSum[0].length; j++) {
          preSum[i][j] = matrix[i - 1][j - 1] + preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1]
        }
      }
      debugger
    };
    
    NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
      let sums = this.preSum
      // 这一段代码需要看面积加减法得知
      return sums[row2 + 1][col2 + 1] - sums[row1][col2 + 1] - sums[row2 + 1][col1] + sums[row1][col1]
    };
    ```

### -[和为 K 的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

- 暴力求解，两个for

  ```js
  function subarraySum(nums, k) {
    if (nums == null || nums.length == 0) return 0
  
    let res = 0
  
    for (let i = 0; i < nums.length; i++) {
      let sum = nums[i]
      if (sum === k) res++
      for (let j = i + 1; i < nums.length; j++) {
        sum += nums[j]
        if (sum === k) res++
      }
    }
    return res
  }
  ```

- 前缀和技巧：优化第二个for的复杂度

  ```js
  var subarraySum = function (nums, k) {
    let preSum = new Map(),
      sum = 0,
      res = 0
  
    //  当num[i]就是k,用来往res上+1计数用的
    preSum.set(0, 1)
  
    for (let i = 0; i < nums.length; i++) {
      // 一直做累加
      sum += nums[i]
  
      // 当前累加的值 - k ,查找这个值是否在前缀和中出现过,这样就可以推断出是否有和为k
      // 因为是连续的子数组,利用前缀和解决
      if (preSum.has(sum - k)) {
        res += preSum.get(sum - k)
      }
  
      // 如果之前已经存在前缀和,就说明有多种情况,在加上res的时候多一种情况 [1,-1,0] k=0
      if (preSum.has(sum)) {
        preSum.set(sum, preSum.get(sum) + 1)
      } else {
        preSum.set(sum, 1)
      }
    }
  
    return res
  };
  ```

### -[统计「优美子数组」](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/)

- 思路一：前缀和

  ```js
  var numberOfSubarrays = function (nums, k) {
    if (nums == null || nums.length == 0) return 0
  
    let preSum = new Map(),
      sum = 0,
      res = 0
  
    for (let val of nums) {
      if (val % 0 !== 0) sum++
      preSum.has(sum) ? preSum.set(sum, preSum.get(sum) + 1) : preSum.set(sum, 1)
      if (sum - k >= 0) res += preSum.get(sum - k)
    }
  
    return res
  };
  ```

  

### **`==差分数组技巧==`**  

- 差分数组是**前缀和数组的逆运算**，适用于在某个不变的数组，频繁的对某段区间进行加减

  :star: 现在我有一个需求：对以下数组几段区间进行+ -

  1. 对 2 ~ 5 加5
  2. 对 3 ~ 6 加10
  3. 对 1~7 减20
  4. .......

  ![image-20220202145855886](/assets/leetcode300.assets/image-20220202145855886.png)

  方法一：最简单就是for循环呗，时间复杂度为 O(n)，当增减的次数非常多时算法速度急剧下降。

  方法二：使用**差分数组** （在数组起始位置+上值，在数组结束位置后一位-上值，对差分数组求前缀和）

  > 若某个数组是有数字的比方说 [1, 2, 3, 4]，需要先把这个数组转换成差分数组，在进行 + -

  - 差分数组：

  ![image-20220202150601365](/assets/leetcode300.assets/image-20220202150601365.png)

  - 对差分数组求前缀和能得到原数组：

    ![image-20220202150652351](/assets/leetcode300.assets/image-20220202150652351.png)

    

### -[区间加法](https://leetcode-cn.com/problems/range-addition/)

- 思路一：差分数组

  ```js
  var getModifiedArray = function (length, updates) {
    let diff = new Array(length).fill(0)
  
    for (const [start, end, inc] of updates) {
      diff[start] += inc
      if(end + 1 < length) diff[end + 1] -= inc
    }
  
    // 把当前差分数组直接修改成前缀和数组
    for (let i = 1; i < length; i++) diff[i] += diff[i - 1]
      
    return diff
  
  };
  ```

  

### -[拼车](https://leetcode-cn.com/problems/car-pooling/)

- 思路一：差分数组

  ```js
  var carPooling = function (trips, capacity) {
    let arr = new Array(1001).fill(0)	// 车站最大只有1000站
  
    for (const [counts, start, end] of trips) {
      arr[start] += counts	// 上车
      arr[end] -= counts		// 下车
    }
  
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i]
      if (sum > capacity) return false
    }
  
    return true
  }
  ```


### -[航班预订统计](https://leetcode-cn.com/problems/corporate-flight-bookings/)

- 思路一：差分数组

  ```js
  var corpFlightBookings = function (bookings, n) {
    let diff = new Array(n + 1).fill(0)
  
    for (const [start, end, num] of bookings) {
      diff[start] += num
      if (end + 1 < n + 1) diff[end + 1] -= num
    }
  
    for (let i = 1; i < diff.length; i++) {
      diff[i] += diff[i - 1]
    }
  
    return diff.slice(1)
  };
  ```

### **`==二维数组==`**

### -[螺旋矩阵 I](https://leetcode-cn.com/problems/spiral-matrix/)

- 思路一：和下面一题思路一致

  ```js
  var spiralOrder = function (matrix) {
    if (matrix == null || matrix.length == 0) return []
    let rowStart = 0,
      rowEnd = matrix.length - 1,
      colStart = 0,
      colEnd = matrix[0].length - 1,
      res = []
  
    while (rowStart <= rowEnd && colStart <= colEnd) {
      for (let i = colStart; i <= colEnd; i++) {
        res.push(matrix[rowStart][i])
      }
      rowStart++
  
      for (let i = rowStart; i <= rowEnd; i++) {
        res.push(matrix[i][colEnd])
      }
      colEnd--
  
      // if进行判断的用意是边界处理
      for (let i = colEnd; i >= colStart; i--) {
        if(rowStart <= rowEnd) res.push(matrix[rowEnd][i])
      }
      rowEnd--
        
      // if进行判断的用意是边界处理
      for (let i = rowEnd; i >= rowStart; i--) {
        if(colStart <= colEnd) res.push(matrix[i][colStart])
      }
      colStart++
    }
  
    return res
  };
  ```

  

### -[螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

- 思路一：自行看代码

  ![](/assets/leetcode300.assets/7.gif)

  ```js
  var generateMatrix = function (n) {
    let matrix = []
  
    for (let i = 0; i < n; i++) matrix.push([])
  
    if (n == 0) return matrix
  
    // Normal Case
    let rowStart = 0;
    rowEnd = n - 1;
    colStart = 0;
    colEnd = n - 1;
    num = 1; //change
  
    while (rowStart <= rowEnd && colStart <= colEnd) {
      for (let i = colStart; i <= colEnd; i++) {
        matrix[rowStart][i] = num++; //change
      }
      rowStart++;
  
      for (let i = rowStart; i <= rowEnd; i++) {
        matrix[i][colEnd] = num++; //change
      }
      colEnd--;
  
      for (let i = colEnd; i >= colStart; i--) {
          matrix[rowEnd][i] = num++; //change
      }
      rowEnd--;
  
      for (let i = rowEnd; i >= rowStart; i--) {
          matrix[i][colStart] = num++; //change
      }
      colStart++;
    }
  
    return matrix;
  
  };
  ```

### -[旋转图像](https://leetcode-cn.com/problems/rotate-image/)

- 大力出奇迹，请看图

  ```js
  var rotate = function (matrix) {
    if (matrix == null || matrix.length == 0) return []
  
    for (let i = 0; i < Math.floor(matrix.length / 2); i++) {
      [matrix[i], matrix[matrix.length - 1 - i]] = [matrix[matrix.length - 1 - i], matrix[i]]
    }
  
    let row = matrix.length,
      col = matrix[0].length
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (j <= i) continue; // 省略掉已经交换过的
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
      }
    }
  
    return matrix
  };
  ```

## 链表(5)

### **`==快慢指针技巧(双指针)==`**

### -[链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

- 思路一：快慢指针

  ```js
  var middleNode = function (head) {
    let walker = head,
      runner = head
  
    while (runner !== null && runner.next !== null) {
      runner = runner.next.next
      walker = walker.next
    }
  
    return walker
  };
  ```

### -[删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

- 思路一：快慢指针

  ```js
  var removeNthFromEnd = function (head, n) {
    let walker = head,
      runner = head
  
    for (let i = 0; i < n; i++) runner = runner.next
  
    if (runner == null) return head.next
  
    while (runner.next !== null) {
      runner = runner.next
      walker = walker.next
    }
  
    walker.next = walker.next.next
  
    return head
  };
  ```

- 思路二：先翻转链表，删除第n个节点，再翻转回来

  ```js
  function reverseLink(head) {
    let preNode = new ListNode(0, null)
  
    while (head !== null) {
      let node = head
      head = head.next
      node.next = preNode.next
      preNode.next = node
    }
  
    return preNode.next
  }
  
  var removeNthFromEnd = function (head, n) {
    if (head == null) return head
  
    head = reverseLink(head)
  
    let node = new ListNode(0, head),
      currentNode = node,
      index = 1
  
    while (currentNode !== null) {
      if (index == n) currentNode.next = currentNode.next.next
      currentNode = currentNode.next
      index++
    }
  
    return reverseLink(node.next)
  };
  ```


### -[环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

- 思路一：快慢指针

  ```js
  var hasCycle = function (head) {
    if (head == null) return false
  
    let slow = head,
      fast = head
  
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next
      slow = slow.next
      if (fast === slow) return true
    }
  
    return false
  };
  ```

  



### -[环形链表2](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

思路一：哈希表

```js
var detectCycle = function (head) {
  if (head == null) return null

  let hash = new Map()

  while (head !== null) {
    if (hash.has(head)) return head

    hash.set(head, true)
    head = head.next
  }

  return null
};
```

思路二：快慢指针

![](/assets/leetcode300.assets/2.gif)

```js
var detectCycle = function (head) {
  if (head == null) return null

  let slow = head,
    fast = head

  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next

    if (fast == slow) {
      let slow2 = head

      while (slow2 !== slow) {
        slow = slow.next
        slow2 = slow.next
      }
      return slow
    }
  }

  return null
};
```



### **`==假节点技巧==`**

建立一个假节点，作为head节点的根节点，作为处理head节点为空的情况，最后返回`假节点.next`

### -[移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

- 思路一：假节点技巧

  ```js
  var removeElements = function (head, val) {
    if (head == null) return null
  
    let dummy = new ListNode(-1, head),
      currentNode = dummy
  
    while (currentNode.next !== null) {
      if (currentNode.next.val === val) {
        currentNode.next = currentNode.next.next
      } else {
        currentNode = currentNode.next
      }
    }
  
    return dummy.next
  };
  ```

  

### -[反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

思路一：遍历方法

```js
var reverseList = function (head) {
  if (head == null || head.next == null) return head

  let preNode = null

  while (head !== null) {
    let nextNode = head.next
    head.next = preNode
    preNode = head
    head = nextNode
  }

  return preNode
};
```

方法二：更简单的思路

```js
var reverseList = function (head) {
  let prev = null
  while(head !== null) {
    let node = head.next
    head.next = prev
    prev = head
    head = node
  }

  return prev
}
```



### -[两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

思路一：递归

```js
var swapPairs = function (head) {
  if (head == null || head.next == null) return head

  let next = head.next
  head.next = swapPairs(next.next)
  next.next = head

  return next
}
```

思路二：迭代，借助一个假节点作为头结点，最后返回空节点的next

![1](/assets/leetcode300.assets/1.gif)

```js
var swapPairs = function (head) {
  if (head == null || head.next == null) return head

  let slow = head,
    fast = slow.next,
    start = new ListNode(0)
  head = start

  while (true) {
    slow.next = fast.next
    fast.next = slow
    start.next = fast
    start = slow

    if (slow.next == null || slow.next.next == null) break
    slow = slow.next
    fast = slow.next
  }

  return head.next
}
```

### -[k个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

思路一：递归翻转

```js
var reverseKGroup = function (head, k) {
  if (head == null) return null  // 空链表不翻转
  if (k <= 1) return head // k == 1 不翻转

// 链表前k个是否都存在
  let currentNode = head
  for (let i = 0; i < k; i++) {
    if (currentNode == null) return head  // 不满足k个链表，不翻转
    currentNode = currentNode.next
  }

  // 递归翻转第k个后面的链表
  let lastNode = reverseKGroup(currentNode, k)

  // 翻转前k个
  for(let i = 0; i < k; i++) {
    let node = head.next
    head.next = lastNode
    lastNode = head
    head = node
  }

  return lastNode
};
```

### **`==其他类的==`**

### -[两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

- 思路一：正常做

  ```js
  var addTwoNumbers = function (l1, l2) {
    if (l1 == null) return l2
    if (l2 == null) return l1
  
    let dummy = new ListNode(-1, null),
      currentNode = dummy,
      add = 0
  
    while (l1 !== null || l2 !== null || add) {
      let v1 = l1 == null ? 0 : l1.val,
        v2 = l2 == null ? 0 : l2.val
  
      currentNode.next = new ListNode(v1 + v2 + add)
  
      if (currentNode.next.val > 9) {
        add = 1
      } else {
        add = 0
      }
  
      l1 = l1 == null ? l1 : l1.next
      l1 = l1 == null ? l1 : l1.next
      currentNode = currentNode.next
    }
  
    return dummy.next
  };
  ```

### -[设计链表](https://leetcode-cn.com/problems/design-linked-list/)

- 思路一：用双向链表写

  ```js
  // 和双端队列思路差不多，头尾都是-1的dummy指针
  ```

### -[链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

- 思路一：哈希表

- 思路二：双指针

  ```js
  var getIntersectionNode = function (headA, headB) {
    let a = headA,
      b = headB
  
    while (a !== b) {
      a = a !== null ? a.next : headB
      b = b !== null ? b.next : headA
    }
  
    return a
  };
  ```

  

## 栈和队列（8）

> 栈类的题目：最近相关性

### -[有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

思路一：使用栈

```js
var isValid = function (s) {
  if (s.length <= 1) return false

  let data = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  let stack = []

  for (let i = 0; i < s.length; i++) {
    if (data.hasOwnProperty(s[i])) {
      if (stack.pop() !== data[s[i]]) return false
    } else {
      stack.push(s[i])
    }
  }

  return stack.length === 0 ? true : false
};
```

### -[最小栈](https://leetcode-cn.com/problems/min-stack/)

思路一：双栈，小于等于最小栈的元素压栈

```js
var MinStack = function () {
  this.res = []
  this.min = []
};

MinStack.prototype.push = function (val) {
  this.res.push(val)
  if (this.min.length === 0 || val <= this.min[this.min.length - 1] ) {
    this.min.push(val)
  }
};

MinStack.prototype.pop = function () {
  let item = this.res.pop()
  if(this.min.length > 0 && this.min[this.min.length - 1] === item) {
    this.min.pop()
  }
};

MinStack.prototype.top = function () {
  return this.res[this.res.length - 1] || null
};

MinStack.prototype.getMin = function () {
  return this.min[this.min.length - 1] || null
};
```

思路二：使用一个栈，实时记录最小值

### -[滑动窗口的最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

思路一：优先级队列

思路二：单调双端队列

```js
var maxSlidingWindow = function (nums, k) {
  let queue = []

  for (let i = 0; i < k; i++) {
    // 单调递减队列
    while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
  }

  // 动态获取最大值
  let res = [nums[queue[0]]]
  for (let i = k; i < nums.length; i++) {
    while (queue.length !== 0 && nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
    // 删除不在当前滑动窗口内的值
    while (queue[0] <= i - k) {
      queue.shift()
    }
    res.push(nums[queue[0]])
  }

  return res
};
```

### -[设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/)

思路一：使用双链表

![](/assets/leetcode300.assets/6.gif)



```js
function ListNode2(val) {
  this.val = (val == undefined ? null : val)
  this.next = null
  this.prev = null
}

var MyCircularDeque = function (k) {
  this.head = new ListNode2(-1)
  this.tail = new ListNode2(-1)

  this.head.next = this.tail
  this.tail.prev = this.head

  this.maxSize = k
  this.size = 0
};

MyCircularDeque.prototype.insertFront = function (val) {
  if (this.size === this.maxSize) return false

  let node = new ListNode2(val)
  node.next = this.head.next
  node.prev = this.head

  this.head.next.prev = node
  this.head.next = node
  this.size++
  return true

};

MyCircularDeque.prototype.insertLast = function (val) {
  if (this.size === this.maxSize) return false

  let node = new ListNode2(val)

  node.prev = this.tail.prev
  node.next = this.tail

  this.tail.prev.next = node
  this.tail.prev = node

  this.size++
  return true

};

MyCircularDeque.prototype.deleteFront = function () {
  if (this.size == 0) return false

  this.head.next.next.prev = this.head
  this.head.next = this.head.next.next

  this.size--

  return true
};

MyCircularDeque.prototype.deleteLast = function () {
  if (this.size === 0) return false

  this.tail.prev.prev.next = this.tail
  this.tail.prev = this.tail.prev.prev

  this.size--

  return true
};

MyCircularDeque.prototype.getFront = function () {
  return this.head.next.val
};

MyCircularDeque.prototype.getRear = function () {
  return this.tail.prev.val
};

MyCircularDeque.prototype.isEmpty = function () {
  return this.size == 0
};

MyCircularDeque.prototype.isFull = function () {
  return this.size == this.maxSize
};
```

### -[数据流中的第 K 大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)

- 思路一：优先级队列实现

  ```js
  // 小顶堆实现
  详细参见堆的具体实现
  ```

  ```js
  // 算法实现
  var KthLargest = function(k, nums) {
    this.k = k
    this.queue = new Heap(nums)
  };
  
  
  KthLargest.prototype.add = function(val) {
    this.queue.offer(val)
  
    while(this.queue.size() > this.k) {
      this.queue.poll()
    }
  
    return this.queue.peek()
  };
  ```

### -[删除字符串中相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

相似的题目：

1. [移动零](https://leetcode-cn.com/problems/move-zeroes/)
2. [移除元素](https://leetcode-cn.com/problems/remove-element/)

- 思路一：栈

  ```js
  var removeDuplicates = function (s) {
    if (s == null || s.length == 0) return ''
  
    let stack = []
  
    for (let i = 0; i < s.length; i++) {
      if (stack.length > 0 && s[i] == stack[stack.length - 1]) {
        stack.pop()
      } else {
        stack.push(s[i])
      }
    }
  
    return stack.join('')
  };
  ```

- 思路二：双指针

  ```js
  var removeDuplicates = function (s) {
    if (s == null || s.length == 0) return null
  
    const arr = s.split('')
    let index = 0
    for (let i = 0; i < arr.length; i++) {
      if(index === 0 || arr[i] !== arr[index - 1]) {
        arr[index] = arr[i]
        index++
      } else {
        index--
      }
    }
  
    return arr.slice(0, index).join('')
  };
  ```

### -[用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

- 思路一：模拟

  ```js
  var MyQueue = function () {
    this.stack1 = []
    this.stack2 = []
  
    this.size = this.stack1.length
  };
  
  // 时间复杂度为O(n) 首先要把一个栈的数据移动到另一个栈,把元素压底,在把元素堆回来
  MyQueue.prototype.push = function (x) {
    while (this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop())
    }
    this.stack1.push(x)
    while (this.stack2.length !== 0) {
      this.stack1.push(this.stack2.pop())
    }
    this.size++
  };
  
  MyQueue.prototype.pop = function () {
    if (this.size === 0) return -1
  
    this.stack1.pop()
    this.size--
  };
  
  MyQueue.prototype.peek = function () {
    return this.stack1[this.stack1.length - 1]
  };
  
  MyQueue.prototype.empty = function () {
    return this.length === 0
  };
  ```

### -[用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

- 思路一：模拟

  ```js
  var MyStack = function () {
    this.list1 = []
    this.list2 = []
  
    this.size = this.list1.length
  };
  
  MyStack.prototype.push = function (x) {
    while (this.list1.length !== 0) {
      this.list2.push(this.list1.shift())
    }
    this.list1.push(x)
    while (this.list2.length !== 0) {
      this.list1.push(this.list2.shift())
    }
  
    this.size++
  };
  
  MyStack.prototype.pop = function () {
    if (this.size === 0) return null
  
    this.size--
    return this.list1.shift()
  };
  
  MyStack.prototype.top = function () {
    return this.list1[0]
  };
  
  MyStack.prototype.empty = function () {
    return this.size === 0
  };
  ```

### -[逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

- 思路一：栈

  ```js
  var evalRPN = function (tokens) {
    let stack = []
  
    for (let str of tokens) {
      if (Number.isNaN(-str)) {
        let v1 = stack.pop(),
          v2 = stack.pop()
        if (str === '+') {
          stack.push(v2 + v1)
        } else if (str === '-') {
          stack.push(v2 - v1)
        } else if (str === '*') {
          stack.push(v2 * v1)
        } else if (str === '\/') {
          value = v2 / v1
          stack.push(value >= 0 ? Math.floor(value) : Math.ceil(value))
        }
      } else {
        stack.push(Number(str))
      }
    }
  
    return stack[0]
  };
  ```

### -[前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

- 思路一：Hash表 + 桶排序

  ```js
  function topKFrequent(nums, k) {
    let bucket = new Array(nums.length + 1).fill(0),
      map = new Map()
  
    for (let n of nums) map.has(n) ? map.set(n, map.get(n) + 1) : map.set(n, 1)
  
    for (let key of map.keys()) {
      let freq = map.get(key)
      if (bucket[freq] === 0) {
        bucket[freq] = []
      }
      bucket[freq].push(key)
    }
  
    let res = []
  
    for (let pos = bucket.length - 1; pos >= 0 && res.length < k; pos--) {
      if (Array.isArray(bucket[pos])) {
        for (let val of bucket[pos]) res.push(val)
      }
    }
  
    return res
  }
  ```

- 思路一：Hash表 + 改造版小顶堆

  ```js
  class Heap {
    constructor(nums = [], compareObj) {
      this.nums = nums
      this.compareObj = compareObj
  
      for (let i = Math.floor((nums.length - 2) / 2); i >= 0; i--) {
        this.heapify(i)
      }
    }
  
    heapify(point) {
      let minPoint = point,
        nums = this.nums,
        compareObj = this.compareObj
  
      while (true) {
        let leftPoint = point * 2 + 1,
          rightPoint = point * 2 + 2
  
        if (leftPoint < nums.length && compareObj.get(nums[minPoint]) > compareObj.get(nums[leftPoint])) {
          minPoint = leftPoint
        }
  
        if (rightPoint < nums.length && compareObj.get(nums[minPoint]) > compareObj.get(nums[rightPoint])) {
          minPoint = rightPoint
        }
  
        if (minPoint === point) break;
  
        [nums[minPoint], nums[point]] = [nums[point], nums[minPoint]]
  
        point = minPoint
      }
    }
  
    delete() {
      let nums = this.nums
  
      if (nums.length === 0) return;
  
      [nums[0], nums[nums.length - 1]] = [nums[nums.length - 1], nums[0]]
      nums.pop()
  
      this.heapify(0)
    }
  
    add(val) {
      let nums = this.nums,
        compareObj = this.compareObj
  
      nums.push(val)
  
      let point = nums.length,
        prePoint = Math.floor((point - 2) / 2)
  
      while (prePoint >= 0) {
        if (compareObj.get(nums[point]) > compareObj.get(nums[prePoint])) break;
        [nums[point], nums[prePoint]] = [nums[prePoint], nums[point]]
        point = prePoint
        prePoint = Math.floor((point - 2) / 2)
      }
    }
  }
  
  var topKFrequent = function (nums, k) {
    if (nums == null || nums.length == 0) return []
  
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
      map.has(nums[i]) ? map.set(nums[i], map.get(nums[i]) + 1) : map.set(nums[i], 1)
    }
  
    let heap = new Heap([], map)
    for (let key of map.keys()) {
      heap.add(key)
      while (heap.nums.length > k) {
        heap.delete()
      }
    }
  
    return heap.nums
  };
  ```


## 单调栈

### -[柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

核心思路：对于第 i 根柱子而言，其最大面积是多少，需要向左找到第一根小于i的柱子，向右找第一根小于 i 的柱子

![](/assets/leetcode300.assets/3.gif)

- 思路一：暴力递归

  ```js
  var largestRectangleArea = function (heights) {
      let max = Number.MIN_VALUE
  
      if (heights.length == 0) return 0
  
      for (let i = 0; i < heights.length; i++) {
          // 柱子本身的情况
          max = Math.max(max, heights[i])
  
          // 找到左边第一根
          let j = i - 1
          for (; j >= 0; j--) if (heights[j] < heights[i]) break
  
          // 找到右边第一根
          let k = i + 1
          for (; k < heights.length; k++) if (heights[k] < heights[i]) break
  
          // 柱子的面积 (k - 1) - (j + 1) + 1
          max = Math.max(max, (k - j - 1) * heights[i])
      }
  
      return max
  };
  ```

- 思路二：单调栈

  这种方法里 -1 的作用是：一根柱子，其他左边界边界等于本身，右边界是3，宽度就是（3 - (-1) - 1）=3
  ![](/assets/leetcode300.assets/4.gif)


  ```js
  const largestRectangleArea = function (heights) {
    let stack = [-1] // 存储下标
  
    let len = heights.length
    let max = 0
  
    for (let i = 0; i < len; i++) {
      // 如果栈的大小大于1(初始有个-1)，且入栈的元素比栈顶元素小，说明栈顶元素的右边界已经找到
      while (stack.length > 1 && heights[i] < heights[stack[stack.length - 1]]) {
        // 栈顶元素的右边界已经找到
        let idx = stack.pop()
        // 左边界 - 右边界 - 1 = 矩形的宽度
        let peek = stack[stack.length - 1]
        let area = (i - peek - 1) * heights[idx]
        max = Math.max(area, max)
      }
      stack.push(i)
    }
  
    while (stack.length > 1) {
      let inx = stack.pop()
      let peek = stack[stack.length - 1]
      max = Math.max((len - peek - 1) * heights[inx], max)
    }
  
    return max
  };
  ```

  



### -[接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

对每一根柱子而言，他所能接到的水是
$$
每一根柱子能接到的水 = Math.min(左边最高的柱子,右边最高的柱子) - (柱子本身的高度)
$$

- 思路一：暴力递归

  ```js
  var trap = function (height) {
    if (height == null || height.length == 0) return null
  
    let res = 0
  
    for (let i = 1; i < height.length - 1; i++) {
      let maxLeft = height[i],
        maxRight = height[i]
      // 找到左边最大的柱子
      for (let j = i - 1; j >= 0; j--) {
        maxLeft = Math.max(maxLeft, height[j])
      }
  
      // 找到右边最大的柱子
      for (let k = i + 1; k < height.length; k++) {
        maxRight = Math.max(maxRight, height[k])
      }
  
      res += (Math.min(maxLeft, maxRight) - height[i])
    }
  
    return res
  };
  ```

- 思路二：单调栈实现
  ![](/assets/leetcode300.assets/5.gif)

  ```js
  var trap = function (height) {
    if (height == null || height.length == 0) return null
  
    let stack = [], // 维护一个从栈底到栈顶是从大到小的栈
      res = 0,
      i = 0
  
    while (i < height.length) {
      while (stack.length !== 0 && height[i] > height[stack[stack.length - 1]]) {
        let index = stack.pop()
        if (stack.length == 0) break	// 左边没有柱子,不可能接到雨水
        let dis = (i - stack[stack.length - 1] - 1) // 栈中间有多个相同的柱子
        let min = Math.min(height[i], height[stack[stack.length - 1]])  // 左右边界较短的
        res = res + dis * (min - height[index]) // 加到总雨水中
      }
  
      stack.push(i++)
    }
    return res
  
  };
  ```

  

## 哈希表和集合 (3)

### -[有效的字母移位词](https://leetcode-cn.com/problems/valid-anagram/)

思路一：暴力hash表

```js
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false

  let hashS = new Map()
  let hashT = new Map()

  for (let i = 0; i < s.length; i++) {
    let v = hashS.get(s[i])
    v === undefined ? hashS.set(s[i], 1) : hashS.set(s[i], v + 1)
  }

  for (let j = 0; j < t.length; j++) {
    let v = hashT.get(t[j])
    v === undefined ? hashT.set(t[j], 1) : hashT.set(t[j], v + 1)
  }

  for (let k = 0; k < s.length; k++) {
    if(hashS.get(s[k]) !== hashT.get(s[k]) || !hashT.get(s[k])) {
      return false
    }
  }

  return true
};
```

### -[字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

思路一：先排序，后取添加到hash表中同类中

```js
var groupAnagrams = function (strs) {
  let map = new Map()

  for(let str of strs) {
    let arr = Array.from(str)
    arr.sort()
    let key = arr.toString()
    let list = map.get(key) ? map.get(key) : []
    list.push(str)
    map.set(key, list)
  }
  return Array.from(map.values())
};
```

思路二：先用数组计算每个字母出现的次数，并把整个数组作为key查询hash表中的同类型

```js
var groupAnagrams = function (strs) {
  if (strs == null || strs.length == 0) return []

  let map = new Map()

  for (let str of strs) {
    let keyArr = new Array(26).fill(0)

    // 计算每个字母出现次数: 0 0 0 0 0 0 1 0 0 1 0 ....
    for (let s of str) keyArr[s.charCodeAt() - 'a'.charCodeAt()]++

    let key = keyArr.toString()
    let resArr = map.has(key) ? map.get(key) : []
    resArr.push(str)
    map.set(key, resArr)
  }

  return Array.from(map.values())
};
```



### -[两数之和](https://leetcode-cn.com/problems/two-sum/)

思路一：暴力解法，拿着一个数去怼出另一个数

```js
var twoSum = function (nums, target) {
  if (nums == null || nums.length == 0) return []

  for (let i = 0; i < nums.length - 1; i++) {

    let val = target - nums[i]

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === val) return [i, j]
    }
  }
};
```

思路二：hash表，上面暴力求解速度慢的原因是在遍历找另外一个数，我们吧已经遍历过的存hash表中，就能用O(1)的时间找到

```js
var twoSum = function (nums, target) {
  if (nums == null || nums.length == 0) return null
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let val = target - nums[i]
    if (map.has(val)) return [map.get(val), i]
    map.set(nums[i], i)
  }
  return []
};
```

### -[快乐数](https://leetcode-cn.com/problems/happy-number/)

- 思路一：哈希表

  ```js
  var isHappy = function (n) {
    let set = new Set()
    while (true) {
      if (set.has(n)) return false
  
      set.add(n)
  
      let arr = Array.from(String(n)),
        sum = 0,
        temp
  
      for (let digit of arr) sum += digit * digit
      temp = sum
      while (temp > 9) temp /= 10
      if (temp === 1) return true
      n = sum
    }
  };
  ```

- 思路二：环形链表思想

  ```js
  function getN(n) {
    let sum = 0,
      temp
  
    while (n > 0) {
      temp = n % 10	// 获得个位的值
      sum += temp * temp	// 向前进一位
      n = Math.floor(n / 10)
    }
  
    return sum
  }
  
  function isHappy(n) {
    let walker = n,
      runner = n
  
    while (runner !== 1) {
      walker = getN(walker)
      runner = getN(getN(runner))
  
      if (walker == runner && walker !== 1) return false
    }
  
    return true
  }
  ```

### -[四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)

- 思路一：哈希表

  ```js
  var fourSumCount = function (nums1, nums2, nums3, nums4) {
    let mapAB = new Map(),
      res = 0
  
    for (let a of nums1) {
      for (let b of nums2) {
        let val = a + b
        mapAB.has(val) ? mapAB.set(val, mapAB.get(val) + 1) : mapAB.set(val, 1)
      }
    }
  
    for (let c of nums3) {
      for (let d of nums4) {
        let val = -c - d
        if (mapAB.has(val)) res += mapAB.get(val)
      }
    }
    
    return res
  };
  ```

### -[赎金信](https://leetcode-cn.com/problems/ransom-note/)

- 思路一：哈希表

  ```js
  var canConstruct = function (ransomNote, magazine) {
    let map = new Map()
  
    for (let s of magazine) map.has(s) ? map.set(s, map.get(s) + 1) : map.set(s, 1)
  
    for (let s of ransomNote) {
      if (map.has(s) && map.get(s) > 0) {
        map.set(s, map.get(s) - 1)
      } else {
        return false
      }
    }
  
    return true
  };
  ```


## 字符串

### -[替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

- 思路一：双指针（for循环+字符串拼接，每次都会创建一个新的字符串，对性能不好，这里用双指针）

  ![](/assets/leetcode300.assets/image-20220211131039507.png)

  ![](/assets/leetcode300.assets/13.gif)

  ```js
  var replaceSpace = function (s) {
    let strArr = Array.from(s),
      count = 0
  
    // 计算空格的数量
    for (const str of s) count += str == ' ' ? 1 : 0
  
    let left = strArr.length - 1,
      right = strArr.length - 1 + count * 2 
  
    while (left >= 0) {
      if (strArr[left] == ' ') {
        strArr[right--] = '0'
        strArr[right--] = '2'
        strArr[right--] = '%'
        left--
      } else {
        strArr[right--] = strArr[left--]
      }
    }
  
    return strArr.join('')
  };
  ```

### -[反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

- 思路一：模拟

  ```js
  var reverseStr = function (s, k) {
    let strArr = Array.from(s),
      length = strArr.length
  
    for (let i = 0; i < length; i += 2 * k) {
      let left = i,
        right = Math.min(i + k, length) - 1
  
      while (left < right) {
        [strArr[left], strArr[right]] = [strArr[right], strArr[left]]
        left++
        right--
      }
    }
  
    return strArr.join('')
  };
  ```


### -[ 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

- 思路一：双指针

  ```js
  var reverseWords = function (s) {
    if (s == null || s.length == 0) return ''
  
    s = Array.from(s)
  
    // 首先反转整个字符串
    reverse(s, 0, s.length - 1)
  	
    // 反转每个单词
    reverseWord(s)
    
    // 去除多余空格
    return cleanSpace(s)
  };
  
  function cleanSpace(s) {
    let i = 0,
      j = 0
  
    while (j < s.length) {
      while (j < s.length && s[j] == ' ') j++
      while (j < s.length && s[j] !== ' ') s[i++] = s[j++]
      while (j < s.length && s[j] === ' ') j++
      if (i < s.length) s[i++] = ' '
    }
  
    return s.slice(0, i).join('')
  }
  
  function reverseWord(s) {
    let i = 0,
      j = 0
  
    while (i < s.length) {
      while (i < s.length && s[i] == ' ') i++
      j = i
      while (j < s.length && s[j] !== ' ') j++
      reverse(s, i, j - 1)
      i = j
    }
  }
  
  function reverse(s, left, right) {
    let i = left,
      j = right
  
    while (i < j) {
      [s[i], s[j]] = [s[j], s[i]]
      i++
      j--
    }
  }
  ```

  

### -[左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

- 思路一：思路和替换空格那题一样，先扩容

  ```js
  var reverseLeftWords = function (s, n) {
    if (s == null || s.length == 0) return ''
  
    let end = s.length,
      strArr = Array.from(s)
  
    for (let i = 0; i < n; i++) {
      strArr[end++] = strArr[i]
    }
  
    return strArr.slice(n).join('')
  };
  ```

### **`==KMP算法==`**

> 油管的阿三哥讲的不错，B站已有大佬翻译：[地址](https://www.bilibili.com/video/BV18k4y1m7Ar?from=search&seid=1278311747782006027&spm_id_from=333.337.0.0)

:key: KMP算法的引用场景是：在主串中找到模式串所在的第一个下标位置，若找不到返回-1

例：在字符串 ‘aabbccddee’ 中找到模式串 'ccd' 的初始下标位置，很明显index为4

- 方法一：BF暴力求解，两层for循环，时间复杂度为O(m * n)

- 方法二：KMP算法求解，时间复杂度为 O(m + n)

  :star: 如何求解KMP算法中的前后缀数组
  ![](/assets/leetcode300.assets/14.gif)

  :star2: 如何用前后缀数组在主串中找到模式串
  ![](/assets/leetcode300.assets/15.gif)



### -[实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

- 思路一：BF算法，效率低，时间复杂度为 O(m * n)

- 思路二：KMP算法

  ```js
  var strStr = function (haystack, needle) {
    if (haystack == null || needle == null || haystack.length < needle.length) return -1
  
    let i = 0,
      j = 0,
      kpmArr = kpmProcess(needle)
  
    while (i < haystack.length && j < needle.length) {
      if (haystack[i] === needle[j]) {
        i++
        j++
      } else if (j > 0) {
        j = kpmArr[j - 1]
      } else {
        i++
      }
    }
  
    return j === needle.length ? i - j : -1
  };
  
  function kpmProcess(pattern) {
    let i = 0,
      j = 1,
      res = new Array(pattern.length).fill(0)
  
    while (j < res.length) {
      if (pattern[i] === pattern[j]) {
        res[j] = i + 1
        i++
        j++
      } else if (i > 0) {
        i = res[i - 1]
      } else {
        j++
      }
    }
  
    return res
  }
  ```

  

### -[重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

- 思路一：KMP算法

  ```js
  var repeatedSubstringPattern = function (s) {
    let parr = getNext("abaababaab")
  
    // 如果next数组最后一位为0,说明没有公共前后缀,没有重复的字串
    if (parr[parr.length - 1] == 0) return false
    // 这一步是验证是否多多个重复子串或者没有某个字串不符合
      // next数组的最后一位存储的是公共前后缀的长度,可以借助这个判断
    if (s.length % (s.length - parr[parr.length - 1]) !== 0) return false
  
    return true
  };
  
  // 构建Next数组
  function getNext(str) {
    let i = 0,
      j = 1,
      res = new Array(str.length).fill(0)
  
    while (j < str.length) {
      if (str[i] === str[j]) {
        res[j] = i + 1
        i++
        j++
      } else if (i > 0) {
        i = res[i - 1]
      } else {
        res[j] = 0
        j++
      }
    }
  
    return res
  }
  ```

## 二叉树（16）

### -[二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

- 思路一：递归

  ```js
  var preorderTraversal = function (root) {
      if (root == null) return []
      let res = []
      function helper(root) {
          res.push(root.val)
          if(root.left !== null) helper(root.left)
          if(root.right !== null) helper(root.right)
      }
      helper(root)
      return res
  };
  ```

- 思路二：迭代

  ```js
  // 写法一:最符合栈先进后出思想的写法
  var preorderTraversal = function (root) {
    if (root == null) return []
  
    let stack = [root],
      res = []
  
    while (stack.length !== 0) {
      let node = stack.pop()
      res.push(node.val)
      if (node.right !== null) stack.push(node.right)
      if (node.left !== null) stack.push(node.left)
    }
  
    return res
  };
  
  // 写法二：通用写法
  var preorderTraversal = function (root) {
    if (root == null) return []
  
    let res = [],
      stack = []
  
    while (root !== null || stack.length > 0) {
      while (root != null) {
        res.push(root.val)
        stack.push(root)
        root = root.left
      }
  
      let node = stack.pop()
  
      if (node.right !== null) {
        root = node.right
      }
    }
  
    return res
  };
  ```

### -[二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

- 思路一：递归

  ```js
  var inorderTraversal = function(root) {
      if (root == null) return []
      let res = []
      function helper(root) {
          if(root.left !== null) helper(root.left)
          res.push(root.val)
          if(root.right !== null) helper(root.right)
      }
      helper(root)
      return res
  };
  ```

- 思路二：迭代

  ```js
  var inorderTraversal = function (root) {
    if (root == null) return []
  
    let res = [],
      stack = []
  
    while (root !== null || stack.length > 0) {
      while (root !== null) {
        stack.push(root)
        root = root.left
      }
  
      let node = stack.pop()
      res.push(node.val)
  
      if (node.right !== null) root = node.right
    }
  
    return res
  };
  ```

### -[二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

- 思路一：递归

  ```js
  var postorderTraversal = function(root) {
      if (root == null) return []
      let res = []
      function helper(root) {
          if(root.left !== null) helper(root.left)
          if(root.right !== null) helper(root.right)
          res.push(root.val)
      }
      helper(root)
      return res
  };
  ```

- 思路二：迭代

  ```js
  var postorderTraversal = function (root) {
    if (root == null) return []
  
    let res = [],
      stack = [],
      prev
  
    while (root !== null || stack.length !== 0) {
      while (root !== null) {
        stack.push(root)
        root = root.left
      }
  
      let node = stack.pop() 
      if (node.right == null || node.right === prev) {
        res.push(node.val)
        prev = node
      } else {
        stack.push(node)
        root = node.right
      }
    }
  
    return res
  };
  ```

### -[二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

- 思路一：队列

  ```js
  var levelOrder = function (root) {
    if (root == null) return []
  
    let queue = [root],
      res = []
  
    while (queue.length !== 0) {
      let arr = [],
        len = queue.length
  
      for (let i = 0; i < len; i++) {
        let node = queue.shift()
        arr.push(node.val)
        if (node.left !== null) queue.push(node.left)
        if (node.right !== null) queue.push(node.right)
      }
  
      res.push(arr)
    }
  
    return res
  };
  ```

### -[二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

- 思路一：深度优先，思路和（找树左下角之和）类似

  ```js
  var rightSideView = function (root) {
    if (root == null) return []
  
    let res = [],
      depth = 0
  
    function helper(root, dep) {
      if (root == null) return null
  
      if (dep > depth) {
        res.push(root.val)
        depth = dep
      }
  
      helper(root.right, dep + 1)
      helper(root.left, dep + 1)
    }
  
    helper(root, 1)
  
    return res
  };
  ```

- 思路二：层级遍历

  ```js
  var rightSideView = function (root) {
    if (root == null) return []
  
    let res = [],
      stack = [root]
  
    while (stack.length > 0) {
      let size = stack.length
  
      for (let i = 0; i < size; i++) {
        let node = stack.shift()
        if (i === size - 1) res.push(node.val)
        if (node.left !== null) stack.push(node.left)
        if (node.right !== null) stack.push(node.right)
      }
    }
  
    return res
  };
  ```

### -[二叉树最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

思路：从下往上遍历，取左右节点中最深的返回给上层的节点

```js
 var maxDepth = function (root) {
 	if (root == null) return 0
 	let lDepth = maxDepth(root.left)
 	let rDepth = maxDepth(root.right)

 	return Math.max(lDepth, rDepth) + 1
 };
```

### -[二叉树最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

- 思路一：递归，这道题和上面这道有点不同，这道题需要判断当前节点是否是子节点（左右节点都为空）

  ```js
  var minDepth = function (root) {
    if (root == null) return 0
  
    function helper(root) {
      if (root == null) return Number.MAX_VALUE
      if (root.left == null && root.right == null) return 1
  
      let leftDepth = helper(root.left),
        rightDepth = helper(root.right)
  
      return Math.min(leftDepth, rightDepth) + 1
    }
  
    return helper(root)
  };
  ```

  ```js
   var minDepth = function (root) {
   	if (root === null) return 0
   	let minDepth = Number.MAX_VALUE
  
   	function helper(root, depth = 1) {
   		if (root === null) return null
   		if (root.left === null && root.right === null && depth < minDepth) {
   			minDepth = depth
   			return
   		}
  
   		helper(root.left, depth + 1)
   		helper(root.right, depth + 1)
   	}
  
   	helper(root)
   	return minDepth
   };
  ```

- 思路二：层级遍历，判断最近的子节点所在的层数

### -[对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

- 思路一：递归，解法和填充下一个右侧节点极为相似

  ```js
   var isSymmetric = function (root) {
   	if (root == null) return true
  
   	function helper(lRoot, rRoot) {
   		if (lRoot === null && rRoot === null) return true
   		if (lRoot === null || rRoot === null) return false
   		if (lRoot.val !== rRoot.val) return false
  
          // 这一步就是同时前序(反转前序)遍历左右子树
   		return helper(lRoot.left, rRoot.right) && helper(lRoot.right, rRoot.left)
   	}
  
   	return helper(root.left, root.right)
   };
  ```

  



### -[填充节点下一个右侧节点](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

- 思路一：队列

- 思路一：递归

  ![](/assets/leetcode300.assets/4.gif)
  
  ```js
  var connect = function (root) {
    if (root == null) return root
  
    function helper(root1, root2) {
      if (root1 == null || root2 == null) return
      root1.next = root2
      helper(root1.right, root2.left)
      helper(root1.left, root1.right)
      helper(root2.left, root2.right)
    }
  
    helper(root.left, root.right)
  
    return root
  };
  ```

### -[填充节点下一个右侧节点Ⅱ](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/)

- 思路一：队列

  ```js
  var connect = function (root) {
    if (root === null) return root
  
    let stack = [root]
  
    while (stack.length > 0) {
      let size = stack.length,
        prev = null
  
      for (let i = 0; i < size; i++) {
        let node = stack.shift()
        if (node.left !== null) stack.push(node.left)
        if (node.right !== null) stack.push(node.right)
        if (prev == null) {
          prev = node
          continue
        }
        prev.next = node
        prev = node
      }
    }
  
    return root
  };
  ```

### -[翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

- 思路一：递归

  ```js
   var invertTree = function (root) {
   	if (root === null) return null
   	let temp = root.left
   	root.left = root.right
   	root.right = temp
  
   	invertTree(root.left)
   	invertTree(root.right)
  
   	return root
   };
  ```

- 思路二：迭代

  ```js
  var invertTree = function (root) {
    if (root == null) return root
  
    let queue = [root]
  
    while (queue.length !== 0) {
      let size = queue.length
  
      for (let i = 0; i < size; i++) {
        let node = queue.shift(),
         temp = node.left
  
        node.left = node.right
        node.right = temp
  
        if (node.left !== null) queue.push(node.left)
        if (node.right !== null) queue.push(node.right)
  
      }
    }
  
    return root
  };
  ```

### -[二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

- 思路一：递归

  ```js
  var binaryTreePaths = function (root) {
    if (root == null) return []
  
    let res = []
  
    function helper(root, prePath) {
      if (root.left == null && root.right == null) return res.push(prePath + root.val)
      let path = prePath + root.val + '->'
      if (root.left !== null) helper(root.left, path)
      if (root.right !== null) helper(root.right, path)
    }
  
    helper(root, '')
  
    return res
  };
  ```

### -[平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

- 思路一：递归

  ```js
  var isBalanced = function (root) {
    if (root == null) return true
  
    function helper(root) {
      if (root == null) return 0
      if (root.left == null && root.right == null) return 1
  
      let leftHeight = helper(root.left),
        rightHeight = helper(root.right)
  
      if (leftHeight == -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1
      } else {
        return Math.max(leftHeight, rightHeight) + 1
      }
    }
  
    return helper(root) === -1 ? false : true
  };
  ```

  

### -[完全二叉树节点的个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

思路：

1. 计算一颗普通二叉树用递归即可

2. 计算一颗满二叉树，计算它的高度**h**，总节点个数就是
   $$
   满二叉树节点 = 2^h - 1
   $$

   ```js
   // 树的高度,根节点为1
   let countNodes = function (root) {
       let h = 0
   
       while (root !== null) {
           h += 1
           root = root.left
       }
   
       return Math.pow(2, h) - 1
   }
   ```

3. 结合上面两种方式，满二叉树的部分就用公式计算，完全二叉树部分递归计算

   ![](/assets/leetcode300.assets/image-20220104173746357.png)

   ```js
    let countNodes = function (root) {
    	let lNode = root,
    		rNode = root
   
    	let lH = 0,
    		rH = 0
   
    	while (lNode !== null) {
    		lNode = lNode.left
    		lH += 1
    	}
   
    	while (r !== null) {
    		rNode = rNode.right
    		rH += 1
    	}
   
    	if (lH === rH) return Math.pow(2, rH) - 1
   
    	return 1 + countNodes(root.left) + countNodes(root.right)
    }
   ```

### -[左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

- 思路一：递归，利用好递归函数可以传值的特性

  ```js
  var sumOfLeftLeaves = function (root) {
    if (root == null) return 0
  
    let sum = 0
  
    function helper(root, isLeft) {
      if (root === null) return
      if (root.left == null && root.right == null && isLeft) sum += root.val
  
      if (root.left !== null) helper(root.left, true)
      if (root.right !== null) helper(root.right, false)
    }
  
    helper(root, false)
  
    return sum
  };
  ```

### -[找树左下角的值](https://leetcode-cn.com/problems/find-bottom-left-tree-value/)

- 思路一：递归，利用好递归函数可以传值的特性

  ```js
  var findBottomLeftValue = function (root) {
    let val = 0,
      depths = 0
  
    function helper(root, dep) {
      if (root == null) return
  
      if (dep > depths) {
        val = root.val
        depths = dep
      }
  
      if (root.left !== null) helper(root.left, dep + 1)
      if (root.right !== null) helper(root.right, dep + 1)
    }
  
    helper(root, 1)
  
    return val
  };
  ```

### -[路径总和](https://leetcode-cn.com/problems/path-sum/)

- 思路一：递归，利用好递归函数可以传值的特性

  ```js
  var hasPathSum = function (root, targetSum) {
    if (root === null) return false
  
    function helper(root, value) {
      if (root == null) return false
  
      let sum = root.val + value
      if (root.left == null && root.right == null) {
        if (targetSum === sum) return true
      }
  
      return helper(root.left, sum) || helper(root.right, sum)
    }
  
    return helper(root, 0)
  };
  ```


### -[通过前序遍历和中序遍历构造](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

- 思路一：模拟

  ![image-20220101212241603](/assets/leetcode300.assets/image-20220101212241603.png)

  ```js
   var buildTree = function (preorder, inorder) {
   	function helper(preArr, preStart, preEnd, inArr, inStart, inEnd) {
   		// 左边界大于有边界
   		if (preStart > preEnd || inStart > inEnd) return null
   		// 当前数组只有一个节点
   		if (preStart === preEnd) return new TreeNode(preArr[preStart])
  
   		let rootVal = preArr[preStart]
  
   		// 在中序中找到节点
   		let index = 0
   		for (let i = inStart; i <= inEnd; i++) {
   			if (inArr[i] === rootVal) {
   				index = i
   				break
   			}
   		}
  
   		let root = new TreeNode(rootVal)
   		let leftSize = index - inStart
  
   		root.left = helper(preArr, preStart + 1, preStart + leftSize, inArr, inStart, index - 1)
   		root.right = helper(preArr, preStart + leftSize + 1, preEnd, inArr, index + 1, inEnd)
  
   		return root
   	}
  
   	return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)
   };
  ```

### -[通过中序遍历和后序遍历构造](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

- 思路一：模拟![image-20220101212419517](C:\Users\12109\AppData\Roaming\Typora\typora-user-images\image-20220101212419517.png)

  ```js
  var buildTree = function (inorder, postorder) {
      function helper(postArr, postStart, postEnd, inArr, inStart, inEnd) {
          if (inStart > inEnd) return null
          if (postStart === postEnd) return new TreeNode(preArr[preStart])
          
          let rootVal = postArr[postEnd]
  
          let index
          for (let i = inStart; i <= inEnd; i++) {
              if (inArr[i] === rootVal) {
                  index = i
                  break
              }
          }
  
          let leftSize = index - inStart
          let root = new TreeNode(rootVal)
          root.left = helper(postArr, postStart, postStart + leftSize - 1, inArr, inStart, index - 1)
          root.right = helper(postArr, postStart + leftSize , postEnd - 1, inArr, index + 1, inEnd)
          return root
      }
  
      return helper(postorder, 0, postorder.length - 1, inorder, 0, inorder.length - 1)
  };
  ```

### -[通过前序遍历和后续遍历构造](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)

- 思路一：模拟，需要借助左节点来确定位置

  ```js
   var constructFromPrePost = function (preorder, postorder) {
   	function helper(preArr, preStart, preEnd, postArr, postStart, postEnd) {
   		if (preStart > preEnd || postStart > postEnd) return null
  		 if(preStart === preEnd) return new TreeNode(preArr[preStart])
  
   		let rootVal = preArr[preStart]
  
   		let leftNodeVal = preArr[preStart + 1]
   		let index = null
   		for (let i = 0; i <= postEnd; i++) {
   			if (postArr[i] === leftNodeVal) {
   				index = i
   				break
   			}
   		}
  
   		let root = new TreeNode(rootVal)
   		let leftSize = index - postStart
   		root.left = helper(preArr, preStart + 1, preStart + 1 + leftSize, postArr, postStart, postStart + leftSize)
   		root.right = helper(preArr, preStart + leftSize + 2, preEnd, postArr, postStart + leftSize + 1, postEnd)
  
   		return root
   	}
  
   	return helper(preorder, 0, preorder.length - 1, postorder, 0, postorder.length - 1)
   };
  ```

### -[二叉搜索子树的最大键值和](https://leetcode-cn.com/problems/maximum-sum-bst-in-binary-tree/)

- 思路一：递归

  ```js
  var maxSumBST = function (root) {
    if (root == null) return 0
  
    let maxVal = 0
  
    function helper(root) {
      if (root === null) return null
  
      let leftTree = helper(root.left),
        rightTree = helper(root.right)
  
      if (leftTree === false || rightTree === false) return false
      if ((root.left !== null && root.left.val > root.val) || (root.right !== null && root.right.val < root.val)) return false
  
      if (leftTree && leftTree[1] !== undefined && leftTree[1] >= root.val) return false
      if (rightTree && rightTree[2] !== undefined && rightTree[2] <= root.val) return false
  
      let sum = root.val + (leftTree == null ? 0 : leftTree[0]) + (rightTree == null ? 0 : rightTree[0])
      maxVal = Math.max(sum, maxVal)
  
      // 这里不用当心子节点的值比root值大或者小,应为如是是这种情况,已经返回false了
      return [sum, root.right == null ? root.val : root.right.val , root.left === null ? root.val : root.left.val]
    }
  
    helper(root)
  
    return maxVal
  };
  ```

  

### -[构造最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

- 思路一：递归

  ```js
   var constructMaximumBinaryTree = function (nums) {
   	function helper(arr, left, right) {
   		if (left > right) return null
  
   		let maxVal = arr[left],
   			mid = left
   		for (let i = left + 1; i <= right; i++) {
   			if (arr[i] > maxVal) {
   				maxVal = arr[i]
   				mid = i
   			}
   		}
  
   		let node = new TreeNode(maxVal)
  
   		node.left = helper(arr, left, mid - 1)
   		node.right = helper(arr, mid + 1, right)
  
   		return node
   	}
  
   	return helper(nums, 0, nums.length - 1)
   };
  ```

### -[合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

- 思路一：递归

  ```js
  var mergeTrees = function (root1, root2) {
    if (root1 == null) return root2
    if (root2 == null) return root1
  
    let rootNode = new TreeNode(root1.val + root2.val)
  
    rootNode.left = mergeTrees(root1.left, root2.left)
    rootNode.right = mergeTrees(root1.right, root2.right)
  
    return rootNode
  };
  ```

### -[二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

- 思路一：递归

  ```js
  var searchBST = function (root, val) {
    if (root === null) return null
  
    function helper(root, val) {
      if (root === null) return null
      if (root.val === val) {
        return root
      } else if (root.val > val) {
        return helper(root.left, val)
      } else {
        return helper(root.right, val)
      }
    }
  
    return helper(root, val)
  };
  ```

### -[验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

方法一：迭代，二叉搜索树中序遍历必然有序

```js
var isValidBST = function (root) {
  let prevVal = null,
    isValid = true

  function helper(root) {
    if (root.left !== null) helper(root.left)
    if (prevVal !== null && root.val < prevVal) return isValid = false
    prevVal = root.val
    if (root.right !== null) helper(root.right)
  }

  helper(root)

  return isValid
};
```

方法二：递归

```js
 var isValidBST = function (root) {
 	function helper(root, min, max) {
		if(root == null) return true

		if(min !== null && root.val <= min.val) return false
		if(max !== null && root.val >= max.val) return false

		return helper(root.left, min, root) && helper(root.right, root, max)
 	}

 	return helper(root, null, null)
 }
```

### -[二叉搜索树的最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)

- 思路一：中序遍历，利用二叉搜索树的特性

  ```js
  var getMinimumDifference = function (root) {
    let stack = [],
      prevVal = null,
      minVal = Number.MAX_VALUE
  
    while (root !== null || stack.length !== 0) {
      while (root !== null) {
        stack.push(root)
        root = root.left
      }
  
      let node = stack.pop()
      if (prevVal !== null) {
        minVal = Math.min(minVal, node.val - prevVal)
      }
      prevVal = node.val
      if (node.right !== null) {
        root = node.right
      }
    }
  
    return minVal
  };
  ```

  

### -[二叉搜索树中的众数](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

- 思路一：哈希表

  ```
  var findMode = function (root) {
    if (root == null) return null
  
    let map = new Map()
  
    function helper(root) {
      if (root.left !== null) helper(root.left)
      map.has(root.val) ? map.set(root.val, map.get(root.val) + 1) : map.set(root.val, 1)
      if (root.right !== null) helper(root.right)
    }
  
    helper(root)
  
    let maxCount = map.get(root.val),
      res = []
  
    for (let [key, val] of map) {
      if (val === maxCount) {
        res.push(key)
      }
  
      if (val > maxCount) {
        res = []
        res.push(key)
        maxCount = val
      }
    }
  
    return res
  };
  ```

- 思路二：依靠中序遍历的特性

  ```js
  var findMode = function (root) {
    if (root == null) return null
  
    let count = 0,
      maxCount = 0,
      prev = root,
      res = []
  
    function helper(root) {
      if (root == null) return null
      if (root.left !== null) helper(root.left)
  
      count = prev.val === root.val ? count + 1 : 1
      prev = root
      if (count === maxCount) res.push(root.val)
  
      if (count > maxCount) {
        res = []
        maxCount = count
        res.push(root.val)
      }
  
      if (root.right !== null) helper(root.right)
    }
  
    helper(root)
  
    return res
  };
  ```

### -[二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

- 思路一：递归

  ```js
  var lowestCommonAncestor = function (root, p, q) {
    if (root == null) return null
  
    function helper(root, p, q) {
      if (root == null) return null
      if (root == p || root == q) return root
  
      let leftNode = helper(root.left, p, q),
        rightNode = helper(root.right, p, q)
  
      if (leftNode !== null && rightNode !== null) return root
      if (leftNode !== null) return leftNode
      if (rightNode !== null) return rightNode
      return null
    }
  
    return helper(root, p, q)
  };
  ```

### -[二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

- 思路一：递归

  ```js
  var lowestCommonAncestor = function (root, p, q) {
    function helper(root, p, q) {
      if (root == null) return null
  
      if (root.val > p.val && root.val < q.val) return root
      if (root.val > q.val && root.val < p.val) return root
      if (root.val === q.val) return root
      if (root.val === p.val) return root
  
      return helper(root.left, p, q) || helper(root.right, p, q)
    }
  
    return helper(root, p, q)
  };
  ```

### -[二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

- 思路一：递归

  ```js
  var insertIntoBST = function (root, val) {
      if (root == null) return new TreeNode(val)
  
      if (val > root.val) {
        root.right = insertIntoBST(root.right, val)
      } else {
        root.left = insertIntoBST(root.left, val)
      }
  
      return root
  };
  ```

### -[把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

- 思路一：递归

  ```js
  var convertBST = function (root) {
    if (root == null) return root
  
    let prevVal = 0
  
    function helper(root) {
      if (root.right) helper(root.right)
      root.val += prevVal
      prevVal = root.val
      if (root.left) helper(root.left)
    }
  
    helper(root)
  
    return root
  };
  ```

### -[将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

- 思路一：递归

  ```js
  var sortedArrayToBST = function (nums) {
    if (nums == null) return null
  
    function helper(nums, left, right) {
      if (left > right) return null
      if (left === right) return new TreeNode(nums[left])
      let mid = (left + right) >>> 1,
        root = new TreeNode(nums[mid])
  
      root.left = helper(nums, left, mid - 1)
      root.right = helper(nums, mid + 1, right)
  
      return root
    }
  
    return helper(nums, 0, nums.length - 1)
  };
  ```

### -[修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

- 思路一：递归

  ```js
  var trimBST = function (root, low, high) {
    if (root == null) return root
  
    function helper(root, low, high) {
      if (root == null) return null
  
      if (root.val < low) {
        return helper(root.right, low, high)
      }
  
      if (root.val > high) {
        return helper(root.left, low, high)
      }
  
      root.left = helper(root.left, low, high)
      root.right = helper(root.right, low, high)
  
      return root
    }
  
    return helper(root, low, high)
  };
  ```

### -[删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

- 思路一：递归

  ```js
  // 获得二叉树中的最小节点
  function getMin(node) {
      while (node.left !== null) {
          node = node.left
      }
      return node
  }
  
  var deleteNode = function (root, key) {
      if (root === null) return null
      if (root.val === key) {	// 找到被删除的节点
          if (root.left == null) return root.right	// 左节点为空，默认只有一个节点，所以返回右节点
          if (root.right == null) return root.left	// 左节点有值，右节点没值，只有一个子节点，返回左节点
  
          let mindNode = getMin(root.right)	// 有两个子节点，找到右子树中的最小值
  
          root.right = deleteNode(root.right, mindNode.val)	// 删除右子树中的最小值
          mindNode.left = root.left	// 把已经删除最小值的原来被删除节点上的左右节点嫁接到右子树的最小值的左右两侧
          mindNode.right = root.right// 把已经删除最小值的原来被删除节点上的左右节点嫁接到右子树的最小值的左右两侧
          root = mindNode	// 替换当前整个被删除的节点并返回
      } else if (root.val > key) {	// 往左子树找
          root.left = deleteNode(root.left, key)
      } else {	// 往右子树找
          root.right = deleteNode(root.right, key)
      }
  
      return root
  };
  ```
  
  

### ---------------

### -二叉树展开为链表

> [力扣地址](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

思路：从后往前拉

```js
 var flatten = function (root) {
 	if (root === null) return null
 	if (root.left === null && root.right === null) return null

 	flatten(root.left)	// 把右子树拉平
 	flatten(root.right)	// 把左子树拉平

 	let left = root.left
 	let right = root.right

 	root.left = null
 	root.right = left

 	let currentNode = root
 	while (currentNode.right !== null) {
		currentNode = currentNode.right
 	}

 	currentNode.right = right

 	return root
 };
```

### -寻找重复的子树

> 力扣地址：https://leetcode-cn.com/problems/find-duplicate-subtrees/submissions/

思路：用hash表记录所有树的结构

```js
 var findDuplicateSubtrees = function (root) {
 	let hashMap = new Map(),
 		res = []

 	function helper(root) {
 		if (root === null) return '#'

 		let leftTree = helper(root.left)
 		let rightTree = helper(root.right)

 		// 根左右
 		let tree = root.val + ',' + leftTree + ',' + rightTree
 		// 存入hash表
 		if (hashMap.has(tree)) {
 			if (!hashMap.get(tree)) {
 				res.push(root)
 				hashMap.set(tree, true)
 			}
 		} else {
 			hashMap.set(tree, false)
 		}
 		return tree
 	}

 	helper(root)
 	return res
 };
```

### -[二叉树的序列化和反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

思路：首先用（先|后，中序遍历不行，因为无法得到根节点）字符串序列化二叉树，空节点用#标识

```js
 // 前序序列化
 var serialize = function (root) {
 	if (root === null) return '#'
 	let str = ''

 	function helper(root) {
 		if (root === null) return str += '#,'

 		str += `${root.val},`
 		helper(root.left)
 		helper(root.right)
 	}
 	helper(root)
 	return str.slice(0, str.length - 1)
 };

 // 前序反序列化
 var deserialize = function (data) {
 	let dataArr = data.split(',')

 	function helper(dataArr) {
 		if (dataArr[0] === '#') {
 			dataArr.shift()
 			return null
 		}
 		const node = new TreeNode(dataArr.shift())
 		node.left = helper(dataArr)
 		node.right = helper(dataArr)

 		return node
 	}

 	return helper(dataArr)
 };
```

```js
// 后序序列化
var serialize = function (root) {
 	if (root === null) return '#'
 	let str = ''

 	function helper(root) {
 		if (root === null) return str += '#,'

 		helper(root.left)
 		helper(root.right)
 		str += `${root.val},`
 	}
 	helper(root)
 	return str.slice(0, str.length - 1)
 };

 var deserialize = function (data) {
 	let dataArr = data.split(',')

 	function helper(dataArr) {
 		if (dataArr[dataArr.length - 1] === '#') {
 			dataArr.pop()
 			return null
 		}
 		const node = new TreeNode(dataArr.pop())
 		node.right = helper(dataArr)
 		node.left = helper(dataArr)
 		return node
 	}

 	return helper(dataArr)
 };
```

### -[二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

思路：中序遍历第k个元素

```js
var kthSmallest = function (root, k) {
 	let index = 0,
 		val = null

 	function helper(root) {
 		if (root === null) return
 		helper(root.left)
 		if (++index === k) {
 			val = root.val
 			return
 		}
 		helper(root.right)
 	}
	 helper(root)

 	return val
 };
```

## 回溯算法

### -[组合](https://leetcode-cn.com/problems/combinations/)

- 思路一：回溯算法

  ![](/assets/leetcode300.assets/image-20220303155304433.png)

  ```js
  var combine = function (n, k) {
    if (n <= 0 || k <= 0) return
  
    let res = [],
      path = []
  
    dfs(n, k, 1, path, res)
  
    return res
  };
  
  function dfs(n, k, start, path, res) {
    if (path.length === k) {
      /// 结束 回溯操作
      res.push([...path])
      return
    }
  
    for (let i = start; i <= n; i++) {
      // 固定一个值操作
      path.push(i)
      // 进入下一层，固定下一个数
      dfs(n, k, i + 1, path, res)
      // 进行下一种情况
      path.pop()
    }
  }
  ```

  剪枝操作

  ![](/assets/leetcode300.assets/image-20220303160812074.png)

  ```js
  var combine = function (n, k) {
    if (n <= 0 || k <= 0) return
  
    let res = [],
      path = []
  
    dfs(n, k, 1, path, res)
    return res
  };
  
  function dfs(n, k, start, path, res) {
    if (path.length === k) {
      res.push([...path])
      return
    }
  
    // 剪枝操作
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      dfs(n, k, i + 1, path, res)
      path.pop()
    }
  }
  ```

### -[组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

- 思路一：回溯，和上面的区别是单个数字不能重复使用（用三数之和的去重套路）

  ```js
  var combinationSum2 = function (candidates, target) {
    if (candidates.length == 0) return []
  
    let res = [],
      path = [],
      sum = 0
  
    candidates.sort((a, b) => a - b)
    dfs(candidates, target, 0, sum, path, res)
  
    return res
  };
  
  function dfs(n, target, start, sum, path, res) {
    if (sum > target) return
    if (sum === target) {
      res.push([...path])
      return
    }
  
    for (let i = start; i < n.length; i++) {
      if (i > start && n[i] === n[i - 1]) continue
  
      sum += n[i]
      path.push(n[i])
  
      dfs(n, target, i + 1, sum, path, res)
  
      sum -= path.pop()
    }
  }
  ```

### -[组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

- 思路一：回溯

  ```js
  var combinationSum3 = function (k, n) {
    if (n <= 0 || k <= 0) return
  
    let path = [],
      res = []
  
    dfs(n, k, 1, 0, path, res)
  
    return res
  };
  
  function dfs(n, k, start, sum, path, res) {
    if (path.length === k) {
      if (sum === n) {
        res.push([...path])
      }
      return
    }
  
    // 剪枝
    for (let i = start; i <= 9 - (k - path.length) + 1; i++) {
      path.push(i)
      sum += i
      dfs(n, k, i + 1, sum, path, res)
      sum -= path.pop()
    }
  ```


### -[电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

- 思路一：回溯

  ![image-20220307105043599](/assets/leetcode300.assets/image-20220307105043599.png)

  ```js
  var letterCombinations = function (digits) {
    if (digits.length == 0) return []
  
    let data = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'],
      res = [],
      path = []
  
    dfs(digits, digits.length, 0, path, res, data)
    return res
  };
  
  function dfs(n, k, start, path, res, data) {
    if (path.length == k) {
      res.push(res)
      return
    }
  
    for (let v of data[n[start]]) {
      path.push(v)
      dfs(n, k, start + 1, path, res, data)
      path.pop()
    }
  }
  ```

### -[组合总和](https://leetcode-cn.com/problems/combination-sum/)

- 回溯

  ![image-20220307140032725](/assets/leetcode300.assets/image-20220307140032725.png)

  ```js
  var combinationSum = function (candidates, target) {
    if (candidates.length === 0) return []
  
    let path = [],
      res = [],
      sum = 0
  
    dfs(candidates, target, 0, path, sum, res)
  
    return res
  };
  
  function dfs(n, k, start, path, sum, res) {
    if (sum === k) {
      res.push([...path])
      return
    }
  
    if (sum > k) return
  
    for (let i = start; i < n.length; i++) {
      path.push(n[i])
      sum += n[i]
      dfs(n, k, i, path, sum, res)
      sum -= path.pop()
    }
  }
  ```


### -[分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

- 思路一：回溯

  ![image-20220308115708202](/assets/leetcode300.assets/image-20220308115708202.png)

  ```js
  var partition = function (s) {
    if (s.length <= 0) return
  
    let res = [],
      path = []
  
    dfs(s, 0, path, res)
  
    return res
  };
  
  function dfs(s, start, path, res) {
    if (start === s.length) {
      res.push([...path])
      return
    }
  
  
    for (let i = start; i < s.length; i++) {
      if (isReverse(s, start, i)) {
        path.push(s.substring(start, i + 1))
        dfs(s, i + 1, path, res)
        path.pop()
      }
    }
  }
  
  function isReverse(s, l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }
  
    return true
  }
  ```


### -[复原 IP 地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

- 思路一：回溯

  ![](/assets/leetcode300.assets/image-20220310142239305.png)

  ```js
  var restoreIpAddresses = function (s) {
    let res = [],
      path = []
  
    dfs(s, 0, 1, path, res)
  
    return res
  };
  
  function dfs(n, start, level, path, res) {
    if (level > 5) return
    if (level == 5) {
      res.push(path.join('.'))
      return
    }
  
    for (let i = start; i < start + 3; i++) {
      if (i >= n.length) continue
  
      let str = n.substring(start, i + 1)
  
      // 剩余数字个数超过最大值(255.255.255.255)共12个
      if ((n.length - start) - str.length > 12 - level * 3) continue
      // 当前一个小ip值超过255
      if (+str > 255) continue
      // 开头为0的ip 011.231.233.222
      if (str.length > 1 && str[0] == '0') continue
  
      path.push(str)
  
      dfs(n, i + 1, level + 1, path, res)
  
      path.pop()
    }
  }
  ```

### -[子集](https://leetcode-cn.com/problems/subsets/)

- 思路一：回溯，就是记录回溯过程中产生的值

  ![](/assets/leetcode300.assets/image-20220310150924037.png)

  ```js
  var subsets = function (nums) {
    let res = [],
      path = []
  
    dfs(nums, 0, path, res)
  
    return res
  };
  
  function dfs(n, start, path, res) {
    res.push([...path])
    for (let i = start; i < n.length; i++) {
      path.push(n[i])
  
      dfs(n, i + 1, path, res)
  
      path.pop()
    }
  }
  ```

### -[子集 II](https://leetcode-cn.com/problems/subsets-ii/)

- 思路一：回溯，用三数之和的方法去除重复项

  ```js
  var subsetsWithDup = function (nums) {
    let res = [],
      path = []
  
    nums.sort((a, b) => a - b)
    dfs(nums, 0, path, res)
  };
  
  function dfs(n, start, path, res) {
    res.push([...path])
  
    for (let i = start; i < n.length; i++) {
      if (i > start && n[i] == n[i - 1]) continue
      path.push(n[i])
  
      dfs(n, i + 1, path, res)
  
      path.pop()
    }
  }
  ```

### -[递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/)

- 思路一：回溯

  ```js
  var findSubsequences = function (nums) {
    let res = [],
      path = []
  
    dfs(nums, 0, path, res)
  
    return res
  };
  
  function dfs(n, start, path, res) {
    if (path.length > 1) {
      res.push([...path])
    }
  
    let used = new Set()
    for (let i = start; i < n.length; i++) {
      if (path.length > 0 && n[i] < path[path.length - 1] || used.has(n[i])) continue
  
      used.add(n[i])
      path.push(n[i])
  
      dfs(n, i + 1, path, res)
  
      path.pop()
    }
  }
  ```

### -[全排列](https://leetcode-cn.com/problems/permutations/)

- 思路一：回溯

  ![image-20220314090359082](/assets/leetcode300.assets/image-20220314090359082.png)

  ![image-20220314090418173](/assets/leetcode300.assets/image-20220314090418173.png)

  ```js
  var permute = function (nums) {
    if (nums.length == 0) return []
  
    let path = [],
      res = []
  
    dfs(nums, path, res)
  
    return res
  
  };
  
  function dfs(n, path, res) {
    if (path.length == n.length) {
      res.push([...path])
      return
    }
  
    for (let i = 0; i < n.length; i++) {
      let temp = n[i]
      if (temp == null) continue
      path.push(temp)
      n[i] = null
  
      dfs(n, path, res)
  
      n[i] = temp
      path.pop()
    }
  }
  ```
  

### -[全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

- 思路一：回溯+排序+三数之和法去重

  ```js
  var permuteUnique = function (nums) {
    if (nums.length == 0) return []
  
    let res = [],
      path = []
  
    nums.sort((a, b) => a - b)
  
    dfs(nums, path, res)
  
    return res
  };
  
  function dfs(nums, path, res) {
    if (path.length === nums.length) {
      res.push([...path])
      return
    }
  
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue
  
      let temp = nums[i]
      if (temp == null) continue
      path.push(temp)
      nums[i] = null
  
      dfs(nums, path, res)
  
      nums[i] = temp
      path.pop()
    }
  }
  ```
  
- 思路二：回溯+哈希去重法

  ```js
  var permuteUnique = function (nums) {
  	if (nums.length == 0) return
  
  	let path = [],
  		res = []
  
  	dfs(nums, path, res)
  
  	return res
  };
  
  function dfs(nums, path, res) {
  	if (nums.length == path.length) {
  		res.push([...path])
  		return
  	}
  
  	let set = new Set()
  	for (let i = 0; i < nums.length; i++) {
  		let val = nums[i]
  		if (val == null) continue
  		if (set.has(val)) continue
  		set.set(val)
  		nums[i] = null
  
  		dfs(nums, res, path)
  
  		nums[i] = path.pop()
  	}
  }
  ```

  

### -[重新安排行程](https://leetcode-cn.com/problems/reconstruct-itinerary/)

- 思路一：回溯

  ```js
  function findItinerary(tickets) {
    let res = ['JFK']
    let map = new Map()
  
    for (let [from, to] of tickets) {
      let arr = map.get(from) || []
  
      arr.push(to)
      map.set(from, arr)
    }
  
    for (let arr of map.values()) arr.sort()
  
    dfs(tickets.length, map, res)
    return res
  }
  
  
  function dfs(k, map, res) {
    if (res.length == k + 1) return true
  
    let toCity = map.get(res[res.length - 1])
    // 当一个起始点的终点有多个,多个终点的第一个为末尾尾航班,需要回溯
    if (toCity == null) return false
  
    for (let i = 0; i < toCity.length; i++) {
      let city = toCity[i]
      if (city == null) continue
      toCity[i] = null
      res.push(city)
  
      // 找到完整航线,直接返回
      if (dfs(k, map, res)) return true
  
      toCity[i] = res.pop()
    }
  }
  ```

### -[N 皇后](https://leetcode-cn.com/problems/n-queens/)

- 思路一：回溯法

  ```js
  var solveNQueens = function (n) {
    let board = [],
      res = []
  
    dfs(n, 0, board, res)
  
    return res
  };
  
  function dfs(n, row, board, res) {
    // 拼接皇后
    if (row == n) {
      let arr = []
      for (let i = 0; i < n; i++) {
        let str = ''
        for (let j = 0; j < n; j++) {
          str += j == board[i] ? 'Q' : '.'
        }
        arr.push(str)
      }
      res.push(arr)
    }
  
    for (let i = 0; i < n; i++) {
      if (!isValidQ(row, i, board)) continue
      // 这里用数组代表棋盘，索引为行位置，值为列位置；现有数组为[0, 2, 1], 意思就为(0,0)(1,2)(2,1)处有皇后
      board[row] = i
      // 进入下一行摆放皇后
      dfs(n, row + 1, board, res)
      board.pop()
    }
  }
  
  function isValidQ(row, col, board) {
    // 遍历存放皇后坐标的数组，运用公式判断当前皇后是否被攻击
    for (let i = 0; i < board.length; i++) {
      // 是否被从上方攻击
      if (col == board[i]) return false
  
      // 是否被从左上攻击
      if (row - col == i - board[i]) return false
  
      // 是否被从右上攻击
      if (row + col == i + board[i]) return false
    }
  
    return true
  }
  ```
  

### -[解数独](https://leetcode-cn.com/problems/sudoku-solver/)

- 思路一：解数独

  ```js
  function solveSudoku(board) {
    dfs(0, 0, board)
  
    return board
  };
  
  function dfs(row, col, board) {
    for (let i = row; i < 9; i++) {
      for (let j = col; j < 9; j++) {
        if (board[i][j] !== '.') continue
        for (let k = 1; k <= 9; k++) {
          let val = k + ''
          // 非法数字，跳过
          if (!isValid(i, j, val, board)) continue
          board[i][j] = val
          // 找到了一组可行解
          if (dfs(i, j + 1, board)) return true
          board[i][j] = '.'
        }
        // 9个数都试过了
        return false
      }
    }
  
    return true
  }
  
  function isValid(row, col, val, board) {
    // 检查行重复
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val) return false
    }
  
    // 检查列重复
    for (let j = 0; j < 9; j++) {
      if (board[j][col] === val) return false
    }
  
    // 检查正方形内重复
    let rowStart = Math.floor(row / 3) * 3,
      colStart = Math.floor(col / 3) * 3
  
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (board[i][j] === val) return false
      }
    }
  
    return true
  }
  ```

### **`==回溯去重技巧==`**

回溯去重技巧有两种：

1. 使用三数之和去重方法【需要排序，不需要额外空间】：

   第一步：排序

   第二步：`if (i > 0 && num[i] == num[i - 1]) continue`

   > 题目：全排列||，子集 II，组合总和 II

2. 使用数组去重【不用排序，需要额外空间】：

   第一步：在每一层都创建一个Set，用于存放本层已经用过的数组

   第二步：每次横向for遍历整颗树的时候，要在set里判断是否已经使用数组

   > 题目：递增子序列，全排列||

## 贪心算法

贪心算法的本质是 ：**通过局部最优达成全局最优**

### -[分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

- 思路一：贪心

  ```js
  function findContentChildren(g: number[], s: number[]): number {
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
  
    let lenOfChild: number = g.length,
      lenOfCookie: number = s.length
  
    let count: number = 0
  
    for (let i: number = 0, j: number = 0; i < lenOfChild && j < lenOfCookie; i++, j++) {
      while (j < lenOfCookie && g[i] > s[j]) {
        j++
      }
      if (j < lenOfCookie) {
        count++
      }
    }
    return count
  };
  ```

### -[摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/)

- 思路一：贪心

  ![image-20220322153254369](/assets/leetcode300.assets/image-20220322153254369.png)

  ```js
  function wiggleMaxLength(nums: number[]): number {
    if (nums.length <= 1) return nums.length
  
    let up: number = 1,
      down: number = 1
  
  
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[i - 1]) {
        up = down + 1	// 遇到相同情况都会保持
      } else if (nums[i] < nums[i - 1]) {
        down = up + 1	// 遇到相同情况都会保持
      }
    }
  
    return Math.max(up, down)
  };
  ```

  

### -[合并区间](https://leetcode-cn.com/problems/merge-intervals)

- 思路一：排序 

  ```js
  var merge = function (intervals) {
    quickSort(intervals, 0, intervals.length - 1)
  
    let res = []
  
    for (let val of intervals) {
      if (res.length === 0) {
        res.push(val)
      } else {
        let last = res[res.length - 1]
        if (val[0] <= last[1]) {
          res[res.length - 1][1] = Math.max(last[1], val[1])
        } else {
          res.push(val)
        }
      }
    }
  
    return res
  };
  
  function quickSort(nums, left, right) {
    ...
  }
  ```

  
