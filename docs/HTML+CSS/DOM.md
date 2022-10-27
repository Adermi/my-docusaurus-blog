---
id: dom
title: DOM对象
---

## DOM

> 文档对象模型，是一个接口，我们能用 JS 对页面中的元素进行操作

### 1，什么是DOM

![1569740427078](/assets/htmlcssAssets.assets/1569740427078.png)

### 2，DOM树

![1569740523926](/assets/htmlcssAssets.assets/1569740523926.png)

### 3，获取ID名获取元素

```javascript
    // 1. 因为我们的文档是从上往下加载的，所以得先有标签，所以得下载 script 的下面
    // 2. 获取 element 元素，通过by来选取
    // 3. 参数 id 是区分大小写
    // 4. 返回的是一个元素对象
var timer = document.getElementById('time');
console.log(timer);
console.log(typeof timer);
    // 5. 通过console.dir 可以更好的查看我们湖区的元素
console.dir(timer);
```

![1569741146619](/assets/htmlcssAssets.assets/1569741146619.png)

### 4，根据标签名获取

- `getElementsByTagName` 根据标签名获取所有的标签元素，以**伪数组**的形式返回

  ```javascript
  	// 1. 获取所有的div标签
  var divs = document.getElementsByTagName('div');
  console.dir(divs);
  
  	// 2. 遍历所有元素
  for (var i = 0; i < divs.length; i++) {
      console.log(divs[i])
  }
  
  	// 3. 通过父元素内部所有指定标签名的子元素
  var li_123 = document.getElementById('123')
  console.dir(li_123.getElementsByTagName('div'))
  ```

  ![1569803881480](/assets/htmlcssAssets.assets/1569803881480.png)

### 5，H5新增的获取元素

- `getElementsByClassName`	H5 新增的方法，通过类名获取元素

  ```javascript
  var lis = document.getElementsByClassName('a');
  console.dir(lis)
  ```

- `querySelector/querySelectorAll`  通过选择器获取元素

  ```javascript
  	// 1. 只选择第一个
  var lis = document.querySelector('a');
  console.dir(lis)
  	// 2. 选择页面中所有的
  var li_all = document.querySelectorAll('.a');
  console.dir(li_all);
  ```

### 6，获取body/html元素

- ###### 获取 body 元素

  ```javascript
  // document.body;
  ```

- ###### 获取 html 元素

  ```javascript
  // document.documentElement;
  ```

## 事件基础

### 1，什么是事件

- 例如：点击一个按钮，弹出对话框

  （1），事件是由三部分组成的，事件源，事件类型，事件处理程序	我们称为三要素

  （2），事件源	事件被触发的对象	谁	按钮

  ```javascript
  var btn = document.getElementById('btn')
  ```

  （3），事件类型	如何触发	什么事件	比如是鼠标经过，还是点击，还是键盘按下

  （4），事件处理程序，通过一个函数赋值的方式完成

  ```javascript
  var btn = document.getElementById('btn');
  btn.onclick = function () {
      alert('666')
  }
  ```

- 执行事件的步骤

  1. 获取事件源

  2. 注册事件

  3. 添加事件处理程序

     ![1569805994679](/assets/htmlcssAssets.assets/1569805994679.png)

### 2，修改标签的内容

- `innerText`  只能改变标签内的文本，不识别 html标签，会自动去除空格和换行

  ```javascript
  // 当我们点击了按钮，div里面的文字发生变化
      // 1. 获取元素
  var btn = document.getElementById('btn');
  var div = document.querySelector('div');
      // 2. 注册时间
  btn.onclick = function () {
      div.innerText = getTimer()			// 使用 innerText修改元素内容
  };
  
  function getTimer() {
      var time = new Date();
      var h = time.getHours();
      h = h < 10 ? '0' + h : h;
      var m = time.getMinutes();
      m = m < 10 ? '0' + m : m;
      var s = time.getSeconds();
      s = s < 10 ? '0' + s : s;
      return h + ':' + m + ':' + s
  }
  
  // 我们不做点击操作，打开网页就有时间
  div.innerText = getTimer()
  ```

- `innerHTML`  能够改变标签的内容，内容可以为标签！，以及各种属性（识别 html 标签，W3C标准）

  ```javascript
  var div = document.querySelector('div');
  div.innerHTML = '<p>我是爸爸<p>'
  ```

- 两者的区别

  ```javascript
  var div = document.querySelector('div');
  console.log(div.innerText);
  console.log(div.innerHTML);
  ```

  ![1569807696604](/assets/htmlcssAssets.assets/1569807696604.png)

### 3，修改标签的属性

修改 `src` ，`title`属性

```javascript
<input type="submit" id="哈士奇" value="哈士奇"></input>
<input type="submit" id="阿拉斯加" value="阿拉斯加"></input>
<img src="img/哈士奇.jpg" alt="">


	// 1. 获取元素
var dog1 = document.getElementById('阿拉斯加');
var dog2 = document.getElementById(' 哈士奇');
var img1 = document.querySelector('img');
	// 2. 注册事件
dog1.onclick = function () {
    img1.src = 'img/阿拉斯加.jpg';
    img1.title = '我是阿拉斯加'
};
dog2.onclick = function () {
    img1.src = 'img/哈士奇.jpg';
    img1.title = '我是哈士奇'
}
```

### 4，修改表单的属性

> **type， value， checked， selected， disable**

```javascript
// 1. 获取元素
var btn = document.querySelector('button')
var input = document.querySelector('input')
// 2. 注册事件，处理程序
btn.onclick = function () {
    // 表单里面的值是通过 value 来修改的
    input.value = '我被按钮修改了值';
    // 如果想要某个表单被禁用 不能再点击 disable
    input.disabled = true;
    // this 指向的是事件函数的调用者 btn
    this.disabled = true;
}    
```

