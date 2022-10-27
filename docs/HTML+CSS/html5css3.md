---
title: H5C3补充
id: h5c3
---

## 一，HTML5简介

### 1.概念

万维网的核心语言，标准通用标记语言的下一个应用超文本标记语言（HTML）的第五次重大修改，作为HTML语言，具有新的元素，属性和行为

- `XHTML` 之前基础学的 html 都是 xhtml
- `HTML5` 更大的技术体，允许更多样化和强大的网站和应用程序，新增了很多新的特性，语义呀，本地储存，设备兼容特性，链接特性，网页媒体特性，CSS3特性等等，广义的HTHM5称为 HTML5 + CSS3 + JavaScrapt

## 二，HTML5新增标签

### 1.语义标签

- [x] 以前我们布局，基本用div来做，但是对浏览器来说是没有语义的

  ##### [语法](#)

  `<header>` : 头部标签

  `<nav>` : 导航栏标签

  `<articale>` : 内容标签

  `<section>` : 块级标签

  `<aside>` : 侧边栏标签

  `<footer>` : 尾部标签

  ##### [说明](#)

  > 注意，在IE9里面中，我们需要把所有的这些标签转换成块级元素

  ![1571312499699](/assets/htmlcssAssets.assets/1571312499699.png)

  ##### [示例](#)

  ```html
  <style>
      header,
      nav,
      article,
      section,
      aside,
      footer {
          height: 100px;
      }
  
      header {
          background-color: aqua;
      }
  
      nav {
          background-color: red;
      }
  
      article {
          background-color: brown;
      }
  
      section {
          background-color: black;
      }
  
      aside {
          background-color: yellow;
      }
  
      footer {
          background-color: greenyellow;
      }
  </style>
  
  <body>
      <header></header>
      <nav></nav>
      <article></article>
      <section></section>
      <aside></aside>
      <footer></footer>
  </body>
  ```

### 2.多媒体标签

- [x] 我们可以很方便的在页面中插入视频和音频，不需要借助 flash 或者其他插件

  ##### [语法](#)

  音频	`<audio>` :  *autoplay* **|** *controls* **|** *loop* **|** *src*

  视频    `<video>` :   *autoplay* **|** *controls* **|** *loop* **|** *src* **|** *weight* **|** *height* **|** *preload* **|** *poster* **|** *muted*

  ##### [参数](#) + [示例](#)

  `<audio>` 

  ![1571316023109](/assets/htmlcssAssets.assets/1571316023109.png)

  * preload        预加载
  * muted          静音

  ```html
  <audio src="林俊杰 - 将故事写成我们.flac" controls="controls" loop="loop"></audio>
  
  <!-- 浏览器会自动选择支持的格式播放 -->
  <audio controls="controls">
      <source src="林俊杰 - 裂缝中的阳光.mp3" type="audio/mp3">
      <source src="林俊杰 - 裂缝中的阳光.flac" type="audio/flac">
      <source src="林俊杰 - 裂缝中的阳光.mpc" type="audio/mpc">
      您的浏览器不支持
  </audio>
  ```

    `<video>` : 

  ![1571315932542](/assets/htmlcssAssets.assets/1571315932542.png)

  ```html
  <video autoplay="autoplay" src="太空.mp4">
      
  <!-- 进入页面有一张图片遮盖视频，点击播放按钮才能播放 -->
  <video muted="muted" controls="controls" poster="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg">
      <source src="太空.mp4" type="video/mp4">
  </video>
  
  <!-- 进入页面自动播放 -->
  <video muted="muted" autoplay="autoplay">
      <source src="太空.mp4" type="video/mp4">
      <source src="太空.ogg" type="video/ogg">
  </video>
  ```

  ### 音视频对象属性

  可读可写属性

  - currentTime   音频已经播放时长（返回未格式化的秒）
  - volume     0 ~ 1的任意值。控制音量。
  - muted       布尔值。静音。（ture表示静音，false表示非静音）
  - playbackRate   播放速率

  只读属性

  - duration   音频总时长（返回未格式化的秒）
  - paused     布尔值。音频文件是否暂停。（ture表示暂停，false表示播放）
  - ended       布尔值。音频文件播放结束（ture表示播放结束，false表示播放中或者暂停）

  ### 音视频对象方法

  - pause   暂停
  - play      播放

### 3.input标签

