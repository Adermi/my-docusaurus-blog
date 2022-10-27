---
id: node
title: node学习
---

## 1.Node简介

### -Node**的应用**

- #### 作为中间层

  我们通常说前端和后端，前端负责用户界面，而后端负责提供数据和业务接口。现在我们在两者间加入一层，前端并不是直接去请求后端业务接口，而是请求到中间层。再由中间层去请求业务接口,看一下示意图：![image-20200512174416883](/assets/node.assets/image-20200512174416883.png)

  整个流程可以描述为：客户端直接请求到中间层的Node服务，Node服务分析请求，看需要哪个页面，再去请求对应数据，拿到数据后和模版结合成用户看到页面，再给到客户端。

  那么有的人可能会觉得，这种模式不是更麻烦了吗？其实不然，我们来看看 **中间层的优点** ：

  1. 减轻客户端内存，项目用户体验好。不会像 **mvvm** 模式的项目把页面渲染和数据请求都压在客户端，而是在服务端完成。
  2. **SEO** 性好，不像 **mvvm** 模式页面由 **js** 生成，而是在服务器渲染好html 字符，有利于网页被搜索到。
  3. 保持了前后端分离的优点和目的，即解放后端，后端可以继续以接口的形式写业务代码。
  4. 前端可以操控的范围增多，甚至可以做服务器，数据库层面的优化，比如中间层中常常用**nginx**，**redis**来优化项目，应对高并发。

  中间层模式是一种开发模式上的进步，为什么这么好的模式我从来没有听说过呢？因为这种模式成本过高，如果没有一定量级的项目没必要去采用。

- #### 做项目构建工具

  webpack，vue-cli 都是用node构建的

 
- #### 中小型网站后端

  用Node做后端，可能是大多数人认为的Node作用。其实真正在企业之中，很少会让你去用Node去做后端。 所以一般来说都是做一些小型或者个人站的后端。

### -Node.js简介

- #### Node.js是什么

  **Node.js** 诞生于 2009 年，由 **Joyent** 的员工 **Ryan** **Dahl** 开发而成, 目前官网最新版本已经更新到 12.0.0版本，最新稳定的是10.15.3。Node.js 不是一门语言也不是框架，**它只是基于 Google V8 引擎的 JavaScript 运行时环境**，同时结合 Libuv 扩展了 JavaScript 功能，使之支持 **io**、**fs** 等只有语言才有的特性，使得 JavaScript 能够同时具有 DOM 操作(浏览器)和 I/O、文件读写、操作数据库(服务器端)等能力，是目前最简单的全栈式语言。

  这里我们可以简单理解Node.js是一个内置有chrome V8引擎的JavaScript运行环境，他可以使原本在浏览器中运行的JavaScript有能力跑后端，从而操作我们数据库，进行文件读写等。

  目前市面上高密集的I/O模型，比如 Web 开发，微服务，前端构建等都有做Node.js的身影。不少大型网站都是使用 Node.js 作为后台开发语言的，比如 淘宝 双十一、去哪儿网 的 PC 端核心业务等。另外我们一些前端工具譬如VSCode,webpack等也是有Node.js开发。

  Node.js的包管理工具，npm已经成为世界开源包管理中最大的生态，功能强大，目前单月使用者接近1000万。

  #### 记住三点

  - Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境,让JavaScript的执行效率与低端的C语言的相近的执行效率。。
  - Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。
  - Node.js 的包管理器 npm，是全球最大的开源库生态系统。

### -Node.js特点

- 事件驱动
- 非阻塞IO模型（异步）
- 轻量和高效 

### -node安装

1. [安装方法](https://nodejs.org/en/download/) 官网安装

   - 注意

     Node.js 使得 JavaScript 可以脱离浏览器的窗口，独立运行在 Node.js 提供的环境中，所以Node.js中没有**BOM，DOM**这些概念。Node.js中根本没有页面，主要是进行一些服务器上的操作（比如：读写文件，网络通信...）

## 2.ES6

### -var的缺点

 `var`	ES5定义变量

缺点：

1. 可以**重复**声明	

   ```js
   var a = 10; 
   var a = 20;	// 不会报错
   ```

2. 全局作用域下的变量会绑定到**window**上

   ```js
   var a = 30;
   console.log(a)	// 30
   ```

3. 有**变量提升**机制

   ```js
   console.log(a)	// underfined
   var a = 40
   ```

4. 不能**定义常量**

   ```js
   var a = 50;
   a = 60	// 可以被随意修改
   ```

5. **不支持**块级作用域

   ```js
   for(var a = 10; a < 20; a++) {}
   console.log(a)	// 20
   
   if(true) {
     var b = 30
   } 
   console.log(b)	// 30
   ```

6. **暂时性死区**问题

   ```js
   typeof a	// underfined		浏览器bug，对未申明的变量进行typeof
   
   typeof b	// 报错，let解决了这个问题
   let b
   ```

### -let/const

> ES6中新增用来创建变量和常量的

```js
let a = 10;
a = 20;
console.log(a);     // => 13

const a = 10;
a = 20;             // 报错，基于const创建的变量不能被修改
```

- 基于const 创建的常量，其值不能被修改（函数，对象，不想被修改的量...）
- let/const 和 var 的区别：
  1. *let* **不存在**变量提升（当前作用域中，不能再let声明前使用变量）
  2. 同一个作用域下，*let* **不允许**重复声明
  3. *let* 解决了 *typeof* 的一个暂时性死区问题
  4. 全局作用域中，使用 *let* 声明的变量，并不会给 *window* 加上对应的属性
  5. *let* 会存在块级作用域（除了对象以外的大括号都能被看成块级私有作用域）

### -箭头函数及THIS

> ES6中新增了创建函数的方式："箭头函数"（真实项目是 箭头函数 和 *function* 混合使用的）

1. 箭头函数**简化**了创建函数的步骤（贼方便）

   ```js
   const fn = (x, y) => {
       return x + y
   }
   fn()
   
   // 并且，箭头函数不存在变量提升，也就是函数只能再创建完成之后被执行（创建代码之后执行）
   
   // 1. 形参只有一个，小括号可以不加
   const fn = x = {};
   
   // 2. 执行代码只有一行，并且是 return xxx的，可以省略大括号和return
   const fn = (x + y) => x + y
   
   // 3. 用这种方法写闭包非常方便
   function fn(x) {
       retnrn func(y) {
           return x + y
       }
   }
   
   const fn = x => y => x + y
   ```

2. 箭头函数没有`arguments`，可以用 `...` 剩余运算符类获取实参集合，并且实参支持设置默认值

   ```js
   let fn = (obj = {}, ...args) => {
       console.log(args);
       console.log(obj);
   }
   
   fn(1, 2, 3)     // Array(2) [ 2, 3 ] 1
   ```

3. 箭头函数中没有自己的 `this`，它里面的 this 都是自己所处上下文中的 this（项目中涉及this，慎用）

   > 可以把箭头函数的 this 理解成向作用域中寻找变量一样

   ```js
   const fn = () => {
     console.log(this.name);
   }
   window.name = 'WINDOW';
   let obj = {
     name: 'xyb',
     fn: fn
   };
   
   fn()                // "WINDOW" => 当前是在
   obj.fn(obj)         // "WINDOW" => fn在对象里面指向的是window
   obj.fn.call(obj)    // "WINDOW" => call并不能改变箭头函数this指向
   btn.addEventListener('click', obj.fn) // "WINDOW" => 按钮也不能改变this指向
   
   
   // 1. 箭头函数中的 this 是自己所处上下文中的 this
   const obj = {
     name: 'xyb',
     fn: function() {
       let fn = () => {
         console.log(this.name)   // "xyb"，当前箭头函数所在的上下文中的this指向obj
       }
       fn();
     }
   }
   
   // 2. 用箭头函数的 this 也是有好处的
   let obj = {
     name: 'xyb',
     fn: function() {
       window.setTimeout(function() {
         this.name = 'lyw'			// 这里的this改变的是window
       }, 1000)
     }
   }
   
   let obj = {
     name: 'xyb',
     fn: function() {
       setTimeout(() => {
         this.name = 'lyw'			// 这里的this改变的就是obj了
       }, 1000)
     }
   }
   ```

   this的五条规则：

   1. 给元素的某个事件行为绑定方法，当事件触发，方法执行，方法中的 **this** 指向的就是`元素本身`
   2. 方法执行看看前面有没有 `.`，如果有**this**就是 `.` 前面的对象，没有就是 `window`
   3. 在构造函数当中，构造函数中 **this** 是当前类的一个`实例`
   4. 通过 `call/apply/bind` 强制改变函数的this指向
   5. 遇到箭头函数，**this** 只能是当前`上下文(类似作用域链)中的this`（前面四句话都不算话）

### -Arry|Obj解构

> 让左侧出现和右侧值相同的结构，以此快速获取到我们需要的内容（常用来给对象和数组解构）

- 数组解构赋值

  ```js
  let ary = [1, 2, 3, 4, 5];
  
  // a和b分配完以后，把ary中剩下的值丢给x
  let [a, b, ...x] = ary
  
  // 省略赋值，逗号之间的值为underfined
  let [one, two, , four] = ary;
  
  // 添加默认值（不添加为underfined）
  let [m, n, , , , s = 5] = ary
  
  // 多维数组获取
  let ary1 = [1, 2, [3, 4, [5, 6, [7, 8]]]]
  let [, , [, , [, , [, value]]]] = ary1
  ```

- 对象解构赋值

  ```js
  let obj = {
      name: 'xyb',
      age: 20,
      sex: 'M',
      hobbies: ['健康', '女朋友', '自由'],
      girl: {
          name: 'lyw',
          age: 19,
      }
  }
  
  // 对象解构赋值的左侧变量必须与右侧相同（若是不存在为underfined）
  let { name, sex } = obj       
  
  // 对解构出来的name和sex进行重命名，防止命名冲突
  let { name: myName, sex: mySex } = obj  
  
  // 给解构的值进行设置默认值
  let { weight = '默认的值' } = obj   
  
  // 把对象里的数组值解构出来
  let { name, hobbies: [, girl] } = obj   
  
  // 把对象中的对象解构出来
  let { name, girl: { name: girlName } } = obj    
  ```

### -ES6的**`...`**运算符

1. 拓展运算符（多用在解构赋值中）

2. 展开运算符（多用在传递实参中）

3. 剩余运算符（多用在接收实参中）

   ```js
   // 1. 拓展运算符，解构赋值, 拓展运算符，只能在最后面
   let [n, ...m] = [10, 20, 30, 40];
   // n: 10
   // m: [20, 30, 40]
   
   // 2. 展开运算符，传递实参, 展开运算符（把数据从数组|对象中展开）
   let a = [1, 0, 2, 60, 30, 30]
   function fn(a, b, c) {
       console.log(a);
       console.log(b);
       console.log(c);
   }
   fn(...a)
   // a: 1
   // b: 0
   // c: 2
   
   // 数组克隆/对象克隆
   let ary = [1, 2, 3, 4]
   let cloneAry = [...ary, 10, 20, 30]
   
   let obj = {name:'xyb', age: 20}
   let cloneObj = {...obj, girl: 'lyw'}
   
   // 3. 剩余运算符（接收函数实参）
   function fn(...args) {
     console.log(args)
   }
   
   fn(1, 2, 3)   // [ 1, 2, 3 ]
   ```

### -class创建类

传统的创建类，是用**原型+构造函数**创建类，模糊了函数和类的界限，ES6给我们提供了专门创建类的class

> 虽然是用class创建类，背后的`原理还是`使用【构造函数+原型】的模式来创建类的

- class创建类

  ```js
  // 传统创建函数的方式：【构造函数+原型】
  function Person(name, age) {
      this.name = name;
      this.age = age;
  }
  
  Person.prototype.sayHi = () => {
      console.log('Hi~');
  }
  
  let xyb = new Person('xyb', 20)
  
  // 使用class创建类
  class Person {
      constructor(name, age) {
          this.name = name;		// 该constructor方法是构造函数的做法【构造函数】
          this.age = age;
      }
    
      sayHi() {					// 该方法是直接加在对象的原型上的【原型方法】
          console.log('Hi~')
      }
    
      static myFunc() {}	
      // 设置static的，是Person的工具方法（静态方法），只能通过 Person.sayHi来调用
    
      x = 300
  	// 这样设置还是添加到对象的私有属性上
  }
  
  let person1 = new Person('xyb', 20);
  person1.sayHi()     // Hi~
  person1.myFunc()    // 报错，只能 Person.myFunc() 这样调用
  ```

### -模板字符串

> 以往的字符串拼接是一件很痛苦的事情，而且不能进行换行，模板字符串都能解决

- 字符串拼接功能

  ```js
  let name = 'xyb';
  let age = 20;
  let sex = 'M'
  
  let word = `Hello, everyone! I'm ${name} ${age}years old, I am ${sex}`;
  // 使用 `` 反引号和 ${} 来进行拼接
  console.log(word);
  ```

- 换行功能

  ```js
  let codes = `<meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>`
  
  // 使用模板字符串能进行换行功能，而传统的不行
  ```

- 函数功能

  ```js
  const name = 'xyb'
  const person = '天才'
  
  function fn(strings, ...values) {
    // strings 为一个以${value}切割的数组 ['', 是一个, '']
    // values 为${value}里面的value的值的数组 ['xyb', '天才']
  
    let result = '';
    strings.forEach((item, index) => {
      // XYB是一个天才
      result += (item + (values[index] == undefined ? '': values[index].toUpperCase()))
    })
    return result
  }
  
  // 相当于函数执行，模板字符串的特殊性，相当于我们可以自己定义逻辑
  let a = fn `${name}是一个${person}`
  
  console.log(a)
  ```

  

### -数组对象扩展方法

- ##### Array.from

  ------

  将**伪数组**或可遍历对象转换成**真正的数组**

  ```js
  var divs = document.querySelectorAll('div');
  console.log([...divs]); // 把伪数组转换成真数组
  console.log(Array.from(divs)); // 把伪数组转换成真数组
  console.log(Array.from(divs, item => item.innerHTML = '666')); // 对每个值进行处理
  ```

- ##### Array.find

  ------

  查找数组当中第一个满足条件的值，查找不到则值为 **underfined** 

  ```js
  var ary = [{
      id: 1,
      name: 'x'
  }, {
      id: 2,
      name: 'y'
  }, {
      id: 3,
      name: 'z'
  }]
  
  var target = ary.find( item => {
      return item.id == 2;    // 返回id == 2 的对象
  });
  console.log(target);
  ```

- ##### Array.findIndex

  ------

  查找第一个复合条件的数组成员的位置，找不到返回 -1

  ```js
  let arr = [1, 5, 8, 4, 3, 6, 10];
  var target = arr.findIndex(item => item > 5);
  console.log(target);    // 2
  ```

- ##### Array.includes

  ------

  某个值是否出现在数组中，返回布尔值

  ```js
  let arr = [1, 5, 8, 6, 'a'];
  console.log(arr.includes(5)); // true
  console.log(arr.includes('b')); // false
  console.log(arr.includes('a')); // true
  ```

### -数组高阶方法

#### filter

------

*filter()* 方法创建一个新数组, 其包含通过所提供的回调函数函数实现的测试的所有元素。

**语法** 

```js
var newArray = arr.filter(callback(element, index, array), thisArg)
```

**参数**

`callback`

- `element`	

  数组中当前正在处理的元素。

- `index ` 可选

  正在处理的元素在数组中的索引。

- `array` 可选

  调用了 *filter* 的数组本身。

`thisArg ` 可选 

**返回值**

一个新的数组，如果被测试数组没有能通过的元素，返回空数组

说明

`filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)的元素创建一个新数组。

