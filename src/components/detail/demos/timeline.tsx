/**
 * title: 时间轴式
 * description: Timeline + 多个小 SDetail 实例，测试多实例渲染性能和数据隔离。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import { Timeline } from 'antd';
import React from 'react';

const log1 = {
  operator: '张三',
  action: '提交申请',
  time: '2024-03-15 10:00',
  remark: '首次提交',
};
const log2 = {
  operator: '李四',
  action: '部门审批',
  time: '2024-03-16 14:30',
  remark: '审核通过',
};
const log3 = {
  operator: '王五',
  action: '财务审批',
  time: '2024-03-17 09:00',
  remark: '预算确认无误',
};

const logItems: SDetailItem[] = [
  { label: '操作人', name: 'operator' },
  { label: '操作', name: 'action' },
  { label: '时间', name: 'time' },
  { label: '备注', name: 'remark' },
];

const logs = [log1, log2, log3];

const Demo = () => (
  <Timeline
    items={logs.map((log, i) => ({
      key: i,
      children: <SDetail dataSource={log} items={logItems} columns={2} />,
    }))}
  />
);

export default Demo;
