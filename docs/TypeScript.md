---
id: typescript
title: TypeScript笔记
---

# TypeScript

![image-20220321153406881](/assets/typescript.assets/image-20220321153406881.png)

## 一.数据类型

### 1.类型断言

当你比TS更加了解一个变量的类型时，可以告诉编译器这个变量就是这个类型，让编译通过

有两种形式：

1. `<type>`变量

   ```ts
   let someValue: any = "this is a string";
   
   let strLength: number = (<string>someValue).length;
   ```

2. 变量 as type

   ```ts
   let someValue: any = "this is a string";
   
   let strLength: number = (someValue as string).length;
   ```

:key: 用断言可以绕开接口的类型检测

```ts
interface myObj {
    name: string,
    age: number
}

// 传入fn函数的第一个参数：必须是带有name属性,age属性，并且属性的类型要满足定义的接口
function fn(obj: myObj): void {
    // ...
}

// 此处对象字面量多传入了sex属性, 编译会报错
fn({ name: 'xyb', age: 20, sex: 'M' })	// 编译错误， sex是未知属性

// 使用断言绕开
fn({ name: 'xyb', age: 20, sex: 'M' } as myObj)	// 成功
```



### 2.JavaScript数据类型

### -数字

和javascript里的数组类型相同

```ts
let val1: number = 20;
let val2: number = 0xf00d;
let val3: number = 0b1010;
```

### -字符串

可以用 单引号，双引号和模板字符串 表示字符串

```js
let str1: string = 'aaa'
let str2: string = "bbb"
let str3: string = `i'am ${str1}`
```

### -布尔值

只有true和false两种值

```js
let trueV: boolean = true
let falseV: boolean = false
```

### -undefined和null

是任何类型的子类型；特征和JS的相同，可以被任何类型接收

```js
let val1: string = null
let val2: number[] = undefined
```

### -array

有两种方法可以定义数组

1. 在类型后面加上`type[]`

   ```ts
   let arr1: number[] = [1, 2, 3, 4]	// 只能存放数字
   let arr2: string[] = ['1', '2', '3']	// 只能存放字符串
   let arr3: object[] = [[], [1, 2, 5, 4], {}]	// 只能存放应用数据类型
   let arr4: any[] = [1, '2', false, new Object(), [11, 2]]	// 能存放任何数据类型
   ```

2. 使用泛型数组 `Array<type>`

   ```ts
   let arr1: Array<number> = [1, 2, 3, 4]	// 只能存放数字
   let arr2: Array<string> = ['1', '2', '3']	// 只能存放数字
   let arr3: Array<object> = [[], [1, 2, 5, 4], {}]	// 只能存放数字
   let arr4: Array<any> = [1, '2', false, new Object(), [11, 2]]	// 只能存放数字
   
   let arr: Array<string | number> = ['1', '2', '3', 5]	// 既能存放数字,也能存放字符串
   let b: Array<string | number | object> = ['1', '2', '3', 5]	// 既能存放数字,也能存放字符串,和对象
   ```

:zap: 只读数组

> 可以确认数组被创建后，永远不会被修改（这个类的本质是移除了原型上所有能修改数组的方法）

```js
let arr: Array<number> = [1, 2, 4]
let arr2: ReadonlyArray<number> = [1, 2, 3, 4]

arr[0] = 1  // 允许
arr = arr2  // 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"
arr2[0] = 1 // 类型“readonly number[]”中的索引签名仅允许读取
```



### -object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

### 3.TypeScript数据类型

### -元组类型

用来表示一个已知长度和类型的数组，数组的长度和类型都是固定不变

```ts
let tuple: [number, string, boolean] = [1, 'aa', true]

tuple[0] = 10
tuple[0] = '10' // 不行,元组的第0项数据类型必须是number

tuple[1].substring(0, 6)  // ok, string类型有substring属性
tuple[1].toFixed() // 不行,number类型没有toFixed方法

tuple[3] = 20 // 不行,元组定义了长度为3,数组越界了
```

### -枚举类型

枚举类型能让变量更加清晰，为一组数值赋予美好的名字

```ts
enum Color { Red, Green, Blue } 
// => Color = {0: 'Red', 1: 'Green', 2: 'Blue', Red: 0, Green: 1, Blue: 2}

let colorName: string = Color[2];	// Color[2] = 'Blue'

// 第一种情况
enum aa {
  one,		// 0
  two,		// 1
  three,	// 2
  four		// 3
}

// 第二种情况
enum bb {
  one = 1,		// 1
  two,		    // 2
  three,	    // 3
  four		    // 4
}

