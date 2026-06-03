/**
 * background: '#f6f7f9'
 * title: 基础用法 — 最简单的列表页，搜索 + 表格 + 分页，表格无标题
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SProTable } from '@dalydb/sdesign';

interface User {
  id: number;
  name: string;
  email: string;
  status: number;
  createTime: string;
}

const mockData: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3,
  createTime: new Date(Date.now() - i * 86400000).toISOString(),
}));

const mockRequest = async (params: Record<string, unknown>) => {
  await new Promise((r) => {
    setTimeout(r, 400);
  });
  const pageNum = Number(params.pageIndex) || 1;
  const pageSize = 10;
  const start = (pageNum - 1) * pageSize;
  return {
    list: mockData.slice(start, start + pageSize),
    total: mockData.length,
  };
};

export default () => {
  const columns: SColumnsType<User> = [
    { title: '姓名', dataIndex: 'name', width: 120 },
    { title: '邮箱', dataIndex: 'email', width: 200 },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <SProTable<User>
        request={{ service: mockRequest }}
        searchProps={{
          items: [{ label: '关键词', name: 'keyword', type: 'input' as const }],
        }}
        tableProps={{ columns, rowKey: 'id' }}
      />
    </div>
  );
};
