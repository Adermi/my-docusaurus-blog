---
id: svgWcanvas
title: SVG与Canvas
---

# svg 和 canvas

## svg 属性

### opacity

透明度，直接在标签设置。

### fill

闭合图形的填充色

### stroke

线段填充色

### stroke-width

线段粗细

## svg 基本图形

### `<line />` 线段

- x1：起始点 x 坐标
- y1：起始点 y 坐标
- x2：终点 x 坐标
- y2：终点 y 坐标
- stroke: 线段填充颜色
- stroke-width：线段粗细
- stroke-linecap：线段末端样式（round 为圆角）
- stroke-dasharry*：线段虚线列表（打开关闭笔触）*

```html
<line
  x1="15"
  y1="15"
  x2="140"
  y2="135"
  strokeWidth="25"
  stroke="blue"
  strokeLinecap="round"
/>
<line
  x1="15"
  y1="15"
  x2="140"
  y2="135"
  strokeWidth="25"
  stroke="red"
  strokeDasharray="{[10,"
  5,
  2,
  4]}
/>
```

![image.png](/assets/svgWithCanvas.assets/1660814971258-34ba7fea-079a-4a58-9021-7ecd29fd9d12-16668587982643.png)

### `<rect />` 矩形

- x：矩形左上角 x 坐标
- y：矩形左上角 y 坐标
- width：矩形宽度
- height：矩形高度
- fill：矩形填充颜色
- stroke：边框填充颜色
- stroke-width：边框粗细

```html
<rect
  x="10"
  y="10"
  width="100px"
  height="100px"
  fill="#000"
  stroke="gold"
  strokeWidth="10px"
></rect>
```

![image.png](/assets/svgWithCanvas.assets/1660814310127-37c98397-b0d3-4dde-8ac0-9fdf8364325e.png)

### `<circle />` 圆

- cx：圆心 x 坐标
- cy：圆心 y 坐标
- r：圆半径
- fill：圆填充色
- stroke：圆边框填充色
- stroke-width：边框宽度
- stroke-dasharry：边框虚线列表

```html
<circle
  cx="200"
  cy="200"
  r="100"
  fill="gold"
  stroke="black"
  strokeWidth="30"
  strokeDasharray="{[10,"
  5,
  8,
  13]}
/>
```

![image.png](/assets/svgWithCanvas.assets/1660815018771-feba36c4-0e78-4458-b1dc-959068c3e928.png)

### `<ellipse />` 椭圆

- cx：圆心 x 坐标
- cy：圆心 y 坐标
- rx：椭圆最右部到圆心的距离
- ry：椭圆最顶部到圆心的距离
- fill：椭圆填充颜色
- stroke：边框填充色
- stroke：边框宽度
- stroke-dasharry：边框虚线数组

```html
<ellipse
  cx="200"
  cy="200"
  rx="50"
  ry="100"
  fill="gold"
  stroke="#000"
  strokeWidth="30"
  strokeDasharray="3,6"
/>
```

![image.png](/assets/svgWithCanvas.assets/1660815966562-e77d4bd8-8163-44be-b180-04b89dcdf200.png)

### `<path />` 路径

把路径理解成你手中的一支画笔画出来的轨迹

- M x y / m dx dy：把画笔移动到(绝对坐标 x,y) / (相对坐标 dx, dy)
- L x y / l dx dy：用画笔画，线性移动笔到(绝对坐标 x,y) / (相对坐标 dx, dy)
- Z/z：闭合路径(不区分大小写)

```html
<path d="M 100 100 L 200 200 100 200" stroke="black" fill="none"></path>
<path d="M 100 100 L 200 200 100 200 z" stroke="black" fill="none"></path>
<path d="M 100 100 L 200 200 100 200 z" stroke="black"></path>
<path
  fill="orange"
  d="M 10,215 210,215 110, 42 z M 10,100 210,100 110,273 z"
  stroke="purple"
  strokeWidth="3"
/>
```

![image.png](/assets/svgWithCanvas.assets/1660817449620-0ce58582-7c1b-44bc-99e2-f769f2e2b0fe.png)

![image.png](/assets/svgWithCanvas.assets/1660817474531-c2827c0a-dcdb-4e58-bcff-0a30d152cfed.png)

![image.png](/assets/svgWithCanvas.assets/1660817663308-bea6e5ee-e882-4f6d-aae1-dd0569070342.png)

![image.png](/assets/svgWithCanvas.assets/1660822652947-6a5c16f2-ae28-4e52-b78a-b866131e70f5.png)

- Q x y / q dx dy：绘制贝塞尔曲线

