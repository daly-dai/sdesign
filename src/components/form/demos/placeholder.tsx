/**
 * title: 占位配置
 * description: type 为 placeholder 渲染空节点进行占位
 */

import React from 'react';

import { SForm, SFormItems } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
};

export default () => {
  const items: SFormItems[] = [
    {
      type: 'input',
      label: '用户名称',
      name: 'userName',
      rules: [{ required: true, message: '请输入用户名称' }],
    },
    {
      type: 'select',
      label: '字典下拉选择框',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      type: 'placeholder',
    },
    {
      type: 'checkGroup',
      label: '字典多选框',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      type: 'radioGroup',
      label: '字典单选框',
      fieldProps: {
        dict: dictData,
      },
    },
  ];

  return <SForm name="form-placeholder" items={items} columns={3}></SForm>;
};