`callback` 被调用时传入三个参数：

1. 元素的值
2. 元素的索引
3. 被遍历的数组本身

使用

1. 基本写法

   ```js
   const arr = [1, 2, 3, 4, 5, 6, 7, 8];
   
   let newArr = arr.filter(function(item, index, arr) {		// 基本写法
       console.log(item);	// 1, 2, 3, 4, 5这些值
       console.log(index);	// 0， 1， 2， 3这些下标值
       console.log(arr);	// [1, 2, 3, 4, 5, 6, 7, 8]
       if (item > 6) {
           return true
       }
   })
   
   // newArr = [7, 8]
   ```

2. 使用**箭头函数**

   ```js
   const arr = ['aa', 'aab', 'bba', 'cca', 'aagf'];
   
   let newArr = arr.filter(item => {
       return item.startsWith('a') ? true : false
   })
   
   // 筛选数组里面值开头字母为 a 的元素为一个新的数组
   console.log(newArr);
   
   // 筛选id大于1的选项
   const arr = [{
       id: 1
   }, {
       id: 2
   }, {
       id: 3
   }];
   
   let newArr = arr.filter(item => {
       return item.id > 1
   })
   console.log(newArr);
   ```

#### map

------

*map()* 方法创建一个新数组, 其包含经过 *callback* 处理之后返回的所有元素。

**语法** 

```js
var newArray = arr.map(callback(element, index, array), thisArg)
```

**参数**

`callback`

- `element`	

  数组中当前正在处理的元素。

- `index ` 可选

  正在处理的元素在数组中的索引。

- `array` 可选

  调用了 *filter* 的数组本身。

`thisArg ` 可选   回调函数中 this 的指向

**返回值**

一个新的数组

**说明**

`map` 为数组中的每个元素调用一次 `callback` 函数，并利用所有 `callback` 返回的元素创建一个新数组。

`callback` 被调用时传入三个参数：

1. 元素的值
2. 元素的索引
3. 被遍历的数组本身

使用

1. 对数组处理

   ```js
   const arr = [1, 2, 3, 4, 5, 6, 7, 8];
   
   let newArr = arr.map(item => {
       return item * 10
   })
   console.log(newArr);    // [10, 20, 30, 40, 50, 60, 70, 80]
   ```

2. 对数组内的对象处理

   ```js
   const arr = [{
       id: 1
   }, {
       id: 2
   }, {
       id: 3
   }];
   
   let newArr = arr.map(item => {
       item.id += 20;
       return item
   })
   console.log(newArr); // [{{id: 21}}, {{id: 22}}, {{id: 23}}]
   ```

#### reduce

------

**reduce()** 方法对数组中的每个元素执行一个由我提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

**语法** 

```js
var newArray = arr.reduce(callback(element, index, array), initialValue)
```

**参数**

`callback`

- `accumulator`

  callback 返回的值，第一次调用的时候为我们提供的 `initialValue`  初始值

- `element`	

  数组中当前正在处理的元素。

- `index ` 可选

  正在处理的元素在数组中的索引。

- `array` 可选

  调用了 *filter* 的数组本身。

`initialValue ` 可选 ：作为第一次调用 `callback` 函数时的第一个参数的值 | 如果没有提供初始值，将使用数组中的第一个元素

**返回值**

	函数累计处理的结果

**说明**

`reduce` 为数组中的每个元素调用一次 `callback` 函数，并把 `callback` 的值传入下一个 `callback` 中**previousValue **这个参数，若调用时为最后一次，则r把 **return** 的值给返回出去给变量

`callback` 被调用时传入四个参数：

1. 我们提供的初始值
2. 元素的值
3. 元素的索引
4. 被遍历的数组本身

使用

1. 对数组处理

   ```js
   // 案例1
   const arr = [1, 2, 3, 4, 5, 6, 7, 8];
   
   let newValue = arr.reduce(function(previousValue, value) {
       return previousValue + value		// 该返回值成为下一个回调函数的previousValue值
   }, 0)
   
   console.log(newValue);	// 该值为arr里面所有值的总和
   
   // 案例2
   const arr = ['a', 'b', 'c', 'd', 'e', 'f']
   
   let newArr = arr.reduce(function(previousValue, value) {
       return previousValue + value
   }, '')
   
   console.log(newArr);    // abcdef
   ```

2. 对数组内的对象处理

   ```js
   const arr = [{
       id: 1,
       price: 56
   }, {
       id: 2,
       price: 23
   }, {
       id: 3,
       price: 14
   }, {
       id: 4,
       price: 73
   }];
   
   let newValue = arr.reduce(function(previousValue, item) {
       return previousValue + item.price
   }, 0)
   
   console.log(newValue);
   ```

### -Set

MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

**`Set`** 对象允许你存储任何类型的唯一值，无论是[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)或者是对象引用。

```js
let set = new Set([1, 2, 3, 4, 1, 1, 1, 1, 1])
console.log(set)
```

![image-20200517103327866](/assets/node.assets/image-20200517103327866.png)

### -Map

MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

**`Map`** 对象保存键值对，并且**能够记住键**的原始插入顺序。任何值(对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)) 都可以作为一个键或一个值。可以被**迭代**😍

```js
let map = new Map()
let obj = {}
map.obj = {}
console.log(map)
```

![image-20200517103045926](/assets/node.assets/image-20200517103045926.png)

## 3.异步发展流程

### -回调函数

*实现一个文件读取* ,使用回调函数的方法

- *回调函数的特点：第一个形参永远都是错误对象*

  ```js
  let fs = require('fs')
  fs.readFile('./demo.html', 'utf8', function(err, oneData) {
    if(oneData) {
      fs.readFile('./demo.html', 'utf8', function(err, twoData) {
        let newData = oneData + twoData
        fs.readFile('./demo.html', 'utf8', function(err, threeData) {
          let Data = oneData + newData
          })
      })
    }
  })
  
  // 一个文件读取要依赖另外一个文件的读取，层层回调嵌套
  ```

- *回调函数的问题：*

  ```js
  /**
   *	1. 无法捕捉回调函数中的错误，因为代码是异步的
   */
  try {  // 异步的永远捕捉不到
    fs.readFile('./demo.html', function(err, data) {
      if(err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  } catch(e) {
    console.log(e)
  }
  
  // 2. 因为是异步执行的，拿不到return的值，这行代码早就执行了是非阻塞io
  let res = fs.readFile('./demo.html', function(err, data) {...})
  
  /**
   * 3. 回调地狱
   *	- 难以维护
   *	- 效率低，另外一个要等到一个执行完成
   */
  fs.readFile('./demo.html', 'utf8', function(err, oneData) {
    if(oneData) {
      fs.readFile('./demo.html', 'utf8', function(err, twoData) {
        let newData = oneData + twoData
        fs.readFile('./demo.html', 'utf8', function(err, threeData) {
            let Data = oneData + newData
          })
      })
    }
  })
  ```

