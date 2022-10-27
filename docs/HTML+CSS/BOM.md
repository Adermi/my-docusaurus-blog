---
id: bom
title: BOM对象
---

## BOM

> 浏览器对象模型，提供了独立于内容和浏览器进行交互的对象，核心是windows，DOM核心是document

- BOM 比 DOM大，是JS访问浏览器的一个接口，是一个全局对象，全局作用域下的变量，函数都编程了他的方法和属性

  ![1572914106663](/assets/htmlcssAssets.assets/1572914106663.png)

  ```js
  var a = 10;
  // 其实这个全局变量是window的属性，可以通过window.a来调用
  console.log(window.a);
  
  function fn() {
      window.alert('我是window里面的方法')
  }
  
  console.log(window.a);
  ```

  

### 1，窗口加载事件

> 如果我们把js写到文档的别的地方，那么我们如何保证能在页面元素加载完成之后加载事件？

1. `window.onload`        是窗口(页面)加载事件，等到 **DOM** 图像，脚本文件，css文件等，处理函数

   以下三种情况都会刷新页面触发 **load** 事件

   1. a链接的超链接

   2. F5或者刷新按钮（强制刷新）

   3. 前进后退按钮

      在火狐中，有个特点，叫做往返缓存，在火狐里面进行历史记录的前后和后退不会触发load事件，但是

      `pageshow` 事件会，在 **flexible.js** 里面运用

2. `DOMContentLoaded`  等到 **DOM** 页面加载完成，不包括图片，**falsh**，**css** 加载完毕

```js
// 传统注册方式，只能注册一次，并且会以最后一个window为基础
window.onload = function() {
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        alert('我是第一个按钮');
    })
}

// addElementLister等到页面全部加载完毕，触发改事件，没有限制次数
window.addEventListener('load', function() {
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        alert('我是第二个按钮');
    })
})

// 等到 DOM 页面加载完成，不包括图片，falsh，css 加载完毕
window.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        alert('我是第三个按钮');
    })
})
```

### 2，调整窗口大小事件

> 如果浏览器窗口大小发生变化，就会触发这个事件

```js
window.onresize = function() {}
window.addEventListener('resize', function() {})
```

- ##### [注意](#) ：

  1. 只要窗口大小发生变化，就会触发这个事件
  2. 我们经常利用这个事件完成响应式布局，`window.innerWidth` 为当前屏幕的宽度

  ```js
  // 当屏幕宽度小于900px div消失
  var div = document.querySelector('div');
  window.addEventListener('resize', function() {
      console.log();
      if (window.innerWidth <= 900) {
          div.style.display = 'none'
      }
  })
  ```

### 3，单次定时器

> `window.setTimeout()` 设置一个定时器，该定时器在定时到期后执行函数

```js
setTimeout(function() {
    console.log('我是一个2秒定时器')
}, 2000)

var timer1 = setTimeout(func1, 1000);
var timer2 = setTimeout(func2, 2000);
var timer3 = setTimeout('func3()', 3000);
```

- ##### [注意](#)：

  1. window 可以省略
  2. 这个调用函数可以直接 **写函数**，或者 **写函数名** 或者 **采用字符串（'函数名'）** 三种形式，第三种不推荐
  3. 延时的**毫秒数默认为0**，如果写，单位是**毫秒**
  4. 定时器有很多，我们要给定时器指定一个**标识符**

#### 案例1：5秒之后隐藏一张图片

```js
var ad_img = document.querySelector('img')
setTimeout(function() {
    ad_img.style.display = 'none'
}, 500
```

### 4，停止单次/重复定时器

> `window.clearTimeout(timeoutID) / clearInterval(timeoutID)` 停止定时器，需要定时器的标识符

```js
// 清除单次定时器
var btn = document.querySelector('button');
var boom = setTimeout(function() {
    alert("boom 爆炸了");
}, 3000)
btn.addEventListener('click', function() {
    clearTimeout(boom);
})


// 清除重复定时器
var btns = document.querySelectorAll('button');
var timer = null; // 先定义一个全局对象，可以被清除
btns[0].addEventListener('click', function() {
    timer = setInterval(function() {
        console.log(666);
    }, 1000)
})
btns[1].addEventListener('click', function() {
    setInterval(function() {
        clearInterval(timer); // 清除定时器
    }, 1000)
})
```

- ##### [注意](#)：

  1. window 可以省略
  2. 里面的参数就是定时器的标识符

### 5，重复定时器

> `window.setInterval` 每隔一段时间执行一次该定时器，前一个定时器只有一次

```js
window.setInterval(function() {
    alert('我隔两秒执行一次');
}, 2000)
```

- ##### [注意](#)

  1. window 可以省略
  2. 这个调用函数可以直接 **写函数**，或者 **写函数名** 或者 **采用字符串（'函数名'）** 三种形式，第三种不推荐
  3. 延时的**毫秒数默认为0**，如果写，单位是**毫秒**

#### 案例2：京东倒计时

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

    a:hover {
        text-decoration: none;
        color: none;
    }

    img {
        border: 0;
    }

    input {
        margin: 100px;
    }

    .seckill-countdown {
        display: block;
        width: 190px;
        height: 260px;
        margin: 20px auto;
        border: 1px solid transparent;
        text-align: center;
        background: url('imgs/seckill.png');
    }

    .cutdown-title {
        margin-top: 31px;
        color: #fff;
        line-height: 45px;
        font-size: 30px;
        font-weight: 700;
    }

    .cutdown-desc {
        margin-top: 90px;
        color: #fff;
        font-size: 14px;
    }

    .cutdown-desc strong {
        font-size: 16px;
        font-weight: 700;
    }

    .countdown-main {
        width: 130px;
        height: 30px;
        margin: 15px auto;
    }

    .countdown-main li {
        float: left;
        width: 30px;
        height: 30px;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        line-height: 30px;
        background-color: #000;
    }

    .countdown-main li:nth-child(-n+2) {
        position: relative;
        margin-right: 20px;
    }

    .countdown-main li:nth-child(-n+2)::after {
        position: absolute;
        right: -20px;
        content: ':';
        width: 20px;
        height: 100%;
        color: #fff;
        font-size: 25px;
        font-weight: 500;
        text-align: center;
        line-height: 30px;
    }

    .user_time {
        box-sizing: border-box;
        display: block;
        width: 150px;
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        outline: none;
        border: 2px solid #DF281F;
        margin: 100px auto 0;
    }
</style>
</head>

<body>
    <input type="text" class="user_time">
    <a href="" class="seckill-countdown">
        <div class="cutdown-title">
            到时沙漏
        </div>
        <div class="cutdown-desc">
            <strong>12:00</strong> 点 倒计时
        </div>
        <ul class="countdown-main">
            <li class="countdown-hour">00</li>
            <li class="countdown-mintue">11</li>
            <li class="countdown-second">22</li>
        </ul>
    </a>
    <script>
        // var time = prompt('请输入将来的时间');
        var time = '24:00:00';
        var cutdown_child = document.querySelector('.countdown-main').children;
        var user_time_ipt = document.querySelector('.user_time');
        var cutdown_desc = document.querySelector('.cutdown-desc strong');
        document.addEventListener('keyup', function(e) {
            console.log(e.keyCode);
            if (e.keyCode == 17) {
                user_time_ipt.focus();
            }
            if (e.keyCode == 13) {
                user_time_ipt.blur();
                if (user_time_ipt.value) {
                    time = user_time_ipt.value;
                    cutdown_desc.innerHTML = time.slice(0, 5);
                }
            }
        })

        cutdown_desc.innerHTML = time.slice(0, 5);
        function countDown() {
            var now = +new Date();
            var future = +new Date('2019-11-5 ' + time);
            var times = (future - now) / 1000; // 当前时间是剩余时间的秒数
            var h = parseInt(times / 60 / 60 % 24); // 时
            h = h < 10 ? '0' + h : h;
            cutdown_child[0].innerHTML = h;
            var m = parseInt(times / 60 % 60); // 分
            m = m < 10 ? '0' + m : m;
            cutdown_child[1].innerHTML = m;
            var s = parseInt(times % 60); // 秒
            s = s < 10 ? '0' + s : s;
            cutdown_child[2].innerHTML = s;
        }
        setInterval(countDown, 1000)
        countDown()	// 先执行一次这个函数，不然会有bug，因为定时器是在1s后才执行的，刚加载页面没有
    </script>
