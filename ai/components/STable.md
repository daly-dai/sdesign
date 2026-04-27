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

## 继承关系

继承自 **antd Table** 的全部属性，以下属性已被覆盖：columns

其他 antd Table 属性均可直接使用。

## 类型定义

**STableProps** extends Omit<TableProps<RecordType>, 'columns'> (继承自 antd Table，覆盖: columns) — STable 增强表格 Props 继承 antd Table 全部属性，扩展了字典映射、序号列、快捷 render 等能力。 `tsx <STable columns={[ { title: '姓名', dataIndex: 'name' }, { title: '状态', dataIndex: 'status', dictKey: 'userStatus' }, { title: '时间', dataIndex: 'createTime', render: 'datetime' }, ]} dataSource={data} isSeq /> `

- columns?: SColumnsType<RecordType> — 列定义，支持 dictKey 和字符串 render
- isSeq?: boolean — 是否显示序号列
- current?: number — 当前页码（用于序号计算）
- pageSize?: number — 每页条数（用于序号计算）

**SColumn** extends Omit<ColumnType<RecordType>, 'render'> (继承自 antd ColumnType，覆盖: render) — STable 列定义 继承 antd ColumnType（排除 render），扩展字典映射、快捷渲染和列分组能力。 使用 interface 消除联合类型推断问题，确保 fixed/render 等属性字面量正确推断。

- dictKey?: string — 字典映射 key，配合 SConfigProvider 的 globalDict 自动转换
- render?: ColumnType<RecordType>['render'] | RenderType — 列渲染器 除标准 render 函数外，支持字符串快捷类型: - `'datetime'` — 渲染为日期时间 - `'date'` — 渲染为日期 - `'ellipsis'` — 超出省略
- children?: SColumn<RecordType>[] — 子列定义（列分组）

**RenderType** — 列 render 快捷类型 在 columns 的 render 中可直接传字符串： - `'datetime'` — 渲染为日期时间格式 - `'date'` — 渲染为日期格式 - `'ellipsis'` — 超出省略显示: `(typeof RenderTypes)[number]`

**SColumnsType** — STable 列定义类型: `SColumn<RecordType>[]`

## 使用示例

```tsx
import { Tag } from 'antd';
import React from 'react';
import { SConfigProvider, STable } from '@dalydb/sdesign';
import type { SColumnsType } from '@dalydb/sdesign';

const globalDict = { userStatus: { active: '活跃', inactive: '未激活' } };

const data = [
  { id: 1, name: '张三', status: 'active', time: new Date().toISOString() },
  {
    id: 2,
    name: '李四',
    status: 'inactive',
    time: new Date(Date.now() - 86400000).toISOString(),
  },
];

const columns: SColumnsType<any> = [
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
