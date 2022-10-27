---
id: ajax
---

# Ajax

## 0.JS异步机制

- 浏览器打开会开辟多条线程来支撑浏览器的工作，但是分配给JS进行DOM操作的的线程永远只有一条，所以JS是`单线程编程语言`，那么JS是怎么进行**异步操作代码**的呢？

首先来看下面的一段代码

![image-20200327133336257](/assets/ajax.assets/image-20200327133336257.png)

输出的结果

![image-20200327133401550](/assets/ajax.assets/image-20200327133401550.png)

！ 我们把定时器的时间设置成了0，代表只要运行了这段代码就立即进行里边函数的运行，然而并没有，而是先把主线程上的 `console.log('5')` 执行之后才挨个运行定时器

在JS中，所有任务可以分为两种，（主线程上的代码（同步），任务队列里的代码（异步））

- 同步任务（synchronous）：在主线程上执行的代码，比如循环，print这些操作

- 异步任务（asynchronous）：不在主线程上运行，遇见就丢到**任务队列**，像定时器操作

  - JS的线程执行流程：先执行主线程上的任务，只有当主线程执行完成之后才会执行队列里的任务，就像上面为什么定时器的时间是0还优先先执行下面的代码，因为主线程上的代码是优先执行的，等到主线程任务全部完成，才会进行任务队列里面的异步任务，造成了上面的结果

  - JS的运行机制 => 事件循环 + 回调函数 

  - 只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。

    "任务队列"中的事件，除了IO设备的事件以外，
    还包括一些**用户产生的事件（比如鼠标点击、页面滚动等等），**
    比如$(selectot).click(function)，这些都是相对耗时的操作。
    只要指定过这些事件的回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

    所谓"**回调函数"（callback）**，就是那些会被主线程挂起来的代码，前面说的点击事件$(selectot).click(function)中的function就是一个回调函数。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。例如ajax的success，complete，error也都指定了各自的回调函数，这些函数就会加入“任务队列”中，等待执行。

## 1. http请求面试题

1. DNS服务器：是进行**域名**(domain name)和与之相对应的**IP地址** (IP address)转换的服务器（在浏览器中既能用ip来访问服务器，也能用域名如`www.baidu.com`访问服务器，原因就是DNS服务器对域名和主机ip进行了绑定，在互联网中访问域名首先会进入DNS服务器中进行域名解析并指引到对应的主机IP上）

2. 客户端：是指与服务器相对应，为**客户提供本地服务的程序**

3. 服务器：在网络中为其它客户机**提供计算或者应用服务**

4. http事务：一次完整的http请求，包括**请求（request）**和**响应（response）**，两者缺一不可

   ------

   

面试必问：打开浏览器，输入网址，回车，到看到整个页面，经历什么过程？

【http请求阶段，发送请求】

①：首先从URL中解析主机名，先查询本地DNS缓存列表，若没找到对应主机名，则浏览器首先向DNS域名解析服务器发送请求获取主机名

​	DNS服务器进行域名反解析，找到在服务器中对应域名的主机外网IP，`www.baidu.com` => 182.61.200.6

②：其次从URL中解析目标端口号，与目标主机建立基于tcp/ip协议的连接（三次握手四次挥手）

【http响应阶段，发回数据】

③：服务器根据URL中的路径名称，参数，以及哈希值，把客户端的数据进行准备

④：把数据响应给客户端（如果请求的是HTML或者CSS等这样的资源文件，服务器返回的是资源文件中的源代码[不是文件本身]）

【浏览器渲染阶段，绚烂页面】

⑤：浏览器客户端接收服务器返回的源代码，基于自己内部的渲染引擎（内核）开始进行页面的绘制和渲染

​	 => 首先计算DOM结构，生成DOM TREE
​	 => 自上而下运行代码，加载CSS等资源内容
​	 => 根据获取的CSS生成带样式的RENDER TREE
​	 => 开始渲染和绘制

> 一个页面完全加载完成，需要向服务器发起很多次HTTP事务操作
>  一般来说：首先把HTML源代码拿回来，加载HTML的时候，遇到link/script/img[src]/iframe/video和audio[没有设置preload=‘none’]…都会重新和服务器端建立HTTP事务交互（进行文件媒体数据请求）
>
> - 特殊情况：如果我们做了资源缓存处理(304)，而且即将加载的资源在之前已经加载过了，这样的操作和传统的HTTP事务有所不一样，他们是从服务器和浏览器的缓存中读取数据，比传统的读取快很多
>
> ![image-20200313214059671](/assets/ajax.assets/image-20200313214059671.png)

## 2.前端性能优化

主要分为两大类：

1.减少Http的请求次数和请求大小

2.代码优化：

- 有利于seo
- 有利于扩展维护
- 有利于减少性能消耗

3.DNS以及HTTP通性方式的优化

具体实现的方案：

1. 尽量减少使用闭包的使用（原因：闭包会开辟不释放的私有占内存）

   - 方案A：给元素做循环绑定事件的时候，可以用冒泡事件（事件委托）来做，减少DOM绑定

   - 方案B：给元素做循环绑定事件的时候，可以用自定义属性绑定

   - 方案C：可以在最外层形成一个闭包，吧一些后续需要的公共信息进行存储（单例模式）

   - 方案D：尽可能手动的释放不被占用的内存...