</body>
```

![1572914106663](/assets/htmlcssAssets.assets/27.gif)

#### 案例3：发送验证码等待

```js
var btn = document.querySelector('button');
btn.addEventListener('click', function() {
    var second = 4;
    this.disabled = true; // 点击后按钮警用
    btn.innerHTML = '5秒'
    var timer = setInterval(function() {
        if (second == 0) {
            // 时间到，复原按钮和清除定时器
            clearInterval(timer);
            btn.disabled = false;
            btn.innerHTML = '发送'
        } else {
            // 时间没到，一直倒时
            btn.innerHTML = second + '秒';
            second--;
        }
    }, 1000)
    })
```

![](/assets/htmlcssAssets.assets/28.gif)

### 6，this指向问题

> 方法属于谁的就指向谁，定时器方法属于window对象，所以this指向它，

1. 全局作用域或普通函数中，this指向的是全局对象window

   - （注意定时器）里面的this也指向window，因为`setTimout`和`setInterval`都属于window，BOM的对象

   ```js
   console.log(this);
   
   function fn() {
       console.log(this);
   }
   setInterval(function() {
       console.log(this);
   }, 1000)
   ```

2. 方法中调用谁就指向谁

   ```js
   var a = {
       six: function() {
           console.log(this);
       }
   }
   a.six()
   // 这里指向a这个对象
   
   var btn = document.querySelector('button');
   btn.addEventListener('click', function() {
       console.log(this);
   })
   // this指向按这个按钮的函数
   ```

3. 构造函数中指向构造函数实例

   ```js
   function fn() {
       console.log(this);
   }
   
   var a = new fn();
   // 这里的this指向a
   ```

### 7，JS的执行机制

> 原先的JS是单线程的，H5提出了异步并支持异步，并用事件循环来处理

- ##### [同步任务](#)

  同步任务都在**主线程**上执行，形成一个**执行线**

- ##### [异步任务](#)

  JS 的异步是通过 回调函数 实现的

  一般而言，异步任务为一下三种

  1. 普通事件，如 **click**， **resize** 等
  2. 资源加载，如 **load**，**error** 等
  3. 定时器，包括 **setTimeout**，**setInterval**

  异步任务相关回调韩式是放在任务队列中（也称消息队列中，使用多线程执行）

  ![1572947297713](/assets/htmlcssAssets.assets/1572947297713.png)

- ##### [执行顺序](#)

  1. 先执行执行线中的同步任务

  2. 异步任务（**回调函数**）放入任务队列中

  3. 一旦执行线中的**同步任务执行完毕**，系统就会**依次顺序读取任务队列中的异步任务**，于是被读取的异步任务**结束等待状态**，进入执行线**开始执行任务**

     ![1572947178675](/assets/htmlcssAssets.assets/1572947178675.png)
  
     ![1573097278795](/assets/htmlcssAssets.assets/1573097278795.png)
  
  

### 8，location对象

![1572965223494](/assets/htmlcssAssets.assets/1572965223494.png)

> `window.location` 对象可以获取 [bom](#) 的 [url](#) 的对象的属性，可以写成 `lication`

```js
console.log(window.location.href); // 获取浏览器location对象的href
location.href = 'https//www.baidu.com'	// 浏览器跳转到百度
console.log(location.search); // 获取url路径参数
```

![1572965813048](/assets/htmlcssAssets.assets/1572965813048.png)

- ##### [重点](#)：记住 href 和 search

### 9，navigator对象

> 该对象包含了有关浏览器对象的信息，他有很多属性，最常用的是User-agent也就是用户代理
>
> 他能让我们识别用户用什么设备打开的网页，我们前端人员可以通过这个来让用户跳转页面

```js
<script>
    if (window.navigator.userAgent.match(/(phone|pad|pod|iphone|ipod|ios|ipad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser}BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        window.location.href = '../京东移动端/index.html'	// 手机端
    } else {
        window.location.href = ''	// 电脑端
    }
</script>
```

- 这段代码能够帮助我们识别用户是用手机还是电脑访问，我们进行跳转

### 10，history

> history对象能够让我们和浏览器的历史记录交互，进行页面的前进和后退

![1573002830160](/assets/htmlcssAssets.assets/1573002830160.png)

```js
var btn = document.querySelector('button');
btn.addEventListener('click', function() {
    history.forward();
    // history.go(1)    // 向历史记录前进一位
})

var btn = document.querySelector('button');
btn.addEventListener('click', function() {
    history.back();
})
```

## 网页特效

### 所有值client offset总结

pageX: 页面X坐标位置
 pageY: 页面Y坐标位置

screenX: 屏幕X坐标位置
 screenY: 屏幕Y坐标位置

clientX: 鼠标的坐标到页面左侧的距离
 clientY: 鼠标的坐标到页面顶部的距离

clientWidth：可视区域的宽度
 clientHeight：可视区域的高度

offsetX：鼠标坐标到元素的左侧的距离
 offsetY：鼠标坐标到元素的顶部的距离

offsetLeft： 该元素外边框距离包含元素内边框左侧的距离
 offsetTop：该元素外边框距离包含元素内边框顶部的距离

offsetWidth: width + padding-left + padding-right + border-left + border-right
 offsetHeight: height + padding-top + padding-bottom + border-top + border-bottom

offsetParent: 包含元素
 可以通过定位改变包含元素

### 1，元素偏移量offset系列

> offset 翻译过来就是偏移量的意思，我们使用offset系列相关属性可以动态得到该元素的位置，大小

- 获取元素距离带有定位父元素的位置（**无定位父级则以body**为主）

- 获得元素**自身的大小**（宽度和高度），**动态的获取**

- 注意：返回的数值都不带单位

  ![1573004022226](/assets/htmlcssAssets.assets/1573004022226.png)

- ##### [示例](#)

  ```js
  var father = document.querySelector('.father');
  var son = document.querySelector('.son');
  console.log(son.offsetParent); // 返回带有定位的父级，否则为bodys
  console.log(son.offsetTop); // 返回距离定位父级的顶部距离
  console.log(son.offsetLeft); // 返回距离定位父级的左部距离
  console.log(son.offsetWidth); // 返回自身的宽度,包含padding，border撑开的盒子的部分
  console.log(son.offsetHeight); // 返回自身的高度
  ```

  

### 2，offset和style.width区别

- ##### offset

  1. 可以获得任意样式表中的值

  2. 获得的值是没有单位的

  3. offsetWidth 包含 padding + border + width

  4. 获取的值是**只读属性**！

     总结：`获取元素大小位置，用offset`

- ##### style

  1. `只能获取行内属性`，就是写在标签里面的属性

  2. 获得的是带有单位的字符串

  3. 获得的值不包含padding和border的值

  4. 是可读可写属性，能获取也能赋值

     总结：`更改元素的值，使用style更改`

```html
<body>
    <div class="father">
        <div class="son" style="width: 100px; height: 100px;"></div>
    </div>

    <script>
        var father = document.querySelector('.father');
        var son = document.querySelector('.son');
        console.log(son.style.width);
        console.log(father.offsetWidth);
    </script>
</body>
```

![1573005451285](/assets/htmlcssAssets.assets/1573005451285.png)

#### 案例4：鼠标在盒子中的位置

![1573010305373](/assets/htmlcssAssets.assets/1573010305373.png)

```js
var father = document.querySelector('.father');
father.addEventListener('click', function(e) {
    console.log('在盒子中x的坐标为' + (e.pageX - this.offsetLeft) + 'px');
    console.log('在盒子中x的坐标为' + (e.pageY - this.offsetTop) + 'px');
})
```

#### 案例6：迷糊框拖拽效果

> 原理：鼠标点击，鼠标移动(元素跟着鼠标走)，鼠标松开

- ##### [重难点](#)

  这里的`pageX - elenemt.offsetLeft`或者`pageY - elenemt.offsetTop`有时候减出来的是负值，那是因为有`translate`的结果，这个属性会改变元素的位置，但是只是灵魂出窍，`offsetTop`的值还是依据原来的在文档流占位置的那个躯壳，但是这个属性不会影响我们拖拽元素，在这里提一下，**并无大碍**，

  - > `我们在拖拽的时候元素重新定位自动也会带上translate的属性，所以不用担心`

  ![1573096024951](/assets/htmlcssAssets.assets/1573096024951.png)
  
  ![1573096212716](/assets/htmlcssAssets.assets/1573096212716.png)

```html
<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    #login {
        display: block;
        width: 400px;
        height: 200px;
        color: gold;
        background-color: #000;
        line-height: 200px;
        font-size: 20px;
        margin: 20px auto;
        text-align: center;
        text-decoration: none;
    }

    .login_block {
        display: none;
        position: absolute;
        top: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, .6);
    }

    .login_form {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 730px;
        height: 400px;
        color: #272321;
        font-size: 17px;
        font-weight: 540;
        background-color: #fff;
        overflow: hidden;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 20px #ddd;
    }

    .login_form p {
        margin-bottom: 25px;
    }

    .login_form p label {
        display: inline-block;
        width: 135px;
        height: 55px;
        line-height: 55px;
        text-align: right;
    }

    .login_form p input {
        width: 500px;
        height: 55px;
        padding-left: 10px;
        font-size: 15px;
        border: 1px solid #F2F3F2;
    }

    .title {
        height: 90px;
        font-size: 20px;
        padding-top: 10px;
        text-align: center;
        line-height: 90px;
        cursor: move;
    }

    .sumbit {
        display: block;
        width: 350px;
        height: 60px;
        margin: 45px auto 0;
        background-color: #fff;
        border: 1px solid #F2F3F2;
    }

    .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 150px;
        height: 150px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #F2F3F2;
        border-radius: 100%;
        transform: translate(47%, -47%);
    }

    .close::after {
        position: absolute;
        left: 30px;
        bottom: 33px;
        content: '关闭';
        color: black;
    }
