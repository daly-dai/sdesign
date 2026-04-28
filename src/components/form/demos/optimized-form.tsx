/**
 * title: 优化后的SForm示例
 * description: 展示SForm优化后的性能和功能
 */

import { Button, Flex, Form } from 'antd';
import React from 'react';

import { SForm } from '@dalydb/sdesign';

export default () => {
  const [form] = Form.useForm();

  const formItems = [
    {
      type: 'input' as const,
      label: '用户名',
      name: 'username',
      required: true,
      fieldProps: {
        placeholder: '请输入用户名',
      },
    },
    {
      type: 'password' as const,
      label: '密码',
      name: 'password',
      required: true,
      fieldProps: {
        placeholder: '请输入密码',
      },
    },
    {
      type: 'select' as const,
      label: '角色',
      name: 'role',
      fieldProps: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '普通用户', value: 'user' },
        ],
        placeholder: '请选择角色',
      },
    },
  ];

  const handleFinish = (values: Record<string, unknown>) => {
    console.log('提交的值:', values);
  };

  return (
    <Flex justify="center" style={{ padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <SForm
          form={form}
          items={formItems}
          onFinish={handleFinish}
          initialValues={{
            username: 'test',
            role: 'admin',
          }}
        >
          <Flex gap={16} justify="flex-end">
            <Button htmlType="reset">重置</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Flex>
        </SForm>
      </div>
    </Flex>
  );
};
