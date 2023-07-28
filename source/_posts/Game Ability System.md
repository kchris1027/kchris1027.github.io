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


#### GamePlay Tags

FGameplayTags 是一种`层级标签`，有父子级关系，如 Parent.child.GrandChild 。通过 GamePlayTagManager 进行注册。

替代了原来的 Bool ,或 Enum 的结构，可以在玩法设计中更高效的标记对象的行为或状态。

#### Gameplay Ability

Gameplay Ability(GA) 标识了游戏中的一个对象（Actor）可以做的`行为或技能`。

能力（Ability）可以是`普通攻击`或者`吟唱技能`，可以是角色被`击飞倒地`，还可以是`使用某种道具`、`交互某个物件`，甚至`跳跃`、`飞行`等角色行为也可以是 Ability 。

Ability 可以被赋予对象或从对象的 ASC 中移除，对象同时可以激活多个 GameplayAbility 。

**基本的移动输入、UI交互行为则不能或不建议通过GA来实现。**

![GAS流程图](../img/Game%20Ability%20System/1690206082610.png)


#### Gameplay Effect

Gameplay Effect(GE) 是 Ability 对自己或他人`产生影响`的途径。

GE 通常可以被理解为我们游戏中的 buff 。 比如增益/减益效果（修改属性）。

但是 GAS 中的 GE 也更加广义，释放技能时候的`伤害结算`，施加特殊效果的`控制`、`霸体`效果（修改 GameplayTag ）都是通过 GE 来实现的。

GE 相当于一个可配置的`数据表`，不可以添加逻辑。开发者创建一个 UGameplayEffect 的派生蓝图，就可以根据需求制作想要的效果。


#### Attribute Set

AttributeSet 负责定义和持有属性，并且管理属性的`变化`，包括`网络同步`。

需要在 Actor 中被添加为成员变量，并注册到 ASC(C++)。

一个 ASC 可以拥有`一个或多个（不同的）`AttributeSet，因此可以角色共享一个很大的 Attribute Set，也可以每个角色按需添加 Attribute Set。

可以在属性变化前（PreAttributeChange）后（PostCameplayEffectExecute）处理相关逻辑，可以通过委托的方式绑定属性变化。


### 使用流程

1. 创建 `C++` 工程，开启 GAS 插件。

2. 注册插件（C++中完成注册）

`/Source/GASSample/GASSample.Bulid.cs` 注册插件，自定义Task需要

```c++
  // Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class GASSample : ModuleRules
{
	public GASSample(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", 
			"GameplayAbilities",/* 修改：注册插件 */
			"GameplayTags", "GameplayTasks"/* 修改：自定义Task需要 */
		});
	}
}

```


3. 修改 character 文件

- `/Source/GASSample/GASSampleCharacter.h`中添加引用、继承接口、申明ASC、实现接口方法、声明Ability数组。

```c++
// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"

// 修改：添加引用
#include "AbilitySystemInterface.h"
#include "AbilitySystemComponent.h"
#include "SampleAttributeSet.h"

#include "GASSampleCharacter.generated.h"

UCLASS(config=Game)
class AGASSampleCharacter : public ACharacter,
	public IAbilitySystemInterface //修改：继承接口
{
	GENERATED_BODY()

	/** Camera boom positioning the camera behind the character */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	class USpringArmComponent* CameraBoom;

	/** Follow camera */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	class UCameraComponent* FollowCamera;

public:

	// 修改：申明ASC
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = GameplayAbilities, meta = (AllowPrivateAccess = "true"))
	class UAbilitySystemComponent* AbilitySystem;

	// 修改：实现接口方法
	UAbilitySystemComponent* GetAbilitySystemComponent()const override;

	// 修改：声明Ability数组
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Abilities)
	TArray<TSubclassOf<UGameplayAbility>> MyAbilities;

	UPROPERTY()
	USampleAttributeSet* AttributeSet;



public:
	AGASSampleCharacter();

	/** Base turn rate, in deg/sec. Other scaling may affect final turn rate. */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category=Camera)
	float BaseTurnRate;

	/** Base look up/down rate, in deg/sec. Other scaling may affect final rate. */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category=Camera)
	float BaseLookUpRate;

protected:

	//修改：添加BeginPlay
	virtual void BeginPlay() override;

	/** Resets HMD orientation in VR. */
	void OnResetVR();

	/** Called for forwards/backward input */
	void MoveForward(float Value);

	/** Called for side to side input */
	void MoveRight(float Value);

	/** 
	 * Called via input to turn at a given rate. 
	 * @param Rate	This is a normalized rate, i.e. 1.0 means 100% of desired turn rate
	 */
	void TurnAtRate(float Rate);

	/**
	 * Called via input to turn look up/down at a given rate. 
	 * @param Rate	This is a normalized rate, i.e. 1.0 means 100% of desired turn rate
	 */
	void LookUpAtRate(float Rate);

	/** Handler for when a touch input begins. */
	void TouchStarted(ETouchIndex::Type FingerIndex, FVector Location);

	/** Handler for when a touch input stops. */
	void TouchStopped(ETouchIndex::Type FingerIndex, FVector Location);

protected:
	// APawn interface
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
	// End of APawn interface

public:
	/** Returns CameraBoom subobject **/
	FORCEINLINE class USpringArmComponent* GetCameraBoom() const { return CameraBoom; }
	/** Returns FollowCamera subobject **/
	FORCEINLINE class UCameraComponent* GetFollowCamera() const { return FollowCamera; }

public:
	virtual void OnHealthChanged();

	UFUNCTION(BlueprintImplementableEvent)
	void K2_OnHealthChanged();

	virtual void OnPhysicalChanged();

	UFUNCTION(BlueprintImplementableEvent)
	void K2_OnPhysicalChanged();
};

```

