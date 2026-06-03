/**
 * background: '#f6f7f9'
 * title: 外部刷新 — 通过 ref 在表格外触发刷新 + 表格无标题
 */

import React, { useRef } from 'react';

import type { SColumnsType, SProTableRef } from '@dalydb/sdesign';
import { SButton, SProTable } from '@dalydb/sdesign';
import { Space, message } from 'antd';

interface Log {
  id: number;
  action: string;
  operator: string;
  createTime: string;
}

const mockLogs: Log[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  action: ['登录', '导出', '删除', '编辑', '新增'][i % 5],
  operator: `用户${(i % 8) + 1}`,
  createTime: new Date(Date.now() - i * 3600000).toISOString(),
}));

const mockRequest = async () => {
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  return { list: mockLogs, total: mockLogs.length };
};

export default () => {
  const tableRef = useRef<SProTableRef>(null);

  const columns: SColumnsType<Log> = [
    { title: '操作', dataIndex: 'action', width: 100 },
    { title: '操作人', dataIndex: 'operator', width: 120 },
    {
      title: '时间',
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
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>操作日志</h2>
        <Space>
          <SButton
            actionType="refresh"
            onClick={() => {
              tableRef.current?.refresh();
              message.success('已刷新');
            }}
          />
        </Space>
      </div>

      <SProTable<Log>
        ref={tableRef}
        request={{ service: mockRequest }}
        tableProps={{ columns, rowKey: 'id' }}
      />
    </div>
  );
};