2. 尽量合并css和js文件

   > （把需要引入的css和js都尽量各自合并到同一个css/js文件，减少请求次数，并且尽量把文件代码进行压缩，减少http请求资源大小）

   - 方案A：webpack这种自动化构建工具，可以帮我们实现代码的压缩和合并（工程化开发）

   - 方案B：在移动端开发（或者追求高性能的pc端开发，我们可以把css和js搞成内嵌式，在html里面写）

3. 尽量使用字体图标或者SVG图标，来代替传统的PNG等格式的图片

   > （字体图标是矢量图，不会失真，并且是基于代码写出来的，渲染速度快，相对比位图要小些）

4. 减少对DOM的操作（主要减少DOM重绘[css发生改变时]和重排回流[DOM结构发生改变时]）

   - 方案A：关于重排的分离读写

   - 方案B：使用文档碎片或者**字符串拼接**做数据绑定（DOM的动态创建）

5. 在JS中避免嵌套循环（会增加很多循环次数）和死循环（浏览器卡死）

6. 采用图片懒加载（延迟加载，目的是减少页面第一次加载过程中http的请求次数）

   > 步骤：开始加载的时候，所有图片都不发送http请求，而是给一张类似正在加载的一张背景图，当页面加载完成时，在屏幕可视区内的图片进行请求加载（让页面第一次打开速度变快）

7. 利用浏览器和服务端的缓存技术（304缓存），把一些不经常更新的静态资源文件做缓存处理

   > 例如：JS，CSS，静态图片都可以做缓存
   >
   > 原理：减少http请求大小（先向服务器发请求，服务器说你本地有缓存，让浏览器304本地拿取）

8. 尽量减少css表达式的使用（老古董，不会写，就是在css中写js代码，用express写）

9. css选择器解析规则是从右向左解析的，（.container .link a）这会先找到所有的a标签，再在.link下面赛选，所以尽量减少直接的标签选择器的使用

10. CSS精灵图（也叫CSS雪碧图），吧所有相对较小的资源图片汇总到一张大图上，后期只需要决定定位到对应的小图片就行

11. 减少对于cookie的使用（追主要的减少本地cookie存储内容的大小），因为客户端操作cookie的时候，这些信息总会在客户端和服务端之间和传来传去

12. 页面中的数据获取采用异步编程和延迟分批加载，使用异步获取数据，是降低HTTP通道的堵塞，不会因为数据没有请求而耽误下面的信息加载，提高页面的打开速度（我们可以这样处理：需要动态绑定数据的区域先隐藏，等数据返回并且绑定完成后再显示）（延迟加载类似图片懒加载，是为了减少第一次http请求的次数）

13. 页面中出现音屏视屏标签时候，不要让其去请求数据，而是等到我们点击播放再去加载（设置preload="none"），这样点击视屏才会加载

14. 在客户端和服务端进行信息交互时候，对于多项数据，我们尽可能基于json格式的数据进行传输（json数据资源偏小，并且处理方便，相对于XML格式传输才会有这个优势）

15. 尽可能实现JS的封装，减少冗余代码，减少http的请求大小

16. 减少递归的使用，避免死递归，避免发生嵌套式的栈内存开辟

17. 使用window.requestAnimationFrame（JS中的帧动画代替传统的定时器动画）

18. 避免使用iframe（不好管理样式，而且意思是相当于在一个页面加载了另外一个页面，消耗比较大）

19. 利用H5提供的localStorage本地储存或者是manifest离线缓存，做一些本地存储，下一次页面加载可以直接从本地拿取，减少http的请求次数

20. 基于Script调取js的时候，可以使用defer或者async来异步加载

21. 重量级优化：CDN加速（非常烧钱的机器）

    ![image-20200324192413814](/assets/ajax.assets/image-20200324192413814.png)

    

====额外====

1. 把css放到`<body>`上面，把js放到`<body>`下面（先加载css是为了保证元素是带着样式渲染的，而js是操作DOM的，等到元素加载完成再操作）
2. 能用css的前外不要用js ，能用原生搞定的，千万不要用插件，禁止使用flash，能用css做动画效果的千万不要用js，css的动画能开启硬件加速功能，渲染更加快
3. 不要使用with，非常消耗性能

## 3.url的组成

### URL/URN/URI

URI = URL + URN

URI：统一资源标识符，就是URL

URL：统一资源定位符

URN：统一资源名称

### URL的组成

`【http】://【www.myweb.cn】:【80】【/me/book/index.html】?name=xxx&id=yyy#myself`

1. 【传输协议】：用来传输客户端和服务器端交互信息的

   - HTTP：超文本传输协议（除了传递普通文本，还可以传递文件流或者进制编码等信息），最常用的WEB传输协议
   - HTTPS：基于SSL（Secure Sockets Layer 安全套接层）加密的HTTP传输协议，比HTTP更加安全，涉及**金钱交易**的都使用HTTPS传输协议
   - FTP：文件传输协议，一般用来实现资源文件在服务器的上传下载（穿的文件大）

