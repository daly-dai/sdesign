# SCheckGroup — 复选框组

## 使用边界

**适用场景:**

- 多项选择场景
- 选项较少（<= 7 个）且需要全部可见
  **不适用:**
- 单选场景，应使用 SRadioGroup
- 选项很多（> 7 个），应使用 SSelect mode='multiple'

## 继承关系

继承自 **antd Checkbox.Group** 的全部属性，以下属性已被覆盖：onChange, value

其他 antd Checkbox.Group 属性均可直接使用。

## 类型定义

**SCheckGroupProps** extends Omit<CheckboxGroupType, 'onChange' | 'value'> (继承自 antd Checkbox.Group，覆盖: onChange, value) — SCheckGroup 复选框组 Props

- value?: CheckboxValueType[] | undefined | string
- onChange?: (value: string | undefined) => void
- children?: ReactNode
- dictKey?: string — 字典映射 key，从 SConfigProvider 全局字典中读取
- dict?: Record<string, string> — 字典数据，优先级高于 dictKey
- disableKeys?: string | string[] — 禁用指定选项的 key

**CheckboxGroupType**: `HTMLAttributes<object> & Omit<ComponentProps<typeof Checkbox.Group>, 'onChange' | 'value'>`

**CheckboxValueType**: `any`

## 使用示例

```tsx
import { Typography } from 'antd';
import React from 'react';

import { SCheckGroup } from '@dalydb/sdesign';

const dict = {
  frontend: '前端',
  backend: '后端',
  fullstack: '全栈',
  devops: '运维',
};

export default () => (
  <div>
    <SCheckGroup dict={dict} defaultValue={['frontend']} />
    <br />
    <Typography.Text type="secondary">禁用选项：</Typography.Text>
    <br />
    <SCheckGroup
      dict={dict}
      disableKeys={['devops']}
      defaultValue={['frontend', 'backend']}
    />
  </div>
);
```
