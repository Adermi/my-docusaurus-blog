---
id: html
title: HTML基础
---
# HTML常用标签

## 一，基本概况

------
### 1.浏览器介绍

1. 以前：前后端一体		---> 界面丑，性能差，bug多

   现在：前后端分离		---> 前端工程量大

   以后：端和云			---> 端：前后端 云：大数据

2. 后台语言很多种，前端语言只有一种

3. 客户端：**cs** 架构  (客服端:client 服务器:server)	不好维护，更新版本时候需要用户下载新的版本

   网页端：**bs** 架构  (浏览器:browser)  运行环境在网页，便于维护，用户不用更新，便于维护

4. pc端网页：   电脑上的

   移动端网页：手机上的

5. 网站和网页：网页组成网站(淘宝的主网站和组成这个网站的很多的网页)

6. 主流浏览器：拥有自己的内核，比如谷歌，火狐，欧朋，IE等

   ![1570632289149](assets/1570632289149.png)

   - 国内浏览器的内核都是用的 `Webkit/Blink` 内核，如 360，UC，QQ，搜狗等

### 2.Web标准

![1570632757082](assets/1570632757082.png)

Web标准的构成：

1. 结构	html
2. 表现 css
3. 行为 js

![1570633986705](assets/1570633986705.png)

### 3.VsCode的使用

1. `! + tab` 快速生成 html 骨架

   ```html
   <!DOCTYPE html>		<!--申明文档类型标签，这个声明代表采取H5的版本显示代码-->
   <html lang="zh-CN">	<!--html根标签，lang是申明语言，en是英语,zh-CN为中文-->
   <head>
       <meta charset="UTF-8">	<!--国际编码 万国码-->
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>Document</title>
   </head>
   <body>
       
   </body>
   </html>
   ```

2. 右键在网页中打开

   ![1570635231398](assets/1570635231398.png)

## 二，HTML标签(上)

### 1.HTML常用标签

------

1. 99%的标签是双标签，双标签可以称为 `<开始标签></闭合标签>` 或者 `<开放标签></闭合标签>`

2. 单标签  如： `<meta/>`  `/`可加可不加，有些框架需要加

3. 严格缩进    单行代码太多，严格换行

4. 常用标签：

   1. *`<h1></h1>` (h1~h6)数字越高，权重值越低，都是由它的CSS默认样式决定；

      <!--标题标签，一个页面只能出现一个，主要用在权重值最高的地方，一般放在logo-->

   2. *`<p></p>` 独占一行，包裹文字，具有换行效果，可以用多个p标签把文本分成很多行；

      <!--段落标签，主要放文字内容，属于块级标签，独占一行-->

      ```css
      p{
          height:30px;
          line-height:30px;		/*在30像素大小的盒子里面上下居中*/
      	}
          /*	
          行高能让单排文字 在行高内上下居中
          如果希望单排文字在一个有高度的标签内上下居中只需要把行高设置成这个高度就可以了
          */
      ......
      <p>我是一个p标签</p>
      ```

   3. *`<span></span>` 赋予文字样式，控制p标签里文字样式吗，或者做一些小部件；

      <!--在span标签里面加属性, 都是 属性 = "属性值", 属性值以 :开始 ;结束-->

   4. *`<i></i>` 倾斜文字，装小图标或阿里图标，放特殊符号和字体；

      <!--文字小部件先考虑span标签，图标特殊符号考虑i标签，也可以混用-->

   5. *`<a></a>` 超链接标签，只要是能点击，能跳转都是a标签

      ```html
      超链接标签: <a href="https://www.baidu.com">这是一个百度超链接</a>
          1. href=" "  不写的时候 点击会刷新界面，写网站的话要带上https协议
      		1. 在href里输入Javascript:void(0)，javascript:;让连接变成死链！
      		2. 写网页链接为外部链接
      		3. 写内部的html文件为内部链接
      		4. 如果地址是一个文件或者压缩包，会下载这个文件
      		<a href="images.rar">下载链接</a>
          2. target=" " 网页跳转位置,或者图片跳转位置
      		1. _self  当前页面跳转
      		2._blank 新的页面跳转 
      		3.<base target="_blank"/> 该网页下的所有超链接跳转新的页面,写<head>内
          3. title 提示作用，同图片的title属性作用相同
          4. 未点击超链接时，a标签内的字体颜色是 蓝色（浏览器未缓存）
      	   已点击超链接时，a标签内的字体颜色是 紫色（浏览器已缓存）
          5. 跳转作用
              邮箱：mailto:1210947553@qq.com
          6. 锚点（实现和目录一样的点击功能）
              eg1：
      			<a href="#bottom"></a>	通过id选择器实现目录跳转功能
      				...
                   <p id="bottom">我是p标签</p>	
      
              eg2: 
                  <a href="#bottom" name="top">底部</a>	 通过name属性可以实现前后跳转
      				...
                  <a href="#top"><p id="bottom">顶部</p></a>
      
      a标签的伪类选择器：
          a:link{}     			/*未访问的,或者说未点击之前的状态*/
          a:visited{}  			/*访问后的状态*/
          a:hover{}    			/*划过时候的状态*/
          a:active{}   			/*点击时候的状态*/
          text-decoration:none;   /*消除超链接的下划线*/
          float:right 		    /*使超链接在div区域里面右对齐*/
      ```
   
