---
title: Portainer安装
tags:
  - Docker
  - Linux
categories: Linux
cover: /img/Portainer安装/top.png
abbrlink: 13d4b70d
date: 2023-04-04 15:13:04
---

## 简介  
Portainer是一个开源的Docker管理工具，它可以帮助用户在Web界面上轻松地管理Docker容器、镜像、卷和网络等。  

## 安装
1.  确认已经安装了`Docker`和`Docker Compose`，如果没有，请先安装。
    
2.  在终端中输入以下命令，从Docker Hub上下载Portainer的最新版本：
    
    ```bash
    sudo docker pull portainer/portainer-ce
    ```
    
3.  创建一个新的Docker容器并运行Portainer：
    
    ```bash
    sudo docker run -d \
        -p 8000:8000 \
        -p 9000:9000 \
        --name portainer \
        --restart always \
        -v /var/run/docker.sock:/var/run/docker.sock \ 
        -v portainer_data:/data \
        portainer/portainer-ce  

    ```
    
    解释一下上面的命令：
    
    *   `-d` 参数表示以后台模式运行容器
    *   `-p` 参数将主机的端口映射到容器的端口，例如 `-p 8000:8000` 将主机的8000端口映射到容器的8000端口
    *   `--name` 参数指定容器的名称为 `portainer`
    *   `--restart always` 参数表示容器在崩溃或重启后将自动重新启动
    *   `-v` 参数将主机的目录或文件夹挂载到容器中，例如 `-v /var/run/docker.sock:/var/run/docker.sock` 将主机的Docker socket文件挂载到容器中，方便容器访问宿主机的Docker引擎
    *   `portainer/portainer-ce` 是要运行的Docker镜像的名称
4.  打开Web浏览器，访问 `http://localhost:9000`，按照界面上的提示设置管理员账号和密码，然后就可以开始使用Portainer了。
    

    *注意：如果使用的是远程服务器，则需要将 `localhost` 替换为服务器的IP地址或域名。另外，建议在使用Portainer之前先了解Docker的基本概念和使用方法。*