```html
<path
  d="M 100 100 L 200 400 300 100"
  fill="none"
  stroke="red"
  strokeWidth="4px"
/>
<path
  d="M 100 100 Q 200 400 300 100"
  fill="none"
  stroke="blue"
  strokeWidth="4px"
/>
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/10375417/1660823513333-76434eb6-de6b-4f88-89b6-d3ba80b8168c.png)贝
塞尔曲线只有两个点和红色的线段相切。

- C x y / c dx dy：绘制三次贝塞尔曲线

```html
<path
  stroke="black"
  strokeWidth="3"
  fill="#eec1c2"
  d="M 99 192
	C 137 160 204 133 141 124
	C 78 115 34 167 47 129
	C 60 91 20 65 77 71
	C 134 77 206 43 196 101
	C 186 159 118 368 119 299
	C 120 230 201 169 138 206
	C 75 243 53 231 99 192"
/>
```

![image.png](/assets/svgWithCanvas.assets/1660823710214-d02c5726-e43c-4978-938f-27e7dfe16213.png)

- A：rx ry，XAR，large-arc-flag sweep-flag，x y
  - rx：椭圆最右部到圆心的距离
  - ry：椭圆最顶部到圆心的距离
  - XAR：椭圆沿 X 轴旋转度数
  - arge-arc-flag：特定椭圆（两个可能的）由大弧标志指定。（0 或 1）
  - sweep-flag：椭圆的特定段由扫描标志指定。（0 或 1）
  - x：圆弧终点 x 值
  - y：圆弧终点 y 值

```html
<path
  d="M100 100 A 50,50 180 0,0 200,150 z"
  fill="#080"
  stroke="#8f8"
  strokeWidth="5"
  opacity="0.5"
/>
```

### `<image />` 图像

在矢量图中访问位图

- x：左上角的点 x 坐标
- y：左上角的点 y 坐标
- xlink:href：图片的地址，类似 html 标签中的 href 属性
- width：图片宽度
- height：图片高度
- preserveAspectRatio：图形缩放比例

```html
<image
  xlink:href="./下载.jpeg"
  x="0"
  y="0"
  width="300"
  height="300"
  preserveAspectRatio="meet"
></image>
```

![image.png](/assets/svgWithCanvas.assets/1660988422278-0bf461f8-c005-4055-8e1c-b0c6f6d1e317.png)
<text /> 文本可以操作文本干更多的事

- x：文本框起始位置 x 坐标
- y：文本框起始位置 y 坐标
- font-size：字体大小
- fill：文本填充色
- stroke：边框填充色
- stroke-width：边框宽度

绘制有边框的文字

```html
<svg width="100%" height="100%" viewBox="0 0 1000 300">
  <text
    x="0"
    y="100"
    font-size="80px"
    fill="gold"
    stroke="black"
    stroke-width="3"
  >
    我是有边框的文字
  </text>
</svg>
```

![image.png](/assets/svgWithCanvas.assets/1661015914555-b6f1c075-4bc4-4fe3-817c-a3d2b3f9d45e.png)
绘制贝塞尔曲线的文字

```html
<defs>
  <path
    id="MyPath"
    d="M 100 200
		C 200 100 300   0 400 100
		C 500 200 600 300 700 200
		C 800 100 900 100 900 100"
  />
</defs>

<use xlink:href="#MyPath" fill="none" stroke="red" />

<text font-family="Verdana" font-size="42.5">
  <textPath xlink:href="#MyPath">
    We go up, then we go down, then up again
  </textPath>
</text>
```

![image.png](/assets/svgWithCanvas.assets/1661015688668-b5a8219b-5291-4896-b49d-8368701415cb.png)

## svg 操作

### translate 平移

- transform=translate(dx,dy)：dx 为 x 轴平移量，dy 为 y 轴平移量，正左负右
  。`可以只写一个值代表x轴`

```html
<rect
  x="10"
  y="10"
  width="100px"
  height="100px"
  fill="gold"
  stroke="black"
  stroke-width="2px"
></rect>
<path d="M 50 0 L 0 100 100 100 Z" transform="translate(10,10)"></path>
```

![image.png](/assets/svgWithCanvas.assets/1661017180270-0bccbea4-f05f-448a-9fde-8ef7b2e28c4d.png)

### rotate 旋转

- transform=rotate( r , cx, cy)：r 为顺时针旋转度数，cx 为旋转中心 x 坐标，cy 为
  旋转中心 y 坐标。

```html
<rect
  x="10"
  y="10"
  width="100px"
  height="100px"
  fill="gold"
  stroke="black"
  stroke-width="2px"
