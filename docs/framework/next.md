---
id: next
title: Next.js
---

## -手动创建项目

1. 首先需要安装 `next`、`react` 和 `react-dom`

   ```shell
   npm install next react react-dom
   # or
   yarn add next react react-dom
   ```

2. 替换`package.json`文件中的配置项

   ```json
   "scripts": {
     "dev": "next dev",	// 开发模式启动 Next.js
     "build": "next build",// 构建用于生产环境的应用程序
     "start": "next start",// 启动 Next.js 生产环境服务器
     "lint": "next lint"	// 设置 Next.js 的内置 ESLint 配置
   }
   ```

3. 在项目中创建文件，写代码

## -自动创建项目

1. 在命令行执行

   ```shell
   npx create-next-app
   # or
   yarn create next-app
   ```

2. `npx`会自动帮我们安装所需依赖并创建项目

   ![](/assets/next.assets/image-20210816110235163.png)

   安装成功！

   <img src="/assets/next.assets/image-20210816110256231.png" alt="image-20210816110256231" />

# 2.项目文件

## -page 目录

在`next`中，路由是根据文件名进行关联的，比如:

1. 一级目录下，`page/home.js`在路由中就被映射为`xxx.com/home`
2. 二级目录下，`page/home/index.js`在路由中就被映射为`xxx.com/home`
3. 二级目录下，`page/home/haha.js`在路由中就被映射为`xxx.com/home/haha`

# 3.路由

## -前端路由

### Link 组件

在 next 中，使用`Link`组件进行前端路由切换，使得组件发生变化

1. 导入`Link`组件

   ```js
   import Link from 'next/link';
   ```

2. 使用组件

   ```jsx
   <Link href="/posts/first-post">
     <a>this page!</a>
   </Link>
   ```

# 4.态资源文件

在 next 中，直接使用 `/` 可以访问到 `static/` 下的文件夹，但是要确保静态文件中没
有与 `pages/` 目录下的文件重名的，否则这将会报错喔~

## -图片

图片可以存放在根目录下`public/image/`，并通过`next`提供的`Image`组件展示

