/**
 * background: '#f6f7f9'
 * title: 全能力示例 — 分页映射 + 参数转换 + 响应转换 + 外部表单
 *
 * 场景：
 * 1. 后端分页字段为 { pageNum, pageSize, totalCount, records }
 * 2. 搜索参数需要前置处理（状态值转为后端识别的 code）
 * 3. 响应数据需要后置处理（时间字段格式化）
 * 4. 外部 Form 实例控制搜索（跨组件共享）
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SButton, SForm, SProTable } from '@dalydb/sdesign';
import { message } from 'antd';

interface Order {
  id: string;
  orderNo: string;
  amount: number;
  status: number;
  createTime: string;
}

// 原始 mock 数据
const rawData: Array<Record<string, unknown>> = Array.from(
  { length: 28 },
  (_, i) => ({
    id: `ORD-${2000 + i}`,
    orderNo: `ORD-${2000 + i}`,
    amount: Math.floor(Math.random() * 5000) + 100,
    statusCode: i % 3,
    createdAt: new Date(Date.now() - i * 86400000).getTime(),
  }),
);

const mockRequest = async (params: Record<string, unknown>) => {
  await new Promise((r) => {
    setTimeout(r, 400);
  });
  const pageNum = Number(params.pageNum) || 1;
  const pageSize = Number(params.pageSize) || 10;
  let filtered = [...rawData];

  if (params.statusCode !== undefined && params.statusCode !== '') {
    filtered = filtered.filter((r) => r.statusCode === params.statusCode);
  }

  const start = (pageNum - 1) * pageSize;
  return {
    pageNum,
    pageSize,
    totalCount: filtered.length,
    records: filtered.slice(start, start + pageSize).map((r) => ({
      ...r,
      createdAt: new Date(r.createdAt as number).toISOString(),
    })),
  };
};

export default () => {
  const [form] = SForm.useForm();

  const columns: SColumnsType<Order> = [
    { title: '订单号', dataIndex: 'orderNo', width: 130 },
    {
      title: '金额',
      dataIndex: 'amount',
      width: 100,
      render: (v: number) => `¥${v}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
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
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
          订单管理（全能力）
        </h2>
        <SButton
          actionType="refresh"
          onClick={() => {
            form.resetFields();
            form.submit();
            message.info('已重置并刷新');
          }}
        />
      </div>

      <SProTable<Order>
        request={{
          service: mockRequest,
          options: {
            paginationFields: {
              current: 'pageNum',
              pageSize: 'pageSize',
              total: 'totalCount',
              list: 'records',
            },
            dispatchParams: (params: Record<string, unknown>) => {
              if (params.status !== undefined && params.status !== '') {
                return { ...params, statusCode: Number(params.status) - 1 };
              }
              return params;
            },
            transformResponseData: (data: Record<string, unknown>) => {
              const records =
                (data.records as Array<Record<string, unknown>>) ?? [];
              return {
                ...data,
                records: records.map((r) => ({
                  ...r,
                  status: Number(r.statusCode) + 1,
                  createTime: r.createdAt,
                })),
              };
            },
          },
        }}
        searchProps={{
          form,
          items: [
            { label: '订单号', name: 'orderNo', type: 'input' as const },
            {
              label: '状态',
              name: 'status',
              type: 'select' as const,
              fieldProps: {
                options: [
                  { value: 1, label: '待处理' },
                  { value: 2, label: '已完成' },
                  { value: 3, label: '已取消' },
                ],
                allowClear: true,
              },
            },
          ],
        }}
        tableProps={{ columns, rowKey: 'id' }}
        tableTitle={{ children: '订单列表' }}
      />
    </div>
  );
};
