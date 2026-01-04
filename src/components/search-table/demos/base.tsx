import React from 'react';

import { Button } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟数据
const generateMockData = (current: number, pageSize: number) => {
  const list = [];
  const total = 50;
  const startIndex = (current - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  // 性别字典

  // 状态字典

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
    },
    {
      label: '年龄',
      name: 'age',
    },
    {
      label: '性别',
      name: 'gender',
      type: 'select',
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
    },
    {
      label: '邮箱',
      name: 'email',
    },
    {
      label: '手机号',
      name: 'phone',
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
      dictKey: 'gender',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      dictKey: 'status',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
      render: 'ellipsis',
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
      render: 'datetime',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      width: 180,
      render: (time: string) => {
        return {
          props: {
            style: { color: 'red' },
          },
          children: new Date(time).toLocaleString(),
        };
      },
    },
  ];

  // 页面标题配置
  const headTitle = {
    children: '用户管理',
    titleDesc: '管理系统用户信息，包括添加、编辑、删除等操作',
  };

  // 表格标题配置
  const tableTitle = {
    children: '用户列表',
    action: (
      <>
        <Button style={{ marginRight: 8 }}>添加用户</Button>
        <Button>批量操作</Button>
      </>
    ),
  };

  return (
    <SSearchTable
      headTitle={headTitle}
      tableTitle={tableTitle}
      serviceProps={{
        service: mockRequest,
        serviceProps: {
          defaultPageSize: 10,
        },
      }}
      formProps={{
        items: formItems,
        columns: 3,
        showExpand: true,
        defaultExpand: false,
      }}
      tableProps={{
        isSeq: true,
        columns: columns,
        rowKey: 'id',
        scroll: { x: 1200 },
      }}
    />
  );
};
