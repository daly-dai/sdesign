---
toc: content
group:
  title: 基础组件
  order: 2
---

# SFile 文件回显

## 文件列表组件

### SFile

<code src="./demos/fileItem.tsx"></code>

### SFile.List

<code src="./demos/fileList.tsx"></code>

<code src="./demos/reflectFileList.tsx"></code>

###

## API

| 属性名       | 描述             | 类型                                 | 默认值 |
| ------------ | ---------------- | ------------------------------------ | ------ |
| nameLimit    | 文件名称字数限制 | number                               | 8      |
| reflect      | 文件属性映射     | { fileName: string; fileUrl:string;} |        |
| style        | 自定义样式       | React.CSSProperties                  | {}     |
| onFileHandle | 自定义点击事件   | (file:FileDataType) =>void           |        |

## SFile.List

| 属性名           | 描述                   | 类型                            | 默认值   |
| ---------------- | ---------------------- | ------------------------------- | -------- |
| label            | 标签文案               | string                          |          |
| fileList         | 文件列表               | FileDataType[]                  |          |
| direction        | 排列方式（行，列）     | column 、line                   | column   |
| itemRender       | 自定义列表渲染         | (file:FileDataType) =>ReactNode |          |
| fileIconMapField | 文件 icon 渲染依据字段 | 'fileUrl'、 'fileName'          | fileName |

## SFileInstance

| 属性名           | 描述                   | 类型                   | 默认值   |
| ---------------- | ---------------------- | ---------------------- | -------- |
| fileData         | 数据                   | FileDataType           |          |
| canClickName     | 是否可点击             | boolean                | true     |
| fileIconMapField | 文件 icon 渲染依据字段 | 'fileUrl'、 'fileName' | fileName |

### FileDataType

| 属性名   | 描述     | 类型   | 默认值 |
| -------- | -------- | ------ | ------ |
| id       | 文件 id  | string | ""     |
| fileName | 文件名称 | string | ""     |
| fileUrl  | 文件地址 | string | ''     |
