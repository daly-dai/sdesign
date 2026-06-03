---
toc: content
group:
  title: 基础组件
  order: 2
---

# STitle 标题

## 介绍

### 标题组件

<code  src="./demos/basic.tsx"></code>

<code src="./demos/desc.tsx"></code>

<code src="./demos/actionNode.tsx"></code>

<code src="./demos/prefix.tsx"></code>

## API

| 属性名          | 描述                                             | 类型                    | 默认值 |
| --------------- | ------------------------------------------------ | ----------------------- | ------ |
| title           | 标题名称                                         | ReactNode               |        |
| type            | 标题类型                                         | page、table、form       | page   |
| desc            | 标题后面的内容                                   | ReactNode               |        |
| actionNode      | 操作相关的内容                                   | ReactNode               |        |
| column          | 是否为 column 排列方式                           | boolean                 |        |
| fontSize        | 设置标题大小                                     | number、string          |        |
| hasBottomMargin | 控制标题底部边距(默认为 12px),也可自定义传入数据 | boolean、string、number | true   |
| prefix          | 标题前的自定义内容                               | ReactNode               |        |
