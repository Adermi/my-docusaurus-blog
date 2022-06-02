---
id: mobile
title: 移动端开发
---

# 移动端开发

## 一，基础理论

### 1.屏幕大小

:key: 屏幕大小指的是屏幕对角线的长度，单位是**英寸**，常见的手机屏幕大小有`3.5​` `4` `5.0` `5.5` 等

- 直观对比图

  ![image-20210508215009986](assets/image-20210508200324036.png)

### 2.屏幕分辨率

:key: 屏幕分辨率指的是一块屏幕上横竖像素点数总数

表示形式为 1920 * 1080（超清屏幕）2048*1536（2k 屏）等等

![image-20210508215009986](assets/image-20210508200832996.png)

### 3.设备像素|物理像素

手机屏幕上的真实像素点，例如 iphone3 有 320 _ 480 个真实像素点，iphone4 就有 640 _ 960 个像素点

### 4.设备独立像素

以 iphone3 和 iphone4 为例子：

​ iphone3 的真实像素为 320 \* 480

​ iphone4 的真实像素为 640 \* 960

但是为什么这两款手机屏幕大小是相同的？因为他们的设备独立像素是相同的，都是 320 \* 480，这使得相同的一颗像素点上，iphone4 注定比 iphone3 多 3 个真实的设备像素 x

  <img
  src={require("./assets/image-20210508215009986.png").default}
  alt="Example banner"
  style={{ margin: "auto", display: 'block' }}
  />

### 5.css 像素

我们写代码的时候像素：1px，100px，200px 这些

**在缩放比例为 100%的情况下，一个 css 像素大小等于一个设备独立像素。**

### 6.两种像素的总结

:star: 设备像素指的是一块屏幕上的像素点，每个像素点你可以把其想象成一个 LED 发光二极管，这个二极管能亮各种各样的颜色，而手机屏幕就是这一颗颗像素点组成的

:star: 设备独立像素是厂商设定的一个标准，不论你的设备像素多大，都得和其他类型的设备像素一样挤在厂商规定的设备独立像素中 ​

:key: **iphone3**的设备像素是 **320 \* 480**，**iphone4**的设备像素是 **640 \* 960**，奇怪的事情发生了：

两台手机的物理像素整整相差了一倍，但是他们的手机尺寸却是一个样大小的！！！

这是因为**iphone3**和**iphone4**的设备独立像素规定都是**320 \* 480**，在**iphone3**中，我们所编写的 **width: 20px** 就真的就是在**iphone3**中拿 20 个设备像素渲染；但在**iphone4**中，我们所编写的 **width: 20px** 如果是手机正常缩放比例（100%）下，一个设备独立像素（1px）是等于 4 个设备像素（手机物理像素）的，就是说在**iphone3**上**1px**用了**1**个设备像素渲染，但是在 iphone4 上**1px**却是用 4 个设备像素点渲染的

### 7.常见的手机屏幕参数

> https://uiiiuiii.com/screen/

![image-20210812192457269](assets/image-20210812192457269.png)

### 8.像素比

像素比（DRP）：单一方向上设备物理像素和设备独立像素的比例

```js
window.devicePixelRatio;
```

像素比可以用来显示二倍图三倍图，达到清晰图片的效果

> Iphone3 默认的像素比是 2

图片的完美高清显示

```js
// 1倍图
@media screen and (-webkit-min-device-pixel-ratio: 1) {
  .imgLog {
    background-image: url('./image/imgLogo1.pxn')
  }
}

// 2倍图
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .imgLog {
    background-image: url('./image/imgLogo2.pxn')
  }
}

// 3倍图
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .imgLog {
    background-image: url('./image/imgLogo3.pxn')
  }
}
```

### 9.真机测试

1. 电脑打开热点，使得手机和电脑处在同一个局域网内（电脑连手机或手机连电脑）

   <img src="assets/image-20210916165759161.png" alt="image-20210916165759161" style={{
     zoom:'50%'
   }} />

2. 查看电脑的 ip 地址 `ipconfig` ，把浏览器中的 `127.0.0.1` 换成这个地址

   <img src="assets/image-20210917205417882.png" alt="image-20210917205417882" style={{
     zoom:'50%'
   }} />

3. 手机扫描电脑生成的这个二维码

   <img src="assets/image-20210917205503495.png" alt="image-20210917205503495" style={{
     zoom:'50%'
   }} />

## 二，移动端学习

### 1.视口

:star: 浏览器的几个尺寸：

