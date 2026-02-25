import React from 'react';

import { Tag } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

// 模拟带有展开行功能的请求
const mockExpandedRequest = async (params: any) => {
  console.log('展开行功能请求参数:', params);

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
        position: ['前端工程师', '后端工程师', 'UI设计师', '产品经理'][i % 4],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'].slice(
          0,
          (i % 3) + 1,
        ),
        projects: [
          { id: 1, name: '项目A', status: '进行中', startDate: '2023-01-01' },
          { id: 2, name: '项目B', status: '已完成', startDate: '2023-02-01' },
        ],
      }),
    ),
  };
};

export default () => {
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
    {
      title: '职位',
      dataIndex: 'position',
      width: 120,
    },
    {
      title: '技能',
      dataIndex: 'skills',
      width: 200,
      render: (skills: string[]) => (
        <div>
          {skills.map((skill, index) => (
            <Tag key={index} color="blue" style={{ margin: '2px' }}>
              {skill}
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  return (
    <SSearchTable
      headTitle={{
        children: '展开行功能',
        desc: '演示如何在表格中添加展开行显示详细信息',
      }}
      tableTitle={{
        children: '用户列表',
      }}
      requestFn={mockExpandedRequest}
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
        scroll: { x: 1200 },
        expandable: {
          expandedRowRender: (record: any) => (
            <div>
              <h4>详细信息</h4>
              <p>
                <strong>职位:</strong> {record.position}
              </p>
              <p>
                <strong>技能:</strong> {record.skills.join(', ')}
              </p>

              <h4>参与项目</h4>
              <ul>
                {record.projects.map((project: any) => (
                  <li key={project.id}>
                    <strong>{project.name}</strong> - {project.status} (开始于{' '}
                    {project.startDate})
                  </li>
                ))}
              </ul>

              <h4>其他信息</h4>
              <p>
                <strong>入职日期:</strong>{' '}
                {new Date().toISOString().split('T')[0]}
              </p>
              <p>
                <strong>工号:</strong> EMP-
                {record.id.toString().padStart(4, '0')}
              </p>
            </div>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        },
      }}
    />
  );
};
