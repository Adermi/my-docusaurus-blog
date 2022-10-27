---
id: react
title: React学习
---


## 一.React脚手架

### 1.什么是React?

1. React 是一个用于呈现用户界面 (UI) 的 JavaScript 库（UI 是由按钮、文本和图像等小单元构建的）且React是一款**渐进式框架**：

   渐进式框架的几个特点：

   :key: 我们如果只想使用一个框架中的几个功能时，不必引入一个庞大的框架，那样过于臃肿, 渐进式框架的特点就是能够把各个功能进行拆分, 让用户自己组合功能, 想要什么功能就拿什么

2. 为什么要用React？
   1. 原生JS操作DOM效率低（会引起浏览器不断的重绘和重排），尤其是现代的网站
   2. 原生JS没有组件化编码方案，代码复用率低
   3. React采用申明式编码，是数据驱动框架，我们只需要关注数据，不用管DOM
   4. 可以在React Native中使用React语法进行移动端开发
   5. React使用虚拟DOM + Diffing算法，尽量减少真是DOM的交互

6. 什么是React全家桶

   指的是一个框架提供的所有渐进式框架的总和

   :one: ​Vue全家桶: Vue/Vue-router/vuex/axios(fetch)/vue element(vant)

   :two: React全家桶: react/react-dom/react-router/axios/ant/dva/saga.mobx/

7. React最核心的是什么？

   React最核心的两个库：

   :one: ​react: 核心部分, 提供了Componet类供我们进行组件开发, 提供了钩子函数(生命周期函数, 所有生命周期函数都是基于回调函数完成的【如：挂在前传入回调函数|执行传入回调|挂载后传入回调|执行结束传入回调】)

   :two: react-dom: webpack会把**jsx**语法进行编译, 追后通过render函数渲染成真实的DOM, 能放到浏览器中展示



### 2.基础使用

>  React是FaceBook公司研发的一款JS框架(M【model 数据层】V【view视图层】C【controller控制层】)

:one: ​React的脚手架简介

**JSX**是React独有的语法，浏览器是不兼容的，还有各种**JS CSS 图片**资源文件等等，都需要用到**webpack**对我们写的代码进行编译

但是，配置**webpack**是一个比较复杂的工作，需要自己安装许多的包，还要写复杂的配置文件，这时脚手架能帮我们快速的构建一套自动化工程项目结构，有助于提高开发效率(自动配置开发前所有的依赖和设置)

- 脚手架的好处：

  - 自动安装React核心组件： **React** | **ReactDOM**
  - 自动安装**webpack**，并且完成相关配置：
    1. 区分生产环境和开发环境
    2. 安装BABEL以及对应的语言解析包，可以把REACT和ES6语法一起进行编译
    3. 安装了CSS/STYLR/FILE等加载器，处理CSS等合并压缩问题
    4. 安装很多的插件，可以实现JS|CSS|HTML的分离，打包，压缩等等
    5. 安装了WEBPACK-DEV-SERVER，可以在开发环境下，编译自动创建站点服务，能够实时进行代码的修改，并且立刻映射到浏览器中


:two: **​CREATE-REACT-APP** 的使用

1. **安装**

   ```js
   npm install create-react-app -g	  // 安装在全局
   ```

2. 使用

   ```js
   create-react-app [项目名称]
   
   // 项目名称: 小写字母 | 数字 | - | _
   // 如果之前没有安装React，create-react-app会帮我们安装这些
   /*
    *	cnpm install packages
    *	cnpm install react
    *	cnpm install react-dom
    *	cnpm install cra-template
    */
   
   如果电脑安装了yarn，在创建工程目录的时候，走的时候yarn安装，yarn和npm主体相同，但是处理起来还是有点区别，所以我们后续向工程中添加模块的时候，如果项目走yarn，一切命令都用yarn，不建议和npm混用
   ```

   ![1594621518595](/assets/React.assets/1594621518595.png)

:three: ​React项目目录

- 项目目录

  ```js
  | - my-first-app 项目根目录
      | - node_modules
      |		|- .bin 所有本地可执行命令脚本
      |		|- ... 各种模块
      |
      | - public 存放的是当前项目的HTML页面（有可能是一部分静态资源文件）
      |		| - index.html 主页面
      |		| ... 静态资源文件
      |
      | - src 存放的是项目所需要的所有JS或者静态资源等（包括组件，store，路由，数据，ajax请求数据）
      |		| - index.js 项目入口
      |
      | - package.json 当前项目的配置清单
  ```

  ![image-20200615193354781](/assets/React.assets/image-20200615193354781.png)

- 目录详解

  `node_modules` 项目依赖

  `public` 存放的是当前项目的HTML文件

  - .html 文件中中文件的导入

    ```html
    <!-- 
    在React中, 所有逻辑都是在JS中完成的, 包括页面的创建, 
    	如果想给页面导入CSS或者JS,有两种方式导入
    1. 在JS中基于ES6 Module模块规范, 会使用import导入, 这样webpack在编译时候, 就会把对应的资源导入到页面中
    	<link rel="apple-touch-icon" href="%PUBLIC_URL%/log o192.png" />
    2. 如果不想在JS中导入, 也可以把资源手动在HTML中导入, 但是HTML也要基于webpack编译要把%PUBLIC_URL%写成绝对地址
    	<link rel="manifest" href="C:/index/data/manifest.json" /> 
    -->
    ```

  `src`	项目最重要的目录, 所有JS, 路由, 组件都是放在这个里面(包括css, 图片等)

  `.gitignore` git提交时忽略的文件目录

  `package.json` 当前项目的依赖清单

  - dependencies	: 项目依赖

  - scripts                 : 当前可运行的脚本

    `yarn start`	: 默认监听3000端口, 并且打开浏览器, 代码一旦改动就刷新页面

    `yarn build`    : 编译项目, 使用这个命令可以打包压缩项目

### 3.深入配置

**webpack**配置项默认是隐藏的，脚手架只把React的部分暴露给我们，目的是为了避免目录结构混乱

所有的**webpack**配置项都放在了`node_modules/react-scripts`模块

![1594622876661](/assets/React.assets/1594622876661.png)

> 在真实的项目中， 我们需要在脚手架默认的安装的配置基础上加自己的东西， 例如**react-ruter-dom|axios等等**这些默认配置没有的东西, 那怎么办呢?

1. 如果我们安装其他的组件, 但是安装后该不需要被**webpack**处理, 此时可以直接导入安装并使用

   ![image-20200616185602281](/assets/React.assets/image-20200616185602281.png)

2. 如果安装的插件是基于**webpack**处理的, 模块需要被配置到**webpack**中(就需要重新修改**webpack**配置了)

   > 比如 **less**, 我们预览项目的时候, 看到的是**webpack**编译后的内容, 如果使用了**less**, 需要在**webpack**中修改配置项, 在配置项中加入**less**的编译工作, 这样后期查看项目, 里面less才会生效

   **具体操作**:

   1. 首先要把隐藏到**node_module**中的**webpack**配置暴露到项目中


   2. 在项目根目录下输入命令

      ```shell
      > $ yarn eject			# 过程不可逆转
      ```

   3. 项目下会暴露两个文件 

      `config`   webpack配置文件

      `scripts` 可执行的js脚本文件

      ```js
      暴露的两个文件
      | - config	webpack配置文件
      |		| - webpack.config.js	webpack配置文件
      |		| - webpackDevServer.config.js
      |		| - ...
      |
      | - script	可执行的js脚本文件 `yarn start`  `yarn build` 等命令的执行文件
      |		| build.js
      |		| start.js
      |		| test.js
      ```

   4. 安装less加载器【基于脚手架配置less】

      ```js
      > $ yarn add less-loader
      ```

   5. 修改webpack配置项

      在 `module -> rules -> oneOf` 下添加![image-20200616192424847](/assets/React.assets/image-20200616192424847.png)

### 4.脚手架配置代理

:one: ​方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

:two: ​方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

### 5.yarn命令

1. `yarn start`

   创建一个本地服务器，提供http服务（测试项目用 ）

   【windows】

   ```shell
   $ set HTTPS=true&&npm start	// 修改协议
   $ set PORT=3000&&npm start	// 修改端口
   ```

   【Mac/Linux】

   ```shell
   $ HTTPS=true&&npm start	// 修改协议
   $ PORT=3000&&npm start	// 修改端口
   ```

