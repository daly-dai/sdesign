import React from 'react';

import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟需要参数转换的请求
const mockTransformRequest = async (params: any) => {
  console.log('转换后的请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // 模拟数据
  return {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    totalSize: 45,
    dataList: Array.from(
      {
        length: Math.min(
          params.pageSize || 10,
          45 - (params.pageNum - 1 || 0) * (params.pageSize || 10),
        ),
      },
      (_, i) => ({
        id: ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1,
        name: `用户${
          ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1
        }`,
        age: Math.floor(Math.random() * 50) + 18,
        email: `user${
          ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1
        }@example.com`,
        status: Math.floor(Math.random() * 3) + 1,
      }),
    ),
  };
};

export default () => {
  // 搜索表单配置
  const formItems: SFormItems[] = [
    {
      label: '用户名',
      name: 'username',
      type: 'input',
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
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: number) => {
        const statusMap = {
          1: '启用',
          2: '禁用',
          3: '待审核',
        };
        return statusMap[status as keyof typeof statusMap] || '未知';
      },
    },
  ];

  return (
    <SSearchTable
      headTitle={{
        children: '参数转换',
        desc: '演示如何在请求发送前转换参数',
      }}
      tableTitle={{
        children: '用户列表',
      }}
      requestFn={mockTransformRequest}
      options={{
        // 请求参数转换
        transformRequestParams: (params) => {
          console.log('原始参数:', params);
          // 转换参数：将 username 转为 userName，status 转为 userStatus
          return {
            ...params,
            userName: params.username,
            userStatus: params.status,
            // 添加排序参数
            sortBy: 'id',
            sortOrder: 'desc',
          };
        },
        // 响应数据转换
        transformResponseData: (response) => {
          console.log('原始响应:', response);
          // 对响应数据进行处理
          return {
            ...response,
            // 添加额外字段
            processedAt: new Date().toISOString(),
          };
        },
      }}
      formProps={{
        items: formItems,
        columns: 2,
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