6. `<strong></strong>` 加粗标签，并强调；
  
7. `<br/>` 换行标签，**不要使用**，不利于维护！如果要换行**用两个p标签**；
  
   <!--b标签现在已经弱化使用了，能用样式解决尽量不用标签解决-->
   
8. `<em><em>` 倾斜并强调；
  
9. `<br/>` 换行标签，**不要使用**，不利于维护！如果要换行**用p标签**；
  
10. `<hr/>` 分割线标签，**不要使用**；
  
   11. `<sup></sup>` 上标   eg：a<sup>2</sup>+b<sup>3</sup>=9；
   
   12. `<sub></sub>` 下标   eg：H<sub>2</sub>+O<sub>2</sub>=H<sub>2</sub>0；
   
   13. ![1570636252686](assets/1570636252686.png)

### 2.Img标签

![1570636814346](assets/1570636814346.png)

- `src`：绝对路径，相对路径，**url**路径；

  ```html
  <img src="C:\Users\Manhua\Desktop\birth1.png">
  <img src="../img/birth1.png">
  <img src="https://www.baiduimg.com/1.jpg">
  ```

- `alt`:  如果图片加载缓慢或者卡顿路径出错，起到提示作用

  ```html
  <img scr="1.jpg" alt="图片出错了">
  ```

- `title`:  在把鼠标放在图片上的时候会有指示

  ```html
  <img scr="1.jpg" title="这是一张图片">
  ```

- `width/height`:  图片宽度    固定图片本身显示的宽度高度

  ```html
  <img src="imgs/h.png" width="100%" height="100%">	// 和父级一样的高度宽度
  ```

  ​	**jpg**：  压缩会失真		不动态	占用空间比较低

  ​	**png**： 压缩不会失真	不动态	比较大，支持半透明和全透明

  ​	**gif**：   动态
  
- `border` ：设置图片的边框

  ```html
  <img src="imgs/h.png" width="200px" height="100px" border="15px solid red">
  ```
  
- 图片自适应的方式

  > https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit

  ```css
  object-fit: cover;	/* 不缩放图片 */
  ```

  ![image-20211019123328641](./assets/image-20211019123328641.png)

注：在网页中 图片显示的时候包括基线产生的一小段空白

### 3.特殊字符

![1570639417836](assets/1570639417836.png)



## 二，HTML标签(下)

### 1.表格

#### 表格标签

> 主要用来展示数据，显示数据用的

```html
<table>
	<tr>					<!-- tr代表行 -->
        <td>单元格文字</td>	  <!-- td代表行 -->
        ...
    </tr>
</table>
```

- 表头单元格：`<th></th>` ，位于表格中的第一行，表格单元格里的数据会加粗，突出权重

  ```html
  <table>
      <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
      </tr>
      <tr>
          <td>xyb</td>
          <td>男</td>
          <td>10</td>
      </tr>
  </table>
  ```

- 表格属性：所有的属性必须写在**table**标签内

  ![1570705879701](assets/1570705879701.png)

