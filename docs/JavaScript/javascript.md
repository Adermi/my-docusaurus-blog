---
id: javascript
title: JavaScript学习
---

# 一，JS数据类型

## 基本数据类型

### -1. 数字 number

#### 两大分类数字/NaN

1. #### 常规数字

   ------

   ##### 描述

   包括二进制，，八进制，十进制(整数/小数)，十六进制，无穷大/无穷小数

   JS不像其他后台语言那样分出 *int* 整数和 *float* 小数，**所有的数统称为 *Number***

   ##### 示例

   ```js
       // 1. 十进制，生活中最常见的数
   var num = 10;
   var PI = 3.88556;
   	// 2. 十六进制, 0~9 a~f 	#ffffff	数字的前面加上0x代表十六进制
   var num1 = 0x8;
   var num2 = 0xa5;
   	// 3. 八进制， 0~7 					数字前加0 表示8进制
   var num3 = 010;
   var num4 = 06;
   	// 4. 无穷大和无穷小的数
   console.log(Number.MAX_VALUE*2)			// Infinity
   console.log(-Number.MAX_VALUE*2)		// -Infinity
   ```

2. #### NaN

   ------

   **not a number**，不是一个数，但是类型属于数字类型

   ##### 描述

   *NaN* 是一个全局对象的属性，代表非数字。

   ##### 判断NaN

   - *NaN* **和任何值都不相同**，包括本身，不能用（`==` 和 `===）` 不能被用来判断一个值是否是 *NaN*

   - 非数字可以代表任何东西，所以不能的等于自己

   - 必须使用 `Number.isNaN()` 或 `isNaN()` 函数判断一个值是不是非数字
     - [x] isNaN 在进行检测的时候，或先检测值**是否是**数字类型，如果不是，再基于Number()把**字符串转换成数字**再进行检测，如果是数字，返回 false

   ```js
   NaN === NaN;         // false
   Number.NaN === NaN;  // false
   NaN !== NaN 		// true
   
   isNaN(NaN);          // true
   isNaN(Number.NaN);   // true
   isNaN('10')			// false
   
   isNaN('10')		    // false
   /*
   	1. '10' 不是数字，进行Number转换成数字
   	2.  10 是数字，返回 false
   */
   
   isNaN('aaa')		 // true
   /*
   	1. 'aaa' 不是数字，进行Number转换成数字，转换的结果是 NaN
   	2.  NaN ，返回 true
   */
   ```



#### *转换成数字

其他类型转换成数字类型，有以下4中方式

##### 1，Number

------

1. ##### 字符串 -> 数字

   ```js
   console.log(Number('123'));     // 123
   console.log(Number('123aaa'));  // NaN
   console.log(Number(''));        // 0
   console.log(Number(``));        // 0
   console.log(Number(""));        // 0
   ```

   - 只要字符串中包含**任意一个**非有效数字，返回NaN
   - **空字符串**会转换成 0

2. ##### 布尔值 -> 数字

   ```js
   console.log(Number(true));      // 1
   console.log(Number(false));     // 0
   console.log(isNaN(false));      // false
   ```

3. ##### null 和 undefined -> 数字

   ```js
   console.log(Number(null));          // 0
   console.log(Number(undefined));     // NaN, undefined代表没有赋值，里面没有任何东西，为NaN
   ```

4. ##### 引用数据类型（对象） -> 数字

   ```js
   // 1. 对象 -> 数字
   console.log(Number({ a: 20 }));   // NaN
   console.log(Number({}));          // NaN
   // {a: 20}/{}.toString --> "[object Object]"
   // "[object Object]" --> NaN
   
   // 2. 数组 -> 数字
   console.log(Number([]));          // 0
   console.log(Number([10]));        // 10
   console.log(Number([10, 11]));    // NaN
   // [] -> 都是 ''				Number('') -> 0
   // [10] -> 都是 '10'			Number('10') -> 10
   // [10, 11] -> 都是 '10, 11'	 Number('10, 11') -> NaN
   
   console.log(Number(/\d+/));       // NaN
   ```

   - **引用数据类型**需要先基于 `.valueOf()` 或  `.toString()` 方法取得原始值，JavaScript在把他转换成数字
     
     - [x] 复杂数据类型转换成数字：
       
       1. 先对其进行 `.valueOf()` 方法，返回的不是原始值，不使用该方法
       
       2. 在对其进行  `.toString()` 方法，返回的是原始值，JS把他转字符串字符串形式  
       
          `{} => [object Object]， [ ] => ' '`
       
       3. JS再对其基于 **字符串 --> 数字** 的转换过程把他转换成数字返回
       
          `'[object Object]' => NaN, ' ' => 0`

##### 2，ParseInt

------

- 对所有数据类型来说【取整数】
  1. 对值进行 `.toString()` 方法，把值转换成字符串	
  2. 对字符串进行从左到右的查找
     1. 碰到**第一个非数字**的字符就停止查找，返回查找到的数字
     2. 若**没有数字**找到，返回NaN
  
  ```js
  console.log(parseInt('123px'));  // 123
  console.log(parseInt('45px666')); // 45
  console.log(parseInt('height123')); // NaN
  ```

##### 3，ParseFloat

------

- 对所有数据类型来说【取浮点数】
  1. 对值进行 `.toString()` 方法，把值转换成字符串	
  2. 对字符串进行从左到右的查找
     1. 碰到**第一个非数字**的字符就停止查找，返回查找到的数字
     2. 若**没有数字**找到，返回NaN
  
  ```js
  console.log(parseFloat('123.666px'));     // 123.666
  console.log(parseFloat('45.555px666'));   // 45.555
  console.log(parseFloat('height123.321')); // NaN
  ```

###### 三者的区别

- **Number([value])** 走的是浏览器底层V8引擎的渲染规则，会进行很多层的转换
  1. 如果 *value* **是**字符串     ==>	若字符串里**有非数字的值**，返回 **NaN**，否则返回数值
  2. 如果 *value***不是**字符串  ==>    先进行 `valueOf()` 或 `toString()` 方法转换成原始值字符串，再执行上一步 
- **ParseFloat([value])/ParseInt([value])** 不是底层的浏览器方法，他走的是自己的转换方法
  1. 如果 *value* **是**字符串     ==>	
     1. 从字符串的左边开始**查找有效数字**，遇到数字进行标记，遇到非数字停止查找，返回标记的数字
     2. 若第一个字符就是非数字，返回 **NaN**
  2. 如果 *value***不是**字符串  ==>    先进行 `toString()` 方法转换成字符串，再执行上一步 

##### 4，隐式转换数字

遇到  `- * /` 这三个运算符，所有非数字的值，都会进行 Number() 转换成数字进行运算

```js
console.log(10 - {});   // 10 - Number({})  ==>  10 - '[object Objece]' = NaN
console.log(10 * [10]); // 10 * Number([10]])  ==>  10 * '10' => 10 * 10 = 100
console.log(10 * [10, 20]); // 10 * NaN -> NaN
console.log(10 * '20');     // 200
```

### -2. 字符串 string

所有  单引号` '' `  双引号` "" `  ES6字符串` `` `  包裹起来都是字符串

#### *转换成字符串

其他类型转换哼字符串类型有两种方式

##### 1，toString

------

- 把基本类型转换成字符串

  ```js
  let s = 20;
  console.log(s.toString());      	// '20'
  console.log(NaN.toString());    	// 'NaN'
  console.log(true.toString());   	// 'true'
  console.log(null.toString());   	// 报错，结果是 'null',但是浏览器不允许调用null的基本包装
  console.log(undefined.toString());	// 报错，结果是 'undefined'，同上
  ```

- 引用数据类型转换成字符串

  ```js
  console.log([].toString());			// ''
  console.log([1].toString());		// '1'
  console.log([1, 2].toString());		// '1, 2'
  
  console.log({}.toString());     //[object Object]
  console.log({ name: 'xyb', age: 20 }.toString()); //[object Object]
  ```

  - **数组**转换成**字符串**去掉两边的 []，把里面的值放到一个空字符串中
  - **对象**转换成**字符串**，返回其数据类型，其原因是因为对象的原型链中该方法是用来检测数据类型的

##### 2，字符串拼接

------

使用 `+` 进行字符串拼接，分3中情况

1. 表达式里**有字符串**，运算变成字符串相加，**除字符串以外**的值都需要进行 `.toString()` 成字符串

   ```js
   console.log('10' + 10);         // 10 + String(10) => '10' + '10' = '1010'
   console.log('10' + {});         // 10[object Object]
   console.log('10' + [10]);       // 10 + String([10]) => '10' + '10' = '1010'
   console.log('10' + [10, 20]);   // 1010,20
   console.log('10' + true);       // 10true
   console.log('10' + null);       // 100
   console.log('10' + undefined);  // undefined
   
   console.log('10' + true);      // 10 + String(true) => '10' + 'true' = '10true'
   console.log('10' + null);      // 10 + String(null) => '10' + 'null' = '10null'
   console.log('10' + undefined); // 10 + String(undefined) => '10undefined'
   ```

2. 表达式里**无字符串**，运算变成数值相加，**除数值外**的值都需要进行 `Number()` 成数字 

   ```js
   console.log(10 + true);             // 10 + Number(true) => 10 + 1 = 11
   console.log(10 + null);             // 10 + Number(null) => 10 + 0 = 10
   console.log(10 + undefined);        // 10 + Number(undefined) => 10 + NaN = NaN
   ```

3. 表达式里**无字符串**，表达式里有 **数值** 和  引用**类型** 相加

   ```js
   console.log(10 + {});   // 10 + Number({}) => 10 + '[object Object]'
   console.log(10 + [10]); // 10 + Number([10]) => 10 + '10' = '1010'
   ```

##### 面试题

```js
let a = 10 + null + true + [] + undefined + 'xyb' + null + [] + 10 + false

// 考点：数值 + 引用数据类型 = 字符串
/*
1.	10 + Number(null) => 10 + 0 = 10
2.	10 + Number(true) => 10 + 1 = 11
3.	11 + Number([])   => 11 + [].toString() => 11 + '' => '11'
4.	'11' + String(undefined) => '11undefined'
5.	'11undefined' + 'xyb' => '11undefinedxyb'
...
*/

// 最终结果是： 11undefinedxybnull10false




// 自己出题
let b = null - 10 - false + 20 + null + undefined + true + 1
// NaN
let c = 20 * null / false + 16 * true * true + null + 45 - [] + undefined
// 0 / false = NaN
```

### `toString和 valueOf`

> 任何数据类型的相互转换都遵循这两个方法，`.toString()` 和 `.valueOf()`

任何的基本数据类型之间的转换，都是把其转换成包装类型，在调用 *toString* 和 *valueOf*