1. 获取可视区域的宽高：`document.documentElement.clientWidth/clientHeight`（不包含上下滚动条）
2. 获取浏览器的宽度：`window.innerWidth/innerWidth`（包含上下滚动条）
3. 获取浏览器的总宽高：`window.outerWidth/outerWidth` （包含浏览器小屏时浏览器自带的阴影）
4. 获取设备屏幕的宽高：`screen.width/screen.height`（电脑手机多大，这个固定多大）

![image-20210916230728671](assets/image-20210916230728671.png)

- 视口的概念

  1. PC端视口

     可见区域的宽高（不包括滚动条），就是`document.documentElement.clientWidth/clientHeight`这个属性

  2. 移动端视口

     - 布局视口

       用来放置网页的内容区域，默认为980px，为什么会产生980px固定大小呢？star

       :star: 在以前，网页制作只是针对PC端制作的，一般一个网页的布局宽度都是900px甚至1000px，而手机的设备像素最多也只有500px，大一点的除外，那么这个900px的网页如果要在手机上显示，会产生两种情况：

       1. 网页会被挤压变形
       2. 产生滚动条，因为手机上的可见视口区域最多也只有 500px × 700px，另外多出来的400px会被隐藏，通过滚动条才能访问

       所以浏览器厂商就在移动端浏览器上做了一个固定的视口，使得在看上去只有 500px × 700px的手机上能看到980px的网页，这样网页就能完整的显示在用户手机上，但是内容会变小。**980px就是为了兼容早期的pc端页面能完整显示在手机端上**

     - 视觉视口

       用户手机上所能看到的区域，用`window.innerHeight/innerWidth`能获得，若没有在页面设置理想视口，则得到的是浏览器厂商设定的初始值（980px），目的是为了适应PC端的页面

       <img src={require('./assets/image-20210917154643866.png').default} alt="Example banner" />
     
     - 理想视口
     
       把布局视口设定成和屏幕同等宽高，即和PC端的浏览器一样，我看到的视口是多大，那么这个布局视口就是多大。这样做的好处：
     
       1. 用户不用拖动滚动条就能看到完整的内容
       2. 后续开发可以针对不动尺寸的屏幕进行元素的缩放
     
       <img src={require('./assets/image-20210917155556167.png').default} alt="Example banner" />

     
       :star: 理想视口的设置方式
     
       ```html
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       ```

### 2.移动端事件

1. `touchstart`：手指触摸时触发
2. `touchmove`：元素上触摸时移动
3. `touchend`：手指离开元素触发
4. `touchcancel`：触摸被打断触发

```js
red.addEventListener("touchstart", function (e) {
  console.log("touchstart", e);
});
red.addEventListener("touchmove", function (e) {
  console.log("touchmove", e);
});
red.addEventListener("touchend", function (e) {
  console.log("touchend", e);
});
```

### 3.点击穿透

移动端的 `touchstart` 事件会触发 DOM 的 `click` 事件

解决方案三个：

1. 阻止`touchstart`的默认行为（`e.preventDefault()`）

2. touch 事件最终会冒泡到 document 对象上，所以直接在 document 身上阻止默认行为就行

   ```js
   document.documentElement.addEventListener(
     "touchstart",
     function (e) {
       e.preventDefault();
     },
     { passive: false }
   );
   ```

3. **给一个顶级父元素添加阻止默认行为（推荐，像 vue，react 就直接可以在顶层 div 加）**

### 4.浏览器默认行为

主要有以下这两种默认行为：

- 缩放行为

- 下拉滑动露白

  在 safari 浏览器下，即使在 viewport 中设置了不能缩放，但是还是能缩放

**阻止默认行为的目的：为了让网页在所有浏览器上行为表现一致**

:star: 阻止默认行为：

1. 给一个顶级包裹元素，类似 `div#root`

   ```html
   <body>
     <div id="root">...</div>
   </body>
   ```

2. 添加 CSS 代码

   ```css
   html,
   body,
   #root {
     /* 让html, body占满全屏 */
     width: 100%;
     height: 100%;
     overflow: hidden;
   }
   ```

3. 绑定事件

   ```js
   root.addEventListener(
     "touchstart",
     function (e) {
       e.preventDefault();
     },
     { passive: false }
   );
   ```

:shark:上面代码的副作用：

1. a 链接失效
2. 内容无法选择
3. form 元素无法获得焦点

:key: 解决方案：

给目标元素绑定 `torchstart` 事件，并阻止他冒泡

