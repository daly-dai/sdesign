import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import STable from '../index';
import { SColumnsType } from '../types';

import SConfigProvider from '@dalydb/sdesign/components/config-provider';
import { waitFakeTimer } from '@dalydb/sdesign/tests/utils';

const globalDict = {
  processType: {
    test: '字典数据',
    test1: '字典数据1',
    test2: '字典数据2',
  },
};

const TableDict = () => {
  const data = [
    {
      processType: 'test1',
    },
  ];

  const columns: SColumnsType<any> = [
    {
      title: '申请类型(字典值回显)',
      dataIndex: 'processType',
      dictKey: 'processType',
    },
  ];

  return (
    <SConfigProvider globalDict={globalDict}>
      <STable columns={columns} dataSource={data} pagination={false} />
    </SConfigProvider>
  );
};

describe('STable', () => {
  it('should render correctly', () => {
    const { container } = render(<STable />);
    expect(container).toMatchSnapshot();
  });

  it('should support dictKey', () => {
    const { getByText } = render(<TableDict />);

    waitFakeTimer();

    expect(getByText('字典数据1')).toBeInTheDocument();
  });
});