2. `yarn build`

   生成一个build文件夹，存放最后打包的文件



## 二.JSX语法

### 1.JSX的本质

JSX语法是JavaScript的扩展语法，JSX允许你在JS中编写HTML。

但是本质上JSX语法最终还是会被React用CreateElement编译成虚拟DOM，也就是一颗对象树。

```tsx
// createElement函数签名
function createElement(type, props, ...children)
```
![1594621518595](/assets/React.assets/image-20200622171323271.png)
![1594621518595](/assets/React.assets/image-20200622172457858.png)

### 2.JSX的规则

#### -.{  }的使用

1. 组件返回JSX时，一定要是一个单标签 `<target>......</target>`的形式

   ```jsx
   // 正确的
   export default function App() {
     return (
         <div>
           <p></p>
           <span></span>
         </div>
     )
   }
   
   // 如果最外层不想有标签，可以用空标签 <></> 包裹
   export default function App() {
     return (
       <>
         <p>aaaa</p>
         <span></span>
       </>
     );
   }
   
   // 可以用Fragment标签，这个标签对比<></>的原因是可以加key
   import { Fragment } from "react";
   
   export default function App() {
     return (
       <Fragment>
         <p>aaaa</p>
         <span></span>
       </Fragment>
     );
   }
   
   ```

   ```jsx
   // 错误的
   export default function App() {
     return (
       <div>
         <p></p>
         <span></span>
       </div>
       <div></div>	{/* 这里报错 */}
     );
   }
   ```

2. 在 {} 中的内容必须是有返回值的 **JS表达式**

   JSX表达式就是能够返回值的JS代码【如: 三元，短路运算，自执行函数，闭包，基本数据类型，数组(内无对象)...】

   而像 【for循环，while循环，switch语句等等是没有返回值的】，不能写在 {} 中。

   ![1594621518595](/assets/React.assets/image-20210419211124931.png)

3. 怎么给HTML标签添加属性，类型，样式

   1. 给标签添加 **class**，**id**

      ```jsx
      // 由于webpack会帮我们整合所有代码， 所以我们需要什么样式直接 import 即可
      
      import 'static/css/myCss.css'		// 引入css样式，CSS加载器会处理
      
      ReactDOM.render(
        <section id='.container' className={'.child'}>		{/* 直接写样式即可 */}
          {1 + 1 > 2 ? 'M' : 'F'}
        </section>,
        root
      )
      ```

      ![1594918330220](/assets/React.assets/1594918330220.png)

   2. 添加 **Style**【style的值很特殊，需要使用对象作为{}的值】

      ```jsx
      // 写法一
      ReactDOM.render(
        <section id='.container' style={{color: 'red', fontSize: '100px'}}>
          {1 + 1 > 2 ? 'M' : 'F'}
        </section>,
        root
      )
      
      // 写法二
      let myStyle = {
        color: 'red', 
        fontSize: '100px',
        width: '100%'
      }
      ReactDOM.render(
        <section id='.container' style={myStyle}>
          {1 + 1 > 2 ? 'M' : 'F'}
        </section>,
        root
      )
      ```




#### -.条件渲染

条件渲染就是**有条件的返回 JSX**，不同的逻辑返回不同 JSX 树，例如：

```jsx
// if/else
if (isPacked) {
    return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

**不返回任何内容时，可以返回 null**，组件是必须要返回一些东西的。

```jsx
// 当JSX没有任何返回时，可以返回null
if (isPacked) {
    return null;
}
return <li className="item">{name}</li>;
```

**三元表达式**；

```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

**&&条件渲染**；左侧条件为条件为真，渲染JSX。左侧条件为假时，整个表达式返回false，就像返回 null，underfined一样，React不会渲染任何内容；注意**左侧的条件不要写0**，表达式最后会返回0并会渲染到页面上。

```jsx
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

#### -.列表渲染

> 使用 map 组合数组，使用 filter 过滤数组，使用这两个方法不会改变组件纯度。

**JSX会自动在 {} 渲染列表的数据**；

1. 列表数据

   ```jsx
   const people = [
     'Creola Katherine Johnson: mathematician',
     'Mario José Molina-Pasquel Henríquez: chemist'
   ];
   ```

2. 映射数组

   ```jsx
   const listItems = people.map(person => <li>{person}</li>);
   ```

3. 渲染数据

   ```jsx
   return <ul>{listItems}</ul>;
   ```

   ![image-20220411102608168](/assets/React.assets/image-20220411102608168.png)

**为每个列表项添加key**；

- 为什么需要key？key的作用是能让React识别每一个数组项，其中key就是每一个数组项的名称。想象一下：每一个数组项都有自己单独的状态（选中状态，input有输入值），当我新增了一个数组项，React是如何保证之前每个数组项的状态是和上一次相同的，就是用到了key和上一次进行对比，依次把状态对号入座，才能保证数组项被更新时各自状态正确分配。便于DOM树的更新。

![](/assets/React.assets/19.gif)![](/assets/React.assets/20.gif)



## 三.React组件

### 1.组件的作用

组件的作用：

1. 代码化繁为简，把大问题分解成小问题（大页面拆解成小小的一块快小组件），构建更有层次，更容易维护的代码。
2. 提高代码复用性，仅仅通过传递不同的参数就能够渲染不同的效果。

### 2.创建组件

> 每个自定义**组件的命名都必须是大写**的，否则**React**不会渲染。

在React中，大写的标签是定义的组件`<MyCompent/>`，小写的标签时浏览器内置的标签`<img>`。

```jsx
// 创建并导出一个组件
export default function MyComponent() {
  return <div>hello world !!</div>;
}

// () 导出多行JSX
export default function MyComponent() {
  return (
  	<div>
     	<p>111</p>
       	<span>222</span>
     </div>
  )
}
```

组件需要返回**JSX**或者**null(无返回)**，如果返回的代码一行写不下时，请用 **( )** 包裹代码返回。

### 3.导入导出组件

> 使用ES6模块导入和导出组件

一个模块能有**多个命名导出**和一个**默认导出**

```js
// 命名导出
export const a = 1
export const b = 1
export const c = 1

// 默认导出，注意这里不用像上面那样申明变量const
export default {}
```

导入的方式有三种

```js
// 命名导入，这里的导入必须和导出的名字一样，结构出这几个命名导出
import {a, b, c} from './text.js'
import {a as aa, b as bb, c as cc} from './text.js'

// 默认导入，用什么变量接收都可以
import val from './text.js'
import { default as val } from './text.js'

// 全导入
import * as obj from './text'
/*
 * {
 *    a: （…）,
 *    b: （…）,
 *    c: （…）,
 *    default: （…）
 *  }
 */
```

![image-20220410204444744](/assets/React.assets/image-20220410204444744.png)

### 4.属性props

React 组件使用**props**相互通信。每个父组件都可以传递**props**传递给子组件，就行HTML标签的属性一样

第一步：将**props**传递给子组件

```jsx
export default function App() {
  return <Text name={'xyb'} age={20}></Text>
}
```

第二步：在子组件中结构**props**，组件的唯一参数是一个对象，就是**props**

```jsx
export default function Text({name = 'default', age}) {	// 指定默认值
  return <p>name: {name}  age: {age}</p>
}
```

**传递所有的属性**；如果不想写重复的属性传递给子组件，请用 {...} 传递所有属性。

```jsx
export default function App(props) {
  return <Text {...props}></Text>
}
```

**作为子孩子传递JSX**；在JSX中也可以像HTML般嵌套子标签，需要解构出**props.children**

```jsx
// App.js
export default function App() {
  return <Card>
    <Text></Text1>
  </Card>
}

// Text.js
export default function Card({children}) {
  return <p>
    {children}
  </p>
}
```

![image-20220411134857781](/assets/React.assets/image-20220411134857781.png)



### 5.纯函数组件

纯函数：就像一个数学公式，给定什么输入，就会有什么输出，它不会更改调用之前存在的任何对象或变量。

**纯函数的优点**：只管自己的事，行为是可预测的，减少意想不到的bug发生。

```jsx
// 纯函数
function Cup1({ guest }) {
  return (
    <>
      <h2>{guest.name}</h2>
      <h2>{guest.age * 2}</h2>
      <h2>{guest.sex - 3}</h2>
    </>
  );
}