```js
let link = document.getElementsByTagName("a")[0];
link.addEventListener("touchstart", function (e) {
  e.stopPropagation();
});
```

### 5.事件属性

> 忘记了的话就用手机回一下，很简单的

:star: 有非常重要的三个属性：

1. changedTouches
2. targetTouches
3. touches

**touchstart** 事件：

- changedTouches：触发事件的触点信息（几个手指在 DOM 上触发就是几个手指）
- targetTouches：触发事件 DOM 源身上的触点信息
- target：屏幕上所有的触点的信息

**touchmove** 事件：

- changedTouches：触发事件的触点信息（几个手指在 DOM 上触发就是几个手指）
- targetTouches：触发事件 DOM 源身上的触点信息
- target：屏幕上所有的触点的信息

**touchend** 事件：

- changedTouches：触发事件的触点信息（几个手指在 DOM 上触发就是几个手指）
- targetTouches：触发事件 DOM 源身上的触点信息
- target：屏幕上所有的触点的信息

### 6.拖拽的实现

确认鼠标距离浏览器最左侧和最顶侧的，再确认鼠标距离盒子最左侧和最顶侧的距离，前者减去后者的值，就是盒子的左定位和右定位的值，这样就可以实现拖拽

![image-20210919181905169](assets/image-20210919181905169.png)

1. 获取鼠标在盒子内的 left 和 top 值
   - 首先获取盒子距离浏览器左侧和顶层的距离`（DOM.offsetLeft/DOM.offsetTop）`
   - 再获取鼠标距离盒子左侧和都顶侧的距离`（clientX/clientY）`
   - 后者减去前者就是鼠标距离盒子左侧和顶侧的距离`（offsetLeft-clientX/offsetTop-clientY）`
2. 把两者相减的值作为盒子定位的`left`值和`top`值

3. 代码实现

   ```js
   let root1 = document.querySelector("#root1");

   function handlePositionLeftAndTop(e) {
     root1.style.left = e.clientX - root1.boxWidth + "px";
     root1.style.top = e.clientY - root1.boxHeight + "px";
   }

   // 鼠标按下事件
   root1.addEventListener("mousedown", function (e) {
     this.boxWidth = e.clientX - root1.offsetLeft;
     this.boxHeight = e.clientY - root1.offsetTop;

     /// 给全屏绑定鼠标移动事件
     document.addEventListener("mousemove", handlePositionLeftAndTop);
   });

   // 鼠标抬起事件
   root1.addEventListener("mouseup", function (e) {
     // 解除全局的鼠标移动事件
     document.removeEventListener("mousemove", handlePositionLeftAndTop);
   });
   ```

#### 全屏拖拽

<img src="assets/移动 3.gif" style={{
     zoom:'50%'
   }} />

