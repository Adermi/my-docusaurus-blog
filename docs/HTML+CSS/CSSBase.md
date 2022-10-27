---
id: css
title: CSS基础
---

## 一，CSS 简介

### 1，CSS 简介

**CSS**是**层叠样式表**的简称，我们有时叫他 **CSS 样式表**或级 **联样式表**

`主要作用：` 由 HTML 专注去做结构呈现，样式交给 CSS，即**结构样式分离**

### 2，CSS 书写位置

1. 行内标签（不利于维护，耦合度高， 让代码变的非常臃肿）

2. 内部 style 标签（写在 head 标签内的 style 标签内，通过选择器控制，也有一定耦
   合度）

3. 外部样式（开发常用，利于查看标签的样式）

   ```html
   <link rel="stylesheet" href="相对路径" /> // rel :
   声明文档类型：层叠样式表（css） //
   css层叠样式表：下面相同的属性会覆盖上面的属性，优先级高的覆盖优先级低的；
   ```

   > 三种样式的优先级：**行内样式>外部样式=内部样式**（内外部样式优先级相同，能
   > 相互覆盖）

## 二，CSS 三大特性

### 1，层叠性

优先级高的选择器里面的属性会覆盖优先级低的选择器里的属性，如果选择器一样，看执行
顺序先后

例子：

```html
#a { width: 200px; height: 200px; background-color: red; } div {
background-color: blueviolet; } ...
<div id="a"></div>
```

![1570935916213](/assets/htmlcssAssets.assets/1570935916213.png)

```html
di'v { width: 200px; height: 200px; background-color: red; } div {
background-color: blueviolet; } ...
<div id="a"></div>
```

![1570935936581](/assets/htmlcssAssets.assets/1570935936581.png)

### 2，继承性

可以简化代码的复杂度

**子元素会继承父元素的样式（_text_-，_font_-，_line_-这些开头的元素，以
及*color*这些属性）**

例子：

```html
div {color: red; font-size: 30px; line-height: 45px; taxt-align: center} ...
<div><p>我是p标签</p></div>
```

![1570936706283](/assets/htmlcssAssets.assets/1570936706283.png)

行高的特殊情况

```css
body {
  font: 12px/1.5 Microsoft YaHei, Heiti;
}
p {
  font-size: 10px;
}
```

- **font:12px/1.5** 代表字体大小为 **12px** 行高为当前字体的 **1.5** 倍，子元素
  会继承
- **p** 标签的行高继承 **body** 的，但是行高是**10px \* 105**

### 3，优先级性

选择器的优先级决定元素会执行哪个元素，被哪个元素覆盖

1. 继承的属性 | 通配符\*
2. 标签选择器(`h1`, `h2`)，伪元素(`::before`, `::after`)
3. 类选择器（`.box`），属性选择器（`[data-theme='dark']`），伪类选择器
   （`:hover`）
4. id 选择器（`#box`）
5. 行内样式 （`style="color: red;"`）
6. `!import`

![1570937657152](/assets/htmlcssAssets.assets/1570937657817.png)

例子：

```html
div {background-color: red!important;} /* 加上!important之后 */ #one {width:
200px; height: 200px; background-color: blue;} -----
<div id="one"></div>
```

![1570938198183](/assets/htmlcssAssets.assets/1570938198183.png)

权重叠加

> 也可以参考 复合选择器的选择器优先级比较法

![1570942301161](/assets/htmlcssAssets.assets/1570942301161.png)

![1570942273946](/assets/htmlcssAssets.assets/1570942273946.png)

## 三，CSS 选择器

### 0，快速生成 HTML

- `!` + table ：快速生成 H5 骨架
- `div*10` + table ：生成 10 个 div
- `ul>li*5` + table ：生成 ul + 5 个 li 标签
- `div.demo$*5` + table ：生成 5 个 class 有顺序的 div 标签
- `div{我}*5` + table ：生成 5 个 div 标签带有我
- `div{$}*5` + table ：生成 5 个内容是从 1~5 的 div 标签

> 选择器是对 **HTML** 页面中的元素实现 **一对一**，**一对多** 或者 **多对一** 的
> 控制

### 基础选择器

### 1，标签选择器

```html
<style>
  p {
    color: red;
    background-color: blue;
  }
</style>
<p>我是p标签</p>

<!--标签选择器：通过标签名字选择标签-->
```

### 2，id 选择器

```html
<style>
  #p1 {
    color: red;
    background-color: blue;
  }
</style>
...
<p id="p1">我是p标签</p>

<!--id选择器：通过id名字选择标签,具有唯一性-->
```

### 3，类名选择器

```html
<style>
  .p1 {
    background-color: blue;
  }
  .p2 {
    color: blue;
  }
  .p3 {
    color: green;
  }
</style>
...
<p class="p1 p2">我是p标签</p>
<!--拥有p1选择器的背景颜色和p2选择器的字体颜色-->
<p class="p1 p2">我是p标签</p>
<!--拥有p1选择器的背景颜色和p3选择器的字体颜色-->

<!--类名选择器：可以控制多个标签-->
<!--相同类名控制相同样式，不同类名控制不同样式-->
<!--若一个标签多类名，处在后面的类名里的样式会覆盖与前面类名相同的样式-->
```

### 4，通配符选择器

```html
<style>
  * {
    border: px solid red;
  }
</style>

<!--所有的标签都会被选择，但是优先级是最低的-->
```

> 总结：

1. 选择器优先级：**id 选择器>类名选择器>tag(标签)选择器>全选择器**
2. 优先级高的选择器里的样式，会覆盖优先级低的选择器里的相同的样式！(剩下的继承下
   来)
3. 若一个标签有多个类名，处在后面的类名里的样式会覆盖与前面类名相同的样式

> 选择器命名规范：

1. 见名知意
2. 不能用拼音，中文，不能数字开头，不能用特殊符号
3. 英文小写开头
4. 使用-连词符号(不使用\_)，驼峰命名法
5. 不能命名带有广告等英文的单词，如：ad，adv，adver，advertising，防止被过滤

### 复合选择器

### 1，后代选择器

> （作用于儿子，孙子，真孙....）

```html
<style>
    body span{
        background-color:red;
    }
</style>
...
        <p>
            我是p标签
            <span>我是span标签</span>
        </p>
        <span>我是span标签</span>
        <p>我是p标签</p>
        <p>
            我是p标签
            <span>我是span标签</span>
            <span>我是span标签</span>
            <span>我是span标签</span>
        </p>
        <p>
            我是p标签
            <p>
                我是p标签
                <span>我是span标签</span>
            </p>
        </p>
        <span>我是span标签</span>

<!-- 不管我的子孙身处何处都要变成红色 -->
```

![1570790242640](/assets/htmlcssAssets.assets/1570790242640.png)

### 2，子代选择器

> 亲儿子选择器

```html
<style>
    body > span{
        background-color:red;
    }
</style>
        <p>
            我是p标签
            <span>我是span标签</span>
        </p>
        <span>我是span标签</span>
        <p>我是p标签</p>
        <p>
            我是p标签
            <span>我是span标签</span>
            <span>我是span标签</span>
            <span>我是span标签</span>
        </p>
        <p>
            我是p标签
            <p>
                我是p标签
                <span>我是span标签</span>
            </p>
        </p>
        <span>我是span标签</span>

<!-- 我只要亲儿子变红，子孙不变 -->
```

![1570790295525](/assets/htmlcssAssets.assets/1570790295525.png)

### 3，邻居选择器

```html
<style>
  .box + .a {
    color: red;
  }
</style>
<body>
  <div class="a">box的上第一个</div>
  <div class="box">box</div>
  <div class="a">box的下第一个</div>
  <div class="b">box的下第二个</div>
  <div class="a">box的下第三个</div>
</body>

<!-- 邻居选择器：同级别下，下一个单个标签，是唯一性的，下一个标签如果不满足那就没有了 -->
```

