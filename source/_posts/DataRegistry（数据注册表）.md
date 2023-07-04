---
title: DataRegistry（数据注册表）
tags:
  - Unreal
  - UE5
  - 学习笔记
categories:
  - Unreal
abbrlink: '33896216'
date: 2023-07-04 11:27:11
description:
cover:
---

> Data Registry（简称DR）是一种高效的全局存储空间，用于存储带有`USTRUCT`标记的数据结构。数据注册表支持同步和异步的数据访问，以及用户定义的缓存行为。数据注册表主要用于常见的只读数据。

关于该新特性的官方介绍视频：

{% link DataRegistry：一种统领全局的新数据配置工具 | Epic 大钊,bilibili,https://www.bilibili.com/video/BV1qq4y1W7Ka %}  

## 特性由来

### 分析

数据驱动开发带来的好处以及当前主流的数据配置方式：
{% gallery false,500,10 %}
![数据驱动](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688442719480.png)
![数据配置方式](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688442884199.png)
{% endgallery %}

各类数据配置方式优缺点介绍：

{% link UE4数据驱动开发 | Epic 大钊,bilibili,https://www.bilibili.com/video/BV1dk4y1r752 %}  



鉴于每一种数据配置方式都有一套自己的数据读取方式，处理起来比较麻烦。

能不能有一种统领全局的数据配置方式，`可以存储、合并、读取和管理不同来源的数据`。

于是DataRegistry出现了。


### 实现

DR类似于**复合数据表（Composite Data Tables）**，但除了标准的表格数据行之外，还可以存储曲线数据。此外，它使用了一个间接层，而不是手动将多个表格合并在一起。

DR架构在DT之上，DR本身不直接配置数据，而是更好的组织数据，DT反而会变得更底层一些。DR相当于从多个表里生成临时数据，并且附带了许多优势和特点：

{% gallery false,500,10 %}
![DR特性](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688443913276.png)
{% endgallery %}

Unreal数据管理的发展脉络可以简单理解为：`DataTable` -> `CompositeDataTable` -> `DataRegistry`

由于其更好的扩展及缓存机制等优点，DR可能会是将来引擎里面统一的数据管理方式。目前在堡垒之夜中，已深度使用DR来管理数据。

## 核心概念

### 数据源（DataSource）

![数据源](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688453007962.png)

数据注册表从两种数据源类型来采集数据：**数据注册表源（Data Registry Sources）**和**元数据注册表源（Mata Data Registry Sources）**
- `Data Registry Sources`：直接拥有你在数据注册表资产内的数组中所创建和配置的数据注册表源对象。
- `Mata Data Registry Sources`：只用来生成数据源的数据源，定义了一套规则，从某个路径里抓来新的数据源

数据源在数据注册表中的顺序很重要，如果在某个数据源中未找到特定的数据项，数据注册表会在列表后面的数据源中查找该数据项。这样可能会产生覆盖和回退行为，并使得特定于上下文的数据源覆盖通用的数据源。

DR结构图：

![DR结构图](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688453103439.png)

- Subsystem对应多个DRA，即内存加载多个DAR都会保存在同一个Subsystem。所以说它是统一全局数据间接层。因为它有一个SubSystem可以得到所有的数据，而不像DataTable需要定义一个一个的表去做数据。
- 一个DRA对应多个数据源，数据源下当前有内置的DataTable、CurveTable以及对应的Meta类，Meta类通过定义规则，批量获得对应的数据源。


### 标识符

数据注册表插件使用独有的标识符来查找数据注册表以及其中包含的单个数据项。这些标识符本质上都是基于字符串的名称，不过 `FDataRegistryType`（用于数据注册表资产）和 `FDataRegistryId`（用于数据注册表中的单个数据项）结构却属于包装器（wrapper），能提供实用的编辑器内部功能。 `FDataRegistryType` 用于辨识数据注册表资产， `FDataRegistryId` 用于辨识数据注册表和其中的特定数据项。如果你需要查找数据注册表资产或从中检索单个数据项，可以使用这些标识符类型。

![标识符](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688468942222.png)

每个数据注册表资产都必须在**注册表类型（Registry Type）**字段中具有唯一名称. 如果两个数据注册表资产在此字段中具有相同的名称，系统将仅识别和填充其中一个。类似的，如果多个数据项共用同一个标识数值（名称或Gameplay标签），注册表会读取所有项，但检索操作将仅访问数据注册表资产加载的第一个数据项.



#### 数据注册表资产标识符

在设置数据注册表资产时，开发人员必须使用唯一命名来设置`Registry Type`。它是数据注册表的标识符。



#### 数据项标识符

识别单个数据项时（例如数据表中的数据行），需要指定数据注册表资产和数据项本身。

如果数据注册表的ID格式使用Gameplay标签，用户界面将显示包含该Gameplay标签及其所有子项的筛选后列表。

如果数据注册表的ID格式未使用Gameplay标签，用户界面将显示一个下拉列表，其中包含数据注册表资产包含的所有已知数据行。

![IDFormat](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688469623555.png)


## 基本用法

### 开启DR插件

![开启DR插件](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688444829702.png)



### 项目设置DR扫描目录

![项目设置](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688444905873.png)

### 创建一个DRA

- 设置全局唯一的DRT名字
- 设置IdFormat，如果想要用GamePlayTag来作为Item Id，否则留空
- 设置ItemStruct类型
- 设置DataSource

配置说明：
![DR配置说明](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688452889812.png)

### 点击刷新按钮来预览

DRA配置完成

### 获取数据

- 蓝图中获取DR数据的几种方式：
    - Find Data Registry Item
    - Get Data Registry Item
    - Acquire Data Registry Item
    - Evaluate Data Registry Curve

{% gallery %}
![方式一](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/type1.png)
![方式二](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/type2.png)
![方式三](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/type3.png)
![方式四](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/type4.png)
{% endgallery %}


### 其他补充

- 向DR中动态添加数据源:

![Alt text](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688465449709.png)


- 手动加载Data Registry

![Alt text](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688465938249.png)

- 自定义数据Id的动态解析

![Alt text](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688466011754.png)

- Cache 机制

![Alt text](../img/DataRegistry%EF%BC%88%E6%95%B0%E6%8D%AE%E6%B3%A8%E5%86%8C%E8%A1%A8%EF%BC%89/1688467727627.png)


---
参考资料：
- [数据注册表_官方文档](https://docs.unrealengine.com/5.2/zh-CN/data-registries-in-unreal-engine/)