1. 无惯性版本

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <style>
         * {
           padding: 0;
           margin: 0;
         }

         ol,
         ul {
           list-style: none;
         }

         html,
         body,
         #root {
           width: 100%;
           height: 100%;
           overflow: hidden;
         }
       </style>
     </head>

     <body>
       <div id="root">
         <div id="content"></div>
       </div>
     </body>
     <script src="../utils/util.js"></script>
     <script>
       let root = document.querySelector("#root");
       let content = document.querySelector("#content");

       let htmlStr = "";
       for (let i = 0; i < 100; i++) {
         htmlStr += `<p style="background-color:rgb(${Math.floor(
           Math.random() * 250
         )}, ${Math.floor(Math.random() * 250)}, ${Math.floor(
           Math.random() * 250
         )})">${i}</p>`;
       }
       content.innerHTML = htmlStr;

       // 触摸事件开始
       root.addEventListener("touchstart", function (e) {
         this.y = e.touches[0].clientY; // 按下手指时，距离
         this.t = transformCSS(content); // 元素原本的transformY的值
       });

       // 触摸滑动
       root.addEventListener("touchmove", function (e) {
         this._y = e.touches[0].clientY;
         this.translateY = this._y - this.y + this.t;

         transformCSS(content, "translateY", this.translateY);
       });

       // 触摸事件结束
       root.addEventListener("touchend", function (e) {
         let translateY = transformCSS(content);
         if (translateY > 0) {
           translateY = 0;
         } else if (root.offsetHeight - translateY > content.offsetHeight) {
           translateY = root.offsetHeight - content.offsetHeight;
         }

         transformCSS(content, "translateY", translateY);
       });
     </script>
   </html>
   ```

2. 有惯性版本

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <style>
         * {
           padding: 0;
           margin: 0;
         }

         ol,
         ul {
           list-style: none;
         }

         html,
         body,
         #root {
           width: 100%;
           height: 100%;
           overflow: hidden;
         }
       </style>
     </head>

     <body>
       <div id="root">
         <div id="content"></div>
       </div>
     </body>
     <script src="../utils/util.js"></script>
     <script>
       let root = document.querySelector("#root");
       let content = document.querySelector("#content");

       let htmlStr = "";
       for (let i = 0; i < 100; i++) {
         htmlStr += `<p style="background-color:rgb(${Math.floor(
           Math.random() * 250
         )}, ${Math.floor(Math.random() * 250)}, ${Math.floor(
           Math.random() * 250
         )})">${i}</p>`;
       }
       content.innerHTML = htmlStr;

       // 触摸事件开始
       root.addEventListener("touchstart", function (e) {
         this.y = e.touches[0].clientY; // 按下手指时，距离
         this.t = transformCSS(content); // 元素原本的transformY的值

         // 计算最初时间
         this.startTime = Date.now();
         // 移除过渡
         content.style.transition = "";
       });

       // 触摸滑动
       root.addEventListener("touchmove", function (e) {
         this._y = e.touches[0].clientY;
         this.translateY = this._y - this.y + this.t;

         transformCSS(content, "translateY", this.translateY);
       });

       // 触摸事件结束
       root.addEventListener("touchend", function (e) {
         content.style.transition = "all .5s";

         let translateY = transformCSS(content);

         // 惯性效果计算路程
         this.y = e.changedTouches[0].clientY;
         let disY = this._y - this.y;
         this.endTime = Date.now();
         let disTime = this.endTime - this.startTime;
         // 计算速度
         let v = disY / disTime;
         let s = v * 120;
         // 计算元素最终位置
         translateY += s;

         if (translateY >= 0) {
           translateY = 0;
         } else if (root.offsetHeight - translateY >= content.offsetHeight) {
           translateY = root.offsetHeight - content.offsetHeight;
         }

         transformCSS(content, "translateY", translateY);
       });
     </script>
   </html>
   ```

## 三，适配

### 1.view 适配

> 把视口宽度设置设计稿的宽度，之后在不同屏幕下，这个页面都会等比缩放

优点：

- 简单，和设计稿一样来写代码
- 所有屏幕都能自动缩放页面

缺点：

- 有一定的兼容性问题（一般都不用这种方式，自己做小东西可以用这个适配）

写法：

```js
// 设计稿宽度375px就写375px，设计稿375px就写375px
<meta name="viewport" content="width=375, user-scalable=no">
```

![image-20210921224705432](assets/image-20210921224705432.png)

### 2.rem 适配

> 大多数情况下都是用 rem 适配做的，一定要掌握这个方案

首先介绍下什么两个单位：

1. `em`：em 单位参照的是父级大小的单位

   ```
   <style>
     .father {
       font-size: 20px;
       background-color: red;
     }

     .son {
       font-size: 1em; 	{/* 这里的1个em就是20px，参照的是父元素 */}
       background-color: green;
     }
   </style>
   ```

2. `rem`：参照的是根标签大小的单位

   ```html
   <!-- 在根标签设置font-size -->
   <html lang="en" style="font-size: 20px;">
     <!-- 使用rem布局 -->
     .son { font-size: 2rem; background-color: green; }
   </html>
   ```

   ![image-20210922094619889](assets/image-20210922094619889.png)

rem 的两种适配方案:

- 方案一：

  > 先按照 Iphone6 进行页面布局，就是 375px 的那个，在不用尺寸下用 js 代码进行适配

  1. 设置完美视口，布局视口等于可见视口

  2. 以 375px 进行布局写代码

  3. 设置 html 根标签的 `font-size` 属性为`100px`，写代码时用 `rem` 作为单位（100px 就是 1rem，59px 就是 0.59rem）

  4. 在屏幕变化时，用`js`的`onresize`事件监听，并算出根标签的 `font-size` 大小

  5. 这个方案方便，好计算。下面方案二使用 rem 和 less 结合也是很好的选择

     <img src="assets/image-20210922143638962.png" alt="image-20210922143638962" style={{
       zoom:'50%'
     }} />

     ```html
     <html lang="en" style="font-size: 100px;">
       <head>
         <style>
           .father {
             width: 2rem;
              {
               /* 200px */
             }
             height: 2rem;
              {
               /* 200px */
             }
             background-color: red;
             font-size: 0.14rem;
              {
               /* 14px */
             }
           }

           .son {
             font-size: 0.2rem;
              {
               /* 20px */
             }
             background-color: green;
           }
         </style>
       </head>

       <body>
         <div class="father">
           我是father
           <div class="son">我是son</div>
         </div>
       </body>
       <script>
         // 屏幕切换时，计算并改变根标签的 font-size 大小
         window.onresize = function (e) {
           document.querySelector("html").style.fontSize =
             (100 * document.documentElement.clientWidth) / 375 + "px";
         };
       </script>
     </html>
     ```

- 方案二（大多数情况都用这个）

  > 选择一个设计稿的宽度尺寸作为根元素的字体大小

  1. 设置完美视口，布局视口等于可见视口

  2. 把完美视口的`document.documentElement.clientWidth/10`（也可以除以其他值，比一定要分`10`份），作为 html 标签的`font-size`的值

  3. 这样做的好处就是，可以和 less 相结合，在`css`中直接写`px`，特别的方便

     <img src="assets/image-20210922151856095.png" alt="image-20210922151856095" style={{
       zoom:'50%'
     }} />

     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <meta
           name="viewport"
           content="width=device-width, initial-scale=1.0"
         />
         <title>Document</title>
         <link rel="stylesheet" href="./index.css" />
       </head>
       <body>
         <div class="father">我是father</div>
       </body>

       <script>
         // 屏幕切换时，改变根标签的 font-size 大小
         document.querySelector("html").style.fontSize =
           document.documentElement.clientWidth / 10 + "px";
         window.onresize = function (e) {
           document.querySelector("html").style.fontSize =
             document.documentElement.clientWidth / 10 + "px";
         };
       </script>
     </html>
     ```

     ```less
     @rem: 375/10rem; // 这里就相当于设置了根标签，也就是分成了10份

     .father {
       width: (200 / @rem);
       height: (200 / @rem);
       font-size: (14 / @rem);
       background-color: aquamarine;
     }
     ```