// 纯函数（函数内部创建和修改内部的变量，不影响外界）
function Cup2({ guest }) {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(<li>{i}</li>);
  }

  return arr;
}

// 不纯函数
function Cup3({ guest }) {
  guest.aa = 2000; // 修改了外部变量,不纯
  return <h2>{guest.aa}</h2>;
}
```

但是有些时候，程序不得不改变外界的变量，我们称之为**副作用**，这些副作用可以通过[`useEffect`](https://beta.reactjs.org/apis/useeffect)在的组件中调用将它附加到返回的 JSX。

### 6.响应事件

React 允许将事件处理程序添加到 JSX 中。用以响应用户交互（如单击、悬停、表单输入等）。

所有的浏览器事件处理程序名都在React中被重写，如`click => onClick`，事件处理程序都以 **on **开头。这些事件接收一个函数（不需要调用），在用户触发事件时被自动调用，并传入触发当前事件的对象。

```jsx
// 正常写法
export default function App() {

  function handleAlter(e) {
    console.log(e)
    alert('点击了按钮')
  }

  return (
    <button onClick={handleAlter}>按钮</button>
  );
}

// 内联写法
export default function App() {
  return (
    <button onClick={e => fn(e, 1, 2, 3)}>按钮</button>
  );
}
```

**把事件通过属性传递给子组件**，子组件再挂载到真实的html标签上。

```jsx
export default function App() {
  return <Button onAlert={(e) => console.log(666)}></Button>;
}

function myButton({ onAdd }) {
  return <button onClick={onAdd}></button>;
}
```

**阻止冒泡 e.stopPropagation( )**，比如点击事件有冒泡。

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

**阻止浏览器默认行为 e.preventDefault( )**，比如表单提交会刷新页面。

```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

---xyb

### 7.React渲染流程

组件渲染有两个原因：

