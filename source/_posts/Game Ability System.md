---
title: Game Ability System
tags:
  - Unreal
  - UE5
  - 学习笔记
categories:
  - Unreal
abbrlink: a131da00
date: 2023-07-14 12:20:31
description: 'High-level view of the Gameplay Ability System'
cover: img/Game Ability System/cover.png
---

## GAS插件介绍

{% link GAS插件介绍（入门篇） | 伍德 大钊,bilibili,https://www.bilibili.com/video/BV1X5411V7jh/ %}  

### 简介

Gameplay Ability System，简称（GAS）。是一个健壮的，高度可拓展的gameplay框架，通常用于构建RPG、MOBA等游戏的完整战斗逻辑框架。

通过GAS，可以快速地制作游戏中的主动/被动技能、各种效果buff、计算属性伤害、处理玩家各种战斗状态逻辑。

**GAS提供了哪些功能？**

1. 实现了带有消耗和冷却功能的角色技能
2. 处理数值属性（生命、魔法、攻击力、防御力）
3. 应用状态效果（击飞、着火、眩晕）
4. 应用游戏标签（GameplayTags）
5. 生成特效和音效
6. 完整的网络复制、预测功能

**适合使用GAS的项目**

1. C++项目，开发人员有充足的C++开发经验
2. 使用Dedicated Server的联机游戏
3. 项目有大量且复杂的技能逻辑设计需求


**插件推荐**
- [Able Ability System](https://marketplace-website-node-launcher-prod.ol.epicgames.com/ue/marketplace/en-US/product/able-ability-system)
- [Ascent Comba](https://marketplace-website-node-launcher-prod.ol.epicgames.com/ue/marketplace/en-US/product/ascent-combat-framework-c-action-rpg-creator)


### 功能概述

#### Ability System Component

Ability System Component (ASC)是整个GAS的基础组件。

ASC本质上是一个UActorComponent，用于处理整个框架下的交互逻辑，包括`使用技能`（GameplayAbility）、包含`属性`（AttributeSet）、处理各种`效果`（GameplayEffect）。

所有需要应用GAS的对象（Actor），都必须拥有GAS组件。

拥有ASC的Actor被称为ASC的`OwnerActor`，ASC实际作用的Actor叫做`AvatarActor`。

ASC可以被赋予某个角色ASC，也可以被赋予PlayerState（可以保存死亡角色的一些数据）。





## 深入GAS架构设计

{% link 深入GAS架构设计 | EpicGames 大钊,bilibili,https://www.bilibili.com/video/BV1zD4y1X77M/ %}  

🚀 待填坑...