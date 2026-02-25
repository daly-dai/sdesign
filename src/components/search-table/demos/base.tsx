import React from 'react';

import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟数据
const generateMockData = (current: number, pageSize: number) => {
  const list = [];
  const total = 50;
  const startIndex = (current - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  for (let i = startIndex; i < endIndex; i++) {
    list.push({
      id: i + 1,
      name: `用户${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      gender: Math.floor(Math.random() * 2) + 1,
      status: Math.floor(Math.random() * 3) + 1,
      email: `user${i + 1}@example.com`,
      phone: `138${Math.floor(Math.random() * 100000000)}`,
      createTime: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      lastLoginTime: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    });
  }

  return {
    list,
    current,
    pageSize,
    total,
  };
};

// 模拟请求
const mockRequest = async (params: any) => {
  console.log('请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return generateMockData(params.current || 1, params.pageSize || 10);
};

export default () => {
  // 搜索表单配置
  const formItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '年龄',
      name: 'age',
      type: 'inputNumber',
    },
    {
      label: '性别',
      name: 'gender',
      type: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '男' },
          { value: 2, label: '女' },
        ],
      },
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '启用' },
          { value: 2, label: '禁用' },
          { value: 3, label: '待审核' },
        ],
      },
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'input',
    },
    {
      label: '手机号',
      name: 'phone',
      type: 'input',
    },
  ];

  // 表格列配置
  const columns: SColumnsType<any> = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    },
  ];

  return (
    <SSearchTable
      headTitle={{
        children: '用户管理',
        desc: '管理系统用户信息，包括添加、编辑、删除等操作',
      }}
      tableTitle={{
        children: '用户列表',
      }}
      requestFn={mockRequest}
      options={{
        paginationFields: {
          current: 'current',
          pageSize: 'pageSize',
          total: 'total',
          list: 'list',
        },
      }}
      formProps={{
        items: formItems,
        columns: 3,
        showExpand: true,
        defaultExpand: false,
      }}
      tableProps={{
        columns,
        rowKey: 'id',
        scroll: { x: 1200 },
      }}
    />
  );
};
