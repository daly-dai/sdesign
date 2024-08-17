---
toc: content
---

# 快速开始

## 本组件库基于 Ant Design 二次封装，提供统一且高效的 UI 组件。主要特点包括：

- 提供统一的 STitle 标题和 SBtmContainer 底部操作容器等组件样式。
- 简化数据处理：封装了与后端交互的表单组件，内部处理数据格式转换与验证，提升开发效率。

## 安装说明

**antd 已兼容到 5.16.0**

## 安装（推荐 pnpm）

```bash
pnpm i @daly/sdesign
```

## 全局配置

```bash
# 全局的字典值
const globalDict = {};
#  组件的上传地址
const uploadUrl = ""

# 全局配置
<SConfigProvider globalDict={globalDict} uploadUrl={uploadUrl}>
  <App />
</SConfigProvider>;
```
