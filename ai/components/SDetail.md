# SDetail — 详情展示，支持 8 种渲染类型（text/dict/file/img 等）

## 子组件与静态方法

- SDetail.Group
- SDetail.Item

## 使用边界

**适用场景:**

- 详情页展示键值对数据
- 需要 8 种渲染类型自动格式化（text/dict/file/img/rangeTime/checkbox 等）
- 需要字典映射（dictKey 配合 SConfigProvider）
  **不适用:**
- 数据是列表形式（多行同结构），应使用 STable
- 需要编辑数据，应使用 SForm
- 自定义卡片式布局展示，直接用 antd 原生组件
  **优先使用:**
- SDetail.Group → 详情需要分组展示时，不要手动拼多个 SDetail

## 继承关系

继承自 **antd Descriptions** 的全部属性，以下属性已被覆盖：items, title

其他 antd Descriptions 属性均可直接使用。

## 类型定义

**SDetailProps** extends Omit<DescriptionsProps, 'items' | 'title'> (继承自 antd Descriptions，覆盖: items, title) — SDetail 详情展示组件 Props 基于 antd Descriptions 封装，支持 8 种数据类型自动渲染。 配合 SConfigProvider 可自动进行字典映射。 `tsx <SDetail title="用户详情" dataSource={userData} items={[ { label: '姓名', name: 'name' }, { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' }, ]} column={2} /> `

- desc?: ReactNode — 描述文字
- titleAction?: ReactNode — 标题右侧操作区
- dataSource?: Record<string, any> — 数据源对象
- items?: SDetailItem[] — 详情项配置数组
- labelStyle?: React.CSSProperties
- contentStyle?: React.CSSProperties
- hasCardBg?: boolean — 是否显示卡片背景
- container?: React.ComponentType<any> — 自定义容器组件
- title?: string | ReactNode — 标题
- detailName?: string — 从 dataSource 中取值的 key 前缀

**DictReflect**

- label?: string
- name?: string

**SDetailGroupItem** — SDetail.Group 分组配置项

- groupTitle?: string | ReactNode — 分组标题
- groupTitleProps?: Omit<STitleProps, 'title'> — 分组标题 Props
- groupContainer?: React.ComponentType<any> — 分组容器组件
- groupItems?: SDetailProps[] — 分组内的多个详情面板
- items?: SDetailItem[] — 分组内的详情项
- itemProps?: Omit<SDetailProps, 'items' | 'dataSource'> — 面板公共配置
- dataSource?: Record<string, any> — 分组数据源
- hidden?: boolean — 是否隐藏该分组

**SDetailGroupProps** — SDetail.Group 分组详情 Props 将详情按分组展示，每组可有独立标题和数据源。 `tsx <SDetail.Group dataSource={data} items={[ { groupTitle: '基本信息', items: [...] }, { groupTitle: '扩展信息', items: [...] }, ]} /> `

- items?: SDetailGroupItem[] — 分组配置数组
- dataSource?: Record<string, any> — 全局数据源

**ItemType** — 详情项渲染类型 - `'text'` — 纯文本 - `'dict'` — 字典映射，自动从 globalDict 转换 - `'file'` — 文件列表展示 - `'img'` — 图片展示 - `'rangeTime'` — 时间范围 - `'checkbox'` — 多选值展示 - `'empty'` — 空占位 - `'placeholder'` — 占位符: `(typeof ItemTypes)[number]`

**SDetailItemType** — SDetail 单个详情项配置 `tsx const items: SDetailItem[] = [ { label: '姓名', name: 'name' }, { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' }, { label: '附件', name: 'files', type: 'file' }, { label: '自定义', render: (val, data) => <Tag>{val}</Tag> }, ]; `: `DetailItemType & { label?: ReactNode; name?: string | string[]; render?: (value?: any, dataSource?: any) => ReactNode`

**DetailItemType**

- type?: ItemType — 渲染类型
- fileProps?: Partial<FileListProps> — 文件展示配置，type='file' 时有效
- dictReflect?: DictReflect — 字典映射关系
- dictKey?: string — 字典 key，配合 SConfigProvider globalDict
- value?: any
- dictMap?: Record<string, string> | any[] | null — 字典数据源
- render?: (value?: any, dataSource?: any) => ReactNode
- dataSource?: Record<string, any>

**SDetailItem**: `SDetailItemType & Omit<DescriptionsItemType, 'children' | 'key'>`
