---
id: regexp
---

# 正则表达式

> regular expression : RegExp : 是用来处理字符串的规则, 只能处理字符串
>
> 正则的主要用途:
>
> 1. 验证字符串是否符合某个规则 ( test )
> 2. 把字符串中符合规则的内容捕捉 ( exec / match ... )

```js
let str1 = 'today is good, hahaha, l have let it go';
let str2 = '1 is good, 2, l have let it go 3';

// 正则式用来指定规则的 (test方法用来验证, \d+表示有没有连续的数字, 1个数字也算)
let reg = /\d+/;
reg.test(str)	// => false

// 正则式用来捕获字符 (exec/match进行捕获)
reg.exec(str2) // => Array: [0: '1', index: 0, input: '1 is good, 2...']

```

## 一.创建正则表达式

### 1.方法一: 字面量

```js
let reg = /\d+/;
```

### 2.方法二: 构造函数

```js
// => 构造函数模式创建  需两参数: 元字符字符串(特殊字符需要转移), 修饰符字符串
let reg = new RegExp('\\d+', 'i');
```

### 两种方式的区别

> ### 在JavaScript字符中, 也有转义字符, 比如 "\n"是换行, "\t"是一个制表符等等
>
> 1. 如果使用 new RegExp的方式创建, 必须把字符串中的转义字符进行转移, 才能创造除字符串对象, 不然传入的就是一个换行, 或者是四个空格
> 2. 使用 / / 的方法创建, JS会帮我们进行处理, 把其看待成元字符, 所以可以直接写 \d, \w等

`方法二的独特之处`

```js
// 如果我们想把变量(不确定值), 作为正则表达式的匹配规则, 其内容会变化

let name = '我是正则'
let reg = /^\d+name\d+$/i													// 无法做到
reg = new RegExp(`^\\d+${name}\\d+$`, 'i')			// 完美胜任
console.log(reg.test('123我是正则456'))	// => true
console.log(reg.test('aan我是正则456'))	// => false
```



## 二.正则表达式组成

### 1.元字符

------

#### 量词元字符

> 用来设置出现的次数

1. `*` 	   代表 **0 ~ ∞** 次
2. `+`        代表 **1 ~ ∞** 次
3. `?`        代表 **0 或 1** 次
4. `{n}`    代表出现 **n** 次
5. `{n,}`  代表 **n ~ ∞** 次
6. `{n,m}` 代表 **n ~ m** 次

------

#### 特殊元字符

> 单个或者组合在一起代表的特殊含义

单个

1. `\` 		**转义**字符 ( 普通 => 特殊 => 特殊 )
2. `.`         可以代表除 \n ( 换行符 ) 以外的**任意字符**
3. `^`         以哪一个元字符匹配作为**开始**
4. `$`         以哪一个元字符匹配作为**结尾**
5. `|`         **逻辑或**字符, | 的左右两边规则都使用, \d | \ s ( 匹配一个数字或者一个空格 )
6. `[]`       **成员**字符, 在 [ ] 中出现的的字符, [ 0-9a-z ] ( 匹配一个字符, 范围式0-9 小写字母a-z)

多个

1. `\n`       **换行**符
2. `\t`       **制表**符 ( 一个Tab, 相当于4个空格 )
3. `\b`       匹配一个单词的**边界**
4. `\d`       **0 ~ 9** 之间的一个数                                    `\D`        非 **0 ~ 9** 之间的一个数
5. `\w`       **数字, 字母, 下划线**中任意一个                 `\W`        非 **数字, 字母, 下划线**中任意一个
6. `\s`       **空白字符**( 空格丶制表符丶换页符等 )    `\S`        非**空白字符**( 空格丶制表符丶换页符等 ) 
7. `[a-z]`  **指定范围**, 范围为 a ~ z 内的任意字符  [0-9a-zA-Z_] === \w
8. `[^0-9a-z, ]` [^] 代表**除了[]中的**任意字符, ^为非的意思, 这里指除了 0~9 a~z 逗号 空格外的字符
9. `()`        **分组**符号
10. `(?:)`     只匹配不捕获
11. `(?=)`     **正向**预查
12. `(?!)`     **负向**预查

------

普通元字符

> 代表本身字符串的含义, a就是a, b就是b

```js
let re = /today is good, hahaha, l have let it go/;
let str1 = 'today is good, hahaha, l have let it go';
let str2 = 'today is good, hahaha, l have let it';
re.test(str1)		// => true
re.test(str2)		// => false
```



------

### 2修饰符

> 正则表达式常用的修饰符有三种 : img

1. `i => ignoreCase`        忽略大小写匹配

2. `m => multiline `          可以进行多行匹配

3. `g => global `                全局匹配

   ```js
   let re1 = /AB/;			// 不忽略大小写匹配
   let re2 = /AB/i;		// 忽略大小写匹配
   let str = 'ab   ab'
   console.log(re1.test(str))	// => false
   console.log(re2.test(str))  // => true
   ```


## 三.元字符详细解析

### 1.`^ $`

```js
let re1 = /^\d/;		// 字符串必须以数字开头
console.log(re1.test('abcdefg'));	// => false
console.log(re1.test('1234567'));	// => true
console.log(re1.test('0abcdef'));	// => true

