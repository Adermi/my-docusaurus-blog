---
id: suanfa
title: 算法与数据结构学习
---

## 前言

### -精通一个领域

1. 切碎知识点（数据结构和算法 => 逐个专项击破）
2. 刻意练习（练习基本功，反复练习直至熟练）
3. 反馈（看大神写的代码，对比自己所学的别人是怎么用的）

### -五遍刷题

第一遍：

- 十分钟看题 + 思考
- 没思路直接看解法
- 背诵，默写解法（理解）

第二遍（过一天）：

- 自己默写，直到通过
- 比较多种解法，对比各种解法的优劣

第三遍（过两天）：

- 过了两天后，再重复做题
- 不是特别熟练的要多练习几遍

第四遍（过一周后）：

- 返回来练习，一定要上国际站

第五遍：

- 面试前一个星期，恢复性训练

### -力扣的使用 

中文网址：https://leetcode-cn.com/

英文网址：https://leetcode.com/

> 所有的题目只是`-cn` 的区别

每次做完题目，都去英文版的力扣里看看最高票，最简洁，最厉害的做法

![](/assets/suanfa.assets/111.jpg)

## 复杂度

### 1.时间复杂度

:bulb: 假定一段简单的代码执行事件为`一个time` ，分析下列代码的执行事件

```js
function fn1() {
  let a = 1
  let b = 2
	let c = a + b
}
// 执行时间为3time

function fn2() {
  let a = 1
  let b = 2
	let n = a + b
  for(let i = 0; i < n; i++) {
		let c = i + n
  }
}
// 执行时间为 (3 + 2n)time
/*
 *	9 10 11 行执行时间为3个time
 *	12 13 行执行时间为2个tine循环n次共2n个time
 */

function fn3() {
  let a = 1	
  let b = 2
	let n = a + b
  for(let i = 0; i < n; i++) {
    let c = i + n
    for(let i = 0; i < n; i++) {
			let c = 20
      let d = 30
    }
  }
}
// 执行时间为 (3 + 2n + 3n^2)time
/*
 *	19 20 21 行的执行时间为3个time
 *	22 23 行的执时间为2个time共循环n次为2n个time
 *	24 25 26 行执行时间为3个时间共循环n次加上外层n次循环共3n^2个time
 */
```

:star: 大O事件复杂表示法：表示代码执行时间随数据规模增长的变化趋势

- 只需要关注执行时间最长的的个项
- 去掉执行时间中的常量，低阶项，系数
- 时间复杂度代表一个趋势，当数据量大时，影响算法的快慢取决于最高阶的项

> 所以 (3 + 2n + 3n^2 ) = O(n^2)，(3 + 2n) = O(n)

:key: 复杂度分析的三个技巧：

1. 只关注循环执行次数最多的一段代码
2. 加法法则：总复杂度等于量级最大的那段代码的复杂度（去掉常量，低阶项，系数）
3. 乘法法则：嵌套代码的复杂度等于嵌套内外代码复杂度的乘积（for循环嵌套）

:zap: 几种常见的复杂度量级

![image-20211120235558941](/assets/suanfa.assets/image-20211120235558941.png)

|        多项式量级         |  非多项式量级  |
| :-----------------------: | :------------: |
|       常量阶：O(1)        | 指数阶：O(2^n) |
|      对数阶：O(logn)      | 阶乘阶：O(!n)  |
|       线性阶：O(n)        |                |
|   线性对数阶：O(nlogn)    |                |
| 平方阶：O(n^2), O(n^3)... |                |

> 左边的是常见的复杂度，**右边是非常低效的算法**，当n增大时，非多项式量级会急剧增加

- ##### O(1)

  O(1)只是复杂度的一种表达方式，代表代码执行的事件是一个常量级别的

  ```
  let a = 0
  let b = 3
  let c = 4
  ```

  就算后面还有100行这样的操作，他的时间复杂度还是O(1)，而不是O(100)

- ##### O(logn)，O(nlogn)

  > 判断有无logn的出现，看循环次数是否有折半的行为

  logn是最常见也是最难分析的一种复杂度
  
  ```js
  let i = 0
  while(i < n) {	// 循环每次都减半
  	i = i * 2
  }
  ```

  <img src="/assets/suanfa.assets/image-20211120222540001.png" alt="image-20211120222540001" style={{zoom: '67%'}} />

  那么换一种形式：
  
  ```js
  let i = 0
  while(i < n) {
  	i = i * 9
  }
  ```
  
  $$
  10 ^ x = n， x = log_9n，log_9n = log_92 * log_2n，所以也是时间复杂度也是log_n
  $$
  
  O(nlogn)的出现情况就是在外层循环执行了n次，乘法法则之后就是 n*logn
  
- ##### O(m+n)、O(m*n)

  这种时间复杂度就是由两个规模的数据影响

  ```js
  // O(m+n)
  function(arr1, arr2) {
    for(let i = 0; i < arr1.lenght; i++) {...}
    for(let i = 0; i < arr2.lenght; i++) {...}
  }
                                          
  // O(m*n)
  function(arr1, arr2) {
    for(let i = 0; i < arr1.lenght; i++) {
      for(let i = 0; i < arr2.lenght; i++) {...}
    }
  }
  ```

- ##### O(n)

  单层循环

- ##### O(n^2)

  两层循环

### 2.主定理

![image-20220106141945684](/assets/suanfa.assets/222.jpg)

### 3.空间复杂度

空间复杂度就是：算法的存储大小随着数据规模增大的变化

```js
function fn(n) {
	let arr = []
  for(let i = 0; i < n; i++) {
    arr[i] = Math.random()
  }
  
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

```

- 空间复杂度：数组arr的存储大小，也就是O(n)
- 时间复杂度是：n + 2n + 2n = 5n = O(n)

:zap: 常见的空间复杂度有O(1)、O(n)、O(n2 )，像O(logn)、O(nlogn)这种对数的基本上都用不到

### 4.复杂度分析

复杂度分析主要有四个概念：

- 最好时间复杂度
- 最坏时间复杂度
- 平均时间复杂度
- 均摊时间复杂度

## 数据结构篇

### 一，数组

:key: 数组的特性

:+1: 优点

1. 数组是一种**线性表**，线性表上的数据只有前后两个。像数组，链表，队列，栈都是线性表结构。

   <img src="/assets/suanfa.assets/image-20211122193634204.png" alt="image-20211122193634204" style={{zoom: '80%'}} />

2. 数组在内存中储存的方式是**一块连续的内存**，支持用下标**随机访问（arr[0], arr[1]...）**特性，并且时间复杂度只有O(1)，但是如果计算机现在只有100M内存，但是这100M并不是连续的内存，在这时申请100M的数组将失效。

   <img src="/assets/suanfa.assets/image-20211122194135403.png" alt="image-20211122194135403" style={{zoom: '80%'}} />
   
3. 连续的内存空间，可以借助cpu缓存机制，预读取数组中的数据，访问效率高

:no_entry: 缺点

1. 插入操作时间复杂度为O(n)

   - 在数组末尾插入一个元素，时间复杂度为O(1)；但是在数组开头插入一个元素，原先下标**（0-n）**的数据都要**往后挪一位**，给arr[0]腾出位置

   - 在每个元素插入的概率都是相同的，所以事件复杂度为(1 + 2 + 3 + ... n) / n = O(n)

     <img src="/assets/suanfa.assets/image-20211122195136991.png" alt="image-20211122195136991" style={{zoom: '80%'}} />

2. 删除操作时间复杂度为O(n)

   - 在数组末尾删除一个元素，时间复杂度为O(1)；但是在数组开头删除一个元素，原先下标**（1-n）**的数据都要**往前挪一位**，吞并掉arr[0]的位置

     <img src="/assets/suanfa.assets/image-20211122195815111.png" alt="image-20211122195815111" style={{zoom: '80%'}} />
     
     

### 二，链表

#### -单链表

:star: 链表是一种**非线性数据结构**，在内存中存储的方式靠指针指向完成，一个链表的节点包含两部分：`当前节点值` 和 `下个节点指针`，内存分配给链表的内存大可不必是连续的，链表可以靠指针串起来

![image-20211123190017259](/assets/suanfa.assets/image-20211123190017259.png)

:+1: 链表的优点：

1. 在链表中插入一个元素，时间复杂度为O(1)

   <img src="/assets/suanfa.assets/image-20211123185129457.png" alt="image-20211123185129457" style={{zoom: '80%'}} />

2. 在链表中删除一个元素，时间复杂度为O(1)

   <img src="/assets/suanfa.assets/image-20211123185308847.png" alt="image-20211123185308847" style={{zoom: '80%'}} />

:no_entry: 链表的缺点：

1. 查找一个元素，时间复杂度为O(n)；因为链表在内存中不是一块连续的内存，获取数据必须遍历整条链表；后面的跳表类型是在链表的基础上建立二分查找，算法效率可以做到O(logn)

   <img src="/assets/suanfa.assets/image-20211123185613921.png" alt="image-20211123185613921" style={{zoom: '80%'}} />

:european_castle: 单链表实现

