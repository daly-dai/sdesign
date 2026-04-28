/**
 * title: Table内容区域单独一行展示
 * description: 传入宽度width
 */

import { Button, Space } from 'antd';
import React from 'react';

import { SColumnsType, STable } from '@dalydb/sdesign';

interface Group {
  groupNo: string;
  groupName: string;
  projectNum: number;
  planCategory: string;
  planCategoryName: string;
  selectionMethod: string;
  saveType: string;
  createTime: string;
  operateFlag: boolean;
}

const STableCellEllipsis = () => {
  const data: Group[] = [
    {
      groupNo: '001',
      groupName: '过氧化酶',
      projectNum: 2,
      planCategory: '2024_01/2024_0101',
      planCategoryName: '基础研究计划自然科学基金/杰出青年基金项目',
      selectionMethod: 'all_candidates',
      saveType: 'submit',
      // 时间戳：1678447600000
      createTime: '1678447600000',
      operateFlag: true,
    },
    {
      groupNo: 'group003',
      groupName: '分组测试',
      projectNum: 1,
      planCategory: '2024_01/2024_0102',
      planCategoryName: '基础研究计划自然科学基金/面上项目',
      selectionMethod: 'machine_candidates',
      saveType: 'save',
      createTime: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      operateFlag: false,
    },
    {
      groupNo: 'group2',
      groupName: '新建分组二',
      projectNum: 2,
      planCategory: '2024_01/2024_0101',
      planCategoryName: '基础研究计划自然科学基金/杰出青年基金项目',
      selectionMethod: 'all_candidates',
      saveType: 'submit',
      createTime: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      operateFlag: false,
    },
    {
      groupNo: 'group001',
      groupName: '杰出青年基金项目分组',
      projectNum: 2,
      planCategory: '2024_01/2024_0101',
      planCategoryName: '基础研究计划自然科学基金/杰出青年基金项目',
      selectionMethod: 'all_candidates',
      saveType: 'submit',
      createTime: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toISOString(),
      operateFlag: true,
    },
  ];

  const columns: SColumnsType<Group> = [
    {
      title: '分组名称',
      dataIndex: 'groupName',
      width: 120,
    },
    {
      title: '编号',
      dataIndex: 'groupNo',
      width: 120,
    },
    {
      title: '项目数量',
      dataIndex: 'projectNum',
      dictKey: 'projectNum',
      width: 60,
    },
    {
      title: '计划类别',
      dataIndex: 'planCategoryName',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime',
    },
    {
      title: '操作',
      dataIndex: 'planCategoryName',
      render: () => {
        return (
          <Space>
            <Button type="link">项目列表</Button>
            <Button type="link">设置</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <STable columns={columns} dataSource={data || []} scroll={{ x: 700 }} />
  );
};

export default STableCellEllipsis;
