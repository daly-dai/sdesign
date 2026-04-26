# SRadioGroup — 单选框组

## 使用边界

**适用场景:**

- 单选场景，选项较少（<= 5 个）且需要全部可见
- 按钮式单选或标准单选
  **不适用:**
- 多选场景，应使用 SCheckGroup
- 选项很多（> 5 个），应使用 SSelect
- SForm items 中使用时通过 type: 'radioGroup' 引用，无需直接使用

## 继承关系

继承自 **antd Radio.Group** 的全部属性。

其他 antd Radio.Group 属性均可直接使用。

## 类型定义

**SRadioGroupProps** extends RadioType (继承自 antd Radio.Group) — SRadioGroup 单选框组 Props

- dictKey?: string — 字典映射 key，从 SConfigProvider 全局字典中读取
- dict?: Record<string, string> — 字典数据，优先级高于 dictKey
- disableKeys?: string | string[] — 禁用指定选项的 key

**RadioType**: `HTMLAttributes<object> & ComponentProps<typeof Radio.Group>`
