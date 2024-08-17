/**
 * title: 分组表单的数据嵌套
 */
import { Button, Form, Typography } from 'antd';
import React, { useEffect } from 'react';

import { GroupItemsType, SForm } from '@daly/sdesign';

const { Paragraph } = Typography;

const dataSource = {
  userName: '张三',
  userPhone: '123456789',
  userMsg11: '张三',
  address: '北京市朝阳区',
  currentAddress: '北京市朝阳区',
};

const dataSource1 = {
  baseInfo: {
    userName: '张三',
    userPhone: '123456789',
    userMsg11: '张三',
  },
  baseInfo1: {
    address: '北京市朝阳区',
    currentAddress: '北京市朝阳区',
  },
};

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

const groupStepItems: GroupItemsType[] = [
  {
    title: '基础信息',
    columns: 2,
    formName: 'baseInfo',
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
    formName: 'baseInfo1',
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

export default () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ formData: dataSource });
    form1.setFieldsValue(dataSource1);
  }, []);

  return (
    <>
      <h3>整体formName为formData</h3>
      <SForm.Group formName="formData" groupItems={groupItems} form={form}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </SForm.Group>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
        <pre style={{ border: 'none' }}>
          {JSON.stringify({ formData: dataSource }, null, 2)}
        </pre>
      </Paragraph>
      <h3>多个formName组合</h3>
      <SForm.Group groupItems={groupStepItems} form={form1}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </SForm.Group>
      <Paragraph style={{ maxWidth: 440, marginTop: 24 }}>
        <pre style={{ border: 'none' }}>
          {JSON.stringify(dataSource1, null, 2)}
        </pre>
      </Paragraph>
    </>
  );
};