- `/Source/GASSample/GASSampleCharacter.cpp` 中进行实例化

```c++
// Copyright Epic Games, Inc. All Rights Reserved.

#include "GASSampleCharacter.h"
#include "HeadMountedDisplayFunctionLibrary.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "Components/InputComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/Controller.h"
#include "GameFramework/SpringArmComponent.h"

UAbilitySystemComponent* AGASSampleCharacter::GetAbilitySystemComponent() const
{
	return AbilitySystem;
}

//////////////////////////////////////////////////////////////////////////
// AGASSampleCharacter

AGASSampleCharacter::AGASSampleCharacter()
{
	// Set size for collision capsule
	GetCapsuleComponent()->InitCapsuleSize(42.f, 96.0f);

	// set our turn rates for input
	BaseTurnRate = 45.f;
	BaseLookUpRate = 45.f;

	// Don't rotate when the controller rotates. Let that just affect the camera.
	bUseControllerRotationPitch = false;
	bUseControllerRotationYaw = false;
	bUseControllerRotationRoll = false;

	// Configure character movement
	GetCharacterMovement()->bOrientRotationToMovement = true; // Character moves in the direction of input...	
	GetCharacterMovement()->RotationRate = FRotator(0.0f, 540.0f, 0.0f); // ...at this rotation rate
	GetCharacterMovement()->JumpZVelocity = 600.f;
	GetCharacterMovement()->AirControl = 0.2f;

	// Create a camera boom (pulls in towards the player if there is a collision)
	CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom"));
	CameraBoom->SetupAttachment(RootComponent);
	CameraBoom->TargetArmLength = 300.0f; // The camera follows at this distance behind the character	
	CameraBoom->bUsePawnControlRotation = true; // Rotate the arm based on the controller

	// Create a follow camera
	FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera"));
	FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName); // Attach the camera to the end of the boom and let the boom adjust to match the controller orientation
	FollowCamera->bUsePawnControlRotation = false; // Camera does not rotate relative to arm

	// Note: The skeletal mesh and anim blueprint references on the Mesh component (inherited from Character) 
	// are set in the derived blueprint asset named MyCharacter (to avoid direct content references in C++)

	// 修改：实例化ASC
	AbilitySystem = CreateDefaultSubobject<UAbilitySystemComponent>(TEXT("AbilitySystem"));


	// 在OwnerActor的构造方法中创建的AttributeSet将会自动注册到ASC
	AttributeSet = CreateDefaultSubobject<USampleAttributeSet>(TEXT("AttributeSet"));
}

//////////////////////////////////////////////////////////////////////////
// Input

void AGASSampleCharacter::SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent)
{
	// Set up gameplay key bindings
	check(PlayerInputComponent);
	PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &ACharacter::Jump);
	PlayerInputComponent->BindAction("Jump", IE_Released, this, &ACharacter::StopJumping);

	PlayerInputComponent->BindAxis("MoveForward", this, &AGASSampleCharacter::MoveForward);
	PlayerInputComponent->BindAxis("MoveRight", this, &AGASSampleCharacter::MoveRight);

	// We have 2 versions of the rotation bindings to handle different kinds of devices differently
	// "turn" handles devices that provide an absolute delta, such as a mouse.
	// "turnrate" is for devices that we choose to treat as a rate of change, such as an analog joystick
	PlayerInputComponent->BindAxis("Turn", this, &APawn::AddControllerYawInput);
	PlayerInputComponent->BindAxis("TurnRate", this, &AGASSampleCharacter::TurnAtRate);
	PlayerInputComponent->BindAxis("LookUp", this, &APawn::AddControllerPitchInput);
	PlayerInputComponent->BindAxis("LookUpRate", this, &AGASSampleCharacter::LookUpAtRate);

	// handle touch devices
	PlayerInputComponent->BindTouch(IE_Pressed, this, &AGASSampleCharacter::TouchStarted);
	PlayerInputComponent->BindTouch(IE_Released, this, &AGASSampleCharacter::TouchStopped);

	// VR headset functionality
	PlayerInputComponent->BindAction("ResetVR", IE_Pressed, this, &AGASSampleCharacter::OnResetVR);
}


void AGASSampleCharacter::BeginPlay()
{
	Super::BeginPlay();

	if (nullptr != AbilitySystem)
	{
		// 修改：给ASC赋予技能
		if (HasAuthority() && MyAbilities.Num() > 0)
		{
			for (auto i = 0; i < MyAbilities.Num(); i++)
			{
				if (MyAbilities[i] == nullptr)
				{
					continue;
				}
				AbilitySystem->GiveAbility(FGameplayAbilitySpec(MyAbilities[i].GetDefaultObject(), 1, 0));
			}
		}

		// 修改：初始化ASC
		AbilitySystem->InitAbilityActorInfo(this, this);
	}
}

void AGASSampleCharacter::OnResetVR()
{
	UHeadMountedDisplayFunctionLibrary::ResetOrientationAndPosition();
}

void AGASSampleCharacter::TouchStarted(ETouchIndex::Type FingerIndex, FVector Location)
{
		Jump();
}

void AGASSampleCharacter::TouchStopped(ETouchIndex::Type FingerIndex, FVector Location)
{
		StopJumping();
}

void AGASSampleCharacter::TurnAtRate(float Rate)
{
	// calculate delta for this frame from the rate information
	AddControllerYawInput(Rate * BaseTurnRate * GetWorld()->GetDeltaSeconds());
}

void AGASSampleCharacter::LookUpAtRate(float Rate)
{
	// calculate delta for this frame from the rate information
	AddControllerPitchInput(Rate * BaseLookUpRate * GetWorld()->GetDeltaSeconds());
}

void AGASSampleCharacter::MoveForward(float Value)
{
	if ((Controller != NULL) && (Value != 0.0f))
	{
		// find out which way is forward
		const FRotator Rotation = Controller->GetControlRotation();
		const FRotator YawRotation(0, Rotation.Yaw, 0);

		// get forward vector
		const FVector Direction = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::X);
		AddMovementInput(Direction, Value);
	}
}

void AGASSampleCharacter::MoveRight(float Value)
{
	if ( (Controller != NULL) && (Value != 0.0f) )
	{
		// find out which way is right
		const FRotator Rotation = Controller->GetControlRotation();
		const FRotator YawRotation(0, Rotation.Yaw, 0);
	
		// get right vector 
		const FVector Direction = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::Y);
		// add movement in that direction
		AddMovementInput(Direction, Value);
	}
}

void AGASSampleCharacter::OnHealthChanged()
{
	K2_OnHealthChanged();
}

void AGASSampleCharacter::OnPhysicalChanged()
{
	K2_OnPhysicalChanged();
}

```

