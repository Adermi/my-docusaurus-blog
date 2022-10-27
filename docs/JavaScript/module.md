---
id: module
title: JS的模块化
---

### 1.模块模式

> 在没有模块规范出现之前，使用闭包创建命名空间是常用的手段

使用闭包创建命名空间（模块模式）：

```js
var MyNameSpace = (function (global) {
  const name = 'xyb',
    age = 20,
    hobby = ['吃', '睡', 'coding'];
  const getHobby = () => {
    return hobby;
  };

  return {
    name,
    age,
    getHobby,
  };
})(window);

console.log(MyNameSpace); // Object { name: "xyb", age: 20, getHobby: getHobby() }
console.log(MyNameSpace.name); // xyb
console.log(MyNameSpace.age); // 20
console.log(MyNameSpace.getHobby()); // ['吃', '睡', 'coding']

// 扩展模块
var MyNameSpace = (function (MyNameSpaceModule) {
  MyNameSpaceModule.setName = (name) => {
    if (MyNameSpaceModule.name) {
      MyNameSpaceModule.nname = name;
    }
  };

  return MyNameSpaceModule;
})(MyNameSpace || {}); // 模块不存在情况
```

这样创建的优点：

1. 利用自执行函数开辟了单独的一块作用域，并返回一个对象，形成了不销毁的私有作用
   域，也就是闭包
2. 每个作用域中的变量互不冲突，通过暴露的 MyNameSpace 访问私有作用域
3. 全局作用域通过函数传参方式与命名空间交互

但是**实际开发不推荐使用**，因为不可靠，但是自己小打小闹玩着写写确实挺有意思的

### 2.CommonJs

> 1. CommonJS 规范概述了同步声明依赖的模块定义，但是主要用于在服务器端实现模块化
>    （NodeJs），不能再浏览器中直接运行
>
> 2. 在 Node 中，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量
>    、函数、类，都是私有的，对其他文件不可见。

#### -模块导入

```js
// 1. require：读取并执行一个js文件，返回该模块的exports对象
const moduelA = require('./moduelA.js');
console.log(moduelA.name);
console.log(moduelA.age);
```

#### -模块导出

```js
// 1. module.exports：模块被导出的对象
const name = 'xyb';
const age = 20;
module.exports.name = name;
module.exports.age = age;

// 使用对象字面量一次性添加
const name = 'xyb';
const age = 20;
const getName = () => {
  if (name) {
    console.log(name);
  }
};
module.exports = {
  age,
  getName,
};
```

### 3.Es6 模块加载

> Es6 模块的独特之处在于：既可以通过浏览器原生加载，也可以与第三方加载器和构建工
> 具一起加载，很多时候使用第三方工具会更方便

#### -模块导出

Es6 模块通过 `export` 关键字进行导出

```js
// 导出方式一（函数，类，所有数据类型都适用）
let name = 'xyb';
let age = 20;
let sex = 'M';
const getStatus = () => {
  return 'ok';
};

export { name, age, sex };

export {
  name,
  age,
  sex as gender, // 导出重命名
};

// 导出方式二（单个导出，效果和上面一样）
export let name = 'xyb';
export let age = 20;
export let sex = 'M';
export const getStatus = () => {
  return 'ok';
};
```

#### -默认导出

> 默认导出使用 default 关键字将一个值声明为默认导出，每个模块只能有一个默认导出

```js
// 默认导出一
const name = 'xyb'
export default name

// 默认导出二
const name = 'xyb'
export { name as default }

// 默认导出三（默认导出和命名导出不冲突）
const name = 'xyb'
const age = 20
export { name as default, age }
```

#### -模块导入

```js
// 导入方法一，（把a, b, c, num导入，不包括default默认导出,若想导出用*）
import { a as one, b, c, num as numFn } from './aaa.js';

// 导入方法二，导入default并重命名，myFunction是自己命名的
import myFunction from './aaa.js';
import { default as myFunction } from './aaa.js';

// 导入方法三，把模块导出的所有东西都导入并重命名，包括default默认导出
import * as aExample from './aaa.js';
```

#### -浏览器导入

在浏览器中导入模块的时候，`<script>` 标签必须是这样写，才能使用 **import** 导入
模块

```html
<script src="JS/aaa.js" type="moduel">
  		<!-- type类型是moduel -->
  import {name, age} from './moduelA.js'
  conso.log(name, age)
</script>
```

请注意，`<script type="module">` 和常规的 `<script>` 标签不同，当浏览器解析到

`<script type="module"> 标签后会立即下载模块文件，但执行会延迟到文档解析完成，在<script>`之
后执行

```html
<script type="module">
  console.log(2);
</script>

<script type="module">
  console.log(3);
</script>

<script>
  console.log(1);
</script>

// 输出 1，2，3
```
