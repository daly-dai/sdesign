# SSearchTable — SForm.Search + STable 一体化，列表页首选

## 使用边界

**适用场景:**

- 管理后台标准列表页（搜索条件 + 数据表格 + 分页）
- 搜索、分页、数据加载需要自动联动的场景
  **不适用:**
- 纯展示表格，无搜索条件，直接用 STable
- 需要完全自定义搜索区域布局（非表单式搜索）
- 表格数据不来自接口请求（如本地静态数据）
  **优先使用:**
- STable + SForm.Search + useSearchTable → 需要更精细控制搜索和表格的布局、交互时

## 类型定义

**SearchTableProps** — SSearchTable 搜索表格组件 Props 集成 SForm.Search + STable 的一体化组件，是管理后台列表页的首选方案。 自动处理搜索、分页、数据加载的联动逻辑。 `tsx <SSearchTable headTitle={{ children: '用户管理' }} requestFn={async (params) => { const res = await api.getUsers(params); return { dataList: res.list, totalSize: res.total }; }} formProps={{ items: [ { label: '姓名', name: 'name', type: 'input' }, { label: '状态', name: 'status', type: 'select', fieldProps: { options } }, ], columns: 3, }} tableProps={{ columns: [ { title: '姓名', dataIndex: 'name' }, { title: '创建时间', dataIndex: 'createTime', render: 'datetime' }, ], rowKey: 'id', }} /> `

- headTitle?: STitleProps — 页面顶部标题配置
- tableTitle?: STitleProps — 表格区域标题配置
- requestFn: (data?: any) => Promise<any> — 数据请求函数 接收搜索参数 + 分页参数，返回包含列表数据和总数的对象。 默认期望返回结构: `{ list, total, pageIndex, pageSize }` 如后端字段名不同，通过 options.paginationFields 配置映射： - current: 页码字段名（默认 'pageIndex'） - pageSize: 每页条数字段名（默认 'pageSize'） - total: 总数字段名（默认 'total'） - list: 列表字段名（默认 'list'） 后端返回 { records, totalCount, pageNum, pageSize } options={{ paginationFields: { current: 'pageNum', list: 'records', total: 'totalCount' } }}
- options?: Omit<useSearchTableOptions, 'form'> — useSearchTable 的配置选项
- tableProps?: STableProps<any> — 表格 props，会合并到 useSearchTable 返回的 tableProps 中
- formProps?: SearchProps — 搜索表单 props，透传给 SForm.Search
- tableCardProps?: SCardProps — 表格卡片 props，透传给 SCard

**SSearchTableRef** — SSearchTable 的 ref 方法 通过 ref 可以从外部控制表格刷新、重置等操作。 `tsx const tableRef = useRef<SSearchTableRef>(null); tableRef.current?.refresh();       // 刷新当前页 tableRef.current?.reset();         // 重置搜索并刷新 tableRef.current?.getForm();       // 获取表单实例 `

- refresh: (params?: any) => void — 刷新表格数据，可传入额外参数合并到请求中
- reset: () => void — 重置搜索条件并刷新到第一页
- getForm: () => any — 获取内部表单实例，用于外部操作表单

**SearchTableRef** — SearchTableRef 是 SSearchTableRef 的别名，用于向后兼容: `SSearchTableRef`

## 组合组件说明

以下是本组件 props 中引用的子组件/Hook 类型的核心属性摘要，无需额外查阅即可理解完整能力：

### headTitle → STitle (STitleProps) (extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'>)

> 完整 API: ai/components/STitle.md

- prefix?: `ReactNode` — 标题前缀自定义内容
- gap?: `number | string` — 标题与内容的间距
- goBack?: `boolean` — 是否显示返回按钮
- type?: `TitleType` — 标题类型，影响字号和样式
- desc?: `ReactNode` — 描述文字
- actionNode?: `ReactNode` — 右侧操作区
- style?: `React.CSSProperties`
- hasBottomMargin?: `boolean | number | string` — 底部间距
- _... 共 11 个属性，详见完整文档_