### -事件发布订阅模式

- 通过事件发布订阅模式实现

  ```js
  // 事件发布订阅模式 
  // 	通过EventEmitter这个模块实现，通过他可以创建时间发射器的实例，有两个核心方法
  // 	一个叫on(注册监听) emit(发射事件)
  let fs = require('fs')
  let EventEmitter = require('events')
  let eve = new EventEmitter();
  let html = {} // 存放最终数据
  // 监听数据获取成功事件，当事件发生之后，调用回调函数
  eve.on('ready', function(key, value) {
    html[key] = value
    if(Object.keys(html).length === 2) {
      console.log(html)
    }
  })
  fs.readFile('./demo.html', 'utf8', function(err, oneData) {
    eve.emit('ready', 'oneData', oneData)
  })
  fs.readFile('./demo.html', 'utf8', function(err, twoData) {
    eve.emit('ready', 'twoData', twoData)
  })
  
  console.log('开始')
  ```

- 通过哨兵实现

  ```js
  2. 通过哨兵函数实现控制并发
  function render(length, callback) {
    let html = {}
    return function(key, value) {
      html[key] = value
      if(Object.keys(html).length === length) {
        callback(html)
      }
    }
  }
  
  let done = render(2, function(html) { // 2是哨兵变量，可以控制任务总数量
    console.log(html)
  })
  
  fs.readFile('./demo.html', 'utf8', function(err, oneData) {
    done('oneData', oneData);
  })
  fs.readFile('./demo.html', 'utf8', function(err, twoData) {
    done('twoData', twoData)
  })
  ```

### -生成器+Promise

JS中的生成器，和其他语言一样

```js
/** 
 *  生成器函数是一个函数，可以用来生成迭代器
 *  生成器和普通函数不一样，普通函数一旦运行就会全部执行完，生成器可以配合yield关键字暂停函数 
 *  生成器有若干个阶段
 */
function *generator() {
  console.log(1)
  let res = yield 2 // 外部next传入值
  console.log(res)
  console.log(3)
  yield 4
  console.log(5)
}

let iterator = generator()  
// 生成器可以生成一个迭代器(每次调用next函数会传出一个值)
console.log(iterator.next())  
// 第一次调用返回 {value: 2, done: false} value是产出的值，done是是否迭代完成
console.log(iterator.next('res'))
console.log(iterator.next())  
// 如果生成器函数没有return值，那么最后传出{value: undefined, done: true}
```

使用生成器 + Promise来解决异步问题

```js
let fs = require('fs')

// 使用Promise封装异步任务来产出值
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', function (err, data) {
      err ? reject(err) : resolve(data)
    })
  })
}

// 在生成器中，yeild前面的值需要我们手动配合Promise来传入值，而且await则自动产出值
function* read() {
  let a = yield readFile('1.txt')
  console.log(a)
  let b = yield readFile('1.txt')
  console.log(b)
  let c = yield readFile('1.txt')
  console.log(c)
  return c
}

// 手动执行generator函数
// let it = read()
// let res1 = it.next() // {value, done}
// console.log(res1)
// res1.value.then(
//   value => {
//     let res2 = it.next(value)
//     res2.value.then(
//       value => {
//         let res3 = it.next(value)
//         res3.value.then(
//           value => {
//             let res4 = it.next(value)
//             console.log(res4)
//           }
//         )
//       }
//     )
//   }
// )

// 自动帮我们执行generator函数，用的是co模块，这里实现其原理
function co(gen) {
  let it = gen()
  return new Promise((resolve, reject) => {
    ~(function next(lastValue) {
      let {
        value,
        done
      } = it.next(lastValue)
      if (!done) {
        value.then(next, reject)
      } else {
        resolve(value)
      }
    })()
  })
}

co(read).then(
  value => {
    console.log(value)
  }
)
```

### -async+await

```js
// 异步终极解决方案,最简单的方案，是generator+Promise的语法糖

let fs = require('fs')

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', function (err, data) {
      err ? reject(err) : resolve(data)
    })
  })
}

/** 
 *  1. 简介
 *  2. 有很好的语义
 *  3. 可以很好的处理异步 
 */
async function read() {
  let a = await readFile('./1.txt')
  console.log(a)
  let b = await readFile('./1.txt')
  console.log(b)
  let c = await readFile('./1.txt')
  console.log(c)
  return 'ok'
}

read().then(
  value => {
    console.log(value)
  }
)
//	1 1 1 ok


/** 
 *   上面async+await的原理就是generator+promise来实现的 
 */
function co(gen) {
  let it = gen()
  return new Promise((resolve, reject) => {
    ~(function next(lastValue) {
      let {
        value,
        done
      } = it.next(lastValue)
      if (!done) {
        value.then(next, reject)
      } else {
        resolve(value)
      }
    })()
  })
}

// let co = require('co')
function read() {
  return co(function* () {
    let a = yield readFile('1.txt')
    console.log(a)
    let b = yield readFile('1.txt')
    console.log(b)
    let c = yield readFile('1.txt')
    console.log(c)
    return 'ok' 
  })
}

read().then(
  value => {
    console.log(value)
  }
)
```

### -案例:异步动画

![1](/assets/node.assets/1.gif)



1. 回调实现

   ```js
   function animate(obj, target, callback) {
     obj.timer = setInterval(function () {
       obj.style.left = obj.offsetLeft + 5 + 'px';
       if (obj.offsetLeft >= target) {
         clearInterval(obj.timer)
         callback()
       }
     }, 30)
   }
   
   animate(one, 200, function () {
     animate(two, 200, function () {
       animate(three, 200, function () {
         console.log('成功执行')
       })
     })
   })
   ```

2. Promise实现

   ```js
   // 2.Promise实现
   function animate(obj, target) {
     return new Promise((resolve, reject) => {
       let index = 0
       obj.timer = setInterval(function () {
         obj.style.transform = `translateX(${(index+=3)}px)`
         if (index >= target) {
           clearInterval(obj.timer)
           resolve(null)
         }
       }, 30)
     })
   }
   
   animate(one, 200)
     .then(
     value => animate(two, 200)
   )
     .then(
     value => animate(three, 200)
   )
     .then(
     value => console.log('成功')
   )
   ```

3. Promise+Generator实现

   ```js
   // co函数能够自动帮我们执行Generator
   function co(generator) {
     let it = generator()
     return new Promise((resolve, reject) => {
       ~(function next(oneValue) {
         let {
           value,
           done
         } = it.next(oneValue)
         if (!done) {
           value.then(next, reject)
         } else {
           resolve(value)
         }
       })(1);
     })
   }
   
   function go() {
     return co(
       function* () {
         yield animate(one, 200)
         yield animate(two, 200)
         yield animate(three, 200)
       }
     )
   }
   
   go().then(
     () => {
       console.log('成功')
     }
   )
   ```

4. async+await实现

   ```js
   async function go() {
     await animate(one, 200)
     await animate(two, 200)
     await animate(three, 200)
   }
   
   go().then(
     () => {
       console.log('ok')
     }
   )
   ```


## 4.node属性方法

### -console控制台

- console.log	 打印值

- console.info    打印信息

- console.error  抛出警告,不会中断代码 ( 红色警告 )

- console.warn  抛出警告,不会中断代码 ( 黄色警告 )

- console.dir      打印对象,列出对象结构

- console.time   计算时间, 配合console.timeEnd

- console.timeEnd    计算时间, 配合console.time   

  ```js
  console.time('开始');
  for (let i = 10; i > 0; i--) {}
  console.timeEnd('开始')
  
  // 开始：11 毫秒 - 倒计时结束
  ```

- console.trace  向Web控制台输出一个调用栈.

- console.assert   断言 console.assert(1==2, '错误') => 抛出警告'错误'

### -global&process

**Global对象**

- 浏览器下需要通过 **window** 来访问 **global**, 在 **nodeJS** 中是能直接访问 **Global** 对象

  浏览器下

  ```js
  console.log(window)
  ```

  node下

  ```js
  console.log(global)
  ```

  Global的属性

  1. console    控制台

  2. 单次定时器  setTimeout clearTimeout

  3. 重复定时器  setInterval clearInterval

  4. 定时器对象方法: unref ref

  5. Buffer

  6. process    当前进程

     1. process.pid    进程id

        ```js
        console.log(process.pid)	// 24344
        ```

     2. process.cwd   当前文件所在目录

        ```js
        console.log(process.cwd())
        // E:\javascript\JavaScript\Code\Node学习
        ```

     3. process.nextTick    把回调函数放到微任务队列中

        global.setImmediate	把回调函数放到回调队列尾部执行

        ```js
        let fs = require('fs')
        function fn() {
          process.nextTick(
            function () {
              console.log(2)
              process.nextTick(
                function () {
                  console.log(3)
                }
              )
            }
          )
        }
        
        function fn2() {
          setImmediate(function() {
            console.log(5)
          })
        }
        
        setTimeout(() => {
          console.log(4)
        })
        fn2()
        fn()
        console.log(1)
        
        // 1 2 3 4 5
        ```

     4. stdout  stdout  stdout  

     5. argv    

        ```js
        console.log(process.argv)	
        
        // =>
        [
          'D:\\WorkPlace\\node\\node.exe',
          'E:\\javascript\\JavaScript\\Code\\Node学习\\2.Global全局对象.js'
        ]
        ```

     6. chdir    改变当前目录

        ```js
        process.chdir('../..')	// 把当前线程切换到上级目录
        console.log(process.cwd())	// E:\javascript\JavaScript
        ```

     7. memoryUsage    当前内存使用量

        ```js
        console.log(process.memoryUsage())
        
        {
        rss: 19324928,				// 常驻内存
        heapTotal: 5218304,		// 堆的总申请量
        heapUsed: 3260248,		// 已使用量
        external: 1445943			// 外部内存使用量
        }
        ```

### -EventEmitter 

![image-20200520204606454](/assets/node.assets/image-20200520204606454.png)

- EventEmitter 的使用

  ```js
  // let EventEmitter = require('events')
  let EventEmitter = require('./4.自定义events')
  let util = require('util')
  
  
  // 1. 构造函数版本
  function Student() {
    // 继承私有方法
    EventEmitter.call(this)
  }
  
  // util库的继承方法, 原型继承  inherits(子类, 父类)
  util.inherits(Student, EventEmitter)
  
  let one = new Student()
  
  one.setMaxListeners(2)
  
  one.on('上学', function (name, age) {
    console.log(`学生1${name}, 今年${age}岁, 上学去了`)
  })
  
  one.on('上学', function (name, age) {
    console.log(`学生2${name}, 今年${age}岁, 上学去了`)
  })
  
  one.once('上学', function (name, age) {
    console.log(`学生3${name}, 今年${age}岁, 上学去了`)
  })
  
  setTimeout(() => {
    one.emit('上学', 'xyb', 20)
    one.emit('上学', 'gkx', 21)
  }, 0)
  ```

手写EventEmitter 

