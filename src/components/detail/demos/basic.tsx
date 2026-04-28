import type { SDetailItem } from '@dalydb/sdesign';
import { SCard, SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  name: '张三',
  status: 1,
  email: 'zs@example.com',
  createTime: new Date().toISOString(),
};
const statusMap: Record<number, string> = { 1: '启用', 0: '禁用' };

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '状态', name: 'status', type: 'dict', dictMap: statusMap },
  {
    label: '邮箱',
    name: 'email',
    render: (v: string) => (v ? <a href={`mailto:${v}`}>{v}</a> : '-'),
  },
  { label: '创建时间', name: 'createTime' },
];

export default () => (
  <SCard title="用户详情">
    <SDetail items={items} dataSource={dataSource} column={2} />
  </SCard>
);