let re1 = /\d$/;		// 字符串必须以数字结尾
console.log(re1.test('abcdefg'));	// => false
console.log(re1.test('1234567'));	// => true
console.log(re1.test('0abcdef'));	// => false

let re1 = /\d+/;			// ^ $ 两个都不加, 那么字符串当中只要包含规则的内容即可
let re1 = /^\d$+/;		// ^ $ 两个都加, 那么字符串只能是和规则一致

/** 
 *	验证手机号码 ( 11位, 第一个数字是1就行 )
 */
let reg = /^1\d{10}$/
```

### 2.`\\`

```js
// (.) => 点不是字符, 而是除了\n以外的任意字符
let reg = /^a.b$/;	// .可以代表任意字符
console.log(re1.test('a1b'));	  // => true
console.log(re1.test('a\tb'));	// => true
console.log(re1.test('a\nb'));	// => false, .唯一不能匹配\n

// (\.) => 代表(.), (\)能把特殊字符传换成普通字符
let reg = /^a\.b$/;	// .在这里被转意了, 代表字符串.
console.log(re1.test('a.b'));	  // => true
console.log(re1.test('a1b'));  	// => false
console.log(re1.test('a2b')); 	// => false
```

### 3.`|`

```js
let reg = /^\d$|^\s$/	// => 只能匹配一个空格或者一个数字的字符
console.log(reg.test(' '));			// => true 
console.log(reg.test('1'));			// => true
console.log(reg.test('2 0'));		// => false 
console.log(reg.test(' 30'));		// => false 

/** 
   *	| 如果但如使用, 规则会变得很混乱, 如同下面的一样,  
   * 		本来匹配ab或者xd的字符, 但是规则变得异常混乱:
   *			1. ab开头的字符(true)
   *			2. ab开头的字符(true)
   *			3. a开头b结尾, 中间是b或c的字符(true)
   */
let reg = /^ab|cd$/	// => 只能匹配以数字开头或者以空格结尾的字符
console.log(reg.test('ab'));		// => true 
console.log(reg.test('cd'));		// => true
console.log(reg.test('abd'));		// => true 
console.log(reg.test('acd'));		// => true 
console.log(reg.test('abcd'));	// => true 
console.log(reg.test('bcd'));		// => true 
console.log(reg.test('ab123'));	// => true 

// 所以, 一般用 ()分组括号 来配合 | 的使用, 他有提高优先级的作用
let reg = /^(ab|cd)$/	// => 匹配字符 ab 或者 cd
console.log(reg.test('ab'));		// => true 
console.log(reg.test('cd'));		// => true
console.log(reg.test('abd'));		// => false 
console.log(reg.test('acd'));		// => false 
console.log(reg.test('abcd'));	// => false 
console.log(reg.test('bcd'));		// => false 
console.log(reg.test('ab123'));	// => false 
```

### 4.`[]`

```js
// 1. 中括号中一般出现的字符都代表本身含义, 除了 \s\d\w这些
let reg = /^[abc]$/;				// => 匹配[]中出现的字符一次
console.log(reg.test('a'))	// => true
console.log(reg.test('b'))	// => true
console.log(reg.test('c'))	// => true
console.log(reg.test('ab'))	// => false
console.log(reg.test('bc'))	// => false
let reg = /^[abc]+$/;				// => 匹配[]中出现的字符一次或者多次
console.log(reg.test('a'))	// => true
console.log(reg.test('b'))	// => true
console.log(reg.test('c'))	// => true
console.log(reg.test('ab'))	// => true
console.log(reg.test('bc'))	// => true
console.log(reg.test('abc'))// => true
let reg = /^[\d]+$/;			 // => 匹配一个数字或者一串数字
console.log(reg.test('1'))	// => true
console.log(reg.test('12'))	// => true
console.log(reg.test('123'))// => true
console.log(reg.test('1a2'))// => false
let reg = /^[(10)]+$/;			// => 匹配(或1或0或)一次或者多次
console.log(reg.test('(10)'))	// => true
console.log(reg.test('(10'))	// => true
console.log(reg.test('('))		// => true
console.log(reg.test('1a2'))	// => false

// 2. 中括号中不存在多位数
let reg = /^[20]$/;				 // 匹配2或者0一次
console.log(reg.test('2'))	// => false
console.log(reg.test('0'))	// => false
console.log(reg.test('20'))	// => true
let reg = /^[34-91]$/;			// 匹配3或者1或者4-9的数一次
console.log(reg.test('1'))	// => true
console.log(reg.test('3'))	// => true
console.log(reg.test('4'))	// => true
console.log(reg.test('34'))	// => false
console.log(reg.test('91'))	// => false
```

## 四.常用的正则表达式

### 1.验证有效数字

```js
0, 1, 2, 3, -1, -2, -3
10, 20, 30, -10, -20, -30
11.1, 22.2, -11.1, -22.2
  +1, +2, +3
