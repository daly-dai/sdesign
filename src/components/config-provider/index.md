---
  toc: content
  group:
    title: 配置
    order: 1
---

# SConfigProvider 全局化配置

### 为组件提供统一的全局化配置，目前支持全局配置字典

<code src="./demos/detail.tsx"></code>

### 全局配置 upload 组件的请求地址

<code src="./demos/uploadUrl.tsx"></code>

## API

| 属性名     | 描述         | 类型               | 默认值 |
| ---------- | ------------ | ------------------ | ------ |
| globalDict | 全局字典值   | Record<string,any> |        |
| uploadUrl  | 文件上传路径 | string             |        |
