# SCascader — 增强级联选择器

## 使用边界

**适用场景:**

- 层级数据选择（如省市区、组织架构）
- onChange 需要直接返回字符串值而非数组
  **不适用:**
- 扁平选项列表（无层级关系），应使用 SSelect
- 需要多选级联，当前仅支持单选

## 类型定义

**SCascaderProps**: `Omit< CascaderProps<any>, 'onChange' | 'value' | 'defaultValue' | 'multiple' > & { onChange?: (value: string, selectOptions?: any[]) => void`

**SingleValueType**: `(string | number)[]`

**ValueType**: `SingleValueType | SingleValueType[] | undefined`
