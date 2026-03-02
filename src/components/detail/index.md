---
toc: content
group:
  title: 基础组件
  order: 2
---

# SDetail 详情展示组件

## 介绍

SDetail 是基于 Ant Design Descriptions 组件封装的高级详情展示组件，支持多种数据类型的自动渲染，包括：

- **文本** - 普通文本展示
- **字典** - 自动映射字典值
- **文件** - 单文件/文件列表展示
- **图片** - 图片预览
- **时间范围** - 时间区间展示
- **多选** - 多选项回显
- **占位** - 纯占位布局

### 特性

- 🎯 内置 8 种数据类型渲染器
- 📦 支持分组展示复杂详情
- 🎨 与 SDesign 组件生态无缝集成
- ⚡ 性能优化（useMemo、React.memo）
- 🔧 支持自定义渲染

## 代码演示

### 基础用法

<code src="./demos/detail.tsx"></code>

### 使用 SDetail.Item

<code src="./demos/detail-item.tsx"></code>

### 嵌套数据源

<code src="./demos/item-detail-name.tsx"></code>

### 复杂详情

<code src="./demos/complexDetail.tsx"></code>

### 白色背景

<code src="./demos/whiteBg.tsx"></code>

### 分组展示

<code src="./demos/group.tsx"></code>

### 分组隐藏

<code src="./demos/group-hidden.tsx"></code>

### 分组详情项

<code src="./demos/detailGroupItems.tsx"></code>

## API

### SDetail

| 属性名       | 描述         | 类型                         | 默认值         |
| ------------ | ------------ | ---------------------------- | -------------- |
| items        | 描述项配置   | `SDetailItem[]`              | `[]`           |
| dataSource   | 数据源       | `Record<string, any>`        | `{}`           |
| title        | 标题         | `string \| ReactNode`        | -              |
| desc         | 标题描述     | `ReactNode`                  | -              |
| titleAction  | 标题操作区   | `ReactNode`                  | -              |
| column       | 列数         | `number`                     | `3`            |
| layout       | 布局方式     | `'horizontal' \| 'vertical'` | `'horizontal'` |
| colon        | 显示冒号     | `boolean`                    | `false`        |
| hasCardBg    | 卡片背景     | `boolean`                    | `false`        |
| labelStyle   | 标签样式     | `CSSProperties`              | -              |
| contentStyle | 内容样式     | `CSSProperties`              | -              |
| detailName   | 嵌套数据 key | `string`                     | -              |
| container    | 自定义容器   | `ComponentType`              | -              |

更多属性请参考 [Ant Design Descriptions](https://ant-design.antgroup.com/components/descriptions-cn#api)

### SDetailItem

| 属性名      | 描述       | 类型                               | 默认值                        |
| ----------- | ---------- | ---------------------------------- | ----------------------------- |
| label       | 标签       | `ReactNode`                        | -                             |
| name        | 字段名     | `string \| string[]`               | -                             |
| type        | 渲染类型   | `ItemType`                         | `'text'`                      |
| span        | 跨列数     | `number`                           | -                             |
| hidden      | 隐藏       | `boolean`                          | `false`                       |
| render      | 自定义渲染 | `(value, dataSource) => ReactNode` | -                             |
| dictMap     | 字典映射   | `object \| any[]`                  | -                             |
| dictKey     | 字典 key   | `string`                           | -                             |
| dictReflect | 字段映射   | `{label?: string, name?: string}`  | `{label:'label',name:'name'}` |
| fileProps   | 文件配置   | `Partial<FileListProps>`           | -                             |

更多属性请参考 [Descriptions.Item](https://ant-design.antgroup.com/components/descriptions-cn#descriptionitem)

### ItemType 渲染类型

| 类型          | 说明                 | 示例数据                       |
| ------------- | -------------------- | ------------------------------ |
| `text`        | 普通文本             | `'张三'`                       |
| `empty`       | 空值显示 `-`         | -                              |
| `placeholder` | 占位（只显示 label） | -                              |
| `dict`        | 字典映射             | `dictMap: {1:'男', 2:'女'}`    |
| `file`        | 文件展示             | 单文件对象或数组               |
| `img`         | 图片展示             | 图片 URL                       |
| `rangeTime`   | 时间范围             | `['2024-01-01', '2024-12-31']` |
| `checkbox`    | 多选回显             | `'1,2,3'`（逗号分隔）          |

### SDetail.Group

用于分组展示复杂详情结构。

#### SDetailGroupItem

| 属性名          | 描述       | 类型                                          | 默认值  |
| --------------- | ---------- | --------------------------------------------- | ------- |
| groupTitle      | 分组标题   | `string \| ReactNode`                         | -       |
| groupTitleProps | 标题配置   | `Omit<STitleProps, 'title'>`                  | -       |
| groupContainer  | 分组容器   | `ComponentType`                               | -       |
| groupItems      | 子详情数组 | `SDetailProps[]`                              | -       |
| items           | 详情项     | `SDetailItem[]`                               | -       |
| itemProps       | 通用配置   | `Omit<SDetailProps, 'items' \| 'dataSource'>` | -       |
| dataSource      | 数据源     | `Record<string, any>`                         | -       |
| hidden          | 隐藏       | `boolean`                                     | `false` |

### SDetail.Item

独立详情项组件，用于自定义场景。

| 属性名      | 描述       | 类型                               | 默认值                        |
| ----------- | ---------- | ---------------------------------- | ----------------------------- |
| value       | 数据值     | `any`                              | -                             |
| type        | 渲染类型   | `ItemType`                         | `'text'`                      |
| render      | 自定义渲染 | `(value, dataSource) => ReactNode` | -                             |
| dictMap     | 字典映射   | `object \| any[]`                  | -                             |
| dictKey     | 字典 key   | `string`                           | -                             |
| dictReflect | 字段映射   | `{label?: string, name?: string}`  | `{label:'label',name:'name'}` |
| fileProps   | 文件配置   | `Partial<FileListProps>`           | -                             |

## 技术文档

更多技术细节请参考 [SDetail 技术文档](/docs/components/detail-documentation)
