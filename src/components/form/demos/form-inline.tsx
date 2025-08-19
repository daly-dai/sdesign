/**
 * title: layout inline
 * description:
 */
import { Button, Form, Space } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
};

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '用户名称',
      name: 'userName',
      required: '请输入用户名称',
    },
    {
      type: 'select',
      label: '下拉选择框',
      name: 'dictSelect',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      label: 'S时间',
      type: 'SDatePicker',
      name: 'SDatePicker',
    },
    {
      label: 'S时间范围',
      type: 'SDatePickerRange',
      name: 'SDatePickerRange',
    },
    {
      label: '时间',
      type: 'datePicker',
      name: 'datePicker',
      required: true,
    },
    {
      label: '时间范围',
      type: 'datePickerRange',
      name: 'datePickerRange',
    },
  ];

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    console.log(values);
  };

  const handleReset = () => {
    form.resetFields();
  };
  return (
    <>
      <SForm
        name="basicName"
        layout="inline"
        items={items}
        columns={2}
        form={form}
        labelCol={{ span: 5 }}
      ></SForm>
      <Space>
        <Button onClick={handleReset}>重置</Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Space>
    </>
  );
};
