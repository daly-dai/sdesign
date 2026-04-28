import React, { useRef, useState } from 'react';

import { Button, Modal, Space, message } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';
import { SSearchTableRef } from '../types';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  department: string;
}

// 模拟数据存储
let mockDataList = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: Math.floor(Math.random() * 50) + 18,
  email: `user${i + 1}@example.com`,
  department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
}));

// 模拟请求 - 支持删除和刷新
const mockDeleteRequest = async (
  params: Record<string, string | number | undefined>,
) => {
  console.log('请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const pageNum = Number(params.pageNum) || 1;
  const pageSize = Number(params.pageSize) || 10;
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, mockDataList.length);

  return {
    pageNum,
    pageSize,
    totalSize: mockDataList.length,
    dataList: mockDataList.slice(startIndex, endIndex),
  };
};

// 模拟删除 API
const mockDeleteItem = async (id: number) => {
  console.log('删除ID:', id);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // 删除数据
  mockDataList = mockDataList.filter((item) => item.id !== id);

  return { success: true };
};

// 模拟批量删除 API
const mockBatchDelete = async (ids: React.Key[]) => {
  console.log('批量删除IDs:', ids);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  // 删除数据
  mockDataList = mockDataList.filter((item) => !ids.includes(item.id));

  return { success: true };
};

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const tableRef = useRef<SSearchTableRef>(null);

  // 搜索表单配置
  const formItems: SFormItems[] = [
    {
      label: '用户名',
      name: 'username',
      type: 'input',
    },
    {
      label: '部门',
      name: 'department',
      type: 'select',
      fieldProps: {
        options: [
          { value: '技术部', label: '技术部' },
          { value: '产品部', label: '产品部' },
          { value: '设计部', label: '设计部' },
          { value: '运营部', label: '运营部' },
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
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record: User) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              Modal.confirm({
                title: '确认删除',
                content: `确定要删除用户 "${record.name}" 吗？`,
                onOk: async () => {
                  try {
                    await mockDeleteItem(record.id);
                    message.success('删除成功');
                    // 删除后刷新列表
                    tableRef.current?.refresh();
                  } catch (error) {
                    message.error('删除失败');
                  }
                },
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 批量删除
  const handleBatchDelete = () => {
    Modal.confirm({
      title: '确认批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
      onOk: async () => {
        try {
          await mockBatchDelete(selectedRowKeys);
          message.success('批量删除成功');
          setSelectedRowKeys([]);
          // 删除后刷新列表
          tableRef.current?.refresh();
        } catch (error) {
          message.error('批量删除失败');
        }
      },
    });
  };

  return (
    <>
      <SSearchTable
        ref={tableRef}
        headTitle={{
          children: '删除功能演示',
          desc: '演示删除数据后如何刷新列表',
        }}
        tableTitle={{
          children: '用户列表',
          actionNode: (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  message.info('添加用户功能');
                }}
              >
                添加用户
              </Button>
              <Button
                danger
                disabled={selectedRowKeys.length === 0}
                onClick={handleBatchDelete}
              >
                批量删除 ({selectedRowKeys.length})
              </Button>
              <Button
                onClick={() => {
                  // 手动刷新
                  tableRef.current?.refresh();
                  message.info('已刷新列表');
                }}
              >
                刷新
              </Button>
              <Button
                onClick={() => {
                  // 重置搜索条件并刷新
                  tableRef.current?.reset();
                  message.info('已重置搜索条件');
                }}
              >
                重置
              </Button>
            </Space>
          ),
        }}
        requestFn={mockDeleteRequest}
        options={{}}
        formProps={{
          items: formItems,
          columns: 2,
          showExpand: true,
          defaultExpand: false,
        }}
        tableProps={{
          columns,
          rowKey: 'id',
          scroll: { x: 900 },
          rowSelection: {
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          },
        }}
      />
    </>
  );
};