01, 002, 0003

/** 
 *	规则分析
 *		1. 可能出现 +, - 号, 也可能不出现					[+-]?
 * 		2. 一位数 0~9都可以, 多位数开头不能为0			\d|[1-9]\d+
 *		3. 小数点可以有(一旦有必须跟上数字), 可以无	 (\.\d+)?
 */

let reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
console.log(reg.test('+20.00'))			// true
console.log(reg.test('20.0'))				// true
console.log(reg.test('0.0'))				// true
console.log(reg.test('+003'))				// false
console.log(reg.test('-003'))				// false
console.log(reg.test('3.'))					// false
console.log(reg.test('-003.02'))		// false
console.log(reg.test('+05a2.3'))		// false
```

### 2.验证密码

```js
// => 数字, 字母, 下划线
// => 6~16位

let reg = /^[0-9a-zA-Z_]{6,16}$/;
let reg = /^\w{6,16}$/;
```

### 3.验证真实姓名

```js
刘某某
邢某某
佛拉基米尔·某某某
佛拉基米尔·某某某·某某某

/**  
 *	1. 汉字(汉字的Unicode编码位 \u4E00-\u9FA5 )		/^[\u4E00-\u9FA5]$/
 *	2. 名字长度位 2~10 位
 *	3. 会有译名的出现, 以为·隔开
 */

let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]+){0,2}$/;
console.log(reg.test('刘某某'))										// => true
console.log(reg.test('邢某某'))										// => true
console.log(reg.test('佛拉基米尔·某某某'))					// => true
console.log(reg.test('佛拉基米尔·某某某·某某某'))		// => true
```

### 4.验证邮箱(分析)

```js
let reg = 
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

/** 
 *	1. 出现在 @ 符号之前的, \w+((-\w+)|(\.\w+))*
 *		- 邮箱开头是数字丶字母丶下划线
 *		- 中间可以被 - 和 . 进行划分, 可以出现 0~多次 (xx.xx@ xx-xx@ xx.xx-xx@)
 *
 *	2. [A-Za-z0-9]+
 *		- 邮箱的域名 @qq @123con @xxx...
 *
 *	3. ((\.|-)[A-Za-z0-9]+)*
 *		-	对邮箱域名的补充, 有些邮箱格式是 xxx@123.456-ali  xxx@qq-226.youxiang
 *		- 多域名: 	 xxxxx@123.com.cn.net
 *		- 企业邮箱: xxxxx@123.youxiang-qiye.com
 *
 *	4. \.[A-Za-z0-9]+
 *		- 捕捉最后的邮箱域名 .cn .com .net .edu ...
 */
```

### 5.身份证号码验证

```js
/** 
 *	1. 一共18位
 *	2. 最后一位可能是X
 *
 *	身份证前6位: 省市县
 *	中间八位: 年月日
 *	最后四位:
 *		- 前两位: 算法计算, 公安局编码
 *		- 第三位: 性别(单:男, 双:女)
 *		- 第四位: X或数字
 *	330109200012044322
 */

let reg = /^\d{6}(1|2)\d{10}(\d|X)$/;
console.log(reg.test('31610910001201132X'))
console.log(reg.test('130109201112041413'))


// () 配合 exec 还有一个作用为分组匹配
let reg = /^(\d{6})(\d{4})(\d{4})\d{2}(\d)(\d|X)$/;
console.log(reg.exec('31610910001201132X'))
// Array(6) [ "31610910001201132X", "316109", "1000", "1201", "2", "X" ]
// 第一个参数为匹配的字符串, 剩余的为()分组匹配出的结果
console.log(reg.exec('130109201112041413'))
// Array(6) [ "130109201112041413", "130109", "2011", "1204", "1", "3" ]
// 第一个参数为匹配的字符串, 剩余的为()分组匹配出的结果
```

## 五.正则的捕获方法

### 1.正则捕获

- 实现正则捕获的方法 ( RegExp.prototype )
  1. exec
  2. test
- 字符串支持正则的方法 ( String.prototype )
  1. split
  2. replace
  3. match
  4. ......

### 2.正则的懒惰性

#### exec

```js
let str = 'aaa111bbb222ccc333'

// 正则进行捕获的前提: 正则表达式能匹配当前字符串, 不匹配结果为null
let reg = /^\d+$/;		// => 字符串必须是纯数字
console.log(reg.test(str))	// => false
console.log(reg.exec(str))	// => null

// 只有正则表达式能匹配字符串才能开始捕获
/** 
 *	基于exec实现正则的捕获:
 *		1. 结果要么是数组(捕获成功), 要么是null(捕获失败)
 *			捕获成功:
 *				第一项(下标:0): 捕获成功的内容
 *				其余项(下标:1~∞): 对应分组()匹配下来的数据
 *				index: 捕获到的字符串开头第一个字符下标
 *				input: 被匹配的字符串主体
 *				length: 捕获到的字符串长度
 *		2. 执行一次exec, 永远只能捕获到第一串符合规则的字符(默认情况下, 懒惰性)
 *			懒惰性原因是lastIndex的值永远是0, 每次都是重头捕获
 * 			解决办法: 全局修饰符g
 */