</style>
</head>

<body>
    <a href="javascript:;" id="login">点击我去登录</a>
    <div class="login_block">
        <form action="" class="login_form">
            <div class="title">登录会员</div>
            <p><label for="username">用户名：</label><input type="text" placeholder="请输入用户名" name="username" id="username"></p>
            <p><label for="password">登陆密码：</label><input type="password" placeholder="请输入登录密码" name="password" id="password"></p>
            <input type="submit" value="登录会员" class="sumbit">
            <a href="javascript:;" class="close"></a>
        </form>
    </div>
    <script>
        //获取元素
        var login_block = document.querySelector('.login_block')
        var close = document.querySelector('.close');
        var login = document.querySelector('#login');
        var login_form = document.querySelector('.login_form');
        var title = document.querySelector('.title');

        // 遮罩层随着页面变化而变化大小
        function w_h() {
            login_block.style.width = window.innerWidth + 'px';
            login_block.style.height = window.innerHeight + 'px';
        }
        window.addEventListener('resize', w_h)
        w_h();

        // 点击关闭按钮关闭登录页面
        close.addEventListener('click', function() {
            login_block.style.display = 'none';
        })

        // 点击登录按钮弹出登录框
        login.addEventListener('click', function() {
            login_block.style.display = 'block';
        })

        // 拖拽效果开始
        // (1),当我们鼠标按下，获得鼠标在盒子内的坐标

        title.addEventListener('mousedown', function(e) {
            var x = e.pageX - login_form.offsetLeft;
            var y = e.pageY - login_form.offsetTop;
            document.addEventListener('mousemove', move);

            function move(e) {
                login_form.style.left = e.pageX - x + 'px';
                login_form.style.top = e.pageY - y + 'px';
            }

            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', move)   
            })
        })
    </script>
</body>
```

![29](/assets/htmlcssAssets.assets/29.gif)

```html
<body>
    <div class="one"></div>

    <script>
        var one = document.querySelector('.one');
        one.addEventListener('mousedown', function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            document.addEventListener('mousemove', move);

            function move(e) {
                one.style.left = e.pageX - x + 'px';
                one.style.top = e.pageY - y + 'px';

            }
            this.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', move)
            })
        })
    </script>
</body>
```

![29](/assets/htmlcssAssets.assets/30.gif)

#### 案例5：京东放大镜

- ##### [案例分析](#)；

  1. 首先需要两个盒子，一个用于观察小图，一个用于观察大图，都需要定位

  2. 鼠标经过小图，遮罩层和大图片盒子显示，离开就隐藏

  3. 先求出鼠标在小图片内的坐标（前面有讲），把 top 和 left 值给遮罩层，遮罩层按父级定位

  4. 遮罩层移动，大盒子跟着移动，并且移动的像素为等比例关系

     `大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离`

     ```html
     <div class="preview_img">
         <img src="upload/b3.png" alt="">
         <div class="mask"></div>
         <div class="big">
             <img src="upload/b3.png" alt="" class="bigImg">
         </div>
     </div>
     ```
     
     ```js
     window.addEventListener("load", function() {
       var mask = document.querySelector(".mask");
       var big = document.querySelector(".big");
       var preview_img = document.querySelector(".preview_img");
     
       preview_img.addEventListener("mousemove", function(e) {
         // 鼠标经过显示 遮罩层 和 大图片 这两个盒子
         mask.style.display = "block";
         big.style.display = "block";
     
         // 鼠标在图片内移动，遮罩层跟着走,x和y分别是鼠标在盒子内的距离
         var x = e.pageX - this.offsetLeft;
         var y = e.pageY - this.offsetTop;
     
         // 遮罩层距离左边的left值
         mask_x = x - mask.offsetWidth / 2;
     
         // 因为遮罩层是正方形，宽度和高度相同
         mask_y = y - mask.offsetWidth / 2;
     
         // mask 在盒子内移动的最大距离，超出这个值就等于这个值，也是遮挡层最大移动距离
         maxkMax = preview_img.offsetWidth - mask.offsetWidth;
     
         if (mask_x < 0) {
           mask_x = 0;
         } else if (mask_x > maxkMax) {
           mask_x = maxkMax;
         }
     
         if (mask_y < 0) {
           mask_y = 0;
         } else if (mask_y > maxkMax) {
           mask_y = maxkMax;
         }
     
         // 遮罩层开始i移动
         mask.style.left = mask_x + "px";
         mask.style.top = mask_y + "px";
           
           
     	// 大图片开始移动
         // 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
         var bigImg = document.querySelector(".bigImg");
         // 大图片最大移动距离(大图片宽度 - 大盒子宽度)
         var bingMax = bigImg.offsetWidth - big.offsetWidth;
         // 大图片移动的left值和top值
         var bigX = (mask_x * bingMax) / maxkMax;
         var bigY = (mask_y * bingMax) / maxkMax;
     
         // 大图片移动，这里得到的bigX和bigY的值是负值，要取正
         bigImg.style.left = -bigX + "px";
         bigImg.style.top = -bigY + "px";
       });
     
       preview_img.addEventListener("mouseout", function() {
         // 鼠标经过隐藏 遮罩层 和 大图片 这两个盒子
         mask.style.display = "none";
         big.style.display = "none";
       });
     });
     ```
  
  ![31](/assets/htmlcssAssets.assets/31.gif)

### 3，元素可视区client系列

> client 翻译过来就是客户端，我们使用他来获得元素可视区的相关信息，可以动态的带元素边框，大小

- **client** 和 **offset** 最大的区别就是 **client** 不包含边框

- **client** 能获得边框的大小

  ![1573377571041](/assets/htmlcssAssets.assets/1573377571041.png)

### 4，flexible.js源码分析

1. ###### 立即执行函数，不需要调用，立即执行

   [优点](#)：独立创建了一个作用域，`里面所有的变量都是局部变量，不会有命名冲突`

   ```js
   // 两种写法 (function() {})(); 或 (function() {}())
   
   // 1. 写法一
   (function(num) {
       console.log('我被执行了');
       console.log('输出传入的num：', num);
   })(10);
   // 2. 写法二
   (function(num) {
       console.log('我也被执行了');
       console.log('输出传入的num：', num);
   }(10))
   ```

2. `pageshow` 事件

   > 和 **load** 事件相同，都是在页面刷新以后执行

   两者最大的区别就是：在火狐浏览器中，**有页面缓存**

   - 如果前往一个页面之后用返回按钮返回，不会触发 `load` 这个事件

   - 但是 `pageshow` 这个事件依旧会触发

     ![1573381964090](/assets/htmlcssAssets.assets/1573381964090.png)

   ```js
   window.addEventListener('pageshow', function (e) {
       // e.persisted返回的是true，就是如果这个页面是从缓存取过来的页面，也需要重新计算一下rem的值
       // 照顾的各个浏览器
       if (e.persisted) {
           setRemUnit()
       }
   })
   ```

3. 源码分析

   ```js
     (function flexible(window, document) {
   
       // 1. 获取html对象
       var docEl = document.documentElement
       // 2. dpr，就是我们俗称的物理像素比，PC端为1 移动端为2
       var dpr = window.devicePixelRatio || 1
   
       // adjust body font size 设置body的字体大小
       function setBodyFontSize() {
         if (document.body) {
           // 如果页面中有 body 这个元素，就设置 body 的字体大小
           document.body.style.fontSize = (12 * dpr) + 'px'
         } else {
           // 如果页面没有加载好，则等到DOM加载好，再执行设置body字体大小
           document.addEventListener('DOMContentLoaded', setBodyFontSize)
         }
       }
       // 页面打开，先执行这个函数这只body的字体大小
       setBodyFontSize();
   
       // 设置html元素字体大小，移动端平均分为10等分
       // set 1rem = viewWidth / 10
       function setRemUnit() {
         var rem = docEl.clientWidth / 10
         docEl.style.fontSize = rem + 'px'
       }
   
       setRemUnit()
   
       // reset rem unit on page resize 当页面尺寸大小发生变化，重新设置rem大小
       window.addEventListener('resize', setRemUnit)
       // pageshow 是我们重新加载页面触发的事件
       window.addEventListener('pageshow', function (e) {
        // e.persisted返回的是true，就是如果这个页面是从缓存取过来的页面，也需要重新计算一下rem的值
         // 照顾的各个浏览器
         if (e.persisted) {
           setRemUnit()
         }
       })
   
       // detect 0.5px supports 让有些移动端的浏览器支持0.5像素的写法
       if (dpr >= 2) {
         var fakeBody = document.createElement('body')
         var testElement = document.createElement('div')
         testElement.style.border = '.5px solid transparent'
         fakeBody.appendChild(testElement)
         docEl.appendChild(fakeBody)
         if (testElement.offsetHeight === 1) {
           docEl.classList.add('hairlines')
         }
         docEl.removeChild(fakeBody)
       }
     }(window, document))
   ```

### 5，元素滚动sroll系列

> `sroll` 的值是实际内容的高度

![1573382713008](/assets/htmlcssAssets.assets/1573382713008.png)

![1573382827368](/assets/htmlcssAssets.assets/1573382827368.png)

```html
<style>
    * {
        padding: 0;
        margin: 0;
    }

    div {
        width: 100px;
        height: 100px;
        background-color: red;
        overflow: auto;
    }
