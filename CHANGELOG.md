# Changelog

## 1.10.0

### ⚠️ API Changes

- **SProTable**：API 重构，12 个散落 prop 收拢为 `request` / `searchProps` / `tableProps` 三个分组对象，各透传对应组件全部属性
- **SDependency**：移除字段联动组件及 `type: 'dependency'` 类型，`depNames` / `render` 属性同步移除
- **STitle**：移除 `goBack` / `onBackClick` 属性及 react-router 回退按钮逻辑
- **样式系统**：9 个组件从 CSS-in-JS（antd-style）迁移为纯 CSS，移除 `useComStyle` hook
- **依赖清理**：移除 `antd-style`、`react-router`、`react-router-dom` 三个依赖

### ✨ Features

- **SProTable**：新增 `ref.getForm()` / `ref.clearData()` 方法
- **SProTable**：`searchProps.onFinish` / `searchProps.onReset` / `searchProps.form` 传了用外部，不传走内置
- **SProTable**：`tableProps` 透传 STable 全部属性，`pagination` 做 deep-merge
- **SProTable**：默认 `bordered`、`showSizeChanger: true`、`pageSizeOptions: [10,15,20,50,100]`
- **useProTable**：新增 `mutate` 方法，`ProService` 返回类型放宽为 `Promise<any>`

### 🔧 Fixes & Optimizations

- **STable**：4 个 if/if 字符串 render 派发 → `STRING_RENDER_MAP` 查表；移除 3 个无效 `useCallback`；序号列不再因翻页重建；移除 lodash `isString`
- **STitle**：`hasBottomMargin` 逻辑从 15 行优化为 4 行 useMemo
- **useProTable**：分页默认去掉 `showQuickJumper`

### 📦 Migration Guide

```tsx
// SProTable — 旧
<SSearchTable requestFn={fn} headTitle="管理" formProps={{ items, columns: 3 }} tableProps={{ columns, rowKey: 'id' }} />

// SProTable — 新
<SProTable request={{ service: fn }} title="管理" searchProps={{ items, columns: 3 }} tableProps={{ columns, rowKey: 'id' }} />

// SForm — 旧
{ type: 'dependency', depNames: ['field1'], render: (v) => ... }

// SForm — 新（移除）
// 改用 antd Form.Item 的 shouldUpdate 或自定义组件

// STitle — 旧
<STitle goBack onBackClick={fn}>标题</STitle>

// STitle — 新
<STitle>标题</STitle>
```