```js
// 单链表
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkList {
  constructor() {
    this.head = new Node('head') // 链表头部
  }

  // 像链表末尾添加元素
  append(newValue) {
    const newNode = new Node(newValue)
    // 遍历拿到链表最末尾的next指针
    let currentNode = this.head
    while(currentNode.next !== null) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
  }

  // 向指定下标元素后面插入元素
  insert(index, value) {
    let current = this.fundNodeByIndex(index)
    if(current == -1) return

    let newNode = new Node(value)
    newNode.next = current.next
    current.next = newNode  
  }

  // 根据下标找出某个节点，找不到返回-1
  fundNodeByIndex(index) {
    let pos = 0
    let currentNode = this.head.next
    while(currentNode !== null && pos !== index) {
      currentNode = currentNode.next
      pos++
    }
    return currentNode === null ? -1 : currentNode
  }

  // 根据值查找某个节点
  findNodeByValue(value) {
    let currentNode = this.head.next
    while(currentNode !== null && currentNode.value !== value) {
      currentNode = currentNode.next
    }

    return currentNode == null ? -1 : currentNode
  }

  // 根据某个找找到某个节点的前一个节点
  findPreNodeByValue(value) {
    let currentNode = this.head
    while(currentNode.next !== null && currentNode.next.value !== value) {
      currentNode = currentNode.next
    }

    return currentNode.next == null ? -1 : currentNode
  }

  // 根据值删除某节点
  remove(value) {
    const preNode = this.findPreNodeByValue(value)
    if(preNode === -1) return
    preNode.next = preNode.next.next
  }

  // 显示所有节点
  display() {
    let current = this.head.next  // 忽略头部指针
    while(current.next) {
      console.log(current.value) 
      current = current.next
    }
  }

  // 反转单链表
  reverseList() {
    const root = new Node('head')
    let currentNode = this.head.next  // 截取head后的所有指针
    while(currentNode !== null) {
      const next = currentNode.next // 截取后续指针
      currentNode.next = root.next  // 拿到一个节点，进行单个反转，因为第一次末尾肯定是null
      root.next = currentNode
      currentNode = next
    }
    this.head = root
  }

  // 检测是否循环链表（自己写的）
  checkCircle() {
    let head = this.head
    let currentNode = this.head.next  // 第一个有数据的节点
    while(currentNode !== null) {
      if(head === currentNode) return true
      currentNode = currentNode.next
    }
    return false
  }

  // 环验证（也是用快慢指针循环，最差的结果是循环链表两次，快慢指针才重合）
  checkCircle() {
    let fast = this.head.next
    let slow = this.head
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next
      slow = slow.next
      if (slow === fast) return true
    }
    return false
  }

  // 求中间节点
  findMiddleNode() {
    let fast = this.head
    let slow = this.head
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next
      slow = slow.next
    }
    console.log(slow)
    return slow
  }

  // 删除倒数第k个节点（靠反转链表转换成删除第k个节点）
  removeByIndexFromEnd(index) {
    if(this.checkCircle()) return false // 检查是否是环链表
    let pos = 1
    this.reverseList()  // 反转链表，倒数问题转换成正数问题 
    let currentNode = this.head.next
    while(currentNode !== null && pos < index) {
      currentNode = currentNode.next
      pos++
    }
    if(currentNode === null) return false // 无法删除最后一个节点
    this.remove(currentNode.value)
    this.reverseList()	// 把链表反转回来
  }
}


// 合并两个有序的链表(思路和归并排序相同)
const mergeSortLists = (listA, listB) => {
  if (!listA) {
    return listB
  }
  if (!listB) {
    return listA
  }

  let a = listA,
    b = listB,
    resultLink = new LinkList()
    currentNode = resultLink.head

  while (a !== null && b !== null) {
    if (a.value < b.value) {
      currentNode.next = a
      a = a.next
    } else {
      currentNode.next = b
      b = b.next
    }
    currentNode = currentNode.next
  }

  if (a !== null) {
    currentNode.next = a
  } else {
    currentNode.next = b
  }
  return resultLink
}


// 测试数据
let al1 = new LinkList()
for (let i = 1; i < 10; i++) {
  if (i % 2 === 1) {
    al1.append(i)
  }
}

let al2 = new LinkList()
for (let i = 1; i < 10; i++) {
  if (i % 2 === 0) {
    al2.append(i)
  }
}

let sortL = mergeSortLists(al1.head.next, al2.head.next)
sortL.display()
```

- 反转单链表<img src="/assets/suanfa.assets/image-20211123200517856.png" style={{zoom: '80%'}} />

- 使用快慢指针求链表中间节点

  <img src="/assets/suanfa.assets/image-20211123220604801.png" alt="image-20211123220604801" style={{zoom: '80%'}} />

#### -循环链表

循环列表就是把链表的最后一个next指针指回头部

![image-20211123185946748](/assets/suanfa.assets/image-20211123185946748.png)

:key: 某些需要循环处理的问题，用循环链表能够快速解决，如**约瑟夫问题**



#### -双向链表

> 尽管双链表占用内存比单链表要大，这不妨碍双链表比单链表应用更广泛；

双向，顾名思义，他支持两个方向：

- pre指针，指向上一个节点
- next指针，指向下一个节点

<img src="/assets/suanfa.assets/image-20211123190559947.png" alt="image-20211123190559947" style={{zoom: '80%'}} />

:+1: 相比单链表的优势：

1. 只需要O(1)的时间复杂度，就能找到当前节点的前驱结点

   > 这一点非常重要！！

   - 我们知道，要删除链表中的某个节点，不管是单链表还是双链表，都需要先遍历一遍整条链表，找到那个节点进行删除和插入操作，虽然插入删除的事件复杂度为O(1)，但是均摊在查找一个节点的时间上，总的事件复杂度为O(n)
   - 但是，当我们知道了某个节点，要删除一个节点可就快多了，直接通过前驱指针找到上一个节点，时间复杂度为O(1)；但是单链表不支持直接获取某个节点的前驱节点，就需要重新遍历链表

2. 由于第一个优点，双向链表的删除和插入操作都要比单链表快

:no_entry: 劣势

1. 双链表一个节点有两个指针，占用内存肯定要比单链表大

#### -双向循环链表

每个节点有前后指针，尾指针指回链表头部，形成环

![image-20211123192428302](/assets/suanfa.assets/image-20211123192428302.png)

### 三，栈

#### -数组栈

:key: 栈是一种先进后出(FILO)的数据结构，先进的元素靠近栈底，后进的元素靠近栈顶

<img src="/assets/suanfa.assets/image-20211121214346820.png" alt="image-20211121214346820" style={{zoom: '80%'}} />

:star2: 实现一个基于数组的栈

- push()：添加一个（或几个）新元素到栈顶
- pop()：弹出栈顶元素
- peek()：返回栈顶的元素，经查看
- isEmpty()：栈中元素是否为空，为空返回true，不为空返回false
- clear()：移除栈里的所有元素
- size()：返回栈里的元素个数，类同length

```js
// 基于数组实现的栈

class Stack {
  constructor({
    length = 30
  } = {}) {
    // 栈的属性
    this.items = []
    this.length =length
  }

  // 压栈
  push(value) {
    if(this.items.length >= this.length) throw 'Stack overflow'
    this.items.push(value)
  }

  // 出栈
  pop() {
    if(this.isEmpty()) return null
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    let len = this.items.length
    return len ? this.items[len - 1] : null
  }

  // 栈是否为空
  isEmpty() {
    return this.items === 0 ? true : false
  }

  // 返回栈的大小
  size() {
    return this.items.length
  }

  // 清楚栈内容
  clear() {
    this.items = []
  }

  // 把栈的内容以字符串形式返回
  toString() {
    return this.items.toString()
  }
}
```

#### -链表栈

链表相对于数组的优点：

- 不需要开辟一块连续的内存
- 添加和删除元素的时间复杂度为O(1)

```js
// 节点
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

// 链表栈
class StackBasedLinkedList {
  constructor() {
    this.top = null
  }

  push(value) {
    let currentNode = new Node(value)
    currentNode.next = this.top
    this.top = currentNode
  }

  pop() {
    if (this.top === null) {
      return -1
    }

    let value = this.top.value
    this.top = this.top.top
    return value
  }

  cleat() {
    this.top = null
  }

  display() {
    let currentNode = this.top
    while (currentNode !== null) {
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
  }
}

```

#### -基于栈实现历史记录

:key: 使用两个栈实现浏览器记录

![image-20211125144907019](/assets/suanfa.assets/image-20211125144907019.png)

```js
const stack = require('./链表实现栈.js')

// 基于两个栈实现浏览器历史记录
class SampleBrowser {
  constructor() {
    this.normalStack = new stack.StackBasedLinkedList()
    this.backStack = new stack.StackBasedLinkedList()
  }

  // 正常浏览页面
  pushNormal(name) {
    this.normalStack.push(name)
    this.backStack.clear()
    this.displayAllStack() 
  }

  // 后退
  back() {
    const value = this.normalStack.pop()
    if(value === -1) {
      console.log('无法后退')
    } else {
      this.backStack.push(value)
    }
  }

  // 前进
  front() {
    const value = this.backStack.pop()
    if(value === -1) {
      console.log('无法前进')
    } else {
      this.normalStack.push(value)
    }
  }

  // 打印栈内的数据
  displayAllStack() {
    console.log('***后退页面***')
    this.backStack.display()
    console.log('***浏览页面***')
    this.normalStack.display()
  }
}
```



### 四，队列

:key: 队列是一种先进先出（FIFO）的数据结构，可以用数组和链表来实现，只支持尾部插入元素和头部取出元素，也是一种操作受限的线性结构；

#### -顺序队列





#### -链式队列

使用链表实现队列