2. 【域名】：服务器的别名，Domain Name

   - 一级域名（顶级域名） www.jd.com   jd.com叫做域

   - 二级域名                        `sports.jd.com`

   - 三级域名                        `what.sports.jd.com`

     ----- .com	供商用的国际域名

     ----- .cn		供商用的中文域名

     ----- .org	  官方组织，非营业组织

     ----- .net       用于网络供应商

     ----- .edu      用于教育机构

3. 【端口号】：用来区分同一台服务器上不同服务的表示（基于web服务管理工具创建服务的时候指定的），不同服务之间不能使用相同的端口号

   - HTTP  ==> 默认端口号 80

   - HTTPS ==> 默认端口号 443

   - FTP      ==> 默认端口号 21

     不指定端口，浏览器会默认使用对应协议的端口

     服务器的端口范围：0 ~ 65535

     服务器上安装一款应用都可能会作为一个服务，占用一个端口

4. 【请求路径名称】

   - path

   - pathname

     列如：/me/book/index.html 请求的是当前服务对应的项目目录（不同端口可能有不同的文件目录）中，me文件夹中book文件夹中的index.html页面

     但是也有特殊情况，就是当前的URL是被“伪URL”重写的，我们看到的URL请求其实不是真实的请求（例如 https://item.taobao.com/55663.html 这个url就是被重写的，其真实的URL地址很可能是 https://item.taobao.com/detail.jsp?id=55663，其实就是跳转到详情页，通过问好传递参数，展示不同的产品详情信息，但是.jsp这种服务器渲染的动态页面不能被搜索引擎收录，不利于页面的SEO，所以会在后端把动态页面静态化，这也就用到了URL重写技术，很早以前的技术） 

     例如：/stu/info 这种没有任何后缀信息，一般都不是用来请求资源文件的，而是用于AJax数据请求的就扣地址（后缀如果是.json类似的，也是同理），但是有一种除外 /stu/info 这种很可能不是接口地址，而是请求服务器中的默认资源文件，比如 index.html/degault.html

     ​	

     ​	DHTML：动态页面，泛指当前页面中的内容不是写死的而是动态绑定的，例如.jsp/,php/.aspx。。。等等，这些页面中的数据都是基于Ajax或者是后台编程语言处理，由服务端渲染，最后把渲染的结果返回给客户端呈现

5. 【问好传参+哈希值】xxx=yyy 为键传递的参数和值，#后面的是哈希值

   - ?xxx=yyy&aaa=bbb&ccc=ddd#xxx...

   问好传参：HTTP事务中，问好传参是客户端把信息传递给服务器的一种方式（也可能是跳转到某一个页面，把参数值传递给页面用来标识的）

   哈希值：一般都跟客户端服务器交互没什么关系，主要用于页面中的锚点定位和HASH路由切换

## 4. HTTP

### 请求报文

> 在http请求中传递的数据块就叫做数据报文

![image-20200408202747571](/assets/ajax.assets/image-20200408202747571.png)

起始行：请求起始行，响应起始行（看爬虫篇）

首部（头）：

- 通用头【General】	

  ![image-20200323210521279](/assets/ajax.assets/image-20200323210521279.png)

- 请求头【Request Headers】

  ![image-20200323210836853](/assets/ajax.assets/image-20200323210836853.png)

- 响应头【Response Headers】

  ![image-20200323210946776](/assets/ajax.assets/image-20200323210946776.png)

主体：

- 请求主体

  客户端发送的数据【Request Payload / Form Date】

- 响应主体

  服务器返回的数据

> 客户端和服务器信息交互
>
> A：问号传参，/aaa/bbb/info?name=xxx&age=xxx，把信息传递服务器
>
> B：设置请求头，把要传递的内容设置到请求头信息中，也可以自定义
>
> C：设置请求主体，xhr.send([AJAX SEND 中传递的内容，就是客户端设置的请求主体内容])
>
> 服务器返回给客户端
>
> A：设置响应头，客户端通过响应头获取信息（并且其速度大于响应主体）
>
> B：设置响应主体，主要的信息都在响应主体中

### 请求方式

> 所有的请求都能给服务器传递内容，也可以从服务器端获取数据

1. GET：从服务器端获取数据（主要负责拿）
2. POST：向服务器推送数据（主要负责给）
3. DELETE：删除服务端的某些内容（主要来删除文件）
4. PUT：向服务器存放一些内容（一般时存放文件）
5. HEAD：只想获取服务器返回的响应头信息，不需要主体中的内容
6. OPTIONS：一般使用它想服务器发送探测性请求，如果服务器返回信息，那么说明当前服务器和客户端建立了联系，我们可以继续操作（TRACE也是干这个事情的，但是axios这个ajax类库在基于cross domain进行跨域请求的时候，就是先发送OPTIONS请求进行探测尝试，如果能连接服务器，才会发送别的请求）

GET 和 POST 的区别：

