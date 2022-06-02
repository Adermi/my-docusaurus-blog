---
id: crazyJs
title: 你不知道的JavaScript总结
---
## 一，闭包和作用域

### 0. 作用域

什么是作用域：用来存储变量，存储变量的值，变量的增删改查对接的地方【也就是变量能访问到的范围较作用域】

> 栈内存和堆内存

- 函数执行形成栈内存，所有的变量都是在栈内存中存储的，也就是所谓的作用域【基本数据类型存储在栈内存】【复杂数据类型存储在堆内存】

- 作用域中的变量的查找方式是向上级作用域查找，不能向同级作用域查找

  PS：
  <img src={require('./assets/你不知道的JS总结.assets/image-20210321213542416.png').default} alt="Example banner"/>

### 1. 编译原理

在浏览器中共有三个角色负责程序的执行，分别是：**编译器**，**执行引擎**，**作用域**

我们来看下 `var a = 20` 这段代码的编译过程

1. 首先，遇到 `var a` ，编译器会询问作用域是否有同名 `a` 这个变量存在，若存在，则跳过这一步；若不存在，编译器会要求当前作用域生成一个 `变量a` 【在Es6中，使用`let，const`关键字进行重复声明会报错，而var具有预解析，不会报错】
2. 接下来编译器会为执行引擎生成代码，这些代码会用来处理 `a = 20` 这一步。
3. 引擎运行，首先会询问当前作用域有没有一个叫 `a` 的变量，若有，则把这个变量的值赋值为20；

### 2. LHS和RHS查询

执行引擎在进行变量操作的时候，会对不同的情况对作用域中的变量进行 `LHS和RHS查询`

LHS：查找变量的存储地址【赋值的时候，把值存储在这个变量地址中】

RHS：查找变量的值【获取一个变量的值的时候】

> 观察下面的代码

```js
a = 20;					// LHS查询，获取a变量，把a变量的值修改成20【基于作用域】
console.log(a)	// RHS查询，获取a的值并打印【基于作用域】
```

![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210319161900803.png)

> LHS和RHS的区别

两者都是基于：当前作用域 -> 上级作用域 -> 上级作用域...

- LHS：若在所有作用域作用域链上都没找到变量，则在顶层作用域（global）中创建变量并赋值等等
- RHS：若在所有作用域作用域链上都没找到变量，则抛出错误

```js
let aaa = 0						// 全局作用域创建aaa,赋值成0
;(function() {	
  let aaa = 1					// 创建aaa变量,赋值成1
  ;(function() {
    console.log(aaa)	// RHS查询,在上级作用域中找到aaa, 值为1
    aaa = 1000				// LHS查询,在上级作用域中找到aaa, 修改值为1000
    console.log(aaa)	// RHS查询,在上级作用域中找到aaa, 值为1000
  })()
  console.log(aaa)		// RHS查询,在当前作用域中找到aaa, 值为1000
})()
console.log(aaa)			// RHS查询,在当前作用域中找到aaa, 值为0
```

![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210319164251433.png)


### 3. 词法作用域

> 词法作用域完全由编写代码期间函数的位置来顶底决定

词法作用域：函数在被定义后，不管这个函数之后在哪个别的作用域里被调用，他的作用域都是从被定义的位置开始查找的【比如：函数在哪里定义，他的作用域就在哪，无论实在哪里被调用】

举个例子：

![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213514902.png)


这里形成了三个作用域:

1. 全局window作用域
2. fn1函数作用域
3. fn2函数作用域

虽然 `fn1` 函数是在 `fn2` 中被调用的，但是他的作用域在代码被编写的的时候就天注定了：**`fn1`的上级作用域是`window`，而不是`fn2`**，所以在寻找 **value** 变量的时候会向 **window** 作用域找【词法作用域决定函数的作用域】

所以叫做词法作用域，因为他的**作用域是编写时就天注定了，不管是在哪里被调用**

![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210319171934505.png)


### 4. 函数作用域

函数作用域定义：

:star: ​类似于一个封闭的小气泡，外部不能访问这个气泡里边的变量和函数，只能里面函数或者变量访问外面的变量；【变量访问遵循作用域链原则，遵循词法作用域原则】

函数作用域的优点：

1. 隐藏函数内部实现，只暴露一个接口。类似黑盒，把处理数据的代码封装到一个黑盒中，只暴露入口（参数）和出口（return）

   ![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321211835081.png)

2. 避免变量冲突。一个函数作用域中可各种变量和函数，并且把这些变量和全局作用域隔绝，不会污染全局作用域

   ![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321211848684.png)
   
3. 闭包。用过的都说好，函数执行后对外 **return** 一个对象或者函数，用来突破函数作用域不能被外部作用域访问的限制

   ![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321211908384.png)
   
4. 保护函数作用域中的变量（外部无法访问内部）

   ![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321211918023.png)

   

函数作用域的缺点：

1. 需要定义一个函数（污染一个变量），再执行该函数（可以使用IIFE立即执行函数优化）

### 5. 块级作用域

首先我们来看下Es6之前的 var 关键字，这个关键字是没有块级作用域的

**var**

:star: var没有块级作用域的（try...catch的catch中有），使用一个for循环都会污染到全局作用域

![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321205902958.png)

**let，const**

接着就是 `let，const` 这两个关键字，在遇到 `{}` 会产生块级作用域，类似函数作用域

:star: 块级作用域最大的作用就是，它会加入到作用域查找链中【超重要！】，并且块级作用域和闭包进行配合可以替代函数作用域

块级作用域的优点：

1. 可以替代部分IIFE的工作（具体看需求）
2. 变量污染程度大量减少，比函数作用域更加容易创建（for循环有块级作用域）
3. 优化垃圾回收机制（若产生闭包，函数私有作用域不会删除，但是如果内部有大量的数据残留，可以使用块级作用域 P33）
![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321211750152.png)

### 6. 提升

其实，在JS代码执行前，编译器会对我们写好的代码进行一个预编译，这个就叫提升。

:star: ​这个过程就是把代码中的`var a` `var b` `function a() {...}` 这样的变量申明提升到作用域的最前面【提升只针对 var 和 function关键字】

- 首先看 **var** 的变量提升【只提升申明，不赋值】

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321212910717.png)
  
  其中的原因就是，编译器首先会把所有的 var 申明提升到作用域最前面，再执行代码
  
  真实运行代码的状况其实是这样的：

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321212922149.png)

- 再来看 **function** 关键字的提升【又提升申明，又赋值】

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321212932672.png)
  
  用function声明的函数，也会像var一样提升到最前面，但是这个关键字是 `提升+申明`
  
  代码真实运行情况：
  
  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321212942477.png)

- 两者提升的优先级

  > function 的提升优先级 > var关键字优先级

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213003059.png)

  上面代码的真实运行情况

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213014416.png)

- 匿名函数没有提升

  当我们使用function关键字作为匿名函数时，没有变量提升

  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213025727.png)
  
  但是！有名函数就会有提升
  
  ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213035664.png)

### 7.{}中的提升

:yum: 在ES6之前是没有块级作用域这个说法的，所以在 **{}** 中使用 **var** 和 **function** 关键字定义的变量和函数，本质上是属于全局作用域的【函数中的变量和函数除外，因为函数被编写时就有词法作用域】，所以会被提升，具体的提升规则：

1. **var** 变关键字的提升规则不变
2. **function** 关键字不再提升函数整体，只提升函数名，和 **var** 一样的形式

![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213110006.png)

:star: 请记住一点：在块级作用域中的匿名**有名函数没有提升**

![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213122272.png)

### 8. 闭包

闭包可以说是 **javaScript**中最重要的技术之一，在 **javaScript** 中，闭包遍地可见：定时器，DOM事件监听器，Ajax请求等等以及任何传递回调函数的地方，都是用了闭包

:star: 专业点说就是：闭包就是 **基于词法作用域+函数** 来突破 **作用域限制** 的一种工具

:star: 用我自己的话说：函数执行后形成不销毁的作用域，且该作用域中的变量能通过一个函数被任何其作用域访问，这就是闭包【不销毁的关键就是该作用域中的对象或者函数被别的作用域指向，垃圾回收机制不会回收】

:boom: PS：块级作用域和闭包结合也更香哦~​

1. 来看一个闭包突破作用域限制的例子：

   ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213139799.png)
   
   :a: 我们知道，**函数具有词法作用域**，即被编写时就具有天注定的作用域，无论这个函数是在哪里调用，执行的时候，函数内部的变量的查找规则**始终是从被编写的地方开始查找**。
   
   :b: 而在JavaScript中，**函数是一等公民**，可以作为函数参数或者函数返回值四处传递。
   
   :star: 结合上面两点，我们就可以把一个在 **fn** 作用域中的**函数**作为参数传递到别的作用域中【函数是一等公民】，在别的作用域中执行的时候，基于词法作用域的特性，该函数【返回的匿名函数的词法作用域】是能够访问到**fn** 内的作用域的！！！
   
   综上所述：我们实现突破了函数作用域的限制，使得函数外能访问函数内的这种方式
   
2. 闭包产生的原理

   1. 函数执行会创建自己的私有作用域，该作用域的生命周期是函数执行结束
   2. 若函数作用域中有一个或者多个变量被外部作用域指向时，作用域就不会回收销毁
   3. 利用上面的两个特性就能够形成不销毁的函数作用域，这也是闭包能产生的原因

   附上丑图一张：

   ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321180039296.png)

