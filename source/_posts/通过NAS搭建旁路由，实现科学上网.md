---
title: 通过NAS搭建旁路由，实现科学上网
tags:
  - NAS
  - VPN
categories:
  - 生活
abbrlink: 5e9805a9
date: 2025-05-04 11:24:54
description:
cover: /img/通过NAS搭建软路由，实现科学上网/cover.png
---

## 需求来源
之前解决了自建梯子的问题，但都需要搭配专门的客户端软件来使用。

手机和PC的使用还好说，其他像是游戏主机、掌机或是电视之类的设备要用代理就显得有些麻烦了，一是每台设备都要进行网络设置，二是作为代理网关的设备要一直在线。

因此决定充分发挥 NAS 的价值，构建一个用于日常代理的旁路由。


## 解决思路

### 概念说明

#### 主路由
- 定义：主路由是网络的 核心枢纽，直接连接互联网（外网），负责所有设备的 基础网络服务。

- 核心职责：

    - 外网接入：通过 PPPoE、DHCP 等方式拨号上网，分配公网 IP。
    - NAT（网络地址转换）：将局域网设备的私有 IP 转换为公网 IP，实现多设备共享上网。
    - DHCP 服务：为局域网设备自动分配 IP 地址（如 192.168.1.x）。
    - 基础防火墙：提供端口过滤、IP 黑名单等基础安全功能。
    
- 典型应用场景
    - 家庭宽带接入（光猫+主路由）。
    - 企业网络出口网关。
    - 小型网络唯一路由设备。

- 硬件特性
    - 通常为性能较强的设备（如企业级路由器、高性能家用路由器）。
    - 支持多 WAN 口负载均衡、VPN 服务器等高级功能（高端型号）。

#### 旁路由
- 定义：旁路由是网络的辅助网关，不直接连接外网，而是通过主路由接入互联网，专注于 特定流量处理。

- 核心职责：
    - 流量代理与分流：接管部分设备的流量，实现科学上网、广告过滤等。
    - 高级服务扩展：运行 Docker 容器、VPN 客户端、DNS 服务器（如 AdGuard Home）。
    - 网络策略管理：通过自定义路由表或防火墙规则，精细化控制流量路径。

- 典型应用场景
    - 科学上网：运行 Clash、PassWall 等插件，代理特定流量。
    - 去广告与隐私保护：部署 AdGuard Home 或 Pi-hole 过滤广告域名。
    - 内网服务托管：运行 NAS、智能家居中枢等需长期在线的服务。
    - 网络实验环境：测试新协议或服务（如 IPv6、WireGuard），避免影响主网络。

- 硬件特性
    - 可以是低功耗设备（如树莓派、旧笔记本、软路由）。
    - 通常仅需单网口（通过 VLAN 或单臂路由实现功能）。



### 方案类型

1.  主旁路由网关互指，全局域网实现OP畅玩。

    - 将主路由中的DHCP网关指向旁路由，保持主路由本身的网关指向光猫。这样就可以让局域网内设备通过旁路由来进行流量分配，从而实现各种玩法。

        - 优点：主路由下的设备无须再次指向旁路由网关以及使用额外代理软件。

        - 缺点：一旦旁路由挂了，全屋网络都会瘫痪。

![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E4%B8%BB%E6%97%81%E8%B7%AF%E7%94%B1.png)


2.  设备单独指向旁路由网关，按需使用。

    - 需要使用旁路由来实现各种功能的设备，不要使用主路由的DHCP。而是配置静态路由，把网关单独指向旁路由IP。

        - 优点：旁路由不会影响全屋其他设备网络。

        - 缺点：每台设备都需要在网络设置里将网关单独指向旁路由。

![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E5%8D%95%E8%AE%BE%E5%A4%87%E6%97%81%E8%B7%AF%E7%94%B1.png)


## 搭建流程

### 通过虚拟机安装 istoreOS 

1. 下载 istore 最新固件
    - 下载地址：[x86_64_efi](https://fw.koolcenter.com/iStoreOS/x86_64_efi/)
    - 解压后获取 img 文件，并上传至极空间。
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/istoreOS%E4%B8%8A%E4%BC%A0.png)

