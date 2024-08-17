/**
 * title: dict 属性
 * description: 根据dict自动生成options
 */
import { Button, Form } from 'antd';
import React from 'react';

import { SSelect } from '@daly/sdesign';

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

  const handleFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <h3>默认使用</h3>
      <SSelect defaultOpen style={{ width: 120 }} dict={dictData}></SSelect>
      <h3>form表单中使用</h3>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="选择安全等级" name="test">
          <SSelect style={{ width: 120 }} dict={dictData}></SSelect>
        </Form.Item>
        <Form.Item label="选择应用类型" name="test1">
          <SSelect style={{ width: 120 }} dict={dictData1}></SSelect>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      <h3>外部传入的 options 优先级比dict 生成的 options 优先级更高</h3>
      <SSelect
        style={{ width: 120 }}
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
      ></SSelect>
    </>
  );
};