```html
<table align="center" border="1" cellpadding="6px" cellspacing="0" width="200px" height="200px">
    <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
    </tr>
    <tr>
        <td>xyb</td>
        <td>男</td>
        <td>10</td>
    </tr>
    <tr>
        <td>gkx</td>
        <td>女</td>
        <td>10</td>
    </tr>
</table>
```

![1570706423070](assets/1570706423070.png)

##### 案例1：显示表格数据

```html
<table id="tb" align="center" border="1" cellpadding="15px" cellspacing="0" >
    <tr>
        <th>排名</th>
        <th>关键词</th>
        <th>趋势</th>
        <th>今日搜索</th>
        <th>最近七日</th>
        <th>相关链接</th>
    </tr>
    <tr>
        <td>1</td>
        <td>鬼吹灯</td>
        <td><img src="images/1.png" alt=""></td>
        <td>345</td>
        <td>123</td>
        <td><a href="">贴吧</a><a href="">图片</a><a href="">百科</a></td>
    </tr>
    <tr>
        <td>1</td>
        <td>灯吹鬼</td>
        <td><img src="images/2.png" alt=""></td>
        <td>66226</td>
        <td>33</td>
        <td><a href="">贴吧</a><a href="">图片</a><a href="">百科</a></td>
    </tr>
</table>
```

![1570707541915](assets/1570707541915.png)

#### 表格结构标签

> 为了能使表格具有更好的表现力，我们将表格分成 `<thead></head>` 头部和  `<tbody></tbody>` 两部分

1. `<thead></head>`	：用于定义表格头部，并且该标签内部必须有 <tr/> 标签

2. `<tbody></tbody>`  ：用于定义表格的主体，主要用于存放媒体数据

   ```html
   <table>
       <thead>
           <tr>
               <th>排名</th>
               <th>关键词</th>
               <th>趋势</th>
               <th>今日搜索</th>
               <th>最近七日</th>
               <th>相关链接</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>1</td>
               <td>鬼吹灯</td>
               <td><img src="images/1.png" alt=""></td>
               <td>345</td>
               <td>123</td>
               <td><a href="">贴吧</a><a href="">图片</a><a href="">百科</a></td>
           </tr>
       </tbody>
   </table>
   ```

#### 合并单元格

> 合并单元格主要包括 **跨行单元格** 和 **跨列单元格**

1. 合并第一步

   - 跨行合并：`rowspan = "合并单元格的个数"`

   - 跨列合并：`colspan = "合并单元格的个数"`

     ![1570708755429](assets/1570708755429.png)

2. 合并第二步

   - 跨行：把属性写在最上面的单元格

   - 跨列：把属性卸载最左侧的单元格

     ![1570708908005](assets/1570708908005.png)

3. 删除多余的单元格

```html
<table align="center" border=".5" cellpadding="15px" cellspacing="0" width="340px" height="150px">
    <tr>
        <td></td>
        <td colspan="2"></td>
    </tr>
    <tr>
        <td rowspan="2"></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
    </tr>
</table>
```

![1570709765332](assets/1570709765332.png)

表格常用CSS属性

1. `border-collapse: collapse;` 单元格和单元格之间的距离为0，并且边框重叠

   ```css
   table {border-collapse: collapse;}
   ```

2. `border-spacing: x, y` 单元格和单元格之间的距离，一个值代表纵向和横向

   ```css
   table {
       border-spacing: 10px 5px;
       border-spacing: 30px;
   }
   ```

3. `border` 设置边框的大小

   ```css
   th,
   td {
       padding: 8px 16px;
       border: 1px solid #e9e9e9;
       text-align: left;
   }
   ```

   

### 2.列表

#### 无序列表

> 列表天生就是用来布局的

```html
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
    ...
</ul>
```

1. 无序列表各个列表项之间没有顺序之分，是并列的

2. `<ul></ul>` 之间只能嵌套 `<li></li>` ，`<li></li>`里面能存放任何元素

3. 使用场景

   ![1570711112822](assets/1570711112822.png)

#### 有序列表(理解)

> 有顺序的列表

```html
<ol>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
    ...
</ol>
```

特点：同无序列表

#### 自定义列表(重点)

> 列表项修饰列表头，经常用来对术语名词进行解释和阐述，没有任何符号

```html
<dl>
    <dt>名词1</dt>
    <dd>名词1解释1</dd>
    <dd>名词1解释2</dd>
    <dd>名词1解释3</dd>
</dl>
```