2. 安装虚拟机
    - 修改极空间网络模式为`网桥模式（适用于软路由）`
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E4%BF%AE%E6%94%B9%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F.png)

    - 新建虚拟机
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA_1.png)

    - 使用虚拟硬盘安装
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA_2.png)

    - 虚拟机基础配置
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA_3.png)

    - 虚拟机硬盘配置
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA_4.png)

    - 虚拟机网卡配置
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA_5.png)

    - 等待后台安装完成。

### iStoreOS配置旁路由

1. 访问虚拟机VNC，输入命令`quickstart`，如果上一步安装时没退出，直接输入命令即可。
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/VNC.png)
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/QuickStart.png)
    
    
2.  选择`1. Change LAN IP`, 输入和主路相同网段的 IP 地址，这个地址便是进入后台管理页面的局域网地址了。**这里如果没更改默认IP地址，就需要去主路由器后台管理页面查看当前新增的设备 IP 了。**
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/ChangeIP.png)

3. 输入 IP 地址，进入后台管理页面。默认用户名：`root`，密码：`password`。
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/Login.png)

4. 配置为旁路由模式
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/NetworkSetting.png)

5. 详细配置及常见问题，可见官方说明文档[iStoreOS](https://doc.linkease.com/zh/guide/istoreos/network/check_connection.html#%E6%97%81%E8%B7%AF%E7%94%B1)。

### 安装并配置 PassWall

1. [iStore软件包](https://github.com/AUK9527/Are-u-ok/blob/main/apps/README.md)下载`PsssWall`

2. 进入到 iStore 页签，选择手动安装。
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/passwall.png)

3. 安装完成后即可在服务里看到 `PassWall` 配置页面。

    - 在节点列表中添加VPN节点链接。（如有自建节点需求，详见：{% post_link 基于个人服务器的VPN构建 %}）
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/addNode.png)

    - 添加完成后可以在这里进行网络连通性测试。
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/TCP%20Ping.png)

    - 基本设置中，主要的就三个配置`主要`、`DNS`、`模式`，一般默认即可，有诉求的可以自行修改。
        - 主要：开关以及节点选择配置
        ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/Setting_main.png)

        - DNS：解析域名的IP地址，用于代理规则中判断当前地址是否需要代理。
        ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/Setting_DNS.png)

        - 模式：代理规则，一般选择`中国列表以外`即可。
        ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/Setting_Mode.png)


### 主路由器配置
1. 主路由 DHCP 网关指向旁路由。

    - 这里以我用的小米路由器为例，在局域网设置中将 DHCP 的默认网关和 DNS1 改成旁路由的 IP 地址。
        - **后续如果旁路由挂了，DHCP 下的设备都将无法访问网络，需将这两个配置删除或改为主路由默认网关后，便可恢复。**
    ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/MiWiFi.png)

2. 测试设备网络是否正常连通以及外网是否可以访问。


### 常见问题处理

- PassWall 节点列表 Ping/TCPing/URL测试都能通，但在基本测试中像是百度连接和谷歌连接都连接失败
    - DNS 分流设置错误
    
        - PassWall 的 DNS 分流模式若未正确配置，可能导致域名解析未通过代理服务器。需检查以下设置：

            分流模式：选择 dnsmasq，并确保 远程 DNS 设置为境外 DNS（如 8.8.8.8），直连 DNS 使用本地 DNS（如运营商默认 DNS）。

            过滤代理域名 IPv6：若未启用 IPv6 代理，需取消勾选此选项，避免解析冲突。

    - 防火墙配置

        - 区域设置中，关闭SYN-flood防御，入站/出战/转发数据全部改为`接受`。
        ![Alt text](../img/%E9%80%9A%E8%BF%87NAS%E6%90%AD%E5%BB%BA%E8%BD%AF%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/FireWall.png)

        - 进入`网络>防火墙>自定义规则`，添加如下规则以确保流量正常转发。

        ```bash
        iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE
        ```
        - 保存并重启防火墙服务。