</style>
</head>

<body>
    <div>
        我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div我是div
    </div>
    <script>
        var div = document.querySelector('div');
        div.addEventListener('scroll', function() {
            // div 头部被卷去的top值
            console.log('scrollTop的值', this.scrollTop);
        })
        // 盒子实际内容的高度，溢出的也算
        console.log('盒子的实际高度', div.scrollHeight);
        // 盒子实际内容的宽度，溢出的也算
        console.log('盒子的实际宽度', div.scrollWidth);
    </script>
</body>
```

![1573384402672](/assets/htmlcssAssets.assets/1573384402672.png)

#### 案例7：仿淘宝侧边栏

1. 原先侧边栏是绝对定位

2. 当页面滚动到一定位置时，侧边栏改为固定定位

3. 页面继续滚动，会让 返回顶部 现实出来

4. 注意，页面被卷去的头部，需要通过 `window.pageYOffset` 来获得，被卷去的左值 `window.pageXOffset` 获得

   ![1573398428514](/assets/htmlcssAssets.assets/1573398428514.png)

```html
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        
        .w {
            width: 1200px;
            margin: 0 auto;
        }
        
        .nav {
            height: 300px;
            background-color: blueviolet;
            margin-bottom: 15px;
        }
        
        .banner {
            position: relative;
            height: 600px;
            background-color: burlywood;
            margin-bottom: 15px;
        }
        
        .side-nav {
            position: absolute;
            top: 70%;
            left: calc(50% + 600px);
            width: 100px;
            height: 200px;
            background-color: red;
        }
        
        .gotop {
            display: none;
            height: 100px;
            background-color: yellow;
            text-align: center;
            line-height: 100px;
            text-decoration: none;
        }
        
        .container {
            height: 1200px;
            background-color: coral;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>
    <div class="nav w">nav部分</div>
    <div class="banner w">banner部分
    </div>
    <div class="side-nav">
        side_nav
        <a href="" class="gotop">回到顶部</a>
    </div>
    <div class="container w">container部分</div>
    <script>
        var nav = document.querySelector('.nav');
        var banner = document.querySelector('.banner');
        var side_nav = document.querySelector('.side-nav');
        var container = document.querySelector('.container');
        var gotop = document.querySelector('.gotop');
        var fixedTop = side_nav.offsetTop - banner.offsetTop;
        document.addEventListener('scroll', function() {
            // 可视窗口被卷去的值
            win_scrollTop = window.pageYOffset;
            if (win_scrollTop >= banner.offsetTop) {
                side_nav.style.position = 'fixed';
                side_nav.style.top = fixedTop + 'px';
            } else {
                side_nav.style.position = 'absolute';
                side_nav.style.top = '70%';
            }

            if (win_scrollTop >= container.offsetTop) {
                gotop.style.display = 'block';
            } else {
                gotop.style.display = 'none';
            }
        })
    </script>
</body>
```

![1573398428514](/assets/htmlcssAssets.assets/32.gif)

#### 案例7(改)：添加回到顶部功能

```js
// 动画函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {
            clearInterval(obj.timer)
            callback && callback()
        } else {
            window.scroll(0, window.pageYOffset + step);
        }
    }, 15)
}

gotop.addEventListener('click', function() {
    // 当我们点击返回顶部，就让窗口滚动会顶部，window.srcoll(x, y)
    // 因为是窗口滚动，所以对象是window，到达顶部为0
    animate(window, 0);
})
```

![](/assets/htmlcssAssets.assets/40.gif)

### 6，三大系列总结

![1573438719219](/assets/htmlcssAssets.assets/1573438719219.png)

**offset** 系列和其他两者最大的区别就是 **offset** 获得的不包括边框，其他两者包含

![1573438845487](/assets/htmlcssAssets.assets/1573438845487.png)

- offset系列经常用于获得`元素的位置`
- client 经常用于获取`元素大小` 
- scroll 经常用于获取`滚动距离`
- 注意：页面滚动的距离通过 **window.pageXOffset** 获得

### 7，mouseover和mouseenter区别

> 两者都是鼠标经过时触发的事件，前者会冒泡(经过子盒子，事件会向上)，后者不会

```html
<body>
    <div class="one">
        <div><section></section></div>
    </div>
    <script>
        var one = document.querySelector('.one');
        one.addEventListener('mouseover', function() {
            console.log('mouseover事件');
        })
        one.addEventListener('mouseenter', function() {
            console.log('mouseenter事件')
        })
    </script>
