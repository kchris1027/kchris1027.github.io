---
title: ChatGPT的私有化部署
tags:
  - ChatGPT
  - Docker
categories: AI工具
abbrlink: c60760e2
date: 2023-04-22 11:52:33
description:
cover: /img/ChatGPT的私有化部署/cover.png
---

>最近由于OpenAI对账号使用的监察收紧，只是以挂代理的方式，使用网页版GPT容易频繁掉线或是直接无权访问无法登录，能够使用的代理IP也十分局限，用着十分糟心。而以API的形式使用又涉及到付费问题，国内信用卡无法直接使用。所以在此基础上想着能否找到一个私有化部署Web版GPT的解决方案。

## Pandora

### 简介  
[潘多拉 (Pandora)](https://github.com/pengzhile/pandora)，一个不只是命令行的 ChatGPT。

潘多拉实现了网页版 ChatGPT 的主要操作。后端优化，绕过 Cloudflare，速度喜人。

优点：

- 高峰期能绕过官方限制，继续使用。
- 应答速度直逼`PLUS`，白嫖用户的福音。
- 官方故障的时候，它可能还是能跑。
- 多模式：网页/命令行/API，私有化部署。
- 不会像官方那样无故断线、报错。

### 安装与运行
如果你恰好有一台国外的服务器，那么直接docker运行：

```docker
docker pull pengzhile/pandora
docker run -it --rm --name pandora -p 6000:6000 -e PANDORA_SERVER=0.0.0.0:6000 pengzhile/pandora 
```

其中关于`-e`的环境变量参考官方说明进行使用配置
- `PANDORA_ACCESS_TOKEN` 指定`Access Token`字符串。
- `PANDORA_TOKENS_FILE` 指定一个存放多`Access Token`的文件路径。
- `PANDORA_PROXY` 指定代理，格式：`protocol://user:pass@ip:port`。
- `PANDORA_SERVER` 以`http`服务方式启动，格式：`ip:port`。
- `PANDORA_API` 使用`gpt-3.5-turboAPI`请求，你可能需要向OpenAI支付费用。
- `PANDORA_SENTRY` 启用`sentry`框架来发送错误报告供作者查错，敏感信息不会被发送。
- `PANDORA_VERBOSE` 显示调试信息，且出错时打印异常堆栈信息，供查错使用。

安装完成后，就可以用过你指定的`http://ip:port`来访问一个极简版的 ChatGPT 了。因为是国外的服务器，所以也无需代理了。

### 后记
个人在自己的服务器进行配置的时候遇到一个问题：安装运行完成后，无法直接通过`ip:端口`的形式进行访问，而通过Nginx以域名的形式进行反向代理后可以正常访问。推测是和容器`http`服务形式有关，暂未细察，先留个坑。
