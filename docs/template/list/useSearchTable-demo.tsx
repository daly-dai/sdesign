/**
 * title: useSearchTable 测试示例
 * desc: 演示 useSearchTable hook 的各种使用场景，包括新的 API 设计
 */
import { Button, Form, Input, Space, Table, TableColumnsType } from 'antd';
import React from 'react';

import useSearchTable from '@dalydb/sdesign/hooks/useSearchTable';

// 模拟不同格式的 API 响应
const mockApis = {
  // 标准格式 (默认配置)
  standard: async (params: any) => {
    console.log('Standard API params:', params);
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
        }),
      ),
    };
  },

  // 自定义字段格式
  custom: async (params: any) => {
    console.log('Custom API params:', params);
    return {
      page: params.page || 1,
      limit: params.limit || 10,
      totalCount: 45,
      items: Array.from(
        {
          length: Math.min(
            params.limit || 10,
            45 - (params.page - 1 || 0) * (params.limit || 10),
          ),
        },
        (_, i) => ({
          id: ((params.page || 1) - 1) * (params.limit || 10) + i + 1,
          name: `用户${
            ((params.page || 1) - 1) * (params.limit || 10) + i + 1
          }`,
          age: Math.floor(Math.random() * 50) + 18,
          email: `user${
            ((params.page || 1) - 1) * (params.limit || 10) + i + 1
          }@example.com`,
        }),
      ),
    };
  },

  // 需要参数转换的格式
  transformed: async (params: any) => {
    console.log('Transformed API params:', params);
    // 模拟后端需要 0-based 页码和不同的参数名
    return {
      current_page: params.page - 1, // 0-based
      per_page: params.limit,
      total_count: 45,
      data: {
        items: Array.from(
          {
            length: Math.min(
              params.limit || 10,
              45 - (params.page - 1) * (params.limit || 10),
            ),
          },
          (_, i) => ({
            id: (params.page - 1) * (params.limit || 10) + i + 1,
            name: `用户${(params.page - 1) * (params.limit || 10) + i + 1}`,
            age: Math.floor(Math.random() * 50) + 18,
            email: `user${
              (params.page - 1) * (params.limit || 10) + i + 1
            }@example.com`,
          }),
        ),
      },
    };
  },
};

const columns: TableColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

export default () => {
  // 新 API 用法 - 标准格式（推荐）- 使用返回的 form 实例
  const standardTable = useSearchTable(mockApis.standard, {
    // 不需要手动传入 form，使用 hook 返回的 form 实例
  });

  // 新 API 用法 - 自定义分页字段 - 使用返回的 form 实例
  const customTable = useSearchTable(mockApis.custom, {
    paginationFields: {
      current: 'page',
      pageSize: 'limit',
      total: 'totalCount',
      list: 'items',
    },
  });

  // 新 API 用法 - 带参数和响应转换 - 使用返回的 form 实例
  const transformedTable = useSearchTable(mockApis.transformed, {
    paginationFields: {
      current: 'current_page',
      pageSize: 'per_page',
      total: 'total_count',
      list: 'data.items',
    },
    transformRequestParams: (params) => {
      // 转换为后端需要的格式
      return {
        ...params,
        page: params.page || 1,
        limit: params.limit || 10,
        sort: 'created_at',
        order: 'desc',
      };
    },
    transformResponseData: (response) => {
      // 转换响应格式为标准格式
      return {
        pageNum: response.current_page + 1, // 转回 1-based
        pageSize: response.per_page,
        totalSize: response.total_count,
        dataList: response.data.items,
      };
    },
  });

  const tables = [
    {
      title: '标准格式 (新 API - 推荐)',
      tableProps: standardTable.tableProps,
      form: standardTable.form,
      formConfig: standardTable.formConfig, // 使用新的配置对象
    },
    {
      title: '自定义字段格式 (新 API)',
      tableProps: customTable.tableProps,
      form: customTable.form,
      formConfig: customTable.formConfig, // 使用新的配置对象
    },
    {
      title: '带转换的格式 (新 API)',
      tableProps: transformedTable.tableProps,
      form: transformedTable.form,
      formConfig: transformedTable.formConfig, // 使用新的配置对象
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>useSearchTable Hook 测试示例</h2>
      <p>
        <strong>新特性：</strong>API 设计现在与 <code>useRequest</code>{' '}
        保持一致！
      </p>
      <p>
        <code>useSearchTable(requestFn, options)</code> -
        第一个参数是请求函数，第二个参数是配置选项
      </p>
      <p>
        <strong>重要更新：</strong>现在 hook 会自动返回 form
        实例，无需手动创建！
      </p>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}
      >
        {tables.map((table, index) => (
          <div key={index} style={{ border: '1px solid #f0f0f0', padding: 16 }}>
            <h3>{table.title}</h3>
            {/* 使用每个表格自己的 form 实例和配置 */}
            <Form
              form={table.form}
              layout="inline"
              onFinish={table.formConfig.onFinish}
              style={{ marginBottom: 16 }}
            >
              <Form.Item name="name" label="姓名">
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" size="small">
                    搜索
                  </Button>
                  <Button onClick={table.formConfig.onReset} size="small">
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
            <Table
              size="small"
              columns={columns}
              {...table.tableProps}
              scroll={{ y: 200 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