1. 基本数据类型（包装类型）

   基本数据类型 --> 字符串，也就是 原始值 --> 字符串

   ```js
   // 1. 把 20 转换成字符串的 '20'
   let a = 20;
   String(a)	// '20'
   
   // 2. 把 true 这个bool值转换成 'true'
   String(true)	// 'true'
   
   // 3. null/undefined  转换成 'null' / 'undefined'
   String(null)	// 'null'
   String(undefined)	// 'undefined'
   ```

   ①：数字转换成字符串：

   1. 使用 `String()` 把数字字面量转换成字符串字面量，会直接调用该值的 `.toString()` 方法，但是 a 没有
   2. 这时JS内部帮我们把 a 包装成 `new Number(20)` 对象并且调用了该对象的 **toString()** 方法
   3. 数字对象的 **toString()**，方法返回一个原始值(也就是基本数据类型20)，JS把他转换成字符串 '20' 返回

   ②：布尔值转换成字符串

   1. 使用 `String()` ，会直接调用 true 的 `.toString()` 方法，但是 true 没有这个方法
   2. JS内部帮我们把 true 包装成 `new Boolean(true)` 对象并且调用了该对象的 **toString()** 方法
   3. 布尔对象的 **toString()** 方法返回一个原始值(也就是原始值true)，JS把他转换成字符串 'true' 返回

   ③： null/undefined  转换成字符串

   JS不允许我们访问这两个对象，它这两种数据类型做了保护措施，我们直接使用会报错，但是需要牢记内部的执行操作是差不多的，都是调用了 `toString()` 方法，并由  JS  来进行对**原始值的转换**

   

   基本数据类型 --> 数字，也就是 原始值 --> 数字

   ```js
   // 1. 把 '20' 转换成数字 20
   let a = '20';
   Number(a)	// '20'
   
   // 2. 把 true 这个bool值转换成 1
   Number(true)	// 'true'
   
   // 3. null/undefined  转换成 'null' / 'undefined'
   Number(null)	// '0'
   Number(undefined)	// 'undefined'
   ```

   ①：字符串转换成数字：

   1. 使用 `Number()` 把字符串字面量转换成数字字面量，会先调用该值的 `.valueOf()` 方法，但a没有这个方法
   2. 这时 JS 内部帮我们把 a 包装成 `new String(20)` 对象并且先调用了该对象的 **valueOf()** 方法
   3. 此时  **valueOf()**  返回原始数据类型字符串 '20' ，JS内部会帮我们转换'20' 为 20

   ②：布尔值转换成数字：

   1. 使用 `Number()` ，会先调用 true 的 `.valueOf()` 方法，但是 true 没有这个方法
   2. JS内部帮我们把 true 包装成 `new Boolean(true)` 对象并且调用了该对象的 **valueOf()** 方法
   3. 布尔对象的  **valueOf()**   方法返回一个原始值(也就是原始值true)，JS把他转换成数字 1 返回

   ③：null/undefined  转换成 0 / NaN

   JS不允许我们访问这两个对象，它这两种数据类型做了保护措施，我们直接使用会报错，但是需要牢记内部的执行操作是差不多的，都是调用了 `valueOf()` 方法，并由 JS 来进行对**原始值的转换**

2. 引用类型（对象，函数）

   任何的引用类型转换成基本类型，都是在调用 *toString* 和 *valueOf*

   

   JavaScript 中**对象到字符串**的转换经历了如下的过程：

   - 如果一个对象有 `.toString()` 这个方法，调用该方法。如果返回值是一个原始值（基本数据类型），JavaScript就会把这个值转换成 字符串（本身不是字符串前提下），并返回（原始值->字符串看上面）

   - 如果对象没有 `.toString()` 这个方法，或者没有返回原始值（基本数据类型），JavaScript就会调用 **.valueOf()** 方法，如果返回是原始值，JavaScript就会把这个值转换成 字符串（本身不是字符串前提下），并返回（原始值->字符串 看上面）

   - ##### 例子

     ```js
     // [] -> 字符串
     // 直接调用数组的 .toString() 方法	==> [].toString() = ''
     console.log([])		// ''
     console.log([10])	// '10'
     
     // {} -> 字符串
     // 直接调用对象的 .toString() 方法	==> {}}.toString() = ''
     let o = {};
     o.toString();	// "[object Object]"  对象的toString() 返回的时一个表示其类型的字符串
     ```

     

   JavaScript 中**对象到数字**的转换经历了如下的过程：

   - 如果一个对象有 `.valueOf()` 这个方法，调用该方法。如果返回值是一个原始值（基本数据类型），JavaScript就会把这个值转换成 数字，并返回（原始值->字符串看上面）

   - 如果对象没有 `.valueOf()` 这个方法，或者没有返回原始值（基本数据类型），JavaScript就会调用 **.toString()** 方法，如果返回是原始值，JavaScript就会把这个值转换成 数字，并返回（原始值->字符串 看上面）

   - ##### 例子

     ```js
     // [] -> 数字
     // 1. 先调用数组的 .valueOf() 方法	==> [].valueOf() = Array []    但返回的并不是原始值
     // 2. 所以执行第二步调用数组的 .toString() 方法 ==> [].toString() = ''
     console.log([])		// ''
     console.log([10])	// '10'
     
     // {} -> 字符串
     // 1. 先调用对象的 .valueOf() 方法	==> {}.valueOf() = Object {  }  但返回的并不是原始值
     // 2. 所以执行第二步调用对象的 .toString() 方法 ==> {}.toString() = "[object Object]"
     let o = {};
     o.toString();	// "[object Object]"  对象的toString() 返回的时一个表示其类型的字符串
     ```

重写valueOf和toString

- 对象 -> 数字，首先调用 valueOf 方法，由于大部分对象调用该方法只是返回本身，所以会调用 toString

```js
obj = {
    valueOf() {
        console.log('我是valueOf，我被调用了')
        return {}
    },
    toString() {
        console.log('我是toString，我被调用了')
        return 10
    }
}

console.log(Number(obj));
```

![1577946637941](/assets/JSBase.assets/1577946637941.png)

- 若把 valueOf 重写，并返回一个原始值，那只会调用到 valueOf 为止

  ```js
  obj = {
      valueOf() {
          console.log('我是valueOf，我被调用了')
          return 20
      },
      toString() {
          console.log('我是toString，我被调用了')
          return 10
      }
  }
  
  console.log(Number(obj));
  ```

  ![1577946819833](/assets/JSBase.assets/1577946819833.png)

### -3. 布尔 boolean

> 布尔值只有 两个值 `true` 和 `false`

- 只有 **0，NaN，' '，null，undefined**，**false** 六个值会转换成False，其余的都转换成 True，`没有任何特殊情况`

#### *转换成布尔类型

其他类型转换哼布尔类型有三种方式：

##### 1，Boolean

```js
console.log(Boolean(10));           // true
console.log(Boolean('10'));         // true
console.log(Boolean(true));         // true
console.log(Boolean(false));        // false
console.log(Boolean(null));         // false
console.log(Boolean(NaN));          // false
console.log(Boolean(''));           // false
console.log(Boolean(undefined));    // false
console.log(Boolean(0));            // false
```

##### 2，!/!!

```js
// ！单感叹号，先把后面的（值/表达式值返回值）转换成 Boolean 值，再对其取反
console.log(!2 + '');   // 'false'
console.log(!'');       // true
console.log(![]);       // false
console.log(!null);     // true
console.log(!NaN);      // true

// ！！双感叹号的功能等同于 boolean，可以理解成语法糖的写法
console.log(!![]);          // true
console.log(!!{});          // true
console.log(!!'');          // false
console.log(!!null);        // false
console.log(!!undefined);   // false
console.log(!!NaN);         // false
console.log(!!0);           // false
console.log(!!false);       // false
```

##### 3，条件判断

```js
// if 条件后面的 () 会对里面最终产出的值进行 Boolean 的转换，为true就执行语句
if (10 + '10px') {}		// ('1010px') ==> true

if (10 - '10px') {}		// (NaN) ==> false

if (!(10 - '10px')) {}	// (!(NaN)) ==> (true) ==> true

if (NaN) {}				// (NaN)  ==> false

if (!NaN) {}			// (!(NaN)) ==> (true) ==> true
```

### -4. 空对象指针 null

代表没有，无，**意料之中**的没有 ==> (开始不知道值，手动设置 null，后期再进行赋值操作，**表示"没有对象"**)

```js
let a = null;
// 我们开始不知道给null赋什么值，所以先给它一个空值，等想赋值的时候再给他

let a = 0;
// 有些代码可能会按照这种方式给不确定的值进行赋值，但记住，0是在栈内存中有自己的储存空间的，而null是完完全全的不暂居空间，一般赋空值用null
```

- null 的主要用途就是 在**赋值不确定**的情况下，用一个**null代替**赋值，后面用在时候再重新赋值
- 初始赋值用null，不占据占内存空间，虽然只有一点点点
- 凡是指向 null 的变量都是不知想任何地址的，null 是一个空对象指针

### -5. 未定义undefined

也代表没有，无，**意料之外**的没有 ==> (**表示"缺少值"，就是此处应该有一个值，但是还没有定义**)

```js
let a;  						// 1. 创建一个变量没有赋值，默认值为undefined
function fn() {}; fn()		 	 // 2. 函数默认 return 返回值为 undefined
function fn(x) {consoloe.log(x)}; fn()	 // 2. 调用函数时没有传递实参给形参，形参为undefined
let obj = {}; obj.name			 // 3. 访问不存在的属性名，返回为undefined
let arr = [, 20, , 'a'];		// 4. 数组中没有给对应的索引号传值，0和1的位置为 undefined
```



- 小明时男的，小明的女朋友，为**null**，这是意料之中的，突然有一天小明说他有男朋友了，这是意料之外的，为**undefined**

## 引用数据类型

### -1. 对象数据类型 object

> {} 普通对象，[]数组对象，/^&/ 正则对象，Math数学函数对象，日期对象

#### 对象Object

`{[key]:[value], ...}`任何对象都是由于**零到多组键值对**（属性名：属性值）组成的（并且属性命不能重复）

- 创建一个基本的对象

  ```js
  let obj = {
      1: 'id',
      name: '张三',
      age: 60,
      height: '136CM',
      weight: '80KG'
  }
  ```

  ①：对象里的属性名都是 `字符串` 和 `数字`

- 对象的增删改查

  ```js
  // 增
  obj.sex = 'M';
  obj['hobby'] = ['唱', '跳', 'rap']
  
  // 改
  obj.sex = 'F';
  obj['hobby'] = ['篮球']
  
  // 删	=>	真删除 / 假删除
  delete obj.name	// 真
  obj.name = null	// 假，null用来表示没有对象，不存在值
  
  // 查
  // 1. 对象.属性
  console.log(obj.name);		// '张三'
  console.log(obj.weight);	// '80KG'
  
  // 2. 对象["属性名"/数字]
  console.log(obj[1]);		// 'id'
  console.log(obj['height']);	// '136CM'
  ```

