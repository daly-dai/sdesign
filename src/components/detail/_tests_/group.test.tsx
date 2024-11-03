import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import SDetail from '../index';
import { SDetailGroupItem } from '../types';

import mountTest from '@dalydb/sdesign/tests/mountTest';

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
    items: [
      {
        label: '姓名1',
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

describe('DetailGroup', () => {
  mountTest(SDetail.Group);

  mountTest(() => <SDetail.Group />);

  it('render support groupItems or  items', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SDetail.Group items={items}></SDetail.Group>
      </BrowserRouter>,
    );

    const groupLabel = getByText('姓名');
    expect(groupLabel).toBeInTheDocument();

    const label = getByText('姓名1');
    expect(label).toBeInTheDocument();
  });

  it('render support groupTitle and title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SDetail.Group items={items}></SDetail.Group>
      </BrowserRouter>,
    );

    const groupTitle = getByText('项目基本情况');
    expect(groupTitle).toBeInTheDocument();

    const Title = getByText('基本信息');
    expect(Title).toBeInTheDocument();
  });
});