新增的 input 表单可以快速的帮助验证表单内容，禁止一些内容的输入

![1571317897755](/assets/htmlcssAssets.assets/1571317897755.png)

### 4.表单属性

- [x] ![1571363076351](/assets/htmlcssAssets.assets/1571363076351.png)

  ##### [示例](#)

  ```html
  <form action="">
      用户名：<input type="text" required="required" placeholder="请输入用户名" autofocus="autofocus" name="username" autocomplete="on"> <br> 
      上传头像：<input type="file" multiple="multiple"> <br>
      <input type="submit" value="提交">
  </form>
  ```

## 三，CSS3新增选择器

### 1.属性选择器

> 类选择器，属性选择器，伪类选择器，权重都为10

- [x] ![1571364436795](/assets/htmlcssAssets.assets/1571364436795.png)

  ##### [示例](#)

  ```html
      <style>
          button {
              cursor: pointer;
          }
  
          /* 属性选择器的使用 */
          /* 选择的即是buttn这个标签，又带有disable这个属性的按钮 */
          button[disabled] {
              cursor: default;
          }
          
          button[id="haha"] {
              background-color: aqua;
          }
          
          button[data-index*="1"] {
              background-color: red;
          }
          
          button[data-index^="2"] {
              background-color: blue;
          }
          
          button[data-index$="6"] {
              background-color: yellow;
          }
      </style>
  </head>
  
  <body>
      <button>按钮</button>
      <button id="haha">按钮</button>
      <button data-index="666">按钮</button>
      <!-- diaplay 禁用按钮 -->
      <button disabled="disabled" data-index="10">按钮</button>
      <button disabled="disabled" data-index="200">按钮</button>
  </body>
  ```

  ![1571364498733](/assets/htmlcssAssets.assets/1571364498733.png)

### 2.伪类选择器

> 伪类选择器的作用就是，元素状态改变时（被点击，鼠标经过时），所具有的特殊属性

:one: 超链接单独拥有的伪类选择器

- `:link`：超链接点击之前
- `:visited`： 链接被访问过之后

:two: 所有元素都适用的伪类选择器

- `:hover`：鼠标经过时（只能作用于后代元素）
- `:active`： 鼠标点击不松手时
- `:focus`：输入框聚焦时

:star: 记住，在css中，这四种状态**必须按照固定的顺序写**：

> a:link 、a:visited 、a:hover 、a:active

:key: 案例

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
      /*	作用于后代，有效
        .container li:hover div.ppp {
        background-color: black;
        }
      */

      /*	作用于后代，有效
        .container li:hover .ppp {
        background-color: black;
        }
      */
      
			/*	不作用于后代，无效
        .container li:hover .ppp {
        background-color: black;
        }
      */
    </style>
  </head>

  <body>
    <ul class="container">
      <li class="aaa">
        1
        <div class="ppp">9999</div>
      </li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>

    <div class="www">
      999999
    </div>
  </body>