### options → useSearchTable (useSearchTableOptions)

> 完整 API: ai/components/useSearchTable.md

- form?: `FormInstance<any>` — 外部传入的表单实例
- extraParams?: `Record<string, any>` — 额外请求参数，每次请求都会携带
- manual?: `boolean` — 是否手动触发首次请求
- dispatchParams?: `(params?: any) => any` — 请求前参数处理
- serviceProps?: `Options<any, any>` — ahooks useRequest 配置
- paginationFields?: `PaginationFields` — 分页字段映射
- transformRequestParams?: `(params: any) => any` — 请求参数转换函数
- transformResponseData?: `(data: any) => any` — 响应数据转换函数

### tableProps → STable (STableProps) (extends Omit<TableProps<RecordType>, 'columns'>)

> 完整 API: ai/components/STable.md

- columns?: `SColumnsType<RecordType>` — 列定义，支持 dictKey 和字符串 render
- isSeq?: `boolean` — 是否显示序号列
- current?: `number` — 当前页码（用于序号计算）
- pageSize?: `number` — 每页条数（用于序号计算）

### formProps → SForm (SearchProps) (extends SFormProps)

> 完整 API: ai/components/SForm.md

- defaultExpand?: `boolean` — 是否默认展开所有搜索项
- showExpand?: `boolean` — 是否显示展开/收起按钮
- onExpand?: `(expand: boolean) => void` — 展开/收起回调
- maxRows?: `number` — 收起时最大显示行数
- actionNode?: `ReactNode` — 搜索栏右侧自定义操作节点
- container?: `React.ComponentType<any>` — 自定义组件容器
- isCard?: `boolean` — 是否包裹在卡片中
- gap?: `number | [number, number]` — 行列间距，number 统一间距，[rowGap, columnGap] 分别设置
- _... 共 20 个属性，详见完整文档_

### tableCardProps → SCard (SCardProps) (extends Omit<CardProps, 'children'>)

> 完整 API: ai/components/SCard.md

- children?: `ReactNode`
- hasBottomPadding?: `boolean` — 底部是否包含边距

## 使用示例

```tsx
import type {
  SColumnsType,
  SFormItems,
  SSearchTableRef,
} from '@dalydb/sdesign';
import { SConfigProvider, SSearchTable } from '@dalydb/sdesign';
import { Button, message } from 'antd';
import React, { useRef } from 'react';

const globalDict = { userStatus: { active: '活跃', inactive: '未激活' } };

const searchItems: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input' },
  {
    label: '状态',
    name: 'status',
    type: 'select',
    fieldProps: {
      options: [
        { value: 'active', label: '活跃' },
        { value: 'inactive', label: '未激活' },
      ],
    },
  },
];

const columns: SColumnsType<any> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
  { title: '创建时间', dataIndex: 'createTime', render: 'datetime' },
  {
    title: '操作',
    render: (_: any, record: any) => (
      <Button
        type="link"
        size="small"
        onClick={() => message.info(`编辑: ${record.name}`)}
      >
        编辑
      </Button>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRequest = (_params: any) => {
  const list = [
    {
      id: 1,
      name: '张三',
      email: 'zs@example.com',
      status: 'active',
      createTime: new Date().toISOString(),
    },
    {
      id: 2,
      name: '李四',
      email: 'ls@example.com',
      status: 'inactive',
      createTime: new Date().toISOString(),
    },
  ];
  return Promise.resolve({ list, total: list.length });
};

export default () => {
  const ref = useRef<SSearchTableRef>(null);
  return (
    <SConfigProvider globalDict={globalDict}>
      <SSearchTable
        ref={ref}
        headTitle={{
          children: '用户管理',
          actionNode: (
            <Button type="primary" onClick={() => message.info('新增用户')}>
              新增
            </Button>
          ),
        }}
        requestFn={mockRequest}
        formProps={{ items: searchItems, columns: 3 }}
        tableProps={{ columns, rowKey: 'id', isSeq: true }}
      />
    </SConfigProvider>
  );
};
```
