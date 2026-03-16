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
- requestFn: (data?: any) => Promise<any> — 数据请求函数 接收搜索参数 + 分页参数，返回包含列表数据和总数的对象。 默认字段映射: `{ dataList, totalSize, pageNum, pageSize }`， 可通过 options.paginationFields 自定义。
- options?: Omit<useSearchTableOptions, 'form'> — useSearchTable 的配置选项
- tableProps?: STableProps<any> — 表格 props，会合并到 useSearchTable 返回的 tableProps 中
- formProps?: SearchProps — 搜索表单 props，透传给 SForm.Search

**SearchTableRef** — SSearchTable 的 ref 方法 通过 ref 可以从外部控制表格刷新、重置等操作。 `tsx const tableRef = useRef<SearchTableRef>(null); tableRef.current?.refresh();       // 刷新当前页 tableRef.current?.reset();         // 重置搜索并刷新 tableRef.current?.getForm();       // 获取表单实例 `

- refresh: (params?: any) => void — 刷新表格数据，可传入额外参数合并到请求中
- reset: () => void — 重置搜索条件并刷新到第一页
- getForm: () => any — 获取内部表单实例，用于外部操作表单
