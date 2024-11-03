/**
 * title: 在表单中使用
 */
import { Button, Form } from 'antd';
import React, { useState } from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

export default () => {
  const [formData, setFormData] = useState({} as any);
  const [form] = Form.useForm();
  const formItems: SFormItems[] = [
    {
      type: 'SDatePicker',
      label: '格式化日期选择',
      name: 'date',
    },
    {
      type: 'SDatePicker',
      label: '日期多选',
      name: 'multipleDate',
      fieldProps: {
        multiple: true,
      },
    },
    {
      type: 'SDatePicker',
      label: '格式化日期选择',
      name: 'formateDate',
      fieldProps: {
        format: 'YYYY/MM/DD',
      },
    },
  ];

  const handleFinish = () => {
    const data = form.getFieldsValue();

    setFormData(data);
  };
  return (
    <>
      <SForm items={formItems} form={form}></SForm>

      <Button type="primary" onClick={handleFinish}>
        提交
      </Button>

      <h4>form获取的值为</h4>
      {Object.keys(formData).map((key) => {
        return (
          <div key={key}>
            {key}: {JSON.stringify(formData[key])}
          </div>
        );
      })}
    </>
  );
};