![1570789914486](https://img-blog.csdnimg.cn/f0b88a4c394140b8a03789d2eda8954c.png)

### 4，兄弟选择器

> 只要是兄弟，那就一起红

```html
<style>
  .box ~ .a {
    color: red;
  }
</style>
<body>
  <div class="a">box的上第一个</div>
  <div class="box">box</div>
  <div class="a">box的下第一个</div>
  <div class="b">box的下第二个</div>
  <div class="a">box的下第三个</div>
</body>

<!-- 兄弟选择器：同级别下，下n个满足条件的标签 -->
```

![1570789972319](https://img-blog.csdnimg.cn/37a01b5e17934b89b5f3354284c070bc.png)

### 5，多元素选择器

> 能够选中多个不同类型标签

```css
<style>
    p,
	span,
	p>span,
	p span {
        background-color:red;
    }
</style>
<p>我是p标签 <span>我是span标签</span> </p>
<p>我是p标签</p>
<p>我是p标签</p>
<span>我是span标签</span>
<p>我是p标签</p>
<span>我是span标签</span>

<!--相当于多个标签选择器整合成一个选择器，快捷方便-->
```

### 6，伪类选择器

> 伪类选择器的优先级和类名选择器一样

![1570791326633](/assets/htmlcssAssets.assets/1570791326633.png)![1570791897476](/assets/htmlcssAssets.assets/1570791897476.png)

![1570791641719](/assets/htmlcssAssets.assets/1570791641719.png)

### 6，选择器优先级

1. 比较 id 选择器，如果 id 多，name 优先级高，name 优先级高

   ```css
   #div1 .p1 span{
       color：red;
   }

   .div span{
       color:blue;
   }
   /* 选择器一有一个id选择器，选择器二有一个类名，一覆盖二 */
   ```

2. id 选择器一样的时，比较 class 选择器，class 多的则优先级高

   ```css
   #div1 .p1 span{
       color：red;
   }

   #div1 .p1 .span1 span{
       color：red;
   }
   /* 两个选择器id选择器相同，但是第二个的类名选择器多，二覆盖一 */
   ```

3. class 如果相同，比较标签选择器，标签选择器多的则优先级高

   ```css
   #div1 .p1 span{
       color：red;
   }

   #div1 .p1 a span{
       color：red;
   }
   /* 两个选择器id选择器相同，类名选择器相同，二比一多个标签选择器，二覆盖一 */
   ```

4. 伪类选择器，优先级，等同于类名

   ```css
   #div1 a{
       color：red;
   }
   a:hover{
       color:black;
   }
   /* a标签前面有一个id标签控制，不能被伪类（相当于类名）选择器控制 */
   ```

## 四，CSS 元素显示模式

### 1，块级元素

常见的块级元素有 `h1~h6` `p` `ul` `ol` `li` 其中 `div` 为最典型的块级元素

- 块级元素的特点：

  1. 独占一行

  2. 可以由内容撑开，浮动的元素必须清除浮动

  3. **width，hright，padding，margin，border**都可以自己控制

  4. **width** 默认为 **100%**（父级元素的宽度）

  5. 支持 padding margin，支持 `margin: auto`

  6. 里面能存放块级**行内**和**块**级元素

     **注意** ：

     ![1570794110341](/assets/htmlcssAssets.assets/1570794110341.png)

### 2，行内元素

常见的行内元素 `a`，`strong`，`em`，`del` 等，其中 `span` 被称为最典型的行内元素

- 行内元素的特点：

  1. 友好的横排显示（和别的行内元素）

  2. **高，宽**的设置都是**无效的**

  3. 盒子完全由内容撑开宽高

  4. _margin_ 只支持左右 不支持上下 `margin:auto`不支持

  5. _padding_ 只支持左右 上下的部分虽然存在，但是对别人没有影响

  6. **行内元素和行内元素之间会产生空格（包括标签之间的空格，换行），很少用到，
     基本用浮动**

  7. 行内元素默认基线对齐（像 img 标签的元素底部会留白）

  8. 行内元素**只能容纳文本**和其他**行内元素**

     注意：

     ![1570794587904](/assets/htmlcssAssets.assets/1570794587904.png)

### 3，行内块元素

常见的行内快元素：`input`，`img`，`td` ，它同时具有行内和快级元素的特点

- 行内快元素的特点：
  1. 一行能显示多个（行内特点）
  2. 默认宽度为他本身内容的宽度（行内特点）
  3. **height，width，padding，margin**都可以自己控制（块级特点）
  4. 支持 padding 四个方向
  5. 支持 margin 四个方向 `margin:auto`不支持
  6. 行内块和行内块之间默认会有产生空格，布局的时候要注意
  7. 基线对齐问题

### 4，显示模式总结

![1570795027550](/assets/htmlcssAssets.assets/1570795027550.png)

#### -案例 1：小米侧边栏

```html
    <style>
    * {padding: 0;margin: 0;}
    #main {
        width: 235px;
        height: 420px;
        padding: 20px 0;
        margin: 100px auto;
        background-color: rgba(153, 153, 153, .9);
    }

    ul>li {
        height: 42px;
        color: #ffffff;
        line-height: 42px;
        padding: 0 30px;
    }

    ul>li:hover {
        background-color: #ff6700;
        cursor: pointer;
    }

    ul>li>span {
        float: right;
    }
    </style>
</head>
<body>
    <div id="main">
        <ul>
            <li>手机 电话卡<span>></span></li>
            <li>电视 盒子<span>></span></li>
            <li>电视 平板<span>></span></li>
            <li>笔记本 插线板<span>></span></li>
            <li>出行 穿戴<span>></span></li>
            <li>只能 路由器<span>></span></li>
            <li>电源 配件<span>></span></li>
            <li>健康 儿童<span>></span></li>
            <li>耳机 音响<span>></span></li>
            <li>生活 箱包<span>></span></li>
        </ul>
    </div>
</body>
```

![23](/assets/htmlcssAssets.assets/23.gif)

#### -案例 2：小米评论框

```html
<style>
    *{padding: 0; margin:0;}
    ul, ol{list-style:none;}
    a{text-decoration:none;}
    img{border:0;}

    #tab {
        width: 1225px;
        height: 170px;
        padding: 40px;
        border: 1px solid darkgoldenrod
    }

    #tab>p {
        font-size: 19px;
        color: #757575;
    }

    ul>li {
        float: left;
        width: 170px;
        height: 45px;
        margin-right: 20px;
        border: 1px solid #EEEEEE;
        color: #B0B0B0;
        background-color: #f5f5f5;
        text-align: center;
        line-height: 45px;
        cursor: pointer;
    }

    .active {
        background-color: #ff6700;
        color: #fff;
    }

</style>
</head>
    <body>
        <div id="tab">
            <p>大家认为</p>
            <ul>
                <li>全部(2936)</li>
                <li>非常喜欢(86)</li>
                <li>手感很棒(70)</li>
                <li>效果很好(50)</li>
                <li>客服热情(32)</li>
                <li>速度很快(30)</li>
            </ul>
        </div>
    <script>
        var lis = document.querySelectorAll('li');
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            for(var i in lis) {
                lis[i].className = '';
            }
            e.target.className = 'active';
        })
    </script>
</body>
```

![24](/assets/htmlcssAssets.assets/24.gif)

## 四，CSS 文本

### 字体属性

### 1，字体大小

- `font-size`

> 注意：开发给 **body** 指定大小，有**继承性**

```html
div { font-size: 20px; } ...
<div>
  我是div标签
  <p>我是p标签</p>
</div>
```

属性：

1. `px` 不给时，默认 12 像素 eg： 一般给 body 设置 12px 的字体大小
2. `em` 父级字体大小 eg：`1em` 父级字体大小 ×1 倍
3. `rem` html 根标签的字体大小(针对移动端不同屏幕) eg：`2rem` 两倍的 html 字体大
   小
4. `%` 相对于父级字体大小计算

### 2，字体样式

- `font-family`

> 字体的话使用微软雅黑就够了，其他的字体有版权，有**继承性**

```html
div { font-family: serif; } ...
<div>
  我是div标签
  <p>我是p标签</p>
</div>
```

注意：

1），**Chrome ** 默认微软雅黑，**IE** 默认宋体，不同的字体会影响网页布局，必须统
一给 **body** 指定字体

2），设置多个字体及备用字体：`font-size: Arial, "Microsoft Yahei", "微软雅黑"`；

3），多个字体兼容性好，如果第一个字体找不到就使用第二个

### 3，字体粗细

- `font-weight`

  > 用来定义字体的粗细，有**继承性**

  ```html
  div { font-weight: 400; /* 等同于 normal */ font-weight: 700; /* 等同于 bod */
  } ...
  <div>
    我是div标签
    <p>我是p标签</p>
  </div>
  ```

参数：

1. **normal** ：正常的字体，相当于 400
2. **bold :** 粗体。相当于 700
3. **_number_** ：开发常用 400/700

### 4，字体样式

- `font-style`

  > 用来定义字体的粗细，有**继承性**

  ```html
  div { font-style: italic; } ...
  <div>
    我是div标签
    <p>我是p标签</p>
  </div>
  ```

参数：

1. **normal :** 正常的字体
2. **italic :** 斜体。对于没有斜体变量的特殊字体，将应用 oblique
3. **oblique :** 倾斜的字体 （当某些字体没有设计倾斜字体）

### 5，字体复合属性

```css
body {
  /* 格式 : font: font-style font-weight fnt-size/line-height font-family; */
  font: italic 700 16px/40px '微软雅黑';
}
```

- 如果有些属性要省略：**font-size** 和 **font-famile** 必须写，否则不起效果

### 文本属性

### 1，文本颜色

- `color`

  ![1570779503317](/assets/htmlcssAssets.assets/1570779503317.png)

### 2，对齐文本

- `text-align`

  > 让盒子内的行内，行内块元素，文本进行水平对齐，有
  > **center**，**left**，**right**

  ![1570779651789](/assets/htmlcssAssets.assets/1570779651789.png)

  ```html
  <style>
      .demo {
          width: 200px;
          height: 200px;
          background-color: palegoldenrod;
          text-align: center;
      }

      .pic {
          display: inline-block;
          width: 100px;
          height: 100px;
          background-color: palegreen;
      }

  </style>
  </head>

  <body>
      <div class="demo">
          <div class="pic"></div><br>
          <span>我是span</span>
      </div>
  </body>
  ```

  ![1571274891169](/assets/htmlcssAssets.assets/1571274891169.png)

### 3，文本装饰线

- `text-decoration`

  > 用来去除 **a** 标签的下划线

  ![1570779784255](/assets/htmlcssAssets.assets/1570779784255.png)

### 4，文本缩进

- `text-indent`

  > 实现文本的首行缩进多少距离，使用 **`em`** 来针对当前文字大小的个数，1em 就是
  > 一个字

### 5，行高行间距

- `line-height`

  **line-height** 默认单位是**em**，相对于父级设置的高度。

> 可以控制文本之间的距离，也以让文本在一个`盒子内水平居中`

![1570780152679](/assets/htmlcssAssets.assets/1570780152679.png)

## 五，CSS 的背景

### 1，背景颜色

- #### `background-color`

  ***

  ##### 语法

  **background-color : transparent | _color_**

  ##### 参数

  **transparent** : 　背景色透明(默认为该值，透明) **color** : 　指定颜色

  ##### 示例

  ```css
  p {
    background-color: silver;
  }
  div {
    background-color: rgb(223, 71, 177);
  }
  body {
    background-color: #98ab6f;
  }
  p {
    background-color: transparent;
  }
  ```

### 2，背景图片

- #### `background-image `

  ***

  ##### 语法

  **background-image :** **none** | **url (url)**

  ##### 参数

  **none :** 　无背景图 **url** : 　使用绝对或相对地址指定背景图像

  ##### 说明

  设置元素的背景图像

  对应的脚本特性为**backgroundImage**

  ##### 示例

  ```css
  div {
    background-image: url('images/comet.jpg');
  }
  .img {
    background-image: url('C:\user\images\1.jpg');
  }
  #bag {
    background-image: url('https://www.baidu.com/1.png');
  }
  body {
    background-image: none;
  }

  /* 小图片或者超大的图片都用背景图片，方便控制位置 */
  ```

### 3，图片平铺

- #### `background-repeat`

  ***

  ##### 语法

  **background-repeat :** **repeat** | **no-repeat** | **repeat-x** |
  **repeat-y**

  ##### 参数

  **repeat :** 　 背景图像在纵向和横向上平铺

  ![1570810314796](/assets/htmlcssAssets.assets/1570810314796.png)

  **no-repeat :** 　 背景图像不平铺

  ![1570810335077](/assets/htmlcssAssets.assets/1570810335077.png)

  **repeat-x :** 背景图像在横向上平铺

  ![1570810191850](/assets/htmlcssAssets.assets/1570810191850.png)

  **repeat-y :** 　 背景图像在纵向平铺

  ![1570810237764](/assets/htmlcssAssets.assets/1570810237764.png)

  ##### 说明

  设置背景图片是否平铺

  对应的脚本特性为**backgroundRepeat**

  ##### 示例

  ```css
  div {
    background: url('images/aardvark.gif');
    background-repeat: repeat-y;
  }
  li {
    background: url('images/aardvark.gif');
    background-repeat: no-repeat;
  }
  ```

### 4，背景位置

- #### `background-position`

  ***

  ##### 语法

  **background-position :** _length_(x 轴) || _length_(y 轴)
  **background-position :** _position_ || _position_

  ##### 参数

  _length :_ 　百分数 | 浮点数字 | 单位标识符 | top...center...等 组成的长度值
  _position :_ 　 top | center | bottom | left | center | right

  ##### 说明

  设置背景图像在该标签内的位置，类似文本的位置

  如果填关键词，两个位置前后互换没关系，只写一个另外一个默认 center

  ##### 示例

  ```css
  li {
    background-position: 20px center;
  } /* 第一个值固定为x轴偏移，第二个值可以是数字关键字*/
  body {
    background: url('images/1.gif');
    background-position: top right;
  }
  div {
    background: url('images/2.gif');
    background-position: 10px 10px;
  }
  ```

#### -案例 3：王者荣耀图

```html
<style>
    *{padding: 0; margin:0;}
    ul, ol{list-style:none;}
    a{text-decoration:none;}
    img{border:0;}

    div {
        width: 118px;
        height: 40px;
        margin: 200px auto;
        background: bisque url('images/logo.png') no-repeat left;
        font: 14px/1.5 "Microsoft YaHei",Tahoma,"simsun",sans-serif;
        text-align: center;
        line-height: 40px;
    }
</style>
</head>
<body>
    <div>成长守护平台</div>
</body>
```

![1570856050739](/assets/htmlcssAssets.assets/1570856050739.png)

```css
div {
  width: 118px;
  height: 40px;
  margin: 200px auto;
  background: bisque url('images/logo.png') no-repeat;
  background-position: 20px center;
}
```

![1570857358585](/assets/htmlcssAssets.assets/1570857358585.png)

```css
body {
  background: url('images/0.jpg') no-repeat top;
}
```

![1570856835898](/assets/htmlcssAssets.assets/1570856835898.png)

### 5，背景图片固定

- #### `background-attachment`

  ***

  ##### 参数

  **background-attachment :** _scroll_ | _fixed_

  ##### 参数

  _scroll_ ：背景图片是随着内容滚动的

  _fixed_ ：背景图片固定

  ##### 说明

  设置背景图片是滚动的还是固定的

  对应的脚本特性为 **background-attachment**

  ##### 示例

  ```css
  html {
    background-img: url('images/1.png');
    background-attachment: fixed;
  }
  body {
    background: url('images/0.jpg') no-repeat center 20px;
    background-attachment: fixed;
  }
  ```

  ![assert/1.gif](/assets/htmlcssAssets.assets/1.gif)

### 6，背景属性复合写法

- #### `background`

  ***

  ##### 语法

  **background :** **background-color** || **background-image** ||
  **background-repeat** || **background-attachment** || **background-position**

  ##### 说明

  背景图片属性的复合写法

  ##### 示例

  ```css
  body {
    background: url('images/0.jpg') no-repeat center 20px fixed;
  }
  background: url('https://s02.mifile.cn//assets/htmlcssAssets.assets/static/image/mi-logo.png')
    no-repeat 50% 50%;
  body {
    background: url('images/aardvark.gif') repeat-y;
  }
  ```

### 7，背景色半透明

- #### `rgba(0, 0, 0, 0.3)`

  ***

  ##### 语法

  **background-color :** _rgba_

  ##### 参数

  颜色为 raba 的颜色，最后一个值为透明度，范围为 0~1

  ##### 说明

  他只会影响背景颜色，不会影响里面的元素

  ##### 示例

  ```css
  body {
    background: rgba(0, 0, 0, 0.3);
  }
  ```

### 8，C3 新增背景大小

- #### `background-size`

  ##### 语法

  **background-size**: _width_ | _height_

  ##### 参数

  **size / %**：可以是各种单位，如果只有一个值，另外一个等比例缩放

  **cover**：等比例拉伸盒子，等宽和高全部覆盖盒子才停下，有一部分图片会看不到

  **contain**：宽度和高度，等宽和高其中一者碰到盒子边缘就停下，会有空白区域

  ##### 示例

  ```css
  div {
    background-size: 800px;
  }
  p {
    background-size: 200px 100px;
  }
  .btn {
    background-size: contain;
  }
  ```

### 9，背景渐变色

- #### `linear-gradient`

  ***

  ##### 语法

  **background：** _-webkit-linear-gradient(方位名词, 颜色 1, 颜色 2)_

  ##### 说明

  方位名词默认的起始位置是从上往下，必须添加浏览器的私有前缀，否则不生效，移动端
  基本都是 webkit

  ##### 示例

  ```css
  div {
    background: -webkit-linear-gradient(top left, red, blue);
  } /* 从左上角开始渐变色 */
  p {
    background: -webkit-linear-gradient(bottom, red, blue);
  } /* 从左上角开始渐变色 */
  ```

### 10，元素半透明

- #### `opacity`

  ***

  ##### [语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity)

  ```css
  /* 完全不透明 */
  opacity: 1;
  opacity: 1;

  /* 半透明 */
  opacity: 0.6;

  /* 完全透明 */
  opacity: 0;
  opacity: 0;

  opacity: inherit;
  ```

## 七，盒子模型

### 盒子模型

### 1，外边框 border

- #### `border` 会扩大盒子

  ***

  ##### 语法

  **border :** _border-width_ || _border-style_ || _border-color_

  ##### 参数

  _border-width_ : **medium** | **thin** | **thick** | _length_

  _border-style_ : **none** | **hidden** | **dotted** | **dashed** | **solid** |
  **double** | **groove** | **ridge** | **inset** | **outset**

  _border-color_ : _color_

  ##### 说明

  该属性是复合属性，作用于盒子的 4 条边，如有需要可以修改单条

  - [x] _border-top | border-bottom | border-left | border-bottom_

  - [x] _border-top-width | border-bottom-width | border-left-width |
        border-bottom-width_

  - [x] _border-top-style| border-bottom-style| border-left-style|
        border-bottom-style_

  - [x] _border-top-color| border-bottom-color| border-left-color|
        border-bottom-color_

  > **注意！**写样式的时候，如果只需要控制单条样式，要写的很细，不要出现浪费性能

  ##### 扩展

  使用 **`border-collapse: collapse`** 能够合并表格的单元格线

  ##### 示例

  ```css
  th,
  td {
    border: 1px solid red;
    border-collapse: collapse;
  }
  div {
    border-top: 2px dotted pink;
    border-bottom-style: solid;
  }
  ```

### 2，内边距 padding

- #### `padding` 会扩大盒子

  ***

  ##### 语法

  **padding :** _length_

  ##### 参数

  _length_ ：由浮点数字和单位标识符组成的长度值 | 或者百分数。百分数是基于父对象
  的宽度。

  ##### 说明

  如果提供全部**四个**参数值，将按**上－右－下－左**的顺序作用于四边。如果只提
  供**一个**，将用于全部的**四条边**。如果提供**两个**，第一个用于**上－下**，第
  二个用于**左－右**。如果提供**三个**，第一个用于**上**，第二个用于**左－右**，
  第三个用于**下**。

  > 如果没有给盒子指定 **width / height** 属性，单独设置另一个方向的 **padding**
  > 不会撑开盒子，会自适应

  ##### 示例

  ```css
  div {padding: 20px;}
  p {padding: 20px 30px;}
  a {padding: 20px 30px; 10px}
  ```

#### -案例 3：新浪导航栏

```css
body {
  padding: 10px;
}
.nav {
  height: 41px;
  border-top: 3px solid #ff8500;
  border-bottom: 2px solid #999;
}
.nav div {
  float: left;
  height: 41px;
  padding: 0 10px;
  line-height: 41px;
}
...
  <div
  class='nav'
  > <div
  > 设为首页</div
  > <div
  > 手机新浪网</div
  > <div
  > 移动客户端</div
  > <div
  > 博客</div
  > <div
  > 微博</div
  > <div
  > 关注我</div
  > </div
  >;
```

![1570947693458](/assets/htmlcssAssets.assets/1570947693458.png)

### 3，外边距 margin

- #### `margin` 会挤别的盒子

  ***

  ##### 语法

  **margin :** **auto** | _length_

  ##### 参数

  **auto :** 　左右自适应

  _length :_ 　由浮点数字和单位标识符组成的长度值 | 百分数。百分数是基于父对象的
  高度。对于内联对象来说，左右外延边距可以是负数值

  ##### 元素居中

  块级元素居中(必须有 width)：**_{margin: 0 auto}_**

  行内元素，图片，文本 : **_{teax-algin: center}_**

  ##### 外边距合并

  1. 左右盒子外边距不合并，上下盒子的外边距会合并(以大的值为主)

     ![1570949551754](/assets/htmlcssAssets.assets/1570949551754.png)

  2. 两个嵌套关系的盒子，父元素有上外边距，子元素有上外边距，整个盒子 会塌陷数值
     大的外边距

     ![1570949379482](/assets/htmlcssAssets.assets/1570949379482.png)

     解决方案：

     - 使用父元素的 **padding**
     - 给外层盒子一个 **border** 线
     - 给父级盒子一个 `overflow:hidden;` 样式
     - 浮动 定位

  ##### 示例

  ```css
  div {margin: -20px;}
  p {margin: 20px 30px;}
  a {margin: 20px 30px; 10px}

  /* 行内元素不要设置上下 margin，只设置左右 margin */
  ```

### 4，弹性盒子

- ##### **`box-sizing: border-box`** : 弹性盒模型，盒子会根据 padding 和 border 自减

- 默认值为 **content-box**

  ```css
  div {
    width: 200px;
    height: 200px;
    padding: 50px; /* padding 和 border 不会撑大盒子 */
    border: 20px solid blue;
    background-color: red;
    box-sizing: border-box;
  }
  ```

  ![1571550767718](/assets/htmlcssAssets.assets/1571550767718.png)

### 5，元素初始化

```css
* {
  padding: 0;
  margin: 0;
} /* 把所有的样式初始化，方便布局 */
ul,
ol {
  list-style: none;
} /* 初始化列表里面的样式 */
a {
  text-decoration: none;
} /* 消除所有a标签的下划线 */
img {
  border: 0;
} /* 有一些浏览器图片会带边框线 */
```

```css
* {
  padding: 0;
  margin: 0;
  border-sizing: border-box;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  border: 0;
}
```

### 5，PS 的基本操作

- `文件 => 打开` ：打开要测量的图片

- `Crtl + R` ：打开标尺，或者 试图 => 标尺

- `Ctrl + 加号(+)` ：放大试图

- `按住空格` ，鼠标可以拖动图片

- 使用**选区操作**，就是小框框，`ctrl + d` 可以取消

  ![1570951321640](/assets/htmlcssAssets.assets/1570951321640.png)

#### -案例 4：快报模块

```html
.box { width: 440px; height: 290px; margin: 100px auto; border: 2px solid
#DBDCDA; background-color: #fff; } .box .title { height: 56px; padding-left:
25px; color: #797E80; font-size: 17px; line-height: 56px; border-bottom: 1px
dashed #999; } .box .content { margin: 0 35px; } .box .content li { margin: 21px
0; } ...
<div class="box">
  <h3 class="title">品优购快报</h3>
  <ul class="content">
    <li>【特惠】爆款耳机5折抄！</li>
    <li>【特惠】爆款耳机5折抄wdadad！</li>
    <li>【特惠】爆款耳机5折抄！</li>
    <li>【特惠】爆款耳机5折抄！</li>
    <li>【特惠】爆款耳机5折抄！</li>
  </ul>
</div>
```

![1570957933405](/assets/htmlcssAssets.assets/1570957933405.png)

### CSS3 新增样式

### 1，圆角边框

- #### `border-radius`

  ***

  ##### 语法

  **border-radius** : _length;_

  ##### 参数

  _length_ ：由浮点数字和单位标识符组成的长度值 | 或者百分数。百分数是基于父对象
  的宽度。

  ##### 说明

  **radius** 半径(圆的半径)原理：(椭圆)与边框的交集形成圆角效果

  ![1570959130300](/assets/htmlcssAssets.assets/1570959130300.png)

  ##### 示例

  ```css
  div {
    border-radius: 10px;
  }
  p {
    border-radius: 100%;
  }
  p {
    border-radius: 50%;
  }
  /* 圆角矩形设置成高度的一半 */
  .box {
    border-radius: 10px;
  }

  /* 可以写1~4个值 */
  .box {
    border-radius: 20px 30px 40px 5px;
  }
  ```

### 2，盒子阴影

- #### `box-shadow`

  ***

  ##### 语法

  **box-shadow:** **h-shadow** **|** **v-shadow** **|** _blur **|** spread **|**
  color **|** inset_

  ##### 参数

  **h-shadow** ：必需，水平方向阴影位置，可以为负值

  **v-shadow** ：必需，垂直方向阴影位置，可以为负值

  _blur_ ： 可选，模糊距离，就是影子的透明度

  _spread_ ： 可选，阴影的尺寸，就是影子的尺寸

  _color_ ： 可选，阴影的颜色

  _inset_ ： 可选，将外部阴影改成内部阴影

  ##### 示例

  ```css
  div {box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, .3);}	/* 默认就是inset */
  div {box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, .3) inset;}


  box-shadow: 0 0 0 20px #333;  ↓↓↓↓↓↓↓↓↓↓↓（水平垂直只是增大原来的阴影面积）
  ```

  ![1571469130035](/assets/htmlcssAssets.assets/1571469130035.png)

### 3，文字阴影

- #### `text-shadow`

  ***

  ##### 语法

  **text-shadow: h-shadow | v-shadow |** _blur_ **|** _color_

  ##### 参数

  **h-shadow** ：必需，水平阴影的位置，允许负值

  **h-shadow** ：必需，水平阴影的位置，允许负值

  _blur_ ： 可选，模糊距离，就是影子的透明度

  _color_ ： 可选，阴影的颜色

  ##### 示例

  ```css
  div {
    text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.9);
  }
  ```

## 八，CSS 浮动

> 网页中布局定义标准：**多个块级元素`纵向排列`**找`标准流`，**多个块级元
> 素`横向排列`**找`浮动流`

### 1，浮动

> 浮动最初是为了**让文字环绕图片而产生的**，浮动不会盖住文档流里面的文字和图片

- #### `float`

  ***

  #### 语法

  **float ： ** _none_ **|** _left_ **|** _right_

  ##### 参数

  _none_ ： 元素不浮动（默认）

  _left_ ： 元素像**左**浮动

  _right_ ： 元素向**右**浮动

  ##### 说明

  用来控制元素的位置，给哪个元素浮动，哪个元素就浮动

  浮动之后的特性：

  1. `浮动元素会脱离文档流`

  2. 浮动的元素不在保留原先的位置

  3. 浮动的元素（不论什么元素）具有行`内块元素`的特性

  4. 支持 _margin_ 和 _padding_ ，但是不支持 `margin auto`（左右居中）

     ##### 优点

     1. 不会产生空格

  5. 不会存在垂直对齐问题

  ![2](/assets/htmlcssAssets.assets/2.gif)

  ##### 注意

  1. 浮动要搭配标准流的父盒子使用，父盒子标准流，子元素浮动

  2. `一个盒子浮动了，其余的兄弟元素全部都要浮动`（不会浮到前面的文档流中）

  3. 浮动只会影响后面的文档流，前面的文档流不会影响 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓（同一个父级
     盒子内也一样）

     ![2](/assets/htmlcssAssets.assets/2.gif)

     ![1570971568151](/assets/htmlcssAssets.assets/1570971568151.png)

#### -案例 4：小米导航栏

```html
*{padding: 0; margin:0;} ul, ol{list-style:none;} a{text-decoration:none;}
img{border:0;} .box { width: 1230px; height: 460px; margin: 100px auto;
background-color: greenyellow; } .box .nav { width: 235px; height: 420px;
padding: 20px 0; background-color: rgba(105,101,101,.6); } .box .nav li {
height: 42px; padding: 0 28px; color: #fff; font-size: 14px; line-height: 42px;
cursor: pointer; } .box .nav li i{ float: right; font-style: normal; } .box .nav
li:hover { background-color: #ff6700; } ...
<div class="box">
  <ul class="nav">
    <li>手机 电话卡<i>></i></li>
    <li>电视 盒子<i>></i></li>
    <li>笔记本 平板<i>></i></li>
    <li>家电 插线板<i>></i></li>
    <li>出行 穿戴<i>></i></li>
    <li>智能 路由器<i>></i></li>
    <li>电源 配件<i>></i></li>
    <li>健康 儿童<i>></i></li>
    <li>耳机 音箱<i>></i></li>
    <li>生活 箱包<i>></i></li>
  </ul>
</div>
```

#### -案例 5：小米商品栏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
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
      a {
        text-decoration: none;
      }
      img {
        border: 0;
      }

      body {
        background-color: #f5f5f5;
      }

      .box {
        width: 1226px;
        height: 614px;
        margin: 100px auto;
      }

      .box .left {
        float: left;
        width: 234px;
        height: 614px;
        background-color: red;
      }

      .box .right {
        float: right;
        width: 992px;
        height: 614px;
        background-color: #f5f5f5;
      }

      .box .right ul li {
        float: left;
        width: 234px;
        height: 260px;
        padding: 20px 0;
        margin-left: 14px;
        margin-bottom: 14px;
        text-align: center;
        background-color: #ffffff;
      }

      .box .right ul li img {
        width: 160px;
        margin-bottom: 18px;
        /* margin: 0 37px 18px; */
      }

      .box .right ul li .title {
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: 400;
      }

      .box .right ul li .desc {
        margin: 0 10px 10px;
        height: 18px;
        font-size: 12px;
        color: #b0b0b0;
      }

      .box .right ul li .price {
        font-weight: 500;
        font-size: 13px;
        color: #ff6700;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="left">
        <img
          src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/574c6643ab91c6618bfb2d0e2c761d0b.jpg?thumb=1&w=234&h=614&f=webp&q=90"
          alt=""
        />
      </div>
      <div class="right">
        <ul>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
          <li>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg?thumb=1&w=200&h=200&f=webp&q=90"
              alt=""
            />
            <h3 class="title">Redmi Note 8 Pro</h3>
            <p class="desc">6400万全场景四摄</p>
            <p class="price">1399元起</p>
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>
```

![1570970601588](/assets/htmlcssAssets.assets/1570970601588.png)

### 2，清除浮动

> 为什么要清除浮动

由于父盒子很多情况下，**不方便给高度**，但是**浮动的盒子会脱离文档流**，**父盒子
包裹不到浮动**的内容，父盒子的高度就会塌陷，这个时候我们就**需要有一个东西垫在浮
动的下面**，**让他真正的占据位置**

![1570983233041](/assets/htmlcssAssets.assets/1570983233041.png)

- #### `清除浮动`

  清除浮动的本质就是清除浮动元素对父级盒子塌陷的影响

  ***

  ##### 方法一 : 额外标签法(了解)

  - [x] 父级的内容最后添加一个空的块级标签，给他一个 _clear:both_ 的属性，不能再
        _ul ol li_ 中使用

  ```html
  .clear {clear: both;} ...
  <div class=".nav">
    <div></div>
    <div></div>
    <div class="clear"></div>
  </div>
  ```

  ##### 方法二：父级添加 overflow（溢出的会被隐藏）

  - [x] 给父级来一个*overflow:hidden*（这个属性会探测有没有溢出的元素，能检测到
        浮动的元素

    ```html
    .nav { weight: 200px; overflow: hidden | auto | scroll; /*
    三个中任何一个都行 */ } ...
    <div class=".nav">
      <div></div>
      <div></div>
      <div></div>
    </div>
    ```

  ##### 方法三：:after 伪元素（常用）

  - [x] _:after_ 方法是标签法的升级版，给父元素添加(会在父元素的内容最后生成一个
        块级标签)

    ```css
    .clearfix:after {
    	content: "";
    	display: block;
    	height: 0;
    	clear: both;
    	visibility: hidden;
    }
    .clearfix {*zoom: 1}	/* 兼容IE6, 7，可以不写 */
    -------------------------------------------------------------------------------
    <div class=".nav clearfix">
    <div></div>
    <div></div>
    <div></div>
    </div>
    ```

    ![1571550145814](/assets/htmlcssAssets.assets/1571550145814.png)

    #### 方法四：双伪元素（常用）

  - [ ] 使用 _before，after_ 一起来清除元素

    ```html
    .clearfix:before, .clearfix:after {content: "";display: table;}
    .clearfix:after {clear: both;} .clearfix {*zoom: 1;}
    -------------------------------------------------------------------------------
    <div class="clearfix">
      <div></div>
      <div></div>
      <div></div>
    </div>
    ```

    ![1571550188781](/assets/htmlcssAssets.assets/1571550188781.png)

### 3，PS 图层切图

- #### `图层切图`

  ##### 语法

  最简单的切图方式：右击图层 -> 快速导出为 PNG 图片

- #### `图层合并`

  ##### 语法

  选中想要切的图层，_ctrl + e_ 合并

- #### `切片切图`

  ##### 语法

  切片使用：选中左侧栏钢笔工具右键 -> 选中切片工具 -> 框图 -> 文件 -> 导出为 web
  格式

  透明图片：图层拉到最下面 -> 背景的眼睛去掉 -> 导出为 Png 格式

- #### `PS插件截图` （重头戏）

  **[Cutterman](https://gitee.com/xiaoqiang001/jichubanxin/blob/master/%E7%AC%AC%E4%B8%83%E5%A4%A9/Cutterman_panel_3.5.0_201711141423.zip)**
  下载地址

### 4，CSS 书写顺序

![1571027609147](/assets/htmlcssAssets.assets/1571027609147.png)

### 5，页面布局整体思路

1. ###### 拿到页面，首先确认网页的`版心`（一版页面最中心的位置）
2. ###### 分析页面中的`行模块（标准流）`，在分析行模块内的`列模块（浮动流）`
3. ###### 制作 HTML 结构，遵循`先有结构`，`后有样式`的原则，结构永远最重要

### 6，案例 5：学成网案例

#### 1，头部制作

1. ##### Logo 制作

   ![1571028904228](/assets/htmlcssAssets.assets/1571028904228.png)

   ```html
   <style>
     /* 版心类名，每个在版心内的标准流大盒子都要套上 */
     .w {
       width: 1202px;
       margin: auto;
     }

     /* Logo 区域 */
     .head {
       height: 44px; /* 把中间的一行看成一块，上下的空白用margin做 */
       margin: 30px auto;
       background-color: red;
     }
   </style>
   ...
   <div class="w head">
     <img src="images/学成在线.png" alt="" />
   </div>
   ```

2. ##### 导航栏制作

   ![1571063303614](/assets/htmlcssAssets.assets/1571063303614.png)

   ```html
   <style>
     /* 搜索框区域 */
     .nav {
       float: left;
       margin-left: 60px;
     }

     .nav ul {
       float: left;
     }

     .nav ul li {
       float: left;
       margin: 0 15px;
     }

     .nav ul li a {
       display: block;
       height: 42px;
       padding: 0 10px;
       line-height: 44px;
       font-size: 18px;
       color: #050505;
     }

     .nav ul li a:hover {
       border-bottom: 2px solid #00a4ff;
       color: #00a4ff;
     }
   </style>
   ...
   <div class="w head">
     <div class="logo"></div>
     <div class="nav">
       <ul>
         <li><a href="">首页</a></li>
         <li><a href="">课程</a></li>
         <li><a href="">职业规划</a></li>
       </ul>
     </div>
   </div>
   ```

3. ##### 搜索框制作

   ![1571065230668](/assets/htmlcssAssets.assets/1571065230668.png)

   ```html
   <style>
     /* 搜索框区域 */
     .search {
       float: left;
       width: 412px;
       height: 44px;
       margin-left: 70px;
       background-color: greenyellow;
     }

     .search input {
       float: left;
       width: 342px;
       height: 40px;
       padding-left: 19px;
       border: 2px solid #00a4ff;
       border-right: 0;
       color: #bfbfbf;
       font-size: 14px;
     }

     .search button {
       float: left;
       width: 49px;
       height: 100%;
       border: 0;
       background-image: url('images/fa-search.png');
     }
   </style>
   ...
   <div class="w head">
     <div class="logo"></div>
     <div class="nav"></div>
     <div class="search">
       <input type="text" placeholder="输入内容" />
       <button></button>
     </div>
   </div>
   ```

4. ##### 用户区域制作

   ```html
   <style>
     /* 用户区域 */
     .user {
       float: right;
       height: 34px;
       padding: 5px 0;
       margin-right: 35px;
       line-height: 34px;
     }

     .user img {
       float: left;
       width: 30px;
       height: 30px;
       border: 2px solid #00a4ff;
       border-radius: 50%;
     }

     .user a {
       float: left;
       margin-left: 5px;
       color: #666666;
       font-size: 14px;
     }
   </style>
   ...
   <div class="w head">
     <div class="logo"></div>
     <div class="nav"></div>
     <div class="search"></div>
     <div class="user">
       <img src="images/Andermi.jpg" alt="" />
       <a href="">Andermi</a>
     </div>
   </div>
   ```

![1571067681132](/assets/htmlcssAssets.assets/1571067681132.png)

#### 2，banner 横幅制作

![1571096770123](/assets/htmlcssAssets.assets/1571096770123.png)

1. ##### **大盒子 banner 制作**

   ```html
   <style>
     .banner {
       height: 421px;
       background-color: #1c036c;
     }

     .banner .w {
       height: 421px;
       /* background-color: red; */
       background: url(images/banner2.png) no-repeat top center;
     }
   </style>
   ...
   <div class="banner">
     <div class="w"></div>
   </div>
   ```

2. ##### 左对齐 subnav 制作

   ```html
   <style>
     .subnav {
       width: 190px;
       height: 421px;
       background-color: rgba(0, 0, 0, 0.3);
     }

     .subnav ul li {
       height: 45px;
       padding: 0 20px;
       line-height: 45px;
     }

     .subnav ul li a {
       font-size: 14px;
       color: #fff;
     }

     .subnav ul li a:hover {
       color: #00a4ff;
     }

     .subnav ul li span {
       float: right;
     }
   </style>
   ...
   <div class="banner">
     <div class="w">
       <div class="subnav">
         <ul>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
           <li>
             <a href="">前端开发<span> > </span></a>
           </li>
         </ul>
       </div>
     </div>
   </div>
   ```

3. ##### 右对齐 course 课程制作

   ```html
   <style>
     /* 右侧课程栏 */
     .course {
       float: right;
       width: 230px;
       height: 300px;
       margin-top: 50px;
       background-color: #fff;
     }

     .course h2 {
       height: 48px;
       color: #fff;
       font-size: 18px;
       line-height: 48px;
       text-align: center;
       background-color: #95caea;
     }

     .bd {
       padding: 0 20px;
     }

     .bd ul li {
       padding: 12px 0;
       border-bottom: 2px solid #f2f3f2;
     }

     .bd ul li h4 {
       color: #414141;
       font-size: 16px;
       font-weight: 525;
     }

     .bd ul li p {
       color: #a5a5a5;
       font-size: 12px;
     }

     .bd > a {
       display: block;
       height: 38px;
       margin-top: 10px;
       border: 2px solid #00a4ff;
       color: #00a4ff;
       font-size: 16px;
       line-height: 38px;
       text-align: center;
     }
   </style>
   <div class="banner">
     <div class="w">
       <div class="subnav"></div>
       <div class="course">
         <h2>我的课程表</h2>
         <div class="bd">
           <ul>
             <li>
               <h4>继续学习 程序语言设计</h4>
               <p>正在学习-使用对象</p>
             </li>
             <li>
               <h4>继续学习 程序语言设计</h4>
               <p>正在学习-使用对象</p>
             </li>
             <li>
               <h4>继续学习 程序语言设计</h4>
               <p>正在学习-使用对象</p>
             </li>
           </ul>
           <a href="">全部课程</a>
         </div>
       </div>
     </div>
   </div>
   ```

![1571116342451](/assets/htmlcssAssets.assets/1571116342451.png)

#### 3，精品推荐小模块

![1571116533193](/assets/htmlcssAssets.assets/1571116533193.png)

1. 大盒子位于版心，有盒子阴影

   ```html
   <style>
     /* goods精品区域 */
     .goods {
       width: 1150px;
       height: 20px;
       padding: 21px 26px;
       margin-top: 8px;
       margin-bottom: 37px;
       background-color: #fff;
       line-height: 20px; /* 行高会继承给儿子 */
       box-shadow: 0px 7px 10px -6px rgba(0, 0, 0, 0.2);
     }
   </style>
   ...
   <div class="w goods"></div>
   ```

2. 1 号盒子 **H3** 左浮动

   ```html
   <style>
     .goods h3 {
       float: left;
       margin-right: 33px;
       color: #42b2ff;
       font-size: 16px;
       font-weight: 500;
     }
   </style>
   ...
   <div class="w goods">
     <h3>精品推荐</h3>
   </div>
   ```

3. 2 号盒子 **goods-item** ，里面放链接

   ```html
   <style>
     .goods ul li {
       float: left;
       padding: 0 33px;
       border-left: 1px solid #bfbfbf;
     }

     .goods ul li a {
       color: #050505;
       font-size: 16px;
     }
   </style>
   ...
   <div class="w goods">
     <h3>精品推荐</h3>
     <ul class="goods-item">
       <li><a href="">JQuery</a></li>
       <li><a href="">Python</a></li>
       <li><a href="">Nodejs</a></li>
       <li><a href="">Java</a></li>
       <li><a href="">MySQL</a></li>
       <li><a href="">JQuery</a></li>
     </ul>
   </div>
   ```

4. 3 号盒子 **mod** 右浮动

   ```html
   <style>
     .mod a {
       float: right;
       color: #42b2ff;
       font-size: 14px;
     }
   </style>
   ...
   <div class="w goods">
     <h3>精品推荐</h3>
     <ul class="goods-item"></ul>
     <div class="mod">
       <a href="">修改兴趣</a>
     </div>
   </div>
   ```

#### 4，精品推荐大模块

![1571125276577](/assets/htmlcssAssets.assets/1571125276577.png)

- [x] 第四点极为重要，**给`浮动的父元素加上额外的宽度和高度`并不会影响下面的文档
      流**，可以方便我们容纳带有 margin 的 li 盒子，不会让他掉下来

1. ##### box 盒子制作

   ```html
   <!-- box核心区域开始 -->
   .box { height: 595px; } ...
   <div class="w box"></div>
   ```

2. ##### box-hd 制作

   ```html
   <style>
     .box-hd {
       height: 40px;
     }

     .box-hd h3 {
       float: left;
       color: #494949;
       font-size: 20px;
       font-weight: 500;
     }

     .box-hd a {
       float: right;
       color: #a5a5a5;
       font-size: 12px;
       margin-top: 7px;
       margin-right: 45px;
     }
   </style>
   ...
   <div class="w box">
     <div class="box-hd">
       <h3>精品推荐</h3>
       <a href="">查看全部</a>
     </div>
   </div>
   ```

3. ##### box-bd 制作

   ```html
   <style>
     .box-bd {
       float: left;
       width: 1225px;
     }

     .box-bd li {
       float: left;
       width: 230px;
       height: 270px;
       margin-right: 13px;
       margin-bottom: 15px;
       background-color: #fff;
     }

     .box-bd li img {
       width: 100%;
     }

     .content {
       padding: 20px 25px 25px 25px;
     }

     .content h4 {
       color: #050505;
       font-weight: 400;
       font-size: 14px;
     }

     .content p {
       margin-top: 12px;
       color: #999999;
       font-size: 12px;
     }

     .content p span {
       color: #ff7c2d;
     }
   </style>
   ...
   <div class="w box">
     <div class="box-hd">
       <h3>精品推荐</h3>
       <a href="">查看全部</a>
     </div>
     <ul class="box-bd">
       <li>
         <img src="images/图层137.png" alt="" />
         <div class="content">
           <h4>Android Hybird App开发实战 H5 + 原生！</h4>
           <p><span>高级&emsp;</span>•&emsp;1125人在学习</p>
         </div>
       </li>
       ...
     </ul>
   </div>
   ```

![1571130698105](/assets/htmlcssAssets.assets/1571130698105.png)

#### 5，底部制作

![1571148568010](/assets/htmlcssAssets.assets/1571148568010.png)

```html
<style>
  /* foot尾部区域 */
  .foot {
    height: 386px;
  }

  .foot .w {
    width: 1202px;
    height: 356px;
    padding-top: 30px;
    margin: 0 auto;
  }

  .copyright {
    float: left;
    margin-left: 20px;
  }

  .copyright p {
    margin: 23px 0 14px 0;
  }

  .copyright a {
    display: block;
    width: 120px;
    height: 36px;
    border: 2px solid #00a4ff;
    color: #00a4ff;
    font-size: 16px;
    line-height: 36px;
    text-align: center;
    background-color: #fff;
  }

  .links {
    float: right;
    margin-right: 30px;
    color: #333333;
  }

  .links dl {
    float: left;
    margin-left: 75px;
  }

  .links dl dt {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .links dl dd {
    font-size: 13px;
  }
</style>
...
<div class="foot">
  <div class="w">
    <div class="copyright">
      <img src="images/学成在线.png" alt="" />
      <p>
        学成在线致力于普及中国最好的教育它与中国一流大学和机构合作提供在线课程。<br />
        © 2017年XTCG Inc.保留所有权利。-沪ICP备15025210号
      </p>
      <a href="">下载APP</a>
    </div>
    <div class="links">
      <dl>
        <dt>关于学成网</dt>
        <dd><a href="">关于</a></dd>
        <dd><a href="">管理团队</a></dd>
        <dd><a href="">工作机会</a></dd>
        <dd><a href="">客户服务</a></dd>
        <dd><a href="">帮助</a></dd>
      </dl>
      <dl>
        <dt>新手指南</dt>
        <dd><a href="">如何注册</a></dd>
        <dd><a href="">如何选课</a></dd>
        <dd><a href="">如何拿到毕业证</a></dd>
        <dd><a href="">学分是什么</a></dd>
        <dd><a href="考试未通过这么办"></a></dd>
      </dl>
      <dl>
        <dt><a href="">合作伙伴</a></dt>
        <dd><a href="">合作机构</a></dd>
        <dd><a href="">合作导师</a></dd>
      </dl>
    </div>
  </div>
</div>
```

## 九，CSS 定位

- #### `position`

  ***

  ##### 语法

  **position :** **static** **|** _relative_ **|** _absolute_ **|** _fixed_
  **|** **sticky**

  ##### 参数

  **static :** 　无特殊定位，对象遵循 HTML 定位规则（了解）

  _relative_ **:**　**相对于未定位前的位置进行定位**

  _absolute_ **:**　**相对于 定位了的就近的祖先元素**，给父级一
  个`position:relative;` ，就会以父级来定位

  _fixed_ **:** **相对于浏览器窗口定位**（做小广告）

  **sticky** : 粘性定位，浏览器拉倒一定程度会固定在浏览器窗口上（了解），兼容性
  差

  ##### 说明

  1. 绝对定位：`position:relative;`

     1），不会改变原来元素的特性

     2），支持文档流，会占着茅坑不拉屎，相当于灵魂出窍，肉体还在

     3），层级（**_z-inder:;_**）未设置时，后来者还是会盖在他身上

     ![1571273320184](/assets/htmlcssAssets.assets/1571273320184.png)

  2. 绝对定位：`position:absolute;`

     1），脱离文档流，在文案流内不占位置

     2），参照与祖先内容区域定位

     3），层级未设置时（**_z-inder:;_**），后来者还是会盖在他身上

     4），会改变绝对元素的特性，**绝对定位元素特性**

     1. 能够支持宽高

     2. 不占位置

     3. 由内容撑开宽高，但是宽度不会超过定位父级的临界点

        注意：绝对定位元素，一定要给固定宽

     4. margin，padding 支持，但是不支持`margin auto`（能够用这个居中盒子）

  3. 固定定位：`position:fixed;`

     1. 支持宽高

  4. 不占位置，脱离文档流

3. 由内容撑开

4. 粘性定位：`position:fixed;`

   ![3](/assets/htmlcssAssets.assets/3.gif)

### 1，元素在元素内居中

```css
    /*一个元素怎么在另外一个元素里居中*/
/* 1.把宽高设置成父元素的 50%，再减去本身的宽高 */
div{
    position:relative;
    width:400px;
    height:400px
        border:1px solid green;
}
p{
    position:absolute;
    width:100px;
    height:100px;
    top:50%;
    left:50%;
    margin-top:-50px;
    margin-left:-50px;
    background-color:red;
}
/* 2. 骚操作，四个方向都给0，让他们互相挤压盒子，达到居中效果*/
p{
    position:absolute;
    width:100px;
    height:100px;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    background-color:red;
}
/* 3. 更骚操作，先让盒子定位50%50%，然后用translate移动自身的50%*/
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

### 2，按钮固定在版心算法

```html
<style>
  .w {
    width: 1200px;
    margin: 0 auto;
    background-color: pink;
  }

  .bd {
    height: 800px;
  }

  .ad {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 0;
    left: 50%;
    margin-left: 620px;
    background-color: blue;
  }
</style>
...
<body>
  <div class="w bd"></div>
  <div class="ad"></div>
</body>
```

![1571204533685](/assets/htmlcssAssets.assets/1571204533685.png)

#### -案例 6：轮播图外壳

```html
<style>
  ul,
  ol {
    list-style: none;
  }

  .tb-promo {
    position: relative;
    width: 520px;
    height: 280px;
    margin: 100px auto;
  }

  .promo > img {
    width: 100%;
  }

  .prev {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -15px;
    font-size: 30px;
  }

  .next {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -15px;
    font-size: 30px;
  }

  .prev:hover,
  .next:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .promo-nav {
    position: absolute;
    width: 70px;
    height: 14px;
    left: 50%;
    bottom: 5px;
    margin-left: -35px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 7px;
  }

  .promo-nav li {
    float: left;
    width: 8px;
    height: 8px;
    margin: 3px;
    background-color: #fff;
    border-radius: 50%;
  }

  .promo-nav li:hover {
    background-color: coral;
  }
</style>
...
<div class="tb-promo">
  <img src="images/6.jpg" alt="" />
  <div class="prev iconfont icon-jiantouarrowhead7"></div>
  <div class="next iconfont icon-jiantouarrow487"></div>
  <div class="promo-nav">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</div>
```

![1571208025798](/assets/htmlcssAssets.assets/1571208025798.png)

## 十，元素显示与隐藏

### 1，display 显示隐藏

![1571208974143](/assets/htmlcssAssets.assets/1571208974143.png)

**示例**

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    div {
        float: left;
        width: 150px;
        height: 150px;
        margin: 100px auto;
        background-color: dodgerblue;
        white-space: nowrap;
    }
</style>
</head>

<body>
    <div></div>
    <div>我是div标签</div>

    <script>
        var last_div = document.querySelector('div:last-of-type')
        var first_div = document.querySelector('div:first-of-type')
        last_div.addEventListener('mouseover', function() {
            first_div.style.display = 'none'
        })
    </script>
</body>
```

![10](/assets/htmlcssAssets.assets/10.gif)

### 2，visblity 显示隐藏

![1571209087206](/assets/htmlcssAssets.assets/1571209087206.png)

**示例**

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }

    div {
        float: left;
        width: 150px;
        height: 150px;
        margin: 100px auto;
        background-color: dodgerblue;
        white-space: nowrap;
    }
</style>
</head>

<body>
    <div></div>
    <div>我是div标签</div>

    <script>
        var last_div = document.querySelector('div:last-of-type')
        var first_div = document.querySelector('div:first-of-type')
        last_div.addEventListener('mouseover', function() {
            first_div.style.visibility = 'hidden'
        })
        last_div.addEventListener('mouseout', function() {
            first_div.style.visibility = 'visible'
        })
    </script>
</body>
```

![9](/assets/htmlcssAssets.assets/9.gif)

### 3，overflow 溢出显示隐藏

![1571209382103](/assets/htmlcssAssets.assets/1571209382103.png)

**示例**

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
        white-space: nowrap;
        overflow: hidden;
    }
</style>
</head>

<body>
    <div>啦啦啦啦啦啦啦啦啦啦啦啦啦啦</div>
</body>
```

![11](/assets/htmlcssAssets.assets/11.gif)

![1571383868471](/assets/htmlcssAssets.assets/1571383868471.png)

### 4，土豆案例

```html
<style>
  .tudou {
    position: relative;
    width: 444px;
    height: 320px;
    margin: 100px auto;
    background-color: coral;
  }

  .tudou img {
    width: 100%;
    height: 100%;
  }

  .mask {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.4) url('images/btn.png') no-repeat center;
  }

  .tudou:hover .mask {
    display: block;
  }
</style>

<body>
  <div class="tudou">
    <img src="images/7.jpg" alt="" />
    <div class="mask"></div>
  </div>
</body>
```

![4](/assets/htmlcssAssets.assets/4.gif)

## 十一，CSS 高级技巧

### 1，精灵图技术

- 为什么需要精灵图？

  1. 减少服务器图片请求次数，缓解服务器压力
  2. 加快 html 页面的加载

- 精灵图核心：

  1. 精灵图主要针对不会变化的小背景图片

  2. 主要借助背景位置来实现 --> `background-position`

  3. 精灵图的值一般都是负值，正值是让图片往 xy 轴的正半轴走，负值才是往左走

     ```html
     <style>
       * {
         padding: 0;
         margin: 0;
       }

       ul,
       ol {
         list-style: none;
       }

       a {
         text-decoration: none;
       }

       img {
         border: 0;
       }

       .download {
         width: 236px;
         height: 128px;
         margin: 100px auto;
         background: pink url('images/sprite.png') no-repeat 0 -219px;
       }

       i {
         display: block;
         width: 60px;
         height: 60px;
         margin: 30px auto;
         background: url('images/sprite.png') no-repeat -182px 2px;
       }
     </style>

     <body>
       <i></i>
       <div class="download"></div>
     </body>
     ```

![1571213579919](/assets/htmlcssAssets.assets/1571213579919.png)

### 2，字体小图标

- 为什么需要字体图标？

  精灵图是有许多有点的，但是也有很多的缺点

  1. 图片文件比较大
  2. 图片本身放大和缩小会失真
  3. 一旦图片制作完成想要更换非常复杂

  此时就有了一种很好的计数能够解决以上的问题，就是字体图标 `iconfont`

  字体图标看上去是图标，`本质上是属于文字的`

- 字体图标的优点

  - 轻量级：一个字体要比一系列的图片都要小的多，一旦字体加载了，图标就马上渲染出
    来，减少了服务器请求
  - 灵活性：本质是文字可以随意改变颜色，产生阴影，透明效果，旋转等
  - 兼容性：几乎支持所有的浏览器

  > 推荐两个网站：**icomoon** 和 **阿里 iconfont**

- icomoon 的使用

  ![1571215665489](/assets/htmlcssAssets.assets/1571215665489.png)![1571215750511](/assets/htmlcssAssets.assets/1571215750511.png)

  ```css
  /* 在 style 中进行字体声明，讲我们的字体图标引入进来 */
  @font-face {
    font-family: 'icomoon';
    src: url('fonts/icomoon.eot?anym8p');
    src: url('fonts/icomoon.eot?anym8p#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?anym8p')
        format('truetype'), url('fonts/icomoon.woff?anym8p') format('woff'), url('fonts/icomoon.svg?anym8p#icomoon')
        format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
  ```

  ![1571215932814](/assets/htmlcssAssets.assets/1571215932814.png)

  4. 给 span 标签添加样式 `font-family: 'icomoon';`

  ##### 示例

  ```html
  <link rel="stylesheet" href="style.css" />
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    ul,
    ol {
      list-style: none;
    }
    a {
      text-decoration: none;
    }
    img {
      border: 0;
    }
    @font-face {
      font-family: 'icomoon';
      src: url('fonts/icomoon.eot?anym8p');
      src: url('fonts/icomoon.eot?anym8p#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?anym8p')
          format('truetype'), url('fonts/icomoon.woff?anym8p') format('woff'), url('fonts/icomoon.svg?anym8p#icomoon')
          format('svg');
      font-weight: normal;
      font-style: normal;
      font-display: block;
    }
    span {
      position: absolute;
      color: red;
      font-family: 'icomoon';
      font-size: 48px;
    }

    .span1 {
      top: 100px;
      left: 50%;
    }

    .span2 {
      top: 150px;
      left: 50%;
      color: royalblue;
    }
  </style>

  <body>
    <span class="span1"></span>
    <span class="span2">🌛</span>
  </body>
  ```

  ![1571216777612](/assets/htmlcssAssets.assets/1571216777612.png)

### 3，小三角形的实现

- 从盒子的起源讲起

  ```html
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    ul,
    ol {
      list-style: none;
    }
    a {
      text-decoration: none;
    }
    img {
      border: 0;
    }

    div {
      width: 0;
      height: 0;
      /* border: 50px; */
      border-top: 50px solid royalblue;
      border-bottom: 50px solid red;
      border-left: 50px solid yellow;
      border-right: 50px solid green;
    }
  </style>

  <body>
    <div></div>
  </body>
  ```

  ![1571217402520](/assets/htmlcssAssets.assets/1571217402520.png)

- 所以，先给这个盒子的边框色为透明色，在给其中一条边框颜色

  ```html
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    ul,
    ol {
      list-style: none;
    }
    a {
      text-decoration: none;
    }
    img {
      border: 0;
    }

    div {
      width: 0;
      height: 0;
      line-height: 0; /* 兼容性写法 */
      font-size: 0; /* 兼容性写法 */
      border: 50px solid solid transparent; /* transparent 为透明色 */
      border-top-color: green;
    }
  </style>

  <body>
    <div></div>
  </body>
  ```

  ![1571217510991](/assets/htmlcssAssets.assets/1571217510991.png)

#### -案例 7：小三角形使用

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  ul,
  ol {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  img {
    border: 0;
  }
  .jd {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 100px auto;
    background-color: grey;
  }
  span {
    position: absolute;
    top: -60px;
    left: 50%;
    margin-left: -50px;
    border: 50px solid #fff; /* transparent 为透明色 */
    border-bottom-color: red;
  }
</style>

<body>
  <div class="jd">
    <span></span>
  </div>
</body>
```

![1571218082174](/assets/htmlcssAssets.assets/1571218082174.png)![1571218533438](/assets/htmlcssAssets.assets/1571218533438.png)

### 4，鼠标样式

![1571228433367](/assets/htmlcssAssets.assets/1571228433367.png)

### 5，输入框轮廓线

- `outline: none`

```html
<input type="text" style="outline: none" />
```

![1571228695260](/assets/htmlcssAssets.assets/1571228695260.png)

### 6，文本域禁止拖大

- `resize: none`

```html
<textarea name="" id="" cols="30" rows="10" style="resize: none"></textarea>
```

![1571228714550](/assets/htmlcssAssets.assets/1571228714550.png)

### 7，vertival-align 垂直对齐

- #### `vertical-align`

  ***

  ##### 语法

  **vertical-align** **:** **baseline** | **top** | **middle** | **bottom**

  ##### 参数

  **baseline :** 　将支持 valign 特性的对象的内容与基线对齐

  **top :** 　将支持 valign 特性的对象的内容与对象顶端对齐

  **middle :** 　将支持 valign 特性的对象的内容与对象中部对齐

  **bottom :** 　将支持 valign 特性的对象的文本与对象底端对齐

  #### 说明

  基线对齐是存在于**行内**和**行内块**元素之间的问题

  ![1571234802245](/assets/htmlcssAssets.assets/1571234802245.png)

  ##### 示例

  1. 图片默认对齐方式是基线对齐方式

     ![1571229705960](/assets/htmlcssAssets.assets/1571229705960.png)

     把图片的对齐方式修改成另外三个方式的任何一个

     ```html
     <style>
       img {
         vertical-align: middle;
         /* vertical-align: top; */
       }
     </style>

     <body>
       <img src="images/哈士奇.jpg" alt="" /> 我是一只二哈
     </body>
     ```

     ![1571234701940](/assets/htmlcssAssets.assets/1571234701940.png)

  2. 文本框默认和文字也是基线对齐的

     ![1571234974977](/assets/htmlcssAssets.assets/1571234974977.png)把文本域的
     对齐方式修改成另外三个方式的任何一个

  ```html
  textarea { vertical-align: bottom; }
  <body>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      style="resize: none;"
    ></textarea>
    我是一只二哈
  </body>
  ```

### 8，图片底部有空白

行内元素和行内块元素默认对齐方式是基线对齐，所以才会有小空白

1. `vertail-algin` 中另外的的三个都能解决这个问题
2. 把图片转换成 `display: block;` ，因为这种情况只存在于**行内和行内块元素**

![1571235324058](/assets/htmlcssAssets.assets/1571235324058.png)

### 9，溢出文字省略号

1. 单行文本溢出省略号

   ```css
   div {
       /* 如果盒子一行文字显示不开，换行 */
       /* white-space: normal; */
   ------------------------------------------------------
       /* 1. 如果盒子一行文字显示不开，不换行，直接溢出盒子 */
       white-space: nowrap;
       /* 2. 超出的部分隐藏 */
       overflow: hidden;
       /* 3. 溢出的内容用省略号代替 */
       text-overflow: ellipsis;
   }
   ```

2. 多行文本溢出省略号

   > 多行文本溢出，有较大的的兼容性问题，适用于 webkit 和移动端，**推荐让后台人
   > 员来做这个**

   ```css
   div {
     width: 100px;
     height: 65px;
     border: 2px solid red;
     overflow: hidden;
     text-overflow: ellipsis;
     /* 弹性盒模型显示 */
     display: -webkit-box;
     /* 第几行省略号 */
     -webkit-line-clamp: 3;
     /* 设置或检索弹性盒对象的子元素排序方式 */
     -webkit-box-orient: vertical;
   }
   ```

### 10，常用的布局技巧

#### 1，margin 负值的运用

- [x] 两个盒子都有边框线，如果他们相连就变成了了两条边框线，我们想让两条边框线重
      叠

  ![1571243859107](/assets/htmlcssAssets.assets/1571243859107.png)

  ```css
  /* 用 margin 负值，让后面的盒子往前面的盒子移几像素，让他们的线重合到一起 */
  ul li {
    float: left;
    width: 200px;
    height: 350px;
    border: 2px solid #000;
    margin-left: -2px;
    background-color: red;
  }

  /* 由于经过时要变颜色，但是有条边框会被盖在下面，又因为li要做相对定位的父盒子，所以我们来提高层级 */
  ul li {
    position: relative;
    float: left;
    width: 200px;
    height: 350px;
    border: 2px solid #000;
    margin-left: -2px;
    background-color: red;
  }

  ul li:hover {
    border: 2px solid greenyellow;
    z-index: 1;
  }
  ...
    <ul
    > <li
    > 1</li
    > <li
    > 2</li
    > <li
    > 3</li
    > <li
    > 4</li
    > <li
    > 5</li
    > </ul
    >;
  ```

  ![5](/assets/htmlcssAssets.assets/5.gif)

#### 2，文字围绕浮动元素

- [x] 巧妙运用浮动图片不会盖住文字的特性，不需要过多的盒子来装文字等

  ```html
  <style>
      a{text-decoration: none;}
      .demo {
          width: 270px;
          height: 120px;
          padding: 20px;
          background-color: orangered;
      }

      .pic {
          float: left;
          width: 120px;
          height: 120px;
          margin-right: 20px;
          background-color: chartreuse;
      }
  </style>
  </head>

  <body>
      <div class="demo">
          <div class="pic"></div>
          <p><a href="">《中国女排》剧组导演陈可辛，携手原中国女排主教练陈忠和</a></p>
      </div>
  </body>
  ```

  ![1571274557541](/assets/htmlcssAssets.assets/1571274557541.png)

#### 3，行内快巧妙运用

- [x] 行内块元素之间有小空白，我们给父盒子一个 `text-algin:center` ，里面所有的
      行内和行内块元素都会在这个盒子里居中

  ```html
  <style>
      *{margin: 0; padding: 0;}
      .demo {
          text-align: center;
          margin-top: 25px;
      }

      .demo a {
          display: inline-block;
          width: 36px;
          height: 36px;
          text-align: center;
          text-decoration: none;
          line-height: 36px;
          background-color: #f7f7f7;
          border: 1px solid #ccc;
      }

      .demo .prev,
      .demo .next {
          width: 85px;
      }

      .demo .elp {
          border: 0;
          background-color: #fff;
      }

      .chapter {
          width: 70px;
          height: 32px;
          outline: none;
          vertical-align: top;
      }

      .btn {
          width: 50px;
          height: 38px;
          vertical-align: top;
      }
  </style>
  </head>

  <body>
      <div class="demo">
          <a href="" class="prev"> <<上一页 </a>
          <a href="">1</a>
          <a href="">2</a>
          <a href="">3</a>
          <a href="">4</a>
          <a href="">5</a>
          <a href="">6</a>
          <a href="">7</a>
          <a href="">8</a>
          <a href="" class="elp">...</a>
          <a href="" class="next"> 下一页>> </a>
          到第
          <input type="text" class="chapter">
          页
          <button class="btn">跳转</button>
      </div>
  </body>
  ```

  ![1571276183614](/assets/htmlcssAssets.assets/1571276183614.png)

#### 4，CSS 三角强化

- [x] 京东商品框框的实现原理

  ![1571276289174](/assets/htmlcssAssets.assets/1571276289174.png)

  ```css
  /* 写法一 */
  div {
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 10px solid blue;
  }
  /* 标准写法 */
  div {
    width: 0;
    height: 0;
    border-color: transparent blue transparent transparent;
    border-style: solid;
    border-width: 22px 8px 0 0;
  }
  ```

  ![1571276552026](/assets/htmlcssAssets.assets/1571276552026.png)

  京东的做法

  ```html
  <style>
      .price {
          width: 160px;
          height: 24px;
          border: 1px solid red;
          line-height: 24px;
          margin: 100px auto;
      }

      .kill {
          position: relative;
          float: left;    /* 左边的浮动，不会压住文字 */
          width: 90px;
          height: 100%;
          margin-right: 5px;
          color: #fff;
          font-weight: 700;
          text-align: center;
          background-color: red;
      }

      .kill i {
          position: absolute;
          right: 0;
          top: 0;
          width: 0;
          height: 0;
          border-color: transparent #fff transparent transparent;
          border-style: solid;
          border-width: 24px 10px 0 0;
      }

      .delete {
          font-size: 13px;
          color: grey;
          text-decoration: line-through;
      }
  </style>
  </head>

  <body>
      <div class="price">
          <span class="kill">
              ￥1650
              <i></i>
          </span>
          <span class="delete">￥5650</span>
      </div>
  </body>
  ```

  ![1571277341249](/assets/htmlcssAssets.assets/1571277341249.png)

### 11，元素初始化

- [x] 京东的元素初始化

  ```css
  <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box; 	/* CSS3盒子模型 */
  }

      em,
      i {
          font-style: normal
  }

      li {
          list-style: none
  }

      img {
          /* 照顾低版本浏览器 */
          border: 0;
          /* 清除图片下方的空白区域 */
          vertical-align: middle
  }

      button {
          /* 按钮划进时，鼠标变成小手 */
          cursor: pointer
  }

      a {
          /* 去除下划线 */
          text-decoration: none
  }

      a:hover {
          color: #c81623
  }

      button,
      input {
          font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif
  }

      body {
          -webkit-font-smoothing: antialiased;
          background-color: #fff;
          font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
          color: #666
  }

      .clearfix:after {
          visibility: hidden;
          clear: both;
          display: block;
          content: ".";
          height: 0
  }

      .clearfix {
          *zoom: 1
  }
  </style>
  ```

#### 复制粘贴

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

em,
i {
  font-style: normal;
}

li {
  list-style: none;
}

img {
  border: 0;
  vertical-align: middle;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
}

.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}
```
