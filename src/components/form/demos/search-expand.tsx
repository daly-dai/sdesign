/**
 * title: 多行搜索与展开收起
 * description: 通过 maxRows 控制收起时显示的行数，showExpand 开启展开收起功能。默认 maxRows=1 收起为单行，设为 2 可收起展示两行。
 */

import { Form, message } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const items: SFormItems[] = [
    { type: 'input', label: '名称', name: 'name' },
    {
      type: 'select',
      label: '敏感等级',
      name: 'level',
      fieldProps: { dict: dictData, allowClear: true },
    },
    { type: 'input', label: '编码', name: 'code' },
    { type: 'input', label: '负责人', name: 'owner' },
    {
      type: 'select',
      label: '状态',
      name: 'status',
      fieldProps: { dict: { 1: '启用', 0: '禁用' }, allowClear: true },
    },
    { type: 'input', label: '部门', name: 'dept' },
    { type: 'datePicker', label: '创建日期', name: 'createDate' },
  ];

  const handleFinish = (values: any) => {
    message.success('查询参数: ' + JSON.stringify(values));
  };

  return (
    <>
      <h4>maxRows=1（默认，收起显示1行）</h4>
      <SForm.Search
        form={form1}
        columns={4}
        items={items}
        showExpand
        onFinish={handleFinish}
      />

      <h4>maxRows=2（收起显示2行）</h4>
      <SForm.Search
        form={form2}
        columns={4}
        items={items}
        showExpand
        maxRows={2}
        onFinish={handleFinish}
      />
    </>
  );
};
