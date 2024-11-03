/**
 * title: 在form数据中存储上传文件
 */
import { Button, Form, Typography } from 'antd';
import React, { useState } from 'react';

import { SConfigProvider, SForm, SFormItems } from '@dalydb/sdesign';

const items: SFormItems[] = [
  {
    label: '上传多个组件',
    type: 'SUpload',
    name: 'uploadMu',
  },
  {
    label: '设置single字段',
    type: 'SUpload',
    name: 'singleUpload',
    fieldProps: {
      single: true,
    },
  },
];

export default () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const handleFinish = () => {
    const values = form.getFieldsValue();

    setFormData(values);
  };

  return (
    <SConfigProvider uploadUrl="/gateway/program/attachment/upload">
      <SForm form={form} items={items}></SForm>

      <Button type="primary" onClick={handleFinish}>
        提交
      </Button>
      <Typography style={{ maxWidth: 440, marginTop: 24 }}>
        <div>{JSON.stringify(formData, null, 2)}</div>
      </Typography>
    </SConfigProvider>
  );
};