</html>
```



### 3.结构伪类选择器

> 类选择器，属性选择器，伪类选择器，权重都为10

- [x] ![1571364642695](/assets/htmlcssAssets.assets/1571364642695.png)

- [x] `nth-child(n)` 功能强大的伪类选择器

  1. 数字

  2. 奇数(odd) 偶数(even)

  3. 公式（n从0开始，0， 1， 2， 3依次选择，第0项和超出的项会忽略）

     2n		偶数  0， 2， 4， 5， 。。。

     2n + 1	奇数  1， 3， 4， 5， 6.。。

     5n			0， 5， 10， 15。。。

     n + 5		从第五个本身考试到最后 5， 6， 7， 8， 9

     -n + 5		前五个 5， 4， 3， 2， 1

  注意：`div :nth-child(n)` 和 `div:nth-child(n)` ，前者在儿子里选择，后者是本身在被选择

  ##### [示例](#)

  ```html
  <style>
      /* ul li:first-child {
      background-color: red;
      }
  
      ul li:last-child {
      background-color: aqua;
      }
  
      ul li:nth-child(3) {
      background-color: green;
      } */
  
      /* 把所有的偶数孩子选出来 */ 
      ul li:nth-child(even) {
          background-color: red;
      }
  	
      /* 选择前5个 */
      ul li:nth-child(-n + 5) {
          background-color: red;
      }
  </style>
  <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
  </ul>
  ```

- [x] `nth-of-type(n)` 选择指定标签的类型儿子

  与 `nth-child` 最大的不同的是，这个选择器只会从根据我们指定的标签类型来选择标签

  而 nth-child 不论你是不是之地类型的我都选出来

  ##### [对比](#)

  ```css
  /* 选择div标签下第一个标签，不论是什么标签 */
  div :nth-child(1) {
      background-color: red;
  }
  
  /* 选择div标签下所有p标签内的第一个p标签 */
  div p:nth-of-type(1) {
      background-color: red;
  }
  
  /* 选择div标签下既是p标签，又是第一个儿子的标签 */
  div p:nth-child(1) {
      background-color: green;
  } 
  ```

### 4.伪元素选择器

- [x] ![1571367571919](/assets/htmlcssAssets.assets/1571367571919.png)

  ##### [说明](#) 

  1. before 和 after 必须有 **content 属性**
  2. before 在内容的前面，after 在内容的后面
  3. 两者都会创建一个元素，但是属于`行内元素`
  4. 因为在 dom 里面看不见刚才创建的元素，检查元素找不到，我们称之为伪元素
  5. 为元素和标签选择器权重一样，为1

  ##### [示例](#)

  ```css
  div {
      width: 100px;
      height: 100px;
      background-color: red;
  }
  
  div::before {
      display: block;
      content: "我是before的content";
      background-color: yellow;
  }
  
  div::after {
      display: block;
      content: "我是after的content";
      background-color: blue;
  }
  
  <div>我是div</div>
  ```

  ![1571367948514](/assets/htmlcssAssets.assets/1571367948514.png)

-案例1：伪元素字体图标

在一个页面中，标签越少越简洁，我是使用伪元素来做字体图标更简洁（`不需要额外的标签！！`）

```html
<link rel="stylesheet" href="style.css">
<style>
    @font-face {
        font-family: 'icomoon';
        src: url('fonts/icomoon.eot?ygle3j');
        src: url('fonts/icomoon.eot?ygle3j#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?ygle3j') format('truetype'), url('fonts/icomoon.woff?ygle3j') format('woff'), url('fonts/icomoon.svg?ygle3j#icomoon') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }

    div,
    p {
        position: relative;
        width: 200px;
        height: 30px;
        line-height: 30px;
        border: 2px solid red;
    }

    span {
        position: absolute;
        right: 7px;
        color: blue;
        font-family: 'icomoon';
    }

    p::before {
        position: absolute;
        right: 7px;
        content: "\e904";
        font-family: 'icomoon';
    }
</style>
</head>

<body>
    <div>
        <span></span>
    </div>

    <p></p>
</body>

</html>
```

![1571377617724](/assets/htmlcssAssets.assets/1571377617724.png)

## 四，CSS3变形转换

### 1.CSS3 2D转换-位移

`转换变形（transform）`是CSS**3中具有颠覆性**的特征之一，可以实现元素的位移，旋转，缩放等

![1571378088889](/assets/htmlcssAssets.assets/1571378088889.png)

1. #### `2D 转换值 translate`

   ##### [语法](#)

   **transform:** *translate(x, y)* **|** *translateX(n)* **|** *translateY(n)*

   ##### [参数](#)

   *translate(x, y)* ：x就是x轴上移动位置，y轴就是y轴上移动位置，x,y可以是百分比(自身宽度)

   *translateX(n)* ：只移动 x 轴

   *translateY(n)* ：只移动 y 轴

   ##### [重点](/* transform: translate(-50px, -50px); */)

   1. translate 最大的优点就是移动盒子不会影响到其他的盒子，像相对定位一样
   2. `对行内标签没有效果`

   ![6](/assets/htmlcssAssets.assets/6.gif)

   ##### [示例](#)

   ```html
   <style>
       div {
           width: 150px;
           height: 150px;
           background-color: red;
       }
   
       div:last-of-type:active {
           background-color: yellowgreen;
           transform: translate(50px, -50px);
       }
   
       div:first-child:active {
           background-color: yellow;
           transform: translate(50px, 50px);
       }
   
       div:nth-of-type(2) {
           background-color: gold;
       }
   </style>
   </head>
   
   <body>
       <div></div>
       <div></div>
       <div></div>
   </body>
   ```

-案例2：使用translate实现居中

```css
div {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid green;
}