3. 闭包的运用：

   - 各种回调函数

     ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213207381.png)
     
   - 自执行函数
   
     ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213217885.png)
     
   - 柯理化函数
   
     ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213228839.png)
     
   - 模块模式
   
     ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210321213240678.png)
     
   - ......还有一大堆....
   
   

##  二，this和原型对象

### 1. 什么是this

一个函数被调用时，会产生很多关于这个函数的信息【称为上下文】，这个上下文中有很多的信息，比如函数在哪里调用（调用栈）；函数的参数等等......this就是这个创建的信息中的一种

:star: this可以帮助我们做很多事情，但是this的指向飘忽不定，掌握this是必须课之一！

### 2. this的指向

:star: 掌握以下这刘条规则，所有的this指向都没问题

1. 以为 `yyy.xxx.fn()` 这样的形式调用，`fn` 函数内的 `this` 一定是 `fn` 的前一项 `xxx`

2. 若函数是直接以 `fn()` 调用，里面的 `this` 指向是 `window`

3. `DOM`元素的事件回调函数中的this，指向`DOM`元素本身

4. `new fn()` 这样执行的函数，`this` 是指向 `new` 创建的实例对象

5. 遇到 `call` `apply` `bind` 这三个能强制改变函数内的 `this`，自行判断

6. 箭头函数的 `this` 会在箭头函数执行时捕获当前所在的执行栈中的 `this`【不能强制改变】

   :boom: 箭头函数的小妙用

   ![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210322005239380.png)

### 3. bind,call,apply

:star: ​`bind`,`call`,`apply` 这三个函数能够强制改变函数执行时，其内部产生的`this`关键字的指向

- call：改变this指向

  ```js
  function fn(a, b) {
    console.log(this.data, a, b)
  }
  
  fn(1, 2)										// undefined 1 2
  fn.call({data: 111}, 1, 2)	// 111 1 2
  ```

- apply：改变函数this，第二个参数可以使列表，运行时会解构

  ```js
  var data = 'window.data'
  
  function fn(a, b, c, d) {
    console.log(this.data, a, b, c, d)
  }
  
  fn(1, 2, 3, 4)					// undefined 1 2 undefined undefined
  fn.apply({data: 111}, [1, 2, 3, 4])	// 111 1 2 3 4
  ```

- bind：只改变函数内的this，不执行函数（内部是一个柯理化函数）

  ```js
  var data = 'window.data'
  
  function fn(a, b, c, d) {
    console.log(this.data, a, b, c, d)
  }
  
  let coreFn = fn.bind({data: 666}, 1)
  let coreFn1 = fn.bind({data: 666}, 1, 2)
  
  coreFn(3, 4, 5)				// 666 1 3 4 5
  coreFn1(...[3, 4, 5])	// 666 1 2 3 4
  ```

:star: 手写bind实现

```js
Function.prototype.myBind = function(toThis, ...args) {
  if(typeof this !== 'function') {
    throw new Error('only function can use!')
  }

  let returnFn = (...anotherArgs) => this.apply(toThis, args.concat(anotherArgs))	// 柯里化函数的思想
  returnFn.prototype = Object.create(this.prototype)	// 防止污染原函数的prototype

  return returnFn
}

function fn(a, b, c) {
  console.log(this, a, b, c)
}

fn.myBind({data: 222}, 8)(4561)
fn.myBind({data: 111}, 1, 5)(5)
```

### 4. JS中的类型

JavaScript中一共有六种类型：

- string【基本数据类型：字符串】

- number【基本数据类型：数字】

- boolean【基本数据类型：布尔值】

- null【基本数据类型：空】

  通常用来表示：:star: 该值为空（手动设置为空）

  

- undefined【基本数据类型：未定义】

  通常同来表示：:star: 定义未赋值（引擎自动设置为空）

- object【复杂数据类型：对象】

### 5. 浅拷贝深拷贝

浅拷贝和深拷贝，每个语言中基本上都有，是一个很常见的问题；出现深浅拷贝的根本原因就是在JS中，所有的对象都是引用数据类型，比如 a = {...}，b = a，在内存中他们都是指向一个对象的，修改 a 中的值会直接反应到 b 身上，所以如何实现深拷贝是一个老生常谈的问题

![image-20210321211750152](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210323231508326.png)


常用的解决方案：

:star: 使用 `JSON.parse(JSON.stringfy(obj))`

:star: 使用递归实现一个深拷贝函数

```js
function deepCopy(obj) {
  let o = Array.isNaN(obj)
  
  for(let key in obj) {
    if(obj[key] && (Array.isNaN(obj[key]) || Object.prototype.toString(obj[key] === '[ object Object ]'))) {
      o[key] = deepCopy(obj[key])
    } else if(obj[key] == undefined) {
      o[key] = null
    } else {
      o[key] = obj[key]
    }
  }
  
  return obj
}
```

### 6. 属性描述符

:star: 属性描述符是用来描述一个对象属性的特征，比如说是否可修改，是否可以删除等...

1. `Writable【boolean】`：属性是否可修改
2. `Configurable【boolean】`：属性是否能被配置，是否能被删除（单向操作）
3. `Enumerable【boolean】`：属性是否可以被枚举
4. `getter【function】`：属性被访问时执行该函数
5. `getter【function】`：属性被修改时执行该函数

JavaScript给我们提供了两个方法来操控属性描述符

- **Object.defineProperty(obj, key, configObj)** ：配置单个属性

  **Object.defineProperty(obj, key, configObj)** ：配置多个属性

  ------

  ```js
  // 属性描述符
  let obj = {}
  Object.defineProperty(obj, 'name', {
    value: 'xxx',
    writable: true,       // 不能被修改
    configurable: false,  // 不能被删除，不能被重新defineProperty
    enumerable: true      // 不能被枚举
  })
  
  // setter和getter
  let obj = {
    _name: 'xxx'
  }
  Object.defineProperty(obj, 'name', {
    // value: 'xxx',          当get+set同时出现，不能存在
    // writable: true,        当get+set同时出现，不能存在
    configurable: false,  
    enumerable: true,     
    get() {
      return this._name
    },
    set(value) {
      this._name = value
    }
  })
  
  // setter和getter也可以直接出现在对象中
  let obj = {
    name: '666',
    get a() {
      return this.name
    },
    set a(value) {
      this.name = value 
    }
  }
  ```

:star: 使用 **Object.getOwnPropertyDescriptor(TagObj, keyName)** 可以获取一个对象属性的所有属性描述符

```js
const obj = {
  a: '1'
}
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
  configurable: false,
  writable: false
})


console.log(Object.getOwnPropertyDescriptor(obj, 'a'));   // { value: '1', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(obj, 'b'));   // { value: 2, writable: false, enumerable: false, configurable: false }
```

### 7. [[Get]]和[[Put]]算法

 :star: 在js中，对一个属性进行操作时，对象使用`[[Put]]`和`[[Get]]`两种算法来控制属性值的设置和获取。

- 获取一个对象的值时，JavaScript会基于对象的`[[GET]]`的算法执行：

1. 属性是否存在访问器描述符`？`调用属性的 **setter** 方法 `:` 在对象本体上查找

2. 往其原型链上查找 (obj => obj.__ prototype __ => obj.__ prototype __ . __ prototype __...)

3. 若都没有找到，返回 `undefined`

   ```js
   let obj = {
     example: '我永远不可能访问到',
     get example() {
       return '哈哈'
     }
   }
   obj.__proto__ = {
     name: 'xyb',
     example: 'none'
   }
   obj.__proto__.__proto__ = {
   	age: 22
   }
   
   console.log(obj.example)	// '哈哈'
   console.log(obj.name)	// 'xyb'
   console.log(obj.age)	// 22
   console.log(obj.sex)	// undefined
   ```

- 修改一个对象值时，JavaScript会基于的`[[Put]]`算法执行：

1. 属性是否存在访问器描述符 `？` 执行 **setter** `:` 修改属性的值【根据属性的**writable**来是否修改】

   ```js
   let obj = {}
   
   Object.defineProperty(obj, 'a', {
     value: 'dddd',
     writable: true,
     set(value) {
       return this.a = value 
     },
   })
   
   // 属性访问器和字面量会互相覆盖
   let obj = {
     c: 200,
     set c(value) {
       this.c = value + this.c
     },
     get a() {
       return 999
     },
     a: 000
   }
   
   console.log(obj.c)		// undefined 属性访问器和字面量会互相覆盖
   console.log(obj.a)		// undefined 属性访问器和字面量会互相覆盖
   
   let obj = {
     c: 200,
     set c(value) {
       this.c = value + this.c
     },
     get c() {
       return this.c
     },
     c: 300
   }
   
   console.log(obj)  // {c: 300}	属性访问器和字面量会互相覆盖
   ```

:boom: 当一个属性的 **setter** 和 **getter** 同时存在时，描述符的**value**和**writable**属性不能存在，会报错

:boom: 属性访问器​和属性的在字面量定义中是同一级别关系，能互相覆盖

### 8. 判断对象"属性"存在性

获取一个对象属性的时候：

1. 若这个属性**不存在**，会返回**undefined**，
2. 若这个属性**存在**，但是值为**undefined**，也会返回**undefined**

