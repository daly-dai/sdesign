# STitle — 标题组件（page/table/form 三种类型）

## 使用边界

**适用场景:**

- 页面级标题（带返回按钮、操作区）
- 表格区域标题
- 表单区域标题
  **不适用:**
- 纯文本标题无操作区，直接用 h1/h2 标签
- 面包屑导航，使用 antd Breadcrumb

## 类型定义

**STitleProps** extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> — STitle 标题组件 Props `tsx <STitle type="page" goBack onBackClick={() => navigate(-1)}> 用户详情 </STitle> `

- prefix?: ReactNode — 标题前缀自定义内容
- gap?: number | string — 标题与内容的间距
- goBack?: boolean — 是否显示返回按钮
- type?: TitleType — 标题类型，影响字号和样式
- desc?: ReactNode — 描述文字
- actionNode?: ReactNode — 右侧操作区
- style?: React.CSSProperties
- hasBottomMargin?: boolean | number | string — 底部间距
- fontSize?: CSSProperties['fontSize']
- onBackClick?: () => void — 返回按钮点击回调
- children?: ReactNode — 标题文字

**TitleType** — 标题类型 - `'page'` — 页面级标题（较大字号） - `'table'` — 表格区域标题 - `'form'` — 表单区域标题: `(typeof TitleTypes)[number]`