let reg = /\d+/;
console.log(reg.test(str))	// => true
console.log(reg.exec(str))	
// => Array [ 0:"111", index: 3, input:"aaa111bbb222ccc333", length: 1, 	<prototype>: Array[] ]
```

- exec 捕获字符串的原理 ( 懒惰性 )

  ```js
  let str = 'aaa111bbb222ccc333'
  let reg = /\d+/
  
  /** 
   *	正则对象默认有个属性叫做lastIndex, 值为0:
   *		reg.lastIndex: 当前正则进行下一次捕捉字符的起始下标
   */
  console.log(reg.lastIndex)		// => 0 正则匹配时从下标0处开始匹配
  console.log(reg.exec(str));		// =>  Array [ 0:"111", index: 3,...]
  console.log(reg.lastIndex);		// => 0 第一次捕获完成, 其值还是为0
  console.log(reg.exec(str));		// =>  Array [ 0:"111", index: 3,...]
  console.log(reg.lastIndex);		// => 0 第二次捕获完成, 其值还是为0
  .......
  console.log(reg.lastIndex);		// => 0 第n次捕获完成, 值还是为0
  // 这就是为甚exec匹配到的字符永远是复合规则的第一托代码
  ```

- 修饰符`g`进行全局匹配

  ```js
  let str = 'aaa111bbb222ccc333'
  let reg = /\d+/g;			// 加了一个修饰符g, 进行全局匹配, lastIndex会被修改
  
  console.log(reg.exec(str));	// => Array [ 0:"111", index: 3,...]
  console.log(reg.lastIndex);	// => 6
  console.log(reg.exec(str));	// => Array [ 0:"222", index: 9,...]
  console.log(reg.lastIndex);	// => 12
  console.log(reg.exec(str));	// => Array [ 0:"222", index: 9,...]
  console.log(reg.lastIndex);	// => 18, 到最末尾了
  console.log(reg.exec(str));	// => null, 从18为开始匹配, 匹配失败, 结果为null
  console.log(reg.lastIndex);	// => 0, lastIndex重新回归0
  console.log(reg.exec(str));	// => Array [ 0:"111", index: 3,...]
  console.log(reg.lastIndex);	// => 6
  ......  // => 一直循环
  
  /******************错误的使用********************/
  // 注意, 只要正则加上了g全局匹配修饰符, 正则的方法每调用一次都会改变reg.laseIndex
  if(reg.test(str)) {
    // => 验证字符串时候和我们的字符串匹配
    console.log(reg.lastIndex)  // => 6, 此值被修改了, exec捕获的位置从6开始
    console.log(reg.exec(str))	// Array [ 0:"222", index: 9,...]
  }
  /***********************************************/
  ```

#### 解决方法

- 捕获所有符合结果的字符串

  ```js
  // => 写一个方法, 正则能匹配所有的符合条件的方法(功能和str.match功能相同)
  ~ function () {
    function execAll(str) {
      if (!this.global) {
        return this.exec(str)
      }
  
      let val = this.exec(str),
          arr = [];
  
      while (val) {
        arr.push(val[0])
        val = this.exec(str);
      }
  
      return arr.length == 0 ? null : arr
    }
    RegExp.prototype.execAll = execAll;
  }();
  
  let str = 'aaa123bbb222ccc333';
  let reg = /\s/g;
  console.log(reg.execAll(str))
  
  
  console.log('/************************/');
  console.log(str.match(/\d+/g));		// => Array(3) [ "123", "222", "333" ]
  console.log(str.match(/\d+/));		// => Array [ "123" ]
  ```


### 3.分组的三大作用

#### 分组捕获

- 捕获单次

  ```js
  // => 身份证号匹配
  let str = '22615819951204161X'
  let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/;
  console.log(reg.exec(str))
  console.log(str.match(reg))
  // Array(7) [ "226158199512041612", "226158", "1995", "12", "04", "1", "X" ]
  // 第一项: 大正则匹配的结果 /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/
  // 其余项: (\d{6}), (\d{4}), (\d{2}), (\d{2})
  
  // 但是(\d|X)这一项我们不想要, 在()里面加上?:只匹配不捕获, 只用其优先级的作用
  let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
  console.log(str.match(reg))
  // => // Array(7) [ "226158199512041612", "226158", "1995", "12", "04", "1" ]
  
  
  // 如果分组捕获没有捕获到数据, 为defined
  let re = /^(?:(\d+)|([a-zA-Z]+))$/;
  let str = '123456';
  console.log(str.match(re););		// => Array(3) [ "123456", "123456", undefined ]
  ```

- 捕获多次

  ```js
  // => 即想匹配到<<字母>>, 也想匹配到字母
  let str = "<<aaa>>哈哈哈<<123>>!!!!<<bbb>><<ccc456>>";
  let reg = /<<([a-zA-Z]+)>>/;
  
  // 不设置g修饰符, 两者匹配的结果一致
  console.log(reg.exec(str));
  console.log(str.match(reg));
  // Array [ "<<aaa>>", "aaa" ] Array [ "<<aaa>>", "aaa" ]
  // 懒惰匹配第一个符合的, 分组匹配内容
  
  // 设置g修饰符, match匹配所有, exec还是懒惰匹配(在带有()分组匹配的情况下)
  let reg = /<<[a-zA-Z]+>>/g;
  console.log(reg.exec(str));
  console.log(str.match(reg));
  // Array [ "<<aaa>>", "aaa" ]
  // Array [ "<<aaa>>", "<<bbb>>" ]
  
  /** 
   *	自己写一个捕获所有方法(大正则 + 分组匹配)
   */
  let str = "<<aaa>>哈哈哈<<123>>!!!!<<bbb>><<ccc456>>";
  let reg = /<<([a-zA-Z]+)>>/;
  let bigArry = [],
      smallArry = [],
      val = reg.exec(str);
  while(val) {
    let [big, small] = val;
    bigArry.push(big)
    smallArry.push(small)
    val = reg.exec(str)
  }
  console.log(bigArry, smallArry)
  // Array [ "<<aaa>>", "<<bbb>>" ]
  // Array [ "aaa", "bbb" ]
  ```

#### 分组引用

```js
// 如果想让前面一个字符和后一个或多个字符相同, 可以用()的第三个功能: 分组引用
// 分组引用: \1, 并且只能\1, 如果要多个:\1\1\1
let reg = /^[a-zA-Z]([0-2])\1\1[a-zA-Z]$/;