</body>
```

![1573440134335](/assets/htmlcssAssets.assets/1573440134335.png)

### 8，动画原理

> 通过定时器 `setInterval()` 不断地移动盒子

实现步骤：

1. 获得当前盒子位置

2. 让盒子在当前位置上加上1个移动距离

3. 利用定时器不断重复这个操作

4. 加一个定时器结束条件

5. 注意：要给元素添加定位

6. 不要使用 style.left 获取距离，他只能获取行内属性，而且不是数字，使用 offsetLeft

   ```html
   <body>
       <div class="one" style="left: 20px;">
       </div>
       <script>
           // 1. 获得当前盒子位置
           // 2. 让盒子在当前位置上加上1个移动距离
           // 3. 利用定时器不断重复这个操作
           // 4. 加一个定时器结束条件
           // 5. 注意：要给元素添加定位
           // 6. 不要使用style.width获取，他只能获取行内属性，而且不是数字
           var one = document.querySelector('.one');
           var time = setInterval(function() {
               one.style.left = one.offsetLeft + 1 + 'px';
               // 停止动画，本质是停止定时器
               if (one.offsetLeft > 700) {
                   clearInterval(time)
               }
           }, 10)
       </script>
   </body>
   ```

   ![1573440134335](/assets/htmlcssAssets.assets/33.gif)

### 9，动画函数的简单封装

> 把动画封装成一个函数，传入两个值 target 和 element 两个元素

- 使用对象属性绑定的方式绑定属性！！！

```html
<body>
    <div class="one">
    </div>
    <div class="two">
    </div>
    <script>
        var one = document.querySelector('.one');
        var two = document.querySelector('.two');

        // 简单动画函数封装
        function animate(obj, target) {
            // 给不同元素指定不同的定时器，以属性的形式绑定
            obj.timer = setInterval(function() {
                obj.style.left = obj.offsetLeft + 5 + 'px';
                // 停止动画，本质是停止定时器
                if (obj.offsetLeft >= target) {
                    clearInterval(obj.timer)
                }
            }, 10)
        }
        
        animate(one, 500);
        animate(two, 200)
    </script>
</body>
```

![1573440134335](/assets/htmlcssAssets.assets/34.gif)

#### 案例8：点击按钮开始动画

> 点击按钮

```js
var one = document.querySelector('.one');
var two = document.querySelector('.two');
var button = document.querySelector('button');

// 简单动画函数封装
function animate(obj, target) {
    // 给不同元素指定不同的定时器，以属性的形式绑定
    // 当我们不断的点击按钮，打开的定时器会越来越多，行走的越来越快
    // 解决的办法就是先清除以前的定时器，再创建新的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 停止动画，本质是停止定时器
        if (obj.offsetLeft >= target) {
            clearInterval(obj.timer)
        } else {
            obj.style.left = obj.offsetLeft + 5 + 'px';
        }
    }, 10)
}

animate(one, 500);

button.addEventListener('click', function() {
    animate(two, 500);
})
```

![1573440134335](/assets/htmlcssAssets.assets/35.gif)

### 10，缓动动画原理

1. 让盒子每次移动的距离慢慢变小，速度就会慢慢慢下来

2. 核心算法：（目标 - 现在的位置）/10 作为每次移动的距离步长

3. 停止的条件是：让目前的盒子位置等于目标位置就停止定时器

   ```html
   <script>
       var two = document.querySelector('.two');
       var btn_500 = document.querySelector('.button-500');
       var btn_800 = document.querySelector('.button-800');
   
       // 简单动画函数封装
       function animate(obj, target) {
           // 给不同元素指定不同的定时器，以属性的形式绑定
           // 当我们不断的点击按钮，打开的定时器会越来越多，行走的越来越快
           // 解决的办法就是先清除以前的定时器，再创建新的定时器
           clearInterval(obj.timer);
           obj.timer = setInterval(function() {
               // 步长值写到定时器里面，每次定时器都会计算step值
               // 步长值改为整数，不要出现小数的问题，正往上取大，负往小取小，能够来回倒退
               // var step = Math.ceil((target - obj.offsetLeft) / 10);
               var step = (target - obj.offsetLeft) / 10;
               step = step > 0 ? Math.ceil(step) : Math.floor(step);
               if (obj.offsetLeft == target) {
                   // 停止动画，本质是停止定时器
                   clearInterval(obj.timer)
               } else {
                   // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的位置）/10
                   obj.style.left = obj.offsetLeft + step + 'px';
               }
           }, 15)
       }
   
       btn_500.addEventListener('click', function() {
           animate(two, 500);
       })
   
       btn_800.addEventListener('click', function() {
           animate(two, 800);
       })
   </script>
   </body>
   ```

   ![1573440134335](/assets/htmlcssAssets.assets/36.gif)

### 11，给动画添加回调函数

> 回调函数原理：函数可以作为一个参数，将这个参数存入另外一个函数，在执行某一步操作后执行函数

```html
<body>
    <button class="button-300">前往300处</button>
    <button class="button-500">前往500处</button>
    <button class="button-800">前往800处</button>
    <div class="two">
    </div>

    <script>
        var two = document.querySelector('.two');
        var btn_300 = document.querySelector('.button-300');

        // 简单动画函数封装
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer)
                    // 回调函数写到定时器结束里面，如果有就调用
                    if (callback) {
                        callback(obj)
                    }
                } else {
                    obj.style.left = obj.offsetLeft + step + 'px';
                }
            }, 15)
        }

        btn_300.addEventListener('click', function() {
            animate(two, 300,
                    function(obj) {
                btn_300.
                obj.style.backgroundColor = 'red';
            });
        })
    </script>
</body>
```

#### 案例9：左右箭头案例

```html
<body>
    <div class="sidenav">
        <a href="" class="sidenav-item">←</a>
        <a href="" class="sidenav-item-slider">点击反馈</a>
    </div>
    <script>
        var sidenav = document.querySelector('.sidenav')
        var sidenav_item = document.querySelector('.sidenav-item');
        var sidenav_item_slider = document.querySelector('.sidenav-item-slider');

        sidenav.addEventListener('mouseenter', function() {
            animate(sidenav_item_slider, -300, function() {
                sidenav_item.innerHTML = '→';
            });
        })
        sidenav.addEventListener('mouseleave', function() {
            animate(sidenav_item_slider, 0, function() {
                sidenav_item.innerHTML = '←';
            });
        })
    </script>
</body>
```

![37](/assets/htmlcssAssets.assets/37.gif)

#### 案例10：筋斗云案例

```html
<style>
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
    }

    ul,
    ol {
        list-style: none;
    }

    body {
        background-color: black;
    }

    .nav {
        position: relative;
        width: 900px;
        height: 42px;
        margin: 100px auto;
        background-color: #fff;
        border-radius: 5px;
    }

    .main-box {
        position: relative;
        height: 100%;
    }

    .main-box li {
        float: left;
        width: 83px;
        height: 42px;
        line-height: 42px;
    }

    .main-box li::after {
        position: absolute;
        content: '';
        right: 3px;
        top: 55%;
        width: 32px;
        height: 32px;
        background: url('../imgs/rss.png');
        transform: translateY(-50%);
    }

    .main-box li a {
        display: block;
        height: 100%;
        color: black;
        text-align: center;
    }

    .cloud {
        position: absolute;
        top: 0;
        width: 83px;
        height: 42px;
        background: url('../imgs/cloud.gif');
    }
</style>

<div class="nav">
    <div class="cloud">
    </div>
    <ul class="main-box">
        <li><a href="javascript:;">首页新闻</a></li>
        <li><a href="javascript:;">师资力量</a></li>
        <li><a href="javascript:;">活动策划</a></li>
        <li><a href="javascript:;">企业文化</a></li>
        <li><a href="javascript:;">招聘信息</a></li>
        <li><a href="javascript:;">公司简介</a></li>
        <li><a href="javascript:;">我是佩奇</a></li>
        <li><a href="javascript:;">啥是佩奇</a></li>
    </ul>
</div>

<script>
    // 动画
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer)
                // 回调函数写到定时器结束里面，如果有就调用
                if (callback) {
                    callback(obj)
                }
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 15)
    }

    // 鼠标经过文字，文字变成白色，并且云跟着li
    ul = document.querySelector('.main-box');
    // current这个变量用来存放鼠标点击之后云需要走的距离，默认回到0
    var current = 0;
    var cloud = document.querySelector('.cloud');
    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].setAttribute('data-index', i)
    }
    ul.addEventListener('mouseout', function(e) {
        e.target.style.color = '#000';
        // 鼠标移开current的值
        animate(cloud, current);
    })
    ul.addEventListener('mouseover', function(e) {
        e.target.style.color = '#fff';
        var index = e.target.parentNode.getAttribute('data-index');
        index ? animate(cloud, index * cloud.offsetWidth) : null
        e.target.addEventListener('click', function(e) {
            // 用户点击了某个小li之后就把移动的位置存起来，鼠标离开时触发
            // 如果index存在，current的值改变，不存在就为原来的值
            current = index ? index * cloud.offsetWidth : current;
        })
    })
