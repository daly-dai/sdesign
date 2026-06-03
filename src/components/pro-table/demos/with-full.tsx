/**
 * background: '#f0fdf4'
 * title: 完整示例 — 页面标题 + 表格标题 + 操作按钮 + 搜索栏操作
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SButton, SProTable } from '@dalydb/sdesign';
import { message, Space } from 'antd';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createTime: string;
}

const mockProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
  id: `SKU-${2000 + i}`,
  name: `产品 ${i + 1}`,
  category: ['电子', '家居', '服饰', '食品'][i % 4],
  price: Math.floor(Math.random() * 1000) + 50,
  stock: Math.floor(Math.random() * 500),
  createTime: new Date(Date.now() - i * 259200000).toISOString(),
}));

const mockRequest = async () => {
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  return { list: mockProducts, total: mockProducts.length };
};

export default () => {
  const columns: SColumnsType<Product> = [
    { title: '名称', dataIndex: 'name', width: 140 },
    { title: '分类', dataIndex: 'category', width: 100 },
    {
      title: '价格',
      dataIndex: 'price',
      width: 100,
      render: (v: number) => `¥${v}`,
    },
    { title: '库存', dataIndex: 'stock', width: 80 },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0fdf4', minHeight: 400 }}>
      <SProTable<Product>
        request={{ service: mockRequest }}
        title={{
          children: '产品管理',
          actionNode: (
            <SButton onClick={() => message.info('设置')}>产品设置</SButton>
          ),
        }}
        searchProps={{
          items: [
            { label: '名称', name: 'name', type: 'input' as const },
            {
              label: '分类',
              name: 'category',
              type: 'select' as const,
              fieldProps: {
                options: [
                  { value: '电子', label: '电子' },
                  { value: '家居', label: '家居' },
                  { value: '服饰', label: '服饰' },
                  { value: '食品', label: '食品' },
                ],
                allowClear: true,
              },
            },
          ],
          actionNode: (
            <SButton onClick={() => message.info('高级筛选')}>高级筛选</SButton>
          ),
        }}
        tableTitle={{
          children: '产品列表',
          actionNode: (
            <Space>
              <SButton
                actionType="export"
                onClick={() => message.info('导出中...')}
              />
              <SButton
                actionType="create"
                onClick={() => message.info('新增产品')}
              />
            </Space>
          ),
        }}
        tableProps={{ columns, rowKey: 'id' }}
      />
    </div>
  );
};
