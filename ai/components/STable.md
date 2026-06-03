# STable — 增强表格，支持 dictKey 字典映射、render 快捷类型、序号列

## 使用边界

**适用场景:**

- 需要展示列表数据的表格
- 需要 dictKey 字典映射自动转换列值
- 需要 render 快捷类型（datetime/date/ellipsis）
- 需要自动序号列（isSeq）
  **不适用:**
- 列表页同时需要搜索条件 + 表格 + 分页联动，应使用 SSearchTable
- 纯键值对展示（非列表），应使用 SDetail
  **优先使用:**
- SSearchTable → 搜索 + 表格 + 分页一体化场景

## 类型定义

**RenderType** — 列 render 快捷类型 在 columns 的 render 中可直接传字符串： - `'datetime'` — 渲染为日期时间格式 - `'date'` — 渲染为日期格式 - `'ellipsis'` — 超出省略显示: `(typeof RenderTypes)[number]`

**SColumnsType** — STable 列定义类型: `SColumn<RecordType>[]`

## 使用示例

```tsx
import type { SColumnsType } from '@dalydb/sdesign';
import { SConfigProvider, STable } from '@dalydb/sdesign';
import { Tag } from 'antd';
import React from 'react';

interface User {
  id: number;
  name: string;
  status: string;
  time: string;
}

const globalDict = { userStatus: { active: '活跃', inactive: '未激活' } };

const data: User[] = [
  { id: 1, name: '张三', status: 'active', time: new Date().toISOString() },
  {
    id: 2,
    name: '李四',
    status: 'inactive',
    time: new Date(Date.now() - 86400000).toISOString(),
  },
];

const columns: SColumnsType<User> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
  { title: '创建时间', dataIndex: 'time', render: 'datetime' },
  { title: '操作', render: () => <Tag color="blue">查看</Tag> },
];

export default () => (
  <SConfigProvider globalDict={globalDict}>
    <STable
      columns={columns}
      dataSource={data}
      rowKey="id"
      isSeq
      pagination={{ pageSize: 10 }}
    />
  </SConfigProvider>
);
```
