/**
 * title: SForm.Item组件
 * description: 可在SForm与antd Form中使用,也可以自定义子组件
 */

import { Button, Flex, Form, Input } from 'antd';
import React from 'react';

import { SForm } from '@dalydb/sdesign';

export default () => {
  const [techForm] = Form.useForm();
  const [form] = Form.useForm();

  const handleFormFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Flex justify="space-around" flex={1}>
      <div>
        <h3>在antd中的form使用</h3>
        <Form name="formItem1" form={form} onFinish={handleFormFinish}>
          <SForm.Item
            name="name"
            label="姓名"
            type="input"
            required
          ></SForm.Item>

          <SForm.Item
            name="password"
            label="密码"
            type="password"
            required
          ></SForm.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </div>
      <div>
        <h3>在SForm中使用</h3>
        <SForm name="formItem2" onFinish={handleFormFinish} form={techForm}>
          <SForm.Item
            name="name"
            label="姓名"
            type="input"
            required
          ></SForm.Item>

          <SForm.Item label="自定义子组件，用于复杂组件">
            <Input></Input>
          </SForm.Item>

          <SForm.Item
            name="password"
            label="密码"
            type="password"
            required
          ></SForm.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </SForm>
      </div>
    </Flex>
  );
};
