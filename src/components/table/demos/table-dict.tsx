/**
 * title: dictKey 实现字典回显功能
 * description: 需要与 SConfigProvide配合使用(脚手架已提供)
 */

import React from 'react';

import { SColumnsType, SConfigProvider, STable } from '@dalydb/sdesign';

const globalDict = {
  processType: {
    test: '字典数据',
    test1: '字典数据1',
    test2: '字典数据2',
  },
};
export default () => {
  const data: any = [
    {
      processType: 'test1',
      processInstanceId: '17017b7056e011',
      businessCode: 'A11010520230128000017',
      orderName: '批量云资源申请批量云资源',
    },
  ];

  const columns: SColumnsType<any> = [
    {
      title: '工单编号',
      dataIndex: 'businessCode',
      key: 'businessCode',
      width: 150,
    },
    {
      title: '工单标题',
      dataIndex: 'orderName',
    },
    {
      title: '申请类型(字典值回显)',
      dataIndex: 'processType',
      dictKey: 'processType',
      width: 200,
    },
  ];

  return (
    <SConfigProvider globalDict={globalDict}>
      <STable columns={columns} dataSource={data} scroll={{ x: 500 }} />
    </SConfigProvider>
  );
};