特点：**dl** 之间只能放 **dt** 和 **dd**

使用场景：

![1570711066938](assets/1570711066938.png)

### 3.表单

#### 表单标签

> 主要用来收集用户信息

一个完整的表单主要由于 **表单域**  **表单控件**  **提示信息  **组成

![1570711382401](assets/1570711382401.png)

`表单域` ：包含表单元素的区域(form标签内)

在 HTML 标签中，`<form>` 标签常用于定义表单，以实现数据的收集和传递，他只会提交表单域的信息

```html
<form action="index.px(url地址)", method="POST(提交方式)" name="表单域名称">
    各种表单元素控件
</form>
```

![1570711804581](assets/1570711804581.png)

#### 表单控件

1. `input` 输入表单元素标签

   > **type ** 属性这只不同的属性值用来指定不同的控件类型

   ![1570718242556](assets/1570718242556.png)

   ```html
   <form action="xxx.py", method="GET" name="表单域名称">
       <!-- text 用户可以输入任何文字 -->
       用户名: <input type="text" name="username" value="请输入用户名"> <br>
       <!-- password 密码框，隐藏密码 -->
       密&emsp;码: <input type="password" name="password"> <br>
       <!-- radio 单选按钮 -->
       性&emsp;别: <input type="radio" name="sex" value="M">男 <input type="radio" name="sex" value="F">女 <br>
       <!-- checkbox 复选按钮框 -->
       爱&emsp;好: <input type="checkbox" name="hobby" value="吃饭">吃饭 <input type="checkbox" value="睡觉">睡觉 <input type="checkbox" value="打豆豆">打豆豆 <br>
       <!-- submit 用来提交表单域里面的值，以为 name=value的形式提交 -->
       <input type="submit" value="提交">
       <!-- reset 清空表单-->
       <input type="reset" value="重置"> <br>
       <!-- button 普通按钮  后期搭配 JS 使用--> 
       <input type="button" value="普通按钮"> <br>
       上传头像: <input type="file">
   </form>
   ```

   ![1570719561963](assets/1570719561963.png)

   - 除了**type**属性，还有别的属性：

   ![1570718334147](assets/1570718334147.png)

   `name/value` 属性 : 数据是以键值对的形式传入后台	 **name(表单元素name) = values(用户输入的值)**

   我们想要进行**前后台交互**，**必须写name和value**两个属性，这两个属性是给我们程序员看的

2. `label` 标签，增加用户体验

   > **label** 不属于表单标签，但是常常用来和**input**标签配合使用，增加用户体验

   ```html
   <!-- 基本语法 for里面的值必须和input里面的值相同-->
   <label for="man">男</label><input type="radio" id="man">
   ```

   ![22](assets/22.gif)

##### -表单题目

1. 有些表单刚打开页面就有显示的文字?

   <!--给这个input标签 value="值"-->

2. 页面中的表单元素很多，如何区分不同的表单元素

   <!--给不同的表单元素不同的name值，name的主要作用是用来区分不同的表单元素-->

   注意：**radio** 或者 **checkbox** 如果是一组，必须给他们相同的 **name** 值

3. 如果页面一打开某个单选按钮或者多选按钮就是选中的状态?

   <!--给那个单选/多选标签一个 checked="checked"-->

4. 如何让 input 表单元素展示不同的形态? 比如文本按钮/密码框?

   <!--修改这个表单元素的type属性-->

   

2. `select`下拉表单元素

   > 当选项中有多个选项要用户来选择时，又想要节省空间，选择下拉菜单

   ![1570722033290](assets/1570722033290.png)

   - `<selec>` 中至少包含一对 `<option>`
   - 在`<option>` 中写上 `selected="selected"` 这个属性会默认选中状态

3. `textatea`文本域表单元素

   > 当用户输入的内容过多时，我们就不能使用文本框了，因此可以使用 `<textarea>` 这个表单元素

   ![1570722492400](assets/1570722492400.png)

##### -案例2：注册页面

- 写法一