1. 组件初始渲染（调用**ReactDOM.render**，把组件用[`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild)添加到页面上）
2. 组件状态更新（调用[`set`函数](https://beta.reactjs.org/apis/usestate#setstate)更新状态触发重新渲染。如果渲染之间产生差异，React只会改变两次渲染之间不同的DOM节点）

- 在初始渲染的时候，React会调用根组件，并且一直递归下去渲染根组件。

- 在后续的渲染更新中，若有组件返回了新的组件，React会把这些新组件进行递归初始渲染，直到没有了更多的嵌套组件。

React在渲染中只会改变DOM发生变化的节点：

```jsx
import { useState } from "react";

export default function App() {
  const [time, setTime] = useState(1);

  return (
    <>
      <h2>{time}</h2>
      <button onClick={e => setTime(time + 1)}>add</button>
      <input type="text" />
    </>
  );
}
```

![](/assets/React.assets/23.gif)

首次渲染：![image-20220412113455565](/assets/React.assets/image-20220412113455565.png)

点击按钮之后再次渲染：![image-20220412113523274](/assets/React.assets/image-20220412113523274.png)

两次渲染之间，只有**h2**的内容发生了变化，所以**React**只会替换页面上的**h2**标签，而**input**的内容会被保留，因为**DiffDOM**算法只会把页面上的h2标签重新渲染，其他两个**button**和**input**压根就不会被修改。



### 8.状态state

由于交互的需要，组件需要改变屏幕上UI的内容，比如下一页，加载更多，加入购物车。组件需要记住一些东西：就是当前的输入值，在React中称之为**State**状态

我们首先来看一个计数器的例子：

```jsx
export default function App() {
  let val = 1;

  return (
    <>
      <p>val: {val}</p>
      <button onClick={(e) => (val = val + 1)}>+</button>
      <button onClick={(e) => (val = val - 1)}>+</button>
    </>
  );
}

```

![](/assets/React.assets/21.gif)

两个点击事件正在修改局部变量val，但是页面上的UI并没有发生变化，这是因为：

1. **局部变量在组件每次重新渲染时不会被保留**，所以每次都是1。
2. **修改局部变量不会触发组件重新渲染**，所以React压根就不会重新渲染这个组件。

:one:要使用**以数据变化致使组件更新**，需要做两件事：

1. **保留**每次组件渲染之间的数据。
2. **触发**React重新渲染，把保留的数据更新到UI中。

React提供了**useState**来做这两件事：

```jsx
import { useState } from "react";

export default function App() {
  let [val, setVal] = useState(1);

  return (
    <>
      <p>val: {val}</p>
      <button onClick={e => setVal(val + 1)}>+</button>
      <button onClick={e => setVal(val - 1)}>-</button>
    </>
  );
}
```

![](/assets/React.assets/22.gif)

**useState**返回两个参数：一个每次渲染之间保留的值，和一个触发React重新渲染的函数

调用**setVal**，并传入一个**新的值2**，React会**重新渲染App组件**，并在这次重新渲染的时候**val**的值就变成了**2**，并且每个组件的状态是独立私有的。

> useState的原理：https://codesandbox.io/s/iopjnk?file=/index.js&from-sandpack=true

> React Hooks原理：https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

:two: 如何更新状态对象和状态数组

在React中，你需要将状态看成不可变的（即使对象和数组是可以被直接修改的），你应该始终是创建新的副本替换他们进行更新，而不是修改进行更新（这称之为突变，会造成意想不到的bug）。

**修改对象**，需要创建一个新对象

```jsx
export default function App() {
  const [data, setData] = useState({
    name: "xyb",
  });

  function handleInput(e) {
    const newObj = {		// 创建新的副本
      ...data,
      name: e.target.value,
    };
    setData(newObj);
  }

  return (
    <div>
      <input type="text" value={data.name} onChange={handleInput} />
    </div>
  );
}

```

**修改数组**，需要创建新数组

```jsx
export default function App() {
  const [data, setData] = useState([0, 1]);

  return (
    <div>
      {data.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <button
        onClick={(e) => {
          setData([data.length, ...data]);	{/* 使用...复制数组的值 */}
        }}
      >
        add
      </button>
    </div>
  );
}
```

**使用Immer可以直接修改状态值**，这个库会生成新的对象|数组副本（当代码内有深层次的嵌套使用）

```shell
# 安装依赖
$ yarn add immer
$ yarn add use-immer
```

```jsx
import { useImmer } from "use-immer";

export default function App() {
  const [data, setData] = useImmer([0, 1]);

  function handleAddItem(e) {
    setData((draft) => {	// 直接在draft上进行修改
      draft.push(data.length);
    });
  }

  return (
    <div>
      {data.map((item) => (<p key={item}>{item}</p>))}
      <button onClick={handleAddItem}>add</button>
    </div>
  );
}
```

:three: 状态的保持和重置

**状态和组件之间的关系是隔绝的**，状态存储在React内部中。React根据组件在UI树来追踪哪些状态应该属于哪些组件。

1. UI树中相同的位置**返回相同组件**，状态会被保留。

   ```jsx
   export default function App() {
     const [isFancy, setIsFancy] = useState(false);
     return (
       <div>
         {isFancy ? (
           <Counter isFancy={true} /> 	 {/* 变换props，组件还是Counter */}
         ) : (
           <Counter isFancy={false} />  {/* 变换props，组件还是Counter */}
         )}
         <label>
           <input type="checkbox" checked={isFancy}
             onChange={e => setIsFancy(e.target.checked)}
           />
           切换Style
         </label>
       </div>
     );
   }
   ```

   ![](/assets/React.assets/28.gif)

   ![1594621518595](/assets/React.assets/image-20220412221759578.png)

2. UI树中相同的位置**返回不同的组件**，状态会被删除。

   ```jsx
   export default function App() {
     const [showB, setShowB] = useState(true);
     return (
       <div>
         <Counter />
         {showB && <Counter />} 	{/* 条件渲染，UI树会在这个位置移除这个组件，状态会删除 */}
         <label>
           <input type="checkbox" checked={showB}
             onChange={e => setShowB(e.target.checked)}
           />
           Render the second counter
         </label>
       </div>
     );
   }
   ```

   ![](/assets/React.assets/27.gif)

   ![image-20220412221046152](/assets/React.assets/image-20220412221046152.png)

3. UI树中相同的位置**返回相同组件，每个组件有不同key**，**重置状态**。

   对组件使用key，能够告诉React这两个组件是两个的组件，两者有各自的key名，这两个相同的的组件状态不需要共享。

   ```jsx
   export default function Scoreboard() {
     const [isPlayerA, setIsPlayerA] = useState(true);
     return (
       <div>
         {isPlayerA ? (
           <Counter key="Taylor" person="Taylor" />	{/* 不同的key */}
         ) : (
           <Counter key="Sarah" person="Sarah" />		{/* 不同的key */}
         )}
         <button onClick={() => {
           setIsPlayerA(!isPlayerA);
         }}>
           下一个运动员
         </button>
       </div>
     );
   }
   ```

   



### 9.状态更新流程

使用**useState**函数返回的**set**函数**能够修改状态**，并能够**触发React的重新渲染**。

> set函数是异步的，如果一次性多次调用set函数，不会立刻得到新的状态值。

React状态更新流程是这样的：

1. 调用**set**函数，把这一次状态更新动作放入状态更新队列中。
2. 触发**React**重新渲染组件。
3. **React**再次调用你的**组件函数**，组件根据**新的状态值**返回新的JSX。

:one: 传值更新状态

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);	// 0 + 1
        setNumber(number + 1);	// 0 + 1
        setNumber(number + 1);	// 0 + 1
      }}>+3</button>
    </>
  )
}
```

![](/assets/React.assets/24.gif)

因为**setNumber**是异步，**number**不会被立刻更新，每次传入**setNumber**中的值都是 **number + 1** ，也就是 **0 + 1**。

可以理解成：

```jsx
setNumber(0 + 1);	// 1
setNumber(0 + 1);	// 1
setNumber(0 + 1);	// 1
```

![1594621518595](/assets/React.assets/image-20220412141902965.png)

:two: 传函数更新状态

**如果想在下一次渲染前就更新状态值**，可以传递回调函数给**setNumber**

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1); // 0 + 1
          setNumber((val) => val + 1); // 1 + 1
          setNumber((val) => val + 1); // 2 + 1
        }}>+3</button>
    </>
  );
}
```

![](/assets/React.assets/25.gif)

![image-20220412143852825](/assets/React.assets/image-20220412143852825.png)



:key: 状态队列的原理

```jsx
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // 如果状态更新是一个函数
      finalState = update(finalState);
    } else {
      // 如果状态更新是一个值
      finalState = update;
    }
  }

  return finalState;
}
```

### 10.Reducer

当系统越来越复杂，每个组件都要维护很多的状态，不利于管理和维护。使用reducer将状态提取到一块，让组件是无状态的，只负责UI渲染，所有状态由Reducer管理，不仅能够降低代码的复杂度，更有利于测试和调试。

1. 第一步：从设置状态转移到调度动作

   ```jsx
   function handleAddTask(text) {
     dispatch({
       type: 'added',
       id: nextId++,
       text: text,
     });
   }
   
   function handleChangeTask(task) {
     dispatch({
       type: 'changed',
       task: task
     });
   }
   
   function handleDeleteTask(taskId) {
     dispatch({
       type: 'deleted',
       id: taskId
     });
   }
   ```

2. 第二步：编写Reducer函数

   ```jsx
   function tasksReducer(tasks, action) {
     switch (action.type) {
       case 'added': {
         return [...tasks, {
           id: action.id,
           text: action.text,
           done: false
         }];
       }
       case 'changed': {
         return tasks.map(t => {
           if (t.id === action.task.id) {
             return action.task;
           } else {
             return t;
           }
         });
       }
       case 'deleted': {
         return tasks.filter(t => t.id !== action.id);
       }
       default: {
         throw Error('Unknown action: ' + action.type);
       }
     }
   }
   ```

3. 第三步：使用组件中的Reducer

   ```jsx
   import { useReducer } from 'react';
   
   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
   ```

   ```jsx
   // 完整的代码
   import { useReducer } from 'react';
   import AddTask from './AddTask.js';
   import TaskList from './TaskList.js';
   
   export default function TaskApp() {
     const [tasks, dispatch] = useReducer(
       tasksReducer,
       initialTasks
     );
   
     function handleAddTask(text) {
       dispatch({
         type: 'added',
         id: nextId++,
         text: text,
       });
     }
   
     function handleChangeTask(task) {
       dispatch({
         type: 'changed',
         task: task
       });
     }
   
     function handleDeleteTask(taskId) {
       dispatch({
         type: 'deleted',
         id: taskId
       });
     }
   
     return (
       <>
         <h1>Prague itinerary</h1>
         <AddTask
           onAddTask={handleAddTask}
         />
         <TaskList
           tasks={tasks}
           onChangeTask={handleChangeTask}
           onDeleteTask={handleDeleteTask}
         />
       </>
     );
   }
   
   function tasksReducer(tasks, action) {
     switch (action.type) {
       case 'added': {
         return [...tasks, {
           id: action.id,
           text: action.text,
           done: false
         }];
       }
       case 'changed': {
         return tasks.map(t => {
           if (t.id === action.task.id) {
             return action.task;
           } else {
             return t;
           }
         });
       }
       case 'deleted': {
         return tasks.filter(t => t.id !== action.id);
       }
       default: {
         throw Error('Unknown action: ' + action.type);
       }
     }
   }
   
   let nextId = 3;
   const initialTasks = [
     { id: 0, text: 'Visit Kafka Museum', done: true },
     { id: 1, text: 'Watch a puppet show', done: false },
     { id: 2, text: 'Lennon Wall pic', done: false }
   ];
   ```

   

### 11.上下文

上下文允许父组件向所有后代组件传递信息，不论多深，而无需通过 props 显式传递数据。

> 详细文档：https://beta.reactjs.org/learn/passing-data-deeply-with-context#step-3-provide-the-context

![image-20220413143536917](/assets/React.assets/image-20220413143536917.png)

1. 第一步：创建上下文

   ```jsx
   import { createContext } from 'react';
   
   export const LevelContext = createContext(1);		// 默认值
   ```

2. 第二步：使用上下文

   ```jsx
   import { useContext } from 'react';
   import { LevelContext } from './LevelContext.js';
   
   export default function Heading({ children }) {
     const level = useContext(LevelContext);
     switch (level) {
       case 1:
         return <h1>{children}</h1>;
       case 2:
         return <h2>{children}</h2>;
       case 3:
         return <h3>{children}</h3>;
       case 4:
         return <h4>{children}</h4>;
       case 5:
         return <h5>{children}</h5>;
       case 6:
         return <h6>{children}</h6>;
       default:
         throw Error('Unknown level: ' + level);
     }
   }
   ```

3. 第三步：提供上下文

   ```jsx
   import { LevelContext } from './LevelContext.js';
   
   export default function Section({ level, children }) {
     return (
       <section className="section">
         <LevelContext.Provider value={level}>
           {children}
         </LevelContext.Provider>
       </section>
     );
   }
   ```

   ```jsx
   import Heading from './Heading.js';
   import Section from './Section.js';
   
   export default function Page() {
     return (
       <Section level={1}>
         <Heading>Title</Heading>
         <Section level={2}>
           <Heading>Heading</Heading>
           <Heading>Heading</Heading>
           <Heading>Heading</Heading>
           <Section level={3}>
             <Heading>Sub-heading</Heading>
             <Heading>Sub-heading</Heading>
             <Heading>Sub-heading</Heading>
             <Section level={4}>
               <Heading>Sub-sub-heading</Heading>
               <Heading>Sub-sub-heading</Heading>
               <Heading>Sub-sub-heading</Heading>
             </Section>
           </Section>
         </Section>
       </Section>
     );
   }
   ```

   

## 七.react-router

1. 单页面应用 ( SPA  : S-single单 P-page页 A-application应用 )

   项目只有一个页面, 所有需要展示的内容在**一个**页面中实现切换 ( 移动端页面居多 | PC端管理系统居多 )

   > 如何实现单页面应用:

   - 基于服务器渲染, 后台可以基于 'include' 技术...

   - 基于iframe实现单页面应用 

   - 模块化开发

     AMD: REQUIRE.JS

     CMD: SEA.JS

     基于这些思想把每一个模块单独写成一个模块, 基于GRUNT/GULP/FIS等自动化工具,最后把所有模块合并到首页,通过控制哪些模块显示隐藏

2. 多页面应用 ( MPA : M-multi多 P-page页 A-application应用  )

   项目由很多页面组成, 所有需要展示的内容在**多个**页面中实现切换 ( PC端应用居多 )

### 1.基本使用

> react-router: V3.x.x以前叫法
>
> react-router-dom: V4.x.x及以后叫法

:european_castle: 基本使用

1. 在页面中明确导航区，展示区

2. 导航区的a标签改为Link组价

   ```jsx
   import {Link} from 'react-router-dom'
   
   {/* 编写路由连接 */}
   <Link to='/home'><button>Home</button></Link>
   <Link to='/info'><button>Info</button></Link>
   ```

3. 展示区的内容使用Route组件展示

   ```jsx
   import {Route} from 'react-router-dom'
   
   {/* 注册路由 */}
   <Route path='/home' component={Home}></Route>
   <Route path='/info' component={Info}></Route>
   ```

4. 在这两个组件外面需要包裹浏览器路由或者hash路由两者之一

   ```jsx
   import {BrowserRouter, HashRouter} from 'react-router-dom'
   
   {/* 最外层组件包裹BrowserRouter|HashRouter */}
   <BrowserRouter><App></App></BrowserRouter>
   <HashRouter><App></App></HashRouter
   ```

   ![](/assets/React.assets/10.gif)

### 2.两种组件区别

**两种组件区别**

 :key: 路由组件和一般组件不同，一般组件是由我们定义，我们使用单|双标签调用渲染，而且路由组件是需要我们把组件当做属性传入路由组件，由路由组件渲染

- 一般组件

  ```jsx
  import {Header} from '../src/components/Header'
  
  // 调用一般组件
  <Header></Header>
  ```

- 路由组件

  ```jsx
  import {Link, Route} from 'react-router-dom'
  import {Header} from '../src/components/Header'
  
  // 调用路由组件
  <Link to='/home'><button>Home</button></Link>
  <Route path='/home' component={Home}></Route>		// 把一般组件传入路由组件
  ```

:key: 两种组件的存放的路径

- 一般组件

  ![image-20210427110909330](/assets/React.assets/image-20210427110909330.png)

- 路由组件

  ![image-20210427110950505](/assets/React.assets/image-20210427110950505.png)

### 3.路由API

1. **`<Link></Link>`**

   最基本的进行路由跳转的API

   |  参数   |                             说明                             |  类型   |
   | :-----: | :----------------------------------------------------------: | :-----: |
   |   to    |                       要跳转到哪个路由                       | string  |
   |   to    |                一个对象，包含要跳转路由的信息                | object  |
   | replace | 若为true，则不是进行历史记录压栈操作，而是直接替换当前历史记录 | boolean |
   | others  |            其他的标签属性，比如className，id等等             | string  |

   ```jsx
   import { Link } from 'react-router-dom'
   
   <Link to="/about">About</Link>
   ```

   ```jsx
   <Link to='/courses?sort=name'/>
   
   <Link to={{
     pathname: '/courses',
     search: '?sort=name',		// 点击这个路由，自动拼接pathname
     hash: '#the-hash',			// 浏览器路由下，点击路由，拼接pathname
     state: { fromDashboard: true }
   }}/>
   ```

2. `<NavLink>`

   可以添加样式的路由

   |      参数       |                         说明                         |   类型   |
   | :-------------: | :--------------------------------------------------: | :------: |
   | activeClassName | 路由被激活时，给该渲染元素添加样式，默认给**active** |  string  |
   |   activeStyle   |            当元素处于active时，渲染的样式            |  object  |
   |    isActive     |            当路由被active的时候调用的函数            | function |

   ```jsx
   // 修改路由被激活时，给该渲染元素添加样式，默认给active类名
   <NavLink
     to="/faq"
     activeClassName="selected"
   >FAQs</NavLink>
   ```

   ```jsx
   // 当元素处于active时，渲染的样式
   <NavLink
     to="/faq"
     activeStyle={{
       fontWeight: 'bold',
       color: 'red'
      }}
   >FAQs</NavLink>
   ```

   ```jsx
   // 元素处于active时候，触发的回调
   const oddEvent = (match, location) => {
     if (!match) {
       return false
     }
     const eventID = parseInt(match.params.eventID)
     return !isNaN(eventID) && eventID % 2 === 1
   }
   
   <NavLink
     to="/events/123"
     isActive={oddEvent}
   >Event 123</NavLink>
   ```

   ![](/assets/React.assets/9.gif)

   ![](/assets/React.assets/11.gif)

3. `<Switch>`

   :one: ​当页面中的路由渲染重复时，可以用`<Switch>`来实现唯一路由渲染（）

   ```jsx
   // 当有多个路由重复的时候，只会渲染一个路由
   <Switch>
     <Route path='/home' component={Home}></Route>
     <Route path='/home' component={Home}></Route>
     <Route path='/home' component={Home}></Route>
     <Route path='/info' component={Info}></Route>
     <Route path='/info' component={Info}></Route>
     <Route path='/info' component={Info}></Route>
   </Switch>
   ```

4. `<Redirect/>`

   渲染 `<Redirect>` 将使导航到一个新的地址，可以作为默认渲染路由

   ```jsx
   <Switch>
     <Route path="/info/news" component={News}></Route>
    <Route path="/info/message" component={Messages}></Route>
     <Redirect to="/info/message"></Redirect>
   </Switch>
   ```

   

### 4.二次封装路由

先看以下的一个场景：

- 页面中有很多的 NavLink 路由，并且每个路由都有 className 和 activeClassName，那么页面会非常混乱

  ```jsx
  <NavLink to="/1" className="router-link" activeClassName="selected"></NavLink>
  <NavLink to="/2" className="router-link" activeClassName="selected"></NavLink>
  <NavLink to="/3" className="router-link" activeClassName="selected"></NavLink>
  <NavLink to="/3" className="router-link" activeClassName="selected"></NavLink>
  <NavLink to="/4" className="router-link" activeClassName="selected"></NavLink>
  ```

- 所以我们应该对 NavLink 进行二次封装，把重复的代码进行封装，整一个一般组件

  ```jsx
  import React, { Component } from 'react'
  import {NavLink} from 'react-router-dom'
  
  export default class index extends Component {
    render() {
      return (
        <NavLink className="router-link" activeClassName="selected" {...this.props}></NavLink>
      )
    }
  }
  
  <NavLink>Home</NavLink> === <NavLink children="Home"></NavLink>
  ```

- 优化后的代码如下

  ```jsx
  <MyNavLink to="/1"></MyNavLink>
  <MyNavLink to="/2"></MyNavLink>
  <MyNavLink to="/3"></MyNavLink>
  <MyNavLink to="/3"></MyNavLink>
  <MyNavLink to="/4"></MyNavLink>
  ```


### 5.解决样式丢失

1. 修改文件引入

   ```jsx
   // 不要用.来引入文件，因为.他是基于当前路由来引入文件的
   <link rel="stylesheet" href="./css/antd.css">
   <link rel="stylesheet" href="/css/antd.css">
   ```

2. 使用**%PUBLIC_URL%**关键字，脚手架会自动把这个关键字替代成public文件夹路径

   ```jsx
   <link rel="stylesheet" href="%PUBLIC_URL%/css/antd.css">
   ```

3. 使用hash路由

### 7.二级路由

> 二级路由，三级路由的原理就是利用路由的模糊匹配渲染组件

:key: 模糊匹配

Route组件中的路径，是否是Link组件的路径的子集（二级路由就是靠模糊匹配）

```jsx
<NavLink to="/home/a/b">Home</NavLink>
<NavLink to="/info/a/b">info</NavLink>

