---
  toc: content
  group:
    title: 基础组件
    order: 3
---

# SProTable 查询列表

基于 `useProTable` Hook 封装的查询表格组件。三个分组对象：`request`（数据）、`searchProps`（搜索）、`tableProps`（表格），各透传对应组件全部属性。

## 介绍

### 基础示例

<code src="./demos/basic.tsx"></code>

### 字典回显 + 时间筛选

<code src="./demos/with-dict.tsx"></code>

### 行选择 + 批量操作

<code src="./demos/with-batch.tsx"></code>

### 完整示例

<code src="./demos/with-full.tsx"></code>

### 外部刷新

<code src="./demos/with-refresh.tsx"></code>

### 分页字段映射

<code src="./demos/with-pagination-config.tsx"></code>

### 数据转换 + 外部表单

<code src="./demos/with-transform.tsx"></code>

### 依赖请求

<code src="./demos/with-manual-request.tsx"></code>

## 与 SSearchTable 的区别

|                 | SSearchTable                       | SProTable                                              |
| --------------- | ---------------------------------- | ------------------------------------------------------ |
| 数据请求        | `requestFn`                        | `request={{ service, options }}`                       |
| 搜索配置        | `formProps={{ items }}`            | `searchProps={{ items, ... }}`（透传 SForm.Search）    |
| 表格配置        | `tableProps={{ columns, rowKey }}` | `tableProps={{ columns, rowKey, ... }}`（透传 STable） |
| 标题            | `headTitle` / `tableTitle`         | `title` / `tableTitle`                                 |
| 外部接管        | 不支持                             | `onFinish` / `onReset` / `form` 传了就用外部           |
| RecordType 泛型 | 不支持                             | `SProTable<User>`                                      |

## API

### 组件 Props

| 属性名      | 描述                                           | 类型                                      | 默认值 |
| ----------- | ---------------------------------------------- | ----------------------------------------- | ------ |
| request     | 数据请求配置（**必填**）                       | `RequestConfig`                           | 无     |
| searchProps | 透传 SForm.Search 全部属性                     | `SearchProps`                             | 无     |
| tableProps  | 透传 STable 全部属性，pagination 做 deep-merge | `STableProps`                             | 无     |
| title       | 页面标题                                       | `ReactNode \| { children?, actionNode? }` | 无     |
| tableTitle  | 表格标题栏（`children` 左 / `actionNode` 右）  | `{ children?, actionNode? }`              | 无     |
| style       | 根容器样式                                     | `CSSProperties`                           | 无     |
| className   | 根容器类名                                     | `string`                                  | 无     |

### RequestConfig

| 属性    | 描述                 | 类型                                                |
| ------- | -------------------- | --------------------------------------------------- |
| service | 数据请求函数（必填） | `(params: Record<string, unknown>) => Promise<any>` |
| options | useProTable 配置     | `UseProTableOptions`（不含 form）                   |

### 组件 Ref 方法

| 方法      | 描述                       | 类型                 |
| --------- | -------------------------- | -------------------- |
| refresh   | 刷新当前页（携带表单值）   | `() => void`         |
| reset     | 重置搜索条件并刷新         | `() => void`         |
| getForm   | 获取内部表单实例           | `() => FormInstance` |
| clearData | 清空表格数据（不触发请求） | `() => void`         |
