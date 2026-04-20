/**
 * title: 典型业务场景
 * description: label 长短不一时通过 labelWidth 统一宽度对齐；defaultExpand 默认全展开；extraButtons 在查询/重置旁添加业务按钮。
 */

import { Form, message } from 'antd';
import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const statusDict = { 0: '待审核', 1: '已通过', 2: '已驳回', 3: '已撤回' };
const levelDict = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};
const typeDict = {
  internal: '内部数据',
  external: '外部数据',
  shared: '共享数据',
};

export default () => {
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '名称',
      name: 'name',
      fieldProps: { allowClear: true },
    },
    {
      type: 'input',
      label: '数据资产编码',
      name: 'assetCode',
      fieldProps: { allowClear: true },
    },
    {
      type: 'select',
      label: '敏感等级',
      name: 'level',
      fieldProps: { dict: levelDict, allowClear: true },
    },
    {
      type: 'select',
      label: '数据源类型',
      name: 'sourceType',
      fieldProps: { dict: typeDict, allowClear: true },
    },
    {
      type: 'select',
      label: '审核状态',
      name: 'status',
      fieldProps: { dict: statusDict, allowClear: true },
    },
    {
      type: 'input',
      label: '责任部门',
      name: 'dept',
      fieldProps: { allowClear: true },
    },
    {
      type: 'input',
      label: '数据负责人',
      name: 'owner',
      fieldProps: { allowClear: true },
    },
    { type: 'SDatePickerRange', label: '创建时间', name: 'createTime' },
  ];

  const handleFinish = (values: any) => {
    message.success('查询参数: ' + JSON.stringify(values));
  };

  const handleReset = () => {
    form.resetFields();
    message.info('已重置');
  };

  return (
    <SForm.Search
      form={form}
      columns={4}
      items={items}
      labelWidth={90}
      defaultExpand
      showExpand
      extraButtons={[
        {
          actionType: 'export',
          onClick: () => message.info('导出数据'),
        },
        {
          actionType: 'create',
          type: 'primary',
          onClick: () => message.info('新增资产'),
        },
      ]}
      onFinish={handleFinish}
      onReset={handleReset}
    />
  );
};