console.log(reg.test('a00b'));		// => false
console.log(reg.test('a111b'));		// => true
console.log(reg.test('a222b'));		// => true
console.log(reg.test('a333b'));		// => false
console.log(reg.test('a0011b'));	// => false
console.log(reg.test('a555b'));		// => false

// 	 /1 代表正则中的第一个()中的值, /2代表第二个()种的值
let reg = /^(\d)(\d)\1\2$/
console.log(reg.test('1212'));  // true
console.log(reg.test('1213'));  // false
```

## 六.正则捕获的贪婪性

```js
let str = 'aaa111bbb222ccc';
let reg1 = /\d+/g;
let reg2 = /\d+?/g
let reg3 = /\d*?/g

// => 正则捕获的贪婪性: 在默认情况下, 正则都可能尽可能多的取匹配字符串
console.log(str.match(reg1))	// => [ '111', '222', '333' ]

// 加上 ? 之后, 正则会尽可能少的匹配字符串, +: 1~∞(1次) *:0~∞(0次)
console.log(str.match(reg2))	// => Array(6) [ "1", "1", "1", "2", "2", "2" ]
console.log(str.match(reg3))	// => Array(6) [ "", "", "", "", "", "", ... ]
```

## 七.问好的五大作用

1. ? 左边是非量词符 ( 匹配字符0 | 1 次 )
2. ? 左边是量词符 ( 取消贪婪匹配 )
3. ? 左边是 (:?) ( 只匹配不捕获 )
4. ? 左边是 (?=) ( 正向预查 )
5. ? 左边是 (?!) ( 负向预查 )

## 八.其他正则的捕获方法

1. ###### test捕获

   ```js
   let str = "<name><age><sex>"
   let reg = /<([a-zA-Z]+)>/g;
   
   console.log(reg.test(str));	// => true
   console.log(RegExp.$1);		// => name
   
   console.log(reg.test(str));	// => true
   console.log(RegExp.$1);		// => age
   
   console.log(reg.test(str));	// => true
   console.log(RegExp.$1);		// => sex
   
   console.log(reg.test(str));	// => false, 全部匹配结束, 开始新的循环
   console.log(RegExp.$1);		// => sex
   
   console.log(reg.test(str));	// => true
   console.log(RegExp.$1);		// => name
   
   // egExp.$1 ~ egExp.$9 : 获得当前本次正则匹配后, 第一个分组的信息 - 第九个分组的信息
   ```

2. replace 字符串中用来实现替换的方法 ( 一般伴随正则一起使用 )

   ```js
   let str = "今天天气真好, fuck, 尼玛的"
   
   // => 把 fuck, 尼玛 这些敏感词替换成*
   str = str.replace(/(fuck|尼玛)/g, '**')
   
   console.log(str)
   // => 今天天气真好, **, **的
   ```

   replace的分组替换功能 ( replace的功能之一 )

   ```js
   let str = '2020-1-19 14:19 2020-1-19 14:19';
   let reg = /(\d{4})-(\d{1,2})-(\d{2}) (\d{2}):(\d{2})/;	// 懒惰匹配, 只有一次
   console.log(str.replace(reg, "$1年$2月$3日 $4时$5分"))
   // => 2020年1月19日 14时19分 2020-1-19 14:19
   
   let str = '2020-1-19 14:19 2020-1-19 14:19';
   let reg = /(\d{4})-(\d{1,2})-(\d{2}) (\d{2}):(\d{2})/g;	// 全局匹配, 替换所有
   console.log(str.replace(reg, "$1年$2月$3日 $4时$5分"))
   // => 2020年1月19日 14时19分 2020年1月19日 14时19分
   ```

   replace方法的使用:

   ```js
   /** 
    *		str.replace([RegExp], [function])
    *			1. replace方法每次将正则的规则匹配到字符串一次, 就执行一次函数
    *						let str = '123456';
    *						let reg = /\d/g;
    *						reg.replace(reg, () => { console.log(我被执行); return 11 })
    *			2. 函数默认接收大正则匹配的结果, $1 $2 $3小分组结果, 匹配下表,原始字符
    *			3. 函数的返回值就是把匹配的字符串替换的值
    */
   
   // 1. 不进行分组( 传入函数中的值: 匹配出的字符串, 匹配开始下表, 原始字符串 )
   str = '1 2 3 4 5 6';
   reg = /\d/g;
   str.replace(reg, (...args) => { 
     console.log(args)	// => Array(3) [ "1", 0, "1 2 3 4 5 6" ]
     return 哈哈;
   })
   // str => 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈
   
   // 2. 进行分组( 传入函数中的值: 匹配出的字符串, 分组字符, 匹配开始下表, 原始字符串 )
   str = '1 2 3 4 5 6';
   reg = /\d/g;
   str.replace(reg, (...args) => { 
     console.log(args)	// => Array(4) [ "1", "1", 0, "1 2 3 4 5 6" ]
     return '嘻嘻';
   })
   // str => 嘻嘻 嘻嘻 嘻嘻 嘻嘻 嘻嘻 嘻嘻
   ```

   ```js
   // 案例: 进行事件的匹配, 并且进行补充 2019年1月20日 => 2019-01-20
   let str = '2019年12月1日, 还是2019年2月4日';
   let reg = /(\d{4})年(\d{1,2})月(\d{1,2})日/g;
   str = str.replace(reg, (...args) => {
     console.log(args);
     let [big, year, month, day] = args;
     month = month.length == 1 ? '0' + month : month;
     day = day.length == 1 ? '0' + day : day;
     return `${year}-${month}-${day}`
   })
   console.log(str)
   // => 2019-12-01, 还是2019-02-04
   ```

## 九.正则的练习题

### 1.所有的单词大写

```js
let str = "HELLO, lyw, Although you leave me, but I will have been waiting for you that you come back to me"
let reg = /\b([a-zA-Z]+)\b/g; // \b是匹配单词的边界
str = str.replace(reg, (...args) => {
    let [, word] = args;
    word = word[0].toUpperCase() + word.substring(1).toLowerCase();
    return word
})
console.log(str);
```

### 2.次数最多的单词

```js
let str = "HELLO, lyw, Although you leave me, but I will have been waiting for you that you come back to me"

