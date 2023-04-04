---
title: Notes
tags:
  - Note
categories:
  - Docs 文档
abbrlink: c0da8988
date: 2023-03-24 17:29:00
---

## [Twikoo](https://twikoo.js.org/)  
- 存在问题：按照官方文档部署完成后，本地测试无问题，但是正式部署到云端服务器后，无法正常运作。
- 问题排查：服务器地址云函数运行正常，浏览器中按 F12 发现有报错 `This request has been blocked; the content must be served over HTTPS.` 该云函数是通过`http`协议访问的，会被浏览器拦截，本地测试运行则不会。
- 解决方案：通过[Nginx的安装与配置](http://kchris1027.github.io/post/13d4b70d.html)，配置SSL证书走`https`协议访问。