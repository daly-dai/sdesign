# SProTable — SProTable

## 使用边界

**适用场景:**

- 管理后台标准列表页（搜索条件 + 数据表格 + 分页）
- 搜索、分页、数据加载需要自动联动的场景
- 新项目优先使用 SProTable
  **不适用:**
- 纯展示表格，无搜索条件，直接用 STable
- 需要完全自定义搜索区域布局，退回 useSearchTable + SForm.Search + STable
- 表格数据不来自接口请求（如本地静态数据）
  **优先使用:**
- useSearchTable + SForm.Search + STable → 多 Tab、多表格等复杂交互场景
- SSearchTable → 历史项目兼容

## 类型定义

**SProTableRef** — SProTable Ref 方法

- refresh: () => void — 刷新当前页
- reset: () => void — 重置搜索条件并刷新

**RequestConfig** — 请求配置，service + options 收拢到一处

- service: ProService — 数据请求函数（必填）
- options?: Omit<UseProTableOptions, 'form'> — useProTable 请求配置

## 使用示例

```tsx
/**
 * background: '#f6f7f9'
 * title: 基础用法 — 最简单的列表页，搜索 + 表格 + 分页，表格无标题
 */

import React from 'react';

import { SProTable } from '@dalydb/sdesign';
import type { SColumnsType } from '@dalydb/sdesign';

interface User {
  id: number;
  name: string;
  email: string;
  status: number;
  createTime: string;
}

const mockData: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3,
  createTime: new Date(Date.now() - i * 86400000).toISOString(),
}));

const mockRequest = async (params: Record<string, unknown>) => {
  await new Promise((r) => {
    setTimeout(r, 400);
  });
  const pageNum = Number(params.pageIndex) || 1;
  const pageSize = 10;
  const start = (pageNum - 1) * pageSize;
  return {
    list: mockData.slice(start, start + pageSize),
    total: mockData.length,
  };
};

export default () => {
  const columns: SColumnsType<User> = [
    { title: '姓名', dataIndex: 'name', width: 120 },
    { title: '邮箱', dataIndex: 'email', width: 200 },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <SProTable<User>
        request={{ service: mockRequest }}
        searchItems={[
          { label: '关键词', name: 'keyword', type: 'input' as const },
        ]}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
```