p {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
}
```

![1571380414151](/assets/htmlcssAssets.assets/1571380414151.png)

### 2.CSS3 2D转换-旋转

- #### `rotate`

  ------

  #### [语法](#)

  **transform:** *rotate(度数)*

  ***transform-origin*-:** x | y

  ##### [参数](#)

   *rotate* ：度数，单位是 deg，正值为顺时针，负值为逆时针

  x | y :  方位名词(top bottom left right) | px | 50% 50%(默认)

  ##### [重点](#)

  - 默认旋转的点为元素的中心点

    ![7](/assets/htmlcssAssets.assets/7.gif)

    ##### [示例](#)

    ```html
    <style>
        * {
            margin: 0;
            padding: 0;
        }
    
        div {
            width: 150px;
            height: 150px;
            margin: 100px auto;
            background-color: dodgerblue;
            transition: all 1s 0s;
        }
    
        div:hover {
            background-color: firebrick;
            transform: rotate(360deg);
        }
    </style>
    </head>
    
    <body>
        <div>我是div标签</div>
    </body>
    ```

-案例3：使用旋转做小三角

```html
<style>
    div {
        position: relative;
        width: 200px;
        height: 30px;
        line-height: 30px;
        border: 2px solid red;
    }

    div::after {
        content: "";
        position: absolute;
        top: 6px;
        right: 10px;
        width: 10px;
        height: 10px;
        border-right: 2px solid #000;
        border-bottom: 2px solid #000;
        transform: rotate(45deg);
        transition: all .3s;
        /* transform-origin: top left; */
    }

    div:hover::after {
        transform: rotate(-135deg);
    }
</style>
</head>

<body>
    <div></div>
</body>
```

![8](/assets/htmlcssAssets.assets/8.gif)

-案例4：隐藏旋转案例

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    div {
        width: 150px;
        height: 150px;
        margin: 100px auto;
        border: 10px solid dodgerblue;
        overflow: hidden;
    }

    div::after {
        content: "";
        display: block;
        width: 150px;
        height: 150px;
        background-color: firebrick;
        transform: rotate(90deg);
        transform-origin: -10px 160px;
        transition: all .3s;
    }

    div:hover::after {
        transform: rotate(0deg);
    }
</style>
</head>

<body>
    <div>
    </div>
</body>
```

![12](/assets/htmlcssAssets.assets/12.gif)

### 3.CSS3 2D转换-缩放

- #### `scale`

  ------

  ##### [语法](#)

  **transform**: scale(x, y);

  ##### [参数](#)

  scale(x, y) ： 里面的 x 和 y 分别代表width和height的放大倍数，只写一个两个都放

  ##### [重点](#)

  1. scale`不会影响到其他的盒子`
  2. 通过 ***transform-origin*-:** x | y 可以设置缩放的点,单位可以是方位词，%，px

  

-案例5：实现京东放大镜效果

```html
![13](/assets/htmlcssAssets.assets/13.gif)<style>
    * {
        margin: 0;
        padding: 0;
    }

    div {
        width: 300px;
        height: 300px;
        margin: 100px auto;
        border: 10px solid burlywood;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>
</head>

<body>
    <div>
        <img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg" alt="">
    </div>

    <script>
        var img = document.querySelector('div img');
        img.addEventListener('mousemove', function(e) {
            this.style.transformOrigin = e.offsetX + 'px' + ' ' + e.offsetY + 'px';
            this.style.transform = 'scale(2, 2)';
        })

        img.addEventListener('mouseout', function(e) {
            this.style.transform = 'scale(1)';
        })
    </script>
</body>
```

![13](/assets/htmlcssAssets.assets/13.gif)

-案例6：分页按钮放大

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    ul {
        margin: 100px auto;
        text-align: center;
    }

    li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 2px solid burlywood;
        margin-left: 7px;
        line-height: 30px;
        border-radius: 50%;
        transition: all .3s;
        cursor: pointer;
    }

    li:hover {
        transform: scale(1.3);
    }
</style>
</head>

