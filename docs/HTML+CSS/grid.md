---
id: grid
title: Grid布局
---

# Grid

不同于以往使用定位浮动等布局模式，网格系统是一个专门解决布局问题的 CSS 模块。

## 基本术言

### 网格容器

设置了`display:grid` 的元素称为网格容器

```css
<div class="container">	/* 网格容器 */
  <div class="item item-1"> </div>
  <div class="item item-2"> </div>
  <div class="item item-3"> </div>
</div>
```

### 网格子项

网格容器的子代（非后代），顶级子代元素

```css
<div class="container">
  <div class="item"> </div>	/* 网格子项,子代 */
  <div class="item">
    <p class="sub-item"> </p>	/* 非网格子项,为后代元素 */
  </div>
  <div class="item"> </div>
</div>
```

### 网格线

构成网格的分割线

<img src={require('./flextbox+grid.assets/image-20220515200811459.png').default} alt="Example banner" style={{ style:"67%" }}/>

### 网格单元

两个相邻行和两个相邻列网格线之间的空间

<img src={require('./flextbox+grid.assets/image-20220515200841685.png').default} alt="Example banner" style={{ style:"67%" }}/>


### 网格轨道

可以将他们视为行或者列

<img src={require('./flextbox+grid.assets/image-20220515200934266.png').default} alt="Example banner" style={{ style:"67%" }}/>


### 网格区域

由任意个网格单元组成的区域

<img src={require('./flextbox+grid.assets/image-20220515201029524.png').default} alt="Example banner" style={{ style:"67%" }}/>


## 父级属性

### display

定义一个块级网格容器

```css
.container {
  display: grid | inline-grid; /* 或者定义一个行内网格容器 */
}
```

### grid-template-columns/rows

定义网格每一列列宽。定义网格每一行行高。

```css
/* 定义列 */
.container {
    grid-template-columns: 100px 100px 100px;		/* 3列每列100px */
    grid-template-columns: 33.33% 33.33% 33.33%;	/* 3列每列33.33% */
    grid-template-columns: 3fr 3fr 3fr;	/* 3列平分宽度,fr是网格特有宽度 */
    grid-template-columns: repeat(3, 3fr)	/* 等于3fr 3fr 3fr，此函数可以进行重复性的工作 */
    grid-template-columns: 1fr 30px 1fr;	/* 中间30px,两边平分剩余宽度 */
    grid-template-columns: repeat(auto-fill, 100px);		/* 尽可能多的容纳元素,直到父元素宽度不够 */
    grid-template-columns: 1fr 1fr minmax(100px, 200px);	/* 第三列最小宽为100，最大宽为200 */
}
/* 定义行 */
.container {
    grid-template-columns: 100px 100px 100px;		/* 3行每行100px */
    grid-template-columns: 33.33% 33.33% 33.33%;	/* 3行每行33.33% */
    grid-template-columns: 3fr 3fr 3fr;	/* 3行平分宽度,fr是网格特有宽度 */
    grid-template-columns: repeat(3, 3fr)	/* 等于3fr 3fr 3fr，此函数可以进行重复性的工作 */
        grid-template-columns: 1fr 30px 1fr;	/* 中间30px,两边平分剩余高度 */
}
/* 定义网格线名称，若没定义，系统自动编号 */
.container {
    grid-template-columns: [columnOne] 100px [columnTwo] 100px [columnThree] 100px [columnFour];
    grid-template-rows: [rowOne] 100px [rowTwo] 100px [rowThree] 100px [rowFour];
}
```

![image-20220516104603069](flextbox+grid.assets/image-20220516104603069.png)

<img src={require('./flextbox+grid.assets/image-20220517095819200.png').default} alt="Example banner" style={{ style:"80%" }}/>


- `px`：像素空间
- `%`：按比例分配元素空间
- `fr`：按比例分配元素空间
- `repeat`：可以重复性工作
- `minmax函数`：能拉伸的最大值和缩小的最小值
- `auto`：由浏览器自己决定宽度

### grid-template-areas

网格区域由一个一个网格组成，使用该属性能定义网格区域

```css
.container {
  grid-template-areas:
    "<grid-area-name> | . | none | ..."
    "...";
}
```

