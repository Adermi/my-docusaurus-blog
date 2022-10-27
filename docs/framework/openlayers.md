---
id: openlayers
title: openlayers.js
---

## 基础知识

### 投影坐标的概念

地理坐标系：用三维建模构建的一个椭球体，同时将这个椭圆球体进行栅格化并标注位置，
我们平常所用的经纬度就是地理学坐标单位。投影坐标系：用二维模型描述一个球体，实质
上也是对椭圆球体进行栅格处理，但是他会把球体上的坐标展开到一张地图上，对于 3D 来
说 2D 更容易分析和携带。

### EPSG:4326 和 3857 区别

> 在 web 页面上显示的时候以 3857 这个投影来显示，存储数据的时候使用 4326 来存储
> 。 EPSG 是一个代号，在国际上每一个坐标系统都会分配一个 EPSG 代码。

`EPSG:4326（WGS84）`：**世界大地测量系统 1984：WGS84(World Geodetic System
of 1984)**是世界上最流行的地理坐标系统，代号为 EPSG:4326，用来描述地球上的各个位
置坐标；GPS 就是基于 WGS84 的，WGS84 又是基于 GeoJSON 作为坐标系统的单位，也就是
经纬度，所以我们说的经度纬度得到的数据都是基于 EPSG:4326 这个系统的。**缺点是不
适合展示数据，适合存储数据，数据格式是经纬度：[130, 20]**。

`EPSG:3857（Pseudo-Mercator）`：**伪墨卡托投影**，也被称为球体墨卡托投影，代号为
EPSG:3857；该投影不能显示北纬南维 85.06 度以上的地区，但是能把球体(3D)投影成一张
正方形地图(2D)，**2D 地图是非常适合用来展示分析的，但是不适合用来存储数据，数据
格式是：[12914838.35,4814529.9]**。

### 核心组件

Map 类：地图容器，最核心的部件，用于装载图层与各种控件。 Layer 类：地图图层类，
地图数据通过 Layer 图层进行渲染，数据源可以分为：

1. Image：单一图像数据。
2. Tile：瓦片数据，可以联想下站在金字塔顶一层一层往下看，越来越详细。
3. Vector：矢量数据

View 类：地图视图类，用于提供人机交互的控件，如缩放移动旋转等等操作。

### 加载地图两种方式

有两种方式能加载地图：

1. 直接在 map 类的 layers 图层中加载。

```javascript
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const publicKey = 'xxxxx'; // 自行去注册获取：https://www.tianditu.gov.cn/
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      title: '天地矢量图层',
      source: new XYZ({
        url: url, // 地图瓦片层
        attributions: '天地图的属性描述',
        wrapX: false, // 地图是否是无边际的
      }),
    }),
    new TileLayer({
      title: '天地矢量标记图层',
      source: new XYZ({
        url: url2, // 地图标记层
      }),
    }),
  ],
  view: new View({
    center: [0, 0], // 初始地图显示的位置，经纬度
    zoom: 2, // 初始缩放级别
    minZoom: 1, // 最小缩放级别
    maxZoom: 20, // 最大缩放级别
    // rotation: Math.PI / 6,  // 旋转地图
  }),
});
```

2. 使用 addLayer 往 map 容器中调价 layers 图层

```javascript
const map = new Map({
  target: 'map',
  layers: [], // 初始图层为空
  view: new View({
    center: [0, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 20,
    // rotation: Math.PI / 6,  // 旋转地图
  }),
});

let layers1 = new TileLayer({
  title: '天地矢量图层',
  source: new XYZ({
    url: url,
    attributions: '天地图的属性描述',
    wrapX: false, // 地图是否是无边际的
  }),
});

let layers2 = new TileLayer({
  title: '天地矢量标记图层',
  source: new XYZ({
    url: url2,
  }),
});

map.addLayer(layers1); // 通过addLayer添加
map.addLayer(layers2); // 通过addLayer添加
```

显示成功：
![image.png](/assets/openalyers.assets/1666337869080-30e3805a-d174-464a-81b9-6863af07c182.png)

## 加载常用控件

### 1.导航条控件

