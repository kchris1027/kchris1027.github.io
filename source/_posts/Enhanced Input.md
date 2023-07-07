---
title: Enhanced Input（增强输入系统）
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

{% link 新一代增强输入框架EnhancedInput | Epic 大钊,bilibili,https://www.bilibili.com/video/BV14r4y1r7nz %}  

## 问题由来

### 旧系统问题

- 旧系统实现基础的功能比较简单，但在想构建更复杂机制上就得需要在User层做更多的工作。例如角色在不同情景下的输入变化。（近战/远程/载具的操作模式切换）
- 过于简陋，需自己实现众多行为。例如按住/攻击。

### 新系统目标

- 重新梳理简化。Axis/Aciton --> Action
- 运行时重映射输入场景。UInputMappingContext
- 对初级用户易配置。大量默认行为实现，Tap/Hold...
- 对高级用户易拓展，可继承子类拓展
  - 修改器：修改输入值
  - 触发器：决定触发条件
  - 优先级：配置输入场景优先级
- 模块化，不再只依赖ini配置，以资源asset方式配置，堆栈式分隔逻辑。
- 提高性能，不需要检查所有输入，只需关心当前的场景和绑定。
- UE5正式替换掉旧有输入系统


## 基础用法

1. 开启插件并重启编辑器

![开启插件](../img/Enhanced%20Input/1688706220659.png)

2. 替换默认类型

![修改默认类](../img/Enhanced%20Input/1688031059407.png)

3. 创建 `InputAction`

![创建InputAction](../img/Enhanced%20Input/1688706347006.png)

4. 创建 `InputMappingContext`

![创建InputMappingContext](../img/Enhanced%20Input/1688706433891.png)

5. 绑定Action委托

![绑定Action](../img/Enhanced%20Input/1688706754986.png)

6. 应用 InputMappingContext

![应用 InputMappingContext](../img/Enhanced%20Input/1688706878545.png)



## 核心概念

### InputStack

{% gallery %}
![InputStack](../img/Enhanced%20Input/1688708513286.png)

![InputStack](../img/Enhanced%20Input/1688721979414.png)
{% endgallery %}

### PlayerInput

{% gallery %}

![PlayerInput](../img/Enhanced%20Input/1688722117498.png)

![InputComponent](../img/Enhanced%20Input/1688722221393.png)

![Input处理流程](../img/Enhanced%20Input/1688722267331.png)

{% endgallery %}

### EnhancedInput

{% gallery %}

![Enhanced Framework](../img/Enhanced%20Input/1688722826976.png)

![EnhancedPlayerInput](../img/Enhanced%20Input/1688723124469.png)

{% endgallery %}

#### UInputComponent，输入组件（IC）

![EnhancedInputComponent](../img/Enhanced%20Input/1688723221759.png)

#### UInputAction，输入动作（IA）

输入操作在概念上等同于“操作”和“轴”映射名称，只是它们是数据资产。每个输入操作都应表示用户可以执行地操作，你可以在蓝图或C++中添加监听器，以便此输入操作的状态发生变化。

输入操作可以是几种不同的“类型”，这些“类型”将决定其行为。您可以制作简单的“布尔”操作或更复杂的 3D 轴。操作的类型决定了您可以从中获得什么价值。布尔操作将具有一个简单的布尔值，Axis1D 将是浮点值，Axis2D 将是 FVector2D，而 Axis3D 是整个 FVector。

当您有只有“开”或“关”状态的东西时，您应该使用“bool”操作。这相当于旧输入系统中的旧“操作”映射。对于游戏手柄操纵杆值等内容，可以使用 2D 轴操作来保持操纵杆位置的 X 和 Y 值。可以使用 3D 轴保存更复杂的数据，例如运动控制器信息。

![InputAction](../img/Enhanced%20Input/1688723647162.png)

- IA中的`Triggers`和`Modifiers`和IMC中的会同时生效，IA中的效果会针对这个action全局生效，无论绑定什么按键。

#### UInputModifier，输入修改器（IM）

用于修改来自用户设备的原始输入值。在输入映射上下文中，每个输入动作的原始输入都可以关联任意数量的修饰器。常见修饰器包括死区、多帧输入平滑处理、将输入向量从本地空间转换到世界空间，以及插件中的一些其他修饰器。开发人员还可以创建自己的修饰器。

![InputModifier](../img/Enhanced%20Input/1688723351747.png)

#### UInputTrigger，输入触发器（IT）

输入触发器确定用户输入在通过可选的输入修饰符列表后，是否应在其输入映射上下文中激活相应的输入操作。大多数输入触发器会分析输入本身，检查最小驱动值并验证短按、长时间保持或典型的“按下(`press`)”或“释放(`release`)”事件等模式。此规则的例外情况是依赖于另一个操作的任何触发器，例如“按弦操作(`Chorded Action`)”或“组合(`Combo`)”触发器。默认情况下，输入上的任何用户活动都将在每帧触发。

- `Chorded Action`：通常用于描述一种通过按下多个键或按键的组合来执行特定操作或命令的输入方式

![InputTrigger](../img/Enhanced%20Input/1688723487747.png)



触发器状态表示操作所处的当前状态，例如已触发（Triggered）、开始（Started）、持续（Ongoing）、完成（Completed）和取消（Canceled）。

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

#### UInputMappingContext，输入映射上下文环境（IMC）

输入映射上下文是表示玩家所在的特定上下文的输入操作的集合。它描述了触发给定输入操作所需的规则。

在这里，你可以执行实际的“输入键到输入操作”绑定，并为每个操作指定其他触发器或修饰符。将IMC添加到增强输入子系统时，还可以为其指定优先级。

![InputMappingContext](../img/Enhanced%20Input/1688724067454.png)

#### Player Mappable Input Config(PMI)

可映射配置是输入映射上下文的集合，表示映射的一个“配置”或“预设”。例如，您可以有一个“默认”和一个“左撇子”可映射配置，它们包含不同的输入映射上下文以进行瞄准。您还可以使用这些配置预定义一组上下文及其优先级，以便一次性添加它们，而不必手动添加输入映射上下文数组。


#### EnhancedInput处理流程

{% gallery %}

![EnhancedInput处理流程](../img/Enhanced%20Input/1688724170723.png)

![比较](../img/Enhanced%20Input/1688724401645.png)

![AddMappingContext流程](../img/Enhanced%20Input/1688724486786.png)

![EnhancedInputSubsystem](../img/Enhanced%20Input/1688724618741.png)

{% endgallery %}




## 最佳实践

### IMC BindAction

- 初始情况应该在哪里开始应用IMC
- 后续运行时在蓝图中应该如何切换IMC
- 何时Remove IMC？
- 在哪里绑定Action和Axis
- 在蓝图中如何BindAction

{% gallery %}

![PlayerController](../img/Enhanced%20Input/1688724917645.png)

![Pawn](../img/Enhanced%20Input/1688725135376.png)

![PawnRemove](../img/Enhanced%20Input/1688725252675.png)

![IMC BingAction最佳实践](../img/Enhanced%20Input/1688725317235.png)

{% endgallery %}

### Debug

![Debug](../img/Enhanced%20Input/1688725540514.png)


### 联动

{% gallery %}

![联动GameFeatures01](../img/Enhanced%20Input/1688725917343.png)

![联动GameFeatures02](../img/Enhanced%20Input/1688725743972.png)

![联动GAS](../img/Enhanced%20Input/1688725783610.png)

{% endgallery %}

### 扩展

![扩展](../img/Enhanced%20Input/1688725975620.png)

### 总结

![总结](../img/Enhanced%20Input/1688726015986.png)




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