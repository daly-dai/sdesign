/**
 * title: 不对称跨列布局
 * description: Grid 模式下 span 可灵活控制每行的列分布——首行占满、中行两列、末行半宽留白。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  title: '项目立项申请 - PRJ20240001',
  applicant: '张三',
  department: '技术部',
  budget: '¥500,000',
  remark: '预算已通过财务初审，待部门负责人终审',
};

const items: SDetailItem[] = [
  // 第一行：占满整行
  { label: '项目名称', name: 'title', span: 2 },
  // 第二行：正常两列
  { label: '申请人', name: 'applicant' },
  { label: '所属部门', name: 'department' },
  // 第三行：仅占 50%，右侧留白
  { label: '预算金额', name: 'budget', span: 1 },
];

const Demo = () => (
  <SDetail
    title="不对称跨列示例"
    dataSource={dataSource}
    items={items}
    columns={2}
    gap={16}
  />
);

export default Demo;