```js
~(function (window) {
  function EventEmitter() {
    this.eventPool = {}
    // 一个事件默认的便规定的函数为多少个,超过为内存泄漏
    this._maxListers = 10
  }

  EventEmitter.prototype = {
    constructor: EventEmitter,

    on(event, callback) {
      if (Array.isArray(this.eventPool[event])) {
        if (this.eventPool[event].length > this._maxListers) {
            console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.eventPool[event].length} ${event} listeners added to [${this.__proto__.constructor.name}]. Use emitter.setMaxListeners() to increase limit`)
        }
        this.eventPool[event].push(callback)
      } else {
        this.eventPool[event] = [callback]
      }
    },

    addListener(event, callback) {
      this.on(event, callback)
    },

    emit(event, ...args) {
      if (this.eventPool[event]) {
        this.eventPool[event].forEach((callback) => {
          callback.apply(this, args)
        })
      }
    },

    once(event, callback) {
      // 执行一次事件就删除回调函数,后续所有事件不在执行
      function onetime(...args) {
        callback.apply(this, args)
        this.removeListener(event, onetime)
      }
      Array.isArray(this.eventPool[event]) ? this.eventPool[event].push(onetime) : this.eventPool[event] = [onetime]
    },

    removeListener(event, callback) {
      if (this.eventPool[event]) {
        this.eventPool[event] = this.eventPool[event].filter(item => item !== callback)
      }
    },

    removeAllListeners(...event) {
      if (event.length > 1) {
        event.forEach(item => {
          delete this.eventPool[item]
        })
      } else {
        delete this.eventPool[event[0]]
      }
    },

    listeners(event) {
      return this.eventPool[event]
    },

    setMaxListeners(num) {
      this._maxListers = num
    }
  }

  window.EventEmitter = EventEmitter
})(global)
```

### -util工具

> util自带了很多工具方法

![image-20200520210800451](/assets/node.assets/image-20200520210800451.png)

```js
let util = require('util')
let obj = {
  name: 'xyb',
  age: 20,
  hobby: {
    one: ['吃'],
    two: {
      oneDay: 'one',
      twoDay: 'two'
    }
  }
}
let arr = [1, 2, [3, 4, [5, 6]]]
console.log(util.inspect(obj, {depth: 0}))  // 对象|数组展开的深度
// { name: 'xyb', age: 20, hobby: [Object] }
console.log(util.inspect(arr, {depth: 0}))	// 对象|数组展开的深度
// [ 1, 2, [Array] ]
```



##  5.模块和npm

### -JS模块的演化

> JS刚起步的时候, 没有模块系统, 不支持封闭作用域和包之间的依赖管理, 慢慢演变成熟

1. 无模块 ( 所有的方法,变量都在同一个作用域下,会互相冲突 )
2. AMD&CMD
3. commonJS ( Node实现commonJS规范 )
4.  ES6模块化

### -node中的模块分类

1. ##### 核心模块 ( 原生模块, 加载最快 )

   `http` `path` `fs` `util` `events` 是编译成二进制码, 加载速度最快，node直接加载到了内存中

2. ##### 文件模块 ( 第三方用户自己编写的 )

   > 支持三种格式的文件 `.js`  `.json`  `.node(c++扩展)`,  
>
   > - require 的 extensions 属性中存放着三种文件的读取读取方式

   1. 相对|绝对路径 ( 加载第二快 )

      若 `require` 里面的是 `./../`  `C:\\file\\...` 则在对应的相对|绝对路径下查找文件

      > 若没有写写文件后缀, 默认以`.js`  -> ` .json`  -> ` .node`文件进行查找

   2. 文件名 ( 没有确定的文件路径, 需要进行路径分析, 加载最慢 )

      若 `require` 里面的是 `aaa`  `bbb.js` , 则按照以下规则查找

      1. ###### 首先从当前目录下的 node_modules 文件中开始查找

      2. ###### 若找不到, 再去上级目录中的 node_modules  中查找, 直到最上层目录

         > 若没有写写文件后缀, 默认以`.js`  -> ` .json`  -> ` .node`文件进行查找
      
         ```js
         let m = require('aaa')
         paths: [
           'E:\\javascript\\JavaScript\\Code\\node_modules',
           'E:\\javascript\\JavaScript\\node_modules',
           'E:\\javascript\\node_modules',
           'E:\\node_modules',
         ]
         // 1. 首先在第一个路径中查找 E:\\javascript\\JavaScript\\Code\\node_modules
         // 路径1. E:\\javascript\\JavaScript\\Code\\node_modules\\aaa.js
         // 路径2. E:\\javascript\\JavaScript\\Code\\node_modules\\aaa.json
         // 路径3. E:\\javascript\\JavaScript\\Code\\node_modules\\aaa.node
         // ...
         // 2. 若找不到,  第二个路径 E:\\javascript\\JavaScript\\node_modules
         // 路径1. E:\\javascript\\JavaScript\\node_modules\\aaa.js
         // 路径2. E:\\javascript\\JavaScript\\node_modules\\aaa.json
         // 路径3. E:\\javascript\\JavaScript\\node_modules\\aaa.node
         // ...
         // 以此类推, 直到顶层的 E:\\node_modules文件, 最后找不到报错
         
         let m = require('./aaa')
         // 只在当前目录中查找
         // 1. ./aaa.js
         // 2. ./aaa.json
         // 3. ./aaa.node
         // 找不到报错
         
         let m = require('bbb.json')
         paths: [
           'E:\\javascript\\JavaScript\\Code\\node_modules',
           'E:\\javascript\\JavaScript\\node_modules',
           'E:\\javascript\\node_modules',
           'E:\\node_modules',
         ]
         // 1. 首先在第一个路径中查找 E:\\javascript\\JavaScript\\Code\\node_modules
         //	E:\\javascript\\JavaScript\\Code\\node_modules\\ bbb.json
         // 2. 若找不到,  第二个路径 E:\\javascript\\JavaScript\\node_modules
         //	E:\\javascript\\JavaScript\\node_modules\\ bbb.json
      // 以此类推, 直到顶层的 E:\\node_modules文件, 最后找不到报错
         ```

      3. ###### 若找到的是包

         根据包中 `package.json` 中的 `main` 的路径进行导入, 若没有该字段, 则默认导入该包下的 `index.js`
      
         , 若没有写文件后缀名, 则对 `.json` `.node` 依次进a行尝试

### -node中JS模块编译

node中, 每一个文件模块都是对象, 具体定义如下

```js
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  if (parent && parent.children) {
    parent.children.push(this);
  }
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

// node在定位到文件之后, 会新建一个模块对象, 根据路径进行编译
// 每一个编译成功的模块文件的路径贵缓存到 require.cache上
```

每个模块文件中都存放着  `require` 、 `exports` 、 `module`  `__filename` 、`__dirname`  从哪来?

- 在编译的过程中, node 对 js 模块文件进行了从头到尾的包装

  ```js
  var obj = {
    name: 'xyb',
    age: 20
  }
  exports.info = obj
  
  // 上面的代码被node运行时, 会被包装成 =>
  (function (exports, require, module, __filename, __dirname) {
    var obj = {
      name: 'xyb',
      age: 20
    }
    exports.info = obj
  });
  
  
  // <深入浅出nodejs> 一书 : 
  
  ```

  每一个文件模块都进行了函数包装, 都有自己的私有栈内存, 不会污染

  > 在node对包装够的模块文件进行执行时候, 会传入这5个属性, 都是形参
  >
  > 注意: 如果要重写导出对象, 请在module.exports进行操作, exports只是形参



### -包和NPM

1. node中包模型

   ![image-20200524102909415](/assets/node.assets/image-20200524102909415.png)

2. 包结构

   包其实就是一个文件夹, 就是被打包成 .zip | .gz 格式的文件, 安装解压之后, 一个完全符合规范的包应该有如下的字段

   - `package.json`  包描述文件
   - `bin` 存放可执行二进制文件
   - `lib`  存放js代码文件
   - `doc ` 存放文档文件
   - `text` 存放单元测试的代码

3. 包描述文件package.json

   包描述文件用来表达包的信息, 是一个 json 类型的文件, 位于包的根目录, 具体字段如下

   - **name** - 包名

   - **description** - 包简介

   - **version** - 版本号

   - **keywords** - 关键字数组, 类似seo搜索优化

   - **maintainers** - 包维护者列表, 每个维护者为一个name  email 、web组成的对象, NPM通过该性权限认证

   - **contributors** - 贡献者列表

   - **bugs** - 提交bugs的网站或邮件地址

   - **licenses** - 包使用许可列表, 在那些许可证下可以使用

   - **repositories** - 托管代码的位置, 一般都放github

   - **`dependencies`** - 包依赖(十分重要), `npm init`之后, npm通过这个字段自动加载依赖包

   - **homepage** - 包网址

   - **os** - 操作系统支持列表

   - **cpu** - cpu架构支持列表

   - **engine** - 支持的js引擎列表

   - **builtin** - 标志当前包是否内建在底层系统的标准组件

   - **directories** - 包目录

   - **implements** - 实施了多少CommonJS规范的列表

   - **scripts** -   脚本说明对象, 主要用来被包管理用来安装, 编译, 测试和卸载用

     包描述文件的规范中要比commonJS包规范对出4个字段

   - **author** - 包作者

   - **bin** - 一些包作者希望可以作为命令行工具使用, 在配置好 bin 字段后, 通过 `npm install package_name -g` 命令可以将脚本添加到环境变量中, 之后再命令行可以直接执行

   - **main** - 模块在应用 require 引入该包时, 会先检查该字段, 将其作为模块入口, 若不存在, 则依次查找根目录下的 `index.js` `index.node` `index.json ` 作为包入口

   - **devDependencies** - 一些弄块只在开发时需要依赖, 该字段提醒后续包开发者需要安装的依赖

     ```json
     {
       "name": "express",
       "description": "Sinatra inspired web development framework",
       "version": "3.3.4",
       "author": "TJ Holowaychuk <tj@vision-media.ca>",
       "contributors": [
         {
           "name": "TJ Holowaychuk",
           "email": "tj@vision-media.ca"
         }
       ],
       "dependencies": {
         "connect": "2.8.4",
         "commander": "1.2.0",
       },
       "devDependencies": {
         "ejs": "*",
         "mocha": "*",
         "jade": "0.30.0",
       },
     
       "keywords": [
         "express",
         "framework",
       ],
       "repository": "git://github.com/visionmedia/express",
       "main": "index",
       "bin": {
         "express": "./bin/express"
       },
       "scripts": {
         "prepublish": "npm prune",
         "test": "make test"
       },
      "engines": {
         "node": "*"
       }
     }
     ```

4. NPM命令

   下载

   ```shell
   npm install <package-name>
   # 下载该模块|包以后, 会在当前目录下新建一个node_modules并储存到里面
   
   npm install <package name>@<version spec>
   # 安装特定版本	npm install express@2.1.5 | 
   # 安装一个范围内的版本 npm i mime@2.x x代表任意版本
   
   npm install <package-name> -g
   ### 
    # -g 代表全局安装
    # 全局安装代表安装再一个特定目录, 该目录可以被推算出来
    # path.resolve(process.execPath, '..', '..', 'lib', 'node_modules');
    # neode可执行文件为/usr/local/bin/node
    # 目录就为 /usr/local/lib/node_modules
   ###
   ```

   卸载

   ```shell
   npm uninstall <package name>
   ```

   更新

   ```shell
   npm update <package name>
   ```

   初始化node项目环境

   ```js
   // 在当前项目根目录输入命令行命令
   npm init | cnpm init(换源)
   
   // 配置好后输入, npm自动下载所有当前项目依赖包
   npm install | cnpm install(换源)
   
   // npm install 后会生成一个 package-clock.json文件, 这个是用来锁定当前项目的包模块的版本, 到了新的环境下, 不用重新配置版本, 每次install时候都会对比package-clock这个文件,从而保证版本的稳定
   ```

## 6.编码

### -进制转换

```js
let a = 10100   // 2进制
let b = 0o24      // 8进制
let c = 20      // 10进制
let d = 0x14      // 16进制

