/**
 * title: search组件
 * description: 以上的功能全部支持，并额外拓展了其他功能
 */

import { Form } from 'antd';
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
  const [form] = Form.useForm();

  const items: SFormItems[] = [
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
      fieldProps: {
        allowClear: true,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
        allowClear: true,
      },
    },
  ];

  const items1: SFormItems[] = [
    {
      type: 'input',
      label: '查询输入框',
      name: 'key',
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
      },
    },
    {
      type: 'select',
      label: '查询下拉框',
      name: 'key1',
      fieldProps: {
        dict: dictData,
      },
    },
  ];

  return (
    <>
      <h3>单行搜索</h3>
      <SForm.Search
        name="searchForm1"
        form={form}
        items={items1}
      ></SForm.Search>
      <h3>多行搜索容器</h3>
      <SForm.Search
        name="searchForm2"
        columns={3}
        form={form}
        items={items}
      ></SForm.Search>
    </>
  );
};
