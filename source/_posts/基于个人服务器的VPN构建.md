---
title: 基于个人服务器的VPN构建
tags:
  - VPN
categories:
  - Linux
abbrlink: '93337678'
date: 2024-02-19 12:14:07
description:
cover: /img/基于个人服务器的VPN构建/cover.png
---

## 需求来源

   每次因为个人网站而购买国外服务器时，就总想着把服务器的价值最大化。而 VPN 算是自工作以来的一个必备工具了，虽然之前也折腾过许久，但都因为各种原因容易导致 IP 被封，连带服务器无法使用。
   我也尝试过去购买别人的产品，只是别人的产品要不然就是太贵了，或是限流量和限设备，还有隐私等问题，总有让人不满意的点。
   于是最近假期期间，趁着空闲，又折腾了起来。并发掘了一些可靠好用的工具。

## 工具推荐

### `FranzKafkaYu/x-ui`
- 推荐指数 ⭐⭐⭐⭐⭐
- 脚本+可视化面板的组合，支持支持单端口多用户、多协议。

{% link FranzKafkaYu/x-ui,GitHub,https://github.com/FranzKafkaYu/x-ui %}


### `233boy/Xray`
- 推荐指数 ⭐⭐⭐⭐
- 一款超便捷的构建脚本，开箱即用。

{% link 233boy/Xray,GitHub,https://github.com/233boy/Xray %}


### `wulabing/Xray_onekey`
- 推荐指数 ⭐⭐⭐
- 听说口碑不错，不过由于我之前已经安装了Nginx，脚本构建过程中失败后也就没有继续尝试下去了，有兴趣的朋友可以试试。

{% link wulabing/Xray_onekey,GitHub,https://github.com/wulabing/Xray_onekey %}


## 构建流程

大部分的使用说明看对应项目的 Wiki 即可，这里主要补充说明一些我遇到的问题。

从这些工具的说明文档里，我大概了解到了以前主机IP容易被封是因为缺少加密协议 `TSL（Transport Layer Security）`，相当于在互联网裸奔，因此极容易被检测管制。

1. 购买域名并托管
    - 域名购买 [namesilo](https://www.namesilo.com/)。
    - 替换域名服务商 [cloudflare](https://dash.cloudflare.com/)，具体步骤可自行 Google 。
    - 解析域名 DNS 至服务器 IP 地址并获取 cloudflare 对应域名管理 API 。

2. 一键SSL证书申请并自动续签
    - 该功能一般脚本都自带，直接跟随操作步骤执行即可。

3. 服务端配置
    - 按照脚本说明进行配置，一般配置成功后会生成对应订阅链接或二维码。

4. 客户端配置
    - 下载客户端软件 [v2rayN](https://github.com/2dust/v2rayN) 并根据生成链接获取订阅。
    - 只要是支持 Xray 协议的客户端就行。


## 补充说明

我目前在使用的是 `FranzKafkaYu/x-ui`，在按照使用说明操作的过程中，有几个需要注意的点，否则无法连接至服务器：
1. 在 [cloudflare](https://dash.cloudflare.com/) 托管的域名DNS解析中，代理状态需要关闭，即代理状态需要调整至 `仅DNS` 。
2. x-ui 管理面板中添加的入站对应端口，需要加入服务器防火墙的白名单中。

    ```bash
    # 开放端口
    sudo ufw allow 端口号

    # 查看端口开放状态
    sudo ufw status
    ```
3. 入站配置中的域名需要修改为 cloudflare 托管的域名名称，而非 IP 地址。