- ES5新增的方法：

  ##### defineProperty

  ------

  创建或配置对象的一个属性

  ##### 使用

  ​	*object.defineProperty(obj, propertyName, description)*

  ##### 返回值

  ​	返回对象 obj

  ##### 案例

  ```js
  var obj = {};
  
  // 以前添加属性
  obj.name = 'xyb';
  obj.age = 20;
  
  // 现在使用defineProperty()，来增加一个属性 'money'
  Object.defineProperty(obj, 'money', {
      value: '3000元',
      writable: false, // 属性是否可以被重写，默认false
      enumerable: false, // 属性是否能被遍历，默认false
      configurable: false // 属性是否可以被删除或者再次修改特性(description)，默认为false
  })
  
  obj.money = '1000元'; // 不能修改，因为writable的存在
  delete obj.money	  // 不能修改，因为configurable的存在
  for(let v of obje){console.log(v)}	// money的值不能遍历或者枚举出，因为enumerable的存在
  console.log(obj);
  ```
- ##### keys/values

  ------

  获取对象自身的所有属性名/属性值

  ##### 使用

  ​	*object.keys()*	/	*object.values()*

  ##### 返回值

  ​	返回一个数组

  ##### 案例

  ```js
  var obj = {
      name: 'xyb',
      age: 20
  };
  
  console.log(Object.keys(obj));
  console.log(Object.values(obj));
  ```


#### 数组Array

数组是`特殊的对象数据类型`：

1. `[]` 里面写的是`属性值`， 0~n 为 `属性名`，是数字，我们把他称为**索引(属性值)**

2. 每个数组默认有一个属性名，叫做 **length**，用来存储数组的长度

3. typeof 数组，结果是 **Object**

   ```js
   let arr = ['xyb', 20, '162'];
   console.log(arr.length)		// 3
   console.log(typeof arr)		// Object
   arr[arr.length - 1] = 60	// 向数组末尾追加60这个值
   ```

### -2. 函数数据类型 function

函数就是一个方法或者一个功能体，函数就是把实现某个功能的代码放到一起，进行封装，以后想要操作或者实现这个功能，主需要调用我们封装的函数（减少页面中重复的代码，提高代码的使用率，低耦合高内聚）

**耦合**：比如有队夫妻，妻子非常的依赖丈夫，没有丈夫就活不下去，这就是高耦合的表现。如果一个函数只能在某些很极端的条件下，或者搬到另外一个地方用就用不了，通用性和移植性比较差就是高耦合

比如我们把`函数`比喻成一个`微波炉`

1. 微波炉要放什么食物（形参）

2. 微波炉怎么加热食物（实现功能）

3. 食物加热后变成什么样（return值）

   ```js
   function WeiBoRu(food) {
       console.log('加热食物中~~');
       finallyFood = String(food) + 'ok';
       return finallyFood
   }
   
   console.log(WeiBoRu('牛奶'));
   
   // 加热食物中~~ 
   // 牛奶ok
   ```

#### 形参和实参

------

1. 形参实参基本形式

   ```js
   // 定义在函数体内的参数叫做形参
   function fn([形参1, 形参2, ...]) {
   	value = 形参1 + 形参2
   	return value
   }
   
   // 调用函数传入的参数叫做实参, 10 和 20 都是实参
   fn(10, 20)
   ```

2. 形参和实参的关系

   1. 形参数 **大于** 实参数字

      ```js
      function hello(num1, num2) {
          return num1 + num2
      }
      
      hello(1, 2, 3, 4);
      	// 结果是3, 后面的 3 和 4 都会被抛弃
      ```

   2. 形参数 **小于** 实参数字

      ```js
      function hello(num1, num2) {
          alert(num1 + num2)
      }
      
      hello(1);
      	// 输出 NaN，num1是1，num2是undefined，数字+undefined = NaN
      ```

#### arguments

------

当我们不知道用户传入多少个实参，可以在函数内使用一个关键字 `arguments`，其包含所有实参的一个伪数组

```js
function fn(value) {
	console.log(value);
	console.log(arguments)
}

// 调用，传入多个参数
fn(1, 2, 3, 4, 5, 6)
```

![1576488096722](/assets/JSBase.assets/1576488096722.png)

> `伪数组：` 具有数组的 length 方法，能获得长度，但是**arguments**的**原型**是Object，没有数组的方法

arguments的两个属性（严格模式下都不允许使用）：

1. arguments.callee			函数本身

   ```js
   funciton fn() {
   	console.log(arguments.callee);
   }
   
   fn(); 
   /*
    * 结果为 ==>
    * funciton fn() {
    *     console.log(arguments.callee);
    * }
    */
   ```

2. arguments.callee.caller  函数执行的宿主环境

   ```js
   funciton fn() {
   	console.log(arguments.callee);
   }
   
   fn(); 
   /*
    * 全局下的结果为 ==> null
    * 
    * 若在别的函数下执行，那么宿主环境就是那个函数
    * 
    */
   ```

   

#### 有名/匿名函数

------



1. 有名函数

   ```js
   function fn(a, b) {
   	console.log(a, b)
   }
   ```

2. 匿名函数

   ```js
   // 1. 匿名函数
   let fn = function() {}
   document.document.onclick() = function() {}
   
   // 2. 立即执行函数
   (function(a, b){}(a, b));
   (function(a, b){})(a, b);
   ```

#### 函数底层运行机制

1. 创建函数（凡是引用数据类型，都会创建堆内存），浏览器开辟一块全新的堆堆存，并把函数体内的代码以字符串的形式保存在堆中
2. 运行函数
   1. 运行函数会开辟一块全新的栈内存用来`自上而下执行函数`（代码都是在**栈**中执行的）
   2. 基本数据类型比较简单，所以会直接在函数执行的栈内存中存放
   3. 这个**栈内存**有属于自己的私有作用域，外部是访问不到里面的变量
   4. 函数运行结束后会**return**一个值，并传给外部接收的变量（没设置则为undefined）
   5. VO阶段属于变量值存储阶段，AO属于函数执行阶段

![1576490016346](/assets/JSBase.assets/1576490016346.png)

##### li按钮下表经典题

为什么用for循环给每个按钮注册点击事件，点击 i 之后的值一直是5

```js
<button>按钮1</button>
<button>按钮2</button>
<button>按钮3</button>
<button>按钮4</button>
<button>按钮5</button>

let btnList = document.querySelectorAll('button');

for (var i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener('click', function () {
        console.log(this.i);
    })
}
```

![1576496056465](/assets/JSBase.assets/1576496056465.png)

- 原因：
  1. for 循环每次给按钮的 onclick 添加回调函数
  2. 都只是创建一个堆，并并且函数内的代码以字符串格式丢进去，并没有执行
  3. 当我们点击一个按钮的时候，回调函数会开辟一个新的私有内存栈，执行字符串里的代码
  4. 由于当前作用域没有 i 这个值，就往上一层作用域里面找，i的值已经是5了

解决方案①

给每个按钮添加一个属性，**index**，并把i的值赋予它

```js
let btnList = document.querySelectorAll('button');

for (var i = 0; i < btnList.length; i++) {
    btnList[i].index = i;
    btnList[i].addEventListener('click', function () {
        console.log(this.index);
    })
}
```

![1576497385388](/assets/JSBase.assets/1576497385388.png)



##### 任意数求和经典题

无论传入什么数，都能求和

```js
function sum() {
    let total = null;
    for (let i in arguments) {
        let num = parseFloat(arguments[i]);		// 排除 '123aaa' 这种情况
        !isNaN(num) ? total += num : null		// 通过NaN判断是不是数字
    }
    return total
}
```



## 检测数据类型

### typeof

- [x] ##### [typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

  ------

  检测`基本数据类型`的利器，确定变量是不是 `数字，字符串，布尔值，undefined`，就靠它（不包括null）

  ##### 语法

  ​	*typeof [value]*

  ##### 参数

  *value* ：一个表示对象或[原始值](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)的表达式，其类型将被返回。

  ##### 使用

  ```js
  let a = 10;
  let b = '10';
  let c = true;
  let d = undefined;
  let e = null;
  let f = new Object();
  
  console.log(typeof a);      // number
  console.log(typeof b);      // string
  console.log(typeof c);      // boolean 
  console.log(typeof d);      // undefined
  console.log(typeof e);      // object 
  console.log(typeof f);      // object
  ```
  
  ##### 优势
  
  1. 检测基本数据类型的得力助手，所有的基本数据类型（不包括null）都能完美检测出
  
  ##### 局限
  
  1. typeof null，返回的是 "object"，但是 null 是**原始值**，并不是对象
  2. 基于 typeof **无法分出**当前值是普通对象**还是**数组对象，是要是对象数据类型，返回的都是 "object"

### instanceof

- [ ] ##### [typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

  ------

  检测某个对象实例的`__proto__`，是否等于某构造函数的原型 `prototype` ,从而判断数据类型

  ##### 语法

  ​	*object **instanceof** constructor*

  ##### 参数

  - `object`

    某个实例对象

  - `constructor`

    某个构造函数

  ##### 使用

  ```js
  function A() { }
  function B() { }
  
  let a = new A()
  let b = new B()
  
  console.log(a instanceof A);
  console.log(b instanceof B);
  
  console.log(a instanceof B);
  console.log(b instanceof A);
  
  console.log(A instanceof Object);
  console.log(B instanceof Object);
  
  11 instanceof Number
  new Number(11) instanceof Number
  ```

  

### constructor

### Object.prototype.toString.call()

# 二，栈内存和堆内存

## JS的执行流程

**JavaScript**语言本身是没法运行代码的，必须有**解释器**，也就是浏览器的**内核**，才能帮我们解析代码

那么浏览器是如何执行JS代码的？

1. 首先从电脑中开辟出一块`全局栈内存`（电脑内存8G/16G/32G），用来执行代码（`栈内存` => Stack）

