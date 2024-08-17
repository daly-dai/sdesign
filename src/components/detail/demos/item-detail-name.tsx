/**
 * title: detailName字段
 * description: 支持嵌套数据的渲染
 */

import { Typography } from 'antd';
import React from 'react';

import { SDetail, SDetailGroupItem, SDetailItem } from '@daly/sdesign';

const dataSource = {
  base: {
    workAddress: '测试的地址',
    accessPointDevices: '常见的信息',
  },
};

const GroupDataSource = {
  base: {
    name: '张三',
    sex: '男',
    birthDay: '1990-01-01',
    phone: '13800138000',
  },
  base1: {
    name1: '李四',
    sex1: '女',
    birthDay1: '1992-05-15',
    phone1: '13900139000',
  },
};

const items: SDetailItem[] = [
  {
    label: '普通渲染',
    name: 'workAddress',
  },
  {
    label: '自定义渲染',
    name: 'accessPointDevices',
    render: (data: string | undefined) => {
      if (!data) return '-';

      return <div>测试数据{data}</div>;
    },
  },
];

const groupItems: SDetailGroupItem[] = [
  {
    groupTitle: '嵌套数据base',
    groupItems: [
      {
        title: '基本信息',
        column: 2,
        detailName: 'base',
        items: [
          {
            label: '姓名',
            name: 'name',
          },
          {
            label: '性别',
            name: 'sex',
          },
          {
            label: '出生年月',
            name: 'birthDay',
          },
          {
            label: '电话',
            name: 'birthDay',
          },
        ],
      },
    ],
  },
  {
    groupTitle: '嵌套数据base1',
    itemProps: {
      detailName: 'base1',
    },
    items: [
      {
        label: '姓名',
        name: 'name1',
      },
      {
        label: '性别',
        name: 'sex1',
      },
      {
        label: '出生年月',
        name: 'birthDay1',
      },
      {
        label: '电话',
        name: 'birthDay1',
      },
    ],
  },
];

export default () => {
  return (
    <>
      <h3>SDetail的detailName为base</h3>
      <SDetail
        items={items}
        detailName="base"
        dataSource={dataSource}
      ></SDetail>
      <Typography>
        <p>dataSource为</p>
        <pre>{JSON.stringify(dataSource, null, 2)}</pre>
      </Typography>

      <h3>SDetail.Group组件的detailName为base2</h3>
      <SDetail.Group
        items={groupItems}
        dataSource={GroupDataSource}
      ></SDetail.Group>
      <Typography>
        <p>GroupDataSource为</p>
        <pre>{JSON.stringify(GroupDataSource, null, 2)}</pre>
      </Typography>
    </>
  );
};
