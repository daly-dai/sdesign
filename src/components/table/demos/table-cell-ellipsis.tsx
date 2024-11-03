/**
 * title: Table内容区域单独一行展示
 * description: 传入宽度width
 */

import { Button, Space } from 'antd';
import React from 'react';

import { SColumnsType, STable } from '@dalydb/sdesign';

const STableCellEllipsis = () => {
  const data: any = [
    {
      groupNo: '001',
      groupName: '过氧化酶',
      projectNum: 2,
      planCategory: '2024_01/2024_0101',
      planCategoryName: '基础研究计划自然科学基金/杰出青年基金项目',
      selectionMethod: 'all_candidates',
      saveType: 'submit',
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
      operateFlag: true,
    },
  ];

  const columns: SColumnsType<any> = [
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
      width: 120,
    },
    {
      title: '计划类别',
      dataIndex: 'planCategoryName',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'planCategoryName',
      render: () => {
        return (
          <Space>
            <Button type="link">项目列表</Button>
            <Button type="link">设置</Button>
            {/* <Button type="link">专家遴选</Button>
            <Button type="link">删除</Button> */}
          </Space>
        );
      },
    },
  ];

  return (
    <STable
      columns={columns}
      dataSource={data || []}
      scroll={{ x: 500 }}
      isSeq={true}
      // current={2}
      // pageSize={5}
    />
  );
};

export default STableCellEllipsis;
