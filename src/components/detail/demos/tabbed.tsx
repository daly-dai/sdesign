/**
 * title: Tab 页签式
 * description: Tabs 内每个 Tab 放独立 SDetail 实例，适用于多维度详情展示。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import { Tabs } from 'antd';
import React from 'react';

const basicItems: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '性别', name: 'gender' },
  { label: '年龄', name: 'age' },
  { label: '邮箱', name: 'email' },
];

const workItems: SDetailItem[] = [
  { label: '部门', name: 'dept' },
  { label: '职位', name: 'position' },
  { label: '入职日期', name: 'joinDate' },
];

const basicData = {
  name: '张三',
  gender: '男',
  age: 28,
  email: 'zs@example.com',
};
const workData = {
  dept: '技术部',
  position: '高级工程师',
  joinDate: '2023-06-01',
};

const Demo = () => (
  <Tabs
    defaultActiveKey="basic"
    items={[
      {
        key: 'basic',
        label: '基本信息',
        children: (
          <SDetail dataSource={basicData} items={basicItems} columns={2} />
        ),
      },
      {
        key: 'work',
        label: '工作信息',
        children: (
          <SDetail dataSource={workData} items={workItems} columns={2} />
        ),
      },
    ]}
  />
);

export default Demo;
