/**
 * title: ellipsis + dictKey 同时生效
 * description: 当 render: 'ellipsis' 和 dictKey 同时配置时，字典映射优先，省略在字典转换后的文本上生效
 */

import React from 'react';

import { SColumnsType, SConfigProvider, STable } from '@dalydb/sdesign';

interface Record {
  id: number;
  status: string;
  longText: string;
}

const globalDict = {
  statusMap: { '1': '已启用', '0': '已禁用' },
};

export default () => {
  const data: Record[] = [
    { id: 1, status: '1', longText: '这是一段很长的文本内容用于测试省略效果' },
    { id: 2, status: '0', longText: '短文本' },
  ];

  const columns: SColumnsType<Record> = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    {
      title: '状态（ellipsis + dictKey）',
      dataIndex: 'status',
      dictKey: 'statusMap',
      render: 'ellipsis',
      width: 100,
    },
    {
      title: '纯 ellipsis（无 dictKey）',
      dataIndex: 'longText',
      render: 'ellipsis',
      width: 120,
    },
  ];

  return (
    <SConfigProvider globalDict={globalDict}>
      <STable columns={columns} dataSource={data} />
    </SConfigProvider>
  );
};