- 【1. 传递给服务器信息的方式不一样】

  GET：基于URL地址**问好传参**的方式把信息传递给服务器（主要是拿，url比较短，可以基于url传参拿数据）

  ```js
  // 基于GET请求，问好传参和服务器交互
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://easy-mock.com/mock/5e7c318905382f7b18e45347/info?id=1&name=xyb'); // 传递参数
  console.log(xhr)
  xhr.onreadystatechange=() => {
    if(xhr.readyState == 4) {
      if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log('xhr is unsuccessful ' + xhr.status)
      }
    }
  }
  xhr.send(null)
  ```

  ![image-20200326134410685](/assets/ajax.assets/image-20200326134410685.png)

  POST：基于**请求主体**把信息传递给服务器（主要是传，浏览器对url长度会有限制，所以要用请求主体传）

  ```js
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://easy-mock.com/mock/5e7c318905382f7b18e45347/info');
  console.log(xhr)
  xhr.onreadystatechange=() => {
    if(xhr.readyState == 4) {
      if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log('xhr is unsuccessful ' + xhr.status)
      }
    }
  }
  xhr.send(JSON.stringify({id: 1, name: 'xyb'})) 
  
  // POST参数传递参数：方法1
  // POST请求传递参数，必须对请求头进行设置，告诉服务器请求体参数的格式类型，【url数据格式】
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send('name=xyb&age=man') // url数据格式
  
  // POST参数传递参数：方法2
  // POST请求传递参数，必须对请求头进行设置，告诉服务器请求体参数的格式类型，【json数据格式】
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({id: 1, name: 'xyb'}) // json字符串数据格式
  ```

  ![image-20200326142858970](/assets/ajax.assets/image-20200326142858970.png)

- 【2. POST相对比GET安全】

  GET请求是基于问好传参的，容易被hack进行URL劫持，发生信息泄露和信息修改

  POST是基于请求主体传递的，相对来说不好被劫持

  所以，**登陆，注册，涉及安全性**的操作，我们应该用**POST请求**

- 【3. GET请求会产生不可控制的缓存，POST不会】

  不可控是浏览器产生的，无法基于JS来控制，真实项目中我们会清除缓存

  GET请求产生不可控的缓存原因：连续多次向相同的地址（并且如果传递参数信息是是相同的，低版本的IE会有问题）发送的请求，浏览器会把之前相同请求的数据从缓存中拿取，导致无法获得服务器最新的数据，而POST不会

  GET请求产生缓存的解决方法：

  ```js
  xhr.open("GET", '/info/list?id=1&name=xxx&_=${Math.random()}') // => 保证每次的GET请求和上一次的不相同，浏览器不会产生缓存，能一直得到服务器的最新数据，使用_不会和别的属性名冲突
  ```

### http状态码

1. **200** 请求被实现

   => 1. 服务器响应并信息，但是信息不一定是我们需要的

2. **301** 永久转移（永久重定向）

   => 2. 域名更改会用到，访问以前的域名永远跳转到新的域名

3. **302** 临时转移

   => 1. （负载均衡），服务器并发数到达上限，把后续请求分配到临时别的服务器上做处理

   => 2. 偶偶真实项目中会把所有图片放到单独服务器"图片处理服务器"，这样减少主服务器的压力，当用户向主服务访问图片时，主服务器会把所有请求转移到图片服务器上

   => 3. 临时从定向，与307唯一的区别就是

   - 状态码 307 与 [`302`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/302) 之间的唯一区别在于，当发送重定向请求的时候，307 状态码可以确保请求方法和消息主体不会发生变化。当响应状态码为 302 的时候，一些旧有的用户代理会错误地将请求方法转换为 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)：使用非 GET 请求方法而返回 302 状态码，Web 应用的运行状况是不可预测的；而返回 307 状态码时则是可预测的。**对于 GET 请求来说，两种情况没有区别**。

4. **307** 临时重定向

   => 1. 用http协议访问https协议运转的网站，会重定向到https协议上（可以确保请求方法和消息主体不会发生变化，比302更好）

5. **304** 设置缓存

   => 1. 对于不经常使用的资源文件，例如 CSS/JS/HTML/IMG等，服务器会结合客户端设置304缓存，第一次加载过这些资源文件就缓存到客户端了，下次再获取的时候，是从缓存中获取；如果资源更新了，服务端会通过最后修改时间来强制让客户端从服务器重新获取；基于Ctrl+F5强制刷新页面，304缓存就没有用了

6. **400** 请求参数错误

7. **401** 无权限访问

8. **403** 服务器拒绝响应（爬虫）

9. **404** 找不到文件或者资源不存在

10. **413** 和服务器交互的资源超过服务器最大限制

11. **500** 未知的服务器错误，服务器的问题

12. **503** 服务器超负荷，处理不过来

### 服务器API

1. REST API ：restful

   （1），发送请求进行  CURUD（增删改查），哪个操作由请求方式决定

   （2），同一个请求路径可以进行多个操作

   （3），请求方式为 GET|POST|PUT|DELETE

2. REST API ： restless

   （1），请求方式不决定请求的 CURUD（增删改查）操作

   （2），一个请求路径只对应一个操作

   （3），一般只有GET|POST

