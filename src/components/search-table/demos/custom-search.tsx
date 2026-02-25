import React from 'react';

import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟自定义搜索接口的数据格式
const mockCustomRequest = async (params: any) => {
  console.log('自定义搜索参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // 模拟不同字段名的返回数据结构
  return {
    page: params.page || 1,
    limit: params.limit || 10,
    totalCount: 45,
    items: Array.from(
      {
        length: Math.min(
          params.limit || 10,
          45 - (params.page - 1 || 0) * (params.limit || 10),
        ),
      },
      (_, i) => ({
        id: ((params.page || 1) - 1) * (params.limit || 10) + i + 1,
        name: `用户${((params.page || 1) - 1) * (params.limit || 10) + i + 1}`,
        age: Math.floor(Math.random() * 50) + 18,
        email: `user${
          ((params.page || 1) - 1) * (params.limit || 10) + i + 1
        }@example.com`,
      }),
    ),
  };
};

export default () => {
  // 自定义搜索表单配置
  const customFormItems: SFormItems[] = [
    {
      label: '用户名',
      name: 'username',
      type: 'input',
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'input',
    },
    {
      label: '注册时间范围',
      name: 'regTimeRange',
      type: 'datePickerRange',
    },
  ];

  // 表格列配置
  const columns: SColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
  ];

  return (
    <SSearchTable
      headTitle={{
        children: '自定义搜索',
        desc: '演示如何使用自定义字段名和数据结构',
      }}
      tableTitle={{
        children: '用户列表',
      }}
      requestFn={mockCustomRequest}
      options={{
        // 自定义分页字段映射
        paginationFields: {
          current: 'page',
          pageSize: 'limit',
          total: 'totalCount',
          list: 'items',
        },
      }}
      formProps={{
        items: customFormItems,
        columns: 3,
        showExpand: true,
        defaultExpand: false,
      }}
      tableProps={{
        columns,
        rowKey: 'id',
        scroll: { x: 800 },
      }}
    />
  );
};
