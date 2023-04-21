---
title: Watchtower的安装与使用
tags:
  - Docker
  - Linux
categories: Linux
abbrlink: 5301354c
date: 2023-04-21 18:02:52
description: 一个自动更新Docker容器的工具
cover:
---
## 简介
Watchtower是一个Docker容器，可以自动更新您的Docker映像。使用Watchtower可以确保您的容器始终运行最新版本的映像。

##  安装Watchtower
    
您可以使用Docker命令从Docker Hub上安装Watchtower映像。在命令行中输入以下命令： 
```docker
docker pull containrrr/watchtower
```
    
##  运行Watchtower容器
    
要启动Watchtower容器，请在命令行中输入以下命令： 

```docker
docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower
```
    
这将在后台运行Watchtower容器，并将Docker守护程序的Unix套接字挂载到Watchtower容器中。
    
##  设置Watchtower容器的参数
    
在运行Watchtower容器之前，您可以设置一些参数来控制其行为。以下是一些常见的参数：
    
-   `--interval`：设置Watchtower检查更新的时间间隔，默认值为300秒。
-   `--cleanup`：在更新容器时自动清理停止的容器和未使用的镜像。这对于释放磁盘空间很有用。  
-   `--label-enable`: 启用基于标签的过滤器
-   `--label`: 指定要监视的容器标签
-   `--debug`：启用详细日志记录，以便进行故障排除。
    
在命令行中，您可以通过以下方式设置这些参数：
```docker
docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --interval 60 --cleanup --debug
```
这将以每60秒检查一次更新的间隔运行Watchtower容器，并在更新容器时自动清理停止的容器和未使用的镜像。  
```docker
docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -e WATCHTOWER_LABELS=my-container containrrr/watchtower
```
使用标签过滤器监视名为 my-container 的容器
    
##  配置要更新的容器
    
Watchtower会自动监视所有正在运行的容器，并在新版本可用时自动更新它们。但是，如果您希望Watchtower只更新特定的容器，可以使用标签来指定要更新的容器。例如，以下命令将在启动容器时使用`com.centurylinklabs.watchtower.enable=true`标签：

```docker
docker run --name myapp -d -p 80:80 -e "com.centurylinklabs.watchtower.enable=true" myapp:latest
```

这将使Watchtower仅更新使用此标签的容器。
    
##  检查更新
    
Watchtower将在容器的映像发生更改时自动更新它们。您可以在容器日志中查看更新记录。要查看Watchtower容器的日志，请使用以下命令：
```docker
docker logs watchtower
```
如果您看到Watchtower输出的`Found new running container`消息，则表示Watchtower已更新一个容器。