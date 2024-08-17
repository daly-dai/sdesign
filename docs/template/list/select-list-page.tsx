/**
 * title: 多选列表功能页面
 * background: rgba(42, 46, 54, 0.04)
 */
import { Button, Form, TableColumnsType } from 'antd';
import React, { useState } from 'react';

import { SCard, SForm, SFormItems, STable, STitle } from '@daly/sdesign';
import useSearchTable from '@daly/sdesign/hooks/useSearchTable';

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
        <>
          <Button type="link">详情</Button>
          <Button type="link">编辑</Button>
        </>
      );
    },
  },
];

// todo  loading,多选,依赖某个参数更新，弹框模板，导出功能，入库申请审核
export default () => {
  const [form] = Form.useForm();

  const { getPageData, dataSource, pagination, handleReset } = useSearchTable({
    // 接口地址需自定义
    requestFn: mockRequest,
    form,
  });

  // 多选的值
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  // 多选出发事件
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <>
      <STitle>模板标题</STitle>
      <SForm.Search
        hasCardBg
        items={formItems}
        form={form}
        onFinish={getPageData}
        onReset={handleReset}
      ></SForm.Search>

      <SCard>
        <STitle type="table">查询结果</STitle>
        <STable
          isSeq
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
        ></STable>
      </SCard>
    </>
  );
};