```js
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class QueueBasedOnLinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    enqueue(value) {
        if (this.head === null) {
            this.head = new Node(value)
            this.tail = this.head
        } else {
            this.tail.next = new Node(value)
            this.tail = this.tail.next
        }
    }

    dequeue() {
        if (this.head !== null) {
            const value = this.head.element
            this.head = this.head.next
            return value
        } else {
            return -1
        }
    }
}
```

循环队列

```js
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class CircularQueue {
    constructor() {
        this.head = null
        this.tail = null
    }

    enqueue(value) {
        if (this.head === null) {
            this.head = new Node(value)
            this.head.next = this.head
            this.tail = this.head
        } else {
            const flag = this.head === this.tail
            this.tail.next = new Node(value)
            this.tail.next.next = this.head
            this.tail = this.tail.next
            if (flag) {
                this.head.next = this.tail
            }
        }
    }

    dequeue() {
        if(this.head == null) return -1

        if (this.head === this.tail) {
            const value = this.head.element
            this.head = null
            return value
        } else {
            const value = this.head.element
            this.head = this.head.next
            this.tail.next = this.head
            return value
        } 
    }

    display() {
        let res = 0
        console.log('-------获取dequeue元素------')
        while (res !== -1) {
            res = this.dequeue()
            console.log(res)
        }
    }
}
```

### 五，Hash表

#### -HashMap

![image-20220113200827979](/assets/suanfa.assets/image-20220113200827979.png)

#### -HashSet

![image-20220113200837319](/assets/suanfa.assets/image-20220113200837319.png)

:key: 散列表由数组演变而来，运用了数组支持按下标随机访问的特性，通过一个散列函数，把key映射成数组的下标，把值插入到列表中，下一次访问，我们就可以以【key/value】的形式来访问一个散列表中的数据，时间复杂度为O(1)

> 比如现在有45个学生，每个学生都有自己的信息，我想把他储存起来，然后根据学生名字就能访问到学生的信息（python字典），散列函数会把学生的名字计算出一个下标值，并在数组这个下标位置存储数据，然后每次我们使用key获取数据都回经过散列函数计算，转换成下标值。

<img src="/assets/suanfa.assets/image-20211126164831491.png" alt="image-20211126164831491" style={{zoom: '80%'}} />

:star2: 散列表的核心就是散列函数，散列函数的基本要求：

1. 散列函数计算key得到一个**非负整数**
2. 如果 **key1 === key2**，那么 **hash(key1) === hash(key2)**
3. 如果 **key1 !== key2**，那么 **hash(key1) !== hash(key2)**

:first_quarter_moon_with_face: 散列表存在的问题：

- 数组的存储空间是有限的，当数据足够多时，肯定是有散列冲突的**hash(key1) === hash(key2)**

:ok_hand: 散列冲突解决方案：

- 拉链法
- 线性探测法

```js
// 最基本的散列表
class HashTable {
  constructor() {
    this.table = []
  }

  // 散列函数
  loseHashCode(key) {
    let hash = 0
    // 从ASCII标中查到ASCII值到hash中
    for(let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37
  }
  // 向散列表中增加值
  push(key, value) {
    let index = this.loseHashCode(key)
    console.log('value' + ' -' + index)
    this.table[index] = value
  }
  // 根据键获取值
  get(key) {
    return this.table[this.loseHashCode(key)]
  }
  // 打印所有值
  print() {
    for(let i = 0; i < this.table.length; i++) {
      if(this.table[i] !== undefined) {
        console.log(`index: ${i}  value: ${this.table[i]}`)
      }
    }
  }
}

let hash = new HashTable()
hash.push('name', 'xyb')
hash.push('age', 20)
hash.push('aa', 'ssss')
hash.print()
```

### 六，树

:star:数树是一种非线性数据结构，其存储结构和生活中真实的树很相似：

- 根节点：没有父节点的节点
- 叶节点：没有子节点的节点
- 兄弟节点：拥有相同父节点的同一级节点

<img src="/assets/suanfa.assets/image-20211127185239976.png" alt="image-20211127185239976" style={{zoom: '80%'}} />

:key: 节点的四个概念：

1. 节点的高度：当前节点到叶节点的最长距离

2. 节点深度：根节点到当前节点经历的边数

3. 节点的层数：当前节点的深度 + 1

4. 树的高度：根节点的高度

   <img src="/assets/suanfa.assets/image-20211127190247891.png" alt="image-20211127190247891" style={{zoom: '80%'}} />



#### -二叉树

> 二叉树是一种特殊的树，一个节点只有左右两个节点

:key: 二叉树的两种情况：

1. 满二叉树：所有的叶节点都在最下面一层，并且除了叶节点，其他所有节点都要有左右节点

   ![image-20211128175845216](/assets/suanfa.assets/image-20211128175845216.png)

   

2. 完全二叉树：

   1. 去掉树的最后一层，是一颗满二叉树
   2. 最后一层的叶节点是从左往右排列且连续不间断的
   
   <img src="/assets/suanfa.assets/image-20211129185254645.png" alt="image-20211129185254645" style={{zoom: '80%'}} />

:star: 二叉树的存储有两种方式：

<img src="/assets/suanfa.assets/image-20211129184932235.png" alt="image-20211129184932235" style={{zoom: '80%'}} />

- 这里需要注意的是：

  如果使用数组的方式存储，为了方便树的各个节点间的查找关系，**数组[1]** 存储整棵树的根节点，对于某个节点X来说，其**父节点**为其下标 **`i / 2`**(取整)，其**左节点**为**`i * 2`**，其**右节点**为**`i * 2 + 1`**，我们可以通过根节点下标为1的位置把整颗数遍历出来。

  <img src="/assets/suanfa.assets/image-20211129190924931.png" alt="image-20211129190924931" style={{zoom: '80%'}} />

:star2: 二叉树三种遍历方式：

<img src="/assets/suanfa.assets/image-20211129185438443.png" alt="image-20211129185438443" style={{zoom: '80%'}} />

1. 先序遍历

   > 遍历顺序为**根左右**，也是深度优先搜索

   <img src="/assets/suanfa.assets/image-20211216140121995.png" alt="image-20211216140121995" style={{zoom: '80%'}} />

   ```js
   // 首先看A节点，A节点的遍历顺序为：
   ABC
   // 再单独看B节点，B节点的遍历顺序是：
   BDE
   // 替换原来B节点，总的遍历顺序就是：
   ABDEC
   // 接着遍历D节点，D节点的遍历顺序是：
   DHI
   // 替换原来D节点，总的遍历顺序就是：
   ABDHIEC
   // 最后看C节点，C节点的遍历顺序是：
   CFG
   // 替换原来C节点，总的遍历顺序就是：
   ABDHIECFG
   ```

   ```js
   // 递归
   var preOrderTraverse1 = function (root) {
     console.log(root.val)
     if (root.left != null) inorderTraversal(root.left)
     if (root.right != null) inorderTraversal(root.right)
   };
   ```

   ```js
   // 非递归
   function preOrderTraversal(root) {
     let stack = []
     let res = []	// 遍历的结果
     while(root !== null || stack.length !== 0) {
       while(root !== null) {  // 一路从左节点遍历下去
         res.push(root.val)  
         stack.push(root)
         root = root.left
       }
   
       let currentNode = stack.pop() // 开始遍历右节点
       root = currentNode.right  // 从右节点的左节点开始遍历
     }
     return res
   }
   ```

2. 中序遍历

   > 遍历的顺序为**左根右**，使用中序遍历能**有顺序地遍历出整颗树。**

   <img src="/assets/suanfa.assets/image-20211216140311089.png" alt="image-20211216140311089" style={{zoom: '80%'}} />

   ```js
   // 中序遍历为左右根，那么初始的遍历顺序是：
   BAC
   // 接着遍历B节点，B节点的遍历顺序是：
   DBE
   // 替换原来B节点，总的遍历顺序就是：
   DBEAC
   // 接着遍历D节点，D节点的遍历顺序是：
   HDI
   // 替换原来D节点，总的遍历顺序就是：
   HDIBEAC
   // 接着遍历C节点，C节点的遍历顺序是：
   FCG
   // 替换原来C节点，总的遍历顺序就是：
   HDIBEAFCG
   ```

   ```js
   // 递归
   var inOrderTraversal = function (root) {
     if (root.left != null) inorderTraversal(root.left)
     arr.push(root.val)
     if (root.right != null) inorderTraversal(root.right)
   };
   ```

   ```js
   // 非递归，借助栈实现
   function inOrderTraversal(root) {
     let stack = []
     let res = []
     while(root !== null || stack.length !== 0) {
       while(root !== null) {  // 一路从左节点遍历下去
         stack.push(root)
         root = root.left
       }
   
       let currentNode = stack.pop() // 开始遍历右节点
       res.push(currentNode.val) // 从栈中取数据的时候获取值
       root = currentNode.right  // 从右节点的左节点开始遍历
     }
     return res
   }
   ```