2. 然后全局栈内存中有一个**主线程**，用来自上而下执行JavaScript代码

   **栈内存**里面有三个东西：变量存储空间，值存储空间，代码执行主线程
   
   **堆内存**用来存放引用数据类型，会产生一个十六位的内存地址，并被内存指针指向，内存指针被变量指向
   
   ```js
   // 基本数据类型的执行步骤
   // 代码执行的顺序是从上往下，从左往右
   let a = 12;
       // 1. 创建一个值为 12，把他放到值存储空间内
       // 2. 创建一个变量 a，把他存储在栈内存的变量存储空间内
       // 3. 把变量 a 指向 12 这个值
   let b = a;
   	// 1. 由于 a 存放的是基本类型值，JS 会把 a 指向的值复制一份新的，把变量 b 指向这个新的值
   let n = {name: 'xyb'};
   	// 1. 开辟一块新的内存，叫做堆内存，专门用来放置引用数据类型，且有自己的16位地址 XXFFAABB
   	// 1. 创建一个变量 n，并指向一个内存指针，这个指针指向创建的堆内存 XXXFFFAABB
   let m = n;
   	// 1. 创建一个变量 m
   	// 2. 因为 n 里面存储的是引用数据类型，所以 m = n 实际上是吧 m 指向的指针复制了一份
   	// 3. 把 m 指向这份复制的指针，其实 m 和 n 最后指向的都是同一个内存地址
   m.name = '666';
   	// 1. 把 m 的内存地址指向的堆内存地址里面的 name 的值修改成 '666'
   consoloe.log(n.name);
   	// 1. 因为 n 和 m 指向的十六位内存地址是同一个，m的值发生了改变，所以 n.name 为 '666'
   ```
   
   ![](/assets/JSBase.assets/111.png)

## 栈内存和堆内存

`栈内存`：拥有作用域，代码执行空间，存储基本值和变量

1. 提供一个供 JavaScript 代码自上而下执行的 window 全局栈内存（**代码**都是在栈中执行的）
2. 基本数据类型会直接在栈内存中存放的，引用数据类型会开辟一个堆内存类存放，并且用指针指向其地址

`堆内存`：引用值存储空间

1. 存储引用类型值的（**对象**：键值对形式，**函数**：字符串形式）

   => 当前堆内存如果释放，那么这个引用空间就会彻底销毁，包括里面所有值

   => **堆内存的释放**：如果还有变量指向该内存，就不会释放，只要还有一个变量指向，就不会释放（类python）

   => 变量 = null ，也是一个不错的内存释放方法，一个变量如果指向 null，也就是指向空对象指针，原有被指向的对象就是少一层指向

![](/assets/JSBase.assets/1576546577797.png)

## 复制变量值的区别

### 基本类型值的复制

![1576565707067](/assets/JSBase.assets/1576565707067.png)

### 复杂数据类型的复制

![1576566469888](/assets/JSBase.assets/1576566469888.png)

### 函数传参的类型复制

函数执行，传递实参给函数的形参，本质山就是**形参对实参的**一种复制

1. 基本数据类型是值赋值
2. 引用类型是地址指针赋值

```js
let a = 10;
let b = { name: 'xyb' }

function fn(value1, value2) {
    console.log(value1);
    console.log(value1);
}
fn(a, b)

/*
* 函数执行流程
*  1. 形参赋值
*      1. value1 = a
*      2. value2 = b
*  2. 变量提升
*  3. 执行函数内部代码
*/
```

## 复制变量值练习

已知下面代码可以修改BOX元素的样式

```js
box.style.color = 'green';
```

那么下面的写法是否可以修改元素的样式，如果不可以是为什么？

```js
//第一种方案
let AA = box.style;
AA.color = 'red';

//第二种方案
let BB = box.style.color;
BB = 'red';

//=>哪种方式可以实现，不能实现是因为啥？
```

`第一种可以：对指针内栈内存里的值进行操作，JS会基于DOM映射机制把页面元素进行重新渲染`

`第二种不可以：其只是把box.style.color的值复制了一份新的而已，并且只改变了本身BB变量的指向`

![1576483649619](/assets/JSBase.assets/1576483649619.png)

## 内存地址小练习

```js
let n = [10, 20];
let m = n;
let x = m;
m[0] = 100;
// m ,n, x [100, 20]
n = [30, 40];
// n, [30, 40]  m, x [100, 20]
n[0] = 200;
// n, [200, 40]  m, x [100, 20]
x[0] = 200;
// n, [200, 40]  m, x [200, 20]
m = [50, 60];
// n [200, 40]  x [200, 20] m [50, 60]
m = x;
// n [200, 40]  x m [200, 20]
m[1] = 300;
// n [200, 40]  x m [200, 300]
n[2] = 400;
// n [200, 40, 400]  x m [200, 300]
console.log('n: ' + n);
console.log('m: ' + m);
console.log('x: ' + x);
```

## 大公司面试题

1. 阿里

   ```js
   let a = {
       n: 1
   };
   let b = a;
   a.x = a = {
       n: 2
   };
   console.log(a.x);
   console.log(b);
   ```

   ![](/assets/JSBase.assets/ali.jpg)

2. 腾讯

   ```js
   var a = 'abc' + 123 + 456;
   var b = '456' - '123';
   var c = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
   console.log(a, b, c);
   
   // a = 'abc123456';
   // b = 333;
   // c = 'NaNTencentnull9false'
   ```

3. 腾讯

   ```js
   var str = 'abc123';
   var num = parseInt(str);
   if (num == NaN) {
       alert(NaN);
   } else if (num == 123) {
       alert(123);
   } else if (typeof num == 'number') {
       alert('number');
   } else {
       alert('str');
   }
   
   // 弹出 Number
   ```

4. 腾讯

   ```js
   var a = 0;
   var b = a;
   b++;
   alert(a)
   var o = {};
   o.a = 0;
   var b = o;
   b.a = 10;
   alert(o.a)
   ```

   ![](/assets/JSBase.assets/tengxun.jpg)

5. 输出 '1' 的值

   ```js
   alert(1)          
   console.log(parseInt(1.3))              
   console.log(1)  
   console.log(isNaN(1))   
   console.log(parseInt("1"))
   
   // 1 2 3 5
   ```

6. 输出 'undefined' 的值

   ```js
   alert(1)
   typeof undefined
   parseInt(undefined)
   isNaN(undefined)
   
   // 2
   ```

   

7. 输出 true 的值

   ```js
   isNaN(null)
   isNaN(parseInt(null))
   Number(null)
   parseFloat(null)
   
   // 2
   ```

8. 输出下面的结果

   ```js
   parseInt("")		// NaN
   Number("")			// 0
   isNaN("")			// 0		isNaN(Number(""))
   parseInt(null)		// NaN		parseInt(String(null))
   Number(null)		// 0	
   isNaN(null)			// false	isNaN(Number(null)) 
   parseInt("12px")  	// 12
   Number("12px")		// NaN
   isNaN("12px")		// true
   ```

9. 输出下面的结果

   ```js
   if (isNaN(NaN) == "") {
       console.log("哈哈")
   } else {
       console.log("呵呵")		// 输出 呵呵
   }
   ```

10. 输出下面的结果

    ```js
    let x = [1, 2, 3];
    let y = x;
    let z = [4, 5, 6];
    y[0] = 10;
    y = z;
    z[1] = 20;
    x[2] = z = 30;
    console.log(x, y, z);
    
    // x = [10, 2, 30]
    // y = [4, 20, 6]
    // z = 30
    ```

# 三，JS预解析闭包详解

## JS预解析

- JS 引擎运行 JS 分为两步，`1. 预解析`，`2. 执行代码`

  (1)，预解析 **JS** 引擎会把 **js** 里面所有的 **var** 还有 **function** 提升到当前作用域的最前面

  (2)，代码执行，按照代码书写的顺序从上往下执行

- 预解析分为变量解析（变脸提升）和 函数预解析（函数提升）

### 变量/函数提升

> 所有变量提升，函数提升，都只会在自己的栈运行作用域里进行提升

**var变量提升** ：把用 **var**关键字定义的变量，申明提升到作用域最前面，`只对等号(=)左边的内容进行提升`

**有名函数提升** ：把所有 `有名函数`定义申明 提升到当前作用域的最前面，**匿名/立即执行函数**不会函数提升

1. ###### var变量和有名函数提升

   ```js
   console.log(num);		// undefined
   var num = 10;
   func();					// undefined
   function func() {
       console.log(data)
       var data = 20;
   }
   	
   fn();					// 报错
   var fn = function () { console.log(666) }
   ```

   ![1576634076227](/assets/JSBase.assets/1576634076227.png)

   JavaScript内部运行解析机制是这样的：

   ```js
   var num;				// 变量提升
   function func() {		// 函数提升
       console.log(data)
       var data = 20;
   }
   var fn					// 变量提升
   
   console.log(num);	// undefined
   num = 10;
   func();				// undefined
   // 函数在运行时候会开辟一个全新的私有栈内存，栈内存运行代码之前会进行代码与解析，包括变量/函数提升
   // 函数内部：
   /* 
   function() {
   	var data;
   	console.log(data);
   	data = 20;
   }
   */
   fn();					// 报错，fn的值为 undefined，只是变量提升， =后面的函数没有解析
   fn = function () { console.log(666) }
   ```

   运行流程图

   ![1576571123412](/assets/JSBase.assets/1576571123412.png)

2. ###### 立即执行函数 + 不用var定义的变量 **不会被提升**

   ```js
   // 1. 立即执行函数不会被提升
   fn();		// 报错
   
   (function fn() {
   console.log('我是立即执行函数');
   })()
   
   // 2. 不使用 var 定义的变量不会被提升
   console.log(a);	// 报错
   
   a = 20
   ```

   ![1576634276305](/assets/JSBase.assets/1576634276305.png)

   ![1576637782481](/assets/JSBase.assets/1576637782481.png)

### 条件判断下的提升

1. 在当前作用域下，不管条件成不成立，**变量**都要进行**变量提升**

   ```js
   console.log(a)			// undefined
   if (1 === 10) {
       var a = 10;
   }
   console.log(a)			// undefined
   /*******************************************************************/
   console.log(a)			// undefined
   if ('a' in window) {
       var a = 10;
   }
   console.log(a)			// 10
   ```

2. 老版本下浏览器中，会把整个函数进行**函数提升**，但是为了迎合 ES6 的块级作用域，

   新版本下浏览器中，只会**提升函数的申明**，就是**函数标识符**，没有定义函数体，类似于 var只定义 = 前

   - 老版本

     ```js
     fn()				   // 666
     if (1 === 10) {			// 条件不成立，外部居然还能使用条件判断里的函数
         function fn() {	
         console.log(666);
         }
     }
     console.log(fn)			// 666
     ```

     IE10及以下，解析条件判断下的函数提升都会 `定义+申明` 一起做了

     ![1576636344571](/assets/JSBase.assets/1576636344571.png)

   - 新版本

     ```js
     fn()				   // fn的值是 undefined，所以 undefined() 会报错
     if (1 === 10) {			// 条件不成立，外部居然还能使用条件判断里的函数
         function fn() {	
         console.log(666);
         }
     }
     console.log(fn)			//报错，条件判断不成里，fn的值为 undefined
     ```

     全局作用域下，if 语句内的 fn **标识符会被提升**，并且值为 `undefined`

     ![1576636952260](/assets/JSBase.assets/1576636952260.png)

     

- [x] 一道小小的练习题

