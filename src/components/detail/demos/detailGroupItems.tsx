/**
 * title: group可以直接配置items，减少负担
 * description: 也可以通过itemsProps属性进行补充配置
 */
import React from 'react';

import SDetail from '..';
import { SDetailGroupItem } from '../types';

const dataSource = {
  name: '张三',
  age: 18,
  sex: '男',
  address: '北京市',
  email: '123@qq.com',
  phone: '1234567890',
  remark: '备注信息',
};

export default () => {
  const items: SDetailGroupItem[] = [
    {
      groupTitle: '基本信息',
      itemProps: {
        column: 2,
      },
      items: [
        {
          label: '姓名',
          name: 'name',
          value: '张三',
        },
        {
          label: '年龄',
          name: 'age',
          value: '18',
        },
        {
          label: '性别',
          name: 'sex',
          value: '男',
        },
      ],
    },
    {
      groupTitle: '详细信息',
      items: [
        {
          label: '地址',
          name: 'address',
          value: '北京市',
        },
        {
          label: '电话',
          name: 'phone',
          value: '123456789',
        },
      ],
    },
  ];

  return <SDetail.Group dataSource={dataSource} items={items}></SDetail.Group>;
};