<Switch>
  <Route path='/home/a' component={Home}></Route>			{/* /home/a是路径/home/a/b的子集，能进行模糊匹配 */}
  <Route path='/info/b' component={Info}></Route>				{/* /info/b是路径不是/info/a/b的子集，不能能进行模糊匹配 */}
</Switch>
```

:key: 精准匹配​

给Route组件带上 exact 属性（不要经常用，会影响二级路由）

```jsx
<NavLink to="/home/a/b">Home</NavLink>
<NavLink to="/info/a/b">info</NavLink>

<Switch>
  <Route exact path='/home/a' component={Home}></Route>			{/* 开启严格匹配 */}
  <Route exact path='/info/b' component={Info}></Route>				{/* 开启严格匹配 */}
</Switch>
```



二级路由就是再一级路由的基础上，使用路由的模糊匹配，渲染出的多个路由组件

![1594621518595](/assets/React.assets/13.gif)

二级路由的目录

![1594621518595](/assets/React.assets/image-20210428151903720.png)


Github地址：https://github.com/Adermi/useReactRouterDom

### 8.向路由传递参数

:one: 在路由路径中直接传递​ prams 参数

- 传参

  ```jsx
  <ul>
    {messages.map(item => {
      return (
        /* 向路由组件传递参数 */
        <Link Link to={`/info/message/content/${item.id}/${item.content}`} key={item.id} > { item.content}</Link>
      )
    })}
  </ul>
  
  {/* 路由组件接收参数 */}
  <Switch>
    <Route path="/info/message/content/:id/:content" component={Content}></Route>
    <Redirect to=""></Redirect>
  </Switch>
  ```

- 获取参数

  再路由组件的 props 组件中获取

  ```jsx
  let {id, content} = this.props.match.params
  ```

:two: ​通过问好传参的方式

- 传参

  ```jsx
  // 传递参数
  <Link to={`/info/message/content?id=${item.id}&content=${item.content}`} key={item.id} > { item.content}</Link>
  <Route path="/info/message/content" component={Content}></Route>
  ```

- 获取参数

  ```jsx
  import qs from 'querystring'    
  
  // search: "?id=0&content=消息0"，使用qs库把他转换成对象
  let { id, content } = qs.parse(this.props.location.search.slice(1))
  ```

:three: ​通过Link标签的state传递

- 传参

  ```jsx
  <Link to={{
      pathname: "/info/message/content",
      state: {...item}
    }} key={item.id}> { item.content}</Link>
  <Route path="/info/message/content" component={Content}></Route>
  ```

- 获取参数

  ```jsx
  let { id, content } = this.props.location.state || {id: '默认ID', content: '默认内容'}
  ```

### 9.手动跳转路由

`<Route>`组件的 Props 中有浏览器历史记录的几个方法，我们可以用他提供的方法进行历史记录压栈或者替换，达到手动切换路由

```js
import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import './index.css'