```js
g = function () { return true; }
f = function () { return false; }
(function () {
    if (g() && [] == ![]) {
        f = function () { return false };
        function g() { return true }
    }
})();
console.log(f());
console.log(g());
```

1. 浏览器执行，最大的 **window栈内存** 开辟，首先进行变量/函数提升，`不包括立即执行函数`

   ```js
   // 当前代码没有任何 变量 / 函数提升
   ```

2. 开始运行，给 g 和 f 进行赋值

   ```
   g = function () { return true; }
   f = function () { return false; }
   ```

3. 运行到立即执行函数，**开辟新的私有栈**运行代码，新浏览器报错，旧浏览器会运行

   ```js
   // 开辟新的私有栈会再次再当前作用域下进行 变量和函数提升
   (function () {
       if (g() && [] == ![]) {
           f = function () { return false };
           function g() { return true }
       }
   })();
   
   // 运行流程为（新版本浏览器）：
   // 1. 对当前作用域的函数和变量进行提升
   g;								      // g 的值是 undefined
   if (g() && [] == ![]) { }			    // g() => undefined()  报错	
   // 运行结束
   
   // 运行流程为（旧版本浏览器）：
   // 1. 对当前作用域的函数和变量进行提升
   function g() { return true };		     // g 的值为函数
   if (g() && [] == ![]) {... }			// g() => true	&&	[] == ![] => true
   f = function () { return false };	     // window.f = ...
   ```

   `旧版本浏览器运行`，新版本上一步会直接报错

   ```js
   console.log(f());	// false
   console.log(g());	// true
   ```

   **新**浏览器代码执行图

   ![1576644225574](/assets/JSBase.assets/1576644225574.png)

### 条件判断变量提升的坑

如果条件判断成立，条件判断的 {} 里的**函数**会再一次进行类似变量提升的操作

看下面这个例子：

```js
console.log(fn);
console.log(a);

if (1 === 2) {
    fn();
    console.log(a);
    function fn(fn) {
        console.log(666);
    }
    var a = 10;
}
```

- 咋一看，当前代码有 if 条件判断，先堆if 条件判断里的值进行变量提升，分别提升 a 和 函数 fn为 undefined
- 执行到 i f判断，条件不成立，不执行代码

但是我们们 1 ===2 这个判断条件修改为 1 === 1，他发生情况就与我们的认知有大不同

```js
console.log(fn);
console.log(a);

if (1 === 1) {
    fn()				// 这里居然没有报错，而且还成功的调用了fn()，说明函数被提升了
    console.log(a);
    function fn(fn) {
        console.log(666);
    }
    var a = 10;
}
```

- 原因：当条件判断成功后，进入条件判断的执行 {} 中，`{}在ES6中是一个块级作用域`，在块级作用域中，变量会进行提升和申明，fn这个函数会被完整的定义在该作用域最前端，从而 fn 不会报错

### 变量提升中重名的处理

1. 如果同时出现函数名和变量名重合，在变量提升阶段会相互覆盖，重新赋值也会相互覆盖

   全局作用域下，**var** 定义和 **function** 定义都是在 `window的属性` 上定义，不同的只是里面值的指向而已

   ```js
   // 代码
   var fn = 10;
   function fn() {
       console.log(666);
   };
   
   console.log(fn);
   
   // 预解析
   var fn;
   function fn() {
       console.log(666);
   };
   fn = 10;
   console.log(fn);
   ```

   ![1576646756456](/assets/JSBase.assets/1576646756456.png)

   ![1576648976327](/assets/JSBase.assets/1576648976327.png)

一到变量提升重名的练习

```js
// 代码
fn();
function fn() { console.log(1); }
fn();
function fn() { console.log(2); }
fn();
var fn = 100;
fn();
function fn() { console.log(3); }
fn();
function fn() { console.log(4); }
fn();

// 变量提升之后
function fn() { console.log(1); }
function fn() { console.log(2); }
var fn;
function fn() { console.log(3); }
function fn() { console.log(4); }
fn();
fn();
fn();
fn = 100;
fn();
fn();
```

![1576647296016](/assets/JSBase.assets/1576647296016.png)

### var带来的缺点

在ES6之前，我们都是用 var 这个关键字来定义变量，但是当初作者在创建这门语言的时候没有考虑这么多，导致了var 定义的变量有很多的问题

1. **变量提升**问题

   ```js
   console.log(a);		// undefined
   var a = 10
   ```

2. 在全局作用域下，使用 var 定义的**变量会变成全局变量**！！！！！

   ```js
   console.log(screen);            // Screen { availWidth: 1920...}
   console.log(window.screen);     // Screen { availWidth: 1920...}
   var screen = 20;
   console.log(screen);            // 20
   console.log(window.screen);     // 20
   ```

   - 这个是最令我奇怪的一点，在全局作用域下定义了screen这个变量，注意！是使用 var 变量定义的，与此同时 window 全局变量也有一个属性叫做 screen，但是我们发现var定义的变量居然把window.screen这个属性给覆盖了，这是特别奇怪的行为
   - ES6的 let 和 const 关键字没有这些怪异的行为，大家以后定义变量不要用 var 定义了！

## ES6关键字let

虽然变量提升减少了代码报错的几率，但是让代码写起来太不严谨了，别的语言都没有变量提升这一说法

所以 ES6 的诞生消除了很多奇怪的行为，制定了更严格的规范，其中一项就是用 let 移除了变量提升这一东西

### 个人理解

> 纯粹是我个人对 **let** 和 **const** 的理解：

1. 把 ES6 的 let和const 看成是**有变量提升的语法**

   `但是此变量提升非真正的变量提升`，只遇到`{}`才会发生**伪提升**，并且背后真正原因是由于块级作用域

2. ES5的变量提升：变量提升到当前作用域的最前面，如果在真正赋值前被使用，值为 **undefined**

3. ES6的伪变量提升：变量提升到当前作用域的最前面，如果在真正赋值前被使用，**报错**

案例0：

```js
let a = 20;
if (true) {
    let a = 666;
    console.log(a);		// 666，let有块级作用域，变量查找先从块级作用域查找
}
```

案例1：

```js
let a = 20;
console.log(a);
console.log(b);
let b = 30;
```

![1576662187191](/assets/JSBase.assets/1576662187191.png)

案例2：

```js
let a = 10;
let fn = () => {
    console.log(a);
    let a = 10;
};
fn()

// 可以照我这个思路理解函数内部的 ES6伪变量提升
// 1. 在执行这个函数的时候，开辟新的私有栈内存，有自己的作用域
// 2. 首先在私有栈内存进行 ES6伪变量提升，把a的值提升到作用域最前面，如果有代码在其被赋值之前调用a的值，浏览器抛出一个错误
// 3. 运行代码：console.log(a)，当前作用域里有 a，但是还没被真正的赋值，报错
```

![1576662257323](/assets/JSBase.assets/1576662257323.png)



- 最后总结一点：代码遵循规范写的人根本没有以上这些错误！！！！！！

### 官方点的理解

#### 切断和window联系

- 以前在全局作用域下使用 **var** 创建变量，就是把变量绑定到 **window** 的属性上

  ```js
  var a = 10;
  console.log(window.a);      // 10
  console.log(a);             // 10
  ```

- 使用 **let** 定义的变量和**window** 没有任何关系

  ```js
  let a = 12;
  console.log(a);             // 12
  console.log(window.a);      // undefined
  ```

#### 不允许重复定义

- 在**相同作用域**中，基于 let **不能**声明**相同名**字的变量

  相同作用域下：

  ```js
  // 报错
  var a = 10;
  let a = 20;
  
  // 报错
  a = 10;
  let a = 20;
  
  // 报错
  let a = 10;
  var a = 20
  ```

  不同作用域中：

  ```js
  let a = 10;
  let fn = () => {
      let a = 10;
  }
  ```

#### 不允许变量提升

- 在变量被定义之前就使用

- 基于 **let 和 const**等方式创建的`变量`或者`函数`，不存在变量提升机制
- ES6 中摒弃了 function 函数的创建方式，用**箭头函数**和**函数表达式**来创建

```js
console.log(a);         // 报错
console.log(fn);        // 报凑

let a = 10;
let fn = () => { }
```

![1576654215329](/assets/JSBase.assets/1576654215329.png)

#### *变量语法检测机制

> 虽然用ES6定义的变量不存在变量提升的问题，但是会在代码执行之前对所有的变量进行一次变量检测

- 在代码执行之前，如果有的代码用了 ES6 的语法，那么那部分 ES6 的代码就会走 ES6 的变量检测机制

  ```js
  let a = 10;
  console.log(a);
  let a = 20;
  
  // 这三行代码还没运行就会直接报错
  ```

  ###### 代码中写了两个 let a = 这样的赋值语句，但为什么不先打印 a 的值，然后运行到第三行，发现有用 let 重复定义的变量，然后再报错呢？按理说应该执行到第三行才会报错？原因如下：

  JS 在执行代码之前，会对当前所有使用**let/const**定义的变量`进行一次检测`，如果在`相同作用域内有重复的变量`**被定义**，那么解释器就会再代码被执行之前直接抛出错误

  ```js
  let a = 10;                                 // 全局作用域
  if (true) { let a = 20 };                   // 块级作用域
  for (let a = 20; a < 30; a += 10) { };      // 块级作用域
  let fn = () => { a = 40 }                   // 函数私有栈内存，私有作用域内
  
  // 抛出错误的案例, 下面的代码就算没有被运行也会直接报错，JS在运行之前就会对 let 进行检测
  let fn = () => {
      let a = 20;
      let a = 30;
  }
  ```

#### 块级作用域

- 如果let的使用范围是 **{}** 内，那么这个{}就会形成`块级作用域（类似函数执行时候的私有栈内存）`，有自己独立的空间，外部访问不到

  ```js
  let a = 10;
  if (true) {
      let a = 20; // ReferenceError: a is not defined
  }
  
  console.log(a)	// 10
  ```

- **不同函数**执行会形成各自的`私有作用域（私有栈内存）`，外部时访问不到的，不同的栈内存里使用**let**`定义变量`也不能重复

  ```js
  let fn = () => {
      let a = 20;
      let a = 30;
  }
  // 报错
  
  
  let fn1 = () => { let a = 10; }
  let fn2 = () => { let a = 10; }
  // 不会报错
  ```

  

#### 暂时性死区

暂时性死区：浏览器的Bug

在原有浏览器渲染机制下，用typeof 等逻辑运算符检测一个**未被声明的变量**，不会报错，返回 `undefined`

```js
console.log(typeof a);  			// 'undefined'
console.log('a' in window);			// false
```

修复了以后：

```js
console.log(typeof a);				// 报错
let a;				// 如果当前变量是基于 ES6 的语法处理，在没有声明这个变量之前typeof会报错
```



#### let关键字的练习

