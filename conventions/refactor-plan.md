# SDesign 类型系统改造方案

> 基于 AI 代码生成场景的审计结果。目标：降低弱模型使用时因类型陷阱导致的反复报错。

---

## 执行状态（2025-07）

### ✅ 已完成（Phase 1 + 扩展）

| #   | 改动                                                                                                 | 状态 |
| --- | ---------------------------------------------------------------------------------------------------- | ---- |
| #2  | SForm Omit 笔误 `'label \| name'` → `'label' \| 'name'`                                              | ✅   |
| #3  | FormField 重构：用 `FORM_ITEM_COM_MAP` 直接取值 + `unknown` 替代 `any`                               | ✅   |
| #6  | SDetail render 冲突：Omit `DescriptionsItemType.render`                                              | ✅   |
| #7  | STable RenderType 扩展：加 `'index'` 快捷值                                                          | ✅   |
| #9  | useSearchTable rest 显式化：`refresh`/`mutate`/`cancel`                                              | ✅   |
| #10 | SSelect `HTMLAttributes<object> &` 污染 → `SelectProps`                                              | ✅   |
| #11 | SCheckGroup `HTMLAttributes<object> &` 污染 → `ComponentProps<typeof Checkbox.Group>`                | ✅   |
| #12 | SRadioGroup `HTMLAttributes<object> &` 污染 → `ComponentProps<typeof Radio.Group>`                   | ✅   |
| #13 | STable 泛型支持：`any` → `Record<string, unknown>` + 泛型函数组件                                    | ✅   |
| #14 | STable ellipsis 无 width bug 修复                                                                    | ✅   |
| #15 | STable `convertToText` 0 被当成空值修复                                                              | ✅   |
| #16 | STitle `hasBottomMargin` 默认 16→12px，字体 page 20→18 / table 16→14                                 | ✅   |
| #17 | useSearchTable 双重请求 bug：加 `isFirstLoad.current` guard                                          | ✅   |
| #18 | **useProTable** 新建：4 返回值（tableProps / search / reset / form），init effect `[]`，`ready` 支持 | ✅   |
| #19 | **SProTable** 新建：Props 扁平化，内部从 useSearchTable → useProTable                                | ✅   |

### ⏸️ 破坏性改动（待协调）

| #   | 改动                           | 风险 |
| --- | ------------------------------ | ---- |
| #4  | SSearchTable tableProps 覆盖链 | 🔴   |
| #5  | formConfig.onFinish → onSearch | 🔴   |
| #8  | STable RecordType 默认值收窄   | 🔴   |

### ⚠️ 无法修复（TS 限制）

| #   | 问题                                             | 原因                              |
| --- | ------------------------------------------------ | --------------------------------- |
| #1  | SForm `fieldProps` 的 `HTMLAttributes<object> &` | TS2590，22 组件联合类型复杂度上限 |

---

## 问题总览

| #   | 严重  | 组件           | 文件                                   | 问题                                                                             | 破坏性 |
| --- | ----- | -------------- | -------------------------------------- | -------------------------------------------------------------------------------- | ------ |
| 1   | 🔴 P0 | SForm          | `form/types.ts:115`                    | `HTMLAttributes<object> &` 污染所有 fieldProps，导致 onChange 等回调不可用       | 🟡 低  |
| 2   | 🔴 P0 | SForm          | `form/types.ts:109`                    | `Omit<FormItemProps, 'label \| name'>` 字面量写错，label/name 未真正排除         | 🟢 零  |
| 3   | 🔴 P0 | SForm          | `form-field/index.tsx:8`               | `[propName: string]: any` 让所有 fieldProps 类型检查形同虚设                     | 🟡 低  |
| 4   | 🟠 P1 | SSearchTable   | `search-table/index.tsx:44-49`         | `{...tableProps}` 与 `{...externalTableProps}` 的 dataSource 互相覆盖            | 🔴 高  |
| 5   | 🟠 P1 | SSearchTable   | `search-table/index.tsx:44`            | `{...formConfig}` 与 `{...formProps}` 的 onFinish 冲突，用户覆盖会导致表格不刷新 | 🔴 高  |
| 6   | 🟠 P1 | SDetail        | `detail/types.ts:67`                   | `SDetailItemType.render` 与 `DescriptionsItemType.render` 签名冲突               | 🟡 低  |
| 7   | 🟡 P2 | STable         | `table/types.ts:5` + `index.tsx:69-83` | `RenderType` 只有 3 个值，缺常用快捷类型                                         | 🟢 零  |
| 8   | 🟡 P2 | STable         | `table/types.ts:28/65`                 | `RecordType = any` 默认值导致列类型丢失字段补全                                  | 🔴 高  |
| 9   | 🟡 P2 | useSearchTable | `useSearchTable/index.ts:156`          | `...rest` 隐式返回 ahooks 方法，类型不可达                                       | 🟡 低  |