那么我么如何来判断一个属性是未定义还是定义未传值呢？接下来有两种方法来检测。

:star: 由于对象属性的 `[[get]]` 算法是基于原型链来查找的，所以就有 **in** 和  **hasOwnProperty** 两种方式来判断

:one: `in` ：检查当前对象 + 对象的原型链中的 **key** 【使用**for...in**语句会遍历本身及其原型链上所有可以枚举的值】

:two: `hasOwnProperty`：只检查当前对象是否定义了**key**，不向原型链查找。

:three: `propertyIsEnumerable` ：只检查当前对象是否定义了**key** + **key** 是否可枚举，不向原型链查找。

```js
// in 和 hasOwnProperty 的区别
const obj = {}
obj.__proto__ = {
  a: '我是原型上的a'
}

console.log('a' in obj)		// true
console.log(obj.hasOwnProperty('a'))	// false

// for...in循环的弊端
const obj = {}
obj.__proto__ = {
  a: '我是原型上的a'
}

for(let key in obj) {
  console.log(key, obj[key])	// a 我是原型上的a
}

// propertyIsEnumerable 用来判断一个对象是否存在 + 是否可枚举
const obj = {
  a: '1'
}
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false
})

console.log(obj.propertyIsEnumerable('a'));   // true
console.log(obj.propertyIsEnumerable('b'));   // false
```

:star: 当我们要获取一个对象的所有属性时，可以使用**keys**和**getOwnPropertyNames**，这俩方法不针对原型链

:one: `keys` ：获取一个对象上所有**可枚举**的属性

:two: `getOwnPropertyNames` ：获取一个对象上所有**可枚举 + 不可枚举的**属性

```js
const obj = {
  a: '1'
}
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false
})


console.log(Object.keys(obj));   // [ 'a' ]
console.log(Object.getOwnPropertyNames(obj));   // [ 'a', 'b' ]
```

### 9.  遍历

:key: 数组迭代方法

:one: `for (let i = 0; i < arr.length; i++) {}` ：最典型的通过数组下标来遍历

:two: `for (let i in arr) {}` ：遍历数组所有可枚举的属性（会遍历所有本对象 + 原型上可枚举的属性）

:three: `for(let data of arr) {}` ：访问数组迭代器进行遍历（配合迭代器 = 本世纪最强数组迭代方法）

:four: `.each() .every() .some()` ：each => 遍历数组忽略回调 every => 回调返回false停止 some=> 回调返回true停止

:zap: 这里我着重讲 `for...of` 的行为

1. 首先获取数组的迭代器

2. 调用迭代器的 next 方法获取值，直到得到迭代器返回 { done:true } 代表迭代结束，循环break终止

   ```js
   let arr = [1, 2, 3]
   
   let iter = arr[Symbol.iterator]()
   console.log(iter.next())  // { value: 1, done: false }
   console.log(iter.next())  // { value: 2, done: false }
   console.log(iter.next())  // { value: 3, done: false }
   console.log(iter.next())  // { value: undefined, done: true }
   
   for(let data of arr) {
       console.log(data)		// 1 2 3
   }
   
   // 模拟for...of...，而且还可以往迭代器中传值
   for(let res; (res = value[Symbol.iterator]().next()) && (!res.done);) {
       console.log(res);
   }
   ```

   :star: 自定义迭代器

   ```js
    // 自定义数组迭代器
    const arr = ['a', 'b', 'c', 'd']

    Object.defineProperty(arr.__proto__, Symbol.iterator, {
        value: function () {
            let idx = 0,
                keys = Object.keys(this)
            return {
                next: () => {
                    return {
                        value: this[keys[idx++]],
                        done: idx > keys.length
                    }
                }
            }
        },
        configurable: true,
        writable: false
    })

    let it = arr[Symbol.iterator]()
    console.log(it.next())		// { value: 'a', done: false }
    console.log(it.next())		// { value: 'b', done: false }
    console.log(it.next())		// { value: 'c', done: false }
    console.log(it.next())		// { value: 'd', done: false }
    console.log(it.next())		// { value: undefined, done: true }

    for(let value of arr) {
        console.log(value)			// 'a', 'b', 'c', 'd'
    }

    // 自定义对象迭代器
    let value = (function() {
        let index
        return {
            [Symbol.iterator]() {
                return this
            },
            next() {
                if(index == undefined) {
                    return {
                        value: '9999'
                    }
                } else {
                    return index
                }
            }
        }
    })()

    // for (let d of value) {
    //   console.log(d);		// 无限循环
    // }
    ```

    :star: 使用迭代器进行非常强大的对象操作（forEach, every, some可以替代实现大部分功能）

    ```js
    const arr = [{name: 'xxx',age: 20},{name: 'yyy',age: 28}, {name: 'zzz',age: 31
    },{name: 'ppp',age: 18}]
    
    Object.defineProperty(arr, Symbol.iterator, {
      value: function() {
        let idx = 0,keys = Object.keys(arr)
        return {
          next: () => {
            if(this[keys[idx]] && this[keys[idx]].age > 25) {
              this[keys[idx]].word = '你太大了!!'
            } 
            return {
              value: this[keys[idx++]],
              done: idx > keys.length
            }
          }
        }
      }
    })
    
    for(let data of arr) {
      console.log(data)
    }
    
    // { name: 'xxx', age: 20 }
    // { name: 'yyy', age: 28, word: '你太大了!!' }
    // { name: 'zzz', age: 31, word: '你太大了!!' }
    // { name: 'ppp', age: 18 }
   ```

:key: 对象遍历

:one: 使用 `for(let key in obj)` 语句 + `obj.hasOwnProperty(key) ` 可以遍历当前对象上的所有属性

```js
let obj = {
  name: 'xxx',
  age: 22,
  sex: "M"
}

obj.__proto__.aaa = 20

for(let key in obj) {   // in会遍历包括原型链上所有可枚举属性;
  if(obj.hasOwnProperty(key)) {   // 检查遍历的key是不是在自身对象上
    console.log(key)  
  }
}
```

:two: 使用 `for(let key of Object.keys(obj))` 遍历当前对象上所有可枚举的 key

```js
let obj = {
  name: 'xxx',
  age: 22,
  sex: "M"
}

for(let key of Object.keys(obj)) {   // 遍历当前对象的可枚举属性,不包括原型链;
  console.log(key, obj[key])
}
```

 ​

### 10. 类

:key: ​ 类是一种抽象的设计模式，其有三个特点被称为"封装，继承和多态"；但是JS中的类完全是伪造的类，只是按照类这个设计模式强制模仿的一种编写代码的方式；JS的类是完完全全依赖委托原型链来实现的，和其他语言完全不同

1. 封装：把具有相同特征特性的代码抽取成一个模型（别墅，农房，洋房，他们的房子结构都是差不多的：都是自下而上，门都是在一楼，房子里都是按照一个个房间分层，他们都有相同的特征，可以吧这个特征抽取封装成一个类，他不管你的装潢是怎么样，厨房里装几个油烟机...他只管你的整个房子结构。而实例就是建筑师拿着这个大体的蓝图造出的一个个房子）

2. 继承：子类继承父类，可以调用父类的方法；（比如引擎是一个父类，我可以创建一个汽车子类，也可以创建一个摩托车子类，他们的相同点都是继承了引擎类，都可以使用引擎的功能来运转机器）

3. 多态：子类可以重写父类的方法；（比如跑车子类，他可以写一个他自己的发动引擎的模式，比如三喷起步十喷起步等等）

   ![Example banner](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210326234402297.png)

:star: **其他语言**创造出的类可以被实例（复制）无数次，实例的时候是复制行为，**实例的方法是自己私有的**；

JavaScript的类只是通过构造函数创建一个对象，并且通过把构造函数的 prototype 的插入到这个对象的原型链上，并和对象属性的[[get]]算法配合实现委托行为，**只是种假的类设计模式罢了**；实际所有的实例都是共用同一个 构造函数的prototype而已 ，如果构造函数的prototype发生改变，所有的实例都会受到影响~

总地来说， 在JavaScript中模拟类是得不偿失的， 虽然能解决当前的问题， 但是可能会埋下更多的隐患。

- python类行为【实例不依赖类，两者之间是复制关系】

  > 实例一千个对象，这些实例使用的方法都是各自的

  ```python
  class Father:
    def __init__(self, name, age):
      self.name = name
      self.age = age
    def getFatherInfo(self):
      print(self.name, self.age)
  
  class Son(Father):
    def __init__(self, name, age, sex):
      Father.__init__(self, name, age)
      self.sex = sex
    def getSonInfo(self):
      print(self.name, self.age, self.sex)
      
  son = Son('xyb', 22, 'M')
  son.getFatherInfo()		# xyb 22
  son.getSonInfo()			# xyb 22
  Son = '-----'					# 删除Son类
  Father = '------'			# 删除Father
  son.getFatherInfo()		# xyb 22
  son.getSonInfo()			# xyb 22
  ```

