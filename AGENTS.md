# @dalydb/sdesign 组件库 AGENTS.md

> AI 进入本组件库开发的入口。详细规约见 `conventions/` 目录。

## 组件架构

所有组件基于 antd 二次封装，遵循统一模式：

```
antd 组件 → S 前缀包裹 → 增强功能（dictKey / trim / onChange 简化 / actionType 预设）
```

## 类型模式（⛔ 必须遵守）

### 1. 用 Omit + extends，不用 HTMLAttributes<object> &

```typescript
// ✅ 正确
interface SSelectProps extends SelectProps {
  dictKey?: string;
}

// ❌ 错误——会触发 onChange / onFocus / onBlur 与 antd 同名属性交叉
type SelectType = HTMLAttributes<object> & ComponentProps<typeof Select>;
```

**已修复**：SSelect、SCheckGroup、SRadioGroup 的 `HTMLAttributes<object> &` 已清除。
**例外**：SForm 的 `fieldProps` 因 22 组件联合触发 TS2590 编译器限制，暂无法移除。

### 2. 自定义 onChange 时用 Omit 排除原 onChange

```typescript
// ✅ 正确
interface SInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}
```

### 3. 组件用泛型函数，不用 FC

```typescript
// ✅ 正确——RecordType 可推导
function STable<RecordType = Record<string, unknown>>(props: STableProps<RecordType>) { ... }

// ❌ 错误——RecordType 锁死在 any
const STable: FC<STableProps> = (props) => { ... }
```

## 新增组件 checklist

| 步骤                       | 文件                            |
| -------------------------- | ------------------------------- |
| 1. types.ts                | 定义 Props + Ref 类型           |
| 2. index.tsx               | 组件实现（`forwardRef + memo`） |
| 3. index.md                | dumi 文档页                     |
| 4. metadata.json           | AI 使用场景元数据               |
| 5. demos/                  | 至少 1 个 demo                  |
| 6. ai/components/{Name}.md | AI 消费文档                     |
| 7. src/components/index.ts | 注册导出                        |

## 已知限制

- **SForm fieldProps TS2590**：`FormFieldMapType` 的 22 组件联合类型在 `.d.ts` 生成时超出 TS 复杂度上限。`HTMLAttributes<object>` 无法移除。修法需要重构 `FormFieldMapType` 为非联合结构。
- **useSearchTable 接口碎片化**：`formConfig` / 重复导出的 `dataSource` / `pagination` / `loading` 是历史负债，不修以免破坏 SSearchTable。新增代码用 `useProTable`。
