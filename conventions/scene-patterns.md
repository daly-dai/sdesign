# SDesign 场景模式库

> 从 AI 代码生成实战中沉淀的常见页面模式。AI 生成代码时按场景匹配。

## 场景 1：标准 CRUD 列表

**用什么**：`SProTable`
**关键 props**：`requestFn` + `searchItems` + `columns` + `rowKey`
**demo**：`pro-table/demos/basic.tsx`

```
<SProTable<User>
  requestFn={getListByGet}
  searchItems={[{ label: '关键词', name: 'keyword', type: 'input' }]}
  columns={columns}
  rowKey="id"
  title="用户管理"
  tableTitle={{ children: '列表', actionNode: <SButton actionType="create" /> }}
/>
```

## 场景 2：多 Tab 多表格

**用什么**：`useProTable` × 2 + `SForm.Search` + `antd Tabs` + `STable`
**关键点**：搜索项按 activeTab 条件展开（不用 hidden），选中态每 Tab 独立
**demo**：见 `specs/tab-list/prd.md`

```tsx
const tab1 = useProTable(api1, { form });
const tab2 = useProTable(api2, { form });

const searchItems = [...baseItems, ...(activeTab === 'tab1' ? tab1Extra : [])];

<SForm.Search form={form} onFinish={search} items={searchItems} />
<Tabs>
  <TabPane><STable {...tab1.tableProps} columns={cols1} rowSelection={sel1} /></TabPane>
  <TabPane><STable {...tab2.tableProps} columns={cols2} rowSelection={sel2} /></TabPane>
</Tabs>
```

## 场景 3：依赖接口后再请求

**用什么**：`ready` prop
**关键点**：`ready={!!configData}`，配置返回后自动触发首次请求。不需要 `manual + refresh()`
**demo**：`pro-table/demos/with-manual-request.tsx`

## 场景 4：分页字段映射

**用什么**：`options.paginationFields`
**关键点**：后端字段名和默认 `{ pageIndex, pageSize, total, list }` 不同时配置映射

```tsx
options={{ paginationFields: { current: 'pageNum', total: 'totalSize', list: 'dataList' } }}
```

## 场景 5：请求数据转换

**用什么**：`dispatchParams`（请求前）+ `transformResponseData`（响应后）
**demo**：`pro-table/demos/with-transform.tsx`

```tsx
options={{
  dispatchParams: (params) => ({ ...params, statusCode: params.status - 1 }),
  transformResponseData: (data) => ({ ...data, records: data.records.map(transform) }),
}}
```

## 场景 6：行选择 + 批量操作

**用什么**：`rowSelection` + `tableTitle.actionNode`
**关键点**：`selectedRowKeys` 外部管理，切换 Tab 时清空
**demo**：`pro-table/demos/with-batch.tsx`

## 场景 7：字典回显（dictKey）

**表格列**：`{ dataIndex: 'status', dictKey: 'orderStatus' }`
**搜索下拉**：`{ type: 'select', fieldProps: { dictKey: 'orderStatus', allowClear: true } }`
**全局注入**：`<SConfigProvider globalDict={{ orderStatus: { 0: '待处理', 1: '已完成' } }}>`

## 场景 8：确认弹窗

**用什么**：`Modal.confirm`（antd 原生），不用 `SConfirm`
**模式**：

```tsx
<SButton
  actionType="delete"
  onClick={() => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后不可恢复',
      onOk: () => del(id),
    });
  }}
/>
```