- JavaScript类行为【实例的原型只是引用了够着函数的prototype指针，不是复制关系】

  > 就算实例了一千个对象，但他们的所调用的方法都是同一个方法

  ```js
  function Father(name, age, sex) {
    this.name = name
    this.age = age
    this.sex = sex
  }
  
  Father.prototype.getSonInfo = function() {
    return [this.name, this.age, this.sex].join(' ')
  }
  
  let a = new Father('xyb', 22, 'M')
  console.log(a.getSonInfo())   // xyb 22 M
  Father.prototype.getSonInfo = '-------'		// 修改getSonInfo方法,实例无法使用
  console.log(a.getSonInfo())   // 报错
  ```

  

###  11. 原型和原型链

:key: JavaScript在获取|设置一个对象属性的时候，引擎是基于 **[[get]]** 和 **[[set]]** 算法的，当这两个算法在当前对象查找不到属性时候，就会忘原型链上去找；而**原型链是JS中最核心的一个概念**，可以说是原型链串成了JS中的所有对象

1. 每个对象都有一个 **__ proto __** 对象，这个就是原型链

2.  **__ proto __** 原型链是在被够着函数创建的时候，由构造函数的 **prototype** 属性赋予

:star:  **[[get]]** 和 **[[set]]** 算法与原型链的各种相爱相杀使我们应该掌握的

- **[[get]]** 算法

  :one: 在当前对象能找到时，屏蔽原型链上的

  ```js
  let o = { a: 'o.a' }
  o.__proto__.a = 'o.__proto__.a'
  console.log(o.a)	// 'o.a'
  ```

  :two: 当前对象无时，向原型链查找

  ```js
  // 1. 若是值，返回值
  let o = {}
  o.__proto__.a = 'o.__proto__.a'
  console.log(o.a)	// 'o.__proto__.a'
  
  // 2. 若是访问器getter()，调用
  let o = {}
  Object.defineProperty(o.__proto__, 'a', {
    get() {
      console.log('我被执行了！！！')
      return 'o.__proto__.a'
    }
  })
  console.log(o.a)		// 'o.__proto__.a'
  ```

- **[[set]]** 算法

  :one: 当前对象有时，屏蔽原型链上的（真实情况视**writable:true|false**决定）

  ```js
  let o = {
    a: 'o.a'
  }
  o.__proto__.a = 'o.__proto__.a'
  o.a = 100
  console.log(o.a)	// 100
  ```

  :two: 当前对象无时，分为三种情况（:zap: 这个非常令人混淆！！！）

  ```js
  // 1. 原型链上的值，属性描述符是 writable:true，允许对象赋值
  let o = {}
  Object.defineProperty(o.__proto__, 'a', {
    value: 'o.__proto__.a',
    writable: true
  })
  o.a = 100
  console.log(o.a)	// 100，修改成功
  
  // 2. 原型链上的值，属性描述符是 writable:false，不允许对象赋值
  let o = {}
  Object.defineProperty(o.__proto__, 'a', {
    value: 'o.__proto__.a',
    writable: false
  })
  o.a = 100
  console.log(o.a)	// 'o.__proto__.a'，没有被修改
  
  // 3. 原型链上的值，是一个setter，运行setter()，不会赋值操作
  let o = {}
  Object.defineProperty(o.__proto__, 'a', {
    set(value) {
      console.log(value, 'o.__proto__.a.setter')
    }
  })
  o.a = 100
  console.log(o.a)	// undefined
  ```

  以上三种情况，只有第一种情况赋值成功；如果出现二三情况，那么只能使用**Object.defineProperty**

 

### 12. 实例检测

:key: 严格来说，因为JavaScript是没有类的语言，那么伪类实例是如何判别自己是属于哪个类的：

1. 使用 **instanceof** 操作符
2. 使用 **isPrototypeOf** 方法

Because 伪类的实现是通过原型链模式实现，所以最通常的方法就是检查某个构造函数的原型是否存在这个实例的原型链上

```js
// 对象 instanceof 函数: 左边对象整条原型链中是否有指向右边函数的prototype对象的对象
function Son(name) {
  this.name = name
}

Son.prototype.getInfo = function() {
  console.log(this.name, this.age);
}

let s = new Son('xyb', 'age')
console.log(s instanceof Son);  // true  // a对象原型链中是否有指向Son构造函数的对象

// 对象 isPrototypeOf 对象:左边的对象是否存在右边对象的原型链上
Son.prototype.isPrototypeOf(s)
```

:key: 手搓 **instanceof** 和 **isPrototypeOf**

1. instanceof

   ```js
   function myInstanceof(left, right) {
     let typeLeft = typeof left,
       typeRight = typeof right,
       proto = Object.getPrototypeOf(left)
     if (left == undefined) return false;
     if (typeRight !== 'function' || typeLeft != 'object' && typeLeft != 'function') return false;
   
     while (true) {
       // 顺着循环一直往原型链上找
       if (proto == undefined) return false
       if (right.prototype === proto) return true;
       proto = Object.getPrototypeOf(proto)
     }
   }
   
   console.log(myInstanceof({}, Object)); // true	
   console.log(myInstanceof([], Array));  // true
   console.log(myInstanceof([], Object)); // true
   ```

2. isPrototypeOf

   ```js
   function myIsPrototypeOf(left, right) {
     let typeLeft = typeof left,
       typeRight = typeof right,
       proto = Object.getPrototypeOf(right);
       console.log(typeLeft);
     if (left == undefined) return false;
     if (typeRight !== 'function' && typeRight !== 'object') return false;
   
     while (true) {
       // 顺着循环一直往原型链上找
       if (proto == undefined) return false
       if (left === proto) return true;
       proto = Object.getPrototypeOf(proto)
     }
   }
   
   console.log(myIsPrototypeOf(Object.prototype, f));
   console.log(myIsPrototypeOf(Object.prototype, {}));
   console.log(myIsPrototypeOf(Object.prototype, new Date()));
   console.log(myIsPrototypeOf(Array.prototype, []));
   ```

### 13. Object.create

:star: 该函数是实现完美寄生组合继承，行为委托的关键方法

作用：

1. 创建一个空对象
2. 把传入Object.create中第一个参数作为空对象的上层原型链

```js
// 基本使用
let obj = {
  getInfo() {},
  getNumber() {},
  getAddress() {}
}

let o = Object.create(obj)
// o instanceof obj;   // instanceof右边只能是函数
obj.isPrototypeOf(o)   // true

// Object.create的第二个参数:用于个创建的空对象添加属性
let o = Object.create(obj, {
  name: {
    value: 'xyb',
    writable: false
  },
  age: {
    get() {
      return 20
    }
  }
})

o.name	 // 'xyb'
o				// Object { age: >>>, name: 'xyb', <prototype>: { getInfor, getNumber... } }
```

实现原理：

```js
Object.create = function(proto) {
  const fn = function() {}
  fn.prototype = proto
  return new fn()
}
```



### 14. 面向委托设计

面向委托设计就是把JavaScript的类讲清楚了，所有的class，构造函数创建的对象，其实就是创建一个对象，然后在调用方法的时候通过 **[[get]]** 往原型链上进行委托

1. Es5：完美寄生组合继承设计

   ```js
   // 父类
   function Father(name, age) {
     this.name = name
     this.age = age
   }
   
   Father.prototype.getFatherInfo = function() {
     console.log('Father.prototype.getFatherInfo')
   }
   
   // 子类
   function Son(name, age, sex) {
     Father.call(this, name, age)
     this.sex = sex
   }
   	
   Son.prototype = Object.create(Father.prototype)		// 原型继承（引用父类原型）
   Object.defineProperty(Son.prototype, 'constructor', {
     value: Son,
     writable: false,
     configurable: false,
     enumerable: false
   })
   
   Son.__proto__ = Father		// 静态方法继承
   ```

2. Es6：Class类设计

   ```js
   class Father {
     constructor(name, age) {
       this.name = name
       this.age = age
     }
     getFatherInfo = function () {
       console.log('Father.prototype.getFatherInfo')
     }
   }
   
   class Son extends Father {
     constructor(name, age, sex) {
       super(this, name, age)
       this.sex = sex
     }
     getSonInfo() {
       console.log(this.name, this.age, this.sex)
     }
   }
   ```

3. 面向委托设计

   ```js
   // 父类
   let Father = {
     init(name, age) {
       this.name = name
       this.age = age
     },
   
     getFatherInfo() {
       console.log('Father.getFatherInfo')
     }
   }
   
   // 子类
   let Son = Object.create(Father)		// 子类
   Son.stup = function(name, age, sex) {
     this.init(name, age)			// 委托给父类的init进行实例化
     this.sex = sex
   }
   Son.getSonInfo = function() {
     return 'Son.getSonInfo'
   }
   
   let son = Object.create(Son)
   son.init('xyb', 20, 'M')
   console.log(son.name)
   ```
   
   

## 三，类型和语法

### 1. 类型及检测

:key: ​JavaScript类型：

变量类型：在JavaScript中，变量是没有类型这个概念的，一个变量能够储存任何类型的值（TypeScript有变量是有类型）

值类型：目前为止，JavaScript的类型一共有**七**种（6基本 + 1复杂）

- 基本数据类型：
  1. 字符串（string）
  2. 数字（number）
  3. 布尔值（boolean）
  4. 空值（null）
  5. 未定义（undefined）
  6. 符号（symbol）
  7. 大数字（BigInt）

- 复杂数据类型：

  1. 对象（object）

     其他所有的类型都是Object的子类型：

     - function函数（可调用对象）
     - Array（也是对象）
     - RegExp正则
     - Date日期
     - Math
     - ...