// 进制转换 
// 1. parseInt(number, num)
console.log(parseInt(c, 8)) 
console.log(parseInt(c, 10))
console.log(parseInt(c, 16))

// 2. toString(number, num)
console.log(c.toString(2)) 
console.log(c.toString(8))
console.log(c.toString(10))
console.log(c.toString(16))
```

### -字符

- ASCII 

- gbk

- Unicode  都是16进制的数字      Unicode   -> gbk | utf-8   叫编码

- utf-8  是Unicode的一种实现方式, 在互联网上传输需要  ( 一个汉字在里面算3个字节 )

  Unicode   ->	utf-8 的原理

  ```js
  function transfer(number) {
    // Unicode => utf-8
    let arr = ['1110', '10', '10']
    let str = number.toString(2)
    arr[2] += str.slice(-6)
    arr[1] += str.slice(-12, -6)
    arr[0] += str.slice(0, -12).padStart(4, '0')  // 不足的补足4位
    return arr.map(item => parseInt(item, 2).toString(16))
  }
  
  // 0x 16进制 Unicode   => 	Unicode   
  console.log(transfer(0x4e07))
  ```

## 7.buffer

### -创建Buffer对象

1. 通过长度自定义buffer

   ```js
   // 分配一个长度为 6 个字节的 Buffer
   // 默认值都为0
   let buf1 = Buffer.alloc(6)
   console.log(buf1)
   // <Buffer 00 00 00 00 00 00>
   
   // 把所有6个字节默认值全部设置为1
   buf1 = Buffer.alloc(6, 1)
   console.log(buf1)
   // <Buffer 01 01 01 01 01 01>
   
   // 分配一块没有初始化的内存, 里面还有的别数据没有抹掉(效率搞, 可能会影响到别的程序)
   let buf2 = Buffer.allocUnsafe(20)
   console.log(buf2)
   // <Buffer 29 26 e2 81 af 3c 02 00 00 00 00 00 00 00 00 00 5b fa ff e4>
   ```

2. 通过 数组 | 伪数组 定义buffer 

   ```js
   // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer, 字符不能通过该方法来转, 会变成00。
   const buf4 = Buffer.from([1, 2, 3]);
   const buf4 = Buffer.from({
     0: 1,
     1: 2,
     3: 2,
     length: 3
   });
   // <Buffer 04 05 00>
   ```

3. 通过字符串创建

   ```js
   // 1. 创建一个Buffer, 内容是编码格式为 utf-8
   const buf5 = Buffer.from('我拿buff');
   // <Buffer e6 88 91 e6 8b bf 62 75 66 66>
   
   // 2. 创建一个Buffer, 内容是编码格式为 utf16le, 字符文字都是2个字节
   const buf5 = Buffer.from('我拿buff', 'utf16le');
   // <Buffer 11 62 ff 62 62 00 75 00 66 00 66 00>
   ```
   

### -buffer方法

1. `.fill(value[, offset[, end]][, encoding])`	格式化填充buffer对象

   ```js
   const buf6 = Buffer.allocUnsafe(10)
   buf6.fill(10)   // 填充buffer, 所有字节都变成该值
   console.log(buf6)
   // <Buffer 0a 0a 0a 0a 0a 0a 0a 0a 0a 0a>
   
   const buf7 = Buffer.from('我拿bu')
   buf7.fill(10)   // 填充buffer, 所有字节都变成该值
   console.log(buf7)
   // <Buffer 0a 0a 0a 0a 0a 0a 0a 0a>
   
   buf6.fill('1', 0, 5)
   console.log(buf6)	// 根据索引填充
   // <Buffer 31 31 31 31 31 0a 0a 0a 0a 0a>
   ```

2. `.write(string[, offset[, length]][, encoding])`    通过切片修改buffer对象的值

   ```js
   const buf6 = Buffer.allocUnsafe(10)
   buf6.write('我拿', 0, 6, 'utf8')	// 下表0开始, 后六位被我拿填充
   console.log(buf6)
   // 把buf6里面, [0, 6)的位置替换
   // -> 索引大于字符字节, 多余的索引不处理
   // -> 索引小于字符字节, 存不下的不做处理
   ```

3. `.writeInt8(value, offset[, noAssert])`    通过索引 修改|写入 值, 必须是8位的数字

   ```js
   const buf = Buffer.alloc(3) // -128 ~127
   buf.writeInt8(127, 0)
   buf.writeInt8(-128, 1)
   buf.writeInt8(0, 2)
   buf.writeInt8('1a', 2)   // 写入前会先Number进行转换, 若是非数字, 不写入
   console.log(buf)							// <Buffer 7f 80 00>
   console.log(buf.readInt8(0))	// 127
   console.log(buf.readInt8(1))	// -128
   console.log(buf.readInt8(2))	// 0
   ```

4. `.writeInt16BE(value, offset[, noAssert])`          

   *-32768 ~ 32767*     将高序字节存储在起始地址（高位编址）

    `.writeInt16LE(value, offset[, noAssert])`	   

     *-32768 ~ 32767*     将低序字节存储在起始地址（低位编址）

   ```js
   const buf1 = Buffer.alloc(4)
   buf1.writeInt16LE(32767,  0)   // -32768 ~ 32767
   console.log(buf1)
   console.log(buf1.readInt16LE(0))
   // <Buffer ff 7f 00 00>	大的字节排前
   
   const buf2 = Buffer.alloc(4)
   buf2.writeInt16BE(32767,  0)   // -32768 ~ 32767
   console.log(buf2)
   console.log(buf2.writeInt16BE(0))
   // <Buffer 7f ff 00 00> 大的字节排前
   ```

5. `.toString([encoding[, start[, end]]])`     把字节转换成字符, 解码

   ```js
   const buf = Buffer.from('我拿buff') 
   console.log(buf.toString('utf8'))       // 我拿buff
   console.log(buf.toString('utf8', 3))    // 拿buff
   console.log(buf.toString('utf8', 0, 3)) // 我
   console.log(buf.toString('utf8', 0, 4)) // 我�
   console.log(buf.toString('base64'));		// 5oiR5ou/YnVmZg==
   
   // 将 Buffer 转换为字符串，称为解码；将字符串转换为 Buffer，称为编码。
   ```

6. `.slice([start[, end]])`    对buff对象进行切片, 切出来的字节存放的地址

   ```js
   const buf = Buffer.from('我拿buff') 
   const newBuf1 = buf.slice(0, 6)   // 起始值, 终止值
   const newBuf2 = buf.slice(6)      // 起始值
   console.log(newBuf1.toString())
   console.log(newBuf2.toString())
   ```

7. `.copy(target[, targetStart[, sourceStart[, sourceEnd]]])` 把当前buff复制到别处

   ```js
   // .copy(目标对象, 目标开始索引, 当前buf开始索引, 当前buf结束索引)
   let buffer = Buffer.from('我拿buff');
   let bigBuffer = Buffer.alloc(20)
   buffer.copy(bigBuffer, 0, 0) 
   console.log(bigBuffer)
   buffer.copy(bigBuffer, 10, 0, 10) 
   console.log(bigBuffer)
   
   console.log(bigBuffer.toString())
   
   /**
    <Buffer e6 88 91 e6 8b bf 62 75 66 66 00 00 00 00 00 00 00 00 00 00>
    <Buffer e6 88 91 e6 8b bf 62 75 66 66 e6 88 91 e6 8b bf 62 75 66 66>
    我拿buff我拿buff
   **/
   ```

   ```js
   // 重写
   Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart, sourceEnd)  {
     for(let i = sourceStart; i < sourceEnd; i++) {
       targetBuffer[targetStart++] = this[i]
     }
   }
   ```

8. `Buffer.concat(list[, totalLength])`     合并两个buffer对象

   ```js
   const buf1 = Buffer.from('我拿');
   const buf2 = Buffer.from('buff');
   const newBuf1 = Buffer.concat([buf1, buf2]); // 合并生成新的buffer,类似数组
   console.log(newBuf1)
   const newBuf2 = Buffer.concat([buf1, buf2], 20); // 总长为20, 多余的用0补足
   console.log(newBuf2)
   
   // <Buffer e6 88 91 e6 8b bf 62 75 66 66>
   // <Buffer e6 88 91 e6 8b bf 62 75 66 66 00 00 00 00 00 00 00 00 00 00>
   ```

   ```js
   // 重写
   Buffer.concatTwo = function (bufList) {
     let counter = bufList.reduce((len, item) => len + item.length, 0);
     let newBuffer = Buffer.alloc(counter)
     let index = 0
     bufList.forEach(item => {
       item.forEach(b => {
         newBuffer[index++] = b
       })
     })
   
     return newBuffer
   }
   ```

9. `Buffer.isBuffer` 判断是否是一个buffer对象

10. `.length `  buffer对象的长度

11. 乱码解决, 字节没有传输完整的时候

    ```js
    let {StringDecoder} = require('string_decoder')
    let sd = new StringDecoder()
    
    let buf1 = Buffer.from('我拿buff')
    console.log(buf1.slice(0, 4).toString())  // 我� 字节不完整, 乱码
    console.log(sd.write(buf1.slice(0, 4)))   // 我
    // 完整的先显示, 不完整的不会显示, 先缓存在内存中, 等到下一次数据过来拼接上
    ```

### -base64

```js
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str){
  let buf = Buffer.from(str);
  let result = '';
  for(let b of buf){
      result += b.toString(2);
  }
  return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('');
}

