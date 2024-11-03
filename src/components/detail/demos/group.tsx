/**
 * title: 分组详情
 * background: rgba(42, 46, 54, 0.04)
 */

import React from 'react';

import { SDetail, SDetailGroupItem } from '@dalydb/sdesign';

export default () => {
  const items: SDetailGroupItem[] = [
    {
      groupTitle: '项目基本情况',
      groupItems: [
        {
          title: '基本信息',
          column: 2,
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
        {
          title: '详细信息',
          column: 3,
          items: [
            {
              label: '类型',
              name: 'type',
            },
            {
              label: '地址',
              name: 'address',
            },
            {
              label: '备注',
              name: 'remark',
            },
          ],
        },
      ],
    },
    {
      groupTitle: '单项详情回显',
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
    {
      groupTitle: '其他信息',
      groupItems: [
        {
          title: '创业融资需求',
          items: [
            {
              label: '融资金额',
              name: 'money',
            },
            {
              label: '融资方式',
              name: 'moneyType',
            },
            {
              label: '融资用途',
              name: 'moneyUs',
            },
          ],
        },
        {
          title: '企业其他情况',
          items: [
            {
              label: '企业类型',
              name: 'type',
            },
            {
              label: '企业规模',
              name: 'scale',
            },
            {
              label: '企业行业',
              name: 'industry',
            },
          ],
        },
      ],
    },
  ];

  return <SDetail.Group dataSource={{}} items={items}></SDetail.Group>;
};
