# SCascader — 增强级联选择器

## 使用边界

**适用场景:**

- 层级数据选择（如省市区、组织架构）
- onChange 需要直接返回字符串值而非数组
  **不适用:**
- 扁平选项列表（无层级关系），应使用 SSelect
- 需要多选级联，当前仅支持单选

## 继承关系

继承自 **antd Cascader** 的全部属性，以下属性已被覆盖：onChange, value, defaultValue, multiple

其他 antd Cascader 属性均可直接使用。

## 类型定义

**SCascaderProps** extends Omit<
CascaderProps<any>,
'onChange' | 'value' | 'defaultValue' | 'multiple'

> (继承自 antd Cascader，覆盖: onChange, value, defaultValue, multiple) — SCascader 增强级联选择器 Props

- onChange?: (value: string, selectOptions?: any[]) => void — onChange 直接返回字符串值
- value?: string | null | ValueType
- options?: any[]
- defaultValue?: string | ValueType
- multiple?: boolean

**SingleValueType**: `(string | number)[]`

**ValueType**: `SingleValueType | SingleValueType[] | undefined`

## 使用示例

```tsx
import React from 'react';

import { SCascader } from '@dalydb/sdesign';

const options = [
  {
    value: 'china',
    label: '中国',
    children: [
      { value: 'beijing', label: '北京' },
      { value: 'shanghai', label: '上海' },
    ],
  },
  {
    value: 'usa',
    label: '美国',
    children: [
      { value: 'ny', label: '纽约' },
      { value: 'la', label: '洛杉矶' },
    ],
  },
];

export default () => (
  <div>
    <SCascader
      options={options}
      placeholder="请选择地区"
      style={{ width: 200 }}
    />
    <br />
    <SCascader
      options={options}
      multiple
      showSearch
      placeholder="多选搜索"
      style={{ width: 200, marginTop: 16 }}
    />
  </div>
);
```
