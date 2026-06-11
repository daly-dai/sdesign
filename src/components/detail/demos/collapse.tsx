/**
 * title: 折叠面板式
 * description: SDetail.Group 嵌入 Collapse.Panel，移动端和长表单回显标准模式。
 */
import { SDetail, SDetailGroupItem } from '@dalydb/sdesign';
import { Collapse } from 'antd';
import React from 'react';

const dataSource = {
  name: '张三',
  gender: '男',
  email: 'zs@example.com',
  dept: '技术部',
  position: '高级工程师',
  joinDate: '2023-06-01',
};

const groupItems: SDetailGroupItem[] = [
  {
    groupTitle: '基本信息',
    items: [
      { label: '姓名', name: 'name' },
      { label: '性别', name: 'gender' },
      { label: '邮箱', name: 'email' },
    ],
  },
  {
    groupTitle: '工作信息',
    items: [
      { label: '部门', name: 'dept' },
      { label: '职位', name: 'position' },
      { label: '入职日期', name: 'joinDate' },
    ],
  },
];

const Demo = () => (
  <Collapse
    defaultActiveKey={['basic']}
    items={[
      {
        key: 'basic',
        label: '基本信息',
        children: (
          <SDetail
            dataSource={dataSource}
            items={groupItems[0].items}
            columns={2}
          />
        ),
      },
      {
        key: 'work',
        label: '工作信息',
        children: (
          <SDetail
            dataSource={dataSource}
            items={groupItems[1].items}
            columns={2}
          />
        ),
      },
    ]}
  />
);

export default Demo;
