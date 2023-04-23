---
title: Notes
tags:
  - Note
categories:
  - Docs 文档
abbrlink: c0da8988
date: 2023-03-26 17:29:00
description: 本页面主要用来记录一些琐碎问题  
---


## [Twikoo](https://twikoo.js.org/)  
- 遇到问题：按照官方文档部署完成后，本地测试无问题，但是正式部署到云端服务器后，无法正常运作。
- 问题排查：服务器地址云函数运行正常，浏览器中按 F12 发现有报错 `This request has been blocked; the content must be served over HTTPS.` 该云函数是通过`http`协议访问的，会被浏览器拦截，本地测试运行则不会。
- 解决方案：通过[Nginx的安装与配置](http://kchris1027.github.io/post/13d4b70d.html)，配置SSL证书走`https`协议访问。

## [v2rayN](https://github.com/2dust/v2rayN)

- 遇到问题：无法连接代理服务器
- 问题排查：
  - 服务器可以ping的通
  - 在其他设备上使用正常，验证服务器没问题
  - 各版本的软件都尝试过，但就是连不上，推测本地pc环境出了问题
- 解决方案：由于我之前更改过系统的区域以及时区，后来改回了，但是时间没同步到区域。所以在`系统设置-时间和语言-日期和时间`里，点击`立即同步`，之后顺利解决。