<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ul>
</body>
```

![14](/assets/htmlcssAssets.assets/14.gif)

### 4.三者书写顺序

> ###### 如果有移动，旋转，放大，必须先把移动(`transform: translate()`)写在最前面

**[示例](#)**

```css
transform: translateY(50%) rotateX(-90deg);
```



## 五，CSS3动画

### 1.动画基本序列

1. 创建动画（from 和 to分别代表 0%和100%）

   ```css
   /* 1. 创建动画move是动画的名称 */
   
   @keyframes move {
       /* 开始状态 */
       0%(from) {
           width: 100px;
           height: 100px;
       }
       50% {
           width: 500px;
           height: 500px;
           transform: rotate(180deg);
           background-color: green;
       }
       100%(to) {
           width: 200px;
           height: 200px;
           background-color: yellow;
       }
   }
   ```

2. 使用动画

   ```css
   div {
       width: 100px;
       height: 100px;
       background-color: red;
       
       /* 2. 调用动画 */
       animation-name: move;
       /* 3. 持续时间 */
       animation-duration: 10s;
   }
   ```

-案例7：旋转的方块

```css
/* 1. 创建动画move是动画的名称 */

@keyframes four_corner {
    0% {}
    25% {
        transform: translate(360px, 0) rotate(360deg);
        background-color: brown;
    }
    50% {
        transform: translate(360px, 300px) rotate(-360deg);
        background-color: chartreuse;
    }
    75% {
        transform: translate(0, 300px) rotate(360deg);
        background-color: darkgray;
    }
    100% {
        transform: translate(0, 0) rotate(-360deg);
        background-color: red;
    }
}

div {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
    /* 2. 调用动画 */
    animation-name: four_corner;
    /* 3. 持续时间 */
    animation-duration: 3s;
}
```

![16](/assets/htmlcssAssets.assets/16.gif)

### 2.动画属性

```css
/* 1. 创建动画move是动画的名称 */
@keyframes four_corner {
    from {}
    to {}
}

div {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
    /* 2. 调用动画 */
    animation-name: four_corner;
    /* 3. 动画持续时间 */
    animation-duration: 3s;
    /* 4. 规定动画速度曲线 默认为ease,linear匀速*/
    animation-timing-function: ease;
    /* 5. 规定动画何时开始，默认为0s，就是打开页面就开始 */
    animation-delay: 1s;
    /* 6. 规定动画被播放的次数，默认是1，还有infinite(无限次) */
    animation-iteration-count: infinite;
    /* 7. 规定动画是否在下一周期逆向播放，默认为normal，alternate逆播放 */
    animation-direction: alternate;
    /* 8. 规定动画播放到100%后是否回原来位置,默认为backwards,不回起始forwards */
    animation-fill-mode: forwards;
}

div:hover {
    /* 9. 鼠标经过div，让动画停下来 running默认，paused暂停 */
    animation-play-state: paused;
}
```

![1571466611655](/assets/htmlcssAssets.assets/1571466611655.png)

### 3.动画属性复合写法

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反向 是否回到原来位置
/* 前两个属性必须写 */
animation: move 1s linear 2s infinite alternate forwards
```

- 复合属性里面没有 animation-play-state
- 暂停动画 animation-play-state： puased 通常要和鼠标事件配合使用
- 想要动画走回来，而不是直接跳回来，animation-direction: alternate
- 盒子动画结束后，停在结束的位置 animation-fill-mode: forwards

-案例8：热点图案例

```html
<style>
    body {
        background-color: #333;
    }

    .map {
        position: relative;
        width: 747px;
        height: 617px;
        margin: 0 auto;
        background: url('images/map.png');
    }

    .city {
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: skyblue;
        border-radius: 50%;
    }

    .beijing {
        top: 230px;
        right: 196px;
    }

    .taiwan {
        top: 499px;
        right: 85px;
    }

    .guangzhou {
        top: 543px;
        right: 197px;
    }

    .city div[class="bowen"] {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px skyblue;
        border-radius: 50%;
        animation: beautiful 1.5s linear infinite;
    }

    .city div[class="bowen"]:nth-child(2) {
        animation-delay: 0.5s;
        /* 动画延时播放 */
    }

    .city div[class="bowen"]:last-of-type {
        animation-delay: 1s;
        /* 动画延时播放 */
    }

    @keyframes beautiful {
        0% {}
        30% {
            box-shadow: 0 0 10px orange;
        }
        70% {
            /* transform: scale(); 不要用这个，他会连我们的阴影一起放大*/
            width: 50px;
            height: 50px;
            opacity: 1;
            box-shadow: 0 0 10px yellowgreen;
        }
        100% {
            width: 70px;
            height: 70px;
            opacity: 0;
            box-shadow: 0 0 10px red;
        }
    }
</style>

<div class="map">
    <div class="city beijing">
        <div class="bowen"></div>
        <div class="bowen"></div>
        <div class="bowen"></div>
    </div>
    <div class="city taiwan">
        <div class="bowen"></div>
        <div class="bowen"></div>
        <div class="bowen"></div>
    </div>
    <div class="city guangzhou">
        <div class="bowen"></div>
        <div class="bowen"></div>
        <div class="bowen"></div>
    </div>
</div>
```

