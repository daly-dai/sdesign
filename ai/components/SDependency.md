# SDependency — 字段依赖联动组件

## 使用边界

**适用场景:**

- SForm 内表单字段依赖联动
- 某个字段的显示/值/选项依赖其他字段的变化
  **不适用:**
- 独立使用，必须在 SForm 的 items 中通过 type: 'dependency' 使用
- 简单的字段监听，使用 SForm.useWatch 即可

## 类型定义

**RenderChildren**: `( values: Record<string, any>, form: ProFormInstance<Values>, ) => React.ReactNode; export type SDependencyProps<T = Record<string, any>> = Omit<`

## 使用示例

```tsx
import { Form, Input, message } from 'antd';
import React from 'react';

import { SForm } from '@dalydb/sdesign';
import type { SFormItems } from '@dalydb/sdesign';

const items: SFormItems[] = [
  {
    label: '类型',
    name: 'type',
    type: 'select',
    fieldProps: {
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ],
    },
  },
  {
    type: 'dependency',
    depNames: ['type'],
    render: (v: any) =>
      v.type === 'a' ? (
        <Form.Item name="sub" label="子项">
          <Input />
        </Form.Item>
      ) : null,
  },
];

export default () => (
  <SForm items={items} onFinish={(v) => message.success(JSON.stringify(v))} />
);
```
