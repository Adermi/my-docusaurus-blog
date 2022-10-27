---
id: wechat
title: 微信小程序开发
---
# 小程序开发

## 1.小程序简介

[微信](https://baike.baidu.com/item/微信/3905974)小程序，[小程序](https://baike.baidu.com/item/小程序)的一种，是一种不需要下载安装即可使用的[应用 ](https://baike.baidu.com/item/应用)，解决了相对原生APP需要下载应用，相对H5页面不能调用底层接口，等等一系列问题，介于两者之间，结合两者优点的小程序，2017年1月9日小程序横空出世



## 2.开发准备

移动端开发须知

开发工具: [微信小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，VsCode

![image-20201123220322832](/assets/wechat.assets/image-20201107191205218.png)

## 3.项目目录结构

小程序结构划分

- 最顶层App（App实例） -> 多个Page（Page实例） -> 多个组件（组件实例）

  ```js
  // 小程序目录结构
  /**
  | - app.json				1.项目的全局配置包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab
  | - app.js					2.创建全局App实例，以及执行App的生命周期函数
  | - app.wxss				3.全局样式的配置（局部配置会覆盖）
  | - Page									4.小程序中存放页面的文件
  |		| - page1								 -小程序的page1页面
  |			| - page1.json						-page1页面的单独配置（会覆盖全局的配置）
  |			| - page1.js							-创建Page1页面的实例，运行生命周期函数
  |			| - page1.wxml						-page1页面的html代码存放处
  |			| - page1.wxss						-page1页面的css代码存放处
  | 	|- page2								 -小程序的page2页面
  |			| - ...										-...
  | 	|- pageN								 -小程序的pageN页面
  |			| - ...										-...
  | Component								5.小程序中存放组件component的文件
  |		| - comp1								 -小程序的组件com1
  |			| - comp1.json						-组件内部配置
  |			| - comp1.js							-创建组件实例的相关代码，以及存放组件的内容
  |			| - comp1.wxml						-组件的html布局
  |			| - comp1.wxss						-组件的样式配置
  |		| - compN...
  |			| - ...
  */
  ```

  各个文件作用：
  ![image-20201123220322832](/assets/wechat.assets/image-20201107191310534.png)

![image-20201123220322832](/assets/wechat.assets/image-20201107193057009.png)

## 4.使用Git管理代码

1. 在[github](https://github.com/new)中创建仓库

   ![image-20201123220322832](/assets/wechat.assets/image-20201107205443022.png)

2. 在项目中添加git管理

   ![image-20201123220322832](/assets/wechat.assets/image-20201107205722548.png)

3. 进行git操作

   `HEAD`	: 当前版本
   
   ![image-20201123220322832](/assets/wechat.assets/image-20201109001544841.png)
   
   git命令大全
   
   ```shell
   # 提交本地仓库, 上传服务器
   $ git init	 # 初始化一个空的git仓库 就是隐藏的.git文件
   $ git add .	 # 将当前目录下修改的所有代码从工作区添加到缓存区 . 代表当前目录
   $ git commit -m "xxx" # 将缓存区内容添加到本地仓库,xxx为本次提交的说明
   $ git remote add origin	https://xxx # 设置远程主机,也就是代码推送服务器
   $ git push -u origin master	# 本地仓库代码发到github中, master是分支 可修改
   $ git push [origin] --tags	# 上传所有的tag	例：git push [origin] --tags
   $ git push origin [tagname]	# 上传单个tag		 例：git push origin "V1.0"
   
   
   # 创建标签
   $ git tag "标签名"							# 创建标签,记录当前代码状态,必须commit提交后
   $ git tag "标签名" -m "备注"		 # 创建带有备注的标签
   $ git tag -l "0*"							# 查看所有以0开头的标签 *是模糊匹配
   $ git tag -d "标签名"					# 删除标签
   $ git checkout "标签名"				# 切换标签
   $	git push --tags							# 提交所有标签
   
   # 版本回退（任何版本都不会删除,可以通过记录进行来回横跳转）
   $ git reset "版本号"						# 可通过git log查看，就是 commit id 一串哈希值
   $ git reset --hard HEAD^			# 回退上一个版本  HEAD^^:回退两个版本 HEAD~n:回退n个版本
   $ git checkout -- file				# 可以丢弃工作区的错误修改（没有git add情况下）
   $ git reset HEAD .						# 把提交到缓存区的内容撤销
   
   # 记录查询
   $ git log 										# 查看之前提交的版本
   $ git reflog									# 查看所有操作，可以可以随意跳转版本（例如:错误reset跳转）
   															# 2c9a1fc HEAD@{4}: commit: V2.0	commit提交记录
   $ git status									# 查看当前版本那些文件被修改
   $ git diff										# 查看文件被修改了那些内容
   
   # 删除文件
   $ git clean -df								# 删除不在git管理之下的文件
   ```




## 5.小程序基本语法

### -数据绑定

#### -获取

> 在小程序开发中，使用的是大胡子语法 **{{}}**，和**Vue**相似，一旦在页面中使用{{}}，所拿的数据都是从页面Page的data中拿取的

进行数据绑定分成两步：

1. 在`page.js`中设定数据（或网络获取数据），储存在**page**实例的**data**字段中

   > 在**page.js**中进行数据初始化，以供在**wxml**中进行使用

   ```js
   // pages/home/home.js
   Page({
   
     /**
      * 页面的初始数据
      */
     data: {
       name: '干就完事',
       age: 20,
       gender: 0,
       hobby: [
         {id: 1, data: '吃'},
         {id: 2, data: '睡'},
         {id: 3, data: '喝'}
       ],
   		id: 0,
       condition: true,
     }
   })
   ```


2. 在**wxml**页面中进行数据绑定

   > wxml中所有的 {{**变量**}} 里的**变量**都是从`page.js`中的实例的data字段中得到的

   ```jsx
   <!-- index.wxml -->
   <!-- 1.小程序的数据绑定 -->
     /**
      *	WXML 中的动态数据均来自对应 Page 的 data
      */
     
   <view>哥的名字：{{name}}</view>
   <view>哥的年纪：{{age}}</view>
   <view>哥的性别：{{gender == '0' ? '男' : '女'}}</view>
   <view id="item-{{id}}"> </view>															// id名控制
   <view wx:if="{{condition}}"> </view>												// 组件属性控制
   <checkbox checked="{{false}}"> </checkbox>									// 布尔值控制是否显示
   <view hidden="{{flag ? true : false}}"> Hidden </view>			// 三目运算
   <view> {{a + b}} + {{c}} + d </view>												// 运算控制
   <view wx:if="{{length > 5}}"> </view>												// 判断显示
   <view>{{"hello" + name}}</view>															// 变量字符相加
   <view wx:for="{{[zero, 1, 2, 3, 4]}}"> {{item}} </view>			// 数组内使用数据
   <view>{{[1, 2, 3, 4, name]}}</view>													// 自动分解数组
   ```
   
3. 绑定完成

![image-20201123220322832](/assets/wechat.assets/image-20201116152309867.png)

#### -修改

> 在小程序中使用 `this.setData()` 修改数据，注意！在小程序中 `this.setData` 始终是同步的

```js
// 使用 this.setData 来修改数据
 
page({
  data: {
    motto: 'Hello World'
  },

  bindTap() {
    this.setData({
      motto: '我是改变的数据'
    })
    console.log(this.data.motto)  // '我是改变的数据'
  }
})
```

小程序中的数据绑定原理使用的是数据劫持：

![image-20201123220322832](/assets/wechat.assets/image-20201225212800529.png)

- 用 `Object.defineProperty` 来进行数据代理和劫持

  ```js
  const data = {
    name: 'xxx',
    age: 20
  }
  
  const _this = {}
  
  for(let key in data) {
    // console.log(data[i])
    Object.defineProperty(_this, key, {
      get() {
        console.log('我被执行了, 要获取key的值：', key)
        return data[key]
      },
      set(newValue) {
        console.log('我也被执行了, 新数据是：', newValue)
        data[key] = newValue
      }
    })
  }
  
  console.log(_this)
  ```

  ![](/assets/wechat.assets/7.gif)

### -循环渲染

#### -wx:for

> 小程序的循环绑定和**Vue**很相似，在标签中使用**for**的命令，如**Vue**的**v:for**，小程序的**wx:for**

1. for绑定数组

   ```jsx
   // page.js
   Page({
     data: {
       arr: [
         '吃饭',
         '睡觉',
         '打豆豆'
       ]
     }
   })
   
   // page.wxml
   <view wx:for="{{arr}}">
     {{index}}: {{item}}
   </view>
   
   /** 
    *	使用 wx:for-item 可以指定数组当前元素的变量名(默认为item)
    *	使用 wx:for-index 可以指定数组当前下标的变量名(默认为index)
    */
   ```

2. for循环绑定不是列表

   ```xml
   <!-- 字符串形式,遍历字符串 -->
   <view wx:for="7a8d3s">
     <text>文本{{index}}</text>
   </view>
   
   <view wx:for="[1, 2, ]">
     <text>文本{{index}}</text>
   </view>
   
   <!-- 遍历的值是一个数字, 遍历数字的次数 -->
   <view wx:for="{{4}}">
     <text>文本{{index}}</text>		<!-- 遍历4次-->
   </view>
   ```

3. for绑定是否需要加 `key`

   1. 列表数据是静态列表，内容不会改变

      > 不需要key，但是会有console控制台警告，忽略即可

   2. 列表是动态列表，内容会改变

      方法一（适用对象数组）：使用一个独一无二的字段值

      方法二（适用字符串|数字数组）：使用保留关键字 `*this` 代表for循环中item本身，需要item是唯一的数字或字符串才生效

      ```js
      // 1. 当数组是对象数组
      <switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
      <button bindtap="switch"> Switch </button>
      <button bindtap="addToFront"> Add to the front </button>
      
      // 2. 当数组是字符串|数字数组
      <switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;"> {{item}} </switch>
      <button bindtap="addNumberToFront"> Add to the front </button>
      ```

      ```js
      Page({
        data: {
          objectArray: [
            {id: 0, unique: 'unique_0'},
            {id: 1, unique: 'unique_1'},
            {id: 2, unique: 'unique_2'},
            {id: 3, unique: 'unique_3'},
            {id: 4, unique: 'unique_4'},
            {id: 5, unique: 'unique_5'},
          ],
          numberArray: [1, 2, 3, 4]
        },
        switch: function(e) {
          /**
           * 打乱列表顺序
           */
      
          // 1. 获取长度：5
          const length = this.data.objectArray.length
          // 2. 进行length次随机交换列表中两项的位置，
          for (let i = 0; i < length; ++i) {
            const x = Math.floor(Math.random() * length)  // 5以内的随机整数
            const y = Math.floor(Math.random() * length)  // 5以内随机整数
            const temp = this.data.objectArray[x] // 获取this.data.objectArray中的第x项
            this.data.objectArray[x] = this.data.objectArray[y] // 把第x项用第y项覆盖
            this.data.objectArray[y] = temp // 把y项用第x项覆盖
          }
          // 3. 更新状态，重新渲染DOM
          this.setData({
            objectArray: this.data.objectArray
          })
        },
        addToFront: function(e) {
          /**
           * 在列表中增加一项
           */
      
          const length = this.data.objectArray.length
          this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
          this.setData({
            objectArray: this.data.objectArray
          })
        },
        addNumberToFront: function(e){
          /**
           * 在列表中增加一项
           */
          this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
          this.setData({
            numberArray: this.data.numberArray
          })
        }
      })
      ```

#### -key作用

![](/assets/wechat.assets/1.gif)
![](/assets/wechat.assets/2.gif)


是否加key，最终会造成上面两种截然不同的情况，加key的按钮状态被保存，没有加key的状态消失，原因是：

小程序默认用“就地复用”策略。如果数据项的顺序被改变，小程序将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

- 进行wx:for循环时的key，会影响当列表内容发生改变时，虚拟DOM的第二次渲染的方式

  > 在data中有个列表arrOne，内容是[1, 2, 3, 4]，此时用wx:for进行了循环，当arrOne的表头添加了一个5进来，最终数据变成 [5, 1, 2, 3, 4]

  此时小程序的渲染方式是 

  1. 无key：内容1的div内容变成5，内容为2的div变成内容为1，以此类推，最后在新增一个div内容为4
  2. 有key：新增一个内容为5的div插入列表中，不会影响其他按钮|元素的当前状态

### -条件渲染

> 在小程序中，通过wx:if来控制小程序是否渲染，wx:if具有懒惰性，在程序打开时，若条件condition为false，初次是不会渲染，只有condition变成true才会渲染

```jsx
// wx:if
<view wx:if="{{condition}}"> condition </view>

// wx:if & wx:elif & wx:else
<view wx:if="{{number < 5}}">{{number < 5}}</view>
<view wx:elif="{{number < 10 }}">{{number < 10}}</view>
<view wx:else="{{number == 5}}">{{number == 10}}</view>

// 使用block来控制块级内容显示
<block wx:if="{{true}}">
  <text>我必显示好吧</text>
</block>

// wx:if
<view wx:if="{{number == 5}}">number</view>
```

![image-20201116192243678](/assets/wechat.assets/image-20201116192243678.png)

**官网** `wx:if` vs `hidden`

因为 `wx:if` 之中的模板也可能包含数据绑定，所以当 `wx:if` 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 `wx:if` 也是**惰性的**，如果在初始渲染条件为 `false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden` 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if` 有更高的切换消耗而 `hidden` 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 `hidden` 更好，如果在运行时条件不大可能改变则 `wx:if` 较好。

### -事件绑定

#### -基本使用

> 事件绑定是和用户交互的重要一环，那么在小程序中是如何进行绑定的呢？

```jsx
<view>
  数字：{{number}}
</view>
<button size="mini" bindtap="addNumber">增加</button>		
<button size="mini" bindtap="reduceNumber">减少</button>
```

```js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0
  },

  addNumber: function() {
    this.setData({
      number: this.data.number + 1
    })
  },

  reduceNumber: function() {
    this.setData({
      number: this.data.number - 1
    })
  }
})
```

![](/assets/wechat.assets/3.gif)

#### -事件详细系统

```html
<!-- 1. 事件基本使用 -->
<!-- touchstart：手指触摸动作开始 -->
<view bindtouchstart="bindtouchstart"></view>
<!-- touchmove：手指触摸后移动 -->
<view bindtouchmove="bindtouchmove"></view>
<!-- touchcancel：手指触摸动作被打断，如来电提醒，弹窗 -->
<view bindtouchcancel="bindtouchcancel"></view>
<!-- touchend：手指触摸动作结束 -->
<view bindtouchend="bindtouchend"></view>
<!-- tap：手指触摸后马上离开 -->
<view bindtap="bindtap"></view>
<!-- 更多事件看文档.... -->