### 3.两种 rem 总结

总的来说两种方案都是不错的选择：

1. 方案一：使用`100px`作为根标签的`font-size`。比如说在设计稿上有一个`200*200`的`div`，那我就只要在`css`中只要写好这个盒子的宽高为`2rem * 2rem`，在页面显示的时候，这个`div` 在 IPhone6 下就是 `200*200px` 了。当屏幕尺寸变化时，我们只需要在`js`中监听`onresize`事件，对根标签的`font-size`进行等比缩放，那么我们之前写的`css`中的`rem`单位也会对页面进行等比缩放。比方说之前是`375px，100px`，那我现在屏幕是`411px`，那么现在只要把根标签的`font-size`从 100px 变成`411*100/375px`，之前的`rem`就会自己适配（需要自己计算 rem 值）
2. 方案二：把屏幕划出`10/1`作为根标签`font-size`的大小，以`IPhone`的`375px`为例就是`37.5px`，那么一个`200*200px`的盒子的`rem`值就是`200/37.5rem`，这个时候我们就可以把计算一个盒子`rem`的事情交给`less`来做。在 less 中定义一个变量为`@rem: 375/10rem`，这个就是根标签的`font-size`值，那么这个盒子的宽度我们在 less 中就可以写成`width: 200/@rem`，`less`会帮我们自动计算，就不用像方案一一样需要计算`less`，当屏幕大小发生变化，只需要把根标签重新设置为当前屏幕大小的`10/1`，就可以了，rem 值会自己适配（结合 less，不用自己算 rem 值）

### 4.1px 问题

在移动端下，一倍屏 1 个 px 是用 1 个 px 渲染的，到了两倍屏幕下，二倍屏下 1 个 px 是用 4 个 px 渲染的，到三倍屏下则是用 9 个 px 渲染的，我们肉眼看去就会显得比较粗

![image-20210923143923871](assets/image-20210923143923871.png)

解决方案：

### 5.色块布局

![image-20210925153437269](assets/image-20210925153437269.png)