:key:类型检测方法总结（全）：

- **typeof**是简单数据类型（除null外）最好的检测方法

  > **PS**：`typeof nul` 时会返回 `object`，这是因为null在底层存储二进制数表示是全 0，而只要前三位值为0的类型都会被判断成 `object` 类型

  ```js
  console.log(typeof 1)       // number
  console.log(typeof '1')     // string
  console.log(typeof true)    // boolean
  console.log(typeof undefined) // undefined
  console.log(typeof Symbol.iterator) // symbol
  ```

  ```js
  // 检测null的方法
  let n = null
  if (!n && typeof n === 'object') {
    console.log(n)
  }
  
  // typeof 检测引用数据类型时，除了 function 以外，所有的对象返回的都是 'object'
  typeof Function fn() {}		// function
  typeof /\d+/							// object
  typeof new Date()					// object
  typeof Object							// function 
  ```

- **Object.prototype.toString**是最好的复杂类型检测方式

  > 使用 Object.prototype.toString 后返回由 “【object 类型】”这样的字符串
  >
  > PS：该值可以由对象的Symbol.toStringTag属性决定

  ```js
  let obj = {}
  let arr = []
  let data = new Date()
  let re = /\d+/img
  let fn = function () {}
  
  Object.prototype.toString.call(obj)   // [object Object]
  Object.prototype.toString.call(arr)   // [object Array]
  Object.prototype.toString.call(data)  // [object Date]
  Object.prototype.toString.call(re)    // [object RegExp]
  Object.prototype.toString.call(fn)    // [object Function]
  
  // 使用Symbol.toStringTag修改
  obj[Symbol.toStringTag] = '9999999999'
  Object.prototype.toString.call(obj) // [object 9999999999]
  ```

:key: 自己动手系列

> 自己写一个万能的数据类型检测

```js
function getType(tag) {
  if (tag == undefined) {
    return tag + ''
  }

  return typeof tag == 'object' || typeof tag == 'function' ?
    Object.prototype.toString.call(tag).replace(/^\[object (\S+)\]$/, '$1') : typeof tag
}

console.log(getType(''))                // string
console.log(getType(1))                 // number
console.log(getType(true))              // boolean
console.log(getType(null))              // null
console.log(getType(undefined))         // undefined
console.log(getType(Symbol.iterator))   // symbol
console.log(getType({}))                // Object
console.log(getType([]))                // Array
console.log(getType(/\d\w/))            // RegExp
console.log(getType(function() {}))     // Function
console.log(getType(new Date()))        // Date
console.log(getType(new Set()))         // Set
console.log(getType(new Map()))         // Map
console.log(getType(new Error()))       // Error
console.log(getType(new Number(3)))     // Number
console.log(getType(NaN))               // number
```

:key: jQuery的类型检测方法

> 可以借鉴哦，jQuery是基于（typeof + Object.prototype.toString()）实现的

```js
let typeSet = {}
"Boolean Number String Function Array Date RegExp Object Error Map Set".split(' ').forEach(item => typeSet[`[object ${item}]`] = item)

function getType(value) {
  if (value == null) {
    return '' + value
  }

  return typeof value === 'object' || typeof value === 'function' ?
    typeSet[Object.prototype.toString.call(value)] || 'object' :
    typeof value
}

console.log(getType(''))                // string
console.log(getType(1))                 // number
console.log(getType(true))              // boolean
console.log(getType(null))              // null
console.log(getType(undefined))         // undefined
console.log(getType(Symbol.iterator))   // symbol
console.log(getType({}))                // Object
console.log(getType([]))                // Array
console.log(getType(/\d\w/))            // RegExp
console.log(getType(function() {}))     // Function
console.log(getType(new Date()))        // Date
console.log(getType(new Set()))         // Set
console.log(getType(new Map()))         // Map
console.log(getType(new Error()))       // Error
console.log(getType(new Number(3)))     // Number
console.log(getType(NaN))               // number
```

:star: 接下来我们来梳理下类型判断的四种方式

1. typeof

   > typeof [value]	返回一个字符串

   :accept:：返回字符串，检测**基本数据类型的万能方法**

   :warning:：检测null时会返回 'object'

2. instanceof

   > a instanceof Father	检查Father函数的`protytype`是否出现在a的原型链上

   :accept:：返回布尔值，用来检测对象是某个类的实例倒是不错

   :warning:：只能检测引用类型，并且不能直观的判断本身值是什么类型（适合实例检测）

3. constructor

   > a.constructor === Array  检查a的这个属性是否是指向Array

   :accept:： 返回布尔值，只是通过constructor属性的特性来简单的判断

   :warning:：不可控性高，如果constructor被修改就不好判断了（适合实例检测） 

4. Object.prototype.toString

   > Object.prototype.toString.call(a)    返回a的类型

   :accept:：返回特殊字符串类型，**引用数据类型的万能检测方法**

   :warning:：对于基本数据类型，会把他包装成包装类型。

### 2. 判断"变量"的存在性

前面我们其实已经详细的总结过判断一个对象的属性存在性，因为其行为是

：*若一个变量未定义，原型链上也没，返回undefined；若定义未赋值，也返回undefined*

:key: 但是变量存在性有一点不同，就是对一个变量进行RHS查询时未定义，他会报错！！！

```js
// RHS查询
let a = 100;
let b;
console.log(a)	// 100
console.log(b)	// undefined
console.log(c)	// 报错!RHS未找到变量c
```

:star: ​下面提供两种方法解决变量未定义时报错

1. 使用 "typeof" 操作符

   ```js
   // js在对一个未定义的变量进行 typeof 时,会有一个安全机制，返回 undefined
   let a = 100;
   
   typeof a	// number（检测变量类型）
   typeof c	// undefined，没有报错！
   typeof d	// undefined，没有报错！
   ```

2. 使用 "对象.属性" 的方式查找

   > 把变量存在问题转换成对象属性存在问题，解决报错

   ```js
   // 如果变量是在全局作用域上的，使用 window.属性
   if(window.a) {
     ...
   }
   
   if(window.c) {
     ...
   }
   
   // 不是全局作用域的话就用 typeof
   function () {
     if(typeof a === 'undefined') {...}
   }
   ```

   

### 3. 隐式转换规则

隐式转换一直是个非常头疼的问题，不经意之间的一个运算符，一个双等号，就会把两个变量的值进行转换，有时候是不可控的，但是在充分理解之后，这些"不足"还能成为你武器

:key:：**基本类型转换**

> 基本类型的转换还是非常简单的

|             |  转换成字符串   |   转换成数字    |                   转换成布尔值                    |
| :---------: | :-------------: | :-------------: | :-----------------------------------------------: |
|      1      |       "1"       | :no_entry_sign: | 除了数字 **0** 和 **NaN**，所有数字一律为**true** |
|     "1"     | :no_entry_sign: |    数字或NaN    |     除了空字符串**""**，所有字符串一律为true      |
| true或false | "true"或"false" |      0或1       |                  :no_entry_sign:                  |
|  undefined  |   "undefined"   |       NaN       |                     **false**                     |
|    null     |     "null"      |      **0**      |                     **false**                     |
| Symbol('1') |   "Symbol(1)"   | :no_entry_sign: |                     **true**                      |

所有boolean：

1. **0**，**NaN**，**false**，**空字符串**，**null**，**undefined**是JavaScript中为false的值
2. 所有**对象**转换成**boolean**都是为**true**

:key:：**复杂数据类型转换**

> 每个对象都有 "valueOf" 和 "toString"，两个方法，在对象转字符串|数字要用到

1. 所有的对象转换时遵循一个原则：

   对象 => 字符串 | 数字：

   1. 若对象部署了 **Symbol.toPrimitive** 函数，调用**Symbol.toPrimitive**
   2. 否则调用 **valueOf** 方法，若没得到原始值，再调用 **toString** 得到原始值

2. 若得到原始值，对原始值进行 【原始值=>数字】|【原始值=>字符串】 的转换，若没得到原始值，调用toString通常会得到 "[object xxx]"的形式，或者有些构造函数会重写toString（比如Date对象），再对得到的这个字符串或其他值进行【原始值=>数字】|【原始值=>字符串】的转换

```js
let obj = {}
let arr = []
let fn = function () {}
let reg = /\d+\w*/
let date = new Date()
let map = new Map()
let set = new Set()
let err = new Error('a err')
let allArr = [1, {}, date, reg]

obj.valueOf(), obj.toString()    // {} -- [object Object] 
arr.valueOf(), arr.toString()    // [] -- ""
fn.valueOf(), obj.toString()     // [Function: fn] -- [object Object] 
reg.valueOf(), reg.toString()    // /\d+\w*/ -- /\d+\w*/ 
date.valueOf(), date.toString()  // 1616948716977 -- Mon Mar 29 2021 00:25:16 GMT+0800 (中国标准时间) 
map.valueOf(), map.toString()    // Map(0) {} -- [object Map] 
set.valueOf(), set.toString()    // Set(0) {} -- [object Set] 
console.log(err.toString());     // err不能直接调用valueOf--'Error: a err'

console.log(allArr.valueOf(), allArr.toString())
// [ 1, {}, 2021-03-28T16:25:16.977Z, /\d+\w*/ ] -- 1,[object Object],Mon Mar 29 2021 00:25:16 GMT+0800 (中国标准时间),/\d+\w*/
```

