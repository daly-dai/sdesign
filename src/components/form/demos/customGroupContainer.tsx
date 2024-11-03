/**
 * title: group每一项可自定义外部容器,与title
 * background: rgba(42, 46, 54, 0.04)
 */
import { Button, Form, Space } from 'antd';
import React from 'react';

import { GroupItemsType, SCard, SForm } from '@dalydb/sdesign';

const CustomContainer = ({ children }: any) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        background: '#999',
      }}
    >
      {children}
    </div>
  );
};

export default () => {
  const [form] = Form.useForm();

  const groupItems: GroupItemsType[] = [
    {
      title: '基础信息',
      columns: 2,
      container: CustomContainer as any,
      items: [
        {
          type: 'input',
          label: '用户名称',
          name: 'userName',
          required: '请输入用户名称',
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
          name: 'userMsg',
          required: '请输入用户电话',
        },
      ],
    },
    {
      title: '详细信息',
      items: [
        {
          type: 'textarea',
          label: '户籍地址',
          name: 'address1',
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
      <SForm.Group name="groupForm" form={form} groupItems={groupItems} />
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