3. 后序遍历

   > 遍历的顺序为**左右根**

   <img src="/assets/suanfa.assets/image-20211216140516953.png" alt="image-20211216140516953" style={{zoom: '80%'}} />
   
   ```js
   // 做法和中序遍历类似
   ```
   
   ```js
   // 递归
   var inOrderTraversal = function (root) {
     if (root.left != null) inorderTraversal(root.left)
     if (root.right != null) inorderTraversal(root.right)
     arr.push(root.val)
   };
   ```
   
   ```js
   // 非递归，投机取巧的做法：后序遍历是反向的前序遍历结果的反转
   function lastOrderTraversal(root) {
     let stack = []
     let res = []
     while(root !== null || stack.length !== 0) {
       while(root !== null) {  // 一路从左节点遍历下去
         res.push(root.val)	// 插入结果
         stack.push(root)	
         root = root.right
       }
   
       let currentNode = stack.pop() // 开始遍历右节点
       root = currentNode.left  // 从右节点的左节点开始遍历
     }
     res.reverse() // 反转结果（这里也可以在插入结果的时候从数组头部插入，头部需要搬移数据）
     return res
   }
   ```
   
   ![](/assets/suanfa.assets/2.gif)
   
   ```js
   // 真正的后序遍历
   function postorderTraversal(root) {
     let res = []
     if (root == null) return res
   
     let stack = []
     let prev = null
   
     while (root !== null || stack.length !== 0) {
       while (root !== null) { // 对于某个节点而言，把其所有左子节点压栈
         stack.push(root)
         root = root.left
       }
   
       root = stack.pop()  // 开始弹栈
       if(root.right == null || root.right == prev) {  // 如果没有右节点或右节点已经遍历过
         res.push(root.val)  // 遍历左右根中的根
         prev = root // 如果当前根节点是别的节点的右节点，可以作为右节点已遍历完成的标指w
         root = null
       } else {
         stack.push(root)  // 右节点还没有被遍历，把右节点压栈并重复上述流程
         root = root.right
       }
     }    
     return res
   }
   ```
   
   
   
4. 层次遍历，也叫做广度优先搜索

   

   <img src="/assets/suanfa.assets/image-20211215224614030.png" alt="image-20211215224614030" style={{zoom: '80%'}} />

   ```js
   // 非递归，需要借助队列来实现
   function levelTravel(root) {
     let queue = []	// 层级遍历时，依次把节点从左往右入队
   
     queue.push(root)
     while (queue.length !== 0) {
       let node = queue.shift()
   
       console.log(node.val)
       if (node.left != null) queue.push(node.left)
       if (node.right != null) queue.push(node.right)
     }
   }
   ```

   

#### -二叉搜索树

:star:二叉搜索树：支持动态数据结合的快速查找，插入和删除的二叉树

> 在树中的任何一个节点，其**左节点的值必须小于这个节点的值**，其**右节点的值必须大于这个节点的值**。

:star2: 二叉搜索树增删改查：

- 查找一个值

  <img src="/assets/suanfa.assets/image-20211129193221485.png" alt="image-20211129193221485" style={{zoom: '80%'}}/>

- 插入一个值

  <img src="/assets/suanfa.assets/image-20211129193707471.png" alt="image-20211129193707471" style={{zoom: '80%'}} />

- 删除一个值

  删除一个值分为三种情况：

  1. 被删除的节点没有子节点时，直接删除该节点（删除29）

  2. 被删除的节点只有一个节点，删除的方式和链表删除节点方式相同（删除53）

  3. 被删除的节点有左右节点

     找到当前节点的右分支中中最小的值，替换到被删除的节点的位置上（删除57）

  ![image-20211129234914548](/assets/suanfa.assets/image-20211129234914548.png)

:european_castle: 搜索二叉树实现

```js
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * 搜索二叉树实现：
 * - 插入，删除，查找节点
 * - 先序，中序，后序遍历
 * - 查找最大，最小节点
 */
class SearchTree {
  constructor() {
    this.root = null
  }

  // 插入节点
  insert(value) {
    const node = new Node(value)
    if (this.root == null) {
      this.root = node
      return
    }

    insertNode(this.root, node)

    function insertNode(node, newNode) {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode
          return
        }
        insertNode(node.left, newNode)
      } else {
        if (node.right === null) {
          node.right = newNode
          return
        }
        insertNode(node.right, newNode)
      }
    }
  }

  // 根据不同情况删除节点
  remove(value) {

    /**
     * 
     * @param {当前节点} node 
     * @param {删除的节点的值} value 
     * @param {当前节点的前置节点,没有则传null} pre 
     * @param {当前节点是否是前置节点的左节点，false为右节点} isLeft 
     * @returns 
     */
    const removeNode = (node, value, pre, isLeft) => {
      if (node.value == null) return null // 树不存在
      if (node.value === value) {
        const left = node.left, // 当前被删除节点的左右节点
          right = node.right

        if (left && right) { // 被删除的节点有两个子节点
          let minNode = this.findMinNode(right)
          removeNode(right, minNode.value, node, false) // 删除我们找出的最小节点
          node.value = minNode.value // 替换删除节点的值为右节点中最小值
          return
        } else if (left || right) { // 被删除的节点只有一个子节点
          let nextNode = left ? left : right
          isLeft ? (pre.left = nextNode) : (pre.right = nextNode)
          return
        } else { // 被删除的节点没有子节点
          if (pre == null) { // 删除首个节点
            this.root = null
          } else {
            isLeft ? pre.left = null : pre.right = null
          }
          return
        }
      } else if (value < node.value) {
        return node.left ? removeNode(node.left, value, node, true) : null
      } else {
        return node.right ? removeNode(node.right, value, node, false) : null
      }
    }

    return removeNode(this.root, value, null)
  }

  // 中序遍历（左中根）
  inOrderTraverse(node = this.root) {
    const left = node.left,
      right = node.right

    if (left && (left.left || left.right)) {
      this.inOrderTraverse(left)
    } else {
      left && left.value !== null ? console.log(left.value) : null
    }
    console.log(node.value)
    if (right && (right.left || right.right)) {
      this.inOrderTraverse(right)
    } else {
      right && right.value !== null ? console.log(right.value) : null
    }
  }

  // 先序遍历（根左右）
  preOrderTraverse(node = this.root) {
    const left = node.left,
      right = node.right

    console.log(node.value)
    if (left && (left.left || left.right)) {
      this.preOrderTraverse(left)
    } else {
      left && left.value !== null ? console.log(left.value) : null
    }

    if (right && (right.left || right.right)) {
      this.preOrderTraverse(right)
    } else {
      right !== null && right.value !== null ? console.log(right.value) : null
    }
  }

  // 后序遍历（左右根）
  lastOrderTraverse(node = this.root) {
    const left = node.left,
      right = node.right

    if (left && (left.left || left.right)) {
      this.lastOrderTraverse(left)
    } else {
      left && left.value !== null ? console.log(left.value) : null
    }

    if (right && (right.left || right.right)) {
      this.lastOrderTraverse(right)
    } else {
      right && right.value !== null ? console.log(right.value) : null
    }
    console.log(node.value)
  }

  // 从某节点开始查找最小节点
  findMinNode(node = this.root) {
    if (node) {
      return node.left ? this.findMinNode(node.left) : node
    }
  }

  // 从某节点开始查找最大节点
  findMaxNode(node = this.root) {
    if (node) {
      return node.right ? this.findMaxNode(node.right) : node
    }
  }
}


/***********测试数据***********/
let tree = new SearchTree()

tree.insert(51)
tree.insert(30)
tree.insert(28)
tree.insert(40)
tree.insert(18)
tree.insert(29)
tree.insert(57)
tree.insert(55)
tree.insert(75)
tree.insert(53)
tree.insert(52)
tree.insert(65)
tree.insert(82)
tree.insert(61)
tree.insert(68)

tree.remove(29)
tree.remove(53)
tree.remove(57)


tree.inOrderTraverse()
console.log(tree.findMinNode())
console.log(tree.findMaxNode())
```

另外一个版本