```html
<!DOCTYPE html>
<html lang="en" style="font-size:100px">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../init.css" />

    <style>
      .header {
        width: 3.23rem;
        height: 1.45rem;
        background-color: #6fc6a6;
        margin: 0.735rem 0.25rem 0.27rem;
      }

      .content {
        display: flex;
        margin-top: 0.215rem;
      }

      .left {
        width: 0.63rem;
        height: 2.035rem;
        background-color: #cc71a6;
        margin: 0 0.25rem 0.22rem;
      }

      .right {
        width: 2.38rem;
        height: 2.035rem;
        background-color: #687fc7;
      }

      .father {
        width: 2rem;
        height: 2rem;
        font-size: 0.4rem;
        text-align: center;
        line-height: 2rem;
        transform: rotate(180deg);
      }
    </style>
  </head>

  <body>
    <div class="header"></div>
    <div class="content">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </body>

  <script>
    document.querySelector("html").style.fontSize =
      (document.documentElement.clientWidth * 100) / 375 + "px";
    window.onresize = function (e) {
      document.querySelector("html").style.fontSize =
        (document.documentElement.clientWidth * 100) / 375 + "px";
    };
  </script>
</html>
```

## 四，移动端效果制作

### 1.滚动条制作

制作滚动条的条件：

1. 一个用于外层包裹元素的父盒子（为#root，打比方为 500px）
2. 一个用于存放滚动内容元素的子盒子（为#content，打比方为 1500px）
3. 滚动条的高度就是： 500px / 1500px \* 500px
4. 滚动条每次移动的距离就是：子盒子卷出去的距离 / 1500px \* 500px

<img src="assets/image-20211008094352251.png" alt="image-20211008094352251"style={{
     zoom:'50%'
   }} />

效果代码（用类来实现）：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      ol,
      ul {
        list-style: none;
      }

      html,
      body,
      #root {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>

  <body>
    <div id="root">
      <div id="content"></div>
    </div>
  </body>
  <script src="../utils/util.js"></script>
  <script src="../utils/touchscroll.js"></script>
  <script>
    let root = document.querySelector("#root");
    let content = document.querySelector("#content");

    let htmlStr = "";
    for (let i = 0; i < 150; i++) {
      htmlStr += `<p style="background-color:rgb(${Math.floor(
        Math.random() * 250
      )}, ${Math.floor(Math.random() * 250)}, ${Math.floor(
        Math.random() * 250
      )})">${i}</p>`;
    }
    content.innerHTML = htmlStr;

    let a = new TouchScroll("#root", "#content");

    root.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  </script>
</html>
```

```js
/**
 * 触摸滑动
 *
 * 调用示例
 * <div id="root">
 *  <div class="content">
 *  </div>
 * </div>
 *
 * new TouchScroll('#root', '.content')
 */

class TouchScroll {
  constructor(root, content, opt) {
    this.root = document.querySelector(root);
    this.content = document.querySelector(content);
    this.opt = opt;

    // 初始化操作
    this.init();
  }

  init() {
    this.initScrollBar();
    this.touchStart();
    this.touchMove();
    this.touchEnd();
  }

  // 制作滚动条初始化函数
  initScrollBar() {
    // 制作滚动条
    let scrollBar = document.createElement("div");
    this.opt = {
      position: "fixed",
      right: 0,
      top: 0,
      width: "6px",
      borderRadius: "3px",
      backgroundColor: "#f5f6f7",
      transition: "background-color .3s",
      ...this.opt,
    };
    Object.keys(this.opt).forEach((item) => {
      scrollBar.style[item] = this.opt[item];
    });
    // 设置滚动条的初始属性
    scrollBar.className = "my-scroll";
    console.log(
      "heigit",
      (this.root.offsetHeight / this.content.offsetHeight) *
        document.documentElement.offsetHeight
    );
    scrollBar.style.height =
      (this.root.offsetHeight / this.content.offsetHeight) *
        this.root.offsetHeight +
      "px";
    scrollBar.style.backgroundColor = "transparent";
    this.root.appendChild(scrollBar);
    this.scrollBar = this.root.querySelector(".my-scroll");
  }

  touchStart() {
    this.root.addEventListener("touchstart", (e) => {
      this.handleDragStart(e); // 拖拽开始

      this.handleScrollStart(e); // 滚动条开始
    });
  }

  touchMove() {
    this.root.addEventListener("touchmove", (e) => {
      this.handleDragMove(e); // 拖拽移动

      this.handleScrollMove(e); // 滚动条移动
    });
  }

  touchEnd() {
    this.root.addEventListener("touchend", (e) => {
      this.handleDragEnd(e); // 拖拽结束

      this.handleScrollEnd(e); // 滚动条结束
    });
  }

  handleDragStart(e) {
    this.y = e.changedTouches[0].clientY;
    this.t = transformCSS(content); // 上一次的translateY

    this.content.style.transition = "";
  }