// 匹配出现次数最多的单词， 并且打印出他的次数
```

- 方法一

  ```js
  /** 
    *	方法一： 
    * 	1. 用match把所有单词匹配出来， 结果为一个数组
    *		2. 遍历数组， 把其存到一个对象里， 并映射其出现的值
    */
  let reg = /\b[a-zA-Z]+\b/g;
  let words = str.match(reg);
  let obj = {};
  words.forEach((item, index) => {
      typeof obj[item] === 'number' ? obj[item]++ : obj[item] = 1
  })
  
  function maxCounter(obj) {
      let word = null;
      let counter = null;
      let start = 0;
      for (let i in obj) {
          if (start == 0) {
              start++
              word = i;
              counter = obj[i]
          } else {
              if (obj[i] > counter) {
                  word = i
                  counter = obj[i]
              }
          }
      }
      return `出现次数最多的单词：${word}, 出现次数：${counter}`
  }
  console.log(maxCounter(obj))
  // => 出现次数最多的单词：you, 出现次数：3
  ```

- 方法二

  ```js
  /** 
    *	方法二： 
    *		1. 先把字符串拆分成列表， 进行字母的排序
    *		2. 把字母的重新组合， 用正则进行相同字母的匹配
    *		3. 从正则匹配出的列表里面取出前面最常出现的项
    */
  let str = 'feglkdroijhoijslkjhlkdskfhivsasafafaewiofigijlkfb';
  let arry = str.split('').sort((a, b) => a.localeCompare(b)).join('');
  arry = arry.match(/([a-z])\1+/g).sort((a, b) => b.length - a.length);
  let max = arry[0].length,
      res = [];
  for (let i in arry) {
      if (arry[i].length === max) {
          res.push(arry[i])
      }
  }
  
  if (res.length > 1) {
      let str = '';
      for (let s of res) {
          str = `${str}${s[0]} `
      }
      console.log(`出现次数最多的字母次数为 ${max} 次, 他们是 ${str}`)
  } else {
      console.log(`出现次数最多的字母次数为 ${max} 次, 其为 ${res[0]}`)
  }
  ```

- 方法三

  ```js
  /** 
    *	方法二： 
    *		1. 先把字符串拆分成列表， 进行字母的排序后重新合并字符串
    *		2. 对字符串进行
    */
  let str = 'feglkdroijhoijslkjhlkdskfhivsasafafaewiofigijlkfb';
  let arry = str.split('').sort((a, b) => a.localeCompare(b)).join('');
  let flag = false
  for (let i = str.length; i > 0; i--) {
      let reg = new RegExp(`([a-z])\\1{${i-1}}`, 'g');
      arry.replace(reg, (...args) => {
          console.log(`出现次数最多的字母是: ${args[0][0]}, 共出现: ${args[0].length} 次`);
  
          flag = true;
      })
      if (flag) {
          break
      }
  }
  // 出现次数最多的字母是: f, 共出现: 6 次
  // 出现次数最多的字母是: i, 共出现: 6 次
  ```


### 3.时间字符串格式化

```js
/** 
 *	把服务器获取的时间转换成我们需要的格式
 *		服务器获取：
 *			- "2020-1-21 14:47:2"
 *			- "2020/1/21 14:47:2"
 *			- "2020-1-21"
 *		转换成：
 *			- "01月21日 14时47分"
 *			- "2020年1月21日"
 *	调用：time.formatTime()
 */

