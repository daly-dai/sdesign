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

**STableProps** extends Omit<TableProps<RecordType>, 'columns'> — STable 增强表格 Props 继承 antd Table 全部属性，扩展了字典映射、序号列、快捷 render 等能力。 `tsx <STable columns={[ { title: '姓名', dataIndex: 'name' }, { title: '状态', dataIndex: 'status', dictKey: 'userStatus' }, { title: '时间', dataIndex: 'createTime', render: 'datetime' }, ]} dataSource={data} isSeq /> `

- columns?: SColumnsType<RecordType> — 列定义，支持 dictKey 和字符串 render
- isSeq?: boolean — 是否显示序号列
- current?: number — 当前页码（用于序号计算）
- pageSize?: number — 每页条数（用于序号计算）

**DataType**

- dataIndex: React.Key
- title: string
- width: number
- dictKey?: string | undefined
- render: () => void

**RenderType** — 列 render 快捷类型 在 columns 的 render 中可直接传字符串： - `'datetime'` — 渲染为日期时间格式 - `'date'` — 渲染为日期格式 - `'ellipsis'` — 超出省略显示: `(typeof RenderTypes)[number]`

**SColumnsType** — STable 列定义类型: `SColumn<RecordType>[]`