## 5. Ajax理论

### http与ajax区别

1. ajax请求是一种特殊的http请求

2. 对服务器来说，没有任何区别，区别在浏览器端

3. 浏览器端发送请求：只有 XHR 和 fetch 发出的才是 ajax 请求，其他所有的都是非 ajax 请求

4. 浏览器端收到相应：

   （1），一般请求：浏览器会直接显示响应体数据，也就是常说的刷新/跳转页面

   （2），ajax请求：浏览器不会对界面进行任何更新操作，异步请求数据

### ajax的由来

> AJAX = async + javascript + and + xml 异步的JS和XML

在ajax中的异步，不是我们所理解的同步异步变成，而是泛指“局部刷新”，在ajax中尽量使用异步来获取数据，异步的代码不会阻塞主线程

XML是一种文件格式（HTML【超文本标记语言】是XML的一种）：可扩展的标记语言，它的作用是用自己扩展的语义标签来存储一些数据和内容，这样存储的好处能够清晰的展现数据

XML格式：

```xml
<template>
  <boy>
    <name>xxx</name>
    <hobby>girl</hobby>
    <tall>180</tall>
  </boy>
  <girl>
    <name>yyy</name>
    <hobby>boy</hobby>
    <tall>165</tall>
  </girl>
</template>
```

JSON格式：

```json
{
  "boy": {
    "name": "xxx",
    "hobby": "girl",
    "tall": 180
  },
  "girl": {
    "name": "xxx",
    "hobby": "boy",
    "tall": 165
  }
}
```

- 以前，AJAX刚出现的时候，客户端从服务器获取数据，服务器为了清晰的表达数据，都是返回的XML格式，所以那个时候叫做AJAX，但是现在JSON这种数据格式的兴起，比XML更加的轻量级，并且JS能直接操作JSON数据，比XML更好（但是当下有些项目还是会用到XML，例如服务器返回客户端的数据不单单是数据，十二数据和需要展示的结构拼接好的结果，类似字符串拼接，也可以说，服务端把数据和结构拼接好返回给我们，此时的数据格式一般都是XML格式的字符串）

### 全局刷新

- 服务端渲染![image-20200325151805641](/assets/ajax.assets/image-20200325151805641.png)

  ![image-20200325153054859](/assets/ajax.assets/image-20200325153054859.png)

- 服务端渲染好处

  ![image-20200325153031665](/assets/ajax.assets/image-20200325153031665.png)

### 局部刷新

通过Ajax来进行局部刷新

![image-20200325153544854](/assets/ajax.assets/image-20200325153544854.png)

### Ajax的应用场景

1. 页面下拉加载更多数据
2. 列表数据无刷新分页技术（点击下一页不需要刷新页面）
3. 表单项离开焦点数据验证（验证账号是否存在）
4. 搜索框提示文字下拉列表（百度一输入字便进行搜索）

## 6.Ajax的操作

### 环境搭建

进行ajax的请求前先用node搭建一个本地的服务器服务

1. 首先进行npm换源

   ```shell
   npm install -g cnpm --registry=https://registry.npm.taobao.org  # 以后直接cnpm下载
   ```

2. 安装express和path模块

3. 搭建服务器

   ```js
   // 引入express框架
   const express = require('express');
   // 路径处理模块
   const path = require('path')
   // 创建web服务
   const app = express();
   
   // 静态资源访问服务功能
   app.use(express.static(path.join(__dirname, 'public')));
   
   // 监听端口
   app.listen(3000);
   // 控制台提示输出
   console.log('服务器成功')
   ```

   目录结构

   ![image-20200404144855133](/assets/ajax.assets/image-20200404144855133.png)

### ajax的四步

1. 创建XMLHttpRequest对象，也就是Ajax对象（IE6不兼容），用来发送http请求

   ```js
   let xhr = new XMLHttpRequest()
   ```

2. 发送请求之前对Ajax对象进行一些配置

   ```js
   xhr.open([Http Method], [Url], [Async], [User-Name], [User-Pass]);
   
   /*
    *	1. Http Method：请求方式(一共8个)
    *		-GET/DELETE/HEAD/OPTTONS/TRACE/CONNECT
    *		-POST/PUT
    *	2. Url：向服务器发送请求的API接口地址
    *	3. Async：设置Ajax的请求，默认为异步，true为异步，false为同步(项目都是异步)
    *	4/5. User-Name/User-Pass：用户名密码，一般不用
    */
   ```

3. 事件监听：一般监听的都是Ready-State-Change事件（Ajax状态发生改变），基于这个时间可以获取服务器返回的Response

   ```js
   xhr.onreadystatechange=() => {
   	if(xhr.readyState == 4) {
       if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
         alert(xhr.responseText);
       } else {
         alert('xhr is unsuccessful' + xhr.status)
       }
     }
   }
   
   // 更多的操作
   xhr.onreadystatechange=() => {
     if(!/^(2|3)\d{2}&/.test(xhr.status)) return; // => 如果不是2 3开头的状态码，证明信息获取失败，直接返回空
     
     if(xhr.readyState == 2) {
       let time = xhr.getResponseHeader('date');
       console.log(new Date(time));// => 把time字符串转换成Date对象，并且会自动转换成北京时间
     }
     
   	if(xhr.readyState == 4) {
       if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
         alert(xhr.responseText);
       } else {
         alert('xhr is unsuccessful' + xhr.status)
       }
     }
   }
   ```