<!-- 2. 事件绑定的四种写法 -->
<!-- bind和catch区别：
  bind  会在当前层进行捕获并向上冒泡
  catch 会在当前层进行捕获并阻拦冒泡
  mut-bind 在当前层捕捉，向上冒泡，其它层mut-bind不会触发，但是bind和catch会执行，所有mut-bind事件都是互斥的
-->
<view bindtap="bindtap"></view>
<view bind:tap="bindtap"></view>
<view catch:touchmove="bindtouchmove"></view>
<view mut-bind:tap="bindtap"></view>

<!-- 3.事件对象 -->
<!-- 
  type：事件类型
  timeStamp：事件生成时的时间戳
  target：触发当前组件事件的组件的属性集合（别的组件冒泡触发）
  currentTarget：当前组件的属性集合
  touchs：触摸的手指数
  changeTouches：新增的触摸的手指数
 -->
<view style="width:200rpx;height:200rpx;background:red" bindtap="bindtap">
  <view data-name="小于"></view>
</view>

<!-- 4. 事件捕获|冒泡阶段 -->
<!-- 
  使用bind|catch进行捕获的事件都是冒泡捕获到的，
    进行事件捕获需要使用capture-bind:tap进行设置
 -->
<view class="box1" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box1">
  <view class="box2" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box2">
    <view class="box3" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box3">
    </view>
  </view>
</view>

<!-- 5.数据传递 -->
<!-- 我们可以通过 data-[name]="[data]"的方式把数据传入事件,在事件的detail可以获取 -->
<view bindtap="setData" data-name="{{name}}"></view>
<view bindtap="setData" data-age="20"></view>

<!-- 6.事件冒泡批量传递 -->
<!-- 
  上面的data-name只能传入一个组件的数据，
  使用mark:[name]="[data]"能合并冒泡事件上所有组件带mark的数据
  mark: {sex: "box3", age: "box2", name: "box1"}
-->
<view class="box1" bindtouchmove="bindtap" mark:name="box1">
  <view class="box2" bindtap="bindtap" mark:age="box2">
    <view class="box3" bindtap="bindtap" mark:sex="box3">
    </view>
  </view>
</view>
```



### -模板定义

> 在小程序中，模板的作用类似定义函数，抽离相同代码片段定义，并在别处使用

**定义模板**

```html
<template name="myTemplate">
  <block>
    <view>姓名：{{one}}</view>
    <view>年龄：{{two}}</view>
    <view>性别：{{three}}</view>
  </block>
</template>
```

**使用模板**

```html
<template is="myTemplate"  data="{{...hobby}}"></template>
```

```jsx
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hobby: {
      one: '吃饭',
      two: '睡觉',
      three: '打豆豆'
    }
  }
})
```

**动态渲染模板**

```html
<template name="one">
  <view> 模板一 </view>
</template>
<template name="two">
  <view> 模板二 </view>
</template>

<template is="{{number % 2 == 0 ? 'one' : 'two'}}" />

<!-- 官网的例子,不同数据对应不同模板 -->
<template name="odd">
  <view> odd </view>
</template>
<template name="even">
  <view> even </view>
</template>

<block wx:for="{{[1, 2, 3, 4, 5]}}">
  <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
</block>
```

### -导出模板

> https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html

### -模块定义

> **wxs**对js语法支持的度不是很高，很多es6的语法都用不了，但是JS文件之间支持CommonJS，ES6模块

每一个 `.wxs` 文件和 `<wxs>` 标签都是一个单独的模块，模块导出用`moduel.exports`，`模块导入用require`

- `.wxs模块` 导入&导出

  **模块导出**

  ```js
  // 文件名: moduel.wxs
  var name = 'xyb'
  var age = 20
  var getGender = function () {
    return 'M'
  }
  
  module.exports = {
    name:name,
    age:age,
    getGender:getGender
  }
  ```
```
  
**模块导入**
  
  ```js
<wxs src="./moduel.wxs" module="myModuel" />	// 导入wxs模块,暴露接口myModuel
  
  <view>姓名: {{myModuel.name}}</view>
  <view>年龄: {{myModuel.age}}</view>
  <view>性别: {{myModuel.getGender()}}</view>
```

- `JS模块` 导入&导出（CommonJS & Es6）

  **模块导出**

  ```js
  const name = 'xyb'
  const age = 20
  const getGender = function () {
    return 'M'
  }
  
  // CommonJS模块导出
  module.exports = {
    name:name,
    age:age,
    getGender:getGender
  }
  
  // ES6模块导出
  export default {
    name, age, getGender
  }
  ```

  **模块导入**

  ```js
  const info1 = require('./moduel')
  console.log(info1)		// {name: "xyb", age: 20, getGender: ƒ}
  
  import info2 from './moduel'
  console.log(info2)		// {name: "xyb", age: 20, getGender: ƒ}
  ```

  

## 6.生命周期函数

> 钩子函数，也称生命周期函数，描述一个页面|小程序从创建到销毁的全部过程，基于生命周期函数我们可以在小程序执行过程（打开小程序获取信息|初始化时获取数据....）中加入自己的逻辑
>
> https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html

### -App钩子

【注册App小程序时的钩子函数】