</script>
```

![37](/assets/htmlcssAssets.assets/41.gif)

## 网页轮播图

> 轮播图也称焦点图，是网页中比较常见的特效

功能需求：

1. 鼠标经过轮播图，左右按钮显示，离开时隐藏按钮
2. 点击右侧按钮依次，图片往左播放一张，右侧同理
3. 图片播放的同事，下面小圈圈模块跟随一起变化
4. 点击小圈圈，可以播放对应的图片
5. 鼠标不经过轮播图，轮播图也会自动播放图片
6. 鼠标经过轮播图，停止自动播放
7. `无缝滚动`：把第一张图片克隆一份放到最后面，当放到最后面一张克隆图再往前到第二张图的时候瞬间left的值为0，因为计算机执行速度非常快我们看不到他瞬间回到开头

### 1，轮廓搭建

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

    .focus {
        position: relative;
        margin: 100px auto;
        width: 730px;
        height: 450px;
        background-color: red;
        overflow: hidden;
    }

    .focus .splider_list {
        position: relative;
        width: 800%;
        height: 100%;
    }

    .focus .splider_list li {
        float: left;
    }

    .focus .splider_list li a {
        display: block;
        width: 730px;
        height: 450px;
    }

    .focus .splider_list li img {
        width: 100%;
        height: 100%;
    }

    .splider_dots {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }

    .splider_dots li {
        float: left;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-color: gold;
        border-radius: 50%;
        box-sizing: border-box;
        cursor: pointer;
    }

    .current {
        border: 3px solid black;
    }

    .arrow {
        display: none;
        position: absolute;
        top: 50%;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: red;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .left {
        left: 0;
    }

    .right {
        right: 0;
    }

    .arrow:hover {
        color: gold;
        background-color: #000;
    }
</style>
</head>

<body>
    <div class="focus">
        <ul class="splider_list">
            <li>
                <a href="`"><img src="./img/banner1.jpg" alt=""></a>
            </li>
            <li>
                <a href="`"><img src="./img/banner2.jpg" alt=""></a>
            </li>
            <li>
                <a href="`"><img src="./img/banner3.jpg" alt=""></a>
            </li>
            <li>
                <a href="`"><img src="./img/banner4.jpg" alt=""></a>
            </li>
        </ul>
        <ul class="splider_dots">
        </ul>
        <div class="arrow left"> ← </div>
        <div class="arrow right"> → </div>
    </div>
    <script>
        // animate.js 动画
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer)
                    // 回调函数写到定时器结束里面，如果有就调用，短路运算
                    callback && callback();
                } else {
                    obj.style.left = obj.offsetLeft + step + 'px';
                }
            }, 15)
        }
    </script>
</body>

```

1. 最开始不要给小圆点，使用js动态生成，有几张图片生成几个小圆点
2. 本来文件都是应该放在各自的工程文件夹里面，但是为了方便直接放在一个html文件里了

### 2，鼠标经过显示按钮

```js
// 1. 鼠标经过focus，出现左右按钮，离开隐藏
var focus = document.querySelector('.focus');
var left = document.querySelector('.focus .left');
var right = document.querySelector('.focus .right');

focus.addEventListener('mouseover', function() {
    left.style.display = 'block';
    right.style.display = 'block';
})
focus.addEventListener('mouseout', function() {
    left.style.display = 'none';
    right.style.display = 'none';
})
```

### 3，自动根据图片生成li

```js
// 2. 根据图片的数量自动生成li
var splider_list = document.querySelector('.splider_list');
var splider_dots = document.querySelector('.splider_dots');
for (var i = 0; i < splider_list.children.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('data-index', i)
    splider_dots.appendChild(li);
}
```

### 4，点击小圆圈跳转

```js
// 3. 点击最下一排的按钮，按钮变className;
for (var i = 0; i < splider_dots.children.length; i++) {
    splider_dots.children[i].addEventListener('click', function() {
        var index = this.getAttribute('data-index');
        num = index;
        circle = index;
        animate(splider_list, -index * focus.offsetWidth);
        for (var k = 0; k < splider_dots.children.length; k++) {
            splider_dots.children[k].className = '';
        }
        this.className = 'current';
    })
}

// 克隆第一张图片放到ul的最后面，为无缝滑动做准备
var clone_first = document.querySelector('.splider_list').children[0].cloneNode(true);
splider_list.appendChild(clone_first)
```

### 5，点击左右按钮跳转

```js
// 4. 点击右箭头按钮，图片往左走一张，num用来计算图片走多少张的距离
var num = 0;
var circle = 0;
var flag = true
right.addEventListener('click', function() {
    if (flag) {
        flag = false;
        if (num == 4) {
            splider_list.style.left = '0px';
            num = 0;
        }
        num++;
        animate(splider_list, -num * focus.offsetWidth, function() {
            flag = true;
        });

        circle++;
        circle = circle == splider_dots.children.length ? 0 : circle;

        circleChange();
    }
})

// 5. 点击左箭头按钮，图片往右走一张，num用来计算图片走多少张的距离
left.addEventListener('click', function() {
    if (flag) {
        flag = false;
        if (num == 0) {
            num = splider_list.children.length - 1;
            splider_list.style.left = -num * focus.offsetWidth + 'px';
        }
        num--;
        animate(splider_list, -num * focus.offsetWidth, function() {
            flag = true
        });

        circle--;
        circle = circle < 0 ? circle = 3 : circle;
        circleChange();
    }
})

