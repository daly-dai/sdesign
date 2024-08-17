/**
 * title: dict 属性
 * description: 根据dict自动生成options
 */
import { Button, Form, Typography } from 'antd';
import React, { useState } from 'react';

import { SCheckGroup } from '@daly/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

const dictData1 = {
  app_link: '存量应用关联',
  register: '发布注册',
};

export default () => {
  const [form] = Form.useForm();
  const [checkGroup, setCheckGroup] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  const handleFinish = (values: any) => {
    setFormData(values);
  };

  return (
    <>
      <h3>默认使用</h3>
      <SCheckGroup
        value={checkGroup}
        onChange={setCheckGroup}
        dict={dictData}
      ></SCheckGroup>
      <Typography>
        <p>多选框组值为</p>
        <pre>{JSON.stringify(checkGroup, null, 2)}</pre>
      </Typography>
      <h3>form表单中使用</h3>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="选择安全等级" name="test">
          <SCheckGroup dict={dictData}></SCheckGroup>
        </Form.Item>
        <Form.Item label="选择应用类型" name="test1">
          <SCheckGroup dict={dictData1}></SCheckGroup>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <Typography>
        <p>form表单值为</p>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Typography>

      <h3>外部传入的 options 优先级比dict 生成的 options 优先级更高</h3>
      <SCheckGroup
        dict={dictData}
        options={[
          {
            label: 'ee',
            value: 'ww',
          },
          {
            label: '3e',
            value: '3w',
          },
        ]}
      ></SCheckGroup>
    </>
  );
};