1. `onLaunch` ：监听小程序初始化（全局只触发一次）

   > 作用一：获取小程序场景值（只获取一次）
   >
   > 作用二：获取用户信息，必要时将信息传递给服务器（只获取一次）
   >
   > 作用三：进行用户登录

2. `onShow`：监听小程序启动或切前台回来（第一次启动触发|后台切回前台触发）

   > 作用一： 获取小程序场景值（获取多次），每次后台切回小程序都会触发
   >
   > 作用二：获取用户信息，必要时将信息传递给服务器（获取多次）

3. `onHide`：监听检程序切后台（切到后台触发）
4. `onError`： 监听所有页面中的错误（有错误即执行）
5. `onPageNotFound`：当小程序进入不存在的页面的时候触发

```js
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
    switch (options.scene) {		// 获取场景值：小程序从哪里打开的（下拉菜单|收藏夹|分享...）
      case 1001: {
        // doSomething...
      }
      case 1002: {
        // doSomething...
      }
    }
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'	// 相当于在window绑定全局属性,在每个页面都能用
})
```

### -Page钩子

【注册Page页面触发的钩子函数】

1. `onLoad`：监听页面加载（页面开始加载触发）
2. `onShow`：从其他页面切回|从后台切回|第一次启动页面
3. ` onReady`：监听页面初次渲染完成
4. `onHide`：监听页面切入后台
5. `onUnload`：监听页面卸载

```js
// pages/home/home.js
Page({

  /**
   * 每个页面的初始数据
   */
  data: {
    msg: "home页面的msg",
    name: getApp()
  },

  /**
   * 生命周期函数--监听页面加载（页面开始加载触发）
   */
  onLoad: function (options) {
    console.log('Home页面onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成（每个页面只触发一次，表示可以和视图层进行交互）
   */
  onReady: function () {
    console.log('Home页面onReady')
  },

  /**
   * 生命周期函数--监听（从其他页面切回|从后台切回|第一次启动页面）
   */
  onShow: function () {
    console.log('Home页面onShow')
  },

  /**
   * 生命周期函数--监听页面切入后台
   */
  onHide: function () {
    console.log('Home页面onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('Home页面用户下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('Home页面用户上拉')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('!!!!!!!!用户分享了页面!!!!!!!!!')
  },

  /**
   * 用户点击右上角转发到朋友圈
   */
  onShareTimeline: function () {
    console.log('!!!!!!!!用户转发了朋友圈!!!!!!!!!')
  },

  /**
   * 用户点击右上角收藏
   */
  onAddToFavorites: function () {
    console.log('!!!!!!!!用户收藏了该页面!!!!!!!!!')
  }
})
```

### -双线程渲染模型

> 小程序的渲染模型是页面渲染和逻辑渲染双线程渲染

![img](/assets/wechat.assets/page-lifecycle.2e646c86.png)

## 7.组件

### -view

> 相当于div
>
> 文档: https://developers.weixin.qq.com/miniprogram/dev/component/icon.html

```html
<!-- 1.view基本使用 -->
<view>我是view</view>
<view>我独占一行</view>

<!-- 2.点击样式 -->
<!-- 属性: hover-class -->
<view class="s1" hover-class="s1Change">点击样式</view>

<!-- 3.阻止当前DOM的事件冒泡 -->
<!-- 属性: hover-stop-propagation -->
<view class="father" hover-class="fatherChange">
  <view class="son" hover-class="sonChange" hover-stop-propagation="true">
  </view>
</view>

<!-- 4.点击之后多久响应状态|持续多久 -->
<!-- 属性:hover-start-time|hover-stay-time -->
<view class="son" hover-class="sonChange" hover-start-time="1000" hover-stay-time='3000'></view>
```

![image-20201122164111079](/assets/wechat.assets/image-20201122164111079.png)

### -text

> 相当于span，行内元素
>
> 文档：https://developers.weixin.qq.com/miniprogram/dev/component/text.html

```xml
<!-- 1. 基本使用, 相当于span, \n是换行 -->
<text>姓名:{{name}}\n</text>
<text>年纪:{{age}}\n</text>
<text>性别:{{gender}}\n</text>

<!-- 2.文本能否选中 -->
<!-- 属性:user-select -->
<text user-select>长点我进行复制\n</text>
<text user-select="true">长点我进行复制\n</text>

<!-- 3.文档空格大小控制 -->
<!-- 属性:space -->
<text space="emsp">空 格\n</text>
<text space="ensp">空 格\n</text>
<text space="nbsp">空 格\n</text>

<!-- 4.是否解码文本 -->
<text decode>3 &gt; 8</text>
<text>&gt;</text>
```

### -Image

> 图片组件文档:https://developers.weixin.qq.com/miniprogram/dev/component/image.html

```html
<!-- image组件使用 -->
<!-- 
  1. 图片默认占据 320×240px 大小
  2. 单双标签都支持
  3. 是行内块元素(inline-block)
 -->
<image></image>
<image />

<!-- 1.图片路径为(本地图片|远程图片) -->
<image src="../../assets/img/kda.jpg"></image>

<!-- 2.显示相册图片 -->
<button size="mini" type="primary" bindtap="getUsetImg">选中相册图片</button>
<block wx:for="{{imgList}}">
    {{index}}<image src="{{item}}"></image>
</block>

<!-- 3.图片懒加载 -->
<!-- 属性：【lazy-load】：会先加载一部分图片，未加载的到进入一定范围加载-->
<!-- 属性：【bindload】：图片加载完成触发的回调 -->
<!-- 属性：【binderror】：图片加载错误执行的回调 -->
<image wx:for="{{20}}" src="./../../assets/img/猫.jpg" bindload="imgDone" lazy-load/>

<!-- 4.长按是否能识别图片中的小程序（比如识别小程序图片） -->
<image src="./../../assets/img/猫.jpg" show-menu-by-longpress/>

<!-- 3.图片剪裁缩放模式 -->
<!-- 属性：mode -->
<!-- 【scaleToFill】: 把图片拉满整个iage元素 -->
<!-- <image src="./../../assets/img/猫.jpg" mode="scaleToFill"></image> -->
<!-- 【aspectFit】：按照图片宽度完，全显示图片-->
<!-- <image src="./../../assets/img/猫.jpg" mode="aspectFit"></image> -->
<!-- 【aspectFill】：按照图片高度显示图片，不完全显示-->
<image src="./../../assets/img/猫.jpg" mode="aspectFill"></image>
<image src="./../../assets/img/猫.jpg" mode="widthFix"></image>
<image src="./../../assets/img/猫.jpg" mode="heightFix"></image>
<image src="./../../assets/img/猫.jpg" mode="top"></image>
<image src="./../../assets/img/猫.jpg" mode="bottom"></image>
<image src="./../../assets/img/猫.jpg" mode="left"></image>
<image src="./../../assets/img/猫.jpg" mode="right"></image>
<image src="./../../assets/img/猫.jpg" mode="top right"></image>
<image src="./../../assets/img/猫.jpg" mode="top left"></image>
<image src="./../../assets/img/猫.jpg" mode="bottom right"></image>
<image src="./../../assets/img/猫.jpg" mode="bottom left"></image> 
```

### -input

> input表单输入框：https://developers.weixin.qq.com/miniprogram/dev/component/input.html

```xml
<!-- 1.input基本使用,单双都可以 -->
<input />
<input></input>

<!-- 【type】:用户弹出的输入框的类型 -->
<input type="text" placeholder="中文键盘" />
<input type="number" placeholder="数字键盘" />
<input type="idcard" placeholder="身份证输入键盘" />
<input type="digit" placeholder="带小数点的键盘" />
<!-- 【confirm-type】：键盘右下角按钮的文字 -->
<input type="text" placeholder="send" confirm-type="send"/>
<input type="text" placeholder="search" confirm-type="search"/>
<input type="text" placeholder="next" confirm-type="next"/>
<input type="text" placeholder="go" confirm-type="go"/>
<input type="text" placeholder="done" confirm-type="done"/>
<!-- 【value】：输入框的内容 -->
<!-- 【password】：是否密码类型 -->
<!-- 【placeholder】：没有内容时的提示文字 -->
<!-- 【placeholder-style】：placeholder样式 -->
<!-- 【placeholder-class】：placeholder类名 -->
<!-- 【disabled】：是否禁用 -->
<!-- 【maxlength】：最大输入长度 -->
<input type="text" value="请输入内容" />
<input type="text" placeholder="账号" />
<input type="text" password placeholder="密码" />
<input type="text" placeholder="密码" placeholder-style="color:red;" />
<input type="text" disabled value="不能输入内容" />
<input type="text" placeholder="请输入内容" cursor-spacing="100" focus />
<!-- 事件：
      1. 【bindinput】：键盘输入时触发
      2. 【bindfocus】：输入框聚焦时触发
      3. 【bindblur】：输入框失去焦点时触发
      4. 【bindconfirm】：点击完成按钮时触发
      5. 【bindkeyboardheightchange】：键盘高度发生变化的时候触发此事件    
-->
<input bindinput="bindReplaceInput" placeholder="连续的两个1会变成2" />
```



### -button

> 按钮文档: https://developers.weixin.qq.com/miniprogram/dev/component/button.html

```html
<!-- 1.button的使用 -->
<button>按钮</button>

<!-- 2.控制大小 -->
<!-- 属性: size -->
<button size="mini">按钮</button>
<button size="default">按钮</button>

<!-- 3.按钮样式 -->
<!-- 属性: type -->
<button size="mini" type="primary">按钮</button>
<button size="mini" type="default">按钮</button>
<button size="mini" type="warn">按钮</button>

<!-- 4.按钮是否镂空 -->
<!-- 属性: plain -->
<button size="mini" type="primary" plain>按钮</button>

<!-- 5.按钮是否禁用 -->
<!-- 属性: disable -->
<button size="mini" disabled>按钮</button>

<!-- 6.按钮是否带加载动画 -->
<!-- 属性: loading -->
<button type="primary" loading>正在加载</button>

<!-- 7.获取用户信息 -->
<!-- 属性: open-type="getUserInfo" -->
<button open-type="getUserInfo" bindgetuserinfo="callback">获取信息</button>

<!-- 8.按钮按下时按钮样式 -->
<!-- 属性: hover-class -->
<button hover-class="btn" hover-stop-propagation="false">按钮</button>
```

