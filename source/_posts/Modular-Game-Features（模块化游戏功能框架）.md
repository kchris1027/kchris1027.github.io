---
title: Modular Game Features（模块化游戏功能框架）
tags:
  - Unreal
  - UE5
  - 学习笔记
categories:
  - Unreal
abbrlink: b1d6807b
date: 2023-07-06 21:41:19
description: If we want to go faster,we have to slow.
cover: /img/Modular-Game-Features（模块化游戏功能框架）/cover.png
---
> If we want to go faster,we have to slow.

{% link 模块化游戏功能框架 | Epic Games 大钊,bilibili,https://www.bilibili.com/video/BV1j34y1B7Nf/ %}  

## 发展由来

### GamePlay

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689156059331.png)

### GameAbilitySystem

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689156491466.png)

### SubSystem

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689156624698.png)

### Game Features

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689156743364.png)

**Why Game Features?**

- 需要一种模块化的逻辑组织方式
- 新人更容易上手，因为无需了解其他项目的内在工作机制，就能开发这些独立功能
- 更少的漏洞，更易读代码。自包含的代码天然更易于进行单元测试，可以自然地避免在构建时意外或偶然地依赖其他代码
- 更轻松的在多个团队或项目中共享功能
- 更容易在大型或分布式开发环境中协作
- 更容易在“快迭代更新”游戏中迭代功能，也能快速安全地删除出现问题的功能


## 基础用法

### 开启插件  

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689157158860.png)


### 创建GF
- 必须放在：`Game/Plugins/GameFeatures/`

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689157435014.png)


### 显示GF
- 必须显示插件内容才可显示GameFeatures的内容
- 根目录下有一个插件同名的GameFeatureData，定义了该GameFeature的机制和Actions，不要改名！

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689157468969.png)


### 配置AssetManager
- 配置P`rojectSettings/AssetManager`里的`PrimaryAssetTypes`以便可以加载GameFeatureData(若已自动加上则可以略过)

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689157719929.png)


### 配置Actions

- 配置GameFeature的Actions
- 配置GF的初始状态
- 重启

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689157876182.png)


### 配置Actor

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158319619.png)


### 激活GF

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158363976.png)



## 框架机制

### 核心概念
- Core Game
- Game Feature - `GF`
- UGameFeatureData - `GFD`
- UGameFeatureAciton - `GFA`
- UGameFeatureSubsystem - `GFS`
- UGameFrameworkComponentManager - `GFCM`

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158431456.png)

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158642833.png)

### Game Features 启动流程 - 最初

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158752012.png)

### 创建加载策略

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158830025.png)


### 创建加载策略-配置策略

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689158941431.png)


### GFS设置

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689159020554.png)

### GF Policies-设置如何加载GF

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689159106347.png)


### GFD Asset Manager 配置

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689159184122.png)


### 加载GF.uplugin

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689159248581.png)


### GF状态 - 切换

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165438216.png)


### GF状态机

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165499787.png)


### GF状态机加载流程

1. 检查存在性
![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165687299.png)

2. 加载GF C++模块
![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165738072.png)

3. 加载GameFeatureData
![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165789054.png)

4. 预加载资产和配置
![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165910937.png)

5. 激活生效
![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689165973093.png)


### GF状态机总结

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166040444.png)


### GF状态监听

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166110209.png)


### AddComponent

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166186622.png)


### GFA_AddComponent 最常见最重要

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166240315.png)


### AddComponent - Component

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166308740.png)


### AddComponent - Actor BP

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166396840.png)


### AddComponent - Actor C++

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166474798.png)



### GFA_Action扩展

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166522618.png)


### GF 依赖机制

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166602959.png)


### GF 模块协作

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166665288.png)




## 最佳实践

### 《古代山谷》项目

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166788854.png)

### CoreGame预留好逻辑注入点

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166843383.png)


### 可继承扩展的类

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166906124.png)


### 如何转换现有逻辑到GF?

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689166952617.png)


### Rethink in GF

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689167635992.png)

### 注意要点

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689167736060.png)

### 总结

![Alt text](../img/Modular-Game-Features%EF%BC%88%E6%A8%A1%E5%9D%97%E5%8C%96%E6%B8%B8%E6%88%8F%E5%8A%9F%E8%83%BD%E6%A1%86%E6%9E%B6%EF%BC%89/1689167788987.png)