// 闭包， 把方法扩展到String的原型上
~ function () {
    /** 
	  *	 formatTime：时间字符串的格式化处理
      *		 @params
      *			template: [string] 我们期望的日期格式
      *			模板格式: {0}为年 {1~5}为月~秒， 模板可以根据字符串自己写
      *		 @return
      *			一个格式化后的时间字符串
      */
    function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
        // 1. 首先获取字符串的中的年月日信息
        let timeArry = this.match(/\d+/g);
        console.log(timeArry);
        return template.replace(/\{(\d)\}/g, (...[, $1]) => {
            let res = timeArry[$1] || '00';
            return res.length < 2 ? '0' + res : res;
        })
    }
    // Date.prototype.formatTime = formatTime
    ['formatTime'].forEach(item => {
        String.prototype[item] = eval(item);
    })
}()

let time1 = '2019/1/21 15:41'
console.log(time1.formatTime())
// => 2019年01月21日 15时41分00秒
let time2 = '1/21 15:41'
console.log(time2.formatTime('{1}日{0}月 {3}分{2}时'))
// => 21日01月 41分15时
```



### 4.获取url参数信息

```js
// 方法一： 用spilt对正则匹配下来的字符串进行分割

/** 
*	queryURLParams： 获取URL地址？后面的字符串参数信息
*		@params
*		@return
*			[object]: 把所有的参数以键值对的方式储存起来
*	by xyb on 2020/1/21
*/
~ function () {
  function queryURLParams() {
    let reg = /(?:https|http):\/\/.*?\/s\?([^\u2002]+)/,
        hash = reg.exec(this)[1].split('#')[1], // 解析hash值 #后面的
        params = reg.exec(this)[1].split('#')[0].split('&'), // 解析参数
        obj = {}
    params.forEach((item) => {
      let res = item.split('=');
      obj[res[0]] = res[1]
    })
    obj['hash'] = hash;
    return obj
  }
  ['queryURLParams'].forEach(item => {
    String.prototype[item] = eval(item)
  })
}()

let str =
    "https://www.baidu.com/s?wd=%E5%A4%A7%E4%BA%8C%E8%BF%98%E8%83%BD%E5%85%A5%E5%85%9A%E5%90%97&rsv_spt=1&rsv_iqid=0xe198dd5c0001554c&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&rsv_sug3=5&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&inputT=3709&rsv_sug4=4219#6266dwa"
console.log(str.queryURLParams())
```

```js
// 方法二： 好方法， 先用字符串的 replace + 正则的分组匹配， 把数据匹配出来， 再在函数中对其进行处理并映射到对象中

