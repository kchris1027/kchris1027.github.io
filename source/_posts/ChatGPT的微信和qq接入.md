---
title: ChatGPT的微信和qq接入
tags:
  - ChatGPT
  - Bot
categories: AI工具
cover: /img/ChatGPT的微信和qq接入/top.png
abbrlink: 1082c8d6
date: 2023-04-01 13:45:24
swiper_index: 1
swiper_desc: 最佳私人助手！
---

## ChatGPT账号注册
- 通过在线SMS服务选择OpenAI支持的手机号完成账号注册  
    [ChatGPT官网](https://chat.openai.com/) （需代理）  
    [SMS虚拟手机号码服务](https://sms-activate.org/)  
    此处提供的sms服务需要付费，大概1$不到。网上也能找到免费的，不过质量层次不齐，不保证能接收到验证码，出于节省时间的目的，还是更推荐付费的。 

- 获取API为其他通讯方式的接入做准备
     ![Alt text](../img/ChatGPT%E7%9A%84%E5%BE%AE%E4%BF%A1%E5%92%8Cqq%E6%8E%A5%E5%85%A5/API_KEY.png)       
    进入 [OpenAI API]( https://platform.openai.com/account/api-keys) ，点击创建新的 key ，API key的调用是要收费的，具体收费方式详见官网，每个账号有 `5$` 的额度，个人使用还是足够的，多人使用推荐上 plus 版本。


## 微信接入
主要还是通过GitHub开源项目进行接入，具体接入方式详见各自项目的说明文档  
- 个人微信接入 [chatgpt-on-wechat](https://github.com/limccn/chatgpt-on-wechat)  
- 公众号接入  [bot-on-anything](https://github.com/zhayujie/bot-on-anything)



## QQ接入  
1. 部署qq登录程序  [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)  
通讯方式选用反向代理，即 `severs` 部分的配置选用 `ws-reverse` 设置参数。服务器监听的地址需要与 `chatpgt-mirai-qq-bot` 的运行地址和端口保持一致。
2. 对接ChatGPT  [chatgpt-mirai-qq-bot](https://github.com/lss233chatgpt-mirai-qq-bot)  
该项目支持多种AI的调用方式，具体细节详见官方说明文档。
  


>今年算是AI的爆发元年了，井喷式的AI工具涌现而出。最近一直在琢磨着将 AI 融入工作和生活，浅尝之下，不得不感叹AI带来的高效与便利。而如何更好的融合和使用这些AI工具，应该是未来几年需要持续摸索的一件事情了。