- `<grid-area-name>` – 使用指定的网格区域的名称 [`grid-area`](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-area)
- `.` – 一个句点表示一个空的网格单元
- `none` – 没有定义网格区域

定义网页布局案例：

- 首先定义一个 3 x 3 的网格:

  ```css
  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas:
      "a b c" /* 给网格区域命名 */
      "d e f"
      "g h i";
  }
  ```

  ![image-20220516155040388](flextbox+grid.assets/image-20220516155040388.png)

- 现在就有了 9 个网格单元，把这 9 个单元划分成下面的网格区域：

  ```css
  .container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas:
      "Header Header Header"
      "Nav Main Sidebar"
      "Nav Footer Footer";
  }
  ```

  ![image-20220516154618310](flextbox+grid.assets/image-20220516154618310.png)

### grid-gap

`grid-row-gap`属性设置行与行的间隔

`grid-column-gap`属性设置列与列的间隔

`grid-gap`属性是`grid-row-gap`和`grid-column-gap`的合并写法

```css
.container {
  row-gap: 10px;
  column-gap: 10px;
  gap: 20px; /* row,column */
  gap: 20px 20px; /* row,column */
}
```

### grid-auto-flow

如果网格子项没有明确放在哪个位置，网格的自动放置算法会控制子项在网格中排放的位置。

```css
.container {
  grid-auto-flow: row | column | row dense | column dense;
}
```

