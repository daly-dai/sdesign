import type { SFormItems } from '@dalydb/sdesign';
import { SForm } from '@dalydb/sdesign';
import { Input, message } from 'antd';
import React from 'react';

const items: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input', required: true },
  {
    label: '性别',
    name: 'gender',
    type: 'select',
    fieldProps: {
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
  },
  { label: '年龄', name: 'age', type: 'inputNumber' },
  { label: '日期', name: 'date', type: 'datePicker' },
  { label: '备注', name: 'remark', type: 'textarea' },
  {
    type: 'dependency',
    depNames: ['gender'],
    render: (v: Record<string, unknown>) =>
      v.gender === 'female' ? <Input placeholder="女士专属字段" /> : null,
  },
];

export default () => (
  <SForm
    columns={2}
    items={items}
    onFinish={(v) => message.success(JSON.stringify(v))}
  />
);
