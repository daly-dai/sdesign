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

## 基本用法

<code src="./demos/basic.tsx"></code>

## Table

| 属性名   | 描述                                                               | 类型    | 默认值 |
| -------- | ------------------------------------------------------------------ | ------- | ------ |
| width    | 宽度                                                               | number  |        |
| maxChars | 最多展示几个字符                                                   | number  |        |
| isSeq    | 是否进行当前页排序，跨页排序 pagination 需要配置 current、pageSize | boolean | false  |
| current  | 当前页数                                                           | number  |        |
| pageSize | 每页条数                                                           | number  |        |

## Table.columns

| 属性名  | 描述     | 类型   | 默认值 |
| ------- | -------- | ------ | ------ |
| dictKey | 字典 key | string |        |
