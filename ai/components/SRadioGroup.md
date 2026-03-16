# SRadioGroup — 单选框组

## 使用边界

**适用场景:**

- 单选场景，选项较少（<= 5 个）且需要全部可见
- 按钮式单选或标准单选
  **不适用:**
- 多选场景，应使用 SCheckGroup
- 选项很多（> 5 个），应使用 SSelect
- SForm items 中使用时通过 type: 'radioGroup' 引用，无需直接使用

## 类型定义

**SRadioGroupProps**: `RadioType & ExtraComType`

**RadioType**: `HTMLAttributes<object> &`
