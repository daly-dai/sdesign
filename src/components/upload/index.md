---
  toc: content
  title: SUpload 上传组件
  group:
    title: 基础组件
    order: 2
---

## 介绍

### 上传组件

### 使用须知

- 上传地址全局配置在**SConfigProvide**中配置**UploadUrl**字段
- 该组件接口地址也可以通过**uploadUrl**字段对单个组件进行配置例,示例如下

```
<SUpload uploadUrl={'/api/upload'} />
```

- 没有全局或传入**uploadUrl**，将无法使用该组件

<code src="./demos/index.tsx"></code>

<code src="./demos/formUploadInstance.tsx"></code>

<code src="./demos/formDragger.tsx"></code>

<code src="./demos/pictureUpload.tsx" > </code>

<code src="./demos/formPicture.tsx"> </code>

<code src="./demos/reflectUpload.tsx" > </code>

### **基于 Upload 封装，更多属性请查看**[uploadProps](https://ant-design.antgroup.com/components/upload-cn#api)

## API

| 属性名           | 描述                               | 类型                                 | 默认值   |
| ---------------- | ---------------------------------- | ------------------------------------ | -------- |
| limit            | 限制文件大小                       | number                               |          |
| limitSizeType    | 限制文件类型                       | K,M (K:kb,M:mb)                      |          |
| value            | 上传组件的值                       | {fileName:string;fileUrl:string}     |          |
| onChange         | 当数据变化的回调函数               | (data) =>void                        |          |
| onItemClick      | 点击文件名称回调函数               | (data) =>void                        |          |
| reflect          | 文件属性映射(picture 不生效)       | { fileName: string; fileUrl:string;} |          |
| children         | 自定义上传区域的内容               | ReactNode                            | null     |
| fileIconMapField | 文件 icon 渲染依据字段             | 'fileUrl'、 'fileName'               | fileName |
| uploadUrl        | 自定义文件上传路径                 | string                               |          |
| imageUrlPrefix   | 图片文件地址回显前缀(本地开发使用) | string                               |          |

## SUpload.Picture

| 属性名      | 描述                         | 类型    | 默认值 |
| ----------- | ---------------------------- | ------- | ------ |
| width       | 图片宽度                     | number  |        |
| height      | 图片高度                     | number  |        |
| hideOnLimit | 达到上传上限时，隐藏上传按钮 | boolean | false  |
