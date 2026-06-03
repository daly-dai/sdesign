# SSelect — 增强选择器

## 使用边界

**适用场景:**

- 下拉选择，选项较多不适合全部展示
- 需要搜索、远程加载选项
  **不适用:**
- 选项 <= 5 个且需全部可见，使用 SRadioGroup（单选）或 SCheckGroup（多选）
- 层级选项，应使用 SCascader
- SForm items 中使用时通过 type: 'select' 引用，无需直接使用 SSelect

## 继承关系

继承自 **antd Select** 的全部属性。

其他 antd Select 属性均可直接使用。

## 类型定义

**SSelectProps** extends SelectProps (继承自 antd Select) — SSelect 增强选择器 Props

- dictKey?: string — 字典映射 key，从 SConfigProvider 全局字典中读取
- dict?: Record<string, string> — 字典数据，优先级高于 dictKey
- disableKeys?: string | string[] — 禁用指定选项的 key

## 使用示例

```tsx
import { SSelect } from '@dalydb/sdesign';
import React from 'react';

const dict = { active: '活跃', inactive: '未激活' };

export default () => (
  <div>
    <SSelect dict={dict} placeholder="基础选择" style={{ width: 200 }} />
    <br />
    <SSelect
      dict={dict}
      mode="multiple"
      placeholder="多选"
      style={{ width: 200, marginTop: 16 }}
    />
  </div>
);
```
