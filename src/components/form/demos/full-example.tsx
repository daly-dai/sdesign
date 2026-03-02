/**
 * title: 完整示例
 * description: 展示表单的完整使用场景，包含多种控件类型和功能
 */
import { Button, Divider, Form, message, Space } from 'antd';
import React, { useState } from 'react';

import { SCard, SForm, SFormItems } from '@dalydb/sdesign';

const genderOptions = { male: '男', female: '女' };
const educationOptions = {
  high_school: '高中',
  bachelor: '本科',
  master: '硕士',
  doctor: '博士',
};
const skillOptions = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  vue: 'Vue',
  nodejs: 'Node.js',
};

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '姓名',
      name: 'name',
      required: '请输入姓名',
      fieldProps: {
        placeholder: '请输入姓名',
        maxLength: 20,
        showCount: true,
      },
    },
    {
      type: 'radioGroup',
      label: '性别',
      name: 'gender',
      required: true,
      fieldProps: {
        dict: genderOptions,
      },
    },
    {
      type: 'SDatePicker',
      label: '出生日期',
      name: 'birthday',
      required: '请选择出生日期',
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
      type: 'select',
      label: '学历',
      name: 'education',
      required: '请选择学历',
      fieldProps: {
        dict: educationOptions,
        placeholder: '请选择学历',
      },
    },
    {
      type: 'inputNumber',
      label: '工作年限',
      name: 'workYears',
      fieldProps: {
        min: 0,
        max: 50,
        style: { width: '100%' },
        placeholder: '请输入工作年限',
      },
    },
    {
      type: 'slider',
      label: '期望薪资 (万/年)',
      name: 'salary',
      fieldProps: {
        min: 0,
        max: 100,
        marks: {
          0: '0',
          25: '25',
          50: '50',
          75: '75',
          100: '100+',
        },
      },
    },
    {
      type: 'checkGroup',
      label: '技能',
      name: 'skills',
      fieldProps: {
        dict: skillOptions,
      },
      colProps: { span: 24 },
    },
    {
      type: 'switch',
      label: '接受远程工作',
      name: 'remoteWork',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
    },
    {
      type: 'textarea',
      label: '自我介绍',
      name: 'introduction',
      colProps: { span: 24 },
      fieldProps: {
        placeholder: '请简单介绍一下自己',
        autoSize: { minRows: 3, maxRows: 6 },
        maxLength: 500,
        showCount: true,
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log('表单数据:', values);

      // 模拟提交
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      message.success('提交成功');
    } catch (error) {
      console.log('校验失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('表单已重置');
  };

  // 模拟回填数据
  const handleFillData = () => {
    form.setFieldsValue({
      name: '张三',
      gender: 'male',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      education: 'bachelor',
      workYears: 5,
      salary: 30,
      skills: ['javascript', 'react', 'typescript'],
      remoteWork: true,
      introduction: '5年前端开发经验，熟悉 React 技术栈。',
    });
    message.info('数据已回填');
  };

  return (
    <SCard title="人才信息登记表">
      <SForm name="fullExample" items={items} columns={3} form={form} />

      <Divider />

      <Space>
        <Button onClick={handleFillData}>填充示例数据</Button>
        <Button onClick={handleReset}>重置</Button>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          提交
        </Button>
      </Space>
    </SCard>
  );
};
