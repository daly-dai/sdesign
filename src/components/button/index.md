---
  toc: content
  group:
    title: 基础组件
    order: 2
---

# SButton 按钮组件

## 介绍

### 按钮组件

**将常见的操作按钮类型相关图表进行封装**

<code src="./demos/index.tsx"></code>

**SButton.Group 按钮组组件**

## 基本用法

展示不同类型按钮的组合

<code src="./demos/basic.tsx"></code>

## 不同尺寸

支持大、中、小三种尺寸

<code src="./demos/size.tsx"></code>

## 全局禁用与 loading

所有按钮都可以设置为禁用状态

<code src="./demos/disabled.tsx"></code>

## 自定义按钮显示

通过 visible 属性控制按钮的显示/隐藏

<code src="./demos/visible.tsx"></code>

## 自定义渲染

通过 render 属性自定义按钮内容

<code src="./demos/custom-render.tsx"></code>

## 自定义间距

通过 spaceProps 自定义按钮间距

<code src="./demos/custom-space.tsx"></code>

## 垂直排列

通过 spaceProps 实现垂直排列

<code src="./demos/vertical.tsx"></code>

[更多属性请查看 Button 文档](https://4x-ant-design.antgroup.com/components/button-cn/#Button?_blank)

## API

| 属性名 | 描述                                                                                                                                                                                                                                         | 类型   | 默认值    |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------- |
| type   | 按钮类型，支持基础类型和扩展类型<br/>基础类型：primary, secondary, danger, link, text<br/>扩展类型：save, cancel, reset, upload, download, export, import, delete, view, back, next, previous, finish, create, edit, confirm, close, refresh | string | 'primary' |

## SButton.Group 按钮组组件

| 属性名     | 描述         | 类型                           | 默认值   |
| ---------- | ------------ | ------------------------------ | -------- |
| spaceProps | 按钮间距属性 | SpaceProps                     | -        |
| size       | 按钮尺寸     | 'large' \| 'middle' \| 'small' | 'middle' |
| disabled   | 禁用所有按钮 | boolean                        | false    |
| loading    | 加载状态     | boolean                        | false    |