import Content from './Content'

export default class Message extends Component {
  state = {
    messages: [
      { id: 0, content: '消息0' },
      { id: 1, content: '消息1' },
      { id: 2, content: '消息2' },
      { id: 3, content: '消息3' }
    ]
  }

  render() {
    let { messages } = this.state

    return (
      <div >
        <ul className="message">
          {messages.map((item, index) => {
            return (
              <li key={index}>
                <Link to={{
                  pathname: "/info/message/content",
                  state: { ...item }
                }} key={item.id}> {item.content}</Link>
                <button onClick={(e) => {this.handlePushRouter(e, item)}} key="affaaf1">push压栈</button>
                <button onClick={(e) => {this.handleReplaceRouter(e, item)}} key="2dadaw">replace替换</button>
              </li>
            )
          })}
        </ul>

        <Switch>
          <Route path="/info/message/content" component={Content}></Route>
          <Redirect to="/info/message/content"></Redirect>
        </Switch>
      </div>
    )
  }

  handleClick = e => {
    e.preventDefault()

    console.log(e)
  }

  handlePushRouter = (e, item) =>{
    // console.log(this.props.history)
    this.props.history.push('/info/message/content', item)
  }

  handleReplaceRouter = (e, item) =>{
    this.props.history.replace('/info/message/content', item)
  }
}

```

### 10.两种路由的区别

```jsx
/**
 * HashRouter和BrowserRouter区别：
 *    1. HashRouter：https://xxx#hash1 https://xxx#hash2 https://xxx#hash3 靠#后面的hash值跳转
 *    2. BrowserRouter：https://xxx/home https://xxx/about https://xxx/info 靠路径跳转
 *    3. hash路由在请求的时候不会带上hash值请求，而浏览器路由会带上
 */
```

### 11.路由懒加载

1. 从react核心库中引入

   ```jsx
   import { lazy, Suspense } from 'react'
   
   // lazy: 用于懒加载UI组件
   // Suspense: 用于展示加载前的组件渲染
   ```

2. 懒加载引入方式

   ```jsx
   import Loading from './components/Loading'				// 正常加载
   let Home = lazy(() => import('./pages/Home'))			// 懒加载
   let Info = lazy(() => import('./pages/Info'))			// 懒加载
   ```

3. 编写懒加载路由

   ```jsx
   <MyNavLink to="/home">Home</MyNavLink>
   <MyNavLink to="/info">info</MyNavLink>
   
   <Suspense fallback={ <Loading>正在加载....</Loading>}>	{/* 还未加载成功时候展示给用户看的组件 */}
     <Switch>
       <Route path='/home' component={Home}></Route>
       <Route path='/info' component={Info}></Route>
       <Redirect to='/home' />
     </Switch>
   </Suspense>
   ```

![](/assets/React.assets/15.gif)





## 八.Hooks

> hooks是React16.8的一个新特性，新语法。能够让函数式组件使用**状态**以及其他react特性





### 1.为什么要发明hooks?

:star: 核心目的：**逻辑复用**

- 一个简单的例子：

  页面中有一个组件，这个组件需要监听浏览器的窗口大小来改变页面的布局，好，那么在class组件中的生命周期函数中写业务代码。

  但是，当页面中有五六个不同的组件都需要进行一样的操作，难道要在这些组件中都重新写一遍代码？

:key: **Hooks就是为了解决这个问题而诞生的**



### 2.Hooks的使用规则

:star: Hooks只能在**函数组件顶级作用域**或**其他hooks**或其他**函数组件**中使用

- 顶级作用域：不能在块级（循环，条件判断），嵌套函数作用域（function）中使用

  原因是：React内部维护了一个Hooks执行列表，所有的hooks必须是要被按照顺序被比对并执行

- hooks的规则：

  1. 所有 Hook 必须要被执行到

  2. hooks必须按顺序被执行

     - 下面的代码时可行的，所有的hooks都被按顺序执行

       ```jsx
       function MyComp() {
         const [count, setCount] = useState(0);
         useEffect(() => { 
         	// ...
         })
         return <div>{count}</div>;
       }
       ```

     - 而下面的代码时错误的，有hooks会执行不到

       ```jsx
       function MyComp() {
         const [count, setCount] = useState(0);
         if (count > 10) {
           // 错误：不能将 Hook 用在条件判断里
           useEffect(() => {
             // ...
           }, [count])
         }
       
         // 这里可能提前返回组件渲染结果，后面的hooks不会被执行到
         if (count === 0) {
           return 'No content';
         }
       
         // 错误：不能将 Hook 放在可能的 return 之后
         const [loading, setLoading] = useState(false);
       
         //...
         return <div>{count}</div>
       }
       ```

:sailboat: Hooks检查插件：

用来检查你写的hooks是否准守使用规则

1. 安装

   ```shell
   npm install eslint-plugin-react-hooks --save-dev
   ```

   

### 3.useState

:star: useState 可以让函数式组件拥有维护状态的能力

- useState

  1. useState接受唯一参数，即初始state
  2. useState返回包含两个参数的数组，**[state, setState] = useState(value)**
  3. state是状态值，setState是修改状态的方法，两个参数的命名我们可以随意

  ```jsx
  import { React, useState } from 'react';
  
  const Index = () => {
    const [count, setCount] = useState(0)
    const [obj, setObj] = useState({ name: 'xyb', age: 20 })
  
    return (
      <>
      <div>
        {count}
        {obj.name + obj.age}
      </div>
      <button onClick={e => setCount(count + 1)}>+</button>
      <button onClick={e => setCount(count - 1)}>-</button>
      <button onClick={e => setObj({...obj, age: obj.age + 1})}>长大</button>
      </>
    );
  }
  
  export default Index;
  ```

- useState的弊端:

  1. 一旦组件拥有自己的状态，每次组件重新创建的时候，就会让组件执行变得复杂

     比方说一个组件的state保存的是服务器请求过来的数据，那么每次这个组件被创建，都要去服务器请求一次（到后面我们可以用Reducer来进行统一的状态管理，让组件变成无状态的，更纯粹的表现层）

> ps：不要在state中保留可以通过计算得到的（这些值可以直接用，没必要绑定到state中）

1. 从 props 传递过来的值
2. 从 URL 中读到的值
3. 从 cookie、localStorage 中读取的值

:european_castle: 加减的案例

![](/assets/React.assets/16.gif)

```jsx
import React, { useState } from 'react'

