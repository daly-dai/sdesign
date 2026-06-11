/**
 * title: 卡片分组式
 * description: 每个 SDetail.Group 外层包独立 SCard，适用于信息分块展示。
 */
import { SCard, SDetail, SDetailGroupItem } from '@dalydb/sdesign';
import React from 'react';

const items: SDetailGroupItem[] = [
  {
    groupTitle: '基本信息',
    items: [
      { label: '姓名', name: 'name' },
      { label: '性别', name: 'gender' },
      { label: '邮箱', name: 'email' },
      { label: '电话', name: 'phone' },
    ],
  },
  {
    groupTitle: '工作信息',
    items: [
      { label: '部门', name: 'dept' },
      { label: '职位', name: 'position' },
      { label: '入职时间', name: 'joinDate' },
      { label: '工号', name: 'employeeId' },
    ],
  },
];

const Demo = () => (
  <SCard title="员工档案">
    <SDetail.Group
      dataSource={{
        name: '张三',
        gender: '男',
        email: 'zhangsan@example.com',
        phone: '138-0000-0001',
        dept: '技术部',
        position: '高级工程师',
        joinDate: '2023-06-01',
        employeeId: 'EMP-001',
      }}
      items={items}
    />
  </SCard>
);

export default Demo;