```html
<form action="">
    性&emsp;&emsp;别: <input type="radio" name="sex" id="man"> <label for="man"><span class="iconfont icon-nan"></span> 男</label> <input type="radio" name="sex" id="woman"> <label for="woman"><span class="iconfont icon-nv"></span> 女</label> <br>
    生&emsp;&emsp;日: <select name="" id=""><option value="">请选择年份</option></select> <select><option>请选择月份</option></select> <select><option>请选择日期</option></select> <br>
    所在地区: <input type="text" value="浙江"> <br>
    婚姻状况: <input type="radio" name="status" id="no-wedding"><label for="no-wedding">未婚</label> <input type="radio" name="status" id="on-wedding"><label for="on-wedding">已婚</label> <input type="radio" name="status" id="out-wedding"><label for="out-wedding">离婚</label> <br>
    学&emsp;&emsp;历: <input type="text" value="幼儿园"> <br>
    喜欢类型: <input type="checkbox" name="type" id="fm"><label for="fm">妩媚的</label> <input type="checkbox" name="type" id="ka"><label for="ka">可爱的</label> <input type="checkbox" name="type" id="xx"><label for="xx">小鲜肉</label> <input type="checkbox" name="type" id="ll"><label for="ll">老腊肉</label> <br>
    自我介绍: <textarea name="" id="" cols="30" rows="5"></textarea> <br>
    <input type="submit" value="免费注册" id="submit"> <br>
    <input type="checkbox" checked="checked" id="check">我同意注册条款和会员加入标准 <br>
    <a href="#javascrapt:;">我是会员,立即登录</a>
    <h3>我承诺</h3>
    <ul>
        <li>年满16</li>
        <li>年满16</li>
        <li>年满16</li>
    </ul>
</form>
```

![1570769362225](assets/1570769362225.png)

- 写法二

  ```html
  <table width="500px" border="0">
      <tr>
          <td>性&emsp;&emsp;别:</td>
          <td>
              <input type="radio" name="sex" id="M"> <label for="M"><span class="iconfont icon-nan"></span> 男</label>
              <input type="radio" name="sex" id="F"> <label for="F"><span class="iconfont icon-nv"></span> 女</label>
          </td>
      </tr>
      <tr>
          <td>生&emsp;&emsp;日:</td>
          <td>
              <select name="" id=""><option value="">请选择年份</option></select>
              <select name="" id=""><option value="">请选择年份</option></select>
              <select name="" id=""><option value="">请选择年份</option></select>
          </td>
      </tr>
      <tr>
          <td>所在地区:</td>
          <td>
              <input type="text" value="浙江"> <br>
          </td>
      </tr>
      <tr>
          <td>婚姻状况:</td>
          <td>
              <input type="radio" name="status" id="no-wedding"><label for="no-wedding">未婚</label>
              <input type="radio" name="status" id="on-wedding"><label for="on-wedding">已婚</label> 
              <input type="radio" name="status" id="out-wedding"><label for="out-wedding">离婚</label>
          </td>
      </tr>
      <tr>
          <td>学&emsp;&emsp;历:</td>
          <td>
              <input type="text" value="幼儿园">
          </td>
      </tr>
      <tr>
          <td>喜欢类型:</td>
          <td>
              <input type="checkbox" name="type" id="fm"><label for="fm">妩媚的</label> 
              <input type="checkbox" name="type" id="ka"><label for="ka">可爱的</label> 
              <input type="checkbox" name="type" id="xx"><label for="xx">小鲜肉</label> 
              <input type="checkbox" name="type" id="ll"><label for="ll">老腊肉</label>
          </td>
      </tr>
      <tr>
          <td>自我介绍:</td>
          <td>
              <textarea name="" id="" cols="30" rows="5"></textarea>
          </td>
      </tr>
      <tr>
          <td></td>
          <td><input type="submit" value="免费注册"></td>
      </tr>
      <tr>
          <td></td>
          <td><input type="checkbox" checked="checked">我同意注册条款和会员加入标准</td>
      </tr>
      <tr>
          <td></td>
          <td><a href="#javascrapt:;">我是会员,立即登录</a></td>
      </tr>
      <tr>
          <td></td>
          <td><h3>我承诺</h3></td>
      </tr>
      <tr>
          <td></td>
          <td>
              <ul>
                  <li>年满16</li>
                  <li>年满16</li>
                  <li>年满16</li>
              </ul>
          </td>
      </tr>
  </table>
  ```

  