  handleDragMove(e) {
    this._y = e.changedTouches[0].clientY;
    this.translateY = this._y - this.y + this.t;

    transformCSS(content, "translateY", this.translateY);
  }

  handleDragEnd(e) {
    let translateY = null;
    if (this.translateY >= 0) {
      translateY = 0;
    } else if (this.translateY <= root.offsetHeight - content.offsetHeight) {
      translateY = root.offsetHeight - content.offsetHeight;
    }
    this.content.style.transition = "all .3s";
    transformCSS(content, "translateY", translateY);
  }

  handleScrollStart(e) {
    this.scrollBar.style.backgroundColor = this.opt.backgroundColor;
  }

  handleScrollMove(e) {
    let translateY =
      (TouchScroll.transformCSS(this.content) / this.content.offsetHeight) *
      this.root.offsetHeight;

    TouchScroll.transformCSS(this.scrollBar, "translateY", -translateY);
  }

  handleScrollEnd(e) {
    this.scrollBar.style.backgroundColor = "transparent";
  }

  // 获取目标对象的transform属性
  // 使用一：transformCSS(DOM) => DOM.style.transform => translateY(20px) => 20
  // 使用二：transformCSS(DOM, 'translateY', 20) => DOM.style.transform = 'translateY(20px)'
  static transformCSS(...args) {
    if (args.length > 2) {
      let [target, action, value] = args;
      target.style.transform = `${action}(${value}px)`;
    } else {
      return Number(
        TouchScroll.getMatchResFromString(
          args[0].style.transform,
          null,
          0,
          0,
          0
        )
      );
    }
  }