```js
class BiTreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
    this.parent = null
  }
}

class BST {
  constructor(val) {
    this.root = null

    if (val != undefined) {
      for (let i = 0; i < val.length; i++) {
        this.insert2(val[i])
      }
    }
  }

  // 递归插入
  insert1(node, val) {
    if (!node) {
      node = new BiTreeNode(val)
    } else if (val < node.val) {
      // 如果node.left是null，插入新节点
      node.left = this.insert(node.left, val)
    } else if (val > node.val) {
      // 如果node.right是null，插入新节点
      node.right = this.insert(node.right, val)
    }

    return node
  }

  // 非递归插入
  insert2(val) {
    let currentNode = this.root
    let newNode = new BiTreeNode(val)

    if (currentNode == null) {
      this.root = newNode
      return
    }

    while (true) {
      if (val < currentNode.val) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left
        } else {
          currentNode.left = newNode
          newNode.parent = currentNode
          return
        }
      } else if (val > currentNode.val) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right
        } else {
          currentNode.right = newNode
          newNode.parent = currentNode
          return
        }
      } else {
        return
      }
    }
  }

  // 递归查找
  find1(node, val) {
    if (!node) return null

    if (val < node.val) {
      this.find1(node.left, val)
    } else if (val > node.val) {
      this.find1(node.right, val)
    } else {
      return node
    }
  }

  // 非递归查找
  find2(val) {
    let root = this.root

    while (root !== null) {
      if (val === root.val) {
        return root
      } else if (val < root.val) {
        root = root.left
      } else {
        root = root.right
      }
    }

    return null
  }

  // 删除某个节点
  delete(val) {
    let node = this.find2(val),
      prevNode = node ? node.parent : null

    if (node == null) return null

    if (node.left && node.right) { // 情况一：节点有左右节点
      // 找到右节点的最小值
      let min = this.min(node.right)
      this.delete(min.val)

      if (prevNode == null) {
        min.left = this.root.left
        min.right = this.root.right
        min.parent = null
        this.root = min
      } else {
        min.left = node.left
        min.right = node.right
        min.parent = prevNode
        if (prevNode.left === node) { // 最小节点是被删除节点的右节点，删除了之后会变成null，需要判断
          prevNode.left = min
        } else {
          prevNode.right = min
        }
      }

      if (min.right !== null) {
        min.right.parent = min
      }
      node.left.parent = min

      return node

    } else if (node.left || node.right) { // 情况二：节点只有一侧有节点
      if (prevNode == null) {
        this.root = node
        node.parent = null
      } else if (prevNode.left === node) {
        prevNode.left = (node.left !== null) ? node.left : node.right
        prevNode.left.parent = prevNode
      } else {
        prevNode.right = (node.left !== null) ? node.left : node.right
        prevNode.right.parent = prevNode
      }
    } else { // 情况三：当前节点没有左右节点
      if (prevNode == null) {
        this.root = null
      } else if (prevNode.left === node) {
        prevNode.left = null
      } else {
        prevNode.right = null
      }
    }

    return node


  }

  min(node) {
    node = (node == undefined) ? this.root : node
    while (node !== null) {
      if (node.left !== null) {
        node = node.left
      } else {
        return node
      }
    }
  }

  // 前序遍历
  preOrderTravel() {
    let stack = []
    let res = []
    let currentNode = this.root


    while (currentNode !== null || stack.length !== 0) {
      while (currentNode !== null) {
        res.push(currentNode.val)
        stack.push(currentNode)
        currentNode = currentNode.left
      }

      let node = stack.pop()
      currentNode = node.right
    }

    return res


  }

  // 中序遍历
  inOrderTravel() {
    let stack = []
    let res = []
    let currentNode = this.root


    while (currentNode !== null || stack.length !== 0) {
      while (currentNode !== null) {
        stack.push(currentNode)
        currentNode = currentNode.left
      }

      let node = stack.pop()
      res.push(node.val)
      currentNode = node.right
    }

    return res
  }

  // 后续遍历
  postOrderTravel() {
    let stack = [],
      res = [],
      root = this.root,
      prev

    while (root !== null || stack.length !== 0) {
      while (root !== null) {
        stack.push(root)
        root = root.left
      }

      let node = stack.pop()
      if (node.right == null || node.right == prev) {
        res.push(node.val)
        prev = node
        root = null
      } else {
        stack.push(node)
        root = node.right
      }
    }

    return res
  }

  // 层次遍历
  levelTravel() {
    let queue = [],
      root = this.root,
      res = []

    if (root !== null) {
      queue.push(root)
    } else {
      return
    }

    while (queue.length !== 0) {
      let node = queue.shift()
      res.push(node.val)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }

    return res
  }
}

module.exports = {
  BiTreeNode,
  BST
}

```

#### -删除二叉树搜索树中的节点

```js
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

删除分成三种情况：

1. 被删除的节点无子节点，直接删除
2. 被删除的节点只有一个子节点，把子节点接到被删除的节点上
3. 被删除的节点有两个子节点，找到右子树中的最小值，作为被删除节点

```

```



#### -AVL树

:star: 在平均情况下，二叉搜索树的搜索时间为O(logn)，效率是非常高的。

但是在极端情况下，二叉搜索树的节点都在一侧，就会退化成链表，性能急剧下降<img src="/assets/suanfa.assets/image-20211216235426489.png" alt="image-20211216235426489" style={{zoom: '80%'}} />

:key: AVL树就能解决树的不平衡这个问题，AVL树具有以下的特性：

1. 根的左右子树高度之差的绝对值不能超过1
2. 根的左右子树都是平衡二叉树

<img src="/assets/suanfa.assets/3.gif" style={{zoom: '80%'}} />



:bulb: 验证某个节点是否平衡：某节点的左右子节点相差不能超过1

```js
// 后序遍历，yyds
function isBalanced(root) {
  return height(root) >= 0
};