console.log(transfer('dwadawad顶顶顶顶SD'))	// yd8OTD3w5Omhtumhtumhtumhtqc
```

## 8.fs

### -文件的读|写|追加

1. 读取 ( 默认 r 模式 )

   ###### `fs.readFile(path[, options], callback)`	异步读取

   options ( 是一个对象, 可以省略 )

   - encoding
   - flag ( 对文件的操作 r w  a + s x )
     - 读 写 追加 同步 操作时别人不能操作

   ```js
   const fs = require('fs')
   
   new Promise((resolve, reject) => {
     fs.readFile('./text.txt', function(err, data) {
       err ? reject(err) : resolve(data)
     })
   }).then(
     value => {
       console.log(value.toString()) // => 我拿buff
     }
   )
   
   ```

   ###### `fs.readFileSync(path[, options])` 	同步读取 

   ```js
   let data = fs.readFileSync('./text.txt')
   console.log(data.toString())  // 我拿buff
   ```

2. 写 ( 默认 w 模式 )

   `fs.writeFile(file, data[, options], callback)`	异步写入

   ```js
   fs.writeFile('./text.txt', '今天天气好', {flag: 'a'},() => {
     console.log('ok')
   })
   ```

   `fs.writeFileSync(file, data[, options])`		同步写入

   ```js
   fs.writeFileSync('./text.txt', '今天天气好', {flag: 'a'})
   ```

3. 追加 ( 默认 a 模式 )

   `fs.appendFile(file, data[, options], callback)`	同步追加

   ```js
   fs.appendFile('./text.txt', '今天天气好',() => {
     console.log('ok')
   })
   ```

   `fs.appendFile(file, data[, options])`	异步追加

   ```js
   fs.writeFileSync('./text.txt', '今天天气好')
   ```

4. 拷贝文件 ( 大文件不行, 内存会炸 )

   ```js
   function copyFile(src, targetFile) {
     fs.readFile(targetFile, function(err, data) {
       fs.writeFile(src, data, function() {
         console.log('ok')
       })
     })
   }
   
   copyFile('./text2.txt', './text.txt')
   copyFile('text3.txt', 'text.txt')
   ```

### -flag| model

`flag`    对文件的操作方式

| 符号 |                       含义                       |
| :--: | :----------------------------------------------: |
|  r   |              读操作，文件不存在报错              |
|  r+  |            读和写操作，文件不存在报错            |
|  rs  |                   同步读取文件                   |
|  w   |   写操作，文件不存在则创建，存在则重写文件内容   |
|  wx  |          写操作，读取时候不能被别人读取          |
|  w+  | 读和写操作，文件不存在则创建，存在则重写文件内容 |
| wx+  |         和w+类似，读写时候不能被别人读取         |
|  a   |                     追加操作                     |
|  ax  |         追加操作，追加时候不能被别人读取         |
|  a+  |        读取追加写入操作，文件不存在则创建        |
| ax+  |       作用与a+类似，读写时候不能被别人读取       |

`model` 文件的权限

![image-20200525153539876](/assets/node.assets/image-20200525153539876.png)

### -buffer|fs读写操作

1. 打开文件

   ###### `fs.open(filename,flags,[mode],callback);`

   ```js
   fs.open('./text.txt', 'r', 0o666, function(err, fd) {
     console.log(fd)		// 3
   })
   // fd: FileDescriptor 文件描述符, 操作系统分配, 每个被打开的文件描述符独一无二
   // fd 是一个数字, 用来操作文件的, fs会拿着这个文件描述符去找进程的文件
   // 文件描述符的前3位被占用了, 分别是
   //    0: 标准输入       process.stdin.on
   //    1: 标准输出       process.stdout.write  => console.log
   //    2: 标准错误输出   process.stderr.write  => console.error
   ```

2. 读取文件 ( 目标文件 -> buffer )

   ###### `fs.read(fd, buffer, offset, length, position, callback((err, bytesRead, buffer)))`

   - **buffer**: 传入的buffer实例

   - **offset**: 在buffer实例的哪个位置开始写

   - **length**: 写入几个

   - **position**: 从文件哪个地方开始读, 不传表示文件光标指针位置( 默认位0 )
   - **callback-err**    错误
   - **callback-bytesRead**    对目标文件已经读取的字节数
   - **callback-buffer**    传入的buffer对象

   ```js
   fs.open('./text.txt', 'r', 0o666, function(err, fd) {
     let buffer = Buffer.alloc(6)
     fs.read(fd, buffer, 0, 6, 0, function(err, bytesRead, buffer) {
       console.log(err)
       console.log(bytesRead)					// 6	
       console.log(buffer.toString())	// 我拿
     })
   })
   ```

3. 写入文件 ( buffer  -> 目标文件)

   ###### `fs.write(fd, buffer[, offset[, length[, position]]], callback)`
   
   > 当我们使用 write 方法写入文件的时候, 他并不会直接把数据写入物理文件,而是先把他写入缓存区, 等到积累到一定量再进行写入, 使用
   
   ```js
   fs.open('./text.txt', 'a', 0o666, function(err, fd) {
     const buffer = Buffer.from('我拿buff')
     fs.write(fd, buffer, 0, buffer.length, 0, function(err, bytesRead, buffer) {
       console.log(bytesRead)           // 10
       console.log(buffer.toString())   // 我拿buff
     })
   })
   
   // text.txt => 我拿buff
   ```
   
4. 关闭文件

   ###### `fs.fsync(fd,[callback]);`			同步磁盘缓存, 把缓存区的内容强行写入文件

   ###### `fs.close(fd,[callback]);`

   ```js
   fs.open('./text.txt', 'r', 0o666, function(err, fd) {
     console.log(fd)		// 3
     fs.fsync(fd, function() {			// 1. 先把缓存区的内容写入文件
       fs.close(fd, function() {		// 2. 关闭文件
         console.log('关闭文件')
       })
     })
   })
   ```

5. 复制文件 ( 通过递归复制一个文件 )

   ```js
   copy = function (tagFile, sourceFile) {
     let BUFFER_SIZE = 16
     fs.open(sourceFile, 'r', 0o666, function (err, sourceFd) {
       fs.open(tagFile, 'w', 0o666, function (err, tagFd) {
         const buffer = Buffer.alloc(BUFFER_SIZE)
         ~(function read() {
           fs.read(sourceFd, buffer, 0, BUFFER_SIZE, null, function (err, bytesRead, buffer) {
             bytesRead && fs.write(tagFd, buffer, 0, bytesRead, read)
           })
         })()
         })
     })
   }
   
   copy('./copyFile.flv', './04-promise3.flv')
   ```

### -文件|文件夹操作

1. 创建目录

   ###### `fs.mkdir(path[, mode], callback)`	父级目录必须存在, 且目录为空

   ```js
   fs.mkdir('../floder/myFloder', 0o666, function(err){
     if(err) {
       console.log(err);
     } else{
       console.log("创建成功!");
     }
   })
   ```

2. 判断文件访问权限

   ###### `fs.access(path[, mode], callback)`	

   ```js
   fs.access('./0.Promise.js', fs.constants.R_OK,(err) => {
     console.log(err ? '没有权限!' : '可以读');
   });
   
   
   fs.access('./0.Promise.js', fs.constants.R_OK | fs.constants.W_OK,(err) => {
     console.log(err ? '没有权限!' : '可以读写');
   });
   ```

3. 读取目录下所有文件

   ###### `fs.readdir(path[, options], callback)`

   ```js
   fs.readdir('.', {encoding: 'utf-8'}, function(err, dirs) {
     err ? console.log('出现错误') : console.log(dirs)
   })
   ```

4. 查看 文件文件 | 文件夹 目录信息

   ###### `fs.stat(path, callback)`

   ```js
   fs.stat('./0.Promise.js', function(err, info) {
     console.log(info.isFile())        // 是否是文件
     console.log(info.isDirectory())   // 是否是文件夹
     console.log(info.atime)           // 上次被读取的时间
     console.log(info.ctime)           // 上次内容|属性|权限被修改的时间
     console.log(info.mtime)           // 内容被修改的上次时间
   })
   ```

5. 移动文件 | 目录 | 重命名文件

   ###### `fs.rename(oldPath, newPath, callback)`

   ```js
   fs.rename('./go.txt', './go/111.txt', function() {
     console.log('ok')
   })
   ```

6. 删除文件

   ###### `fs.unlink(path, callback)`

   ```
   fs.unlink('./666.txt', function() {
     console.log('删除成功')
   })
   ```

7. 截断文件

   ###### `fs.ftruncate(fd[, len], callback)`

   类似切片截取的意思

   ```js
   const fd = fs.openSync('temp.txt', 'r+');
   // 截断文件至前4个字节
   fs.ftruncate(fd, 4, (err) => {
     console.log(fs.readFileSync('temp.txt', 'utf8'));
   });
   
   ```

8. 监视文件或目录

   ###### `fs.watchFile(filename[, options], listener)`

   ```js
   let fs = require('fs');
   fs.watchFile('1.txt', (curr, prev) => {
     //parse() 方法可解析一个日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数。
     if(Date.parse(prev.ctime)==0){
       console.log('创建');
     }else if(Date.parse(curr.ctime)==0){
       console.log('删除');
     }else if(Date.parse(prev.ctime) != Date.parse(curr.ctime)){
       console.log('修改');
     }
   });
   ```

### -同步|异步创建目录

> 原理: 运用递归, 把传入的目录进行切割, 并依次对每个目录进行检查是否创建

1. 同步创建目录

   ```js
   // 同步创建目录
   function mkDirSync(dir) {
     let paths = dir.split('/')
     let resPath = './'
     paths.forEach(item => {
       resPath += item + '/'
       try {
         fs.accessSync(resPath)	// 访问目录, 如果报错, 说明不存在
       } catch(e) {
         fs.mkdirSync(resPath)	// 不存在就创建目录
       }
     })
   }
   
   mkDirSync('./s/a')
   ```
   
2. 异步创建目录

   ```js
   function mkDir(dir) {
     let paths = dir.split('/')
     let resPath = './'
     let index = 0
   
     !function asyncMake() {	// 异步的话, 在对应回调函数内运用递归
       if (paths[index]) {
         resPath += paths[index++] + '/'
         fs.access(resPath, (err) => {
           err ? fs.mkdir(resPath, asyncMake) : asyncMake()
         })
       }
     }()
   }
   ```
   
3. async + await创建目录 ( 像同步一样写代码 )

   ```js
   async function makeDir(dir) {
     return new Promise((resolve, reject) => {
       fs.mkdir(dir, (err) => {
         err ? reject(err) : resolve('ok')
       })
     })
   }
   
   async function access(dir) {
     return new Promise((resolve, reject) => {
       fs.access(dir, (err) => {
         err ? reject(err) : resolve('ok')
       })
     })
   }
   
   async function mkDir(dir, callback) {
     let paths = dir.split('/')
     let resPath = './'
   
     for(let i = 0; i < paths.length; i++) {
       let item = paths[i]
       if (item) {
         resPath += item + '/'
         try {
           await access(resPath)
         } catch (e) {
           await makeDir(resPath)
         }
       }
     }
   
     callback()
   }
   
   mkDir('./qq/ee/../aa')
   ```

### -递归删除目录

1. 同步删除非空目录 ( 深度优先 )

   ```js
   function rmDir(dir) {
     let stat = fs.statSync(dir)
     if (stat.isDirectory()) {
       let files = fs.readdirSync(dir)
       files.map(item => path.join(dir, item))
         .forEach(item => rmDir(item))
     } else {
       fs.unlinkSync(dir)
     }
     fs.rmdirSync(dir)
   }
   ```
   
2. 异步删除非空目录 ( Promise实现 )

   ```js
   function rmPromise(dir) {
     return new Promise((resolve, reject) => {
       fs.stat(dir, function (err, stat) {
         err ? reject(err) : null
         if (stat.isDirectory()) {
           fs.readdir(dir, function (err, files) {
             let paths = files.map(item => path.join(dir, item))
             let Promises = paths.map(p => rmPromise(p)) // 进行递归深度删除
             Promise.all(Promises).then(() => {// Prom成功, 子目录所有文件删除
               fs.rmdir(dir, resolve) // 删除当前dir, 收工
             })
           })
         } else {
           fs.unlink(dir, resolve)	// 是文件直接删除
         }
       })
     })
   }
   
   // 异步删除非空目录
   function rmdir(dir) {
     return new Promise((resolve, reject) => {
       fs.stat(dir, (err, stat) => {
         if(err) {
           reject(err)
         } else {
           if(stat.isDirectory()) {
             fs.readdir(dir, (err, files) => {
               err ? reject(err) : null
               if(files.length) {    // 如果子目录不为空
                 files = files.map(item => path.join(dir, item))
                 let promises = files.map(p => rmdir(p))
                 Promise.all(promises).then(() => {
                   fs.rmdir(dir, resolve)
                 })
               } else {    // // 如果子目录为空
                 fs.rmdir(dir, resolve)
               }
             })
           } else {  
             fs.unlink(dir, resolve)
           }
         }
       })
     })
   }
   
   rmdir('./node_modules')
   ```

3. 异步串行删除目录 ( 深度优先 )

   ```js
   
   ```

4. 异步并行删除目录 ( 深度优先 )

   ```
   
   ```

### -遍历算法

![image-20200615072826143](/assets/node.assets/0549EFE9.jpg)
在二叉树的概念中, 有先序, 有中序和后续遍历的概念

1. 同步深度优先 + 先序遍历

   ```js
   function deepSync(dir) {
     console.log(dir)
     fs.readdirSync(dir).forEach(file => {
       let childFile = path.join(dir, file)
       let childStat = fs.statSync(childFile) 
       if(childStat.isDirectory()) {
         deepSync(childFile)
       } else {
         console.log(childFile)
       }
     })
   }
   ```

2. 异步深度优先 + 先序遍历

   ```js
   function deepAsync(dir, callback) {
     console.log(dir)
     fs.readdir(dir,  (err, files) => {
       ! function next(index) {
         if (index === files.length) {
           return callback()
         }
         let childPath = path.join(dir, files[index])
         fs.stat(childPath, (err, stat) => {
           if (stat.isDirectory()) {
             deepAsync(childPath, () => next(index + 1))
           } else {
             console.log(childPath)
             next(index + 1)
           }
         })
       }(0)
     })
   }
   ```

3. 同步广度优先 + 先序遍历

   ```js
   function deep(dir) {
     let dirs = [dir]  // dirs是一个队列,队列的值按顺序广度遍历
     while(dirs.length > 0) {
       let current = dirs.shift() // 出队列
       console.log(current)
       let stat = fs.statSync(current)
       if(stat.isDirectory()) {
         fs.readdirSync(current).forEach(item => {
           dirs.push(path.join(current, item))
         })
       }
     }
   }
   ```

4. 异步广度优先 + 先序遍历

   ```js
   function deepAsync(dir, cb) {
     console.log(dir)
     cb && cb()
     fs.readdir(dir, function (err, files) {
       // files就代表了队列
       !function next(i) {
         if (i >= files.length) return
         let child = path.join(dir, files[i])
         fs.stat(child, function (err, stat) {
           if (stat.isDirectory()) {
             deepAsync(child, () => next(i+1))
           } else {
             console.log(child)
             next(i+1)
           }
         })
       }(0)
     })
   }
   ```

   

## 9.流Stream

### 流是什么?

- 流是一组有序的，有起点|终点的字节数据传输手段 ( 全是二进制数据传输 )
- 流不关心文件是什么，只关注是否从文件中读到了数据，以及读到数据之后的处理

> 流有两种传输手段

1. 二进制模式, 每个分块都是buffer或者string对象.

2. 对象模式, 流内部处理的是一系列普通对象.

   > 所有使用 Node.js API 创建的流对象都只能操作 strings 和  Buffer对象。但是，通过一些第三方流的实现，你依然能够处理其它类型的 JavaScript 值 (除了 null，它在流处理中有特殊意义)。 这些流被认为是工作在 “对象模式”（object mode）。 在创建流的实例时，可以通过 objectMode 选项使流的实例切换到对象模式。试图将已经存在的流切换到对象模式是不安全的

### node中的四种流

- Readable - 可读的流 (例如 fs.createReadStream()).
- Writable - 可写的流 (例如 fs.createWriteStream()).
- Duplex - 可读写的流 (例如 net.Socket).
- Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).

### -可读流

### -可读流两种模式

可读流在工作时有两种模式:

1. `flowing` 流动模式
   - 可读流自动从底层抽取数据, 并通过事件接口传递给应用
   - 
2. `paused` 暂停模式

### 1.创建可读流

```js
let rs = fs.createReadStream('./text2.txt', {
  flags: 'r', 			// 对文件的操作
  mode: 0o777, 			// 文件权限
  highWaterMark: 3, // 每次读取的字节缓冲区的大小(数据先存在内存中),默认为64k
  start: 0, 				// 从索引为3的位置开始读
  end: 8, 					// 到索引为10的地方结束(包含结尾)
  encoding: 'utf8'  // 设置编码方式, 可以通过rs.setEncoding('utf8');
})
```

### 2.data事件

> 触发data事件, 可读流切换成流动模式, 数据自动从底层系统读取

```js
// 监听可读流的data事件, 当监听事件开始时,
// 流就可以读取文件的内容并发射data事件, 并触发对应的回调
// 默认监听data事件之后会一直读取文件, rs.pause()和rs.resume()可以暂停|开始读取
rs.on('data', function (data) {
  console.log(data)
})
```

### 3.open事件

> ​	文件被打开触发的事件

```js
rs.on('open', function () {
  console.log('文件被打开')
})
```

### 4.error事件

> 文件出现错误 ( 例如不存在 ) 触发的事件

```js
// 文件读取出错触发事件
rs.on('error', function (err) {
  console.log('出现错误', err)
})
```

### 5.end事件

> 可读流结束触发的事件

```js
rs.on('end', function () {
  console.log('读取结束')
})
```

### 6.close事件

> 文件读取完毕被关闭的事件

```js
rs.on('close', function () {
  console.log('文件被关闭')
})
```

### 7.暂停|恢复流动

> 添加 data 事件后, 可读流的模式为流动模式, rs.pause()和rs.resume()可以暂停|恢复流动模式

```js
rs.on('data', (data) => {
  console.log(data)
  rs.pause()  // 暂停流动模式
  rs.resume() // 开始流动模式
});
```



### 8.可读流的实现

```js
let fs = require('fs');
let EventEmitter = require('events');