---

## 改造方案

---

### 1. 修复 `fieldProps` 的 onChange 类型报错

**问题**：`fieldProps` 类型为 `HTMLAttributes<object> & ComponentProps<FormFieldMapType[T]>`，`HTMLAttributes<object>` 包含 `onChange: ChangeEventHandler<HTMLObjectElement>`，与组件自身的 `onChange`（如 Select 的 `(value, option) => void`）交叉后产生不可满足的重载。

**根因文件**：`src/components/form/types.ts`

**当前代码**（约第 115 行）：

```typescript
fieldProps?: T extends keyof FormFieldMapType
    ? HTMLAttributes<object> & ComponentProps<FormFieldMapType[T]>
    : undefined;
```

**改为**：

```typescript
fieldProps?: T extends keyof FormFieldMapType
    ? ComponentProps<FormFieldMapType[T]>
    : undefined;
```

**影响**：`HTMLAttributes<object>` 里有一些没被 `ComponentProps` 覆盖的 HTML 原生属性（如 `dir`、`lang`、`tabIndex`）会丢失。这些属性在 SForm 的 fieldProps 里本来就是不合理的用法，删掉不会影响正常功能。

**关联清理**：`FormComPropsType` 类型也用了同样的模式，同步修改：

```typescript
// 改前
export type FormComPropsType = HTMLAttributes<object> &
  ComponentProps<FormFieldMapType[FormComType]>;

// 改后
export type FormComPropsType = ComponentProps<FormFieldMapType[FormComType]>;
```

---

### 2. 修复 `Omit` 字面量笔误

**问题**：`Omit<FormItemProps, 'label | name' | 'required'>` 中 `'label | name'` 是字面量字符串而非联合类型，导致 antd `FormItemProps` 的 `label` 和 `name` 未被正确排除，与 `ItemsProps` 自己的 `label`/`name` 定义冲突。

**根因文件**：`src/components/form/types.ts`

**当前代码**（约第 109 行）：

```typescript
export interface ItemsProps<T extends FormItemType = FormItemType>
  extends Omit<FormItemProps, 'label | name' | 'required'> {
```

**改为**：

```typescript
export interface ItemsProps<T extends FormItemType = FormItemType>
  extends Omit<FormItemProps, 'label' | 'name' | 'required'> {
```

---

### 3. 消除 `FormField` 的 index signature

**问题**：`FormFieldProps` 的 `[propName: string]: any` 使所有传递给 `FormField` 的 prop 失去类型检查，前面 `fieldProps` 的复杂条件类型推导形同虚设。

**根因文件**：`src/components/form/components/form-field/index.tsx`

**当前代码**（约第 8 行）：

```typescript
type FormFieldProps<T extends FormComType> = {
  type: T;
  [propName: string]: any;
};
```

**改为**：利用 `FormFieldMapType` 泛型推导具体组件的 props 类型，去掉 index signature：

```typescript
import { ComponentProps } from 'react';
import { FormComType, FormFieldMapType } from '../../types';

type FormFieldProps<T extends FormComType> = {
  type: T;
} & ComponentProps<FormFieldMapType[T]>;
```

**关联影响**：`FormField` 函数体内的 `...restProps` 会得到精确类型，需要确认 `FORM_ITEM_COM_MAP_BY_KEY` 返回的组件类型与泛型兼容。可能需要给 `FORM_ITEM_COM_MAP_BY_KEY` 补类型标注。

---

### 4. 解决 SSearchTable 的 `tableProps` 覆盖链

**问题**：`{...tableProps}`（来自 useSearchTable，含 dataSource/pagination/loading）和 `{...externalTableProps}`（用户传入）的 dataSource 互相覆盖。pagination 被手动合并但 dataSource 没有。

