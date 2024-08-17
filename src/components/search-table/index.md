---
  toc: content
  group:
    title: 基础组件
    order: 2
---

# SSearchTable 查询列表

## 介绍

<code src="./demos/index.tsx"></code>

<code src="./demos/base.tsx"></code>

## API

| 属性名           | 描述                | 类型                                       | 默认值 |
| ---------------- | ------------------- | ------------------------------------------ | ------ |
| title            | 标题                | ReactNode                                  | 无     |
| titleAction      | 标题右侧操作        | ReactNode                                  | 无     |
| titleProps       | 标题配置            | [PageTitleProps](/components/title#api)    | 无     |
| columns          | 表格配置            | TechColumnsType<any>                       | 无     |
| searchItems      | 搜索表单配置        | [TechFormItems[]](/components/form#form-1) | 无     |
| service          | 请求                | (data?: any) => Promise<any>               | 无     |
| serviceProps     | useRequest 相关配置 | Options<any, any>                          | 无     |
| extraParams      | 额外的传参          | Record<string, any>                        | 无     |
| form             | form 实例           | FormInstance<any>                          | 无     |
| formProps        | searchForm 相关配置 | FormInstance<any>                          | 无     |
| tableProps       | 表格配置            | [TechTableProps](/components/table#api)    | 无     |
| dispatchParams   | 处理查询传参        | (params?: any) => any                      | 无     |
| handleDataSource | 处理返回数据        | (data?: any[]) => any[]                    | 无     |