1. 正常的题目

   ```js
   let a = 10,
       b = 20;
   let fn = () => {
       let a = b = 30;
       /*
        *  let a = 30;     当前作用域内的 a = 30
        *  b = 30;         把全局的 b 修改成 20
        */
       console.log(a, b);
   }
   fn()
   console.log(a, b);
   ```

   ![1576658760974](/assets/JSBase.assets/1576658760974.png)

2. 在中间加上一行怪异的代码

   ```js
   let a = 10,
       b = 20;
   let fn = () => {
   	console.log(a)		// 添加一行打印 a 的值
       let a = b = 30;
       console.log(a, b);
   }
   fn()
   console.log(a, b);
   
   // 代码直接报错
   ```

   ![1576658899006](/assets/JSBase.assets/1576658899006.png)

   原因很简单，虽然 ES6 没有作用域内的变量提升，但是他有一个变量检测机制（只想不做的方法）！

   1. 代码开始执行，先对带有 let / const 的关键字进行变量检测，如果在相同作用域下有重复定义变量的行为，浏览器抛会出一个错误（例如 let a = 10; var a = 20;）
   2. 在这个阶段内不允许变量被定义完成之前使用，当前作用域内的变量权重大于上一级作用域
   3. 函数运行开辟新的栈内存，首先进行数据检测，并默默记下哪些变量是在当前作用域内被let/const定义的
   4. 该阶段内不允许**let/const 定义的变量**在定义完成之前使用，如检测出直接抛出错误

   ![1576661255845](/assets/JSBase.assets/1576661255845.png)

## 作用域

> 作用域：函数在执行的时候会形成一个`栈内存`，这个就是作用域
>
> 闭包：`保护私有变量`的值不受外界干扰，能够储存一些值，等到以后用的时候回来取

全局作用域：全局栈内存（window主执行栈）

私有作用域：私有栈内存（函数运行开辟） 

### 全局变量

在全局作用域内定义的变量都是属于全局变量

```js
let a = 10;
const b = 20;
var c = 30;
class People { }
```

### 私有变量

函数执行会开辟私有作用域，在私有作用域中，**只有**以下两种变量属于**私有变**量（剩下都去上层作用域找）

1. ##### 在函数内部声明定义的变量（let/const/var/function/class）

   ```js
   let fn = () => {
       let a = 10;
       const b = 20;
       var c = 30;
       class People { }
   }
   ```

2. ##### 形参

   ```js
   let fn = (n, m, a, b, c ...) => {
       console.log(n);
       console.log(m);
       console.log(a);
       ...
   }
   ```

3. ##### arguments（只有函数才有）

   ```js
   // 函数最开始执行的时候只有 arguments 这唯一一个私有变量
   function fn() {
       console.log(arguments)
   }
   
   fn(1, 2, 3, 4, 5......)
   ```

   

#### 小练习

区分私有变量和全局变量

```js
var a = 11,
    b = 12,
    c = 13;
function fn(a) {
    console.log(a, b, c); 
    var b = c = a = 20;
    console.log(a, b, c); 
}
fn(a);
console.log(a, b, c); 
```

答案详情

```js
var a = 11,
    b = 12,
    c = 13;
function fn(a) {
    /* 
        * 形参赋值: 
        *      a = 12;
        * 
        * 变量提升
        *      var b;
        * 
        * ==>私有作用域中，只有两种情况是私有变量
        *      1. 在函数内声明过的变量
        *      2. 形参
        */
    console.log(a, b, c);   // 11 undefined 13
    var b = c = a = 20;
    /*
        * var b = 20;
        * c = 20;
        * a = 20 
        */
    console.log(a, b, c);   // 20 20 20
    // class People { }
}
fn(a); // => 执行 fn 函数，把a的值作为形参传给fn函数，开辟一个新的私有栈内存
console.log(a, b, c);       // 11 12 20
```

![1576674159462](/assets/JSBase.assets/1576674159462.png)

## 闭包

### 什么是闭包？

**官方**：函数执行形成一个私有的作用域，保护里面的私有变量不受外接干扰，这种保护机制叫闭包

**民间**：函数执行形成不销毁的私有作用域（私有栈内存），叫做闭包

**闭包** => `柯里化函数/惰性函数`，真实开发中尽量少使用闭包（理想），减少栈内存的数量

1. 闭包形式一（柯里化函数）

   ```js
   function fn() {
   	return f() {}
   }
   
   var f = fn()
   // fn的return语句返回的函数被变量f指向，fn形成的私有栈内存就不会被销毁，形成了闭包
   ```

2. 闭包形式二（惰性函数）

   ```js
   var f = (function() { 
       return function() {} 
   })();
   // 立即执行函数返回的函数被变量f指向，立即执行函数形成的私有栈内存就不会被销毁，形成了闭包
   ```

### 闭包的作用

> 闭包的主要作用有两点，分别是 **保护** 和 **保存** 作用

1. 闭包具有 `"保护"` 作用，保护私有变量不受外界的干扰

   #### 保护作用

   典型案例1：多人开发同一个项目，好几个JS文件合并，大量**变量名重名**（全局变量污染）

   - 解决：对每个JS文件都形成一个闭包，各个JS文件之间变量和函数不会冲突

     ```js
     // 程序员A的JS代码
     var a = 10;
     function fn(){
         console.log(111)
     }
     
     // 程序员B的JS代码
     var a = 20;
     function fn(){
         console.log(222)
     }
     
     // 合并之后，用两个闭包保护各自的函数和变量，相互之间不会冲突
     (
         var a = 10;
         function fn(){
         console.log(111)
     }
     )();
     
     (
         var a = 20;
         function fn(){
         console.log(222)
     }
     )();
     ```

     典型案例2：封装类**库插**件的时候，把自己的变量和函数放到闭包中，**防止**和用户的**代码冲突**，但是我们有需要把一些方法暴露给用户使用，该怎么处理？

     - 解决①：JQuery做法：把需要暴露的方法直接抛到全局window对象上

       ```js
       (function () {
           function JQuery() {
               console.log('I am JQuery');
           }
           window.JQuery = window.$ = JQuery;	// 通过给window添加属性的方式暴露JQuery
       })()
       
       $()		// 使用 JQuery
       ```

     - 解决②：Zepto做法L基于return，把需要供外界使用方法用对象return出去

       ```js
       var Zepto = (function () {
           var x = 10;
           var y = 20;
           function sum(x, y) {
               return x + y
           }
       
           return {			// 把变量和函数用对象 return 出去，外面用一个变量接收
               x: x,
               y: y,
               sum: sum
           }
       })()
       
       Zepto.sum(Zepto.x + Zepto.y)
       ```

       

2. 闭包具有 `"保存"` 作用，形成不销毁的栈内存，把一些值保留下来，方便日后调用

   ####  保存作用

   案例1：给ul里面的每个li注册点击事件，点击li就跳出当前li的索引

   ```js
   btns = document.querySelectorAll('button');
   for (var i = 0; i < btns.length; i++) {
       btns[i].onclick = function () {
           console.log(i);
           /* => 当点击按钮之后，事件函数形成私有栈内存，console.log(i)遇到变量i，
               * 但是当前私有作用域没有私有变量 i，根据作用域链向上级作用域window里找i
               * 传统的ES3和ES5的for循环没有块级作用域，
               * 所以向window主环境里面查找，但是for循环结束，i的值已经是5了
               * ！注意：所有的事件绑定都是异步编程，绑定事件并不会阻塞for循环
               * 而是继续循环下一轮给另外的按钮绑定事件，所以当我们点击的时候for循环早就结束了
               */
   
           /*
            * 以后解释这个问题从两方面入手：1.作用域的问题入手 2. 绑定事件是异步编程
            */
       }
   }
   ```
   
   - 解决①：自定义属性
   
     ```js
     // 解决方案1，自定自定义属性
     for (var i = 0; i < btns.length; i++) {
         btns[i].index = i;
         btns[i].onclick = function () {
             console.log(this.index);
         }
     }
     ```
   
   - 解决②：使用闭包
   
     ```js
     // 解决方案2，使用闭包
     for (var i = 0; i < btns.length; i++) {
         btns[i].onclick = (function (i) {
             return function () {
                 console.log(i)
             }
         })(i);
     }
     
     // 第一次for循环
     /*
     * 1. 给第一个按钮注册点击事件，点击事件的函数是一个立即执行函数的返回值
     * 2. 立即执行函数会形成私有作用域，该私有作用域return了一个函数，被执行
     * 3. 由于私有作用域不会被销毁，所以再点击按钮的时候，函数先在当前
     * 私有作用域里面查找，发现了私有变量 i，并且每次循环都会形成私有作用域，都有自己的i
     */
     ```
   
   - 解决③：let的块级作用域
   
     ```js
     for (let i = 0; i < btns.length; i++) {
         btns[i].onclick = function () {
             console.log(this.index);
         }
     }
     
     // 每一次for循环，因为有let定义变量的存在，都会形成块级作用域
     // 因为该块级作用域里的函数被按钮的点击事件绑定，所有执行结束之后并不会被销毁（类私有作用域）
     // 所以每次点击按钮，返回的值都是不同块级作用域的值
     ```

### 栈内存和堆内存释放

- 堆内存释放：若**没有**变量**指向**该堆内存(常见的手法就是用 null 来释放)，则`浏览器会自动释放`（webkit内核）

  ```js
  let obj = {
  	name: 'xyb'
  }
  
  // 该对象的堆内存不会被销毁，因为被obj这个变量指向
  // 如果想要主动释放该堆内存，解除堆内存之间指向联系：obj = null;
  ```

- 栈内存释放：
  
  > 只有 全局栈内存window 和 函数执行形成栈内存
  
  1. 主window栈内存：浏览器关闭时释放
  2. 函数执行生成的私有栈内存：
     - 一般情况下：当函数执行完成，所形成的私有作用域（栈内存）会自动释放，【该栈内存内所有储存的值都会被销毁】
     - 特殊情况：函数执行完成，在当前形成的栈内存中，私有变量或值（一般是堆内存）**被别的作用域**内的变量指向，此时该栈内存不会被释放（否则外面指向该栈内存的变量会找不到值）
  
  - [x] 如果栈内存**没有被释放**，那么之前在栈内存内储存的值也不会被释放，该栈内存私有作用域会一直保留

### 栈内存堆内存理解题

```js
var i = 1;
function fn(i) {
    return function (n) {
        console.log(n + (++i))
    }
}
var f = fn(2);
f(3);
fn(5)(6);
f(4)
```

![1576845389376](/assets/JSBase.assets/1576845389376.png)

### 一道题理解闭包

> 闭包返回函数，实际就是返回这个闭包私有作用域里的函数的内存地址

![1576750025389](/assets/JSBase.assets/1576750025389.png)

