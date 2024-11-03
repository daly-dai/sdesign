/**
 * title: 图片上传
 * description: 在表单中使用
 */

import { Button, Form, Input, Space } from 'antd';
import React from 'react';

import { SConfigProvider, SForm, SUpload } from '@daly/sdesign';

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
      customPicture: {
        fileName:
          '0da4d8bdf921b75732bf20216ba944f23018952956b089e4d306fb399a1b894b备份@2x.png',
        fileUrl:
          '/ossfile/szhz-process-manage/js-program-dev/2024-05-23/58282093166592.png',
        irsId: 'upload-echo-kC5gv7zdeUP3',
        uploadTime: '2024-05-23 16:23:11',
      },
    });
  };

  return (
    <SConfigProvider uploadUrl="/gateway/program/attachment/upload">
      <SForm form={form}>
        <Form.Item name="name" label="用户名称">
          <Input placeholder="请输入名称" variant="borderless" />
        </Form.Item>
        <Form.Item name="dragData" label="附件上传">
          <SUpload.Picture maxCount={5} limit={15} limitSizeType="M" />
        </Form.Item>
        <SForm.Item
          label="单个上传图片"
          name="customPicture"
          type="SUploadPicture"
          fieldProps={{ single: true }}
        />

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
    </SConfigProvider>
  );
};

export default DragUpload;