~ function () {
  function queryURLParams() {
    let obj = {};
    this.replace(/([^=#&?]+)=([^=?#&]+)/g, (...[, $1, $2]) => {obj[$1] = $2;})
    this.replace(/#([^=#&?]+)/, (...[, $1]) => {obj['HASH'] = $1;})
    return obj
  }
  ['queryURLParams'].forEach(item => {String.prototype[item] = eval(item)})
}()

let str =
    "https://www.baidu.com/s?wd=%E5%A4%A7%E4%BA%8C%E8%BF%98%E8%83%BD%E5%85%A5%E5%85%9A%E5%90%97&rsv_spt=1&rsv_iqid=0xe198dd5c0001554c&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=tb&rsv_enter=1&rsv_sug3=5&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&inputT=3709&rsv_sug4=4219#6266dwa"
console.log(str.queryURLParams())
```

### 5.千分符的格式化

- 一行代码解决

  ```js
  /** 
  		 *	millimeter: 返回一个被处理过的数据财务数据
  		 */
  ~ function () {
    function millimeter() {
      return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ',')
      // 1. (?=) 是正向预查的意思， 也是只匹配不捕获
      // 2. \d{1,3}表示被捕获的数字可以是1~3位
      // 3. (?=(\d{3})+$表示最后面的数字必须以3个一组成对出现
    }
  
    ['millimeter'].forEach(item => {
      String.prototype[item] = eval(item);
    })
  }()
  
  console.log('1300000000'.millimeter()); // 1,300,000,000 
  console.log('121565656'.millimeter());  // 121,565,656 
  console.log('3133258833'.millimeter()); // 3,133,258,833
  ```

  

### 6.正则的补充

`()` 的作用：

1. 与 `|` 搭配，让正则具有二选一的分支功能

   ```js
   let reg = /ab|cd/;
   // 目的：匹配ab或者cd,
   // 但是, 只有 | 的时候, JavaScript会把这个正则解析的异常混乱
   reg.test('ab')		// => true
   reg.test('cd')		// => true
   reg.test('abd')		// => true
   reg.test('acd')		// => true
   reg.test('abcd')	// => true, what!这个也是true???
   
   // 改进: | 和 () 都是配合成对出现的
   let reg = /(ab|cd)/;
   reg.test('ab')		// => true
   reg.test('cd')		// => true
   reg.test('abd')		// => false
   reg.test('acd')		// => false
   reg.test('abcd')	// => false
   
   // 两者选其一进行匹配
   let reg = /^(?:(3){3}\.\1{3}|(6){3}\.\2{3})$/;
   // \1 代表不是(?:)开始的第一个()里面的内容重复一份
   // \2 代表不是(?:)开始的第二个()里面的内容重复一份
   // \3 代表不是(?:)开始的第三个()里面的内容重复一份
   console.log(reg.test('333.333'));		// => true
   console.log(reg.test('666.666'));		// => true
   console.log(reg.test('111.222'));		// => false 
   console.log(reg.test('333.444'));		// => false
   ```

2. 与量词符 `+` `*...`  组合，`()`中的内容看为一个整体

   ```js
   let reg = /(?:(ab)+|(bc)*)/; // 匹配ab整体1~多次或bc0~多次
   
   console.log(reg.exec('ababbc')); // Array(3) [ "abab", "ab", undefined ]
   console.log(reg.exec('bcbc')); // Array(3) [ "bcbc", undefined, "bc" ]
   console.log(reg.exec('')); // Array(3) [ "", undefined, undefined ]
   ```

3. 分组捕捉功能，对匹配下来的字符进行数据提取

   ```js
   // 被()括起来的内容在捕获的时候会被进行分组捕获
   let reg = /(\d+)([a-z]+)/;
   console.log(reg.exec('333aaa')); // => ['333aaa', '333', 'aaa']
   console.log(reg.exec('123abc')); // => ['123abc', '123', 'abc']
   console.log(reg.exec('55hh')); 	 // => ['55hh', '55', 'hh']
   console.log(reg.exec('55hh66bb')); 	 // => ['55hh', '55', 'hh']
   
   // 正则表达式首先会对字符串进行整体匹配， 如果字符串中有符合正则的字符串，把其匹配下来, 然后在对正则中(), 不包括(?:)的匹配下来, 形成一个数组
   ```

4. 反向引用， 与 `\1 \2 \3....` 配合使用

   ```js
   // \1 \2 \3... 可以替代()中同等的内容，123是根据()的数量决定
   let time1 = '2020-1-23'
   let time2 = '2020/1/23'
   let time3 = '2020_1_23'
   let time4 = '2020/1_23'
   let time5 = '2020/1-23'
   let reg = /\d{4}([-/_])\d{1,2}\1\d{1,2}/
   console.log(reg.exec(time1)); // => Array [ "2020-1-23", "-" ]
   console.log(reg.exec(time2)); // => Array [ "2020/1/23", "/" ]
   console.log(reg.exec(time3)); // => Array [ "2020_1_23", "_" ]
   console.log(reg.exec(time4)); // => null
   console.log(reg.exec(time5)); // => null
   ```

5. 非分组捕获功能，只匹配不捕获

   ```js
   // 如果我们仅仅只是利用()干分支匹配的功能，不想让其被分组捕获,使用(?:)
   let reg1 = /(?:(a)b|(c)d)/; // 只匹配ab或cd分组提取a和c
   let reg2 = /((a)b|(c)d)/; // ab和cd，a和c都会分组匹配
   let str1 = 'ab'
   let str2 = 'cd'
   console.log(reg1.exec(str1)); // => Array(3) [ "ab", "a", undefined ]
   console.log(reg1.exec(str2)); // => Array(3) [ "cd", undefined, "c" ]
   console.log(reg2.exec(str1)); // => Array(4) [ "ab", "ab", "a", undefined ]
   console.log(reg2.exec(str2)); // => Array(4) [ "cd", "cd", undefined, "c" ]
   ```

   