---
title: 学习笔记之Unreal蓝图
tags:
  - Unreal
  - 蓝图
  - 学习笔记
categories:
  - Unreal
description: 无代码编程，希望自己能尽快掌握
cover: /img/学习笔记之Unreal蓝图/cover.png
abbrlink: b5e676b7
date: 2023-06-25 20:37:57
---

## [Blueprint Communication](https://dev.epicgames.com/community/learning/courses/LWv/unreal-engine-blueprint-communication/)


### Public Variables

在和对象交流时，我们需要通过引用或变量来交流。作为两个对象中间的沟通桥梁或连接器。

{% gallery false 400 %}
![Alt text](../img/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B9%8BUnreal%E8%93%9D%E5%9B%BE/1687698745699.png)
{% endgallery %}

- 对象引用（Object Reference）是关卡中拥有的东西，是关卡中存在的东西
- 类（Class Reference）是类本身，或者说它的构成元素，也就是定义这个项目的代码，我们可以在内容浏览器中看到它




### Casting

转换类型是指把对象当作具体对象来操作，相当于为对象做进一步的说明，获取特定版本的对象，充分利用父子关系概念。

静态网格体Actor是Actor的子项，角色是Pawn的子项，同时也是Actor的子项。在使用蓝图的时候，我们可能需要获取层级更高的对象。通过类型转换，我们就可以把这个对象当作更具体的对象来操作。

{% gallery false %}
![Alt text](../img/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B9%8BUnreal%E8%93%9D%E5%9B%BE/1687698102879.png)
![Alt text](../img/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E4%B9%8BUnreal%E8%93%9D%E5%9B%BE/1687697965897.png)
{% endgallery %}

通过类型转换，我们就可以将一个Actor作为BP（蓝图）来对待，然后和它交流；BP上有的变量，它上面的项目（Actor）没有这个变量，这个变量只有它和它的子项有。

`任何时候，如果返回的不是你想要的对象类型，需要特别制定，你就可以使用类型转换。`还能用它快速检测某样东西是不是某样东西，你可以类型转换，如果不是，它就会失败。

### Blueprint Interfaces

蓝图接口是允许两个对象相互通信的一种好方法，包括不同类型的对象。

例如，我可能想和一个对象沟通，告诉它我想和它互动，我只想让能和我互动的对象去做某些事情，除它以外的所有对象都忽略这个请求。


### Event Dispatchers

有时候可能会发生一件事，然后很多东西都想知道这件事。例如，关卡结束了或者玩家死亡，我们可以在项目中创建专门的代码来处理这项工作，我们想看到的所有事件都可以放在一个地方，但这需要创建硬连接，我们可能不想要这样，不想要把应该在某个地方的代码放到其他地方，在一个地方处理所有事情，事实上我们不需要这么做，我们可以使用事件分发器。

它可以在事件发生时，让其他东西在更合适的地方处理这件事，你可以把它看作一张可以订阅的列表，有一个事件告诉我们玩家死了。所有订阅这个事件或列表的项目，都会在事件发生时收到通知，然后这些项目就可以根据这个事件做出不同的行为。

事件分发器非常有用，尤其是想让物品管理好自己的时候，而不是在一个地方处理所有事情



## [Demonstrating Animation Blueprints and AI for Gameplay Designers](https://dev.epicgames.com/community/learning/courses/pl2/unreal-engine-demonstrating-animation-blueprints-and-ai-for-gameplay-designers/GxBZ/unreal-engine-demonstrating-animation-blueprints-and-ai-for-gameplay-designers-introduction)

### layered blend per bone

可以以骨骼名称作为分层边界

### Save Cached Pose

将动画蓝图中的输出的姿势进行缓存，用于后续调用；有点像蓝图提升为变量一样，可以在其他地方使用此变量值。

### Anim Slot

给蒙太奇动画指定插槽，然后在动画蓝图中引用插槽进行动画输出。即蒙太奇动画只能通过插槽的方式参与角色动画蓝图

### PawnSendsing

AI感应组件中的一种，用于搜寻敌人


## [初识UMG](https://dev.epicgames.com/community/learning/courses/q3r/unreal-engine-umg/vJDR/unreal-engine-3d74bf)


### Append

能将多个字符串合并成一个字符串输出

### Add to Viewport/Add to Player Screen

**创建控件原则：为谁所用，就在谁的蓝图上创建**

90%的情况下，创建控件显示用“Add to Viewport”,"Add to Player Screen"主要用于分屏显示，如果你的游戏和分屏显示或同屏多人显示无关，你就应该选择“Add to Viewport”。

### 控件数据更新方式

1. 控件的属性绑定（Binding）

绑定的函数每帧都在运行，非实时更新的数据不建议，会消耗大量性能。只有计时器、倒计时、时钟，这类需要每帧精准显示的功能，才需要使用绑定功能

2. 新建更新功能函数，蓝图事件调用函数执行


### Input Mode（输入模式）

- Set Input Mode UI Only（仅UI）

- Set Input Mode Game Only （仅游戏）

- Set Input Mode Game and UI （游戏和UI）

输入模式节点（Set Input Mode）属于控制器（Get Player Controller）的功能函数

默认的输入模式是“Set Input Mode Game Only”，所有来自鼠标、手柄、周边设备以及键盘的输入仅针对游戏启用。在这种模式中，通常是你的手柄或其他设备接受输入信号。也就是说，是你的游戏视口接受输入，而不是你的UI。

**不要在打开关卡之后设置输入模式，因为在打开关卡后，不一定能保证执行后续逻辑。**


### Remove from Parent 

将控件从父类中移除，用于隐藏界面中某一控件。或者切换界面。