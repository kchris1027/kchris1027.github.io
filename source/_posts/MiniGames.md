---
title: MiniGames
abbrlink: 52d239e4
date: 2023-04-20 17:46:21
tags:
categories:
description: 放松一下，感受游戏的乐趣。
cover: /img/MiniGame/logo.png
swiper_index: 1
swiper_desc: 放松一下，感受游戏的乐趣。
swiper_cover: /img/MiniGame/cover.png
---  

{% tabs 1 %}  

<!-- tab Catch Cat -->
{% raw %}
<div class="aspect-ratio" >
    <iframe src="https://ganlvtech.github.io/phaser-catch-the-cat/" scrolling="no" border="0" frameborder="0" framespacing="0" high_quality="1" danmaku="1" allowfullscreen=""></iframe>
</div>

<style>
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    margin: 3% auto;
    text-align: center;
  }
  .aspect-ratio iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width:500px){
    .aspect-ratio{
        padding-bottom:100%;
        position:relative!important;
        overflow:hidden!important;
        position:relative;
        width:100%;
        height:0;
        margin:3% auto;
        text-align:center
    }
    canvas{
            width:570px!important;height:501px!important
    }
    iframe{
            position:absolute;transform:scale(.6)!important;width:570px!important;height:570px!important;left:-120px!important;top:-100px!important
    }
  }
</style>
{% endraw %}
{% btn 'https://github.com/SadTomlzr/catch-cat',项目地址,,block right outline %}  
<!-- endtab --> 

<!-- tab MiniGames -->
{% raw %}
<div class="aspect-ratio" >
    <iframe src="https://demonisblack.com/code/2022/minigames/game/" scrolling="no" border="0" frameborder="0" framespacing="0" high_quality="1" danmaku="1" allowfullscreen="" loading="lazy"></iframe>
</div>
{% endraw %}
<!-- endtab --> 

<!-- tab Downhill Ski -->
{% raw %}
<div class="aspect-ratio" >
    <iframe src="https://demonisblack.com/code/2022/downhillski/game/"scrolling="no" border="0" frameborder="0" framespacing="0" high_quality="1" danmaku="1" allowfullscreen="" loading="lazy"></iframe>
</div>
{% endraw %}
<!-- endtab --> 


{% endtabs %}  