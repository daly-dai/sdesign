---
  toc: content
  group:
    title: 基础组件
    order: 2
---

# SSearchTable 查询列表

## 介绍

<code src="./demos/base.tsx"></code>

<code src="./demos/advanced.tsx"></code>

## API

| 属性名       | 描述         | 类型                                                                    | 默认值 |
| ------------ | ------------ | ----------------------------------------------------------------------- | ------ |
| headTitle    | 页面标题配置 | [STitleProps](/components/title#api)                                    | 无     |
| tableTitle   | 表格标题配置 | [STitleProps](/components/title#api)                                    | 无     |
| serviceProps | 请求服务配置 | { service?: Service<any, any>, serviceProps?: STableOptions<any, any> } | 无     |
| formProps    | 表单配置     | [SearchProps](/components/form#api)                                     | 无     |
| tableProps   | 表格配置     | [STableProps](/components/table#api)                                    | 无     |