></rect>
<path d="M 60 10 L 10 110 110 110 Z" transform="rotate(90,60,60)"></path>
```

![image.png](/assets/svgWithCanvas.assets/1661017459437-9c9f20de-1ce0-4860-b658-a99bc9a17042.png)

### scale 缩放

- transform=scale(rate)：操作所有（x，y）乘以缩放系数 rate
- transform=scale(rateX, tateY)：操纵水平方向缩放比例，操纵垂直方向缩放比例

```html
<rect x="50" y="50" width="50" height="50" fill="black"></rect>
<rect
  x="50"
  y="50"
  width="50"
  height="50"
  fill="gold"
  transform="scale(2)"
></rect>

<rect x="50" y="50" width="50" height="50" fill="black"></rect>
<rect
  x="50"
  y="50"
  width="50"
  height="50"
  fill="gold"
  transform="scale(2,1)"
></rect>

<rect x="50" y="50" width="50" height="50" fill="black"></rect>
<rect
  x="50"
  y="50"
  width="50"
  height="50"
  fill="gold"
  transform="scale(1,2)"
></rect>
```

<img
src="/assets/svgWithCanvas.assets/1661086743038-e0267a04-542d-4fb3-8213-d89df70174cf.png"
style={{zoom:"67%"}} />

![](/assets/svgWithCanvas.assets/1661086917026-046b855c-2d74-4374-9d76-a11fceb8d88f.png)

![image.png](/assets/svgWithCanvas.assets/1661086970643-4c72988c-8579-4210-a8d1-5da623f35748.png)

### 多重转换

> 注意：多重变化时，在 transform 中的操作时从右到左的~

```html
<ellipse cx="200" cy="200" rx="30" ry="50" fill="rgba(0,0,0,0.6)"></ellipse>
<ellipse
  cx="200"
  cy="200"
  rx="30"
  ry="50"
  fill="rgba(0,0,0,0.6)"
  transform="translate(-100,-100) scale(1.5)"
></ellipse>
```

![image.png](/assets/svgWithCanvas.assets/1662702728402-61f71736-d053-4fc2-8628-13299d96e134.png)

`transform="translate(-100,-100) scale(1.5)"` 这个组合变化操作，从右往左执行。首
先 `scale(1.5)` 对所坐标进行放大： (200, 200) × 1.5 得到 (300, 300)，然后
`translate(-100,-100)` 移动坐标：(300, 300) - (100, 100) 得到 (200, 200) 回到放
大前的位置。

### `<g />`分组

`<g></g>`：分组标签内的元素能够共享属性。

```html
<svg viewBox="0 0 1024 1024">
  <g transform="scale(0.3)" fill="red">
    <rect x="20" y="130" width="100" height="20" fill="inherit" />
    <ellipse cx="70" cy="140" rx="30" ry="100" fill="#777" />
    <rect x="20" y="100" width="100" height="20" fill="inherit" />
    <rect x="20" y="160" width="100" height="20" fill="inherit" />
  </g>
  <g transform="translate(50) scale(0.3)" fill="blue">
    <rect x="20" y="130" width="100" height="20" fill="inherit" />
    <ellipse cx="70" cy="140" rx="30" ry="100" fill="#777" />
    <rect x="20" y="100" width="100" height="20" fill="inherit" />
    <rect x="20" y="160" width="100" height="20" fill="inherit" />
  </g>
</svg>
```

![image.png](/assets/svgWithCanvas.assets/1662703605123-f8a34d0a-de2e-4a7b-937a-d0d01f6c8fcc.png)

### `<use />` 重用代码

可以把它理解成函数封装调用一样

```html
<g stroke="red" stroke-width="2" fill="none">
  <ellipse id="g1" cx="100" cy="100" rx="75" ry="40" />
  <use xlinkHref="#g1" transform="rotate(30 100 100)" />
  <use xlinkHref="#g1" transform="rotate(60 100 100)" />
</g>
```

![image.png](/assets/svgWithCanvas.assets/1662704551924-efd8f675-d87f-499a-a306-01b72e0792ad.png)

```html
<svg viewBox="0 0 1024 1024">
  <g stroke="red">
    <g id="g3">
      <g stroke="inherit" stroke-width="2" fill="none" id="g2">
        <ellipse id="g1" cx="100" cy="100" rx="75" ry="40" />
        <use xlinkHref="#g1" transform="rotate(30 100 100)" />
        <use xlinkHref="#g1" transform="rotate(60 100 100)" />
      </g>
      <use xlinkHref="#g2" transform="rotate(90 100 100)"></use>
    </g>
  </g>
  <use xlinkHref="#g3" stroke="blue" transform="translate(100)"></use>
  <use xlinkHref="#g3" stroke="green" transform="translate(0 ,100)"></use>
  <use xlinkHref="#g3" stroke="black" transform="translate(100,100)"></use>
</svg>
```

![image.png](/assets/svgWithCanvas.assets/1662705046694-5fcdcbae-b614-4c52-9fbd-767f28cb8d8f.png)
