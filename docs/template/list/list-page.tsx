/**
 * title: 基础列表页面开发模板
 * background: rgba(42, 46, 54, 0.04)
 */
import { Button, Form, Space, TableColumnsType } from 'antd';
import React from 'react';

import { SCard, SForm, SFormItems, STable, STitle } from '@dalydb/sdesign';
import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';

const mockRequest = async () => {
  return {
    dataSource: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  };
};

// 查询表单配置
const formItems: SFormItems[] = [
  {
    label: '查询',
    name: 'data',
    type: 'input',
  },
  {
    label: '查询2',
    name: 'data1',
    type: 'input',
  },
];

// 表格配置
const columns: TableColumnsType<any> = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '操作',
    key: 'action',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_text: any, _record: any) => {
      return (
        <Space>
          <Button type="link">详情</Button>
          <Button type="link">编辑</Button>
        </Space>
      );
    },
  },
];

export default () => {
  const [form] = Form.useForm();

  const { getPageData, dataSource, handleReset, pagination } = useSearchTable({
    // 接口地址需自定义
    requestFn: mockRequest,
    form,
  });

  return (
    <>
      <STitle>模板标题</STitle>
      <SForm.Search
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
      ></SForm.Search>

      <SCard>
        <STitle type="table">查询结果</STitle>
        <STable
          isSeq
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
        ></STable>
      </SCard>
    </>
  );
};
