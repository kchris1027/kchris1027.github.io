---
title: Hexo网站的自动化部署
tags:
  - Hexo
  - GitHub
categories:
  - GitHub
description: 自动构建、自动部署
abbrlink: 65c2dc85
date: 2023-04-17 17:48:15
cover:
---

## Hexo + GitHub 建站  
这个视频讲解的很明晰了，就不重复造轮子了。文字版 {% btn 'https://www.jianshu.com/p/97dfbc8e79db',点这里,far fa-hand-point-right,outline %}  

{% bilibili https://www.bilibili.com/video/BV1dt4y1Q7UE 17:06 true %}  

<!-- 如果你要隐藏简介，添加true即可（注意，要隐藏简介则必须设置适配时间！），如下 -->
<!-- {% bilibili https://www.bilibili.com/video/BV1eh411G7bK 00:29 true %} -->
<!-- 来源：https://blog.leonus.cn/2023/butterflyTag-1.html -->
## GitHub Actions 自动化   
- 新建workflows脚本  
    在`.github/workflows/`文件夹下新建文件`deploy.yml`,填写内容如下：
    ```yml
    name: Build and Deploy
    on: [push]
    jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout 🛎️
            uses: actions/checkout@v3 # If you're using actions/checkout@v3 you must set persist-credentials to false in most cases for the deployment to work correctly.
            with:
            persist-credentials: false

        - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
            run: |
            npm install
            npm run build
            env:
            CI: false

        - name: Deploy 🚀 #部署至github-pages所对应仓库
            uses: JamesIves/github-pages-deploy-action@releases/v4
            with:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            BRANCH: master # The branch the action should deploy to.
            FOLDER: public # The folder the action should deploy.

        - name: Docker deploy #通过git部署至自己的服务器对应文件地址
            uses: easingthemes/ssh-deploy@main
            env:
            SSH_PRIVATE_KEY: ${{ secrets.ACCESS_TOKEN }} # ACCESS_TOKEN 为加密参数，于仓库的 Settings-Secrets and variables-Acitons 页面点击 New repository secret 进行添加，确保添加的名称与这里的对应上
            ARGS: "-rlgoDzvc -i --delete"
            SOURCE: "public/"
            REMOTE_HOST: ${{ secrets.REMOTE_HOST }} # REMOTE_HOST 为加密参数
            REMOTE_USER: ${{ secrets.REMOTE_USER }} # REMOTE_USER 为加密参数
            TARGET: ${{ secrets.TARGET }} # TARGET 为加密参数
    ```
    推送至仓库后会自动化执行对应脚本。  
    此处用到了三个脚本，有兴趣的可自行了解：  
    - [checkout](https://github.com/actions/checkout)  
    - [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)  
    - [easingthemes/ssh-deploy](https://github.com/easingthemes/ssh-deploy)  
    额外注释：
    ![Alt text](../img/Hexo%E7%BD%91%E7%AB%99%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2/1681812168797.png)

## Hexo的Docker部署  
- 网站文件夹所在根目录下新建文件 `Dockerfile` ,输入内容：  
    ```dockerfile
    # 基于 node 镜像构建
    FROM node:latest
    # 复制 hexo 目录下的数据至容器的 data 目录
    COPY hexo /data/
    # 安装 http-server 模块
    RUN npm install -g http-server
    # 指定工作目录
    WORKDIR /data
    # 运行容器时执行的shell命令：启动 http 服务指向 /data 目录，默认端口为 5000
    CMD [ "http-server","-p","5000" ]
    ```
    上传此文件和网站文件至自己服务器  
    *注：文件的构建方式有多种，此处只是用最简单的方式进行实现，具体构建方式可自行探索。更多指令详见 [Dockerfile](https://www.runoob.com/docker/docker-dockerfile.html)。*  
      

- 连接服务器并进入文件所在地址  
    ```bash
    cd /存放文件的地址/
    ```
- 执行Docker镜像构建指令  
    ```docker
    docker build -t hexo(镜像名称可自定义)
    ```

- 使用构建的镜像创建容器 
    ```docker
    docker run -d -p 5000:5000 -v /root/website_data/hexo:/data --name my-hexo-blog --restart=always hexo
    ```
    其中：  
    `-p` 指定访问端口
    `-v` 映射程序运行数据的文件地址，容器内文件地址不好找，最好自定义文件路径  
    `--name` 定义容器名称  
    `--restart=always` 跟随docker程序自启动  
    `hexo` 自构建镜像名称

## 添加域名访问
使用代理软件对指定端口以域名形式进行访问，具体操作见这篇文章：{% post_link Nginx的安装与配置 %}