![image-20201122152600964](/assets/wechat.assets/image-20201122152600964.png)

### -scroll-view

> scroll-view是内部可滚动视图区域，可以单独开辟一块区域进行滚动
>
> 文档：https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html

- 基本使用

  ```xml
  <!-- pages/scroll-view/scroll-view.wxml -->
  
  <scroll-view class="scorllOne" scroll-x>
    <view wx:for="{{20}}">{{index}}</view>
  </scroll-view>
  
  <scroll-view class="scorllTwo" scroll-y>
    <view wx:for="{{20}}">{{index}}</view>
  </scroll-view>
  ```

  ```css
  /* pages/scroll-view/scroll-view.wxss */
  
  .scorllOne {
    white-space: nowrap;
    margin: 10px;
  }
  
  .scorllOne view {
    display: inline-block;
    color: aliceblue;
    width: 80px;
    height: 80px;
    border: 10px solid red;
    background-color: black;
    line-height: 80px;
    text-align: center;
  }
  
  .scorllTwo {
    margin: 10px;
    height: 300px;
  }
  
  .scorllTwo view {
    border: 10px solid black;
    width: 80px;
    height: 80px;
    background-color: gold;
    text-align: center;
    line-height: 80px;
  }
  ```
  ![](/assets/wechat.assets/4.gif)

- 更多属性

  ```xml
  <!-- scroll-view的基本使用 -->
  
  <!-- 距离左边|顶部多远触发事件 -->
  <!-- 【refresher-enabled】：开启自定义刷新 -->
  <!-- 【bindscroll】：页面滚动刷新 -->
  <!-- 【upper-threshold】:距离左|顶部多远时触发 bindscrolltoupper 回调 -->
  <!-- 【lower-threshold】:距离右|底部多远时触发 bindscrolltolower 回调 -->
  <!-- 【scroll-top】：设置竖式滚动条初始位置 -->
  <!-- 【scroll-left】：设置横向滚动条初始位置 -->
  <!-- 【enable-back-to-top】：iOS点击顶部状态栏、安卓双击标题栏回到顶部，只支持竖式 -->
  
  <scroll-view class="scorllOne" scroll-x lower-threshold="100px" bindscrolltolower="lower" enable-back-to-top>
    <view wx:for="{{20}}" wx:key="*this">{{index}}</view>
  </scroll-view>
  
  <scroll-view class="scorllTwo" scroll-y scroll-top="20px" enhanced paging-enabled scroll-with-animation enable-back-to-top>
    <view wx:for="{{20}}" wx:key="*this">{{index}}</view>
  </scroll-view>
  ```

### -icon

> 图标文档：https://developers.weixin.qq.com/miniprogram/dev/component/icon.html

```js
<!-- 1.icon的使用，自定义图标 -->
<!-- 属性: type -->
<icon type="success"></icon>
<icon type="success_no_circle"></icon>
<icon type="info"></icon>
<icon type="warn"></icon>
<icon type="waiting"></icon>
<icon type="cancel"></icon>
<icon type="download"></icon>
<icon type="search"></icon>
<icon type="clear"></icon>

<!-- 2.自定义大小 -->
<!-- 属性: size -->
<icon type="success" size="50"></icon>

<!-- 3.自定义颜色，同css定义 -->
<!-- 属性：color -->
<icon type="success" size="50" color="red"></icon>
```

![image-20201122153342576](/assets/wechat.assets/image-20201122153342576.png)

## 8.wxss

### -rxp

在小程序中，`wxss`对`css`语法进行了增强，最显著的就是多了 **rpx** 这一像素单位，能够自适应各种屏幕

> 在iphone6上，屏幕宽度为375px，共有物理像素750个，所以750rpx = 375px，1px=2rpx

![](/assets/wechat.assets/image-20201125104310247.png)
![](/assets/wechat.assets/image-20201125104403636.png)
![](/assets/wechat.assets/image-20201125104525768.png)
![](/assets/wechat.assets/image-20201125104617161.png)


```xml
<!--pages/home/home.wxml-->
<view class="box1">px</view>
<view class="box2">rpx</view>
```

```css
/* pages/home/home.wxss */
.box1 {
  width: 250px;
  height: 250px;
  margin: 20px auto;
  background-color: blueviolet;
  font-size: 50px;
}

.box2 {
  width: 500rpx;
  height: 500rpx;
  margin: 20px auto;
  background-color: goldenrod;
  font-size: 100rpx;
}
```

### -css权重

> css有的特性wxss也具备，详细请参考css手册

`!import` > `行内样式` > `[页面].wxss` > `app.wxss`

### -@import导入

> 在wxss中，可以使用内置关键字`@import`在一个wxss文件中导入多个另外的样式

```css
/* pages/home/home.wxss */
@import './another.wxss';
@import './../../app.wxss'
```

```css
/* pages/home/another.wxss */
.box1 {
  width: 250px;
  height: 250px;
  margin: 20px auto;
  background-color: blueviolet;
  font-size: 50px;
}

.box2 {
  width: 500rpx;
  height: 500rpx;
  margin: 20px auto;
  background-color: goldenrod;
  font-size: 100rpx;
}
```

### -WeUI组件使用

