---
toc: content
group:
  title: 基础组件
  order: 2
---

# SDetail 详情展示组件

## 介绍

SDetail 是基于 CSS Grid 自渲染的高级详情展示组件，支持多种数据类型的自动渲染，包括：

- **文本** - 普通文本展示
- **字典** - 自动映射字典值
- **文件** - 单文件/文件列表展示
- **标签** - Tag 标签渲染
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

### Tag 标签

<code src="./demos/tag.tsx"></code>

### 加载态骨架屏

<code src="./demos/loading.tsx"></code>

### 卡片分组式

<code src="./demos/card-group.tsx"></code>

### 左右分栏式

<code src="./demos/split-panel.tsx"></code>

### Tab 页签式

<code src="./demos/tabbed.tsx"></code>

### 折叠面板式

<code src="./demos/collapse.tsx"></code>

### 时间轴式

<code src="./demos/timeline.tsx"></code>

### 悬浮固定头式

<code src="./demos/sticky-header.tsx"></code>

### 不对称跨列

<code src="./demos/asymmetric-span.tsx"></code>

### 末行嵌入表格

<code src="./demos/table-in-detail.tsx"></code>

## 基本用法

<code src="./demos/basic.tsx"></code>

## API

### SDetail

| 属性名       | 描述                       | 类型                         | 默认值         |
| ------------ | -------------------------- | ---------------------------- | -------------- |
| items        | 描述项配置                 | `SDetailItem[]`              | `[]`           |
| dataSource   | 数据源                     | `Record<string, any>`        | `{}`           |
| title        | 标题                       | `string \| ReactNode`        | -              |
| desc         | 标题描述                   | `ReactNode`                  | -              |
| titleAction  | 标题操作区                 | `ReactNode`                  | -              |
| columns      | Grid 列定义                | `number \| string`           | `3`            |
| column       | 【已废弃】请用 columns     | `number`                     | -              |
| layout       | 布局方式                   | `'horizontal' \| 'vertical'` | `'horizontal'` |
| gap          | Grid 间距（px）            | `number`                     | `16`           |
| labelWidth   | label 列宽度               | `number \| string`           | `'auto'`       |
| colon        | 显示冒号                   | `boolean`                    | `true`         |
| hasCardBg    | 卡片背景                   | `boolean`                    | `false`        |
| labelStyle   | 统一 label 样式            | `CSSProperties`              | -              |
| contentStyle | 统一内容区样式             | `CSSProperties`              | -              |
| detailName   | 嵌套数据 key，支持点号路径 | `string`                     | -              |
| emptyText    | 全局空值占位文案           | `ReactNode`                  | `'-'`          |
| loading      | 加载中骨架屏               | `boolean`                    | `false`        |
| container    | 自定义容器                 | `ComponentType`              | -              |

### SDetailItem

| 属性名      | 描述                          | 类型                               | 默认值                        |
| ----------- | ----------------------------- | ---------------------------------- | ----------------------------- |
| label       | 标签                          | `ReactNode`                        | -                             |
| name        | 字段名，支持 `'a.b'` 嵌套路径 | `string \| string[]`               | -                             |
| type        | 渲染类型                      | `ItemType`                         | `'text'`                      |
| span        | 跨列数（grid-column: span N） | `number`                           | -                             |
| hidden      | 隐藏                          | `boolean`                          | `false`                       |
| render      | 自定义渲染                    | `(value, dataSource) => ReactNode` | -                             |
| copyable    | 可复制（text/dict 生效）      | `boolean`                          | -                             |
| ellipsis    | 长文本省略（text 生效）       | `boolean \| { rows: number }`      | -                             |
| tooltip     | label 悬浮提示                | `ReactNode`                        | -                             |
| dictMap     | 字典映射                      | `object \| any[]`                  | -                             |
| dictKey     | 字典 key                      | `string`                           | -                             |
| dictReflect | 字段映射                      | `{label?: string, name?: string}`  | `{label:'label',name:'name'}` |
| tagColorMap | tag 颜色映射（值 → 颜色）     | `Record<string, string>`           | -                             |
| fileProps   | 文件配置                      | `Partial<FileListProps>`           | -                             |

### ItemType 渲染类型

| 类型          | 说明                         | 示例数据                       |
| ------------- | ---------------------------- | ------------------------------ |
| `text`        | 普通文本                     | `'张三'`                       |
| `empty`       | 空值显示（默认 `-`）         | -                              |
| `placeholder` | 占位（有意留空标记）         | -                              |
| `dict`        | 字典映射                     | `dictMap: {1:'男', 2:'女'}`    |
| `tag`         | 标签渲染（配合 tagColorMap） | `dictMap + tagColorMap`        |
| `file`        | 文件展示                     | 单文件对象或数组               |
| `rangeTime`   | 时间范围                     | `['2024-01-01', '2024-12-31']` |
| `checkbox`    | 多选回显                     | `'1,2,3'`（逗号分隔）          |

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

| 属性名      | 描述                      | 类型                               | 默认值                        |
| ----------- | ------------------------- | ---------------------------------- | ----------------------------- |
| value       | 数据值                    | `any`                              | -                             |
| type        | 渲染类型                  | `ItemType`                         | `'text'`                      |
| render      | 自定义渲染                | `(value, dataSource) => ReactNode` | -                             |
| dictMap     | 字典映射                  | `object \| any[]`                  | -                             |
| dictKey     | 字典 key                  | `string`                           | -                             |
| dictReflect | 字段映射                  | `{label?: string, name?: string}`  | `{label:'label',name:'name'}` |
| tagColorMap | tag 颜色映射（值 → 颜色） | `Record<string, string>`           | -                             |
| fileProps   | 文件配置                  | `Partial<FileListProps>`           | -                             |

## 技术文档

更多技术细节请参考 [SDetail 技术文档](/docs/components/detail-documentation)