export default function Count() {
  // 初始状态
  const [count, setCount] = useState(0)   // 定义count状态
  const [info, setInfo] = useState([{ username: 'xxx', password: 20 }]) // 定义学生初始状态
  const [iptInfo, setIptInfo] = useState({})   // 定义表单初始状态

  // 处理表单信息
  function handleIptInfo(e, type) {
    setIptInfo({
      ...iptInfo,
      [type]: e.target.value
    })
  }

  // 表单提交回调
  function handleSubmit(e) {
    if (iptInfo.username && iptInfo.password) {
      setInfo([...info, iptInfo])
      setIptInfo({})
    } else {
      alert('请输入完成后提交')
    }
  }

  return (
    <div>
      <h2>当前计数： {count}</h2>
      <button onClick={e => { setCount(count + 1) }}>+</button>
      <button onClick={e => { setCount(count - 1) }}>-</button>
      <hr />
      <p>姓名：<input type="text" onChange={e => handleIptInfo(e, 'username')} value={iptInfo.username || ''} /></p>
      <p>年龄：<input type="number" onChange={e => handleIptInfo(e, 'password')} value={iptInfo.password || ''} /></p>
      <p><button onClick={handleSubmit}>提交</button></p>

      <h3>学生信息</h3>
      {info.map(item => <div key={item.username}>姓名: {item.username}  年龄: {item.password}</div>)}
    </div>
  )
}
```



### 3.useEffect

:star: 副作用钩子：用于执行与返回值无关的操作，比方说发起一个请求，监听浏览器窗口变动，修改外部某个变量等等，**useEffect执行时不影响渲染出来的UI**。

1. ##### useEffect

   参数一：执行的函数callback

   参数二：依赖数组

   ```js
   useEffect(callback, dependencies)
   ```

   :key: useEffect的执行顺序是：每次render完之后，判断依赖是否改变，若改变则执行

2. ##### 依赖项的几种情况

   - 有依赖项，判断依赖是否改变，若改变则执行
   - 没有依赖项，则每次 render 后都会重新执行。
   - 空数组作为依赖项，则只在组件首次执行时触发。

   ###### 特別注意：依赖项如果不是状态，而是javascript数据类型：

   - 若是普通数据类型，则useEffect认为每次的依赖值都是**不改变**的

   - 若是引用数据类型，则useEffect认为每次的依赖值都是改变的

     ```jsx
     const a = {a: 20}
     
     useEffect(() => {	// 每次都会被执行，a被认为是改变的
     }, [a])
     ```

3. ##### 返回值

   useEffect 还允许你**返回一个函数，用于清除 effect 创建的诸如订阅或计时器 ID 等资源**

   - 空数组作为依赖项时，函数只在组件销毁时执行

     ```jsx
     // 设置一个 size 的 state 用于保存当前窗口尺寸
     const [size, setSize] = useState({});
     useEffect(() => { // 窗口大小变化事件处理函数 
       const handler = () => { setSize(getSize()) } // 监听 resize 事件
       window.addEventListener('resize', handler) // 返回一个 callback 在组件销毁时调用 
       return () => { // 移除 resize 事件 
         window.removeEventListener('resize', handler);
       }
     }, [])
     ```

   - 无依赖项，或者有依赖项时，则函数在每次执行 **useEffect** 前和 **卸载组件** 时执行

     :zap: 这里返回的函数则用于清楚上一次effect残留的数据

     ```jsx
     import React, { useEffect } from 'react';
     import comments from './comments';
     
     function BlogView({ id }) {
       const handleCommentsChange = useCallback(() => {
         // 处理评论变化的通知
       }, []);
       useEffect(() => {
         // 获取博客内容
         fetchBlog(id);
         // 监听指定 id 的博客文章的评论变化通知
         const listener = comments.addListener(id, handleCommentsChange);
     
         return () => {
           // 当 id 发生变化时，移除之前的监听
           comments.removeListener(listener);
         };
       }, [id, handleCommentsChange])
     }
     ```

### 4.useCallback

:star: 在React函数组件中，每次UI发生变化，都是通过重新执行函数组件来完成的，相比以前Class组件开发：

1. Class组件以对象的形式存储函数（如某个点击事件处理函数，某个输入框处理函数）
2. 组件重新渲染也只是执行几个特定的生命周期函数，不会重新定义处理函数

:key: 这里就出现了一个问题：**函数组件不能在多次渲染之间维持一个相同的状态**，函数组件会造成：

1. 每次执行函数组件都会重新定义组件中的处理函数

2. 每次**接收事件处理函数的组件都会重新渲染**！！因为函数组件每次都生成了一个新的事件处理函数

   ```jsx
   function Counter() {
     const [count, setCount] = useState(0);
     const handleIncrement = () => setCount(count + 1);	// 每次都会重新创建这个函数
     // ...
     return <button onClick={handleIncrement}>+</button>
   }
   ```

- ##### useCallback：缓存回调函数

  1. API签名

     ```jsx
     const fn = useCallback(fn, deps)
     ```

  2. 依赖项：

     和useEffect的依赖项情况相同，只有依赖项的值改变了，函数才会重新创建，若依赖项为空数组，那么只会创建一次这个函数

  3. 使用

     ```jsx
     import React, { useState, useCallback } from 'react';
     
     function Counter() {
       const [count, setCount] = useState(0);
       const handleIncrement = useCallback(
         () => setCount(count + 1),
         [count], // 只有当 count 发生变化时，才会重新创建回调函数
       );
       // ...
       return <button onClick={handleIncrement}>+</button>
     }
     ```

     

### 5.useMeno

:key: 上一个钩子useCallback是用来缓存函数的，这个钩子是用来缓存需要通过计算的值

- ##### useMeno的数字签名如下

  ```jsx
  const value = useMemo(fn, deps);
  ```

- ##### useCallback可以通过useMeno实现

  ```js
  const myEventHandler = useMemo(() => {
    // 返回一个函数作为缓存结果
    return () => {
      // 在这里进行事件处理
    }
  }, [dep1, dep2]);
  ```

  

:star: 现在有一个需求：

- 我们要在用户列表中通过用户的名称搜索出想要查找的用户

  这个功能就拥有了两个状态：

  1. 用户列表数据本身：来自某个请求。
  2. 搜索关键字：用户在搜索框输入的数据。

  ```jsx
  import React, { useState, useEffect } from "react";
  
  export default function SearchUserList() {
    const [users, setUsers] = useState(null);
    const [searchKey, setSearchKey] = useState("");
  
    useEffect(() => {
      const doFetch = async () => {
        // 组件首次加载时发请求获取用户数据
        const res = await fetch("https://reqres.in/api/users/");
        setUsers(await res.json());
      };
      doFetch();
    }, []);
    let usersToShow = null;
  
    if (users) {
      // 无论组件为何刷新，这里一定会对数组做一次过滤的操作
      usersToShow = users.data.filter((user) =>
        user.first_name.includes(searchKey),
      );
    }
  
    return (
      <div>
        <input
          type="text"
          value={searchKey}
          onChange={(evt) => setSearchKey(evt.target.value)}
        />
        <ul>
          {usersToShow &&
            usersToShow.length > 0 &&
            usersToShow.map((user) => {
              return <li key={user.id}>{user.first_name}</li>;
            })}
        </ul>
      </div>
    );
  }
  ```

  用原生实现这个功能就会产生问题：只要我的**组件重新渲染，我都会重新计算一个用户信息，更重要的是，UI组件拿到这个新值后会认为这是新值并重新渲染DOM**，然而这个计算的值和原来的值相比并没有改变

  ###### 用useMeno实现

  ```jsx
  //...
  // 使用 userMemo 缓存计算的结果
  const usersToShow = useMemo(() => {
      if (!users) return null;
      return users.data.filter((user) => {
        return user.first_name.includes(searchKey));
      }
    }, [users, searchKey]);	// 只有当用户列表数据发生改变或输入框发生改变才会重新计算
  //...
  ```

  这样做的好处：

  1. 避免重复计算，提升组件性能
  2. 避免子组件重新渲染



### 6.useRef

:key: 函数组件对比Class组件还缺少一样东西：**在多渲染之间共享数据**，在类中，我们可以在实例上定义属性和定义方法，定义方法我们可以使用useCallback来做，定义属性可以用useRef来实现（他可以实现跨渲染的数据存储）

- ##### useRef数字签名

  ```jsx
  const myRefContainer = useRef(initialValue);
  ```

  返回的myRefContainer是一个对象，有个属性叫做current，在多次渲染之间共享

- 制作一个定时器组件，拥有开始和暂停的功能

  ```jsx
  const Index = () => {
    const myRef = useRef(null)
  
    const handleStart = useCallback(() => {
      myRef.current = window.setInterval(() => {
        console.log(666666)
      })
    }, [])  // []为空代表只创建一次该函数
  
    const handlePause = useCallback(() => {
      clearInterval(myRef.current)
    }, [])  // []为空代表只创建一次该函数
  
    return (
      <>
        <button onClick={e => handleStart()}>stary</button>
        <button onClick={e => handlePause()}>pause</button>
      </>
    );
  }
  ```

 :key: 除了上面共享数据的用法，我们还可以在函数式组件中使用Ref，直接操作原生DOM

- `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数

  ```jsx
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  ```


