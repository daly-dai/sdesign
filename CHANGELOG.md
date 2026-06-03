# Changelog

## v1.9.0

### 🆕 新增

- **SProTable**：新一代列表组件。`request={{ service, options }}` 收拢请求配置，Props 扁平化（searchItems / columns / rowKey 顶层）。不暴露内部生命周期（onFinish / dataSource / loading），从类型层面消除误覆盖风险。支持 RecordType 泛型、`ready` 依赖请求、`title`/`tableTitle` 双标题栏（各支持 `{ children, actionNode }`）。包含 8 个 demo 覆盖标准列表、字典回显、批量操作、数据转换、依赖请求等场景。
- **useProTable**：新 Hook，4 个返回值（tableProps / search / reset / form）。基于 useRequest，去掉 formConfig 中间层，init effect 用 `[]` 杜绝二次请求。支持 `ready` 声明式依赖等待。

### 🔧 修复

- **useSearchTable**：修复初始化双重请求 bug（`isFirstLoad.current` guard 未生效）
- **STable**：修复 `render: 'ellipsis'` 无 width 时字符串泄露到 antd 的 bug
- **STable**：修复 `convertToText` 把数值 `0` 当成空值显示为 `-` 的 bug
- **STable**：修复 `RenderType` 缺 `'index'` 快捷值
- **SForm**：修复 `Omit<FormItemProps, 'label | name'>` 字面量笔误（应为 `'label' | 'name'`）

### 🔄 类型改进

- **SSelect**：`SelectType` 删除 `HTMLAttributes<object> &` 污染，改为直接 extends `SelectProps`。消除 onChange 回调签名交叉报错
- **SCheckGroup**：同上，删除 `HTMLAttributes<object> &` 污染
- **SRadioGroup**：同上，删除 `HTMLAttributes<object> &` 污染
- **SDetail**：修复 `SDetailItemType.render` 和 `DescriptionsItemType.render` 签名冲突
- **STable**：`RecordType = any` → `Record<string, unknown>`，组件改为泛型函数，支持 RecordType 推导
- **useSearchTable**：`refresh`/`mutate`/`cancel` 从隐式 `...rest` 改为显式声明返回值

### 🎨 样式调整

- **STitle**：`hasBottomMargin` 默认值 16px → 12px，标题字体 page 20px → 18px、table/form 16px → 14px

### ⚠️ Deprecated

- **SConfirm**：标记 deprecated，新代码直接用 `Modal.confirm`

### ⏸️ 未改（破坏性改动待协调）

- SSearchTable 的 `tableProps` / `formProps` 覆盖链问题（REFACTOR_PLAN #4 #5）
- STable RecordType 默认值进一步收窄（REFACTOR_PLAN #8）
- SForm `fieldProps` 的 `HTMLAttributes<object> &` 因 TS2590 编译器限制无法移除（REFACTOR_PLAN #1）