![1576750003590](/assets/JSBase.assets/1576750003590.png)

1. 首先在全局作用域下定义了一个函数 fn，在 fn函数 里面又定义了一个 函数f，并返回给 x
2. 在全局作用域调用 x()，本质上就是在调用 f()，因为f和x在内存中指向同一个堆内存
3. 执行函数，无论这个堆内存在哪里被调用开辟出新的私有栈内存，他的上级作用域永远是 fn()，地址指向



# 四，面向对象程序设计

### 单例模式

- 引子

  ```js
  // 没有引用数据类型的时候，只有基本数据类型，只能靠变量来描述一个人
  var name = 'xyb';
  var age = 20;
  var sex = 'M';
  
  var name = 'lyw';
  var age = 19;
  var sex = 'F';
  
  // 但是这用变量描述两个人，彼此之间会冲突，所有用单例设计模式来描述每个人
  var peopleOne = {
      name: 'xyb';
      age: 20;
      sex: 'M';
  }
  
  var peopleTwo = {
      name: 'lyw';
      age: 19;
      sex: 'F';
  }
  ```

单例设计模式

1. 表现形式：

   ```js
   var obj = {
       name: 'xyb';
       age: 20;
       sex: 'M';
   }
   ```

   - 在单例设计模式中，**obj**不仅仅是对象名，它也被称为`'命名空间[NameSpace]'`把描述事物的属性存放到命名空间中，多个命名空间是独立分开的，互不冲突

2. 作用：

   把描述同一件事的属性和特征进行分组和归类（存储在同一个堆内存当中），因此避免了全局变量之间的冲突和污染

3. 单例模式的由来：

   => 每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立不干扰的，所以称它为 **'单例：单独的实例'**

4. 高级单例模式：

   ```js
   var nameSpace = (function(){
       var n = 12;
       function fn() {
           // ...
       }
       function sum() {
           // ...
       }
       return {
           fn: fn,
           sum: sum
       }
   })();
   ```

   1. 在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个`私有的作用域`（栈内存）**AAAFFF11**，并且在**AAAFFF11**创建一个堆内存，把堆内存地址赋值给命名空间
   2. 这种模式的好处：完全可以在这个AAAFFF111这个私有作用域内创建很多的内容（变量/函数/对象），并且只把我们想要暴露的方法用一个对象来返回（模块化实现的一种思想）

- 习题

```js
var n = 2;  // 2+2=4 4*2=8
var obj = {
    n: 3, // 6
    fn: (function (n) {
        n *= 2;  // 4
        this.n += 2;
        var n = 5; // 5+1=6 6+1=7
        return function (m) {
            this.n *= 2;
            console.log(m + (++n));
        }
    })(n)
}
var fn = obj.fn;
fn(3);  // 9
obj.fn(3);  // 10
console.log(n, obj.n); // 8 6
```

- ##### 单例模式的模块化开发

  模块化开发：

  1. 团队协作开发的时候，会把产品按照功能模块进行划分，每一个功能模块由不同的人开发

  2. 把各个板块之间公用的部门进行提取封装，后期再想实现这些功能，直接引用就行

     ```js
     // 程序员A
     var helloRender = (function() {
         var fn = function() {
             // ...
         };
         return {
             init: function() {
                 fn()    // 调取自己模块中的方法
             }
         }
     })();
     helloRender.init();
     // 程序员B
     var hiRender = (function() {
         var fn = function() {
             // ...
         };
         return {
             init: function() {
                 fn()
             }
         }
     })();
     hiRender.init();
     // 程序员C
     var shopRender = (function() {
         var fn = function() {
             // ...
         };
         return {
             init: function() {
                 fn()
             }
         }
     })();
     shopRender.init();
     ```

### 工厂模式

使用单例模式可以用来创建单个的对象，但是这些方法有个明显的缺点：使用一个接口创建很多对象，会有大量的代码发生冗余，为了解决这个问题，创建了工厂模式

工厂模式**抽象了创建具体对象的过程** ，ES5里面没有类的概念，用函数来封装特定的接口创建对象的细节

- 使用工厂模式

  ```js
  function createPerson(name, age) {
      var obj = {};
      obj.name = name;
      obj.age = age;
      return obj;
  }
  ```

  所谓的工厂模式，就是把`实现相同功能的代码`进行封装，以此来实现 **'批量生产'**(后期想要实现这个功能，只需要执行这个函数即可)

### 构造函数模式（oop）

> 面向对象和面向过程：同一个问题，把大象装进冰箱里面

- ###### 面向过程

  1. 打开冰箱
  2. 把大象装进去
  3. 关上冰箱门

- ###### 面向对象

  1. 写一个大象类，有进去这个功能

  2. 写一个冰箱类，有打开个关闭两个功能

  3. 使用大象和冰箱的功能

     面向对象是以对象类划分问题，而不是步骤

     面向对象具有灵活性，代码可复用性，容易维护和开发的有点，适合多人合作的大项目

     面向对象的特征：

     - 封装性
     - 继承性
     - 多态性

- ##### JavaScript是基于面对象设计的，万物皆对象

  ![1577324945306](/assets/JSBase.assets/1577324945306.png)

使用`构造函数模式`创建对象

- [x] 使用构造函数的关键就是**在普通函数上**使用 **new** 关键字（new关键字能够创建对象）

  ```js
  // 1. 创建一个构造函数（注意：构造函数始终要以大写字母开头区别其他普通函数）
  function Person(name, age) {
          this.name = name;
          this.age = age; 
          this.sayHi = function() {
              console.log('hello word')
          }
  }
  
  // 2. 实例化对象
  let person1 = new Person('xyb', 20);
  let person2 = new Person('xyb', 20);
  ```

  ##### 普通函数执行

  1. 创建一个私有栈内存
  2. 形参赋值
  3. 变量提升
  4. 执行代码
  5. return返回值（无则返回undefined）
  6. 栈内存释放
  
  ##### 构造函数执行（+new）
  
  1. 创建一个私有栈内存
  2. 形参赋值
  3. 变量提升
  4. 【构造函数独有】创建一个新的对象（私有堆内存），并把函数的this指向该新对象
  5. 执行代码
  6. return这个新对象
  7. 栈内存释放
  
  ##### new 关键字的作用：
  
  1. 在函数执行的私有栈内存内创建一个堆内存对象（new关键字作用）；
  2. 将构造函数的作用域赋于这个新对象（函数内的this也指向这个新对象）
  3. 执行构造函数中的代码（给这个新对象添加属性和方法）
  4. 返回这个对象

![1577520461036](/assets/JSBase.assets/1577520461036.png)

构造函数的几个问题

1. 构造函数默认返回新对象（如果写了return，有以下几种情况）

   - return 一个引用值（返回该引用值）

     ```js
     function Person(name, age) {
     	this.name = name;
         this.age = age;
         // return {}
         // return function() {}
     }
     
     let person = Person('aaa', 20)
     // 那么 new 之后返回的值就是 return 的值
     ```

   - return 一个基本类型值/无值（返回 new 创建的对象）

     ```js
     function Person(name, age) {
     	this.name = name;
         this.age = age;
         // return;
         // return 20;
         // return 'aaa';
     }
     
     let person = Person('aaa', 20)
     // 不管语句里面 return 的值，返回 new 创建的对象
     ```



构造函数模式的优点和缺点：

- 优点：每个实例都有自己的属性和方法，其 constructor 属性能帮助实例找到自己的类
- 缺点：每次实例化之后，构造函数里的方法会在每个函数内重新创造一遍，浪费内存

### 原型模式（prototype）

#### 原型和原型链

【函数类型】

​			所有的普通函数，类（所有内置类Number，Array，String...，自己创建的类class, function Fn）

【对象类型】

​			普通对象{}丶数组[]丶正则丶Math丶arguments丶...

​			所有的实例都是对象类型的（除了基本类型的字面量创建的值）

​			prototype的值也是对象类型的，函数也是对象类型的

1. 所有的函数类型都天生自带一个属性叫做 `prototype(原型)` ，这个属性的值**是一个对象**，浏览器会默认给他开辟一个堆内存

2. 在浏览器给 protype 开辟的堆内存中有一个天生自带的属性，叫做 `constructor`，这个属性的值指向当前函数，作用是用来给实例**标识对象类型**

3. JavaScript中的每一个对象都有一个 `__proto__` 的竖向，这个属性指向**当前实例所属类的原型** ，如果不能确定是哪个类的实例，那么都是 Object 的实例

   ![1577525320881](/assets/JSBase.assets/1577525320881.png)

#### 原型与in操作符

使用 in 操作符能确定某个属性是否在对象中

1. 如果属性在对象内能找到，则返回
2. 如果属性在对象内找不到，往原型链里找

```js
var obj = { name: 'xyb', age: 20 };
obj.__proto__.lover = 'lyw'

'name' in obj;	// true		-----来自实例
'age' in obj;	// true		-----来自实例
'sex' in obj;	// false	-----找不到
'hbooy' in obj;	// false	-----找不到

// 往原型链里找属性
'lover' in obj  // true		-----来自原型
```

`for in 的用法`

使用for in 循环时，返回的所有的属性都是能够通过对象访问，**可以被枚举**的对象，包括原型链

```js
var obj = { name: 'xyb', age: 20 };
obj.__proto__.lover = 'lyw'

for(let v in obj) {
    console.log(v)
}
// name age lover
```

`Object.keys()`

返回一个包含当前对象所有**可被枚举**的属性的数组，不包括原型链

```js
var obj = { name: 'xyb', age: 20 };
obj.__proto__.lover = 'lyw'

console.log(Object.keys(obj))
// Array [ "name", "age" ]
```

`Object.getOwnPropertyNames()`

返回一个包含当前对象所有**可/不可被枚举**的属性的数组，不包括原型链

```js
var obj = { name: 'xyb', age: 20 };
obj.__proto__.lover = 'lyw'

Object.getOwnPropertyNames(obj)
// Array [ "name", "age" ]
Object.getOwnPropertyNames(obj.prototype)
// Array(14) [ "toSource", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "__defineGetter__", "__defineSetter__", "__lookupGetter__", … ]
```

#### 原型模式语法

1. 基本语法

   ```js
   function Person() {
   };
   
   Person.prototype.name = 'xyb';
   Person.prototype.age = 20;
   Person.prototype.gener = 'M';
   Person.prototype.sayHi = function () {
       console.log('hi')
   }
   
   let people1 = new Person();
   console.log(people1.name);      // xyb
   console.log(people1.age);       // 20
   console.log(people1.gener);     // M
   people1.sayHi();                // hi
   ```

