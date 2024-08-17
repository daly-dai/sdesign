/**
 * title: formName 数据嵌套模式
 */

import { Button, Form, Typography } from 'antd';
import React, { useState } from 'react';

import { SForm, SFormItems } from '@daly/sdesign';

const { Paragraph } = Typography;

export default () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState({});

  const items: SFormItems[] = [
    {
      name: 'name',
      label: '姓名',
      type: 'input',
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      name: 'age',
      label: '年龄',
      type: 'input',
      rules: [{ required: true, message: '请输入年龄' }],
    },
  ];

  const handleChange = (values: any) => {
    console.log(values);

    setValue(values);
  };

  return (
    <>
      <SForm
        onFinish={handleChange}
        name="formName"
        formName="basicInfo"
        items={items}
        form={form}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </SForm>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
        <pre style={{ border: 'none' }}>{JSON.stringify(value, null, 2)}</pre>
      </Paragraph>
    </>
  );
};
