# useProTable — 列表请求 Hook（SProTable 底层）

## 使用边界

**适用场景:**

- 列表页的数据获取、分页、搜索联动
- 需要通过 `ref` 外部控制刷新（配合 SForm.Search + STable 手动拼装）
- 依赖接口就绪后再请求（`ready`）
- **SProTable 组件内部即使用此 Hook，一般不需要直接调用**

**不适用:**

- 不是列表页（无分页），直接用 `useRequest`
- 用 SProTable 组件即可覆盖的场景，不需要手动调 Hook

## 与 useSearchTable 的区别

|          | useSearchTable（旧）                      | useProTable（新）             |
| -------- | ----------------------------------------- | ----------------------------- |
| 返回值   | 11 个字段                                 | 4 个字段                      |
| 中间对象 | `formConfig`（onFinish/onReset 语义模糊） | 无（`search`/`reset` 直接绑） |
| 初始化   | 依赖变化可能触发二次请求                  | `[]` 永远只跑一次             |
| 依赖接口 | `manual` + `refresh()`                    | `ready` 自动触发              |

## 类型定义

```typescript
function useProTable(
  service: (data?: Record<string, unknown>) => Promise<object>,
  options?: UseProTableOptions,
): UseProTableReturn;
```

**UseProTableOptions**:

- `form?: FormInstance<any>` — 外部表单实例
- `ready?: boolean` — 是否就绪，默认 true。false 时初始化不请求
- `manual?: boolean` — 是否手动触发，默认 false
- `paginationFields?: { current?, pageSize?, total?, list? }` — 分页字段映射，默认 `{ current: 'pageIndex', pageSize: 'pageSize', total: 'total', list: 'list' }`
- `extraParams?: Record<string, unknown>` — 额外请求参数
- `dispatchParams?: (params) => params` — 请求前参数处理
- `transformRequestParams?: (params) => params` — 请求参数二次转换
- `transformResponseData?: (data) => data` — 响应数据转换
- `serviceProps?: Options<any, any>` — ahooks useRequest 配置

**UseProTableReturn**:

- `tableProps: { dataSource, pagination, loading }` — 直接传递给 STable
- `search: () => void` — 搜索/刷新，携带 form 当前值
- `reset: () => void` — 重置 form 并搜索
- `form: FormInstance<any>` — 表单实例

## 使用示例

```tsx
import useProTable from '@dalydb/sdesign/hooks/useProTable';

// 标准用法
const { tableProps, search, reset, form } = useProTable(
  (params) => userApi.getListByGet(params),
  { paginationFields: { current: 'pageNum', list: 'dataList', total: 'totalSize' } },
);

<SForm.Search form={form} onFinish={search} onReset={reset} items={searchItems} />
<STable {...tableProps} columns={columns} rowKey="id" />
```