// 第三种情况
enum cc {
  one = 1,		  // 1
  two,			  // 2
  three = 99,	  // 99
  four			  // 100
}
```

### -any类型

代表任何类型；当我们不知道一个变量的类型时，可以使用any类型，他能被任何类型接收

```ts
let val1: any = 10
let val2: any = [1, '2']
let val3: any = {name: 111}
```

### -void类型

表示没有任何类型；当一个函数没有返回值，可以使用`void`类型

```ts
function fn(): void {
    // do something...
    return

    return 1 // 报错,void代表没有返回值
}

// void类型只能接收undefined和null
let val: void = undefined 
let val: void = null
```

### -never类型

表示永远没有类型；

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### -unknow

> 未知类型，当我们不知道这个值是什么类型，使用unknown，而不是any

1. unknow类型不能直接赋值给别的类型（如果需要，进行类型检查）
2. unknow是上了安全锁的any类型（给别的类型赋值会报错，any不会）

```ts
// 1. 当unknown类型的值赋值给别的类型时,会报错,而且any不会报错
let b: number = 20
let c: unknown = 'string'		// 使用unknow
b = c		// 报错！！

let b: number = 20
let c: any = 'string'				// 使用any
b = c		// 不会报错！！

// 2. 如果要把unknown赋值给别的类型
let a: string
let b: number
let c: boolean
let d: unknown = 100
if(typeof d === 'string') {
  // do something
  a = d
} else if(typeof d === 'number') {
  // do something
  a = d
} 
```



## 二.接口

### 1.对象类型定义

接口的作用：约束的作用。接口定义一套规则，套用这个规则的值或对象要满足接口的定义

### -必要属性

接口定义了必要属性，在给定值时必须给值

```ts
interface myObj {
    name: string,
    age: number
}

// 传入fn函数的第一个参数：必须是带有name属性,age属性，并且属性的类型要满足定义的接口
function fn(obj: myObj): void {
    console.log(obj.name)	// 'xyb'
    console.log(obj.age)	// 20
    console.log(obj.sex)	// 编译会报错。访问被接口约束的对象只能访问接口内有的值

}

// 传入的o,ts不会检查不存在的属性,只会检查接口定义的属性是否存在
let o = { name: 'xyb', age: 20, sex: 'M' }
fn(o)

// 如果是以对象字面量的形式传入，则会检查多余的属性
fn({ name: 'xyb', age: 20, sex: 'M' })	// 编译错误， sex是未知属性
```

### -可选属性

接口可以定义可选属性，这些值可以给定也可以不给定

```ts
interface myObj {
    name?: string,
    age?: number
}

function fn(obj: myObj): void {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.sex)	// 编译报错,myObj接口只定义了name和age属性
  console.log(obj.aaaa)	// aaaa属性不存在,编译报错
}

let o = { name: 'xyb', sex: 'M' }	// sex是多传的,ts不会检查多传的值
fn(o)
```

### -可读属性

接口若定义了可读属性，属性值只能在最开始的时候被改变

```ts
interface SquareConfig {
  readonly color: string
  readonly age: number
  sex: string
}

let val: SquareConfig = { color: 'xyb', age: 20, sex: 'M' }

val.color = 4 // 编译错误，无法分配到 "color" ，因为它是只读属性。
val.sex = 'F' // ok
```

### -额外属性

若接收的在接口中不存在，ts则会报错，像下面这样：

```ts
interface myObj {
    name: string,
    age: number
}

function fn(obj: myObj): void {
	// ....
}

fn({ name: 'xyb', age: 20, sex: 'M' })	// 编译错误， sex是未知属性
```

如何让其绕开其他属性的检测：

1. 使用断言

   ```ts
   fn({ name: 'xyb', age: 20, sex: 'M' } as myObj)	// 编译错误， sex是未知属性
   ```

2. 使用字符串索引签名

   ```ts
   interface myObj {
     name: string,
     age: number
   }
   
   let obj1: myObj = {name: 'aaa', age: 20, sex: 20} // 报错
   ```

   ```ts
   interface myObj {
     name: string,
     age: number,
     [propName: string]: any
   }
   
   let obj1: myObj = {name: 'aaa', age: 20, sex: 20} // 成功
   ```

   上面代码的意思是，允许接口接收任意 `属性名:string = any` 的其他属性 

3. 使用变量来接收

   ```ts
   let obj: object = { name: 'xyb', age: 20, sex: 'M' }
   fn(object)	// 编译错误， sex是未知属性
   ```

   

### 2.函数类型定义

首先需要定义一个函数接口

```ts
interface myFn {
  (name: string, age: number, sex: 1 | 2): string
}
```

三种用接口定义函数的方式:

1. 与接口变量名相同，类型相同

   ```ts
   let fn1: myFn = function (name: string, age: number, sex: 1 | 2): string {
     return `${name} : ${age} : ${sex == 1 ? 'M' : 'F'}`
   }
   fn1('xyb', 20, 1)
   ```

2. 与接口变量名不同

   ```ts
   // 修改函数形参名
   let fn2: myFn = function (a: string, b: number, c: 1 | 2): string {
     return `${a} : ${b} : ${c == 1 ? 'M' : 'F'}`
   }
   fn2('xyb', 20, 1)
   ```

3. 与接口参数名不同，省略类型，ts会自动检查

   ```ts
   // 修改形参名,省略类型
   let fn3: myFn = function (a, b, c) {
     return `${a} : ${b} : ${c == 1 ? 'M' : 'F'}`
   }
   fn3('xyb', 20, 1)
   ```

   

### 3.可索引类型定义

为可索引类型定义接口，可索引类型列如数组：`num[0], num[1]`，对象：`obj['name'], obj['age']`

:one: 定义一个只能存在数字和字符串的数组

```ts
// 表示用下标索引只能得到数字和字符串值
interface StringAndNumberArray {
  [index: number]: string | number
}

