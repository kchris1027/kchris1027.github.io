---
title: Enhanced Input
tags:
  - Unreal
  - UE5
  - 学习笔记
categories:
  - Unreal
abbrlink: b32ee82a
date: 2023-06-28 08:59:18
description:
cover: img/Enhanced Input/cover.png
---

## 简介

增强输入可以在游戏运行时为玩家添加和删除映射上下文。这样更容易管理大量的操作，可以根据玩家当前的状态动态改变某些输入行为。

例如，如果你有一个可以行走、奔跑和卧倒的角色。对于这些角色移动类型中的每一个，你可以交换映射上下文，使`Ctrl`键执行不同的操作：
- 当行走时，按下Ctrl键蹲下
- 当奔跑时，按下Ctrl键飞翔
- 当卧倒时，按下Ctrl键站起
- 依次类推....

增强输入和旧输入系统之间的最大区别之一是它基于各种数据资产工作，而不是在一个地方定义所有内容（DefaultInput.ini）。这样可以更轻松地组织输入逻辑，并将相关代码封装在游戏功能插件中，从而更易于管理。

![增强输入创建](../img/Enhanced%20Input/1688019028624.png)

## Input Action(IA)

输入操作在概念上等同于“操作”和“轴”映射名称，只是它们是数据资产。每个输入操作都应表示用户可以执行地操作，你可以在蓝图或C++中添加监听器，以便此输入操作的状态发生变化。

![IA](../img/Enhanced%20Input/1688019154118.png)

### 数据类型(Value Type)

输入操作可以是几种不同的“类型”，这些“类型”将决定其行为。您可以制作简单的“布尔”操作或更复杂的 3D 轴。操作的类型决定了您可以从中获得什么价值。布尔操作将具有一个简单的布尔值，Axis1D 将是浮点值，Axis2D 将是 FVector2D，而 Axis3D 是整个 FVector。

当您有只有“开”或“关”状态的东西时，您应该使用“bool”操作。这相当于旧输入系统中的旧“操作”映射。对于游戏手柄操纵杆值等内容，可以使用 2D 轴操作来保持操纵杆位置的 X 和 Y 值。可以使用 3D 轴保存更复杂的数据，例如运动控制器信息。

![Value Type](../img/Enhanced%20Input/1688018539917.png)


### 触发器(Triggers)

输入触发器确定用户输入在通过可选的输入修饰符列表后，是否应在其输入映射上下文中激活相应的输入操作。大多数输入触发器会分析输入本身，检查最小驱动值并验证短按、长时间保持或典型的“按下(`press`)”或“释放(`release`)”事件等模式。此规则的例外情况是依赖于另一个操作的任何触发器，例如“按弦操作(`Chorded Action`)”或“组合(`Combo`)”触发器。默认情况下，输入上的任何用户活动都将在每帧触发。

- `Chorded Action`：通常用于描述一种通过按下多个键或按键的组合来执行特定操作或命令的输入方式

![Triggers](../img/Enhanced%20Input/1688018780645.png)

#### 触发状态

触发器状态表示操作所处的当前状态，例如已触发（Triggered）、开始（Started）、持续（Ongoing）、完成（Completed）和取消（Canceled）。

![Alt text](../img/Enhanced%20Input/1688018479690.png)

- `Triggered`
  - 动作已触发，这意味着它已经完成对所有触发要求的评估。
- `Started`
  - 发生了已开始触发评估的事件。例如，第一次按下“双击”触发器将调用“已启动”状态一次。
- `Ongoing`
  - 触发器仍在处理中。例如，当用户在达到指定的持续时间之前按住按钮时，“按住”操作正在进行中。根据触发器，此事件将在收到输入值后触发正在评估操作的每个时钟周期。
- `Completed`
  - 触发器评估过程已完成。
- `Canceled`
  - 触发已取消。例如，用户在触发“长按”操作之前松开按钮。



### 修饰器(Moidfiers)

用于修改来自用户设备的原始输入值。在输入映射上下文中，每个输入动作的原始输入都可以关联任意数量的修饰器。常见修饰器包括死区、多帧输入平滑处理、将输入向量从本地空间转换到世界空间，以及插件中的一些其他修饰器。开发人员还可以创建自己的修饰器。

![Moidfiers](../img/Enhanced%20Input/1688018839120.png)


## Input Mapping Context(IMC)

输入映射上下文是表示玩家所在的特定上下文的输入操作的集合。它描述了触发给定输入操作所需的规则。

在这里，你可以执行实际的“输入键到输入操作”绑定，并为每个操作指定其他触发器或修饰符。将IMC添加到增强输入子系统时，还可以为其指定优先级。

![IMC配置面板](../img/Enhanced%20Input/1688020086880.png)

IMC在蓝图和C++中创建：
```C++
// Expose a mapping context as a property in your header file...
UPROPERTY(EditAnywhere, Category="Input")
TSoftObjectPtr<UInputMappingContext> InputMapping;
 
 
// In your cpp...
if (ULocalPlayer* LocalPlayer = Cast<ULocalPlayer>(Player))
{
    if (UEnhancedInputLocalPlayerSubsystem* InputSystem = LocalPlayer->GetSubsystem<UEnhancedInputLocalPlayerSubsystem>())
    {
        if (!InputMapping.IsNull())
        {
            InputSystem->AddMappingContext(InputMapping.LoadSynchronous(), Priority);
        }
    }
}
```

![IMC蓝图创建](../img/Enhanced%20Input/1688020469719.png)


## Player Mappable Input Config(PMI)

可映射配置是输入映射上下文的集合，表示映射的一个“配置”或“预设”。例如，您可以有一个“默认”和一个“左撇子”可映射配置，它们包含不同的输入映射上下文以进行瞄准。您还可以使用这些配置预定义一组上下文及其优先级，以便一次性添加它们，而不必手动添加输入映射上下文数组。


## 于蓝图中的简单应用实例

{% gallery %}
![Alt text](../img/Enhanced%20Input/1688029452250.png)
![Alt text](../img/Enhanced%20Input/1688029098466.png)
{% endgallery %}

如果操作未生效，可以去`Project Setting -> Input -> Default Classes`中看看是否开启：

![Alt text](../img/Enhanced%20Input/1688031059407.png)

--- 
资料来源：
- [Enhanced Input in UE5](https://dev.epicgames.com/community/learning/tutorials/eD13/unreal-engine-enhanced-input-in-ue5)
- [Enhanced Input](https://docs.unrealengine.com/5.2/zh-CN/enhanced-input-in-unreal-engine/)