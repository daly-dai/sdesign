import type { SColumnsType } from '@dalydb/sdesign';
import { SConfigProvider, STable } from '@dalydb/sdesign';
import { Tag } from 'antd';
import React from 'react';

interface User {
  id: number;
  name: string;
  status: string;
  time: string;
}

const globalDict = { userStatus: { active: '活跃', inactive: '未激活' } };

const data: User[] = [
  { id: 1, name: '张三', status: 'active', time: new Date().toISOString() },
  {
    id: 2,
    name: '李四',
    status: 'inactive',
    time: new Date(Date.now() - 86400000).toISOString(),
  },
];

const columns: SColumnsType<User> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
  { title: '创建时间', dataIndex: 'time', render: 'datetime' },
  { title: '操作', render: () => <Tag color="blue">查看</Tag> },
];

export default () => (
  <SConfigProvider globalDict={globalDict}>
    <STable
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  </SConfigProvider>
);
