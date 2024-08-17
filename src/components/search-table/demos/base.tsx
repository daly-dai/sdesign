import set from 'lodash/set';
import React from 'react';

import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

const dataList = [
  {
    id: 1,
    name: 'John Brown',
    age: 32,
  },
  {
    id: 2,
    name: 'Jim Green',
    age: 42,
  },
  {
    id: 3,
    name: 'Joe Black',
    age: 32,
  },
  { id: 4, name: 'Jim Red', age: 32 },
  { id: 5, name: 'Jim Red', age: 32 },
  { id: 6, name: 'Jim Red', age: 32 },
  { id: 7, name: 'Jim Red', age: 32 },
  { id: 8, name: 'Jim Red', age: 32 },
  { id: 9, name: 'Jim Red', age: 32 },
  { id: 10, name: 'Jim Red', age: 32 },
  { id: 11, name: 'Jim Red', age: 32 },
  { id: 12, name: 'Jim Red', age: 32 },
];
const mockRequest = async (params: any) => {
  console.log(params, 'params');

  return {
    dataList,
    pageNum: 1,
    pageSize: 10,
    total: 2,
  };
};

export default () => {
  const formItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
    },
    {
      label: '年龄',
      name: 'age',
    },
  ];

  const columns: SColumnsType<any> = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
  ];

  // 对返回的数据进行二次处理
  const handleDataSource = (data: any) => {
    console.log(data, 'data');
    set(data[0], 'name', '333');

    return data;
  };

  // 对传参进行二次处理
  const dispatchParams = (params: any) => {
    params.name = '123';
    params.age = '123';
    return params;
  };

  return (
    <SSearchTable
      service={mockRequest}
      // 设置额外请求参数
      extraParams={{
        total: 1,
      }}
      dispatchParams={dispatchParams}
      handleDataSource={handleDataSource}
      columns={columns}
      searchItems={formItems}
    />
  );
};