![17](/assets/htmlcssAssets.assets/17.gif)

### 4.速度曲线属性

1. *linear* ：匀速

2. *ease* ：默认属性，慢 -> 块 -> 慢

3. *ease-in* ：以低速开始

4. *ease-out* ：以低俗结束

5. *ease-in-out* ：以低俗开始和结束

6. ##### `steps()` : 以指定的步长数(帧数)来完成动画

   ```html
   <style>
       div {
           width: 0;
           height: 50px;
           background-color: #333;
           color: orangered;
           line-height: 50px;
           font-weight: 700;
           white-space: nowrap;
           overflow: hidden;
           animation: long 2s steps(10) forwards;
       }
   
       @keyframes long {
           0% {
               width: 0px;
           }
           100% {
               width: 210px;
           }
       }
   </style>
   <div>We are here wating for you</div>
   ```

   ![18](/assets/htmlcssAssets.assets/18.gif)

-案例9：奔跑的小熊

```html
<style>
    body {
        background-color: #333;
    }

    div {
        position: absolute;
        width: 200px;
        height: 100px;
        background: url("images/bear.png");
        background-position: 0px 0px;
        animation: bear .3s steps(8) infinite, move 2s linear forwards;
    }

    @keyframes bear {
        0% {}
        100% {
            background-position: -1600px;
        }
    }

    @keyframes move {
        from {
            left: 0;
        }
        to {
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>

<div></div>
```

![19](/assets/htmlcssAssets.assets/19.gif)

 

## 六，3D转换

### 1.三维坐标系

- X轴：水平向右		注意：这里X轴和2D轴一样，往左边为正值，往右为负值
- Y轴：垂直向下		注意：这里Y轴和2D轴一样，往左边为正值，往右为负值
- Z轴：垂直屏幕		注意：`拿一只垂直屏幕，假设笔穿过了屏幕，没穿过屏幕为正`

### 2.3D位移

3D移动在2D移动的基础上多加了一个可以移动的方向，就是z轴方向

- #### `transform: translate3d(x, y, z)`

  1. 也可以分开写 translateX  translateY  translateZ(向我们眼睛这边移动)
  2. **translateZ** 一般用 px 单位
  3. x, y, z 不能省略，如果没有就写0
  4. 在2D平面上我们是看不到变化的，必须借助透视 perspective

### 3.3D透视

在2D平面产生近大远小视觉立体，但是效果只是二位的

1. 透视的单位是 px

2. **透视就是视距**，我们眼睛离电脑屏幕越近，视距越小，看到的物体越大
3. `透视(perspective)是写在被观察元素的父盒子上面的，如果想看到3D，必须写透视`

4. ![1571487257526](/assets/htmlcssAssets.assets/1571487257526.png)![1571487192528](/assets/htmlcssAssets.assets/1571487192528.png)

5. ##### [示例](#)

   ```html
   <style>
       body {
           background-color: #333;
           perspective: 200px;
           /* 透视越小，离屏幕越近，观察到的物体越大 */
       }
   
       div {
           width: 200px;
           height: 200px;
           margin: 100px auto;
           background-color: seagreen;
           transform: translate3d(100px, 100px, 100px); /* 不加透视z轴看不到 */
       }
   </style>
   
   <div></div>
   ```

   ![1571477200211](/assets/htmlcssAssets.assets/1571477200211.png)

### 4.Z轴和透视区别

> 使用透视(视距) 和 z轴正负值变化都能实现元素的变大和变小

1. z 轴变化，指的是我们在有视距的情况下，物体距离我们的眼睛越来越近

2. 透视变化，指的是我们的眼睛距离屏幕越来越近，元素也就变大了

   ![1571488387342](/assets/htmlcssAssets.assets/1571488387342.png)

