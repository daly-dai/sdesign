---
toc: content
group:
  title: 基础组件
  order: 2
---

# SDetail 属性回显

## 介绍

### 基于 Descriptions 组件进行封装

### 目前支持 dict 数据，file 数据等回显，（需要其他类型支持的可联系我补充）

<code src="./demos/detail.tsx"></code>

<code src="./demos/detail-item.tsx"></code>

<code src="./demos/item-detail-name.tsx"></code>

<code src="./demos/complexDetail.tsx"></code>

<code src="./demos/whiteBg.tsx"></code>

<code src="./demos/group.tsx"></code>

<code src="./demos/group-hidden.tsx"></code>

<code src="./demos/detailGroupItems.tsx"></code>

## API

| 属性名        | 描述                     | 类型            | 默认值 |
| ------------- | ------------------------ | --------------- | ------ |
| dataSource    | 详情数据                 | object          | {}     |
| title         | 描述标题(默认为表单标题) | text、ReactNode | []     |
| showFormTitle | 展示表单标题             | boolean         | true   |
| items         | 描述列表                 | SDetailItem[]   | []     |
| whiteBg       | 白色背景样式             | boolean         | false  |
| titleDesc     | 标题描述                 | ReactNode       | {}     |
| titleAction   | 标题操作栏               | ReactNode       | {}     |
| column        | 列                       | number          | 3      |
| detailName    | 渲染嵌套数据的 key 值    | string          |        |

更多属性请参考 [Descriptions](https://ant-design.antgroup.com/components/descriptions-cn#api)

### SDetailItem

| 属性名      | 描述                                              | 类型                                  | 默认值 |
| ----------- | ------------------------------------------------- | ------------------------------------- | ------ |
| label       | 标签                                              | RectNode                              | ""     |
| span        | 包含列的数量                                      | number                                | 1      |
| fileProps   | fileList 相关配置(type 为 file 生效)              | FileListProps                         | null   |
| type        | 渲染类型                                          | 请查看底部 type 类型说明              | text   |
| name        | 字段名，支持数组(目前只在 type 为 rangeTime 生效) | string、string[]                      | ''     |
| dictMap     | 字典值 map，type 为 dict 使用                     | object、Array                         | {}     |
| dictKey     | 字典 key SConfigProvider 存在时生效               | string                                |        |
| dictReflect | 字典值映射（只在 dictMap 为数组时生效）           | {label：string,key:string}            | {}     |
| hidden      | 隐藏该项配置                                      | boolean                               | false  |
| render      | 自定义渲染，优先级最高                            | (value,dataSource) => React.ReactNode | ''     |
| dataSource  | 数据源                                            | Record<string, any>                   |        |

更多 SDetailItem 属性请参考 [descriptionitem](https://ant-design.antgroup.com/components/descriptions-cn#descriptionitem)

### SDetailGroupItem

| 属性名          | 描述                 | 类型                | 默认值 |
| --------------- | -------------------- | ------------------- | ------ |
| groupTitle      | 分组标题             | string              | ""     |
| groupTitleProps | 标题配置项           | PageTitleProps      |        |
| groupContainer  | 分组容器             | ReactNode           |        |
| groupItems      | 分组详情配置项       | SDetailProps        |        |
| items           | 单个详情配置项       | SDetailItem[]       |        |
| dataSource      | 单个详情对应的数据源 | Record<string, any> |        |
| hidden          | 隐藏该项配置         | boolean             | false  |

### SDetailGroupProps

| 属性名     | 描述   | 类型                | 默认值 |
| ---------- | ------ | ------------------- | ------ |
| items      | 配置项 | SDetailGroupItem[]  |        |
| dataSource | 数据源 | Record<string, any> |        |

### SDetail.Item

| 属性名      | 描述                                    | 类型                                  | 默认值 |
| ----------- | --------------------------------------- | ------------------------------------- | ------ |
| value       | 数据                                    | any                                   |        |
| type        | 渲染类型                                | 请查看底部 type 类型说明              | text   |
| render      | 自定义渲染，优先级最高                  | (value,dataSource) => React.ReactNode | ''     |
| dictMap     | 字典值 map，type 为 dict 使用           | object、Array                         | {}     |
| dictKey     | 字典 key SConfigProvider 存在时生效     | string                                |        |
| dictReflect | 字典值映射（只在 dictMap 为数组时生效） | {label：string,key:string}            | {}     |
| fileProps   | fileList 相关配置(type 为 file 生效)    | FileListProps                         | null   |
| type        | 渲染类型                                | 请查看底部 type 类型说明              | text   |

### type 的渲染类型

| 属性名      | 描述                                   |
| ----------- | -------------------------------------- |
| text        | 渲染文本                               |
| empty       | 默认渲染空值 _-_                       |
| placeholder | 占位使用，只渲染标题，标题宽度为 100%  |
| file        | 渲染文件                               |
| img         | 渲染图片                               |
| rangeTime   | 渲染时间范围                           |
| checkbox    | 渲染多选回显(后端返回值需要 _，_ 分割) |