配置完成后角色组件便会显示出 `AblilitySystem`。


4. 添加 GA 的逻辑

5. 制作第一个 GA

6. 制作 GE

7. 受击

8. 属性集

9. 制作血条

10. 实现扣蓝扣血逻辑


### 注意点

**先读代码，再做开发**

- 什么时候需要扩展功能/暴露接口？
	- AtrributeSet 的属性回调 GetCameplayAttributeValueChangeDelegate
	- 自定义 Task 节点（PlayMontageAndWaitForEvent） 

- 如何合理的规划 GA、GE 的蓝图种类和数量？
	- 如何处理繁多的 Cost 和 CoolDown GE (MakeOutgoingCameplayEffectSpec)
	- 合理的使用继承逻辑（按类型抽象父类[主动技能、被动技能...]相关的默认 Tag）

### 开发情景的改变

1. 对策划的要求更高

	需要战斗策划有基础的逻辑思维，通过蓝图实现技能设计的快速原型开发，把控GameplayTag的整体规划和配置。

2. 适应新的技能配置方式

	不同于常见的直接配表方式，GAS 需要结合蓝图节点设计，Montage 编辑器，DataTable 配置来实现整体战斗开发。

3. 复杂的伤害结算

	国内游戏开发通常会有复杂的属性成长和战斗结算方式，需要合理的编写 MMC(Modifier Magnitude Calculation) 来实现伤害结算等逻辑。


### 学习资料

1. GASDocument

	https://github.com/tranek/GASDocumentation

	https://blog.csdn.net/pirate310/article/details/106311256

2. 官方说明文档和教学博客

	https://docs.unrealengine.com/en-US/Gameplay/GameplayAbilitySystem/index.html

	https://www.cnblogs.com/JackSamuel/p/7155500.html






## 深入GAS架构设计

{% link 深入GAS架构设计 | EpicGames 大钊,bilibili,https://www.bilibili.com/video/BV1zD4y1X77M/ %}  

🚀 待填坑...