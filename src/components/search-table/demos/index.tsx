/**
 * title: group 基础使用
 * background: rgba(42, 46, 54, 0.04)
 */

import { Button, Space } from 'antd';
import React from 'react';

import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import TechSearchTable from '../index';

// 查询表单配置
const formItems: SFormItems[] = [
  {
    label: '查询',
    name: 'data',
    type: 'input',
  },
  {
    label: '查询2',
    name: 'data1',
    type: 'input',
  },
];
// 表格配置
const columns: SColumnsType<any> = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '操作',
    key: 'action',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_text: any, _record: any) => {
      return (
        <Space>
          <Button type="link">详情</Button>
          <Button type="link">编辑</Button>
        </Space>
      );
    },
  },
];

export default () => {
  return <TechSearchTable title="搜索表格" searchItems={formItems} columns={columns} />;
};
