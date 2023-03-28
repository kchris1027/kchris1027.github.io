---
title: AI绘画
date: '2023-03-27  19:57'
tags:
  - AI
  - 绘画
categories: AI工具
cover: /img/AI绘画/AI_Paint.png
abbrlink: a01715fb
---

## 主流AI绘画工具

-  Stable Diffusion
-  MidJourney
-  Waifu Diffusion
-  PicUP.AI
-  其他

**Stable Diffusion** 

简称“ SD ”，Stable Diffusion 是一种基于潜在扩散模型的 AI 模型，它可以生成图像，也可以通过文本提示修改现有图像，类似于 MidJourney 或 DALL-E 2。它最初是由 Stability.ai 在 2022 年 8 月发布的。它可以理解数千个不同的单词，并且可以用几乎任何风格创建几乎任何形象.

Stable Diffusion 是一种深度生成神经网络，其代码和模型权重已公开发布，可以在大多数配备至少 8 GB VRAM 的消费级硬件上运行。


**MidJourney** 

MidJourney 是一种基于 GAN 技术的 AI 绘画工具，它可以生成高质量的图像和艺术作品。它可以通过输入一些简单的文本提示，生成各种不同的图像，包括人物、动物、风景等。MidJourney 的特点是生成的图像非常逼真，可以与真实的照片媲美。

**Waifu Diffusion**

Waifu Diffusion 是一种基于 StyleGAN 技术的 AI 绘画工具，它可以生成各种不同的动漫风格的图像。它的特点是生成的图像非常逼真，可以与真实的动漫人物媲美。Waifu Diffusion 可以通过输入一些简单的文本提示，生成各种不同的动漫人物图像，包括男性、女性、萝莉等。

**PicUP.AI**

PicUP.AI 是一种基于 GAN 技术的 AI 绘画工具，它可以生成各种不同的图像和艺术作品。它可以通过输入一些简单的文本提示，生成各种不同的图像，包括人物、动物、风景等。PicUP.AI 的特点是生成的图像非常逼真，可以与真实的照片媲美。

**其他**

除了上述几种主流的 AI 绘画工具之外，还有许多其他的工具，如 DALL-E2、Artbreeder、GANbreeder 等。这些工具都是基于 GAN 或其他 AI 技术的，可以生成各种不同的图像和艺术作品。它们的特点是生成的图像非常逼真，可以与真实的照片媲美。    

    
## 工具使用说明

### Stable Diffusion

1. 下载和安装  

   方式一 : GitHub源码（需梯子）    [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)  

   方式二 : 一键整合包，开箱即用   [秋葉aaaki（推荐）](https://space.bilibili.com/12566101)

2. 界面使用说明     
  ![Alt text](../img/AI%E7%BB%98%E7%94%BB/%E7%95%8C%E9%9D%A2UI%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.jpg)  
   - Stable Duffusion 模型(ckpt)  
      大模型是数据训练出来的结果，决定了生成图片的美术风格以及它擅长的绘画面。资源可以在网上下载，根据自己的喜好挑选模型。  
      对应本地资源存放目录 `.../models/Stable-diffusion`  
   - 模型的 VAE(SD VAE)  
      VAE 的主要作用是滤镜，决定了生成图像的色彩饱和度；虽然也有局部修正的作用，但作用效果不明显。有些大模型不用 VAE 直出的图像是灰色的，有些模型则不用。这部分建议多去尝试与组合，寻找自己的喜欢的风格色彩。
      对应本地资源存放目录 `.../models/VAE`


   - 提示词(Prompt)  
      输入自己想要画面元素的关键词(tags)，这里用英文输入，中文输入效果不理想。

   - 反向提示词(Negative prompt)  
      输入自己不想要

   - Embedding
   - LoRA
   - 采样迭代步数(Steps)
   - 采样方法(Sampler)  


3. 资源相关  

    综合下载网站：https://civitai.com/  
    AI绘画图集：https://pixai.art/