```js
let a1 = new Number('111')
let a2 = new Number('aaa')
let a3 = new Number([5, 6, 4])
let b1 = new String(123)
let b2 = new String({})
let b3 = new String([1, 2, 5])
let c1 = new Boolean('aaa')
let c2 = new Boolean(0)
let c3 = new Boolean([])

console.log(a1.valueOf(), a1.toString()) // 111 111
console.log(a2.valueOf(), a2.toString()) // NaN NaN
console.log(a3.valueOf(), a3.toString()) // NaN NaN
console.log(b1.valueOf(), b1.toString()) // 123 123
console.log(b2.valueOf(), b2.toString()) // [object Object] [object Object]
console.log(b3.valueOf(), b3.toString()) // 1,2,5 1,2,5
console.log(c1.valueOf(), c1.toString()) // true true
console.log(c2.valueOf(), c2.toString()) // false false
console.log(c3.valueOf(), c3.toString()) // true true
```

### 4.+,-,*,/,~,!

:zap: + 和其他 -*/区别总结：

1. 当 + 两边都是原始值：
   - 若原始值里有字符串，那么 + 的操作是字符串拼接
   - 若原始值没有字符串，那么 + 执行的操作时正常的数字相加（所有原始值要转换成数字）
2. 当 + 两边有对象：
   - 先调用 valueOf | toString 得到原始值，再根据第一条规则进行操作
3. -*/  执行的所有操作都是（把两边的值转换成数字）进行减乘除

------

:star: ​**+ ** 操作符：

1. 当 + 两边有一个或者两个操作数是字符串，执行字符串操作
2. 当 + 两边有一个或者两个操作数是对象，先把对象转成原始值，看看两边有没有字符串，有就进行字符串拼接，没有就把两边转换成数字进行数字相加
3. 当 + 两边没有字符串，所有的操作都是数字相加，要转换成数字

> +操作符还可以用来把字符串转换成数字用

```js
console.log('字符串' + 20)          // 字符串20
console.log('字符串' + true)        // 字符串true
console.log('字符串' + undefined)   // 字符串undefined
console.log('字符串' + null)        // 字符串null

console.log({} + [])   // {} => '[object Object]', [] => ''
console.log(true + 2 + {}) // true + 2 => 3; 3 + '[object Object]'
console.log(null + undefined + [5, 4] + {}) // NaN + [5, 4] => NaN + '5,4' => 'NaN5,4' + '[object Object]'

console.log(true + null)  // 1 + 0 = 1
console.log(undefined + null)  // undefined + null = NaN

// 浏览器的坑
[] + {}		// '' + '[object Object]'
{} + []		// {}会被当成代码片段, +[]会被转换成数字 => 0
```

经典面试题：

**100 + true + 21.2 + null + undefined + "BAT" + [6, {}, '1', true] + null + 9 + false**

```js
// 特别经典的一题，助你理解 + 的隐式操作

// ！！！在JavaScript都是一步一步执行的

// 1. 第一步，先执行100 + true，【true => 1】
100 + true = 100 + 1 = 101

// 2. 第一步执行完，执行第二步 101 + 21.1 = 122.1
101 + 21.1 = 122.1

// 3. 执行 122.1 + null，【null => 0】
122.1 + null = 122.1 + 0 = 122.1

// 4. 执行 122.1 + undefined，【数字 + undefined = NaN】
122.1 + undefined = NaN

// 5. 执行 NaN + "BAT"，【字符串最大】
NaN + "BAT" = 'NaNBAT'

// 6. 注意！+的两边有对象，先转换对象
1. 调用列表的 valueOf() 返回本身
2. 继续调用 toString() 对数组内每一项转换字符串 =》 '6,[object Object],1,true'
3. 进行字符串拼接
'NaNBAT' + '6,[object Object],1,true' = 'NaNBAT6,[object Object],1,true'

// 7. 后面都是字符串拼接了！
'NaNBAT6,[object Object],1,true' +  null + 9 + false
最终答案==> "NaNBAT6,[object Object],1,truenull9false"
```

:key: ​~ 操作符

> ~ 操作符最大的用处，在我看来是可以把哨兵值(-1)转换成 0，也就是转换成条件 false

1. `String.prototype.charAt()`

   ```js
   String.prototype.indexOf.call('abcdef', 'ef') // 5
   String.prototype.indexOf.call('abcdef', 'we') // 没找到,返回-1
   
   if('abcdef'.indexOf('ef') !== -1) {
     // 未找到
   } 
   if('abcdef'.indexOf('ef') >= 0) {
     // 未找到
   }
   ```

   ```js
   // 优化后
   console.log(~-1);	// => 0
   if(!~'abcdef'.indexOf('ef')) {
     // 未找到
   }
   ```

:key: ! 和 !! 操作符

> ! 可以把后面的值转换成布尔值并取反，!! 可以把后面的值转换成布尔值（相当于 boolean）

```js
// 使用 ! 取反
if(!0) { }
if(!true) { }
console.log(!0, !true, !false, ![], !{})  // true false true false false

// 使用 !! 转换布尔值，相当于 boolean() 操作
console.log(!!0, !!true, !!false, !![], !!{})  // false true false true true
```

:key: -, *, /

> 所有在这三个操作符两边的值，都转变成数字，在进行操作

```js
console.log(1 - null);      // 1
console.log(1 - '');        // 1
console.log(1 - '1111');    // -1110
console.log(1 - [55]);      // -54
console.log(1 - {});        // NaN 
```

### 5.=,==,===

首先总结 == 和 ===，这两个叫等值运算符，结果总是一个表示运算符代表的关系在两个参数之间成立与否的 **Boolean** 值。

:key: **===** : 三等号，变量a 和 变量b 比较过程如下：

> === 中没有类型转换，秉承相等就相等，不相等就拉倒的理念

1. 两个值**类型**不相同，直接返回 **false**

2. 两个值类型相同，比较值；若值相同，返回 **true**；若值不同，返回 **false**

3. 两个对象比较，若不是指向同一个对象，一律返回 **false**

   ```js
   undefined === undefined   // true
   111 === '111'             // false
   111 === {}                // false
   [1, 2] === [1, 2]         // false
   true === 1                // false
   
   let a = {}
   let b = a
   a === b		// true
   ```

:key: **==** : 双等号，变量a 和 变量b 比较过程如下：

> 使用 == 的时候,在两边类型不同的时候会进行 "隐式类型" 转换

1. 两边都是同类型，比较他们的值是否相同；相同 ? 返回 **true**；不同 ? 返回 **false**

2. 两边类型不同：

   1. 如果两边的值都是 （Number，Boolean，String其中之一），把两边都转成数字进行比较。

      :star: 注意一点，所有的 Boolean 在比较时，都会先被转成数字
   2. null 和 undefined在 == 中和任何值都不相等

      :star:（null == undefined） 是特殊的存在，返回 **true**
   3. 如果是对象和（Number，Boolean，String之一）的值作比较：
      1. 遇到 （Number，Boolean），两边都转换成数字比较
      2. 遇到（String），两边都转成字符串比较
   4. 两个对象比较，若不是指向同一个对象，一律返回 **false**

   ```js
   1 == '1'			// true
   1 == '12'			// false
   1 == true     // true	  
   1 == false		// false
   '1' == true		// true
   '2' == true   // false
   
   null == undefined		// true，除了这种情况都是false
   null == 0						// false
   null == false				// false
   null == '0'					// false
   null == [] 				  // false 
   undefined == 0			// false
   undefined == false	// false
   undefined == '0'		// false
   undefined == []			// false
   
   '' == []						// true
   '1,2' == [1, 2]			// true
   1 == [1]   					// true
   '[object Object]' == {}		// true
   {} == []	// false
   [] == []  //  false false
   
   // 两类特殊情况,在 [] 中的 null 和 undefined 在[]被转成字符串的时候是空字符串
   [null] => ''		         // 转成字符串是空字符串
   [undefined] => ''
   [undefined, 1] => ',1'
   [null, 1] => ',1'
   
   // 特殊
   [] == ![]		// ![] 先转换成布尔值，在转成数字，然后左边的[]和数字比较
   [1] == !![]
   ```


:key: =：赋值等号​

> 单个进行赋值如 "let a = 0"；就是普通赋值，我们这里主要讲连等

```js
// = 会返回当前赋值的值
let a, b, c;
a = b = c = 20

console.log(a, b, c)	// 20 20 20

// 连等的执行顺序:从右往左执行
c = 20		
b = 20
a = 20
// 即c=20返回20,并把20赋值给b,b=20返回20,并把20赋值给a

// 注意
let a = b = c = 20		// => c = 20 b = 20 let a = a, b和c被定义到全局上了
```

:star: 等号的好处

> 因为等号有返回值, 可以作为判断语句的条件

```js
function getABC(str) {
  var matches; // 提取所有ABC  
  if (str && (matches = str.match(/[ABC]/g))) {
    return matches;
  }
}
console.log(getABC("abcABC")) ; // [ 'A', 'B', 'C' ]
```



### 6. ++ --

> ++ 和 -- 是自加自减的操作，放在变量前和放在变量后是完全不同的效果

