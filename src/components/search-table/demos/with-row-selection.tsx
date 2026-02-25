import React, { useState } from 'react';

import { Button, Modal, Space } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟带有选择功能的请求
const mockSelectionRequest = async (params: any) => {
  console.log('选择功能请求参数:', params);

  // 模拟网络延迟
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // 模拟数据
  return {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    totalSize: 45,
    dataList: Array.from(
      {
        length: Math.min(
          params.pageSize || 10,
          45 - (params.pageNum - 1 || 0) * (params.pageSize || 10),
        ),
      },
      (_, i) => ({
        id: ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1,
        name: `用户${
          ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1
        }`,
        age: Math.floor(Math.random() * 50) + 18,
        email: `user${
          ((params.pageNum || 1) - 1) * (params.pageSize || 10) + i + 1
        }@example.com`,
        department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
      }),
    ),
  };
};

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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
  const columns: SColumnsType<any> = [
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
  ];

  // 批量操作
  const handleBatchOperation = () => {
    Modal.info({
      title: '批量操作',
      content: `已选中 ${selectedRowKeys.length} 个用户`,
    });
  };

  // 删除选中项
  const handleDeleteSelected = () => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
      onOk: () => {
        console.log('删除选中的用户:', selectedRowKeys);
        setSelectedRowKeys([]);
        Modal.success({
          title: '删除成功',
          content: `已成功删除 ${selectedRowKeys.length} 个用户`,
        });
      },
    });
  };

  return (
    <>
      <SSearchTable
        headTitle={{
          children: '行选择功能',
          desc: '演示如何在表格中添加行选择功能',
        }}
        tableTitle={{
          children: '用户列表',
          actionNode: (
            <Space>
              <Button
                type="primary"
                disabled={selectedRowKeys.length === 0}
                onClick={handleBatchOperation}
              >
                批量操作 ({selectedRowKeys.length})
              </Button>
              <Button
                danger
                disabled={selectedRowKeys.length === 0}
                onClick={handleDeleteSelected}
              >
                删除选中 ({selectedRowKeys.length})
              </Button>
            </Space>
          ),
        }}
        requestFn={mockSelectionRequest}
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
          scroll: { x: 800 },
          rowSelection: {
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            selections: [
              {
                key: 'all',
                text: '选择全部',
                onSelect: (changeableRowKeys) => {
                  setSelectedRowKeys(changeableRowKeys);
                },
              },
            ],
          },
        }}
      />

      <Modal
        title="批量操作详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <p>选中的用户ID: {selectedRowKeys.join(', ')}</p>
      </Modal>
    </>
  );
};
