# SDesign 类型设计规约

> 本轮审计发现的所有类型问题及正确模式。

## 原则

1. **组件 Props 从 antd 原生类型派生，不凭空定义**
2. **自定义事件处理函数用 Omit 排除原定义，不交叉**
3. **不在 Props 上追加 `HTMLAttributes<object>` 或任何 HTML 通用类型**
4. **`any` 默认值优先级：`Record<string, unknown>` > 删掉默认值 > 保留 `any`**

---

## 模式 1：简单包裹（SButton / SCard）

```typescript
// ✅ SButton：直接 extends
interface SButtonProps extends ButtonProps {
  actionType?: SButtonActionType;
}

// ✅ SCard：Omit children 后扩展
interface SCardProps extends Omit<CardProps, 'children'> {
  children?: ReactNode;
}
```

## 模式 2：自定义 onChange（SInput / SDatePicker / SCascader）

```typescript
// ✅ 用 Omit 排除 antd 的 onChange，自己重定义
interface SInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void; // 直接返回 string，非 event
}

interface SDatePickerProps extends Omit<DatePickerProps, 'onChange' | 'value'> {
  onChange?: (dateString?: string) => void;
  value?: string | string[] | null | Date | Dayjs;
}
```

## 模式 3：字典增强（SSelect / SCheckGroup / SRadioGroup）

```typescript
// ✅ 直接 extends antd SelectProps，不加 HTMLAttributes
interface SSelectProps extends SelectProps {
  dictKey?: string;
  dict?: Record<string, string>;
  disableKeys?: string | string[];
}
```

**已修复**：这三个组件原来都用了 `HTMLAttributes<object> & ComponentProps<typeof XXX>`，导致 onChange 签名交叉。现已全部改为直接 extends antd Props。

## 模式 4：泛型组件（STable）

```typescript
// ✅ 泛型函数组件，RecordType 可从 columns/dataSource 推导
function STable<RecordType = Record<string, unknown>>(
  props: STableProps<RecordType>,
) { ... }

// 泛型 forwardRef + memo 的标准写法
const STable = memo(forwardRef(STableInner)) as <RecordType>(
  props: STableProps<RecordType> & { ref?: React.Ref<...> },
) => React.ReactElement;
```

## 模式 5：一体化组件 Props 不暴露内部状态（SProTable）

```typescript
// ✅ 不暴露 onFinish / dataSource / loading
interface SProTableProps<RecordType> {
  requestFn: ...;
  searchItems?: SFormItems[];  // 取代 formProps
  columns?: SColumnsType<RecordType>;  // 取代 tableProps.columns
  rowKey?: ...;  // 取代 tableProps.rowKey
  // 内部使用 useProTable，用户碰不到 form 生命周期
}

// ❌ SSearchTable 的问题：formProps / tableProps 暴露了 onFinish / dataSource
// 用户可通过 formProps.onFinish 覆盖内部 getPageData
```

## 模式 6：Hook 接口最小化（useProTable）

```typescript
// ✅ 4 个返回值，无中间对象，无重复导出
interface UseProTableReturn {
  tableProps: { dataSource; pagination; loading }; // 聚合，不散落
  search: () => void;
  reset: () => void;
  form: FormInstance;
}

// ❌ useSearchTable 的问题：11 个返回值，含 formConfig 中间对象
// dataSource/pagination/loading 同时在顶层和 tableProps 里
```

## TS2590 陷阱

SForm 的 `fieldProps` 类型需要表达 22 种不同组件的 Props。用联合类型时 TS 编译器在生成 `.d.ts` 时触发复杂度上限（TS2590）。

**当前状态**：`fieldProps` 的 `HTMLAttributes<object> &` 无法移除。其他 21 个组件不受影响。

**可能的解法**（待验证）：

1. 将 `FormFieldMapType` 从联合改为映射 + 类型分发
2. 限制 `ItemsProps` 的泛型默认值，让宽化时不展开联合
