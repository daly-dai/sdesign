/**
 * background: '#f6f7f9'
 * title: 字典回显 + 时间筛选 — dictKey 列渲染 + datePickerRange 搜索
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SConfigProvider, SProTable } from '@dalydb/sdesign';

interface Order {
  id: string;
  orderNo: string;
  customer: string;
  status: number;
  createTime: string;
}

const mockOrders: Order[] = Array.from({ length: 18 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  orderNo: `ORD-${1000 + i}`,
  customer: `客户${(i % 8) + 1}`,
  status: i % 4,
  createTime: new Date(Date.now() - i * 3600000).toISOString(),
}));

const mockRequest = async () => {
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  return { list: mockOrders, total: mockOrders.length };
};

// 全局字典：status 枚举值映射
const globalDict = {
  orderStatus: { 0: '待处理', 1: '处理中', 2: '已完成', 3: '已取消' },
};

export default () => {
  const columns: SColumnsType<Order> = [
    { title: '订单号', dataIndex: 'orderNo', width: 130 },
    { title: '客户', dataIndex: 'customer', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      dictKey: 'orderStatus',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <SConfigProvider globalDict={globalDict}>
      <div style={{ padding: 24 }}>
        <SProTable<Order>
          request={{ service: mockRequest }}
          searchItems={[
            { label: '订单号', name: 'orderNo', type: 'input' as const },
            {
              label: '状态',
              name: 'status',
              type: 'select' as const,
              fieldProps: { dictKey: 'orderStatus', allowClear: true },
            },
            {
              label: '创建时间',
              name: 'dateRange',
              type: 'datePickerRange' as const,
            },
          ]}
          columns={columns}
          rowKey="id"
          title="订单管理"
          tableTitle={{ children: '订单列表', actionNode: undefined }}
        />
      </div>
    </SConfigProvider>
  );
};
