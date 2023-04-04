---
title: Nginx的安装与配置
tags:
  - Linux
  - ssl
categories: Linux
cover: /img/Nginx的安装与配置/logo.png
abbrlink: 661ecc9
date: 2023-04-04 12:37:18
---

## Nginx简介
Nginx是一款高性能的Web服务器和反向代理服务器，它可以处理高并发的请求，同时还支持负载均衡、HTTP缓存和动态HTTP请求等功能。Nginx的设计理念是高并发、低消耗、高可靠性和易扩展，因此在大型网站的应用非常广泛。

Nginx的主要作用包括：
1. Web服务器：Nginx可以作为Web服务器，处理HTTP请求，向客户端提供静态或动态的Web内容。
2. 反向代理服务器：Nginx可以作为反向代理服务器，将客户端请求转发到后端服务器，处理后端服务器的响应结果并返回给客户端。
3. 负载均衡器：Nginx可以作为负载均衡器，将客户端请求分发到多个后端服务器，实现负载均衡，提高系统的可扩展性和稳定性。
4. HTTP缓存服务器：Nginx可以作为HTTP缓存服务器，缓存静态文件和动态文件，提高Web应用的响应速度和性能。
5. TCP/UDP代理服务器：Nginx还可以作为TCP/UDP代理服务器，处理TCP/UDP请求，实现代理和转发功能。  

具体使用方式详见 [官网](http://nginx.org/en/) , 对于个人而言，一般是用来设置SSL证书，让域名代理的主机地址能通过`https`访问。

## 开源项目
- [nginx/nginx](https://github.com/nginx/nginx)  
官方项目，使用方式略繁琐，网上的一些教程过时不好用，最好配合官网说明使用。  
- [NginxProxyManager](https://github.com/NginxProxyManager/nginx-proxy-manager)  
基于Docker的可视化操作Web界面，配置简单明了。十分推荐！  
- [nginx-proxy-manager-zh](chishin/nginx-proxy-manager-zh)  
NginxProxyManager的汉化版

## 安装与配置
系统：`Ubuntu 20.04 x64`  
已安装程序：`Docker` `Docker-Compose`   
使用功能：`SSL` 
1. 创建`docker-compose.yml`文件，内容如下：  
```yml
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

``` 


2. 进入到对应文件目录，输入指令并运行：
```yml
docker-compose up -d

#If using docker-compose-plugin
docker compose up -d
```

3. 配置防火墙  
Ubuntu20 默认开启了防火墙，且默认端口均为开放，所以相关应用程序端口一定要加入白名单，不然就各种问题！
- 允许HTTP
```bash
ufw allow 80
```
- 允许HTTPS
```bash
ufw allow 443
```
- 允许Nginx管理WebUI
```bash
ufw allow 81
```
4. 登录WebUI  
http://hostname(主机IP地址):81  
默认账户 
    ```
    Email:    admin@example.com
    Password: changeme
    ```  
   初次登录后会要求修改默认账户名和密码

5. 配置SSL
![Alt text](../img/Nginx%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/ssl.png)  
进入`SSL Certificates` 面板，点击 `Add SSL Certificate`，如果有域名证书的选择 `Custom` ,输入备注名称上传对应证书文件和密钥即可；没有证书的也可以选择 `Let's Encrypt`自行申请免费证书。  
*注：域名证书可在域名供应商那里申请到免费的，以阿里云来说，每个域名明年可申请20张免费证书。* 

6. 配置代理
![Alt text](../img/Nginx%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/hosts.png)  
进入 `Hosts` 面板选择 Proxy Host，点击 `Add Proxy Host` ,按照如下示例配置： 
 ![Alt text](../img/Nginx%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE/ssl03.png)
保存后，你就可以通过配有证书的域名以 `https` 的方式访问对应主机端口的应用了。  

## 总结  
这里只以Nginx的SSL功能举例，也是本人常用的一个功能。但对于Nginx来说，该功能只是冰山一角，更多的功能使用待各位自行发掘。