import React, { useRef } from 'react';

import { SSearchTableRef } from '@dalydb/sdesign';
import { Button, Form, Modal, Space, message } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  department: string;
  keyword: string;
  status: string;
}

// 模拟请求
const mockExternalFormRequest = async (
  params: Record<string, string | number | undefined>,
) => {
  console.log('外部表单请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const pageNum = Number(params.pageNum) || 1;
  const pageSize = Number(params.pageSize) || 10;

  return {
    pageNum,
    pageSize,
    totalSize: 45,
    dataList: Array.from(
      {
        length: Math.min(pageSize, 45 - (pageNum - 1) * pageSize),
      },
      (_, i) => ({
        id: (pageNum - 1) * pageSize + i + 1,
        name: `用户${(pageNum - 1) * pageSize + i + 1}`,
        age: Math.floor(Math.random() * 50) + 18,
        email: `user${(pageNum - 1) * pageSize + i + 1}@example.com`,
        department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
        // 使用搜索参数作为数据的一部分
        keyword: params.keyword || '',
        status: params.status || '',
      }),
    ),
  };
};

export default () => {
  // 外部创建的 Form 实例
  const [form] = Form.useForm();
  const tableRef = useRef<SSearchTableRef>(null);

  // 搜索表单配置
  const formItems: SFormItems[] = [
    {
      label: '关键词',
      name: 'keyword',
      type: 'input',
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: [
          { value: 'active', label: '活跃' },
          { value: 'inactive', label: '不活跃' },
          { value: 'pending', label: '待审核' },
        ],
      },
    },
  ];

  // 表格列配置
  const columns: SColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 120,
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      width: 120,
      render: (text: string) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (text: string) => {
        const statusMap: Record<string, string> = {
          active: '活跃',
          inactive: '不活跃',
          pending: '待审核',
        };
        return statusMap[text] || '-';
      },
    },
  ];

  // 外部操作 Form 实例
  const handleSetFormValues = () => {
    form.setFieldsValue({
      keyword: '测试用户',
      status: 'active',
    });
    message.success('已设置表单值');
  };

  const handleGetFormValues = () => {
    const values = form.getFieldsValue();
    Modal.info({
      title: '表单当前值',
      content: <pre>{JSON.stringify(values, null, 2)}</pre>,
    });
  };

  const handleResetForm = () => {
    form.resetFields();
    message.success('已重置表单');
    // 重置后刷新列表
    tableRef.current?.refresh();
  };

  const handleValidateAndSearch = async () => {
    try {
      await form.validateFields();
      message.success('验证通过，开始搜索');
      tableRef.current?.refresh();
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  return (
    <>
      <SSearchTable
        ref={tableRef}
        headTitle={{
          children: '外部表单实例演示',
          desc: '演示如何使用外部创建的 Form 实例',
        }}
        tableTitle={{
          children: '用户列表',
          actionNode: (
            <Space>
              <Button onClick={handleSetFormValues}>设置表单值</Button>
              <Button onClick={handleGetFormValues}>获取表单值</Button>
              <Button onClick={handleResetForm}>重置表单</Button>
              <Button type="primary" onClick={handleValidateAndSearch}>
                验证并搜索
              </Button>
            </Space>
          ),
        }}
        requestFn={mockExternalFormRequest}
        options={{}}
        formProps={{
          form, // 传入外部创建的 Form 实例
          items: formItems,
          columns: 2,
          showExpand: true,
          defaultExpand: false,
        }}
        tableProps={{
          columns,
          rowKey: 'id',
          scroll: { x: 1000 },
        }}
      />
    </>
  );
};