function height(root) {
  if (root === null) return 0

  let leftHeight = height(root.left)
  let rightHeight = height(root.right)
  if (leftHeight == -1 || rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
    return -1	// 只要某个子节点不平衡,一直向上浮
  } else {
    return Math.max(leftHeight, rightHeight) + 1
  }
}
```



:school: AVL树插入一个节点后如何维持树的平衡？分成四种情况：

1. 对节点的**左孩子**的**左子树**插入：**右旋**

   <img src="/assets/suanfa.assets/5.gif" style={{zoom: '80%'}} />

2. 对节点的**右孩子**的**右子树**插入：**左旋**

   <img src="/assets/suanfa.assets/4.gif" style={{zoom: '80%'}} />

3. 对节点的**右孩子**的**左子树**插入：先**右旋**，再**左旋**

   <img src="/assets/suanfa.assets/6.gif" style={{zoom: '80%'}} />

4. 对节点的**左孩子**的**右子树**插入：先**右旋**，再**左旋**

   <img src="/assets/suanfa.assets/7.gif" style={{zoom: '80%'}} />

   

#### -堆和堆排序

:star: 堆是一种特殊的二叉树，其特性如下：

> 根据根节点存储的数据大小不同，分成大顶堆（整颗数最大值）和小顶堆（整棵树最小值）

- 是一颗完全二叉树
- 堆的每一个节点必须**(大于等于或小于等于)**其子树中的每个节点

![image-20211204181304703](/assets/suanfa.assets/image-20211204181304703.png)



:key: 堆的存储方式

堆是一颗完全二叉树，完全二叉树使用数组来存储是最节省空间的

<img src="/assets/suanfa.assets/image-20211204182100044.png" alt="image-20211204182100044" style={{zoom: '80%'}} />

:zap: 堆操作

1. 往堆里添加一个元素

   往堆中添加了元素之后，为了使其继续保持堆的特性，我们需要对整个堆进行堆化，堆化的方法有两种：

   - 自下而上的堆化

     这种方式就是自身节点和父节点（当前节点Math.floor(point / 2)）进行比较，若比父节点大|小，则两者交换一直向上比较，直到当前节点小于|大于父节点

   - 自上而下的堆化

     当前节点和左右子节点三者进行比较，选出最大|最小的节点，和当前节点交换，再在被交换的节点（左右节点中的一个）上进行自上而下的堆化，直至数组是一个堆为止

   <img src="/assets/suanfa.assets/image-20211204183917438.png" alt="image-20211204183917438" style={{zoom: '80%'}} />

2. 删除堆顶的元素，用下面这种方法不会出现数据空洞的情况（从完全二叉树退化成普通二叉树）

   ![image-20211204185559210](/assets/suanfa.assets/image-20211204185559210.png)

:european_castle: 堆排序

|   排序算法   |        时间复杂度         | 空间复杂度 |
| :----------: | :-----------------------: | :--------: |
|    堆排序    | O(nlogn),最坏也是O(nlogn) |    O(n)    |
| 插入一个元素 |          O(logn)          |            |
| 删除堆顶元素 |          O(logn)          |            |

堆排序分成两步：

1. 建堆和堆化

   建堆的思路就是：从最后一个非叶节点的节点向后取节点，分别对每个节点进行自上而下的堆化

   <img src="/assets/suanfa.assets/image-20211206193523333.png" alt="image-20211206193523333" style={{zoom: '80%'}} /><img src="/assets/suanfa.assets/image-20211206193625217.png" alt="image-20211206193625217" style={{zoom: '80%'}} />

2. 排序

   这里排序的思路是取堆的根节点，和堆的最后一位交换，因为大顶堆默认最大的元素是在根元素，所以我们可以把根元素放到最末尾，然后对除了最后一位的这个堆进行堆化，让整个数组第二大的数出现在根节点，再和堆倒数第二位交换，以此类推，达成排序的目的

   <img src="/assets/suanfa.assets/image-20211206234321689.png" alt="image-20211206234321689" style={{zoom: '80%'}} />

3. 代码实现

   ```js
   class HeapSort {
     constructor(originArr) {
       this.originArr = originArr
     }
   
     // 把数组建堆
     buildHeap() {
       const arr = this.originArr
       const startIndex = Math.floor((this.originArr.length - 2) / 2) // 最后一个非叶子节点
       for (let i = startIndex; i >= 0; i--) {
         this.heapify(arr, i, arr.length)
       }
   
       return arr
     }
   
     // 从当前节点自上而下堆化
     heapify(arr, point, maxLen) {
       while (true) {
         let maxPos = point
         let left = this.getLeft(point),
           right = this.getRight(point)
   
         // 左节点在数组范围内且大于父节点
         if (left < maxLen && arr[point] < arr[left]) {
           maxPos = left
         }
   
         // 右节点在数组范围内且大于当前最大的节点
         if (right < maxLen && arr[maxPos] < arr[right]) {
           maxPos = right
         }
   
         // 最大节点位置没有变
         if (maxPos === point) break
         // 最大节点和根节点交换
         this.swap(arr, point, maxPos)
         // 修改根节点
         point = maxPos
       }
     }
   
     swap(arr, i, j) {
       [arr[i], arr[j]] = [arr[j], arr[i]]
     }
   
     sort() {
       const arr = this.buildHeap()
       let lastIndex = arr.length - 1
       while (lastIndex > 0) {
         this.swap(arr, 0, lastIndex)
         lastIndex--
         this.heapift(arr, 0, lastIndex + 1)
       }
       console.log(arr)
     }
   
     getLeft(i) {
       return i * 2 + 1
     }
   
     getRight(i) {
       return i * 2 + 2
     }
   }
   
   
   function text() {
     const h = new HeapSort([2, 20, 6, 11, 22, 47, 10, 45, 66, 10, 34])
     h.sort()
   }
   text()
   ```

4. 自己实现一个堆

   ```js
   class Heap {
     constructor(nums) {
       this.nums = nums
   
       for (let i = Math.floor((this.nums.length - 2) / 2); i >= 0; i--) {
         this.heapify(i)
       }
     }
   
     // 从当前point开始自顶向下堆化
     heapify(point) {
       while (true) {
         let minPoint = point,
           leftPoint = point * 2 + 1,
           rightPoint = point * 2 + 2,
           nums = this.nums,
           len = nums.length
   
         if (leftPoint < len && nums[leftPoint] < nums[minPoint]) {
           minPoint = leftPoint
         }
   
         if (rightPoint < len && nums[rightPoint] < nums[minPoint]) {
           minPoint = rightPoint
         }
   
         if (minPoint === point) break
   
         [nums[point], nums[minPoint]] = [nums[minPoint], nums[point]]
   
         point = minPoint
       }
     }
   
     // 添加一个数,自底向上堆化(不同于上面的堆化,应为此时堆已经是小顶堆了,不用堆化所有的)
     add(val) {
       let nums = this.nums
       nums.push(val)
   
       let point = nums.length - 1
       let prePoint = Math.floor((point - 1) / 2)
   
       // 自底向上堆化
       while (prePoint >= 0 && nums[point] < nums[prePoint]) {
         [nums[point], nums[prePoint]] = [nums[prePoint], nums[point]]
         point = prePoint
         prePoint = Math.floor((prePoint - 1) / 2)
       }
     }
   
     // 交换最前和最后
     delete() {
       let nums = this.nums;
   
       [nums[0], nums[nums.length - 1]] = [nums[nums.length - 1], nums[0]]
   
       nums.pop()
   
       this.heapify(0)
     }
   
     size() {
       return this.nums.length
     }
   }
   ```

   

### 七，图

图中的元素称为**顶点**，连接顶点的叫**边**；顶点的**度**是顶点间相连的边的条数。

**权** ：在一个图上，每条边可以带上有意义的数字，称为权

## 算法篇

### 一，排序

### 1.O(n^2)排序

#### -冒泡排序

> #### 流程图：https://www.processon.com/view/link/61878e160e3e744a77cf1f88

| 排序算法 | 时间复杂度 |  空间复杂度   | 稳定性 |
| :------: | :--------: | :-----------: | :----: |
| 冒泡排序 |   O(n^2)   | O(1) 原地排序 |  稳定  |

![image-20211107102007435](/assets/suanfa.assets/image-20211107102007435.png)

:european_castle:代码实现

```js
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    let flag = false
    for(let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        flag = true
      }
    }
    if(!flag) break	// 跳過最後一次交換（因为最后一次已经排序）
  }
  return arr
}
```

:zap: 为什么插入排序比冒泡排序更受欢迎？

> 插入排序和冒泡排序的事件复杂度和空间复杂度都是相同的

但是冒泡排序交换元素的时候，需要进行三步插入操作：

```js
let temp = arr[j]
arr[j] = arr[j + 1]
arr[j + 1] = temp
```

而插入排序只需要进行一步操作：

```js
arr[j + 1] = arr[j]
```

在数据量大的情况下，插入排序的性能远比冒泡排序好，所以这就是插入排序更加好的原因。

#### -插入排序

> 流程图：https://www.processon.com/view/link/618b9b07637689783e299d0f

| 排序算法 | 时间复杂度 |  空间复杂度   | 稳定性 |
| :------: | :--------: | :-----------: | :----: |
| 插入排序 |   O(n^2)   | O(1) 原地排序 |  稳定  |

把数组分为两个区间：**已排序区间**和**未排序区间**。初始已排序区间只有一个元素，就是数组的第一个元素

> 排序的方法就是：每次从未排序区间取一个数，和已排序区间进行对比，插入合适的位置，完成排序

![image-20211109102954930](/assets/suanfa.assets/image-20211109102954930.png)

:european_castle: 代码实现

```js
function insertSort(arr) {
  if (arr.length <= 1) return

  for (let i = 1; i < arr.length; i++) {
    let value = arr[i]	// 获取一个未排序数组的第一个数
    let j = i - 1	// 已排序数组最后一个下标
    for (; j >= 0; j--) {
      if(arr[j] > value) {
        arr[j + 1] = arr[j]	// 后移一位
      } else {
        break
      }
    }
    arr[j + 1] = value	// 填补后移的空缺
  }
  return arr
}
```

:zap: 为什么插入排序比冒泡排序更受欢迎？

> 插入排序和冒泡排序的事件复杂度和空间复杂度都是相同的

但是冒泡排序交换元素的时候，需要进行三步插入操作：

```js
let temp = arr[j]
arr[j] = arr[j + 1]
arr[j + 1] = temp
```

而插入排序只需要进行一步操作：

```js
arr[j + 1] = arr[j]
```

在数据量大的情况下，插入排序的性能远比冒泡排序好，所以这就是插入排序更加好的原因。

#### -选择排序

> 流程图：https://www.processon.com/view/link/618b9b1ff346fb6e38958f78

| 排序算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
| :------: | :--------: | :--------: | :----: |
| 归并排序 |   O(n^2)   |    O(1)    | 不稳定 |

:key: 选择排序的思路和插入排序相似，也是把数组分成已排序和未排序数组，每次从未排序数组中循环获取最小值，加入到已排序数组中

![image-20211107164421246](/assets/suanfa.assets/image-20211107164421246.png)

:european_castle:代码实现

```js
const selectionSort = (arr) => {
    if (arr.length <= 1) return
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j // 找到整个数组的最小值
            }
        }
        const temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
	return arr
}
```

:zap: 但是选择排序有个致命的弱点：它是不稳定的算法，所以用的并没有冒泡和插入排序多

### 2.O(nlogn)排序

#### -归并排序

> 流程图：https://www.processon.com/view/link/61878e2a1e08535be30b34da

| 排序算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
| :------: | :--------: | :--------: | :----: |
| 归并排序 | O(nlongn)  |    O(n)    |  稳定  |

:key: 归并排序的原理就是：把一个长度为n的数组分解成n个长度为1的小数组（所以空间复杂度为n，分而治之的思想），最后通过一个合并函数把所有的小数组合并成一个有序的数组（递归编程技巧）

<img src="/assets/suanfa.assets/image-20211106151923717.png" alt="image-20211106151923717" style={{zoom: '80%'}} /><img src="/assets/suanfa.assets/image-20211106151939608.png" alt="image-20211106151939608" style={{zoom: '80%'}} />

<img src="/assets/suanfa.assets/image-20211106152634037.png" alt="image-20211106152634037" style={{zoom: '80%'}} />

:european_castle: 代码实现

```js
// 拆分函数
function mergeSort(arr) {
  let len = arr.length
  if(len < 2) return arr

  let middle = Math.floor(len / 2),
  left = arr.slice(0, middle),
  right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

// 合并函数
function merge(left, right) {
  let res = []

  while(left.length && right.length) {
    if(left[0] <= right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }

  while(left.length) {
    res.push(left.shift())
  }

  while(right.length) {
    res.push(right.shift())
  }

  return res
}
```



#### -快速排序

> 流程图：https://www.processon.com/view/link/6188bb2c1efad459b718764f

| 排序算法 | 时间复杂度 | 空间复杂度 |        稳定性        |
| :------: | :--------: | :--------: | :------------------: |
| 快速排序 | O(nlongn)  |    O(1)    | 不稳定（会交换位置） |

:key: 快速排序的核心思想就是分而治之，把大问题拆解成小问题逐个解决，首先需要在数组中随机找到一个基准值，然后把数组按照基准值分成两个数组：

1. 左边数组都是小于基准值的数组
2. 右边数组都是大于基准值的数组

然后再对左右数组进行递归重复上述的规则，直到数组有序。

![image-20211104235912824](/assets/suanfa.assets/image-20211104235912824.png)

:european_castle: 代码实现

> 快排的空间复杂度是O(1)，是原地排序算法，用两个指针巧妙的实现快排的思路：

```js
function quickSort(arr, left, right) {
  if (right <= left) return // 左指针大于等于右指针

  let i = left,
    j = right,
    base = arr[left]  // 基数

  while (i < j) {
    while (j > i && arr[j] >= base) { // 从右往左，找到第一个比基数小的值
      j--
    }

    while (i < j && arr[i] <= base) { // 从做往右，找到第一个比基数大的值
      i++
    }

    if (i < j) {  // 左指针小于右指针，交换左右指针的值
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }

  // 交换基数和左指针的值
  arr[left] = arr[i]
  arr[i] = base

  // 对已经分好组的数组递归
  quickSort(arr, left, i - 1)
  quickSort(arr, i + 1, right)

  return arr
}
```

### 3.O(n)排序

#### -桶排序

> 流程图：https://www.processon.com/view/link/6188bb196376896480ed8246

| 排序算法 | 时间复杂度 | 空间复杂度 |
| :------: | :--------: | :--------: |
|  桶排序  |    O(n)    |    O(n)    |

桶排序，顾名思义，过程肯定是像需要把数据扔进一个一个桶内，再在每个桶内对数据单独进行排序。

:question:  比如下面有一个例子：

- 有一笔10万条记录的订单，价格从100~3000元不等，现在需要根据价格对订单进行排序。

 :bulb: 解决思路：

- 我们可以划分100个桶，第一个桶的范围是100~300，第二个桶300~600...第三个桶100个990~1000，

我们就可以遍历这10万条数据，把对应订单扔到对应范围的桶内，再在每个桶内用快排。

:zap: 时间复杂度

- 总数据为n，桶的个数为m，每个桶内元素的个数为**s = n / m**，每个桶快排需要的时间是 **n/m * log(n / m)**，总共排序的时间是**m * (n / m) * log(n / m) = n * log(n / m)** 
- 当桶的个数接近数据的总数，每个桶分到很少的数据， **log(n / m)** 逐渐接近一个常量，这时候桶排序的时间复杂度就接近了**O(n * 1) ≈ O(n)** 
- 但是如果每个桶分配到的数据不均匀，所有数据都被分到了一个桶内，就会退化成 **n * log(n)** 了

:key: 应用场景

- 并不是所有的数据都适用桶排序，桶排序非常适合**外部排序**（存储在磁盘中，无法一次性加载到内存的数据）。

- 比如说我现在就有30G的订单数据，内存只有200M。我们的实现思路就是先扫描这笔订单，查看这笔订单的金额范围，也就是桶的范围，之后划分桶的个数比如说300个，那么正常情况下这比100个G的订单会被分类到这300个文件内，每个文件100M，那么就可以把每个桶文件单独读取到内存中快排处理，如果某个文件特别大，超过了内存大小，我们可以继续对这个大文件进行单独的桶排序，等到所有的桶都完成排序后，写入到一个文件中就是排序之后的订单！

![image-20211107230148011](/assets/suanfa.assets/image-20211107230148011.png)

:european_castle: 代码实现

```js
function bucketSort(arr, bucketSize = 5) { // 默认一个桶的数值范围大小是5
  if (arr.length < 2) return

  // 创建桶
  let buckets = createBuckets(arr, bucketSize)
  // 给每个桶排序,返回排序后的数
  return sortBuckets(buckets)
}

function createBuckets(arr, bucketSize) {
  // 找出最大值最小值
  let max = arr[0]
  let min = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    } else if (arr[i] < min) {
      min = arr[i]
    }
  }

  // 根据最大值最小值，桶的范围，计算出桶个数
  const bucketNUm = Math.floor((max - min) / bucketSize) + 1
  // 建立桶
  const buckets = []
  for (let i = 0; i < bucketNUm; i++) {
    buckets[i] = []
  }
  // 把值丢到各自的桶内
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize)
    buckets[bucketIndex].push(arr[i])
  }
  return buckets
}