4. 发送Ajax请求：从这开始，Ajax开始执行

   ```js
   xhr.send([请求主体内容])  // get请求可以传null，post请求传递json数据或url参数格式的数据
   ```


### Ajax对象状态码

0 => UNSENT（unset），刚创建Ajax对象

1 => OPENED（opend），执行.open操作，已经配置好Ajax对象

2 => LOADING（loading），执行.send操作后，开始ajax请求，服务器把响应头返回之后，客户端接收，状态码才变成2（服务器的响应头信息被客户端接收，包括服务器信息，http状态码）

3 => HEADERS_RECEIVED（headers_receive），响应主体内容正在被返回

4 => DONE（done），响应主体已经被客户端接收

### XHR的属性方法

#### 属性

1. xhr.response			响应主体内容

2. xhr.responseType 相应主题内容的数据格式（客户端完成）

3. xhr.responseText    响应主体的内容是字符串

4. xhr.responseXML    响应主体的内容是XML文档

   

5. xhr.status                  返回是的HTTP状态码

6. xhr.statusText           返回是的HTTP状态码的描述

   

7. xhr.timeout               设置请求超时时间

   ```js
   // 设置超时时间，当请求时间超过这个时间则自动中断ajax请求
   xhr.timeout = 100	// 单位为毫秒
   
   // ontimeout是一个监听函数，能够在timeout的时候触发
   xhr.ontimeout = () => { alert('超时了') };
   ```

   

8. xhr.withCredentials 是否允许跨域（Flase）

#### 方法

1. `xhr.abort()`            设置强制中断Ajax请求

   ```js
   // 立即中断Ajax请求
   xhr.abort()
   
   // onabort是一个监听函数，能够在Ajax被abort函数中断的时候触发
   xhr.onabort = () => { alert('Ajax被中断了') };
   ```

   

2. `xhr.getAllResponseHeaders()`     获取所有响应头信息

3. `xhr.getResponseHeader([key])`   获取key对应的响应头信息

   ```js
   // 获取响应头中服务器的信息
   xhr.getResponseHeader('date')
   ```

