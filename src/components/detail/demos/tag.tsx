/**
 * title: Tag 标签渲染
 * description: type='tag' 配合 tagColorMap 和 dictMap，自动渲染彩色 Tag。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  name: '张三',
  status: '1',
  level: 'vip',
  tags: 'tech,leader',
};

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  {
    label: '状态',
    name: 'status',
    type: 'tag',
    dictMap: { '1': '启用', '0': '禁用' },
    tagColorMap: { '1': 'green', '0': 'red' },
  },
  {
    label: '等级',
    name: 'level',
    type: 'tag',
    dictMap: { vip: 'VIP', normal: '普通' },
    tagColorMap: { vip: 'gold', normal: 'default' },
  },
  {
    label: '标签',
    name: 'tags',
    type: 'tag',
    dictMap: { tech: '技术', leader: '负责人', design: '设计' },
    tagColorMap: { tech: 'blue', leader: 'purple', design: 'cyan' },
  },
];

const Demo = () => (
  <SDetail title="员工信息" dataSource={dataSource} items={items} columns={2} />
);

export default Demo;