let arr: StringAndNumberArray = [1, 4, 5, '00']	// 数组只能存放数字和字符串
```

:two: 使用字符串索引描述对象

```ts
interface NumberDictionary {
  [index: string]: string
  length: string;    // 可以，length是number类型
  name: string
  age: string
}

let obj: NumberDictionary = {name: 'xyb', age: '20', length: '20'}
```

:three: 设置索引签名为只读

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

### 4.接口类定义

强制让一个类实现某种契约，比如定义了链表接口，那链表类必须实现接口类定义的那些方法

:one: 定义实例的接口

```ts
interface myObj {
  name: string
  age: number
  getName(): string
}

class A implements myObj {
  name: string
  age: number
  sex: boolean

  constructor(name: string, age: number, sex: boolean) {
    this.name = name
    this.age = age
    this.sex = sex
  }

  getName() {
    return this.name + this.age + this.sex
  }
}
```

:two: 定义constructor接口

> counstructor属于类的静态部分，需要进行额外的定义，不能再一个接口中定义

```js
// 错误的方法
interface myNew {
  new(name: string, age: number)  // 约束constructor
}

class A implements myNew {
  constructor() {}
}
```

```ts
// 正确的方法 
// 这个接口的实现只能被 new 调用
interface myNew {
  new(name: string, age: number)  // 约束constructor
}

interface myClass {
  name: string
  age: number
  getInfo(): string
}

class A implements myClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  getInfo(): string {
    return this.name + this.age
  }
}

function fn(myClass: myNew, name: string, age: number) {
  return new myClass(name, age)
}

let obj = fn(A, 'xyb', 20)
```



### 5.接口继承

从一个接口里复制成员到另外一个接口中，支持同时继承多个接口

```ts
interface A {
  name: string
}

interface B {
  age: number
}

interface C extends A, B {
  sex: boolean
}

let a = <C>{}
a.name = 'xyb'  // ok
a.age = 20  // ok
a.sex = true

// a.aa = 20 // 无法赋值，按接口A定义的对象不存在aa属性
```

### 6.混合类型

让一个对象上面能有多种类型，最典型的例子就是一个对象既能够当函数使用，也能当对象使用

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (a: number) {
    return '接口定义了必须返回string'
  }
  counter.interval = 111
  counter.reset = function () { }

  return counter
}

let co = getCounter()
co(11111)
co.reset()
co.interval = 9999
```

### 7.接口继承类

接口继承类时，会继承类的全部private和protected成员；

所以其他类实现这个继承接口时，若不先继承最开始接口继承的类，就不能接口继承的private和protected成员，Ts就会报错，所以这种继承类的接口只能是最开始类或是其子类才能实现这个接口

```ts
// 类，具有私有属性name
class Class1 {
    private name: 'xyb'
}

// 接口，继承了类
interface interFace1 extends Class1 {
    select(): void
}

// 实现了一个Class1的子类，实现了接口interFace1
class Button extends Class1 implements interFace1 {
    select(): void { } // select是接口规定必须实现的
}

// 实现了一个Class1的子类，继承了Class1
class TextBox extends Class1 {
    // 没有实现接口，所以不用实现select
}

// 错误，无法实现接口继承的私有属性name，只能是Class1的子类或者是Class1才能实现接口Class1
class B implements interFace1 {
    // name: string
    name: 'xyb'
    select(): void {
    }
}
```

## 三.类

### 1.定义基础类

定义的方法和JavaScript相同，如下：

```ts
class Personal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  getInfo(): string {
    return this.name
  }
}

let a = new Personal('xyb')
```

