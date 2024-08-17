/**
 * title: 拖拽上传
 * description: 初始状态
 */

import { Button, Form, Space } from 'antd';
import React from 'react';

import { SForm, SUpload } from '@daly/sdesign';

const DragUpload = () => {
  const [form] = Form.useForm();

  const getFormData = () => {
    const data = form.getFieldsValue();

    console.log(data, 'data');
  };

  const setFormData = () => {
    form.setFieldsValue({
      dragData: [
        {
          fileName: 'wallhaven-gpddld',
          fileUrl:
            '/szhz-dev-S/S-front/2023-10-11/wallhaven-gpddld1711986231625183232.jpg',
        },
        {
          fileName: 'wallhaven-7pllqo',
          fileUrl:
            '/szhz-dev-S/S-front/2023-10-11/wallhaven-7pllqo1711986241808953344.jpg',
        },
      ],
    });
  };

  return (
    <SForm form={form}>
      <SForm.Item name="name" label="用户名称" />

      <Form.Item name="dragData" label="附件上传">
        <SUpload.Dragger
          multiple
          maxCount={5}
          limit={15}
          limitSizeType="M"
        ></SUpload.Dragger>
      </Form.Item>

      <SForm.Item
        name="customDrag"
        label="自定义提示内容"
        type="SUploadDragger"
        fieldProps={{ multiple: true }}
      ></SForm.Item>
      <Form.Item>
        <Space align="end">
          <Button type="primary" onClick={getFormData}>
            查询
          </Button>
          <Button type="primary" onClick={setFormData}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </SForm>
  );
};

export default DragUpload;
