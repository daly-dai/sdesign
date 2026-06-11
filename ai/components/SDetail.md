# SDetail — 详情展示，支持 8 种渲染类型（text/dict/file/img 等）

## 使用边界

**适用场景:**

- 详情页展示键值对数据
- 需要 7 种渲染类型自动格式化（text/dict/file/rangeTime/checkbox 等）
- 需要字典映射（dictKey 配合 SConfigProvider）
  **不适用:**
- 数据是列表形式（多行同结构），应使用 STable
- 需要编辑数据，应使用 SForm
- 自定义卡片式布局展示，直接用 antd 原生组件
  **优先使用:**
- SDetail.Group → 详情需要分组展示时，不要手动拼多个 SDetail

## 类型定义

**SDetailProps** — SDetail 详情展示组件 Props CSS Grid 自渲染，支持 7 种数据类型自动渲染。 配合 SConfigProvider 可自动进行字典映射。 `tsx <SDetail title="用户详情" dataSource={userData} items={[ { label: '姓名', name: 'name' }, { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' }, ]} columns={2} /> `

- desc?: ReactNode — 描述文字
- titleAction?: ReactNode — 标题右侧操作区
- dataSource?: Record<string, any> — 数据源对象
- items?: SDetailItem[] — 详情项配置数组
- labelStyle?: CSSProperties — 统一 label 样式
- contentStyle?: CSSProperties — 统一内容区样式
- hasCardBg?: boolean — 是否显示卡片背景
- container?: React.ComponentType<any> — 自定义容器组件
- title?: string | ReactNode — 标题
- detailName?: string — 从 dataSource 中取值的 key 前缀，支持嵌套路径如 "user.profile"
- style?: CSSProperties — 组件样式
- className?: string — 组件类名
- columns?: number | string — 列数或 grid-template-columns 值 - `number`: 等分列数，如 `3` → `repeat(3, 1fr)` - `string`: 直接作为 CSS grid-template-columns 值，如 `"300px 1fr 1fr"`
- column?: number — 【已废弃】列数，请改用 `columns` 传入时内部映射为 `columns`，`columns` 优先级更高
- gap?: number — Grid 间距（px），对应 CSS `gap` 属性
- labelWidth?: number | string — label 列宽度，作用于每个 Grid item 内部的 label 子元素
- layout?: 'horizontal' | 'vertical' — 布局方式 - `'horizontal'`: label 与 value 同行（默认） - `'vertical'`: label 与 value 各占一行
- colon?: boolean — 是否在 label 后显示冒号
- emptyText?: ReactNode — 全局空值占位文案
- loading?: boolean — 加载中骨架屏

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

**ItemType** — 详情项渲染类型 - `'text'` — 纯文本 - `'dict'` — 字典映射，自动从 globalDict 转换 - `'file'` — 文件列表展示 - `'rangeTime'` — 时间范围 - `'checkbox'` — 多选值展示 - `'empty'` — 空占位 - `'placeholder'` — 占位符（有意留空标记） - `'tag'` — 标签渲染: `(typeof ItemTypes)[number]`

**DetailItemType**

- type?: ItemType — 渲染类型
- fileProps?: Partial<FileListProps> — 文件展示配置，type='file' 时有效
- dictReflect?: DictReflect — 字典映射关系
- dictKey?: string — 字典 key，配合 SConfigProvider globalDict
- value?: any
- dictMap?: Record<string, string> | any[] | null — 字典数据源
- tagColorMap?: Record<string, string> — tag 类型颜色映射（值 → antd Tag color）
- render?: (value?: any, dataSource?: any) => ReactNode
- dataSource?: Record<string, any>

**SDetailItemType** — SDetail 单个详情项配置 `tsx const items: SDetailItem[] = [ { label: '姓名', name: 'name' }, { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' }, { label: '附件', name: 'files', type: 'file' }, { label: '自定义', render: (val, data) => <Tag>{val}</Tag> }, ]; `: `DetailItemType & { label?: ReactNode; name?: string | string[]; span?: number; hidden?: boolean; copyable?: boolean; ellipsis?: boolean | { rows: number }; tooltip?: ReactNode; }`

**SDetailItem** — SDetail 单个详情项（完整类型） 包含 SDetailItemType 的所有字段 + 从原 antd DescriptionsItemType 中显式继承的样式/类名相关字段: `SDetailItemType & { prefixCls?: string; className?: string; style?: CSSProperties; labelStyle?: CSSProperties; contentStyle?: CSSProperties; }`

## 使用示例

```tsx
import type { SDetailItem } from '@dalydb/sdesign';
import { SCard, SConfigProvider, SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource = {
  name: '张三',
  gender: 1,
  status: 1,
  email: 'zs@example.com',
  startTime: '2024-01-01',
  endTime: '2024-12-31',
  tags: '1,2',
  fileList: [
    { fileName: '合同.pdf', fileUrl: 'https://example.com/contract.pdf' },
    { fileName: '附件.docx', fileUrl: 'https://example.com/attach.docx' },
  ],
  createTime: new Date().toISOString(),
};
const statusMap: Record<number, string> = { 1: '启用', 0: '禁用' };
const tagMap: Record<string, string> = { 1: 'VIP', 2: '认证用户' };
// 全局字典：子组件通过 dictKey 引用，无需逐个传 dictMap
const globalDict = {
  genderMap: { 1: '男', 2: '女' },
};

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '性别', name: 'gender', type: 'dict', dictKey: 'genderMap' },
  { label: '状态', name: 'status', type: 'dict', dictMap: statusMap },
  {
    label: '邮箱',
    name: 'email',
    render: (v: string) => (v ? <a href={`mailto:${v}`}>{v}</a> : '-'),
  },
  { label: '有效期', type: 'rangeTime', name: ['startTime', 'endTime'] },
  { label: '标签', name: 'tags', type: 'checkbox', dictMap: tagMap },
  { label: '附件', name: 'fileList', type: 'file' },
  { label: '占位示例', type: 'placeholder' },
  { label: '空值示例', type: 'empty' },
  { label: '创建时间', name: 'createTime' },
];

export default () => (
  <SConfigProvider globalDict={globalDict}>
    <SCard title="用户详情">
      <SDetail items={items} dataSource={dataSource} column={2} />
    </SCard>
  </SConfigProvider>
);
```