function circleChange() {
    for (var i = 0; i < splider_dots.children.length; i++) {
        splider_dots.children[i].className = '';
    }
    splider_dots.children[circle].className = 'current'
}
```

### 6，自动播放

> 这里的自动播放利用定时器，让js没两秒钟点击一下下一张图片

```js
// 自动播放图片
focus.addEventListener('mouseenter', function() {
    clearInterval(timer);
})
focus.addEventListener('mouseout', function() {
    timer = setInterval(function() {
        right.click()
    }, 2000);
})
var timer = setInterval(function() {
    right.click()
}, 2000);
```

### 7，节流阀

> 为了解决轮播图点击过快，图片飞的很快的问题

![38](/assets/htmlcssAssets.assets/38.gif)

- ##### [解决方案](#)

  设定一个变量，作为开关，最开始给的值为false，当一次动画执行结束之后吧值改为true才能运行

  ```js
  // flag 为节流阀的开关，当用户点击一次之后，节流阀关闭，当当次点击动画结束之后才能使用
  var flag = true
  right.addEventListener('click', function() {
      if (flag) {
          flag = false;
          if (num == 4) {
              splider_list.style.left = '0px';
              num = 0;
          }
          num++;
          animate(splider_list, -num * focus.offsetWidth, function() {
              flag = true;
          });
  
          circle++;
          circle = circle == splider_dots.children.length ? 0 : circle;
  
          circleChange();
      }
  })
  ```

  ![](/assets/htmlcssAssets.assets/39.gif)

## 移动端特效

### 1，手机触屏事件

touch 对象代表了一个触摸点，触摸点可能是一根手指，也可能是一支笔，触屏事件可以相应用户手指

- 常见的触屏事件如下：

  ![1573743753977](/assets/htmlcssAssets.assets/1573743753977.png)

![](/assets/htmlcssAssets.assets/42.gif)

### 2，TouchEvent事件对象

TouchEvent 是一类描述手指在触摸平面（触摸屏，触摸板）的状态变化的事件

touchstart，touchmove，touchend三个事件都有各自的事件对象

![1573784450585](/assets/htmlcssAssets.assets/1573784450585.png)

- **touchend** 是只有 **changeTouches** 事件的，因为手指放开的时候没有在触摸 target对象的手指

#### 案例11：让盒子移动起来

```css
// html代码
div {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
    /* margin: 50px auto; */
}
<div></div>
```

- 方法一：利用手指在盒子内坐标不变的原理

  ```js
  // 方法一: 因为手指在盒子的坐标是不变的，我们可以用原来在pc端内的方法
  // 用手指在dom里面page值减去手指在盒子的内标，就是盒子的left和top值
  div.addEventListener('touchstart', function(e) {
      x = e.targetTouches[0].pageX - this.offsetLeft; // 手指在盒子内的x坐标
      y = e.targetTouches[0].pageY - this.offsetTop;  // 手指在盒子内的y坐标
      this.addEventListener('touchmove', function(e) {
          moveX = e.targetTouches[0].pageX - x;
          moveY = e.targetTouches[0].pageY - y;
          this.style.left = moveX + 'px';
          this.style.top = moveY + 'px';
          // 注意：手指移动也会触发滚动屏幕，所以要在移动盒子的时候要组织屏幕默认行为
          e.preventDefault();
      })
  })
  ```

- 方法二：手指的触摸时的初始位置存起来，在移动的时候触摸位置改变，把改变的值加到盒子的left和top上

  ```html
  <body>
      <div></div>
  
      <script>
          var div = document.querySelector('div');
          var startX = null;
          var startY = null;
          var x = null; // 盒子的初始left值
          var y = null; // 盒子的初始top值
          div.addEventListener('touchstart', function(e) {
              startX = e.touches[0].pageX;
              startY = e.touches[0].pageY;
              x = div.offsetLeft; // 手触摸下去的时候重新计算盒子的left值
              y = div.offsetTop; // 手触摸下去的时候重新计算盒子的top值
          })
          div.addEventListener('touchmove', function(e) {
              moveX = e.touches[0].pageX - startX;
              moveY = e.touches[0].pageY - startY;
              div.style.left = x + moveX + 'px';	// 把重新计算的left值在当前位置上移动的值相加
              div.style.top = y + moveY + 'px';	// 把重新计算的top值在当前位置上移动的值相加
          })
      </script>
  </body>
  ```

  ![](/assets/htmlcssAssets.assets/43.gif)

### 3，手机端轮播图

1. 自动播放功能：

   - 开启定时器

   - 大量使用css3效果，使用 **translateX** 来实现

   - 图片优雅的移动需要添加过渡 **transition** 效果

   - 实现无缝滚动：

     我们需要监听过渡是否完成，否则将不能进行无缝滚动

   ```js
   // 轮播图自动播放
   var w = focus.offsetWidth; // 每次轮播走的距离
   var index = 0;
   var timer = setInterval(function () {
       index++;
       banner.style.transition = 'all .3s'
       var translatex = -index * w;
       banner.style.transform = 'translateX(' + translatex + 'px)';
       banner.addEventListener('transitionend', function () {
           // 无缝滚动
           // 滚到最后一张图片，把索引号改为0，取消过度效果，banner迅速回到原来位置
           if (index >= 3) {
               index = 0;
               // console.log(index);
               // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
               banner.style.transition = 'none';
               // 利用最新的索引号乘以宽度 去滚动图片
               var translatex = -index * w;
               banner.style.transform = 'translateX(' + translatex + 'px)';
           } else if (index < 0) {
               index = 2;
               banner.style.transition = 'none';
               // 利用最新的索引号乘以宽度 去滚动图片
               var translatex = -index * w;
               banner.style.transform = 'translateX(' + translatex + 'px)';
           }
       })
   }, 2000)
   ```

   ![](/assets/htmlcssAssets.assets/44.gif)

   2. 小圆点变化效果

      - 把ul里面带有current类名的元素选出来去掉类名（不需要排他思想）

      - 让当前索引好的小li加上current这个类

      - 但是，需要等到图片的过度效果过去之后再变化

        ```js
        // 2. 小圆点跟随变化效果
        var current = document.querySelector('.splider-point .current');
        current.classList.remove('current');
        splider_point.children[index].classList.add('current');
        ```

   3. 移动端轮播图拖动效果

      - 本质上就是ul跟随着手指再移动，简单来说就是移动端怎么拖动元素
   
        ```js
        // 3. 手指滑动轮播图
        // 触摸元素 touchstart：获得手指初始坐标
        startX = null; // 手指的初始坐标
        moveX = null; // 手指再原来基础上的移动距离
        banner.addEventListener('touchstart', function (e) {
            startX = e.targetTouches[0].pageX;
            clearInterval(timer)
        })
        // 移动手指 touchmove：计算手指的滑动距离，并且移动盒子
        // flag 用来判断用户有没有移动轮播图，如果没有移动就不用多余操作
        var flag = flag;
        banner.addEventListener('touchmove', function (e) {
            moveX = e.targetTouches[0].pageX - startX;
            // 移动盒子：盒子原来的位子 + 手指移动的距离
            // 这里的-index * w就是盒子原来通过translate移动的距离
            var translateX = -index * w + moveX;
            // 手指在拖动的时候是不需要过度效果的，所以在拖动时候要消除
            banner.style.transition = 'none';
            banner.style.transform = 'translateX(' + translateX + 'px)';
            flag = true;
        })
        ```
   
   4. 手指离开轮播图，根据手指拖动大小判断是往前进一张还是往后退一张
   
      ```js
      // 4. 手指离开 根据移动距离去判断是回弹还是播放上一张图片还是下一张图片
      banner.addEventListener('touchend', function () {
          // 如果用户移动了轮播图
          if (flag) {
              // (1) 如果移动距离大于50px我们就播放下一张或者上一张图
              if (Math.abs(moveX) > 50) {
                  // 如果是右滑，就是播放上一张 moveX是正值
                  if (moveX > 0) {
                      index--;
                  } else {
                      // 否则就是左滑，值是负的，往左走图片
                      index++;
                  }
                  var translateX = -index * w;
                  banner.style.transition = 'all .3s';
                  banner.style.transform = 'translateX(' + translateX + 'px)';
              } else {
                  // (2) 如果移动距离小于50xpx我们就回弹
                  var translateX = -index * w;
                  banner.style.transform = 'translateX(' + translateX + 'px)';
              }
      
              // 手指离开时候重新开启定时器
              clearInterval(timer);
              timer = setInterval(function () {
                  index++;
                  banner.style.transition = 'all .3s'
                  var translatex = -index * w;
                  banner.style.transform = 'translateX(' + translatex + 'px)';
              }, 2000)
          }
      })
      ```
   
   #### 完整代码
   
   ```js
   // 1. 图片的自动轮播
           var focus = document.querySelector('.focus')
           var banner = document.querySelector('.banner')
           var point_list = document.querySelector('.point-list')
           var w = focus.offsetWidth; // ul每次轮播要移动的距离
           var index = 0; // 代表图片的index
           var timer = setInterval(function() {
               index++
               hasTransition()
           }, 2000);
   
           // 2. 等到动画结束,执行无缝滚动
           // var img_count = banner.children.length; // 图片的数量
           banner.addEventListener('transitionend', function() {
               if (index >= 3) {
                   index = 0
                   noTransition()
               }
               if (index < 0) {
                   index = 2
                   noTransition()
               }
   
               // 4. 按钮跟随着图片的index值变化，比移动端的排他思想更好用
               var current = document.querySelector('.point-list .current');
               current.classList.remove('current');
               point_list.children[index].classList.add('current')
           })
   
           // 3. 移动端的特殊性，要复制首尾图片分别放置
           var first = banner.children[0].cloneNode(true)
           var last = banner.children[banner.children.length - 1].cloneNode(true)
           banner.appendChild(first)
           banner.insertBefore(last, banner.children[0])
   
           // 5. 鼠标能够拖动轮播图，本质上就是在移动端拖动元素
           var startX = null;
           var moveX = null;
           banner.addEventListener('touchstart', function(e) {
               clearInterval(timer);
               startX = e.targetTouches[0].pageX;
           })
           banner.addEventListener('touchmove', function(e) {
               moveX = e.targetTouches[0].pageX - startX;
               // 我们每次都可以根据index的值来确定轮播图的初始位置
               var translatex = -index * w + moveX;
               banner.style.transition = 'none'
               banner.style.transform = 'translateX(' + translatex + 'px)'
           })
           banner.addEventListener('touchend', function(e) {
               // 根据移动的多少来确认是滚动还是回弹
               // 如果拉动的值大于50，那么松开时候就进行跳转，根据正负前进还是后退
               // 否则就回弹
               function moveWhere() {
                   // 向左滑动
                   if (moveX > 0) {
                       index--;
                       hasTransition()
                   } else {
                       // 向右滑动
                       index++;
                       hasTransition()
                   }
               }
               Math.abs(moveX) > 50 ? moveWhere() : hasTransition()
                   // 重新启动定时器,先清除原先的确保没有
               clearInterval(timer);
               timer = setInterval(function() {
                   index++
                   hasTransition()
               }, 2000);
           })
   
           function hasTransition() {
               var translatex = -index * w
               banner.style.transition = 'all .3s'
               banner.style.transform = 'translateX(' + translatex + 'px)'
           }
   
           function noTransition() {
               var translatex = -index * w
               banner.style.transition = 'none'
               banner.style.transform = 'translateX(' + translatex + 'px)'
           }
   ```
   
   ![](/assets/htmlcssAssets.assets/45.gif)
   
   
   
   

### 4，classList属性

> classList是HTTML5新增的一个属性，返回元素的类名，但是 ie10 以上的版本才支持

```html
<body>
    <div class="one two"></div>
    <button>按钮</button>
    <script>
        var demo = document.querySelector('.one');
        var button = document.querySelector('button');
        var html = document.documentElement;
        // 1. 返回一个元素所有类名
        console.log(demo.classList);
        // DOMTokenList(2) ["one", "two", value: "one two"] 返回该与元素所有类名
        console.log(demo.classList[0]); // 返回第一个类名
        console.log(demo.classList[1]); // 返回第二个类名
        // 2. 给元素添追加一个类名
        demo.classList.add('three');
        // 3. 删除一个类名
        demo.classList.remove('one');
        // 4. 切换类名，原来元素有这个类名，添加，没有则删除
        button.addEventListener('click', function() {
            html.classList.toggle('black');
        })
    </script>
