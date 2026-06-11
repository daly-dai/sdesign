/**
 * title: 末行嵌入表格
 * description: Grid 模式下 render 返回的任意 JSX 都能在 Grid cell 中正确渲染——告别 table 嵌套 table 的问题。
 */
import type { SDetailItem, SDetailItemType } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import { Table, Tag } from 'antd';
import React from 'react';

const dataSource = {
  company: '某某科技有限公司',
  contact: '张三',
  phone: '138-0000-0001',
  address: '北京市海淀区中关村大街 1 号',
};

const orderColumns = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (s: string) => (
      <Tag color={s === '已完成' ? 'green' : 'orange'}>{s}</Tag>
    ),
  },
];

const orderData = [
  { orderNo: 'ORD-001', amount: '¥12,800', status: '已完成' },
  { orderNo: 'ORD-002', amount: '¥5,200', status: '进行中' },
];

const approvalColumns = [
  { title: '审批人', dataIndex: 'approver', key: 'approver' },
  { title: '节点', dataIndex: 'node', key: 'node' },
  { title: '意见', dataIndex: 'comment', key: 'comment' },
  { title: '时间', dataIndex: 'time', key: 'time' },
];

const approvalData = [
  {
    approver: '李四',
    node: '部门审批',
    comment: '同意',
    time: '2024-03-15',
  },
  {
    approver: '王五',
    node: '财务审批',
    comment: '预算合理，通过',
    time: '2024-03-16',
  },
];

const items: SDetailItem[] = [
  { label: '公司名称', name: 'company' },
  { label: '联系人', name: 'contact' },
  { label: '联系电话', name: 'phone' },
  { label: '地址', name: 'address' },
  {
    label: '关联订单',
    span: 2,
    render: () => (
      <Table
        columns={orderColumns}
        dataSource={orderData}
        rowKey="orderNo"
        pagination={false}
        size="small"
      />
    ),
  } as SDetailItemType,
  {
    label: '审批记录',
    span: 2,
    render: () => (
      <Table
        columns={approvalColumns}
        dataSource={approvalData}
        rowKey="approver"
        pagination={false}
        size="small"
      />
    ),
  } as SDetailItemType,
];

const Demo = () => (
  <SDetail
    title="客户详情（含关联表格）"
    dataSource={dataSource}
    items={items}
    columns={2}
    gap={16}
  />
);

export default Demo;