function sortBuckets(buckets) {
  const retArray = []
  for(let i = 0; i < buckets.length; i++) {
    if(buckets[i].length) {
      insertSort(buckets[i])
      retArray.push(...buckets[i])
    }
  }

  return retArray
}

// 调用
bucketSort([...])
```



#### -计数排序

> 流程图：https://www.processon.com/view/link/6188bafe0e3e740b37432d22

| 排序算法 | 时间复杂度 | 空间复杂度 |
| :------: | :--------: | :--------: |
| 计数排序 |    O(n)    |    O(n)    |

:key: 计数排序可以看成特殊情况的桶排序，

- 当要排序的n个数据，桶的值所处范围并不大时：

  比如说学生成绩，最高分肯定是100，最低分拿肯定是0分，那我们就可以把学生成绩分成100个桶，扫描一遍所有学生的数据扔进对应的桶里，再一次扫描每个桶（桶内数据不需要排序，已经排好的），再把把数据输出之后就是有序的了

:question: 计数排序的 “计数” 从哪来？

:bulb: 这就涉及到了很巧妙的一个点，举个例子：

- 现在有10个考生，成绩为【2，5，3，1，2，3，1，3，1，4】的一个数组A，需要对其排序：

  1.  学生的最高成绩为5分，申请一个长度为6的数组S
  2. 扫描一遍学生数组，把学生成绩作为数组S下标，并在数组S中计数，得到【0，3，2，3，1，1】
  3. 把数组A进行转化：数组的每一项等于小于等于当前值的个数，得到数组J【0，3，5，8，9，10】
  4. 倒序遍历数组S（为了数组的稳定性，这样使得原数组里在后的元素，在排序后的数组也放在后边），第一次遍历4，去数组J中得到值9，说明在应该排在第9位，再把9 - 1 = 8放回数组J，遍历下一个数。照着这个流程最后就能把数组S排序完成

  ![image-20211108134929033](/assets/suanfa.assets/image-20211108134929033.png)

:european_castle: 代码实现

```js
// 计数排序
function countSort(arr) {
  if (arr.length < 1) return

  const max = findMaxValue(arr)
  const countArr = new Array(max + 1).fill(0) // 最大值59，0~59说明长度为60
  const retArr = [] // 最终排序的数组

  // 对出现的数进行计数
  arr.forEach(item => {
    if (!countArr[item]) {
      countArr[item] = 0
    }
    countArr[item]++
  })

  // 依次累加计数数组
  for (let i = 1; i < countArr.length; i++) {
    countArr[i] = countArr[i] + countArr[i - 1]
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    retArr[countArr[arr[i]] - 1] = arr[i]
    countArr[arr[i]]--
  }

  return retArr

}

// 找出一个数组中的最大值
function findMaxValue(arr) {
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i]
  }
  return max
}

```

#### -基数排序

| 排序算法 | 时间复杂度 | 空间复杂度 |
| :------: | :--------: | :--------: |
| 基数排序 |    O(n)    |    O(n)    |

### 二，查找

#### 1.二分查找

| 查找算法 | 时间复杂度 |
| :------: | :--------: |
| 基数排序 |  O(logn)   |

:key: 查找效率

- 一个42亿的数据(2^32)只需要查找32次，就能找到一个数据的位置

:red_circle: 使用条件

- 第一必须是数组，不能是任何其他的数据结构，因为数组使用下标访问数据的书时间复杂度是O(1);
- 第二必须是有序，只有数组是有序的我们才能进行分区查找
- 第三是二分查找不适合小数据，数据量小有时候还没有循环一遍数组的效率高

![image-20211111135236209](/assets/suanfa.assets/image-20211111135236209.png)

:european_castle: 代码实现

```js
// 循环实现

