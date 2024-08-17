import { Form } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@daly/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      label: '查询',
      name: 'key',
      type: 'input',
      regKey: 'phone',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      label: '查询',
      name: 'key1',
      type: 'select',
      fieldProps: {
        dict: dictData,
      },
    },
  ];

  return (
    <>
      <h3>表单校验</h3>
      <SForm name="regForm" form={form} items={items}></SForm>
    </>
  );
};