  // 对从字符串中根据正则匹配出的值进行获取
  // getMatchResFromString('dwad5555dada', /[-]*\d+\.*\d*/, 0, 0, 0) => 5555
  static getMatchResFromString(str, reg, start, end, defaultValue) {
    let res = str.match(reg || /[-]*\d+\.*\d*/);
    if (Array.isArray(res)) {
      return start == end ? Number(res[start]) : res.slice(start, end);
    } else {
      return defaultValue;
    }
  }
}
```

### 2.橡皮筋效果

#### 效果一

![](assets/移动1.gif)

```html
<!DOCTYPE html>
<html lang="en" style="font-size: 100px;">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .container {
        width: 3.25rem;
        height: 0.5rem;
        margin: 1rem auto;
        background-color: #0a1929;
        border: 2px solid #0a1929;
        overflow: hidden;
      }

      .nav {
        /* display: flex; */
        width: 7rem;
        height: 0.5rem;
      }

      .nav li {
        float: left;
        width: 1rem;
        height: 0.5rem;
        font-size: 0.23rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: azure;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <ul class="nav">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
      </ul>
    </div>
  </body>

  <script>
    document.querySelector("html").style.fontSize =
      (document.documentElement.clientWidth * 100) / 375 + "px";
    window.onresize = function (e) {
      document.querySelector("html").style.fontSize =
        (document.documentElement.clientWidth * 100) / 375 + "px";
    };

    let startX = null;
    let moveX = null;
    let resX;
    let maxWidth;

    const nav = document.querySelector(".nav");
    nav.addEventListener("touchstart", function (e) {
      startX = e.changedTouches[0].clientX;
    });

    nav.addEventListener("touchmove", function (e) {
      moveX = e.changedTouches[0].clientX - startX;
      startX = e.changedTouches[0].clientX;
      let lastTransitionX = nav.style.transform.match(/[+-]*\d+\.*\d*/);
      resX = (lastTransitionX ? Number(lastTransitionX[0]) : 0) + moveX;
      maxWidth =
        document.querySelector(".nav").offsetWidth -
        document.querySelector(".container").offsetWidth;

      if (resX > 0 || resX < -maxWidth) {
        nav.style.transition = ".3s cubic-bezier(.21,.68,.42,1.77)";
      } else {
        nav.style.transition = "";
      }

      // 越界规定最小值和最大值
      if (resX > 150) {
        resX = 150;
      } else if (resX < -maxWidth - 150) {
        resX = -maxWidth - 150;
      }

      nav.style.transform = `translateX(${resX}px)`;
    });

    nav.addEventListener("touchend", function (e) {
      if (resX > 0) {
        nav.style.transform = `translateX(${0}px)`;
      } else if (resX < -maxWidth) {
        nav.style.transform = `translateX(${-maxWidth}px)`;
      }
    });
  </script>
</html>
```

#### 效果二

![](assets/移动2.gif)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      #root {
        width: 300px;
        height: 200px;
        margin: auto;
        background-color: blueviolet;
      }

      #root:hover {
        animation: rubberBand 1s;
      }

      @keyframes rubberBand {
        0% {
          transform: scale3d(1, 1, 1);
        }

        35% {
          transform: scale3d(1.25, 0.75, 1);
        }

        45% {
          transform: scale3d(0.75, 1, 1);
        }

        60% {
          transform: scale3d(1.2, 0.8, 1);
        }

        75% {
          transform: scale3d(1.05, 0.95, 1);
        }

        100% {
          transform: scale3d(1, 1, 1);
        }
      }
    </style>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

### 3.图片懒加载

怎样让图片加载：给**img**标签的**src**中放入**url**

怎样让图片不加载：不给**img**标签的**src**中放入**url**

:key: 难点：怎么判断图片是否进入可视区域？

![image-20211012110235925](assets/image-20211012110235925.png)

```js
// 图片懒加载：原理就是遍历每一张图片，判断其是否进入可视区域，来判断这张图片是否渲染
function lazyLoad() {
  // 遍历图片，到达临界点的图片进行加载
  let lis = document.querySelectorAll(".content li");
  let sT = -transformCSS(content);

  lis.forEach((item) => {
    let liTop = item.offsetTop;
    let rootHeight = root.offsetHeight;
    // debugger
    if (rootHeight + sT >= liTop) {
      let img = item.querySelector("img");
      img.src = item.dataset.src;
    } else {
      let img = item.querySelector("img");
      img.src = "./img/loading.gif";
    }
  });
}
```

### 4.音阶效果

![](assets/移动4.gif)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      ul,
      ol {
        list-style: none;
      }

      body {
        background-color: antiquewhite;
      }

      #root {
        display: flex;
        width: 600px;
        height: 50px;
        margin: 200px auto;
        color: gold;
        font-size: 25px;
      }

      #root li {
        flex: 1;
        text-align: center;
        line-height: 50px;
        margin: 0 3px;
        background-color: black;
        overflow: hidden;
      }

      .title {
        height: 100%;
      }

      .square {
        height: 50px;
        background-color: blue;
        transition: all 0.3s;
      }

      #root li:hover .square {
        transform: translateY(-50px);
      }
    </style>
  </head>

  <body>
    <ul id="root">
      <li flag="c">
        <div class="title">dou</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="d">
        <div class="title">rui</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="e">
        <div class="title">mi</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="f">
        <div class="title">fa</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="g">
        <div class="title">so</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="h">
        <div class="title">la</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
      <li flag="i">
        <div class="title">xi</div>
        <div class="square"></div>
        <audio src=""></audio>
      </li>
    </ul>
  </body>
  <script>
    let lis = document.querySelectorAll("#root li");

    lis.forEach((item) => {
      item.addEventListener("mouseenter", function (e) {
        let level = this.getAttribute("flag");
        let audio = this.querySelector("audio");
        audio.src = `http://s8.qhimg.com/share/audio/piano1/${level}4.mp3`;
        audio.play();
      });
    });
  </script>
</html>
```

### 5.开机动画

> 主要用到了 keyframes，和延迟动画效果

<img src="assets/移动 6.gif" style={{
     zoom:'50%'
   }} />

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      body {
        background-color: antiquewhite;
      }

      ul {
        list-style: none;
      }

      #container {
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 30px;
        justify-content: center;
        transform: translate(-50%, -50%);
      }

      #container li {
        animation: loading 0.5s infinite alternate;
      }

      /* 开始动画 */
      @keyframes loading {
        0% {
          transform: translateY(0);
        }

        100% {
          transform: translateY(20px);
        }
      }
    </style>
  </head>

  <body>
    <ul id="container">
      <li>L</li>
      <li>o</li>
      <li>a</li>
      <li>d</li>
      <li>i</li>
      <li>n</li>
      <li>g</li>
      <li>.</li>
      <li>.</li>
      <li>.</li>
    </ul>
  </body>
  <script>
    // 延迟每个字的动画时间
    let lis = document.querySelectorAll("#container li");
    lis.forEach((item, index) => {
      item.style.color = `rgb(${random()}, ${random()}, ${random()})`;
      item.style.animationDelay = 40 * index + "ms";
    });

    // 随机颜色
    function random(start, end) {
      return Math.ceil(Math.random() * 255);
    }
  </script>
</html>
```
