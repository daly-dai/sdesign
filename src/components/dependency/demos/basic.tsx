import { Form, Input, message } from 'antd';
import React from 'react';

import type { SFormItems } from '@dalydb/sdesign';
import { SForm } from '@dalydb/sdesign';

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
