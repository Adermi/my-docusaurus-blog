---
id: git
title: Git 使用
---

### 使用 Git 管理代码

1. 在[github](https://github.com/new)中创建仓库

   <img src="/assets/git.assets/image-20201107205443022.png"
   alt="image-20201107205443022" style={{zoom: '70%'}} />

2. 在项目中添加 git 管理

   <img src="/assets/git.assets/image-20201107205722548.png" alt="image-20201107205722548"  />

3. 进行 git 操作

   `HEAD` : 当前版本

   <img src="/assets/git.assets/image-20201109001544841.png" alt="image-20201109001544841"  />

   git 命令大全

   ```shell
   # 提交本地仓库, 上传服务器
   $ git init	 # 初始化一个空的git仓库 就是隐藏的.git文件
   $ git add .	 # 将当前目录下修改的所有代码从工作区添加到缓存区 . 代表当前目录
   $ git commit -m "xxx" # 将缓存区内容添加到本地仓库,xxx为本次提交的说明
   $ git remote add origin	https://xxx # 设置远程主机,也就是代码推送服务器
   $ git push -u origin master	# 本地仓库代码发到github中, master是主分支 可修改(-u的命令需要在第一次提交的时候跟上,让本地和空仓库关联，后续的提交只需要git push origin master就行了)
   $ git push [origin] --tags	# 上传所有的tag	例：git push [origin] --tags
   $ git push origin [tagname]	# 上传单个tag		 例：git push origin "V1.0"

   $ git push -f origin master # 确保本地没问题，强制上传
   $ git pull origin master	# 拉取

   # 远程连接
   $ git remote add origin	https://xxx # 设置远程主机,也就是代码推送服务器origin是我们给这个主机起名
   $ git remote -v 	# 查看远程主机
   $ git remote rm origin		# 根据名字删除远程库
   $ ssh -T git@github.com		# 检查ssh端口是否能够连接，默认端口22，可以修改通过加上参数 -p 443

   # 分支
   $ git fetch origin '远程分支名'	# 会新开辟一个分支，不会像pull直接合并当前分支
   $ git branch (-c|-C) '分支名称'	 # 复制当前分支并创建,小c只会在分支不存在时才会复制创建
   $ git branch (-M|-m) '分支名称'	 # 重命名分支
   $ git branch (-v|-vv)		    # 查看所有分支,-v可以显示版本号,-vv则可以显示远程分支的信息
   $ git switch -c '分支名'    # 新版创建并切换分支
   $ git switch '分支名'		# 切换到已存在的分支上
   $ git merge '分支名'		# 合并分支
   $ git branch -d '分支名'	# 删除分支(若分支没合并无法删除, -D强制删除)
   $ git checkout -b "本地分支名" "远程分支名"		# 创建本地分支

   # 创建标签
   $ git tag "标签名"               # 创建标签,记录当前代码状态,必须commit提交后
   $ git tag "标签名" -m "备注"     # 创建带有备注的标签
   $ git tag -l "0*"               # 查看所有以0开头的标签 *是模糊匹配
   $ git tag -d "标签名"			# 删除标签
   $ git checkout "标签名"		# 切换标签
   $ git push --tags			  # 提交所有标签
   $ git show v1.0.0			  # 显示某个标签的详细信息

   # 版本回退（任何版本都不会删除,可以通过记录进行来回横跳转）
   $ git reset "版本号"				# 可通过git log查看，就是 commit id 一串哈希值
   $ git reset --hard HEAD^	  # 回退上一个版本  HEAD^^:回退两个版本 HEAD~n:回退n个版本
   $ git checkout -- file			# 可以丢弃工作区的错误修改（没有git add情况下）
   $ git reset HEAD .					# 把提交到缓存区的内容撤销

   # 记录查询
   $ git log 					# 查看之前提交的版本
   $ git reflog				# 查看所有操作，可以可以随意跳转版本（例如:错误reset跳转）
   # 2c9a1fc HEAD@{4}: commit: V2.0	commit提交记录
   $ git status				# 查看当前版本那些文件被修改
   $ git diff					# 查看文件被修改了那些内容

   # 删除文件
   $ git clean -df				# 删除不在git管理之下的文件
   ```

### git 全局设置

```shell
git config --global user.name "xxxxx"
git config --global user.email "xxxxxx@163.com"
```

## 使用 SSH 拉取上传代码

使用 SSH 通信方式上传本地代码和拉取远程代码。

1. 在本地创建 SSH 公钥和私钥

   在运行下面的命令后，可以在用户主目录（linux -> cd ~/.ssh）里找到`.ssh`目录，
   里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是生成的 SSH 公钥和私钥秘钥对
   ，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

   ```shell
   ssh-keygen -t rsa -C "youremail@example.com"	# 自己的邮箱，然后一路回车，这里会显示目录所在
   ```

2. 登陆 GitHub -> setting，关联你的账号和设备。

   在 Key 文本框里粘贴公钥`id_rsa.pub`文件里的内容

   <img src="/assets/git.assets/image-20221027153246402.png" alt="image-20221027153246402"  />

   <img src="/assets/git.assets/image-20221020143033797.png" alt="image-20221020143033797"  />

3. 操作完上面两步就可以在设备上上传拉取代码了。你的 github 账号上也会有相应绑定
   过密钥的设备。

   <img src="/assets/git.assets/image-20221020143456204.png" alt="image-20221020143456204"  />

## 在 HTTPS 端口使用 SSH

如果使用 ssh 方式来 push 的时候出现这种错误：不能使用 22 端口进行连接：

![image-20220428153202275](/assets/git.assets/image-20220428153202275.png)

解决方案：

1. 在用户主目录，也就时我们生成公钥秘钥的那个文件里，`touch config`生成`config`

2. 请在 `~/.ssh/config` 编辑该文件，并添加以下部分：

   ```
   Host github.com
   Hostname ssh.github.com
   Port 443
   User git
   ```

![image-20220428153404474](/assets/git.assets/image-20220428153404474.png)

可以 push 了

![image-20220428153434514](/assets/git.assets/image-20220428153434514.png)

### 添加 `.gitignore` 文件

```shell
# 1. 创建gitignore文件
touch .gitignore

# 2. 语法规则
以【/】表示目录以【*】匹配多个字符以【?】匹配单个字符
以【[]】匹配字符列
以【!】忽略文件或者目录

# 3. 用法
*.class # 忽略所有class文件
aaa/*	# 忽略aaa文件夹下所有文件
```

## PM2 使用

### PM2 命令

```shell
# 运行npm run dev
pm2 start npm -- run dev

# --watch监听代码变化，--name任务名称，run dev 运行 npm run dev
pm2 start npm --watch --name nickname -- run dev

# 查看某一个进程的日志
pm2 log [id]

# 查看所有日志
pm2 logs

# 查看所有日志文件
pm2 flush
```

## 如何部署 web 项目

1. 创建网站站点，进行域名映射（图中绿色的域名映射必须勾上）

   域名映射：（一个服务器上可能有多个 web 服务，可能 aa.cc, bb.cc 的请求都是通往
   同一个服务器，服务器就是靠域名映射识别哪些请求是哪个网站的）。

   ![image-20220922155038403](/assets/git.assets/image-20220922155038403.png)

   ![image-20220922155139515](/assets/git.assets/image-20220922155139515.png)

2. 给站点添加反向代理

   添加反向代理的目的是访问域名时，比如访问 blog.xyb.cool 时，服务器会把请求分发
   到 blog.xyb.cool 在服务器上跑的服务上。比如所有通过 blog.xyb.cool 的请求都交
   给 localhost:3000 端口上的 web 服务处理，通过 gty.xyb.cool 的请求都交给
   localhost:8000 端口上的 web 服务处理.

   ![image-20220922155257878](/assets/git.assets/image-20220922155257878.png)

   <img src="/assets/git.assets/image-20220922154739393.png" alt="image-20220922154739393" />

   <img src="/assets/git.assets/image-20220922154903020.png" alt="image-20220922154903020" />

   nginx 配置

   ```shell
   #PROXY-START/
   location ~* \.(gif|png|jpg|css|js|woff|woff2)$ {
   	proxy_pass http://127.0.0.1:39002;
       proxy_set_header Host 127.0.0.1;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header REMOTE-HOST $remote_addr;
       expires 12h;
   }
   location / {
       proxy_pass http://127.0.0.1:39002;
       proxy_set_header Host 127.0.0.1;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header REMOTE-HOST $remote_addr;
       add_header X-Cache $upstream_cache_status;
       #Set Nginx Cache
   	add_header Cache-Control no-cache;
   }
   #PROXY-END/
   ```

3. 去到根目录下，拉取项目文件，下载依赖，编译项目

   ![image-20220922155823341](/assets/git.assets/image-20220922155823341.png)

   <img src="/assets/git.assets/image-20211115200818572.png" alt="image-20211115200818572"  />

   <img src="/assets/git.assets/image-20211115200838875.png" alt="image-20211115200838875" />

4. 创建 PM2 进程，这个进程会帮我们启动项目，项目的运行端口我们可以自己修改。

   <img src="/assets/git.assets/image-20211115201022746.png" alt="image-20211115201022746" />

   <img src="/assets/git.assets/image-20211115201120560.png" alt="image-20211115201120560"  />

   ![image-20220922232243397](/assets/git.assets/image-20220922232243397.png)

   1. 放行端口！！！！

      只有放行端口，挂在端口上的服务才能被反向代理分发成功。

      ![image-20220922232126754](/assets/git.assets/image-20220922232126754.png)

## 服务器密码

### 密码重置

首先提升为 root 用户 `sudo -i`

输入以下指令:

```shell
# passwd 修改linux密码
# 修改宝塔面板密码
$ cd /www/server/panel && python tools.py panel [要修改的密码]
```

### 数据库连接

- 使 mysql 能被外界 ip 访问

  https://www.jianshu.com/p/7a41734b502e

  ```
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你设置的密码' WITH GRANT OPTION;
  ```

- 连接数据库

  ![image-20211101141018040](/assets/git.assets/image-20211101141018040.png)
