---
id: electron
title: ElectronJS打包总结
---

## 一,ElectronJS 是什么

ELectronJs 是一款框架, 用于将 **HTML**,**CSS**,**JavaScript** 构建的 **web **应
用打包成能在 **win**,**mac**,**linux **上运行的跨平台桌面端应用. 同
时**ElectronJS **在底层嵌入**chromium(作为前端) **和 **nodeJS(作为后端). **使其
兼具**浏览器**(使用 cookie,session 等)和**NodeJS **(读写本地文件,系统能力等等)两
者的能力,使前端程序员也能轻松构建出桌面端应用.

<!-- ![image.png]() -->

<img
src="/assets/electron.assets/1659443593112-a6980a87-8030-423b-9899-db4bb8d4fe45.png"
style={{zoom: '65%'}}/>

开发者需要关注的三个东西: mianJS, preLoadJS, HCJ(html,css,js)

<img
src="/assets/electron.assets/1659443694234-a1f3e9dc-3040-45c8-a7ec-b5868c86c30f.png"
style={{zoom: '75%'}}/>

## 二,ELectronJS 解决了什么问题

在使用 ElectronJS 之前, 如果想构建桌面 GUI 软件, 并能同时在 win,mac,linux 上运行
, 一般都是用 C++的这三个框架: wxWidgets, GTK, Qt. 如果想开发桌面端应用, 就必须使
用 C++来进行开发, 开发者想要他们快速完成桌面应用十分苦难. 虽然别的语言诸如
Python、C#、Go 等也针对这几个框架推出过自己的库, 但是想要使用这几个框架的全部特
性还是要用编写 C++代码. 对于前端程序员而言想要开发桌面端应用更是难上加难. 在
2013 年的时候 赵成和 Github 工程师发创建了这个项目, 当时该项目的名字为 Atom
Shell，主要用来服务于 GitHub 的开发工具 Atom，在 2014 年 5 月的时候该项目开源
，2015 年 4 月正式更名为 Electron。ElectronJS 的横空出世, 给前端程序员打开这个领
域的大门.

## 三,ELectronJS 如何使用

### 安装运行 electron

1. 进行项目初始化

```shell
mkdir my-electron-app && cd my-electron-app
pnpm init
```

2. 配置 package.json 文件

```shell
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

main.js 是 electron 应用的程序入口, 可以自由命名, 但是要保证 package.json 中的
main 字段为主入口文件

3. 安装 electronJs

```shell
pnpm add -D electron
```

4. 在 package.json 中加入以下启动程序命令

```shell
{
  "scripts": {
    "start": "electron ."
  }
}
```

5. 创建主进程文件

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载文件
    },
  });

  mainWindow.loadFile('./index.html'); // html入口文件
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
```

6. 启动项目

```shell
pnpm run start
```

### 渲染进程如何通信 node 进程

前面我们了解到, 在 **Electron **应用中, 我们可以在渲染进程中拿到 **Node** 的权限
, 执行 **Node **能执行的所有操作, 那我们该如何编写代码呢? 首先 **Electron** 应用
和现代浏览器是一样, 采用的多进程架构, 主进程, **Node**进程, 渲染进程都是相互隔离
开的, 进程之间通信需要通过 **IPC** 进行通信, 之前介绍过 `preload.js` 的作用, 虽
然他是属于渲染进程, 但是同时拥有渲染进程和**Nde**进程的权限, 我们可以使用
**Electron **暴露的接口, 把一些 **IPC **通信的 **API **暴露到渲染进程中, 在渲染
进程调用这些 **API **就能和 **Node**进程进行通信.

1. 在 `preload.js` 中往浏览器进程的 window 对象中暴露一个接口.

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myCusApi', {
  openFile: (args1, args2) => ipcRenderer.invoke('openFile', args1, args2),
});
```

2. 在主进程 `main.js` 中编写 node 代码

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载文件
    },
  });

  mainWindow.loadFile('./index.html'); // html入口文件
}

function handleOpenFile() {
  // node代码
}

app.whenReady().then(() => {
  // 绑定事件处理函数
  ipcMain.handle('openFile', handleOpenFile);

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
```