[ZoomSlider](https://openlayers.org/en/latest/apidoc/module-ol_control_ZoomSlider-ZoomSlider.html)：
用于控制地图的缩放级别控件。
[ZoomToExtent](https://openlayers.org/en/latest/apidoc/module-ol_control_ZoomToExtent-ZoomToExtent.html)：
一个按钮，用于将视口显示到特点的投影区域

```javascript
import { Map, View } from 'ol';
import ZoomSlider from 'ol/control/ZoomSlider';
import ZoomToExtent from 'ol/control/ZoomToExtent';

const map = new Map({
  target: 'map',
  layers: [....],
  view: new View({...}),
});

// 加载地图导航条
const zoomslider = new ZoomSlider();
map.addControl(zoomslider);
let zoomToExtent = new ZoomToExtent({
  extent: [13100022, 4290033, 1320000044, 5210055], // 视口区域设为北京
});
map.addControl(zoomToExtent);
```

![1.gif](/assets/openalyers.assets/1666340432400-265789b5-cf40-4faf-bcf8-f72034d1a9e2.gif)

### 2.缩放移动旋复位

[View.setZoom()](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#setZoom)：
设置缩放层级。
[View.setCenter()](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#setCenter)：
设置视图当前的位置。
[View.setRotation()](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html#setRotation)：
设置视图旋转角度。复位视图就使用上面三个 API 进行复位。

```javascript
// 获取视图对象，初始缩放层级，初始显示位置，初始旋转角度
let view = map.getView();
let zoom = view.getZoom();
let center = view.getCenter();
let rotation = view.getRotation();

// 增大缩放层级
zoomOut.addEventListener('click', (e) => {
  view.setZoom(view.getZoom() + 1);
});

// 缩小缩放层级
zoomIn.addEventListener('click', (e) => {
  view.setZoom(view.getZoom() - 1);
});

// 移动到给定的经纬度处
moveDf.addEventListener('click', (e) => {
  let pos = fromLonLat([121, 40]);
  view.setCenter(pos); // 移动
  view.setZoom(18);
});

// 复原初始缩放，位置，旋转角度
moveRe.addEventListener('click', (e) => {
  view.setCenter(center); // 初始中心位置
  view.setZoom(zoom); // 初始缩放级别
  view.setRotation(rotation); // 初始旋转角度
});

// 获取鼠标点击的地点的经纬度
container.addEventListener('click', (e) => {
  console.log(transform(map.getEventCoordinate(e), 'EPSG:3857', 'EPSG:4326'));
});
```

### 3.图层显示隐藏

[layer.setVisible()](https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html#setVisible)：
设置图层的可见层度。虽然 View 类没有提供控制图层显示隐藏的组件，但是提供了相关的
API，我们可以自定义组件，然后调用 API 实现。

```html
<div id="map">
  <div class="layerControl">
    <div class="title">图层列表</div>
    <ul class="layerTree"></ul>
  </div>
</div>
```

```javascript
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const publicKey = 'xxxxx'; // 自行去注册获取key：https://www.tianditu.gov.cn/
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url3 = `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url4 = `http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

let lay = new TileLayer({
  name: '天地图矢量图层',
  source: new XYZ({
    url: url,
  }),
});

let layTag = new TileLayer({
  name: '天地图标记层',
  source: new XYZ({
    url: url2,
  }),
});

let shape = new TileLayer({
  name: '天地图地形影像图图层',
  source: new XYZ({
    url: url3,
  }),
});

let shapeTag = new TileLayer({
  name: '天地图地形影像图标记层',
  source: new XYZ({
    url: url4,
  }),
});

let map = new Map({
  target: 'map',
  layers: [lay, layTag, shape, shapeTag],
  view: new View({
    zoom: 2,
    center: [0, 0],
  }),
});

initLayerVisible();

function initLayerVisible() {
  // 图层，图层名和图层是否可见的初始状态列表
  let layer = [];
  let layerName = [];
  let layerVisibity = [];

  // 获取被插入DOM的节点
  let treeContent = document.querySelector('.layerTree');

  // 获取地图中所有图层
  let layers = map.getAllLayers();

  // 循环插入DOM到自定义组件中
  layers.forEach(function (item, idx) {
    layer[idx] = item;
    layerName[idx] = item.get('name');
    layerVisibity[idx] = item.getVisible();

    let className = `ipt${idx}`;
    let li = `
      <li class="${className}">
        <input type="checkbox" id="${className}" ${
      layerVisibity[idx] && 'checked'
    }/>
        <label class="content" for="${className}">${layerName[idx]}</label>
      </li>
    `;

    treeContent.appendChild(
      new DOMParser()
        .parseFromString(li, 'text/html')
        .querySelector(`.${className}`)
    );
    let dom = document.querySelector(`#${className}`);
    dom.addEventListener('click', function (e) {
      console.log(item);
      if (this.checked) {
        item.setVisible(true);
      } else {
        item.setVisible(false);
      }
    });
  });
}
```

![2.gif](/assets/openalyers.assets/1666452140164-9bd3b055-56cd-40c0-a05a-8a7efbac6b8d.gif)

### 4.鼠标位置

1. 通
   过[MousePosition](https://openlayers.org/en/latest/apidoc/module-ol_control_MousePosition-MousePosition.html)控
   件获取鼠标位置。
2. 根据投影坐标 API
   [getEventCoordinate ](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#getEventCoordinate)获
   取。

```javascript
import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';
import { transform } from 'ol/proj';

const publicKey = 'xxxxx'; // 自行去注册获取key：https://www.tianditu.gov.cn/
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.querySelector('.mouse-position'),
  placeholder: '找不到坐标',
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: url,
        wrapX: false,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: url2,
        wrapX: false,
      }),
    }),
  ],
  view: new View({
    zoom: 2, // 地图初始显示层级
    center: [0, 0],
  }),
  controls: defaultControls().extend([mousePositionControl]), // 投影坐标控件
});