function binaryFind(sortedArr, target) {
  if(sortedArr.length == 0) return -1

  let low = 0
  let high = sortedArr.length - 1

  while(low <= high) {
    const mid = Math.floor((low + high) / 2)
    const midValue = sortedArr[mid]
    if(target === midValue) {
      return mid
    } else if(target < midValue) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return -1
}
```

```js
// 递归实现
function binaryFind(arr, low, high, target) {
  if(low > high) return -1

  let mid = Math.floor((low + high) / 2)

  if(arr[mid] == target) {
    return mid
  } else if(arr[mid] > target) {
    return binaryFind(arr, low, mid - 1, target)
  } else  {
    return binaryFind(arr, mid + 1, high, target)
  }
}; 

```

#### 2.二分查找变体

> 流程图：https://www.processon.com/view/link/618cc03a7d9c08562ae78708

1. ##### 查找第一个值等于给定值的元素

   :bulb: 这里的关键在于：当 **mid = 给定值** 的时候怎么操作：

   - 判断 **arr[mid -1]** 是否等于给定值（是否是第一个）
   - 判断 **mid** 是否等于 **0**（是否到达数组的最左或最右）

   ![image-20211111150153518](/assets/suanfa.assets/image-20211111150153518.png)

   :european_castle: 代码实现

   ```js
   // 递归算法
   function binaryFind(sortedArr, target) {
     if (sortedArr.length == 0) return -1
   
     let low = 0
     let high = sortedArr.length - 1
   
     while (low <= high) {
       const mid = Math.floor((low + high) / 2)
       const midValue = sortedArr[mid]
       if (target === midValue) {
         /************关键的一步*************/
         if(arr[mid - 1] !== target || mid === 0) return mid	
         /************关键的一步*************/
         high = mid - 1
       } else if (target < midValue) {
         high = mid - 1
       } else {
         low = mid + 1
       }
     }
   
     return -1
   }
   ```

   ```js
   // 递归算法
   function binaryFind(arr, low, high, target) {
     if(low > high) return -1
     let mid = Math.floor((low + high) / 2)
     if(arr[mid] == target) {
       /************关键的一步*************/
       if(arr[mid - 1] !== target || mid == 0) return mid
       /************关键的一步*************/
       else return binaryFind(arr, low, mid - 1, target)
     } else if(arr[mid] > target) {
       return binaryFind(arr, low, mid - 1, target)
     } else  {
       return binaryFind(arr, mid + 1, high, target)
     }
   }; 
   ```

2. ##### 查找最后一个值等于给定值的元素

   :bulb: 和第一个原理相同：当 **mid = 给定值** 的时候怎么操作：

   - 判断 **arr[mid +1]** 是否等于给定值（是否是第一个）
   - 判断 **mid** 是否等于 **arr.length - 1**（是否到达数组的最左或最右）

   :european_castle: 代码实现

   ```js
   // 递归算法
   function binaryFind(sortedArr, target) {
     if (sortedArr.length == 0) return -1
   
     let low = 0
     let high = sortedArr.length - 1
   
     while (low <= high) {
       const mid = Math.floor((low + high) / 2)
       const midValue = sortedArr[mid]
       if (target === midValue) {
         /************关键的一步*************/
         if(arr[mid + 1] !== target || mid === sortedArr.length - 1) return mid
         /************关键的一步*************/
         low = mid + 1
       } else if (target < midValue) {
         high = mid - 1
       } else {
         low = mid + 1
       }
     }
   
     return -1
   }
   ```

   ```js
   // 递归算法
   function binaryFind(arr, low, high, target) {
     if (low > high) return -1
     let mid = Math.floor((low + high) / 2)
     if (arr[mid] == target) {
       /************关键的一步*************/
       if (arr[mid + 1] !== target || mid == arr.length - 1) return mid
       /************关键的一步*************/
       else return binaryFind(arr, mid + 1, high, target)
     } else if (arr[mid] > target) {
       return binaryFind(arr, low, mid - 1, target)
     } else {
       return binaryFind(arr, mid + 1, high, target)
     }
   };
   ```

3. ##### 查找第一个值大于等于给定值的元素

   :bulb: 大于等于的实现比上面这两种更加容易实现

   :european_castle: 代码实现

   ```js
   // 循环实现
   function binaryFind(arr, target) {
     if (target.length < 1) return -1
   
     let low = 0,
         high = arr.length - 1,
         mid = Math.floor((low + high) / 2)
   
     while (low <= high) {
       mid = Math.floor((low + high) / 2)
       /************关键的一步*************/
       if (arr[mid] >= target) {
         if (arr[mid - 1] < target || mid === 0) return mid
         /************关键的一步*************/
         high = mid - 1
       } else {
         low = mid + 1
       }
     }
   
     return -1
   }
   ```

   ```js
   // 递归实现
   function binaryFind(arr, low, high, target) {
     if (low > high) return -1
     let mid = Math.floor((low + high) / 2)
     /************关键的一步*************/
     if (arr[mid] >= target) {
       if (arr[mid - 1] < target || mid == 0) return mid
       /************关键的一步*************/
       return binaryFind(arr, low, mid - 1, target)
     } else {
       return binaryFind(arr, mid + 1, high, target)
     }
   };
   ```

4. ##### 查找最后一個值小于等于给定值的元素

   :bulb: 实现的方式和上面类似

   :european_castle: 代码实现

   ```js
   // 遍历
   function binaryFind(arr, target) {
     if (target.length < 1) return -1
   
     let low = 0,
         high = arr.length - 1,
         mid = Math.floor((low + high) / 2)
   
     while (low <= high) {
       mid = Math.floor((low + high) / 2)
       /************关键的一步*************/
       if (arr[mid] <= target) {
         if (arr[mid + 1]  > target || mid === arr.length - 1) return mid
         /************关键的一步*************/
         low = mid + 1
       } else {
         high = mid - 1
       }
     }
   
     return -1
   }
   ```

   ```js
   // 递归
   function binaryFind(arr, low, high, target) {
     if (low > high) return -1
     let mid = Math.floor((low + high) / 2)
     if (arr[mid] <= target) {
       if (arr[mid + 1] > target || mid == arr.length - 1) return mid
       return binaryFind(arr, mid + 1, high, target)
     } else {
       return binaryFind(arr, low, mid - 1, target)
     }
   };
   ```

   

### 三，动态规划

#### 1.动态规划的解法

:key: 动态规划的特点：

1. 重叠子问题
2. 状态转移方程（想到这一步90%）
3. 最优子结构

:star: 解题套路：

1. 明确【状态】
2. 明确【选择】
3. 明确【dp函数/数组】的定义
4. 明确 base case （n == 0, n == 1 这些值最小值的判断）

![image-20211215125742640](/assets/suanfa.assets/image-20211215125742640.png)

![image-20211215125819064](/assets/suanfa.assets/image-20211215125819064.png)

#### 2.动态规划思想

:one: 首先来看下面这个例子：

实现一个斐波那契数列，有递归和非递归的写法，但是两者的速度是天差地别

1. 暴力递归，穷举所有可能：速度慢，每一个子项都会被重复计算

   ```js
   // 递归实现
   function fibnacc_1(n) {
     if (n === 1) return 1
     if (n === 2) return 1
   
     return fibnacc(n - 1) + fibnacc(n - 2)
   }
   
   // 子问题的重复计算
   /**
    * f(6) = f(5) + f(4) => f(4) + f(3) + f(4)
    * f(5) = f(4) + f(3) => f(3) + f(2) + f(3)
    * f(4) = f(3) + f(2) => f(2) + f(1) + f(2)
    * f(3) = f(2) + f(1) => f(1) + f(1) + f(1)
    * f(2) = f(1) = 1
    */
   ```

   ![image-20211214165742040](/assets/suanfa.assets/image-20211214165742040.png)

   递归算法时间复杂度 = 递归函数调用的次数 * 递归函数本身的复杂度。

   节点个数为2^n，暴力递归的时间复杂度为 2^n * 1



2. 自顶向下递归，带子项最优解缓存的递归

   ```js
   function fibnacc1(n) {
     let meno = [0, 1, 1]
   
     return helper(meno, n)
   }
   
   function helper(meno, n) {
     if (n <= 2) return 1
   
     // 去备忘录里看看有没有被算过
     if (meno[n] !== undefined) return meno[n]
   
     // 往备忘录里添加最优解
     meno[n] = helper(meno, n - 1) + helper(meno, n - 2)
   
     return meno[n]
   }
   ```

   <img src="/assets/suanfa.assets/image-20211215131600555.png" alt="image-20211215131600555" style={{zoom: '80%'}} />

3. 自底向上迭代

   ```js
   // 数组实现
   function fibnacc_2(n) {
     let arr = [0, 1, 1]
   
     if (n === 1 || n === 2) return 1
     for (let i = 2; i < n; i++) {
       arr.push(arr[i] + arr[i - 1])
     }
     return arr[n]
   }
   ```

   ![image-20211214170755566](/assets/suanfa.assets/image-20211214170755566.png)



把上面两种写法结合：使用递归 + 缓存重复子问题最优解，就是动态规划

#### 3.钢条切割问题

![image-20211214171313513](/assets/suanfa.assets/image-20211214171313513.png)

使用递归实现

```js
function curtRad(p, n) {
  if (n === 0) return 0

  let res = p[n] // 切0刀的时候,能卖9快
  for (let i = 1; i < n; i++) { // 遍历所有能切出的可能,把大的换掉res
    let v = curtRad(p, i) + curtRad(p, n - i)
    res = res > v ? res : v
  }

  return res

  /**
   * n:钢筋长度(最多有4中切法, 中间切3次 + 不切)
   * i = 1 n = 4
   * curtRad(p, 1) + curtRad(p, 3) 切1次和切3次
   * i = 2 n = 4
   * curtRad(p, 2) + curtRad(p, 2) 切2次和切2次
   * i = 3 n = 4
   * curtRad(p, 3) + curtRad(p, 1) 切3次和切1次
   */
}
```

优化递归

```js
function curtRad_2(p, n) {
  if (n === 0) return 0

  let res = p[n] // 切割0次的时候
  for (let i = 1; i <= n; i++) {  // 从左到右切割一刀切过去
    let v = p[i] + curtRad_2(p, n - i)  
    res = v > res ? v : res
  }

  return res
}
```

使用动态规划实现，缓存子问题最优解

```js
function curtRad3(p, n) {
  if (n === 0) return 0
  let arr = [0, 1]

  for (let i = 2; i < n; i++) {
    let res = p[n] // 切割0次
    for (let j = 1; j < i; j++) {
      let v = arr[j] + arr[i - j]
      res = v > res ? v : res
    }
    arr.push(res)
  }
  return arr[n - 1]
}
```









#### 4.找硬币问题

![image-20211215134516610](/assets/suanfa.assets/image-20211215134516610.png)

:bulb: 解决思路：

![image-20211215134551686](/assets/suanfa.assets/image-20211215134551686.png)

找10枚硬币，9枚硬币，6枚硬币的最优解



1. 暴力递归法

   ```js
   var coinChange = function (coins, amount) {
     if (amount === 0) return 0
     if (amount < 0) return -1
   
     let res = Number.MAX_VALUE
     for (let coin of coins) {
       let subPromble = coinChange(coins, amount - coin)
   
       if (subPromble === -1) continue
   
       res = Math.min(res, subPromble + 1)
   
     }
   
     return res
   };
   
   /**
    * 暴力递归解法
    * 
    *  1.状态：amount 目标金额
    *  2.选择：coins 数组中列出的所有硬币面额
    *  3.函数定义：凑出金额amout至少需要coinChange(coins,amount)枚硬币
    *  4.base case: amount == 0 需要0妹硬币，amount < 0 无法凑出，返回-1
    * 
    * 1 + min(coinChange([1, 2, 5], 11 - 1), coinChange([1, 2, 5], 11 - 2), coinChange([1, 2, 5], 11 - 5))
    * 
    */
   ```

2. 自顶而下递归

   ```js
   var coinChange = function (coins, amount) {
     let meno = [0]
     return dp(meno, coins, amount)
   };
   
   function dp(meno, coins, amount) {
     if (amount < 0) return -1
   
     if (meno[amount] !== undefined) return meno[amount]
   
     let res = Number.MAX_VALUE
     for (let coin of coins) {
       let subPromble = dp(meno, coins, amount - coin)
       if(subPromble === -1) continue
       res = Math.min(subPromble + 1, res)
     }
     meno[amount] = (res === Number.MAX_VALUE) ? -1 : meno[amount]
     return meno[amount] 
   }
   ```

   
