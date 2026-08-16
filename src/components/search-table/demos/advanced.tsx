import React, { useState } from 'react';

import { Button, Modal, Space, Tag } from 'antd';
import { SFormItems } from '../../form/types';
import { SColumnsType } from '../../table/types';
import SSearchTable from '../index';

interface Project {
  id: number;
  name: string;
  role: string;
}

interface Employee {
  id: number;
  name: string;
  department: number;
  position: string;
  salary: number;
  entryDate: string;
  roles: string[];
  skills: string[];
  performance: number;
  projects: Project[];
}

// 模拟数据 - 包含更复杂的结构
const generateAdvancedMockData = (current: number, pageSize: number) => {
  const list = [];
  const total = 30;
  const startIndex = (current - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const roleList = ['管理员', '编辑', '查看员', '审核员'];

  for (let i = startIndex; i < endIndex; i++) {
    const roles = [];
    const roleCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < roleCount; j++) {
      roles.push(roleList[Math.floor(Math.random() * roleList.length)]);
    }

    const skills: string[] = [];
    const skillCount = Math.floor(Math.random() * 4) + 1;
    const skillList = [
      'React',
      'Vue',
      'Node.js',
      'Python',
      'Java',
      'UI设计',
      '产品经理',
    ];
    for (let j = 0; j < skillCount; j++) {
      const skill = skillList[Math.floor(Math.random() * skillList.length)];
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    }

    list.push({
      id: i + 1,
      name: `员工${i + 1}`,
      department: Math.floor(Math.random() * 5) + 1,
      position: `职位${i + 1}`,
      salary: Math.floor(Math.random() * 10000) + 5000,
      entryDate: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      roles: roles,
      skills: skills,
      performance: Math.floor(Math.random() * 5) + 1,
      projects: [
        { id: 1, name: '项目A', role: '开发' },
        { id: 2, name: '项目B', role: '测试' },
      ],
    });
  }

  return {
    list,
    current,
    pageSize,
    total,
  };
};

// 模拟请求
const advancedMockRequest = async (
  params: Record<string, string | number | undefined>,
) => {
  console.log('高级搜索请求参数:', params);

  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  return generateAdvancedMockData(
    Number(params.current) || 1,
    Number(params.pageSize) || 10,
  );
};

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Employee | null>(null);

  // 高级搜索表单配置
  const advancedFormItems: SFormItems[] = [
    {
      label: '员工姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '部门',
      name: 'department',
      type: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '技术部' },
          { value: 2, label: '产品部' },
          { value: 3, label: '设计部' },
          { value: 4, label: '运营部' },
          { value: 5, label: '市场部' },
        ],
      },
    },
    {
      label: '职位',
      name: 'position',
      type: 'input',
    },
    {
      label: '入职日期',
      name: 'entryDate',
      type: 'datePicker',
    },
    {
      label: '薪资范围',
      name: 'salary',
      type: 'inputNumber',
    },
    {
      label: '绩效评分',
      name: 'performance',
      type: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '1分' },
          { value: 2, label: '2分' },
          { value: 3, label: '3分' },
          { value: 4, label: '4分' },
          { value: 5, label: '5分' },
        ],
      },
    },
  ];

  // 处理查看详情
  const handleViewDetails = (record: Employee) => {
    setCurrentRecord(record);
    setModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: Employee) => {
    console.log('编辑员工:', record);
  };

  // 处理批量操作
  const handleBatchOperation = () => {
    console.log('批量操作选中的员工:', selectedRowKeys);
    Modal.info({
      title: '批量操作',
      content: `已选中 ${selectedRowKeys.length} 名员工`,
    });
  };

  // 高级表格列配置
  const advancedColumns: SColumnsType<Employee> = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 100,
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: 120,
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      width: 100,
      render: (salary: number) => {
        return `¥${salary.toLocaleString()}`;
      },
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
      width: 150,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 150,
      render: (roles: string[]) => {
        return (
          <div>
            {roles.map((role, index) => (
              <Tag
                key={index}
                color={index % 2 === 0 ? 'blue' : 'green'}
                style={{ marginBottom: 4 }}
              >
                {role}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: '技能',
      dataIndex: 'skills',
      width: 200,
      render: (skills: string[]) => {
        return (
          <div>
            {skills.map((skill, index) => (
              <Tag
                key={index}
                color="orange"
                style={{ marginBottom: 4, marginRight: 4 }}
              >
                {skill}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record: Employee) => {
        return (
          <Space>
            <Button type="link" onClick={() => handleViewDetails(record)}>
              详情
            </Button>
            <Button type="link" onClick={() => handleEdit(record)}>
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <SSearchTable
        headTitle={{
          children: '员工管理系统',
          desc: '高级员工信息管理，支持复杂搜索条件和批量操作',
        }}
        tableTitle={{
          children: '员工详细列表',
          actionNode: (
            <>
              <Button type="primary" style={{ marginRight: 8 }}>
                新增员工
              </Button>
              <Button
                disabled={selectedRowKeys.length === 0}
                onClick={handleBatchOperation}
              >
                批量操作 ({selectedRowKeys.length})
              </Button>
            </>
          ),
        }}
        requestFn={advancedMockRequest}
        options={{
          paginationFields: {
            current: 'current',
            pageSize: 'pageSize',
            total: 'total',
            list: 'list',
          },
        }}
        formProps={{
          items: advancedFormItems,
          columns: 3,
          showExpand: true,
          defaultExpand: false,
        }}
        tableProps={{
          columns: advancedColumns,
          rowKey: 'id',
          scroll: { x: 1500 },
          rowSelection: {
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          },
          expandable: {
            expandedRowRender: (record: Employee) => {
              return (
                <div>
                  <h4>参与项目:</h4>
                  <ul>
                    {record.projects.map((project: Project) => (
                      <li key={project.id}>
                        {project.name} - {project.role}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          },
        }}
      />

      {/* 员工详情弹窗 */}
      <Modal
        title="员工详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>,
        ]}
      >
        {currentRecord && (
          <div>
            <p>
              <strong>姓名:</strong> {currentRecord.name}
            </p>
            <p>
              <strong>部门:</strong> {currentRecord.department}
            </p>
            <p>
              <strong>职位:</strong> {currentRecord.position}
            </p>
            <p>
              <strong>薪资:</strong> ¥{currentRecord.salary.toLocaleString()}
            </p>
            <p>
              <strong>入职日期:</strong>{' '}
              {new Date(currentRecord.entryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>角色:</strong> {currentRecord.roles.join(', ')}
            </p>
            <p>
              <strong>技能:</strong> {currentRecord.skills.join(', ')}
            </p>
            <p>
              <strong>绩效评分:</strong> {'★'.repeat(currentRecord.performance)}
              {'☆'.repeat(5 - currentRecord.performance)}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};
