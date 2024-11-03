import { Button, Form, Space } from 'antd';
import React, { useState } from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    setFormData(values);
  };

  const resetFormData = () => {
    form.resetFields();
    setFormData({ dateRangeKeys: [] });
  };

  const formItems: SFormItems[] = [
    {
      label: '日期范围',
      name: 'dateRange',
      type: 'SDatePickerRange',
    },
    {
      label: '日期选择rangeKeys',
      name: 'dateRangeKeys',
      type: 'SDatePickerRange',
      fieldProps: {
        rangeKeys: ['startTime', 'endTime'],
      },
    },
    {
      customCom: (
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={resetFormData}>重置数据</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SForm items={formItems} form={form}></SForm>
      <h4>form表单值：{JSON.stringify(formData)}</h4>
    </>
  );
};