### 5.透视和3D呈现区别

- 透视是能够让我们能看到3D的效果，就像浏览器长了一智眼睛帮我们从3D的视角观察
- 呈现就是如果子盒子做了3D的效果，3D旋转，3D位移这些，必须给父盒子3D呈现这个属性，否者这些3D属性不会被保留

## 七，3D旋转

### 1.3D旋转

- #### `transform: rotate3d(x, y, z, deg)`

  1. **transform: rotateX(45deg)**		：沿着x轴正方向旋转 45 度

  2. **transform: rotateY(45deg)**		：沿着y轴正方向旋转 45 度

  3. **transform: rotateZ (45deg)**		：沿着z轴正方向旋转 45 度

     ![20](/assets/htmlcssAssets.assets/20.gif)

  ```css
  img:active {
      /* 沿着 x 轴旋转180度 */
      transform: rotateX(-180deg);
      /* 沿着 y 轴旋转180度 */
      transform: rotateY(180deg);
      /* 沿着 z 轴旋转180度 */
      transform: rotateZ(180deg);
      /* 沿着 x y 对角线旋转45度，也就是他们俩向量的方向 */
      transform: rotate3d(1, 1, 0, 45deg);
      /* 沿着 x y z向量的方向旋转45度 */
      transform: rotate3d(1, 1, 1, 45deg);
  }
  ```


### 2.3D呈现

- #### `transform-style: preserve-3d `

  1. 控制子盒子是否开启三维立体环境（保留3d属性）

  2. 默认为 **flat** 代表不开启立体空间

  3. 孩子做了立体样式，父亲必须给这个属性来保持3D效果

  4. 这个属性需要写给父级盒子，但是`只控制子盒子`

  5. 这个属性非常重要

     ![1571537437035](/assets/htmlcssAssets.assets/1571537437035.png)

-案例10：翻转的盒子

```html
<style>
    body {
        color: blanchedalmond;
        line-height: 200px;
        text-align: center;
        perspective: 500px;
    }

    .box {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 100px auto;
        transition: all .2s;
        /* 保留 3D 效果 */
        transform-style: preserve-3d;
    }

    .box div {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
    }

    .front {
        background-color: red;
        z-index: 1;
    }

    .back {
        background-color: black;
        transform: rotateY(180deg);
    }

    .box:hover {
        transform: rotateY(180deg);
    }
</style>

<div class="box">
    <div class="front">你是傻子</div>
    <div class="back">我是疯子</div>
</div>
```

![21](/assets/htmlcssAssets.assets/21.gif)