2. 更简洁的写法

   ```js
   function Person() {
   };
   
   Person.prototype = {
       constructor: Person,          // 原生的原型默认都是有 constructor 这个构造函数指回函数
       name: 'xyb',
       age: 20,
       gener: 'M',
       sayHi: function () {
           console.log('hi')
       }
   }
   
   let people1 = new Person();
   console.log(people1.name);      // xyb
   console.log(people1.age);       // 20
   console.log(people1.gener);     // M
   people1.sayHi();                // hi
   ```

   这种写法要注意给原型添加 **constructor** 属性指回构造函数



原型模式的优点和缺点：

- 优点：能够让所有的实例共享相同的属性和方法，不用重复给每个实例创建方法，节省内存
- 缺点：每个实例不能拥有自己的属性（引用类型回被互相修改）

### 【构造函数+原型】模式

该模式结合了构造函数和原型模式的优点和精华，是**最广泛，认同度最高**的一种**创建自定义类**型的方法。

- 构造函数：用于定义各自实例的属性

- 原型模式：用于定义共享的方法和属性

  ```js
  function Person(name, age, sex) {
      this.name = name;
      this.age = age;
      this.sex = sex;
  }
  
  Person.prototype = {
      constructor: Person,
      sayHi: function () {
          console.log('Hi~')
      }
  }
  
  let person1 = new Person('xyb', 20, 'M');
  let person2 = new Person('lyw', 19, 'F');
  console.log(person1.name);
  console.log(person2.name);
  ```


### 稳妥构造函数模式

稳妥对象：*没有公共属性，其方法也不引用 this* ，稳妥对象最适合在一些`安全的环境`中（这些**环境禁止使用    this和 new** ），或者放置数据被其他应用程序改动时使用

```js
function Person(name, age) {
    let obj = new Object();
    obj.sayAge = function () {
        console.log(age);
    }
    obj.changeAge = function () {
        age += 20
    }
    return obj
}

let xyb = Person('xyb', 20);
xyb.sayAge();       // 20
xyb.changeAge();    // 20 +20 = 40
xyb.sayAge();       // 40
```

- 这种模式最大的好处：外部没法访问内部的 **name** 和 **age** 属性，只能通过 `sayName` 和 `changeAge` 这两个方法来访问或修改内部的属性

# 五，继承

什么是面向对象？

1. 面向对象是一种编程思想，JS本身就是基于面向对象构建出来的（例如：JS中有很多内置类，像Promise这个ES6中新增的内置类一样，我们可以基于 new promise来创建一个实例，来管理异步编程，我在项目中也经常用它，并且研究过它的源码...），我们平时用的 Vue/React/JQuery也是基于面向对象构建出来的，他们都是类，平时开发的时候都是创建他们的实例来操作的：当然我自己也在真实的项目中，封装过一些组件插件(例如 拖拽丶DIALOG...)，也是基于面向对象开发的，这样可以创建不同的实例，来管理私有的属性和方法，很方便......
2. JS中的面向对象，和其他编程语言还是略微有点不同的，JS中类和实例是基于原型和原型类机制来进行处理的：而且JS中关于类的重载吗，重写，继承也和其他语言不太一样...

封装：低耦合高内聚（把实现某一个功能的函数代码进行整合封装）

多态：重载和重写

- 重载：方法名相同，形参或者类型不一样（JS不存在真正意义上的重载）

  ```js
  // 重载只有在后台才有，为了解决一个非常复杂的方法，把其分成多个方法没根据参数类选方法
  public void sum(int x, int y, int z) {}
  public void sum(int x, int y) {}
  public void sum(int x) {}
  
  sum(10)			    // 找第三个方法
  sum(10, 20)			// 找第二个方法
  sum(10, 20, 30)		 // 找第一个方法
  
  // JavaScript里面没有重载这个概念，函数回相互覆盖
  function sum(x, y) {console.log(1)}
  function sum(x, y, z) {console.log(2)}
  
  sum(10, 20)			// 2
  sum(10, 20, 30)		// 2
  ```

- 重写：在类的继承当中，子类可以重写父类中的方法

继承：子类继承父类中的属性和方法（目的是让子类的实例能够调取父类中的属性和方法）

### 原型继承

> 让父类中的属性和方法在子类实例的原型链上

特点：

1. 不像其他语言中的继承一样（其他语言的继承是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝到一份到子类中，供子类的实例调取使用），它把父类的原型放到子类实例的原型上，实例像调取这些方法，是基于`__proto__` 原型链的查找机制完成的
2. 子类可以重写父类上的方法（这样会导致父类其他的实例也受到影响）
3. 父类中私有或者共有的属性方法，最后都会变成子类中共有的属性和方法

```js
function Father() {
    this.name = 'father';
}
Father.prototype.fatherMethod = function () {
    console.log('我是父亲')
    console.log(this.name);
}

function Son() {
    this.name = 'son';
}
Son.prototype = new Father();
Son.prototype.sonMethod = function () {
    console.log('我是父亲')
}

var son = new Son();
son.fatherMethod()
```

原型继承最大的问题：

1. 包含引用类型值的原型，被多个实例共享会发生互相被修改值的情况
2. 在创建子类型的实例时：不能向父类型的构造函数中传递参数

### call继承 

把父类用 call 方法在子类的代码中当普通函数执行，让 Parent 中的 this 指向子类实例，相当于给子类的实例设置了很多私有属性和方法，但是：

1. 只能继承父类私有的属性和方法，不能继承原型链上的共有方法（只是把父类当普通函数执行）

2. 父类私有的属性变成子类私有属性

   ```js
   function Father() {
       this.name = 'father';
   }
   function Son() {
       Father.call(this)	// this.name = 'father' 执行之后 所有实例的name都是'father'了
   }
   var son = new Son();
   console.log(son.name);
   ```

   

### 寄生组合继承

- ##### 寄生式继承

  创建一个用于封装过程的函数，该函数的内部以某种方式类增强对象（类似于继承），最后返回该对象

  ```js
  function createAnother(org) {
      var clone = Object(org);
      clone.sayHi = function () {
          alert('666')
      }
      return clone
  }
  
  var person = {
      name: 'xyb'
  }
  
  var anotherPerson = createAnother(person);
  
  console.log(anotherPerson);
  anotherPerson.sayHi()  // hi
  ```

  寄生模式其实就是给实例添加私有的方法，与构造函数相类似，不能做到实例方法的复用而降低效率

- ##### 寄生组合继承

  `组合继承的缺点`：

  组合继承时JavaScript中最常用的继承模式，但是他也有自己的不足：

  组合继承最大的不足就是**无论在什么情况**下，都会**调用两次**超类型构造函数，

  1. 一次在创建子类型原型的时候

  2. 另一次是子类型的构造函数内部

     ```js
     function Father(name) {
         this.name = name;
         this.hobby = ['钱', '女朋友', '好身体'];
     }
     
     Father.prototype.sayHi = function () {
         console.log('Hi~')
     }
     
     function Son(name, age) {
         Father.call(this, name);				// 第一次调用
         this.age = age;
     }
     	
     Son.prototype = new Father();				// 第二次调用
     Son.prototype.constructor = Son;
     Son.prototype.sayHello = function () {
         console.log('Hello~')
     };
     
     let son = new Son('xyb', 20)
     ```

  `完美的寄生组合继承`：

  所谓的寄生组合继承，就是通过借用构造函数类继承属性，通过原型链的混成形式来继承方法

  其背后的思路是：不必为了指定子类的原型而调用父类的构造函数，我们所需的无非就是**父类原型的一个副本**而已，把父类原型上的方法寄生到一个新的对象上，并将该对象的constructor属性指回子类，并称为子类的构造函数，不就完美的继承了父类的属性（变成实例私有的），完美继承了父类原型链上的方法（只调用了一次父类的构造函数）
  
  **inheritPrototype()** 把父类的方法寄生（继承）到一个自定义原型（对象）上
  
  ```js
  function inheritPrototype(son, father) {
      let prototype = Object(father.prototype);
      prototype.constructor = son;
      son.prototype = prototype;
  }
  ```
  
  - 该方法传入两个参数：一个子类，一个父类
  - 该方法实现的功能：
    1. 把父类**原型重新拷贝**一份（不用为了继承父类方法而重新new一次父类的构造函数）
    2. 新拷贝的原型里的 **constructor** 指回子类
    3. 子类的原型等于拷贝的原型（变相继承了父类的方法）
  
  整个寄生组合继承代码如下：
  
  ```js
  function inheritPrototype(son, father) {
      let prototype = Object(father.prototype);
      prototype.constructor = son;
      son.prototype = prototype;
  }
  
  
  function Father(name) {
      this.name = name;
      this.hobbies = ['健康', '女朋友', '钱']
  }
  
  Father.prototype.sayHi = function () {
      console.log('Hi~');
  }
  
  function Son(name, age) {
      Father.call(this, name);		// call 方法继承了父类的属性，并且变成实例私有属性
      this.age = age;
  }
  
  inheritPrototype(Son, Father);		// 寄生函数把父类的原型copy一份作为子类的原型，实现继承
  let xyb = new Son('xyb', 20);
  
  console.log(xyb);
  ```
  
  ![1577694022308](/assets/JSBase.assets/1577694022308.png)
  
  更完整，简洁的写法
  
  ```js
  function Father(name) {
      this.name = name;
      this.hobbies = ['健康', '女朋友', '钱']
  }
  
  Father.prototype.sayHi = function () {
      console.log('Hi~');
  }
  
  function Son(name, age) {
      Father.call(this, name);
      this.age = age;
  }
  
  Son.prototype = Object.create(Father.prototype);  // create的作用是创造一个对象，其原型是参数
  Object.defineProperty(Son.prototype, 'constructor', {
      value: Son,
      enumerable: false
  })
  let xyb = new Son('xyb', 20);
  console.log(xyb);
  ```
  
  - **Object.create(参数)**
  
    create 的作用是，创建一个对象，并且把预先传入的参数作为该对象的原型
  
    ![1577695729386](/assets/JSBase.assets/1577695729386.png)

# 六，ES6的语法

### var的缺点

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

### let/const

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

### 箭头函数及THIS

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

### Arry|Obj解构

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

### ES6的**`...`**运算符

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

### class创建类

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
  
  // 继承父类
  class Father {
    constructor(name, age) {
      this.name = name
      this.age = age
    },
    sayHi() {
      console.log(1)
    }
  }
  
  class Son extends Father {		// extends继承父类私有方法
    constructor(name, age, sex) {
      super(name, age)	// 继承父类私有属性
      this.sex = sex
    }
  }
  
  let son = new Son('xyb', 20, 'M')
  
  let person1 = new Person('xyb', 20);
  person1.sayHi()     // Hi~
  person1.myFunc()    // 报错，只能 Person.myFunc() 这样调用
  ```

### 模板字符串

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

  

### 数组对象扩展方法

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

### 数组高阶方法

### filter

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

#### 使用

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

### map

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

#### 使用

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

### reduce

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

#### 使用

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