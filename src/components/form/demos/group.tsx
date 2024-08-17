/**
 * title: group 基础使用
 * background: rgba(42, 46, 54, 0.04)
 */
import { Button, Form, Space } from 'antd';
import React from 'react';

import { GroupItemsType, SCard, SForm } from '@daly/sdesign';

export default () => {
  const [form] = Form.useForm();

  const groupItems: GroupItemsType[] = [
    {
      title: '基础信息',
      columns: 2,
      items: [
        {
          type: 'input',
          label: '用户名称',
          name: 'userName',
          required: true,
        },
        {
          type: 'input',
          label: '用户电话',
          name: 'userPhone',
          required: '请输入用户电话',
        },
        {
          type: 'input',
          label: '用户信息',
          name: 'userMsg11',
          required: '请输入用户信息',
        },
      ],
    },
    {
      title: '详细信息',
      items: [
        {
          type: 'textarea',
          label: '户籍地址',
          name: 'address',
        },
        {
          type: 'textarea',
          label: '现居地址',
          name: 'currentAddress',
        },
      ],
    },
  ];

  const handleFinish = () => {
    const formData = form.getFieldsValue();
    console.log(formData, 'formData ');
  };

  return (
    <>
      <SForm.Group name="group" form={form} groupItems={groupItems} />
      <SCard>
        <Space style={{ margin: ' 0 auto' }}>
          <Button type="primary" onClick={handleFinish}>
            提交
          </Button>
          <Button>重置</Button>
        </Space>
      </SCard>
    </>
  );
};