`next`内置了图片组件`Image`，并对原生`image`组件进行
了[优化](https://www.nextjs.cn/docs/basic-features/image-optimization)

1. 引入`Image`组件

   ```js
   import Image from 'next/image';
   ```

2. 使用组件

   ```jsx
   <Image
     src="/image/1.jpeg"
     alt="Picture of the author"
     width={500}
     height={500}
   />
   ```

请确保静态文件中没有与 `pages/` 目录下的文件重名的，否则这将导致错误

# 5.Metadata

指代元数据，即`html`页面上自带的数据，比如`header`内容，`header`中
的`title`,`link`标签等。

1. 引入`Head`组件

   ```js
   import Head from 'next/head';
   ```

2. 使用组件

   ```jsx
   <Head>
     <title>我是title</title>
     <link rel="stylesheet" href="/favicon.ico" />
     <meta name="viewport" content="initial-scale=1.0, width=device-width" />
   </Head>
   ```

# 6.CSS

## -组件样式

在 next 中，我们可以使用`css`模块，就是以`.module.css`结尾的`css`文件，它允许我
们在项目中像导入模块一样导入样式

1. 创建`layout.module.css`文件，在`style`文件夹或在对应组件文件夹下创建

   ```css
   .main {
     width: 300px;
     height: 200px;
     background-color: turquoise;
   }
   ```

2. 在组件中引入

   ```jsx
   import React from 'react';
   import style from '../xx/module.css';

   export default function Layout({ children }) {
     return <div className={style.main}>{children}</div>;
   }
   ```

## -全局样式

在`next`中，想要添加全局样式比较特殊，只有在`pages/_app.js`文件中才能添加全局样
，全局`CSS` 文件可以放置在任何位置并使用任何名称

1. 在`styles/globals.css`中添加全局样式

2. 在`_app.js`中引入

   ```jsx
   import '../styles/globals.css'; // 引入css

   function MyApp({ Component, pageProps }) {
     // pageProps:是一个返回当前页面组件的代码
     return <Component className={'aaa'} {...pageProps} />;
   }

   export default MyApp;
   ```

3. 在子组件中使用样式

   ```jsx
   // 布局组件
   import React from 'react';

   export default function Layout({ children }) {
     return <div className={'aaa'}>{children}</div>;
   }
   ```

   ![image-20210816164001810](/assets/next.assets/image-20210816164001810.png)

## -第三方库切换类

使用 `classnames` 这个库可以轻松切换类，这也是`next`官网推荐的一个库，可以试试

1. 安装

   ```shell
   npm install classnames
   # or
   yarn add classnames
   ```

2. 使用

   1. 定义`css`文件

      ```css
      .success {
        color: rgb(5, 5, 5);
      }

      .fail {
        color: rgb(13, 0, 255);
      }
      ```

   2. 定义`js`文件

      ```jsx
      import React from 'react';
      import cn from 'classnames';
      import style from './alert.module.css';

      export default function Alert({ type }) {
        return (
          <div
            className={cn({
              [style.success]: type === 1,
              [style.fail]: type === 0,
            })}
          >
            我是状态
          </div>
        );
      }
      ```

   3. 调用组件

      ```jsx
      import React from 'react';
      import Layout from '../../components/layout';
      import { useState } from 'react';
      import Alert from '../../components/Alert';

      export default function User() {
        let [type, setType] = useState(1);

        return (
          <Layout>
            <Alert type={type}>看我现在的颜色</Alert>
            <button
              onClick={(e) => {
                type ? setType(0) : setType(1);
              }}
            >
              点我
            </button>
          </Layout>
        );
      }
      ```

# 7.预渲染两种模式

## -预渲染概念

预渲染，是一个最近很新的词汇，只要是现代`ssr`框架都具有这一公重要的功能

顾名思义，预渲染的意思就是其本身意思，这意味着在浏览器拿到 html 页面之前，服务端
就已经把 html 里面的数据在服务端渲染拼接好

- 这和我们以前所理解的服务端渲染又有不同，旧时代的服务端渲染，可以看成及时服务端
  渲染，例如，你现在要请求**Home.html**页面，服务端就在你发送请求后，拎着模板引
  擎，去数据库中拿数据，再把两者拼接到一起给你返回带内容的 Html 页面

- 而这里的预渲染是在指，在`next build` 构建项目时，已经把数据从数据库中拿取出来
  并拼接成一个完整的页面，对速度和 seo 优化有很大的提升，因为不需要服务器进行逻
  辑操作，只需要返回我构建出的页面即可。

<img src="/assets/next.assets/image-20210816211350015.png" alt="image-20210816211350015"  />

## -ssg 静态生成

ssg，全名为 **server side genterate** 即服务端生成器，它和服务端最大的不同就
是**ssg**是在**next**项目 **next build** 构建的时候生成所有页面，然后在每个请求
上复用这些 html，我们生成的这些页面可以丢给**cdn**运营商，返回的页面拥有更快的速
度和更好的 seo 优化。而**ssr**是在用户请求过来之后，再去数据库里获取数据，拼接模
板，返回给用户，对服务器的压力大，返回速度慢。

:key: 静态页面可以应用于以下这些：

- 不用验证用户信息，返回给每个用户的数据都是一样的
- 博客文章
- 帮助和文档

### getStaticProps 方法

:star: ssg 可以在页面构建时，去请求这个页面所需要的的数据（比如说博客，文档等）
，再生成一个一个页面

```jsx
export default function Home({data}) {
  // 解构出data

  return(
    <>
      <ul className={utilStyles.list}>
        {data.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            {title}
            <br />
            {id}
            <br />
            {date}
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  // 从数据库，API获取数据
  const data = ...

  // 返回一个对象给Home组件
  return {
    props: {
      data: 111
    }
  }
}
```

## -ssr 服务端渲染

这个就是和以前的 `jsp ` 渲染一样，用户请求页面，后端根据参数访问数据库，进行逻辑
处理，最后把数据嵌如 jsx 中，返回给前端。

:key: ssr 一般都是用在需要实时改变页面数据，并且需要验证（比如说验证用户，不同用
户不同页面）的渲染模式

<img src="/assets/next.assets/image-20210816212914895.png" alt="image-20210816212914895"  />

## -混合渲染

这个就流弊了，两种模式可以混着用，双倍的快乐，看看官网怎么解释的：

![image-20210816213109509](/assets/next.assets/image-20210816213109509.png)
