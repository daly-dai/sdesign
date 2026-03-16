# useSearchTable

## 类型定义

**PaginationFields** — 分页字段映射配置 用于适配后端接口的分页字段名，默认值对应常见的后端接口规范。

- current?: string — 当前页码字段名
- pageSize?: string — 每页条数字段名
- total?: string — 总条数字段名
- list?: string — 数据列表字段名

**useSearchTableOptions** — useSearchTable Hook 配置选项 `tsx const { tableProps, formConfig, form } = useSearchTable( (params) => api.getList(params), { manual: false, paginationFields: { list: 'records', total: 'total' }, extraParams: { orgId: '123' }, } ); `

- form?: FormInstance<any> — 外部传入的表单实例
- extraParams?: Record<string, any> — 额外请求参数，每次请求都会携带
- manual?: boolean — 是否手动触发首次请求
- dispatchParams?: (params?: any) => any — 请求前参数处理
- serviceProps?: Options<any, any> — ahooks useRequest 配置
- paginationFields?: PaginationFields — 分页字段映射
- transformRequestParams?: (params: any) => any — 请求参数转换函数
- transformResponseData?: (data: any) => any — 响应数据转换函数

**useSearchTableProps** extends useSearchTableOptions

- requestFn: (data?: any) => Promise<any> — 数据请求函数

**useSearchTableReturnType** — useSearchTable 返回值 `tsx const { tableProps, formConfig, form } = useSearchTable(requestFn, options); // 搜索表单 <SForm.Search form={form} items={searchItems} {...formConfig} /> // 数据表格 <STable {...tableProps} columns={columns} /> `

- getPageData: (params?: any) => void — 手动触发数据加载
- handleReset: () => void — 重置搜索并刷新
- tableProps: TableProps<any> — 直接传给 STable/antd Table 的 props 包含 dataSource、pagination、loading
- dataSource: any[] — 表格数据
- pagination?: false | TablePaginationConfig — 分页配置
- loading?: boolean — 加载状态
- error?: any — 错误信息
- form: FormInstance<any> — 表单实例
- formConfig: { onFinish: (params?: any) => void — 搜索表单配置，直接展开传给 SForm.Search 包含 onFinish 和 onReset
- onReset: () => void