> 这是一套基于样式库[weui-wxss](https://github.com/Tencent/weui-wxss/)开发的小程序扩展组件库，同微信原生视觉体验一致的UI组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一

## 9.wxs

### -什么是wxs?

> WXS（WeiXin Script）是微信开发的内置独特语法，用来编写 js + html 集合语法的代码

- wxml解决不了的问题：

  ```xml
  <!-- 对数据进行小数点的处理 -->
  <view>{{sum}}</view>
  <!-- 在wxml中不能使用JS语法 -->
  <view>{{sum.toFixed(2)}}</view>
  <!-- 在wxml中不能page中的方法,只能在属性中使用 -->
  <view>{{toFixed(num, 2)}}</view>
  <!-- 在别的属性中不能使用 -->
  <button bindtap="getDataArr" class="{{util.getClasee()}}">aaa</button>
  /*
   *	在wxml中,事件可以直接使用当前页面的js文件中定义的事件,但是别的属性不能使用,只能用wxs
   */
  ```
  
  ```js
  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      sum: 20.33365551127
    },
    toFixed(data, num) {
      return data.fixed(num)
    }
  })
  ```

### -wxs的使用

1. <ws></ws> 标签写法

   ```xml
   <!-- WS的定义 -->
   <wxs module="info">
     // 1. module="info"进行模块命名
     var name = 'xyb'
     var age = 20
     var sex = function () {
       return 'M'
     }
   
     module.exports = {
       // 2. 导出wxs中的私有变量
       name: name,
       age: age,
       sex: sex
     }
   </wxs>
   
   <view>
   <!-- 3. 使用变量 -->
     {{info.name}}
     {{info.age}}
     {{info.sex()}}
   </view>
   ```

2. `.ws `写法

   `home.wxs`

   ```js
   // 1. module="info"进行模块命名
   var name = 'xyb'
   var age = 20
   var sex = function () {
     return 'M'
   }
   
   module.exports = {
     // 2. 导出wxs中的私有变量
     name: name,
     age: age,
     sex: sex
   }
   ```

   `home.wxml`

   ```xml
   <wxs src="./home.wxs" module="home"></wxs>
   
   <view>
     {{home.name}}
     {{home.age}}
     {{home.sex()}}
   </view>
   ```

### -wxs之间相互导入

> `.wxs`文件之间用`require`函数进行导入

- `one.wxs`

  ```js
  // 1. module="info"进行模块命名
  var name = 'xyb'
  var age = 20
  var sex = function () {
    return 'M'
  }
  
  module.exports = {
    // 2. 导出wxs中的私有变量
    name: name,
    age: age,
    sex: sex
  }
  ```

- `two.wxs`

  ```js
  var home = require('./one.wxs')
  var another = JSON.parse(JSON.stringify(home))
  
  module.exports = {
    another: another,
    data: [
      1, 2, 3, 4
    ]
  }
  ```

## 10.事件系统

> 小程序事件：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

什么是事件：

1. 用户与小程序交互的一个主要方式（通俗）
2. 逻辑层与视图层的交流通信方式（专业）
3. 组件绑定事件，用户交互，产生事件，执行逻辑层中对应的密码
4. 组件通过事件传递额外的信息给逻辑层

### -事件的绑定

> 小程序中有四种绑定事件方式：
>
> 1. bind+事件名字：最早的方法，缺点是不容易阅读（bind tap, bindtouchmove....）
> 2. bind:事件名：语法糖（bind:tap，bind:touchmove....）
> 3. catch:事件名：阻止事件向上冒泡
> 4. mut-bind:事件名：向上冒泡，行为和bind一致，不同就是不会触发同类以mut-bind命名的事件

```xml
<view bindtap="bindtap"></view>
<view bind:tap="bindtap"></view>
<view catch:touchmove="bindtouchmove"></view>
<view mut-bind:tap="bindtap"></view>
```

### -事件类型

> 基本事件:https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

```xml
<!-- touchstart：手指触摸动作开始 -->
<view bindtouchstart="bindtouchstart"></view>
<!-- touchmove：手指触摸后移动 -->
<view bindtouchmove="bindtouchmove"></view>
<!-- touchcancel：手指触摸动作被打断，如来电提醒，弹窗 -->
<view bindtouchcancel="bindtouchcancel"></view>
<!-- touchend：手指触摸动作结束 -->
<view bindtouchend="bindtouchend"></view>
<!-- tap：手指触摸后马上离开 -->
<view bindtap="bindtap"></view>
<!-- 更多事件看文档.... -->
```

### -事件对象

> 在小程序中不允许进行DOM操作,所有的一切都是数据驱动视图,但是一些基本的组件自身的数据小程序还是会提供给我们的

```xml
<!-- 
  type：事件类型
  timeStamp：事件生成时的时间戳
  target：触发当前组件事件的组件的属性集合（别的组件冒泡触发）
  currentTarget：当前组件的属性集合
  touchs：触摸的手指数
  changeTouches：新增的触摸的手指数
 -->
<view style="width:200rpx;height:200rpx;background:red" bindtap="bindtap">
  <view data-name="小于"></view>
</view>
```

```js
{
  changedTouches: [{…}]
  currentTarget: {id: "", offsetLeft: 5, offsetTop: 799, dataset: {…}}
  detail: {}
  mark: {}
  mut: false
  target: {id: "", offsetLeft: 5, offsetTop: 799, dataset: {…}}
  timeStamp: 2576
  touches: [{…}]
  type: "touchmove"
  _requireActive: false
  _userTap: false
  __proto__: Object
}
```

### -数据传递

> 在视图层点击一个按钮，我们想把一个“哈哈”和事件对象一起传过去

```xml
<!-- 1. data-  -->
<!-- 我们可以通过 data-[name]="[data]"的方式把数据传入事件 -->
<view bindtap="setData" data-name="{{name}}"></view>
<view bindtap="setData" data-age="20"></view>


<!-- 2. mark: -->
<!-- 
  上面的data-name只能传入一个组件的数据，
  使用mark:[name]="[data]"能合并冒泡事件上所有组件带mark的数据
  mark: {sex: "box3", age: "box2", name: "box1"}
-->
<view class="box1" bindtouchmove="bindtap" mark:name="box1">
  <view class="box2" bindtap="bindtap" mark:age="box2">
    <view class="box3" bindtap="bindtap" mark:sex="box3">
    </view>
  </view>
</view>
```

### -事件冒泡和捕获

> 一个事件的产生分为捕获阶段|冒泡阶段这两个阶段

```xml
<!-- 
  使用bind|catch进行捕获的事件都是冒泡捕获到的，
    进行事件捕获需要使用capture-bind:tap进行设置
 -->
<view class="box1" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box1">
  <view class="box2" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box2">
    <view class="box3" bindtap="bindtap" capture-bind:tap="capturebindtap" data-name="box3">
    </view>
  </view>
</view>
```

```js
Page({
  bindtap: function (e) {
    console.log(e.currentTarget.dataset.name)
  },
  capturebindtap: function (e) {
    console.log(e.currentTarget.dataset.name)
  }
})
```

![image-20201127163431983](/assets/wechat.assets/image-20201127163431983.png)

## 11.组件化开发

### -自定义组件

1. 创建`components`文件夹 ![image-20201127181900514](/assets/wechat.assets/image-20201127181900514.png)

2. 创建组件文件夹
  ![image-20201123220322832](/assets/wechat.assets/image-20201127181934298.png)

3. 加上![image-20201127182033153](/assets/wechat.assets/image-20201127182033153.png)在组件的配置文件中![image-20201127182023026](/assets/wechat.assets/image-20201127182023026.png)

4. 在页面中的`json`文件中引入

   ```js
   {
     "usingComponents": {
       "my-cpn": "/components/myCpn/myCpn"
     }
   }
   ```

5. 在页面中使用

   ```xml
   <my-cpn></my-cpn>
   ```


### -组件样式

> 在自定义组件中，组件的样式是与页面的样式隔离的，除非有以下情况：
>
> 1. `app.wxss` 或引用组件页面的 `wxss` 中使用了标签名选择器（或一些其他id,属性,标签选择器）来直接指定样式，这些选择器会影响到页面和全部组件
> 2. 指定特殊的样式隔离选项 `styleIsolation` 

指定特殊的样式选项：

1. `isolated`：样式隔离，默认值
2. `apply-shared`：页面影响组件样式，组件不影响页面
3. `shared`：组件影响页面样式，也会影响组件中其他设置了 `apply-shared` 或 `shared` 的自定义组件

在组件js文件中设置：

```js
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
```

在组件json文件中设置

```json
{
  "styleIsolation": "isolated"
}
```

### -【组件-页面】通信

> 组件和页面之间的通信通过以下四个玩意实现

![image-20201123220322832](/assets/wechat.assets/image-20201129130348923.png)

1. `properties` : 页面传递数据给组件

   ```xml
   <!-- 1. 页面使用组件传递数据 -->
   <m-index data="我是页面数据" name="xyb" age="20"></m-index>
   <m-index data="我是页面数据" name="xyb" age="20"></m-index>
   <m-index data="我是页面数据" name="xyb" age="20"></m-index>
   ```

   ```js
   // 2. 组件定义字段
   Component({
     properties: {
       data: String,
       data: {
         // 另外一种写法,能够设置默认值,意见观察者函数
         type:String,
         value:'我是默认值'
       },
       name: {
         type: String,
         value: '默认name',
         observer(oldValue, newValue) {
           // 每次值发生改变都会触发
           console.log(oldValue, newValue)
         }
       },
       age: {
         type:String,
         value: '默认age',
         observer(oldValue, newValue) {
   
         }
       }
     }
   })
   ```

   ```xml
   <!-- 3. 页面通过{{}}获取字段数据,
   	如果和data中有相同,properties数据渲染时优先于data的信息,但会被setData重新渲染
   --> 
   <view class="box">
     <view>nane字段: <text>{{name}}</text> </view>
     <view>age字段: <text>{{age}}</text> </view>
     <view>data字段: <text>{{data}}</text> </view>
   </view>
   ```

2. `externalClasses` : 页面样式传递给组件

   页面中

   ```xml
   <!-- home.wxml -->
   <my-cpn my-class="text"></my-cpn>
   ```

   ```css
   /* home.wxss :页面定义好css样式,通过类名传递过去 */
   .text {
     width: 100px;
     height: 100px;
     background-color: red;
   }
   ```

   组件中

   ```js
   /* 组件 custom-component.js */
   Component({
     externalClasses: ['my-class']
   })
   ```

   ```xml
   <!--components/my-cpn/my-cpn.wxml-->
   <view class="my-class">这段文本的颜色由组件外的 class 决定</view>
   ```

3. `selectComponent`：页面调用组件方法|获取组件数据

   > 在页面中可以使用 **this.selectComponent** 来获取组件中方法|数据

   1. 给组件自定义class|id，方便`selectComponent`搜索

      ```xml
      <!-- 1. 给组件自定义class|id，方便selectComponent搜索 -->
      <m-index-cpn class="my-cpn-class" id="my-cpn-id"></m-index-cpn>
      <button bindtap="handleAddCpn">+</button>
      ```

   2. 在页面js中处理按钮点击

      ```js
      handleAddCpn() {
        // 2. 通过 class|id 获取组件
        let myCpnClass =  this.selectComponent('.my-cpn-class')
        let myCpnId =  this.selectComponent('#my-cpn-id')
      
        // 3. 获取组件的index
        console.log(myCpnClass.data.index)
        console.log(myCpnId.data.index)
      
        // 4. 调用组件方法
        myCpnId.handleAddIndex()
      
      }
      ```

   3. 组件中的代码

      ```js
      Component({
      
        data: {
          // 5. 可以被页面获取
          index: 0
        },
      
        methods: {
          // 5. 可以被页面调用
          handleAddIndex() {
            this.setData({
              index: this.data.index + 1
            })
          }
        }
      })
      ```

      ```xml
      <text>组件中的index:【{{index}}】</text>
      ```

4. `triggerEvent`：组件发送自定义事件给页面

   页面中

   > 在页面中用 bind: 监听组件的自定义事件,并在页面逻辑层进行事件处理

   ```xml
   <view class="page">
     页面中的数据: {{index}}
   </view>
   
   <my-cpn title="我的组件按钮" bind:addEvent="addEvent" bind:reduceEvent="reduceEvent"></my-cpn>
   ```

   ```js
   Page({
     data: {
       index: 0
     },
     addEvent(e) {
       console.log(e)
       this.setData({
         index: this.data.index + 1
       })
     },
     reduceEvent(e) {
       console.log(e)
       this.setData({
         index: this.data.index - 1
       })
     }
   })
   ```

   组件中

   > 在组件中，触发事件以后，在对应的事件函数里面使用**triggerEvent**发射自定义事件
   >
   > **this.triggerEvent(eventName, detail)**

   ```xml
   <view class="box">
     <view>{{title}}</view>
     <button type="primary" size="mini" bindtap="add">+</button>
     <button type="warn" size="mini" bindtap="reduce">-</button>
   </view>
   ```

   ```js
   Component({
     externalClasses: ['my-class'],
     properties: {
       title: {
         type: String,
         value: '我是默认的值'
       }
     },
     methods: {
       add() {
         this.triggerEvent('addEvent', {name: '我是传出去的信息'})
       },
       reduce() {
         this.triggerEvent('reduceEvent', {name: '我是传出去的信息'})
       }
     }
   })
   ```

   ![](/assets/wechat.assets/5.gif)

5. `<slot></slot>` 页面标签传递给组件

   > 页面在调用组件的时候 比如 `<cpn>...`另外标签`<cpn>` 这个另外标签就会传入组件的`<slot></slot>`

   **单个插槽使用:**

   1. 定义组件中的插槽

      ```xml
      <view>
        <slot></slot>
      </view>
      ```

   2. 页面中使用组件

      ```xml
      <!-- 组件单个插槽使用 -->
      <my-cpn-slot>
        <button>我是一个按钮</button>
      </my-cpn-slot>
      
      <my-cpn-slot>
        <view>我是一个文本</view>
      </my-cpn-slot>
      ```

   **多个插槽使用:**

   1. 使用 `name=""` 给插槽命名

      ```xml
      <block>
        <view>我是组件头部</view>
        <view class="box1">
          <slot name="slot1"></slot>
        </view>
        <view class="box2">
          <slot name="slot2"></slot>
        </view>
        <view class="box3">
          <slot name="slot3"></slot>
        </view>
        <view>我是组件尾部</view>
      </block>
      ```

   2. 在组件中开启多插槽的使用

      ```js
      Component({
        options: {
          multipleSlots: true
        }
      })
      ```

   3. 在页面中使用

      ```xml
      <!-- 组件多个插槽使用 -->
      <my-cpn-slot>
        <view slot="slot3">我是slot3的内容</view>
        <view slot="slot1">我是slot1的内容</view>
        <view slot="slot2">我是slot2的内容</view>
      </my-cpn-slot>
      ```

### -Component构造器

> 在这里列举一些开发常用的属性
>
> 官方文档:   https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html

1. `properties`：页面传入组件的数据 <m-cpn title="标题" />,用{{title}}获取

2. `data`：组件内部初始化数据, 和properties一起渲染,用{{index}}获取

3. `externalClasses`：页面传递样式给组件，前提是页面需要先定义

4. `observers`：用于监听properties|data内的数据的变化

5. `methods`：组件内置方法，供组件使用

6. `lifetimes`: 监听组件本身的生命周期

7. `pageLifetimes`：监听页面的生命周期函数

   ```js
   Component({
   
     // properties:页面传入组件的数据 <m-cpn title="标题" />,用{{title}}获取
     properties: {
       pageValue: {
         type: Number,
         value: '默认值'
       }
     },
   
     // data：组件内部初始化数据, 和properties一起渲染,用{{index}}获取
     data: {
       index: 0,
       age: 20
     },
   
     // externalClasses：页面传递样式给组件，前提是页面需要先定义
     externalClasses: ["my-class"],
   
     // observers：用于监听properties|data内的数据的变化
     observers: {
       "index, age, pageValue": function (indexNewV, ageNewV, pageValueNewV) {
         // console.log(indexNewV, ageNewV, pageValueNewV)
       },
       index: function (old) {
         console.log(old)
       }
     },
   
     // methods：组件内置方法，供组件使用
     methods: {
       handleAddIndex() {
         this.setData({
           index: this.data.index + 1
         })
         throw 666
       },
       handleAddAge() {
         this.setData({
           age: this.data.age + 1
         })
       },
       handlePageValue() {
         this.triggerEvent('handlePageValue')
       },
       throwError() {
         throw new Error('错误')
       }
     },
   
     // lifetimes: 监听组件本身的生命周期
     lifetimes: {
       // 组件实例被创建
       created() {
         console.log(1)
       },
   
       // 在组件实例进入页面节点树时执行
       attached() {
         console.log(2)
       },
   
       // 在组件在视图层布局完成后执行
       ready() {
         console.log(3)
       },
   
       // 组件执行发生错误
       error(e) {
         console.log('error', e)
       },
   
       // 组件实例被移动到节点树另一个位置时执行
       moved() {
         console.log('moved')
       },
   
   
       // 在组件实例被从页面节点树移除时执行,wx:if="false"可以移除不渲染组件
       detached() {
         console.log('delete')
       },
   
     },
   
     // pageLifetimes：监听页面的生命周期函数
     pageLifetimes: {
       // 组件所在的页面被展示时执行
       show() {
         console.log('页面被展示')
       },
   
       // 组件所在的页面被隐藏时执行
       hide() {
         console.log('页面被隐藏')
       }
     }
   })
   ```

   



## 12.网络请求

### -wx.request

> 微信提供了 `wx.request` 这个接口进行网络请求
>
> 文档：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html

参数

- `url`：服务器地址（https://xxx.xxx.xxx/xxx）
- `data`：请求参数（query?xxx=xxx）
- `method`：HTTP 请求方法
- `header`：设置请求的 header，header 中不能设置 Referer`content-type` 默认为 `application/json`
- `timeout`：超时时间，单位为毫秒
- `dataType`：返回的数据格式
- `responseType`：响应的数据类型
- `success`：成功的回调
- `fail`：接口调用失败的回调函数
- `complete`：接口调用结束的回调函数（调用成功、失败都会执行）

```js
Page({
  data: {
    realTime: [],
    future: []
  },

  onLoad: function (options) {
    wx.request({
      url: 'http://apis.juhe.cn/simpleWeather/query',
      data: {
        city: '杭州',
        key: "b47cb890fb6a26cedad27397af8a114f"
      },
      success: (res) => {
        console.log(res.data.result.future)
        this.setData({
          future: res.data.result.future,
          realTime: res.data.result.realTime
        })
      }
    })
  }
})
```

### -封装请求

> 在开发中我们需要对 `wx.request` 进行封装，降低代码之间的耦合度，如果有很多的请求使用wx.request进行请求数据，那么代码之间的耦合度会变成的非常高，一旦这个接口修改了，或者废弃， 那么项目中所有的请求都需要进行修改

```js
function request(options) {
  return new Promise((resolve, reject) => {
    const handleOptions = {
      url: '',
      data: '',
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0'
      },
      method: 'GET',
      success: resolve,
      fail: reject,
      complete: () => {},
      ...options
    }
    wx.request(handleOptions)
  })
}

export {
  request
}
```

## 13.小程序登录

> 小程序可以通过微信提供的登录能力方便的获取微信提供的用户身份标识（唯一身份标识），快速建立小程序内的用户体系

### -登录时序图

![image-20201202083040837](/assets/wechat.assets/image-20201202083040837.png)



## 14.小程序页面路由跳转

> 页面跳转的的本质就是压栈，当前小程序最多压10层栈，跳转重复页面也会压栈

小程序通过两种方式进行页面跳转：

1. 通过<navigator></navigator> 进行跳转
2. 通过API进行跳转

小程序跳转页面|回退页面的原理：

通过一个栈堆堆当前页面跳转进行管理，进行跳转的时候会把当前页面压入栈中（不删除页面的选项），当在跳转的页面进行回调的时候，根据栈内的位置进行页面的回调

![](/assets/wechat.assets/image-20201202225220460.png)

![](/assets/wechat.assets/image-20201202230658348.png)

### -通过组件跳转

> 通过<navigator></navigator> 进行跳转

1. `url`：小程序跳转的内部页面地址 例：/pages/one/one 
2. `open-type`：小程序跳转方式
   - **navigate**：保留当前页面，跳转到一个非**tabbar**页面（页面栈最多压十层）
   - **redirect**：关闭当前页面，跳转到一个非**tabbar**页面（在当前页面栈中删除该页面）
   - **switchTab**：清空所有非 **tabBar** 页面，跳转到 **tabBar** 页面（在当前页面栈中清空）
   - **reLaunch**：跳转到指定的**任何一个页面**，然后清空页面栈（全能）（清空页面栈）
   - **navigateBack**：关闭当前页面，返回上一页面（**delta="[number]"**能指定返回**[number]**层页面）
   - **exit**：关闭小程序，和**target="miniProgram"**一起时才生效
3. `target`：在哪个目标上发生跳转，默认当前小程序（当前小程序只能跳转自己的页面，一个萝卜一个坑）
4. `delta`：表示回退的层数，和 **open-type = 'navigateBack'**  配合使用

```xml
<navigator url="/pages/one/one" open-type="redirect">点击跳转one页面</navigator>
<navigator url="/pages/tabBar1/tabBar1" open-type="reLaunch">跳转到tabBar（×）</navigator>
<navigator url="/pages/tabBar1/tabBar1" open-type="switchTab">跳转到tabBar（√）</navigator>
<navigator url="/pages/tabBar2" open-type="switchTab">跳转到tabBar（√）</navigator>
<navigator open-type="navigateBack" delta="1">返回one页面</navigator>
```

### -通过API跳转

> API跳转的原理和组件跳转的原理一样，都是对当前页面栈进行压栈

1. `wx.navigateTo(Object object)` 

   > 保留当前页面，跳转到一个非**tabbar**页面（页面栈最多压十层）

   ```xml
   <button bindtap="handleNavigateTo">点击跳转one页面</button>
   ```

   ```js
   Page({
     handleNavigateTo() {
       wx.navigateTo({
         // 1. 跳转的页面
         url: 'pages/one/one',
         // 2. 页面间通信接口
         events: {},
         // 3. 成功|失败的回调
         success: () => {},
         fail: () => {},
         complete:() => {}
       })
     }
   })
   ```

2. `wx.redirectTo(Object object)`

   > 关闭当前页面，跳转到一个非**tabbar**页面（在当前页面栈中删除该页面）

   ```xml
   <button bindtap="handleRedirectTo" type="primary">点击跳转two页面</button>
   ```

   ```js
   Page({
     handleRedirectTo() {
       wx.redirectTo({
         url: '/pages/two/two',
         success: () => {},
         fail: () => {},
         complete:() => {}
       })
     }
   })
   ```

3. `wx.switchTab(Object object)`

   > 清空所有非 **tabBar** 页面，跳转到 **tabBar** 页面（在当前页面栈中清空）

   ```xml
   <button bindtap="handleSwitchTab" type="primary">点击跳转tabBar1页面</button>
   ```

   ```js
   Page({
     handleSwitchTab() {
       wx.switchTab({
         url: '/pages/tabBar1/tabBar1',
         success: () => {},
         fail: () => {},
         complete:() => {}
       })
     }
   })
   ```

4. `wx.reLaunch(Object object)`

   > 跳转到指定的**任何一个页面**，然后清空页面栈（全能）（清空页面栈）

   ```xml
   <button bindtap="handleReLaunch" type="primary">点击跳转tabBar2页面</button>
   ```

   ```js
   Page({
     handleReLaunch() {
       wx.reLaunch({
         url: '/pages/tabBar2/tabBar2',
         success: () => {},
         fail: () => {},
         complete:() => {}
       })
     } 
   })
   ```

5. `wx.navigateBack(Object object)`

   > 关闭当前页面，返回上一页面（**delta="[number]"**能指定返回**[number]**层页面）
   >
   > PS：若当前页面处在栈堆最底层，则没有页面能够跳转，console会报错

   ![image-20201203002317015](/assets/wechat.assets/image-20201203002317015.png)

   ```xml
   <button bindtap="handleNavigateBack" type="primary">进行页面的回退</button>
   ```

   ```js
   handleNavigateBack() {
     wx.navigateBack({
       delta: 1,		// 回退的页数
       success: () => {},
       fail: () => {},
       complete: () => {}
     })
   }
   ```

### -页面跳转数据传递

> 页面跳转的时候分为 `当前页面->跳转页|跳转页->当前页` 传递数据这两种需求

1. 当前页 -> 跳转页传递数据

   **当前页**

   ```js
   Page({
     handleTapPage() {
       wx.navigateTo({
         /**
          * 当前页面传递到跳转页面数据传递方式：
          *    1. 在url中携带参数
          *    2. 使用事件订阅|发布
          */
         // 1. 在url中携带参数
         url: '/pages/test/test?name=xyb&age=20',
         success: function (res) {
           // 2. 使用事件订阅|发布
           res.eventChannel.emit('myFn', {
             hobby: ['吃饭', '睡觉']
           }, [0, 1, 2, 3])
         }
       })
     }
   })
   ```

   **跳转页**

   ```js
   Page({
     onLoad(opt) {
       // 获取数据方式一
       console.log(opt)  // {name: "xyb", age: "20"}
   
       // 获取方式二
       const eventChannel = this.getOpenerEventChannel()
       console.log('eventChannel', eventChannel)
       eventChannel.on('myFn', (...args) => {
         // [ {hobby: ['吃饭', '睡觉']}, [0, 1, 2, 3] ]
         console.log('args', args) 
       })
     }
   })
   ```

2. 跳转页 -> 当前页传递数据

   **当前页**

   ```js
   Page({
     handleTapPage() {
       /**
        * 跳转页给当前页传递数据:
        *  1. 事件发布订阅法师
        */
       wx.navigateTo({
         url: '/pages/test/test',
         events: {
           // 订阅事件
           myFn(...args) {
             console.log('args', args)
             // [{name: 'xyb'}, {age: 20}]
           }
         }
       })
     }
   })
   ```

   **跳转页**

   ```js
   Page({
     onLoad(opt) {
       const eventChannel = this.getOpenerEventChannel()
       // 发射事件
       eventChannel.emit('myFn', {name: 'xyb'}, {age: 20})
     }
   })
   ```

## 15.WeChatAPI

### -客户端本地存储

> 本地存储数据的API

- 增

  > 有同步和异步两种方式

  `wx.setStorageSync(stringKey andData)`

  **同步的方式**

  需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象

  ```js
  try {
    wx.setStorageSync('key', 'value')
  } catch (e) { }
  ```

  `wx.setStorage(Object)`

  **异步的方式**

  ```js
  wx.setStorage({
    key:"缓存的key名",
    data:"缓存的数据,支支持原生类型,Date,以及能通过JSON.stringfy序列化的对象",
    success: () => {
      console.log('成功的回调')
    },
    fail: () => {
      console.log('失败的回调')
    },
    complete: () => {
      console.log('成功|失败都会调用')
    }
  })
  ```

- 删

  1. 删除key=value键值对数据

     > 有同步和异步两种方式

     `wx.removeStorageSync(string key)`

     **同步的方式**

     本地缓存中指定的 key

     ```js
       wx.removeStorageSync({
         key: 'key',
         success (res) {
           console.log(res)
         }
       })
     ```

     `wx.removeStorage(Object object)`

     **异步的方法**

     ```js
     wx.removeStorage({
       key:"缓存的key名",
       success: () => {
         console.log('成功的回调')
       },
       fail: () => {
         console.log('失败的回调')
       },
       complete: () => {
         console.log('成功|失败都会调用')
       }
     })
     ```
  2. 删除所有的本地存储

     `wx.clearStorageSync()`

     **同步方式**

     ```js
     try {
       wx.clearStorageSync()
     } catch(e) {
       // Do something when catch error
     }
     ```

     `wx.clearStorage(Object object)`

     **异步方法**

     ```js
     wx.clearStorage()
     ```

- 查

  1. 查看缓存的相关信息

     > 查看缓存有同步和异步两种方法

     `wx.getStorageSync(string key)`

     **同步的方法**

     ```js
     wx.getStorage({
       key: 'key',
       success (res) {
         console.log(res.data)
       }
     })
     ```

     `wx.getStorage(Object object)`

     **异步的方法**

     ```js
     wx.getStorage({
       key:"缓存的key名",
       success: () => {
         console.log('成功的回调')
       },
       fail: () => {
         console.log('失败的回调')
       },
       complete: () => {
         console.log('成功|失败都会调用')
       }
     })
     ```

  2. 查看storage的相关信息，比如当前占用的空间，限制的空间的大小

     > 查看storage的方式有同步和异步两种

     `Object wx.getStorageInfoSync()`

     **同步的方法**

     ```js
     try {
       const res = wx.getStorageInfoSync()
       console.log(res.keys)								// 当前storage中的所有key
       console.log(res.currentSize)				// 当前占用的空间大小
       console.log(res.limitSize)					// 限制的空间的大小
     } catch (e) {
       // Do something when catch error
     }
     ```

     `any wx.getStorageSync(string key)`

     **异步的方法**

     ```js
     wx.getStorageInfo({
       success (res) {
         console.log(res.keys)						// 当前storage中的所有key
         console.log(res.currentSize)		// 当前占用的空间大小
         console.log(res.limitSize)			// 限制的空间的大小
       }
     })
     ```

### -获取用户信息

获取用户数据有以下两种方法

- 首次获取信息需要授权，二次多次登陆直接使用 `wx.getUserInfo` 接口
- 世界使用`open-data` 获取公开的用户数据

获取用户信息需要用户进行授权，当用户授权后，以后可以用`wx.getUserInfo(Object object)` 来获取信息

1. 用户首次授权

  > 使用button，当用户点击时，弹出窗口进行权限赋值

  ```js
  <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">登录</button>
  
  // getUserInfo()
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  }
  ```

  ![](/assets/wechat.assets/image-20201226000652106.png)


2. 二次登录直接获取数据

   > 小程序获得授权后，第二次登陆直接在 `onReady` 中获取用户数据

   ```js
   onReady() {
     /**
        * wx.getUserInfo:
        *  若用户授权登录权限, 会执行成功回调, 否则失败
        */
     wx.getUserInfo({
       success:(res) => {
         this.setData({
           userInfo:res.userInfo
         })
       },
       fail:(res) => {
         console.log(res)  // {errMsg: "getUserInfo:fail scope unauthorized"}
       }
     })
   }
   ```

   ![image-20201123220322832](/assets/wechat.assets/image-20201226001039209.png)
    
   ```html
   <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">登录</button>
   ```

   ```js
   // pages/home/home.js
   Page({
     getUserInfo: function(info) {
       console.log(info)	// {type: "getuserinfo", timeStamp: 1082, target: {…}, currentTarget: {…}, mark: {…}, …}
     }
   })
   ```

还有一种不需要授权即可获取公开数据的方式

1. 通过 `open-data` 组件展示用户公开数据.

   ```xml
   <open-data type="userNickName"></open-data>		// 用户名称
   <open-data type="userAvatarUrl"></open-data>	// 头像
   <open-data type="userGender"></open-data>			// 性别
   ```

   


### -获取相片图片

> 通过`wx.chooseImage()`API获得用户图片

```js
// pages/image/image.js

Page({
  data: {
    imgList: []
  },
  getUsetImg() {
    // 使用系统API，让用户选择图片|拍照
    wx.chooseImage({
      /**
       *  count: 用户可以选择的最大图片数
       */
      count: 9,
      /** 
       *  sourceType: 图片来源(相册|相机)
       *    1.album: 来源为相册
       *    2.camera:来源为相机
       */
      sourceType: ['album', 'camera'],
      /**
       *  sizeType: 图片上传支持(原图:original|压缩图:compressed)
       *    1.original: 选择图片能选择原图
       *    2.compressed: 选择图片能选择缩略图
       *    3.如果只有一个选项默认为那一个
       */
      sizeType: ['original', 'compressed'],
      /**
       *  success,fail,complete三个属性
       *    1.success: 成功回调
       *    2.fail: 失败回调
       *    3.complete: 不管怎么样都会执行
       *    4.wx.chooseImage返回的是一个Promise,可以用then,finall替代
       */
    }).then(
      value => {
        console.log(value)
        this.setData({
          imgList: JSON.parse(JSON.stringify(value.tempFilePaths))
        })
      },
      reason => {
        console.log('发生错误', reason)
      }
    ).finally(
      () => {
        console.log('不管怎么都会执行')
      }
    )
  }
})
```

```xml
<!-- pages/image/image.wxml  -->

<button size="mini" type="primary" bindtap="getUsetImg">选中相册图片</button>
<block wx:for="{{imgList}}">
    {{index}}<image src="{{item}}"></image>
</block>
```

![image-20201122223629326](/assets/wechat.assets/image-20201122223629326.png)

### -小程序弹窗

1. #### 基础弹窗

   > 注意: [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 和 [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 同时只能显示一个

   ![image-20201122223629326](/assets/wechat.assets/image-20201130215120405.png)
   ![image-20201122223629326](/assets/wechat.assets/image-20201130215155547.png)
   ![image-20201130215208416](/assets/wechat.assets/image-20201130215208416.png)

   |   属性   |   类型   |                       说明                       |
   | :------: | :------: | :----------------------------------------------: |
   |  title   |  string  |                    提示的内容                    |
   |   icon   |  string  |                    显示的图标                    |
   |  image   |  string  |                  自定义图标路径                  |
   | duration |  number  |                   图标停留时间                   |
   |   mask   | boolean  |          是否显示透明蒙层，防止触摸穿透          |
   | success  | function |              接口调用成功的回调函数              |
   |   fail   | function |              接口调用失败的回调函数              |
   | complete | function | 接口调用结束的回调函数（调用成功、失败都会执行） |

   ```js
   wx.showToast({
     title: '成功',
     icon: 'success',
     duration: 2000
   })
   
   wx.showToast({
     title: '加载中',
     icon: 'loading',
     duration: 3000
   })
   
   wx.showToast({
     title: '成功',
     icon: 'none',
     duration: 2000
   })
   ```

1. #### 按钮弹窗

   > 这种弹窗具有取消和确定的按钮，主要用于交互
   >
   > https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html

   ![image-20201122223629326](/assets/wechat.assets/image-20201130220154437.png)

   |    属性     |   类型   |                       说明                       |
   | :---------: | :------: | :----------------------------------------------: |
   |    title    |  string  |                    提示的标题                    |
   |   content   |  string  |                    提示的内容                    |
   | showCancel  | boolean  |                 是否显示取消按钮                 |
   | cancelText  |  string  |          取消按钮的文字，最多 4 个字符           |
   | confirmText |  string  |          确认按钮的文字，最多 4 个字符           |
   |   success   | function |              接口调用成功的回调函数              |
   |    fail     | function |              接口调用失败的回调函数              |
   |  complete   | function | 接口调用结束的回调函数（调用成功、失败都会执行） |

   ```js
   wx.showModal({
     title: '提示标题',
     content: '这是一个有按钮的弹窗',
     success (res) {
       if (res.confirm) {
         console.log('用户点击确定')
       } else if (res.cancel) {
         console.log('用户点击取消')
       }
     }
   })
   ```

2. #### 加载提示框

   > 这个和第一个加载框不同，需主动调用 `wx.hideLoading` 才能关闭提示框，可控性更强

   ![image-20201122223629326](/assets/wechat.assets/image-20201130220636545.png)

   ```js
   wx.showLoading({
     title: '我在加载中',
   })
   
   // 自定义加载圈圈转多久
   setTimeout(wx.hideLoading, 5000)
   ```

3. #### 操作菜单

   > 显示操作菜单
   
   ![image-20201123220322832](/assets/wechat.assets/image-20201130220735508.png)

   |   属性    |      类型      |                       说明                       |
   | :-------: | :------------: | :----------------------------------------------: |
   | alertText |     string     |                     警示文案                     |
   | itemList  | Array.string |         按钮的文字数组，数组长度最大为 6         |
   | itemColor |     string     |                  按钮的文字颜色                  |
   |  success  |    function    |              接口调用成功的回调函数              |
   |   fail    |    function    |              接口调用失败的回调函数              |
   | complete  |    function    | 接口调用结束的回调函数（调用成功、失败都会执行） |

   ```js
   wx.showActionSheet({
     itemList: ['吃饭', '睡觉', '打豆豆'],
     success: (res) => {
       // 用户点哪个弹哪个
       console.log(res.tapIndex)
       switch(res.tapIndex) {
         case 0:
           break
         case 1:
           break
       }
     },
     fail (res) {
       // 用户点击了取消
       console.log('用户点击了取消')
       // console.log(res.errMsg)
     }
   })
   ```


### -小程序转发

> 转发小程序有两种方式，①：设置`onShareAppMessage`钩子，右上角菜单能转发 ②：设置按钮的open-type

1. 设置`onShareAppMessage`钩子，右上角菜单能转发（没有这个钩子不能进行转发）

   ```js
   Page({
   
     /**
      * 1. 分享方法一
      * 用户点击右上角分享触发，如果没有这个生命周期函数，用户不能分享
      *  return {Object}
      */
     onShareAppMessage: function () {
       return {
         // title：小程序转发之后的标题
         title: '我是默认的转发小程序的标题',
         // path: 用户点击分享的小程序之后进入的页面
         path: '/pages/index/index',
         // imageUrl：小程序转发之后的显示图
         imageUrl: '/assets/img/猫.jpg'
       }
     }
   })
   ```

2. 设置按钮的`open-type="share"` ，点击该按钮，会调用页面的`onShareAppMessage` 函数，如果没有`onShareAppMessage` 函数，则发送默认的页面

   ```xmls
   <button open-type="share">转发</button>
   ```

   

## 16.小程序云部署

1. 项目下创建一个![image-20201123220322832](/assets/wechat.assets/image-20201123220322832.png)文件夹
2. ![image-20201123220447769](/assets/wechat.assets/image-20201123220447769.png)中添加 
   ![image-20201123220322832](/assets/wechat.assets/image-20201123220334886.png)
3. 在全局的![image-20201123220554093](/assets/wechat.assets/image-20201123220554093.png) 中添加
   ![image-20201123220322832](/assets/wechat.assets/image-20201123220627015.png)
4. 代码写好后点击开发者工具右上角的 ![image-20201123220654218](/assets/wechat.assets/image-20201123220654218.png)
5. 在小程序后台管理中 =>
   ![image-20201123220322832](/assets/wechat.assets/image-20201123220807909.png)
  

## 17.蓝牙连接

1. 初始化蓝牙
2. 搜索周边设备
3. 需要获取搜索到的蓝牙设备信息
4. 通过蓝牙设备的id进行蓝牙连接
5. 连接上需要的蓝牙设备之后，获取这个蓝牙设备的服务uuid



1. 初始化蓝牙，这一步目的是为了检查用户用没有打开系统蓝牙

   > openBluetoothAdapter

2. 确认用户打开蓝牙后，打开搜索蓝牙的功能

   > startBluetoothDevicesDiscovery
   
3. 监听被搜索到的蓝牙，若之前一步开启了重复上报，那只要蓝牙数据改变就会一直调用该函数

   > onBluetoothDeviceFound

   ```js
   // 一个被搜索到的蓝牙的基本信息
   device： {
     RSSI: -81
     deviceId: "C9:43:D9:F3:52:AC"		// 标识唯一蓝牙对象
     localName: "]\\\U6Z\_T]^Z"
     name: "]\\\U6Z\_T]^Z"
   }
   ```

4. 点击蓝牙进行配对，配对需要`deviceId`，也就是唯一蓝牙标识

   > createBLEConnection({deviceId, success: (res) => {}})

   ```js
   // 连接成功后即可获取蓝牙的所有服务
   ```

5. 配对成功后获取蓝牙的所有服务，这一步必须在蓝牙连接的基础上

   > getBLEDeviceServices({deviceId})

   ```js
   // 该步骤会返回蓝牙的所有服务，服务里面的uuid就是服务ID
   (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   0: {uuid: "0000180A-0000-1000-8000-00805F9B34FB", isPrimary: true}
   1: {uuid: "00001530-0000-3512-2118-0009AF100700", isPrimary: true}
   2: {uuid: "00001811-0000-1000-8000-00805F9B34FB", isPrimary: true}
   3: {uuid: "00001802-0000-1000-8000-00805F9B34FB", isPrimary: true}
   4: {uuid: "0000180D-0000-1000-8000-00805F9B34FB", isPrimary: true}
   5: {uuid: "0000FEE0-0000-1000-8000-00805F9B34FB", isPrimary: true}
   6: {uuid: "0000FEE1-0000-1000-8000-00805F9B34FB", isPrimary: true}
   7: {uuid: "00003802-0000-1000-8000-00805F9B34FB", isPrimary: true}
   8: {uuid: "00001800-0000-1000-8000-00805F9B34FB", isPrimary: true}
   9: {uuid: "00001801-0000-1000-8000-00805F9B34FB", isPrimary: true}
   length: 10
   nv_length: (...)
   __proto__: Array(0)
   ```

6. 获取蓝牙特征值

   > getBLEDeviceCharacteristics({deviceId, serviceId})

   ```js
   // 该步骤会返回某个 isPrimary=true 服务的所有特征值, 这里的uuid是特征值id
   [{…}, {…}, {…}, {…}, {…}]
   0:
   properties: {read: true, write: false, notify: false, indicate: false}
   uuid: "00002A25-0000-1000-8000-00805F9B34FB"
   __proto__: Object
   1: {uuid: "00002A27-0000-1000-8000-00805F9B34FB", properties: {…}}
   2: {uuid: "00002A28-0000-1000-8000-00805F9B34FB", properties: {…}}
   3: {uuid: "00002A23-0000-1000-8000-00805F9B34FB", properties: {…}}
   4: {uuid: "00002A50-0000-1000-8000-00805F9B34FB", properties: {…}}
   length: 5
   nv_length: (...)
   __proto__: Array(0)
   ```

7. 如果设备支持

   1. read

      > readBLECharacteristicValue

      ```js
      // 使用这个方法能够读取低功耗蓝牙设备的特征值的二进制数据值
      wx.readBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId: item.uuid,
      })
      
      // 返回的数据要在onBLECharacteristicValueChange中绑定回调才能拿到
      wx.onBLECharacteristicValueChange((characteristic) => {
        console.log('我是特征值', characteristic)
      })
      
      // 特征值
      {value: ArrayBuffer(12), deviceId: "C9:43:D9:F3:52:AC", serviceId: "0000180A-0000-1000-8000-00805F9B34FB", characteristicId: "00002A25-0000-1000-8000-00805F9B34FB"}
      characteristicId: "00002A25-0000-1000-8000-00805F9B34FB"
      deviceId: "C9:43:D9:F3:52:AC"
      serviceId: "0000180A-0000-1000-8000-00805F9B34FB"
      value: ArrayBuffer(12)
      [[Int8Array]]: Int8Array(12) [53, 56, 48, 56, 49, 53, 56, 97, 50, 50, 99, 57]
      [[Int16Array]]: Int16Array(6) [14389, 14384, 13617, 24888, 12850, 14691]
      [[Int32Array]]: Int32Array(3) [942684213, 1631073585, 962802226]
      [[Uint8Array]]: Uint8Array(12) [53, 56, 48, 56, 49, 53, 56, 97, 50, 50, 99, 57]
      byteLength: (...)
                   __proto__: ArrayBuffer
                   __proto__: Object
      ```

   2. write

      > writeBLECharacteristicValue

      ```js
      // 向蓝牙设备中写入数据
      writeBLECharacteristicValue: function () {
        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, 0)
      
        wx.writeBLECharacteristicValue({
          characteristicId: this._characteristicId,
          deviceId: this._deviceId,
          serviceId: this._serviceId,
          value: buffer,
          success: (res) => {
            console.log('写入成功', res)
          },
          fail: (reason) => {
            console.log('写入失败', reason)
          }
        })
      }
      ```
