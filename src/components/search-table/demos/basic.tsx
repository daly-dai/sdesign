import type {
  SColumnsType,
  SFormItems,
  SSearchTableRef,
} from '@dalydb/sdesign';
import { SConfigProvider, SSearchTable } from '@dalydb/sdesign';
import { Button, message } from 'antd';
import React, { useRef } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  createTime: string;
}

const globalDict = { userStatus: { active: '活跃', inactive: '未激活' } };

const searchItems: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input' },
  {
    label: '状态',
    name: 'status',
    type: 'select',
    fieldProps: {
      options: [
        { value: 'active', label: '活跃' },
        { value: 'inactive', label: '未激活' },
      ],
    },
  },
];

const columns: SColumnsType<User> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
  { title: '创建时间', dataIndex: 'createTime', render: 'datetime' },
  {
    title: '操作',
    render: (_, record: User) => (
      <Button
        type="link"
        size="small"
        onClick={() => message.info(`编辑: ${record.name}`)}
      >
        编辑
      </Button>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRequest = (_params: Record<string, unknown>) => {
  const list = [
    {
      id: 1,
      name: '张三',
      email: 'zs@example.com',
      status: 'active',
      createTime: new Date().toISOString(),
    },
    {
      id: 2,
      name: '李四',
      email: 'ls@example.com',
      status: 'inactive',
      createTime: new Date().toISOString(),
    },
  ];
  return Promise.resolve({ list, total: list.length });
};

export default () => {
  const ref = useRef<SSearchTableRef>(null);
  return (
    <SConfigProvider globalDict={globalDict}>
      <SSearchTable
        ref={ref}
        headTitle={{
          children: '用户管理',
          actionNode: (
            <Button type="primary" onClick={() => message.info('新增用户')}>
              新增
            </Button>
          ),
        }}
        requestFn={mockRequest}
        formProps={{ items: searchItems, columns: 3 }}
        tableProps={{ columns, rowKey: 'id', isSeq: true }}
      />
    </SConfigProvider>
  );
};
