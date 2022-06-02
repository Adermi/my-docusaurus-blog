---
id: flexbox
title: Flex布局
---

# FlexBox

## 基本术语

- **父元素**：`flex container`，每一个 `display:flex` 的盒子

- **子元素**：`flex items`，每一个 `flex` 盒子内的子元素

- **flex布局**：

  `flext items` 按照 `flex container` 的主轴排列元素，横竖都可以作为主轴，和主轴垂直的轴称为交叉轴，主轴由 `flex container` 的 `flex-direction` 决定

- **主轴**：元素排列的轴

- **main start | main end**：元素开始摆放的位置 | 元素结束摆放的位置
- **主尺寸**：`flex container`的宽度或高度，由于主轴方向决定
- **交叉轴**：垂直于主轴的轴称为交叉轴

## 父级属性

### display

定义一个块级**flex**盒子，为所有子级启用弹性上下文

```css
.container {
  display: flex; /* 或 inline-flex: 定义一个行内flex,不独占一行 */
}
```

### flex-direction

定义主轴方向，元素按照主轴方向排列，默认主轴为行

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![image-20220514233122278](flextbox+grid.assets/image-20220514233122278.png)

<img src={require('./flextbox+grid.assets/image-20220514233038330.png').default} alt="Example banner" />

### flex-wrap

> [视觉演示`flex-wrap`](https://css-tricks.com/almanac/properties/f/flex-wrap/)

主轴方向上的元素是否换行；默认不换行：即父盒子宽度不够，强行缩小子项宽度，即便是已定义宽度的子项。

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

<img src={require('./flextbox+grid.assets/1.gif').default} alt="Example banner" />

### flex-flow（简写）

`flex-direction + flex-wrap`简写

```css
.container {
  flex-flow: column wrap;	/* flex-direction: column; flex-wrap:wrap; */
}
```

### justify-content

主轴对其方式，把他想象成 `text-align` ；

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

![image-20220514235728765](flextbox+grid.assets/image-20220514235728765.png)

- flex-start：如图所示。
- flex-end：如图所示。
- center：如图所示。
- space-between：如图所示。
- space-around：每个子项左右都有距离。
- space-evenly：任何两个子项之间的距离都相等。+

### align-items

可以视为 `justify-content` 在纵轴上的版本；表示子项在交叉轴上的对其方式

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline;
}
```

- `stretch`（默认）：拉伸子项填充容器（尊重原本的子项宽度|高度）
- `flex-start`：交叉轴开始处
- `flex-end`：交叉轴末尾处
- `center`：交叉轴中间处
- `baseline`：子项按照基线对齐

![image-20220515105326824](flextbox+grid.assets/image-20220515105326824.png)

###  align-content

> 和`align-items`的区别是这个属性是控制多行，别记混淆了！！

可以视为 `justify-content` 在纵轴上控制**多行内容**的版本；表示多行子项在交叉轴上的排列方式（该属性只对多行有效，请将`flex-wrap`设置为`wrap`或`wrap-reverse`）。

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
```

<img src={require('./flextbox+grid.assets/image-20220515110750517.png').default} alt="Example banner" />



### gap

用于控制子项之间的距离，类似于 `space-between`。若没有换行，会强制缩小子项的宽度。

```css
.container {
  gap: 10px;
  gap: 10px 20px; /* row-gap column gap */
  row-gap: 10px;
  column-gap: 20px;
}
```

- gap：两个方向， `row-gap` 和 `column gap`。
- row-gap：行与行之间的距离。
- column-gap：列与列之间的距离。

<img src={require('./flextbox+grid.assets/image-20220515123432032.png').default} alt="Example banner"/>

## 子项属性

### order

控制子项的位置；子项默认按照`html`中的位置排列，order属性可以控制出现的顺序。

注意：只有`order`这个属性的元素才会按照顺序排列，不影响其他没有`order`的子项排列

```css
.item {
  order: 5; /* default is 0 */
}
```

![image-20220515124044258](flextbox+grid.assets/image-20220515124044258.png)

### flex-grow

使得子项具有增长能力，吞并盒子内可用区域；

```css
.item {
  flex-grow: 4; /* 默认值为 0，也就是不增长 */
}
```

![image-20220515125312443](flextbox+grid.assets/image-20220515125312443.png)

- 如果所有的子项都设置`flex-grow`为1，则容器内可用空间将会被均匀分配。
- 如果有一个子项被设置为`flex-grow:2`，那么这个子项被分配到的空间为其他子项的两倍。

### flex-shrink

用于控制子项收缩的比例；

```css
.item {
  flex-shrink: 3; /* default 1 */
}
```

子项被收缩时，所收缩的比例（比如一行子项不换行，总宽度超过父元素的宽度，会强制收缩每个子项的宽度）

![image-20220515130500401](flextbox+grid.assets/image-20220515130500401.png)

上面每个子项的`width`固定为`80px`，但是父盒子宽度不够且不换行，导致子项被强制收缩，每个子项都默认收缩了相同的宽度，因为每个子项的 `flex-shrink` 都为1。

![image-20220515131430278](flextbox+grid.assets/image-20220515131430278.png)

第1个和第5个子项都给了较大的收缩值，可以看到1和5比其他的子项都收缩了较大的比例。

### flex-basis

表示父项在分配可用空间之前子项的默认大小；

```css
.item {
  flex-basis: 1 | 20px | 20% | auto; /* default auto */
}
```

![image-20220515135731007](flextbox+grid.assets/image-20220515135731007.png)

### flex（简写）

表示 `flex-grow + flex-shrink + flex-basis`的集合写法；

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

- `flex-shrink` 和 `flex-basis` 可以省略；默认的`flex`值为 `0 1 auto`

- 若给只给`flex`属性一个数值，例如`flex: 2`，

  则代表 `flex: 1 1 0%` -> `flex-grow: 5; flex-shrink: 1; flex-basis: 0%;`