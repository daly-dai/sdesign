# SSelect — 增强选择器

## 使用边界

**适用场景:**

- 下拉选择，选项较多不适合全部展示
- 需要搜索、远程加载选项
  **不适用:**
- 选项 <= 5 个且需全部可见，使用 SRadioGroup（单选）或 SCheckGroup（多选）
- 层级选项，应使用 SCascader
- SForm items 中使用时通过 type: 'select' 引用，无需直接使用 SSelect

## 类型定义

**SSelectProps**: `SelectType & ExtraComType`

**SelectType**: `HTMLAttributes<object> & ComponentProps<typeof Select>`
