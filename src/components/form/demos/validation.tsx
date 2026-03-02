/**
 * title: 表单校验
 * description: 使用 regKey 预置校验规则，支持邮箱、手机号、身份证等常见校验
 */
import { Button, Form, Space } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      required: '请输入用户名',
      rules: [
        { min: 2, message: '用户名至少2个字符' },
        { max: 20, message: '用户名最多20个字符' },
      ],
    },
    {
      type: 'input',
      label: '手机号',
      name: 'phone',
      regKey: 'phone',
      required: '请输入手机号',
    },
    {
      type: 'input',
      label: '邮箱',
      name: 'email',
      regKey: 'email',
      required: '请输入邮箱',
    },
    {
      type: 'input',
      label: '身份证号',
      name: 'idCard',
      regKey: 'idCard',
    },
    {
      type: 'password',
      label: '密码',
      name: 'password',
      required: '请输入密码',
      rules: [
        { min: 6, message: '密码至少6个字符' },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
          message: '密码需包含大小写字母和数字',
        },
      ],
    },
    {
      type: 'password',
      label: '确认密码',
      name: 'confirmPassword',
      required: '请确认密码',
      dependencies: ['password'],
      rules: [
        ({ getFieldValue }: any) => ({
          validator(_: any, value: string) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次输入的密码不一致'));
          },
        }),
      ],
    },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('校验通过:', values);
    } catch (error) {
      console.log('校验失败:', error);
    }
  };

  return (
    <>
      <SForm name="validationForm" items={items} columns={2} form={form} />
      <Space>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Space>
    </>
  );
};
