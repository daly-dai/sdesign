/**
 * background: '#f0f5ff'
 * title: 行选择 + 批量操作 — tableTitle 右侧操作按钮
 */

import React, { useState } from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SButton, SProTable } from '@dalydb/sdesign';
import { message, Modal } from 'antd';

interface Task {
  id: number;
  name: string;
  assignee: string;
  priority: string;
  createTime: string;
}

const mockTasks: Task[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `任务 ${i + 1}: 完成前端模块开发`,
  assignee: `成员${(i % 6) + 1}`,
  priority: ['高', '中', '低'][i % 3],
  createTime: new Date(Date.now() - i * 43200000).toISOString(),
}));

const mockRequest = async () => {
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  return { list: mockTasks, total: mockTasks.length };
};

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const columns: SColumnsType<Task> = [
    { title: '任务', dataIndex: 'name', width: 200 },
    { title: '负责人', dataIndex: 'assignee', width: 100 },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: 80,
      render: (v: string) => (
        <span
          style={{
            color: v === '高' ? '#ef4444' : v === '中' ? '#f59e0b' : '#6b7280',
          }}
        >
          {v}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f5ff', minHeight: 400 }}>
      <SProTable<Task>
        request={{ service: mockRequest }}
        columns={columns}
        rowKey="id"
        title="任务管理"
        searchItems={[
          { label: '关键词', name: 'keyword', type: 'input' as const },
        ]}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: setSelectedKeys,
        }}
        tableTitle={{
          children: '任务列表',
          actionNode: (
            <>
              {selectedKeys.length > 0 && (
                <SButton
                  actionType="delete"
                  onClick={() => {
                    Modal.confirm({
                      title: '批量删除',
                      content: `确认删除 ${selectedKeys.length} 个任务？`,
                      onOk: () => {
                        message.success(`已删除 ${selectedKeys.length} 项`);
                        setSelectedKeys([]);
                      },
                    });
                  }}
                >
                  批量删除 ({selectedKeys.length})
                </SButton>
              )}
              <SButton
                actionType="create"
                onClick={() => message.info('新建任务')}
              />
            </>
          ),
        }}
      />
    </div>
  );
};
