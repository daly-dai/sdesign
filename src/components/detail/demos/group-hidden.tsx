/**
 * title: detail.Group hidden属性，动态隐藏配置
 */
import { Button } from 'antd';
import React, { useState } from 'react';

import { SCard, SDetail, SDetailGroupItem } from '@dalydb/sdesign';

export default () => {
  const [hidden, setHidden] = useState(false);

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
      ],
    },
    {
      groupTitle: '单项详情回显',
      hidden,
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
      ],
    },
  ];

  return (
    <>
      <SCard hasBottomPadding>
        <Button type="primary" onClick={() => setHidden(!hidden)}>
          {hidden ? '展示' : '隐藏'}单项详情回显
        </Button>
      </SCard>
      <SDetail.Group items={items}></SDetail.Group>
    </>
  );
};