### 5.自定义hook

:key: Hooks的两个核心优点：

1. 逻辑复用
2. 关注点分离（解耦代码，拆分代码）
3. 相比普通工具方法，自定义hooks因为state的存在，能触发组件的重新渲染

:star: 如何创建自定义hooks

- 自定义hooks其实很简单，就是一个以**use**开头自定义函数，你可以传任何参数 ，也可以返回任何值
- 自定义hooks与一般函数的唯一区别就是：**函数中使用了hooks**



:one: 案例一：计数器例子

```jsx
import { React, useState, useEffect, useRef, useCallback } from 'react';

function useCounter() {
  const [count, setCount] = useState(0)
  const addCount = useCallback(() => setCount(count + 1), [count])  // +1
  const reduceCount = useCallback(() => setCount(count - 1), [count]) // -1
  const reset = useCallback(() => setCount(0), [count]) // 重置0
  return { count, addCount, reduceCount, reset }
}

const Index = () => {
  const { count, addCount, reduceCount, reset } = useCounter()

  return (
    <>
      <div>{count}</div>
      <button onClick={e => addCount()}>+</button>
      <button onClick={e => reduceCount()}>-</button>
      <button onClick={e => reset()}>重置</button>
    </>
  );
}
```

:two: 案例2：封装通用逻辑：useAsync(发起异步请求获取数据)

![1594621518595](/assets/React.assets/17.gif)

不使用hooks实现：

```jsx
import React from "react";

export default function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 定义获取用户的回调函数
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://reqres.in/api/users/");
      const json = await res.json();
      // 请求成功后将用户数据放入 state
      setUsers(json.data);
    } catch (err) {
      // 请求失败将错误状态放入 state
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="user-list" style={{margin: "100px"}}>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error && 
        <div style={{ color: "red" }}>Failed: {String(error)}</div>
      }
      <br />
      <ul>
        {users && users.length > 0 &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

使用hooks实现，具体思路如下：

1. 创建 data, loading, error 这三个 state
2. 发出请求后，这只 loading state 为 true
3. 请求成功后，将返回的数据放到某个state中，将 loading state 设为 false 
4. 请求失败后，设置 error state 为 true， 将 loading state 设为 false

```jsx
import React, { useState, useCallback } from "react";

function useAsync(func) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(() => {
    setLoading(true)
    return func().then(res => {
      setData(res)
      setLoading(false)
    }, error => {
      setError(error)
    })
  }, [])

  return { execute, data, loading, error }

}


export default function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const {
    execute: fetchUsers,
    data: users,
    loading,
    error
  } = useAsync(async () => {
    const res = await fetch("https://reqres.in/api/users/")
    const json = await res.json()
    return json.data
  })

  return (
    <div className="user-list" style={{ margin: "100px" }}>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error &&
        <div style={{ color: "red" }}>Failed: {String(error)}</div>
      }
      <br />
      <ul>
        {users && users.length > 0 &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

:three: 监听浏览器状态

- 界面需要根据窗口大小重新布局

- 页面滚动时，到达一定位置，出现一个返回顶部按钮

  ```jsx
  import React, { useState, useEffect, useCallback } from 'react';
  
  // 获取横向，纵向滚动条位置
  const getPosition = () => {
    return typeof document !== 'undefined' ? {
      x: document.documentElement.scrollLeft,
      y: document.documentElement.scrollTop,
    } : {}
  };
  const useScroll = () => {
    // 定一个 position 这个 state 保存滚动条位置
    const [position, setPosition] = useState(getPosition());
    useEffect(() => {
      const handler = () => {
        setPosition(getPosition(document));
      };
      // 监听 scroll 事件，更新滚动条位置
      document.addEventListener("scroll", handler);
      return () => {
        // 组件销毁时，取消事件监听
        document.removeEventListener("scroll", handler);
      };
    }, []);
    return position;
  };
  
  
  export default function ScrollTop() {
    const { y } = useScroll();
  
    const goTop = useCallback(() => {
      document.documentElement.scrollTop = 0;
    }, []);
  
    const style = {
      position: "fixed",
      right: "10px",
      bottom: "10px",
    };
    
    // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
    if (y > 300) {
      return (
        <button onClick={goTop} style={style}>
          Back to Top
        </button>
      );
    }
    // 否则不 render 任何 UI
    return null;
  }
  ```

  

## 九.React扩展

### 1.div标签替换

:star: ​每个jsx都需要包裹一层根标签，我们可以用两种方法消除根标签

1. 使用 `<Fragment></Fragment>` 标签作为根标签

   ```jsx
   render() {
     return (
       <Fragment>
         <Count name="666">我是Children</Count>
       </Fragment>
     )
   }
   ```

2. 使用 `<></>` 空标签作为标签

   ```jsx
   render() {
     return (
       <>
         <Count name="666">我是Children</Count>
       </>
     )
   }
   ```

:key: ​两者的区别就是 Fragment 标签能加 key，而 `<></>` 不能加任何属性



### 2.组件渲染优化

组件是父子组件包裹的状态下，父组件因为状态改变而重新发型渲染，子组件就算没有引用父组件状态也会重新渲染问题

1. 使用**shouldComponentUpdate**钩子，返回false控制组件渲染

   ```jsx
   shouldComponentUpdate = (nextProps, nextStates) => {
     /* 
     if(nextProps.color === this.props.nextState) {
       return false
     }
     */
     
     return false
   }
   ```

2. 使用**PureComponent**作为继承组件

   这个组件重写了**shouldComponentUpdate**钩子，当状态有发生改变时才重新调用组件render重新渲染

   ```jsx
   class MyComponent extends PureComponent {
     // define Component...
   }
   ```

   

### 3.父组件渲染子组件

在一个组件中包裹另外一个子组件，渲染的方式有两种

1. 在children中获取组件渲染

   ```jsx
   <A>
   	<B></B>
   </A>
   
   export default class A extends Component {
     render() {
       return (
         <Fragment>
   				A组件...
   				{this.props.children}
         </Fragment>
       )
     }
   }
   ```

2. 通过render属性渲染（可以传入属性）

   ```jsx
   <B render={(color) => <C color={color}></C>}></B>
   
   class B extends Component {
     state = {
       color: 'red'
     }
   
     render() {
       return (
         <Fragment>
           {this.props.render(this.props.color)}
         </Fragment>
       )
     }
   }
   ```

### 4.错误边界

子组件出现错误，我们可以在他的**父组件**（哪个组件有错误找那个组件的父组件）中捕获错误，并且显示一个替换组件，防止页面崩溃

> 在生产环境中会直接把错误抛到顶层，项目上线后就不用管的

1. 使用`getDerivedStateFromError`钩子

2. 使用`componentDidCatch`钩子

   ```jsx
   import React, { Component, Fragment } from 'react'
   
   export default class A extends Component {
     state = {
       isError: false
     }
   
     static getDerivedStateFromError(error) {    // 子组件有错误会在这里捕捉 
       return { isError: true };	// 返回的对象会更新到state中
     }
   
     componentDidCatch(errType, errContext) {
       // 记录错误用的回调钩子
     }
   
     render() {
       return (
         <Fragment>
           A组件
           {this.state.isError ? <div>组件出现错误</div> : <B></B>}	{/* 有错误时处理 */}
         </Fragment>
       )
     }
   }
   
   class B extends Component {
     render() {
       return (
         <Fragment>
           {this.state.get()}			// this.state没有get方法，肯定会报错
           B组件
         </Fragment>
       )
     }
   }
   ```


