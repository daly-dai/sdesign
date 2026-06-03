---
  toc: content
  group:
    title: 基础组件
    order: 3
---

# SProTable 查询列表

基于 `useSearchTable` Hook 封装的新一代查询表格组件。Props 扁平化设计，不暴露内部生命周期，从类型层面消除误覆盖风险。

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

|                  | SSearchTable                       | SProTable                      |
| ---------------- | ---------------------------------- | ------------------------------ |
| 搜索配置         | `formProps={{ items }}`            | `searchItems` 顶层 prop        |
| 表格配置         | `tableProps={{ columns, rowKey }}` | `columns` / `rowKey` 顶层 prop |
| 标题             | `headTitle` / `tableTitle`         | `title` / `tableTitle`         |
| 内部状态被误覆盖 | 可能                               | 不可能                         |
| RecordType 泛型  | 不支持                             | `SProTable<User>`              |

## API

### 组件 Props

| 属性名        | 描述                                          | 类型                                                  | 默认值 |
| ------------- | --------------------------------------------- | ----------------------------------------------------- | ------ |
| requestFn     | 数据请求函数（**必填**）                      | `(data?: Record<string, unknown>) => Promise<object>` | 无     |
| searchItems   | 搜索项配置                                    | `SFormItems[]`                                        | 无     |
| columns       | 表格列配置                                    | `SColumnsType<RecordType>`                            | 无     |
| rowKey        | 行 key                                        | `string \| ((record: RecordType) => string)`          | 无     |
| title         | 页面标题                                      | `ReactNode`                                           | 无     |
| tableTitle    | 表格标题栏（`children` 左 / `actionNode` 右） | `{ children?, actionNode? }`                          | 无     |
| searchActions | 搜索栏右侧操作节点                            | `ReactNode`                                           | 无     |
| searchColumns | 搜索栏列数                                    | `number`                                              | 3      |
| options       | useSearchTable 配置（不含 form）              | `Omit<useSearchTableOptions, 'form'>`                 | 无     |
| rowSelection  | 行选择                                        | `TableRowSelection<RecordType>`                       | 无     |

### 组件 Ref 方法

| 方法名  | 描述               | 类型         |
| ------- | ------------------ | ------------ |
| refresh | 刷新当前页         | `() => void` |
| reset   | 重置搜索条件并刷新 | `() => void` |