</body>
```

### 5，移动端点击回到首页

```js
// 到一定距离有返回顶部的按钮
var goback = document.querySelector('.goback');
this.console.log(goback)
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 50) {
        goback.style.display = 'block'
    } else {
        goback.style.display = 'none'
    }
})
goback.addEventListener('click', function () {
    window.scroll(0, 0);
})
```

![](/assets/htmlcssAssets.assets/46.gif)

### 6，click延时解决方案

> 移动端click事件会有 300ms 的延时，原因是移动端双击点击会缩放页面造成的

1. 禁止缩放，静止浏览器默认的双击缩放行为并且去掉 300ms 的点击延时

   ```js
   <meta name="viewport" content="user-scalable=no">
   ```

2. 封装 tap，解决 click 300 ms 延时

   ![1574125018391](/assets/htmlcssAssets.assets/1574125018391.png)

3. 使用 fastclick插件解决延时

   JS插件就是js文件，遵循一定的规范编写，拥有特定功能且方便调用，比如轮播图和瀑布流插件

   > 特点：一般是为了某个问题专门存在，功能单一，并且比较小
   >
   > 像我们之前写的animate.js就是一个js插件，能够实现动画的小插件

   网址：https://github.com/ftlabs/fastclick/blob/master/lib/fastclick.js

   ```js
   if ('addEventListener' in document) {
       document.addEventListener('DOMContentLoaded', function() {
           FastClick.attach(document.body);
       }, false);
   }
   ```

   创建一个js文件，用来存放 **fastclick.js** 的文件，把 **github** 上面的代码复制过来

   ![1574127201107](/assets/htmlcssAssets.assets/1574127201107.png)

### 7，Swiper插件使用

> **Swiper**是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。

> 下载地址：https://www.swiper.com.cn/download/index.html

使用轮播图案例：

1. 在 **demo** 中选中想要的样式，并查看源代码

   ![1574143724904](/assets/htmlcssAssets.assets/1574143724904.png)

2. 使用之前先导入这两个文件（css 和 js）

   ![1574143794807](/assets/htmlcssAssets.assets/1574143794807.png)

3. 在想要的样式中的源代码中进行复制

   ![1574143933990](/assets/htmlcssAssets.assets/1574143933990.png)

4. 自己再根据自己需要进行样式的调整

5. 再官网上查看组件的使用

   ![1574143989864](/assets/htmlcssAssets.assets/1574143989864.png)

> 市场上其他的插件

1. superslide：http://www.superslide2.com/index.html
2. iscroll：https://github.com/cubiq/iscroll

## 8，视屏插件zy.media.js使用

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="./zy.media.min.css">
        <script src="./zy.media.min.js"></script>
        <title>Document</title>
    </head>
    <body>
        <div class="zy_media">
            <video data-config=''>
                <source src="./最终幻想15：王者之剑.1080P.中英字幕.mp4" type="video/mp4">
            </video>
        </div>
        <script>
            zymedia('video', {
                "mediaTitle": "《最终幻想15：王者之剑》",
                "autoplay": true,
                'videoWidth': '50%',
                'videoHeight': '50%',
            });
        </script>
    </body>
</html>
```

![1574145531862](/assets/htmlcssAssets.assets/1574145531862.png)

# 本地存储

本地存储的特征：

1. 数据储存在用户浏览器中
2. 设置，读取方便，甚至页面刷新不丢失数据
3. 容量较大，sessionStorage约5M，localStorage约20M
4. 只能储存字符串，可以将对象JSON.stringfy()编码后储存 

## 1，sessionStorage

特点：

1. 生命周期为关闭浏览器窗口（关闭浏览器窗口数据就消失）

2. 在同一个窗口（页面）下，数据是可以共享的

3. 以键值对的形式存在

4. 在浏览器的这里查看

   ![1574327928132](/assets/htmlcssAssets.assets/1574327928132.png)

- ##### `存数据`

  ```js
  sessionStorage.setItem(key, value)
  ```

- ##### `获数据`

  ```js
  sessionStorage.getItem(key, value)
  ```

- ##### `删数据`

  ```js
  sessionStorage.removeItem(key, value)
  ```

- ##### `删除所有数据`

  ```js
  sessionStorage.clear()
  ```

- ##### [案例](#)

  ```html
  <div>
      <input type="text" name="" id="username"> <br>
      <input type="password" name="" id="password"> <br>
      <button>储存数据</button> <br>
      <button>获得数据</button> <br>
      <button>删除数据</button> <br>
      <button>删除所有数据</button>
  </div>
  
  <script>
      var username = document.querySelector('#username');
      var password = document.querySelector('#password');
      var set = document.querySelectorAll('button')[0];
      var get = document.querySelectorAll('button')[1];
      var remove = document.querySelectorAll('button')[2];
      var clear = document.querySelectorAll('button')[3];
      set.addEventListener('click', function() {
          var u = username.value;
          var p = password.value;
          sessionStorage.setItem('user', u);
          sessionStorage.setItem('password', p);
      })
  
      get.addEventListener('click', function() {
          console.log('user:' + sessionStorage.getItem('user'));
          console.log('password:' + sessionStorage.getItem('password'));
      })
  
      remove.addEventListener('click', function() {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('password');
      })
  
      clear.addEventListener('click', function() {
          sessionStorage.clear()
      })
  </script>
  ```

## 2，localStorage

特点：

1. 生命周期永久（除非手动删除）

2. 在同一个浏览器下，数据是可以共享的

3. 以键值对的形式存在

4. 在浏览器的这里查看

   ![1574330021870](/assets/htmlcssAssets.assets/1574330021870.png)

### 案例12：记住用户名

```html
![47](/assets/htmlcssAssets.assets/47.gif)<input type="text">
<p><input type="checkbox" name="" id="one" value=""><label for="one">记住用户名</label></p>

<script>
    var ipt = document.querySelector('input');
    var one = document.querySelector('#one');
    if (localStorage.getItem('username')) {
        one.checked = true;
        ipt.value = localStorage.getItem('username')
    }
    one.addEventListener('change', function() {
        if (one.checked) {
            if (ipt.value) {
                localStorage.setItem('username', ipt.value)
            }
        } else {
            localStorage.removeItem('username')
        }
    })
</script>
```

![47](/assets/htmlcssAssets.assets/47.gif)