**根因文件**：`src/components/search-table/index.tsx`

**当前代码**（约第 44-49 行）：

```tsx
<STable
  size="small"
  {...tableProps}
  {...externalTableProps}
  pagination={{ ...pagination, ...externalTableProps?.pagination }}
/>
```

**改为**：明确优先级——useSearchTable 的数据源为权威，用户不应覆盖 dataSource：

```tsx
<STable
  size="small"
  {...tableProps}
  {...externalTableProps}
  dataSource={tableProps.dataSource}
  pagination={{ ...pagination, ...externalTableProps?.pagination }}
/>
```

同时给 `SearchTableProps.tableProps` 的类型从 `STableProps<any>` 排除 `dataSource`：

```typescript
// types.ts
tableProps?: Omit<STableProps<any>, 'dataSource' | 'pagination'>;
```

---

### 5. 解决 `formConfig` 与 `formProps` 的 onFinish 冲突

**问题**：`{...formConfig}`（含 `onFinish: getPageData`）和 `{...formProps}` 展开到 SForm.Search，如果用户在 `formProps` 里写了 `onFinish`，会覆盖掉默认的搜索刷新行为。

**根因文件**：

- `src/hooks/useSearchTable/index.ts`
- `src/hooks/useSearchTable/types.ts`
- `src/components/search-table/index.tsx`

**改法**：将 `formConfig` 里的 `onFinish` 和 `onReset` 改名，避免与 antd Form 的 prop 命名空间冲突。

`useSearchTable/index.ts`：

```typescript
// 改前
const formConfig = useMemo(
  () => ({
    onFinish: getPageData,
    onReset: handleReset,
  }),
  [getPageData, handleReset],
);

// 改后
const formConfig = useMemo(
  () => ({
    onSearch: getPageData,
    onFormReset: handleReset,
  }),
  [getPageData, handleReset],
);
```

`useSearchTable/types.ts`：

```typescript
// 改前
formConfig: {
  onFinish: (params?: any) => void;
  onReset: () => void;
};

// 改后
formConfig: {
  onSearch: (params?: any) => void;
  onFormReset: () => void;
};
```

`search-table/index.tsx`：

```tsx
// 改前
<SForm.Search form={form} {...formConfig} {...formProps} />

// 改后
<SForm.Search
  form={form}
  onFinish={formConfig.onSearch}
  onReset={formConfig.onFormReset}
  {...formProps}
/>
```

> ⚠️ **破坏性变更**：所有手写 useSearchTable 并且使用 `{...formConfig}` 的页面需要同步改为显式绑定 `onFinish={formConfig.onSearch}`。AI code generation 中的模板也需要同步更新。

---

### 6. 修复 SDetail `render` 签名冲突

**问题**：`SDetailItem = SDetailItemType & DescriptionsItemType`，两个类型都有 `render` 但签名不同：

- `SDetailItemType.render: (value?: any, dataSource?: any) => ReactNode`
- `DescriptionsItemType.render: (value: any, record: any, index: number) => ReactNode`

**根因文件**：`src/components/detail/types.ts`

**当前代码**（约第 67 行）：

```typescript
export type SDetailItem = SDetailItemType &
  Omit<DescriptionsItemType, 'children' | 'key'>;
```

**改为**：也排除 antd 的 `render`：

```typescript
export type SDetailItem = SDetailItemType &
  Omit<DescriptionsItemType, 'children' | 'key' | 'render'>;
```

确认 `SDetailItemType` 已包含完整的 render 定义即可。

---

### 7. 扩展 `RenderType` 快捷值

**问题**：`RenderType` 只有 `'datetime' | 'date' | 'ellipsis'`，常用序号列 render 无法用快捷值。

**根因文件**：

- `src/components/table/types.ts:5`
- `src/components/table/index.tsx:69-83`

**types.ts 改为**：

```typescript
const RenderTypes = tuple('datetime', 'date', 'ellipsis', 'index');
```

**index.tsx `getColumnsNew` 加处理分支**：

```typescript
if (newCol.render === 'index') {
  newCol.render = (_: any, __: any, index: number) => index + 1;
}
```

> 注意：`isSeq` 已提供序号列能力，`'index'` 快捷值用于手动序号列场景（如需要在非第一列显示序号）。