1. 放在前和放在后的区别

   ```js
   let a = 0
   
   // 在一行执行,没多大区别
   a++								// a = a + 1
   console.log(a)    // 1
   ++a								// a = a + 1
   console.log(a)    // 2
   
   // 在代码块中执行
   a = 0
   
   let b = a++				 // 原理:a++,先返回a的值,在进行 a = a + 1 操作
   console.log(b);    // 0
   a = 0
   
   let c = ++a					// 原理,++a,先进行a = a + 1 操作,在返回a的值
   console.log(c);     // 1
   a = 0
   ```

2. 多重 ++ -- 相加（彻底搞懂 ++ 和 --）

   ```js
   let a = 0
   a++ + ++a + ++a + a++
   // a++,先返回a的值,在进行 a = a + 1 操作
   // ++a,先进行a = a + 1 操作,在返回a的值
   
   /* 
   1. 先执行 + 左边的操作(a++): 获取a的值, a为0, 所以左边的值为0, 然后执行a = a + 1 操作, 此时 a = 1
   2. 后执行 + 右边的操作(++a): 先把a的值 + 1, 此时a = 2, 然后获取a的值, 所以右边值为2, 左加右 = 0 + 2 = 2
   3. 第二个加号这里: 左边的值为2, 看右边, 右边是++a 操作, 所以先把a + 1, 再取a值, 此时a = 3, 右边值为3, 所以2 + 3 = 5
   4. 第三个加号这里: 左边的值为5, 右边为a++, 先获取a的值3, 右边的值为3，在执行a = a + 1，此时a = 3 执行左加右, 5 + 3 = 8, 
   */
   
   console.log(a++ + ++a + ++a + a++);   // 8
   ```

   ```js
   v = 0
   v++ - ++v + --v + ++v + v-- + ++v
   
   // 详解: 拿 v++ - ++v 为例
   1. 左边: 返回v的值0, 左边拿到了0准备和右边相加, 运行+号右边前先执行 v = v + 1 !!!!!!
   2. 右边: 先执行 v = v + 1, 饭后返回 v 的值 2
   3. 所以 v++ - ++v = 0 + 2 = 2
   
   // 0 - 2 + 1 + 2 + 2 + 2
   ```

### 7.标签语句

使用标签语句能帮助我们跳出多重循环

```js
myLoop: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i * j === 8) {
      continue myLoop // 当 i*j = 30 跳过外层循环一次
    }
    if (i * j > 30) {
      console.log(i * j)
      break myLoop // 当 i*j > 30 跳出整外层个循环
    }
    console.log(i * j)
  }
}
```

也可以使用函数来跳出

```js
function fn() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      console.log(i * j)
      if (i * j > 30) {
        return // return 直接跳出
      }
    }
  }
}

fn()
```





## 四，异步

### 1.微任务宏任务

我们知道，JS在设计之初采用的就是 单线程 + 事件循环+ 回调 实现的异步编程语言，但是实际上从 ES6 才真正定义了异步这个概念。你所见到的每一个定时器，DOM对象的每一个事件，都是异步实现的

![image-20210330154809674](./assets/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E6%80%BB%E7%BB%93.assets/image-20210330154809674.png)

1. 在JS中，使用两个队列（宏任务队列|微任务队列）来存储待执行的回调函数

2. 宏队列：用来保存待执行的宏任务（回调），比如：定时器回调/DOM时间回调/ajax回调

3. 微队列：用来保存待执行的微任务（回调），比如：Promise回调/MutaiionObserver回调

4. JS执行时会区别这两个队列：

   （1）JS引擎首先必须先执行所有主线程中的代码

   （2）每次准备取出一个宏任务执行前，**都要将所有的微任务一个一个个取出来执行**

   ```js
   // 考察宏队列和微队列掌握情况
   
   console.log(1)
   setTimeout(() => {
     Promise.resolve().then(
       value => {
         console.log('2')
       }
     )
     setTimeout(() => {
       console.log('3')
       process.nextTick(() => {
         console.log(4)
       })
     }, 150)
   }, 100)
   
   Promise.reject().catch(() => {console.log(5);})
   process.nextTick(() => {
     console.log(7)
   })
   
   setTimeout(() => {
     process.nextTick(() => {
       console.log(5);
     })
     console.log(8);
   })
   
   console.log(6)
   
   // // 1 6 7 5 8 5 2 3 4
   ```

### 2.异步发展流程

**一，回调函数阶段**

:key: ​最原始的异步方式是通过**回调函数**实现，但是回调函数有很多缺点，最显著的三个就是：

1. 无法捕捉回调函数中的错误，因为代码是异步的

2. 因为是异步执行的，永远拿不到异步函数的return的值

3. 回调地狱，一个回调里嵌套另外一个回调

   :computer: 具体表现的代码

   ```js
   // 1. 无法捕捉错误, setTimeOut是异步的
   try { setTimeOut(() => { throw new Error(1) }, 0) } catch(e) {...}
   
   // 2. 非阻塞io,永远无法拿到函数返回值
   let res = setTimeout(() => {return 11111}, 0)
   
   // 3. 回调地狱
   Ajax('https://xxx.xxx', 'get', function(res) {
     if(res) {
       if(res.data === 'ok') {
         Ajax('https://yyy.yyy', 'get', function(res) {
           if(res) {
             if(res.data === 'ok') {
               Ajax('https://zzz.zzz', 'get', function(res) {
                 console.log('最终数据')
               })
             }
           }
         })
       }
     }
   })
   ```

**二，事件发布订阅模式**

:key: 发布订阅是ES5阶段比较好用的一种处理异步的模式​

缺点:

1. 如果一个被观察者身上有很多观察者，那么当被观察者发生改变，执行所有所有观察者会花时间

2. 如果在观察者和观察目标之间有循环依赖，两者会循环调用，系统宕机

   :computer: 具体代码如下

   ```js
   // 事件发布订阅模式 
   // 	在JS中通过EventEmitter这个模块实现，通过他可以创建时间发射器的实例，有两个核心方法
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

**三，生成器+Promise模式**

请跳转至：[Promise+生成器详解](#Promise+生成器详解)


:key: 生成器用法

   - **生成器** 和 **while true** 和 **try...catch**  配合无限产出值

     ```js
     // 无限循环生成器
     let myIter = function* () {
       try {
         let value
     
         while (true) {
           if (value == undefined) {
             value = 1
           } else {
             yield value = (value + 3) * 2
           }
         }
       } finally {
         console.log('循环迭代已经推出');
       }
     }
     
     let it1 = myIter()
     for (let v of it1) {
       console.log(v);
       if (v > 500) {
         // 停止for...of迭代循环的方法
         // 1. 在循环语句中使用 break 或者 rerurn(函数中) 可以断开循环
         break // 第一种停止循环的方法
         return 
     
         // 2. 结束迭代器
         it.return('结束迭代器!')  // 这里的值会作为生成器函数的return值
     
       }
     }
     
     let it2 = myIter()
     console.log(it2.next());
     console.log(it2.next());
     console.log(it2.next());
     console.log(it2.next());
     console.log(it2.return('结束'))  // return的值作为生成器函数的返回值(有则不作为)
     ```

     


**四，async+await**

> 异步终极解决方案，是Promise+生成器的语法糖，JS引擎内部帮你实现run函数，自动运行带有async的函数

```js
function getDate1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

function getDate2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(2) 
    }, 1000)
  })
}