/**
 *  ReadStream的本质,
 *  就是拿一段buffer(内存中开辟), 结合文件读取的read方法
 *  首先打开文件, 并把buffer传入read中, 系统每次读文件只读buffer长度的数据
 *  读出出来以后, 把数据发送给data事件, 再接着上次读取的位置进行数据读取
 *
 * @class ReadStream
 * @extends {EventEmitter}
 */

class ReadStream extends EventEmitter {
  constructor(path, options={}) {
    super(path, options);
    this.path = path;
    this.fd = options.fd;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding;
    this.start = options.start || 0;
    this.mode = options.mode
    this.pos = options.start;
    this.end = options.end;
    this.flowing = false;		// 流动模式, 不走缓存, 读取一块文件, 发射一次事件
    this.autoClose = true;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.buffer = Buffer.alloc(this.highWaterMark);
    this.length = 0;
    this.on('newListener', (type, cbk) => {
      if (type == 'data') {
        this.flowing = true;
        this.read();
      }
    });
    this.on('end', () => {
      if (this.autoClose) {
        this.destroy();
      }
    });
    this.open();
  }

  read() {
    if (typeof this.fd !== 'number') { // 如果没有文件描述符, 那么进行打开文件操作
      return this.once('open', () => this.read()); // 监听事件, 以便打开文件后返回数据
    }
    // 每次写入buffer字节的长度
    let len = this.end ? Math.min(this.end - this.pos, this.highWaterMark) : this.highWaterMark;
    fs.read(this.fd, this.buffer, 0, len, this.pos, (err, bytesRead) => {
      if (err) {
        return;
      }
      if (bytesRead) {  // 如果数据读取出来, 那么发射data事件
        let data = this.buffer.slice(0, bytesRead);
        data = this.encoding ? data.toString(this.encoding) : data;
        this.emit('data', data);
        this.pos += bytesRead;
        if (this.end && this.pos > this.end) {
          return this.emit('end');
        }
        if (this.flowing)
          this.read();
      } else {  // 没有数据读取出来, 则进行end事件
        this.emit('end');
      }
    })
  }

  open() {  // 打开文件操作, 打开文件夹操作
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit('error', err);
      this.fd = fd;
      this.emit('open', fd);
    })
  }


  end() { // 可读流结束触发
    if (this.autoClose) {
      this.destroy();
    }
  }

  destroy() { // 摧毁可写流, 会触发close事件并后续所有操作都无效
    fs.close(this.fd, () => {
      this.emit('close');
    })
  }

}

module.exports = ReadStream;
```

### 9.暂停模式实现

> 可读流在创建的时候, 会立刻开启暂停模式, 并且填充缓冲区, 可以通过 _readableState拿到

```

```



### -可写流

### 1.创建可写流

```js
let fs = require('fs')
let ws = fs.createWriteStream('./ws.txt', {
  flags: 'w',
  mode: 0o777,	
  highWaterMark: 4,				// 缓存区大小, 默认64k
  start: 0,
  // encoding: 'utf8'
})

function createWriteStream(path: PathLike, options?: string | {
    flags?: string;
    encoding?: string;
    fd?: number;						// 文件描述符
    mode?: number;					// 文件权限
    autoClose?: boolean;		
    emitClose?: boolean;
    start?: number;					// 写入的起始位置
    highWaterMark?: number;	// 
})
```

### 2.write方法

> 对文件流进行写入内容

```js
// 如果缓存区(highWaterMark)未满, write之后返回true, 代表可以继续进行写操作
// 如果缓存区刚满|溢出, write之后返回false, 说明缓存区已经满了, 不能再写
// 如果再写, 会先给你存在内存中, 等到缓存区内的内容清空后会再写入缓存区
console.log(ws.write('我','utf8', function() {
  console.log('写入成功')			// true
})) 
console.log(ws.write('34')) // false
setTimeout(() => {
  console.log(ws.write('我')) // true
}, 100)  // 过0.1秒后, 缓存区的内容写入文件流后,再进行write
```

### 3.end方法

> 接下来没有数据写入可写流中, 且end事件之后不能有数据被写入, 回调函数会作为finish的回调

```js
ws.end('我拿buff', function() {
  console.log('我是finish事件的回调函数')
})

ws.end(Buffer.from('我拿buff'), function() {
  console.log('我是finish事件的回调函数')
})
```

### 4.drain方法

> 缓冲区的数据写满, 也就是write返回false, 缓存区数据被清空时触发的事件
>
> 建议: 一旦缓存区被写完, 立即pause()停止进行数据的写入, 因为写不进缓存区而溢出写入内存中的数据是直接被写入文件的, 并不会再进入缓存区,然后被写入之后触发drain事件

```js
let ws = fs.createWriteStream('./2.txt',{
  flags:'w',
  encoding:'utf8',
  highWaterMark:3
});
function write(){
  ws.write('1')
  ws.write('1')
  ws.write('1')		// 如果把该条注释, 就不会触发drain事件
}