4. `xhr.setRequestHeader()` 设置请求头

   ```js
   xhr.setRequestHeader('myheaders', 'nameagesex')	// 这一步必须写在open也就是配置ajax后面
   ```

   > [W3C 的 cors 标准对于跨域请求也做了限制](https://www.w3.org/TR/cors/#access-control-allow-credentials-response-header)，规定对于跨域请求，客户端允许获取的response header字段只限于“`simple response header`”和“`Access-Control-Expose-Headers`

   

5. `xhr.open()`                   打开URL请求，进行配置xhr的起始工作

6. `xhr.send()`                 发送Ajax请求

   

7. `xhr.overrideMimeType()`  重写MIME类型

## 7.跨域请求

### ajax请求限制

Ajax只能自己的服务器发送请求，也就是只能发送同源请求（判断两个请求是否同源：相同http/https协议，域名，端口），比如现在有A和B两个网站，A网站中的HTML文件只能向A服务器获取数据，B网站...获取数据，A只能向A服务器发送Ajax请求，而A如果向B发送请求，能发送，但是浏览器拒绝接收数据

### 同源规定

A网站只能向A网站服务器发送http/https请求，浏览器会判断请求是否同源来接收或者拒绝响应，也就是ajax是否能进行跨域请求，同源政策是为了保证用户信息而出现的，A网站在客户端设置的cookie，B网站不能进行访问！！！

同源的标准：

1. 协议是否相同（http 和 https）
2. 域名是否相同（www.baidu.com 和 www.tenct.com）
3. 端口是否相同（Http://www.baidu.com:3000 和 Http://www.baidu.com:3001）

> 只要以上一项不满足，就是属于非同源的数据，浏览器会拒绝接受响应

![image-20200406192715132](/assets/ajax.assets/image-20200406192715132.png)

![image-20200406192739297](/assets/ajax.assets/image-20200406192739297.png)

### 1. JSONP模拟请求

JSONP是 json with padding 的缩写，他**不属于Ajax请求**，但是可以模拟ajax请求（使用script标签），需要前后端配合才能完成jsonp的请求（所有jsonp请求都是get请求）

1. 将不同源的服务器请求地址写在script标签的src标签中（请求地址必须返回js代码）

   ```html
   <script src="www.baidu.com"></script>
   <script src="www.aaa.com/file/index.js"></script>
   /**
    * script标签的src属性不受同源政策的限制，但是请求地址返回的数据必须是js代码，并且会直接
    * 执行，所有jsonp请求都是get请求
    */
   ```

2. 服务端响应的数据必须是一个函数的调用，真正要发给客户端的数据作为函数的参数

   ```js
   app.get('/jsonp', (req, res) => {
     const data = {
       name: 'xyb',
       age: 21
     }
     const str = `fn(${JSON.stringify(data)})`; 
     // => "fn({"name": "xyb","age": 21})"
     res.send(str)
   })
   ```

3. 在客户端全局作用于下定义函数fn,并在函数内部对数据进行处理

   ```js
   function fn(data) {
   	console.log(data)
   }
   ```

### 封装JSONP函数

优化的步骤

1. 优化一：主动传递函数名，让服务器返回带有函数名的函数执行

   客户端：

   ```html
   <script src="http://127.0.0.1:4000/jsonp?callback=fn"></script>
   ```

   服务端：

   ```js
   app.get('/jsonp', (req, res) => {
     const data = {
       name: 'xyb',
       age: 21
     }
     let callback = req.query.callback;	// 获取服务端传过来的参数
     const str = `${callback}(${JSON.stringify(data)})`; // fn({"name":...})
     res.send(str)
   })
   ```

2. 优化二：将script请求的发送变成动态发送

   客户端

   ```html
   <button>按钮</button>
   <script>
     function fn(data) {
       console.log(data)
     }
     let btn = document.querySelector('button');
     btn.addEventListener('click', function() {
       // 1. 点击按钮，动态创建script标签
       let script = document.createElement('script');
       // 2. 给上src属性
       script.src = "http://127.0.0.1:4000/jsonp?callback=fn";
       // 3. 网页面中添加标签，模拟ajax请求
       document.body.appendChild(script)
       // 4. script标签加载完成，删除标签
       script.addEventListener('load', function() {
         // onload => script标签加载完成调用
         document.body.removeChild(script)
       })
     })
   </script>
   ```

3. 优化三：封装jsonp函数，方便发起多次请求（最终版本）

   客户端：

   ```js
   btn1.addEventListener('click', function () { 
     jsonp({
       url: 'http://127.0.0.1:4000/jsonp',
       success: function(data) {
         console.log(112233)
         console.log(data)
       }
     })
   })
   
   btn2.addEventListener('click', function () { 
     jsonp({
       url: 'http://127.0.0.1:4000/jsonp',
       query: {
         name: 'xyb',
         age: 20
       },
       success: function(data) {
         console.log(444555666)
         console.log(data)
       }
     })
   })
   
   function jsonp(option) {
     // 1. 创造script标签
     let script = document.createElement('script');
     // 2. 创建处理数据的函数名，不能重复（时间戳），绑定到window上
     let myFunction = 'myFunction' + (+new Date()).toString();
     window[myFunction] = option.success
     // 3. 如果有参数传入，拼接参数
     let queryStr = "";
     for(let k in option.query) {
       queryStr += ('&' + k + '=' + option.query[k])
     }
     // 4. 给script添加请求地址，拼接其他参数
     script.src = option.url + '?callback=' + myFunction + queryStr;
     // 5. 添加script标签，执行请求
     document.body.appendChild(script)
     // 6. 加载完成，删除script函数
     script.addEventListener('load', function() {
       document.body.removeChild(script)
     })
   }
   ```

   服务端：

   ```js
   app.get('/jsonp', (req, res) => {
     // const data = {
     //   name: 'xyb',
     //   age: 21
     // }
     // let callback = req.query.callback;
     // const str = `${callback}(${JSON.stringify(data)})`;
     // res.send(str)
     
     // 服务端的jsonp方法，会执行上面的步骤
     res.jsonp({
       name: 'xyb',
       age: 20
     })
   })
   ```


### 2.  CORS跨域请求

CORS：全称为Cross-Origin-Resource-Sharing，即为资源共享，它允许浏览器向服务器发送ajax请求，克服了浏览器的同源政策，客户端代码不需要改动，只需要服务器进行配置即可

------

浏览器发送ajax请求，会带上origin（在请求头中），如果服务器允许当前客户端的请求，在响应头中加入`Access-Control-Allow-Origin`，浏览器会查看响应头中有没有该字段，或客户端是否在服务器的白名单中，也就是`Access-Control-Allow-Origin`中，若其值为 `*` 那么代表所有客户端都能跨域请求

![image-20200407111836154](/assets/ajax.assets/image-20200407111836154.png)

------

步骤：

1. 客户端代码（不变）：

   ```js
   let xhr = new XMLHttpRequest();
   xhr.open('GET', 'http://127.0.0.1:4000/json');
   xhr.onreadystatechange=() => {
     if(xhr.readyState == 4) {
       if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
         console.log(xhr.responseText);
       } else {
         alert('xhr is unsuccessful' + xhr.status)
       }
     }
   }
   xhr.send(null);
   ```

2. 服务端代码（加响应头）：

   ```js
   // 单独的请求
   app.get('/json', (req, res) => {
     // 代表允许哪些客户端访问
     res.header("Access-Control-Allow-Origin", "*")
     // 代表允许客户端通过哪些方法访问
     res.header("Access-Control-Allow-Methods", "get,post")
     res.send({
       "name": "2号",
       "age": 21,
       "hobby": "money"
     })
   })
   
   // 设置所有的请求
   app.use((req, res, next) => {
     // 在这里会拦截所有的请求，并添加请求头 
     // 代表允许哪些客户端访问
     res.header("Access-Control-Allow-Origin", "*")
     // 代表允许客户端通过哪些方法访问
     res.header("Access-Control-Allow-Methods", "get,post")
     // 继续
     next()
   })
   ```

### 3. 服务端进行请求

由于服务器之间没有同源政策的限制，可以让服务器发送请求来获取数据

------

A服务器向B服务器获取数据再响应给A网站，A服务器充当一个爬虫的角色

![image-20200407114847718](/assets/ajax.assets/image-20200407114847718.png)

------

步骤：

1. A网站代码：

   ```js
   <script>
     let xhr = new XMLHttpRequest();
   xhr.open('GET', 'http://127.0.0.1:4000/server')
   xhr.onreadystatechange=() => {
     if(xhr.readyState == 4) {
       if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
         console.log(xhr.responseText);
       } else {
         alert('xhr is unsuccessful' + xhr.status)
       }
     }
   }
   xhr.send(null)
   </script>
   ```

2. A服务端代码：

   ```js
   app.get('/server', (req, res) => {
     request.get('http://127.0.0.1:3000/json', (err, response, body) => {
       res.send(body)
     })
   })
   ```

3. B服务端代码：

   ```js
   app.get('/json', (req, res) => {
     res.send({
       "name": "1号",
       "age": 21,
       "hobby": "money"
     })
   })
   ```

## 8.倒计时

==基于服务器时间做倒计时===

JS中可以用 `new Date()` 获取的是客户端时间，这个客户端时间可以随意修改，所以在项目中，如果时间重要，需要使用服务器时间

由于服务器返回数据需要时间，客户端拿到的时间肯定是有误差的，所以我们要尽可能减少这些误差：

1. 在Ajax的`状态为2`的时候（响应头已经被返回），就能直接获取服务器的时间
2. 使用Ajax的`HEAD`方法，专门用来获取响应头信息的请求方式
3. 特殊：即使我们向服务器发送一个不存在的请求地址，返回的是404状态码，但是响应头中仍然存在时间

整体

## 9.封装Ajax

### 参照jquery

```js
// 自己封装ajax
~(function () {
  function AJAX(option) {
    return new AJAX.prototype.init(option);
  };
  AJAX.prototype = {
    constructor: AJAX,
    sendAjax: function () { // 发送ajax请求
      this.handelCache();
      this.handleData();
      let {
        url,
        method,
        async,
        data,
        success,
        error
      } = this
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, async);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (!/^(2|3)\d{2}$/.test(xhr.status)) {
            error && error(xhr.statusText, xhr)
          } else {
            let result = this.handelDataType(xhr)
            success && success(result, xhr)
          }
        }
      }
      xhr.send(data)
    },
    handelDataType: function (xhr) { // 格式化服务器返回的数据格式
      let dataType = this.dataType.toLocaleUpperCase();
      let result = xhr.responseText;
      switch (dataType) {
        case "TEXT": {
          break
        }
        case "JSON": {
          result = JSON.parse(result);
          break
        }
        case "XML": {
          result = xhr.responseXML
        }
      }
      return result
    },
    handelCache: function () { // 处理相同url的get请求会产生缓存的问题，默认有缓存，cache=false时没有
      let {
        url,
        method,
        cache
      } = this;
      if (/^GET$/i.test(method) && cache.toLocaleLowerCase() === 'false') {
        this.toCheck('?') ? url += `&_=${+new Date()}` : url += `?_=${+new Date()}`;
        this.url = url;
      }
    },
    handleData: function () { // 处理url参数，根据请求方式决定
      let {
        method,
        data
      } = this;
      if (!data) {
        this.data = null
      }; // data参数没传，可能在url里，所以是get请求，send的参数设置为null
      if (data != null && typeof data === 'object') { // 如果data是object，把他转换成x-www-form-urlencoded格式，如果传递是json格式，请求头得设置
        let str = ``;
        for (let k in data) {
          if (data.hasOwnProperty(k)) {
            str += `${k}=${data[k]}&`
          }
        }
        data = str.length > 0 ? str = str.slice(0, -1) : str
        if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
          this.url += `${this.toCheck('?') ? '&' + data : '?'+data}`;
          this.data = null
        } else {
          this.data = data
        }
      }
    },
    toCheck: function (what) { // 检查url是存在?, 存在true，反之false
      return this.url.indexOf(what) !== -1 ? true : false
    },
  }
  AJAX.prototype.init = function (option = {}) {
    let {
      url,
      method = "GET",
      async = "true",
      data = null, // url参数
      dataType = 'JSON', // 服务端获取数据后对其数据格式的处理
      cache = "true", // 默认get请求产生缓存
      success,
      error
    } = option;
    ['url', 'method', 'async', 'data', 'dataType', 'cache', 'success', 'error'].forEach(item =>this[item] = eval(item));
    this.sendAjax()
  }
  AJAX.prototype.init.prototype = AJAX.prototype
  window.ajax = AJAX;
})(window)
```

## 10.模板引擎

## 11.ajax案例