// 修改投影坐标
const projection = document.querySelector('#projection');
projection.addEventListener('change', function (e) {
  mousePositionControl.setProjection(e.target.value);
});

// 修改投影坐标精度
const number = document.querySelector('#Precision');
number.addEventListener('change', function (e) {
  const format = createStringXY(e.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});

// 通过API获取坐标
document.querySelector('#map').addEventListener('click', (e) => {
  // 转换坐标从源投影转换成目标投影  EPSG:3857是源，EPSG:4326是目标
  console.log(transform(map.getEventCoordinate(e), 'EPSG:3857', 'EPSG:4326'));
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .content {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        z-index: 6;
      }

      input,
      select {
        padding: 5px;
        outline: none;
        border: 2px solid red;
      }

      .box {
        margin-bottom: 5px;
      }
    </style>
  </head>
  <body>
    <div id="map">
      <div class="content">
        <div class="box">
          <label for="projection">请选择投影坐标：</label>
          <select id="projection">
            <option value="EPSG:4326">EPSG:4326</option>
            <option value="EPSG:3857">EPSG:3857</option>
          </select>
        </div>
        <div class="box">
          <label for="Precision" class="number">请选择精度：</label>
          <input type="number" id="Precision" value="4" />
        </div>
        <div class="mouse-position"></div>
      </div>
    </div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

#### ![4.gif](/assets/openalyers.assets/1666600365194-974f840e-82f6-4f83-baa1-c3d686b06ae4.gif)

### 5.比例尺控件

1. 通
   过[ScaleLine](https://openlayers.org/en/latest/apidoc/module-ol_control_ScaleLine-ScaleLine.html)插
   入控件到页面中

```javascript
import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ScaleLine from 'ol/control/ScaleLine';
import { defaults as defaultControls } from 'ol/control';

const publicKey = 'xxxxx'; // 自行去注册获取key：https://www.tianditu.gov.cn/
const url = `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${publicKey}`;
const url2 = `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${publicKey}`;

const scaleLineControl = new ScaleLine({
  units: 'metric',
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: url,
        wrapX: false,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: url2,
        wrapX: false,
      }),
    }),
  ],
  view: new View({
    zoom: 2, // 地图初始显示层级
    center: [0, 0],
  }),
  controls: defaultControls().extend([scaleLineControl]), // 投影坐标控件
});
```

![3.gif](/assets/openalyers.assets/1666600154796-c8a3bb07-52e0-48bc-8026-479ca206e4f5.gif)

### 6.鹰眼控件