write();

ws.on('drain',()=>{
  console.log("drain");
  write();
});
```

```js
// 案例:(每次写入可写流的数据超出缓存区, 只触发一次drain事件)
let fs = require('fs');
let rs = fs.createReadStream('./0.Promise.js', {
  flags: 'r',
  mode: 0o777,
  highWaterMark: 10000		// 可读流的数据一次只就有1000个字节
})

let ws = fs.createWriteStream('./ws.js', {
  flags: 'w',
  mode: 0o777,
  highWaterMark: 3			// 写入流的数据只有3个字节
})

rs.on('data', function(chunk) {   // 进入流动模式
  let flag = ws.write(chunk)
  console.log(flag)
  if(!flag) {			// 如果可写流缓存区满了
    rs.pause()    // 进入暂停模式, 等待缓存区数据写入
  }
})

ws.on('drain', function() {
  console.log('触发')
  rs.resume()   // 缓存区数据写入, 重新开启流模式
})

// 若把可读流的缓存区改成3, 那么会清空缓存区就会触发drain
```

### 5.end事件

```js
ws.end('ok')								// 如果不调用end事件, finish事件不会触发
ws.on('finish', () => {
  console.log('finish')
})
```

### 6.可写流的实现

```js
let fs = require('fs');
let EventEmitter = require('events');
class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super(path, options);
    this.path = path;
    this.fd = options.fd;
    this.flags = options.flags || 'w';
    this.mode = options.mode || 0o666;
    this.encoding = options.encoding;
    this.start = options.start || 0;
    this.pos = this.start;
    this.writing = false; // 若为true 表示底层正在写入数据, 后续的数据都放入队列中
    this.autoClose = true;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.buffers = [];
    this.length = 0;
    this.open();
  }

  open() {	// 打开文件
    fs.open(this.path, this.flags = 'w', this.mode = 0o777, (err, fd) => {
      if(err) {throw err}
      this.fd = fd
      this.emit('open')	// 触发用户绑定的open事件
    })
  }

  write(chuck, encoding, callback) {	// 进行数据写操作
    if(typeof encoding === 'function') {
      callback = encoding
      encoding = null
    }
    chuck = Buffer.isBuffer(chuck) ? chuck : Buffer.from(chuck, this.encoding || 'utf8')		// 先把数据转换成buffer对象, 省的后面再转化
    this.length += chuck.length // 一共有多少字节待写入文件中(缓存区+正在写的)
    if(this.writing) {    // 如果底层正在写, 先加入缓存队列中
      this.buffers.push({
        chuck,
        encoding,
        callback
      })
    } else {  // 层正没有写, 那么进行写操作
      this.writing = true	// 底层正在写
      this._write(chuck, encoding, this.clearBuffer.bind(this))
    }
    callback && callback()	
    return this.length < this.highWaterMark	//  true|false表示缓存区是否可写
  }

  _write(chuck, encoding, callback) {	// 进行文件写操作
    if(typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chuck, encoding, callback))
    }
    fs.write(this.fd, chuck, 0, chuck.length, this.pos, (err, written) => {
      if(err) {	// 如果有错误发生, 首先摧毁流, 再出发err事件
        if(this.autoClose) {
          this.destroy()
        }
        return this.emit('error', err)
      }
      this.length -= written	// 待写入文件的字节数减少
      this.pos += written			// 文件写入的位置前移到已写的位置
      callback && callback()	// 
    })
  }

  clearBuffer() {
    let data = this.buffers.shift()
    if(data) {
      this._write(data.chuck, data.encoding, this.clearBuffer.bind(this))
    } else {
      this.writing = true
    }
  }

  end() {
    if(this.autoClose) {
      this.emit('end');
      this.destroy();
    }
  }

  destroy() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }

}

let ws = new WriteStream('./ws.js')
ws.write('sss', function() {
  console.log('写入成功')
})
```

### -pipe方法

### 1.pipe用法

> 可读流就像一个水龙头, 可写流就像一个水桶
>
> pipe 的作用就是打开水龙头, 把水桶放进去接水 
>
> ( pipe的作用是只占用很少部分内存就能进行大型文件读写 )

```js
let fs = require('fs');
let rs = fs.createReadStream('./0.Promise.js')
let ws = fs.createWriteStream('./ws.js')

rs.pipe(ws)			// 把可读流的数据, 通过管道流进可写流中
```

### 2.pip方法的原理

```js
let rs = fs.createReadStream('./0.Promise.js')
let ws = fs.createWriteStream('./ws.js')

rs.on('data', function(chunk) {   // 进入流动模式
  let flag = ws.write(chunk)
  if(!flag) {
    rs.pause()    // 进入暂停模式, 等待缓存区数据写入
  }
})

rs.on('drain', function() {
  rs.resume()   // 缓存区数据写入, 重新开启流模式
})

rs.on('end', function() {
  console.log('数据写完')
})

// 原型上实现pipe管道方法
rs.prototype.pipe = function(ws) {
  this.on('data', (data) => {
    let flag = ws.write(data)
    if(!flag) {
      this.pause()
    }
  })
  ws.on('drain', () => {
    this.resume()
  })
  this.on('end' () => {	// 可读流结束时, 关闭可读流
		ws.end()
  })
}

rs.prototype.pause = function() {	// 暂停模式开启, 流动模式关闭
  this.flowing = false;
}

ReadStream.prototype.resume = function(){	// 重新开启流动模式
    this.flowing = true;
    this.read();
}
```

### 3.unpipe用法

```js
let fs = require('fs');
let rs = fs.createReadStream('./0.Promise.js', {
  flags: 'r',
  mode: 0o777,
  highWaterMark: 10000
})
let ws = fs.createWriteStream('./ws.js', {
  flags: 'w',
  mode: 0o777,
  highWaterMark: 1
})


rs.pipe(ws)

setTimeout(() => {
  rs.unpipe(ws)			// 如果还在写文件, 会从中间截断数据, 造成数据短缺
}, 100)
```

### 4.crock和uncrock

> 使用crock之后, 所有的数据都会被强制写入内存的缓存区中, 
>
> 直到使用 uncrock | end 方法将数据写入文件中才行 ( 两者缺一不可 )

```js
let ws = fs.createWriteStream('./ws.js', {
  flags: 'w',
  mode: 0o777,
  highWaterMark: 1
})


ws.cork()			// 数据强行留下内存缓冲区
ws.write('啊啊啊')   
ws.uncork() 	// 写入数据
// ws.end()		// 写入数据
```

### -流的案例

### 换行回车

- Unix系统里，每行结尾只有换行"(line feed)"，即"\n",
- Windows系统里面，每行结尾是"<回车><换行>"，即"\r\n"
- Mac系统里，每行结尾是"回车"(carriage return)，即"\r"
- 在ASCII码里
  - 换行 \n  10 0A
  - 回车 \r  13 0D

### 行读取器

> 把目标文件, 一行一行的读取文件的内容, 读取出一次内容发射数据

```js
let fs = require('fs')
let EventEmitter = require('events')
let util = require('util')

const NEW_LINE = 0x0A // /n 换行
const RETURN_CAR = 0x0D // /r  回车

class lineReader extends EventEmitter {
  constructor(path) {
    super()
    this._reader = fs.createReadStream(path)
    this.on('newListener', function (type, listener) {
      if (type === 'newLine') {
        let buffers = []	// 把读取出来的数据存储到该列表中
        this._reader.on('readable', () => {
          let char; // Buffer对象, 只是一个字节的数组
          while (null != (char = this._reader.read(1))) {
            switch (char[0]) {
              case (NEW_LINE): {	// Unix系统下, /n的话直接发射数据到事件里
                this.emit('newLine', Buffer.from(buffers))
                buffers.length = 0
                break
              }
              case (RETURN_CAR): {	// Windows|Mac, /r之直接发射数据,
                this.emit('newLine', Buffer.from(buffers))
                buffers.length = 0
                let chuck = this._reader.read(1)
                if(chuck && chuck[0] !== NEW_LINE) {
                  buffers.push(chuck[0])
                }
                break
              }
              default: {
                buffers.push(char[0])
                break
              }
            }
          }
        })
        this._reader.on('end', () => {
          if(buffers.length > 0) {
            this.emit('newLine', Buffer.from(buffers))
            buffers.length = 0
            this.emit('end')
          }
        })
      } 
    })
  }
}

util.inherits(lineReader, EventEmitter)

let rs = new lineReader('./ws.js')

rs.on('newLine', function (lineData) {
  // console.log(lineData)
  console.log(lineData.toString())
}).on('end', function() {
  console.log('ok')
})
```

## 10.内存控制

### -查看内存使用

​	使用 **``process.memoryUsage()``** 能够查看内存的使用的情况，`os` 模块中的 `totalmem()`（电脑总内存） 和`freemem()`（电脑空闲内存）也可以查看内存情况

1. #### 查看进程的内存使用

   ```js
   function showUse() {
     const use = process.memoryUsage()
     const format = function(bytes) {
       return (bytes / 1024 / 1024).toFixed(2) + 'MB'
     }
     console.log(`
     Process内存使用情况: 
       1. 常驻内存部分: ${format(use.rss)}
       2. V8申请总内存: ${format(use.heapTotal)}
       3. 堆内存使用量: ${format(use.heapUsed)}
       4. 绑定到JavaScript的c++对象使用:  ${format(use.external)}
     `)
   }
   
   function go() {
     let size = 20 *1024 * 1024
     let arr = new Array(size)
     for(let i = 0; i < size; i++) {
       arr[i] = 0
     }
     return arr
   }
   ```

   - **rss**	：进程的常驻内存

   - **heapTotal**    ：V8申请总内存

     -由于V8引擎，申请的内存有限制（64位系统1.4G，32位0.7G）

   - **heapUsed**    ：堆内存使用量

   - **external**    ：堆外内存，绑定到 Javascript 的 C++ 对象的内存使用情况（有限制）

     -不属于V8申请的内存中，

     -Buffer创建的对象是不是放在V8中，而是直接写入内存中的，该属性可以查看buffer

   

## 11.TCP|IP

### -什么是协议

- 一组发送发和接收方都遵守的计算机通信规则
- 协议有多种, 就算语言一样, 使用英语可以交流, 使用日语也可以交流
- 协议就是数据封装格式+传输

### -OSI七层模型

OSI模型带来的好处:	每一层模型都处理各自的事情, 分工明确, 效率高, 更容易针对性解决问题

- 应用层(Application) 提供网络与用户应用软件之间的接口服务
- 表示层(Presentation) 提供格式化的表示和转换数据服务，如加密和压缩
- 会话层(Session) 提供包括访问验证和会话管理在内的建立和维护应用之间通信的机制
- 传输层(Transimission) 提供建立、维护和取消传输连接功能，负责可靠地传输数据(PC)
- 网络层(Network) 处理网络间路由，确保数据及时传送(路由器)
- 数据链路层(DataLink) 负责无错传输数据，确认帧、发错重传等(交换机)
- 物理层(Physics) 提供机械、电气、功能和过程特性(网卡、网线、双绞线、同轴电缆、中继器)

![image-20200615072826143](/assets/node.assets/image-20200615072826143.png)