:star2: 注意！在TS中定义一个类，实际上会创造出两个东西：

1. 类的实例类型
2. 类的实例

拥有静态属性的代码编译成JS之后是这样的：

```ts
// TS
class Personal {
  static age: number = 20

  static getInfo(): number {
    return Personal.age
  }
}

let a = new Personal()
let b: typeof Personal = Personal
b.age = 30

// JS
exports.__esModule = true;
var Personal = /** @class */ (function () {
    function Personal() {
    }
    Personal.getInfo = function () {
        return Personal.age;
    };
    Personal.age = 20;
    return Personal;
}());
var a = new Personal();
var b = Personal;
b.age = 30;

```

会得到一个构造函数**Personal**，而这个构造函数上包含所有的静态方法和属性，可以说类具有**实例部分**与**静态部分**这两个部分，另外使用 `typeof Personal` 可以获得Personal类的类型，这样就能拿到我们定义的类从而能修改**age**的值

### 2.继承类

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  getInfo(): string {
    return 'Person: ' + this.name + this.age
  }
}

class A extends Person {
  sex: string

  constructor(name: string, age: number, sex: boolean) {
    super(name, age)
    this.sex = sex == true ? 'M' : 'F'
  }

  getInfo(): string {
    return 'A: ' + this.name + this.age + this.sex
  }
}

let p1: Person = new A('xyb111', 30, true)	// 就算声明了Person类,但是new的是子类A的实例
let p2 = new A('xyb222', 20, false)

console.log(p1.getInfo())
console.log(p2.getInfo())
```

### 3.共有属性

TS不严格要求定义 `public` 关键字，所有默认的属性都是public

```ts
class Person {
    name: string
}

// 两者是等价的
class Person {
    public name: string
}
```

### 4.私有属性

使用关键字 `private` 定义私有属性只能实例内部访问，外部无法访问私有属性

```ts
class Person {
  public name: string
  private age: number

  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

let women = new Person('aaa', 20)
women.age // 错误
women.name  // 'aaa'
```

:key: 就算是子类，也不能访问私有属性

![image-20220323153944901](/assets/typescript.assets/image-20220323153944901.png)

### 5.受保护属性

使用关键字 ``protected`` 定义，和私有属性唯一不同就是能被子类访问

![image-20220323154610684](/assets/typescript.assets/image-20220323154610684.png)

:key: 使用 `protected` 保护构造函数，使其只能被用来继承，而不能用来实例化

![image-20220323154448611](/assets/typescript.assets/image-20220323154448611.png)

### 6.readonly修饰符

![image-20220323154902671](/assets/typescript.assets/image-20220323154902671.png)

### 7.参数属性

定义实例属性，我们需要分成两步走：先**定义属性**，**再赋值**，像这样：

```ts
class Person {
    public name: string
    constructor(name: string) {
        this.name = name
    }
}
```

使用参数属性能直接一步到位，直接能创建和初始化成员**name**

```ts
class Person {
  constructor(public name: string) { }

  getName(): string {
    return this.name
  }
}

let a = new Person('xyb')
console.log(a.name) // 'xyb
```

### 8.存取器get/set

TS支持通过**getter**，**setter**来截取对成员对象的访问

没有getter和setter：

```js
class Person {
  money: number
}

let man = new Person()
// 可以轻易修改属性值
man.money = 10000
man.money = 10
```

用**getter**和**setter**截取对成员对象的访问

```ts
let password = 1233456789

class Person {
  private _money: number

  get money(): number {
    return this._money
  }

  set money(num: number) {
    if (password && password == 1233456789) {
      this._money = num
    } else {
      console.log('密码错误,不能修改')
    }
  }
}

let man = new Person()
man.money = 10000
console.log(man.money)  // 10000

password = 222
man.money = 50000000000
console.log(man.money)  // 10000
```

### 9.静态属性

使用 `static` 设置， 存在于类本身上的属性，而不是实例上

```ts
class Person {
  // 静态属性
  static val = 666
    
  // 静态方法
  static haha() {	
    console.log('haha')
  }
}

Person.haha()

export {}
```

:bulb: 使用 `typeof Class` 获取类的构造函数部分，这个构造函数包含了类的所有静态属性

```ts
let p: typeof Person = Person	// 只有这种方式才能获取到Person类本身
let p: Person = Person // 这种方式是不行的!
p.val = 999
```

###  10.抽象类

抽象类一般作为其他子类（派生类）的基类（父类使用），不可被实例化；不同于接口的是抽象类的方法可以具体实现

```ts
abstract class Person {
  constructor(public name: string, public age: number) { }

