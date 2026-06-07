import type { SDetailItem } from '@dalydb/sdesign';
import { SCard, SConfigProvider, SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  name: '张三',
  gender: 1,
  status: 1,
  email: 'zs@example.com',
  startTime: '2024-01-01',
  endTime: '2024-12-31',
  tags: '1,2',
  fileList: [
    { fileName: '合同.pdf', fileUrl: 'https://example.com/contract.pdf' },
    { fileName: '附件.docx', fileUrl: 'https://example.com/attach.docx' },
  ],
  createTime: new Date().toISOString(),
};
const statusMap: Record<number, string> = { 1: '启用', 0: '禁用' };
const tagMap: Record<string, string> = { 1: 'VIP', 2: '认证用户' };
// 全局字典：子组件通过 dictKey 引用，无需逐个传 dictMap
const globalDict = {
  genderMap: { 1: '男', 2: '女' },
};

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '性别', name: 'gender', type: 'dict', dictKey: 'genderMap' },
  { label: '状态', name: 'status', type: 'dict', dictMap: statusMap },
  {
    label: '邮箱',
    name: 'email',
    render: (v: string) => (v ? <a href={`mailto:${v}`}>{v}</a> : '-'),
  },
  { label: '有效期', type: 'rangeTime', name: ['startTime', 'endTime'] },
  { label: '标签', name: 'tags', type: 'checkbox', dictMap: tagMap },
  { label: '附件', name: 'fileList', type: 'file' },
  { label: '占位示例', type: 'placeholder' },
  { label: '空值示例', type: 'empty' },
  { label: '创建时间', name: 'createTime' },
];

export default () => (
  <SConfigProvider globalDict={globalDict}>
    <SCard title="用户详情">
      <SDetail items={items} dataSource={dataSource} column={2} />
    </SCard>
  </SConfigProvider>
);
