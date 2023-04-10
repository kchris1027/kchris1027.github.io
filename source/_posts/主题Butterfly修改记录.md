---
title: 主题Butterfly修改记录
tags:
  - Hexo
  - Butterfly
categories:
  - Hexo
abbrlink: 4ad8e0f8
date: 2023-04-10 18:13:09
cover: 
description: 主题修改的折腾日记
hidden: true
---
> 考虑到主题更新影响到一些文件的改动，  
建议在自己博客的`\source`目录下新建`\css`和`\js`文件夹用来存放相关的效果脚本，  
最终部署的时候会和`\themes\butterfly\source`目录下的资源进行合并，引用路径都是一样的，无须担心。
## [水波纹效果](https://zsyyblog.com/f050230c.html)
在`\themes\butterfly\source\js`目录下创建一个`ripples.js`文件，并将如下代码写入该文件：
```javascript
$(document).ready(function () {
  try {
    $("#page-header").ripples({
      resolution: 512,
      dropRadius: 10, //px
      perturbance: 0.04,
    });
  } catch (e) {
    $(".error").show().text(e);
  }
});
```
找到主题配置文件 `_config.butterfly.yml`，在inject的bottom处引入一下文件：
- 开启 pjax
```yml
inject:
  head:
  bottom:
    - <script defer src="https://rmt.dogedoge.com/fetch/~/source/jsdelivr/npm/jquery@latest/dist/jquery.min.js"></script>
    - <script defer data-pjax src="https://cdn.jsdelivr.net/gh/sirxemic/jquery.ripples/dist/jquery.ripples.js"></script>
    - <script defer data-pjax src="/js/ripples.js"></script>
```
- 未开启 pjax
```yml
inject:
  head:
  bottom:
    - <script defer src="https://rmt.dogedoge.com/fetch/~/source/jsdelivr/npm/jquery@latest/dist/jquery.min.js"></script>
    - <script defer src="https://cdn.jsdelivr.net/gh/sirxemic/jquery.ripples/dist/jquery.ripples.js"></script>
    - <script defer src="/js/ripples.js"></script>
```
>建议将外挂的链接脚本全部重新复制一份到本地进行引用，防止链接失效导致效果丢失 

重新部署后即可看到效果。  

## [页脚养鱼](https://blog.4t.pw/posts/263068a8.html#js)  
找到主题配置文件 `_config.butterfly.yml`，在inject的bottom处引入一下文件：  
```yml  
inject:
  head:
  bottom:
    - <script src="https://gcore.jsdelivr.net/gh/xiabo2/CDN@latest/fishes.js"></script>
```
## [波浪特效](https://snowtafir.top/posts/2022bn5s#%E6%96%B0%E5%BB%BAwave_stylepug%E6%96%87%E4%BB%B6)  

- 新建wave_style.pug文件
在目录 `\themes\butterfly\layout\includes\header\wave_style.pug` 新建 `wave_style.pug`，并写入如下代码：  
```cs  
section.main-hero-waves-area.waves-area
	svg.waves-svg(xmlns='http://www.w3.org/2000/svg', xlink='http://www.w3.org/1999/xlink', viewBox='0 24 150 28', preserveAspectRatio='none', shape-rendering='auto')
		defs
			path#gentle-wave(d='M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z')
		g.parallax
			use(href='#gentle-wave', x='48', y='0')
			use(href='#gentle-wave', x='48', y='3')
			use(href='#gentle-wave', x='48', y='5')
			use(href='#gentle-wave', x='48', y='7')
```

- 引入CSS样式  
在`\source\css`目录下新建 `wave_style.css` 文件，并添加如下代码： 
```cs  
/*波浪特效*/
.main-hero-waves-area {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 0;
    bottom: -7.5px /*特效显示位置调整，正/负值：以中心点 上移/下移，一般改数值即可*/
}

.waves-area .waves-svg {
    width: 100%;
    height: 5rem
}

.waves-area .parallax>use {
    -webkit-animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite
}

.waves-area .parallax>use:first-child {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: #ffffffb3
}

.waves-area .parallax>use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: #ffffff80
}

.waves-area .parallax>use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: #ffffff4d
}

.waves-area .parallax>use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: #f9fafb
}

@-webkit-keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0)
    }

    to {
        transform: translate3d(85px, 0, 0)
    }
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0)
    }

    to {
        transform: translate3d(85px, 0, 0)
    }
}  

/*向下按钮和大banner社交图标防被遮挡隐藏*/
#page-header #scroll-down .scroll-down-effects{
	z-index: 10;
}
#page-header #site_social_icons{
	display: flow-root;
}  

/*黑暗模式适配*/
[data-theme=dark]
.waves-area .parallax>use:first-child {
    fill: #0f172ab3
}
[data-theme=dark]
.waves-area .parallax>use:nth-child(2) {
    fill: #0f172a80
}
[data-theme=dark]
.waves-area .parallax>use:nth-child(3) {
    fill: #0f172a4d
}
[data-theme=dark]
.waves-area .parallax>use:nth-child(4) {
    fill: #070b14
}
```
如果背景色不是纯白的话，需继续添加背景色和波浪特效颜色的代码： 
```cs  
/*主页背景色*/
#web_bg {
	background: rgba(246, 239, 246);
}
[data-theme=dark]
#web_bg {
	background: rgb(4, 4, 4);
}

/****修改波浪特效fill属性处颜色值（#后六位，7、8位透明度不用改），rgba(246, 239, 246) 与 #F6EFF6 效果是一样的*****/
.waves-area .parallax>use:first-child {
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
    -webkit-animation-duration: 7s;
    animation-duration: 7s;
    fill: #F6EFF6b3
}

.waves-area .parallax>use:nth-child(2) {
    -webkit-animation-delay: -3s;
    animation-delay: -3s;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    fill: #F6EFF680
}

.waves-area .parallax>use:nth-child(3) {
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
    -webkit-animation-duration: 13s;
    animation-duration: 13s;
    fill: #F6EFF64d
}

.waves-area .parallax>use:nth-child(4) {
    -webkit-animation-delay: -5s;
    animation-delay: -5s;
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
    fill: #F6EFF6
}
```

- 添加引入位置  
在`\themes\butterfly\layout\includes\header\index.pug`文件中如下位置添加代码：  
```cs
header#page-header(class=isHomeClass style=bg_img)
  !=partial('includes/header/nav', {}, {cache: true})
  if top_img !== false
    if is_post()
      include ./post-info.pug
    else if is_home() 
      #site-info
        h1#site-title=site_title
        if theme.subtitle.enable
          - var loadSubJs = true
          #site-subtitle
            span#subtitle
        if(theme.social)
          #site_social_icons
            !=fragment_cache('social', function(){return partial('includes/header/social')})
      #scroll-down
        i.fas.fa-angle-down.scroll-down-effects
    else
      #page-site-info
        h1#site-title=site_title
  //- wave特效 添加如下，注意代码缩进与if top_img一致哦~
  !=partial('includes/header/wave_style', {}, {cache: true})
```

重新部署后即可看到效果。 