  // 抽象类的方法可以具体实现，而接口不行
  getName(): void {
    console.log(this.name)
  }

  abstract getAge(): void
}

class Student extends Person {
  constructor(name: string, age: number, public sex: boolean) {  
    super(name, age)
  }

  getAge() {
    return this.age
  }

  getSex() {
    console.log(this.sex)
  }
}

// let one = new Person()  // 无法实现抽象类实例化
let one: Person = new Student('xyb', 20, true)
one.getAge()
one.getName()
one.getSex()  // 应为one是引用了抽象类,而抽象类上不存在getSex,所以不能调用
```

### 11.把类当成接口

把类当成接口使用，也就是可以把类的类型拿过来用，而非类的实现拿来用。

```ts
class Person {
  name: string
  age: number
}

interface Student extends Person {
  sex: boolean
}

let a: Student = { name: 'xxx', age: 20, sex: true }
```

## 四.函数

函数的定义和JS的类似，分为有名函数和匿名函数

```ts
let fn = function() {}

function fn() {}
```

### 1.定义函数类型

一个函数完整的类型定义分为两部分：

1. 参数的类型
2. 返回值的类型（一般省略，TS会自动推断）

```ts
// 基础写法
function getInfo(name: string, age: number): string {
  return name + age
}

// 使用参数列表写出参数类型
let getInfo: (name: string, age: number) => string = function (x: string, y: number) {
  return x + y
}
// 就算是没有返回值也要写上void类型
let getInfo: (name: string, age: number) => void = function (x: string, y: number) {}
```

### 2.可选参数和默认参数

在TS中，函数的每个参数都是必须传值的。并且传入的值都必须与参数类型相同

![image-20220324111621028](/assets/typescript.assets/image-20220324111621028.png)

:key: 可选参数：参数可传可不传。若没传参数，默认值为underfided

> 注意：可选参数必须跟在必须参数后面

```ts
function fn(name: string, age?: number): void {
  console.log(name)
  console.log(age)	// 默认为undefined
}

fn('aa')        // 可以不传入age参数
fn('age', 20)   // 可以传入age参数
```

:key: 默认参数：默认参数会和默认值共享类型

```ts
// fn1(name: string, age?: number): void
function fn1(name: string, age = 20): void { }	// age参数的类型会和20共享,也就是number

fn1('aa')          // 可以不传入age参数
fn1('age', 'aa')   // 类型“string”的参数不能赋给类型“number”的参数


// fn2(name?: string, age?: number): void
function fn2(name = 'xyb', age?: number) { }	// name参数的类型会和'xyb'共享,也就是

fn2('aaa', 20)
fn2(30, 20)   // fn2(name?: string, age?: number): void
```

### 3.剩余参数

在TS中使用 `...ars` 来获取剩余参数，剩余参数的类型必须是数组类型。

```ts
function fn1(name: string, age: number, ...args: string[]) { }

let fn2: (name: string, age: number, ...args: any[]) => void = fn1
```

### 4.this参数

`this` 机制和JS中的基本相同，不过箭头函数当前上下文中的**this**类型需要我们手动设置，像下面这个例子一样

```ts
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: Array<string>
  cards: Array<number>
  createCardPicker(this: Deck): () => Card	// 手动设置this
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function (this: Deck) {		// 手动设置this
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

### 5.重载

TS支持类型重载，这里实现的重载本质还是一个函数内应对多种参数的不同执行情况，实现类型重载、

```ts
function reLoad(name: string, age: number): string
function reLoad(name: number, age: string): Array<string>
function reLoad(x: string | number, age: number | string): any {
  if (typeof x == 'string') {
    return '' + x + age
  } else if (typeof x == 'number') {
    return [1, 2, 4, 5]
  }
}

reLoad('xyb', 20)
reLoad(20, 'xyb')
```

## 五.泛型

泛型的作用就是可以用`变量存储类型`，以供参数使用，比方说我定义了一个泛型函数：

```ts
function fn<T>(name: T, age: T) { }

// 我想让函数内部所有泛型都变成number类型

// function fn<string>(name: string, age: string): void
let stringAll = fn<string>('aa', 'bb')	// 此处的参数只能传递string类型

// function fn<number>(name: number, age: number): void
let numberAll = fn<number>(111, 22)		// 此处的参数只能传递number类型

// function fn<boolean>(name: boolean, age: boolean): void
let booleanAll = fn<boolean>(true, false)	// 此处的参数只能传递boolean类型

// function fn<number[]>(name: number[], age: number[]): void
let arrAll = fn<number[]>([1, 2], [3, 4])
```



### 1.类型参数

泛型的作用是：**类型的参数化，能够把类型当做参数一样进行传递**。泛型能够在编译期间进行类型检查以提高类型安全，减少运行时错误

:star: 比如下面这个输入什么类型的数据，返回的就是什么类型的数据的方法：

```ts
// 输入是数字类型,返回也是数字类型
function returnArgs(arg: number): number {
  return arg
}
// 输入是字符串类型,返回也是字符串类型
function returnArgs(arg: string): number {
  return string
}
```

但是上面这样子定义就非常麻烦，我们可以用 `any` 类型

```ts
// 最简单的方法输入是任何类型，返回的也是任何类型
function returnArgs(arg: any): any {
  return arg
}
```

但是使用 any 类型之后，编译器就永远无法知道 any 的类型，因为他可以是任何值；

:key: **这个时候泛型的作用就来了：类型参数化，这是一种特殊的参数，用来表示类型用**

```ts
// 使用变量T用来存储类型，他会帮我们捕捉用户传入的类型
function returnArg<T>(arg: T): T {
  return arg
}
```

使用了泛型后，有两种方式可以使用：

1. 传入所有的参数，包括类型参数

   ```ts
   let res = returnArg<string>('aaaaa')
   ```

   ![image-20220325183546889](/assets/typescript.assets/image-20220325183546889.png)

2. 省略类型参数，不需要传入`<>`值，编译器会自己推断（更普遍）

   ```ts
   let res = returnArg('aaa') 
   ```

   ![image-20220325183722121](/assets/typescript.assets/image-20220325183722121.png)

### 2.泛型数组

你可以在TS中把**泛型变量**当成**类型**使用，例如定义一个数字数组`(number[] | Array<number>)`，用泛型变量就可以这样写：`(T[] | Array<T>)`

:key: 你想使用参数的length的方法，但是这个参数是泛型，没有length类型

![image-20220325193928091](/assets/typescript.assets/image-20220325193928091.png)

这个时候就得用泛型数组，这样就能使用数组的方法了。

```ts
function returnArg<T>(arg: T[]): T {
  let len = arg.length
  return arg[0]
}
```

![image-20220325193852892](/assets/typescript.assets/image-20220325193852892.png)

### 3.泛型函数

泛型函数和非泛型函数的区别不大，只是多一个类型参数

```ts
// 有名函数定义
function fn1<T>(name: T) {
  return name
}

// 正常方式定义
let fn2: <T>(name: T) => T = function <T>(name: T) {
  return name
}

// 可以修改类型参数标识符
let fn3: <U>(name: U) => U = function <TData>(str: TData) {
  return str
}

// 使用对象字面量定义泛型函数
let fn4: { <T>(name: T): T } = function <S>(aaaa: S) {
  return aaaa
}
```

### 4.泛型接口

把上面用对象字面量定义的泛型函数抽离成一个接口👆👆

![image-20220326153133473](/assets/typescript.assets/image-20220326153133473.png)

```ts
// 泛型接口
interface MyFanXingPort {
  <T>(args: T): T
}

function fn<T>(name: T) {
  return name
}

let myFn: MyFanXingPort = fn
```

:key: 如果想把泛型当成整个接口的一个类型参数，**提前锁定接口里泛型的类型**，可以把泛型类型定义到接口最前面

![image-20220326153039076](/assets/typescript.assets/image-20220326153039076.png)

```ts
// 把泛型参数定义到最前面
interface MyFanXingPort<T> {
  (args: T): T
}

function fn<T>(name: T) {
  return name
}

let myFn: MyFanXingPort<string> = fn
```

​	

### 5.泛型类

泛型类的定义和泛型接口定义基本相同，使用 `<>` 包裹泛型类型，类的静态部分不能使用泛型类型

![image-20220326161112775](/assets/typescript.assets/image-20220326161112775.png)

```ts

class MyClass<T> {
  name: T
  age: T

  constructor(name: T, age: T) {
    this.name = name
    this.age = age
  }

  getInfo: () => T
}

// 此处string规定了类中所有T的类型，所以只能传入string的数据
let c = new MyClass<string>('xyb', '20')
c.getInfo = function () { return this.name }

let d = new MyClass<number>('aa', 20)
```

### 6.泛型约束

给泛型添加接口约束

```ts
interface myPort {
  length: number
}

function fn<T extends myPort>(arg: T) {
  console.log(arg.length)
}

// 符合接口约束
let myFn1 = fn<string>('aaaa')
let myFn3 = fn<string[]>(['a', 'b'])
let myFn4 = fn<Array<number>>([1, 2, 4])

// 不符合接口约束，接口规定这个泛型的类型必须是带有length的值
let myFn2 = fn<number>(11111)
```

### 7.在泛型约束中使用类型参数

让一个类型参数被另外一个类型参数约束

```ts
function fn<T, TData extends keyof T>(arg: T, key: TData) {
  return arg[key]
}

// 类型TData的值只能是类型T的key
let fn1 = fn({name: 'xyb', age: 20}, 'name')
let fn2 = fn({name: 'xyb', age: 20}, 'age')

// 报错，sex不在args的keys中
let fn3 = fn({name: 'xyb', age: 20}, 'sex')
```

### 8.在泛型中使用类类型

1. 使用泛型创造工厂函数，需要引用构造函数的类类型

   ![image-20220326200653097](/assets/typescript.assets/image-20220326200653097.png)

   ```ts
   class MyClass {
     name: string
   }
   
   function create<T>(c: { new(): T }): T {
     return new c()
   }
   
   create(MyClass)
   ```

2. 使用原型属性推断并约束构造函数与类实例的关系

   ```ts
   class Class1 {
     name: string
   }
   
   class Class2 {
     age: number
   }
   
   class Base {
     total: number
   }
   
   class MyClass1 extends Base {
     source: Class1
   }
   
   class MyClass2 extends Base {
     source: Class2
   }
   
   function myFn<A extends Base>(c: new () => A): A {
     return new c()
   }
   
   myFn(MyClass1).source.name
   myFn(MyClass2).source.age
   myFn(Base).total
   
   // 报错, 只能传入Base类或者Base的子类
   myFn(Class1)
   ```

   

## 六.高级类型

### 1.联合类型

> 通俗的理解就是类型合集

如果希望一个值只能是 number 或者 string类型，就需要用到联合类型

```ts
let val: number | string = 10
val = '555'

val = boolean // 报错,联合类型只规定了number和string类型
```

:star: 如果一个值是联合类型，我们只能访问联合类型共有的属性

![image-20220329155332629](/assets/typescript.assets/image-20220329155332629.png)

### 2.交叉类型

> 通俗的类型就是类型交集

交叉类型的作用是将多个类型合并成一个类型，这让我们可以把现有的**多种类型叠加到一起成为一种类型**，它包含了所需的所有类型的特性。

```ts
class ClassOne {
  constructor(public name: string) { }
}

interface faceOne {
  age: number
  getInfo(): void
}

class ClassTwo implements faceOne {
  constructor(public age: number) { }
  getInfo() { }
}

function extend<T, U>(first: T, second: U): T & U {
  let res = <T & U>{}
  for (let pro in first) {
    (<any>res)[pro] = (<any>first)[pro]
  }
  for (let pro in second) {
    if (!res.hasOwnProperty(pro)) {
      (<any>res)[pro] = (<any>second)[pro];
    }
  }
  return res;
}

let obj = extend(new ClassOne('xyb'), new ClassTwo(20))
```

### 3.类型保护

上面的联合类型适用于一个值多种类型的情况，但是我们如果想知道一个类型确切是哪种类型，该怎么办？

```ts
interface man {
  run(): void
}

interface women {
  eat(): void
}

function getOne(): man | women {
  return
}

let one = getOne()

// 在js中通过一个对象存在的属性来判断他是哪一种类型
// 访问一个对象的属性，如果存在，则说明他是这个类型，就可以调用`slice`方法，
if (one.run) {
  one.run()
} else if (one.women) {
  one.eat()
}
```

:warning: 这是JS里常用的方法，但是在TS中会报错，因为我们**访问联合类型只能访问两者都存在的类型**

![image-20220329203255751](/assets/typescript.assets/image-20220329203255751.png)

这个报错只能通过类型断言才能通过编译

![image-20220329203743212](/assets/typescript.assets/image-20220329203743212.png)

**可以发现：为了使这一段代码工作，我们使用了非常多的类型断言**，要是在一开始就让编译器知道值的类型，就不需要后续的断言。

:key: 在TS中用类型保护机制就可以实现，类型保护就是一个表达式，如下：

![image-20220329204822322](/assets/typescript.assets/image-20220329204822322.png)

:star:TypeScript不仅知道在`if`分支里`one`是`man`类型； 它还清楚在`else`分支里，一定*不是*`man`类型，一定是`women`类型

### 4.typeof类型保护

可以直接在代码中直接使用 `typeof` x === 'number' 就能达到类型保护  

```ts
function isString(one: string | number | Array<number>): one is string {
  return typeof one == 'string'
}

function isNumber(one: string | number | Array<number>): one is number {
  return typeof one !== 'number'
}

if (isString(one)) {
  // one: string
} else {
  // one: number | number[]
}
```

:key:但是上面这样写过于臃肿，TS允许我们直接 `typeof` ，不需要用 `one is string`，像下面这样：

```ts
if (typeof one == 'string') {
  // one: string
} else if (typeof one == 'object') {
  // one: number[]
}
```

### 5.instanceof类型保护

和 `typeof` 的用法一样，能直接在表达式里面判断

```ts
class A {
  constructor() { }
  haha() { }
}

class B {
  constructor() { }
  xixi() { }
}

function fn(): A | B {
  return Math.random() > 0.5 ? new A() : new B()
}

let obj = fn()

if (obj instanceof A) {
  // obj: A
  obj.haha()
} else if (obj instanceof B) {
  // obj: B
  obj.xixi()
} else {
  // obj: never
}
```

### 6.类型别名

使用类型别名可以给一个类型起一个新的名字

```ts
// 类型别名
type myString = string
type myNumber = number
type NumberOrStringArr = Array<number> | Array<string>

// fn(name: string, age: number)
function fn(name: myString, age: myNumber): NumberOrStringArr {
  return Math.random() > 0.5 ? [1, 2, 4] : ['aa']
}

let val = fn('xyb', 20)
```

类型别名也可以是泛型

```ts
type Tree<T> = {
  value: T
  right?: Tree<T> | null
  left?: Tree<T> | null
}

let val: Tree<string> = {
  value: 'aaa'
}
```

### 7.接口和类型别名区别

![image-20220330143056218](/assets/typescript.assets/image-20220330143056218.png)

### 8.字符串字面量类型

在类型中可以直接跟上具体的字符串值进行限制

```js
type myString = 'aa' | 'bb' | 'cc'

let a: myString = 'ww'  // 错误

let b: myString = 'aa'  // 正确
let c: myString = 'bb'  // 正确
let d: myString = 'cc'  // 正确
```

### 9.数字字面量类型

在类型中可以直接跟上具体的数字进行限制

```ts
function fn(age: 20 | 21 | 22) { }

// 类型“99”的参数不能赋给类型“20 | 21 | 22”的参数
let f = fn(99)

fn(20)
fn(21)
fn(22)
```

### 10.可辨识联合

可以使用类型 + 具体的值定义接口

```ts
interface Square {
  kind: "square"
  size: number
}

interface Rectangle {
  kind: "rectangle"
  width: number
  height: number
}

interface Circle {
  kind: "circle"
  radius: number
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}
```

### 11.this类型

this类型只能在类或者接口的非静态成员中使用，的当前函数可以返回当前函数内部的this，这在类里面还很好用，可以实现链式调用

```ts
class A {
  public constructor(public name: string, public age: number) { }

  public getName(): this {
    console.log(this.name)
    return this
  }

  public getAge(): this {
    console.log(this.age)
    return this
  }
}

let a: A = new A('xyb', 20)

a.getAge().getName()
```

### 12.索引类型

1. ##### 索引类型查询操作符

   使用 `keyof T` 关键字，能够得 `T` 上所有已知可访问属性

   ```tsx
   interface obj {
     name: string,
     age: number,
     sex: boolean
   }
   
   // keyof obj相当于联合类型 (name | age | sex)
   let o1: keyof obj = 'name' 
   let o2: keyof obj = 'age' 
   let o3: keyof obj = 'sex' 
   // 违法
   let o4: keyof obj = 'www'
   ```

2. ##### 索引访问操作符

   返回类型 `T[K]` 限制了 `obj[keys]` 只能访问到 `obj` 自己身上的属性，因为有 `T` 的限制

   ```tsx
   // 限制keys的参数只能是T上所有可访问的属性
   function fn<T, K extends keyof T>(obj: T, keys: K): T[K] {
     return obj[keys]
   }
   ```

3. ##### 索引类型和字符串索引签名

   `keyof`和`T[K]`与字符串索引签名进行交互。 如果你有一个带有字符串索引签名的类型，那么`keyof T`会是`string`。 并且`T[string]`为索引签名的类型：

   ```ts
   interface Map<T> {
       [key: string]: T;
   }
   let keys: keyof Map<number>; // string
   let value: Map<number>['foo']; // number
   ```

   

### 13.映射类型

映射属性可以批量操控一个类型上属性的类型，例如：

```ts
type aa = {
  name: string,
  age: number,
  sex: boolean
}

// 传入的类型会被赋值一份，这份TypeA的所有属性都是可选且类型为string
type TypeA<T> = {
  [P in keyof T]?: string
}

/**
 * TypeA<aa> = {
 *   name: string,
 *   age: string,
 *   sex: string
 * }
 */

let val: TypeA<aa> = {
  name: '',
  // age: 88   // 报错
  age: '',
  sex: ''
}
```

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// 等同于
type Flags = {
    option1: boolean;
    option2: boolean;
}
```