![3](/assets/htmlcssAssets.assets/3.gif)

- [案例](http://127.0.0.1:5500/demo.html)：按一个按钮能够显示密码的明文

```javascript
<input class="p" type="password">
    <button>按钮</button>

    // 1. 获取元素
var password = document.querySelector('.p')
var btn = document.querySelector('button')
    // 2. 注册事件
var s = 0;
btn.onclick = function () {
    if (s === 0) {
        password.type = 'text';
        s = 1;
    } else if (s === 1) {
        password.type = 'password';
        s = 0;
    }
}
```

![2](/assets/htmlcssAssets.assets/2.gif)

### 5，修改标签css样式属性

> 修改标签的 **width，height，backgroundback** 属性

```javascript
![2](/assets/htmlcssAssets.assets/2.gif)// 1. 获取元素
var div = document.querySelector('div');
// 2. 注册事件
div.onclick = function () {
    // div.style.backgroundColor = 'red';
    // div.style.width = '200px';
    this.style.backgroundColor = 'red';
    this.style.width = '200px';
}
```

![1](/assets/htmlcssAssets.assets/1.gif)

**注意**：

1. JS 里面的样式采用驼峰命名法，比如 [fontSize](#)，[backgroundColor](#)

2. JS 修改 [style](#) 样式操作，产生的是**行内样式**，[css](#) 权重比较高

![1570195298533](/assets/htmlcssAssets.assets/1570195298533.png)

#### -案例1：关闭二维码

> 点击按钮显示和关闭二维码

```javascript
// 1. 获取元素
var btn = document.querySelector('.close-btn');
var box = document.querySelector('.box');

// 2. 注册事件3
btn.onclick = function name(params) {
    alert('666');
    box.style.display = 'none';
}
```

#### -案例2：循环精灵图

循环精灵图

```javascript
// 1. 获取元素
var lis = documents.querySelectorAll('li');
for (var i = 0; i < li.length; i++) {
// 索引号 乘以 44 就是每个 li 的背景y坐标 index就是我们的y坐标
var index = i * 44;
li[i].style.backgroundPosition = '0 -' + index + 'px';
}
```

![1570420674435](/assets/htmlcssAssets.assets/1570420674435.png)

#### -案例3：输入框提示

> 当点击输入框，提示文字隐藏，离开时，显示提示文字

```javascript
// 1. 获取元素
var text = document.querySelector('input')

// 2. 注册事件,获得焦点事件 onfocus
text.onfocus = function () {
    if (this.value === '小米手机') {
        this.value = '';
    }
    this.style.color = 'black';
}

// 3. 注册事件，失去焦点事件 on
text.onblur = function () {
    if (this.value === '') {
        this.value = '小米手机';
    }
    this.style.color = '#999';
}
```

![4](/assets/htmlcssAssets.assets/4.gif)

### 6，修改标签的class类名

如果我们像修改一个标签的属性，但是标签的属性太多，我们可以直接修改标签的[classname](https://www.bilibili.com/video/av56979338/?p=23)属性

![1570423240412](/assets/htmlcssAssets.assets/1570423240412.png)

```javascript
![5](/assets/htmlcssAssets.assets/5.gif)div {
    width: 100px;
    height: 100px;
    background-color: black;
    color: red;
}

.change {
    width: 150px;
    height: 150px;
    background-color:red;
    color: black;
}
<div>我是一只🐖</div>

// 1. 获取事件
var div = document.querySelector('div');
// 2. 注册事件
div.onclick = function () {
    this.className = 'change';
    // 3. 如果我们想要修改类名并保留原来的类名
    this.className = 'change first';
}
```

![5](/assets/htmlcssAssets.assets/5.gif)

- [x] 案例：验证密码框

  ```javascript
  .password {
      width: 150px;
      height: 25px;
      margin-top: 10px;
      margin-left: 10px;
      border: 2px solid blue;
  }
  
  .message {
      display: inline-block;
      font-size: 12px;
      color: #999;
      padding-left: 10px;
  }
  
  .wrong {
      color: red;
  }
  ---------------------------------------------------------------------------------
  <div class="register">
      <input class="password" type="password" class="ipt">
          <p class="message">请输入6 ~ 16 位的密码</p>
  </div>
  ---------------------------------------------------------------------------------
  // 1. 获取事件
  var inp = document.querySelector('.password');
  var p = document.querySelector('.message');
  // 2. 注册事件
  inp.onblur = function () {
      if (this.value.length < 6 || this.value.length > 16) {
          p.className = 'message wrong'
          p.innerHTML = '输入6~16位的密码'
      } else {
          p.className = 'message'
          p.innerHTML = '输入正确'
      }
  }
  ```

  ![6](/assets/htmlcssAssets.assets/6.gif)

### 7，操作元素小结

![1570425090718](/assets/htmlcssAssets.assets/1570425090718.png)

### 8，排他思想

- [x] 案例：我想让所有页面中的按钮都能够有点击之后有点击的

  ```javascript
  button {
              width: 50px;
              height: 20px;
              color: aliceblue;
              border: 2px solid darkgoldenrod;
              background-color: black;
          }
  <button>按钮一</button>
  <button>按钮二</button>
  <button>按钮三</button>
  <button>按钮四</button>
  <button>按钮五</button>
  ---------------------------------------------------------------------------
  // 1. 获取所有的按钮
  var btns = document.querySelectorAll('button');
  // 2. 利用for循环 给所有的按钮注册事件
  for (var i = 0; i < btns.length; i++) {
      btns[i].onclick = function () {
          // 3. 使用排他思想
          for (var k = 0; k < btns.length; k++) {
              btns[k].style.backgroundColor = '';
          }
          this.style.backgroundColor = 'red';
      }
  }
  ```

  - 排他思想：在给自己添加属性的时候，先吧其他所有的按钮删除属性

![7](/assets/htmlcssAssets.assets/7.gif)





#### -案例4：百度换肤

```html
    <style>
        *{padding: 0; margin:0;}
        ul, ol{list-style:none;}
        a{text-decoration:none;}
        img{border:0;}
        body {
            background: url(imgs/巫师3_狂猎昆特牌四人组4k壁纸_彼岸图网.jpg) no-repeat center top;
        }
        ul {
            width: 816px;
            height: 202px;
            padding: 8px;
            margin: 200px auto;
            border: 3px solid blueviolet;
        }
        li {
            float: left;
            width: 200px;
            height: 200px;
            margin: 2px;
            /* border: 1px solid blue; */
        }
        img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <ul>
        <li><img src="imgs/巫师3_狂猎昆特牌四人组4k壁纸_彼岸图网.jpg" alt=""></li>
        <li><img src="imgs/巫师3杰洛特和叶奈法4k壁纸_彼岸图网.jpg" alt=""></li>
        <li><img src="imgs/巫师3游戏风景3840x2160壁纸_彼岸图网.jpg" alt=""></li>
        <li><img src="imgs/犬神 睡莲花盆 咖啡店 5k动漫壁纸_彼岸图网.jpg" alt=""></li>
    </ul>
    
    <script>
        // 1. 获取元素
        var imgs = document.querySelector('ul').querySelectorAll('img');
        // 2. 注册事件
        for (var i = 0; i < lis.length; i++) {
            imgs[i].onclick = function() {
                document.body.style.backgroundImage = 'url(' + this.src + ')';
            }
        }
        
        // 事件监听版本
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            document.body.style.backgroundImage = 'url(' + e.target.src + ')'
        })
    </script>
</body>
```

![8](/assets/htmlcssAssets.assets/8.gif)





#### -案例5：表格hover变色

> 当鼠标经过表格的某一行时，那一行的数据高亮，需要两个新的鼠标事件，[onmouseover](#) 和 [onmouseout](#)

```html
    <script src="./jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
            *{padding: 0; margin:0;}
            ul, ol{list-style:none;}
            a{text-decoration:none;}
            img{border:0;}

            .blue {
                background-color: rgb(108, 108, 201);
            }
    </style>
</head>
<body>
    <table class="table table-bordered">
        <caption>我是表格标题
            <tr>
                <td>周一</td>
                <td>周二</td>
                <td>周三</td>
                <td>周四</td>
            </tr>
            <tr>
                <td>菠萝</td>
                <td>橘子</td>
                <td>香蕉</td>
                <td>芒果</td>
            </tr>
            <tr>
                <td>羊肉</td>
                <td>猪肉</td>
                <td>牛肉</td>
                <td>狗肉</td>
            </tr>
        </caption>
    </table>
    <script>
        // 1. 获取元素
        var trs = document.querySelectorAll('tr');
        // 2. 注册事件
        for (var i = 1; i < trs.length; i++) {
            trs[i].onmouseover = function() {
                this.className = 'blue'
            }
            trs[i].onmouseout = function() {
                this.className = ''
            }
        }
        
        
        // 事件监听流版本
        // 1. 获取事件
        var tr = document.querySelectorAll('tr');
        // 2. 注册事件流
        for (var i = 1; i < tr.length; i ++) {
            tr[i].addEventListener('mouseover', function() {
                this.style.backgroundColor = 'red';
            })
            tr[i].addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
            })
        }
    </script>
</body>
```

![9](/assets/htmlcssAssets.assets/9.gif)

#### -案例6：标签全选取消

```html
    <script src="./jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
            *{padding: 0; margin:0;}
            ul, ol{list-style:none;}
            a{text-decoration:none;}
            img{border:0;}

            .blue {
                background-color: rgb(108, 108, 201);
            }
    </style>
</head>
<body>
    <table class="table table-bordered">
        <tr>
            <td><input type="checkbox"></td>
            <td>商品</td>
            <td>价格</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>橘子</td>
            <td>500</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>猪肉</td>
            <td>1300</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>蝎子</td>
            <td>5000</td>
        </tr>
    </table>
    <script>
        // 1. 表格行被选中高亮
        var trs = document.querySelectorAll('tr');
        for (var i = 1; i < trs.length; i++) {
            trs[i].onmouseover = function() {
                this.className = 'blue'
            }
            trs[i].onmouseout = function() {
                this.className = ''
            }
        }
        
        // 1.*. 表格选中高亮的 冒泡流实现
        var trs = document.querySelector('tbody');
        trs.addEventListener('mouseover', function (e) {  
            e.target.parentNode.style.backgroundColor = "#ff6700"
        })
        trs.addEventListener('mouseout', function (e) {  
            e.target.parentNode.style.backgroundColor = '';
        })
        
        // 2. 全选按钮
        var boxs = document.querySelectorAll('input');
        var main_box = boxs[0];
        main_box.onclick = function () {
            for (var i = 1; i < boxs.length; i++) {
                boxs[i].checked = this.checked;
            }
        }

        // 3. 小按钮全选转牛也选
        for (var i = 1; i < boxs.length; i++) {
            boxs[i].onclick = function () {
                var flag = true;
                for (var i = 1; i < boxs.length; i++) {
                    if (!boxs[i].checked) {
                        flag = false
                    }
                }
                main_box.checked = flag;
            }
        }
    </script>
</body>	
```

![10](/assets/htmlcssAssets.assets/10.gif)

### 9，自定义属性

> 所有自定义属性必须以 `data` 开头，例如`data-index`！！！！！

- 增

  ```javascript
      // 1. element.setAttribute('属性', '值'), 主要针对自定义属性
  table.setAttribute('index', 1) 
  ```

- 改

```javascript
    // 1. element.属性 = '值',主要用来获取内置属性
table.className = 'haha'  
    // 2. element.setAttribute('属性', '值'), 主要针对自定义属性
table.setAttribute('index', 1)  
```

- 查

  ```javascript
  var table = document.querySelector('table');
  	// 1. element.属性
  console.log(table.className);
  	// 2. element.getAttribute('属性')
  console.log(table.getAttribute('class'));
  	// 3. H5新增的获取自定义属性的方法，dataset是一个集合，存着所有data-开头的自定义属性
  console.log(divs[3].dataset.index);
  console.log(divs[3].dataset['index']);	// H5新增
  // 注意：如果自定义属性是 data-name-age 这样命名，我们必须 nameAge这样取值
  ```

- 删

  ```javascript
  var table = document.querySelector('table');
  table.removeAttribute('index');  
  ```

#### -案例7：tab栏切换

```html
    <style>
            *{padding: 0; margin:0;}
            ul, ol{list-style:none;}
            a{text-decoration:none;}
            img{border:0;}

            .tab {
                width: 800px;
                height: 300px;
                margin: 150px auto;
            }

            .tab_list {
                width: 800px;
                height: 50px;
                background-color: #EFF0EF;
            }

            .tab_list li {
                float: left;
                width: 150px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 17px;
                cursor:pointer;
            }

            .current {
                background-color: #D72720;
                color: #fff;
            }

            .item {
                display: none;
            }
    </style>
</head>
<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格和包装</li>
                <li>售后保障</li>
                <li>商品评价(5000+)</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display: block">商品介绍模块</div>
            <div class="item">规格和包装模块</div>
            <div class="item">售后保障模块</div>
            <div class="item">商品评价(5000+)模块</div>
            <div class="item">手机社区模块</div>
        </div>
    </div>
    <script>
        // 1. 使用排他思想，点击变换颜色
        // 获取元素
        var tab_list = document.querySelector('.tab_list');
        var lis = tab_list.querySelectorAll('li');
        var divs = document.querySelectorAll('.tab_con div');
        
        // for 循环绑定点击事件
        for(var i = 0; i < lis.length; i++) {
            lis[i].setAttribute('data-index', i);
            lis[i].onclick = function () {
                // 上面的选项卡模块
                // 1. 排他
                for(var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                // 2. 留己
                this.className = 'current';

                // 下面显示内容模块
                var index = this.getAttribute('data-index')
                // 1. 排他
                for(var i = 0; i < lis.length; i++) {
                    divs[i].style.display = 'none';
                }
                // 2. 留己
                divs[index].style.display = 'block';
            }
        }

    </script>
</body>	
```

![11](/assets/htmlcssAssets.assets/11.gif)



### 10，节点操作

1. 利用 **DOM 提供的方法**获取元素

   - `document.getElementById()`
   - `document.getElementByTagName()`
   - `document.querySelector()` 等
   - 缺点：繁琐，逻辑性不强

2. 利用**节点层次级关系**获取元素

   ![1570534060289](/assets/htmlcssAssets.assets/1570534060289.png)

   - 在开发中一般只获取元素节点

3. 节点层级

   ![1570534330190](/assets/htmlcssAssets.assets/1570534330190.png)

1. ##### 父级节点（亲爸爸）

   ![1570534385632](/assets/htmlcssAssets.assets/1570534385632.png)

2. ##### 子节点

   - 不推荐

     ![1570534925911](/assets/htmlcssAssets.assets/1570534925911.png)

   - 实际开发常用

     ![1570535058028](/assets/htmlcssAssets.assets/1570535058028.png)

6. ##### 获取指定节点

   > `fist/laseChild()` 获取最前最后一个节点
   >
   > `fist/laseElenemtChild()` 获取最前最后一个元素节点
   >
   > `node.childre[0]` 获取任意一个节点

   ![1570535705338](/assets/htmlcssAssets.assets/1570535705338.png)

7. ##### 获取兄弟节点

   > `next/previousSibling` 获取上一个节点（任何节点）
   >
   > `next/previousElementSibling` 获取上一个节点元素

   ##### ![1570537762832](/assets/htmlcssAssets.assets/1570537762832.png)![1570537685271](/assets/htmlcssAssets.assets/1570537685271.png)

8. ##### 创建添加节点

   > `createElenemt()` ：创建节点；
   >
   > `appendChild()`和`insertBefore()` ：插入节点

   ![1570539589146](/assets/htmlcssAssets.assets/1570539589146.png)

9. ##### 删除节点

   > `removeChild()` ：删除节点

   ```html
   <body>
       <button>删除</button>
       <ul>
           <li>老大</li>
           <li>老二</li>
           <li>老三</li>
           <li>老四</li>
       </ul>
       <script>
           // 1. 获取元素
           var ul = document.querySelector('ul');
           var btn = document.querySelector('button');
           var li4 = ul.children[ul.children.length-1];
           // 2. 删除元素，node.removeChild(child)
           ul.removeChild(li4);
           ul.removeChild(ul.children[0]);
           // 3. 点击按钮依次删除里面的元素
           btn.onclick = function () {
               if (ul.children.length > 0) {
                   ul.removeChild(ul.children[0]);
               };
               ul.children.length == 0 ? btn.disabled = true : null
           }
       </script>
   </body>
   ```

   ![14](/assets/htmlcssAssets.assets/14.gif)

10. ##### 复制节点

   > `node.cloneNode()` 参数为空时，浅拷贝，只复制标签，不复制内容，参数为true，深拷贝

   ![1570584920631](/assets/htmlcssAssets.assets/1570584920631.png)

   ```javascript
   var li1 = document.querySelector('.boss');
   var li_copy = li1.cloneNode();
   var li_deepCopy = li1.cloneNode(true);
   
   // 只复制该节点的标签元素，子节点不复制
   console.log(li_copy);
   console.log(li_deepCopy);
   ```

   

#### -案例8：下拉菜单

```html
    <style>
            *{padding: 0; margin:0;}
            ul, ol{list-style:none;}
            a{text-decoration:none;}
            img{border:0;}

            .nav {
                width: 500px;
                margin: 100px auto;
            }

            .nav li {
                float: left;
                width: 100px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                border: 1px solid red;
            }

            .nav li ul {
                display: none;
            }

            .nav li ul li {
                margin-left: -1px;
            }
    </style>
</head>
<body>
    <ul class="nav">
        <li>
            <a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul></li>
        <li><a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul></li>
        <li><a href="#">微博</a>
            <ul>
                <li>私信</li>
                <li>评论</li>
                <li>@我</li>
            </ul></li>
    </ul>
    <script>
        var nav_li = document.querySelector('.nav').children;
        for (var i = 0; i < nav_li.length; i++) {
            nav_li[i].onmouseover = function () {
                this.children[1].style.display = 'block'
            }
            nav_li[i].onmouseout = function () {
                this.children[1].style.display = 'none'
            }
        }
    </script>
</body>	
```

![12](/assets/htmlcssAssets.assets/12.gif)

#### -案例9：简单留言发布

```html
    <script src="./jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
        *{padding: 0; margin:0;}
        ul, ol{list-style:none;}
        a{text-decoration:none;}
        img{border:0;}

        div {
            width: 400px;
            margin: 200px auto;
        }

        button {
            float: right;
        }

        ul {
            margin-top: 45px;
        }
    </style>
</head>
<body>
    <div>
        <textarea class="form-control" rows="3"></textarea>
        <button type="submit" class="btn btn-primary">发布</button>
        <ul class="list-group">
        </ul>
    </div>

    <script>
        // 1. 获取元素
        var text = document.querySelector('textarea');
        var btn = document.querySelector('button');
        var ul = document.querySelector('.list-group')
        
        // 2. 注册事件
        btn.onclick = function () {
            if (text.value) {
                var new_li = document.createElement('li')
                new_li.setAttribute('class', 'list-group-item list-group-item-success');
                new_li.innerHTML = text.value;
                ul.insertBefore(new_li, ul.children[0]);
                text.value = '';
            } else {
                alert('输入的内容为空');
            }
        }
    </script>
</body>	
```

![13](/assets/htmlcssAssets.assets/13.gif)

#### -案例10：删除留言

```html
    <script src="./jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
        *{padding: 0; margin:0;}
        ul, ol{list-style:none;}
        a{text-decoration:none;}
        img{border:0;}

        .form-control {
            width: 400px;
        }

        div {
            width: 250px;
            margin: 200px auto;
        }

        div>button {
            position: relative;
            right: 0;
        }

        .list-group {
            margin-top: 45px;
        }

        .list-group>li {
            float: left;
            width: 400px;
            margin-top: 10px;
            line-height: 34px;
        }

        .list-group>li>button {
            float: right;
            width: 52px;
            height: 34px;
        }
    </style>
</head>
<body>
    <div>
        <textarea class="form-control" rows="3"></textarea>
        <button type="submit" class="btn btn-primary">发布</button>
        <ul class="list-group">
        </ul>
    </div>

    <script>
        // 1. 获取元素
        var text = document.querySelector('textarea');
        var btn = document.querySelector('button');
        var ul = document.querySelector('.list-group')
        
        // 2. 注册事件
        btn.onclick = function () {
            if (text.value) {
                var comment = document.createElement('li');
                comment.setAttribute('class', 'list-group-item list-group-item-success');
                var del_btn = document.createElement('button');
                del_btn.setAttribute('class', 'btn btn-danger')
                del_btn.innerText = '删除'
                comment.innerHTML = text.value;
                comment.appendChild(del_btn)
                ul.appendChild(comment, ul.children[0]);
                text.value = '';

                // 3. 为创建的删除键注册删除事件
                del_btn.onclick = function () {
                    ul.removeChild(this.parentNode);
                }
            } else {
                alert('输入的内容为空');
            }
        }
    </script>
</body>	
```

![15](/assets/htmlcssAssets.assets/15.gif)

#### -案例11：动态生成表格

```html
    <script src="./jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
        *{padding: 0; margin:0;}
        ul, ol{list-style:none;}
        a{text-decoration:none;}
        img{border:0;}
        table {
            width: 500px;
            margin: 200px 300px;
        }

        .table>tbody>tr>td {
            line-height: 34px;
        }

    </style>
</head>
<body>
    <table class="table table-bordered table-hover">
        <thead style="background-color: bisque">
            <tr>
                <th>姓名</th>
                <th>科目</th>
                <th>成绩</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <script>
       // 1. 模拟准备好学生数据
        var datas = [{
                name: '甲',
                subject: 'JavaScrapt',
                socre: 100
            },{
                name: '乙',
                subject: 'Python',
                socre: 85
            },{
                name: '丙',
                subject: 'HTML/CSS',
                socre: 94
            },{
                name: '丁',
                subject: 'R',
                socre: 120
            }]
        // 2. 往tbody 里面创建行；有几个人(通过数组长度)就创建几行
        var tbody = document.querySelector('tbody');
        
        for (var i = 0; i < datas.length; i++) {
            // 1. 创建 tr 行
            var tr = document.createElement('tr');
            
            // 2. for 循环遍历对象，创建行数据
            for (var val in datas[i]) {
                var td = document.createElement('td');
                td.innerHTML = datas[i][val];
                tr.appendChild(td);
            }
            
            // 3. 创建最后一行的删除键并添加到当前行中
            var last_td = document.createElement('td');
            tr.appendChild(last_td)
            last_td.innerHTML = '<button type="button" class="btn btn-danger">删除</button>'

            // 4. 所有完整的行添加到表格的tbody中
            tbody.appendChild(tr);
        }

        // 3. 绑定删除事件
        var btns = document.querySelectorAll('button');
        for (var k = 0; k < btns.length; k++) {
            btns[k].onclick = function () {
                // 点击按钮，删除当前所在的行 node.removeChild(child)
                tbody.removeChild(this.parentNode.parentNode)
            }
        }
    </script>
</body>	
```

![16](/assets/htmlcssAssets.assets/16.gif)

### 11，三种创建元素的方式

> `innerHTML` 的效率要比 `createElenemt` 的效率`高`（不要使用拼接字符创的方式追加元素）

```javascript
// 三种创建元素的方式
// 1. write 写入的方式，如果页面文档流加载完毕，会导致页面重绘
var btn = document.querySelector('button');
btn.onclick = function() {
    document.write('<p>我是一个p标签</p>');
}

// 2. innerHTML，能直接在标签元素内部创建DOM
var inner_html = document.querySelector('.innerHTML');
inner_html.innerHTML += '<a href="javascrapt:;">我是一个a标签</a>'

// 3. document.createElenemt() 创建元素
var create = document.querySelector('.create');
var a = document.createElement('a');
create.appendChild(a) 
```

![1570598306280](/assets/htmlcssAssets.assets/1570598306280.png)

```javascript
// 创建大量的元素，使用 innerHTML + 数组拼接 的方式创建
var div = document.querySelector('.div1');
var arr = [];
var start_time = +new Date;
for (var i = 0; i < 1000; i++) {
    arr.push('<a href="javascrapt:;">我是链接</a>')
}
div.innerHTML = arr.join('')
console.log('一共执行' + (+new Date -  start_time) + '毫秒');
```

### 12，DOM重点核心复习

> `DOM` ：文档对象模型，是W3C组织推荐的处理标记语言元素的标准接口，用来操作THML

1. 针对标签元素

   - 创建标签元素

     ```javascript
     // 三种创建元素的方式
     // 1. write 写入的方式，如果页面文档流加载完毕，会导致页面重绘
     var btn = document.querySelector('button');
     btn.onclick = function() {
         document.write('<p>我是一个p标签</p>');
     }
     
     // 2. innerHTML，能直接在标签元素内部创建DOM
     var inner_html = document.querySelector('.innerHTML');
     inner_html.innerHTML += '<a href="javascrapt:;">我是一个a标签</a>'
     
     // 3. document.createElenemt() 创建元素
     var create = document.querySelector('.create');
     var a = document.createElement('a');
     create.appendChild(a) 
     ```

   - 增

     ```javascript
     // 两种方式在节点中添加元素
     // Node.appendChild(child)和Node.insertBefore(child Elenemt) ：插入节点
     var div = document.querySelector('div')
     
     // 1. Node.appendChild(child)	追加元素节点
     var new_a1 = document.createElement('a');
     div.append(new_a);
     
     // 2. Node.insertBefore(child Elenemt) 插入元素节点(在第几个元素之前插入)
     var new_a2 = document.createElement('a');
     div.append(new_a2, div.children[0]);
     ```

   - 删 ： `Node.removeElenemt(child)`

   - 查

     ![1570429345052](/assets/htmlcssAssets.assets/1570429345052.png)

     ```javascript
     // H5 的新方法 querySelector/querySelectorAll
     // 父/子/兄/任意节点
     ```

2. 针对属性

   - 元素属性

     ![1570429321878](/assets/htmlcssAssets.assets/1570429321878.png)

   - 自定义属性

     ![1570599513790](/assets/htmlcssAssets.assets/1570599513790.png)

3. 事件操作

   ![1570429429195](/assets/htmlcssAssets.assets/1570429429195.png)

## 事件高级

### 1，注册事件缺点

> 以前我们注册事件都是以 `on` 开头，这种方式绑定的事件具有唯一性，一个元素只能执行一种事件

```javascript
btns = document.querySelectorAll('button');
btns[0].onclick = function() {
    alert('1');
}
btns[0].onclick = function() {
    alert(2);
}

// 上面的代码只会执行最后面的那个事件，具有唯一性
```

### 2，事件监听

> `addEventListener(type, listener [useCapture])` ，同一个元素同一个事件能够注册多个监听器
>
> - 该方法可以将指定的监听器注册到 **eventTarget** 目标对象上，只要触发事件就会执行
> - 三个参数：
>   1. **type** ：事件类型字符串，例如 **click**，**mouseover**，不需要写 **on**
>   2. **listener** ：事件处理函数，事件发生时，会调用该函数
>   3. **useCapture** ：布尔值，默认 **false**
>
> - IE 9 只支持 **attachEvent()**，了解就行

```javascript
btns = document.querySelectorAll('button');
btns[1].addEventListener('click', function () {
    alert(666)
})
btns[1].addEventListener('click', function () {
    alert(777)
})

// 只要点击了一个按钮，所有注册到该元素身上的 click 事件就会执行
```

### 3，删除事件

1. 传统的 `on` 开头的注册事件

   ```javascript
   // 1. 注册事件移除点击事件
   var btn = document.querySelectorAll('button')
   btn[0].onclick = function() {
       alert('我是按钮一');
       btn[0].onclick = null;
   }
   ```

2. 注册监听事件移除事件

   ```javascript
   // 2. 监听事件移除事件
   function fn() {
       alert('我是按钮二');
       btn[1].removeEventListener('click', fn)
   }
   btn[1].addEventListener('click', fn)
   ```

### 4，DOM事件流

1. **事件流**描述的是从页面中接收事件的顺序
2. 事件发生时候会在元素节点之间按特点的顺序传播，这个传播过程叫 **DOM事件流**

比如我们给 div 注册一个点击事件：

![1570604153294](/assets/htmlcssAssets.assets/1570604153294.png)

**DOM事件流**分成了3个阶段：

1. 捕获阶段（监听事件方法的第三个参数为**true**时，会先执行捕获阶段的元素）

   捕获阶段为，先捕获 document的事件 -> html -> body -> div 事件

   > 注意：只有监听事件才会有捕获阶段，**onclick**和**attachEvent**只能到冒泡阶段

   ```javascript
   // 捕获阶段，事件监听的第三个参数为true，代表捕获的事件都会执行
   var btn = document.querySelector('button');
   btn.addEventListener('click', function() {
       alert('我是儿子')
   }, true)
   
   var div = document.querySelector('div')
   div.addEventListener('click', function() {
       alert('我是爸爸')
   }, true)
   
   document.body.addEventListener('click', function() {
       alert('我是爷爷')
   }, true)
   ```

   ![17](/assets/htmlcssAssets.assets/17.gif)

2. 当前目标阶段(执行我们点击的按钮的事件)

3. 冒泡阶段（监听事件方法的第三个参数为**false**时，会先执行冒泡阶段的元素）

   冒泡阶段为，先执行 div里面的事件 -> body -> html -> document 里面的事件

   > `有些事件是没有冒泡`，比如：**onblur，onfocus，onmouseenter，onmouseleave**

   ![1570604357068](/assets/htmlcssAssets.assets/1570604357068.png)

   ```javascript
   // 冒泡阶段，事件监听的第三个参数为false，代表冒泡会执行
   var btn = document.querySelector('button');
   btn.addEventListener('click', function() {
       alert('我是儿子')
   })
   
   var div = document.querySelector('div')
   div.addEventListener('click', function() {
       alert('我是爸爸')
   })
   
   document.body.addEventListener('click', function() {
       alert('我是爷爷')
   })
   ```

   ![18](/assets/htmlcssAssets.assets/18.gif)

### 5，事件对象

1. event 就是一个事件对象，写到我们侦听函数的 小括号里面，当形参看
2. 事件对象只有有了事件才会存在，他是系统给我们自己创建的，不需要我们传递参数
3. 事件对象是我们时间的一系列相关数据的集合，跟事件相关的，比如鼠标点击事件就会包含鼠标信息
4. 我们可以给这个事件自己命名，比如 e，event，evt
5. IE 兼容性写法  e = e || window.event;

> 在绑定对象的时候默认自带的参数

```javascript
var button = document.querySelector('button');
button.addEventListener('click', function(e) {
    console.log(e);
    // 兼容性写法 e = e || window.event;
})
```

![1570606776114](/assets/htmlcssAssets.assets/1570606776114.png)

### 6，e.target和this区别

> `e.target` 点击了谁就返回那个元素，`this` 那个元素绑定这个事件返回这个元素

```html
<body>
    <div>
        <button>按钮1</button>
    </div>
    
    <script>
        var button = document.querySelector('button');
        var div = document.querySelector('div');
        div.addEventListener('click', function(e) {
            // 1. e.target 返回的是触发事件的对象(元素))，由于有冒泡的原因
            console.log(e.target);
            // 2. this 返回的是绑定事件的对象(元素)
            console.log(this);
        })
        
    </script>
</body>
```

![19](/assets/htmlcssAssets.assets/19.gif)

- 了解内容

  解决IE兼容

  ```javascript
  div.onclick = function(e) {
      e = e || window.e;
      var target = e.target || e.srcElement;
      console.log(target);
  }
  
  // 和 this 有个很相似的属性 currentTarget,ie678不认识
  ```

### 7，阻止默认行为

1. ###### `e.type` 返回事件类型，点击事件就是click等等

   ```javascript
   var button = document.querySelector('div');
   button.addEventListener('click', fn);
   button.addEventListener('mouseover', fn);
   button.addEventListener('mouseout', fn);
   
   function fn(e) {
       console.log(e.type);
   }
   ```

   ![1570608821640](/assets/htmlcssAssets.assets/1570608821640.png)

2. ###### 阻止默认行为（事件），让链接不跳转，或者让提交按钮不提交

   ```javascript
   var a = document.querySelector('a');
   a.addEventListener('click', function(e) {
       e.preventDefault(); // 标准写法
   })
   
   // 传统的注册方式
   a.onclick = function(e) {
       // 普通浏览器
       e.preventDefault();
       // 低版本浏览器ie678 是一个属性
       e.returnValue;
       // 我们还可以return false，没有兼容性问题
       return false;
   }
   ```

### 8，阻止冒泡

> 事件冒泡，石头扔进水里，地下泡泡一层层往上冒，用 `e.stopPropagation` 来阻止冒泡

```javascript
var btn = document.querySelector('button');
btn.addEventListener('click', function(e) {
    e.stopPropagation();		// 阻止冒泡，就不会冒泡到上面的了
    alert('我是儿子')
})

var div = document.querySelector('div')
div.addEventListener('click', function() {
    e.cancelBubble = true;		// IE兼容写法
    alert('我是爸爸')
})

document.body.addEventListener('click', function() {
    alert('我是爷爷')
})
```

- `注意`：我们只给了 **son** 添加了冒泡，没有给爸爸和爷爷添加，他们还会冒泡

### 9，事件委托

> 原理：不要给每个子节点设置事件监听器，而是将事件监听器写到父节点上，利用冒泡来实现

```javascript
<body>
    <ul>
        <li>我是小li，点我有惊喜</li>
        <li>我是小li，点我有惊喜</li>
        <li>我是小li，点我有惊喜</li>
        <li>我是小li，点我有惊喜</li>
        <li>我是小li，点我有惊喜</li>
    </ul>
    
    <script>
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            e.target.style.backgroundColor = 'red';
        })
    </script>
</body>
```

- 这样子能够大大提高程序的运行效率，只注册一个监听器，就能让所有的li有这个事件

![20](/assets/htmlcssAssets.assets/20.gif)



### 10，禁止右键文字复制

> 禁止右键菜单和禁止文字复制

```javascript
// 1. contextmenu 我们可以禁用右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
})

// 2. 禁止选中文件
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
})
```

#### -案例12：图片跟着鼠标走

```javascript
    <style>
        img {
            position: absolute;
        }
    </style>
</head>
<body>
    <img src="imgs/h.png" alt="">
    
    <script>
        var img = document.querySelector('img')
        document.addEventListener('mousemove', function(e) {
            // 千万不要忘记给定位元素的坐标单位 px
            // 减的操作是为了让鼠标在最中间
            img.style.left = e.clientX - 20 + 'px';
            img.style.top = e.clientY - 22 + 'px';
        })
    </script>
</body>
```

![21](/assets/htmlcssAssets.assets/21.gif)

### 11，鼠标在页面中的坐标

```js
// 1. client 鼠标在可视区的 x 和 y 坐标，不会随着滚动条变化
console.log(e.clientX);
console.log(e.clientY);

// 2. page 鼠标在页面文档的 x 和 y 坐标，会随着滚动条的变化而变化
console.log(e.pageX);
console.log(e.pageY);

// 2. screen 鼠标在电脑屏幕的 x 和 y 坐标
console.log(e.screenX);
console.log(e.screenY);
```

![1572876861544](/assets/htmlcssAssets.assets/1572876861544.png)

### 12，常用的键盘事件

```js
// 鼠标事件对象 MouseEvent
// 旧版的键盘事件为 onkeyup按键松开 onkeydown按键按下 onkeypress按键按下

document.addEventListener('keyup', function(e) {
    // 1. 键盘按键只要松开就能触发
    console.log('我松开了a');
})

document.addEventListener('keydown', function(e) {
    // 2. 键盘按键只要按下就能触发，优先级比press高
    console.log('我按下了keydown');
})

document.addEventListener('keypress', function(e) {
    // 3. 键盘按键只要按下就能触发，不能识别功能键 shift ctrl
    console.log('我按下了keypress');
})
```

![1572877538890](/assets/htmlcssAssets.assets/1572877538890.png)

![1572877600167](/assets/htmlcssAssets.assets/1572877600167.png)

### 13，键盘事件对象

> 识别键盘的键使用 `keyCode`，但是不要使用 key，兼容性很差

![1572878133013](/assets/htmlcssAssets.assets/1572878133013.png)

- [**keypress**](#) 和 [**keydown**](#) 的区别：前者能区分大小写
- 实际开发中，通常使用 down 和 up ，他能识别所有的键（包括功能键）

#### 案例13-按下某个键能聚焦表单

```js
var ipt = document.querySelector('input');
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 83) {
        ipt.focus();
    }
})
```

![](/assets/htmlcssAssets.assets/25.gif)

#### 案例14-模拟京东快递查询

> 不能使用 **keydown** 和 **keypress** 用来模拟这个案例，因为这两个事件是按下键盘键的一瞬间就触发，数据都还没来得及写入**input** 框，用 **keyup** 更合适，**keyup** 是文字落入文本框时才触发

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

    input {
        margin: 100px;
    }

    body>div {
        display: none;
        position: absolute;
        top: 45px;
        left: 100px;
        width: 200px;
        height: 45px;
        padding-left: 10px;
        line-height: 45px;
        border: 1px solid #ccc;
        font-size: 20px;
    }

    div::after {
        position: absolute;
        content: '';
        left: 5px;
        bottom: -11px;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-top-color: #999;
    }
</style>

<div>
</div>
<input type="text">

<script>
        var ipt = document.querySelector('input');
        var div = document.querySelector('div');
        ipt.addEventListener('keyup', function(e) {
            if (ipt.value == '') {
                div.style.display = 'none'
            } else {
                div.style.display = 'block'
                div.innerHTML = ipt.value;
            }

            // 如果文本框获得焦点，并且input里面有内容，div显示
        })
        ipt.addEventListener('focus', function() {
                if (ipt.value !== '') {
                    div.style.display = 'block'
                }
            })
            // 如果文本框失去焦点，div隐藏
        ipt.addEventListener('blur', function() {
            div.style.display = 'none'
        })
</script>
```

![](/assets/htmlcssAssets.assets/26.gif)