async function fn() {
  try {
    let data = await getDate1()
    console.log(data);
    if (data === 1) {
      let myData = await getDate2()
      console.log(myData);
      // throw 2
    }
  } catch (e) {
    console.log('出现错误', e);
    let data = await getDate1()
    console.log(data);
  } finally {
    return 'ok'
  }
}
```

### 3.Promise+生成器详解

我们现在所使用的async+await，其原理就是Promise+生成器模式，所以我们有必要深入了解该模式的运作方式

:key: 生成器基本概念

1. 什么是生成器？

   > 生成器是一种特殊的迭代器

   特殊作用是能暂停和恢复函数的执行

2. 生成器是怎么执行的？

   > 生成器的执行流程

   :one: 生成器函数是一种用获取生成器的特殊函数，定义时需要在函数前加 *****，比如 **function *fn() {}**

   :two: ​首次调用生成器函数，得到一个初始化的生成器对象（属于特殊的迭代器），该对象提供 **.next()** 接口供调用

   :three: ​首次调用 **next()**，执行函数到 **yeild** 关键字，返回 **yeild** 后的值，交出函数执行执行权（也就是暂停函数）

   :four: ​后续调用 **next**（可传参），恢复函数执行权，此时朝 **next** 中传入参数的，会在 **yeild** 左侧产出

   :five: ​若执行到函数 **return** 处，返回 **{ value: undefined(默认return的值) || 手动返回的return值, done: true }** ，代表生成器结束。此时后续调 **next** 用一律返回 **{value: undefined,d: true}**

   ```js
   // 生成器执行流程
   
   function *fn() {
     console.log('第一次next(), 我被执行')
     let value = yield '第一次next(), 我是被返回的值'
     console.log('第二次next传值了，value为' + value)
     console.log('第三次next没有传值，value为：' + (yield '第二次next(), 我是被返回的值'))
     return 666
   }
   
   let gen = fn()		// 获取生成器
   console.log(gen.next())	
   console.log(gen.next('第二次next可以传入值'));
   console.log(gen.next());
   
   // 生成器是特殊迭代器，实现了iterator接口，for他！
   for(let value of fn()) {
     console.log(value)		
     // for...of循环break的标志是 { value:.., done:true }, done=true这个
   }
   ```

3. 生成器的API？

   生成器一共有三个API，分别是 `.next()` `.throw()` `.return()`

   :one: next的作用是执行生成器，运行到 yield 暂停函数，或者运行到 return 出结束生成器运行.

   :two: throw往生成器中抛入一个错误，若生成器内部未捕捉，则错误向上冒泡，之后执行和next相同的操作.

   :three: return立刻结束生成器的运行，并把传入的值作为生成器函数返回值.

   ```js
   function* fn() {
     try {
       yield 1
     } catch(e) {
       console.log(e);		// error
       yield 2
     }
     yield 3
   }
   
   let it = fn()
   console.log(it.next());	// { value: 1, done: false }
   console.log(it.throw('error'));	// { value: 2, done: false }
   console.log(it.return('yield 3 永远不会执行'));	// { value: 'yield 3 永远不会执行', done: true }
   ```

:key: 生成器和异步的爱恨情仇​

1. 生成器是如何实现同步编写异步代码呢？

   :ocean: ​生成器是一种能够暂停的函数，并且这个暂停和恢复是我们能够控制的，这就使得同步编写异步代码能够称为可能

   先来看看下面这个例子：

   ```js
   // 1. 首先有一个异步的Ajax请求
   function getData() {
     setTimeout((err, data) => {
       if(err) {
         it.throw(err)		// 请求失败, 恢复生成器执行并抛入错误
       } else {
         it.next('我是请求到的数据')		// 请求成功，恢复生成器执行并传入数据
       }
     }, 1000)
   }
   
   // 2. 在生成器中编写同步代码
   function *fn() {
     try {
       let data = yield getData()
       console.log('数据: ', data)
     } catch(e) {
       console.log('数据请求发生错误')
     }
   }
   
   // 3. 运行代码
   let it = fn()
   it.next()
   ```

   bingo！我们在生成器中实现了同步的代码编写，这个是生成器最大的作用~

2. 生成器 + Promise未何称为最理想的异步控制管理？

   :ocean: Promise具有可信任性，是管理异步任务最好的解决方案，我们完全可以把异步任务交给Promise，然后在生成器中编写同步代码

   ```js
   function getData() {
     return new Promise((resolve, reject) => {
       let value = Math.floor(Math.random() * 10)
       setTimeout(() => {
         // 请求数据
         if (value < 5) {
           resolve('请求数据成功')
         } else {
           reject('请求数据失败')
         }
       }, 1500)
     })
   }
   
   function* myIter() {
     try {
       let data = yield getData()
       console.log(data);
     } catch (e) {
       console.log('请求失败，有错误', e);
     }
   }
   
   let it = myIter()
   it.next().value.then(		// 根据异步任务的Promise状态来对生成器进行决策
     value => {
       // promise执行成功
       it.next(value)    // 激活生成器，并传入请求的值
     }, 
     reason => {
       // promise执行失败
       it.throw(reason)  // 在生成器中抛入错误，请求失败
     }
   )
   ```

3. 生成器中有多个yield

   :ocean: 这时我们希望有个工具能够循环执行生成器，并最后返回一个Promise来决策生成器是否运行完成

   - 一些第三方库如co

     ```js
     function *fn() {
     	yield 1
     	yield 2
     	yield 3
     	...
     }
       
       co(fn)
     ```

   - 我们可以实现一个简陋版的运行工具（暂且称作 run ）

     ```js
     /**
      * 
      * @param {生成器} gen 
      * @param {传入生成器的参数} args
      */
     export default function run(gen, ...args) {
       // 在当前上下文中初始化生成器    
       let it = gen.apply(this, args)
     
       // 返回的Promise用来告知生成器运行结束
       return new Promise(resolve => {
         ~(function handleNext(value) {
           // 得到一个yield出的值
           let next = it.next(value);
     
           // handleValue：处理yield出的值，如果是Promise则进行next或者throw操作
           ~(function handleValue(next) {
             // 如果生成器已经运行结束，把生成器return的值resolve出去
             if (next.done) resolve(next.value)
     
             // 根据yield传出的值或Promise进行决策
             Promise.resolve(next.value).then(
               // 如果yield出来的Promise是成功的，通过递归循环继续运行生成器
               handleNext,
     
               // 如果yiled出来的Promise是失败的，往生成器里抛入错误
               // 再对生成器yield出的值做决策（throw会恢复生成器执行）
               // 这里我们只处理yield出来的值和resolved的Promise进行处理
               err => {
                 Promise.resolve(it.throw(err)).then(handleValue)
               }
             )
     
           })(next)
         })()
       })
     }
     ```

     下面是《你不知道的JS》作者写的，代码可读性更高

     ```js
     function run(gen) {
       var args = [].slice.call(arguments, 1),
         it;
     
       // 在当前上下文中初始化生成器    
       it = gen.apply(this, args);
     
       // 返回一个promise用于生成器完成    
       return Promise.resolve()
         .then(function handleNext(value) {
           // 对下一个yield出的值运行            
           var next = it.next(value);
     
           return (function handleResult(next) {
             // 生成器运行完毕了吗？                
             if (next.done) {
               return next.value;
             }
     
             // 否则继续运行                
             else {
               return Promise.resolve(next.value).then(
                 // 成功就恢复异步循环，把决议的值发回生成器                            
                 handleNext,
     
                 // 如果value是被拒绝的 promise，                            
                 // 就把错误传回生成器进行出错处理                            
                 function handleErr(err) {
                   return Promise.resolve(it.throw(err)).then(handleResult);
                 });
             }
           })(next);
         });
     }
     ```

4. 总结：

   :star: 为什么生成器加Promise是最好的异步的处理方法：

   1. 首先在JS中，异步是特别常见的一个特性，之前也总结过传统异步解决方案的缺点，都有各种恶样的问题，不尽人意。但在ES6里Promise的出现让异步处理变得更加优雅，Promise的可信任性让其成为处理异步任务的不二之选
   2. 其次编写异步的代码确实很麻烦，需要我们按照反人类的思想来写，特别难维护，这时候生成器就出现了，生成器的一大特点就是能够暂停函数的执行，也能恢复函数的执行，这让使用同步方式编写异步代码的方法称为了可能
   3. 最后，把生成器和Promise进行组合使用，根据yeild出来的Promise的状态来重新恢复生成器的执行，或者往生成器里面抛出错误，就像我们像编写同步代码那样，实现了同步的思维编写代码
   4. Promise：控制异步代码，生成器：同步的流程控制代码，最后实现了以同步的方式实现了异步代码运行
   5. **await + async** 就是 **生成器 + Promise** 的语法糖

### 4.生成器Promise并发

思考下面的场景：

如何在一个生成器中以最快的速度进行多个数据请求，且他们之间不彼此依赖、

方案:one: :

> 把基于异步的数据请求全部交给Promise处理

```js
function* fn() {
  let p1 = getData(),
    p2 = getData()

  let data1 = yield p1, data2 = yield p2
  let data3 = yield getData(data1, data2)

  console.log(data3);
}
```

方案:two: ：

> 基于Promise. All([...]) 实现并发

```js
function* fn() {
  let result = Promise.all([
    getData(1), getData(2)
  ])

  let data1 = yield result[0], data2 = yield result[1]
  let data3 = yield getData(data1, data2)

  console.log(data3);
}
```

:star: ​方案:three:

> 既然我们选择了生成器作为异步流程解决方案，就应该尽可能把异步的Promise逻辑隐藏起来，把Promise的代码从生成器中抽象出来，实现更高的同步代码可读性！！

```js
function request(url) {
  ajax(url, ...)
}

// 把Promise抽离出去
function bar() {
  Promise.all([
    baz(..).then(..), Promise.race([..])
  ]).then(..)
}

// 把Promise抽离出去
function bar(url1, url2) {
  return Promise.all([request(url1), request(url2)]);
}

function* fn() {
  // 隐藏bar(..)内部基于Promise的并发细节
  let results = yield bar("http://xxx", "http://xxx");
  let r1 = results[0];
  let r2 = results[1];
  let r3 = yield request("http://xxx" + r1 + "," + r2);
  console.log(r3);
}
```

### 5.生成器委托

有时候需要在一个生成器中调用另外一个生成器，这时候有两种方案：

方案:one: ：在yield处使用run(gen)

```js
function *fn1() {
  yield 1
  console.log(1);
  yield 2
  console.log(2);
  yield run(fn2)
  yield 5
  console.log(5);
}

function *fn2() {
  yield 3
  console.log(3);
  yield 4
  console.log(4);
}

run(fn1)
```

方案:two: ：​使用生成器委托，生成器委托语法为 ：`yield *生成器函数名`

```js
function *fn1() {
  yield 1
  console.log(1);
  yield 2
  console.log(2);
  yield *fn2()			// 运行fn2，在async中直接 await fn2() 即可
  yield 5
  console.log(5);
}

function *fn2() {
  yield 3
  console.log(3);
  yield 4
  console.log(4);
}

run(fn1)
```