-案例11：3D导航栏

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        text-align: center;
        line-height: 35px;
    }

    ul {
        width: 500px;
        margin: 100px auto;
        list-style: none;
    }

    ul li {
        float: left;
        width: 120px;
        height: 35px;
        cursor: pointer;
    }

    .box {
        position: relative;
        width: 100%;
        height: 100%;
        transition: all .5s;
        transform-style: preserve-3d;
    }

    .box:hover {
        transform: rotateX(90deg);
    }

    .front,
    .bottom {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .front {
        background-color: burlywood;
        z-index: 1;
    }

    .bottom {
        background-color: cadetblue;
        transform: translateY(50%) rotateX(-90deg);
    }
</style>

<ul>
    <li>
        <div class="box">
            <div class="front">我是前面</div>
            <div class="bottom">我是下面</div>
        </div>
    </li>
    <li>
        <div class="box">
            <div class="front">我是前面</div>
            <div class="bottom">我是下面</div>
        </div>
    </li>
    <li>
        <div class="box">
            <div class="front">我是前面</div>
            <div class="bottom">我是下面</div>
        </div>
    </li>
</ul>
```

![25](/assets/htmlcssAssets.assets/25.gif)

-案例12：旋转木马

```html
<style>
    body {
        perspective: 2000px;
    }

    section {
        position: relative;
        width: 400px;
        height: 280px;
        margin: 150px auto;
        transform-style: preserve-3d;
        animation: rotate 10s linear infinite forwards;
    }

    section:hover {
        animation-play-state: paused;
    }

    section div {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    section>img {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    section div img {
        width: 100%;
        height: 100%;
    }

    section div:nth-of-type(1) {
        transform: translateZ(500px);
    }

    section div:nth-of-type(2) {
        transform: rotateY(60deg) translateZ(500px);
    }

    section div:nth-of-type(3) {
        transform: rotateY(120deg) translateZ(500px);
    }

    section div:nth-of-type(4) {
        transform: rotateY(180deg) translateZ(500px);
    }

    section div:nth-of-type(5) {
        transform: rotateY(240deg) translateZ(500px);
    }

    section div:nth-of-type(6) {
        transform: rotateY(300deg) translateZ(500px);
    }

    @keyframes rotate {
        from {}
        to {
            transform: rotateY(360deg);
        }
    }
</style>

<section>
    <img src="images/魔改.png" alt="">
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
    <div><img src="images/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg"></div>
</section>
```

![26](/assets/htmlcssAssets.assets/26.gif)

## 八，浏览器私有属性

> 浏览器私有属性是为了兼容老版本的写法，比较新版本的浏览器无序添加

- `-moz- ` ：代表 [firefox](#) 浏览器私有属性
- `-ms-` ：代表 [ie](#) 浏览器私有属性
- `-wevkit-` ：代表 [safari](#)丶[chrome](#) 私有属性
- `-o-` ：代表[欧朋](#)浏览器的私有属性

### 1.提倡的写法

```css
-moz-animation: move 1s linear infinite forwards;
-webkit-animation: move 1s linear infinite forwards;
-o-animation: move 1s linear infinite forwards;
animation: move 1s linear infinite forwards;
```

##  九，CSS3补充

### 1.图片模糊处理

- ### `filter: 函数`

  ##### [示例](#)

  ```css
  img {
      filter: blur(5px);
  }
  
  img:hover {
      filter: blur(0px);
  }
  ```

### 2.加减函数 calc

我们不想把一个盒子的宽度写死，想让他和父盒子来进行变化，不如永远笔父盒子小30px

> ##### `width: calc(100% - 80px)`

- 函数里面可以使用 加减乘除 来计算

  ```
  div {
  	weight: calc(100% -30px)
  }
  ```

### 3.过渡

- #### `transition: 过度属性 花费时间 运动曲线 何时开始`

  > ###### 谁做过度给谁加，谁要变化给谁加

  1. **属性** ：要给哪个属性给他过度，一般写 all 代表所有属性

  2. **花费时间** ：单位是秒（必须写单位）比如 1s

  3. **运动曲线** ：默认 ease，慢 - 块 慢   ，详细看 [css](#) 的第4章动画速度曲线，或者塞贝尔曲线

  4. **何时开始** ：延时几秒触发，默认0s

     ```css
     div {
     	weight: 100px;
     	height: 100px;
     	/* transition: weight 1s ease 0s, height 1s ease 0s; */
     	transition: all 1s ease 0s;
     }
     
     div:hover {
     	weight: 200px;
     }
     ```

#### -案例13：进度条

```html
<style>
    .bar {
        width: 200px;
        height: 20px;
        padding: 2px;
        border: 2px solid red;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .bar div {
        width: 65%;
        height: 100%;
        background-color: red;
        border-radius: 10px;
        transition: all 1s;
    }

    .bar:hover div {
        width: 100%;
    }
</style>

<div class="bar">
    <div></div>
</div>
```

![1571552834213](/assets/htmlcssAssets.assets/1571552834213.png)

#### -案例14：小米logo

```html
<style>
    div {
        position: relative;
        width: 55px;
        height: 55px;
        margin: 100px auto;
        overflow: hidden;
        background-color: #ff6700;
    }

    div a {
        position: absolute;
        right: 0;
        width: 110px;
        height: 100%;
        transition: all .3s;
    }

    div a::before {
        position: absolute;
        content: "";
        right: 0px;
        width: 55px;
        height: 55px;
        background: url("https://s02.mifile.cn/assets/htmlcssAssets.assets/static/image/mi-logo.png") no-repeat center;
    }

    div a::after {
        position: absolute;
        content: "";
        left: 0px;
        width: 55px;
        height: 55px;
        background: url("https://s02.mifile.cn/assets/htmlcssAssets.assets/static/image/mi-home.png") no-repeat center;
    }

    div a:hover {
        transform: translateX(50%);
    }

    div::
</style>

<div>
    <a href=""></a>
</div>
```

![27](/assets/htmlcssAssets.assets/27.gif)