- `row` ：告诉放置算法子项**依次**填充每一行，根据需要添加新行
- `column`：子项**依次**放置每一列，根据需要添加新列
- `dense`：如果前面的网格出现空余网格单元，则把后续较小的子项向前填充。[案例](https://jsbin.com/wapejok/edit?css,output)

![image-20220516162614809](flextbox+grid.assets/image-20220516162614809.png)

### grid-auto-columns/rows

超出网格的子项的高度和宽度不受`grid-template-columns/rows`控制，需要用 `grid-auto-rows / grid-auto-columns` 才能控制。

```css
.container {
  display: grid;
  grid-template-rows: repeat(2, 120px);
  grid-template-columns: repeat(2, 100px);
  gap: 20px;
  grid-auto-rows: 50px;
  grid-auto-columns: 50px;
}
```

现在我们有一个 2 x 2 的网格：

![image-20220516151418134](flextbox+grid.assets/image-20220516151418134.png)![image-20220516152001162](flextbox+grid.assets/image-20220516152001162.png)

若现在有一个子项，其位置为 `grid-row: 3 / 4`，`grid-columns: 3 / 4`

这个时候网格容器就不得不开辟新的网格，并且新的网格宽度和高度都不确定会自适应：

![image-20220516151530184](flextbox+grid.assets/image-20220516151530184.png)

![image-20220516151934009](flextbox+grid.assets/image-20220516151934009.png)

- `item3`是因为`grid`网格默认一行一行填满网格，因为`item10` 位于网格外，`2 x 2` 的网格不得不重新开辟成 `3 x 3`的网格，会多出一行一列。
- `item10`的宽度跟随新开辟的列的宽度，高度自适应。

这时候使用 `grid-auto-columns/rows` 来控制溢出网格的列和行的宽高：

```css
.container {
  grid-auto-rows: 30px;
  grid-auto-columns: 30px;
}
```

![image-20220516152932031](flextbox+grid.assets/image-20220516152932031.png)![image-20220516153106334](flextbox+grid.assets/image-20220516153106334.png)

### justify-items

子项在网格单元中的水平位置 。

```css
.container {
  justify-items: start | end | center | stretch;
}
```

- `stretch`：**默认值**，拉正子项的宽度为网格单元的宽度（align-items 默认拉子项高度）
- `start`：元素位于网格单元开始处
- `center`：元素位于网格单元中心
- `end`：元素位于网格单元结束处

![image-20220516195511147](flextbox+grid.assets/image-20220516195511147.png)

### align-items

子项在网格单元中的垂直位置。

```css
.container {
  align-items: start | end | center | stretch | baseline;
}
```

- **`stretch`** - **默认值**，拉伸子项的高度填满其所在的网格单元
- **`start`** - 与网格单元的开始位置对其
- **`end`** - 与网格单元的结束位置对其
- **`center`** - 与网格单元的中心位置对其
- **`baseline`**[-沿文本基线](https://codepen.io/chriscoyier/pen/NWvvPRj)对齐

![image-20220516200556880](flextbox+grid.assets/image-20220516200556880.png)

### place-items（简写）

上面两个值的简写

```css
.center {
  display: grid;
  place-items: center; /* align-items:center  justify-items:center */
}
```

### justify-content

网格单元在`container`容器里的水平位置

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between
    | space-evenly;
}
```

- `start` - 网格位于开始位置
- `end` - 网格位于结束位置
- `center` - 网格位于中间位置
- `stretch` - 网格子项没有指定大小时，拉伸填充整个网格容器
- `space-around` - 每一列子项都有空格
- `space-between` - 每两列子项之间有空格
- `space-evenly` - 每列网格的左右空格相等

![image-20220516211528950](flextbox+grid.assets/image-20220516211528950.png)

### align-content

网格单元在`container`容器里的垂直位置

```css
.container {
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;
}
```

- `stretch` - 网格子项没有指定大小时，拉伸高度填充整个网格容器。

![image-20220516213010125](flextbox+grid.assets/image-20220516213010125.png)

### place-content（简写）

此属性是`align-content` + `justify-content`的简写

```css
.center {
  display: grid;
  place-content: space-between; /* align-content:space-between  justify-content:space-between */
}
```

<img src={require('./flextbox+grid.assets/image-20220516213658363.png').default} alt="Example banner" style={{ style:"50%" }}/>



### grid-template/grid（简写）

> 详情请看这：https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

非常不喜欢简写的方式，可读性差，不易修改，这里不再赘述。

## 子项属性

### grid-column-start/end

通过参考线的位置确定子项在网格中的位置

```css
.item {
  /* 子项起始列位置 */
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  /* 子项列结束位置 */
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;
  /* 子项行开始位置 */
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  /* 子项行结束位置 */
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
```

- `number` - 网格线编号，创建网格时若未给网格线命名，则浏览器将自动编号。
- `name` - 网格线名称，创建网格时给网格线的命名，有用户定义。
- `span <number>` - 跨越**number**个网格 。
- `span <name>` - 把网格跨越到网格名为**name**处。
- `auto` - 自适应放置。

例子：

```css
.item {
  grid-column-start: 1; /* 从第一条网格线开始 */
  grid-column-end: span 2; /* 跨越2个网格单元 */
}
/* 上面的写法相当于 */
.item {
  grid-column-start: 1; /* 从第一条网格线开始 */
  grid-column-end: 3; /* 结束位置为第三条网格线 */
}
```

![image-20220517100114132](flextbox+grid.assets/image-20220517100114132.png)

```css
.item {
  grid-column-start: columnTwo; /* 从名叫columnTwo的网格线开始 */
  grid-column-end: span 2; /* 跨越两个网格单元 */
}
/* 上面的代码等价于 */
.item:first-child {
  grid-column-start: 2; /* 从第2条网格线开始 */
  grid-column-end: span columnFour; /* 跨越直到名称为columnFour的网格线处 */
}
```

<img src={require('./flextbox+grid.assets/image-20220517100521425.png').default} alt="Example banner" style={{ style:"80%" }}/>


### grid-row-start/end（简写）

通过参考线的位置确定子项在网格中的位置，和上面一个属性的用法相似。

例子：

```css
.item:first-child {
  grid-row-start: 1; /* 从第一行网格线开始 */
  grid-row-end: span 2; /* 跨越2行 */
}
/* 上面的代码等价于 */
.item:first-child {
  grid-row-start: 1; /* 从第1行网格线开始 */
  grid-row-end: 3; /* 到第3行网格线开始 */
}
```

<img src={require('./flextbox+grid.assets/image-20220517103112850.png').default} alt="Example banner" style={{ style:"67%" }}/>


```css
.item {
  grid-column-start: rowOne; /* 从名叫columnTwo的网格线开始 */
  grid-column-end: span 3; /* 跨越两个网格单元 */
}
/* 上面的代码等价于 */
.item:first-child {
  grid-column-start: 1; /* 从第2条网格线开始 */
  grid-column-end: 4; /* 跨越直到名称为columnFour的网格线处 */
}
```

### grid-column/row（简写）

`grid-column` 是 `grid-column-start/end` 的简写

`grid-row` 是 `grid-column/row` 的简写

```css
.item {
  grid-column: grid-column-start / grid-column-end;
  grid-row: grid-row-start / grid-row-start;
}
```

例子：

```css
/* 图一 */
.item:first-child {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
/* 图二 */
.item:first-child {
  grid-column: columnTwo / span 2;
  grid-row: rowTwo / span 2;
}
```

<img src={require('./flextbox+grid.assets/image-20220517113045721.png').default} alt="Example banner" style={{ style:"80%" }}/>
<img src={require('./flextbox+grid.assets/image-20220517113050695.png').default} alt="Example banner" style={{ style:"80%" }}/>


### grid-area

可以直接分配该子项到已命名的网格区域，可以视为 4 个属性的简写（`grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end`）

```css
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

- `name` - 网格区域名称
- 剩下四个属性：数字或行名

例子：

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main rightbar"
    "footer footer footer";
}

.item1 {
  /* 数字为1的网格 */
  grid-area: header;
}
```

![image-20220517115445234](flextbox+grid.assets/image-20220517115445234.png)

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main rightbar"
    "footer footer footer";
}

.item1 {
  /* 数字为1的网格 */
  grid-area: 2 / 2 / span 1 / span 2;
}
```

![image-20220517115752933](flextbox+grid.assets/image-20220517115752933.png)

### justify-self

适用于单个子项在网格单元内的水平排列。

```css
.item {
  justify-self: start | end | center | stretch;
}
```

- `stretch` - 默认值，没有默认宽度时拉伸填满整个单元格

<img src={require('./flextbox+grid.assets/image-20220517120853174.png').default} alt="Example banner" style={{ style:"80%" }}/>


### align-self

适用于单个子项在网格单元内的垂直排列。

```css
.item {
  align-self: start | end | center | stretch;
}
```

- `stretch` - 默认值，没有默认高度时拉伸填满整个单元格

<img src={require('./flextbox+grid.assets/image-20220517120700188.png').default} alt="Example banner" style={{ style:"80%" }}/>


### place-self（简写）

该属性是**`<align-self>` / `<justify-self>`** 的简写

```css
.item-a {
  place-self: center; /* align-self:center justify-self:center */
}
```

## 特殊单位

### fr

本质是指使用剩余空间，占据一定比例的空间。

```css
.container {
  grid-template-columns: 1fr 3fr; /* 等价于 25% 75% */
}
```

也可以和其他值结合起来使用：

```css
.container {
  grid-template-columns: 50px min-content 1fr;
}
```

### minmax

他设置了宽度能到达的最大值和最小值

```css
.container {
  grid-template-columns: minmax(100px, 1fr) 3fr;
}
```

### repeat

可以省略一些重复性的功能

```css
.container {
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
	/* 上面的写法等价于 */
	grid-template-columns: repeat(6, 1fr)
    /* 可以和minmax函数以及其他关键字结合使用 */
	grid-template-columns: repeat(6, minmax(10px, 1fr))
}
```

#### auto-fill

在一行中尽可能加入有宽度的列来填充空白空间，[两者区别](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)

```css
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
}

.grid > div {
  height: 100px;
  background: red;
}
```

<img src={require('./flextbox+grid.assets/image-20220517143740824.png').default} alt="Example banner" style={{ style:"67%" }}/>


#### auto-fit

在一行中尽可能拉伸列的宽度填充空白空间，[两者区别](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)

```css
.grid2 {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.grid2 > div {
  height: 100px;
  background-color: antiquewhite;
}
```

<img src={require('./flextbox+grid.assets/image-20220517143840374.png').default} alt="Example banner" style={{ style:"67%" }}/>


#### 非媒体查询实现响应网格

> 它包含了所有 CSS Grid 中最著名的代码片段，也是有史以来最[伟大的 CSS 技巧](https://css-tricks.com/books/greatest-css-tricks/flexible-grids/)之一

```css
grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
```

![](flextbox+grid.assets/10.gif)