---

### 8. 收窄 `RecordType = any` 默认值（最后执行）

**问题**：`SColumn<RecordType = any>`、`STableProps<RecordType = any>` 的默认 `any` 导致 `dataIndex` 失去实体字段补全。

**根因文件**：`src/components/table/types.ts`

**改为**：

```typescript
export interface SColumn<RecordType = Record<string, unknown>>
  extends Omit<ColumnType<RecordType>, 'render'> { ... }

export interface STableProps<RecordType = Record<string, unknown>>
  extends Omit<TableProps<RecordType>, 'columns'> { ... }
```

> ⚠️ **破坏性变更**：已有代码中未显式传泛型的 STable/SColumn 会产生类型窄化——`dataIndex` 允许任何字符串的宽松行为变为只接受 `keyof Record<string, unknown>`（仍然是 string）。实际影响需要跑一次全量 `tsc` 确认。如影响过大，可以考虑先用 `string` 而非 `Record<string, unknown>` 过渡。

---

### 9. 显式声明 useSearchTable 的 `rest` 返回值

**问题**：`...rest` 来自 ahooks `useRequest` 的 `refresh`/`mutate`/`cancel`，未在返回类型中声明，只能通过 `as` 绕过。

**根因文件**：`src/hooks/useSearchTable/index.ts:156` + `src/hooks/useSearchTable/types.ts`

**types.ts 加**：

```typescript
export interface useSearchTableReturnType {
  // ...现有字段...
  /** ahooks useRequest 透传：手动刷新 */
  refresh: () => void;
  /** ahooks useRequest 透传：修改本地数据 */
  mutate: (data: any) => void;
  /** ahooks useRequest 透传：取消请求 */
  cancel: () => void;
}
```

`index.ts` 改为显式解构：

```typescript
const {
  run: getListData,
  data: resultData = {} as any,
  loading,
  error,
  refresh,
  mutate,
  cancel,
} = useRequest(wrappedRequestFn, { ... });

return {
  // ...现有字段...
  refresh,
  mutate,
  cancel,
};
```

---

## 改造优先级与执行顺序

```
Phase 1（零破坏 / 低破坏，先修 AI 痛点）
├── #2  Omit 笔误         🟢 零破坏
├── #7  RenderType 扩展   🟢 零破坏
├── #1  HTMLAttributes 删除 🟡 低破坏
├── #3  FormField index   🟡 低破坏
├── #6  SDetail render 冲突 🟡 低破坏
└── #9  rest 显式声明      🟡 低破坏

Phase 2（破坏性，需协调上下游）
├── #4  tableProps 覆盖链  🔴 高破坏
└── #5  formConfig 改名    🔴 高破坏

Phase 3（最大破坏，放最后）
└── #8  RecordType 收窄    🔴 高破坏
```

---

## 验证方式

每个 Phase 完成后执行：

```bash
# 在 sdesign 仓库
pnpm build

# 在业务项目（aI-admin-pro）
pnpm verify
```

Phase 2 完成后需要额外检查所有用了 `useSearchTable` 的页面。

---

## 对 AI 代码生成的影响预估

| 改动                   | 对弱模型的收益 | 说明                                    |
| ---------------------- | -------------- | --------------------------------------- |
| #1 HTMLAttributes 删除 | ⭐⭐⭐⭐⭐     | 消除 90% 的 SForm fieldProps 类型报错   |
| #2 Omit 笔误           | ⭐⭐⭐         | 消除 label/name 的类型冲突              |
| #3 FormField index     | ⭐⭐⭐         | 让类型检查真正生效，阻止无效 prop       |
| #4 tableProps 覆盖     | ⭐⭐           | 消除静默覆盖的隐患                      |
| #5 formConfig 改名     | ⭐⭐⭐         | 消除命名空间冲突，AI 不用纠结覆盖链     |
| #6 render 签名         | ⭐⭐           | 消除 SDetail render 的类型歧义          |
| #7 RenderType          | ⭐⭐           | 减少序号列的手写 render                 |
| #8 RecordType          | ⭐⭐⭐⭐       | dataIndex 获得字段补全，AI 不乱写字段名 |
| #9 rest 显式           | ⭐             | 消除 "any 绕过" 的坏示范                |
