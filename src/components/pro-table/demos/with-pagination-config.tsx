/**
 * background: '#f6f7f9'
 * title: 分页字段映射 — 适配不同后端分页格式 + 表格标题
 *
 * 后端返回 { dataList, totalSize, pageNum } → 通过 paginationFields 映射
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SProTable } from '@dalydb/sdesign';

interface Article {
  id: number;
  title: string;
  author: string;
  publishTime: string;
}

const mockArticles: Article[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `前端架构的思考与实践 — 第 ${i + 1} 篇`,
  author: `作者${(i % 5) + 1}`,
  publishTime: new Date(Date.now() - i * 172800000).toISOString(),
}));

/** 后端返回: { dataList, totalSize, pageNum, pageSize } */
const mockRequest = async (params: Record<string, unknown>) => {
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  const pageNum = Number(params.pageNum) || 1;
  const pageSize = 10;
  const start = (pageNum - 1) * pageSize;
  return {
    dataList: mockArticles.slice(start, start + pageSize),
    totalSize: mockArticles.length,
    pageNum,
    pageSize,
  };
};

export default () => {
  const columns: SColumnsType<Article> = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 300,
      render: 'ellipsis' as const,
    },
    { title: '作者', dataIndex: 'author', width: 100 },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <SProTable<Article>
        request={{
          service: mockRequest,
          options: {
            paginationFields: {
              list: 'dataList',
              total: 'totalSize',
              current: 'pageNum',
            },
          },
        }}
        title="文章管理"
        searchProps={{
          items: [{ label: '标题', name: 'keyword', type: 'input' as const }],
        }}
        tableProps={{ columns, rowKey: 'id' }}
        tableTitle={{ children: '已发布文章' }}
      />
    </div>
  );
};
