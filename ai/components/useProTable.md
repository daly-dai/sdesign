# useProTable

## 类型定义

**ProPaginationFields** — 分页字段映射

- current?: string
- pageSize?: string
- total?: string
- list?: string

**UseProTableOptions** — useProTable 配置

- form?: FormInstance<any> — 外部表单实例，不传则内部创建
- ready?: boolean — 是否准备好，默认 true。 false 时初始化不请求。常用于等待依赖接口返回后设为 true
- manual?: boolean — 是否手动触发首次请求，默认 false
- paginationFields?: ProPaginationFields — 分页字段映射
- extraParams?: Record<string, unknown> — 额外请求参数，每次请求都会携带
- dispatchParams?: (params: Record<string, unknown>) => Record<string, unknown> — 请求前参数处理（合并 form + 分页 + extraParams 后）
- transformRequestParams?: ( params: Record<string, unknown>, ) => Record<string, unknown> — 请求参数二次转换（dispatchParams 之后）
- transformResponseData?: ( data: Record<string, unknown>, ) => Record<string, unknown> — 响应数据二次转换
- serviceProps?: Options<any, any> — ahooks useRequest 配置

**UseProTableReturn** — useProTable 返回值

- tableProps: { dataSource: any[]; pagination: TablePaginationConfig | false; loading: boolean; } — 表格 props：聚合 dataSource、pagination、loading
- search: () => void — 搜索（刷新当前页，携带表单值）
- reset: () => void — 重置搜索并刷新
- form: FormInstance<any> — 表单实例
- mutate: (data?: Record<string, unknown>) => void — 直接修改数据，不触发请求。传 undefined 清空

**ProService** — 数据请求函数 默认 data 为 any，兼容任意查询参数形态（pageIndex/pageNum/page、嵌套 params.page 等）。 需要类型安全时显式传入 TParams： `ts const service: ProService<MyQuery> = (data) => api.getList(data); `: `(data: TParams) => Promise<any>; export interface UseProTableReturn {`
