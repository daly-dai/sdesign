/**
 * title: 加载态骨架屏
 * description: loading 状态下显示骨架屏占位，title 和 desc 正常渲染。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  name: '张三',
  email: 'zs@example.com',
  phone: '138-0000-0001',
  dept: '技术部',
};

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '邮箱', name: 'email' },
  { label: '电话', name: 'phone' },
  { label: '部门', name: 'dept' },
];

const Demo = () => (
  <SDetail
    title="用户详情"
    desc="数据加载完成后自动切换"
    dataSource={dataSource}
    items={items}
    columns={2}
    loading
  />
);

export default Demo;