3. 在浏览器进程中调用暴露的 API

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button class="btn">点我</button>
  </body>
  <script>
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', (e) => {
      // 调用暴露的API
      window.myCusApi.openFile();
    });
  </script>
</html>
```

### 配合构建工具使用

举例: vite

1. vite 在启动时, 会暴露一个本地地址, 比如: `http://localhost:8000`
2. 只需要修改主进程 `main.js` 中的加载地址如下图:

![image.png](/assets/electron.assets/1659584515872-08e62a87-7e63-46fc-b274-64b282e560ea.png)打
包成桌面端应用

#### 打包成 mac 桌面端应用

1. 修改 `package.json` 字段, 并且把需要打包的文件全放入 `build` 文件夹中

```json
"build": {
  "appId": "my-first-tool-app",
  "files": [
    "build/**/*"		// 打包项目根目录
  ],
  "productName": "my-first-tool-app",
  "directories": {
    "output": "dist"	// 输出目录
  },
  "mac": {
    "category": "your.app.category.type",
    "icon": "icon.icns"
  }
}
```

2. 修改 `package.json` 中的 `script` 字段, 添加以下命令并运行:

```json
 “script”: {
   "pag-mac": "electron-builder --mac",
 }
```

等待一段时间后即可看到打包成
功![image.png](/assets/electron.assets/1659584900737-cfd8ebdd-0c88-4a81-997c-7f5c9c88f5e9.png)

#### 打包 win 桌面端应用

windows 打包应用比较繁琐，主要的问题是很多依赖包在下载时因为网络原因都会下载失败
，导致打包时一直出错，不能通过换源问题解决依赖下载问题，需要自行去下载这些依赖包
并安装在对应文档的目录下：

```shell
macOS ~/Library/Caches/electron-builder
linux ~/.cache/electron-builder
windows %LOCALAPPDATA%\electron-builder\cache（C:\Users\12109\AppData\Local\electron-builder\Cache）
```

具体需要安装的依赖包如下
：![image.png](/assets/electron.assets/1659602757152-c999ef89-9e68-4c6a-92c1-1e9470942791.png)
下载 wincodesign 包，下载地址
：[github.com/electron-us…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-builder-binaries%2Freleases%2Fdownload%2FwinCodeSign-2.5.0%2FwinCodeSign-2.5.0.7z)
下载 nsis-resources 包，下载地址
：[github.com/electron-us…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-builder-binaries%2Freleases%2Fdownload%2Fnsis-resources-3.4.1%2Fnsis-resources-3.4.1.7z)
下载 nsis 包，下载地
址[github.com/electron-us…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Felectron-userland%2Felectron-builder-binaries%2Freleases%2Fdownload%2Fnsis-3.0.3.2%2Fnsis-3.0.3.2.7z)

打包过程：

1. 首先修改 `package.json` 中的 `build` 字段, 配置信息如下:

```json
  "build": {
    "appId": "jms.jakj.app",
    "files": [
      "build/**/*"
    ],
    "productName": "光电卫星检测",
    "directories": {
      "output": "dist"
    },
    "win": {
      "target": [
        "msi",
        "nsis"
      ]
    },
    "nsis": {
      "oneClick": false,
      "language": "2052", // 语言设置 中文
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    }
  }
```

2. 修改 `package.json` 中的 `script` 字段, 添加以下命令并运行:

```json
"scripts": {
  "dis-win32": "pnpm run build && electron-builder --win --ia32",
  "dis-win64": "pnpm run build && electron-builder --win --x64",
}
```

如果时通过构建工具开发的项目, 项目中的路由需要全部替换成哈希路由(使项目 **build
**以后能直接通过双击`index.html` 访问), 这样才能保证项目打包之后安装的 `exe` 文
件不会白屏. 等待一段时间后, 打包成功
:![image.png](/assets/electron.assets/1659602694568-df21dcba-8765-46d3-a530-359550abf143.png)
