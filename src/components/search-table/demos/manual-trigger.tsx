import React from 'react';

import { Button, Space } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// 模拟手动触发的请求
const mockManualRequest = async (
  params: Record<string, string | number | undefined>,
) => {
  console.log('手动触发请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const pageNum = Number(params.pageNum) || 1;
  const pageSize = Number(params.pageSize) || 10;

  // 模拟数据
  return {
    pageNum,
    pageSize,
    totalSize: 45,
    dataList: Array.from(
      {
        length: Math.min(pageSize, 45 - (pageNum - 1) * pageSize),
      },
      (_, i) => ({
        id: (pageNum - 1) * pageSize + i + 1,
        name: `用户${(pageNum - 1) * pageSize + i + 1}`,
        age: Math.floor(Math.random() * 50) + 18,
        email: `user${(pageNum - 1) * pageSize + i + 1}@example.com`,
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
      label: '邮箱',
      name: 'email',
      type: 'input',
    },
  ];

  // 表格列配置
  const columns: SColumnsType<User> = [
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
        children: '手动触发搜索',
        desc: '演示如何手动控制搜索请求的触发',
      }}
      tableTitle={{
        children: '用户列表',
      }}
      requestFn={mockManualRequest}
      options={{
        manual: true, // 手动触发请求
      }}
      formProps={{
        items: formItems,
        columns: 2,
        showExpand: false,
        // 自定义按钮，不使用默认的提交按钮
        children: (
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="button">重置</Button>
          </Space>
        ),
      }}
      tableProps={{
        columns,
        rowKey: 'id',
        scroll: { x: 600 },
      }}
    />
  );
};
