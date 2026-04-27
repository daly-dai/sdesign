---
  toc: content
  group:
    title: 基础组件
    order: 2
---

# SSearchTable 查询列表

基于 `useSearchTable` Hook 封装的高级查询表格组件，提供更简洁的 API 和更好的开发体验。

## 介绍

### 基础示例

<code src="./demos/base.tsx"></code>

### 高级示例

<code src="./demos/advanced.tsx"></code>

### 自定义分页字段

<code src="./demos/custom-search.tsx"></code>

### 手动触发搜索

<code src="./demos/manual-trigger.tsx"></code>

### 参数转换

<code src="./demos/with-parameter-transform.tsx"></code>

### 行选择功能

<code src="./demos/with-row-selection.tsx"></code>

### 展开行功能

<code src="./demos/with-expanded-row.tsx"></code>

### 删除数据后刷新

演示如何在删除数据后调用刷新方法更新列表。

<code src="./demos/with-delete.tsx"></code>

### 外部表单实例

演示如何通过 `formProps.form` 传入外部创建的 Form 实例，实现更灵活的表单控制。

<code src="./demos/with-external-form.tsx"></code>

## 基本用法

<code src="./demos/basic.tsx"></code>

## API

### 组件 Props

| 属性名     | 描述                                           | 类型                                            | 默认值 |
| ---------- | ---------------------------------------------- | ----------------------------------------------- | ------ |
| headTitle  | 页面标题配置                                   | [STitleProps](/components/title#api)            | 无     |
| tableTitle | 表格区域标题配置                               | [STitleProps](/components/title#api)            | 无     |
| requestFn  | 请求函数，用于获取表格数据（**必填**）         | `(data?: any) => Promise<any>`                  | 无     |
| options    | useSearchTable 的配置选项                      | [useSearchTableOptions](#usesearchtableoptions) | `{}`   |
| formProps  | 搜索表单配置，继承自 SForm.Search 的 props     | [SearchProps](/components/form#api)             | 无     |
| tableProps | 表格配置，会合并到 useSearchTable 返回的 props | [STableProps](/components/table#api)            | 无     |

### 组件 Ref 方法

通过 `ref` 可以访问以下方法：

| 方法名  | 描述                   | 类型                      |
| ------- | ---------------------- | ------------------------- |
| refresh | 手动刷新表格数据       | `(params?: any) => void`  |
| reset   | 重置搜索条件并刷新列表 | `() => void`              |
| getForm | 获取表单实例           | `() => FormInstance<any>` |

## useSearchTableOptions

| 属性名                 | 描述                   | 类型                                  | 默认值 |
| ---------------------- | ---------------------- | ------------------------------------- | ------ |
| form                   | 外部传入的表单实例     | `FormInstance<any>`                   | 无     |
| extraParams            | 额外的请求参数         | `Record<string, any>`                 | 无     |
| manual                 | 是否手动触发请求       | `boolean`                             | false  |
| dispatchParams         | 参数转换函数           | `(params?: any) => any`               | 无     |
| serviceProps           | ahooks useRequest 配置 | `Options<any, any>`                   | 无     |
| paginationFields       | 分页字段映射配置       | [PaginationFields](#paginationfields) | 无     |
| transformRequestParams | 请求参数转换函数       | `(params: any) => any`                | 无     |
| transformResponseData  | 响应数据转换函数       | `(data: any) => any`                  | 无     |

## PaginationFields

| 属性名   | 描述           | 类型     | 默认值      |
| -------- | -------------- | -------- | ----------- |
| current  | 当前页码字段名 | `string` | 'pageNum'   |
| pageSize | 每页条数字段名 | `string` | 'pageSize'  |
| total    | 总条数字段名   | `string` | 'totalSize' |
| list     | 数据列表字段名 | `string` | 'dataList'  |

## 与 useSearchTable Hook 的关系

`SSearchTable` 组件是对 `useSearchTable` Hook 的封装，如果你需要更灵活的控制，可以直接使用 Hook：

```tsx
import { SForm, STable, STitle } from '@dalydb/sdesign';
import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';

const MyComponent = () => {
  const { tableProps, form, formConfig } = useSearchTable(mockRequest, {
    // 配置选项
  });

  return (
    <>
      <STitle>页面标题</STitle>
      <SForm.Search form={form} {...formConfig} />
      <STable {...tableProps} />
    </>
  );
};
```

使用 `SSearchTable` 组件的优势：

1. **更简洁的代码**：无需手动组合组件
2. **统一的样式**：内置 SCard 包裹和标题配置
3. **类型安全**：完整的 TypeScript 类型支持
4. **更好的维护性**：组件级别的封装，便于后续升级
