---
toc: content
group:
  title: 基础组件
  order: 2
---

# STable 表格组件

## 介绍

### table 长数据单行展示

### 🚀 目前支持内容 文本、数字， 其余数组、对象等数据建议使用自定义 render

### 🚀 使用明细

### 🚀 超出一定长度显示... 必须设置对应列宽度

📝1、maxChars 优先级最高，设置后展示 12 个，其余 hover 展示(12 个字符展示，需自行计算调整合适宽度)
📝2、设置 width 展示对应区域内容，超出部分 hover 展示

<code src="./demos/table-cell-ellipsis.tsx"></code>

<code src="./demos/table-dict.tsx"></code>

<code src="./demos/table-ellipsis-dict.tsx"></code>

## 基本用法

<code src="./demos/basic.tsx"></code>

## Table

其他属性完整透传 antd Table，详见 [antd Table 文档](https://ant.design/components/table-cn#api)。

## Table.columns

| 属性名  | 描述                                                                               | 类型                                                        | 默认值 |
| ------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| dictKey | 字典 key，配合 SConfigProvider 的 globalDict 自动映射                              | string                                                      |        |
| render  | 列渲染器。除函数外支持字符串快捷类型：`'datetime'` `'date'` `'ellipsis'` `'index'` | `Function \| 'datetime' \| 'date' \| 'ellipsis' \| 'index'` |        |
